import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import { mockValidationTests } from '@/lib/autoclave-data';
import { exportReportAsText } from '@/lib/export-utils';
import { Download, FileText, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Reports() {
    const handleDownload = (test: any) => {
        try {
            exportReportAsText(test);
            toast.success('Rapport téléchargé avec succès!');
        } catch (error) {
            toast.error('Erreur lors du téléchargement');
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Header */}
            <header className="border-b-2 border-border bg-card">
                <div className="container py-6">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Rapports de Validation
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">
                        Historique et Archives
                    </p>
                </div>
            </header>

            {/* Main Content */}
            <main className="container py-8 space-y-6">
                {mockValidationTests.map((test) => (
                    <Card key={test.id} className="border-2">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-6 h-6 text-blue-500" />
                                    <div>
                                        <div className="text-lg">Test de Validation #{test.id.split('-')[1]}</div>
                                        <div className="text-sm font-mono text-muted-foreground font-normal">
                                            {new Date(test.testDate).toLocaleDateString('fr-FR', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    {test.status === 'passed' ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-500" />
                                    )}
                                    <span className={`uppercase text-xs px-3 py-1 rounded font-semibold ${test.status === 'passed' ? 'status-completed' : 'status-failed'
                                        }`}>
                                        {test.status}
                                    </span>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                                        Informations Générales
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Type:</span>
                                            <span className="font-mono font-semibold uppercase">{test.testType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Opérateur:</span>
                                            <span className="font-mono font-semibold">{test.operatorName}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Autoclave:</span>
                                            <span className="font-mono font-semibold">{test.autoclaveName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-xs text-muted-foreground uppercase tracking-wide">
                                        Équipement
                                    </div>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Modèle:</span>
                                            <span className="font-mono font-semibold">{test.autoclaveModel}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">N° Série:</span>
                                            <span className="font-mono font-semibold">{test.serialNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Prochain test:</span>
                                            <span className="font-mono font-semibold">
                                                {new Date(test.nextTestDate).toLocaleDateString('fr-FR')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                                    Conclusions
                                </div>
                                <p className="text-sm leading-relaxed">{test.conclusions}</p>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="gap-2 flex-1">
                                    <FileText className="w-4 h-4" />
                                    Voir Détails
                                </Button>
                                <Button
                                    className="gap-2 flex-1"
                                    onClick={() => handleDownload(test)}
                                >
                                    <Download className="w-4 h-4" />
                                    Télécharger PDF
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </main>
        </div>
    );
}
