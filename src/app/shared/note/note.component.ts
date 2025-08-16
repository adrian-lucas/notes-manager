import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
	selector: 'app-note',
	templateUrl: './note.component.html',
	styleUrls: ['./note.component.css'],
})
export class NoteComponent {
	@Input() id!: number;
	@Input() title!: string;
	@Input() tags: string[] = [];
	@Input() date!: string;

	@Output() noteClicked = new EventEmitter<number>();

	onClick() {
		this.noteClicked.emit(this.id);
	}
}
