import { BlogType } from "./BlogTypes";

export type CategoryType = {
    title: string;
    id: number;
    blogs: BlogType[];
};