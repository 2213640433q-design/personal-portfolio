
import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';
import { MapPin, Phone, Mail, Copy, Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000); // Reset after 2 seconds
    });
  };

  const CopyButton = ({ text, id }: { text: string, id: string }) => (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleCopy(text, id);
      }}
      className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 hover:text-brand-yellow transition-colors ml-2"
      title="Copy to clipboard"
    >
      {copiedId === id ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );

  return (
    <footer id="contact" className="bg-black py-16 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">期待与您合作</h2>
            <p className="text-zinc-500">寻找 AI 产品经理相关机会</p>
          </div>

          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3 text-zinc-400 hover:text-brand-yellow transition-colors group">
                <MapPin size={18} className="flex-shrink-0" />
                <span>{PERSONAL_INFO.location}</span>
             </div>
             
             <div className="flex items-center group">
                <a href={`tel:${PERSONAL_INFO.phone}`} className="flex items-center gap-3 text-zinc-400 hover:text-brand-yellow transition-colors">
                  <Phone size={18} className="flex-shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </a>
                <CopyButton text={PERSONAL_INFO.phone} id="phone" />
             </div>
             
             <div className="flex items-center group">
                <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-3 text-zinc-400 hover:text-brand-yellow transition-colors">
                  <Mail size={18} className="flex-shrink-0" />
                  <span>{PERSONAL_INFO.email}</span>
                </a>
                <CopyButton text={PERSONAL_INFO.email} id="email" />
             </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-900 text-center text-zinc-600 text-sm">
          <p>&copy; {new Date().getFullYear()} {PERSONAL_INFO.chineseName}. All rights reserved.</p>
          <p className="mt-2">Designed based on Portfolix Template.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
