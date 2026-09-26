/* ── Roadmap Content Templates ──
   Fixed content for each of the 4 roadmap types.
   Used by the results page and PDF generation. */

export const PROFILE_SUMMARY = {
  low:  'O seu processo de conversão tem uma base sólida. Existem ajustes pontuais que podem aumentar a eficiência.',
  mid:  'Existem oportunidades claras de melhoria no seu processo de conversão. Pequenas mudanças podem ter um impacto significativo nos resultados.',
  high: 'O seu processo de conversão tem lacunas importantes. A boa notícia: o potencial de melhoria é elevado.',
}

export function getProfileLevel(total) {
  if (total <= 6) return 'low'
  if (total <= 13) return 'mid'
  return 'high'
}

export const ROADMAP_TEMPLATES = {
  response: {
    title: 'Velocidade de Resposta',
    subtitle: 'O tempo entre a entrada do lead e o primeiro contacto é o seu principal ponto de oportunidade.',
    insight: {
      stat: '21x',
      text: 'Empresas que contactam um lead nos primeiros 5 minutos têm 21x mais probabilidade de o qualificar do que se esperarem 30 minutos.',
      source: 'Lead Response Management Study',
    },
    problem: 'Quando um potencial cliente mostra interesse, cada minuto que passa sem resposta reduz drasticamente a probabilidade de conversão. Se a sua equipa demora mais de 30 minutos a responder, está a perder oportunidades para concorrentes mais rápidos.',
    actions: [
      {
        title: 'Notificações em tempo real',
        desc: 'Configure alertas instantâneos (email, SMS, Slack) para cada novo lead. O responsável deve ser notificado nos primeiros 60 segundos.',
      },
      {
        title: 'Templates de resposta rápida',
        desc: 'Prepare 3-5 templates para os cenários mais comuns que permitam responder em menos de 2 minutos, sem comprometer a personalização.',
      },
      {
        title: 'SLA de resposta definido',
        desc: 'Estabeleça como regra: todo o lead recebe uma resposta em menos de 5 minutos em horário útil. Meça e monitorize.',
      },
      {
        title: 'Responsabilidade clara',
        desc: 'Defina quem é o responsável pelo primeiro contacto em cada momento do dia. Sem dono, não há urgência.',
      },
      {
        title: 'Primeiro touchpoint automatizado',
        desc: 'Configure uma resposta automática personalizada que confirma a receção enquanto a equipa prepara o contacto humano.',
      },
    ],
    metrics: [
      { label: 'Tempo médio de resposta', current: '> 30 min', target: '< 5 min' },
      { label: 'Taxa de contacto no mesmo dia', current: '~60%', target: '> 95%' },
      { label: 'Conversão lead \u2192 conversa', current: 'Baseline', target: '+30-50%' },
    ],
  },

  followup: {
    title: 'Sequência de Follow-up',
    subtitle: 'A forma como acompanha os leads depois do primeiro contacto é o seu principal ponto de oportunidade.',
    insight: {
      stat: '80%',
      text: '80% das vendas requerem pelo menos 5 follow-ups, mas 44% dos vendedores desistem depois do primeiro contacto.',
      source: 'Marketing Donut',
    },
    problem: 'A maioria dos leads não responde ao primeiro contacto. Isto não significa que não têm interesse \u2014 significa que estão ocupados ou ainda não estão prontos. Sem uma sequência estruturada de follow-up, está a desistir de leads que poderiam converter.',
    actions: [
      {
        title: 'Sequência de 4-5 touchpoints',
        desc: 'Defina uma cadência estruturada com intervalos definidos: Dia 0, Dia 2, Dia 5, Dia 9, Dia 14.',
      },
      {
        title: 'Variar canal e mensagem',
        desc: 'Alterne entre email, telefone e LinkedIn. Cada touchpoint deve trazer um ângulo ou valor diferente.',
      },
      {
        title: 'Valor em cada contacto',
        desc: 'Partilhe um insight, caso de estudo, ou perspetiva relevante. Nunca envie "só para fazer follow-up".',
      },
      {
        title: 'Lembretes automáticos',
        desc: 'Use o CRM para criar tarefas automáticas de follow-up. Nenhum lead deve ser esquecido por falta de lembrete.',
      },
      {
        title: 'Critérios de "lead frio"',
        desc: 'Após a sequência completa sem resposta, mova o lead para nurturing em vez de o eliminar. Pode reativar mais tarde.',
      },
    ],
    metrics: [
      { label: 'Taxa de resposta após sequência', current: '~10%', target: '25-40%' },
      { label: 'Touchpoints antes da resposta', current: '1', target: '3-4' },
      { label: 'Leads perdidos por falta de follow-up', current: 'Desconhecido', target: '0' },
    ],
  },

  qualification: {
    title: 'Qualificação de Leads',
    subtitle: 'A consistência com que qualifica leads antes da reunião é o seu principal ponto de oportunidade.',
    insight: {
      stat: '3x',
      text: 'Vendedores que qualificam antes da reunião têm uma taxa de fecho 3x superior e reduzem reuniões sem resultado em 60%.',
      source: 'Gartner',
    },
    problem: 'Quando leads não qualificados chegam a reuniões, desperdiçam o tempo da equipa comercial. Sem critérios claros, a equipa marca reuniões com qualquer lead que mostre interesse, resultando em reuniões improdutivas e ciclos de venda longos.',
    actions: [
      {
        title: 'Definir 5-7 critérios de qualificação',
        desc: 'Budget, autoridade de decisão, necessidade real, timeline, e fit com o seu perfil ideal de cliente.',
      },
      {
        title: 'Scorecard simples',
        desc: 'Crie um formulário de 5 perguntas que qualquer membro da equipa pode usar para avaliar um lead em menos de 10 minutos.',
      },
      {
        title: 'Gate antes da reunião',
        desc: 'Nenhuma reunião é marcada sem o lead passar pelo processo de qualificação. Isto protege o tempo da equipa.',
      },
      {
        title: 'Perguntas de discovery',
        desc: 'Prepare um guião com as perguntas certas para identificar fit rapidamente, sem parecer um interrogatório.',
      },
      {
        title: 'Classificação A/B/C',
        desc: 'Use um sistema de prioridade para alocar o tempo da equipa aos leads com maior potencial de fecho.',
      },
    ],
    metrics: [
      { label: 'Taxa de fecho (leads qualificados)', current: 'Baseline', target: '> 30%' },
      { label: 'Reuniões sem resultado', current: '~50-60%', target: '< 20%' },
      { label: 'Tempo de qualificação', current: 'Variável', target: '< 10 min' },
    ],
  },

  leadToMeeting: {
    title: 'Conversão Lead \u2192 Reunião',
    subtitle: 'A passagem de leads qualificados para reuniões agendadas é o seu principal ponto de oportunidade.',
    insight: {
      stat: '150%',
      text: 'Reduzir o número de passos entre "interesse" e "reunião marcada" pode aumentar a taxa de agendamento em até 150%.',
      source: 'Chili Piper',
    },
    problem: 'Mesmo com leads qualificados e interessados, o processo de marcar uma reunião tem demasiada fricção. Vai-e-vem de emails, falta de disponibilidade visível, e propostas no momento errado fazem com que leads quentes arrefeçam.',
    actions: [
      {
        title: 'Calendário online',
        desc: 'Use Calendly ou HubSpot Meetings para eliminar o vai-e-vem de agendamento. O lead escolhe o horário diretamente.',
      },
      {
        title: 'Timing da proposta',
        desc: 'Após 2-3 sinais de interesse, faça a proposta de reunião. Não espere demasiado (arrefece) nem force cedo demais (pressiona).',
      },
      {
        title: 'Proposta de valor clara',
        desc: '"15 minutos para analisar o seu processo de conversão" é melhor do que "vamos falar sobre os nossos serviços".',
      },
      {
        title: 'Confirmação + reminders automáticos',
        desc: 'Email de confirmação imediato + reminder 24h antes + reminder 1h antes. Reduz no-shows drasticamente.',
      },
      {
        title: 'Reagendamento fácil',
        desc: 'Inclua opção de reagendar com um clique. Melhor reagendar do que não aparecer.',
      },
    ],
    metrics: [
      { label: 'Taxa de agendamento', current: 'Baseline', target: '> 40%' },
      { label: 'No-show rate', current: '~25-30%', target: '< 15%' },
      { label: 'Tempo até reunião', current: 'Variável', target: '< 72 horas' },
    ],
  },
}

export const DIM_LABELS = {
  response:      'Velocidade de resposta',
  followup:      'Follow-up',
  qualification: 'Qualificação',
  leadToMeeting: 'Conversão Lead \u2192 Reunião',
  consistency:   'Consistência do processo',
}

export const PRIORITY_LABELS = {
  response:      'Melhorar a velocidade de resposta',
  followup:      'Criar uma sequência estruturada de follow-up',
  qualification: 'Definir critérios de qualificação claros',
  leadToMeeting: 'Medir e melhorar a conversão Lead \u2192 Reunião',
  consistency:   'Definir um processo e responsável claro',
}
