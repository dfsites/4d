export const dimensions = [
  {
    num: '01',
    name: 'Descobrir',
    lead: 'Compreender antes de agir.',
    text: 'A dimensão do diagnóstico: entender o contexto, a situação atual, as necessidades, os problemas, as oportunidades e o potencial disponível.',
    keywords: ['contexto', 'situação atual', 'necessidades', 'problemas', 'oportunidades', 'potencial'],
    applied: {
      pessoas: 'Autoconhecimento, momento de vida e de carreira, pontos fortes e lacunas.',
      projetos: 'Público, problema a resolver, conhecimento disponível e referências.',
      organizacoes: 'A organização, seus públicos, sua situação atual, necessidades e oportunidades.',
    },
  },
  {
    num: '02',
    name: 'Decidir',
    lead: 'Transformar compreensão em direção.',
    text: 'Definir objetivos, prioridades e escolhas. É onde a estratégia, o planejamento e o posicionamento ganham forma.',
    keywords: ['objetivos', 'prioridades', 'escolhas', 'estratégia', 'planejamento', 'posicionamento'],
    applied: {
      pessoas: 'Metas, prioridades e um plano de desenvolvimento realista.',
      projetos: 'Proposta, formato, escopo e posicionamento do produto ou curso.',
      organizacoes: 'Posicionamento, estratégia, prioridades, canais e soluções a desenvolver.',
    },
  },
  {
    num: '03',
    name: 'Desenvolver',
    lead: 'Construir capacidade.',
    text: 'Desenvolver conhecimento, habilidades e competências — e também produtos, soluções, metodologias e tecnologia que sustentam a execução.',
    keywords: ['conhecimento', 'habilidades', 'competências', 'produtos', 'soluções', 'metodologias', 'tecnologia'],
    applied: {
      pessoas: 'Estudo, prática, hábitos e competências aplicadas ao dia a dia.',
      projetos: 'Conteúdo, metodologia, materiais, plataforma e experiência de aprendizagem.',
      organizacoes: 'Identidade, conteúdo, site, plataforma, aplicativo, automação ou capacitação.',
    },
  },
  {
    num: '04',
    name: 'Destacar',
    lead: 'Aplicar e evoluir.',
    text: 'Colocar em prática o que foi desenvolvido para gerar diferenciação, posicionamento, impacto e evolução contínua.',
    keywords: ['diferenciação', 'evolução', 'posicionamento', 'impacto', 'reconhecimento', 'resultados'],
    applied: {
      pessoas: 'Aplicação consistente, posicionamento profissional e evolução contínua.',
      projetos: 'Lançamento, uso real, aprendizado com o público e melhoria contínua.',
      organizacoes: 'Solução em operação, comunicação mais clara, presença e engajamento.',
    },
  },
];

export const appliedColumns = [
  { key: 'pessoas', label: 'Pessoas e profissionais' },
  { key: 'projetos', label: 'Produtos e projetos educacionais' },
  { key: 'organizacoes', label: 'Organizações' },
];

export const axes = [
  {
    num: 'Eixo 1',
    title: 'Educação e desenvolvimento',
    text: 'Experiências de aprendizagem para desenvolver pessoas e profissionais, do conteúdo à aplicação.',
    items: ['Cursos', 'Treinamentos', 'Mentorias', 'Workshops e palestras', 'Trilhas de aprendizagem',
      'Conteúdos e metodologias', 'Capacitação', 'Gamificação aplicada à aprendizagem'],
  },
  {
    num: 'Eixo 2',
    title: 'Soluções digitais e organizacionais',
    text: 'Estruturas digitais, institucionais e de posicionamento para pessoas e organizações.',
    items: ['Identidade e posicionamento', 'Presença institucional', 'Sites e plataformas',
      'Aplicativos e ferramentas', 'Automações e integrações', 'Estruturação de conteúdo e comunicação',
      'Produtos digitais', 'Soluções sob medida'],
  },
];

export const fronts = [
  {
    name: 'Identidade e posicionamento',
    text: 'Marca, identidade visual, linguagem e apresentação institucional coerentes com o que a organização é.',
  },
  {
    name: 'Presença digital',
    text: 'Sites, páginas institucionais, plataformas e ecossistemas digitais próprios.',
  },
  {
    name: 'Conteúdo e comunicação',
    text: 'Estruturação da comunicação, dos materiais e da linha editorial, incluindo a organização de canais e redes sociais quando fizer parte do projeto.',
  },
  {
    name: 'Tecnologia e automação',
    text: 'Aplicativos, ferramentas, integrações, automações e sistemas para necessidades específicas.',
  },
  {
    name: 'Educação e engajamento',
    text: 'Cursos, trilhas, treinamentos, gamificação e experiências de aprendizagem para os públicos da organização.',
  },
];

export const segments = [
  {
    name: 'Igrejas e comunidades',
    text: 'Comunicação, presença institucional, relacionamento com membros, formação, leitura e aprendizagem, organização de atividades, plataformas e aplicativos.',
  },
  {
    name: 'Empresas e organizações',
    text: 'Posicionamento, presença institucional, comunicação, plataformas, automação, capacitação e projetos específicos.',
  },
  {
    name: 'Profissionais e especialistas',
    text: 'Transformar conhecimento e atuação profissional em marca, conteúdo, curso, produto digital, plataforma ou metodologia.',
  },
];
