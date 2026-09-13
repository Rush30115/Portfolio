"use client";

import { motion, useTransform, useScroll, useSpring } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Code2 } from "lucide-react";
import { useLanguage } from "@/providers/language-provider";
import { useMediaQuery, BREAKPOINTS } from "@/hooks/use-media-query";
import { BlurReveal } from "@/components/effects/blur-reveal";
import { ProjectModal } from "@/components/modals/project-modal";
import type { ProjectItem } from "@/types/project";

export default function Projects() {
    const { content, dict } = useLanguage();

    const isDesktop = useMediaQuery(BREAKPOINTS.xl);

    const targetRef = useRef<HTMLDivElement>(null);
    const horizontalContainerRef = useRef<HTMLDivElement>(null);

    const [measurements, setMeasurements] = useState({ scrollRange: 0, dynamicHeight: "auto" });
    const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!isDesktop) {
            const frame = requestAnimationFrame(() => {
                setMeasurements({ scrollRange: 0, dynamicHeight: "auto" });
            });
            return () => cancelAnimationFrame(frame);
        }

        const updateMeasurements = () => {
            if (horizontalContainerRef.current) {
                const totalWidth = horizontalContainerRef.current.scrollWidth;
                const viewportW = window.innerWidth;
                const range = totalWidth - viewportW;
                const safeRange = range > 0 ? range : 0;

                setMeasurements({
                    scrollRange: safeRange,
                    dynamicHeight: `${safeRange + window.innerHeight}px`,
                });
            }
        };

        updateMeasurements();

        const timeout = setTimeout(updateMeasurements, 100);
        const resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(updateMeasurements);
        });

        if (horizontalContainerRef.current) {
            resizeObserver.observe(horizontalContainerRef.current);
        }

        return () => {
            clearTimeout(timeout);
            resizeObserver.disconnect();
        };
    }, [isDesktop, content.projects]);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], [0, -measurements.scrollRange]);
    const smoothX = useSpring(x, { stiffness: 400, damping: 60, restDelta: 0.5 });

    const handleOpenProject = (project: ProjectItem) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section
            ref={targetRef}
            data-slot="projects"
            className="relative py-16 md:py-24 lg:py-32 xl:py-0"
            style={{ height: measurements.dynamicHeight }}
        >
            <div
                className={`
                    w-full 
                    ${isDesktop
                        ? "sticky top-0 h-screen flex items-center overflow-hidden"
                        : "relative flex flex-col"
                    }
                `}
            >

                {!isDesktop ? (
                    <>
                        <div className="flex flex-col gap-4 px-container mb-10">
                            <BlurReveal>
                                <span className="title-counter">
                                    [003]
                                </span>
                            </BlurReveal>

                            <BlurReveal>
                                <h2 className="title">
                                    {dict.title.projects}
                                </h2>
                            </BlurReveal>

                            <BlurReveal>
                                <p className="mt-4 text-muted-foreground text-lg">
                                    {dict.projectsIntro}
                                </p>
                            </BlurReveal>
                        </div>
                        <div className="flex flex-col w-full max-w-full px-container gap-container">
                            {content.projects.map((project: ProjectItem) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onClick={() => handleOpenProject(project)}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <motion.div
                        ref={horizontalContainerRef}
                        style={{ x: smoothX }}
                        className="flex px-container w-max items-center"
                    >
                        <div className="w-[60vw] xl:w-[40vw] shrink-0 flex flex-col justify-center">

                            <div className="flex flex-col gap-4">

                                <BlurReveal>
                                    <span className="title-counter">
                                        [003]
                                    </span>
                                </BlurReveal>

                                <BlurReveal>
                                    <h2 className="title">
                                        {dict.title.projects}
                                    </h2>
                                </BlurReveal>

                                <BlurReveal>
                                    <p className="mt-4 text-5xl font-light leading-tight">
                                        {dict.projectsIntro}
                                    </p>
                                </BlurReveal>

                                <BlurReveal>
                                    <div className="mt-12 flex items-center gap-4">
                                        <div className="h-px w-24 bg-border" />
                                        <span className="text-sm font-mono text-foreground/40 uppercase">
                                            {dict.projectsScrollText}
                                        </span>
                                    </div>
                                </BlurReveal>

                            </div>

                        </div>

                        {content.projects.map((project: ProjectItem) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => handleOpenProject(project)}
                            />
                        ))}

                        <div className="w-[40vw] h-[70vh] shrink-0 flex flex-col justify-center items-center">
                            <h3 className="text-[10vw] font-black tracking-tighter text-border uppercase">
                                {dict.projectsEndText}
                            </h3>
                        </div>
                    </motion.div>
                )}
            </div>

            <ProjectModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                project={selectedProject}
            />
        </section>
    );
}

const ProjectCard = React.memo(function ProjectCard({ project, onClick }: { project: ProjectItem; onClick?: () => void }) {
    return (
        <BlurReveal>
            <div
                onClick={onClick}
                className="group relative w-full xl:w-[42vw] aspect-4/3 shrink-0 xl:mx-6 cursor-pointer select-none"
            >
                <div className="relative w-full h-full overflow-hidden rounded-3xl bg-card/60 backdrop-blur-md border border-border/60 p-8 xl:p-12 flex flex-col justify-between transition-all duration-500 ease-out group-hover:border-foreground/40 group-hover:bg-card/90 group-hover:shadow-2xl">
                    {/* Background subtle grid pattern */}
                    <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-foreground/[0.03] rounded-full blur-3xl pointer-events-none group-hover:bg-foreground/[0.08] transition-colors duration-700" />

                    {/* Top row: Category, Year, and External indicator icon */}
                    <div className="relative z-10 flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs xl:text-sm font-mono tracking-widest text-muted-foreground uppercase">
                                {project.category}
                            </span>
                            <span className="text-[11px] font-mono text-muted-foreground/60">
                                {project.year}
                            </span>
                        </div>

                        <div className="w-10 h-10 rounded-full border border-border/70 flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-foreground/50 group-hover:scale-110 transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                    </div>

                    {/* Middle / Bottom: Tech stack pills & Big Title */}
                    <div className="relative z-10 flex flex-col gap-6">
                        {project.stack && project.stack.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {project.stack.slice(0, 4).map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-border/50 bg-secondary/30 text-muted-foreground"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="space-y-2">
                            <h3 className="text-3xl sm:text-4xl lg:text-5xl xl:text-5xl font-black tracking-tighter uppercase text-foreground leading-[0.95] group-hover:text-foreground/90 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed font-light">
                                {project.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </BlurReveal>
    );
});