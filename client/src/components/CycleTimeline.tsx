import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { AutoclaveCycle } from '@/types/autoclave';
import { CheckCircle2, Circle, Clock, XCircle } from 'lucide-react';

interface CycleTimelineProps {
    cycle: AutoclaveCycle;
}

export default function CycleTimeline({ cycle }: CycleTimelineProps) {
    const getPhaseIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case 'active':
                return <Clock className="w-5 h-5 text-blue-500 animate-pulse" />;
            case 'failed':
                return <XCircle className="w-5 h-5 text-red-500" />;
            default:
                return <Circle className="w-5 h-5 text-gray-400" />;
        }
    };

    const completedPhases = cycle.phases.filter(p => p.status === 'completed').length;
    const progressPercentage = (completedPhases / cycle.phases.length) * 100;

    return (
        <Card className="border-2">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{cycle.name}</span>
                    <span className={`text-xs uppercase tracking-wider px-3 py-1 rounded ${cycle.status === 'completed' ? 'status-completed' :
                            cycle.status === 'running' ? 'status-active' :
                                cycle.status === 'failed' ? 'status-failed' :
                                    'status-pending'
                        }`}>
                        {cycle.status}
                    </span>
                </CardTitle>
                <div className="text-sm text-muted-foreground font-mono">
                    {new Date(cycle.date).toLocaleString('fr-FR')}
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <Progress value={progressPercentage} className="h-2" />

                <div className="space-y-4">
                    {cycle.phases.map((phase, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                                {getPhaseIcon(phase.status)}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-semibold text-sm uppercase tracking-wide">
                                        {phase.label}
                                    </h4>
                                    <span className="text-xs font-mono text-muted-foreground">
                                        {phase.duration} min
                                    </span>
                                </div>
                                {phase.startTime && (
                                    <div className="text-xs font-mono text-muted-foreground">
                                        {new Date(phase.startTime).toLocaleTimeString('fr-FR')}
                                        {phase.endTime && ` - ${new Date(phase.endTime).toLocaleTimeString('fr-FR')}`}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                            Température
                        </div>
                        <div className="font-mono text-lg font-semibold">
                            {cycle.temperature.actual}{cycle.temperature.unit}
                            <span className="text-sm text-muted-foreground ml-2">
                                / {cycle.temperature.target}{cycle.temperature.unit}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                            Pression
                        </div>
                        <div className="font-mono text-lg font-semibold">
                            {cycle.pressure.actual} {cycle.pressure.unit}
                            <span className="text-sm text-muted-foreground ml-2">
                                / {cycle.pressure.target} {cycle.pressure.unit}
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
