import { useState, useEffect, useRef, useCallback } from 'react'

/* ───────────────────────────── DATA ───────────────────────────── */

const CHEAT_SHEET = [
  { n: 1, phase: 'Opening',              keys: '"Antes de eu explicar o que fazemos, gostava de perceber o vosso contexto."' },
  { n: 2, phase: 'Negocio & ICP',        keys: 'O que vendem? Para quem? Ticket? Quem decide? Que tamanho de empresa?' },
  { n: 3, phase: 'Processo & Ferramentas', keys: '"Passo a passo, o que acontece desde que escolhem uma empresa ate marcar reuniao?"' },
  { n: 4, phase: 'Metricas & Bottleneck', keys: 'Quantos prospects/mes? Emails? Reply rate? Reunioes? Onde esta o gargalo?' },
  { n: 5, phase: 'Solucao',              keys: '"Deixa-me ver se percebi bem..." → resumo → AI Outbound Engine (3 min)' },
  { n: 6, phase: 'Piloto Gratuito',       keys: 'Piloto FREE. Unico pedido: testemunho se resultar. Zero risco para ele.' },
  { n: 7, phase: 'Closing',              keys: 'Proximos passos concretos. Nunca "vamos falando".' },
]

const PHASES = [
  /* ── 1. OPENING ── */
  {
    id: 1, title: 'Opening', time: '0-2 min',
    objective: 'Estabelecer confianca, definir agenda, posicionar como discovery (nao pitch).',
    script: `"Ola [nome], obrigado por teres arranjado tempo. Hoje nao vou fazer uma apresentacao do que fazemos. O que me interessa e perceber o vosso contexto — como funciona o vosso processo de ir buscar clientes, e onde sentem que ha espaco para melhorar.\n\nSe no final fizer sentido, explico como podemos ajudar. Se nao fizer sentido, digo-vos isso tambem. Funciona?"`,
    variant: {
      label: 'Se ele quiser saber primeiro o que faco',
      text: '"Em duas frases: nos construimos e operamos sistemas de outbound com AI para empresas B2B. Em vez de fazer tudo manualmente, automatizamos o processo de identificar prospects, contactar, follow-up, qualificar e marcar reunioes. Mas depende muito do vosso contexto — por isso gostava de perceber primeiro como funciona o vosso lado."'
    },
    dontDo: [
      'Nao comecar com "Nos fazemos X, Y, Z"',
      'Nao abrir slides',
      'Nao falar mais de 60 segundos seguidos',
    ],
    transition: '"Para eu perceber se e como posso ajudar, gostava de comecar por perceber o vosso negocio. Posso fazer-te algumas perguntas?"',
  },

  /* ── 2. NEGOCIO & ICP ── */
  {
    id: 2, title: 'Negocio & ICP', time: '2-8 min',
    objective: 'Perceber a empresa, o ICP, o ticket, o valor de um cliente. Decidir se outbound faz sentido economicamente.',
    questions: [
      { q: '"O que e que a empresa faz, em termos simples?"', why: 'Perceber a oferta em 30 seg. Se nao consegue explicar, pode haver problema de posicionamento.', followUp: '"Se tivesses de explicar a um prospect em 15 segundos porque deveria falar contigo, o que dirias?"' },
      { q: '"Quem sao os vossos clientes tipicos? Que tipo de empresas, que cargo decide?"', why: 'Perceber se ha um ICP definido. Outbound sem ICP = spray and pray.', followUp: '"Dos vossos 5 melhores clientes, o que tinham em comum?"' },
      { q: '"Qual e o ticket medio? Quanto vale um cliente no primeiro ano?"', why: 'Se ticket < 1k EUR, outbound pode nao ser viavel. Se > 5k, faz todo o sentido.', followUp: '"E a retencao? Quanto tempo fica um cliente em media?"' },
      { q: '"Quantos clientes novos fecham por mes?"', why: 'Volume e velocidade. 1/trimestre e diferente de 10/mes.', followUp: '"O que explica a inconsistencia?" (se for inconsistente)' },
      { q: '"Existe algum sinal que indique que uma empresa esta mais pronta para comprar?"', why: 'Buying signals separam outbound mediocre de excelente.', followUp: null },
      { q: '"Se pudesses ter +10 clientes iguais ao melhor, quanto representava em faturacao?"', why: 'Quantificar a oportunidade. ANOTAR este numero.', followUp: null },
    ],
    redFlags: [
      'Nao sabe quanto vale um cliente',
      'Vende para "toda a gente"',
      'Ticket < 500 EUR sem LTV significativo',
      'Nao consegue descrever o cliente ideal',
    ],
    listenFor: [
      'ICP claro e articulado → pode avancar para execucao',
      '"Dependemos de referrals" → nao tem processo ativo',
      'Ticket alto + poucos clientes = grande oportunidade',
      '"Contactamos tudo" → red flag de spray and pray',
    ],
    noteFields: ['Empresa/Oferta', 'ICP (industria, cargo, tamanho)', 'Ticket medio', 'Clientes/mes', 'Buying signals', 'Valor de +10 clientes'],
    transition: '"Ok, isso ajuda. Agora gostava de perceber como funciona o vosso outbound na pratica. Passo a passo."',
  },

  /* ── 3. PROCESSO & FERRAMENTAS ── */
  {
    id: 3, title: 'Processo & Ferramentas', time: '8-16 min',
    objective: 'Mapear o processo de outbound de ponta a ponta. Cada etapa manual = oportunidade de automacao. Cada etapa que falha = bottleneck.',
    mainQuestion: '"Explica-me exatamente o que acontece desde o momento em que decidem contactar uma empresa ate essa empresa marcar uma reuniao convosco."',
    mainNote: 'Deixar falar. Nao interromper. Tomar notas. Depois aprofundar.',
    processSteps: [
      { step: 'Targeting', questions: ['"Como decidem quem contactar?"', '"Usam alguma ferramenta para isso?"'], signal: '"Perdemos muito tempo a decidir" → AI pode priorizar' },
      { step: 'Sourcing', questions: ['"Onde vao buscar os contactos? Apollo? LinkedIn? Listas?"', '"Quantos contactos novos/semana?"'], signal: '"Demoro horas a encontrar contactos" → automacao de sourcing' },
      { step: 'Enrichment / Research', questions: ['"Que info recolhem antes de contactar?"', '"Personalizam? Quanto tempo por prospect?"'], signal: '"Vou ao LinkedIn de cada um ver..." → Clay + AI research' },
      { step: 'Outreach', questions: ['"Quantos emails/dia? Que ferramenta?"', '"Quantos dominios? SPF/DKIM configurados?"', '"LinkedIn tambem?"'], signal: 'Volume baixo por ser manual → Smartlead/Instantly' },
      { step: 'Follow-up', questions: ['"Quantos follow-ups por prospect?"', '"Manual ou automatico?"'], signal: '"Nem sempre fazemos follow-up" → sequencias automaticas' },
      { step: 'Reply Handling', questions: ['"Quando alguem responde, o que acontece?"', '"Quem responde? Em quanto tempo?"'], signal: '"As vezes demoramos dias" → AI reply handling' },
      { step: 'Qualification & Booking', questions: ['"Como sabem se tem potencial?"', '"Como marcam a reuniao? Quantas trocas de email?"'], signal: '"Marcamos com toda a gente" → AI qualification + calendar' },
    ],
    toolProbes: [
      { tool: 'Apollo', ask: '"O que fazem exatamente com o Apollo? Sourcing? Sequencias? Plano free ou pago?"', lookFor: 'Se so exportam emails, usam 10% da ferramenta.' },
      { tool: 'Clay', ask: '"Que enrichment fazem? Usam AI columns? Quem configurou?"', lookFor: 'Se nao usam AI columns + waterfall, ha oportunidade.' },
      { tool: 'Smartlead/Instantly', ask: '"Quantos mailboxes? Volume diario? Warmup activo? Open rate? Reply rate?"', lookFor: 'Se open rate < 40%, provavelmente e problema de infra.' },
      { tool: 'LinkedIn', ask: '"Manual ou automatizado? Sales Navigator?"', lookFor: null },
      { tool: 'CRM', ask: '"Usam CRM? Dados actualizados? Leads passam automaticamente?"', lookFor: null },
    ],
    principle: 'Nao entrar em conversa sobre features. Transformar conversa de ferramentas em conversa de processo.',
    principleScript: '"Percebo. Mas mais do que a ferramenta, o que me interessa e: o que fazem com a informacao que sai de la? O que acontece depois?"',
    noteFields: ['Processo (resumo)', 'Ferramentas (stack)', 'O que e manual', 'O que falta'],
    transition: '"Ok, e em termos de resultados, o que e que isto esta a gerar?"',
  },

  /* ── 4. METRICAS & BOTTLENECK ── */
  {
    id: 4, title: 'Metricas & Bottleneck', time: '16-22 min',
    objective: 'Quantificar o problema. Por numeros reais na mesa. Identificar o bottleneck principal.',
    metricsQuestions: [
      { q: '"Quantos prospects contactam por mes?"', note: 'Volume. 50 e muito diferente de 5.000.' },
      { q: '"Qual e o reply rate?"', note: 'Benchmark: 3-8%. Abaixo de 2% = problema de messaging ou deliverability.' },
      { q: '"Dessas respostas, quantas sao positivas?"', note: 'Positive reply rate e a metrica que realmente conta.' },
      { q: '"Quantas reunioes marcam por mes via outbound?"', note: 'O numero real. Tudo o resto e meio.' },
      { q: '"Dessas, quantas acontecem? E quantas resultam em oportunidade?"', note: 'Show rate < 70% = problema. Se 80% sao lixo = qualificacao.' },
      { q: '"Quanto gastam por mes em ferramentas + tempo da equipa?"', note: 'Para calcular CAC.' },
    ],
    formula: 'prospects/mes x reply rate x positive % x show rate x close rate = clientes/mes\nclientes/mes x ticket = revenue via outbound\n\nSe revenue < custo → processo nao e viavel como esta\nSe revenue >> custo → escalar\nSe 0 revenue → identificar onde esta o break',
    diagnosisAreas: [
      'Targeting / ICP', 'Data / Sourcing', 'Enrichment / Research',
      'Messaging / Copy', 'Deliverability / Infra', 'Follow-up',
      'Reply Handling', 'Qualification', 'Booking', 'Oferta (red flag)',
    ],
    noteFields: ['Prospects/mes', 'Reply rate', 'Positive reply rate', 'Reunioes/mes', 'Show rate', 'Custo outbound/mes', 'PRIMARY BOTTLENECK', 'SECONDARY BOTTLENECK'],
    transition: '"Com base no que me contaste, deixa-me resumir o que estou a ver."',
  },

  /* ── 5. SOLUCAO ── */
  {
    id: 5, title: 'Solucao', time: '22-25 min',
    objective: 'Resumir o que ouvi, confirmar, e apresentar o sistema + os 7 blocos de trabalho. Maximo 3 minutos.',
    transitionScript: `"Deixa-me ver se percebi bem.\n\nVoces vendem [oferta] para [ICP], com um ticket de [valor]. O processo atual e [descricao breve]. Estao a usar [ferramentas]. Estao a gerar [X reunioes/mes].\n\nO principal bottleneck parece estar em [bottleneck]. Isto faz com que [consequencia]. Cada reuniao que nao acontece representa [valor perdido].\n\nEstou a ler isto bem?"`,
    pauseNote: 'PAUSA. Deixar confirmar ou corrigir. Fundamental.',
    systemFlow: 'ICP → Sourcing → Enrichment → Research → Personalizacao → Outreach → Follow-up → Reply Handling → Qualification → Booking → CRM',
    workBlocks: [
      { n: '01', title: 'Definir ICP', desc: 'Empresas-alvo, geografia, dimensao, industria, cargos, exclusoes, sinais de fit e intencao.', deliverable: 'ICP + criterios de targeting' },
      { n: '02', title: 'Base de Prospects', desc: 'Sourcing via Apollo/Clay. Empresas, contactos, cargos, emails, LinkedIn, dados para personalizacao. Validacao e deduplicacao.', deliverable: 'Lista de prospects pronta para outreach' },
      { n: '03', title: 'AI Research + Personalizacao', desc: 'Para cada prospect: website, offering, trigger, pain relevante, razao de contacto, angulo personalizado.', deliverable: 'Sistema de research + exemplos' },
      { n: '04', title: 'Campanha', desc: '1 ICP, 1 offer, 1 messaging angle, 1-2 sequencias. Foco, nao volume.', deliverable: 'Messaging + sequence + follow-ups' },
      { n: '05', title: 'Configurar Outreach', desc: 'Listas, enrichment, campaign, sending infra, tracking, sequencing. Volume controlado.', deliverable: 'Infraestrutura de envio pronta' },
      { n: '06', title: 'AI Reply Handling + Qualification', desc: 'Classificacao: Positive → booking, Question → AI responde, Objection → human handoff, Not now → nurture, Not relevant → stop.', deliverable: 'Logica de classificacao e handoff' },
      { n: '07', title: 'Booking + CRM', desc: 'Qualification → calendario → reuniao → CRM. O vendedor recebe contexto completo.', deliverable: 'Processo de booking + handoff comercial' },
    ],
    doSay: ['"E um sistema, nao uma ferramenta"', '"Nos desenhamos, implementamos e operamos"', '"A AI trata da execucao; a estrategia e humana"'],
    dontSay: ['"E como ter um SDR virtual"', '"A AI faz tudo sozinha"', '"E plug-and-play"'],
    noteFields: [],
    transition: '"O que nao faz sentido e tentar construir tudo de uma vez. A minha sugestao e comecarmos com um piloto controlado..."',
  },

  /* ── 6. PILOTO GRATUITO ── */
  {
    id: 6, title: 'Free Pilot', time: '25-28 min',
    objective: 'Propor piloto 100% gratuito com entregaveis claros, metricas definidas, e baseline. Unica contrapartida: testemunho.',
    pilotScript: `"Pelo que estou a perceber, nao faz sentido comecarmos por tentar construir todo o vosso outbound de uma vez.\n\nA minha sugestao: piloto controlado. Escolhemos um ICP especifico, um volume definido de prospects, e construimos o processo desde sourcing ate reply handling, qualificacao e booking.\n\nAntes de comecar, definimos o que e uma reuniao qualificada e quais sao as metricas. No final, analisamos os resultados contra o vosso baseline e percebemos se existe evidencia suficiente para escalar.\n\nComo estou a validar este servico, assumo o custo da implementacao. Em troca, preciso da vossa colaboracao, acesso as ferramentas, e feedback honesto. E, se os resultados forem bons, gostava de usar o resultado como case study ou testemunho."`,
    baselineScript: '"Antes de avancar: como estao a gerar reunioes atualmente? Se contactam 1.000 prospects e geram 10 reunioes, o baseline e 1 reuniao por 100 prospects. O objetivo do piloto e comparar o processo atual com o que vamos implementar."',
    qualifiedMeetingDef: [
      'ICP fit (empresa corresponde aos criterios)',
      'Cargo relevante (decision maker ou influencer)',
      'Problema de negocio relevante identificado',
      'Interesse / intencao demonstrada',
      'Reuniao aceite',
    ],
    deliverables: [
      'ICP & Targeting Definition',
      'Prospecting System (sourcing + enrichment)',
      'AI Research & Personalisation',
      'Outbound Campaign (messaging + sequence)',
      'AI Reply Handling',
      'Qualification Logic',
      'Meeting Booking',
      'CRM / Sales Handoff',
      'Performance Dashboard / Report',
      'Final Pilot Review',
    ],
    metricsA: {
      title: 'A. Output — o que EU controlo',
      items: ['Prospects processados', 'Prospects enriquecidos', 'Prospects pesquisados', 'Mensagens personalizadas', 'Contactos enviados', 'Follow-ups executados', 'Respostas classificadas'],
    },
    metricsB: {
      title: 'B. Engagement — o que o mercado devolve',
      items: ['Reply rate', 'Positive reply rate', 'Qualified reply rate', 'Conversations started', 'Objections', 'Meetings requested'],
    },
    metricsC: {
      title: 'C. Commercial Outcome — resultado final',
      items: ['Reunioes qualificadas', 'Reunioes realizadas', 'Oportunidades criadas', 'Pipeline gerado/influenciado'],
      mainKpi: 'Qualified Meetings Generated',
    },
    successCriteria: [
      'Process viability — sistema executa de ponta a ponta sem intervencao manual constante',
      'Data quality — prospects cumprem criterios de ICP',
      'Engagement — existe resposta/interesse suficiente para validar o messaging',
      'Qualification — e possivel identificar prospects com fit/intencao',
      'Meeting generation — sistema gera reunioes qualificadas',
      'Commercial potential — resultados justificam expansao',
    ],
    notIncluded: [
      'Redesign completo da oferta',
      'Implementacao integral do CRM',
      'Gestao completa do sales process',
      'Closing das oportunidades',
      'Garantia de numero de clientes',
      'Garantia de receita',
    ],
    notIncludedScript: '"Se durante o piloto descobrirmos que o problema principal e oferta, ICP ou messaging, vamos identificar isso em vez de tentar resolver tudo com AI."',
    pilotBrief: [
      ['ICP', 'A definir'], ['Geography', 'A definir'], ['Titles', 'A definir'],
      ['Offer', 'A definir'], ['Prospect volume', 'A definir'], ['Data source', 'Apollo / Clay / etc.'],
      ['Outreach', 'Email / LinkedIn'], ['Sequence', 'A definir'], ['Follow-ups', 'A definir'],
      ['AI role', 'Research / Personalisation / Replies / Qualification'],
      ['Human role', 'Exceptions / Handoff / Meetings'],
      ['Pilot duration', '~30 dias*'], ['Qualified meeting def.', 'A definir'],
      ['Baseline', 'A definir'], ['KPIs', 'A definir'], ['Success criteria', 'A definir'],
      ['Final report', 'Sim'], ['Expansion decision', 'Sim'],
      ['Custo', 'EUR 0'], ['Contrapartida', 'Testemunho + case study'],
    ],
    commercialLadder: [
      'FREE PILOT → "Conseguimos executar."',
      '→ "Conseguimos gerar conversas."',
      '→ "Conseguimos gerar reunioes qualificadas."',
      '→ OUTBOUND AI SYSTEM (Setup + Infra + Operations + Optimisation)',
      '→ Expansao: Inbound Conversion + Lead Reactivation',
    ],
    dontDo: [
      'NAO mencionar precos ou servico pago',
      'NAO prometer numero de reunioes — definir success criteria',
      'NAO parecer desesperado — e uma troca justa de valor',
      'NAO definir duracao/volume antes de conhecer o stack',
    ],
    noteFields: ['ICP piloto', 'Baseline atual', 'Def. reuniao qualificada', 'Volume', 'Acesso necessario'],
  },

  /* ── 7. CLOSING ── */
  {
    id: 7, title: 'Closing', time: '28-30 min',
    objective: 'Fechar o piloto gratuito com proximos passos concretos. Preencher o Pilot Brief juntos.',
    strongFitScript: `"Entao vamos fazer assim: eu preparo o Pilot Brief completo — ICP, volume, canais, sequencia, metricas, success criteria — e envio-te. Tu validas e damos inicio.\n\nIsto e totalmente gratuito. O unico que te peco e colaboracao durante o processo e, se os resultados forem bons, um testemunho.\n\nDo teu lado preciso de [acesso X, informacao Y].\n\nFaz sentido?"`,
    confirmQuestions: [
      '"O ICP seria [X], correto?"',
      '"Em termos de volume, [Y] prospects?"',
      '"Precisava de acesso a [Z]. E possivel?"',
      '"Quando podemos comecar?"',
      '"Quem faria as reunioes geradas?"',
      '"O que e uma reuniao qualificada para voces?"',
      '"Qual e o vosso baseline atual? (prospects contactados vs reunioes)"',
    ],
    closeScript: '"Perfeito. Envio o Pilot Brief ate [dia]. Depois call de 15 min para validar e arrancamos."',
    potentialFitScript: '"Ha potencial, mas antes faz sentido [resolver X / definir melhor o ICP / afinar a oferta]. Envio-te um resumo e recomendacoes. Quando X estiver resolvido, lancamos o piloto."',
    poorFitScript: '"Quero ser honesto. Neste momento o principal desafio nao e outbound — e [oferta / ICP / pricing]. Se durante um piloto descobrissemos que o problema e oferta, iamos identificar isso em vez de tentar resolver com AI. Recomendo [accao]. Fico disponivel quando estiver resolvido."',
    emailTemplate: `Assunto: Free AI Outbound Pilot — Pilot Brief + proximos passos\n\nOla [nome],\n\nObrigado pela conversa. Aqui fica o resumo.\n\nO que percebi:\n[2-3 frases sobre negocio e processo]\n\nBottleneck identificado:\n[Bottleneck principal]\n\nBaseline atual:\n[X prospects → Y reunioes = Z%]\n\nFree Pilot proposto:\n- ICP: [segmento]\n- Volume: [X prospects]\n- Duracao: ~30 dias\n- Custo: EUR 0\n- Contrapartida: testemunho se resultados positivos\n\nEntregaveis:\n1. ICP & Targeting\n2. Prospecting System\n3. AI Research & Personalisation\n4. Outbound Campaign\n5. AI Reply Handling\n6. Qualification Logic\n7. Meeting Booking\n8. CRM / Sales Handoff\n9. Performance Report\n10. Final Pilot Review\n\nSuccess criteria:\n- Processo funciona de ponta a ponta\n- Existe engagement suficiente\n- Sistema gera reunioes qualificadas\n- Resultados justificam expansao\n\nProximos passos:\n1. Eu preparo o Pilot Brief completo (envio ate [dia])\n2. Tu validas\n3. Call de 15 min para alinhar\n4. Arrancamos\n\nAbraco,\n[nome]`,
    noteFields: ['Proximos passos', 'O que enviar', 'Ate quando', 'Proxima reuniao', 'Baseline'],
  },
]

