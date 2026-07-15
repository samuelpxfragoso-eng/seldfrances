import React from 'react';
import { Shield, Clock, ThumbsUp, Sparkles, Droplets, Wind, Shirt } from 'lucide-react';

export const NAV_ITEMS = [
  { href: '#home', label: 'Início' },
  { href: '#structure', label: 'Estrutura' },
  { href: '#values', label: 'Valores' },
  { href: '#faq', label: 'FAQ' },
];

export const DIFFERENTIALS = [
  {
    icon: <Shield size={32} />,
    title: 'Cuidado Especial',
    description: 'Tratamento adequado para cada tipo de tecido, garantindo maior durabilidade.',
  },
  {
    icon: <Clock size={32} />,
    title: 'Agilidade',
    description: 'Roupas limpas e secas em até 60 minutos com nossos equipamentos de ponta.',
  },
  {
    icon: <ThumbsUp size={32} />,
    title: 'Qualidade Garantida',
    description: 'Utilizamos apenas produtos profissionais de alta performance.',
  },
  {
    icon: <Sparkles size={32} />,
    title: 'Ambiente Limpo',
    description: 'Nossa loja é higienizada constantemente para seu conforto e segurança.',
  }
];

export const FABRIC_CARE_DATA = [
  {
    icon: <Shirt size={32} />,
    type: 'Algodão',
    title: 'Cuidado com Algodão',
    description: 'O algodão é resistente, mas pode encolher em altas temperaturas. Lavamos com água fria ou morna e secamos em temperatura média para preservar as fibras.',
  },
  {
    icon: <Wind size={32} />,
    type: 'Sintéticos',
    title: 'Cuidado com Sintéticos',
    description: 'Tecidos como poliéster e nylon secam rápido e amassam pouco. Utilizamos ciclos suaves e evitamos calor excessivo para não danificar o material.',
  },
  {
    icon: <Droplets size={32} />,
    type: 'Lã & Frios',
    title: 'Cuidado com Lã',
    description: 'A lã exige lavagem delicada. Usamos produtos específicos e secagem natural ou em temperatura muito baixa para evitar o encolhimento.',
  },
  {
    icon: <Sparkles size={32} />,
    type: 'Seda & Finos',
    title: 'Cuidado com Seda',
    description: 'Tecidos finos recebem tratamento VIP. Lavagem à mão ou em ciclo ultra delicado, com produtos neutros para manter o brilho e a maciez.',
  }
];

export const PLANS = [
  { title: "Lavadora", capacity: "1 Cesto", price: "R$ 22,50" },
  { title: "Secadora", capacity: "1 Cesto", price: "R$ 20,00" },
];

export const TESTIMONIALS = [
  {
    id: 1,
    comment: 'Melhor lavanderia da região! Roupas super cheirosas e atendimento impecável.',
    avatar: 'M',
    name: 'Maria Silva',
  },
  {
    id: 2,
    comment: 'Praticidade incrível. Deixo minhas roupas e busco tudo dobradinho. Recomendo muito!',
    avatar: 'J',
    name: 'João Pedro',
  },
  {
    id: 3,
    comment: 'O serviço premium salvou minha vida. Não preciso mais me preocupar em dobrar roupas.',
    avatar: 'A',
    name: 'Ana Costa',
  },
  {
    id: 4,
    comment: 'Ambiente super agradável e máquinas muito eficientes. Preço justo.',
    avatar: 'C',
    name: 'Carlos Eduardo',
  },
  {
    id: 5,
    comment: 'Atendimento nota 10! As meninas são super atenciosas e cuidadosas com as roupas.',
    avatar: 'F',
    name: 'Fernanda Lima',
  },
  {
    id: 6,
    comment: 'Adorei a praticidade, em 1 hora resolvi a lavagem de uma semana toda!',
    avatar: 'B',
    name: 'Beatriz Santos',
  },
  {
    id: 7,
    comment: 'Excelente qualidade, as roupas voltam impecáveis e com um perfume maravilhoso.',
    avatar: 'R',
    name: 'Ricardo Oliveira',
  },
  {
    id: 8,
    comment: 'Muito fácil de usar, preço ótimo e economia de tempo garantida.',
    avatar: 'P',
    name: 'Paula Souza',
  },
  {
    id: 9,
    comment: 'Recomendo a todos, um serviço essencial para quem não tem tempo a perder.',
    avatar: 'T',
    name: 'Thiago Martins',
  },
  {
    id: 10,
    comment: 'A melhor experiência em lavanderia self-service, muito organizado.',
    avatar: 'L',
    name: 'Larissa Costa',
  },
  {
    id: 11,
    comment: 'Paz de espírito total, deixar as roupas lá e saber que estarão bem cuidadas.',
    avatar: 'V',
    name: 'Viviane Mendes',
  }
];

