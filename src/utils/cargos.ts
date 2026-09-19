// Compatibility aliases affect navigation only; canonical lesson IDs remain unchanged.
const aliases: Record<string, string> = {
  tjsp_escrevente: "tjsp-escrevente", "tj-sp-escrevente": "tjsp-escrevente",
  trf3_aj_adm: "trf3-analista-adm", "trf3-analista-administrativa": "trf3-analista-adm",
  trf3_tj_adm: "trf3-tecnico-adm", "trf3-tecnico-administrativa": "trf3-tecnico-adm",
  trf3_aj_ti: "trf3-analista-ti", trf3_tj_ti: "trf3-tecnico-ti",
  trt15_aj_ti: "trt15-analista-ti", trt15_tj_ti: "trt15-tecnico-ti",
  "tjsp-analista-sistemas": "tjsp-analista-ti",
};
export const cargoDaInterface = (id: string) => aliases[id] || id;
