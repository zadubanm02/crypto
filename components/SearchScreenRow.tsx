import React from 'react'
import { View, Text, Image, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useCoin from '../hooks/useCoinData'
import Graph from './Graph'
import { MiniGraph } from './MiniGraph'

interface CryptoRowProps {
    symbol:string;
    name:string;
    image:string;
    onPress:any;
}

export const SearchScreenRow:React.FC<CryptoRowProps> = ({name, symbol, image, onPress}) => {
    return (
        <>
            <Pressable style={{margin:5, padding:5, flexDirection:'row', alignItems:'center'}} onPress={()=>onPress()}>
                <Image style={{borderRadius:50, width:35, height:35, marginHorizontal:5}}  source={{
          uri: image,
        }} />
            <View style={{flex:1,flexDirection:'row', alignItems:'center', marginHorizontal:10}}>
               
                    <Text style={{color:'#fff', fontWeight:'bold', textTransform:'uppercase', fontSize:16}}>{symbol}</Text>
                    <Text style={{color:'#fff',fontWeight:'bold', textTransform:'uppercase'}}> - {name}</Text>
            </View>
            </Pressable>
        </>
    )
}

