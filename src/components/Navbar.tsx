import React from 'react';
import { Menu, X, Search, Waves } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 h-20 transition-all duration-300 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

                {/* Left: Brand */}
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 rounded-lg text-[#4338CA]">
                        <Waves size={24} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        WaveTek
                    </span>
                </div>

                {/* Center: The Menu Pill (Phantom Style) */}
                <div className="hidden md:flex items-center bg-white rounded-full px-8 py-3 shadow-sm border border-slate-100">
                    <div className="flex items-center space-x-8">
                        {['Features', 'Staking', 'Roadmap'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Right: CTA & Search */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="p-3 bg-white rounded-full text-slate-600 hover:text-slate-900 shadow-sm border border-slate-100 transition-all duration-200 hover:scale-105">
                        <Search size={20} strokeWidth={2.5} />
                    </button>

                    <button className="px-6 py-3 rounded-full bg-[#4338CA] text-white text-sm font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
                        Launch App
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-slate-900 focus:outline-none p-2 bg-white rounded-full shadow-sm"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-24 left-4 right-4 bg-white rounded-3xl p-6 md:hidden flex flex-col space-y-4 shadow-xl border border-slate-100 animate-in fade-in slide-in-from-top-4 duration-200">
                    {['Features', 'Staking', 'Roadmap'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-lg font-medium text-slate-700 hover:text-[#4338CA] py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <div className="pt-4 flex flex-col gap-3">
                        <button className="w-full py-3 rounded-full bg-[#4338CA] text-white font-bold text-center">
                            Launch App
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
