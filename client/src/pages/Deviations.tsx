import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import type { Deviation } from '@/types/autoclave';
import { AlertTriangle, Download, Plus } from 'lucide-react';
import { useState } from 'react';

const mockDeviations: Deviation[] = [
    {
        id: 'DEV-001',
        parameter: 'temperature',
        expected: 134,
        actual: 131.5,
        difference: -2.5,
        severity: 'minor',
        timestamp: '2026-01-17T10:15:00',
    },
    {
        id: 'DEV-002',
        parameter: 'pressure',
        expected: 2.1,
        actual: 1.95,
        difference: -0.15,
        severity: 'major',
        timestamp: '2026-01-16T14:30:00',
    },
    {
        id: 'DEV-003',
        parameter: 'temperature',
        expected: 121,
        actual: 125,
        difference: 4,
        severity: 'critical',
        timestamp: '2026-01-15T09:20:00',
    },
    {
        id: 'DEV-004',
        parameter: 'time',
        expected: 15,
        actual: 14.2,
        difference: -0.8,
        severity: 'minor',
        timestamp: '2026-01-14T11:45:00',
    },
];

export default function Deviations() {
    const [severityFilter, setSeverityFilter] = useState<string>('all');

    const filteredDeviations = severityFilter === 'all'
        ? mockDeviations
        : mockDeviations.filter(d => d.severity === severityFilter);

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical':
                return 'bg-red-500 text-white';
            case 'major':
                return 'bg-orange-500 text-white';
            case 'minor':
                return 'bg-yellow-500 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    const getSeverityLabel = (severity: string) => {
        switch (severity) {
            case 'critical':
                return 'Critique';
            case 'major':
                return 'Majeure';
            case 'minor':
                return 'Mineure';
            default:
                return severity;
        }
    };

    const getParameterLabel = (param: string) => {
        switch (param) {
            case 'temperature':
                return 'Température';
            case 'pressure':
                return 'Pression';
            case 'time':
                return 'Temps';
            default:
                return param;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container py-8 space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                            <AlertTriangle className="w-10 h-10 text-orange-500" />
                            Gestion des Déviations
                        </h1>
                        <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">
                            Suivi des écarts de conformité
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Download className="w-4 h-4" />
                            Exporter
                        </Button>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Nouvelle Déviation
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-2">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                                Total
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono">{mockDeviations.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-red-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                                Critiques
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono text-red-500">
                                {mockDeviations.filter(d => d.severity === 'critical').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-orange-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                                Majeures
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono text-orange-500">
                                {mockDeviations.filter(d => d.severity === 'major').length}
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-2 border-yellow-500">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm uppercase tracking-wide text-muted-foreground">
                                Mineures
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold font-mono text-yellow-500">
                                {mockDeviations.filter(d => d.severity === 'minor').length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Separator />

                {/* Filters */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Filtres</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <div className="w-64">
                                <label className="text-sm font-medium mb-2 block">Sévérité</label>
                                <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Toutes</SelectItem>
                                        <SelectItem value="critical">Critiques</SelectItem>
                                        <SelectItem value="major">Majeures</SelectItem>
                                        <SelectItem value="minor">Mineures</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Deviation Table */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Liste des Déviations</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="font-bold">ID</TableHead>
                                    <TableHead className="font-bold">Date/Heure</TableHead>
                                    <TableHead className="font-bold">Paramètre</TableHead>
                                    <TableHead className="font-bold">Attendu</TableHead>
                                    <TableHead className="font-bold">Réel</TableHead>
                                    <TableHead className="font-bold">Écart</TableHead>
                                    <TableHead className="font-bold">Sévérité</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDeviations.map((dev) => (
                                    <TableRow key={dev.id}>
                                        <TableCell className="font-mono font-semibold">{dev.id}</TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {new Date(dev.timestamp).toLocaleString('fr-FR')}
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {getParameterLabel(dev.parameter)}
                                        </TableCell>
                                        <TableCell className="font-mono">{dev.expected}</TableCell>
                                        <TableCell className="font-mono font-semibold">{dev.actual}</TableCell>
                                        <TableCell className="font-mono">
                                            <span className={dev.difference < 0 ? 'text-red-500' : 'text-orange-500'}>
                                                {dev.difference > 0 ? '+' : ''}{dev.difference}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${getSeverityColor(dev.severity)}`}>
                                                {getSeverityLabel(dev.severity)}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
