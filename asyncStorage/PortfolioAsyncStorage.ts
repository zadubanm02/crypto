import AsyncStorage from '@react-native-community/async-storage'
import { Portfolio } from '../utils/Portfolio';

export const addToPortfolio = async (coin: Portfolio) => {
    const existingCoins = await AsyncStorage.getItem('Portfolio')
    //@ts-ignore
    let newCoin = JSON.parse(existingCoins);
    if (!newCoin) {
        newCoin = []
    }
    newCoin = [...newCoin, coin]

    const smt = await AsyncStorage.setItem('Portfolio', JSON.stringify(newCoin))
        .then(() => {
            console.log("Coin saved successfuly")
        })
        .catch((err) => {
            console.log("Error", err)
        })
}

export const getPortfolio = async () => {
    const data = await AsyncStorage.getItem('Portfolio')
    console.log("Data", data)
    if (data) {
        const portfolio: any = JSON.parse(data)
        return portfolio
    }
}

export const removeFromPortfolio = async (coinId: string) => {
    var toFind;
    const existingItems = await AsyncStorage.getItem('Portfolio')
    //@ts-ignore
    let allItems = JSON.parse(existingItems);
    const finded = allItems.map((it: any) => {
        if (it) {
            if (it.id == coinId) {
                toFind = it
            }
        }

    })
    const indexOfFinded = allItems.indexOf(toFind)
    allItems.splice(indexOfFinded, 1)
    const smt = await AsyncStorage.setItem('Portfolio', JSON.stringify(allItems))
        .then(() => {
            console.log("Watchlist deleted successfuly")
        })
        .catch((err) => {
            console.log("Error", err)
        })
}

export const editPortfolio = async (coin: Portfolio) => {
    var toFind;
    const existingItems = await AsyncStorage.getItem('Portfolio')
    //@ts-ignore
    let allItems = JSON.parse(existingItems);
    const finded = allItems.map((it: any) => {
        if (it) {
            if (it.id == coin.id) {
                toFind = it
            }
        }

    })
    const indexOfFinded = allItems.indexOf(toFind)
    allItems.splice(indexOfFinded, 1)
    const smt = await AsyncStorage.setItem('Portfolio', JSON.stringify(allItems))
        .then(() => {
            console.log("Watchlist deleted successfuly")
        })
        .catch((err) => {
            console.log("Error", err)
        })

    const existingCoins = await AsyncStorage.getItem('Portfolio')
    //@ts-ignore
    let newCoin = JSON.parse(existingCoins);
    if (!newCoin) {
        newCoin = []
    }
    newCoin = [...newCoin, coin]

    const smq = await AsyncStorage.setItem('Portfolio', JSON.stringify(newCoin))
        .then(() => {
            console.log("Coin saved successfuly")
        })
        .catch((err) => {
            console.log("Error", err)
        })

}

