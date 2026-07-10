import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplets, Wind, ChevronRight } from 'lucide-react';

const stepsLavar = [
  { title: "1. Preparação", text: "Separe roupas brancas e de cor, quando necessário. Verifique se há objetos nos bolsos e coloque no cesto." },
  { title: "2. Insira as Roupas", text: "Respeite a capacidade de cada equipamento, o que couber no cesto caberá na máquina." },
  { title: "3. Pagamento", text: "Libere a máquina com as instruções no totem de pagamento." },
  { title: "4. Selecione a Programação", text: "Escolha o tipo de lavagem desejada e pressione o botão INÍCIO." },
];

const stepsSecar = [
  { title: "1. Preparação", text: "Separe roupas brancas e de cor, quando necessário. Verifique se há objetos nos bolsos e coloque no cesto." },
  { title: "2. Insira as Roupas", text: "Respeite a capacidade de cada equipamento, o que couber no cesto caberá na máquina." },
  { title: "3. Pagamento", text: "Libere a máquina com as instruções no totem de pagamento." },
  { title: "4. Selecione a Programação", text: "Escolha o tipo de secagem desejada e pressione o botão INÍCIO." },
  { title: "5. Limpe o Filtro", text: "Ao término do ciclo, limpe o filtro da secadora para que o próximo cliente possa ter também uma boa experiência." },
];

export const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'lavar' | 'secar'>('lavar');

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-brand text-primary mb-4">Como Funciona</h2>
          <p className="text-secondary text-lg">Lavar e secar suas roupas nunca foi tão simples e prático.</p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => setActiveTab('lavar')}
            className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'lavar' ? 'bg-primary text-white shadow-lg' : 'bg-gelo text-secondary hover:bg-slate-200'}`}
          >
            <Droplets size={20} /> Como Lavar
          </button>
          <button 
            onClick={() => setActiveTab('secar')}
            className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === 'secar' ? 'bg-primary text-white shadow-lg' : 'bg-gelo text-secondary hover:bg-slate-200'}`}
          >
            <Wind size={20} /> Como Secar
          </button>
        </div>

        <div className="max-w-3xl mx-auto mb-10 rounded-[30px] overflow-hidden shadow-xl border-4 border-white/10">
          <video
            src="https://res.cloudinary.com/ltukueen/video/upload/v1783719147/WhatsApp_Video_2026-07-10_at_9.20.52_AM_fxy1kq.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-cover"
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto bg-gelo p-8 md:p-12 rounded-[30px]"
          >
            <div className="space-y-6">
              {(activeTab === 'lavar' ? stepsLavar : stepsSecar).map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">{step.title}</h3>
                    <p className="text-slate-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-200">
              <h4 className="font-bold text-primary mb-2">Opções de Ciclo (No Painel):</h4>
              <ul className="text-slate-600 space-y-1">
                <li>1 - LEVE / LIGHT</li>
                <li>2 - MÉDIO / MEDIUM</li>
                <li>3 - PESADO / HEAVY</li>
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
