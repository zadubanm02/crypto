import React, { useEffect, useState } from 'react'
import { getTopTen } from './utils'
export const useGecko = () => {
    const [topTen, setTopTen] = useState([])
    const [page, setPage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState(false)
    const getData = async () => {
        setIsLoading(true)
        const newCoins = await getTopTen(page)
        //@ts-ignore
        setTopTen(oldCoins => [...oldCoins, ...newCoins])
        setPage(page + 1)
        setIsLoading(false)
    }
    const refresh = async () => {
        setPage(1)
        setIsLoading(true)
        const newCoins = await getTopTen(1)
        //@ts-ignore
        setTopTen(newCoins)
        setPage(page + 1)
        setIsLoading(false)
    }
    useEffect(() => {
        getData()
    }, [])
    return {
        getData,
        topTen,
        isLoading,
        refresh
    }
}


