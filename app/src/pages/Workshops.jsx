import React from 'react';
import { useCMSPage } from '../hooks/useCMSBlock';
import { Calendar, MapPin, Users, ArrowRight, Zap, Target, Award, PlayCircle } from 'lucide-react';
import CMSMedia from '../components/ui/CMSMedia';

const Workshops = () => {
  const { blocks, loading } = useCMSPage('workshops');

  const heroBlock = blocks?.inner_page_hero || {};
  
  const upcomingEvents = blocks?.upcoming_events?.items || [
    { title: 'Masterclass: Hybrid Learning Ecosystems', date: '25 May 2025', location: 'Virtual Summit', speakers: ['Dr. Sarah J', 'John Doe'], type: 'Webinar', status: 'Book Now' },
    { title: 'Workshop: Future-Proof School Architecture', date: '12 June 2025', location: 'New Delhi', speakers: ['Ar. Mike R'], type: 'Workshop', status: 'Limited Seats' },
    { title: 'Conference: NEP Compliance 2025', date: '15 July 2025', location: 'Mumbai', speakers: ['Panel Experts'], type: 'Summit', status: 'Upcoming' },
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center text-sm-blue font-bold tracking-widest uppercase">Loading Events...</div>;

  return (
    <main className="min-h-screen bg-white pt-8 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content Area */}
        <div className="min-w-0">
          {/* HERO */}
          <div className="bg-white rounded-[45px] p-12 lg:p-24 border border-gray-100 shadow-sm relative overflow-hidden group min-h-[500px] flex flex-col justify-center text-center items-center mb-16">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-sm-blue/5 rounded-l-[100px] blur-[120px] pointer-events-none transition-all group-hover:bg-sm-blue/10" />
             <div className="absolute top-0 left-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Target size={200} className="text-sm-blue" />
             </div>
             
             <CMSMedia 
                mediaType={heroBlock.mediaType} 
                mediaUrl={heroBlock.mediaUrl} 
                fallbackImg={heroBlock.img} 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.02] grayscale"
             />

             <div className="relative z-10 max-w-4xl mx-auto">
                <div className="mx-auto w-fit px-5 py-2 bg-sm-blue/10 text-sm-blue font-black rounded-full text-[9px] uppercase tracking-[0.4em] mb-12 shadow-sm flex items-center gap-3">
                   <PlayCircle size={16} /> Educator Summit 2025
                </div>
                <h1 className="text-5xl lg:text-8xl font-black font-heading leading-tight mb-12 tracking-tighter text-gray-900 uppercase" dangerouslySetInnerHTML={{ __html: heroBlock.titleHtml || 'Academic <br/> <span className="text-sm-blue italic font-serif lowercase tracking-normal">and</span> <br/> Masterclasses.' }} />
                <p className="text-gray-400 text-[13px] font-bold uppercase tracking-widest max-w-xl mx-auto leading-loose mb-16 px-4">
                   {heroBlock.subtitle || "A global hub for educationists and school leaders to explore transformative pedagogy and modern campus strategies."}
                </p>
                <button className="px-12 py-5 bg-gray-900 text-white font-black rounded-full text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-sm-blue transition-all shadow-2xl mx-auto">
                   Explore Academic Calendar <Calendar size={18} />
                </button>
             </div>
          </div>

          {/* EVENTS LIST */}
          <div className="space-y-6 max-w-5xl mx-auto">
             <h2 className="text-[28px] font-black font-heading text-gray-900 uppercase tracking-tighter mb-10 flex items-center gap-6">
                UPCOMING EVENTS <div className="h-1 flex-grow bg-gray-100 rounded-full" />
             </h2>
             {upcomingEvents.map((event, i) => (
                <div key={i} className="bg-white border border-gray-100 p-10 rounded-[45px] shadow-sm hover:shadow-2xl transition-all group flex flex-col md:flex-row items-center gap-10">
                   <div className="flex-shrink-0 w-24 h-24 bg-gray-900 rounded-[30px] flex flex-col items-center justify-center text-white p-4">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">{event.date.split(' ').slice(-1)}</span>
                      <span className="text-2xl font-black font-heading leading-none text-sm-blue">{event.date.split(' ')[0]}</span>
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/40 mt-1">{event.date.split(' ')[1]}</span>
                   </div>
                   
                   <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-4">
                         <span className="px-3 py-1 bg-sm-blue/10 text-sm-blue text-[8px] font-black uppercase tracking-widest rounded-full">{event.type}</span>
                         <div className="flex items-center gap-2 text-[8px] font-black text-gray-400 uppercase tracking-widest">
                            <MapPin size={10} className="text-sm-blue" /> {event.location}
                         </div>
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter mb-4 group-hover:text-sm-blue transition-colors">{event.title}</h3>
                      <div className="flex flex-wrap gap-4 items-center">
                         {(event.speakers || []).map((s, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                               <Users size={12} className="text-sm-blue" /> {s}
                            </div>
                         ))}
                      </div>
                   </div>

                   <button className="flex-shrink-0 px-10 py-4 bg-gray-50 text-gray-900 font-black rounded-full text-[10px] uppercase tracking-widest border border-gray-100 group-hover:bg-sm-blue group-hover:text-white group-hover:border-sm-blue transition-all">
                      {event.status} <ArrowRight size={14} className="inline ml-2" />
                   </button>
                </div>
             ))}
          </div>

          {/* BOTTOM CALL TO ACTION */}
          <div className="mt-20 bg-gray-900 rounded-[45px] p-16 text-center text-white relative overflow-hidden shadow-2xl">
             <div className="absolute left-0 bottom-0 p-10 opacity-10">
                <Award size={180} />
             </div>
             <h2 className="text-4xl font-black font-heading mb-6 uppercase tracking-tighter">Become a Panel Speaker.</h2>
             <p className="text-white/40 text-[11px] font-black uppercase tracking-widest mb-12 max-w-sm mx-auto leading-loose">Help us shape the future of Indian education. Share your expertise with our growing community of school leaders and stakeholders.</p>
             <button className="px-12 py-5 bg-sm-blue text-white font-black rounded-full text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                Submit Speaker Brief
             </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Workshops;
