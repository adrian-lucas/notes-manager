// import {Component} from '@angular/core';

// @Component({
// 	selector: 'app-custom-icon',
// 	imports: [],
// 	templateUrl: './custom-icon.component.html',
// 	styleUrl: './custom-icon.component.css',
// })
// export class CustomIconComponent {}
import {Component, Input, OnInit, ElementRef, Renderer2} from '@angular/core';
import {CustomIconService} from '../../../services/icon.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
	selector: 'app-custom-icon',
	imports: [MatIconModule],
	template: `
		<mat-icon
			[svgIcon]="iconName"
			[style.width.px]="width ?? size"
			[style.height.px]="height ?? size"
		>
		</mat-icon>
	`,
	styleUrls: ['./custom-icon.component.css'],
})
export class CustomIconComponent implements OnInit {
	@Input() iconName!: string;
	@Input() size: number = 24;
	@Input() width?: number;
	@Input() height?: number;
	@Input() color: string = 'text-neutral-700';
	@Input() hover: boolean = false;
	@Input() loading: boolean = false;
	@Input() customClass: string = '';

	constructor(
		private iconService: CustomIconService,
		private elementRef: ElementRef,
		private renderer: Renderer2
	) {}

	ngOnInit(): void {
		this.iconService.loadIcon(this.iconName);
	}

	ngAfterViewInit(): void {
		// Forzar el color después de que se renderice
		this.applyColor();
	}

	private applyColor(): void {
		const matIcon = this.elementRef.nativeElement.querySelector('mat-icon');
		const svg = this.elementRef.nativeElement.querySelector('svg');

		if (matIcon && this.color) {
			// Remover clases de Material que interfieren
			this.renderer.removeClass(matIcon, 'mat-icon-no-color');

			// Aplicar color directamente
			if (this.color.startsWith('text-')) {
				this.renderer.addClass(matIcon, this.color);
			} else {
				this.renderer.setStyle(matIcon, 'color', this.color);
			}
		}

		// Aplicar color directamente al SVG también
		if (svg) {
			const paths = svg.querySelectorAll('path');
			paths.forEach((path: any) => {
				this.renderer.setStyle(path, 'stroke', 'currentColor');
			});
		}
	}
}
