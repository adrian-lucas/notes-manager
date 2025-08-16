import {Component, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CustomIconService} from './services/icon.service';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {
	protected readonly title = signal('my-app');
	constructor(private iconService: CustomIconService) {
		this.iconService.initializeCustomIcons(); // ✅ Esto registra todos los iconos
	}
}
