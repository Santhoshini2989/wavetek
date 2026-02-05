import { useState, useEffect } from 'react';
import { Menu, X, Search, Waves } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-6 left-0 w-full z-50 transition-all duration-500 px-4 md:px-8 ${scrolled ? 'top-4' : 'top-6'
                }`}
        >
            <div
                className={`mx-auto rounded-full transition-all duration-500 flex items-center justify-between
                ${scrolled
                        ? 'max-w-4xl bg-white/80 backdrop-blur-xl border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] py-3 px-6'
                        : 'w-full max-w-7xl bg-transparent border-2 border-transparent shadow-none py-4 px-0'
                    }`}
            >

                {/* Left: Brand */}
                <div className="flex items-center gap-2 transition-all duration-500">
                    <div className="p-2 bg-indigo-600 rounded-xl text-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                        <Waves size={20} strokeWidth={2.5} />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">
                        WaveTek
                    </span>
                </div>

                {/* Center: Glass Nav Items */}
                <div className={`hidden md:flex items-center gap-1 transition-all duration-500 rounded-full
                    ${scrolled
                        ? 'p-0'
                        : 'bg-white/50 backdrop-blur-md border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] p-1.5'
                    }`}>
                    {['Features', 'Staking', 'Roadmap'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="relative px-5 py-2 rounded-full text-sm font-bold text-slate-700 hover:text-slate-900 transition-all duration-300 group overflow-hidden border border-transparent hover:border-slate-900 hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:bg-white"
                        >
                            <span className="relative z-10">{item}</span>
                        </a>
                    ))}
                </div>

                {/* Right: CTA & Search */}
                <div className="hidden md:flex items-center gap-4 transition-all duration-500">
                    <button className="p-2.5 rounded-full text-slate-900 border-2 border-transparent hover:border-slate-900 hover:bg-white hover:shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-all duration-200">
                        <Search size={20} strokeWidth={2.5} />
                    </button>

                    <button className="px-6 py-2.5 rounded-full bg-[#4338CA] text-white text-sm font-bold border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] active:translate-x-[0px] active:translate-y-[0px] active:shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all duration-200">
                        Launch App
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-slate-900 focus:outline-none p-2 rounded-full hover:bg-white/50"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="absolute top-24 left-4 right-4 bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 md:hidden flex flex-col space-y-4 shadow-2xl border border-white/50 animate-in fade-in slide-in-from-top-4 duration-300">
                    {['Features', 'Staking', 'Roadmap'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-lg font-medium text-slate-700 hover:text-indigo-600 py-2 px-4 rounded-xl hover:bg-slate-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <div className="pt-4 flex flex-col gap-3">
                        <button className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-center shadow-lg">
                            Launch App
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
