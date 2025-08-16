import {Component} from '@angular/core';
import { AuthLayoutComponent } from '../../layouts/auth-layout/auth-layout.component';

@Component({
	selector: 'app-auth-page',
	imports: [AuthLayoutComponent],
	templateUrl: './auth-page.component.html',
	styleUrl: './auth-page.component.css',
})
export class AuthPageComponent {}
