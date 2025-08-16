export const USUARIOS_INICIALES = [
	{
		id: 1,
		email: 'juan.perez@example.com',
		contrasenia: 'segura123',
	},
];

export const NOTAS_INICIALES = [
	{
		id: 1,
		titulo: 'Optimización de React',
		contenido: '1. Code Splitting...\nTODO: Benchmark...',
		tags: ['Dev', 'React'],
		fechaEdicion: new Date('2024-10-29'),
		archivada: false,
		usuario: 1,
	},
	{
		id: 2,
		titulo: 'Planificación de Viaje a Japón',
		contenido: 'Itinerario y presupuesto...',
		tags: ['Travel', 'Personal'],
		fechaEdicion: new Date('2024-10-28'),
		archivada: false,
		usuario: 1,
	},
];
