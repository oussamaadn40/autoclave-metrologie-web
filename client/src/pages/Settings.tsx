import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import Navbar from '@/components/Navbar';
import { Bell, Database, Moon, Settings as SettingsIcon, Shield, Users } from 'lucide-react';

export default function Settings() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="container py-8 space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
                        <SettingsIcon className="w-10 h-10" />
                        Paramètres
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm uppercase tracking-wide">
                        Configuration du système
                    </p>
                </div>

                {/* General Settings */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <SettingsIcon className="w-5 h-5" />
                            Paramètres Généraux
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold">Mode Sombre</div>
                                <div className="text-sm text-muted-foreground">
                                    Activer le thème sombre pour l'interface
                                </div>
                            </div>
                            <Switch />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold">Langue</div>
                                <div className="text-sm text-muted-foreground">
                                    Langue de l'interface utilisateur
                                </div>
                            </div>
                            <select className="border rounded px-3 py-2 bg-background">
                                <option>Français</option>
                                <option>English</option>
                                <option>Español</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="w-5 h-5" />
                            Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold">Alertes de Déviation</div>
                                <div className="text-sm text-muted-foreground">
                                    Recevoir des notifications pour les déviations critiques
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold">Rappels CAPA</div>
                                <div className="text-sm text-muted-foreground">
                                    Notifications pour les actions CAPA échues
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold">Rapports Hebdomadaires</div>
                                <div className="text-sm text-muted-foreground">
                                    Recevoir un résumé hebdomadaire par email
                                </div>
                            </div>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5" />
                            Sécurité
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold">Authentification à deux facteurs</div>
                                <div className="text-sm text-muted-foreground">
                                    Renforcer la sécurité de votre compte
                                </div>
                            </div>
                            <Switch />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold">Session automatique</div>
                                <div className="text-sm text-muted-foreground">
                                    Déconnexion après 30 minutes d'inactivité
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                {/* Data Management */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5" />
                            Gestion des Données
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="font-semibold mb-2">Rétention des Données</div>
                            <div className="text-sm text-muted-foreground mb-2">
                                Durée de conservation des enregistrements de test
                            </div>
                            <select className="border rounded px-3 py-2 bg-background w-full md:w-auto">
                                <option>1 an</option>
                                <option>2 ans</option>
                                <option selected>5 ans (recommandé)</option>
                                <option>10 ans</option>
                                <option>Illimité</option>
                            </select>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="font-semibold">Sauvegarde Automatique</div>
                                <div className="text-sm text-muted-foreground">
                                    Sauvegarde quotidienne des données
                                </div>
                            </div>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>

                {/* User Management */}
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            Gestion des Utilisateurs
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="font-semibold">Rôles et Permissions</div>
                            <div className="text-sm text-muted-foreground mb-4">
                                Gérer les accès et les permissions des utilisateurs
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                        <div className="font-mono font-semibold">Administrateur</div>
                                        <div className="text-xs text-muted-foreground">Accès complet au système</div>
                                    </div>
                                    <span className="text-sm font-mono">3 utilisateurs</span>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                        <div className="font-mono font-semibold">Technicien</div>
                                        <div className="text-xs text-muted-foreground">Tests et validations</div>
                                    </div>
                                    <span className="text-sm font-mono">8 utilisateurs</span>
                                </div>
                                <div className="flex items-center justify-between p-3 border rounded">
                                    <div>
                                        <div className="font-mono font-semibold">Observateur</div>
                                        <div className="text-xs text-muted-foreground">Lecture seule</div>
                                    </div>
                                    <span className="text-sm font-mono">5 utilisateurs</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
