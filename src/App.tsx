import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom';

import './App.css';
import PostList from './components/PostList';
import { PostProvider } from './components/PostProvider';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';

function App() {
	return (
		<PostProvider>
			<Router>
				<Routes>
					<Route path="/" element={<PostList />} />
					<Route path="/post/:id" element={<PostDetail />} />
					<Route path="/create" element={<PostForm />} />
					<Route path="/edit/:id" element={<PostForm />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</Router>
		</PostProvider>
	);
}

export default App;
