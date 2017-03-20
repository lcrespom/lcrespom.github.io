let num = +process.argv[2];
if (isNaN(num) || num < 1 || num > 7) {
	console.log('Error: debe proporcionarse un número entre 1 y 7');
}
else {
	let diasSemana = [
		'lunes', 'martes', 'miércoles',
		'jueves', 'viernes', 'sábado', 'domingo'
	];
	console.log(diasSemana[num - 1]);
}
