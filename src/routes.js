import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';

export const routes = [
	{
		path: '/',
		component: Home,
		auth: false,
		exact: true
	},
	{
		component: NotFound,
		auth: false,
		exact: false
	}
];