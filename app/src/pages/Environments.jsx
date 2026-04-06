// src/pages/Environments.jsx
import React, { useState } from 'react';
import { Sparkles, Wind, Sun, Leaf, ArrowUpRight, CheckCircle2, Layers } from 'lucide-react';
import InlineQuickView from '../components/InlineQuickView';
import { useCMSPage } from '../hooks/useCMSBlock';
import CMSMedia from '../components/ui/CMSMedia';
import CatalogueCard from '../components/CatalogueCard';

const DEFAULT_CONTENT = {
  hero: {
    badge: 'Sensory Hub 2025',
    titleHtml: 'Atmosphere <br/> <span class="text-sm-blue italic font-serif lowercase tracking-normal text-left">is</span> <br/> Everything.',
    subtitle: 'Harmonizing architectural sensory design to stimulate deep academic performance.',
  },
  actionCard: {
    titleHtml: 'Request <br/> Environment <br/> Audit Survey.',
    btnText: 'Apply Online',
  },
  heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
  subBlocks: [
    { title: 'Eco Materials', subtitle: 'SUSTAINABLE', icon: 'Leaf' },
    { title: 'Sound Control', subtitle: 'ACOUSTICS', icon: 'Wind' },
    { title: 'Digital Lighting', subtitle: 'LUMENS V2', icon: 'Sun' },
  ],
  infoGrid: {
    titleHtml: 'Engineering <span class="text-sm-blue">Atmospheres.</span>',
    points: ['CFD Modeled', 'Acoustic Labs', 'UV Protected', 'Ergo Tech'],
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80',
  },
  masonryItems: [
    { t: 'Natural Light Study', c: 'Optics', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80', h: 'h-[220px]' },
    { t: 'Acoustic Panel Grid', c: 'Sound', img: 'https://images.unsplash.com/photo-1541829070764-84a7d30dee62?w=600&q=80', h: 'h-[280px]' },
    { t: 'Biophilic Design', c: 'Nature', img: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=800&q=80', h: 'h-[250px]' },
    { t: 'Air Quality Lab', c: 'Climate', img: 'https://images.unsplash.com/photo-1581093196277-9f608109ca46?w=800&q=80', h: 'h-[220px]' },
    { t: 'Botanical Courtyard', c: 'Organic', img: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&q=80', h: 'h-[310px]' },
    { t: 'Zen Meditation Pod', c: 'Focus', img: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&q=80', h: 'h-[250px]' },
  ],
};

const ICONS = { Leaf, Wind, Sun, Layers };

const Environments = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { blocks, loading } = useCMSPage('environments');
  
  const d = blocks?.environments_page_content || DEFAULT_CONTENT;

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm-blue font-bold tracking-widest uppercase">Loading Environments...</div>;

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content Area */}
        <div className="min-w-0">
          {/* BENTO HIGH-DENSITY HERO */}
          <section className="pt-2 pb-6 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 gap-3 items-stretch h-auto mb-8">
             {/* BIG TEXT BLOCK */}
             <div className="md:col-span-3 lg:col-span-2 bg-white rounded-[40px] p-10 flex flex-col justify-center border border-gray-100 shadow-sm relative overflow-hidden group min-h-[350px]">
                <CMSMedia 
                  mediaType={d.hero?.mediaType} 
                  mediaUrl={d.hero?.mediaUrl} 
                  fallbackImg={d.heroImage} 
                  className="absolute inset-0 w-full h-full object-cover opacity-5 group-hover:opacity-10 transition-all duration-1000"
                />
                <div className="px-5 py-2 bg-sm-blue text-white font-black rounded-full text-[9px] uppercase tracking-[0.3em] mb-10 w-fit shadow-xl shadow-blue-500/20 relative z-10">
                   <Sparkles size={14} className="inline mr-2" /> {d.hero?.badge}
                </div>
                <h1 className="text-5xl lg:text-7xl font-black font-heading leading-tight mb-8 tracking-tighter text-gray-900 uppercase relative z-10" dangerouslySetInnerHTML={{ __html: d.hero?.titleHtml }} />
                <p className="text-gray-400 text-[12px] font-bold uppercase tracking-widest max-w-sm leading-loose text-left relative z-10">
                   {d.hero?.subtitle}
                </p>
             </div>

             {/* ACTION CARD - BLACK */}
             <div className="md:col-span-3 lg:col-span-1 bg-gray-900 rounded-[40px] p-10 text-white flex flex-col justify-between group overflow-hidden relative border border-gray-800 shadow-2xl">
                <h3 className="text-[12px] font-black uppercase tracking-[0.3em] leading-relaxed text-sm-blue" dangerouslySetInnerHTML={{ __html: d.actionCard?.titleHtml }} />
                <div className="flex items-center justify-between mt-12">
                   <button className="px-6 py-4 bg-sm-blue text-white font-black rounded-full text-[9px] uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-blue-500/20">{d.actionCard?.btnText}</button>
                   <ArrowUpRight className="text-white/20 group-hover:text-sm-blue transition-colors" size={32} />
                </div>
             </div>

             <div className="hidden lg:block lg:col-span-1 bg-gray-100 rounded-[40px] overflow-hidden relative shadow-sm border border-gray-100 min-h-[350px]">
                <CMSMedia 
                  mediaType={d.hero?.mediaType} 
                  mediaUrl={d.hero?.mediaUrl} 
                  fallbackImg={d.heroImage} 
                  className="w-full h-full object-cover brightness-95 transition-all duration-700 hover:scale-110"
                />
             </div>

             {/* SUB-BLOCKS */}
             {(d.subBlocks || []).map((sb, i) => {
               const Icon = ICONS[sb.icon] || Sparkles;
               return (
                 <div key={i} className="md:col-span-2 lg:col-span-1 bg-white rounded-[35px] p-8 border border-gray-100 shadow-sm flex items-center justify-between group hover:border-sm-blue transition-colors h-[120px]">
                    <div className="flex flex-col gap-2">
                       <span className="text-[14px] font-black text-gray-900 uppercase tracking-tighter">{sb.title}</span>
                       <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">{sb.subtitle}</span>
                    </div>
                    <Icon className="text-blue-300 group-hover:text-sm-blue transition-colors" size={32} />
                 </div>
               );
             })}

             {/* FLOW BLOCK */}
             <div className="hidden lg:flex lg:col-span-1 bg-blue-50/50 rounded-[35px] p-8 border border-blue-100 shadow-sm items-center justify-between group hover:bg-sm-blue hover:text-white transition-all h-[120px]">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] leading-tight">Spatial Research Indices</span>
                <Layers className="text-sm-blue group-hover:text-white transition-colors" size={28} />
             </div>
          </section>

          {/* MASONRY DISPLAY */}
          <section className="py-12 border-t border-gray-100">
             <h2 className="text-[28px] font-black font-heading text-gray-900 uppercase tracking-tighter mb-12 flex items-center gap-6">
                CASE STUDIES <div className="h-1 flex-grow bg-gray-100 rounded-full" />
             </h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                {(d.masonryItems || []).map((work, i) => (
                   <React.Fragment key={i}>
                      <CatalogueCard 
                        work={{ name: work.t, subcategory: work.c, image: work.img }} 
                        isSelected={selectedItem?.t === work.t} 
                        onClick={() => setSelectedItem(selectedItem?.t === work.t ? null : work)} 
                        themeColor="bg-sm-blue"
                        ringColor="ring-blue-500"
                        textColor="text-blue-400"
                      />

                      {/* INLINE EXPANSION LOGIC */}
                      {/* Mobile */}
                      <div className="md:hidden col-span-full">
                         {selectedItem?.t === work.t && (
                            <InlineQuickView isOpen={true} onClose={() => setSelectedItem(null)} data={{ ...selectedItem, name: selectedItem.t, subcategory: selectedItem.c, image: selectedItem.img }} />
                         )}
                      </div>
                      {/* Tablet (2 cols) */}
                      {i % 2 === 1 && (
                         <div className="hidden md:block lg:hidden col-span-full">
                            {(d.masonryItems || []).slice(i-1, i+1).some(dw => dw.t === selectedItem?.t) && (
                               <InlineQuickView isOpen={true} onClose={() => setSelectedItem(null)} data={{ ...selectedItem, name: selectedItem.t, subcategory: selectedItem.c, image: selectedItem.img }} />
                            )}
                         </div>
                      )}
                      {/* Desktop (3 cols) */}
                      {i % 3 === 2 && (
                         <div className="hidden lg:block col-span-full">
                            {(d.masonryItems || []).slice(i-2, i+1).some(dw => dw.t === selectedItem?.t) && (
                               <InlineQuickView isOpen={true} onClose={() => setSelectedItem(null)} data={{ ...selectedItem, name: selectedItem.t, subcategory: selectedItem.c, image: selectedItem.img }} />
                            )}
                         </div>
                      )}
                      {/* Handle End of List */}
                      {i === (d.masonryItems || []).length - 1 && (
                         <>
                            <div className="hidden md:block lg:hidden col-span-full">
                               {(d.masonryItems || []).slice(Math.floor(i/2)*2).some(dw => dw.t === selectedItem?.t) && i % 2 !== 1 && (
                                  <InlineQuickView isOpen={true} onClose={() => setSelectedItem(null)} data={{ ...selectedItem, name: selectedItem.t, subcategory: selectedItem.c, image: selectedItem.img }} />
                               )}
                            </div>
                            <div className="hidden lg:block col-span-full">
                               {(d.masonryItems || []).slice(Math.floor(i/3)*3).some(dw => dw.t === selectedItem?.t) && i % 3 !== 2 && (
                                  <InlineQuickView isOpen={true} onClose={() => setSelectedItem(null)} data={{ ...selectedItem, name: selectedItem.t, subcategory: selectedItem.c, image: selectedItem.img }} />
                               )}
                            </div>
                         </>
                      )}
                   </React.Fragment>
                ))}
             </div>
          </section>

          {/* INFO SPLIT GRID */}
          <section className="py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border-t border-gray-100 mt-12 bg-white rounded-[60px] p-12 lg:p-20 shadow-xl">
             <div className="pr-8">
                <h2 className="text-5xl font-black text-gray-900 font-heading mb-12 leading-none uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: d.infoGrid?.titleHtml }} />
                <div className="grid grid-cols-2 gap-6">
                   {(d.infoGrid?.points || []).map((item, i) => (
                      <div key={i} className="flex items-center gap-4 text-[12px] font-black text-gray-900 uppercase tracking-widest bg-gray-50 p-6 rounded-3xl group hover:bg-sm-blue hover:text-white transition-all border border-gray-100">
                         <CheckCircle2 size={18} className="text-sm-blue group-hover:text-white" />
                         {item}
                      </div>
                   ))}
                </div>
             </div>
             <div className="rounded-[60px] overflow-hidden shadow-2xl h-[450px]">
                <img src={d.infoGrid?.img} alt="Consultation" className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
             </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Environments;
