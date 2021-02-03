import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useCoin from '../hooks/useCoinData'
import { CardGraph } from './CardGraph'
import Graph from './Graph'
import { MiniGraph } from './MiniGraph'

interface CryptoCardProps {
    id:string;
    name:string;
    value:number;
    marketCap:number;
    color:string;
    graphData:[];
    onPress:any;
}

const CryptoCard:React.FC<CryptoCardProps> = ({id, name, value, marketCap, color, graphData, onPress}) => {
    
    return (
        <>
            <TouchableOpacity onPress={onPress} style={{backgroundColor:'#2B2C5F', padding:10, borderRadius:20, margin:10}}>
                <View testID={'ValueContainer'} style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                <Text style={{color:'#fff',padding:10, fontWeight:'bold',fontSize:20, textTransform: 'uppercase'}}>{name}</Text>
                <Text style={{color:`#fff`,paddingHorizontal:10, fontWeight:'bold', fontSize:16, textTransform: 'uppercase'}}>{id}</Text>
                </View>
                
                <View>
                <Text style={{color:'#fff', padding:10, backgroundColor:'#1A153A',borderRadius:20, fontWeight:'bold',fontSize:20, textTransform: 'uppercase'}}>{value} eur</Text>
                <Text style={{color:'#fff',paddingHorizontal:10, }}>{marketCap} $</Text>
                </View>
                
                </View>
                <View>
                   <CardGraph graphData={graphData}/>
                </View>
            </TouchableOpacity>
        </>
    )
}

export default CryptoCard
