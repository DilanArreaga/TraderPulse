'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star } from "lucide-react";

const POINTS_PER_LEVEL = 500;

const LEVEL_NAMES: Record<number, string> = {
  1: "Principiante",
  2: "Intermedio",
  3: "Avanzado",
  4: "Experto",
  5: "Maestro",
};

const ALL_BADGES = [
  { id: "first_analysis", label: "Primer Análisis", threshold: 1 },
  { id: "golden_bull",    label: "Toro de Oro",     threshold: 5 },
  { id: "visualizer",    label: "Visualizador",     threshold: 10 },
];

interface Props {
  analysisCount: number;
  points: number;
}

export default function GamificationSidebar({ analysisCount, points }: Props) {
  const level = Math.min(5, Math.floor(points / POINTS_PER_LEVEL) + 1);
  const levelName = LEVEL_NAMES[level] ?? "Maestro";
  const pointsInLevel = points % POINTS_PER_LEVEL;
  const progressPercent = Math.round((pointsInLevel / POINTS_PER_LEVEL) * 100);
  const earnedBadges = ALL_BADGES.filter(b => analysisCount >= b.threshold);

  return (
    <Card className="bg-slate-900 border-slate-800 text-slate-100 h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg">
          <Trophy className="text-yellow-500" size={20} />
          <span>Tu Perfil</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* Level */}
        <div className="text-center p-4 bg-slate-800/50 rounded-lg">
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Nivel Actual</p>
          <h3 className="text-xl font-bold text-blue-400">{levelName}</h3>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Progreso</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-slate-500">Próximo nivel: {progressPercent}%</div>
          </div>
        </div>

        {/* Points */}
        <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700">
          <span className="flex items-center text-sm text-slate-300">
            <Star className="text-purple-400 mr-2" size={16} /> Puntos
          </span>
          <span className="font-mono font-bold text-lg">{points}</span>
        </div>

        {/* Badges */}
        <div>
          <p className="text-xs text-slate-500 mb-3 uppercase font-semibold">Insignias</p>
          <div className="flex flex-wrap gap-2">
            {earnedBadges.length === 0 && (
              <span className="text-xs text-slate-600">Analiza stocks para ganar insignias</span>
            )}
            {earnedBadges.map(badge => (
              <Badge
                key={badge.id}
                variant="secondary"
                className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20"
              >
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>

        {/* Analysis count */}
        <div className="text-center text-xs text-slate-600">
          Análisis realizados: <span className="text-slate-400 font-bold">{analysisCount}</span>
        </div>

      </CardContent>
    </Card>
  );
}