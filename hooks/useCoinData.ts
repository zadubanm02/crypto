import React, { useEffect, useRef, useState } from 'react'
import {getCoinData} from './utils'

const useCoin = () => {
    const [coin, setCoin] = useState<any>()
    useEffect(() => {
        const data = getCoinData()
        setCoin(data)
        console.log("Coin", coin)
      }, [coin]);


    return (
        {coin}
    )
}

export default useCoin
