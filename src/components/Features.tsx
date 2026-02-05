import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Custom Premium SVG Icons with Animations
const SwapIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <style>{`
            @keyframes swapUp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
            @keyframes swapDown { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(3px); } }
            .swap-arrow-up { animation: swapUp 2s ease-in-out infinite; }
            .swap-arrow-down { animation: swapDown 2s ease-in-out infinite; }
        `}</style>
        <path className="swap-arrow-up" d="M7 16V4m0 0L3 8m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path className="swap-arrow-down" d="M17 8v12m0 0l4-4m-4 4l-4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PortalIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <style>{`
            @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .portal-spin { transform-origin: center; animation: spinSlow 12s linear infinite; }
            .portal-pulse { animation: pulse 3s ease-in-out infinite; }
        `}</style>
        <circle cx="12" cy="12" r="9" strokeLinecap="round" className="portal-pulse" />
        <circle cx="12" cy="12" r="5" strokeLinecap="round" strokeDasharray="2 3" className="portal-spin" />
        <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
    </svg>
);

const StakeIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <style>{`
            @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
            .stake-float { animation: float 3s ease-in-out infinite; }
        `}</style>
        <g className="stake-float">
            <path d="M12 2L4 7v6c0 5.5 3.5 10 8 11 4.5-1 8-5.5 8-11V7l-8-5z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8v8m-3-4l3 4 3-4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </g>
    </svg>
);

const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
        <style>{`
            @keyframes shieldPulse { 0%, 100% { opacity: 0.5; stroke-width: 1.5; } 50% { opacity: 1; stroke-width: 2; } }
            .shield-glow { animation: shieldPulse 3s ease-in-out infinite; }
        `}</style>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
        <path className="shield-glow" d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

interface FeatureCard {
    id: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    videoUrl: string;
    bgGradient: string;
    iconBg: string;
    iconColor: string;
}

const features: FeatureCard[] = [
    {
        id: 'waveswap',
        icon: <SwapIcon />,
        title: 'WaveSwap',
        description: 'Private swaps using Encifher, confidentially routed through Jupiter. Zero surveillance.',
        videoUrl: '/card1.mp4',
        bgGradient: 'from-blue-50 to-white',
        iconBg: 'bg-transparent',
        iconColor: 'text-indigo-600',
    },
    {
        id: 'waveportal',
        icon: <PortalIcon />,
        title: 'WavePortal',
        description: 'Bridge assets to Zcash & Starknet for shielding. Quantum-ready infrastructure.',
        videoUrl: '/card2.mp4',
        bgGradient: 'from-cyan-50 to-white',
        iconBg: 'bg-transparent',
        iconColor: 'text-cyan-600',
    },
    {
        id: 'wavestake',
        icon: <StakeIcon />,
        title: 'WaveStake',
        description: 'Confidential staking for aligned participation. Stake $WAVE, earn $WEALTH rewards.',
        videoUrl: '/card3.mp4',
        bgGradient: 'from-yellow-50 to-white',
        iconBg: 'bg-transparent',
        iconColor: 'text-amber-600',
    },
    {
        id: 'waveshield',
        icon: <ShieldIcon />,
        title: 'WaveShield',
        description: 'Active protection against malicious transactions and on-chain trackers.',
        videoUrl: '/card4.mp4',
        bgGradient: 'from-slate-50 to-white',
        iconBg: 'bg-transparent',
        iconColor: 'text-slate-600',
    },
];

