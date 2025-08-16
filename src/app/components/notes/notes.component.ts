import {Component, OnInit, effect} from '@angular/core';
import {NoteComponent} from '../../shared/note/note.component';
import {ButtonComponent} from '../../shared/button/button.component';
import {CustomIconComponent} from '../../shared/icons/custom-icon/custom-icon.component';
import {NotesService} from '../../services/notes.service';
import {AppStateService} from '../../services/app-state.service';
import {FilterStateService} from '../../services/filter.state.service';
import {Note} from '../../models/note.model';

@Component({
	selector: 'app-notes',
	imports: [NoteComponent, ButtonComponent, CustomIconComponent],
	templateUrl: './notes.component.html',
	styleUrl: './notes.component.css',
})
export class NotesComponent implements OnInit {
	notes: Note[] = [];

	constructor(
		private notesService: NotesService,
		private appStateService: AppStateService,
		private filterStateService: FilterStateService
	) {
		effect(() => {
			this.notes = this.filterStateService.filteredNotes();
		});
	}

	ngOnInit(): void {}

	onCreateNewNote() {
		this.appStateService.createNewNote();
	}
	onNoteClicked(noteId: number) {
		this.appStateService.openNote(noteId);
	}
}
