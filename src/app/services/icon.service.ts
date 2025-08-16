import {Injectable} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

export interface CustomIcon {
	name: string;
	path: string;
}

@Injectable({
	providedIn: 'root',
})
export class CustomIconService {
	private readonly iconBasePath = 'assets/icons/';

	private customIcons: CustomIcon[] = [
		{
			name: 'chevron-left',
			path: 'chevron-left.svg',
		},
		{
			name: 'archive',
			path: 'archive.svg',
		},
		{
			name: 'circle-clock',
			path: 'circle-clock.svg',
		},
		{
			name: 'delete',
			path: 'delete.svg',
		},
		{
			name: 'home',
			path: 'home.svg',
		},
		{
			name: 'search',
			path: 'search.svg',
		},
		{
			name: 'setting',
			path: 'setting.svg',
		},
		{
			name: 'tag',
			path: 'tag.svg',
		},
		{
			name: 'logo',
			path: 'logo.svg',
		},
		{
			name: 'plus',
			path: 'plus.svg',
		},
		{
			name: 'hide',
			path: 'hide.svg',
		},
		{
			name: 'show',
			path: 'show.svg',
		},
		{
			name: 'google',
			path: 'google.svg',
		},
		{
			name: 'info-circle',
			path: 'info-circle.svg',
		},
	];

	constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

	public initializeCustomIcons(): void {
		this.customIcons.forEach((icon) => {
			this.matIconRegistry.addSvgIcon(
				icon.name,
				this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.iconBasePath}${icon.path}`)
			);
		});
	}

	public loadIcon(iconName: string): void {
		const icon = this.customIcons.find((i) => i.name === iconName);
		if (icon) {
			this.matIconRegistry.addSvgIcon(
				icon.name,
				this.domSanitizer.bypassSecurityTrustResourceUrl(`${this.iconBasePath}${icon.path}`)
			);
		}
	}
}
