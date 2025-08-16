import {Component} from '@angular/core';
import {ButtonComponent} from '../../shared/button/button.component';
import {CustomIconComponent} from '../../shared/icons/custom-icon/custom-icon.component';
import {UserService} from '../../services/user.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {URLS} from '../../constants/urls-constants';

@Component({
	selector: 'app-auth-form',
	standalone: true,
	imports: [ButtonComponent, CustomIconComponent, FormsModule],
	templateUrl: './auth-form.component.html',
	styleUrl: './auth-form.component.css',
})
export class AuthFormComponent {
	showPassword = false;
	email: string = '';
	password: string = '';
	errorMessage: string = '';
	isLoginMode: boolean = true;

	constructor(private userService: UserService, private router: Router) {}

	togglePassword() {
		this.showPassword = !this.showPassword;
	}

	toggleMode() {
		this.isLoginMode = !this.isLoginMode;
		this.errorMessage = '';
	}

	login() {
		const usuario = this.userService.getUser(this.email, this.password);
		if (usuario) {
			this.userService.setUsuarioActual(usuario);
			this.errorMessage = '';
			this.router.navigate([URLS.WORKSPACE]);
		} else {
			this.errorMessage = 'Email o contraseña incorrectos';
		}
	}

	signup() {
		const nuevoUsuario = this.userService.crearUsuario(this.email, this.password);
		if (nuevoUsuario) {
			this.userService.setUsuarioActual(nuevoUsuario);
			this.errorMessage = '';
			this.router.navigate([URLS.WORKSPACE]);
		} else {
			this.errorMessage = 'Este email ya está registrado';
		}
	}
}
