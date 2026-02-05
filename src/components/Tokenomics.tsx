import { useRef, useLayoutEffect } from 'react';
import { Waves, Gem } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Tokenomics() {
    const containerRef = useRef<HTMLDivElement>(null);
    const waveColRef = useRef<HTMLDivElement>(null);
    const wealthColRef = useRef<HTMLDivElement>(null);
    const waveCoinRef = useRef<HTMLDivElement>(null);
    const wealthCoinRef = useRef<HTMLDivElement>(null);
    const waveGlowRef = useRef<HTMLDivElement>(null);
    const wealthGlowRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: '+=3500', // Increased scroll distance for longer transition
                    pin: true,
                    scrub: 1,
                    // markers: true, // Uncomment for debugging
                }
            });

            // Initial State: WAVE Active, WEALTH Inactive
            // We set this immediately or let CSS handle it, but GSAP ensures consistency

            // Animation: Transition focus from WAVE to WEALTH
            tl
                // 1. Dim WAVE Column
                .to(waveColRef.current, {
                    opacity: 0.3,
                    x: -20,
                    duration: 1,
                    ease: 'power1.inOut',
                }, 0)
                // 2. Highlight WEALTH Column
                .to(wealthColRef.current, {
                    opacity: 1,
                    x: -10, // Slight movement for dynamic feel
                    duration: 1,
                    ease: 'power1.inOut',
                }, 0)

                // 3. Swap Coin Focus
                // Shrink/Blur WAVE Coin
                .to(waveCoinRef.current, {
                    scale: 0.85,
                    filter: 'blur(4px)',
                    zIndex: 10,
                    x: -60, // Move slightly further away
                    duration: 1,
                    ease: 'power1.inOut',
                }, 0)
                // Grow/Sharpen WEALTH Coin
                .to(wealthCoinRef.current, {
                    scale: 1.15,
                    filter: 'blur(0px)',
                    zIndex: 20,
                    x: 20, // Move to center prominence
                    duration: 1,
                    ease: 'power1.inOut',
                }, 0)

                // 4. Shift Glows
                .to(waveGlowRef.current, { opacity: 0.2, duration: 1 }, 0)
                .to(wealthGlowRef.current, { opacity: 0.8, duration: 1 }, 0);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-screen bg-[#F5F5F7] overflow-hidden flex items-center"
            id="tokenomics"
        >
            {/* Split Background Gradients */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Left: Cyan/Silver glow */}
                <div
                    className="absolute top-0 left-0 w-1/2 h-full"
                    style={{
                        background: 'radial-gradient(ellipse at 30% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)',
                    }}
                />
                {/* Right: Gold/Indigo glow */}
                <div
                    className="absolute top-0 right-0 w-1/2 h-full"
                    style={{
                        background: 'radial-gradient(ellipse at 70% 50%, rgba(234, 179, 8, 0.15) 0%, transparent 60%)',
                    }}
                />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                        Two Tokens.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-yellow-500">
                            One Ecosystem.
                        </span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Scroll to explore the duality of WaveTek.
                    </p>
                </div>

                {/* Main Split Layout */}
                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                    {/* LEFT COLUMN: $WAVE Info */}
                    <div
                        ref={waveColRef}
                        className="text-center lg:text-left"
                        // Start fully visible
                        style={{ opacity: 1, transform: 'translateX(0)' }}
                    >
                        <h3 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                            $WAVE
                        </h3>
                        <p className="text-xl font-semibold text-slate-700 mb-4">
                            Utility & Participation
                        </p>
                        <ul className="space-y-3 text-slate-500 mb-6">
                            <li className="flex items-center gap-2 justify-center lg:justify-start">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                                The entry point into WaveTek
                            </li>
                            <li className="flex items-center gap-2 justify-center lg:justify-start">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                                Powers private swaps
                            </li>
                            <li className="flex items-center gap-2 justify-center lg:justify-start">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                                Protocol access & staking
                            </li>
                        </ul>
                        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 text-slate-800 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white/50">
                            Buy WAVE
                        </button>
                    </div>

                    {/* CENTER: 3D Coins */}
                    <div className="relative h-[400px] flex items-center justify-center perspective-1000">

                        {/* WAVE Coin (Silver/Blue) - Starts Highlighted */}
                        <div
                            ref={waveCoinRef}
                            className="absolute z-20"
                            style={{
                                transform: 'translateX(-40px) scale(1.15)',
                                filter: 'blur(0px)',
                            }}
                        >
                            <div
                                className="w-48 h-48 md:w-64 md:h-64 rounded-full animate-float"
                                style={{
                                    background: 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 30%, #64748b 60%, #cbd5e1 100%)',
                                    boxShadow: '0 20px 60px rgba(6, 182, 212, 0.3), inset 0 2px 20px rgba(255,255,255,0.5)',
                                }}
                            >
                                <div className="w-full h-full rounded-full flex items-center justify-center">
                                    <Waves className="w-20 h-20 md:w-28 md:h-28 text-cyan-500 drop-shadow-lg" />
                                </div>
                            </div>
                        </div>

                        {/* WEALTH Coin (Gold) - Starts Dimmed */}
                        <div
                            ref={wealthCoinRef}
                            className="absolute z-10"
                            style={{
                                transform: 'translateX(40px) scale(0.85)',
                                filter: 'blur(4px)',
                            }}
                        >
                            <div
                                className="w-48 h-48 md:w-64 md:h-64 rounded-full animate-float-delayed"
                                style={{
                                    background: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 30%, #d97706 60%, #fbbf24 100%)',
                                    boxShadow: '0 20px 60px rgba(234, 179, 8, 0.4), inset 0 2px 20px rgba(255,255,255,0.6)',
                                }}
                            >
                                <div className="w-full h-full rounded-full flex items-center justify-center">
                                    <Gem className="w-20 h-20 md:w-28 md:h-28 text-indigo-600 drop-shadow-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Glow Effects */}
                        <div
                            ref={waveGlowRef}
                            className="absolute w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl"
                            style={{
                                left: '10%',
                                opacity: 0.8,
                            }}
                        />
                        <div
                            ref={wealthGlowRef}
                            className="absolute w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"
                            style={{
                                right: '10%',
                                opacity: 0.2, // Starts low
                            }}
                        />
                    </div>

                    {/* RIGHT COLUMN: $WEALTH Info */}
                    <div
                        ref={wealthColRef}
                        className="text-center lg:text-right"
                        // Starts dimmed
                        style={{ opacity: 0.3, transform: 'translateX(20px)' }}
                    >
                        <h3 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500 mb-4">
                            $WEALTH
                        </h3>
                        <p className="text-xl font-semibold text-slate-700 mb-4">
                            Rewards & Access
                        </p>
                        <ul className="space-y-3 text-slate-500 mb-6">
                            <li className="flex items-center gap-2 justify-center lg:justify-end">
                                Unlocked by staking WAVE
                                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                            </li>
                            <li className="flex items-center gap-2 justify-center lg:justify-end">
                                Revshare tiers & drops
                                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                            </li>
                            <li className="flex items-center gap-2 justify-center lg:justify-end">
                                Future access & perks
                                <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                            </li>
                        </ul>
                        <button className="px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-yellow-300/50">
                            Buy WEALTH
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
