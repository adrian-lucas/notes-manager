import {Injectable, signal} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AppStateService {
	selectedNoteId = signal<number | null>(null);
	showForm = signal<boolean>(false);

	openNote(noteId: number) {
		this.selectedNoteId.set(noteId);
		this.showForm.set(true);
	}

	createNewNote() {
		this.selectedNoteId.set(null);
		this.showForm.set(true);
	}

	closeForm() {
		this.selectedNoteId.set(null);
		this.showForm.set(false);
	}
}
