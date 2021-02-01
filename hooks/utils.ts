import axios from 'axios'

const apiKey = 'c7ea99fc38fe350af471d0bda256691f'

export const getCoinData = async () => {
   let res = await axios.get(`https://api.nomics.com/v1/currencies/ticker?key=${apiKey}&ids=BTC,ETH&interval=1h,1d&convert=EUR&per-page=7&page=1`)
   return res.data
}