const OBJECTIONS = [
  { obj: '"Ja usamos Apollo / Clay / Smartlead"', response: '"Otimo — ja tem parte da infra. A questao e o processo de ponta a ponta. Estao a usar [X]% das capacidades? O que acontece entre o Apollo e a reuniao marcada?"', dontSay: '"Essas ferramentas nao sao suficientes."' },
  { obj: '"Consigo fazer isto internamente"', response: '"Sem duvida. A questao e: tens tempo para desenhar, implementar, operar e optimizar enquanto geres o resto do negocio?"', dontSay: '"Nao consegues."' },
  { obj: '"AI ainda nao e boa o suficiente"', response: '"A AI nao substitui julgamento humano — trata das tarefas repetitivas. A estrategia continua humana. E no piloto, aprovas tudo antes de sair."', dontSay: '"A AI faz tudo melhor."' },
  { obj: '"Nao quero AI a falar com prospects"', response: '"Podemos configurar para que a AI trate do primeiro contacto e follow-up, mas qualquer interesse real e encaminhado para voces imediatamente."', dontSay: '"Ninguem vai notar."' },
  { obj: '"Nao quero perder controlo"', response: '"Controlo total e um requisito. Voces aprovam ICP, messaging, tom. Nada sai sem o vosso OK. Reporting de tudo."', dontSay: '"Confia em mim."' },
  { obj: '"Ja tentamos outbound e nao funcionou"', response: '"Onde falhou? Targeting? Messaging? Volume? Deliverability? Outbound sao 12 etapas — se uma falha, resultado e zero."', dontSay: '"Desta vez vai ser diferente."' },
  { obj: '"Quanto custa?"', response: '"O piloto e gratuito. Eu assumo tudo. O unico que te peco e um testemunho se os resultados forem bons. Zero risco do teu lado."', dontSay: 'Mencionar precos ou servico pago. O foco agora e so o piloto free.' },
  { obj: '"Porque nao contrato um SDR?"', response: '"Um SDR custa 2-4k/mes, demora 2-3 meses a rampear, faz 50-80 contactos/dia. O sistema faz centenas, 24/7. E nao e um vs outro — o SDR foca nas conversas de alto valor."', dontSay: '"SDRs sao inuteis."' },
  { obj: '"Nao quero compromisso"', response: '"E exactamente por isso que o piloto e gratuito e sem compromisso. Se no final nao gostares dos resultados, nao me deves nada. Nem o testemunho."', dontSay: '"Mas tens de te comprometer a X."' },
  { obj: '"Quero resultados imediatos"', response: '"Primeiras respostas na semana 2-3. Reunioes na semana 3-4. Resultados solidos a partir do mes 2. Se alguem promete resultados imediatos, desconfia."', dontSay: '"Amanha tens reunioes."' },
]

