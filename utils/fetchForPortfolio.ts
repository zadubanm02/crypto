import axios from "axios"

export const fetchForPortfolio = (ids: string) => {
    return axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${ids}&order=market_cap_desc&per_page=250&page=1&sparkline=false`)
        .then((res) => res.data)
}

//bitcoin%2C%20ethereum%2C%20litecoin