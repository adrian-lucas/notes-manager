import {Component} from '@angular/core';
import {NoteFormComponent} from '../note-form/note-form.component';
@Component({
	selector: 'app-note-panel',
	imports: [ NoteFormComponent],
	templateUrl: './note-panel.component.html',
	styleUrl: './note-panel.component.css',
})
export class NotePanelComponent {
	selectedNote: number | null = null;
	editionMode: boolean = false;
	createMode: boolean = true;

	selectNote(id: number) {
		this.selectedNote = id;
		this.editionMode = false;
	}

	editeNote() {
		this.editionMode = true;
	}

	newNote() {
		this.selectedNote = null;
		this.editionMode = true;
	}
}
