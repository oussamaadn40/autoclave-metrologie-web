import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GaugeProps {
    label: string;
    value: number;
    target: number;
    unit: string;
    min?: number;
    max?: number;
    type?: 'temperature' | 'pressure';
}

export default function Gauge({ label, value, target, unit, min = 0, max, type = 'temperature' }: GaugeProps) {
    const maxValue = max || target * 1.5;
    const percentage = (value / maxValue) * 100;
    const targetPercentage = (target / maxValue) * 100;

    const isWithinTolerance = Math.abs(value - target) <= target * 0.05; // 5% tolerance
    const statusColor = isWithinTolerance ? 'text-green-500' : 'text-orange-500';
    const diff = value - target;
    const diffSign = diff >= 0 ? '+' : '';

    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                    {label}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Circular gauge visualization */}
                <div className="relative w-40 h-40 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-muted"
                        />

                        {/* Target indicator */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray={`${targetPercentage * 2.827} ${282.7 - targetPercentage * 2.827}`}
                            className="text-blue-300 opacity-50"
                        />

                        {/* Value circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            strokeDasharray={`${percentage * 2.827} ${282.7 - percentage * 2.827}`}
                            strokeLinecap="round"
                            className={cn(
                                "transition-all duration-500",
                                isWithinTolerance ? "text-green-500" : "text-orange-500"
                            )}
                        />
                    </svg>

                    {/* Center value */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className={cn("text-3xl font-bold font-mono", statusColor)}>
                            {value}
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                            {unit}
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-2 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Cible:</span>
                        <span className="font-mono font-semibold">{target} {unit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Actuel:</span>
                        <span className={cn("font-mono font-semibold", statusColor)}>
                            {value} {unit}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Écart:</span>
                        <span className={cn("font-mono font-semibold", statusColor)}>
                            {diffSign}{diff.toFixed(1)} {unit}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Statut:</span>
                        <span className={cn("font-semibold uppercase text-xs", statusColor)}>
                            {isWithinTolerance ? '✓ Conforme' : '⚠ Attention'}
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
