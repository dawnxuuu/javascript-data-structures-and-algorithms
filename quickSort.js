function quickSort(array) {
    if (array.length <= 1) { return array }
    var pivotIndex = Math.floor(array.length / 2)
    var pivot = array.splice(pivotIndex, 1)[0]
    var left = []
    var right = []
    for (var i = 0; i < array.length; i++) {
      if (array[i] < pivot) {
        left.push(array[i])
      } else {
        right.push(array[i])
      }
    }
    return quickSort(left).concat([pivot], quickSort(right))
}

module.exports = quickSort
