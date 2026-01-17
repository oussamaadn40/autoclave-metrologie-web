import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStats } from '@/types/autoclave';
import { Activity, AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react';

interface StatsCardsProps {
    stats: DashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
    const statsData = [
        {
            title: 'Tests Totaux',
            value: stats.totalTests,
            icon: Activity,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            title: 'Tests Réussis',
            value: stats.passedTests,
            icon: CheckCircle2,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            subtitle: `${stats.complianceRate}% conformité`,
        },
        {
            title: 'Tests Échoués',
            value: stats.failedTests,
            icon: AlertTriangle,
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
        },
        {
            title: 'Tests En Cours',
            value: stats.activeTests,
            icon: Calendar,
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, idx) => (
                <Card key={idx} className="border-2">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                            {stat.title}
                        </CardTitle>
                        <div className={`p-2 rounded ${stat.bgColor}`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-mono">
                            {stat.value}
                        </div>
                        {stat.subtitle && (
                            <p className="text-xs text-muted-foreground mt-1 font-mono">
                                {stat.subtitle}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
