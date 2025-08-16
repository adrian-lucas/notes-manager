import {Routes} from '@angular/router';
import {URLS} from './constants/urls-constants';

export const routes: Routes = [
	{path: '', redirectTo: URLS.AUTH, pathMatch: 'full'},
	{
		path: URLS.WORKSPACE,
		loadComponent: () =>
			import('./pages/workspace-page/workspace-page.component').then(
				(m) => m.WorkspacePageComponent
			),
	},
	{
		path: URLS.AUTH,
		loadComponent: () =>
			import('./pages/auth-page/auth-page.component').then((m) => m.AuthPageComponent),
	},
];
