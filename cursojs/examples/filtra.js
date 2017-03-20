console.log(process.argv
	.filter((item, i) => i >= 2)
	.map(palabra => palabra.toUpperCase())
	.filter(palabra => 'AEIOU'.indexOf(palabra[0]) >= 0));

