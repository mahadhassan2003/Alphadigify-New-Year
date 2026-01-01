import PosterGenerator from "@/components/PosterGenerator";
import { motion } from "framer-motion";
import logoUrl from "@assets/LOGO_1767181757320.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-amber-200">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-200/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 relative z-10">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 mb-8 md:mb-12">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 md:gap-4"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden p-1.5 md:p-2">
              <img src={logoUrl} alt="Alphadigify Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="text-xl md:text-3xl font-heading font-black tracking-tighter text-slate-900 leading-none uppercase">
                Alphadigify <span className="text-primary italic"></span>
              </h1>
              <p className="text-[10px] md:text-sm font-bold text-muted-foreground uppercase tracking-widest mt-0.5 md:mt-1">
                #26 Apna Hai
              </p>
            </div>
          </motion.div>

          <nav className="flex items-center gap-6 text-sm font-bold uppercase tracking-widest text-slate-500">
            <span className="bg-slate-900 text-white px-5 py-2 rounded-full text-[10px] shadow-lg shadow-slate-900/20">#26 Apna Hai</span>
          </nav>
        </header>

        <main>
          <PosterGenerator />
        </main>

        <footer className="mt-16 text-center border-t border-slate-200 pt-10 pb-6">
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">
            Created by Alphadigify &bull; Celebrations 2026
          </p>
        </footer>
      </div>
    </div>
  );
}
