//actionTypes
import types from "../actions/types";

//initial state
const initialState = {
    profile: {},
    product: [],
    location: [],
    purchase: [],
    sale: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCHDATA: {
            return {
                ...state,
                profile: action.payload.profile ? action.payload.profile : {},
                product: action.payload.product ? Object.values(action.payload.product) : [],
                location: action.payload.location ? Object.values(action.payload.location) : [],
                purchase: action.payload.purchase ? Object.values(action.payload.purchase) : [],
                sale: action.payload.sale ? Object.values(action.payload.sale) : [],
            }
        }
        case types.GETCLEARSTATE: {
            return {
                ...state,
                profile: {},
                product: [],
                location: [],
                purchase: [],
                sale: [],
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;