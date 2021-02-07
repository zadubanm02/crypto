import React from 'react'
import { View } from 'react-native'
//@ts-ignore
import { LineChart, Grid,YAxis } from 'react-native-svg-charts'


export const GraphDetail = ({graphData}) => {
    const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const contentInset = { top: 20, bottom: 20 }
    return (
        <View style={{ height: 300, flexDirection: 'row' }}>
        <YAxis
            data={graphData}
            contentInset={contentInset}
            svg={{
                fill: 'white',
                fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value:any) => `${value} €`}
        />
        <LineChart
            style={{ flex: 1, marginLeft: 16 }}
            data={graphData}
            svg={{ stroke: 'rgb(255, 255, 255)', strokeWidth:2, strokeOpacity:2, strokeLinecap:'round' }}
            contentInset={contentInset}
        >
            {/* <Grid /> */}
        </LineChart>
    </View>
    )
}

