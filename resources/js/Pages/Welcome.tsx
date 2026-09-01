import { logo } from '@/images';
import { PageProps } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
    churchSummary,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    churchSummary?: {
        member_count?: number;
        attendance_total?: number;
        prayer_requests?: number;
        active_ministries?: number;
        upcoming_events?: number;
    };
}>) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    const [highlightFooter, setHighlightFooter] = useState(false);
    const highlightTimeoutRef = useRef<number | null>(null);

    const memberCount = churchSummary?.member_count ?? 0;
    const sundayAttendance = churchSummary?.attendance_total ?? 0;
    const upcomingEventsCount = churchSummary?.upcoming_events ?? 0;
    const smallGroupsCount = churchSummary?.active_ministries ?? 0;

    const scrollToFooter = () => {
        const footer = document.getElementById('footer-resources');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setHighlightFooter(true);
            if (highlightTimeoutRef.current) {
                window.clearTimeout(highlightTimeoutRef.current);
            }
            highlightTimeoutRef.current = window.setTimeout(() => {
                setHighlightFooter(false);
                highlightTimeoutRef.current = null;
            }, 2200);
        }
    };

    useEffect(() => {
        return () => {
            if (highlightTimeoutRef.current) {
                window.clearTimeout(highlightTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <Head title="APGA Worldwide - Apostolic Power Glorious Assembly" />
            <div className="bg-gradient-to-b from-slate-950 via-red-900/10 to-slate-950 text-slate-100 min-h-screen transition-colors duration-300">
                {/* Header */}
                <header className="relative z-50 bg-slate-950/95 backdrop-blur-sm border-b border-red-800/70">
                    <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-2 text-center justify-center">
                                <img src={logo} className="h-10 mx-auto" />
                            </div>
                            <span className="text-xl font-bold text-white">APGA Worldwide</span>
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
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                    >
                                        Join Us
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <section className="relative min-h-[600px] py-20 overflow-hidden">
                    {/* Main gradient background */}
                    <div className="absolute inset-0 bg-slate-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 via-slate-800/10 to-red-900/20 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-30 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-25 animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-12 dark:opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(0deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}></div>
                    </div>

                    {/* Radial gradient accent */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center bg-slate-800/80 backdrop-blur-xl border border-red-700/80 px-5 py-2 mb-6 rounded-full hover:border-red-600 transition-all duration-300">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                                <span className="text-xs font-bold text-slate-100">Apostolic Power Glorious Assembly Worldwide</span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white drop-shadow-2xl leading-tight">
                                Growing God's Kingdom
                                <br />
                                <span className="bg-gradient-to-r from-slate-900 via-red-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">Together in Faith</span>
                            </h1>
                            <p className="text-slate-200 mb-6 max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-slate-900/70 dark:bg-slate-950/80 rounded-lg p-5 border border-red-800/50">
                                Welcome to APGA Worldwide - A faith-based community dedicated to spiritual growth, fellowship, and making a difference in the world. Track attendance, manage events, invite friends, and build meaningful connections.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href={route('register')}
                                    className="relative overflow-hidden rounded-lg bg-red-600 hover:bg-red-700 px-7 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300"
                                >
                                    <span className="relative">Register Now</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={scrollToFooter}
                                    className="border-2 border-red-700 text-slate-100 hover:text-white backdrop-blur-sm bg-slate-900/70 hover:bg-slate-800/90 px-7 py-3 rounded-lg font-semibold text-base transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-red-900/40 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-100/10 dark:via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500"></div>
                                    <span className="relative">Learn More</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="relative py-20 overflow-hidden">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-slate-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-slate-900/20 animate-pulse"></div>

                    {/* Decorative blurred shapes for depth */}
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-25 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-20 animate-pulse" style={{animationDelay: '1.5s'}}></div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-200/20 to-red-200/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-slate-900/85 border border-red-800/70 hover:border-red-700 rounded-lg p-4 transition-all duration-300 group-hover:bg-slate-900/95">
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{memberCount}</div>
                                    <div className="text-xs md:text-sm text-slate-300">Total Members</div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-200/20 to-red-200/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-slate-900/85 border border-red-800/70 hover:border-red-700 rounded-lg p-4 transition-all duration-300 group-hover:bg-slate-900/95">
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{sundayAttendance}</div>
                                    <div className="text-xs md:text-sm text-slate-300">Sunday Attendance</div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-200/20 to-red-200/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-slate-900/85 border border-red-800/70 hover:border-red-700 rounded-lg p-4 transition-all duration-300 group-hover:bg-slate-900/95">
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{upcomingEventsCount}</div>
                                    <div className="text-xs md:text-sm text-slate-300">Upcoming Events</div>
                                </div>
                            </div>
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-200/20 to-red-200/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                <div className="relative backdrop-blur-sm bg-slate-900/85 border border-red-800/70 hover:border-red-700 rounded-lg p-4 transition-all duration-300 group-hover:bg-slate-900/95">
                                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">{smallGroupsCount}</div>
                                    <div className="text-xs md:text-sm text-slate-300">Small Groups</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Church service schedule */}
                <section className="relative py-20 overflow-hidden bg-[#120d0d]">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 via-transparent to-red-950/30"></div>
                    <div className="relative max-w-7xl mx-auto px-6 z-10">
                        <div className="mb-10 text-center">
                            <span className="inline-block rounded-full border border-red-700/70 bg-red-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-200">
                                Weekly rhythm
                            </span>
                            <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">This Week at APGA Worldwide</h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-3">
                            {[
                                { title: 'Sunday Worship', time: '9:00 AM', detail: 'Main Sanctuary · Family worship service', tone: 'from-red-600 to-red-700' },
                                { title: 'Midweek Prayer', time: 'Wednesday · 6:00 PM', detail: 'Prayer & deliverance meeting', tone: 'from-rose-600 to-orange-500' },
                                { title: 'Youth & Teens', time: 'Friday · 5:30 PM', detail: 'Discipleship, teaching & fellowship', tone: 'from-red-700 to-rose-600' },
                            ].map((service) => (
                                <div key={service.title} className="rounded-3xl border border-red-800/70 bg-slate-900/80 p-6 shadow-lg shadow-red-950/20">
                                    <div className={`mb-4 inline-flex rounded-full bg-gradient-to-r ${service.tone} px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-white`}>
                                        {service.time}
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{service.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Ministries section */}
                <section className="relative py-20 overflow-hidden bg-slate-950">
                    <div className="relative max-w-7xl mx-auto px-6 z-10">
                        <div className="mb-12 text-center">
                            <span className="inline-block rounded-full border border-red-700/70 bg-red-900/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-red-200">
                                Ministries
                            </span>
                            <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">Places to Grow, Serve, and Belong</h2>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                            {[
                                { name: 'Children’s Church', text: 'Nurturing the next generation with discipleship, creativity, and biblical teaching.' },
                                { name: 'Youth Ministry', text: 'Empowering teenagers and young adults through mentorship, music, and purpose-driven community.' },
                                { name: 'Women’s Fellowship', text: 'Building spiritual strength, prayer support, and sisterhood across every season of life.' },
                                { name: 'Men’s Forum', text: 'Developing godly leadership, accountability, and service in the home and church.' },
                            ].map((ministry) => (
                                <div key={ministry.name} className="rounded-2xl border border-red-800/60 bg-slate-900/80 p-5 text-left shadow-md shadow-red-950/20">
                                    <div className="mb-3 h-2.5 w-16 rounded-full bg-gradient-to-r from-red-500 to-rose-500"></div>
                                    <h3 className="text-xl font-bold text-white">{ministry.name}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-300">{ministry.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* President Section */}
                <section className="relative py-24 overflow-hidden bg-slate-950">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-slate-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-red-900/10 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>

                    <div className="relative max-w-6xl mx-auto px-6 z-10">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Content */}
                            <div>
                                <div className="inline-block mb-4">
                                    <span className="text-slate-100 font-semibold tracking-wider uppercase text-sm bg-red-800/70 px-4 py-2 border border-red-700 rounded-full backdrop-blur-sm">
                                        Leadership
                                    </span>
                                </div>
                                <h2 className="text-4xl font-bold mb-6 text-white">From Our President</h2>
                                <div className="space-y-4">
                                    <p className="text-slate-300 text-lg leading-relaxed">
                                        Welcome to APGA Worldwide, a community built on faith, purpose, and spiritual transformation. Our mission is to create an environment where every believer can grow in their relationship with God, connect meaningfully with their spiritual family, and make a positive impact on the world around them.
                                    </p>
                                    <p className="text-slate-300 text-lg leading-relaxed">
                                        Whether you're seeking spiritual guidance, looking to serve in ministry, or simply wanting to deepen your faith journey, you'll find a welcoming community here. We believe in the power of unity, fellowship, and the transformative power of God's Word.
                                    </p>
                                    <p className="text-red-300 text-lg font-semibold italic">
                                        "Come to me, all you who are weary and burdened, and I will give you rest." - Matthew 11:28
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <Link
                                        href={route('register')}
                                        className="inline-block bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-red-500/50"
                                    >
                                        Join Our Community
                                    </Link>
                                </div>
                            </div>

                            {/* Image / Visual */}
                            <div className="relative">
                                <div className="backdrop-blur-sm bg-gradient-to-br from-slate-900/85 to-slate-900/95 border border-red-800/70 rounded-2xl p-8 shadow-2xl">
                                    <div className="text-center space-y-4">
                                        <img
                                            src="/images/President_GO.jpeg"
                                            alt="Pastor (Dr.) S.O. Ilesanmi"
                                            className="mx-auto h-64 w-64 rounded-full border-4 border-red-500 object-cover shadow-lg shadow-red-950/30"
                                        />
                                        <h3 className="text-2xl font-bold text-white">Pastor (Dr.) S.O. Ilesanmi</h3>
                                        <p className="text-red-300 font-semibold">President</p>
                                        <div className="pt-4 border-t border-red-800/50">
                                            <p className="text-slate-300 text-sm leading-relaxed">
                                                Leading with vision, integrity, and a heart for God's kingdom. Our leadership is committed to fostering spiritual growth and community transformation through faith and service.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="relative py-24 overflow-hidden bg-slate-950">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-slate-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-red-900/10 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>

                    <div className="relative max-w-7xl mx-auto px-6 z-10">
                        {/* Header */}
                        <div className="text-center mb-16">
                            <div className="inline-block mb-4">
                                <span className="text-slate-100 font-semibold tracking-wider uppercase text-sm bg-red-800/70 px-4 py-2 border border-red-700 rounded-full backdrop-blur-sm">
                                    Our Features
                                </span>
                            </div>
                            <h2 className="text-4xl font-bold mb-4 text-slate-100">Church Management Features</h2>
                            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                                Everything you need to manage and grow your church community
                            </p>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Worship & Prayer",
                                    description: "Gather in faith, grow in prayer, and experience Spirit-filled worship every week.",
                                    icon: "✝️"
                                },
                                {
                                    title: "Family & Discipleship",
                                    description: "Support members through biblical teaching, mentorship, and life-group discipleship.",
                                    icon: "🤝"
                                },
                                {
                                    title: "Events & Outreach",
                                    description: "Host impactful church gatherings, community service days, and revival programmes.",
                                    icon: "📅"
                                },
                                {
                                    title: "Member Care",
                                    description: "Stay connected through pastoral care, prayer support, and active church community.",
                                    icon: "👥"
                                },
                                {
                                    title: "Prayer Requests",
                                    description: "Bring your needs before God and receive encouragement from the church community.",
                                    icon: "🙏"
                                },
                                {
                                    title: "Church Insight",
                                    description: "Track attendance, ministries, and growth with tools designed for healthy church operations.",
                                    icon: "📊"
                                }
                            ].map((feature, index) => (
                                <div key={index} className="backdrop-blur-sm bg-slate-900/85 border border-red-800/70 rounded-2xl p-8 shadow-2xl transition-all duration-300 group hover:bg-slate-900/95 hover:-translate-y-2">
                                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="relative py-24 overflow-hidden bg-slate-950">
                    {/* Decorative blurred shapes */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-200 dark:bg-red-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-15 dark:opacity-30 animate-pulse"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-200 dark:bg-red-600 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-12 dark:opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h2 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">Ready to Join Our Community?</h2>
                        <p className="text-slate-200 mb-8 max-w-2xl mx-auto backdrop-blur-sm bg-slate-900/70 rounded-xl p-6 border border-red-800/50">
                            Take the first step in your spiritual journey. Register today to access attendance tracking, connect with church members, and stay updated on all church activities.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('register')}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-red-500/50 relative group overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500"></div>
                                <span className="relative">Create Account</span>
                            </Link>
                            <button className="border-2 border-red-700 text-slate-100 hover:text-white backdrop-blur-sm bg-slate-900/80 hover:bg-slate-800/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 hover:shadow-lg hover:shadow-red-900/40 group relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-100/10 dark:via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-500"></div>
                                <span className="relative">Schedule a Visit</span>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="relative py-24 overflow-hidden bg-slate-950">
                    {/* Premium gradient background */}
                    <div className="absolute inset-0 bg-slate-950"></div>

                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-slate-900/20 animate-pulse"></div>

                    {/* Decorative blurred shapes */}
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-15 dark:opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-red-200 dark:bg-red-700 rounded-full mix-blend-multiply dark:mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-15 animate-pulse" style={{animationDelay: '1.5s'}}></div>

                    {/* Content */}
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                What Members Say
                            </h2>
                            <p className="text-lg text-gray-300">
                                Hear from members of our church community
                            </p>
                        </div>

                        {/* Desktop: 3 cards in a row */}
                        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {[
                                {
                                    quote: "The church community here is so welcoming and supportive. The attendance tracking system has really helped me stay connected with church activities.",
                                    name: "John Doe",
                                    title: "Church Member",
                                    gradient: "from-red-400 to-red-400"
                                },
                                {
                                    quote: "I love how easy it is to invite friends and track our progress. The invitation league has really motivated us to evangelize more.",
                                    name: "Sarah Smith",
                                    title: "Small Group Leader",
                                    gradient: "from-red-400 to-red-400"
                                },
                                {
                                    quote: "The platform makes church management so much easier. We can focus on spiritual growth instead of administrative headaches.",
                                    name: "Pastor Michael",
                                    title: "Church Leadership",
                                    gradient: "from-red-400 to-red-400"
                                }
                            ].map((testimonial, index) => (
                                <div key={index} className="backdrop-blur-sm bg-slate-900/85 border border-red-800/70 rounded-2xl p-8 shadow-2xl transition-all duration-300 group hover:bg-slate-900/95 hover:-translate-y-2">
                                    <div className="text-5xl text-slate-300 mb-4 drop-shadow-lg group-hover:scale-110 transition-transform">"</div>
                                    <p className="text-base text-slate-100 mb-6 italic leading-relaxed min-h-[160px]">
                                        {testimonial.quote}
                                    </p>
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full shadow-lg`}></div>
                                        <div className="text-left">
                                            <div className="font-semibold text-slate-100">{testimonial.name}</div>
                                            <div className="text-sm text-slate-300">{testimonial.title}</div>
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
                                            quote: "The church community here is so welcoming and supportive. The attendance tracking system has really helped me stay connected.",
                                            name: "John Doe",
                                            title: "Church Member",
                                            gradient: "from-red-400 to-red-400"
                                        },
                                        {
                                            quote: "I love how easy it is to invite friends and track our progress. The invitation league motivates us to evangelize more.",
                                            name: "Sarah Smith",
                                            title: "Small Group Leader",
                                            gradient: "from-red-400 to-red-400"
                                        },
                                        {
                                            quote: "The platform makes church management so much easier. We can focus on spiritual growth instead of admin work.",
                                            name: "Pastor Michael",
                                            title: "Church Leadership",
                                            gradient: "from-red-400 to-red-400"
                                        }
                                    ].map((testimonial, index) => (
                                        <div key={index} className="flex-shrink-0 w-[85vw] snap-center">
                                            <div className="backdrop-blur-sm bg-slate-900/85 border border-red-800/70 rounded-2xl p-6 shadow-2xl transition-all duration-300 h-full">
                                                <div className="text-5xl text-slate-300 mb-4 drop-shadow-lg">"</div>
                                                <p className="text-base text-slate-100 mb-6 italic leading-relaxed">
                                                    {testimonial.quote}
                                                </p>
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 bg-gradient-to-br ${testimonial.gradient} rounded-full shadow-lg flex-shrink-0`}></div>
                                                    <div className="text-left">
                                                        <div className="font-semibold text-slate-100">{testimonial.name}</div>
                                                        <div className="text-sm text-slate-300">{testimonial.title}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Scroll indicator dots */}
                            <div className="flex justify-center space-x-2 mt-4">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                                <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer
                    id="footer-resources"
                    className={`relative overflow-hidden bg-slate-950 border-t border-red-800/70 transition-all duration-700 ${highlightFooter ? 'ring-2 ring-red-300/80 ring-offset-2 ring-offset-slate-950 shadow-lg shadow-red-950/30' : ''}`}
                >
                    {/* Decorative elements */}
                    <div className="absolute inset-0 bg-slate-900/40"></div>
                    <div className="absolute top-0 left-0 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-800 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        {/* Main Footer Columns */}
                        <div className="py-16 grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                            {/* Column 1: About Church */}
                            <div>
                                <div className="flex items-center space-x-2 mb-6">
                                    <img src={logo} className="h-8" alt="Church Logo" />
                                    <h3 className="text-lg font-bold text-red-400">About APGA</h3>
                                </div>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="#about" className="text-gray-300 hover:text-red-400 transition-colors font-medium">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#mission" className="text-gray-400 hover:text-red-400 transition-colors">Our Mission</a>
                                    </li>
                                    <li>
                                        <a href="#leadership" className="text-gray-400 hover:text-red-400 transition-colors">Leadership</a>
                                    </li>
                                    <li>
                                        <a href="#history" className="text-gray-400 hover:text-red-400 transition-colors">Church History</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 2: Getting Involved */}
                            <div>
                                <h3 className="text-lg font-bold text-red-400 mb-6">Get Involved</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="#events" className="text-gray-300 hover:text-red-400 transition-colors font-medium">Events</a>
                                    </li>
                                    <li>
                                        <a href="#groups" className="text-gray-400 hover:text-red-400 transition-colors">Small Groups</a>
                                    </li>
                                    <li>
                                        <a href="#volunteering" className="text-gray-400 hover:text-red-400 transition-colors">Volunteer</a>
                                    </li>
                                    <li>
                                        <a href="#giving" className="text-gray-400 hover:text-red-400 transition-colors">Giving</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 3: Spiritual Resources */}
                            <div>
                                <h3 className="text-lg font-bold text-red-400 mb-6">Spiritual Growth</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <Link href={route('media')} className="text-gray-300 hover:text-red-400 transition-colors font-medium">Sermons</Link>
                                    </li>
                                    <li>
                                        <Link href={route('ministries')} className="text-gray-400 hover:text-red-400 transition-colors">Ministries</Link>
                                    </li>
                                    <li>
                                        <a href="#prayer" className="text-gray-400 hover:text-red-400 transition-colors">Prayer Requests</a>
                                    </li>
                                    <li>
                                        <a href="#resources" className="text-gray-400 hover:text-red-400 transition-colors">Resources</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 4: Connect */}
                            <div>
                                <h3 className="text-lg font-bold text-red-400 mb-6">Connect</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="#contact" className="text-gray-300 hover:text-red-400 transition-colors font-medium">Contact Us</a>
                                    </li>
                                    <li>
                                        <a href="#location" className="text-gray-400 hover:text-red-400 transition-colors">Location & Hours</a>
                                    </li>
                                    <li>
                                        <a href="#faq" className="text-gray-400 hover:text-red-400 transition-colors">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="#contact-form" className="text-gray-400 hover:text-red-400 transition-colors">Send Message</a>
                                    </li>
                                </ul>
                            </div>

                            {/* Column 5: Follow Us */}
                            <div>
                                <h3 className="text-lg font-bold text-red-400 mb-6">Follow Us</h3>
                                <ul className="space-y-3 text-sm">
                                    <li>
                                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-400 transition-colors font-medium">Facebook</a>
                                    </li>
                                    <li>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">Twitter</a>
                                    </li>
                                    <li>
                                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">Instagram</a>
                                    </li>
                                    <li>
                                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-400 transition-colors">YouTube</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Church Information */}
                        <div className="py-8 border-t border-red-800/70">
                            <div className="bg-slate-900/90 border border-red-800/70 rounded-lg p-6">
                                <div className="flex items-start gap-3 mb-3">
                                    <svg className="w-5 h-5 text-slate-200 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13H17.5V11.5H12.5V7Z"/>
                                    </svg>
                                    <h4 className="font-semibold text-slate-100 text-sm">Welcome to APGA Worldwide</h4>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    APGA Worldwide is a faith-based community dedicated to spiritual growth, fellowship, and service. We believe in the power of community and invite everyone to join us on their spiritual journey. Whether you're new to church or a longtime member, we look forward to welcoming you.
                                </p>
                            </div>
                        </div>

                        {/* Bottom Footer */}
                        <div className="py-8 border-t border-red-800/70 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                            <div className="flex gap-6">
                                <a href="#privacy" className="hover:text-slate-100 transition-colors">Privacy Policy</a>
                                <a href="#terms" className="hover:text-slate-100 transition-colors">Terms of Service</a>
                                <a href="#contact" className="hover:text-slate-100 transition-colors">Contact</a>
                            </div>
                            <p className="text-slate-400">© {new Date().getFullYear()} APGA Worldwide. All Rights Reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