export const FAQ_ITEMS = [
  {
    question: 'Como funciona o serviço self-service?',
    answer: 'Você mesmo pode operar as máquinas. Basta comprar o ciclo no totem de autoatendimento, colocar suas roupas e os produtos já são dosados automaticamente.',
  },
  {
    question: 'Quais produtos são utilizados?',
    answer: 'Utilizamos produtos profissionais da linha OMO e Comfort, garantindo limpeza profunda e um perfume duradouro.',
  },
  {
    question: 'Quanto tempo demora para lavar e secar?',
    answer: 'O ciclo de lavagem dura cerca de 30 minutos e o de secagem 30 minutos. Em 60 minutos suas roupas estão prontas.',
  },
  {
    question: 'Vocês lavam edredons e cobertores?',
    answer: 'Sim! Nossas máquinas têm capacidade para lavar edredons de todos os tamanhos, incluindo King Size.',
  },
  {
    question: 'Posso lavar roupas delicadas?',
    answer: 'Sim, mas recomendamos usar o ciclo delicado e verificar as etiquetas das roupas antes de colocar na máquina.',
  },
  {
    question: 'O local é seguro?',
    answer: 'Sim, possuímos monitoramento e o ambiente é planejado para garantir a segurança dos nossos clientes e equipamentos.',
  },
  {
    question: 'Preciso levar sabão e amaciante?',
    answer: 'Não! Todas as lavagens utilizam produtos profissionais da Unilever, com dosagem automática e precisa em cada ciclo, proporcionando limpeza eficiente, proteção dos tecidos e um excelente resultado. Basta trazer suas roupas.',
  },
  {
    question: 'Aceitam cartão de crédito?',
    answer: 'Sim, aceitamos cartões de crédito, débito e também PIX para maior comodidade.',
  },
  {
    question: 'Existe estacionamento?',
    answer: 'Sim, por estarmos dentro do Posto Ipiranga, oferecemos estacionamento amplo e seguro para nossos clientes.',
  },
  {
    question: 'A lavanderia funciona todos os dias?',
    answer: 'Sim! Funcionamos 24 horas por dia, todos os dias da semana.',
  }
];

export const STRUCTURE_IMAGES = [
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/05_gj9x0h.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/03_gzxee2.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/02_y9vhxw.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/06_jc2lsl.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/01_uhhi5t.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171329/09_hgqdcj.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/04_cxgo7g.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171329/08_m38dea.jpg',
  'https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171329/11_d7lpoy.jpg',
];

export const INSTAGRAM_IMAGES = [
  'https://res.cloudinary.com/ddfacd0wf/image/upload/v1781661548/WhatsApp_Image_2026-06-16_at_10.38.55_PM_1_fjznqb.jpg',
  'https://res.cloudinary.com/ddfacd0wf/image/upload/v1781661548/WhatsApp_Image_2026-06-16_at_10.38.58_PM_xhfeys.jpg',
  'https://res.cloudinary.com/ddfacd0wf/image/upload/v1781661548/WhatsApp_Image_2026-06-16_at_10.38.55_PM_dijpiw.jpg',
  'https://res.cloudinary.com/ddfacd0wf/image/upload/v1781661548/WhatsApp_Image_2026-06-16_at_10.38.54_PM_spxdmw.jpg',
  'https://res.cloudinary.com/ddfacd0wf/image/upload/v1781661548/WhatsApp_Image_2026-06-16_at_10.38.54_PM_1_cyjkqu.jpg',
  'https://res.cloudinary.com/ddfacd0wf/image/upload/v1781661548/WhatsApp_Image_2026-06-16_at_10.38.57_PM_g2iyis.jpg',
];

export const WHATSAPP_LINK = 'https://wa.me/5582999605686?text=Mais%20informações%20sobre%20a%20lavanderia.';
export const GOOGLE_REVIEWS_LINK = 'https://g.page/r/CVbQMYqxgYLUEBM/review';
export const INSTAGRAM_LINK = 'https://www.instagram.com/seldlavanderia.praiadofrances?igsh=M2NldWVpejJjM25p';
export const FRANCHISE_LINK = 'https://seldlavanderia.com.br';
export const SAC_EMAIL = 'sac@seldlavanderia.com.br';

