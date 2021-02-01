import React, { useEffect, useState } from 'react'
import { addToWatchlist, addToWatchListSQL, deleteWatchlist, deleteWatchlistSQL, getWatchlist, getWatchlistSQL } from './BalanceOperations'
import { Watchlist } from './Watchlist'

export function useWatchlist(){
    const [watchlist, setWatchlist] = useState<Watchlist[]>([])
    useEffect(() => {
      refreshWatchlist()
    }, [])

    async function refreshWatchlist() {
        const watchlistData = await getWatchlist(getWatchlistSQL)
        //@ts-ignore
        setWatchlist(watchlistData);
    }

    async function deleteFromWatchlist(watchlistId:string): Promise<void> {
        await deleteWatchlist(deleteWatchlistSQL, watchlistId).then(refreshWatchlist);
       
      }

      async function addCoinToWatchlist(watchlistId:string): Promise<void> {
        await addToWatchlist(addToWatchListSQL, watchlistId).then(refreshWatchlist);
      
      }
    return {
        watchlist,
        deleteFromWatchlist,
        addCoinToWatchlist,
    }
        
    
}



