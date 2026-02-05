import { ArrowRight } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative px-4 md:px-8 mt-40 mb-12">
            <div className="max-w-[1400px] mx-auto bg-gradient-to-b from-white to-[#F0F2FF] rounded-[3rem] p-12 md:p-24 relative overflow-hidden shadow-2xl shadow-indigo-100/50 border border-white/60">

                {/* Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
                >
                    <source src="/hero-bg.mp4" type="video/mp4" />
                </video>

                {/* Background Effects (Quantum Porcelain Glow) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),transparent_70%)] pointer-events-none"></div>

                {/* Zero Gravity Floating Objects */}
                {/* Object 1: Large Blur (Top Left) */}
                <div className="absolute top-[-10%] left-[-5%] w-64 h-64 md:w-96 md:h-96 bg-indigo-300/20 rounded-full blur-3xl animate-float opacity-70"></div>

                {/* Object 2: Sharp Circle (Right) */}
                <div className="absolute top-[20%] right-[10%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#06B6D4] to-[#4338CA] opacity-20 blur-xl animate-float" style={{ animationDelay: '2s' }}></div>

                {/* Object 3: Small Orb (Bottom Left) */}
                <div className="absolute bottom-[20%] left-[20%] w-16 h-16 bg-cyan-200 rounded-full blur-lg animate-float opacity-60" style={{ animationDelay: '1s' }}></div>

                {/* Content Container (Center Stage) */}
                <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

                    <div className="space-y-4">
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold tracking-wide uppercase">
                            Welcome to Solana's Encrypted Liquidity Layer
                        </span>

                        <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tight leading-[1] drop-shadow-sm">
                            Your Private <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4338CA] to-[#06B6D4]">
                                DeFi Companion.
                            </span>
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-light leading-relaxed">
                        Trade Waves of Abundance. Private Swaps, Quantum-Secure Bridging, and Confidential Staking.
                    </p>

                    <div className="pt-4">
                        <button className="group relative px-8 py-4 bg-[#0F172A] text-white rounded-full text-lg font-semibold shadow-xl shadow-slate-900/20 hover:scale-105 hover:shadow-slate-900/30 transition-all duration-300 flex items-center gap-3">
                            Launch App
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
