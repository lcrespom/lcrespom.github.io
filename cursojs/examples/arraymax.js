function arrayMax(items) {
	let max = items[0];
	for (let i = 1; i < items.length; i++) {
		if (items[i] > max) {
			max = items[i];
		}
	}
	return max;
}

function pruebaArrayMax(items, esperado) {
	let resultado = arrayMax(items);
	if (resultado != esperado) {
		console.error(`Error en arrayMax(${items}):`);
		console.error(`Valor esperado: ${esperado}, valor obtenido: ${resultado}`);
	}
}

// Pruebas
pruebaArrayMax([7, 2, 9, 4, 1], 9);
pruebaArrayMax([10, 9, 8, 7, 6, 5, 4], 10);
pruebaArrayMax([7], 7);
pruebaArrayMax(['lunes', 'martes', 'miércoles',
	'jueves', 'viernes', 'sábado', 'domingo'], 'viernes');
