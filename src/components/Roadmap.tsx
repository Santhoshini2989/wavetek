import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RoadmapPhase {
    id: string;
    status: 'completed' | 'in-progress' | 'future';
    title: string;
    quarter: string;
    items: string[];
    position: 'left' | 'right';
    top: number;
}

const phases: RoadmapPhase[] = [
    {
        id: 'phase1',
        status: 'completed',
        title: 'Foundation',
        quarter: 'Q4 2025',
        items: ['Launched $WAVE & $WEALTH', 'WaveSwap v1 Mainnet', 'Locked +10% Supply'],
        position: 'left',
        top: 100,
    },
    {
        id: 'phase2',
        status: 'in-progress',
        title: 'Acceleration',
        quarter: 'Q1 2026',
        items: ['Integrate Umbra SDK', 'WaveStake Mainnet', 'Privacy Hackathon'],
        position: 'right',
        top: 1200,
    },
    {
        id: 'phase3',
        status: 'future',
        title: 'Expansion',
        quarter: 'Q2 2026',
        items: ['RWA + Gold Staking', 'Solana Mobile dApp Store', 'Warrior PFP Collection'],
        position: 'left',
        top: 2200,
    },
];

function StatusBadge({ status }: { status: RoadmapPhase['status'] }) {
    if (status === 'completed') {
        return (
            <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-lg text-xs tracking-wide">
                COMPLETED
            </span>
        );
    }
    if (status === 'in-progress') {
        return (
            <span className="bg-cyan-100 text-cyan-700 font-bold px-3 py-1 rounded-lg text-xs tracking-wide animate-pulse">
                IN PROGRESS
            </span>
        );
    }
    return (
        <span className="bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-lg text-xs tracking-wide">
            FUTURE
        </span>
    );
}