const REMEMBER_5 = [
  { rule: 'Ouvir 70%, falar 30%.', detail: 'Cada pergunta vale mais do que cada slide.' },
  { rule: 'Diagnosticar antes de prescrever.', detail: 'Nao apresentar solucao antes de perceber o problema.' },
  { rule: 'Quantificar o problema.', detail: '"Quanto vale um cliente?" + "Quantas reunioes marcam?" = impacto em euros.' },
  { rule: 'O objetivo e VENDER O PILOTO GRATUITO.', detail: 'Nao mencionar precos. Nao falar de servico pago. Piloto free → resultados → testemunho. E so isto.' },
  { rule: 'Proximos passos concretos.', detail: '"Vamos falando" = morto. Sempre: "Envio scope ate [dia]. Arrancamos [data]."' },
]

const ERRORS_3 = [
  { title: 'Solucao antes do problema', detail: 'Prospect diz "quero outbound" e eu salto para como funciona. Resultado: "vou pensar" e nunca mais responde.' },
  { title: 'Mencionar precos ou servico pago', detail: 'O objetivo e o piloto gratuito. Se ele perguntar de precos: "O piloto e gratis. Depois dos resultados decidimos juntos." Nao complicar.' },
  { title: 'Terminar sem next steps', detail: '"Manda-me proposta" sem contexto = morto. Sempre: "Envio scope ate [dia]. Arrancamos [data]."' },
]

