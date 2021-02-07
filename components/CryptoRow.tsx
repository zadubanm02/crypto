import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useCoin from '../hooks/useCoinData'
import Graph from './Graph'
import { MiniGraph } from './MiniGraph'

interface CryptoRowProps {
    symbol:string;
    name:string;
    price:number;
    marketCap:number;
    image:string;
    graphData:[];
    percentage:number;
    color:string;
    onPress:any;
}

export const CryptoRow:React.FC<CryptoRowProps> = ({name, symbol, image, price, percentage, color, graphData, onPress}) => {
    return (
        <>
            <TouchableOpacity style={{margin:2, padding:5, flexDirection:'row', alignItems:'center'}} onPress={()=>onPress()}>
                <Image style={{borderRadius:50, width:35, height:35, marginHorizontal:5}}  source={{
          uri: image,
        }} />
            <View style={{flex:1,flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View style={{justifyContent:'flex-start', marginHorizontal:10}}>
                    <Text style={{color:'#fff', fontWeight:'bold', textTransform:'uppercase', fontSize:16}}>{name}</Text>
                    <Text style={{color:'#fff', textTransform:'uppercase'}}>{symbol}</Text>
                </View>
                <View style={{justifyContent:'center'}}>
                <MiniGraph graphData={graphData}/>
                </View>
                <View style={{justifyContent:'flex-end', marginHorizontal:5}}>
                <Text style={{color:'#fff', fontSize:16, fontWeight:'bold'}}>{price} €</Text>
                <Text style={{color:percentage>0?'#58BF58':'#DD3C7A', textAlign:'right'}}>{percentage.toFixed(2)}%</Text>
                </View>
            </View>
            </TouchableOpacity>
        </>
    )
}

