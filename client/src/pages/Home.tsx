import CycleTimeline from '@/components/CycleTimeline';
import DataChart from '@/components/DataChart';
import Gauge from '@/components/Gauge';
import Navbar from '@/components/Navbar';
import StatsCards from '@/components/StatsCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { mockCycles, mockDashboardStats, mockMeasurements, mockValidationTests } from '@/lib/autoclave-data';
import { Activity, AlertCircle, FileText, Plus } from 'lucide-react';

export default function Home() {
  const currentCycle = mockCycles[1]; // Running cycle
  const completedCycle = mockCycles[0]; // Completed cycle
  const latestTest = mockValidationTests[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <header className="border-b-2 border-border bg-card">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Confirmation Métrologique
              </h1>
              <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">
                Système de Validation d'Autoclave
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
                Rapports
              </Button>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nouveau Test
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 space-y-8">
        {/* Dashboard Stats */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Vue d'Ensemble
          </h2>
          <StatsCards stats={mockDashboardStats} />
        </section>

        <Separator />

        {/* Current Test Info */}
        <section>
          <Card className="border-2 border-blue-500 bg-blue-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                Dernier Test de Validation
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Type de Test:</span>
                  <span className="font-mono font-semibold uppercase text-sm">
                    {latestTest.testType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Opérateur:</span>
                  <span className="font-mono font-semibold text-sm">
                    {latestTest.operatorName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Autoclave:</span>
                  <span className="font-mono font-semibold text-sm">
                    {latestTest.autoclaveName}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Modèle:</span>
                  <span className="font-mono font-semibold text-sm">
                    {latestTest.autoclaveModel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Numéro de Série:</span>
                  <span className="font-mono font-semibold text-sm">
                    {latestTest.serialNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Prochain Test:</span>
                  <span className="font-mono font-semibold text-sm">
                    {new Date(latestTest.nextTestDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator />

        {/* Monitoring Gauges */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Surveillance en Direct</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Gauge
              label="Température de Stérilisation"
              value={currentCycle.temperature.actual}
              target={currentCycle.temperature.target}
              unit={currentCycle.temperature.unit}
              max={200}
              type="temperature"
            />
            <Gauge
              label="Pression de Chambre"
              value={currentCycle.pressure.actual}
              target={currentCycle.pressure.target}
              unit={currentCycle.pressure.unit}
              max={3}
              type="pressure"
            />
          </div>
        </section>

        <Separator />

        {/* Cycle Timeline */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Cycle en Cours</h2>
          <CycleTimeline cycle={currentCycle} />
        </section>

        <Separator />

        {/* Data Visualization */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Données Historiques</h2>
          <DataChart measurements={mockMeasurements} title="Cycle #001 - Profil Température/Pression" />
        </section>

        <Separator />

        {/* Completed Cycle */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Dernier Cycle Complété</h2>
          <CycleTimeline cycle={completedCycle} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-border mt-12 bg-card">
        <div className="container py-6">
          <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground font-mono">
            <div>
              <div className="font-semibold text-foreground mb-1">Système</div>
              <div>Version: 1.0.0</div>
              <div>Build: 2026.01.17</div>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">Conformité</div>
              <div>Norme: ISO 17665</div>
              <div>Dernière calibration: {latestTest.testDate}</div>
            </div>
            <div>
              <div className="font-semibold text-foreground mb-1">Support</div>
              <div>Contact: support@metrologie.fr</div>
              <div>Documentation disponible</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
