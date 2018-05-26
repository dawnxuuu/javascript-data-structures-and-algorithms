// 堆排序
function heapSort (array) {
  let heapSize = array.length
  buildHeap(array)

  while(heapSize > 1) {
    heapSize--
    swap(array, 0, heapSize)
    heapify(array, heapSize, 0)
  }

  // 交换函数
  function swap (array, index1, index2) {
    [array[index1], array[index2]] = [array[index2], array[index1]]
  }

  function buildHeap (array) {
    let heapSize = array.length
    for(let i = Math.floor(array.length / 2); i >= 0; i--) {
      heapify(array, heapSize, i)
    }
  }

  function heapify (array, heapSize, i) {
    const left = i * 2 + 1
    const right = i * 2 + 2
    let largest = i

    if (left < heapSize && array[left] > array[largest]) {
      largest = left
    }

    if (right < heapSize && array[right] > array[largest]) {
      largest = right
    }

    if (largest !== i) {
      swap(array, i, largest)
      heapify(array, heapSize, largest)
    }
  }

  return array
}

module.exports = heapSort