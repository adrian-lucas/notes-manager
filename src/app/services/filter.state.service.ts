import {Injectable, signal, computed} from '@angular/core';
import {NotesService} from './notes.service';

export type FilterType = 'all' | 'archived';

@Injectable({
	providedIn: 'root',
})
export class FilterStateService {
	selectedFilter = signal<FilterType>('all');
	selectedTag = signal<string | null>(null);

	constructor(private notesService: NotesService) {}

	filteredNotes = computed(() => {
		let notes = this.notesService.getCurrentUserNotes();

		const filterType = this.selectedFilter();
		if (filterType === 'archived') {
			notes = notes.filter((note) => note.archived);
		} else {
			notes = notes.filter((note) => !note.archived);
		}

		const selectedTag = this.selectedTag();
		if (selectedTag) {
			notes = notes.filter((note) =>
				note.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
			);
		}

		return notes;
	});

	setFilter(filter: FilterType) {
		this.selectedFilter.set(filter);
		this.selectedTag.set(null);
	}

	setTag(tag: string | null) {
		this.selectedTag.set(tag);
	}

	clearFilters() {
		this.selectedFilter.set('all');
		this.selectedTag.set(null);
	}

	isFilterActive(filter: FilterType): boolean {
		return this.selectedFilter() === filter;
	}

	isTagActive(tag: string): boolean {
		return this.selectedTag() === tag;
	}
}
