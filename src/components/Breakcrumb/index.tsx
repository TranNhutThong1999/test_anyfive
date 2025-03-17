import { Link } from 'react-router-dom';

interface IData {
	title: string;
	path?: string;
	current?: boolean;
}
interface IProps {
	data: Array<IData>;
}
const Breadcrumb = ({ data }: IProps) => {
	return (
		<nav className="text-gray-600 text-sm mb-6">
			<ul className="flex items-center italic space-x-2">
				{data.map((item, index) => {
					if (
						!!(item.current ?? false) ||
						index === data.length - 1
					) {
						return (
							<li className="text-gray-800 font-semibold">
								{item.title}
							</li>
						);
					}
					return (
						<>
							<Link
								to={item?.path || '/'}
								className="text-blue-500 hover:underline"
							>
								{item.title}
							</Link>
							<span>/</span>
						</>
					);
				})}
			</ul>
		</nav>
	);
};
export default Breadcrumb;
