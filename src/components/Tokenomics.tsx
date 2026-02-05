import { useRef, useState, useEffect } from 'react';
import { Waves, Gem } from 'lucide-react';

export default function Tokenomics() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mouseX, setMouseX] = useState(0.5); // 0 = left, 1 = right, 0.5 = center

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            setMouseX(Math.max(0, Math.min(1, x)));
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', handleMouseMove);
            return () => container.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    // Calculate scales based on mouse position
    // Left side (WAVE): scales up when mouseX < 0.5
    // Right side (WEALTH): scales up when mouseX > 0.5
    const waveActive = mouseX < 0.4;
    const wealthActive = mouseX > 0.6;
    const neutral = !waveActive && !wealthActive;

    const waveScale = waveActive ? 1.15 : wealthActive ? 0.85 : 1;
    const wealthScale = wealthActive ? 1.15 : waveActive ? 0.85 : 1;
    const waveBlur = wealthActive ? 'blur-sm' : '';
    const wealthBlur = waveActive ? 'blur-sm' : '';
    const waveZ = waveActive ? 'z-20' : 'z-10';
    const wealthZ = wealthActive ? 'z-20' : 'z-10';

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-[#F5F5F7] overflow-hidden"
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
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 min-h-screen flex flex-col justify-center">

                {/* Section Header */}
                <div className="text-center mb-16">

                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                        Two Tokens.{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-yellow-500">
                            One Ecosystem.
                        </span>
                    </h2>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        A simple, aligned system for participation and rewards.
                    </p>
                </div>

                {/* Main Split Layout */}
                <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

                    {/* LEFT COLUMN: $WAVE Info */}
                    <div
                        className="text-center lg:text-left transition-all duration-500"
                        style={{
                            opacity: wealthActive ? 0.4 : 1,
                            transform: waveActive ? 'translateX(-10px)' : 'translateX(0)',
                        }}
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
                    <div className="relative h-[400px] flex items-center justify-center">

                        {/* WAVE Coin (Silver/Blue) */}
                        <div
                            className={`absolute transition-all duration-500 ease-out ${waveZ} ${waveBlur}`}
                            style={{
                                transform: `translateX(-40px) scale(${waveScale})`,
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

                        {/* WEALTH Coin (Gold) */}
                        <div
                            className={`absolute transition-all duration-500 ease-out ${wealthZ} ${wealthBlur}`}
                            style={{
                                transform: `translateX(40px) scale(${wealthScale})`,
                                animationDelay: '1s',
                            }}
                        >
                            <div
                                className="w-48 h-48 md:w-64 md:h-64 rounded-full animate-float"
                                style={{
                                    background: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 30%, #d97706 60%, #fbbf24 100%)',
                                    boxShadow: '0 20px 60px rgba(234, 179, 8, 0.4), inset 0 2px 20px rgba(255,255,255,0.6)',
                                    animationDelay: '1s',
                                }}
                            >
                                <div className="w-full h-full rounded-full flex items-center justify-center">
                                    <Gem className="w-20 h-20 md:w-28 md:h-28 text-indigo-600 drop-shadow-lg" />
                                </div>
                            </div>
                        </div>

                        {/* Glow Effects */}
                        <div
                            className="absolute w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl transition-opacity duration-500"
                            style={{
                                left: '10%',
                                opacity: waveActive ? 0.8 : 0.3,
                            }}
                        />
                        <div
                            className="absolute w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl transition-opacity duration-500"
                            style={{
                                right: '10%',
                                opacity: wealthActive ? 0.8 : 0.3,
                            }}
                        />
                    </div>

                    {/* RIGHT COLUMN: $WEALTH Info */}
                    <div
                        className="text-center lg:text-right transition-all duration-500"
                        style={{
                            opacity: waveActive ? 0.4 : 1,
                            transform: wealthActive ? 'translateX(10px)' : 'translateX(0)',
                        }}
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

                {/* Bottom Caption */}
                <div className="text-center mt-16">
                    <p className="text-sm text-slate-400">
                        Move your mouse left or right to explore each token
                    </p>
                </div>
            </div>
        </section>
    );
}
