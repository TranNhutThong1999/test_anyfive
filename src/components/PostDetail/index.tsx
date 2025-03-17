import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from '../../hooks/usePost';
import Breakcrumb from '../Breakcrumb';

const PostDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const postId = Number(id);
	const { getPost, incrementViews, deletePost } = usePost();
	const navigate = useNavigate();

	const post = getPost(postId);

	useEffect(() => {
		if (post) {
			incrementViews(postId);
		}
	}, [postId]);

	if (!post) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
				<div className="bg-white p-6 rounded-lg shadow-lg text-center">
					<h2 className="text-2xl font-bold text-red-500 mb-4">
						❌ Không tìm thấy bài viết
					</h2>
					<p className="text-gray-600 mb-6">
						Có vẻ như bài viết này không tồn tại hoặc đã bị xóa.
					</p>
					<div className="flex justify-end">
						<button
							onClick={() => navigate('/')}
							className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 flex items-center"
						>
							Quay lại danh sách
						</button>
					</div>
				</div>
			</div>
		);
	}

	const handleDelete = () => {
		if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
			deletePost(postId);
			navigate('/');
		}
	};

	return (
		<div className="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen flex items-center justify-center p-6">
			<div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-2xl border border-gray-200">
				<Breakcrumb
					data={[
						{
							title: 'Danh sách bài viết',
							path: '/',
							current: false,
						},
						{
							title: 'Chi tiết bài viết',
							current: true,
						},
					]}
				/>

				<h1 className="text-4xl font-bold mb-4 mt-4 text-gray-800">
					{post.title}
				</h1>
				<p className="text-gray-600 text-lg mb-2">
					<span className="font-semibold text-gray-700">
						Số bài viết:
					</span>{' '}
					{post.number}
				</p>
				<p className="text-gray-600 text-lg mb-2">
					<span className="font-semibold text-gray-700">
						Lượt xem:
					</span>{' '}
					{post.views}
				</p>
				<div className="mt-6 p-4 bg-gray-50 border-l-4 border-blue-500 text-gray-700 rounded-lg">
					{post.content}
				</div>

				<div className="mt-8 flex justify-end gap-2">
					<button
						onClick={() => navigate(`/edit/${post.id}`)}
						className="hover:cursor-pointer bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
					>
						✏️ Chỉnh sửa
					</button>
					<button
						onClick={handleDelete}
						className="hover:cursor-pointer bg-red-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-red-700 transition"
					>
						🗑️ Xóa bài viết
					</button>
				</div>
			</div>
		</div>
	);
};

export default PostDetail;
