import { FileSystem } from 'expo';
import * as SQLite from 'expo-sqlite'


export const dbName = 'New.db';



export const db = SQLite.openDatabase(dbName,'1.0','desxription',4, (db)=>{console.log(db)});
    
