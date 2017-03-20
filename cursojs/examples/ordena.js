function arrayMinPos(arr) {
	let min = null;
	let minPos = -1;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] !== null) {
			if (min == null || arr[i] < min) {
				min = arr[i];
				minPos = i;
			}
		}
	}
	return minPos;
}

function cortaArray(arr, desde) {
	let resultado = [];
	for (let i = desde; i < arr.length; i++) {
		resultado[resultado.length] = arr[i];
	}
	return resultado;
}

function ordenaArray(arr) {
	let resultado = [];
	for (let i = 0; i < arr.length; i++) {
		let minPos = arrayMinPos(arr);
		resultado[resultado.length] = arr[minPos];
		arr[minPos] = null;
	}
	return resultado;
}

console.log(ordenaArray(cortaArray(process.argv, 2)));