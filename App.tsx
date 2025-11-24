
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import WhyMe from './components/WhyMe';

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <WhyMe />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;
