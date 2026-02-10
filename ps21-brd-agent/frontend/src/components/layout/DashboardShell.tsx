"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import {
    LayoutDashboard,
    Settings,
    FileText,
    ChevronRight,
    User,
    LogOut,
    AlertTriangle,
    GitBranch,
    TrendingUp,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Templates', href: '/templates', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
];

const analytics = [
    { name: 'Conflicts', href: '/analytics/conflicts', icon: AlertTriangle },
    { name: 'Traceability', href: '/analytics/traceability', icon: GitBranch },
    { name: 'Sentiment', href: '/analytics/sentiment', icon: TrendingUp },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <div className="flex h-screen bg-zinc-950">
            {/* Sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="w-[280px] border-r border-white/10 bg-zinc-950/50 backdrop-blur-xl flex flex-col fixed lg:sticky top-0 h-screen z-40"
                    >
                        {/* Logo */}
                        <div className="p-6 border-b border-white/5">
                            <h1 className="text-xl font-bold text-white">
                                PS21 <span className="text-cyan-400">BRD Agent</span>
                            </h1>
                            <p className="text-xs text-zinc-500 mt-1">AI-Powered Business Requirements</p>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
                            <div className="space-y-1">
                                {navigation.map((item) => {
                                    const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all relative',
                                                isActive
                                                    ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500'
                                                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                                            )}
                                        >
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeNav"
                                                    className="absolute inset-0 bg-cyan-500/10 rounded-lg"
                                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            <Icon size={18} className="relative z-10" />
                                            <span className="relative z-10">{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>

                            {/* Analytics Section */}
                            <div className="space-y-1">
                                <h3 className="px-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                                    Analytics
                                </h3>
                                {analytics.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={cn(
                                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                                                isActive
                                                    ? 'bg-cyan-500/10 text-cyan-400'
                                                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
                                            )}
                                        >
                                            <Icon size={18} />
                                            <span>{item.name}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </nav>

                        {/* User Profile */}
                        <div className="p-4 border-t border-white/5 space-y-2">
                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                                    <User size={16} className="text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-zinc-100 truncate">{user?.name}</p>
                                    <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-zinc-400 hover:text-red-400 transition-colors text-sm"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="h-16 border-b border-white/5 bg-zinc-950/50 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        {/* Hamburger Menu Button */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 bg-zinc-900/90 border border-white/10 rounded-lg text-zinc-100 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all backdrop-blur-sm"
                        >
                            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>

                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <Link href="/" className="hover:text-zinc-100 transition-colors">
                                Home
                            </Link>
                            {pathname && pathname !== '/' && (
                                <>
                                    <ChevronRight size={14} className="text-zinc-600" />
                                    <span className="text-zinc-100 capitalize">
                                        {pathname.split('/').filter(Boolean).join(' / ')}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-green-400">System Operational</span>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
