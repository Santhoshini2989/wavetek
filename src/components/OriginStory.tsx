import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SuccessCard {
    project: string;
    stat: string;
    label: string;
    gradient: string;
}

const SUCCESSES: SuccessCard[] = [
    {
        project: 'Silly Dragon',
        stat: '$160M',
        label: 'Community Catalyst',
        gradient: 'from-orange-400 to-red-500',
    },
    {
        project: 'SolChat',
        stat: '$200M',
        label: 'Strategic Leadership',
        gradient: 'from-cyan-400 to-blue-500',
    },
];

export default function OriginStory() {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    // Scroll animations
    useEffect(() => {
        const ctx = gsap.context(() => {
            // Headline reveal with split effect
            if (headlineRef.current) {
                gsap.fromTo(
                    headlineRef.current,
                    { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
                    {
                        opacity: 1,
                        y: 0,
                        clipPath: 'inset(0% 0 0 0)',
                        duration: 1.2,
                        ease: 'power4.out',
                        scrollTrigger: {
                            trigger: headlineRef.current,
                            start: 'top 85%',
                        },
                    }
                );
            }

            // Timeline line grow
            if (timelineRef.current) {
                gsap.fromTo(
                    timelineRef.current,
                    { scaleY: 0, transformOrigin: 'top' },
                    {
                        scaleY: 1,
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 80%',
                        },
                    }
                );
            }

            // Content fade in
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current.children,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: 'top 75%',
                        },
                    }
                );
            }

            // Cards slide in
            cardsRef.current.forEach((card, i) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        { opacity: 0, x: 80, rotateY: 15 },
                        {
                            opacity: 1,
                            x: 0,
                            rotateY: 0,
                            duration: 1,
                            delay: i * 0.2,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 85%',
                            },
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Pulsing timeline glow
    useEffect(() => {
        if (!timelineRef.current) return;
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(timelineRef.current, {
            boxShadow: '0 0 25px rgba(6, 182, 212, 0.6)',
            duration: 1.5,
            ease: 'sine.inOut',
        });
        return () => { tl.kill(); };
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-32 bg-[#F5F5F7] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[30%] left-[5%] w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-cyan-100/20 rounded-full blur-[100px]" />
            </div>

            {/* Bottom gradient fade into footer */}
            <div
                className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(199, 210, 254, 0.15) 40%, rgba(199, 210, 254, 0.3) 70%, rgba(165, 180, 252, 0.35) 100%)'
                }}
            />

            <div className="max-w-6xl mx-auto px-6">

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

                    {/* Left: The Narrative (3 cols) */}
                    <div className="relative lg:col-span-3">
                        {/* Vertical Accent Line */}
                        <div
                            ref={timelineRef}
                            className="absolute left-0 top-0 w-1 h-full rounded-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-cyan-400"
                            style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)' }}
                        />

                        {/* Content */}
                        <div className="pl-8 md:pl-12">
                            {/* Badge */}
                            <span className="inline-block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
                                The Origin
                            </span>

                            {/* Headline */}
                            <h2
                                ref={headlineRef}
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6"
                            >
                                Built in the Trenches.
                            </h2>

                            {/* Body */}
                            <div ref={contentRef} className="space-y-5 text-slate-600 text-lg leading-relaxed max-w-xl">
                                <p>
                                    From the <span className="font-semibold text-slate-800">Arcium Fellowship</span> to
                                    the front lines of Solana — building since 2020.
                                </p>
                                <p>
                                    Solana Spaces. Glow Studio. The mission has always been the same:
                                </p>
                                <blockquote className="text-2xl font-semibold text-slate-900 border-l-2 border-cyan-400 pl-5 my-6">
                                    Empower the builders.
                                </blockquote>
                                <p className="text-slate-500">
                                    WaveTek represents the culmination of years in encryption, privacy,
                                    and community — a new paradigm for confidential DeFi.
                                </p>
                            </div>

                            {/* Timeline */}
                            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
                                {[
                                    { year: '2020', event: 'Solana Genesis' },
                                    { year: '2022', event: 'Arcium Fellowship' },
                                    { year: '2024', event: 'WaveTek Launch' },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 group">
                                        <div className="w-2 h-2 rounded-full bg-cyan-500 group-hover:scale-150 transition-transform duration-300 shadow-lg shadow-cyan-400/50" />
                                        <span className="text-sm text-slate-400 font-mono">
                                            <span className="text-slate-700 font-semibold">{item.year}</span> — {item.event}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Track Record (2 cols) */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                            Track Record
                        </span>

                        {SUCCESSES.map((card, index) => (
                            <div
                                key={index}
                                ref={(el) => { cardsRef.current[index] = el; }}
                                className="group relative"
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div
                                    className="relative p-8 rounded-2xl transition-all duration-500"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.85)',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(226, 232, 240, 0.8)',
                                        boxShadow: hoveredCard === index
                                            ? '0 25px 60px -15px rgba(0, 0, 0, 0.18)'
                                            : '0 10px 30px -10px rgba(0, 0, 0, 0.08)',
                                        transform: hoveredCard === index ? 'translateY(-6px) scale(1.02)' : 'translateY(0)',
                                    }}
                                >
                                    {/* Gradient Bar */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${card.gradient}`} />

                                    {/* Content */}
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                                                {card.project}
                                            </div>
                                            <div className="text-4xl font-extrabold text-slate-900">
                                                {card.stat}
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                Market Cap
                                            </div>
                                        </div>
                                        <div className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${card.gradient}`}>
                                            {card.label}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
