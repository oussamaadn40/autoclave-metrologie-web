import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Navbar from '@/components/Navbar';
import type { CapaAction } from '@/types/capa';
import { CheckCircle2, Clock, Download, Plus, XCircle } from 'lucide-react';

const mockCapaActions: CapaAction[] = [
    {
        id: 'CAPA-001',
        deviationId: 'DEV-003',
        type: 'corrective',
        title: 'Recalibrage du capteur de température',
        description: 'Le capteur de température présente un écart de +4°C par rapport à la valeur cible. Nécessite une recalibration immédiate.',
        responsible: 'Service Maintenance',
        dueDate: '2026-01-20',
        status: 'in-progress',
        createdDate: '2026-01-15',
    },
    {
        id: 'CAPA-002',
        deviationId: 'DEV-002',
        type: 'corrective',
        title: 'Vérification du système de pression',
        description: 'Écart de pression détecté. Contrôle des joints et du manomètre requis.',
        responsible: 'Dr. Marie Dubois',
        dueDate: '2026-01-18',
        status: 'completed',
        createdDate: '2026-01-16',
        completedDate: '2026-01-17',
        effectiveness: 'effective',
    },
    {
        id: 'CAPA-003',
        deviationId: 'DEV-001',
        type: 'preventive',
        title: 'Mise à jour du protocole de validation',
        description: 'Révision des procédures de test pour inclure des points de contrôle supplémentaires.',
        responsible: 'Équipe Qualité',
        dueDate: '2026-01-25',
        status: 'open',
        createdDate: '2026-01-17',
    },
    {
        id: 'CAPA-004',
        deviationId: 'DEV-004',
        type: 'preventive',
        title: 'Formation du personnel',
        description: 'Formation sur les bonnes pratiques de surveillance des cycles de stérilisation.',
        responsible: 'Responsable Formation',
        dueDate: '2026-02-01',
        status: 'open',
        createdDate: '2026-01-14',
    },
];

export default function CAPA() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'status-completed';
            case 'in-progress':
                return 'status-active';
            case 'verified':
                return 'bg-green-600 text-white';
            default:
                return 'status-pending';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'open':
                return 'Ouvert';
            case 'in-progress':
                return 'En cours';
            case 'completed':
                return 'Terminé';
            case 'verified':
                return 'Vérifié';
            default:
                return status;
        }
    };

    const getTypeLabel = (type: string) => {
        return type === 'corrective' ? 'Corrective' : 'Préventive';
    };

    const completedActions = mockCapaActions.filter(a => a.status === 'completed' || a.status === 'verified').length;
    const completionRate = (completedActions / mockCapaActions.length) * 100;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container py-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight">
                            Actions CAPA
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">
                            Corrective and Preventive Actions
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Exporter
                        </Button>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Nouvelle Action
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                                Total Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono">{mockCapaActions.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-blue-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                                En Cours
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono text-blue-500">
                                {mockCapaActions.filter(a => a.status === 'in-progress').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-green-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                                Terminées
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono text-green-500">
                                {completedActions}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                                Taux de Complétion
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono">{completionRate.toFixed(0)}%</div>
                            <Progress value={completionRate} className="mt-2" />
                        </CardContent>
                    </Card>
                </div>

                <Separator />

                {/* CAPA Actions List */}
                <div className="space-y-4">
                    {mockCapaActions.map((action) => (
                        <Card key={action.id} className="border-2">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <CardTitle className="flex items-center gap-3">
                                            <span className="font-mono text-blue-500">{action.id}</span>
                                            <span>{action.title}</span>
                                        </CardTitle>
                                        <div className="flex gap-2 items-center text-sm text-muted-foreground">
                                            <span className="font-mono">Déviation: {action.deviationId}</span>
                                            <span>•</span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${action.type === 'corrective' ? 'bg-orange-500 text-white' : 'bg-blue-500 text-white'
                                                }`}>
                                                {getTypeLabel(action.type)}
                                            </span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded text-xs font-semibold uppercase ${getStatusColor(action.status)}`}>
                                        {getStatusLabel(action.status)}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-sm leading-relaxed">{action.description}</p>

                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <div className="text-muted-foreground uppercase tracking-wide text-xs mb-1">
                                            Responsable
                                        </div>
                                        <div className="font-semibold">{action.responsible}</div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground uppercase tracking-wide text-xs mb-1">
                                            Date Limite
                                        </div>
                                        <div className="font-mono font-semibold flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            {new Date(action.dueDate).toLocaleDateString('fr-FR')}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-muted-foreground uppercase tracking-wide text-xs mb-1">
                                            Date de Création
                                        </div>
                                        <div className="font-mono">
                                            {new Date(action.createdDate).toLocaleDateString('fr-FR')}
                                        </div>
                                    </div>
                                </div>

                                {action.completedDate && (
                                    <div className="pt-3 border-t">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                <span className="text-sm font-semibold">
                                                    Terminé le {new Date(action.completedDate).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>
                                            {action.effectiveness && (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground">Efficacité:</span>
                                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${action.effectiveness === 'effective' ? 'bg-green-500 text-white' :
                                                            action.effectiveness === 'partial' ? 'bg-yellow-500 text-white' :
                                                                'bg-red-500 text-white'
                                                        }`}>
                                                        {action.effectiveness === 'effective' ? 'Efficace' :
                                                            action.effectiveness === 'partial' ? 'Partielle' : 'Inefficace'}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}
