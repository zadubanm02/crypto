import axios from 'axios'

const baseUri = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=2`
const base = `https://api.coingecko.com/api/v3/coins/markets`

export const getTopTen = (page: number) => {
    return axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=15&page=${page}price_change_percentage=24h&sparkline=true`)
        .then((res) => res.data)

}