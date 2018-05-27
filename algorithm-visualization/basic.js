var data = []
init()
function init () {
  // 元素个数
  var dataSpan = document.getElementById('data-range-span')
  var dataRange = document.getElementById('data-range')
  // 每步运算间隔时间
  var speedSpan = document.getElementById('speed-range-span')
  var speedRange = document.getElementById('speed-range')
  // 开始按钮
  var startBubbleBtn = document.getElementById('startBubbleSort')
  var startSelectBtn = document.getElementById('startSelectionSort')
  // 重置
  var resetBtn = document.getElementById('reset')

  // 初始化元素数据
  data = initQueue(randomBuildData(dataRange.value))

  // 手动获取初始元素数据
  dataRange.addEventListener('change', function () {
    dataSpan.innerText = dataRange.value
    data = initQueue(randomBuildData(dataRange.value))
  }, false)

  // 速度
  speedRange.addEventListener('change', function () {
    speedSpan.innerText = speedRange.value
  }, false)

  // 冒泡排序按钮
  startBubbleBtn.addEventListener('click', function () {
    lockNav(true)
    legend('.bubbleSort')
    bubbleSort(data, speedRange.value)
  }, false)

  // 选择排序按钮
  startSelectBtn.addEventListener('click', function () {
    lockNav(true)
    legend('.selectSort')
    selectSort(data, speedRange.value)
  }, false)

  // 重置按钮
  resetBtn.addEventListener('click', function () {
    data = initQueue(randomBuildData(dataRange.value))
    lockNav(false)
    document.getElementById('time-total').style.visibility = 'hidden'
  }, false)
}

/**
 * 生成随机数据
 */
function randomBuildData (num) {
  var returnData = []
  for (var i = 0; i < num; i++) {
    returnData[i] = Math.ceil(Math.random() * 100)
  }
  return returnData
}

/**
 * 初始化柱条
 */
function initQueue (queueData) {
  var queueView = document.getElementById('queue-view')
  queueView.innerHTML = null
  for (var queue in queueData) {
    var queueCell = document.createElement('div')
    queueCell.className = 'queue-cell'
    queueCell.style.height = queueData[queue].toString() + 'px'
    queueCell.style.marginLeft = (queue * 18).toString() + 'px'
    queueCell.id = queue
    queueCell.title = queueData[queue]
    queueView.appendChild(queueCell)
  }
  return queueData
}

/**
 * 图例操作
 * @param type 排序名称， 格式为".xxxxxSort"
 */
function legend (type) {
  var legend = document.getElementById('legend').querySelectorAll('.legend-cell')
  if (legend) {
    for (var i = 0; i < legend.length; i++) {
      legend[i].style.display = 'none'
    }
  }

  if (type) {
    legend = document.getElementById('legend').querySelectorAll(type)
    for (var j = 0; j < legend.length; j++) {
      legend[j].style.display = 'block'
    }
  }
}

/**
 * 锁定及解锁操作按钮区
 * 传入Boolean值 true:lock，false: unlock
 */
function lockNav (lock) {
  var nav = document.getElementById('nav').childNodes
  for (var n in nav) {
    nav[n].disabled = lock
  }
}

/**
 * 冒泡排序的可视化呈现
 */
function bubbleSort (data, speed) {
  var length = data.length
  var swapQueue = []
  for (var i = 0; i < length - 1; i++) {
    for (var j = length - 1; j > i; j--) {
      var queue = []
      queue.push(j - 1)
      queue.push(j)

      swapQueue.push(queue)
    }
  }

  var timeStart = Date.now()

  setTimeout(function timer () {
    var para = swapQueue.shift()
    renderDiv(para[0], para[1], speed)
    if (swapQueue.length > 0) {
      setTimeout(timer, speed)
    } else {
      // 解锁重置按钮
      var reset = document.getElementById('reset')
      reset.disabled = false
      var timeTotal = parseInt(Date.now()) - timeStart
      document.getElementById('time-total').style.visibility = 'visible'
      document.getElementById('time-total').innerText = timeTotal
    }
  }, speed)
}

/**
 * 可视化呈现，每次操作两个条形柱
 * 参数：需高亮的div的ID，是否交换高度值
 */
