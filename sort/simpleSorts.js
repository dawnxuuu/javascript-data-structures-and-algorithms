function swap (array, index1, index2) {
  [array[index1], array[index2]] = [array[index2], array[index1]]
}

// b-冒泡
function bubbleSort (array) {
  var length = array.length
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length - 1; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}

// mb-改良冒泡
function modifiedBubbleSort (array) {
  var length = array.length
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        swap(array, j, j + 1)
      }
    }
  }
  return array
}

// s-选择
function selectionSort (array) {
  var length = array.length
  var indexMin
  for (var i = 0; i < length - 1; i++) {
    indexMin = i
    for (var j = i; j < length; j++) {
      if (array[indexMin] > array[j]) {
        indexMin = j
      }
    }
    if (i !== indexMin) {
      swap(array, i, indexMin)
    }
  }
  return array
}

// i-插入
function insertSort (array) {
  var length = array.length
  var j
  var temp

  for (var i = 1; i < length; i++) {
    j = i
    temp = array[i]
    while (j > 0 && array[j - 1] > temp) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
  }
  return array
}

module.exports = {
  bubbleSort,
  modifiedBubbleSort,
  selectionSort,
  insertSort
}
