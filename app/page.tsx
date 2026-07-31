"use client";

import { useMemo, useState } from "react";

type Metric = "novos" | "pendentes" | "julgados" | "baixados";
type Region = { id:string; name:string; uf:string; court:string; x:number; y:number; values:Record<Metric,number|null> };

const regions:Region[] = [
  {id:"manaus",name:"Manaus",uf:"AM",court:"TJAM",x:28,y:25,values:{novos:418,pendentes:1260,julgados:307,baixados:249}},
  {id:"belem",name:"Belém",uf:"PA",court:"TJPA",x:48,y:20,values:{novos:352,pendentes:914,julgados:281,baixados:190}},
  {id:"salvador",name:"Salvador",uf:"BA",court:"TJBA",x:69,y:49,values:{novos:577,pendentes:1482,julgados:469,baixados:321}},
  {id:"goiania",name:"Goiânia",uf:"GO",court:"TJGO",x:49,y:55,values:{novos:301,pendentes:803,julgados:244,baixados:198}},
  {id:"rio",name:"Rio de Janeiro",uf:"RJ",court:"TJRJ",x:65,y:72,values:{novos:693,pendentes:1810,julgados:540,baixados:421}},
  {id:"sp",name:"São Paulo",uf:"SP",court:"TJSP",x:52,y:74,values:{novos:816,pendentes:2310,julgados:710,baixados:559}},
  {id:"porto-alegre",name:"Porto Alegre",uf:"RS",court:"TJRS",x:46,y:91,values:{novos:286,pendentes:734,julgados:250,baixados:208}},
  {id:"sem-dado",name:"Comarca demonstrativa sem cobertura",uf:"XX",court:"—",x:38,y:45,values:{novos:null,pendentes:null,julgados:null,baixados:null}},
];

const labels:Record<Metric,string>={novos:"Processos novos",pendentes:"Pendentes",julgados:"Julgados",baixados:"Baixados"};
const periods=["Jan–Jun 2026","2025","2024","2023","2022","2021","2020"];

