import {Injectable} from '@angular/core';
import {User} from '../models/user.mode';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private usuarios: User[] = [];
	private usuarioActual: User | null = null;
	private readonly STORAGE_KEY = 'usuarios';
	private readonly CURRENT_USER_KEY = 'usuarioActual';

	constructor() {
		this.cargarUsuarios();
		this.cargarUsuarioActual();
	}

	private cargarUsuarios() {
		const storedUsers = localStorage.getItem(this.STORAGE_KEY);
		if (storedUsers) {
			this.usuarios = JSON.parse(storedUsers);
		}
	}

	private guardarUsuarios() {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.usuarios));
	}

	private cargarUsuarioActual() {
		const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
		if (storedUser) {
			this.usuarioActual = JSON.parse(storedUser);
		}
	}

	getUser(email: string, password: string): User | null {
		return this.usuarios.find((u) => u.email === email && u.password === password) || null;
	}

	setUsuarioActual(usuario: User) {
		this.usuarioActual = usuario;
		localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(usuario));
	}

	getUsuarioActual(): User | null {
		return this.usuarioActual;
	}

	estaLogueado(): boolean {
		return this.usuarioActual !== null;
	}

	crearUsuario(email: string, password: string): User | null {
		if (this.usuarios.some((u) => u.email === email)) {
			return null;
		}
		const nuevoUsuario: User = {
			id: this.usuarios.length + 1,
			email,
			password,
		};
		this.usuarios.push(nuevoUsuario);
		this.guardarUsuarios();
		this.setUsuarioActual(nuevoUsuario);
		return nuevoUsuario;
	}

	logout() {
		this.usuarioActual = null;
		localStorage.removeItem(this.CURRENT_USER_KEY);
	}
}
