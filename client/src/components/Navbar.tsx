import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Activity, AlertTriangle, FileText, Home, Menu, Settings } from 'lucide-react';
import { Link, useLocation } from 'wouter';

export default function Navbar() {
    const [location] = useLocation();

    const navItems = [
        { href: '/', label: 'Dashboard', icon: Home },
        { href: '/reports', label: 'Rapports', icon: FileText },
        { href: '/deviations', label: 'Déviations', icon: AlertTriangle },
        { href: '/capa', label: 'CAPA', icon: Activity },
        { href: '/settings', label: 'Paramètres', icon: Settings },
    ];

    const isActive = (href: string) => location === href;

    return (
        <nav className="border-b-2 border-border bg-card sticky top-0 z-50">
            <div className="container">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/">
                        <a className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                <Activity className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div className="hidden sm:block">
                                <div className="font-bold text-lg">Autoclave</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                    Métrologie
                                </div>
                            </div>
                        </a>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <a>
                                    <Button
                                        variant={isActive(item.href) ? 'default' : 'ghost'}
                                        className="gap-2"
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.label}
                                    </Button>
                                </a>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Navigation */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="w-5 h-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-64">
                            <div className="flex flex-col gap-2 mt-8">
                                {navItems.map((item) => (
                                    <Link key={item.href} href={item.href}>
                                        <a>
                                            <Button
                                                variant={isActive(item.href) ? 'default' : 'ghost'}
                                                className="w-full justify-start gap-2"
                                            >
                                                <item.icon className="w-4 h-4" />
                                                {item.label}
                                            </Button>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}
