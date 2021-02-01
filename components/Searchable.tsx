import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { items } from '../screens/items'
import { SearchableRow } from './SearchableRow'

export const Searchable = ({onPress}) => {
    return (
        <ScrollView style={{maxHeight:250}}>
            {items && items.map((item:any)=>{
                return (
                    <SearchableRow onPress={{}} id={item.id} symbol={item.symbol} name={item.name}/>
                )
            })}
           
           {/* <SearchableRow onPress={{}} id={"ETH"} name={"ethereum"}/> */}
        </ScrollView>
    )
}

