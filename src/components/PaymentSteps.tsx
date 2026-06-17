import React from 'react';
import { motion } from 'motion/react';
import { 
  Droplets, 
  Hash, 
  User, 
  CheckCircle, 
  CreditCard, 
  Smartphone, 
  Timer 
} from 'lucide-react';

const steps = [
  { icon: Droplets, title: "1. Escolha o Ciclo", text: "Selecione entre Lavagem ou Secagem" },
  { icon: Hash, title: "2. Escolha a Máquina", text: "Selecione o número da máquina que deseja usar" },
  { icon: User, title: "3. Identificação", text: "Preencha seus dados (opcional)" },
  { icon: CheckCircle, title: "4. Confirmação", text: "Verifique e confirme suas informações" },
  { icon: CreditCard, title: "5. Pagamento", text: "Selecione sua forma de pagamento preferida" },
  { icon: Smartphone, title: "6. Instruções", text: "Siga as orientações exibidas no painel" },
  { icon: Timer, title: "7. Liberação", text: "Aguarde a liberação e inicie seu ciclo" },
];

export const PaymentSteps = () => {
  return (
    <section id="payment" className="py-20 bg-gelo">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center mb-16">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-brand text-primary mb-4">Como Funciona o Pagamento</h2>
            <p className="text-secondary text-lg">Confira o passo a passo para realizar seu pagamento.</p>
          </div>
          <div className="w-full lg:w-1/2">
            <img 
              src="https://res.cloudinary.com/ddfacd0wf/image/upload/v1781662598/WhatsApp_Image_2026-06-16_at_10.20.39_PM_1_t5fz81.jpg"
              alt="Instruções de Pagamento"
              className="w-full rounded-[20px] shadow-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-[20px] shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-accent/10 text-accent rounded-full shrink-0">
                <step.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-primary mb-1">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