const DECISION_TREE = [
  { problem: 'Data / Sourcing', questions: 'Onde encontram prospects? Como validam dados?', solution: 'Sourcing engine (Apollo + enrichment)' },
  { problem: 'Targeting / ICP', questions: 'Como definem quem contactar? Criterios escritos?', solution: 'ICP framework + scoring' },
  { problem: 'Enrichment', questions: 'Que info recolhem antes de contactar?', solution: 'Clay + AI research' },
  { problem: 'Messaging', questions: 'Mostrem os emails. Reply rate? Testam variantes?', solution: 'Copywriting + A/B + sequencias' },
  { problem: 'Deliverability', questions: 'Emails chegam ao inbox? SPF/DKIM? Warmup?', solution: 'Infra de email + dominios' },
  { problem: 'Follow-up', questions: 'Quantos touchpoints? Manual ou automatico?', solution: 'Sequencias automaticas' },
  { problem: 'Reply Handling', questions: 'Quando respondem, o que acontece? Quanto tempo?', solution: 'AI reply handling + routing' },
  { problem: 'Qualification', questions: 'Como sabem se tem potencial? Criterios?', solution: 'AI qualification + scoring' },
  { problem: 'Booking', questions: 'Como marcam reunioes? Quantas trocas?', solution: 'AI booking + calendar' },
  { problem: 'Oferta (RED FLAG)', questions: 'Oferta clara? Promessa? Prova? Diferenciacao?', solution: 'NAO vender AI. Fix da oferta primeiro.' },
]

const QUALIFICATION = {
  strong: [
    'ICP definido ou facil de definir', 'Ticket >= 3k EUR', 'Mercado > 5.000 prospects',
    'Decision maker na chamada', 'Capacidade de receber reunioes', 'Disposto a colaborar no piloto',
    'Oferta clara', 'Urgencia real',
  ],
  potential: [
    'ICP nao totalmente claro mas direccao existe', 'Ticket 1k-3k EUR',
    'Resultados mistos com outbound anterior', 'Oferta precisa de refinamento',
  ],
  poor: [
    'Nao sabe quem e o ICP', 'Ticket < 500 EUR', 'Quer spam em massa',
    'Sem capacidade para reunioes', 'Nao tem oferta definida', 'Espera resultados impossiveis',
  ],
}

