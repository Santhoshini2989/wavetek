import { Twitter, Send, MessageCircle } from 'lucide-react';
import WaveCanvas from './WaveCanvas';

const SOCIAL_LINKS = [
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/wavetek' },
    { name: 'Telegram', icon: Send, url: 'https://t.me/wavetek' },
    { name: 'Discord', icon: MessageCircle, url: 'https://discord.gg/wavetek' },
];

const FOOTER_LINKS = {
    Product: ['WaveSwap', 'WavePortal', 'WaveStake', 'WaveShield'],
    Resources: ['Documentation', 'Whitepaper', 'Brand Kit', 'GitHub'],
    Community: ['Blog', 'Governance', 'Grants', 'Ambassador'],
};

// Wave Logo SVG
const WaveLogo = () => (
    <svg viewBox="0 0 40 40" className="w-12 h-12" fill="none">
        <defs>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
        </defs>
        <rect width="40" height="40" rx="12" fill="url(#waveGrad)" />
        <path
            d="M10 22c3-4 6-4 9 0s6 4 9 0s6-4 9 0"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
        />
        <path
            d="M10 18c3-4 6-4 9 0s6 4 9 0"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
        />
    </svg>
);

export default function Footer() {
    return (
        <footer className="relative w-full bg-gradient-to-b from-indigo-100/40 via-indigo-200/50 to-indigo-300/40 pt-8 pb-8 px-4 md:px-8">

            {/* Top gradient fade from origin story */}
            <div
                className="absolute top-0 left-0 right-0 h-20 pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, rgba(165, 180, 252, 0.35) 0%, transparent 100%)'
                }}
            />

            {/* Main Card Container */}
            <div className="relative max-w-6xl mx-auto rounded-[2.5rem] bg-white/95 backdrop-blur-xl shadow-2xl shadow-indigo-300/30 overflow-hidden border border-white/50">

                {/* Wave Animation Background */}
                <div className="absolute inset-0 pointer-events-none opacity-60">
                    <WaveCanvas />
                </div>

                {/* Card Content */}
                <div className="relative z-10 px-8 md:px-16 py-16">

                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-12">
                        <WaveLogo />
                        <span className="text-2xl font-bold text-slate-900">WaveTek</span>
                    </div>

                    {/* CTA Section */}
                    <div className="mb-16 p-8 rounded-2xl bg-slate-50/80 border border-slate-100">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3">
                            Enter your email
                        </h2>
                        <p className="text-slate-500 mb-6 max-w-md">
                            Sign up for our newsletter and join the growing WaveTek community.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-lg">
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="flex-1 px-5 py-3 rounded-full bg-white border border-slate-200 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition-all"
                            />
                            <button className="px-8 py-3 rounded-full bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-all duration-300">
                                Sign up
                            </button>
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                        {/* Link Columns */}
                        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="text-sm font-medium text-slate-400 mb-4">
                                    {category}
                                </h4>
                                <ul className="space-y-3">
                                    {links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm text-slate-700 hover:text-cyan-600 transition-colors"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Socials */}
                        <div>
                            <h4 className="text-sm font-medium text-slate-400 mb-4">
                                Socials
                            </h4>
                            <ul className="space-y-3">
                                {SOCIAL_LINKS.map((social) => (
                                    <li key={social.name}>
                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-slate-700 hover:text-cyan-600 transition-colors"
                                        >
                                            <social.icon className="w-4 h-4" />
                                            {social.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm text-slate-600">Operational</span>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Outside Card */}
            <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center gap-4 px-4">
                <p className="text-sm text-slate-600">
                    © 2026 WaveTek
                </p>
                <div className="flex gap-6">
                    <a href="#" className="text-sm text-slate-600 hover:text-slate-800 transition-colors">
                        Terms
                    </a>
                    <a href="#" className="text-sm text-slate-600 hover:text-slate-800 transition-colors">
                        Privacy
                    </a>
                </div>
            </div>
        </footer>
    );
}
