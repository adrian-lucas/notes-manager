import {Injectable, signal, computed} from '@angular/core';
import {Note} from '../models/note.model';
import {UserService} from './user.service';

@Injectable({
	providedIn: 'root',
})
export class NotesService {
	private notes = signal<Note[]>([]);
	private readonly STORAGE_KEY = 'notes';

	constructor(private userService: UserService) {
		this.loadNotes();
	}

	private loadNotes() {
		const storedNotes = localStorage.getItem(this.STORAGE_KEY);
		if (storedNotes) {
			this.notes.set(JSON.parse(storedNotes));
		}
	}

	private saveNotes() {
		localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.notes()));
	}

	private getNextId(): number {
		const currentNotes = this.notes();
		return currentNotes.length > 0 ? Math.max(...currentNotes.map((n) => n.id)) + 1 : 1;
	}

	private formatDate(date: Date): string {
		const months = [
			'ene',
			'feb',
			'mar',
			'abr',
			'may',
			'jun',
			'jul',
			'ago',
			'sep',
			'oct',
			'nov',
			'dic',
		];

		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();

		return `${day} ${month} ${year}`;
	}

	getCurrentUserNotes = computed(() => {
		const currentUser = this.userService.getUsuarioActual();
		if (!currentUser) {
			return [];
		}
		return this.notes().filter((note) => note.usuario_id === currentUser.id);
	});

	getNote(id: number): Note | null {
		const currentUser = this.userService.getUsuarioActual();
		if (!currentUser) {
			return null;
		}
		return (
			this.notes().find((note) => note.id === id && note.usuario_id === currentUser.id) || null
		);
	}

	createNote(title: string, content: string, tags: string[]): Note | null {
		const currentUser = this.userService.getUsuarioActual();
		if (!currentUser) {
			return null;
		}

		const newNote: Note = {
			id: this.getNextId(),
			title: title.trim(),
			content: content.trim(),
			tags: tags,
			last_edited: this.formatDate(new Date()),
			archived: false,
			usuario_id: currentUser.id,
		};

		this.notes.update((notes) => [...notes, newNote]);
		this.saveNotes();
		return newNote;
	}

	updateNote(id: number, title: string, content: string, tags: string[]): Note | null {
		const currentUser = this.userService.getUsuarioActual();
		if (!currentUser) {
			return null;
		}

		const currentNotes = this.notes();
		const index = currentNotes.findIndex(
			(note) => note.id === id && note.usuario_id === currentUser.id
		);
		if (index === -1) {
			return null;
		}

		const updatedNote = {
			...currentNotes[index],
			title: title.trim(),
			content: content.trim(),
			tags: tags,
			last_edited: this.formatDate(new Date()),
		};

		this.notes.update((notes) => {
			const newNotes = [...notes];
			newNotes[index] = updatedNote;
			return newNotes;
		});

		this.saveNotes();
		return updatedNote;
	}

	deleteNote(id: number): boolean {
		const currentUser = this.userService.getUsuarioActual();
		if (!currentUser) {
			return false;
		}

		const currentNotes = this.notes();
		const index = currentNotes.findIndex(
			(note) => note.id === id && note.usuario_id === currentUser.id
		);
		if (index === -1) {
			return false;
		}

		this.notes.update((notes) => notes.filter((_, i) => i !== index));
		this.saveNotes();
		return true;
	}

	toggleArchive(id: number): Note | null {
		const currentUser = this.userService.getUsuarioActual();
		if (!currentUser) {
			return null;
		}

		const currentNotes = this.notes();
		const index = currentNotes.findIndex(
			(note) => note.id === id && note.usuario_id === currentUser.id
		);
		if (index === -1) {
			return null;
		}

		this.notes.update((notes) => {
			const newNotes = [...notes];
			newNotes[index] = {
				...newNotes[index],
				archived: !newNotes[index].archived,
			};
			return newNotes;
		});

		this.saveNotes();
		return this.notes()[index];
	}

	searchNotes(term: string): Note[] {
		const userNotes = this.getCurrentUserNotes();
		if (!term.trim()) {
			return userNotes;
		}

		const termLower = term.toLowerCase();
		return userNotes.filter(
			(note) =>
				note.title.toLowerCase().includes(termLower) ||
				note.content.toLowerCase().includes(termLower) ||
				note.tags.some((tag) => tag.toLowerCase().includes(termLower))
		);
	}

	getNotesByTag(tag: string): Note[] {
		const userNotes = this.getCurrentUserNotes();
		return userNotes.filter((note) =>
			note.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
		);
	}

	getAllTags(): string[] {
		const userNotes = this.getCurrentUserNotes();
		const allTags = userNotes.flatMap((note) => note.tags);
		return [...new Set(allTags)];
	}
}
