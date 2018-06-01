const { bubbleSort, modifiedBubbleSort, selectionSort, insertSort } = require('./simpleSorts')
const quickSort1 = require('./quickSort1')
const quickSort2 = require('./quickSort2')
const mergeSort = require('./mergeSort')
const heapSort = require('./heapSort')
const generateRandom = require('./generateRandom')

function exectWhat () {
  const argCount = process.argv[2]
  let argSort = process.argv[3]
  let sortMethod

  switch (argSort) {
    case 'q1':
      console.log('阮氏快排')
      sortMethod = quickSort1
      break
    case 'q2':
      console.log('本书快排')    
      sortMethod = quickSort2
      break
    case 'm':
      console.log('归并排序')    
      sortMethod = mergeSort
      break
    case 'h':
      console.log('堆排序')
      sortMethod = heapSort
      break
    case 'b':
      console.log('冒泡排序')
      sortMethod = bubbleSort
      break
    case 'mb':
      console.log('改良冒泡排序')
      sortMethod = modifiedBubbleSort
      break
    case 's':
      console.log('选择排序')
      sortMethod = selectionSort
      break
    case 'i':
      console.log('插入排序')
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
    console.log('可选的排序方法：b-冒泡，mb-改良冒泡，s-选择，i-插入，q1-阮氏快排，q2-本书快排，m-归并，h-堆')
    return false
  }

  return {
    sortMethod,
    argCount
  }
}
const args = exectWhat()
if (!args) return

const randomArray = generateRandom(args.argCount || 100) // 产生随机数数组
// const randomArray = [3,5,1,6,4,7,2] // 使用固定数组
console.log(randomArray.slice(0, 10))

// 执行排序
const tStart = Date.now()
const result = args.sortMethod(randomArray)
const tTotal = Date.now() - tStart

// 输出耗时
console.log(`耗时 ${tTotal} 毫秒`)
// 输出排序后的数组
console.log(result.slice(0, 10))