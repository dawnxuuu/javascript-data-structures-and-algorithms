const { bubbleSort, modifiedBubbleSort, selectionSort, insertSort } = require('./simpleSorts')
const quickSort = require('./quickSort')
const quickSort2 = require('./quickSort2')
const mergeSort = require('./mergeSort')
const heapSort = require('./heapSort')
const generateRandom = require('./generateRandom')

function exectWhat () {
  const argCount = process.argv[2]
  let argSort = process.argv[3]
  let sortMethod

  switch (argSort) {
    case 'q':
      sortMethod = quickSort
      break
    case 'q2':
      sortMethod = quickSort2
      break
    case 'm':
      sortMethod = mergeSort
      break
    case 'h':
      sortMethod = heapSort
      break
    case 'b':
      sortMethod = bubbleSort
      break
    case 'mb':
      sortMethod = modifiedBubbleSort
      break
    case 's':
      sortMethod = selectionSort
      break
    case 'i':
      sortMethod = insertSort
      break
    default:
      break
  }

  if (!argCount || typeof parseInt(argCount) !== 'number') {
    console.log('请传入参数：待排序数组长度 排序方法简称')
    return false
  }
  if (!argSort || typeof sortMethod !== 'function') {
    console.log('可选的排序方法：b-冒泡，mb-改良冒泡，s-选择，i-插入，q-阮氏快排，q2-本书快排，m-归并，h-堆')
    return false
  }

  return {
    sortMethod,
    argCount
  }
}
const args = exectWhat()
if (!args) return

// 产生随机数数组
const randomArray = generateRandom(args.argCount || 100)
// const randomArray = [85,24,63,45,17,31,96,50]
console.log(randomArray.slice(0, 10))

// 执行排序
const tStart = Date.now()
const result = args.sortMethod(randomArray)
const tTotal = Date.now() - tStart

// 输出耗时
console.log(`耗时 ${tTotal} 毫秒`)
console.log(args.sortMethod)
// 输出排序后的数组
console.log(result.slice(0, 10))