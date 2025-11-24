
import React, { useState } from 'react';
import { PROJECTS, ExtendedProjectItem, TOOL_LOGOS } from '../constants';
import { ArrowUpRight, X, Maximize2, Layers, Tag, Monitor } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ExtendedProjectItem | null>(null);

  const openModal = (project: ExtendedProjectItem) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Triple the logos to ensure smooth infinite looping within the container
  const LOGO_SET = [...TOOL_LOGOS, ...TOOL_LOGOS, ...TOOL_LOGOS];

  return (
    <section id="projects" className="py-24 bg-zinc-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
           <h2 className="text-4xl md:text-5xl font-bold text-white border-l-4 border-brand-yellow pl-6 flex items-end">
            个人项目 <span className="text-zinc-500 text-2xl md:text-3xl font-normal ml-4">Projects</span>
          </h2>
          <p className="text-zinc-500 mt-4 md:mt-0 max-w-md text-right">
            探索 AI 技术在多行业场景的落地与实践
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {PROJECTS.map((project, index) => (
            <div 
              key={project.id}
              onClick={() => openModal(project)}
              className="group relative bg-zinc-900 rounded-2xl overflow-hidden cursor-pointer hover:bg-zinc-800 transition-all duration-500 border border-zinc-800 hover:border-brand-yellow/50 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-yellow/10"
            >
              {/* Card Cover Image */}
              <div className="aspect-video w-full overflow-hidden bg-zinc-950 relative">
                 <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-90" />
                 
                 <div className="absolute top-4 right-4 bg-black/50 backdrop-blur rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 size={16} className="text-white" />
                 </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow relative z-10">
                {/* Modular Metadata Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-medium tracking-wide">
                  <span className="flex items-center gap-1 text-brand-yellow bg-brand-yellow/10 px-2 py-1 rounded">
                    <Layers size={12} /> {project.meta.tech}
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="flex items-center gap-1 text-zinc-300 bg-zinc-800 px-2 py-1 rounded">
                    <Tag size={12} /> {project.meta.industry}
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="flex items-center gap-1 text-zinc-300 bg-zinc-800 px-2 py-1 rounded">
                    <Monitor size={12} /> {project.meta.platform}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors leading-tight">
                  {project.title}
                </h3>
                
                <p className="text-zinc-400 mb-6 line-clamp-2 text-sm">
                  {project.description}
                </p>
                
                <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-xs text-zinc-500">查看详情</span>
                  <ArrowUpRight size={16} className="text-zinc-600 group-hover:text-brand-yellow transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Logo Carousel - Redesigned to match Landio/Framer style */}
      <div className="w-full bg-black py-16 border-t border-zinc-900">
        <div className="max-w-4xl mx-auto px-4 relative">
          
          {/* Gradient Masks */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div className="flex flex-col gap-10 overflow-hidden">
            {/* Row 1: Left Scroll */}
            <div className="flex w-full group">
              <div className="flex space-x-12 animate-scroll group-hover:[animation-play-state:paused] min-w-full items-center pl-12">
                {LOGO_SET.map((logo, idx) => (
                  <div key={`r1-${idx}`} className="flex-shrink-0 relative group/logo p-2">
                     <img 
                       src={logo.url} 
                       alt={logo.name} 
                       className="h-12 w-auto object-contain filter grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-300 transform group-hover/logo:scale-110"
                       onError={(e) => {
                         (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=' + logo.name;
                       }}
                     />
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Right Scroll (Reverse) */}
            <div className="flex w-full group">
              <div className="flex space-x-12 animate-scroll-reverse group-hover:[animation-play-state:paused] min-w-full items-center pl-12">
                {LOGO_SET.map((logo, idx) => (
                  <div key={`r2-${idx}`} className="flex-shrink-0 relative group/logo p-2">
                     <img 
                       src={logo.url} 
                       alt={logo.name} 
                       className="h-12 w-auto object-contain filter grayscale opacity-40 group-hover/logo:grayscale-0 group-hover/logo:opacity-100 transition-all duration-300 transform group-hover/logo:scale-110"
                       onError={(e) => {
                         (e.target as HTMLImageElement).src = 'https://placehold.co/100x100?text=' + logo.name;
                       }}
                     />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* Full Screen Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeModal}
          />
          
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-800 animate-fade-in-up custom-scrollbar">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 p-2 bg-black/50 text-white rounded-full hover:bg-brand-yellow hover:text-black transition-colors backdrop-blur"
            >
              <X size={24} />
            </button>

            <div className="w-full h-64 md:h-80 relative">
               <img 
                 src={selectedProject.imageUrl} 
                 alt={selectedProject.title} 
                 className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
               
               <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-brand-yellow text-black font-bold rounded-full text-xs shadow-lg shadow-brand-yellow/20">
                      {selectedProject.meta.tech}
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur text-white rounded-full text-xs border border-white/20">
                      {selectedProject.meta.industry}
                    </span>
                    <span className="px-3 py-1 bg-white/10 backdrop-blur text-white rounded-full text-xs border border-white/20">
                      {selectedProject.meta.platform}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white shadow-black drop-shadow-lg leading-tight">
                    {selectedProject.title}
                  </h2>
               </div>
            </div>

            <div className="p-8 md:p-12 relative z-10">
               <div className="prose prose-invert max-w-none">
                 <p className="text-lg leading-relaxed text-zinc-300 mb-8 border-l-4 border-brand-yellow pl-6 italic">
                   {selectedProject.fullDescription}
                 </p>

                 {selectedProject.details && (
                   <div className="bg-black/30 p-8 rounded-2xl border border-zinc-800 mb-8 hover:border-brand-yellow/30 transition-colors">
                     <h4 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                       <div className="p-2 bg-brand-yellow/10 rounded-lg text-brand-yellow">
                          <Layers size={20} /> 
                       </div>
                       项目亮点与详情
                     </h4>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                       {selectedProject.details.map((detail, idx) => (
                         <li key={idx} className="flex items-start gap-3 text-zinc-400">
                           <span className="w-2 h-2 rounded-full bg-brand-yellow mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(245,197,24,0.5)]" />
                           <span className="text-sm leading-relaxed">{detail}</span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 )}
               </div>

               {selectedProject.link && (
                 <div className="mt-8 flex justify-end">
                   <a 
                     href={selectedProject.link} 
                     target="_blank" 
                     rel="noreferrer"
                     className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-brand-yellow transition-all shadow-lg hover:shadow-brand-yellow/20 hover:-translate-y-1"
                   >
                     访问项目 <ArrowUpRight size={18} />
                   </a>
                 </div>
               )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
