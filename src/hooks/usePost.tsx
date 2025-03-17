import { useContext } from 'react';
import { PostContext } from '../components/PostProvider';

export const usePost = () => {
	const context = useContext(PostContext);
	if (!context) {
		throw new Error('usePost must be used within a PostProvider');
	}
	return context;
};
