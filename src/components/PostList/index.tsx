import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePost } from '../../hooks/usePost';

const PostList = () => {
	const { posts } = usePost();
	const navigate = useNavigate();

	const sortedPosts = useMemo(() => {
		if (!posts) return [];
		return [...posts].sort((a, b) => (a.number - b.number < 0 ? 1 : -1));
	}, [posts]);

	return (
		<div className="bg-gray-100 min-h-screen p-6 flex justify-center items-center">
			<div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg space-y-2">
				<h1 className="text-3xl font-bold mb-6 text-center ">
					Post list
				</h1>
				<div className="flex justify-end">
					<button
						onClick={() => navigate('/create')}
						className=" bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
					>
						New
					</button>
				</div>
				<table className="w-full border border-gray-300 shadow-md table-fixed">
					<thead>
						<tr className="bg-gray-200 text-gray-700 border-b border-gray-300">
							<th className="p-4 border-r text-left border-gray-300 w-1/6">
								Number
							</th>
							<th className="p-4 text-left border-r border-gray-300">
								Title
							</th>
							<th className="p-4 text-center">Views</th>
						</tr>
					</thead>
					<tbody>
						{sortedPosts.map((post) => (
							<tr
								key={post.id}
								className="hover:bg-gray-100 transition duration-200 border-b border-gray-300"
							>
								<td className="p-4 border-r border-gray-300 text-left  break-words">
									{post.number}
								</td>
								<td className="p-4 border-r border-gray-300 text-blue-500 break-words">
									<Link
										to={`/post/${post.id}`}
										className="post-title-link cursor-pointer"
									>
										{post.title}
									</Link>
								</td>
								<td className="p-4 text-center ">
									{post.views}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default PostList;
