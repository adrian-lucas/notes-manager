import {Component, OnInit, effect} from '@angular/core';
import {CustomIconComponent} from '../../shared/icons/custom-icon/custom-icon.component';
import {NotesService} from '../../services/notes.service';
import {FilterStateService, FilterType} from '../../services/filter.state.service';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CustomIconComponent],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
	tags: string[] = [];

	constructor(private notesService: NotesService, private filterStateService: FilterStateService) {
		effect(() => {
			this.filterStateService.filteredNotes();
			this.loadTags();
		});
	}

	ngOnInit(): void {
		this.loadTags();
	}

	loadTags() {
		this.tags = this.notesService.getAllTags();
	}

	onFilterClick(filter: FilterType) {
		this.filterStateService.setFilter(filter);
	}

	onTagClick(tag: string) {
		if (this.filterStateService.isTagActive(tag)) {
			this.filterStateService.setTag(null);
		} else {
			this.filterStateService.setTag(tag);
		}
	}
	isFilterActive(filter: FilterType): boolean {
		return this.filterStateService.isFilterActive(filter);
	}

	isTagActive(tag: string): boolean {
		return this.filterStateService.isTagActive(tag);
	}

	getFilterClasses(filter: FilterType): string {
		const baseClasses =
			'flex items-center justify-start rounded-[8px] h-[40px] py-[10px] px-[12px] gap-[8px] cursor-pointer hover:bg-neutral-100 transition-colors duration-200';
		return this.isFilterActive(filter) ? `${baseClasses} bg-neutral-200` : baseClasses;
	}

	getTagClasses(tag: string): string {
		const baseClasses =
			'flex items-center justify-start rounded-[8px] h-[40px] py-[10px] px-[12px] gap-[8px] cursor-pointer hover:bg-neutral-100 transition-colors duration-200';
		return this.isTagActive(tag) ? `${baseClasses} bg-blue-100` : baseClasses;
	}

	getIconColor(filter: FilterType): string {
		return this.isFilterActive(filter) ? 'text-blue-600' : 'text-neutral-700';
	}

	getTagIconColor(tag: string): string {
		return this.isTagActive(tag) ? 'text-blue-600' : 'text-neutral-700';
	}
}
