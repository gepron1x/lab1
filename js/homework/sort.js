function getSortedArray(array, key) {
    for(let i = 0; i < array.length - 1; i++) {
        for(let j = 0; j < array.length - 1 - i; j++) {
            if(array[j][key] > array[j + 1][key]) {
                let t = array[j];
                array[j] = array[j + 1];
                array[j + 1] = t;
            }
        }
    }

    return array;
}