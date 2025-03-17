import { createContext, useState } from 'react';
import { Post, PostContextType, PostProviderProps } from '../../interfaces';

export const PostContext = createContext<PostContextType | undefined>(
	undefined
);

const initialPosts: Post[] = [
	{
		id: 3,
		number: 1,
		title: 'Bài viết mẫu 3',
		content: 'Nội dung mẫu 3',
		views: 0,
	},
	{
		id: 2,
		number: 2,
		title: 'Bài viết mẫu 2',
		content: 'Nội dung mẫu 2',
		views: 0,
	},
	{
		id: 1,
		number: 3,
		title: 'Bài viết mẫu 1',
		content: 'Nội dung mẫu 1',
		views: 0,
	},
];

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
	const [posts, setPosts] = useState<Post[]>(initialPosts);

	const addPost = (title: string, content: string) => {
		const newId = posts.length > 0 ? posts.length + 1 : 1;
		const newPost: Post = {
			id: newId,
			number: newId,
			title,
			content,
			views: 0,
		};
		setPosts([newPost, ...posts]);
		return newId;
	};

	const updatePost = (id: number, title: string, content: string) => {
		setPosts(
			posts.map((post) =>
				post.id === id ? { ...post, title, content } : post
			)
		);
	};

	const deletePost = (id: number) => {
		setPosts(posts.filter((post) => post.id !== id));
	};

	const getPost = (id: number) => {
		return posts.find((post) => post.id === id);
	};

	const incrementViews = (id: number) => {
		setPosts(
			posts.map((post) =>
				post.id === id ? { ...post, views: post.views + 1 } : post
			)
		);
	};

	return (
		<PostContext.Provider
			value={{
				posts,
				addPost,
				updatePost,
				deletePost,
				getPost,
				incrementViews,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};
