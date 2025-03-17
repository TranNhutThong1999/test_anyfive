import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePost } from '../../hooks/usePost';
import Breakcrumb from '../Breakcrumb';

const PostForm: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const isEditMode = !!id;
	const postId = isEditMode ? Number(id) : 0;

	const { getPost, addPost, updatePost } = usePost();
	const navigate = useNavigate();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [formError, setFormError] = useState('');

	useEffect(() => {
		if (isEditMode) {
			const post = getPost(postId);
			if (post) {
				setTitle(post.title);
				setContent(post.content);
			} else {
				navigate('/');
			}
		}
	}, [isEditMode, postId]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim() || !content.trim()) {
			setFormError('⚠️ Vui lòng nhập đầy đủ tiêu đề và nội dung');
			return;
		}
		try {
			if (isEditMode) {
				updatePost(postId, title, content);
				navigate(`/post/${postId}`);
			} else {
				const newId = addPost(title, content);
				navigate(`/post/${newId}`);
			}
		} catch (error) {
			setFormError('❌ Có lỗi xảy ra khi lưu bài viết');
		}
	};

	return (
		<div className="bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen flex items-center justify-center p-6">
			<div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg border border-gray-200">
				<Breakcrumb
					data={[
						{
							title: 'Danh sách bài viết',
							path: '/',
							current: false,
						},
						{
							title: id
								? 'Chỉnh sửa bài viết'
								: 'Tạo mới bài viết',
							current: true,
						},
					]}
				/>

				<h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
					{isEditMode
						? '✏️ Chỉnh sửa bài viết'
						: '📝 Tạo bài viết mới'}
				</h2>

				{formError && (
					<div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
						{formError}
					</div>
				)}

				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							className="block text-gray-700 font-semibold mb-2"
							htmlFor="title"
						>
							Tiêu đề<span className="text-red-500">*</span>:
						</label>
						<input
							type="text"
							maxLength={150}
							autoFocus
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Nhập tiêu đề bài viết..."
							className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
						/>
					</div>

					<div>
						<label
							className="block text-gray-700 font-semibold mb-2"
							htmlFor="content"
						>
							Nội dung<span className="text-red-500">*</span>:
						</label>
						<textarea
							id="content"
							value={content}
							maxLength={1000}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Nhập nội dung bài viết..."
							rows={8}
							className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
						/>
					</div>

					<div className="flex gap-2 justify-end">
						<button
							type="submit"
							className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
						>
							💾 Lưu
						</button>
						{/* <button
							type="button"
							onClick={() =>
								navigate(isEditMode ? `/post/${postId}` : '/')
							}
							className="bg-gray-400 text-white px-6 py-3 rounded-lg shadow-md hover:bg-gray-500 transition"
						>
							❌ Hủy
						</button> */}
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostForm;
