import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import moment from 'moment'
// import InitialRedeemTransaction from './Feed'

import AtomicSwap from './atomicswap'



const CheckMark = () => (
  <div className="cd-timeline-img cd-picture">
    <img src="https://images.emojiterra.com/emojione/v2/512px/2705.png" alt="Picture" />
  </div>
)

const TxButton = (props) => (
  <a href={props.transaction.url} className="cd-read-more">See transaction</a>
)

const TimeSpan = (props) => (
  <span className="cd-date">Mined { moment(props.transaction.blocktime * 1000).fromNow() }</span>
)

const InitialFundTransaction = (props) => (
  <div className="cd-timeline-block">
    <CheckMark />

    <div className="cd-timeline-content">
      <h2>{ props.info.initialChain.chain } fund transaction</h2>
      <p><code>{ props.info.initialChain.chain.toLowerCase() }atomicswap initiate { props.info.initialChain.receiveAddress || "<address>" } { props.info.initialChain.amount || "<amount>" }</code></p>
      <TxButton transaction={props.transaction} />
      <TimeSpan transaction={props.transaction} />
    </div>
  </div>
)

const ParticipatingFundTransaction = (props) => (
  <div className="cd-timeline-block">
    <CheckMark />

    <div className="cd-timeline-content">
      <h2>{ props.info.secondaryChain.chain } fund transaction</h2>

      <p><code>{ props.info.secondaryChain.chain.toLowerCase() }atomicswap participate { (props.info.secondaryChain.receiveAddress) || "<address>" } { (props.info.secondaryChain.amount) || "<amount>" } { props.info.secretHash || "<secret hash>"}</code></p>
      <TxButton transaction={props.transaction} />
      <TimeSpan transaction={props.transaction} />
    </div>
  </div>
)

const ParticipatingRedeemTransaction = (props) => (
  <div className="cd-timeline-block">
    <CheckMark />

    <div className="cd-timeline-content">
      <h2>{ props.transaction.chain } redeem transaction</h2>


      <p><code>{ props.info.secondaryChain.chain.toLowerCase() }atomicswap redeem {"<contract>"} {"<contract hash>"} { props.info.secretHash || "<secret>"}</code></p>
      <TxButton transaction={props.transaction} />
      <TimeSpan transaction={props.transaction} />
    </div>
  </div>
)


const InitialRedeemTransaction = (props) => (
  <div className="cd-timeline-block">
    <CheckMark />

    <div className="cd-timeline-content">
      <h2>{ props.transaction.chain } redeem transaction</h2>

      <p><code>{ props.info.initialChain.chain.toLowerCase() }atomicswap redeem {"<contract>"} {"<contract hash>"} { props.info.secretHash || "<secret>"}</code></p>
      <TxButton transaction={props.transaction} />
      <TimeSpan transaction={props.transaction} />
    </div>
  </div>
)

class App extends Component {
  constructor(props) {
    var result = { "initialChain": {}, "secondaryChain": {}},
        tmp = [],
        tmp2 = [];
    decodeURIComponent(window.location.search)//"?initial_insightUrl=https%3A%2F%2Finsight.bitpay.com&initial_amount=0.13370000&initial_receiveAddress=3HRWsfjpBHiJ7hC3jKJV5nbHMeBgoCPHDq&secondary_insightUrl=https%3A%2F%2Finsight.litecore.io&secondary_amount=10.00000000&secondary_receiveAddress=ML9CNJBtSPMABYcCQV58P2t4M7MpPRJK95")
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          tmp2 = tmp[0].split("_")
          result[tmp2[0] + "Chain"][tmp2[1]] = decodeURIComponent(tmp[1])
          // if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });

    AtomicSwap(result, (data) => {
      this.setState(data);
    })
    super(props);
    this.state = {
      info: result
    };
  }


  render() {
    console.log(JSON.stringify(this.state))
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <div>

          { this.state &&

          	<section id="cd-timeline" className="cd-container">

              { this.state.initialChain && this.state.initialChain.fundTx &&
                <InitialFundTransaction transaction={this.state.initialChain.fundTx} info={this.state.info}/>
              }
              { this.state.initialChain && this.state.initialChain.fundTx &&
                <ParticipatingFundTransaction transaction={this.state.secondaryChain.fundTx} info={this.state.info}/>
              }
              { this.state.initialChain && this.state.initialChain.fundTx &&
                <ParticipatingRedeemTransaction transaction={this.state.secondaryChain.redeemTx} info={this.state.info}/>
              }
              { this.state.initialChain && this.state.initialChain.fundTx &&
            		<InitialRedeemTransaction transaction={this.state.initialChain.redeemTx} info={this.state.info}/>
              }

          	</section>
          }
        </div>

      </div>
    );
  }
}

export default App;
