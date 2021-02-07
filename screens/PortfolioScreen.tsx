import React, { useEffect, useState } from 'react'
import { FlatList, Pressable } from 'react-native'
import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BalanceRow } from '../components/BalanceRow'
import Graph from '../components/Graph'
import { PortfolioGraph } from '../components/PortfolioGraph'
import { AddToPortfolio } from './AddToPortfolio'
 import AsyncStorage from '@react-native-community/async-storage'
import { usePortfolioCoins } from '../asyncStorage/usePortfolioCoins'
import Navigation from '../navigation'
import { useNavigation } from '@react-navigation/native'
import { Portfolio } from '../utils/Portfolio'
import { fetchForPortfolio } from '../utils/fetchForPortfolio'
import { Percentage } from '../components/Percentage'
import { AddModal } from './AddModal'
import { useSelector, useDispatch } from 'react-redux'
import { addCoin } from '../redux/reducer'
import LottieView from 'lottie-react-native';


export const PortfolioScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const {deleteFromPortfolio, refreshPortfolio, addCoinToPortfolio, getPortfolioCoins} = usePortfolioCoins()
    const [dataFromGecko, setDataFromGecko] = useState<any>([])
    const [graphCoins, setGraphCoins] = useState<any>()
    const [portfolioVale, setPortfolioValue] = useState<number>()
    const [graphValues, setGraphValues] = useState<any>()
    const [addModal, setAddModal] = useState<boolean>(false)
    const coin = useSelector(state => state.coin)
    const dispatch = useDispatch()
    const [portfolio, setPortfolio]  = useState()
    const [loading, setLoading] = useState<boolean>(false)
    const [editing, setEditing] = useState<boolean>(false)
    const [selectedCoin, setSelectedCoin] = useState(null)

    const toggleModal = () => {
        console.log(isModalVisible)
        setModalVisible(!isModalVisible);
    };

    const createIds = (data:any) => {
        let ids:string = ''
        if(data){
            data.forEach((item:any)=>{
                ids += item.id + '%2C%20'
            })
            console.log("ids", ids)
            return ids
        }
        
    }

    const loadEverything = async () => {
        //set loading to true
        setLoading(true)
        let newPortfolio:any[] = []
        let agregate:number = 0
        let graphValues:any[]=[]
        //data from async storage
        const data = await getPortfolioCoins()
        // create id string for coingecko api
        const ids = createIds(data)
        // fetch data from coingecko
        const fetchedData = await fetchForPortfolio(ids)
        // create new data from coingecko data
            data.forEach((item:Portfolio)=>{
                const found = fetchedData.find((coin:any)=>coin.id == item.id)
                let newCoinObject = {
                    id:found?.id,
                    name:found?.name,
                    image:found?.image,
                    symbol:found?.symbol,
                    price:found?.current_price,
                    amount:item.value
                 };
                newPortfolio = [...newPortfolio, newCoinObject]
            })
        console.log("New portfolio", newPortfolio)
        // give it to state
        setDataFromGecko(newPortfolio)  
        // create total portfolio value
        newPortfolio.forEach((item:any)=>{
            agregate += item.amount*item.price
          
        })
        // create data from graph
        newPortfolio.forEach((item:any)=>{
            graphValues = [...graphValues,{value:((item.amount*item.price)/agregate*100),symbol:item.symbol, image:item.image}]
        })
        //give it to state
        setPortfolioValue(agregate)
        setGraphValues(graphValues)
        console.log("Coins", graphCoins, "Valuesxxxxx", graphValues)
        //set loading to false
        setLoading(false)
        // thats it! 
    }

    const navigation = useNavigation()
   
    useEffect(() => {
        loadEverything()
    }, [])


    return (
        <>
        <SafeAreaView style={{backgroundColor:'#1F1D2B', flex:1}}>
            
            <View style={{}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:10, marginHorizontal:10}}>
                <View style={{}}>
                <Text style={{color:'#fff', fontWeight:'bold'}}>Portfolio balance</Text>
                <Text style={{color:'#fff', fontWeight:'bold', fontSize:32}}>{portfolioVale?.toFixed(2)}€</Text>
                </View>
                <View style={{}}>
                <Pressable style={{backgroundColor:'#252836',padding:10, borderRadius:15}} onPress={()=>setAddModal(true)}>
                    <Text style={{color:'#fff', fontWeight:'bold', fontSize:16}}>Add to portfolio</Text>
                </Pressable>
                </View>
                </View>
                <ScrollView horizontal={true} style={{marginHorizontal:10}} bounces={true}>
                    {graphValues && graphValues.map((item:any, index:any) => {
                        return (
                            <Percentage key={index} symbol={item.symbol} value={item.value} image={item.image} />
                        )
                    })}
                </ScrollView >
                </View>

                {loading == true ? 
                <View style={{height:600, backgroundColor:'#252836', borderTopLeftRadius:20, borderTopRightRadius:20, padding:10, marginTop:10}}>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                <LottieView style={{height:300}} source={require('../assets/mario.json')} autoPlay loop />
                </View>
                </View> : 
                <FlatList
                contentContainerStyle={{
                  backgroundColor:'#252836', padding:5, marginBottom:10, borderRadius:15
                }}
                data={dataFromGecko}
                //@ts-ignore
                keyExtractor={item => item?.symbol}
                renderItem={({ item }) => (
                  //@ts-ignore
                  <BalanceRow edit={{}} longPress={{}} name={item.name} symbol={item.symbol}
                  image={item.image} value={(item.amount*item.price).toFixed(2)} numberOfCoins={item.amount}
                  deleteCoin={()=>deleteFromPortfolio(item.id).then(()=>loadEverything())}/>
                )}
                onRefresh={loadEverything}
                refreshing={loading}
              />
                 }
            <AddModal visible={addModal} id={selectedCoin} add={()=>addCoinToPortfolio({id:coin.id, value:coin.value}).then(()=>{loadEverything(); dispatch(addCoin({id:'', value:0}))})} closeModal={()=>{setAddModal(false);}}/>
            </SafeAreaView>
        </>
    )
}
