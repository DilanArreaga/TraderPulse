'use client';

import { useState } from 'react';
import TickerTape from '@/components/dashboard/TickerTape';
import MarketChart from '@/components/dashboard/MarketChart';
import SentimentWidget from '@/components/dashboard/SentimentWidget';
import GamificationSidebar from '@/components/dashboard/GamificationSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from 'sonner';

const XP_PER_ANALYSIS = 100;

export default function Home() {
  const [symbol, setSymbol] = useState("AAPL");
  const [searchInput, setSearchInput] = useState("");
  const [points, setPoints] = useState(0);
  const [analysisCount, setAnalysisCount] = useState(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const query = searchInput.trim().toUpperCase();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/stocks/${query}`
      );
      if (res.ok) {
        setSymbol(query);
        setPoints(p => p + XP_PER_ANALYSIS);
        setAnalysisCount(c => c + 1);
        toast.success(`+${XP_PER_ANALYSIS} XP Ganado!`, {
          description: `Analizando ${query}`,
        });
      } else {
        toast.error("Stock no encontrado", {
          description: `El símbolo '${query}' no existe o no se pudo cargar.`,
        });
      }
    } catch {
      toast.error("Error de conexión", {
        description: "No se pudo conectar con el servidor.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-tr from-cyan-500 to-blue-600 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white">
              TP
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Trader<span className="text-cyan-400">Pulse</span>
            </h1>
          </div>
        </div>
      </header>

      <TickerTape onSelectSymbol={setSymbol} />

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">

          <div className="lg:col-span-3 space-y-6">
            <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
              <Input
                placeholder="Buscar símbolo (ej. AAPL, BTC, TSLA)..."
                className="bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-cyan-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700 text-white">
                <Search size={18} />
              </Button>
            </form>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 h-[450px]">
                <MarketChart symbol={symbol} />
              </div>
              <div className="lg:col-span-1 h-full">
                <SentimentWidget symbol={symbol} />
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <GamificationSidebar points={points} analysisCount={analysisCount} />
          </div>

        </div>
      </div>
    </main>
  );
}