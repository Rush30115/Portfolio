"use client";

import Image from "next/image";
import { getAssetPath } from "@/lib/assets";
import { useLanguage } from "@/providers/language-provider";
import { BlurReveal } from "@/components/effects/blur-reveal";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import type { StackItem } from "@/types/stack";

export default function Stack() {
    const { content, dict } = useLanguage();

    const categories = [
        {
            title: dict.embeddedStack || "Embedded & Hardware",
            items: content.stack?.embedded || [],
        },
        {
            title: dict.protocolsStack || "Protocols & Communication",
            items: content.stack?.protocols || [],
        },
        {
            title: dict.languagesStack || "Programming Languages",
            items: content.stack?.languages || [],
        },
        {
            title: dict.toolsStack || "Tools, Platforms & Cloud",
            items: content.stack?.tools || [],
        },
        {
            title: dict.labStack || "Lab, Testing & Methodologies",
            items: content.stack?.lab || [],
        },
    ].filter(cat => cat.items.length > 0);

    return (
        <section className="w-full bg-background text-foreground overflow-hidden relative py-16 md:py-24 lg:py-32 xl:py-40 2xl:py-36">

            <div className="h-full flex flex-col px-container container mx-auto">
                <div className="flex flex-col gap-4 mb-16">
                    <BlurReveal>
                        <span className="title-counter">[002]</span>
                    </BlurReveal>

                    <BlurReveal>
                        <h2 className="title">{dict.title.stack}</h2>
                    </BlurReveal>
                </div>

                <div className="flex flex-col gap-container mb-6">
                    {categories.map((category, catIndex) => (
                        <BlurReveal key={category.title}>
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="text-xs font-mono tracking-widest text-muted-foreground/50">
                                        0{catIndex + 1}
                                    </span>
                                    <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground">
                                        {category.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-6 sm:gap-8 flex-wrap mb-6">
                                    {category.items.map((item: StackItem) => (
                                        <HoverCard key={item.name} openDelay={50} closeDelay={50}>
                                            <HoverCardTrigger asChild>
                                                <div className="group flex items-center gap-3.5 py-2.5 px-1.5 shrink-0 cursor-pointer">
                                                    <div className="w-6 h-6 shrink-0 flex items-center justify-center transition-all duration-300 ease-out opacity-70 dark:opacity-85 grayscale contrast-125 dark:brightness-125 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125 group-hover:brightness-100 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]">
                                                        <Image src={getAssetPath(item.icon)} alt={item.name} width={24} height={24} className="w-full h-full object-contain" unoptimized={item.icon.endsWith('.svg')} />
                                                    </div>
                                                    <span className="text-base font-medium tracking-wide text-muted-foreground transition-colors duration-300 ease-out group-hover:text-foreground">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </HoverCardTrigger>
                                            <HoverCardContent
                                                side="top"
                                                align="center"
                                                className="w-auto p-4 flex flex-col items-center justify-center gap-3 bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl overflow-hidden"
                                            >
                                                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />
                                                <div className="absolute inset-0 bg-linear-to-tr from-foreground/5 to-transparent pointer-events-none" />

                                                <div className="relative p-3 rounded-2xl bg-secondary/80 ring-1 ring-border/50 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                    <Image src={getAssetPath(item.icon)} alt={item.name} width={40} height={40} className="drop-shadow-lg object-contain" unoptimized={item.icon.endsWith('.svg')} />
                                                </div>
                                                <div className="flex flex-col items-center justify-center gap-1 z-10">
                                                    <span className="text-sm sm:text-base font-bold tracking-[0.15em] uppercase text-foreground">
                                                        {item.name}
                                                    </span>
                                                    <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-mono">
                                                        {category.title}
                                                    </span>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    ))}
                                </div>
                            </div>
                        </BlurReveal>
                    ))}
                </div>

            </div>
        </section>
    );
}
