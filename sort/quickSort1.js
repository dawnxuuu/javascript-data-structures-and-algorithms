// q1-阮氏快排
function quickSort1(array) {
    if (array.length <= 1) { return array }
    // 中间元素的索引
    var pickedIndex = Math.floor(array.length / 2)
    // 从原数组中截取出该中间元素
    var picked = array.splice(pickedIndex, 1)[0]
    // 比中间元素小的
    var left = []
    // 比中间元素大的
    var right = []
    // 剩余的元素分别与中间元素对比，小则左放，大则右放
    for (var i = 0; i < array.length; i++) {
      if (array[i] < picked) {
        left.push(array[i])
      } else {
        right.push(array[i])
      }
    }
    // 左右集合会递归直到返回剩一个，最终合并每个左集合、中间元素、右集合。
    return quickSort1(left).concat([picked], quickSort1(right))
}

module.exports = quickSort1
