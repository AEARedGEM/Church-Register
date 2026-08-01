import { logo } from '@/images';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [isDark, setIsDark] = useState(true);
    const [activeTab, setActiveTab] = useState<'industrial' | 'documentation' | 'learning'>('industrial');

    useEffect(() => {
        // Check for saved theme preference or default to dark
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDark(savedTheme === 'dark');
        }
    }, []);

    useEffect(() => {
        // Save theme preference and apply to document
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    return (
        <>
            <Head title="NYP-IP Portal - Empowering Nigeria Industrial Future" />
            <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
                {/* Header */}
                <header className="relative z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
                    <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                               <div className="flex items-center space-x-2 text-center justify-center">
                            <img src={logo} className="h-10 mx-auto" />
                        </div>
                            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">NYP-IP Portal</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                                aria-label="Toggle theme"
                            >
                                {isDark ? (
                                    <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
                                    </svg>
                                )}
                            </button>

                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="relative min-h-[600px] py-20 overflow-hidden">
                    {/* Main gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/30 via-blue-100/20 to-emerald-100/30 dark:from-emerald-600/20 dark:via-blue-600/10 dark:to-emerald-600/20 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-30 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-200 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-12 dark:opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-200 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '3s'}}></div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(0deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}></div>
                    </div>

                    {/* Radial gradient accent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center bg-emerald-100 dark:bg-gradient-to-r dark:from-emerald-600/40 dark:to-blue-600/40 backdrop-blur-xl border border-emerald-300 dark:border-emerald-400/50 px-5 py-2 mb-6 rounded-full hover:border-emerald-400 dark:hover:border-emerald-300/80 transition-all duration-300">
                                <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-200 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-xs font-bold text-emerald-700 dark:text-white">NYP Industrialization Programme (NYP-IP)</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white drop-shadow-2xl leading-tight">
                                Powering Nigeria's
                                <br />
                                <span className="bg-gradient-to-r from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-lg">Industrial Future</span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-700 dark:text-gray-100 mb-6 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-white/60 dark:bg-white/5 rounded-lg p-5 border border-emerald-200 dark:border-white/10">
                                An Industrialization Programme and a Digital Portal connecting Startups, SMEs, Capital, Investments, and Initiatives
                                to catalyze innovation, Skills Development, and Industrialization Financing across Nigeria.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href={route('register')}
                                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 dark:from-emerald-500 dark:to-emerald-600 text-white px-7 py-3 rounded-lg font-semibold text-base transition-all transform hover:scale-105 shadow-lg hover:shadow-emerald-500/40 dark:hover:shadow-emerald-500/40 relative group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500"></div>
                                    <span className="relative">Get Onboarded</span>
                                </Link>
                                <button className="border-2 border-emerald-500 dark:border-emerald-400/50 text-emerald-600 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-100 backdrop-blur-sm bg-white/70 dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-white/10 px-7 py-3 rounded-lg font-semibold text-base transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/20 group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/10 dark:via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500"></div>
                                    <span className="relative">Explore Platform</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="relative py-20 overflow-hidden">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-blue-950 dark:to-gray-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/20 via-blue-100/10 to-emerald-100/20 dark:from-emerald-600/15 dark:via-blue-600/10 dark:to-emerald-600/15 animate-pulse"></div>

                    {/* Decorative blurred shapes for depth */}
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-25 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-20 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                    <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-12 dark:opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-0 left-1/3 w-80 h-80 bg-blue-200 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '2.5s'}}></div>

                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(0deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}></div>
                    </div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-5">

                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 hover:border-emerald-400/30 rounded-lg p-4 transition-all duration-300 group-hover:bg-white/10">
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">0</div>
                                    <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Company Incubated</div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 hover:border-emerald-400/30 rounded-lg p-4 transition-all duration-300 group-hover:bg-white/10">
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">0</div>
                                    <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">StartUps Tokenized</div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 hover:border-emerald-400/30 rounded-lg p-4 transition-all duration-300 group-hover:bg-white/10">
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">₦0</div>
                                    <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Tokenization Value</div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 hover:border-emerald-400/30 rounded-lg p-4 transition-all duration-300 group-hover:bg-white/10">
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">₦0</div>
                                    <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Stablecoin Issued</div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-400/30 rounded-lg p-4 transition-all duration-300 group-hover:bg-white/90 dark:group-hover:bg-white/10">
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">0</div>
                                    <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Jobs Created</div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-emerald-400 dark:hover:border-emerald-400/30 rounded-lg p-4 transition-all duration-300 group-hover:bg-white/90 dark:group-hover:bg-white/10">
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">0</div>
                                    <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Training Programs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Partnerships Section */}
                <section className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-blue-100/15 to-emerald-100/20 dark:from-emerald-500/10 dark:via-blue-500/10 dark:to-emerald-500/10 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200 dark:bg-emerald-400 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-200 dark:bg-blue-400 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-12 dark:opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 dark:via-gray-400/50 to-transparent"></div>

                    {/* Ambient background glow */}
                    <div className="absolute inset-0">
                        <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-gray-500/20 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-blue-500/10 dark:bg-gray-500/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '2s'}}></div>
                    </div>

                    {/* Animated grid lines */}
                    <div className="absolute inset-0 opacity-5 dark:opacity-10">
                        <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(to right, rgba(3, 98, 252, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(39, 6, 145, 0.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                        }}></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-6 z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider uppercase text-sm bg-emerald-100/50 dark:bg-emerald-400/10 px-4 py-2 border border-emerald-200/50 dark:border-emerald-400/20 rounded-full backdrop-blur-sm">
                        Strategic Partners
                        Powered By
                        </span>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Our Strategic Partners</h2>
                    <p className="text-gray-700 dark:text-slate-300 text-lg max-w-2xl mx-auto">
                        Collaborating with leading institutions and innovative companies to empower Nigerian youth
                    </p>
                    </div>

                    {/* Infinite Slider */}
                    <div className="relative">
                    {/* Gradient overlays for fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 dark:from-slate-950 to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 dark:from-slate-950 to-transparent z-10"></div>

                    <div className="overflow-hidden py-8">
                        <div className="flex gap-8 animate-scroll" style={{width: 'max-content'}}>
                        {/* Partner Cards - First Set */}
                        {[
                            { name: 'LuxuryX Technologies & TradeFi Limited', logo: '/images/luxuryx-logo.png' },
                            { name: 'The Nigerian Youth Parliament', logo: '/images/nyp-logo.png' },
                            { name: 'AfaraHub Ensemble Company', logo: '/images/afarahub-logo.png' },
                            { name: 'Federal Ministry Of Youth Development', logo: '/images/fmyd-logo.png' },
                            { name: 'Remonode Technologies Limited', logo: '/images/remonode-logo.png' },
                            { name: 'Able GOD Engineering & Technologies Ltd.', logo: '/images/ableGOD-logo.png' },
                            { name: 'Gockan Builders & Contractor Ltd. ', logo: '/images/gockan-logo.png' },
                            // Duplicate for seamless loop
                            { name: 'LuxuryX Technologies & TradeFi Limited', logo: '/images/luxuryx-logo.png' },
                            { name: 'The Nigerian Youth Parliament', logo: '/images/nyp-logo.png' },
                            { name: 'AfaraHub Ensemble Company', logo: '/images/afarahub-logo.png' },
                            { name: 'Federal Ministry Of Youth Development', logo: '/images/fmyd-logo.png' },
                            { name: 'Remonode Technologies Limited', logo: '/images/remonode-logo.png' },
                            { name: 'Able GOD Engineering & Technologies Ltd.', logo: '/images/ableGOD-logo.png' },
                            { name: 'Gockan Builders & Contractor Ltd. ', logo: '/images/gockan-logo.png' },
                        ].map((partner, index) => (
                            <div key={index} className="flex-shrink-0 w-[280px] group">
                            <div className="relative h-48 bg-gradient-to-br from-white to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-slate-700/50 hover:border-emerald-400 dark:hover:border-gray-400/50 transition-all duration-500 overflow-hidden shadow-md hover:shadow-xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/20 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
                                <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-slate-600/50 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                                    <img src={partner.logo} alt={`${partner.name} logo`} className="w-full h-full object-contain p-2" />
                                </div>
                                <div className="text-gray-700 dark:text-slate-300 text-sm leading-relaxed font-medium">
                                    {partner.name}
                                </div>
                                </div>

                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 dark:from-gray-500/10 dark:to-blue-500/10"></div>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/30 dark:via-gray-400/50 to-transparent"></div>
                </section>


                <section className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/20 via-blue-100/10 to-emerald-100/20 dark:from-emerald-600/20 dark:via-blue-600/10 dark:to-emerald-600/20 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-30 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-200 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-12 dark:opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white drop-shadow-lg">Ready to Transform Your Business?</h2>
                        <p className="text-lg text-gray-700 dark:text-gray-100 mb-8 max-w-2xl mx-auto backdrop-blur-sm bg-white/60 dark:bg-white/5 rounded-xl p-6 border border-emerald-200 dark:border-white/10">
                            Join thousands of Youths, Entrepreneurs, Builders, Leaders, and Investors who are already building Nigeria's Industrial Future.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('register')}
                                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/50 relative group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500"></div>
                                <span className="relative">Start Your Journey</span>
                            </Link>
                            <button className="border-2 border-emerald-500 dark:border-emerald-400/50 text-emerald-600 dark:text-emerald-100 hover:text-emerald-700 dark:hover:text-emerald-100 backdrop-blur-sm bg-white/70 dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20 dark:hover:shadow-emerald-500/20 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-100/10 dark:via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500"></div>
                                <span className="relative">Join Community</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="relative py-24 overflow-hidden bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/20 via-transparent to-blue-100/20 dark:from-emerald-500/10 dark:via-transparent dark:to-blue-500/10 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-400 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-200 dark:bg-blue-400 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '1.5s'}}></div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                What Our Partners Say
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Trusted by leaders across Nigeria's innovation ecosystem
                            </p>
                        </div>

                        {/* Desktop: 3 cards in a row */}
                        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {[
                                {
                                    quote: "At AfaraHub, we believe in the power of innovation to create opportunities. The NYP-IP Portal aligns perfectly with our mission to empower young entrepreneurs. We're proud to support this initiative because it provides the ecosystem young Nigerians need to turn their ideas into impactful, scalable ventures that benefit our communities.",
                                    name: "Mr. Oluwasegun Omoworare",
                                    title: "CEO, AfaraHub Ensemble Company",
                                    gradient: "from-purple-400 to-pink-400"
                                },
                                {
                                    quote: "The NYP-IP Portal is instrumental in connecting startups with the right funding, and providing the training and tools needed to scale their businesses. NYP truly believes in empowering nation builders.",
                                    name: "Adesanmi Emmanuel Adebukola",
                                    title: "CEO, LuxuryX Technologies & TradeFi Limited",
                                    gradient: "from-emerald-400 to-blue-400"
                                },
                                {
                                    quote: "The NYP-IP Portal represents our unwavering commitment to youth economic empowerment and nation-building. By bridging the gap between young innovators and critical resources, we're not just supporting businesses—we're cultivating the next generation of leaders who will transform Nigeria's economy and drive sustainable development.",
                                    name: "Rt. Hon. Aliyu Idris Zakari",
                                    title: "Speaker, Nigerian Youth Parliament (6th Session)",
                                    gradient: "from-blue-400 to-purple-400"
                                }
                            ].map((testimonial, index) => (
                                <div key={index} className="backdrop-blur-sm bg-white/80 dark:bg-white/5 border border-emerald-200 dark:border-white/10 rounded-2xl p-8 shadow-2xl hover:shadow-emerald-300 dark:hover:shadow-emerald-500/20 transition-all duration-300 group hover:bg-white/90 dark:hover:bg-white/10 hover:-translate-y-2">
                                    <div className="text-5xl text-emerald-400 dark:text-emerald-300 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform">"</div>
                                    <p className="text-base text-gray-700 dark:text-gray-100 mb-6 italic leading-relaxed min-h-[160px]">
                                        {testimonial.quote}
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full shadow-lg`}></div>
                                        <div className="text-left">
                                            <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile: Horizontal scroll with smooth slide */}
                        <div className="md:hidden relative">
                            <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                                <div className="flex space-x-6 px-6">
                                    {[
                                        {
                                            quote: "At AfaraHub, we believe in the power of innovation to create opportunities. The NYP-IP Portal aligns perfectly with our mission to empower young entrepreneurs. We're proud to support this initiative because it provides the ecosystem young Nigerians need to turn their ideas into impactful, scalable ventures that benefit our communities.",
                                            name: "Mr. Oluwasegun Omoworare",
                                            title: "CEO, AfaraHub Ensemble Company",
                                            gradient: "from-purple-400 to-pink-400"
                                        },
                                        {
                                            quote: "The NYP-IP Portal is instrumental in connecting startups with the right funding, and providing the training and tools needed to scale their businesses. NYP truly believes in empowering nation builders.",
                                            name: "Adesanmi Emmanuel Adebukola",
                                            title: "CEO, LuxuryX Technologies & TradeFi Limited",
                                            gradient: "from-emerald-400 to-blue-400"
                                        },
                                        {
                                            quote: "The NYP-IP Portal represents our unwavering commitment to youth economic empowerment and nation-building. By bridging the gap between young innovators and critical resources, we're not just supporting businesses—we're cultivating the next generation of leaders who will transform Nigeria's economy and drive sustainable development.",
                                            name: "Rt. Hon. Aliyu Idris Zakari",
                                            title: "Speaker, Nigerian Youth Parliament (6th Session)",
                                            gradient: "from-blue-400 to-purple-400"
                                        }
                                    ].map((testimonial, index) => (
                                        <div key={index} className="flex-shrink-0 w-[85vw] snap-center">
                                            <div className="backdrop-blur-sm bg-white/80 dark:bg-white/5 border border-emerald-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-300 h-full">
                                                <div className="text-5xl text-emerald-400 dark:text-emerald-300 mb-4 drop-shadow-lg">"</div>
                                                <p className="text-base text-gray-700 dark:text-gray-100 mb-6 italic leading-relaxed">
                                                    {testimonial.quote}
                                                </p>
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full shadow-lg flex-shrink-0`}></div>
                                                    <div className="text-left">
                                                        <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Scroll indicator dots */}
                            <div className="flex justify-center space-x-2 mt-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-900 dark:via-gray-950 dark:to-black border-t border-emerald-400/20 dark:border-emerald-800/30">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-emerald-500/5 dark:via-blue-500/3 animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-5 dark:opacity-10"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-5 dark:opacity-10"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        {/* Main Footer Columns */}
                        <div className="py-16 grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            {/* Column 1: About NYP - Institution */}
                            <div>
                                <div className="flex items-center space-x-2 mb-6">
                                    <img src={logo} className="h-8" alt="NYP Logo" />
                                    <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400">About NYP</h3>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="/about" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">About NYP</a>
                                    </li>
                                    <li>
                                        <a href="/leadership" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Leadership</a>
                                    </li>
                                    <li>
                                        <a href="/governance" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Committees & Governance</a>
                                    </li>
                                    <li>
                                        <a href="/zones" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Geopolitical Zones</a>
                                    </li>
                                    <li>
                                        <a href="/mission" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Mission & Vision</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 2: NYP-IP Program */}
                            <div>
                                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6">NYP-IP Program</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="/program" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">Program Overview</a>
                                    </li>
                                    <li>
                                        <a href="/partners" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Strategic Partners</a>
                                    </li>
                                    <li>
                                        <a href="/owop-mandate" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">O.W.O.P Mandate</a>
                                    </li>
                                    <li>
                                        <a href="/ecosystem" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Industrialization Ecosystem</a>
                                    </li>
                                    <li>
                                        <a href="/impact" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Impact & Results</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3: Documentation */}
                            <div>
                                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6">Framework</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="/documentation/whitepaper" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">Project Whitepaper</a>
                                    </li>
                                    <li>
                                        <a href="/documentation/policy" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Policy & Governance Framework</a>
                                    </li>
                                    <li>
                                        <a href="/documentation/funding-framework" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Funding & Financial Engineering</a>
                                    </li>
                                    <li>
                                        <a href="/documentation/infrastructure" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Infrastructure & Technology</a>
                                    </li>
                                    <li>
                                        <a href="/documentation/specs" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Technical Specifications</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 4: Resources & Community */}
                            <div>
                                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6">Resources</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="/community" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">Community Hub</a>
                                    </li>
                                    <li>
                                        <a href="/knowledge-base" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Knowledge Base</a>
                                    </li>
                                    <li>
                                        <a href="/support" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Contact & Support</a>
                                    </li>
                                    <li>
                                        <a href="/faq" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="/feedback" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Feedback & Suggestions</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 5: Socials */}
                            <div>
                                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6">Socials</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="https://x.com/Official_NYP1" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">X</a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/OfficialNYP" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Facebook</a>
                                    </li>
                                    <li>
                                        <a href="https://www.instagram.com/official_nyp1/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Instagram</a>
                                    </li>
                                    <li>
                                        <a href="https://t.me/nypipcommunity" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Telegram</a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/company/the-nigerian-youth-parliament/" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">LinkedIn</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 6: Funding & Capital */}
                            <div>
                                <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mb-6">Funding & Capital</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="https://luxuryxtech.org.ng/luxuryxpad/project-owners/dashboard" target="_blank" rel="noopener noreferrer" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium">Tokenization</a>
                                    </li>
                                    <li>
                                        <a href="https://luxuryxtech.org.ng/assets/ngni" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Industrial NGN</a>
                                    </li>
                                    <li>
                                        <a href="https://luxuryxtech.org.ng/assets/usdi" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Industrial USD</a>
                                    </li>
                                    <li>
                                        <a href="https://luxuryxtech.org.ng/assets/ind" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Industrial Fund</a>
                                    </li>
                                    <li>
                                        <a href="https://luxuryxtech.org.ng/assets/lidlf" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">$LIDLF</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Regulatory Disclosure */}
                        <div className="py-8 border-t border-gray-200 dark:border-gray-800">
                            <div className="bg-gradient-to-r from-emerald-50/50 to-blue-50/50 dark:from-emerald-950/20 dark:to-blue-950/20 border border-emerald-200/50 dark:border-emerald-900/30 rounded-lg p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13H17.5V11.5H12.5V7Z"/>
                                    </svg>
                                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Program Notice & Disclaimer</h4>
                                </div>
                                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                                    The <strong>Nigerian Youth Parliament Industrialization Programme (NYP-IP)</strong> is a national initiative aimed at catalyzing industrialization, skills development, and economic empowerment across Nigeria. This portal and all associated materials are provided for informational purposes. <strong>This is not investment advice.</strong> All participants must review applicable regulations, comply with local and national laws, and consult relevant authorities before participation. Tokenized assets and digital securities carry inherent risks including potential total loss. By using this platform, you acknowledge these risks and agree to our terms.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Footer */}
                        <div className="py-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                            <div className="flex gap-6">
                                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy Policy</a>
                                <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms of Service</a>
                                <a href="/cookies" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Cookie Policy</a>
                                <a href="/disclaimer" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Disclaimer</a>
                            </div>
                            <p>© {new Date().getFullYear()} Nigerian Youth Parliament (NYP). All Rights Reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
