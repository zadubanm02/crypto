import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";

interface GraphProps {
  color:string;
  colorOpacity:number;
  graphData:number[]
}

export const DetailGraph = ({color, colorOpacity, graphData}) => {
    const apiKey = 'c7ea99fc38fe350af471d0bda256691f'
    //curl "https://api.nomics.com/v1/currencies/ticker?key=c7ea99fc38fe350af471d0bda256691f&ids=BTC,ETH,XRP&interval=1h,1d&convert=EUR&per-page=7&page=1"

    if(graphData.length>0){
      return (
        <>
        
           <View>
  <LineChart
    data={{
      labels: [],
      datasets: [
        {
          //@ts-ignore
          data:graphData
          // data: [
          //   Math.random() * 100,
          //   Math.random() * 100,
          //   Math.random() * 100,
          //   Math.random() * 100,
          //   Math.random() * 100,
          //   Math.random() * 100,

          // ]
        }
      ]
    }}
    withInnerLines={false}
    withOuterLines={false}
    width={Dimensions.get("window").width} // from react-native
    height={300}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#1A153A",
      backgroundGradientFrom: "#1A153A",
      backgroundGradientTo: "#2B2C5F",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity=1) => `rgba(${color}, ${colorOpacity})`,
      //color: (opacity = 1) => `rgba(88, 191, 88, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 15
      },
      propsForDots: {
        r: "0",
        strokeWidth: "0",
        stroke: "#fff"
      }
    }}
    bezier
    style={{
      paddingTop:10,
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
        </>
    )
    }else{
      return (
        <View></View>
      )
    }
    
}

