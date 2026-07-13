import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { PaymentSteps } from './components/PaymentSteps';
import { HowItWorks } from './components/HowItWorks';
import seldSeal from './assets/images/seld_seal_1783906885335.jpg';
import { 
  Menu, 
  X, 
  Instagram as InstagramIcon, 
  Facebook, 
  Phone, 
  MapPin, 
  Clock as ClockIcon, 
  ChevronRight, 
  ChevronLeft,
  ChevronDown, 
  Star,
  MessageCircle,
  Play,
  CheckCircle2,
  PartyPopper,
  Droplets,
  Wind,
  Medal,
  Gem,
  HelpCircle,
  Heart,
  Sparkles,
  Volume2,
  VolumeX,
  Wifi
} from 'lucide-react';

const AutoScrollContainer = ({ children, speed = 1 }: { children: React.ReactNode, speed?: number }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationFrameId: number;
    let lastTime = 0;

    const scroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      if (!isInteracting) {
        el.scrollLeft += speed * (deltaTime / 16);
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    // Mouse drag to scroll
    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      setIsInteracting(true);
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      setIsInteracting(false);
    };

    const onMouseUp = () => {
      isDown = false;
      setIsInteracting(false);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, [isInteracting, speed]);

  return (
    <div 
      ref={scrollRef}
      className="flex overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing select-none"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
      onTouchStart={() => setIsInteracting(true)}
      onTouchEnd={() => setIsInteracting(false)}
    >
      {children}
    </div>
  );
};
import { 
  NAV_ITEMS, 
  DIFFERENTIALS, 
  FABRIC_CARE_DATA, 
  TESTIMONIALS, 
  FAQ_ITEMS, 
  STRUCTURE_IMAGES,
  INSTAGRAM_IMAGES,
  WHATSAPP_LINK,
  GOOGLE_REVIEWS_LINK,
  INSTAGRAM_LINK
} from './constants';

// --- Utility Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  href 
}: { 
  children?: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'success' | 'navy'; 
  className?: string;
  onClick?: () => void;
  href?: string;
}) => {
  const base = "px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 text-sm uppercase tracking-wider";
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.7)] animate-pulse",
    secondary: "bg-gelo text-secondary hover:bg-slate-200",
    outline: "border-2 border-red-600 text-red-600 hover:bg-red-50",
    ghost: "text-secondary hover:text-red-600 hover:bg-red-50",
    accent: "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_20px_rgba(220,38,38,0.7)] relative overflow-hidden group",
    success: "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.7)] animate-pulse",
    navy: "bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.7)] animate-pulse"
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component 
      href={href}
      onClick={onClick} 
      className={`${base} ${variants[variant]} ${className} relative`}
    >
      {variant === 'accent' && (
        <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full animate-shimmer" />
      )}
      {children}
    </Component>
  );
};

const VideoPlayer = ({ src, className = "", overlayClassName = "", autoPlay = true, loop = true, playsInline = true }: { src: string, className?: string, overlayClassName?: string, autoPlay?: boolean, loop?: boolean, playsInline?: boolean }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        autoPlay={autoPlay}
        muted={isMuted}
        loop={loop}
        playsInline={playsInline}
        className={className}
      />
      <button
        onClick={toggleMute}
        className={`absolute bottom-4 right-4 z-30 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all shadow-lg ${overlayClassName}`}
        aria-label={isMuted ? "Ativar som" : "Desativar som"}
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>
    </>
  );
};

