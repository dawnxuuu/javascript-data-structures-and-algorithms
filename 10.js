function ArrayList () {
  var array = []
  this.insert = function (item) {
    array.push(item)
  }
  this.toString = function () {
    return array.join()
  }

  // 冒泡排序
  this.bubbleSort = function () {
    var length = array.length
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length - 1; j++) {
        if (array[j] > array[j + 1]) {
          swap(array, j, j + 1)
        }
      }
    }
  }

  // 修正冒泡排序
  this.modifiedBubbleSort = function () {
    var length = array.length
    for (var i = 0; i < length; i++) {
      for (var j = 0; j < length - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          swap(array, j, j + 1)
        }
      }
    }
  }

  // 选择排序
  this.selectionSort = function () {
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
  }

  // 插入排序
  this.insertSort = function () {
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
  }

  // 归并排序
  this.mergeSort = function () {
    var merge = function (left, right) {
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

    var mergeSortRec = function (array) {
      var length = array.length
      if (length === 1) {
        return array
      }
      var mid = Math.floor(length / 2)
      var left = array.slice(0, mid)
      var right = array.slice(mid, length)

      return merge(mergeSortRec(left), mergeSortRec(right))
    }

    array = mergeSortRec(array)
  }

  // 快速排序
  this.quickSort = function () {
    var doSort = function (arr) {
      if (arr.length <= 1) { return arr }
      var pivotIndex = Math.floor(arr.length / 2)
      var pivot = arr.splice(pivotIndex, 1)[0]
      var left = []
      var right = []
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
          left.push(arr[i])
        } else {
          right.push(arr[i])
        }
      }
      return doSort(left).concat([pivot], doSort(right))
    }
    array = doSort(array)
  }

  this.quickSort2 = function () {
    function quick (array, left, right) {
      let index
      if (array.length > 1) {
        index = partition(array, left, right)
        if (left < index - 1) {
          quick(array, left, index - 1)
        }
        if (index < right) {
          quick(array, index, right)
        }
      }
      return array
    }

    // 分治函数
    function partition (array, left, right) {
      // 用index取中间值而非splice
      const pivot = array[Math.floor((right + left) / 2)]
      let i = left
      let j = right

      while (i <= j) {
        while (array[i] < pivot) {
          i++
        }
        while (array[j] > pivot) {
          j--
        }
        if (i <= j) {
          swap(array, i, j)
          i++
          j--
        }
      }
      return i
    }

    array = quick(array, 0, array.length - 1)
  }

  var swap = function (array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]]
  }
}

function createNonSortedArray (size) {
  var array = new ArrayList()

  // for (var i = size; i > 0; i--) {
  //   array.insert(i)
  // }

  array.insert(85)
  array.insert(24)
  array.insert(63)
  array.insert(45)
  array.insert(17)
  array.insert(31)
  array.insert(96)
  array.insert(50)

  return array
}

var array = createNonSortedArray()
console.log(array.toString())
array.quickSort2()
console.log(array.toString())
