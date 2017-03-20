let palabra = process.argv[2];
let numAs = 0;
for (let i = 0; i < palabra.length; i++) {
	if (palabra[i] == 'a') {
		numAs++;
	}
}
console.log('La palabra ' + palabra + ' contiene ' + numAs + ' a(s)');
