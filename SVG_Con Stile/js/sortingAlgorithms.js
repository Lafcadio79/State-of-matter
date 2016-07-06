/*
	sorting algorithms class
	implementations
*/

// swap two elements of a list
function swap(vet, p1, p2){
	var temp = vet[p1];
	vet[p1] = vet[p2];
	vet[p2] = temp;
}


// selectionsort algorithm
function selectionSort(vet){
	for (j = 0; j < vet.length-1; j++) {
		var  min = j;
		for(i = j+1; i < vet.length; i++) {
			if (vet[i] < vet[min]) {
				min = i;
			}
		}
		if(min != j) {
			swap(vet, j, min);
		}
	}

	return vet;
}


// bubblesort algorithm
function bubbleSort(vet){
	var j = vet.length-1;

	do{
		var t_off = false;
		for(var i = 0; i < j; i++){
			var temp;
			if(vet[i] > vet[i+1]){
				swap(vet, i, i+1);
				t_off = true;
			}
		}
		j -= 1;
	}while(t_off == true);

	return vet;
}


// insertionsort algorithm
function insertionSort(vet){
		for (var i = 1; i < vet.length; i++) {
			var nVal = vet[i];
			j = i;
			while (j > 0 && vet[j - 1] > nVal) {
				vet[j] = vet[j - 1];
				j--;
			}
			vet[j] = nVal;
		}

	return vet;	
}


// quicksort algorithm (not so easy)
function  quickSort(vet, left, right) {
	var i = left;
	var j = right;
	var tmp;
	pivotidx = (left + right) / 2; 
	var pivot = parseInt(vet[pivotidx.toFixed()]);  

	while (i <= j){
		while(parseInt(vet[i]) < pivot)
			i++;
		while(parseInt(vet[j]) > pivot)
			j--;
		if (i <= j){
			swap(vet, i, j);
			i++;
			j--;
		}
	}
	
	// recursion 
	if (left < j)
		quickSort(vet, left, j);
	if (i < right)
		quickSort(vet, i, right);

	return vet;
}

// mergesort algorithm
function mergeSort(vec){
	var merge = function(i,j){
		var result = [];
		while (i.length >0 && j.length >0)
			result.push(i[0] < j[0] ? i.shift() : j.shift());
		return result.concat(i.length ? i : j);
	}
	
	if (vec.length < 2)
		return vec;
	var mid = Math.floor(vec.length /2);
	var subLeft = mergeSort(vec.slice(0,mid));
	var subRight = mergeSort(vec.slice(mid));
	
	return merge(subLeft, subRight);
}
