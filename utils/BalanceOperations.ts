import { db } from "./constants";

export const getPortfolioSQL = `SELECT coin_id as id, value, done FROM Portfolio ORDER BY value;`
export const addToPortfolioSQL = 'INSERT INTO Portfolio (value, coin_id) VALUES (?, ?);'
export const updatePortfolioSQL = 'UPDATE Portfolio SET value = ? WHERE coin_id = ?;'
export const deleteFromPortfolioSQL = 'DELETE FROM Portfolio WHERE coin_id = ?;'
export const deleteWatchlistSQL = 'DELETE FROM Watchlist WHERE watchlist_id = ?;'
export const addToWatchListSQL = 'INSERT INTO Watchlist (watchlist_id) VALUES (?);'
//export const getWatchlistSQL = `SELECT * FROM Watchlist;`
export const getWatchlistSQL = `SELECT watchlist_id as id FROM Watchlist ORDER BY id DESC;`


export const addCoinToPortfolio = (sql:string,value:number, coinId:string) => {
    return new Promise((resolve, reject)=> db.transaction(tx=>{
        tx.executeSql(sql, [value, coinId], (_,{rows}) => resolve(rows._array), reject)
    }))
}

export const updateCoin = (sql:string,value:number,coinId:string) => {
    return new Promise((resolve, reject)=> db.transaction(tx=>{
        tx.executeSql(sql, [value,coinId], (_,{rows}) => resolve(rows._array), reject)
    }))
}

export const deleteCoinFromPortfolio = (sql:string,coinId:string) => {
    return new Promise((resolve, reject)=> db.transaction(tx=>{
        tx.executeSql(sql, [coinId]);
    }))
}

export const getPortfolio = async (sql:string) => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(sql, [], (_, { rows }) => resolve(rows._array), reject)
    }))
  }

export const getWatchlist = async (sql:string) => {
    return new Promise((resolve, reject) => db.transaction(tx => {
      tx.executeSql(sql, [],
    (_, { rows }) => resolve(rows._array),
      (_, err) => reject(err))
    }))
}

export const addToWatchlist = (sql:string, coinId:string) => {
    return new Promise((resolve, reject)=> db.transaction(tx=>{
        tx.executeSql(sql, [coinId], (_,{rows}) => resolve(rows._array),
        (_, err) => reject(err))
    }))
}

export const deleteWatchlist = (sql:string, coinId:string) => {
    return new Promise((resolve, reject)=> db.transaction(tx=>{
        tx.executeSql(sql, [coinId], (_,{rows}) => resolve(rows._array),
        (_, err) => reject(err))
    }))
}
  