function renderDiv (leftId, rightId, speed) {
  var firstDiv = document.getElementById(leftId)
  var lastDiv = document.getElementById(rightId)

  firstDiv.classList.add('on')
  lastDiv.classList.add('on')

  if (parseInt(firstDiv.title) > parseInt(lastDiv.title)) {
/*     var temp = firstDiv.style.height
    firstDiv.style.height = lastDiv.style.height
    lastDiv.style.height = temp */

    [firstDiv.style.height, lastDiv.style.height] = [lastDiv.style.height, firstDiv.style.height]

    var tempTitle = firstDiv.title
    firstDiv.title = lastDiv.title
    lastDiv.title = tempTitle
  }
  setTimeout(() => {
    firstDiv.classList.remove('on')
    lastDiv.classList.remove('on')
  }, speed)
}

/**
 * 选择排序的可视化呈现
 * @param data 需要排序的数组
 * @param speed
 *
 * 目的，得出排序所涉及到的所有数字的先后顺序
 */
function selectSort (data, speed) {
  var passQueue = getPassQueue(data)
  setTimeout(function timer () {
    var para = passQueue.shift()
      // 传递的参数为每次外循环的下标遍历值
    renderSelectionDiv(para[0], para[1], para[2], para[3])
    if (passQueue.length > 0) {
      setTimeout(timer, speed)
    } else {
      // 解锁重置按钮
      var reset = document.getElementById('reset')
      reset.disabled = false
    }
  }, speed)
}

/**
* 获取排序循环遍历的值
* @param data
* @returns {Array}
*/
function getPassQueue (data) {
  var n = data.length
  var timer = []

  for (var outer = 0; outer < n - 1; ++outer) {
    var queue = []
    for (var inner = outer + 1; inner < n; ++inner) {
      queue.push(inner)
    }
    timer = getMin(outer, queue, timer)
  }
  // 最后一次循环的最后一个值
  timer.push([n - 1, n - 1, 'sort', 1])
  return timer
}

/**
* 提供外层循环的 selected 值，及内层循环数组
* @param out
* @param inQueue
* @param timerQ
*/
function getMin (out, inQueue, timerQ) {
  var outerId = out
  var innerQueue = inQueue
  var minId = outerId

  var timerQueue = timerQ
  // 选中外层循环主值
  timerQueue.push([outerId, outerId, 'select', 1])

  while (innerQueue.length > 0) {
      // 将需要比较的数存入数列
    var innerId = innerQueue.shift()

    var minDiv = data[minId]
    var innerDiv = data[innerId]

    timerQueue.push([outerId, innerId, 'on', 1])

    if (minDiv > innerDiv) {
          // 修改最小值
      timerQueue.push([outerId, minId, 'min', 0])
      timerQueue.push([outerId, minId, 'on', 0])

      minId = innerId

      timerQueue.push([outerId, minId, 'min', 1])
    } else {
      timerQueue.push([outerId, innerId, 'on', 0])
    }
  }

  // 交换
  timerQueue.push([outerId, minId, '', 1])
  swapData(outerId, minId)
  // 去除最小值标识
  timerQueue.push([outerId, minId, 'min', 0])
  timerQueue.push([outerId, minId, 'on', 0])
  // 已排序标识
  timerQueue.push([outerId, outerId, 'sort', 1])
  // 去除选中值标识
  timerQueue.push([outerId, outerId, 'select', 0])
  timerQueue.push([outerId, outerId, 'min', 0])

  return timerQueue
}

/**
* 渲染每一步
* @param main 外循环的主数
* @param div 被比较的用于操作的 div
* @param state 操作涉及的样式名称
* @param on 添加或去除样式、
*/
function renderSelectionDiv (main, div, state, on) {
  var onDiv = document.getElementById(div.toString())
  if (on === 1) {
    if (state === '') {
          //    交换
      var outerDiv = document.getElementById(main.toString())
      swap(outerDiv, onDiv)
    } else {
      onDiv.classList.add(state)
    }
  } else {
    onDiv.classList.remove(state)
  }
}

/**
* 交换 data 中主数和此次循环所得最小值
* @param main
* @param min
*/
function swapData (main, min) {
  var temp = data[main]
  data[main] = data[min]
  data[min] = temp
}

function swap (main, min) {
  var outerDiv = main
  var minDiv = min

  var temp = outerDiv.style.height
  outerDiv.style.height = minDiv.style.height
  minDiv.style.height = temp

  var tempTitle = outerDiv.title
  outerDiv.title = minDiv.title
  minDiv.title = tempTitle
}
