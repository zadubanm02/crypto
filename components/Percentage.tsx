import React from 'react'
import { View, Text, Image } from 'react-native'

interface PercentageProps {
    value:number;
    symbol:string;
    image:string;
   
}

export const Percentage:React.FC<PercentageProps> = ({value, symbol, image}) => {
    return (
        <View style={{paddingVertical:10,marginHorizontal:10, margin:10, alignItems:'center', justifyContent:'center'}}>
        <Text style={{color:'#fff', fontSize:32, fontWeight:'bold'}}>{value.toFixed(2)}%</Text>
        <View style={{flexDirection:'row'}}>
        <Text style={{color:'#fff', fontSize:24, fontWeight:'bold', textTransform:'uppercase'}}>{symbol}</Text>
        <Image style={{borderRadius:50, width:35, height:35, marginHorizontal:5}}  source={{
            uri: image,
        }} />
         </View>
    </View>
    )
}