// --- Section Components ---

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}>
      {/* Marquee Top Bar */}
      <div className="bg-red-600 text-white text-sm py-2 overflow-hidden flex items-center shadow-[0_0_15px_rgba(220,38,38,0.7)]">
        <div className="animate-infinite-scroll flex whitespace-nowrap items-center">
          {[...Array(2)].map((_, copyIdx) => (
            <div key={copyIdx} className="flex items-center gap-8 px-4">
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  <span className="flex items-center gap-2"><ClockIcon size={14} /> Atendimento 24h via Totem</span>
                  <span className="flex items-center gap-2"><Wind size={14} /> Lave e Seque em 75 minutos</span>
                  <span className="flex items-center gap-2"><Wifi size={14} /> Wi-Fi Grátis</span>
                  <span className="flex items-center gap-2"><Droplets size={14} /> Ambiente Climatizado</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_10px_rgba(28,53,80,0.5)] animate-logo-float animate-logo-glow bg-white shrink-0">
            <img 
              src="https://res.cloudinary.com/ddfacd0wf/image/upload/v1781658505/WhatsApp_Image_2026-06-16_at_10.03.19_PM_dy6tcz.jpg" 
              alt="Logo Seld Lavanderia Express" 
              className="w-full h-full object-cover"
            />
            {/* Reflection glossy glass layer */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />
            
            {/* Brilho Shimmer Line Animation */}
            <div className="absolute inset-y-0 left-0 w-2.5 bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-logo-shine pointer-events-none" />
          </div>
          <span className="text-3xl font-brand text-primary transition-colors group-hover:text-secondary">Seld Lavanderia Express</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="font-medium text-secondary transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <Button variant="primary" href={WHATSAPP_LINK} className="rounded-full">
            <MessageCircle size={18} /> Falar no WhatsApp
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 rounded-lg text-slate-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 p-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href} 
              className="text-lg font-medium text-slate-700 border-b border-slate-50 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button variant="primary" className="w-full rounded-full" href={WHATSAPP_LINK}>
            Fale Conosco
          </Button>
        </div>
      )}
    </header>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-40 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-[#1C3550] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">
          {/* Left Text Content */}
          <div className="max-w-xl z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-bold mb-6 uppercase tracking-wider whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Referência em Cuidado Premium
            </div>
            
            <h1 className="text-4xl lg:text-7xl font-brand leading-[1.1] mb-6 tracking-tight">
              Sua rotina merece praticidade. <span className="text-[#D92B2B]">Suas roupas merecem o melhor cuidado.</span>
            </h1>
            
            <p className="text-lg text-white/90 mb-8 leading-relaxed">
              Lavanderia Seld Express 24hs. Praticidade para o seu dia a dia.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button variant="accent" className="text-lg px-8 py-4 rounded-[20px] shadow-lg shadow-red-900/40" href={WHATSAPP_LINK}>
                Falar no WhatsApp <ChevronRight size={20} />
              </Button>
            </div>
            
            {/* Coupon Highlight */}
            <div className="bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md">
              <p className="text-xl font-bold mb-2 text-white">🚨 Temos um cupom de boas vindas!</p>
              <p className="text-lg text-slate-200 mb-4">🎁 🎉 Bem-vindo à Seld! Use o cupom <span className="text-yellow-400 font-bold text-2xl">SOUSELDR</span>. Ganhe desconto em suas lavagens. Cada CPF pode utilizar o cupom em até 5 vezes.</p>
            </div>
          </div>

          {/* Right Media Content */}
          <div className="relative z-20 flex justify-center">
            <div className="relative rounded-2xl border-4 border-red-600/30 shadow-[0_0_40px_rgba(220,38,38,0.4)] w-full max-w-lg overflow-hidden">
              <VideoPlayer src="https://res.cloudinary.com/ltukueen/video/upload/v1783719053/WhatsApp_Video_2026-07-10_at_9.20.24_AM_ssi8hx.mp4" className="w-full aspect-video object-cover" />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-600/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PremiumService = () => {
  return (
    <section id="premium" className="py-24 bg-[#1C3550] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Image Side */}
          <div className="relative group animate-levitate">
            <div className="absolute -inset-4 bg-primary/20 rounded-[40px] transform -rotate-3 transition-transform group-hover:rotate-0 duration-500 animate-flash-glow"></div>
            <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] reflection-effect">
              <img 
                src="https://res.cloudinary.com/ddfacd0wf/image/upload/v1781660729/WhatsApp_Image_2026-06-16_at_10.42.40_PM_muvofq.jpg" 
                alt="Serviço de organização premium Seld Lavanderia Express" 
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#2d3a82] text-white p-6 rounded-2xl shadow-xl max-w-[200px] hidden md:block animate-bounce-custom">
              <Sparkles className="text-yellow-400 mb-2" size={24} />
              <p className="font-bold text-sm leading-tight">Economia real de tempo e energia.</p>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <h3 className="text-red-500 font-brand text-2xl mb-4">Seld: Economia Inteligente para sua Rotina</h3>
            <h2 className="text-4xl md:text-6xl font-brand text-white mb-8 leading-tight">
              Sua economia <span className="text-red-500">começa aqui</span>
            </h2>
            <p className="text-slate-200 text-lg md:text-xl leading-relaxed mb-10">
              Economize água, energia e tempo com a Seld. Lavagem profissional, com o menor custo por ciclo e resultados impecáveis. Esqueça o varal e as contas altas, deixe com a gente!
            </p>

            <a href={WHATSAPP_LINK} className="inline-block bg-red-600 text-white font-bold py-4 px-10 rounded-full hover:bg-red-700 transition-all shadow-lg hover:shadow-xl text-lg mb-12">
              Falar no WhatsApp
            </a>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white/10 p-1 rounded-full"><CheckCircle2 size={18} className="text-red-500" /></div>
                <div>
                  <h4 className="font-bold text-white">Produtos Profissionais Unilever</h4>
                  <p className="text-sm text-slate-300">Produtos profissionais com dosagem automática em cada ciclo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white/10 p-1 rounded-full"><CheckCircle2 size={18} className="text-red-500" /></div>
                <div>
                  <h4 className="font-bold text-white">Pronto em 60 minutos</h4>
                  <p className="text-sm text-slate-300">Agilidade sem abrir mão da qualidade.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 bg-white/10 p-1 rounded-full"><CheckCircle2 size={18} className="text-red-500" /></div>
                <div>
                  <h4 className="font-bold text-white">Ambiente Seguro e Climatizado</h4>
                  <p className="text-sm text-slate-300">Conforto e tranquilidade enquanto você aguarda.</p>
                </div>
              </div>
            </div>

            <div className="flex justify-start">
              <Button variant="navy" className="rounded-xl px-12 py-5 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1" href={WHATSAPP_LINK}>
                Quero o Serviço Premium
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Structure = () => {
  const images = [
    "https://res.cloudinary.com/dky9oxhzt/image/upload/v1783650365/WhatsApp_Image_2026-07-09_at_9.20.03_PM_lnxdtb.jpg",
    "https://res.cloudinary.com/dky9oxhzt/image/upload/v1783650365/WhatsApp_Image_2026-07-09_at_9.20.05_PM_u7xxbr.jpg",
    "https://res.cloudinary.com/dky9oxhzt/image/upload/v1783650365/WhatsApp_Image_2026-07-09_at_9.20.05_PM_1_vanqbe.jpg",
    "https://res.cloudinary.com/dky9oxhzt/image/upload/v1783650364/WhatsApp_Image_2026-07-09_at_9.20.06_PM_k9qvi3.jpg",
    "https://res.cloudinary.com/dky9oxhzt/image/upload/v1783650364/WhatsApp_Image_2026-07-09_at_9.20.06_PM_1_bwmoh2.jpg",
    "https://res.cloudinary.com/dky9oxhzt/image/upload/v1783650364/WhatsApp_Image_2026-07-09_at_9.20.09_PM_xwpnbi.jpg"
  ];

  return (
    <section id="structure" className="py-20 bg-[#1C3550] text-slate-100 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h3 className="text-white font-brand text-3xl mb-2">Conforto & Qualidade</h3>
        <h2 className="text-4xl md:text-5xl font-heading text-white">Nossa Estrutura</h2>
      </div>
      
      <div className="mb-12">
        <AutoScrollContainer speed={2}>
          {[...images, ...images].map((img, i) => (
            <div key={i} className="shrink-0 w-64 aspect-[9/16] rounded-2xl overflow-hidden border border-white/20 mr-4">
              <img src={img} alt={`Estrutura ${i}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </AutoScrollContainer>
      </div>

      <div className="container mx-auto px-4 flex justify-center mt-12">
        <div className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
          <video src="https://res.cloudinary.com/ltukueen/video/upload/v1783719536/WhatsApp_Video_2026-07-09_at_11.15.52_PM_veqnff.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
        </div>
      </div>

    </section>
  );
};

// --- Interactive Experience ---

const InteractiveExperience = () => {
  const [activeTab, setActiveTab] = useState('differentials');

  const tabs = [
    { id: 'differentials', title: 'Diferenciais' },
    { id: 'benefits', title: 'Benefícios' },
    { id: 'fabrics', title: 'Tecidos' },
    { id: 'about', title: 'Sobre Nós' },
  ];

  return (
    <section className="py-24 bg-[#1C3550] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-brand text-center mb-16">Experiência Seld</h2>
        
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
                activeTab === tab.id 
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/50' 
                : 'bg-[#254668] text-slate-300 hover:bg-[#2c537a]'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="min-h-[400px]">
          {activeTab === 'differentials' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {DIFFERENTIALS.map((item, idx) => (
                <div key={idx} className="p-8 rounded-[20px] bg-[#254668] flex flex-col items-center text-center">
                  <div className="mb-4 text-red-500">{item.icon}</div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'benefits' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-[#254668] p-8 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-red-500">Produtos Profissionais Unilever</h4>
                <p className="text-slate-300">Produtos profissionais com dosagem automática em cada ciclo.</p>
              </div>
              <div className="bg-[#254668] p-8 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-red-500">Pronto em 75 minutos</h4>
                <p className="text-slate-300">Agilidade sem abrir mão da qualidade.</p>
              </div>
              <div className="bg-[#254668] p-8 rounded-2xl">
                <h4 className="font-bold text-lg mb-4 text-red-500">Ambiente Seguro e Climatizado</h4>
                <p className="text-slate-300">Conforto e tranquilidade enquanto você aguarda.</p>
              </div>
            </div>
          )}
          {activeTab === 'fabrics' && (
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-slate-300 mb-8">Selecione o tecido para dicas de cuidado:</p>
                <div className="flex gap-4 justify-center flex-wrap">
                    {FABRIC_CARE_DATA.map((item, idx) => (
                        <div key={idx} className="p-6 bg-[#254668] rounded-xl w-32">
                            {item.icon}
                            <p className="mt-2 font-bold">{item.type}</p>
                        </div>
                    ))}
                </div>
            </div>
          )}
          {activeTab === 'about' && (
            <div className="max-w-3xl mx-auto text-center text-slate-300 leading-relaxed">
              <p className="mb-6">A Seld nasceu para transformar sua rotina, trazendo tecnologia e eficiência para o cuidado com suas roupas na Praia do Francês.</p>
              <p>Combinamos a sabedoria do cuidado artesanal com a mais alta tecnologia em lavanderia. Nossos equipamentos de ponta garantem uma limpeza profunda, enquanto o acabamento manual assegura um toque de perfeição.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  return (
    <section className="py-24 bg-[#1C3550]">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-heading text-white">O que dizem sobre a Seld</h2>
      </div>
      <div className="relative">
        <AutoScrollContainer speed={2}>
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
            <div key={idx} className="shrink-0 w-80 p-8 rounded-2xl bg-[#254668] border border-white/10 text-white mr-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="italic text-slate-200 mb-6">"{item.comment}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center font-bold">
                  {item.avatar}
                </div>
                <span className="font-bold">{item.name}</span>
              </div>
            </div>
          ))}
        </AutoScrollContainer>
      </div>
    </section>
  );
};

const Plans = () => {
const plans = [
    {
      title: "Lavadora",
      description: "Lavagem de alta performance para 1 cesto.",
      price: "22",
      cents: "50",
      unit: "cesto",
      icon: <Droplets size={44} className="text-white" />,
      buttonText: "Falar no WhatsApp",
      variant: "success" as const
    },
    {
      title: "Secadora",
      description: "Secagem rápida e eficiente para 1 cesto.",
      price: "20",
      cents: "00",
      unit: "cesto",
      icon: <Wind size={44} className="text-white" />,
      buttonText: "Falar no WhatsApp",
      variant: "success" as const
    }
  ];

  return (
    <section id="plans" className="py-24 bg-[#1C3550]">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-brand text-white mb-4">Nossos Serviços</h2>
          <p className="text-slate-200 text-xl">Preço justo e qualidade garantida.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx} 
              className="relative bg-[#254668] rounded-[40px] p-10 shadow-xl shadow-slate-900/50 flex flex-col items-center text-center"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                duration: 4 + Math.random() * 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: Math.random() * 2 
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-6">
                {plan.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{plan.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 max-w-[280px]">
                {plan.description}
              </p>

              <div className="flex items-start text-white mb-10">
                <span className="text-lg font-bold mt-2 mr-1">R$</span>
                <span className="text-6xl font-bold leading-none">{plan.price}</span>
                <div className="flex flex-col items-start ml-1">
                  <span className="text-2xl font-bold border-b-2 border-white leading-none mb-1">,{plan.cents}</span>
                  <span className="text-xs font-medium text-slate-300">/ {plan.unit}</span>
                </div>
              </div>

              <Button 
                variant={plan.variant} 
                className="w-full py-4 text-base"
                href={WHATSAPP_LINK}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ScheduleCollection = () => {
  return (
    <section className="relative py-28 overflow-hidden flex items-center justify-center bg-[#1C3550]">
      <div className="container mx-auto px-4 relative z-10 flex justify-center">
        <div className="bg-[#254668] p-8 md:p-12 rounded-2xl shadow-2xl border border-white/10 max-w-lg w-full text-left transition-all hover:shadow-3xl">
          <h2 className="text-4xl md:text-5xl font-brand text-white mb-4">Fale Conosco</h2>
          <p className="text-slate-200 text-lg mb-10 leading-relaxed">
            Clique no botão abaixo para falar conosco diretamente pelo WhatsApp.
          </p>
          <Button 
            variant="success" 
            className="w-full py-5 text-lg rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-red-900/20"
            href={WHATSAPP_LINK}
          >
            <MessageCircle size={26} className="fill-white" /> Falar no WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="about" className="bg-[#1C3550] text-white">
      <div className="py-24 px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-brand text-white mb-6">Seld: Compromisso com Economia e Qualidade</h2>
        <p className="text-slate-200 text-xl">A Seld nasceu para transformar sua rotina, trazendo tecnologia e eficiência para o cuidado com suas roupas na Praia do Francês.</p>
      </div>

      <div className="py-24 px-4 text-center bg-[#254668]">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-brand text-white mb-8">Nossa Essência</h3>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed">
            Nascemos da paixão por tecidos finos e do desejo de oferecer um cuidado que vai além da simples limpeza. Cada peça é tratada como única, com a delicadeza que ela merece.
          </p>
        </div>
      </div>

      <div className="py-24 px-4 text-center bg-[#1C3550]">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-brand text-white mb-8">Compromisso com a Natureza</h3>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed">
            Utilizamos produtos biodegradáveis e processos de baixo impacto ambiental. A água que usamos passa por um rigoroso processo de filtragem e é reutilizada, porque acreditamos que cuidar das suas roupas é também cuidar do nosso planeta.
          </p>
        </div>
      </div>

      <div className="py-24 px-4 text-center bg-[#254668]">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl md:text-5xl font-brand text-white mb-8">Tecnologia e Tradição</h3>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed">
            Combinamos a sabedoria do cuidado artesanal com a mais alta tecnologia em lavanderia. Nossos equipamentos de ponta garantem uma limpeza profunda, enquanto o acabamento manual assegura um toque de perfeição.
          </p>
        </div>
      </div>
    </section>
  );
};


const FabricCare = () => {
  const [activeTab, setActiveTab] = useState(0);
  const currentData = FABRIC_CARE_DATA[activeTab];

  return (
    <section className="py-24 bg-[#1C3550]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-brand text-white mb-4">Cuidado para cada Tecido</h2>
        <p className="text-slate-200 text-lg mb-16">Selecione o tipo de tecido para ver nossas recomendações de tratamento.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          {FABRIC_CARE_DATA.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`p-8 rounded-2xl flex flex-col items-center justify-center gap-4 transition-all duration-300 border-2 ${
                activeTab === idx 
                ? 'bg-[#254668] border-red-600 shadow-lg shadow-black/20 scale-105' 
                : 'bg-[#254668] border-transparent hover:bg-[#2c537a] text-slate-400'
              }`}
            >
              <div className={`${activeTab === idx ? 'text-white' : 'text-slate-400'}`}>
                {item.icon}
              </div>
              <span className={`font-medium ${activeTab === idx ? 'text-white' : 'text-slate-300'}`}>
                {item.type}
              </span>
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto animate-fadeIn text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            {currentData.title}
          </h3>
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed">
            {currentData.description}
          </p>
        </div>
      </div>
    </section>
  );
};

const Instagram = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-4">Siga nosso Instagram</h2>
        <p className="text-slate-700 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Também nos acompanhe nas redes sociais para ficar por dentro de novas atualizações, promoções, eventos e muito mais, tudo para tornar a sua experiência cada vez melhor!
        </p>
        <Button 
          variant="navy" 
          className="rounded-xl px-10 py-4 mb-20 bg-[#2d3a82] hover:bg-[#1e2a63]"
          href={INSTAGRAM_LINK}
        >
          <InstagramIcon size={20} className="mr-2" /> Nos siga no Instagram
        </Button>
      </div>

      <div className="relative">
        <AutoScrollContainer speed={2}>
          {[...INSTAGRAM_IMAGES, ...INSTAGRAM_IMAGES].map((url, idx) => {
            const isVideo = url.includes('/video/upload/');
            return (
              <a 
                key={idx} 
                href={INSTAGRAM_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-[280px] shrink-0 aspect-[9/16] rounded-2xl overflow-hidden shadow-lg group mr-4"
              >
                {isVideo ? (
                  <video 
                    src={url}
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                  />
                ) : (
                  <img 
                    src={url} 
                    alt={`Instagram Post ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <InstagramIcon size={32} className="text-white" />
                </div>
              </a>
            );
          })}
        </AutoScrollContainer>
      </div>
    </section>
  );
};

const Differentials = () => {
  return (
    <section id="differentials" className="py-24 bg-white">
      <div className="container mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-4 tracking-tight">Desfrute dos nossos maiores diferenciais</h2>
        <p className="text-slate-500 text-xl">Conheça os benefícios que só a Seld Lavanderia Express oferece.</p>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
        {DIFFERENTIALS.map((item, idx) => (
          <div 
            key={idx} 
            className="p-10 rounded-[20px] bg-[#2d3a82] text-white flex flex-col items-center text-center shadow-2xl transition-transform hover:-translate-y-2 duration-300"
          >
            <div className="mb-6">
              {item.icon}
            </div>
            <h4 className="text-xl font-bold mb-4 leading-snug">{item.title}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(TESTIMONIALS.length / (window.innerWidth < 768 ? 1 : 3)));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.ceil(TESTIMONIALS.length / (window.innerWidth < 768 ? 1 : 3)) - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-[#e9eff5]">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82] mb-4">O que nossos clientes dizem</h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto mb-10">
          Gostou do nosso atendimento? Deixe seu comentário de 5 estrelas, conte um pouco sobre a sua experiência e compartilhe uma foto das suas roupas dobradas, limpas e cheirosas!
        </p>
        <Button 
          variant="navy" 
          className="rounded-xl px-10 py-4 mb-20"
          href={GOOGLE_REVIEWS_LINK}
        >
          Deixe sua Avaliação
        </Button>
      </div>

      <div className="container mx-auto px-4 relative max-w-7xl">
        <button 
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-10 z-10 p-3 bg-white rounded-full shadow-lg text-slate-400 hover:text-blue-500 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-10 z-10 p-3 bg-white rounded-full shadow-lg text-slate-400 hover:text-blue-500 transition-colors"
        >
          <ChevronRight size={24} />
        </button>

        <div className="overflow-hidden">
          <div 
            ref={sliderRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-w-full px-4">
              {TESTIMONIALS.slice(0, 3).map((item) => (
                <div key={item.id} className="bg-white p-10 rounded-[20px] shadow-xl border border-slate-100 flex flex-col h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex-grow border-l-2 border-blue-200 pl-6 mb-10">
                    <p className="text-slate-600 italic text-lg leading-relaxed">
                      "{item.comment}"
                    </p>
                  </div>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.avatar}
                    </div>
                    <span className="font-bold text-secondary">{item.name}</span>
                  </div>
                </div>
              ))}
            </div>
            {TESTIMONIALS.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-w-full px-4">
                {TESTIMONIALS.slice(3, 6).map((item) => (
                  <div key={item.id} className="bg-white p-10 rounded-[20px] shadow-xl border border-slate-100 flex flex-col h-full">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex-grow border-l-2 border-blue-200 pl-6 mb-10">
                      <p className="text-slate-600 italic text-lg leading-relaxed">
                        "{item.comment}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 bg-[#2d3a82] rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {item.avatar}
                      </div>
                      <span className="font-bold text-[#2d3a82]">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-24 bg-[#1C3550]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#254668] text-white mb-4">
            <HelpCircle size={30} />
          </div>
          <h2 className="text-4xl md:text-6xl font-brand text-white mb-4">Perguntas Frequentes</h2>
          <p className="text-slate-200 text-xl font-medium">Tire suas dúvidas sobre nossos serviços de lavanderia.</p>
        </div>
        <div className="divide-y divide-white/10 border-t border-white/10">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="overflow-hidden">
              <button 
                className="w-full py-6 flex items-center justify-between text-left group transition-all" 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === idx ? 'text-red-500' : 'text-white'}`}>
                  {item.question}
                </span>
                <ChevronDown className={`text-slate-400 transition-transform duration-300 ${openIndex === idx ? 'rotate-180 text-red-500' : ''}`} size={20} />
              </button>
              <div className={`transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <p className="text-slate-300 text-lg leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-[#1C3550] border-t border-white/10 text-white">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-red-500 font-brand text-2xl mb-2">Visite-nos</h3>
          <h2 className="text-4xl md:text-5xl font-heading text-white mb-8">Localização & Funcionamento</h2>
          <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#254668] rounded-xl text-white"><MapPin size={24} /></div>
              <div><h4 className="font-bold text-white">Localização</h4><p className="text-slate-200">Trevo do Francês, dentro do Posto Ipiranga (Rodovia Ib Gatto Falcao, s/n, Povoado Francês, Marechal Deodoro - AL).</p></div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#254668] rounded-xl text-white"><ClockIcon size={24} /></div>
              <div><h4 className="font-bold text-white">Como Funciona o Autosserviço</h4><p className="text-slate-200">Chegue e use! Sem agendamento. Ciclo completo (lavagem + secagem) em média de 1 hora.</p></div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="primary" className="rounded-full" href={WHATSAPP_LINK}>Atendimento WhatsApp</Button>
          </div>
          
          {/* Selo de Melhor Lavanderia e Avaliação do Google */}
          <div className="p-6 bg-gradient-to-r from-blue-950/40 to-slate-900/40 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-xl">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <img 
                src={seldSeal} 
                alt="Selo Seld Lavanderia - Melhor Lavanderia da Região de Marechal Deodoro" 
                className="relative w-24 h-24 object-contain rounded-full shadow-md bg-white p-1"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <span className="text-amber-400 font-bold tracking-wider text-xs uppercase flex items-center justify-center sm:justify-start gap-1">
                <Star size={12} className="fill-amber-400 text-amber-400" /> Destaque de Excelência
              </span>
              <h4 className="text-lg font-bold text-white">Melhor Lavanderia de Marechal Deodoro</h4>
              <p className="text-sm text-slate-300">Eleitos a melhor lavanderia da região com satisfação garantida! Deixe sua avaliação no Google.</p>
              <div className="mt-2 flex flex-wrap gap-3 justify-center sm:justify-start">
                <Button 
                  variant="outline" 
                  className="text-xs py-2 px-4 rounded-xl border-white/20 text-white hover:bg-white/10 flex items-center gap-2" 
                  href={GOOGLE_REVIEWS_LINK}
                >
                  <Star size={14} className="fill-yellow-400 text-yellow-400" /> Avaliar no Google
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-slate-700">
          <iframe src="https://www.google.com/maps?q=Posto+Ipiranga,+Trevo+do+Francês,+Marechal+Deodoro,+AL&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start max-w-xs">
          <div className="flex items-center gap-3 mb-6 group">
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-400/40 shadow-[0_0_12px_rgba(59,130,246,0.6)] animate-logo-float animate-logo-glow bg-white shrink-0">
              <img 
                src="https://res.cloudinary.com/ddfacd0wf/image/upload/v1781658505/WhatsApp_Image_2026-06-16_at_10.03.19_PM_dy6tcz.jpg" 
                alt="Logo Seld Lavanderia Express" 
                className="w-full h-full object-cover"
              />
              {/* Reflection gloss layer */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-full pointer-events-none" />
              
              {/* Brilho Shimmer Line */}
              <div className="absolute inset-y-0 left-0 w-2.5 bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-logo-shine pointer-events-none" />
            </div>
            <h2 className="text-xl font-brand text-blue-400 transition-colors group-hover:text-blue-300">Seld Lavanderia</h2>
          </div>
          <p className="text-slate-400">Especialistas em lavanderia premium e self-service.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-bold">Navegação</h4>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}><a href={item.href} className="text-slate-400 hover:text-blue-400 transition-colors">{item.label}</a></li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-center md:items-start">
          <h4 className="text-lg font-bold">Redes Sociais</h4>
          <div className="flex gap-4">
            <a href={INSTAGRAM_LINK} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-blue-500 transition-colors"><InstagramIcon size={20} /></a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 pt-10 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Seld Lavanderia Express Ltda.</p>
      </div>
    </footer>
  );
};

const WhatsAppWidget = () => {
  return (
    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl animate-bounce-custom">
      <MessageCircle size={32} />
    </a>
  );
};

const GoogleReviewsSection = () => {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Video Side */}
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-8 border-white aspect-video bg-slate-100">
            <VideoPlayer
              src="https://res.cloudinary.com/ddfacd0wf/video/upload/v1781659624/SnapInsta.to_AQM0S3PJD0-dLunCLq1o6BNe5rGvDj_I-mVqaq8HI0m49Sn5euyQaDesIDt1abcLRrcgeTrvTyPDeL1zBj3uhny-ZJijJKNkH6LaAmM_z3vifg.mp4"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Side */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 text-blue-600 text-sm font-bold w-fit uppercase tracking-wider">
              Sua opinião importa
            </div>
            <h2 className="text-4xl md:text-6xl font-brand text-[#2d3a82]">Avalie Seld Lavanderia Express no Google</h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
              Sua avaliação é fundamental para continuarmos oferecendo o melhor serviço da Praia do Francês. Compartilhe sua experiência e ajude outros clientes a nos encontrar!
            </p>
            <Button 
              variant="navy" 
              className="rounded-xl px-12 py-5 text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 w-fit" 
              href={GOOGLE_REVIEWS_LINK}
            >
              <Star size={20} className="fill-yellow-400 text-yellow-400" /> Avaliar Seld Lavanderia Express no Google
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  return (
    <div className="antialiased overflow-x-hidden">
      <Header />
      <Hero />
      <Structure />
      <InteractiveExperience />
      <Plans />
      <GoogleReviewsSection />
      <Reviews />
      <ScheduleCollection />
      <Instagram />
      <Testimonials />
      <FAQ />
      <PaymentSteps />
      <HowItWorks />
      <Contact />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}
