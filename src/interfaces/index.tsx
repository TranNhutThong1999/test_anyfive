import { ReactNode } from 'react';

export interface Post {
	id: number;
	number: number;
	title: string;
	content: string;
	views: number;
}

export interface PostProviderProps {
	children: ReactNode;
}

export interface PostContextType {
	posts: Post[];
	addPost: (title: string, content: string) => void;
	updatePost: (id: number, title: string, content: string) => void;
	deletePost: (id: number) => void;
	getPost: (id: number) => Post | undefined;
	incrementViews: (id: number) => void;
}
