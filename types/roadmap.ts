export type RoadmapItem = {
    id: string;
    year: string;
    description: string;
    stack: string[];
    parallel?: {
        title: string;
        subtitle: string;
        description: string;
        stack: string[];
    };
};
