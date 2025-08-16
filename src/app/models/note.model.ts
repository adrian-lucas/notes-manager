export interface Note {
	id: number;
	title: string;
	content: string;
	tags: string[];
	last_edited: string;
	archived: boolean;
	usuario_id: number;
}
