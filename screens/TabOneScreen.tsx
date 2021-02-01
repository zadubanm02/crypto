import * as React from 'react';
import { useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CryptoCard from '../components/CryptoCard';
import axios from 'axios'
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import useCoin from '../hooks/useCoinData';
import { useWatchlistCoins } from '../asyncStorage/useWatchlistCoins';

const wait = (timeout:number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

export default function TabOneScreen() {
 // const {coin} = useCoin()
 const apiKey = 'c7ea99fc38fe350af471d0bda256691f'
  const [data, setData] = useState<any>()
  const [refreshing, setRefreshing] = React.useState(false);
  const {watchlist} = useWatchlistCoins()

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const getCoinData = () => {
    let res = axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=2&price_change_percentage=24h&sparkline=true`)
    .then((res:any)=>{
      console.log("RES data spark", res.data.map(coin=>coin.sparkline_in_7d?.price))
      setData(res?.data)
    })
    console.log("RES", res)
    return res
 }
 React.useEffect(()=>{
    const coinData = getCoinData()
    //setData(data)
    console.log('QQQ',coinData)
 },[])
  return (
    <View style={styles.container}>
      <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} enabled={true}/>
        }>
      <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor:'#1A153A', padding:5}}>
        <Text style={{fontSize:18, fontWeight:'bold', padding:10, color:'#fff'}}>Owned</Text>
        <Text style={{fontSize:18, fontWeight:'bold', padding:10, backgroundColor:'#2B2C5F',color:'#fff', borderRadius:10, marginHorizontal:10}}>3</Text>
        </View>
        <ScrollView horizontal={true}>
          {data && data.map((coin:any)=>{
            console.log("data", coin)
            return (
              <CryptoCard key={coin?.symbol} name={coin?.name} id={coin?.symbol} value={coin?.current_price}
               marketCap={coin?.market_cap} color={'88, 191, 88'} graphData={coin?.sparkline_in_7d?.price}/>
            )
          })}
        </ScrollView>
        <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor:'#1A153A', padding:5}}>
        <Text style={{fontSize:18, fontWeight:'bold', padding:10,color:'#fff',}}>Watching</Text>
        <Text style={{fontSize:18, fontWeight:'bold', padding:10, backgroundColor:'#2B2C5F',color:'#fff', borderRadius:10, marginHorizontal:10}}>4</Text>
        </View>
        <ScrollView horizontal={true}>
          {/* {watchlist && watchlist} */}
        {/* <CryptoCard name={'Bitcoin'} id={'BTC'} value='30000' marketCap={'2 billion'} color={'88, 191, 88'}/>
      <CryptoCard name={'Ethereum'} id={'ETH'} value='1000' marketCap={'1 billion'} color={'236, 66, 141'}/>
      <CryptoCard name={'Graph'} id={'GRT'} value='0.40' marketCap={'30 million'} color={'33, 133, 246'}/>
      <CryptoCard name={'Stellar'} id={'XLM'} value='0.30' marketCap={'30 million'} color={'243, 152, 62'}/> */}
        </ScrollView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#1A153A'
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
