import AsyncStorage from '@react-native-community/async-storage'

export const addToWatchlist = async (coinId: string) => {
    const existingCoins = await AsyncStorage.getItem('Watchlist')
    //@ts-ignore
    let newCoin = JSON.parse(existingCoins);
    if (!newCoin) {
        newCoin = []
    }
    newCoin = [...newCoin, coinId]

    const smt = await AsyncStorage.setItem('Watchlist', JSON.stringify(newCoin))
        .then(() => {
            console.log("Coin saved successfuly")
        })
        .catch((err) => {
            console.log("Error", err)
        })
}

export const getWatchlist = async () => {
    const data = await AsyncStorage.getItem('Watchlist')
    const watchlist = JSON.parse(data)
    return watchlist
}

export const removeFromWatchlist = async (coinId:string) => {
    var toFind;
    const existingItems = await AsyncStorage.getItem('Watchlist')
    //@ts-ignore
    let allItems = JSON.parse(existingItems);
    const finded = allItems.map((it: any) => {
        if (it) {
            if (it == coinId) {
                toFind = it
            }
        }

    })
    const indexOfFinded = allItems.indexOf(toFind)
    allItems.splice(indexOfFinded, 1)
    const smt = await AsyncStorage.setItem('Watchlist', JSON.stringify(allItems))
        .then(() => {
            console.log("Watchlist deleted successfuly")
        })
        .catch((err) => {
            console.log("Error", err)
        })
}

