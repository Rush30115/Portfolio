export type StackItem = {
    name: string;
    icon: string;
    featured?: boolean;
};

export type StackCategories = {
    embedded?: StackItem[];
    protocols?: StackItem[];
    languages?: StackItem[];
    tools?: StackItem[];
    lab?: StackItem[];
    [key: string]: StackItem[] | undefined;
};
