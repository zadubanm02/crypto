import React, { useEffect, useState } from 'react'
import { Portfolio } from '../utils/Portfolio'
import { addToPortfolio, removeFromPortfolio, editPortfolio, getPortfolio } from './PortfolioAsyncStorage'

export const usePortfolioCoins = () => {
    const [portfolio, setPortfolio] = useState([])

    useEffect(() => {
        refreshPortfolio()
    }, [])

    async function refreshPortfolio() {
        const data = await getPortfolio()
        setPortfolio(data)
    }

    async function getPortfolioCoins() {
        return await getPortfolio()
    }

    async function addCoinToPortfolio(coin: Portfolio) {
        return await addToPortfolio(coin).then(refreshPortfolio)
    }

    async function deleteFromPortfolio(coinId: string) {
        return await removeFromPortfolio(coinId).then(refreshPortfolio)
    }

    async function editCoin(coin: Portfolio) {
        return await editPortfolio(coin).then(refreshPortfolio)
    }

    return {
        portfolio,
        addCoinToPortfolio,
        deleteFromPortfolio,
        editCoin,
        refreshPortfolio,
        getPortfolioCoins
    }
}


