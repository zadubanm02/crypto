import React, { useEffect, useState } from 'react'
import {getTopTen} from './utils'
export const useGecko = () => {
    const [topTen, setTopTen] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getData = () => {
        const response = getTopTen().then(res=>setTopTen(res))
    }
    useEffect(() => {
        getData()
    }, [])
    return {
        topTen
    } 
}


