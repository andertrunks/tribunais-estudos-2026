import { chromium, expect } from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = process.argv[2] || 'http://127.0.0.1:4173/tribunais-estudos-2026/';
const out = process.argv[3] || '../../validation-auth';
fs.mkdirSync(out,{recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true,args:['--disable-gpu']});
const context = await browser.newContext({viewport:{width:1440,height:1000},serviceWorkers:'block'});
const page = await context.newPage();
const errors = [], checks = [], rows = new Map();
const empty = () => ({aulas:[],respostas:{},erros:[],revisoes:[]});
const users = ['11111111-1111-4111-8111-111111111111','22222222-2222-4222-8222-222222222222'];
let selected = users[0], offline = false, delay = 0, logoutScope, conflict = false;
function session(id) {
  const user = {id,aud:'authenticated',role:'authenticated',email:`${id.slice(0,1)}@example.test`,app_metadata:{provider:'google'},user_metadata:{full_name:'Estudante de teste'},created_at:'2026-01-01T00:00:00Z'};
  const encode = v => Buffer.from(JSON.stringify(v)).toString('base64url');
  const access_token = `${encode({alg:'HS256',typ:'JWT'})}.${encode({sub:id,exp:Math.floor(Date.now()/1000)+3600,role:'authenticated'})}.fake`;
  return {access_token,refresh_token:'test-only',token_type:'bearer',expires_in:3600,expires_at:Math.floor(Date.now()/1000)+3600,user};
}
page.on('pageerror', e=>errors.push(e.message));
const fulfill = (route,body,status=200) => route.fulfill({status,contentType:'application/json',body:JSON.stringify(body)});
await context.route('https://*.supabase.co/**',async route => {
  const request = route.request(), url = new URL(request.url());
  if (url.pathname.endsWith('/authorize')) {
    assert.equal(url.searchParams.get('provider'),'google');
    assert.equal(url.searchParams.get('redirect_to'),base);
    assert.ok(url.searchParams.get('code_challenge'));
    checks.push('Google/PKCE: redirect e challenge corretos (provedor simulado)');
    return route.fulfill({status:302,headers:{location:base+'?code=demonstracao'},body:''});
  }
  if (url.pathname.endsWith('/token')) {
    assert.equal(url.searchParams.get('grant_type'),'pkce');
    assert.ok(request.postDataJSON().code_verifier);
    return fulfill(route,session(selected));
  }
  if (url.pathname.endsWith('/user')) return fulfill(route,session(selected).user);
  if (url.pathname.endsWith('/logout')) { logoutScope=url.searchParams.get('scope'); return fulfill(route,{}); }
  assert.equal(url.pathname,'/rest/v1/tribunais_progress');
  if (offline) return fulfill(route,{message:'Indisponível para teste'},503);
  if (delay) await new Promise(resolve=>setTimeout(resolve,delay));
  const id = request.method()==='POST' ? request.postDataJSON().user_id : url.searchParams.get('user_id')?.slice(3);
  assert.ok(users.includes(id));
  const jwt = request.headers().authorization?.slice(7).split('.')[1];
  assert.equal(JSON.parse(Buffer.from(jwt,'base64url').toString()).sub,id);
  if (request.method()==='GET') return fulfill(route,rows.get(id) ?? null);
  const row = request.postDataJSON();
  if (request.method()==='POST') {
    if (rows.has(id)) return fulfill(route,{code:'23505',message:'conflict'},409);
    rows.set(id,row); return fulfill(route,null,201);
  }
  assert.equal(request.method(),'PATCH');
  if (conflict) {
    conflict=false;
    const previous=rows.get(id);
    rows.set(id,{...previous,data:{...previous.data,aulas:[...previous.data.aulas,'remote-concorrente']},updated_at:new Date(Date.now()+1000).toISOString()});
    return fulfill(route,[]);
  }
  if (rows.get(id)?.updated_at !== url.searchParams.get('updated_at')?.slice(3)) return fulfill(route,[]);
  rows.set(id,row); return fulfill(route,[{user_id:id}]);
});
async function login() {
  await page.getByRole('button',{name:'Entrar',exact:true}).click();
  await page.getByRole('button',{name:'Entrar com Google',exact:true}).click();
  await page.getByRole('button',{name:'Minha conta',exact:true}).waitFor();
  await expect.poll(()=>rows.get(selected)?.data.aulas.length??0).toBeGreaterThan(0);
}
async function account() { await page.getByRole('button',{name:'Minha conta',exact:true}).click(); await page.getByRole('heading',{name:'Olá, Estudante de teste'}).waitFor(); }
async function synced() { await expect(page.locator('.storage-note')).toContainText('Progresso sincronizado',{timeout:15000}); }
try {
  await page.goto(base+'#/materias/portugues');
  await page.getByRole('button',{name:'Entrar',exact:true}).waitFor();
  await page.getByRole('link',{name:'Abrir aula'}).click();
  await page.getByRole('button',{name:'Marcar aula como concluída'}).click();
  await page.getByRole('radio').nth(0).check();
  const guest = await page.evaluate(()=>JSON.parse(localStorage.getItem('tribunais-estudos:v1')));
  rows.set(selected,{user_id:selected,data:{...empty(),aulas:['remote-original']},updated_at:'2026-01-01T00:00:00Z'});
  await login(); await synced();
  assert.ok(page.url().includes('#/aulas/'));
  assert.deepEqual(new Set(rows.get(selected).data.aulas),new Set([...guest.aulas,'remote-original']));
  checks.push('Visitante preservado; callback PKCE restaura aula; merge inicial mantém remoto e local');
  await page.reload(); await synced();
  await account(); await expect(page.locator('.account-email')).toContainText('@example.test');
  await page.getByRole('button',{name:'Fechar',exact:true}).click();
  checks.push('Sessão persistente após refresh e identificação na conta');
  conflict=true;
  await page.getByRole('button',{name:'Concluída · desfazer'}).click();
  await expect.poll(()=>rows.get(selected).data.aulas.includes(guest.aulas[0])).toBe(false);
  await synced(); assert.ok(rows.get(selected).data.aulas.includes('remote-concorrente'));
  checks.push('Concorrência: leitura repetida; desfazer conclusão respeitado; estudo do outro dispositivo mantido');
  offline=true;
  await page.getByRole('button',{name:'Marcar aula como concluída'}).click();
  await expect(page.locator('.storage-note')).toContainText('Indisponível',{timeout:15000});
  const cache = await page.evaluate(id=>JSON.parse(localStorage.getItem(`tribunais-estudos:v1:user:${id}`)),selected);
  assert.ok(cache.aulas.includes(guest.aulas[0]));
  offline=false; await page.evaluate(()=>dispatchEvent(new Event('online'))); await synced();
  checks.push('Falha de conexão preserva cache e reconexão sincroniza');
  await account(); await page.screenshot({path:out+'/conta-desktop.png'});
  await page.getByRole('button',{name:'Sair',exact:true}).click();
  await page.getByRole('button',{name:'Entrar',exact:true}).waitFor();
  assert.equal(logoutScope,'local');
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('tribunais-estudos:v1'))),guest);
  selected=users[1]; await login(); await synced();
  assert.deepEqual(rows.get(selected).data,guest);
  assert.ok(!rows.get(selected).data.aulas.includes('remote-original'));
  checks.push('Logout local; visitante intacto; segunda conta não recebe dados da primeira');
  delay=1200;
  await account(); await page.getByRole('button',{name:'Sincronizar agora'}).click();
  await page.getByRole('button',{name:'Sair',exact:true}).click();
  await page.getByRole('button',{name:'Entrar',exact:true}).waitFor();
  await page.waitForTimeout(1500); delay=0;
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('tribunais-estudos:v1'))),guest);
  checks.push('Resposta atrasada após logout não substitui o visitante');
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Entrar',exact:true}).click();
  assert.equal(await page.locator('body').evaluate(e=>e.scrollWidth<=innerWidth),true);
  await page.screenshot({path:out+'/login-mobile.png',fullPage:true});
  await page.getByRole('button',{name:'Continuar sem cadastro'}).focus(); await page.keyboard.press('Tab');
  await expect(page.getByRole('button',{name:'Fechar',exact:true})).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button',{name:'Entrar',exact:true})).toBeFocused();
  checks.push('Mobile sem overflow; foco contido no modal; Escape e retorno de foco');
  await page.goto(base+'?error=access_denied&error_description=cancelado');
  await expect(page.getByRole('alert')).toContainText('login não foi concluído');
  await page.getByRole('button',{name:'Entrar',exact:true}).waitFor();
  checks.push('OAuth cancelado: aviso e estudo como visitante disponíveis');
  assert.deepEqual(errors,[]);
  fs.writeFileSync(out+'/auth-report.json',JSON.stringify({provider:'simulado; nenhum login Google real ou dado real alterado',checks,errors},null,2));
  console.log(JSON.stringify({checks,errors},null,2));
} finally { await browser.close(); }
