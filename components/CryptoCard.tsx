import React from 'react'
import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import useCoin from '../hooks/useCoinData'
import { CardGraph } from './CardGraph'
import Graph from './Graph'
import { MiniGraph } from './MiniGraph'


const CryptoCard = ({id, name, value, marketCap, color, graphData, onPress, image}) => {
    
    return (
        <>
            <TouchableOpacity onPress={onPress} style={{backgroundColor:'#252836', padding:10, borderRadius:20, margin:10}}>
                <View testID={'ValueContainer'} style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image style={{borderRadius:50, width:35, height:35, marginHorizontal:5}}  source={{
                    uri: image,
                }}  />
                <Text style={{color:'#fff',padding:10, fontWeight:'bold',fontSize:20, textTransform: 'uppercase'}}>{name}</Text>
                </View>
                <Text style={{color:`#fff`,paddingHorizontal:10, fontWeight:'bold', fontSize:16, textTransform: 'uppercase'}}>{id}</Text>
                </View>
                
                <View>
                <Text style={{color:'#fff', padding:10, backgroundColor:'#1F1D2B',borderRadius:20, fontWeight:'bold',fontSize:20, textTransform: 'uppercase', textAlign:'center'}}>{value.toFixed(3)} €</Text>
                <Text style={{color:'#fff',paddingHorizontal:10, }}>{marketCap} €</Text>
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
