import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Download, Upload, User, Sparkles, PartyPopper, Moon, Globe, Instagram, Phone, Sun, Cloud, Leaf } from "lucide-react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import logoUrl from "@assets/LOGO_1767181757320.png";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  designation: z.string().min(2, "Designation is required"),
});

const templates = [
  { 
    id: "festive-gold", 
    name: "Festive Gold", 
    color: "bg-gradient-to-br from-[#451a03] via-[#b45309] to-[#fbbf24]",
    icon: Sparkles 
  },
  { 
    id: "midnight-party", 
    name: "Midnight Party", 
    color: "bg-slate-900",
    icon: Moon 
  },
  { 
    id: "celebration-red", 
    name: "Vibrant Red", 
    color: "bg-gradient-to-br from-red-600 via-red-800 to-black",
    icon: PartyPopper 
  },
  { 
    id: "pure-white", 
    name: "Pure White", 
    color: "bg-white border border-slate-200",
    icon: Sun 
  },
  { 
    id: "sky-blue", 
    name: "Sky Blue", 
    color: "bg-sky-400",
    icon: Cloud 
  },
  { 
    id: "nature-green", 
    name: "Nature Green", 
    color: "bg-emerald-600",
    icon: Leaf 
  },
];

export default function PosterGenerator() {
  const [template, setTemplate] = useState("festive-gold");
  const [photo, setPhoto] = useState<string | null>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      designation: "",
    },
  });

  const watchedName = form.watch("name");
  const watchedDesignation = form.watch("designation");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = async () => {
    if (!posterRef.current) return;
    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      const dataUrl = await toPng(posterRef.current, { quality: 1.0, pixelRatio: 3, cacheBust: true });
      download(dataUrl, `happy-new-year-2026-${Date.now()}.png`);
      toast({ title: "Success!", description: "Happy New Year! Your poster is ready." });
    } catch (error) {
      toast({ title: "Error", description: "Failed to generate poster.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const getTemplateBaseStyles = (id: string) => {
    switch (id) {
      case "festive-gold": return "bg-[#78350f]";
      case "midnight-party": return "bg-slate-950";
      case "celebration-red": return "bg-red-800";
      case "pure-white": return "bg-white";
      case "sky-blue": return "bg-sky-500";
      case "nature-green": return "bg-emerald-700";
      default: return "bg-slate-900";
    }
  };

  const renderTemplatePreview = (id: string, isSmall = false) => {
    const isWhite = id === 'pure-white';
    return (
      <div className={`relative w-full h-full overflow-hidden ${getTemplateBaseStyles(id)}`}>
        {id === 'festive-gold' && <div className="absolute inset-0 bg-gradient-to-tr from-[#451a03] via-[#b45309] to-[#fbbf24]" />}
        {id === 'midnight-party' && <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.3),transparent_50%)]" />}
        {id === 'celebration-red' && <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-800 to-black" />}
        {id === 'sky-blue' && <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600" />}
        {id === 'nature-green' && <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-800" />}
        
        <div className={`relative z-10 flex flex-col items-center justify-center h-full w-full ${isSmall ? 'p-1' : 'p-4'}`}>
          <div className={`${isSmall ? 'text-[8px]' : 'text-xs'} font-brush italic ${isWhite ? 'text-slate-900' : 'text-white'} opacity-80 leading-none`}>#26</div>
          <div className={`${isSmall ? 'text-[6px]' : 'text-[10px]'} font-brush italic ${isWhite ? 'text-slate-900' : 'text-white'} leading-none`}>Apna Hai</div>
        </div>
      </div>
    );
  };

  const renderTemplate = () => {
    const isWhite = template === 'pure-white';
    const textColor = isWhite ? 'text-slate-900' : 'text-white';
    const subTextColor = isWhite ? 'text-slate-600' : 'text-white/80';
    const logoClass = isWhite ? '' : 'brightness-0 invert';

    const commonContent = (
      <div className="relative z-20 flex flex-col items-center justify-between h-full w-full py-4 md:py-10 px-3 md:px-8 text-center">
        <div className="absolute top-3 left-3 md:top-8 md:left-8 w-8 h-8 md:w-16 md:h-16">
          <img src={logoUrl} alt="Alphadigify Logo" className={`w-full h-full object-contain ${logoClass}`} />
        </div>

        <div className="mt-8 md:mt-4 flex flex-col items-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center font-brush italic leading-tight"
            style={{ 
              color: isWhite ? '#0f172a' : '#FFF',
              textShadow: isWhite ? 'none' : '0 4px 15px rgba(0,0,0,0.3)'
            }}
          >
            <span className="text-4xl md:text-8xl tracking-tight leading-[0.8]">#26</span>
            <span className="text-2xl md:text-6xl tracking-tight -mt-0.5 md:-mt-2">Apna Hai</span>
          </motion.div>
        </div>

        <div className="flex flex-col items-center">
          <div className={`w-24 h-24 md:w-48 md:h-48 rounded-full overflow-hidden border-2 md:border-8 shadow-2xl mb-2 md:mb-4 relative
            ${template === 'festive-gold' ? 'border-amber-200/50' : 
              isWhite ? 'border-slate-200' : 'border-white/20'}`}>
            {photo ? (
              <img src={photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className={`w-full h-full flex items-center justify-center ${isWhite ? 'bg-slate-100 text-slate-300' : 'bg-white/10 text-white/50'}`}>
                <User size={32} className="md:w-16 md:h-16" />
              </div>
            )}
          </div>
          
          <h2 className={`text-xl md:text-3xl font-bold ${textColor} mb-0.5 drop-shadow-md px-2 line-clamp-1`}>
            {watchedName || "Your Name"}
          </h2>
          <p className={`text-[10px] md:text-base font-medium ${subTextColor} uppercase tracking-[0.15em] md:tracking-[0.2em] mb-2 md:mb-4 px-2 line-clamp-1`}>
            {watchedDesignation || "Designation"}
          </p>

          <div className={`font-script text-2xl md:text-5xl ${textColor} mb-1 md:mb-4`}>
            Happy New Year
          </div>
        </div>

        <div className={`w-full pt-3 md:pt-6 border-t ${isWhite ? 'border-slate-200' : 'border-white/20'} flex flex-col items-center gap-1 md:gap-3`}>
          <div className={`flex flex-wrap items-center justify-center gap-x-3 md:gap-x-4 gap-y-1 ${subTextColor} scale-75 md:scale-90`}>
             <div className="flex items-center gap-1 md:gap-1.5">
               <Globe size={12} className={isWhite ? 'text-primary' : 'text-amber-400'} />
               <span className="text-[9px] md:text-[10px] font-bold tracking-wider">alphadigify.com</span>
             </div>
             <div className="flex items-center gap-1 md:gap-1.5">
               <Instagram size={12} className={isWhite ? 'text-primary' : 'text-amber-400'} />
               <span className="text-[9px] md:text-[10px] font-bold tracking-wider">@alphadigify</span>
             </div>
             <div className="flex items-center gap-1 md:gap-1.5">
               <Phone size={12} className={isWhite ? 'text-primary' : 'text-amber-400'} />
               <span className="text-[9px] md:text-[10px] font-bold tracking-wider">+92 3001001483</span>
             </div>
          </div>
          <p className={`text-[8px] md:text-[10px] font-black ${isWhite ? 'text-slate-400' : 'text-white/40'} tracking-[0.2em] md:tracking-[0.3em] uppercase`}>
            Powered by Alphadigify Solutions
          </p>
        </div>
      </div>
    );

    switch (template) {
      case "festive-gold":
        return (
          <div className="relative w-full h-full overflow-hidden bg-[#78350f]">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#451a03] via-[#b45309] to-[#fbbf24]" />
            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            {[...Array(12)].map((_, i) => (
              <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-pulse" 
                   style={{ top: `${Math.random()*100}%`, left: `${Math.random()*100}%`, animationDelay: `${i*0.5}s` }} />
            ))}
            {commonContent}
          </div>
        );
      case "midnight-party":
        return (
          <div className="relative w-full h-full overflow-hidden bg-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.3),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.3),transparent_50%)]" />
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            {commonContent}
          </div>
        );
      case "celebration-red":
        return (
          <div className="relative w-full h-full overflow-hidden bg-red-800">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-800 to-black" />
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall-2.png')]" />
            {commonContent}
          </div>
        );
      case "pure-white":
        return (
          <div className="relative w-full h-full overflow-hidden bg-white">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-bl-full" />
            {commonContent}
          </div>
        );
      case "sky-blue":
        return (
          <div className="relative w-full h-full overflow-hidden bg-sky-500">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-sky-500 to-sky-700" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cloudy-day.png")' }} />
            {commonContent}
          </div>
        );
      case "nature-green":
        return (
          <div className="relative w-full h-full overflow-hidden bg-emerald-700">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-700 to-slate-900" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/leaf.png")' }} />
            {commonContent}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Designer Console - First on mobile and desktop */}
      <div className="lg:col-span-4 flex flex-col gap-6">
        <Card className="border-none shadow-2xl bg-white/90 backdrop-blur-md overflow-hidden">
          <CardContent className="p-4 md:p-6 space-y-6">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
              <h2 className="text-lg md:text-xl font-bold">Designer Console</h2>
            </div>

            <div className="space-y-4">
              <Label className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground">Select Template</Label>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTemplate(t.id)}
                    className={`relative aspect-[3/4] rounded-lg md:rounded-xl overflow-hidden transition-all duration-300 group
                      ${template === t.id ? 'ring-2 md:ring-4 ring-primary ring-offset-2 scale-105 shadow-lg' : 'opacity-80 hover:opacity-100 border border-slate-200'}`}
                  >
                    {renderTemplatePreview(t.id, true)}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[8px] md:text-[10px] font-bold text-white bg-black/40 px-1 py-0.5 rounded">Select</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Form {...form}>
              <form className="space-y-4 md:space-y-5">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm">Name</FormLabel>
                    <FormControl><Input placeholder="Your Name" {...field} className="h-9 md:h-10" /></FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )} />
                <FormField control={form.control} name="designation" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs md:text-sm">Designation</FormLabel>
                    <FormControl><Input placeholder="Your Title" {...field} className="h-9 md:h-10" /></FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )} />

                <div className="space-y-2 md:space-y-3 pt-2">
                  <Label className="text-xs md:text-sm">Profile Picture</Label>
                  <label htmlFor="p-up" className="flex flex-col items-center justify-center w-full h-24 md:h-32 border-2 border-dashed rounded-xl md:rounded-2xl cursor-pointer hover:bg-muted/50 transition-colors border-primary/20 bg-primary/5">
                    <Upload className="w-5 h-5 md:w-8 md:h-8 text-primary mb-1 md:mb-2" />
                    <span className="text-[10px] md:text-sm font-semibold text-primary">{photo ? "Change Photo" : "Upload Photo"}</span>
                    <input id="p-up" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Preview Section - Second on desktop, last on mobile */}
      <div className="lg:col-span-8 flex flex-col items-center justify-center bg-slate-100/50 rounded-xl md:rounded-2xl lg:rounded-[2.5rem] border-2 md:border-4 border-white shadow-inner p-3 md:p-6 gap-4 md:gap-8">
        <div className="relative w-full max-w-[320px] md:max-w-[500px] aspect-[3/4] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden rounded-sm bg-white">
          <div ref={posterRef} className="w-full h-full">
            {renderTemplate()}
          </div>
        </div>
        
        <Button 
          onClick={handleDownload} 
          disabled={isGenerating} 
          className="w-full max-w-[320px] md:max-w-[500px] py-5 md:py-8 text-base md:text-xl font-bold shadow-xl md:shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          {isGenerating ? (
            <span className="flex items-center animate-pulse">
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <Download className="mr-2 md:mr-3 w-4 h-4 md:w-6 md:h-6" /> Download Poster
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
