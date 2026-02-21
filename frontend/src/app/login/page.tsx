"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { ArrowLeft, Loader2, Zap } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            // Set session cookie for middleware route protection
            await fetch('/api/auth/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'login' }),
            });
            const redirect = searchParams.get('redirect') || '/dashboard';
            router.push(redirect);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-6"
            style={{ background: 'var(--bg-base)' }}
        >
            <div className="w-full max-w-md space-y-8">

                {/* Back link */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-200 transition-colors text-sm"
                >
                    <ArrowLeft size={14} /> Back to home
                </Link>

                {/* Header */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2.5 mb-5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                            <Zap size={14} className="text-white" />
                        </div>
                        <span className="text-sm font-bold text-white tracking-tight">Beacon</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Sign in</h1>
                    <p className="text-zinc-500 text-sm">Continue to your BRD workspace.</p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 p-7 rounded-2xl border border-white/8"
                    style={{ background: 'rgba(14,14,14,0.95)' }}
                >
                    {error && (
                        <div className="bg-red-500/8 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="block text-sm font-medium text-zinc-300">
                            Email address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="glass-input w-full px-4 py-3 text-sm"
                            placeholder="you@company.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="block text-sm font-medium text-zinc-300">
                                Password
                            </label>
                            <Link
                                href="/forgot-password"
                                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="glass-input w-full px-4 py-3 text-sm"
                            placeholder="••••••••"
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-sm bg-white text-zinc-900 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.10)] hover:shadow-[0_4px_28px_rgba(255,255,255,0.18)]"
                        style={{ marginTop: '8px' }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Signing in…
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <p className="text-center text-xs text-zinc-600 pt-1">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-zinc-400 hover:text-white transition-colors">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