export default function Roadmap() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            setMousePos({ x, y });
        };

        const section = sectionRef.current;
        if (section) {
            section.addEventListener('mousemove', handleMouseMove);
            return () => section.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    // Scroll animations
    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            // Reveal cards
            cardsRef.current.forEach((card) => {
                if (!card) return;

                gsap.fromTo(
                    card,
                    { opacity: 0, y: 80, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            });
        }, section);

        return () => ctx.revert();
    }, []);

    // Calculate parallax transforms
    const parallaxX = (mousePos.x - 0.5) * 30;
    const parallaxY = (mousePos.y - 0.5) * 20;

    return (
        <section
            ref={sectionRef}
            id="roadmap"
            className="relative w-full py-32 bg-[#F5F5F7] overflow-hidden"
        >
            {/* Parallax Background Elements */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    transform: `translate(${parallaxX * 0.5}px, ${parallaxY * 0.5}px)`,
                    transition: 'transform 0.3s ease-out',
                }}
            >
                <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[100px]" />
                <div className="absolute top-[40%] right-[10%] w-[500px] h-[500px] bg-indigo-200/15 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] left-[20%] w-[350px] h-[350px] bg-purple-200/15 rounded-full blur-[80px]" />
            </div>

            {/* Header */}
            <div
                className="text-center mb-24 relative z-10 px-6"
                style={{
                    transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
                    transition: 'transform 0.3s ease-out',
                }}
            >

                <h2 className="text-5xl md:text-7xl font-extrabold mt-6 text-slate-900">
                    The Quantum Stream
                </h2>
                <p className="text-slate-500 text-xl mt-4 max-w-2xl mx-auto">
                    Tracing the evolution of encrypted finance on Solana.
                </p>
            </div>

            {/* Cards Container */}
            <div className="relative max-w-6xl mx-auto px-6" style={{ minHeight: '2800px' }}>

                {/* Phase Cards */}
                {phases.map((phase, index) => {
                    // Different parallax intensity for each card
                    const intensity = 1 - index * 0.2;
                    const cardParallaxX = parallaxX * intensity;
                    const cardParallaxY = parallaxY * intensity * 0.5;

                    return (
                        <div
                            key={phase.id}
                            ref={(el) => { cardsRef.current[index] = el; }}
                            className={`absolute w-[90%] md:w-[42%] ${phase.position === 'left'
                                ? 'left-[5%] md:left-[5%]'
                                : 'right-[5%] md:right-[5%]'
                                }`}
                            style={{
                                top: phase.top,
                                transform: `translate(${cardParallaxX}px, ${cardParallaxY}px)`,
                                transition: 'transform 0.4s ease-out',
                            }}
                        >
                            {/* 3D Orb Background */}
                            <div
                                className={`absolute rounded-full -z-10 ${phase.status === 'in-progress' ? 'animate-pulse' : ''
                                    }`}
                                style={{
                                    width: phase.status === 'in-progress' ? '300px' : '260px',
                                    height: phase.status === 'in-progress' ? '300px' : '260px',
                                    top: '-50px',
                                    [phase.position === 'left' ? 'right' : 'left']: '-80px',
                                    background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.95), rgba(255,255,255,0.2))`,
                                    boxShadow:
                                        phase.status === 'completed'
                                            ? 'inset -15px -15px 30px rgba(34, 197, 94, 0.15), 0 25px 60px rgba(34, 197, 94, 0.25)'
                                            : phase.status === 'in-progress'
                                                ? 'inset -15px -15px 30px rgba(6, 182, 212, 0.25), 0 30px 80px rgba(6, 182, 212, 0.35)'
                                                : 'inset -15px -15px 30px rgba(99, 102, 241, 0.1), 0 25px 60px rgba(99, 102, 241, 0.15)',
                                    opacity: phase.status === 'future' ? 0.6 : 1,
                                    transform: `translate(${cardParallaxX * -0.5}px, ${cardParallaxY * -0.5}px)`,
                                    transition: 'transform 0.5s ease-out',
                                }}
                            />

                            {/* Glass Card */}
                            <div
                                className={`relative p-8 md:p-10 rounded-[2.5rem] overflow-hidden group transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${phase.status === 'future' ? 'opacity-85 hover:opacity-100' : ''
                                    }`}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.7)',
                                    backdropFilter: 'blur(30px)',
                                    border:
                                        phase.status === 'in-progress'
                                            ? '2px solid rgba(6, 182, 212, 0.4)'
                                            : '1px solid rgba(255, 255, 255, 0.9)',
                                    boxShadow:
                                        phase.status === 'in-progress'
                                            ? '0 25px 70px -15px rgba(6, 182, 212, 0.35), inset 0 0 30px rgba(255, 255, 255, 0.9)'
                                            : '0 25px 50px -10px rgba(67, 56, 202, 0.08), inset 0 0 25px rgba(255, 255, 255, 0.9)',
                                }}
                            >
                                {/* Decorative Icon */}
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-25 transition-opacity duration-500">
                                    <svg
                                        width="90"
                                        height="90"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1"
                                    >
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>

                                {/* Glow Effect for Active Phase */}
                                {phase.status === 'in-progress' && (
                                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-cyan-400/15 rounded-full blur-3xl" />
                                )}

                                {/* Status Badge */}
                                <StatusBadge status={phase.status} />

                                {/* Title */}
                                <h3 className="text-3xl md:text-4xl font-bold mt-5 mb-2 text-slate-900">
                                    {phase.title}
                                </h3>

                                {/* Quarter */}
                                <p
                                    className={`font-mono text-sm mb-6 ${phase.status === 'in-progress'
                                        ? 'text-cyan-600'
                                        : 'text-slate-400'
                                        }`}
                                >
                                    {phase.quarter}
                                </p>

                                {/* Items */}
                                <ul className="space-y-4">
                                    {phase.items.map((item, i) => (
                                        <li
                                            key={i}
                                            className="flex items-center gap-3 text-slate-600 font-medium"
                                        >
                                            <span
                                                className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${phase.status === 'completed'
                                                    ? 'bg-green-500'
                                                    : phase.status === 'in-progress'
                                                        ? i === 0
                                                            ? 'bg-cyan-500 animate-ping'
                                                            : 'bg-cyan-500'
                                                        : 'bg-slate-300'
                                                    }`}
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
