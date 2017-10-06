
// var bitcore = require('bitcore-lib');
var explorers = require('./lib/index');
var insightBitcoin = new explorers.Insight('https://insight.bitpay.com');
var insightLitecoin = new explorers.Insight('https://insight.litecore.io');
// var insightDecred = new explorers.Insight('https://mainnet.decred.org');
//
// var insightBitcoinTest = new explorers.Insight('https://test-insight.bitpay.com');
// var insightDecredTest = new explorers.Insight('https://testnet.decred.org');
// var insightLitecoinTest = new explorers.Insight('https://testnet.litecore.io');
//
//

function AtomicSwap(props, data) {
  everthingAbout(props, data)
}


var everthingAbout = function(props, cb) {
  var data = {}
  aboutAddress(props.initialChain.receiveAddress, insightLitecoin, function(receiveData) {

    data.initialChain = receiveData

    data.initialChain.fundTx.chain = 'LTC'
    data.initialChain.redeemTx.chain = 'LTC'
    aboutAddress(props.secondaryChain.receiveAddress, insightBitcoin, function(receive2Data) {
      data.secondaryChain = receive2Data
      data.secondaryChain.fundTx.chain = 'BTC'
      data.secondaryChain.redeemTx.chain = 'BTC'
      data.info = props
      data.info.secret = data.initialChain.secret
      data.info.secretHash = data.initialChain.secretHash
      cb(data)
    })
  })
}

var checkAbout = function(data) {
  var check = true
  if(data.initialChain.secretHash !== data.secondaryChain.secretHash) {
    check = false
  }

  if(data.initialChain.secret !== data.secondaryChain.secret) {
    check = false
  }

  return check
}


var aboutAddress = function(xaddress, insight, cb) {
  insight.getAddress(xaddress, function(err, address) {
    var data = {}
    data.address = xaddress

    if(err) {
      data.err = err
      return cb(data)
    }
    var txs = address.transactions

    insight.getTransaction(txs[1], function(err, tx) {
      if(err) {
        data.err = err
        return cb(data)
      }
      data.fundTx = tx

      var spentTxId = tx.vout[1].spentTxId

      if(spentTxId) {
        insight.getTransaction(spentTxId, function(err, tx) {
          if(err) {
            data.err = err
            cb(data)
          }
          data.redeemTx = tx
          data.secret = tx.vin[0].scriptSig.asm.split(' ')[2]
          data.secretHash = tx.vin[0].scriptSig.asm.split(' ')[4].substring(6, 46)
          cb(data)
        })
      } else {
        cb(data)
      }
    })
  })
}


module.exports = AtomicSwap
