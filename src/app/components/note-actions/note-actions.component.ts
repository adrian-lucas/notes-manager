import {Component, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from '../../shared/button/button.component';
import {CustomIconComponent} from '../../shared/icons/custom-icon/custom-icon.component';
import {NotesService} from '../../services/notes.service';
import {AppStateService} from '../../services/app-state.service';
import {FilterStateService} from '../../services/filter.state.service';
import {ModalComponent} from '../../shared/modal/modal.component';

@Component({
	selector: 'app-note-actions',
	imports: [ButtonComponent, CustomIconComponent, ModalComponent],
	templateUrl: './note-actions.component.html',
	styleUrl: './note-actions.component.css',
})
export class NoteActionsComponent {
	selectedNoteId: number | null = null;
	isNoteArchived = false;

	showModal = false;
	modalIconName = '';
	modalTitle = '';
	modalMessage = '';
	modalConfirmLabel = '';
	modalConfirmColor: 'blue' | 'red' = 'blue';
	currentAction: 'archive' | 'delete' = 'archive';

	constructor(
		private notesService: NotesService,
		private appStateService: AppStateService,
		private filterStateService: FilterStateService
	) {
		effect(() => {
			this.selectedNoteId = this.appStateService.selectedNoteId();
			if (this.selectedNoteId) {
				const note = this.notesService.getNote(this.selectedNoteId);
				this.isNoteArchived = note ? note.archived : false;
			}
		});
	}

	onArchiveNote() {
		if (this.selectedNoteId) {
			this.modalIconName = 'archive';
			this.modalTitle = this.isNoteArchived ? 'Unarchive Note' : 'Archive Note';
			this.modalMessage = this.isNoteArchived
				? 'Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime.'
				: 'Are you sure you want to archive this note?';
			this.modalConfirmLabel = this.isNoteArchived ? 'Unarchive' : 'Archive';
			this.modalConfirmColor = 'blue';
			this.currentAction = 'archive';
			this.showModal = true;
		}
	}

	onDeleteNote() {
		if (this.selectedNoteId) {
			this.modalIconName = 'delete';
			this.modalTitle = 'Delete Note';
			this.modalMessage =
				'Are you sure you want to permanently delete this note? This action cannot be undone.';
			this.modalConfirmLabel = 'Delete';
			this.modalConfirmColor = 'red';
			this.currentAction = 'delete';
			this.showModal = true;
		}
	}

	onModalConfirm() {
		if (this.selectedNoteId) {
			if (this.currentAction === 'archive') {
				const result = this.notesService.toggleArchive(this.selectedNoteId);
				if (result) {
					this.isNoteArchived = result.archived;
					this.appStateService.closeForm();
				}
			} else if (this.currentAction === 'delete') {
				const success = this.notesService.deleteNote(this.selectedNoteId);
				if (success) {
					this.appStateService.closeForm();
				}
			}
		}
		this.showModal = false;
	}

	onModalCancel() {
		this.showModal = false;
	}

	hasSelectedNote(): boolean {
		return this.selectedNoteId !== null;
	}

	getArchiveButtonText(): string {
		return this.isNoteArchived ? 'Unarchive Note' : 'Archive Note';
	}
}
