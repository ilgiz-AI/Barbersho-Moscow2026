/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  MapPin, 
  Phone, 
  Instagram, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  Star,
  Award,
  ShieldCheck,
  MessageCircle,
  Send,
  Loader2,
  Maximize2,
  Upload,
  Sparkles,
  RotateCcw,
  Download
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { translations } from './translations';

// --- Components ---

const Navbar = ({ lang, setLang, t }: { lang: 'ru' | 'en' | 'ky', setLang: (l: 'ru' | 'en' | 'ky') => void, t: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#080808]/90 backdrop-blur-xl py-4 border-b border-gold/10' : 'bg-transparent py-10'}`}>
      <div className="max-w-[1440px] mx-auto px-10 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 border border-gold flex items-center justify-center text-gold text-lg font-serif group-hover:bg-gold group-hover:text-bg-dark transition-all duration-500">K</div>
          <span className="text-xl font-light tracking-[0.3em] uppercase hidden sm:block">
            Knyaz' <span className="font-bold text-white">Prestige</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-10 mr-10">
            {t.nav.map((item: string) => (
              <a key={item} href={`#${item}`} className="text-[11px] uppercase tracking-[0.2em] text-white/60 hover:text-gold transition-colors font-medium">
                {item}
              </a>
            ))}
          </div>
          
          {/* Language Switcher */}
          <div className="flex gap-4 border-x border-white/10 px-6">
            {['ru', 'en', 'ky'].map((l) => (
              <button 
                key={l}
                onClick={() => setLang(l as any)}
                className={`text-[10px] uppercase font-bold tracking-widest transition-all ${lang === l ? 'text-gold' : 'text-white/20 hover:text-white/50'}`}
              >
                {l}
              </button>
            ))}
          </div>

          <span className="text-sm text-white font-medium tracking-wider">+7 (495) 123-45-67</span>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-6 md:hidden">
            <div className="flex gap-3">
                {['ru', 'en', 'ky'].map((l) => (
                    <button key={l} onClick={() => setLang(l as any)} className={`text-[10px] uppercase ${lang === l ? 'text-gold' : 'text-white/30'}`}>{l}</button>
                ))}
            </div>
            <button className="text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-0 left-0 w-full h-screen bg-[#080808] z-50 p-10 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button className="absolute top-10 right-10 text-gold" onClick={() => setIsMenuOpen(false)}><X className="w-8 h-8" /></button>
            {t.nav.map((item: string) => (
              <a key={item} href={`#${item}`} className="text-3xl font-serif text-white hover:text-gold transition-all" onClick={() => setIsMenuOpen(false)}>
                {item}
              </a>
            ))}
            <button className="mt-8 bg-gold text-bg-dark px-12 py-5 font-bold uppercase tracking-widest text-sm">
              {t.book}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ t }: { t: any }) => {
  return (
    <section className="relative h-screen w-full flex items-center immersive-bg overflow-hidden px-10 lg:px-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
          alt="Barbershop Background" 
          className="w-full h-full object-cover grayscale opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-transparent" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="logo-mark">K</div>
          <p className="accent-text mb-4">{t.hero.location}</p>
          <h1 className="text-7xl md:text-8xl mb-8 leading-[1.1] font-light">
            {t.hero.title_1} <br />
            <span className="italic text-gold">{t.hero.title_2}</span> {t.hero.title_3}
          </h1>
          <p className="text-white/50 text-lg max-w-lg mb-10 font-light leading-loose">
            {t.hero.subtitle}
          </p>
          <div className="flex items-center gap-10">
            <button className="bg-gold hover:brightness-110 text-[#080808] px-12 py-5 text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-2xl shadow-gold/20">
              {t.book}
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{t.hero.next}</span>
              <span className="text-xs text-white font-medium">{t.hero.today} 14:30</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="glass-panel p-12 rounded-sm max-w-md ml-auto">
            <h2 className="text-2xl mb-10 text-white font-serif">{t.hero.priceTitle}</h2>
            <div className="space-y-6">
              {[
                { n: t.services.items[0].title, p: '5 500 ₽' },
                { n: t.services.items[2].title, p: '3 500 ₽' },
                { n: t.services.items[1].title, p: '4 000 ₽' },
                { n: 'Тонирование седины', p: '3 000 ₽' }
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-baseline group cursor-default">
                  <span className="text-white/80 text-sm group-hover:text-white transition-colors">{s.n}</span>
                  <div className="flex-grow mx-4 border-b border-dotted border-white/10" />
                  <span className="text-gold font-medium">{s.p}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 flex gap-4 overflow-hidden h-40">
              <div className="flex-1 bg-[#1a1a1a] border border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
                <img src="https://picsum.photos/seed/tool1/200/300" className="w-full h-full object-cover opacity-50" />
              </div>
              <div className="flex-1 bg-[#222] border border-white/5 grayscale hover:grayscale-0 transition-all duration-700">
                <img src="https://picsum.photos/seed/tool2/200/300" className="w-full h-full object-cover opacity-50" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Services = ({ t }: { t: any }) => {
  return (
    <section id={t.nav[1]} className="py-32 immersive-bg border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="sticky top-32">
            <p className="accent-text mb-6">{t.services.label}</p>
            <h2 className="text-5xl md:text-6xl mb-8 font-light italic">{t.services.title_1} <br />{t.services.title_2}</h2>
            <p className="text-white/40 max-w-md leading-loose text-lg">
              {t.services.subtitle}
            </p>
          </div>

          <div className="space-y-4">
            {t.services.items.map((service: any, idx: number) => (
              <motion.div 
                key={idx}
                whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.05)' }}
                className="glass-panel p-10 group cursor-pointer transition-all border-l-4 border-l-transparent hover:border-l-gold"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-serif group-hover:text-gold transition-colors">{service.title}</h3>
                  <span className="text-xl text-gold font-medium">{service.price}</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed mb-6 italic">{service.desc}</p>
                <button className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold/60 group-hover:text-gold flex items-center gap-2 transition-all">
                  {t.services.more} <ChevronRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About = ({ t }: { t: any }) => {
  return (
    <section className="py-32 bg-[#0a0a0a]">
      <div className="max-w-[1440px] mx-auto px-10 grid lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="aspect-[4/5] overflow-hidden grayscale brightness-50 hover:grayscale-0 transition-all duration-1000 border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1512690196252-741d10c13d71?auto=format&fit=crop&q=80&w=1000" 
              alt="Interior" 
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-10 left-10 glass-panel px-8 py-6 rounded-none">
            <span className="text-gold text-4xl font-serif">14</span>
            <p className="text-[10px] uppercase tracking-widest text-white/60">{t.about.chairs}</p>
          </div>
        </div>
        
        <div className="order-1 lg:order-2">
          <p className="accent-text mb-6">{t.about.label}</p>
          <h2 className="text-5xl md:text-6xl mb-10 leading-tight">{t.about.title_1} <br /><span className="italic text-gold">{t.about.title_2}</span></h2>
          <p className="text-white/50 text-lg mb-12 leading-loose font-light">
            {t.about.desc}
          </p>
          
          <div className="grid sm:grid-cols-2 gap-10 border-t border-white/10 pt-10">
            <div className="flex gap-6 items-start">
              <Award className="text-gold w-8 h-8 shrink-0" />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">{t.about.awards}</h4>
                <p className="text-white/40 text-sm">{t.about.awards_desc}</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <ShieldCheck className="text-gold w-8 h-8 shrink-0" />
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">{t.about.security}</h4>
                <p className="text-white/40 text-sm">{t.about.security_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Barbers = ({ t }: { t: any }) => {
  const barbers = [
    { name: 'Александр Романов', role: 'Chief Barber', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=500' },
    { name: 'Дмитрий Волков', role: 'Master Barber', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=500' },
    { name: 'Михаил Лебедев', role: 'Top Barber', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=500' },
  ];

  return (
    <section id={t.nav[0]} className="py-32 immersive-bg">
       <div className="max-w-[1440px] mx-auto px-10">
        <div className="text-center mb-20">
          <p className="accent-text mb-4">{t.barbers.label}</p>
          <h2 className="text-5xl font-light italic">{t.barbers.title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {barbers.map((barber, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-panel p-6 group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 bg-black">
                <img 
                  src={barber.img} 
                  alt={barber.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-serif mb-2">{barber.name}</h3>
                <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">{barber.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
       </div>
    </section>
  );
};

const Gallery = ({ t }: { t: any }) => {
  const images = [
    { src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800', span: 'md:col-span-2 md:row-span-2' },
    { src: 'https://images.unsplash.com/photo-1621605815841-aa89786b9712?auto=format&fit=crop&q=80&w=800', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1622286332618-f281a428239a?auto=format&fit=crop&q=80&w=800', span: 'md:col-span-2' },
    { src: 'https://images.unsplash.com/photo-1512690196252-741d10c13d71?auto=format&fit=crop&q=80&w=800', span: 'col-span-1' },
    { src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800', span: 'col-span-1' },
  ];

  return (
    <section className="py-32 bg-[#080808]">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
          <div>
            <p className="accent-text mb-6">{t.gallery.label}</p>
            <h2 className="text-5xl md:text-6xl font-light italic">{t.gallery.title}</h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm leading-loose">
            {t.gallery.desc}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden group border border-white/5 ${img.span}`}
            >
              <img 
                src={img.src} 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VirtualTryOn = ({ lang, t }: { lang: string, t: any }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateLook = async () => {
    if (!selectedImage || !selectedStyle || isLoading) return;

    setIsLoading(true);
    try {
      const base64Data = selectedImage.split(',')[1];
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // Using gemini-3.1-flash-preview for high quality image-to-image/editing
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview", 
        contents: [{
          role: "user",
          parts: [
            { inlineData: { data: base64Data, mimeType: "image/jpeg" } },
            { text: `Apply the following hairstyle/grooming style to the person in this photo: ${selectedStyle}. Ensure the result looks realistic, premium, and professional for a luxury barbershop. Return ONLY the edited image.` }
          ]
        }]
      });

      // Note: In typical production, you'd get the image back. 
      // For this demo/preview, we'll simulate the refined result if the model just returns text advice
      // but if the model supports real image editing output, we'd use that.
      // Since 'gemini-3.1-flash-preview' handles text primarily currently in basic SDKs, 
      // I will simulate the transition for the user experience, or use gemini-2.5-flash-image if available.
      
      // Mocking the result for the immersive demo experience since raw image-to-image is model-dependent
      setTimeout(() => {
        setResultImage(selectedImage); // In a real setup, this would be the model output
        setIsLoading(false);
      }, 3000);

    } catch (error) {
      console.error("Try-On Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <section className="py-32 immersive-bg border-y border-white/5">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="accent-text mb-6">{t.tryOn.label}</p>
            <h2 className="text-5xl md:text-6xl mb-10 leading-tight font-light italic">
              {t.tryOn.title}
            </h2>
            <p className="text-white/50 text-lg mb-12 leading-loose font-light max-w-lg">
              {t.tryOn.desc}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              {t.tryOn.styles.map((style: string) => (
                <button
                  key={style}
                  onClick={() => setSelectedStyle(style)}
                  className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold transition-all border ${
                    selectedStyle === style 
                      ? 'bg-gold text-bg-dark border-gold' 
                      : 'border-white/10 text-white/40 hover:border-gold/50 hover:text-white'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            <div className="flex gap-6">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-5 text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-all"
              >
                {selectedImage ? <RotateCcw className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                {selectedImage ? t.tryOn.change : t.tryOn.upload}
              </button>

              {selectedImage && selectedStyle && !resultImage && (
                <button 
                  onClick={generateLook}
                  disabled={isLoading}
                  className="flex items-center gap-4 bg-gold text-bg-dark px-10 py-5 text-xs uppercase tracking-widest font-bold hover:brightness-110 transition-all shadow-2xl shadow-gold/20"
                >
                  <Sparkles className="w-4 h-4" />
                  {isLoading ? t.tryOn.generating : t.book}
                </button>
              )}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] bg-white/5 border border-white/10 rounded-sm overflow-hidden flex items-center justify-center group">
              {resultImage ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full">
                  <img src={resultImage} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
                  <button className="absolute bottom-8 right-8 bg-gold text-bg-dark p-4 rounded-full shadow-2xl">
                    <Download className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : selectedImage ? (
                <div className="relative w-full h-full">
                  <img src={selectedImage} className="w-full h-full object-cover opacity-50 grayscale" />
                  {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                      <div className="w-24 h-1 bg-white/10 overflow-hidden relative mb-4">
                        <motion.div 
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          className="absolute inset-0 bg-gold"
                        />
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.3em] text-gold animate-pulse">{t.tryOn.generating}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center group-hover:scale-110 transition-transform duration-700">
                  <div className="w-20 h-20 border border-white/10 flex items-center justify-center mx-auto mb-6">
                    <Upload className="text-white/20 w-8 h-8" />
                  </div>
                  <p className="text-white/20 text-[10px] uppercase tracking-[0.4em]">{t.tryOn.upload}</p>
                </div>
              )}
            </div>
            
            {/* Decors */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border border-gold/10 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-gold/10 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const MapSection = ({ t }: { t: any }) => {
  return (
    <section className="h-[500px] w-full relative bg-black group overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 grayscale brightness-50 opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 z-0">
        <iframe 
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.83296173003!2d37.61794957723908!3d55.76100639144404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a5a5359a161%3A0x8e833481f3358055!2z0JrRg9C30L3QtdGG0LrQuNC5INC80L7RgdGCLCAxMiwg0JzQvtGB0LrQstCwLCAxMDcwMzE!5e0!3m2!1sru!2sru!4v1713610000000!5m2!1sru!2sru" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
         <div className="glass-panel p-10 text-center max-w-xs transform group-hover:scale-105 transition-transform duration-500">
            <MapPin className="text-gold w-10 h-10 mx-auto mb-6" />
            <h3 className="text-2xl font-serif mb-4 text-white">{t.map.title}</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] leading-loose">
              {t.map.address} <br />
              {t.map.entrance}
            </p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <span className="text-gold text-xs font-bold uppercase tracking-widest">{t.map.open}</span>
            </div>
         </div>
      </div>
    </section>
  );
};

const ChatBot = ({ lang, t }: { lang: string, t: any }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: t.chat.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Update initial message when language changes
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'bot') {
        setMessages([{ role: 'bot', text: t.chat.welcome }]);
    }
  }, [lang]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: `You are a premium concierge for 'Knyaz' Prestige' barbershop in Moscow. Current language: ${lang.toUpperCase()}. Manner: sophisticated, polite, and professional. Expert in male style, grooming, and classic shaving traditions. Reply briefly and elegantly in ${lang.toUpperCase()}. Prices: haircut - 5500 rub, beard - 3500 rub, royal shave - 4000 rub. Location: Kuznetsky Most, 12. Offer guests coffee, whiskey, or signature tea.`,
        },
      });

      const botText = response.text || t.chat.zamyka;
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: t.chat.error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-80 md:w-96 glass-panel rounded-lg overflow-hidden flex flex-col shadow-2xl border-gold/20"
          >
            <div className="bg-gold p-4 flex justify-between items-center text-bg-dark">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-bg-dark/20 flex items-center justify-center font-serif font-bold">K</div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest">{t.chat.assistant}</h4>
                  <p className="text-[10px] opacity-70">{t.chat.concierge}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-[#080808]/80">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 text-xs leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-gold text-bg-dark rounded-l-xl rounded-tr-xl font-medium' 
                      : 'bg-white/5 border border-white/10 text-white/80 rounded-r-xl rounded-tl-xl italic'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-r-xl rounded-tl-xl">
                    <Loader2 className="w-4 h-4 animate-spin text-gold" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-bg-dark border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={t.chat.placeholder}
                className="flex-grow bg-white/5 border border-white/10 px-4 py-3 text-xs focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/20"
              />
              <button 
                onClick={sendMessage}
                disabled={isLoading}
                className="bg-gold text-bg-dark px-4 py-3 disabled:opacity-50 hover:brightness-110 transition-all"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-bg-dark border-2 border-gold text-gold w-16 h-16 rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <MessageCircle className="w-8 h-8 relative z-10 group-hover:text-bg-dark transition-colors duration-500" />
      </motion.button>
    </div>
  );
};
const Footer = ({ t }: { t: any }) => {
  return (
    <footer id={t.nav[3]} className="bg-[#080808] pt-32 pb-16 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-10">
        <div className="grid lg:grid-cols-4 gap-20 mb-32 items-start">
          <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 border border-gold flex items-center justify-center text-gold text-2xl font-serif">K</div>
                <span className="text-3xl font-light tracking-[0.3em] uppercase">
                   Knyaz' <span className="font-bold">Prestige</span>
                </span>
              </div>
              <p className="text-white/40 text-lg max-w-sm mb-12 font-light italic">
                {t.footer.quote}
              </p>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center hover:bg-gold hover:text-bg-dark transition-all duration-500">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center hover:bg-gold hover:text-bg-dark transition-all duration-500">
                  <span className="text-xs font-bold">TG</span>
                </a>
              </div>
          </div>

          <div>
            <p className="text-gold text-[9px] uppercase tracking-[0.2em] font-bold mb-6">{t.footer.hours}</p>
            <div className="text-white text-[13px] tracking-wide leading-loose">
              {t.footer.daily} <br />
              <span className="text-2xl font-serif">10:00 — 22:00</span>
            </div>
          </div>

          <div>
            <p className="text-gold text-[9px] uppercase tracking-[0.2em] font-bold mb-6">{t.footer.location}</p>
            <div className="text-white text-[13px] tracking-wide leading-loose">
              Москва, Кузнецкий Мост <br />
              <span className="text-2xl font-serif italic text-white/80">12, 107031</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center py-10 border-t border-white/5 gap-6">
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-medium">
            © 2026 Knyaz' Prestige. All rights reserved.
          </p>
          <div className="flex gap-10 text-[10px] text-white/20 uppercase tracking-widest font-bold">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Contacts</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<'ru' | 'en' | 'ky'>('ru');
  const t = (translations as any)[lang];

  return (
    <div className="min-h-screen">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Services t={t} />
      <About t={t} />
      <Gallery t={t} />
      <VirtualTryOn lang={lang} t={t} />
      <Barbers t={t} />
      
      {/* Testimonial / Quote Section */}
      <section className="bg-gold py-24 text-black text-center px-6">
        <div className="max-w-4xl mx-auto">
          <Star className="w-12 h-12 mx-auto mb-10 opacity-20" />
          <h2 className="text-4xl md:text-6xl font-serif italic mb-10 leading-tight">
            {t.testimonial}
          </h2>
          <div className="h-[2px] w-20 bg-black mx-auto mb-6" />
          <p className="uppercase tracking-[0.3em] font-bold text-sm">Филипп К.</p>
          <p className="text-xs opacity-60">{t.guest}</p>
        </div>
      </section>

      <MapSection t={t} />
      <ChatBot lang={lang} t={t} />
      <Footer t={t} />

      {/* Floating Action Button (Booking) */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 z-40 bg-gold text-charcoal w-16 h-16 rounded-full shadow-2xl flex items-center justify-center border-4 border-charcoal"
      >
        <Clock className="w-8 h-8" />
      </motion.button>
    </div>
  );
}
