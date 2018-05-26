function ArrayList () {
  var array = []
  this.insert = function (item) {
    array.push(item)
  }
  this.toString = function () {
    return array.join()
  }
  // 交换函数
  function swap (array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]]
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
array.insertSort()
console.log(array.toString())
