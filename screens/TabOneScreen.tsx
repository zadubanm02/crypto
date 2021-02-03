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
import { usePortfolioCoins } from '../asyncStorage/usePortfolioCoins';
import { fetchForPortfolio } from '../utils/fetchForPortfolio';
import LottieView from 'lottie-react-native';


const wait = (timeout:number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
 
export default function TabOneScreen() {
 // const {coin} = useCoin()
 const {deleteFromPortfolio, refreshPortfolio, addCoinToPortfolio, getPortfolioCoins} = usePortfolioCoins()
const [portfolioData, setPortfolioData] = useState([])
const [loading, setLoading] = useState<boolean>(false)
 
  const [refreshing, setRefreshing] = React.useState(false);
  const {watchlist} = useWatchlistCoins()

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const createIds = (data:any) : string => {
    let ids:string = ''
    if(data){
        data.forEach((item:any)=>{
            ids += item.id + '%2C%20'
        })
        console.log("ids", ids)
        return ids
    }
    return ids
    
}

  const getPortfolioData = async () => {
    setLoading(true)
    const data = await getPortfolioCoins()
    console.log("data", data)
    const ids = createIds(data)
    console.log("IDS", ids)
    // fetch data from coingecko
    const fetchedData = await fetchForPortfolio(ids)
    console.log("Fetched data", fetchedData)
    await setPortfolioData(fetchedData)
    setLoading(false)
    return fetchedData
  }

  // <CryptoCard key={coin?.symbol} name={coin?.name} id={coin?.symbol} value={coin?.current_price}
  // marketCap={coin?.market_cap} color={'88, 191, 88'} graphData={coin?.sparkline_in_7d?.price}/>
  
 React.useEffect(()=>{
   getPortfolioData()
 },[])
  return (
    <View style={styles.container}>
      {loading == true ?
        <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#1A153A'}}>
        <LottieView style={{height:300}} source={require('../assets/mario.json')} autoPlay loop />
        </View> :
         <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getPortfolioData} enabled={true}/>
        }>
        
      <View style={{flexDirection:'row', justifyContent:'space-between',backgroundColor:'#1A153A', padding:5}}>
        <Text style={{fontSize:18, fontWeight:'bold', padding:10, color:'#fff'}}>Owned</Text>
        <Text style={{fontSize:18, fontWeight:'bold', padding:10, backgroundColor:'#2B2C5F',color:'#fff', borderRadius:10, marginHorizontal:10}}>3</Text>
        </View>
        <ScrollView horizontal={true}>
          {portfolioData && portfolioData.map((coin:any, index:number)=> {
            return (
               <CryptoCard onPress={{}} key={coin.symbol} name={coin.name} id={coin.symbol} value={coin.current_price}
                  marketCap={coin.market_cap} color={'88, 191, 88'} />
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
         }
      
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
