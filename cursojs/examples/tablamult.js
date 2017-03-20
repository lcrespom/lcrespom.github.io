let num = +process.argv[2];
let i = 1;
let prod;
while (i <= 10) {
	prod = num * i;
	console.log(num + ' por ' + i + ' es ' + prod);
	i = i + 1;
}