/**
 * 搜索二叉树
 *
 */
function BinarySearchTree () {
  function Node (key) {
    return {
      key,
      left: null,
      right: null
    }
  }

  var root = null

  this.insert = function (key) {
    var newNode = new Node(key)

    function insertNode (node, newNode) {
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode
        } else {
          insertNode(node.left, newNode)
        }
      } else {
        if (node.right === null) {
          node.right = newNode
        } else {
          insertNode(node.right, newNode)
        }
      }
    }

    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }

  // 中序遍历
  this.inOrderTraverse = function (callback) {
    debugger
    var inOrderTraverseNode = function (node, callback) {
      if (node !== null) {
        inOrderTraverseNode(node.left, callback)
        callback(node.key)
        inOrderTraverseNode(node.right, callback) 
      }
    }
    inOrderTraverseNode(root, callback)
  }

  // 前序遍历
  this.preOrderTraverse = function (callback) {
    var preOrderTraverseNode = function (node, callback) {
      if (node !== null) {
        callback(node.key)
        preOrderTraverseNode(node.left, callback)
        preOrderTraverseNode(node.right, callback)
      }
    }
    preOrderTraverseNode(root, callback)
  }

  // 后序遍历
  this.postOrderTraverse = function (callback) {
    var postOrderTraverseNode = function (node, callback) {
      if (node !== null) {
        postOrderTraverseNode(node.left, callback)
        postOrderTraverseNode(node.right, callback)
        callback(node.key)
      }
    }
    postOrderTraverseNode(root, callback)
  }

  this.min = function () {
    var minNode = function (node) {
      if (node) {
        while (node && node.left !== null) {
          node = node.left
        }
        return node.key
      }
      return null
    }
    return minNode(root)
  }

  this.max = function () {
    var maxNode = function (node) {
      if (node) {
        while (node && node.right !== null) {
          node = node.right
        }
        return node.key
      }
      return null
    }

    return maxNode(root)
  }

  this.search = function (key) {
    var searchNode = function (node, key) {
      if (node === null) return false
      if (key < node.key) {
        return searchNode(node.left, key)
      } else if (key > node.key) {
        return searchNode(node.right, key)
      } else {
        return true
      }
    }
    return searchNode(root, key)
  }

  this.remove = function (key) {
    var removeNode = function (node, key) {
      if (node === null) return null
      if (key < node.key) {
        node.left = removeNode(node.left, key)
        return node
      } else if (key > node.key) {
        node.right = removeNode(node.right, key)
        return node
      } else {
        // 如果是叶节点
        if (node.left === null && node.right === null) {
          node = null
          return node
        }
        // 只有一个子节点的节点
        if (node.left === null) {
          node = node.left
          return node
        } else if (node.right === null) {
          node = node.right
          return node
        }
        // 有两个子节点的节点
        var findMinNode = function (node) {
          while (node && node.left !== null) {
            node = node.left
          }
          return node
        }
        var aux = findMinNode(node.right)
        node.key = aux.key
        node.right = removeNode(node.right, aux.key)
        return node
      }
    }

    root = removeNode(root, key)
  }
}

var tree = new BinarySearchTree()
var nodes = [8,3,10,1,6,14,4,7,13,2]
nodes.forEach(element => {
  tree.insert(element)
})

function printNode (value) {
  console.log(value)
}

tree.inOrderTraverse(printNode)

// console.log(tree.search(1) ? '1 found' : '1 not found')
// console.log(tree.search(8) ? '8 found' : '8 not found')

// console.log(tree.max())

// tree.remove(6)
// tree.remove(5)
// tree.remove(15)
