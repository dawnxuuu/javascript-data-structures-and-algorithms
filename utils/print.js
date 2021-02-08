const print = function (spaceCount) {
  var spaces = ''
  var realArgs = Array.from(arguments).slice(1)

  if (spaceCount === 0) return console.log(...realArgs)

  while (spaceCount--) spaces+=' '
  console.log(spaces, ...realArgs)
}

module.exports = print