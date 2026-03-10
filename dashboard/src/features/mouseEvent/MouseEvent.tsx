import { useState } from "react";

export default function HeroSection() {
    const [position, setPosition] = useState<{
        x: number;
        y: number;
    }>({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden"
        >
            {/* Glow Effect */}
            <div
                className="pointer-events-none absolute inset-0 transition duration-200"
                style={{
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(0,200,255,0.25), transparent 40%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-10 text-center max-w-3xl">
                <h1 className="text-6xl font-bold">
                    Transform Your Ideas Into
                    <span className="text-cyan-400"> Digital Reality</span>
                </h1>

                <p className="mt-6 text-gray-400">
                    Cutting-edge software development services from web and mobile
                    applications to AI powered solutions.
                </p>

                <div className="flex gap-4 justify-center mt-8">
                    <button className="px-6 py-3 bg-cyan-500 rounded-lg">
                        Get Started
                    </button>

                    <button className="px-6 py-3 border border-cyan-500 rounded-lg">
                        Our Services
                    </button>
                </div>
            </div>
        </section>
    );
}