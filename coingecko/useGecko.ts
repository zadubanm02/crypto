import React, { useEffect, useState } from 'react'
import { getTopTen } from './utils'
export const useGecko = () => {
    const [topTen, setTopTen] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getData = () => {
        setIsLoading(true)
        const response = getTopTen().then(res => { setTopTen(res); setIsLoading(false) })
    }
    useEffect(() => {
        getData()
    }, [])
    return {
        topTen,
        isLoading
    }
}


