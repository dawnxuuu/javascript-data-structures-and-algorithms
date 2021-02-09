const print = require('../utils/print')

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
        console.log(`面额 ${money}  ===  新的最少硬币${leastCoins}`)
      }
    }

    cache[money] = leastCoins
    return cache[money]
  }
}

// var leastCoinsChange = new LeastCoinsChange([1,5,11])
// var res = leastCoinsChange.makeChange(15)
// console.log(res)

/**
 * 最少硬币找零 解法2
 * 
 */
function LeastCoinsChange2 (coins, totalMoney) {
  let dp = new Array( totalMoney + 1 ).fill( Infinity );
  dp[0] = 0;
  
  for (let m = 1; m <= totalMoney; m++) {
    print(m, '小钱m:', m)
    for (let coin of coins) {
      print(m, 'coin:', coin, 'm-coin:', m - coin)
      if (m - coin >= 0) {
        print(m, `dp[${m}]:`, dp[m], `dp[${m} - ${coin}] + 1=`, dp[m - coin] + 1)
        dp[m] = Math.min(dp[m], dp[m - coin] + 1);
        print(m, `此轮dp[${m}]`, dp[m])
      }
    }

    print(m, 'dp', dp)
  }
  
  return dp[totalMoney] === Infinity ? -1 : dp[totalMoney];
}

// var res = LeastCoinsChange2([1,5,11], 15)

/**
 * 最少硬币找零 解法3
 * 
 */
function LeastCoinsChange3 (coins, totalMoney) {
  const dps = new Array(totalMoney + 1).fill(Infinity)
  dps[0] = 0
  let moneyToCoinsCache = {}

  for (let coin of coins) {
    print(coin, '面额coin:', coin)
    for (let m = coin; m <= totalMoney; m++) {
      print(coin, '金额m:', m, `dps[${m}]:`, dps[m], `dps[m-coin]+1:`, dps[m - coin] + 1)
      dps[m] = Math.min(dps[m], dps[m - coin] + 1)
    }

    print(coin, 'dps', dps)
  }

  return dps[totalMoney] === Infinity ? '-1' : dps[totalMoney]
}

var res = LeastCoinsChange3([1,5,11], 15)