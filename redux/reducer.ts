import { Portfolio } from "../utils/Portfolio"

export const ADD_COIN = 'ADD_COIN'
export const addCoin = (coin: Portfolio) => ({
    type: ADD_COIN,
    payload: coin
})

const initialState = {
    coin: {
        id: '',
        value: 0
    }
}
const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_COIN:
            return {
                ...state,
                coin: { id: action.payload.id, value: action.payload.value }
            }
        default:
            return state
    }
}
export default rootReducer