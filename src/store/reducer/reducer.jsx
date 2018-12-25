import types from "../actions/types";

const initialState = {
    profile: {},
    product: [],
    purchase: [],
    sale: [],
    location: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GETPROFILE: {
            return {
                ...state,
                profile: action.payload,
            }
        }
        case types.ONADDPRODUCT: {
            return {
                ...state,
                product: state.product.concat(action.payload),
            }
        }
        case types.ONEDITPRODUCT: {
            state.product.splice(action.payload.ind, 1, action.payload.row);
            return {
                ...state,
            }
        }
        case types.ONDELETEPRODUCT: {
            state.product.splice(action.payload, 1);
            return {
                ...state,
            }
        }
        case types.ONADDLOCATION: {
            return {
                ...state,
                location: state.location.concat(action.payload),
            }
        }
        case types.ONEDITLOCATION: {
            state.location.splice(action.payload.ind, 1, action.payload.row);
            return {
                ...state,
            }
        }
        case types.ONDELETELOCATION: {
            state.location.splice(action.payload, 1);
            return {
                ...state,
            }
        }
        case types.ONADDPURCHASE: {
            const ind = state.product.findIndex(val => val.name === action.payload.productName);
            const qty = state.product[ind][action.payload.locationName];
            if (qty > 0) {
                state.product[ind][action.payload.locationName] += parseInt(action.payload.quantity);
            }
            else {
                state.product[ind][action.payload.locationName] = parseInt(action.payload.quantity);
            }
            return {
                ...state,
                purchase: state.purchase.concat(action.payload),
            }
        }
        case types.ONEDITPURCHASE: {
            //reverse old product
            const oldInd = state.product.findIndex(val => val.name === action.payload.oldProductName)
            state.product[oldInd][action.payload.oldLocationName] -= parseInt(action.payload.oldQty);
            //update new product
            const ind = state.product.findIndex(val => val.name === action.payload.row.productName);
            if (state.product[ind][action.payload.row.locationName]) {
                state.product[ind][action.payload.row.locationName] += parseInt(action.payload.row.quantity);
            }
            else {
                state.product[ind][action.payload.row.locationName] = parseInt(action.payload.row.quantity);
            }
            state.purchase.splice(action.payload.ind, 1, action.payload.row);
            return {
                ...state,
            }
        }
        case types.ONDELETEPURCHASE: {
            const ind = state.product.findIndex(val => val.name === action.payload.row.productName);
            state.product[ind][action.payload.row.locationName] -= parseInt(action.payload.row.quantity);
            state.purchase.splice(action.payload.ind, 1);
            return {
                ...state,
            }
        }
        case types.ONADDSALE: {
            const ind = state.product.findIndex(val => val.name === action.payload.productName);
            state.product[ind][action.payload.locationName] -= parseInt(action.payload.quantity);
            return {
                ...state,
                sale: state.sale.concat(action.payload),
            }
        }
        case types.ONEDITSALE: {
            //reverse old product
            const oldInd = state.product.findIndex(val => val.name === action.payload.oldProductName)
            state.product[oldInd][action.payload.oldLocationName] += parseInt(action.payload.oldQty);
            //update new product
            const ind = state.product.findIndex(val => val.name === action.payload.row.productName);
            state.product[ind][action.payload.row.locationName] -= parseInt(action.payload.row.quantity);
            state.sale.splice(action.payload.ind, 1, action.payload.row);
            return {
                ...state,
            }
        }
        case types.ONDELETESALE: {
            const ind = state.product.findIndex(val => val.name === action.payload.row.productName);
            state.product[ind][action.payload.row.locationName] += parseInt(action.payload.row.quantity);
            state.sale.splice(action.payload.ind, 1);
            return {
                ...state,
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;