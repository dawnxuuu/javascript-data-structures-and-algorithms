const quickSort = require('./quickSort')
const quickSort2 = require('./quickSort2')
const mergeSort = require('./mergeSort')
const heapSort = require('./heapSort')

const generateRandom = require('./generateRandom')

// 产生随机数数组
const randomArray = generateRandom(150000)
// const randomArray = [85,24,63,45,17,31,96,50]
console.log(randomArray.slice(0, 10))

// 执行排序
const tStart = Date.now()
const result = heapSort(randomArray)
const tTotal = Date.now() - tStart

// 输出耗时
console.log(tTotal)
// 输出排序后的数组
console.log(result.slice(0, 10))
