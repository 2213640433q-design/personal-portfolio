
import React, { useState } from 'react';
import { SKILLS, PERSONAL_INFO, RADAR_DATA } from '../constants';
import { BookOpen, Hexagon } from 'lucide-react';

// Helper to calculate polygon points
const getPoints = (data: typeof RADAR_DATA, scale: number, center: number, radius: number) => {
  const angleStep = (Math.PI * 2) / data.length;
  return data.map((item, i) => {
    // Start from -90deg (top)
    const angle = i * angleStep - Math.PI / 2;
    const value = (item.A / item.fullMark) * scale;
    const x = center + Math.cos(angle) * (radius * value);
    const y = center + Math.sin(angle) * (radius * value);
    return `${x},${y}`;
  }).join(' ');
};

const getLabelPosition = (i: number, total: number, center: number, radius: number) => {
  const angleStep = (Math.PI * 2) / total;
  const angle = i * angleStep - Math.PI / 2;
  const offset = 30; // Distance from outer edge
  const x = center + Math.cos(angle) * (radius + offset);
  const y = center + Math.sin(angle) * (radius + offset);
  return { x, y };
};

const RadarChart: React.FC = () => {
  const size = 320;
  const center = size / 2;
  const radius = 90;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Average benchmark (3.5/5)
  const averageData = RADAR_DATA.map(d => ({ ...d, A: 3.5 }));
  const averagePoints = getPoints(averageData, 1, center, radius);
  
  // User data
  const userPoints = getPoints(RADAR_DATA, 1, center, radius);
  
  // Grid levels (1 to 5)
  const levels = [1, 2, 3, 4, 5];

  return (
    <div className="relative flex justify-center items-center py-8">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid Background */}
        {levels.map((level) => {
          const levelPoints = getPoints(RADAR_DATA.map(d => ({ ...d, A: level })), 1, center, radius);
          return (
             <polygon 
               key={level} 
               points={levelPoints} 
               fill="none" 
               stroke="#333" 
               strokeWidth="1"
               className="opacity-50"
             />
          );
        })}

        {/* Axis Lines */}
        {RADAR_DATA.map((_, i) => {
           const angleStep = (Math.PI * 2) / RADAR_DATA.length;
           const angle = i * angleStep - Math.PI / 2;
           const x = center + Math.cos(angle) * radius;
           const y = center + Math.sin(angle) * radius;
           return (
             <line 
               key={i} 
               x1={center} y1={center} 
               x2={x} y2={y} 
               stroke="#333" 
               strokeWidth="1" 
             />
           );
        })}

        {/* Average Line (3.5) */}
        <polygon 
          points={averagePoints} 
          fill="none" 
          stroke="#555" 
          strokeWidth="1" 
          strokeDasharray="4 2"
        />

        {/* User Data Polygon */}
        <polygon 
          points={userPoints} 
          fill="rgba(245, 197, 24, 0.2)" 
          stroke="#F5C518" 
          strokeWidth="2"
          className="filter drop-shadow-[0_0_8px_rgba(245,197,24,0.5)] transition-all duration-300"
        />
        
        {/* Interactive Data Points */}
        {RADAR_DATA.map((item, i) => {
          const angleStep = (Math.PI * 2) / RADAR_DATA.length;
          const angle = i * angleStep - Math.PI / 2;
          const value = (item.A / item.fullMark);
          const x = center + Math.cos(angle) * (radius * value);
          const y = center + Math.sin(angle) * (radius * value);
          
          return (
            <g 
              key={i} 
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              <circle 
                cx={x} cy={y} 
                r={hoveredIndex === i ? 6 : 4} 
                fill="#F5C518"
                className="transition-all duration-300"
              />
              {/* Hit area for easier hover */}
              <circle cx={x} cy={y} r="15" fill="transparent" />
            </g>
          );
        })}

        {/* Labels */}
        {RADAR_DATA.map((item, i) => {
           const pos = getLabelPosition(i, RADAR_DATA.length, center, radius);
           const isHovered = hoveredIndex === i;
           return (
             <g key={i} className="pointer-events-none transition-all duration-300">
                <text 
                  x={pos.x} 
                  y={pos.y} 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill={isHovered ? "#F5C518" : "#9CA3AF"}
                  fontSize={isHovered ? "12" : "10"}
                  fontWeight="bold"
                >
                  {item.subject}
                </text>
             </g>
           );
        })}
      </svg>
      
      {/* Dynamic Floating Tooltip in Center or near point */}
      {hoveredIndex !== null && (() => {
         const item = RADAR_DATA[hoveredIndex];
         const angleStep = (Math.PI * 2) / RADAR_DATA.length;
         const angle = hoveredIndex * angleStep - Math.PI / 2;
         const value = (item.A / item.fullMark);
         // Position tooltip slightly above the point
         const x = center + Math.cos(angle) * (radius * value); 
         const y = center + Math.sin(angle) * (radius * value);
         
         // Using absolute positioning relative to container for HTML tooltip over SVG
         return (
           <div 
             className="absolute bg-zinc-800 text-white text-xs px-2 py-1 rounded border border-brand-yellow/50 shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-10px] z-10 whitespace-nowrap"
             style={{ 
               left: `calc(50% + ${Math.cos(angle) * (radius * value)}px)`, 
               top: `calc(50% + ${Math.sin(angle) * (radius * value)}px)` 
             }}
           >
             <span className="font-bold text-brand-yellow">{item.subject}</span>: {item.A} / 5.0
           </div>
         );
      })()}

      
      {/* Legend */}
      <div className="absolute bottom-0 right-0 flex flex-col gap-1 text-[10px] text-zinc-500 bg-zinc-900/80 p-2 rounded border border-zinc-800">
        <div className="flex items-center gap-2">
           <span className="w-3 h-0.5 bg-brand-yellow"></span>
           <span>我的熟练度</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="w-3 h-0.5 bg-zinc-500 border-b border-dashed"></span>
           <span>平均水平 (3.5)</span>
        </div>
      </div>
    </div>
  );
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column: Education & Radar */}
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <BookOpen className="text-brand-yellow" /> 教育背景 <span className="text-zinc-500 text-xl font-normal ml-2">Education</span>
            </h2>
            <div className="space-y-8 mb-16">
              {PERSONAL_INFO.education.map((edu, idx) => (
                <div key={idx} className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 hover:border-brand-yellow/30 transition-colors">
                  <h3 className="text-xl font-semibold text-white">{edu.school}</h3>
                  <p className="text-brand-yellow font-medium mt-1">{edu.degree}</p>
                  <p className="text-zinc-500 text-sm mt-2 font-mono bg-zinc-950 inline-block px-2 py-1 rounded">{edu.period}</p>
                </div>
              ))}
            </div>

            {/* Radar Chart Section - Moved to Left for Balance */}
            <div className="bg-zinc-900/20 rounded-2xl border-2 border-brand-yellow/30 shadow-[0_0_15px_rgba(245,197,24,0.05)] p-4">
               <div className="text-center pt-2 text-zinc-500 text-sm font-mono tracking-wider uppercase">Core Tech Stack Proficiency</div>
               <RadarChart />
            </div>
          </div>

          {/* Right Column: Skills */}
          <div>
             <h2 className="text-4xl font-bold mb-12 border-l-4 border-brand-yellow pl-6 flex items-end">
              技能图谱 <span className="text-zinc-500 text-2xl font-normal ml-4">Skills Map</span>
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {SKILLS.map((category) => (
                <div key={category.category} className="bg-zinc-900 p-6 rounded-2xl hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-700 h-full">
                  <h4 className="text-lg font-bold text-white mb-4 border-b border-zinc-700 pb-2 flex items-center gap-2">
                    <Hexagon size={16} className="text-brand-yellow" />
                    {category.category.split(' (')[0]}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-3 py-1.5 bg-black rounded-lg text-sm text-zinc-300 border border-zinc-800 hover:text-white hover:border-brand-yellow/50 transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-8 rounded-2xl border border-zinc-800">
               <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                 核心价值 <span className="text-zinc-500 text-lg font-normal">Core Values</span>
               </h3>
               <p className="text-zinc-400 leading-relaxed mb-4">
                 技术与产品的完美结合。全面的AI产品能力，从需求分析到上线的全流程经验，具备深厚的技术背景与敏锐的产品思维，专注于多场景AI落地实践。
               </p>
               <div className="flex gap-4 text-sm text-brand-yellow font-mono">
                 <span>#产品思维</span>
                 <span>#技术落地</span>
                 <span>#持续创新</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;
