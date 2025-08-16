import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-button',
	imports: [],
	templateUrl: './button.component.html',
	styleUrl: './button.component.css',
})
export class ButtonComponent {
	@Input() width: string = '100%';
	@Input() height: string = '41px';
	@Input() backgroundColor: string = 'var(--color-blue-500)';
	@Input() disabled: boolean = false;
	@Input() customClasses: string = '';

	@Output() onClick = new EventEmitter<void>();

	handleClick(): void {
		if (!this.disabled) {
			this.onClick.emit();
		}
	}
}
