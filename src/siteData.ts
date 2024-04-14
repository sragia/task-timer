import Home from 'lucide-svelte/icons/home';

import Package2 from 'lucide-svelte/icons/package-2';

export const siteData = {
	appShellTitle: 'Task Timer',
	dashboardLinks: [
		{
			name: 'Current Day',
			icon: Home,
			href: '/protected/current-day',
			needsRole: 'USER'
		},
		{
			name: 'Past Days',
			icon: Package2,
			href: '/protected/past-days',
			needsRole: 'USER'
		},
	],
	landingLinks: [
		{
			name: 'Login',
			href: '/'
		},
		{
			name: 'Register',
			href: '/signup'
		}
	],
	landingHeaderTitle: 'Task Timer',
	landingHeaderIconUrl: '/tasktimer.png',
	landingFooterIconUrl: '/tasktimer.png'
};
