import React from 'react';
import { useCMSPage } from '../hooks/useCMSBlock';
import { Rocket, CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, MessageSquare } from 'lucide-react';
import CMSMedia from '../components/ui/CMSMedia';

const SetupGuide = () => {
  const { blocks, loading } = useCMSPage('setup-guide');

  const heroBlock = blocks?.inner_page_hero || {};
  
  const benefits = blocks?.benefits?.items || [
    { title: 'Regulatory Compliance', desc: 'Navigating state and national education board requirements.', icon: ShieldCheck },
    { title: 'Infrastructure Design', desc: 'Expert architects specialized in modern K-12 campus planning.', icon: Globe },
    { title: 'Operational Setup', desc: 'From HR guidelines to safety protocols and ERP selection.', icon: Zap },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm-blue font-bold tracking-widest uppercase">Loading Setup Guide...</div>;

  return (
    <main className="min-h-screen bg-white pt-8 pb-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Main Content Area */}
        <div className="min-w-0">
          {/* HERO */}
          <div className="bg-gray-900 rounded-[45px] p-12 lg:p-24 text-white flex flex-col items-center text-center relative overflow-hidden mb-16 select-none shadow-2xl">
             <div className="absolute top-0 right-0 w-96 h-96 bg-sm-blue/20 rounded-full blur-[120px] -mr-48 -mt-48" />
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -ml-48 -mb-48" />
             
             <CMSMedia 
                mediaType={heroBlock.mediaType} 
                mediaUrl={heroBlock.mediaUrl} 
                fallbackImg={heroBlock.img} 
                className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
             />

             <div className="relative z-10 max-w-3xl">
                <div className="mx-auto w-fit px-5 py-2 bg-sm-blue text-white font-black rounded-full text-[10px] uppercase tracking-[0.3em] mb-10 shadow-lg">
                   Launchpad 2025
                </div>
                <h1 className="text-5xl lg:text-8xl font-black font-heading leading-none mb-10 tracking-tighter uppercase" dangerouslySetInnerHTML={{ __html: heroBlock.titleHtml || 'Setting Up <br/> <span className="text-sm-blue italic font-serif lowercase tracking-normal">a</span> <br/> School in India.' }} />
                <p className="text-white/40 text-[13px] font-black uppercase tracking-widest leading-loose max-w-xl mx-auto mb-12">
                   {heroBlock.subtitle || "A comprehensive consultancy framework designed to bridge the gap between vision and operational reality for new institutions."}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                   <button className="px-10 py-5 bg-white text-gray-900 font-black rounded-full text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-sm-blue hover:text-white transition-all shadow-xl">
                      Request Consultation <ArrowRight size={18} />
                   </button>
                </div>
             </div>
          </div>

          {/* BENEFITS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
             {benefits.map((b, i) => (
                <div key={i} className="bg-gray-50 p-10 rounded-[40px] border border-gray-100 group hover:border-sm-blue transition-all">
                   <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter mb-4">{b.title}</h3>
                   <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed mb-8">{b.desc}</p>
                   <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-sm-blue shadow-sm group-hover:scale-110 transition-transform">
                      <Rocket size={24} />
                   </div>
                </div>
             ))}
          </div>

          {/* ADVISORY SECTION */}
          <div className="bg-sm-blue rounded-[45px] p-16 text-white text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.1),transparent)]" />
             <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-6">Expert Advisory Board.</h2>
                <p className="text-white/60 text-[11px] font-black uppercase tracking-[0.2em] mb-12 leading-loose">
                   Gain access to our panel of educationists, architects, and legal consultants who have helped establish 50+ successful schools across the subcontinent.
                </p>
                <button className="px-12 py-5 bg-white text-sm-blue font-black rounded-full text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto shadow-2xl">
                   <MessageSquare size={18} /> Connect with Leads
                </button>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SetupGuide;
