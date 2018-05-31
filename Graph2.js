var graph = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 1, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
]
var INF = Number.MAX_SAFE_INTEGER

function dijkstra (graph, src) {
  var dist = []
  var visited = []
  var length = graph.length

  for (let i = 0; i < length; i++) {
    dist[i] = INF
    visited[i] = false
  }
  dist[src] = 0

  function minDisttance (dist, visited) {
    var min = INF
    var minIndex = -1

    for (let v = 0; v < dist.length; v++) {
      if (visited[v] === false && dist[v] <= min) {
        min = dist[v]
        minIndex = v
      }
    }
    return minIndex
  }

  for (let i = 0; i < length - 1; i++) {
    var u = minDisttance(dist, visited)
    visited[u] = true
    for (let v = 0; v < length; v++) {
      if (!visited[v] &&
        graph[u][v] !== 0 &&
        dist[u] !== INF &&
        dist[u] + graph[u][v] < dist[v]) {
        dist[v] = dist[u] + graph[u][v]
      }
    }
  }

  return dist
}

console.log(dijkstra(graph, 0))
