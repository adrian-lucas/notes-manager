import {Component} from '@angular/core';
import {SidebarComponent} from '../../components/sidebar/sidebar.component';
import {HeaderComponent} from '../../components/header/header.component';
import {NotesComponent} from '../../components/notes/notes.component';
import {NotePanelComponent} from '../../components/note-panel/note-panel.component';
import {NoteActionsComponent} from '../../components/note-actions/note-actions.component';

@Component({
	selector: 'app-main-layout',
	imports: [
		SidebarComponent,
		HeaderComponent,
		NotesComponent,
		NotePanelComponent,
		NoteActionsComponent,
	],
	templateUrl: './main-layout.component.html',
	styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {}
