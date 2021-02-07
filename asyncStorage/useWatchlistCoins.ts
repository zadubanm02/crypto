import React, { useEffect, useState } from 'react'
import { addToWatchlist, getWatchlist, removeFromWatchlist } from './AsyncStorage'

export const useWatchlistCoins = () => {
    const [watchlist, setWatchlist] = useState([])

    useEffect(() => {
        refreshWatchlist
    }, [])

    async function refreshWatchlist() {
        const data = await getWatchlist()
        setWatchlist(data)
    }

    async function getWatchlistCoins() {
        return await getWatchlist()
    }

    async function addCoinToWatchlist(coinId: string) {
        return await addToWatchlist(coinId).then(refreshWatchlist)
    }

    async function deleteFromWatchList(coinId: string) {
        return await removeFromWatchlist(coinId).then(refreshWatchlist)
    }

    return {
        watchlist,
        addCoinToWatchlist,
        deleteFromWatchList,
        refreshWatchlist,
        getWatchlistCoins
    }
}


