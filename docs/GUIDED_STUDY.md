# Estudo organizado — 17/10/2026

A entrada **Continuar estudando** abre `#/estudar`. O organizador retoma a atividade aberta, alterna matérias, propõe questões depois da leitura, recupera dificuldades e agenda revisões de 1, 7 e 21 dias. A cada três blocos com banco interativo, prepara um simulado curto somente com assuntos praticados. A conclusão avança diretamente para a próxima atividade.

O histórico fica em `Progresso.guided`, dentro do armazenamento e da sincronização existentes. Aulas, respostas, erros e revisões anteriores permanecem no formato original; não houve migração destrutiva. Concluir leitura não homologa cobertura editorial nem domínio.

O banco interativo indexa 29 questões autorais existentes em LP-001, MC-001 e RLM-001, preservando enunciados, alternativas, comentários e referências. `node scripts/generate-guided-bank.mjs` regenera o índice a partir dos documentos canônicos, aceitando apenas conjuntos completos com gabarito explícito. Questões sem ID anterior recebem identificação técnica estável por aula e número da fonte. Os demais exercícios permanecem integralmente nas aulas e podem ser indexados depois de validação; o organizador não inventa questões para preencher lacunas.

Validação: testes de sequência, erros, revisão, mescla de dispositivos, unicidade do banco e sincronização; lint; build; navegador com respostas retomadas após recarga, bloqueio do gabarito antecipado e visualização móvel. Evidência externa e commit/deploy ficam no checkpoint da execução.
