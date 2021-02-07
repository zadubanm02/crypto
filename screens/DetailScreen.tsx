import React, { useEffect, useState } from 'react'
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Graph from '../components/Graph'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DetailGraph } from '../components/DetailGraph';
import { GraphDetail } from '../components/GraphDetail';
import { db } from '../utils/constants';
import { useWatchlistCoins } from '../asyncStorage/useWatchlistCoins';
import axios from 'axios';
import LottieView from 'lottie-react-native';

export const DetailScreen = ({visible, closeModal, id}) => {
    const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false)
    const [data, setData] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [graphData, setGraphData] = useState([])
    const {watchlist, addCoinToWatchlist, deleteFromWatchList, refreshWatchlist} = useWatchlistCoins()
    async function handleAdd(coinId:string){
        await addCoinToWatchlist(coinId)
    }
    async function handleDelete(coinId: string) {
        await deleteFromWatchList(coinId)
    }
    const checkWatclist = (id:string) => {
        console.log("Watchlist", watchlist)
        const found = watchlist?.includes(id)
        console.log("Found", found)
        found ? setIsInWatchlist(true) : setIsInWatchlist(false)
    }
    useEffect(() => {
        setLoading(true)
       axios.get(`https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}?market_data=true&sparkline=true`)
       .then((res:any)=>{
            setData(res.data)
            console.log("RES DATA", res.data)
       })
       axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${id}&order=market_cap_desc&per_page=250&page=1&sparkline=true`)
       .then((res:any)=>{
        setGraphData(res.data)
        console.log("GraphData", res.data)
   })
       refreshWatchlist()
       checkWatclist(id)
       setLoading(false)
    }, [id])
    return (
        <>
        <Modal
        animationType = "fade"
        transparent={false}
        visible={visible}
        style={{borderRadius:50, backgroundColor:'#1F1D2B'}}
        >
              <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor:'#1F1D2B'}}>
                <TouchableOpacity onPress={()=>closeModal()} style={{padding:10, margin:10}}>
                <Icon name="close" size={36} color={'#fff'}/>
                </TouchableOpacity>
                
                <View style={{padding:10, margin:10}}>
                </View>
            </View>
            {loading == true ?  <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#1F1D2B'}}>
        <LottieView style={{height:300}} source={require('../assets/mario.json')} autoPlay loop />
        </View> : 
        <ScrollView style={{backgroundColor:'#1F1D2B'}}>
        <View style={{padding:10}}>
        <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', marginVertical:5}}>
        <Text style={{fontSize:24, fontWeight:'bold', color:'#fff', marginHorizontal:10}}>{data?.name}</Text>
        {isInWatchlist ? <TouchableOpacity onPress={()=>{handleDelete(id);setIsInWatchlist(false)}} style={{borderRadius:15, padding:10, backgroundColor:'#252836'}}>
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>Remove from watchlist</Text>
        </TouchableOpacity> : <TouchableOpacity onPress={()=>{addCoinToWatchlist(id);setIsInWatchlist(true)}} style={{borderRadius:15, padding:10, backgroundColor:'#252836'}}>
            <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>Add to watchlist</Text>
        </TouchableOpacity> }
        </View>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', marginVertical:10}}>
                <View style={{flexDirection:'row'}}>
                <Image style={{borderRadius:50, width:35, height:35, marginHorizontal:10}}  source={{
  uri: `${data?.image?.small}`,
}} />
            <Text style={{fontSize:20, fontWeight:'bold', color:'#fff', textTransform:'uppercase'}}>{data?.symbol}</Text>
                </View>
            <View style={{marginHorizontal:10}}>
                <Text style={{fontSize:24, color:'#fff', fontWeight:'bold'}}>{data?.market_data?.current_price?.eur} EUR</Text>
            </View>
            </View>
            
            {/* <DetailGraph graphData={data?.sparkline_in_7d?.price} /> */}
            <GraphDetail graphData={graphData[0]?.sparkline_in_7d?.price}/>
            <View style={{backgroundColor:'#252836', borderTopLeftRadius:20, borderTopRightRadius:20, padding:10}}>
            <View style={{padding:10, flexDirection:'row'}}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff', marginRight:20}}>Market Cap:</Text>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>{data?.market_data?.market_cap?.eur}</Text>
            </View>
            <View style={{padding:10, flexDirection:'row'}}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff', marginRight:20}}>Price change (24 h):</Text>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>{data?.market_data?.price_change_percentage_24h}%</Text>
            </View>
            <View style={{padding:10, flexDirection:'row'}}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff', marginRight:20}}>Total volume:</Text>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>{data?.market_data?.total_volume.eur}</Text>
            </View>
            <View style={{padding:10, flexDirection:'row'}}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff', marginRight:20}}>Hashing algoritm:</Text>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>{data?.hashing_algorithm}</Text>
            </View>
            <View style={{padding:10}}>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff', marginBottom:10}}>Description</Text>
            <Text style={{fontSize:18, fontWeight:'bold', color:'#fff'}}>{data?.description?.en}</Text>
            </View>
            </View>
        </View>
    </ScrollView>
        }
            
            </Modal>
        </>
    )
}


