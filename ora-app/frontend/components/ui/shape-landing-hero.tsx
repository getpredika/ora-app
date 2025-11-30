"use client";
import { useRouter } from "next/navigation"
import { motion, cubicBezier } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";


function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
    gradientColorStart,
    gradientColorEnd,
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
    gradientColorStart?: string;
    gradientColorEnd?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: cubicBezier(0.23, 0.86, 0.39, 0.96),
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                style={{ width, height }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]",
                        // fall back to Tailwind classes when no custom gradient provided
                        !gradientColorStart && "bg-gradient-to-r to-transparent",
                        !gradientColorStart && gradient
                    )}
                    style={
                        gradientColorStart
                            ? {
                                backgroundImage: `linear-gradient(90deg, ${gradientColorStart}, ${gradientColorEnd ?? "transparent"})`,
                            }
                            : undefined
                    }
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    bgColor = "var(--app-bg, #030303)",
    accentStart = "var(--app-accent-start, #10b981)",
    accentEnd = "var(--app-accent-end, #3b82f6)",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    bgColor?: string;
    accentStart?: string;
    accentEnd?: string;
}) {
    const router = useRouter();

    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: cubicBezier(0.25, 0.4, 0.25, 1),
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-blue-500/[0.08] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradientColorStart={accentStart}
                    gradientColorEnd={accentEnd}
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradientColorStart={accentStart}
                    gradientColorEnd={accentEnd}
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradientColorStart={accentStart}
                    gradientColorEnd={accentEnd}
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradientColorStart={accentStart}
                    gradientColorEnd={accentEnd}
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradientColorStart={accentStart}
                    gradientColorEnd={accentEnd}
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Header */}
                    <div className="mb-12 text-center">
                        <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 mb-6">
                            <Sparkles className="h-3 w-3 text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-400">{badge}</span>
                        </motion.div>

                        <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
                            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">{title1}</span>
                                <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-white to-blue-400">{title2}</span>
                            </h1>
                        </motion.div>

                        <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
                            <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-8 leading-relaxed font-light max-w-2xl mx-auto">
                                Konvèti tèks an vwa, oswa vwa an tèks, avèk presizyon ak vitès. Senp, epi modèn, nan lang krèyol ayisyen.
                            </p>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div custom={3} variants={fadeUpVariants} initial="hidden" animate="visible" className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button onClick={() => router.push("/tts")} className="px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold transition-all shadow-lg hover:shadow-emerald-500/50">
                                Kòmanse
                            </button>
                            <button
                                className="px-8 py-3 rounded-lg bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold transition-all border border-slate-600/50 backdrop-blur-sm"
                                onClick={() => {
                                    const el = document.getElementById('landing-features');
                                    if (el) {
                                        el.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                            >
                                Aprann Plis
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Footer Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/40 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric }

<HeroGeometric
    badge="ORA EA"
    title1="Bay Vwa AI"
    title2="Kreyòl La Lavi"
    bgColor="#0f172a"
    accentStart="#059669"
    accentEnd="#3b82f6"
/>
