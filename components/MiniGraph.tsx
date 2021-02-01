import React from 'react'
import { View, Text, Dimensions } from 'react-native'
//@ts-ignore
import { LineChart, Grid } from 'react-native-svg-charts'

const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

export const MiniGraph = ({graphData}) => {
    return (
        <LineChart
        style={{ height:70, width:60 }}
        data={graphData}
        animate={true}

        svg={{ stroke: 'rgba(255, 255, 255, 1)' }}
        contentInset={{ top: 20, bottom: 20 }}
    >
    </LineChart>
    )
}

