import {db} from './constants'



export class DatabaseInit {

    public init() {
        console.log("DB", db)
        try {
            return db.transaction(tx=>{
                //List Table
                tx.executeSql(`
                    CREATE TABLE IF NOT EXISTS Portfolio(
                        coin_id TEXT PRIMARY KEY NOT NULL,
                        value REAL
                    );`
                )
                console.log('Table Portfolio Created Successfuly')
                tx.executeSql(`
                CREATE TABLE IF NOT EXISTS Watchlist(
                  watchlist_id TEXT PRIMARY KEY NOT NULL,
                );
              `,  (txObject, result) => console.log('successfully created', result),
              (txObject, err) => console.log('error occurred', err))
              console.log('Table Watchlist Created Successfuly')
              
            })
        } catch (error) {
            console.log("Failed to create tables", error)
        }
       
    }
}