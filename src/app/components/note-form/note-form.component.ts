import {Component, Output, EventEmitter, OnInit, effect} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {CustomIconComponent} from '../../shared/icons/custom-icon/custom-icon.component';
import {ButtonComponent} from '../../shared/button/button.component';
import {NotesService} from '../../services/notes.service';
import {AppStateService} from '../../services/app-state.service';
import {Note} from '../../models/note.model';

@Component({
	selector: 'app-note-form',
	imports: [FormsModule, CommonModule, CustomIconComponent, ButtonComponent],
	templateUrl: './note-form.component.html',
	styleUrl: './note-form.component.css',
})
export class NoteFormComponent implements OnInit {
	@Output() noteSaved = new EventEmitter<Note>();
	@Output() cancelled = new EventEmitter<void>();

	title = '';
	content = '';
	newTag = '';
	lastEdited: string | null = null;
	noteId: number | null = null;

	titleFocused = false;
	isEditMode = false;
	errorMessage = '';

	constructor(private notesService: NotesService, private appStateService: AppStateService) {
		effect(() => {
			const selectedNoteId = this.appStateService.selectedNoteId();
			this.noteId = selectedNoteId;

			if (selectedNoteId) {
				this.loadNote();
			} else {
				this.reset();
			}
		});
	}

	ngOnInit() {}

	private loadNote() {
		if (this.noteId) {
			const note = this.notesService.getNote(this.noteId);
			if (note) {
				this.loadData(note);
				this.isEditMode = true;
			} else {
				this.errorMessage = 'Note not found';
				this.reset();
			}
		}
	}

	private isValidForm(): boolean {
		return this.title.trim() !== '' || this.content.trim() !== '';
	}

	saveNote() {
		this.errorMessage = '';

		if (!this.isValidForm()) {
			this.errorMessage = 'Title or content is required';
			return;
		}

		let savedNote: Note | null = null;
		const tagsArray = this.newTag
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag);

		if (this.isEditMode && this.noteId) {
			// Update existing note
			savedNote = this.notesService.updateNote(this.noteId, this.title, this.content, tagsArray);
		} else {
			// Create new note
			savedNote = this.notesService.createNote(this.title, this.content, tagsArray);
		}

		if (savedNote) {
			this.noteSaved.emit(savedNote);
			this.reset(); // ← Agregar esta línea antes de closeForm
			this.appStateService.closeForm();
		} else {
			this.errorMessage = 'Error saving note';
		}
	}

	cancel() {
		this.errorMessage = '';
		this.appStateService.closeForm();
	}

	loadData(data: Note) {
		this.title = data.title || '';
		this.content = data.content || '';
		this.newTag = data.tags.join(', ');
		this.lastEdited = data.last_edited;
		this.isEditMode = true;
		this.noteId = data.id;
	}

	reset() {
		this.title = '';
		this.content = '';
		this.newTag = '';
		this.titleFocused = false;
		this.isEditMode = false;
		this.noteId = null;
		this.lastEdited = null;
		this.errorMessage = '';
	}
}
