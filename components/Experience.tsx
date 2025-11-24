
import React from 'react';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 border-l-4 border-brand-yellow pl-6 flex items-end">
          工作经历 <span className="text-zinc-500 text-2xl md:text-3xl font-normal ml-4">Experience</span>
        </h2>

        <div className="relative border-l border-zinc-800 ml-4 md:ml-10 space-y-16">
          {EXPERIENCE.map((job, index) => (
            <div key={job.id} className="relative pl-12 md:pl-20 group">
              {/* Timeline Dot */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-brand-yellow ring-4 ring-black group-hover:ring-brand-yellow/30 transition-all" />
              
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-brand-yellow transition-colors">
                    {job.company}
                  </h3>
                  <p className="text-xl text-zinc-400 mt-1">{job.role}</p>
                </div>
                <span className="text-zinc-500 font-mono text-sm mt-2 md:mt-0 bg-zinc-900 px-3 py-1 rounded">
                  {job.period}
                </span>
              </div>
              
              <ul className="list-disc list-inside text-zinc-400 space-y-2 mt-4">
                {job.highlights.map((point, i) => (
                  <li key={i} className="leading-relaxed hover:text-zinc-200 transition-colors">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
