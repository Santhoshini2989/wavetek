import { useRef, useState } from 'react';

interface Partner {
    name: string;
    logo: string;
    url: string;
}

// Partner data - easily swap image paths here
const PARTNERS: Partner[] = [
    {
        name: 'Noah.ai',
        logo: '/noah.png',
        url: 'https://noah.ai',
    },
    {
        name: 'Solana Spaces',
        logo: '/solana.png',
        url: 'https://solanaspaces.com',
    },
    {
        name: 'Zokyo',
        logo: '/zokyo.png',
        url: 'https://zokyo.io',
    },
    {
        name: 'SuperteamVN',
        logo: '/superteam.png',
        url: 'https://superteam.fun',
    },
];

export default function Partners() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!gridRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section className="relative w-full py-32 bg-[#F5F5F7] overflow-hidden">
            {/* Background Ambient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-[10%] w-[400px] h-[400px] bg-cyan-200/15 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 right-[10%] w-[350px] h-[350px] bg-indigo-200/10 rounded-full blur-[80px]" />
            </div>

            {/* Header */}
            <div className="text-center mb-16 relative z-10 px-6">

                <h2 className="text-4xl md:text-6xl font-extrabold mt-6 text-slate-900">
                    Supported by{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-500">
                        Legends
                    </span>
                </h2>
                <p className="text-slate-500 text-lg mt-4 max-w-xl mx-auto">
                    Building the future of encrypted finance with industry leaders.
                </p>
            </div>

            {/* Grid Container */}
            <div
                ref={gridRef}
                className="relative max-w-4xl mx-auto px-6"
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredCard(null)}
            >
                {/* Spotlight Glow - follows cursor */}
                <div
                    className="absolute pointer-events-none z-0 transition-opacity duration-300"
                    style={{
                        left: mousePosition.x - 200,
                        top: mousePosition.y - 200,
                        width: 400,
                        height: 400,
                        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
                        opacity: hoveredCard !== null ? 1 : 0,
                    }}
                />

                {/* 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                    {PARTNERS.map((partner, index) => (
                        <a
                            key={partner.name}
                            href={partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative block"
                            onMouseEnter={() => setHoveredCard(index)}
                        >
                            {/* Card */}
                            <div
                                className="relative p-10 md:p-14 rounded-3xl transition-all duration-500 overflow-hidden"
                                style={{
                                    background: hoveredCard === index
                                        ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
                                        : 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
                                    backdropFilter: 'blur(20px)',
                                    border: hoveredCard === index
                                        ? '1px solid rgba(6, 182, 212, 0.5)'
                                        : '1px solid rgba(71, 85, 105, 0.5)',
                                    boxShadow: hoveredCard === index
                                        ? '0 25px 50px -10px rgba(6, 182, 212, 0.3), inset 0 0 30px rgba(6, 182, 212, 0.1)'
                                        : '0 15px 40px -10px rgba(0, 0, 0, 0.3)',
                                }}
                            >
                                {/* Hover Border Glow */}
                                <div
                                    className="absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none"
                                    style={{
                                        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.5) 0%, transparent 60%)`,
                                        opacity: hoveredCard === index ? 1 : 0,
                                    }}
                                />

                                {/* Animated border glow */}
                                <div
                                    className={`absolute inset-0 rounded-3xl transition-all duration-500 pointer-events-none ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, transparent 50%, rgba(99, 102, 241, 0.2) 100%)',
                                    }}
                                />

                                {/* Logo Container */}
                                <div className="relative flex items-center justify-center h-32">
                                    <img
                                        src={partner.logo}
                                        alt={partner.name}
                                        className={`max-h-20 max-w-[200px] object-contain transition-all duration-500 ${hoveredCard === index
                                            ? 'scale-110'
                                            : 'scale-100'
                                            }`}
                                    />
                                </div>

                                {/* Partner Name (visible on hover) */}
                                <div
                                    className={`text-center mt-4 transition-all duration-500 ${hoveredCard === index
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-2'
                                        }`}
                                >
                                    <span className="text-sm font-semibold text-cyan-300">
                                        {partner.name}
                                    </span>
                                </div>

                                {/* Corner Accent */}
                                <div
                                    className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ${hoveredCard === index
                                        ? 'bg-cyan-400/30 scale-100'
                                        : 'bg-slate-600/30 scale-75'
                                        }`}
                                >
                                    <svg
                                        className="w-4 h-4 text-cyan-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
