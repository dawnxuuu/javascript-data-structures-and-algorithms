function Dictionary () {
  var items = {}
  this.has = function (key) {
    return key in items
  }
  this.set = function (key, value) {
    items[key] = value
  }
  this.get = function (key) {
    return this.has(key) ? items[key] : undefined
  }
  this.delete = function (key) {
    if (this.has(key)) {
      delete items[key]
    }
    return false
  }
  this.values = function () {
    var values = []
    for (var k in items) {
      values.push(items[k])
    }
    return values
  }
}

function Queue () {
  let items = []
  this.enqueue = function (element) {
    items.push(element)
  }
  this.dequeue = function () {
    return items.shift()
  }
  this.isEmpty = function () {
    return items.length === 0
  }
}

function printNode (value) {
  console.log('Visited vertex: ' + value)
}

function Graph () {
  var vertices = []  // 顶点
  var adjList = new Dictionary()  // 边

  // 添加顶点
  this.addVertex = function (v) {
    vertices.push(v)
    adjList.set(v, [])
  }

  // 添加边
  this.addEdge = function (v, w) {
    adjList.get(v).push(w)
    adjList.get(w).push(v)
  }

  this.toString = function () {
    var s = ''
    for (var i = 0; i < vertices.length; i++) {
      s += vertices[i] + '->'
      var neighbors = adjList.get(vertices[i])
      for (var j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' '
      }
      s += '\n'
    }
    return s
  }

  function initializeColor () {
    var color = []
    for (var i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white'
    }
    return color
  }

  this.bfs = function (v, callback) {
    var color = initializeColor()
    var queue = new Queue()
    queue.enqueue(v)

    while (!queue.isEmpty()) {
      var u = queue.dequeue()
      var neighbors = adjList.get(u)
      color[u] = 'grey'
      for (var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey'
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
      if (callback) {
        callback(u)
      }
    }
  }

  this.BFS = function (v) {
    var color = initializeColor()
    var queue = new Queue()
    var d = []
    var pred = []
    queue.enqueue(v)

    for (var i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0
      pred[vertices[i]] = null
    }

    while (!queue.isEmpty()) {
      var u = queue.dequeue()
      var neighbors = adjList.get(u)
      color[u] = 'grey'
      for (i = 0; i < neighbors.length; i++) {
        var w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey'
          d[w] = d[u] + 1
          pred[w] = u
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
    }
    return {
      distances: d,
      predecessors: pred
    }
  }

  this.dfs = function (callback) {
    var color = initializeColor()
    for (var i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, callback)
      }
    }

    function dfsVisit (u, color, callback) {
      color[u] = 'grey'
      if (callback) {
        callback(u)
      }
      var neighbors = adjList.get(u)
      for (var i = 0; i < neighbors.length; i++) {
        var w = neighbors[i]
        if (color[w] === 'white') {
          dfsVisit(w, color, callback)
        }
      }
      color[u] = 'black'
    }
  }

  this.DFS = function () {
    var color = initializeColor()
    var d = []
    var f = []
    var p = []
    var time = 0

    for (let i = 0; i < vertices.length; i++) {
      f[vertices[i]] = 0
      d[vertices[i]] = 0
      p[vertices[i]] = null
    }
    for (let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        DFSVisit(vertices[i], color, d, f, p)
      }
    }
    return {
      discovery: d,
      finished: f,
      predecessors: p
    }

    function DFSVisit (u, color, d, f, p) {
      console.log('discovered ' + u)
      color[u] = 'grey'
      d[u] = ++time
      var neighbors = adjList.get(u)
      for (let i = 0; i < neighbors.length; i++) {
        var w = neighbors[i]
        if (color[w] === 'white') {
          p[w] = u
          DFSVisit(w, color, d, f, p)
        }
      }
      color[u] = 'black'
      f[u] = ++time
      console.log('explored ' + u)
    }
  }
}

// 实例化一个graph
function generateGraph (vertices, edges) {
  var graph = new Graph()

  vertices.forEach(element => {
    graph.addVertex(element)
  })

  edges.forEach(element => {
    graph.addEdge(element[0], element[1])
  })

  return graph
}

// 广度优先搜索
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
var edges = [['A', 'B'], ['A', 'C'], ['A', 'D'], ['C', 'D'], ['C', 'G'], ['D', 'G'], ['D', 'H'], ['B', 'E'], ['B', 'F'], ['E', 'I']]
const graph = generateGraph(myVertices, edges)
console.log(graph.toString())

graph.bfs('A', printNode)

function findShortestPath (graph, vertices, target) {
  var shortestPathA = graph.BFS(target)
  console.log(shortestPathA)

  var fromVertex = target
  for (var i = 1; i < vertices.length; i++) {
    var toVertex = vertices[i]
    var path = []
    for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
      path.push(v)
    }
    path.push(fromVertex)
    var s = path.pop()
    while (path.length !== 0) {
      s += ' - ' + path.pop()
    }
    console.log(s)
  }
}

findShortestPath(graph, myVertices, 'A')

// 深度优先搜索
/*
var myVertices2 = ['A', 'B', 'C', 'D', 'E', 'F']
var edges2 = [['A', 'C'], ['A', 'D'], ['B', 'D'], ['B', 'E'], ['C', 'F'], ['F', 'E']]
const graph2 = generateGraph(myVertices2, edges2)
console.log(graph2.toString())

graph2.dfs(printNode)

graph2.DFS()
*/
