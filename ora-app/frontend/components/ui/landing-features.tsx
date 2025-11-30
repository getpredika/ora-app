"use client";
import { motion } from "framer-motion";
import { Sparkles, Zap, Shield } from "lucide-react";

function LandingFeatures() {
  const features = [
    {
      icon: Sparkles,
      title: "Presizyon Wo",
      description: "Konvèsyon tèks-vwa ak vwa-tèks avèk kalite profesyonèl",
    },
    {
      icon: Zap,
      title: "Vit ak Efikas",
      description: "Tretman rapid pou eksperyans itilizatè optimal",
    },
    {
      icon: Shield,
      title: "Senp Sèvi",
      description: "Entèfas enstriktif ki fasil pou tout moun itilize",
    },
  ];

  return (
    <section id="landing-features" className="relative w-full py-20 px-4 md:px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
              Poukisa Chwazi ORA?
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Teknoloji avanse pou lang Kreyòl Ayisyen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 transition-all"
                >
                  <Icon className="w-10 h-10 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </motion.div>
              );
            })
          }
        </div>
      </div>
    </section>
  );
}

export { LandingFeatures };