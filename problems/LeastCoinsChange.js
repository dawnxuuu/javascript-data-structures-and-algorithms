/**
 * 最少硬币找零
 * 
 */
function LeastCoinsChange (coins) {
  var coins = coins
  var cache = {}

  this.makeChange = function (money) {
    var self = this
    if (!money) return []
    if (cache[money]) return cache[money]

    var leastCoins = [], newLeast, newMoney;
    for (var i = 0; i < coins.length; i++) {
      var coin = coins[i]
      newMoney = money - coin
      if (newMoney >= 0) {
        newLeast = self.makeChange(newMoney)
      }
      if (newMoney >= 0 &&
       (newLeast.length < leastCoins.length - 1 || !leastCoins.length) &&
       (newLeast.length || !newMoney)) {
        leastCoins = [coin].concat(newLeast)
        console.log(`面额 ${money}  ===  新的最小硬币${leastCoins}`)
      }
    }

    cache[money] = leastCoins
    return cache[money]
  }
}

var leastCoinsChange = new LeastCoinsChange([1,5,10,25])
console.log(leastCoinsChange.makeChange(35))