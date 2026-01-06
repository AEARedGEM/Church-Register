import { logo } from '@/images';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [isDark, setIsDark] = useState(true);

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
                            <div className="inline-flex items-center bg-emerald-100 dark:from-emerald-500/20 dark:to-blue-500/20 backdrop-blur-xl border border-emerald-300 dark:border-emerald-400/30 px-5 py-2 mb-6 rounded-full hover:border-emerald-400 dark:hover:border-emerald-400/60 transition-all duration-300">
                                <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">NYP Industrialization Programme (NYP-IP)</span>
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
                                    <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">Equity Investment</div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 hover:border-emerald-400/30 rounded-lg p-4 transition-all duration-300 group-hover:bg-white/10">
                                    <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent mb-1">₦0</div>
                                    <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300">TradeFi Fund Disbursed</div>
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

                {/* Features Section */}
                <section className="relative py-24 overflow-hidden">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-white dark:from-black dark:via-gray-950 dark:to-black"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-blue-100/10 to-emerald-100/20 dark:from-emerald-600/15 dark:via-blue-600/10 dark:to-emerald-600/15 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-30 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-emerald-200 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-12 dark:opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-200 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '3s'}}></div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(0deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 container mx-auto px-6 lg:px-12">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-4">
                                <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-100/50 dark:bg-emerald-900/50 border border-emerald-200/50 dark:border-emerald-800 rounded-full backdrop-blur-sm">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Industrial Development Hub</span>
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">NYP-IP Industrialization Ecosystem</h2>
                            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                                A Unified Industrial Development Suite Connecting Policy, Skills, Capital, Technology, and Markets Across Nigeria
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

                            {/* NAP/S Survey */}
                            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-lg dark:hover:bg-gray-600 hover:shadow-emerald-200 dark:hover:shadow-none transition-all duration-300 group">
                                <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">NAP/S & O.W.O.P Mandate</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Participate in the National Needs Assessment. Your voice matters in building policies that serve you.
                                </p>
                                <a
                                                href="https://nypipportal.luxuryxtech.org.ng/naps"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full block"
                                            >
                                <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors">
                                    Register & Participate →
                                </button>
                                </a>
                            </div>

                            {/* Skills Training */}
                            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-lg dark:hover:bg-gray-600 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Skills & Upskilling Development</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Access training programs in Soft Skills, Tech Skills, and Vocational Skills with mentorship and certification.
                                </p>
                                <a
                                                href="https://nypipportal.luxuryxtech.org.ng/training"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full block"
                                            >
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
                                    Browse Courses →
                                </button>
                                </a>
                            </div>

                            {/* Tokenization Funding */}
                            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-lg dark:hover:bg-gray-600 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">StartUps Tokenization</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Tokenize & Transform Your Company, Invoice, or Projects into Capital & Liquidity Opportunities.
                                </p>
                                <a
                                                href="https://luxuryxtech.org.ng/tokenization"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full block"
                                            >
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
                                    Apply for Funding →
                                </button>
                                </a>
                            </div>

                            {/* TradeFi Funding */}
                            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-lg dark:hover:bg-gray-600 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-green-500 dark:bg-green-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4L13.5 7H7V9H13.5L15 12L21 9ZM7 12V22H9V18H11V22H13V12H7Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">TradeFi Funding</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Access (Working Capital, Export & Import Financing) through our Global Tokenized & TradeFi system.
                                </p>
                                <a
                                                href="https://luxuryxtech.org.ng/#financing"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full block"
                                            >
                                <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-semibold transition-colors">
                                    Apply for Funding →
                                </button>
                                </a>
                            </div>

                            {/* VC Matching */}
                            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-lg dark:hover:bg-gray-600 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-emerald-500 dark:bg-emerald-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 4C18.2 4 20 5.8 20 8C20 10.2 18.2 12 16 12C13.8 12 12 10.2 12 8C12 5.8 13.8 4 16 4ZM8 6C9.1 6 10 6.9 10 8C10 9.1 9.1 10 8 10C6.9 10 6 9.1 6 8C6 6.9 6.9 6 8 6ZM8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12ZM16 14C18.7 14 24 15.3 24 18V20H18V18C18 16.9 17.6 15.4 16 14Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Equity Funding</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Connect with NYP Special Fund, VCs and Strategic Partners looking to invest in Nigeria's growing economy.
                                </p>
                                <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors">
                                    Find Investors →
                                </button>
                            </div>

                            {/* Business Registration */}
                            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-lg dark:hover:bg-gray-600 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">StartUp Incubation</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Streamlined business onboarding with Incorporation (CAC, USA, UK), development toolkit & funding access.
                                </p>
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
                                    Register Now →
                                </button>
                            </div>

                            {/* Web3 Integration */}
                            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-lg dark:hover:bg-gray-600 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.4 7 14.8 8.6 14.8 10V14H15.5C16.3 14 17 14.4 17 15V19C17 19.6 16.6 20 16 20H8C7.4 20 7 19.6 7 19V15C7 14.4 7.4 14 8 14H8.5V10C8.5 8.6 9.6 7 12 7ZM12 8.2C10.2 8.2 9.2 9.2 9.2 10V14H14.8V10C14.8 9.2 13.8 8.2 12 8.2Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Web3 Dashboard</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Access Wallets for cross-border B2B & B2C transactions, and track your portfolio performance.
                                </p>
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors">
                                    Access Wallet →
                                </button>
                            </div>

                            {/* Community Hub */}
                            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-5 hover:shadow-lg dark:hover:bg-gray-600 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-emerald-500 dark:bg-emerald-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M16 4C18.2 4 20 5.8 20 8S18.2 12 16 12 12 10.2 12 8 13.8 4 16 4M16 14C18.7 14 24 15.3 24 18V20H8V18C8 15.3 13.3 14 16 14M8 6C9.1 6 10 6.9 10 8S9.1 10 8 10 6 9.1 6 8 6.9 6 8 6M8 12C10.7 12 16 13.3 16 16V18H0V16C0 13.3 5.3 12 8 12Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Community Hub</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Join sector-based clusters, participate in forums, and connect with mentors & peers in your industry.
                                </p>
                                <button className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold transition-colors">
                                    Join Community →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Whitepaper & Frameworks Section */}
                <section className="relative py-24 overflow-hidden">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-800 dark:to-gray-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/20 via-transparent to-blue-100/20 dark:from-emerald-500/10 dark:via-transparent dark:to-blue-500/10 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-400 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-200 dark:bg-blue-400 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '1.5s'}}></div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-4">
                                <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-100/50 dark:bg-emerald-900/50 border border-emerald-200/50 dark:border-emerald-800 rounded-full backdrop-blur-sm">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Documentation</span>
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Project Documentation</h2>
                            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                                Download our whitepaper and framework documents to understand our vision and implementation strategy
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Whitepaper */}
                            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg dark:hover:bg-gray-700 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20ZM8 13H16V15H8V13ZM8 17H16V19H8V17ZM8 9H10V11H8V9Z"/>
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Project Whitepaper</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                    Comprehensive document outlining the NYP-IP vision, objectives, and implementation roadmap.
                                </p>
                                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                                    Download PDF →
                                </button>
                            </div>

                            {/* Framework Documents */}
                            {[
                                "Policy & Governance Framework",
                                "Funding & Financial Engineering Framework",
                                "Infrastructure & Technology Framework"
                            ].map((framework, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg dark:hover:bg-gray-700 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 12H9V17H7V12ZM11 7H13V17H11V7ZM15 10H17V17H15V10Z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{framework}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                        Detailed framework document for {framework.split(' ')[0]} implementation.
                                    </p>
                                    <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                                        Download PDF →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Program Activities Section */}
                <section className="relative py-24 overflow-hidden">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-blue-950 dark:to-gray-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 via-blue-100/10 to-emerald-100/20 dark:from-emerald-600/15 dark:via-blue-600/10 dark:to-emerald-600/15 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-200 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-30 animate-pulse"></div>
                    <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-12 dark:opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
                    <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-200 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '3s'}}></div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(0deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}></div>
                    </div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center justify-center mb-4">
                                <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-100/50 dark:bg-emerald-900/50 border border-emerald-200/50 dark:border-emerald-800 rounded-full backdrop-blur-sm">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300\">Learning Programs</span>
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Program Activities</h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                Comprehensive activities across all our program categories
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Startups Incubation */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 transform group-hover:scale-105"></div>
                                <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 h-full flex flex-col">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2L21 7L12 12L3 7L12 2ZM21 16L12 21L3 16L12 11L21 16Z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Startups Incubation</h3>
                                    <div className="flex-grow">
                                        <ul className="space-y-3">
                                            {[
                                                "Idea Validation & Merging",
                                                "Concept Development & Testing",
                                                "Marketing Strategy Development",
                                                "Business/Project Analysis",
                                                "Product Development",
                                                "Test Marketing/Branding",
                                                "Commercialization",
                                                "Quasi-Equity Investment Model",
                                                "Incorporation (US, UK, Nigeria)",
                                                "Tax Exemption Incentives",
                                                "StartUp Tokenization",
                                                "PPPs Partnerships & Expansion"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start text-gray-700 dark:text-gray-300 text-sm group/item">
                                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 transition-transform">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                                                        </svg>
                                                    </div>
                                                    <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Webinar & Soft Skills */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 transform group-hover:scale-105"></div>
                                <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 h-full flex flex-col">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Webinar & Soft Skills</h3>
                                    <div className="flex-grow">
                                        <ul className="space-y-3">
                                            {[
                                                "Startup Success",
                                                "Finance & Wealth Creation",
                                                "Digital Transformation",
                                                "Public Speaking Mastery",
                                                "Career Growth & Employability",
                                                "Women in Tech & Business",
                                                "Politics & Business Leadership",
                                                "Entrepreneurial Skills",
                                                "Emotional Intelligence",
                                                "Critical Thinking",
                                                "Personal Branding",
                                                "Time Management"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start text-gray-700 dark:text-gray-300 text-sm group/item">
                                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 transition-transform">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                                                        </svg>
                                                    </div>
                                                    <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Tech Skills & Web4 */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 transform group-hover:scale-105"></div>
                                <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 h-full flex flex-col">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M7 2V4H5C3.9 4 3 4.9 3 6V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V6C21 4.9 20.1 4 19 4H17V2H7ZM19 18H5V8H19V18ZM8 10V16H16V10H8Z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Tech Skills & Web4</h3>
                                    <div className="flex-grow">
                                        <ul className="space-y-3">
                                            {[
                                                "Website Development",
                                                "Mobile App Development",
                                                "Blockchain Development",
                                                "Cybersecurity",
                                                "AI & Machine Learning",
                                                "Cloud Computing",
                                                "Mobile Graphics Designing",
                                                "Social Media Management",
                                                "UI/UX Design",
                                                "Data Analytics",
                                                "Digital Marketing",
                                                "Video Editing & Motion Graphics"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start text-gray-700 dark:text-gray-300 text-sm group/item">
                                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 transition-transform">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                                                        </svg>
                                                    </div>
                                                    <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Vocational Skills */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 transform group-hover:scale-105"></div>
                                <div className="relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 h-full flex flex-col">
                                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22 9L12 2L2 9H11V22H13V9H22ZM12 4.16L18.11 8H5.89L12 4.16Z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Vocational Skills</h3>
                                    <div className="flex-grow">
                                        <ul className="space-y-3">
                                            {[
                                                "Paint Production",
                                                "Fashion Designing",
                                                "Makeup Artistry",
                                                "Photography & Videography",
                                                "Shoe & Bag Making",
                                                "Event Planning & Decoration",
                                                "Catering & Pastry Making",
                                                "Hairdressing & Wig Making",
                                                "Leatherworks & Craftsmanship",
                                                "Plumbing & Electrical Works",
                                                "Carpentry & Furniture Making",
                                                "Auto Mechanics"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start text-gray-700 dark:text-gray-300 text-sm group/item">
                                                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5 transform group-hover/item:scale-110 transition-transform">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"/>
                                                        </svg>
                                                    </div>
                                                    <span className="group-hover/item:translate-x-1 transition-transform">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Digital Assets Section */}
                <section className="relative py-24 overflow-hidden">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-100/20 via-blue-100/10 to-emerald-100/20 dark:from-emerald-500/10 dark:via-blue-500/10 dark:to-emerald-500/10 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-500 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-25 animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-200 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-20 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                    <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-emerald-200 dark:bg-emerald-400 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-12 dark:opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center justify-center mb-4">
                                <div className="flex items-center space-x-2 px-4 py-2 bg-emerald-100/50 dark:bg-emerald-900/50 border border-emerald-200/50 dark:border-emerald-800 rounded-full backdrop-blur-sm">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                    <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Digital Assets</span>
                                </div>
                            </div>
                            <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Digital Assets & Funds</h2>
                            <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
                                SEC-compliant digital assets powering Osun's industrialization
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    name: "NYP-IP Fund",
                                    description: "A Proposed SEC Specialized Industrialization Fund",
                                    compliance: "SEC COMPLIANT & REGULATED",
                                    color: "bg-emerald-500 dark:bg-emerald-600"
                                },
                                {
                                    name: "Industrial Fund",
                                    symbol: "$IND",
                                    description: "A Global Digital Asset Built For Industrialization - Back Industrial Projects & Startup Incubation",
                                    compliance: "SEC, NFIU, EFCC COMPLIANT & REGULATED",
                                    color: "bg-blue-500 dark:bg-blue-600"
                                },
                                {
                                    name: "Industria USD",
                                    symbol: "USDI",
                                    description: "A USD-Pegged (Stablecoin) Powering Global Payments, Industrialization & Trade Financing",
                                    compliance: "SEC, NFIU, EFCC COMPLIANT & REGULATED",
                                    color: "bg-blue-500 dark:bg-blue-600"
                                },
                                {
                                    name: "Industria NGN",
                                    symbol: "NGNI",
                                    description: "A Naira-Pegged Digital Asset for Local Transactions & Industrial Development",
                                    compliance: "SEC, NFIU, EFCC COMPLIANT & REGULATED",
                                    color: "bg-emerald-500 dark:bg-emerald-600"
                                }
                            ].map((asset, index) => (
                                <div key={index} className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg dark:hover:bg-gray-700 transition-all duration-300 group">
                                    <div className={`w-12 h-12 ${asset.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"/>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100">{asset.name}</h3>
                                    {asset.symbol && (
                                        <div className="text-sm font-mono bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 inline-block mb-2">
                                            {asset.symbol}
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{asset.description}</p>
                                    <div className="text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 inline-block">
                                        {asset.compliance}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
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
                <footer className="relative py-12 border-t border-emerald-400/20 dark:border-emerald-800/30 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-black">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-black"></div>

                    {/* Subtle accent */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-emerald-500/5 animate-pulse"></div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center space-x-3 mb-4 md:mb-0">
                                 <div className="flex items-center space-x-2 text-center justify-center">
                                    <img src={logo} className="h-10 mx-auto" />
                                </div>
                                <span className="font-semibold text-emerald-600 dark:text-emerald-400">NYP-IP Portal</span>
                            </div>
                            <div className="flex space-x-6 text-gray-500 dark:text-gray-400">
                                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Privacy</a>
                                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Terms</a>
                                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Support</a>
                                <a href="#" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">Contact</a>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
                            <p>© {new Date().getFullYear()} NYP-IP Portal. Powered by LuxuryX Technologies & TradeFi Limited.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