export default function Features() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textSectionRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const cardsWrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const container = containerRef.current;
        const textSection = textSectionRef.current;
        const headline = headlineRef.current;
        const cardsWrapper = cardsWrapperRef.current;
        const track = trackRef.current;

        if (!container || !textSection || !headline || !cardsWrapper || !track) return;

        const ctx = gsap.context(() => {

            // PHASE 1: Text Animation
            // Text starts at TOP (close to hero), moves to CENTER, then to BOTTOM
            // Pin the text section while this happens

            const textTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: textSection,
                    start: 'top top',
                    end: '+=3500', // Increased to keep scrolling longer
                    pin: true,
                    scrub: 1,
                }
            });

            // Animate headline from top → center → bottom
            textTimeline
                .fromTo(headline,
                    {
                        y: -150,    // Start near top (close to hero)
                        opacity: 0.3,
                        scale: 0.95,
                    },
                    {
                        y: 0,       // Move to center
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: 'power2.out',
                    }
                )
                .to(headline, {
                    y: 200,         // Then move to bottom
                    opacity: 0,
                    scale: 0.9,
                    duration: 0.5,
                    ease: 'power2.in',
                });

            // PHASE 2: Cards horizontal scroll with pinning
            // Calculate how far to scroll horizontally
            const getScrollAmount = () => {
                const trackWidth = track.scrollWidth;
                const cardWidth = 500; // Check current width class w-[400px] md:w-[500px]
                const centerOffset = (window.innerWidth - cardWidth) / 2;
                // Scroll until last card is centered: Move track left by (trackWidth - window.innerWidth) + centerOffset
                return -(trackWidth - window.innerWidth + centerOffset);
            };

            // Scroll distance = "Scroll Time"
            const scrollDistance = () => {
                const trackWidth = track.scrollWidth;
                // Much longer scroll distance for slower, smoother feeling
                return (trackWidth - window.innerWidth) + 3000;
            };

            const cardsTween = gsap.to(track, {
                x: getScrollAmount,
                ease: 'none',
            });

            ScrollTrigger.create({
                trigger: cardsWrapper,
                start: 'top top',
                end: () => `+=${scrollDistance()}`,
                pin: true,
                animation: cardsTween,
                scrub: 1.5, // Smoother scrubbing
                invalidateOnRefresh: true,
            });

        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef}>
            {/* TEXT SECTION - Pinned while text animates top → center → bottom */}
            <section
                ref={textSectionRef}
                className="relative w-full h-screen bg-[#F5F5F7] flex items-center justify-center overflow-hidden"
            >
                {/* Ambient Background */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-indigo-200/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-cyan-200/20 rounded-full blur-[80px]" />
                </div>

                {/* Animated Headline */}
                <div
                    ref={headlineRef}
                    className="relative z-10 text-center px-6 max-w-4xl mx-auto"
                >

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-4">
                        What WaveTek
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4338CA] to-[#06B6D4]">
                            Enables
                        </span>
                    </h2>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto">
                        Native privacy primitives for the next generation of DeFi.
                    </p>
                </div>
            </section>

            {/* CARDS SECTION - Horizontal scroll with pinning */}
            <section
                ref={cardsWrapperRef}
                id="features"
                className="relative w-full bg-[#F5F5F7]"
            >
                {/* Sticky Container */}
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">

                    {/* Small Header */}
                    <div className="absolute top-6 left-0 w-full text-center z-10 px-4">
                        <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">

                        </span>
                    </div>

                    {/* Horizontal Track */}
                    <div
                        ref={trackRef}
                        className="flex gap-12 items-center w-max"
                        style={{ paddingLeft: '100vw' }}
                    >
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="w-[400px] md:w-[500px] h-[600px] rounded-[3rem] relative overflow-hidden flex-shrink-0 group"
                                style={{
                                    background: 'rgba(255, 255, 255, 0.8)',
                                    backdropFilter: 'blur(30px)',
                                    border: '1px solid rgba(255, 255, 255, 0.6)',
                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.05)',
                                }}
                            >
                                {/* Background with Video */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} z-0`}>
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    >
                                        <source src={feature.videoUrl} type="video/mp4" />
                                    </video>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-10 z-10 bg-gradient-to-t from-white via-white/90 to-transparent pt-20">
                                    <div className={`mb-4 ${feature.iconColor}`}>
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