export default function Home(){
  const [metric,setMetric]=useState<Metric>("pendentes");
  const [period,setPeriod]=useState(periods[0]);
  const [mode,setMode]=useState<"comarcas"|"calor">("comarcas");
  const [selected,setSelected]=useState(regions[5]);
  const [method,setMethod]=useState(false);
  const numeric=regions.filter(r=>r.values[metric]!==null);
  const max=Math.max(...numeric.map(r=>r.values[metric]||0));
  const total=numeric.reduce((sum,r)=>sum+(r.values[metric]||0),0);
  const ranked=useMemo(()=>[...numeric].sort((a,b)=>(b.values[metric]||0)-(a.values[metric]||0)),[metric]);
  return <main>
    <div className="demo-banner"><b>PROTÓTIPO FUNCIONAL</b><span>Todos os números e territórios são dados de exemplo — não representam estatísticas reais.</span></div>
    <header><a className="brand" href="#">Justiça em mapa</a><nav><button onClick={()=>setMethod(true)}>Metodologia</button><span>Grupo 1 · Oficina Codesinfo</span></nav></header>
    <section className="hero"><div><p className="eyebrow">VIOLÊNCIA DOMÉSTICA · JUSTIÇA BRASILEIRA</p><h1>Processos por comarca,<br/><em>sem apagar as lacunas.</em></h1><p>Uma demonstração de como dados agregados do DataJud poderão revelar concentração, estoque e movimentação territorial desde 2020.</p></div><div className="hero-stat"><small>TOTAL DO RECORTE</small><strong>{total.toLocaleString("pt-BR")}</strong><span>{labels[metric].toLowerCase()} · {period}</span></div></section>
    <section className="controls" aria-label="Filtros do mapa"><label>Indicador<select value={metric} onChange={e=>setMetric(e.target.value as Metric)}>{Object.entries(labels).map(([k,v])=><option value={k} key={k}>{v}</option>)}</select></label><label>Período<select value={period} onChange={e=>setPeriod(e.target.value)}>{periods.map(p=><option key={p}>{p}</option>)}</select></label><div className="segmented" aria-label="Modo do mapa"><button className={mode==="comarcas"?"active":""} onClick={()=>setMode("comarcas")}>Por comarca</button><button className={mode==="calor"?"active":""} onClick={()=>setMode("calor")}>Mapa de calor</button></div></section>
    <div className="dashboard">
      <section className={`map-card ${mode}`}><div className="map-head"><div><p className="eyebrow">MAPA DEMONSTRATIVO · NÃO GEOGRÁFICO</p><h2>{labels[metric]} por comarca</h2></div><span>Atualização fictícia: jul/2026</span></div><div className="map-stage" aria-label="Mapa esquemático do Brasil com comarcas de exemplo"><div className="brazil-shape" />{regions.map(r=>{const value=r.values[metric];const scale=value===null?.38:.45+(value/max)*.8;return <button key={r.id} className={`map-point ${value===null?"missing":""} ${selected.id===r.id?"selected":""}`} style={{left:`${r.x}%`,top:`${r.y}%`,"--scale":scale,"--level":value===null?0:(value/max)} as React.CSSProperties} onClick={()=>setSelected(r)} aria-label={`${r.name}: ${value===null?"sem dados":value}`}>{mode==="comarcas"&&<span>{r.uf}</span>}</button>})}<div className="legend"><b>{mode==="calor"?"Concentração":"Quantidade"}</b><div><i/><i/><i/><i/></div><small>menor <span>maior</span></small><em>◇ sem dados</em></div></div></section>
      <aside className="detail"><p className="eyebrow">DETALHE TERRITORIAL</p><h2>{selected.name}</h2><div className="territory"><span>{selected.court}</span><span>{selected.uf}</span></div><div className="big-number"><small>{labels[metric]}</small><strong>{selected.values[metric]===null?"Sem dados":selected.values[metric]?.toLocaleString("pt-BR")}</strong><span>{period}</span></div>{selected.values[metric]===null?<p className="missing-note">Ausência de cobertura não é zero. A origem territorial ainda precisa ser conciliada.</p>:<><h3>Outros indicadores</h3><dl>{(Object.keys(labels) as Metric[]).filter(m=>m!==metric).map(m=><div key={m}><dt>{labels[m]}</dt><dd>{selected.values[m]?.toLocaleString("pt-BR")}</dd></div>)}</dl></>}<button onClick={()=>setMethod(true)} className="method-button">Ver definições e limitações →</button></aside>
    </div>
    <section className="ranking"><div><p className="eyebrow">LEITURA DO RECORTE</p><h2>Comarcas com mais {labels[metric].toLowerCase()}</h2></div><ol>{ranked.slice(0,5).map((r,i)=><li key={r.id}><span>{String(i+1).padStart(2,"0")}</span><b>{r.name} · {r.uf}</b><i style={{width:`${((r.values[metric]||0)/max)*100}%`}}/><strong>{r.values[metric]?.toLocaleString("pt-BR")}</strong></li>)}</ol></section>
    <footer><b>Fonte planejada: API Pública DataJud / CNJ</b><span>Demonstração com dados sintéticos · nenhuma informação processual individual</span></footer>
    {method&&<div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="method-title" onClick={()=>setMethod(false)}><article className="modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setMethod(false)}>×</button><p className="eyebrow">NOTA METODOLÓGICA DO PROTÓTIPO</p><h2 id="method-title">O que este mapa demonstra</h2><p>Esta versão testa filtros, dois modos de visualização, detalhes territoriais e tratamento de lacunas. <b>Os valores, comarcas e atualização exibidos são exemplos sintéticos.</b></p><h3>Na versão com dados reais</h3><ul><li>Fonte: API Pública do DataJud/CNJ, com atualização mensal.</li><li>Indicadores: novos, pendentes, julgados e baixados segundo definições oficiais.</li><li>Recorte temático: códigos TPU documentados para violência doméstica.</li><li>Geografia: malha de comarcas com fonte, licença e tabela de correspondência verificáveis.</li></ul><div className="pending-box"><b>Pendências antes de uso jornalístico</b><p>Validar códigos TPU, licenciamento territorial, rotina de conciliação e totais de amostra. Falta de cobertura deve permanecer como “sem dados”, nunca como zero.</p></div><button className="primary" onClick={()=>setMethod(false)}>Entendi</button></article></div>}
  </main>
}
