import {Component} from '@angular/core';
import { CustomIconComponent } from '../../shared/icons/custom-icon/custom-icon.component';

@Component({
	selector: 'app-header',
	imports: [CustomIconComponent],
	templateUrl: './header.component.html',
	styleUrl: './header.component.css',
})
export class HeaderComponent {}
