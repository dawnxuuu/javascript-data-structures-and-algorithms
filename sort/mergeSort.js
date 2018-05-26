// 归并排序
function mergeSort(array) {
  function merge (left, right) {
    var result = []
    var il = 0
    var ir = 0

    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        result.push(left[il++])
      } else {
        result.push(right[ir++])
      }
    }

    while (il < left.length) {
      result.push(left[il++])
    }

    while (ir < right.length) {
      result.push(right[ir++])
    }

    return result
  }

  function mergeSortRec (array) {
    var length = array.length
    if (length === 1) {
      return array
    }
    var mid = Math.floor(length / 2)
    var left = array.slice(0, mid)
    var right = array.slice(mid, length)

    return merge(mergeSortRec(left), mergeSortRec(right))
  }

  return mergeSortRec(array)
}

module.exports = mergeSort