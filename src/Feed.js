import React from 'react'
import { Feed } from 'semantic-ui-react'

const image = '/assets/images/avatar/small/laura.jpg'
const date = '3 days ago'
const summary = 'Laura Faucet created a post'
const extraText = "Have you seen what's going on in Israel? Can you believe it."

const Transaction = (props) => (
  <div className="cd-timeline-block">
    <div className="cd-timeline-img cd-picture">
      <img src="https://images.emojiterra.com/emojione/v2/512px/2705.png" alt="Picture" />
    </div>

    <div className="cd-timeline-content">
      <h2>Initial redeem transaction</h2>
      <p>{ props.transaction.valueOut }</p>
      <code>{ props.transaction.valueOut }</code>
      <a href={"https://insight.bitpay.com/tx/" +  props.transaction.txid} className="cd-read-more">See transaction</a>
      <span className="cd-date">{ props.transaction.time}</span>
    </div>
  </div>
)

export default Transaction
// <Feed>
//   <Feed.Event
//     image={image}
//     date={date}
//     summary={"Initial transaction funded"}
//     extraText={"0.15 BTC funded by the initiator"}
//   />
//
//   <Feed.Event>
//     <Feed.Label image={image} />
//     <Feed.Content
//       date={date}
//       summary={"Participant transaction funded"}
//       extraText={"1 LTC funded by the participant"}
//     />
//   </Feed.Event>
//
//   <Feed.Event>
//     <Feed.Label image={image} />
//     <Feed.Content
//       date={date}
//       summary={"Initial transaction redeemed"}
//       extraText={"1 LTC redeemed to initiators receiving address"}
//     />
//   </Feed.Event>
//
//   <Feed.Event>
//     <Feed.Label image={image} />
//     <Feed.Content
//       date={date}
//       summary={"Initial transaction redeemed"}
//       extraText={"0.15 BTC redeemed to participants receiving address"}
//     />
//   </Feed.Event>
// </Feed>
