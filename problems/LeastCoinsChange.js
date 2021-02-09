const print = require('../utils/print')

// 动态规划

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
  // 给每个面额留一个位置，用来记录该面额所需的最少硬币数
  const dps = new Array(totalMoney + 1).fill(Infinity)
  // 面额0需硬币0
  dps[0] = 0

  // 遍历不同面额的硬币
  for (let coin of coins) {
    print(coin, '面额coin:', coin)
    // 从面额数字开始一直到目标钱数，遍历每个钱数
    for (let m = coin; m <= totalMoney; m++) {
      print(coin, '金额m:', m, `dps[${m}]:`, dps[m], `dps[m-coin]+1:`, dps[m - coin] + 1)
      // dps[m - coin] + 1解释为：金额减去当前面额得到的金额所需最少硬币数，再加一张当前面额，会有一个结果。
      // dps[m]解释为：之前已经算出来的当前金额所需的最少硬币数
      // 这两个取最小值，就是当前金额所需的最小硬币数
      dps[m] = Math.min(dps[m], dps[m - coin] + 1)
    }

    print(coin, 'dps', dps)
  }

  // 最终看看目标金额所需最小硬币数是否已算过，若算过即是最终结果
  return dps[totalMoney] === Infinity ? '-1' : dps[totalMoney]
}

var res = LeastCoinsChange3([1,5,11], 15)