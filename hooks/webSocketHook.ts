// import React, { useEffect, useRef, useState } from 'react'

// const useSocket = () => {
//     const [coin, setCoin] = useState<number>()
//     const [isPaused, setPause] = useState(false);
//     const [logData, setLogData] = useState<any>([])
//     const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
//     useEffect(() => {
//         // ws.onopen = () => console.log('ws opened');
//         // ws.onclose = () => console.log('ws closed');
//         let coinPrices:any = [];
//             ws.onmessage = e => {
//                 setTimeout(() => {
//                     const message = JSON.parse(e.data);
//                     // coinPrices = [...coinPrices, message]
//                     //   setLogData(coinPrices)
//                       if(message.p === undefined ){
//                           console.log("Undefined")
//                       }else{
//                         setCoin(message.p)
//                       }
//                       console.log('e', message);
//                 }, 5000);
//               };
    
//         return () => {
//           ws.close();
//         }
//       }, [logData, coin]);


//     return (
//         {coin, logData}
//     )
// }

// export default useSocket
