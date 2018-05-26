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
  var vertices = []  //顶点
  var adjList = new Dictionary()  //边

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

    for (var i = 0; i < vertices.length; i++){
      d[vertices[i]] = 0
      pred[vertices[i]] = null      
    }

    while (!queue.isEmpty()) {
      var u = queue.dequeue()
      var neighbors = adjList.get(u)
      color[u] = 'grey'
      for (var i = 0; i < neighbors.length; i++) {
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
}

// 实例化一个graph
function generateGraph(vertices) {
  var graph = new Graph()
  for (var i = 0; i < vertices.length; i++) {
    graph.addVertex(vertices[i])
  }
  graph.addEdge('A', 'B')
  graph.addEdge('A', 'C')
  graph.addEdge('A', 'D')
  graph.addEdge('C', 'D')
  graph.addEdge('C', 'G')
  graph.addEdge('D', 'G')
  graph.addEdge('D', 'H')
  graph.addEdge('B', 'E')
  graph.addEdge('B', 'F')
  graph.addEdge('E', 'I')

  return graph
}

var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
const graph = generateGraph(myVertices)
console.log(graph.toString())

// graph.bfs('A', printNode)

function findShortestPath (graph, vertices, target) {
  var shortestPathA = graph.BFS(target)
  console.log(shortestPathA)
  
  var fromVertex = target
  for (var i = 1; i < vertices.length; i++) {
    var toVertex = vertices[i]
    var path = []
    for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]){
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



