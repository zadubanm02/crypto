import React from 'react'
import { Dimensions, View } from 'react-native';
import { PieChart, ProgressChart } from 'react-native-chart-kit';


export const PortfolioGraph = ({portfolioValue, graphCoins, graphValues}) => {
  

  const data = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#fff",
      legendFontSize: 15
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#1A153A",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 3, // optional, default 3
    useShadowColorFromDataset: false // optional
  };
    return (
       <>
       <PieChart
  data={data}
  width={Dimensions.get('screen').width}
  height={280}
  chartConfig={chartConfig}
  accessor={"value"}
  backgroundColor={"transparent"}
  paddingLeft={"15"}
  center={[10, 10]}
  absolute
/>
       </>
    )
}

