import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Measurement } from '@/types/autoclave';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface DataChartProps {
    measurements: Measurement[];
    title?: string;
}

export default function DataChart({ measurements, title = 'Données de Cycle' }: DataChartProps) {
    const chartData = measurements.map(m => ({
        time: new Date(m.timestamp).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        }),
        temperature: m.temperature,
        pressure: m.pressure * 50, // Scale pressure for better visualization
    }));

    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle className="uppercase tracking-wide">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis
                            dataKey="time"
                            className="text-xs font-mono"
                            stroke="currentColor"
                        />
                        <YAxis
                            className="text-xs font-mono"
                            stroke="currentColor"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '2px solid hsl(var(--border))',
                                borderRadius: '0.25rem',
                                fontFamily: 'JetBrains Mono, monospace'
                            }}
                            labelStyle={{ fontWeight: 'bold' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="temperature"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            dot={{ fill: '#3B82F6', r: 4 }}
                            name="Température (°C)"
                        />
                        <Line
                            type="monotone"
                            dataKey="pressure"
                            stroke="#F97316"
                            strokeWidth={2}
                            dot={{ fill: '#F97316', r: 4 }}
                            name="Pression (×50)"
                        />
                    </LineChart>
                </ResponsiveContainer>

                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-sm font-mono">Température (°C)</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        <span className="text-sm font-mono">Pression (×50 bar)</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
