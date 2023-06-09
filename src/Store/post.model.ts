export interface Comment {
    text: string;
    _id: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface Post {
    _id: string | null;
    title: string | null;
    content: string | null;
    comments: Comment[];
    createdAt: Date | null;
    updatedAt: Date | null;
}