/* ───────────────────────────── STYLES ───────────────────────────── */

const S = {
  page: { display: 'flex', minHeight: '100vh', fontFamily: "'Inter', 'Sora', -apple-system, sans-serif", background: '#0a1628', color: '#e2e8f0' },
  sidebar: { width: '260px', minWidth: '260px', background: '#0d1b2a', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 },
  sidebarHeader: { padding: '20px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  sidebarTitle: { fontSize: '15px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.02em' },
  sidebarSub: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' },
  timer: { padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '10px' },
  timerDisplay: { fontSize: '28px', fontWeight: 700, fontFamily: "'JetBrains Mono', 'SF Mono', monospace", color: '#60a5fa', letterSpacing: '0.02em' },
  timerBtn: { padding: '6px 12px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', background: '#1e3a5f', color: '#93c5fd', transition: 'background 0.15s' },
  navList: { flex: 1, padding: '8px 0', overflowY: 'auto' },
  navItem: (active) => ({ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 16px', cursor: 'pointer', background: active ? 'rgba(96,165,250,0.12)' : 'transparent', borderLeft: active ? '3px solid #60a5fa' : '3px solid transparent', transition: 'all 0.15s', fontSize: '13px', color: active ? '#93c5fd' : 'rgba(255,255,255,0.55)', fontWeight: active ? 600 : 400 }),
  navNum: (active) => ({ width: '22px', height: '22px', borderRadius: '50%', background: active ? '#60a5fa' : 'rgba(255,255,255,0.08)', color: active ? '#0d1b2a' : 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }),
  quickBtns: { padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: '6px' },
  quickBtn: (active) => ({ padding: '8px 12px', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', background: active ? '#1e40af' : '#1e293b', color: active ? '#93c5fd' : 'rgba(255,255,255,0.55)', textAlign: 'left', transition: 'all 0.15s' }),
  main: { flex: 1, padding: '32px 40px', overflowY: 'auto', maxWidth: '860px' },
  phaseHeader: { marginBottom: '24px' },
  phaseNum: { fontSize: '12px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' },
  phaseTitle: { fontSize: '26px', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.03em' },
  phaseTime: { fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '4px' },
  objective: { background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: '10px', padding: '14px 18px', marginBottom: '24px', fontSize: '14px', lineHeight: 1.7, color: 'rgba(255,255,255,0.75)' },
  section: { marginBottom: '20px' },
  sectionTitle: { fontSize: '12px', fontWeight: 700, color: '#60a5fa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' },
  scriptBox: { background: '#0f2035', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '16px 20px', fontSize: '14px', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', whiteSpace: 'pre-wrap', fontStyle: 'italic', borderLeft: '3px solid #60a5fa' },
  questionCard: { background: '#0f1d30', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 18px', marginBottom: '10px' },
  questionText: { fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '6px' },
  questionWhy: { fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '4px' },
  questionFollowUp: { fontSize: '12px', color: '#facc15', fontStyle: 'italic' },
  pill: (color) => ({ display: 'inline-flex', padding: '3px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: color === 'red' ? 'rgba(239,68,68,0.12)' : color === 'green' ? 'rgba(74,222,128,0.12)' : 'rgba(96,165,250,0.12)', color: color === 'red' ? '#ef4444' : color === 'green' ? '#4ade80' : '#60a5fa', marginRight: '6px', marginBottom: '4px' }),
  listItem: { fontSize: '13px', color: 'rgba(255,255,255,0.65)', padding: '3px 0', lineHeight: 1.6 },
  textarea: { width: '100%', background: '#0d1b2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '8px 12px', color: '#e2e8f0', fontSize: '13px', fontFamily: 'inherit', resize: 'vertical', minHeight: '32px', outline: 'none', transition: 'border-color 0.15s' },
  noteLabel: { fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', marginBottom: '3px', display: 'block' },
  noteRow: { marginBottom: '8px' },
  navBtns: { display: 'flex', gap: '12px', marginTop: '32px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' },
  navBtn: (primary) => ({ padding: '12px 24px', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', background: primary ? '#2563eb' : '#1e293b', color: primary ? '#fff' : 'rgba(255,255,255,0.55)', transition: 'all 0.15s', flex: primary ? 1 : 'none' }),
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '40px', overflowY: 'auto', backdropFilter: 'blur(4px)' },
  overlayContent: { background: '#0d1b2a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '28px', maxWidth: '720px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' },
  overlayClose: { position: 'absolute', top: '14px', right: '14px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '18px', cursor: 'pointer', padding: '4px 8px' },
  overlayTitle: { fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '16px' },
  processStep: { background: '#0f1d30', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 18px', marginBottom: '10px' },
  processStepTitle: { fontSize: '13px', fontWeight: 700, color: '#60a5fa', marginBottom: '6px' },
  diagnosisGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' },
  diagnosisItem: (sel) => ({ padding: '10px 14px', background: sel ? 'rgba(239,68,68,0.15)' : '#0f1d30', border: sel ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.06)', borderRadius: '8px', fontSize: '13px', color: sel ? '#fca5a5' : 'rgba(255,255,255,0.55)', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center', userSelect: 'none' }),
  objCard: { background: '#0f1d30', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '14px 18px', marginBottom: '8px', cursor: 'pointer' },
  treeRow: { display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontSize: '12px' },
}

/* ───────────────────────────── TIMER ───────────────────────────── */

function useTimer() {
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const toggle = useCallback(() => setRunning(r => !r), [])
  const reset = useCallback(() => { setRunning(false); setSeconds(0) }, [])
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return { display: `${mm}:${ss}`, running, toggle, reset, seconds }
}

/* ───────────────────────────── SHARED COMPONENTS ───────────────────────────── */

function Collapsible({ title, children, defaultOpen = true, color = '#60a5fa' }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={S.section}>
      <div style={{ ...S.sectionTitle, color }} onClick={() => setOpen(!open)}>
        <span style={{ fontSize: '10px', transition: 'transform 0.2s', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}>&#9654;</span>
        {title}
      </div>
      {open && children}
    </div>
  )
}

function NoteFields({ fields, notes, setNotes, phaseId }) {
  if (!fields || fields.length === 0) return null
  return (
    <Collapsible title="Notas">
      {fields.map((f, i) => (
        <div key={i} style={S.noteRow}>
          <label style={S.noteLabel}>{f}</label>
          <textarea
            style={S.textarea}
            rows={1}
            value={notes[`${phaseId}-${f}`] || ''}
            onChange={e => setNotes(prev => ({ ...prev, [`${phaseId}-${f}`]: e.target.value }))}
            onFocus={e => { e.target.style.borderColor = 'rgba(96,165,250,0.4)' }}
            onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)' }}
          />
        </div>
      ))}
    </Collapsible>
  )
}

/* ───────────────────────────── PHASE RENDERERS ───────────────────────────── */

function PhaseOpening({ phase, notes, setNotes }) {
  return (
    <>
      <Collapsible title="Script de Abertura">
        <div style={S.scriptBox}>{phase.script}</div>
      </Collapsible>
      <Collapsible title={phase.variant.label} defaultOpen={false}>
        <div style={S.scriptBox}>{phase.variant.text}</div>
      </Collapsible>
      <Collapsible title="Nao fazer" defaultOpen={false} color="#ef4444">
        {phase.dontDo.map((d, i) => <div key={i} style={{ ...S.listItem, color: '#fca5a5' }}>{d}</div>)}
      </Collapsible>
      <Collapsible title="Transicao">
        <div style={S.scriptBox}>{phase.transition}</div>
      </Collapsible>
    </>
  )
}

function PhaseQuestions({ phase, notes, setNotes }) {
  return (
    <>
      <Collapsible title="Perguntas">
        {phase.questions.map((q, i) => (
          <div key={i} style={S.questionCard}>
            <div style={S.questionText}>{q.q}</div>
            <div style={S.questionWhy}>{q.why}</div>
            {q.followUp && <div style={S.questionFollowUp}>↳ {q.followUp}</div>}
          </div>
        ))}
      </Collapsible>
      {phase.listenFor && (
        <Collapsible title="O que ouvir" defaultOpen={false} color="#4ade80">
          {phase.listenFor.map((l, i) => <div key={i} style={S.listItem}>{l}</div>)}
        </Collapsible>
      )}
      {phase.redFlags && (
        <Collapsible title="Red Flags" defaultOpen={false} color="#ef4444">
          {phase.redFlags.map((r, i) => <div key={i} style={{ ...S.listItem, color: '#fca5a5' }}>{r}</div>)}
        </Collapsible>
      )}
      {phase.transition && (
        <Collapsible title="Transicao" defaultOpen={false}>
          <div style={S.scriptBox}>{phase.transition}</div>
        </Collapsible>
      )}
      <NoteFields fields={phase.noteFields} notes={notes} setNotes={setNotes} phaseId={phase.id} />
    </>
  )
}

function PhaseProcess({ phase, notes, setNotes }) {
  return (
    <>
      <Collapsible title="Pergunta Principal">
        <div style={S.scriptBox}>{phase.mainQuestion}</div>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>{phase.mainNote}</div>
      </Collapsible>
      <Collapsible title="Mapeamento do Processo">
        {phase.processSteps.map((ps, i) => (
          <div key={i} style={S.processStep}>
            <div style={S.processStepTitle}>{i + 1}. {ps.step}</div>
            {ps.questions.map((q, j) => <div key={j} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)', padding: '2px 0' }}>{q}</div>)}
            <div style={{ marginTop: '6px', fontSize: '11px' }}>
              <span style={S.pill('green')}>Sinal</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{ps.signal}</span>
            </div>
          </div>
        ))}
      </Collapsible>
      <Collapsible title="Sondagem por Ferramenta" defaultOpen={false}>
        {phase.toolProbes.map((tp, i) => (
          <div key={i} style={S.processStep}>
            <div style={S.processStepTitle}>{tp.tool}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.65)' }}>{tp.ask}</div>
            {tp.lookFor && <div style={{ marginTop: '4px', fontSize: '11px', color: '#facc15' }}>{tp.lookFor}</div>}
          </div>
        ))}
        <div style={{ marginTop: '10px', padding: '10px 14px', background: 'rgba(250,204,21,0.06)', borderRadius: '8px', border: '1px solid rgba(250,204,21,0.12)' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#facc15', marginBottom: '4px' }}>PRINCIPIO</div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>{phase.principle}</div>
        </div>
      </Collapsible>
      <NoteFields fields={phase.noteFields} notes={notes} setNotes={setNotes} phaseId={phase.id} />
      <Collapsible title="Transicao" defaultOpen={false}>
        <div style={S.scriptBox}>{phase.transition}</div>
      </Collapsible>
    </>
  )
}

function PhaseMetrics({ phase, notes, setNotes }) {
  const [selected, setSelected] = useState([])
  const toggle = (a) => setSelected(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a])

  return (
    <>
      <Collapsible title="Perguntas de Metricas">
        {phase.metricsQuestions.map((mq, i) => (
          <div key={i} style={S.questionCard}>
            <div style={S.questionText}>{mq.q}</div>
            <div style={S.questionWhy}>{mq.note}</div>
          </div>
        ))}
      </Collapsible>
      <Collapsible title="Formula Rapida" defaultOpen={false} color="#facc15">
        <div style={{ ...S.scriptBox, fontStyle: 'normal', fontFamily: "'JetBrains Mono', monospace", fontSize: '12px' }}>{phase.formula}</div>
      </Collapsible>
      <Collapsible title="Bottleneck — clica nos problemas">
        <div style={S.diagnosisGrid}>
          {phase.diagnosisAreas.map((a, i) => (
            <div key={i} style={S.diagnosisItem(selected.includes(a))} onClick={() => toggle(a)}>
              {a}
            </div>
          ))}
        </div>
        {selected.length > 0 && (
          <div style={{ marginTop: '10px', fontSize: '13px', color: '#fca5a5' }}>
            Bottlenecks: {selected.join(', ')}
          </div>
        )}
      </Collapsible>
      <NoteFields fields={phase.noteFields} notes={notes} setNotes={setNotes} phaseId={phase.id} />
      <Collapsible title="Transicao" defaultOpen={false}>
        <div style={S.scriptBox}>{phase.transition}</div>
      </Collapsible>
    </>
  )
}

function PhaseSolution({ phase, notes, setNotes }) {
  return (
    <>
      <Collapsible title="Resumo (confirmar com o prospect)">
        <div style={S.scriptBox}>{phase.transitionScript}</div>
        <div style={{ fontSize: '12px', color: '#facc15', marginTop: '8px', fontWeight: 600 }}>{phase.pauseNote}</div>
      </Collapsible>
      <Collapsible title="O Sistema">
        <div style={{ background: '#0f2035', border: '1px solid rgba(96,165,250,0.15)', borderRadius: '10px', padding: '16px 20px', fontSize: '13px', color: '#93c5fd', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.01em' }}>
          {phase.systemFlow}
        </div>
      </Collapsible>
      <Collapsible title="7 Blocos de Trabalho" defaultOpen={false}>
        {phase.workBlocks.map((b, i) => (
          <div key={i} style={S.processStep}>
            <div style={S.processStepTitle}>{b.n} — {b.title}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '6px' }}>{b.desc}</div>
            <div style={{ fontSize: '11px' }}>
              <span style={S.pill('blue')}>Entrega</span>
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>{b.deliverable}</span>
            </div>
          </div>
        ))}
      </Collapsible>
      <Collapsible title="Dizer vs Nao Dizer" defaultOpen={false}>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#4ade80', marginBottom: '4px' }}>DIZER:</div>
          {phase.doSay.map((d, i) => <div key={i} style={{ ...S.listItem, color: '#86efac' }}>{d}</div>)}
        </div>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, color: '#ef4444', marginBottom: '4px' }}>NAO DIZER:</div>
          {phase.dontSay.map((d, i) => <div key={i} style={{ ...S.listItem, color: '#fca5a5' }}>{d}</div>)}
        </div>
      </Collapsible>
      <Collapsible title="Transicao" defaultOpen={false}>
        <div style={S.scriptBox}>{phase.transition}</div>
      </Collapsible>
    </>
  )
}

function PhasePilot({ phase, notes, setNotes }) {
  return (
    <>
      <Collapsible title="Script — Free Pilot">
        <div style={S.scriptBox}>{phase.pilotScript}</div>
      </Collapsible>

      <Collapsible title="Baseline (perguntar ANTES)" color="#facc15">
        <div style={S.scriptBox}>{phase.baselineScript}</div>
      </Collapsible>

      <Collapsible title="Definir: Reuniao Qualificada" defaultOpen={false}>
        <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '8px' }}>Definir ANTES de comecar. Se nao, ele pode dizer "estas reunioes nao contam".</div>
        {phase.qualifiedMeetingDef.map((d, i) => (
          <div key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', padding: '3px 0' }}>+ {d}</div>
        ))}
      </Collapsible>

      <Collapsible title="10 Entregaveis do Piloto" defaultOpen={false}>
        {phase.deliverables.map((d, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px', padding: '5px 0', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
            <span style={{ color: '#60a5fa', fontWeight: 700, minWidth: '20px' }}>{i + 1}.</span>{d}
          </div>
        ))}
      </Collapsible>

      <Collapsible title="Metricas (3 niveis)" defaultOpen={false}>
        {[phase.metricsA, phase.metricsB, phase.metricsC].map((m, idx) => (
          <div key={idx} style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: idx === 0 ? '#60a5fa' : idx === 1 ? '#facc15' : '#4ade80', marginBottom: '6px' }}>{m.title}</div>
            {m.items.map((item, i) => <div key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', padding: '2px 0 2px 12px' }}>{item}</div>)}
            {m.mainKpi && (
              <div style={{ marginTop: '6px', padding: '8px 12px', background: 'rgba(74,222,128,0.08)', borderRadius: '6px', border: '1px solid rgba(74,222,128,0.15)', fontSize: '13px', fontWeight: 700, color: '#4ade80' }}>
                KPI principal: {m.mainKpi}
              </div>
            )}
          </div>
        ))}
      </Collapsible>

      <Collapsible title="Success Criteria" defaultOpen={false} color="#4ade80">
        {phase.successCriteria.map((c, i) => (
          <div key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
            <span style={{ color: '#4ade80', marginRight: '8px' }}>{i + 1}.</span>{c}
          </div>
        ))}
      </Collapsible>

      <Collapsible title="O que NAO esta incluido" defaultOpen={false} color="#ef4444">
        {phase.notIncluded.map((n, i) => <div key={i} style={{ ...S.listItem, color: '#fca5a5' }}>- {n}</div>)}
        <div style={{ ...S.scriptBox, marginTop: '10px' }}>{phase.notIncludedScript}</div>
      </Collapsible>

      <Collapsible title="Pilot Brief (preencher na reuniao)" defaultOpen={false}>
        <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', overflow: 'hidden' }}>
          {phase.pilotBrief.map(([label, val], i) => {
            const highlight = label === 'Custo' || label === 'Contrapartida'
            return (
              <div key={i} style={{ display: 'flex', borderBottom: i < phase.pilotBrief.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <div style={{ minWidth: '160px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, color: highlight ? '#4ade80' : '#60a5fa', background: 'rgba(255,255,255,0.02)' }}>{label}</div>
                <div style={{ padding: '6px 12px', fontSize: '12px', color: highlight ? '#86efac' : 'rgba(255,255,255,0.55)', fontWeight: highlight ? 700 : 400 }}>{val}</div>
              </div>
            )
          })}
        </div>
      </Collapsible>

      <Collapsible title="Escada Comercial (contexto interno)" defaultOpen={false}>
        {phase.commercialLadder.map((s, i) => (
          <div key={i} style={{ fontSize: '13px', color: i === 0 ? '#4ade80' : i === phase.commercialLadder.length - 1 ? '#facc15' : 'rgba(255,255,255,0.6)', padding: '4px 0', fontWeight: i === 0 || i === 3 ? 700 : 400 }}>{s}</div>
        ))}
      </Collapsible>

      <Collapsible title="NAO fazer" defaultOpen={false} color="#ef4444">
        {phase.dontDo.map((d, i) => <div key={i} style={{ ...S.listItem, color: '#fca5a5' }}>{d}</div>)}
      </Collapsible>

      <NoteFields fields={phase.noteFields} notes={notes} setNotes={setNotes} phaseId={phase.id} />
    </>
  )
}

function PhaseClosing({ phase, notes, setNotes }) {
  return (
    <>
      <Collapsible title="Strong Fit">
        <div style={S.scriptBox}>{phase.strongFitScript}</div>
        <div style={{ marginTop: '12px' }}>
          {phase.confirmQuestions.map((q, i) => <div key={i} style={{ ...S.listItem, padding: '4px 0' }}>{q}</div>)}
        </div>
        <div style={{ ...S.scriptBox, marginTop: '12px' }}>{phase.closeScript}</div>
      </Collapsible>
      <Collapsible title="Potential Fit" defaultOpen={false} color="#facc15">
        <div style={S.scriptBox}>{phase.potentialFitScript}</div>
      </Collapsible>
      <Collapsible title="Poor Fit" defaultOpen={false} color="#ef4444">
        <div style={S.scriptBox}>{phase.poorFitScript}</div>
      </Collapsible>
      <Collapsible title="Email de Follow-up" defaultOpen={false}>
        <div style={{ ...S.scriptBox, fontStyle: 'normal' }}>{phase.emailTemplate}</div>
      </Collapsible>
      <NoteFields fields={phase.noteFields} notes={notes} setNotes={setNotes} phaseId={phase.id} />
    </>
  )
}

const PHASE_COMPONENTS = {
  1: PhaseOpening,
  2: PhaseQuestions,
  3: PhaseProcess,
  4: PhaseMetrics,
  5: PhaseSolution,
  6: PhasePilot,
  7: PhaseClosing,
}

/* ───────────────────────────── OVERLAY PANELS ───────────────────────────── */

function CheatSheetPanel({ onClose }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.overlayContent} onClick={e => e.stopPropagation()}>
        <button style={S.overlayClose} onClick={onClose}>✕</button>
        <div style={S.overlayTitle}>Cheat Sheet</div>
        {CHEAT_SHEET.map(r => (
          <div key={r.n} style={{ display: 'flex', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ ...S.navNum(false), flexShrink: 0 }}>{r.n}</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#60a5fa', marginBottom: '2px' }}>{r.phase}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.55)' }}>{r.keys}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ObjectionsPanel({ onClose }) {
  const [openIdx, setOpenIdx] = useState(-1)
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.overlayContent} onClick={e => e.stopPropagation()}>
        <button style={S.overlayClose} onClick={onClose}>✕</button>
        <div style={S.overlayTitle}>Objecoes</div>
        {OBJECTIONS.map((o, i) => (
          <div key={i} style={S.objCard} onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginBottom: openIdx === i ? '8px' : 0 }}>{o.obj}</div>
            {openIdx === i && (
              <>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '6px' }}>{o.response}</div>
                <div style={{ fontSize: '11px', color: '#ef4444' }}>Nao dizer: {o.dontSay}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function TreePanel({ onClose }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.overlayContent} onClick={e => e.stopPropagation()}>
        <button style={S.overlayClose} onClick={onClose}>✕</button>
        <div style={S.overlayTitle}>Arvore de Decisao</div>
        <div style={{ ...S.treeRow, borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
          <div style={{ color: '#60a5fa', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>Problema</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', textTransform: 'uppercase' }}>Perguntas</div>
          <div style={{ color: '#4ade80', fontSize: '11px', textTransform: 'uppercase' }}>Solucao</div>
        </div>
        {DECISION_TREE.map((d, i) => (
          <div key={i} style={S.treeRow}>
            <div style={{ color: '#60a5fa', fontWeight: 600 }}>{d.problem}</div>
            <div style={{ color: 'rgba(255,255,255,0.55)' }}>{d.questions}</div>
            <div style={{ color: '#4ade80' }}>{d.solution}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RememberPanel({ onClose }) {
  return (
    <div style={S.overlay} onClick={onClose}>
      <div style={S.overlayContent} onClick={e => e.stopPropagation()}>
        <button style={S.overlayClose} onClick={onClose}>✕</button>
        <div style={S.overlayTitle}>5 Regras</div>
        {REMEMBER_5.map((r, i) => (
          <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600 }}><span style={{ color: '#60a5fa', marginRight: '8px' }}>{i + 1}.</span>{r.rule}</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{r.detail}</div>
          </div>
        ))}
        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#ef4444', marginBottom: '12px' }}>3 Erros a Evitar</div>
          {ERRORS_3.map((e, i) => (
            <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#fca5a5' }}>{i + 1}. {e.title}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{e.detail}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>Qualification</div>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#4ade80', marginBottom: '6px' }}>STRONG FIT</div>
            {QUALIFICATION.strong.map((f, i) => <div key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', padding: '2px 0' }}>+ {f}</div>)}
          </div>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#facc15', marginBottom: '6px' }}>POTENTIAL FIT</div>
            {QUALIFICATION.potential.map((f, i) => <div key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', padding: '2px 0' }}>~ {f}</div>)}
          </div>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', marginBottom: '6px' }}>POOR FIT</div>
            {QUALIFICATION.poor.map((f, i) => <div key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', padding: '2px 0' }}>- {f}</div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────────── MAIN PAGE ───────────────────────────── */

export default function CopilotPage() {
  const [activePhase, setActivePhase] = useState(0)
  const [notes, setNotes] = useState({})
  const [overlay, setOverlay] = useState(null)
  const timer = useTimer()
  const mainRef = useRef(null)

  const phase = PHASES[activePhase]
  const PhaseComponent = PHASE_COMPONENTS[phase.id]

  const goTo = (idx) => {
    setActivePhase(idx)
    if (mainRef.current) mainRef.current.scrollTop = 0
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); goTo(Math.min(activePhase + 1, PHASES.length - 1)) }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo(Math.max(activePhase - 1, 0)) }
      if (e.key === ' ') { e.preventDefault(); timer.toggle() }
      if (e.key === '1') setOverlay(o => o === 'cheat' ? null : 'cheat')
      if (e.key === '2') setOverlay(o => o === 'obj' ? null : 'obj')
      if (e.key === '3') setOverlay(o => o === 'tree' ? null : 'tree')
      if (e.key === '4') setOverlay(o => o === 'remember' ? null : 'remember')
      if (e.key === 'Escape') setOverlay(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activePhase, timer.toggle])

  const timerColor = timer.seconds > 1800 ? '#ef4444' : timer.seconds > 1500 ? '#facc15' : '#60a5fa'

  return (
    <div style={S.page}>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={S.sidebarHeader}>
          <h1 style={S.sidebarTitle}>Meeting Copilot</h1>
          <p style={S.sidebarSub}>Outbound Discovery | 30 min</p>
        </div>

        <div style={S.timer}>
          <span style={{ ...S.timerDisplay, color: timerColor }}>{timer.display}</span>
          <button style={S.timerBtn} onClick={timer.toggle}>{timer.running ? '||' : '▶'}</button>
          <button style={{ ...S.timerBtn, background: '#1e293b', color: 'rgba(255,255,255,0.4)' }} onClick={timer.reset}>↺</button>
        </div>

        <div style={S.navList}>
          {PHASES.map((p, i) => (
            <div key={p.id} style={S.navItem(i === activePhase)} onClick={() => goTo(i)}>
              <span style={S.navNum(i === activePhase)}>{p.id}</span>
              <div>
                <div>{p.title}</div>
                {p.time && <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', marginTop: '1px' }}>{p.time}</div>}
              </div>
            </div>
          ))}
        </div>

        <div style={S.quickBtns}>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2px' }}>Acesso rapido (1-4)</div>
          <button style={S.quickBtn(overlay === 'cheat')} onClick={() => setOverlay(overlay === 'cheat' ? null : 'cheat')}>1 · Cheat Sheet</button>
          <button style={S.quickBtn(overlay === 'obj')} onClick={() => setOverlay(overlay === 'obj' ? null : 'obj')}>2 · Objecoes</button>
          <button style={S.quickBtn(overlay === 'tree')} onClick={() => setOverlay(overlay === 'tree' ? null : 'tree')}>3 · Arvore de Decisao</button>
          <button style={S.quickBtn(overlay === 'remember')} onClick={() => setOverlay(overlay === 'remember' ? null : 'remember')}>4 · Regras & Qualification</button>
        </div>
      </aside>

      {/* Main */}
      <main style={S.main} ref={mainRef}>
        <div style={S.phaseHeader}>
          <div style={S.phaseNum}>Fase {phase.id} de {PHASES.length}</div>
          <h2 style={S.phaseTitle}>{phase.title}</h2>
          {phase.time && <div style={S.phaseTime}>{phase.time}</div>}
        </div>

        <div style={S.objective}>{phase.objective}</div>

        <PhaseComponent phase={phase} notes={notes} setNotes={setNotes} />

        <div style={S.navBtns}>
          {activePhase > 0 && (
            <button style={S.navBtn(false)} onClick={() => goTo(activePhase - 1)}>← Anterior</button>
          )}
          {activePhase < PHASES.length - 1 && (
            <button style={S.navBtn(true)} onClick={() => goTo(activePhase + 1)}>Proxima Fase →</button>
          )}
        </div>
      </main>

      {overlay === 'cheat' && <CheatSheetPanel onClose={() => setOverlay(null)} />}
      {overlay === 'obj' && <ObjectionsPanel onClose={() => setOverlay(null)} />}
      {overlay === 'tree' && <TreePanel onClose={() => setOverlay(null)} />}
      {overlay === 'remember' && <RememberPanel onClose={() => setOverlay(null)} />}
    </div>
  )
}
