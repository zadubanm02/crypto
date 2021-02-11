import * as React from 'react';
import { useState } from 'react';
import { FlatList, Pressable, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CryptoCard from '../components/CryptoCard';
import axios from 'axios'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import useCoin from '../hooks/useCoinData';
import { useWatchlistCoins } from '../asyncStorage/useWatchlistCoins';
import { usePortfolioCoins } from '../asyncStorage/usePortfolioCoins';
import { fetchForPortfolio } from '../utils/fetchForPortfolio';
import LottieView from 'lottie-react-native';
import { getWatchlist } from '../asyncStorage/AsyncStorage';
import AsyncStorage from '@react-native-community/async-storage';
import { DetailScreen } from './DetailScreen';


const wait = (timeout:number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
 
export default function TabOneScreen() {
 // const {coin} = useCoin()
 const {deleteFromPortfolio, refreshPortfolio, addCoinToPortfolio, getPortfolioCoins} = usePortfolioCoins()
 const { getWatchlistCoins} = useWatchlistCoins()
const [portfolioData, setPortfolioData] = useState([])
const [loading, setLoading] = useState<boolean>(false)
const [watchlistData, setWatchlistData] = useState([])
const [portfolioLength, setPortfolioLength] = useState<number>(0)
const [watchlistLength, setWatchlistLength] = useState<number>(0)
const [view, setView] = useState<string>('watching')
const [isModalVisible, setModalVisible] = useState(false);
const [selectedCoin, setSelectedCoin] = useState<string>('')
const toggleModal = () => {
    console.log(isModalVisible)
    setModalVisible(!isModalVisible);
};


 
  const [refreshing, setRefreshing] = React.useState(false);
  

  const createIds = (data:any) : string => {
    let ids:string = ''
    if(data){
        data.forEach((item:any)=>{  
              ids += item?.id + '%2C%20'
        })
        console.log("ids", ids)
        return ids
    }
    return ids
    
}

const createWatchlistIds = (data:any) : string => {
  let ids:string = ''
  if(data){
      data.forEach((item:any)=>{  
            ids += item + '%2C%20'
      })
      console.log("IDS Watchlist", ids)
      return ids
  }
  return ids
  
}

  const getPortfolioData = async () => {
    setLoading(true)
    //Portfolio Data
    const data = await getPortfolioCoins()
    const ids = createIds(data)
    const fetchedData = await fetchForPortfolio(ids)
    setPortfolioData(fetchedData)
    setPortfolioLength(data?.length)
    //Watchlist Data
    const watchData = await getWatchlistCoins()
    const watchlistIds = createWatchlistIds(watchData)
    const fetchedDataWatchlist = await fetchForPortfolio(watchlistIds)
    setWatchlistData(fetchedDataWatchlist)
    setWatchlistLength(watchData?.length)
    setLoading(false)
    return fetchedData
  }
  
 React.useEffect(()=>{
   const data = getPortfolioData()
   console.log("Portfoli")
 },[])

  return (
    <SafeAreaView style={styles.container}>
      
         <View >
          <View style={{flexDirection:'row', backgroundColor:'#1F1D2B',  padding:10}}>
          <Pressable onPress={()=>setView('watching')} style={{width:150,padding:10, borderRadius:10, marginHorizontal:10, backgroundColor:view=='watching' ? '#252836' :'#1F1D2B' }}>
        <Text style={{fontSize:18,textAlign:'center', fontWeight:'bold',color:'#fff'}}>Watching</Text>
        </Pressable>
        <Pressable onPress={()=>setView('owned')} style={{width:150,padding:10, borderRadius:10, marginHorizontal:10, backgroundColor:view=='watching' ?'#1F1D2B': '#252836'  }}>
        <Text style={{fontSize:18,textAlign:'center', fontWeight:'bold',color:'#fff'}}>Owned</Text>
        </Pressable>
          </View>
          {loading == true ?
        <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#1F1D2B'}}>
        <LottieView style={{height:300}} source={require('../assets/mario.json')} autoPlay loop />
        </View> :
        
        view == 'watching' ?
        <SafeAreaView>
        <FlatList
        contentContainerStyle={{
          backgroundColor:'#1F1D2B', padding:5,paddingBottom:120, minHeight:300
        }}
        data={watchlistData}
        //@ts-ignore
        keyExtractor={item => item?.symbol}
        renderItem={({ item }) => (
          //@ts-ignore
          <CryptoCard onPress={()=>{setSelectedCoin(item?.id); toggleModal()}} graphData={item?.sparkline_in_7d?.price || [1]} image={item?.image} name={item?.name} id={item?.symbol} value={item?.current_price}
          //@ts-ignore
          marketCap={item?.market_cap} color={'88, 191, 88'} />
        )}
        
        onRefresh={getPortfolioData}
        refreshing={loading}
      /></SafeAreaView>
         :
         <SafeAreaView>
         <FlatList
        contentContainerStyle={{
          backgroundColor:'#1F1D2B', padding:5, paddingBottom:120, minHeight:300
        }}
        data={portfolioData}
        //@ts-ignore
        keyExtractor={item => item?.symbol}
        renderItem={({ item }) => (
          //@ts-ignore
          <CryptoCard onPress={()=>{setSelectedCoin(item?.id); toggleModal()}} graphData={item?.sparkline_in_7d?.price || [1]} image={item?.image} name={item?.name} id={item?.symbol} value={item?.current_price}
          //@ts-ignore
          marketCap={item?.market_cap} color={'88, 191, 88'} />
        )}
        
        onRefresh={getPortfolioData}
        refreshing={loading}
      /></SafeAreaView>
         }
        
      </View>
      <DetailScreen closeModal={()=>{setSelectedCoin('');setModalVisible(false)}} visible={isModalVisible} id={selectedCoin} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1F1D2B'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});



{/* <ScrollView style={{marginTop:10}}>
{watchlistData && watchlistData.map((coin:any, index:number) => {
  return (
    <CryptoCard onPress={()=>console.log("pressed")} image={coin.image} key={index} name={coin.name} id={coin.symbol} value={coin.current_price}
      marketCap={coin.market_cap} color={'88, 191, 88'} />
  )    
}) }
</ScrollView> */}