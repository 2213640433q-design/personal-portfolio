
import React from 'react';
import { WHY_ME } from '../constants';

const WhyMe: React.FC = () => {
  return (
    <section className="py-20 bg-zinc-950 border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur text-xs font-medium text-zinc-400 mb-6 uppercase tracking-wider">
             Why Partner with Me
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why me as <span className="text-zinc-600 block md:inline mt-2 md:mt-0">AI Product Manager</span>
          </h2>
          <p className="mt-4 text-zinc-500 max-w-2xl mx-auto">
             技术背景与产品思维的深度融合，为企业创造可衡量的商业价值
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {WHY_ME.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index} 
                className="group relative bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 hover:bg-zinc-900 transition-all duration-300 hover:border-brand-yellow/30"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-brand-yellow/10 flex items-center justify-center border border-brand-yellow/20 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={24} className="text-brand-yellow" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Subtle Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 rounded-full blur-[50px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyMe;
