import types from "../actions/types";

const initialState = {
    uid: '',
    profile: {},
    product: [],
    purchase: [],
    sale: [],
    location: [],
    inventory: [],
    isProfile: false,
    isProduct: false,
    isPurchase: false,
    isSale: false,
    isLocation: false,
    isInventory: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GETUID: {
            return {
                ...state,
                uid: action.payload,
            }
        }
        case types.GETPROFILE: {
            return {
                ...state,
                profile: action.payload,
            }
        }
        case types.ISPROFILE: {
            return {
                ...state,
                isProfile: action.payload,
                isProduct: false,
                isPurchase: false,
                isSale: false,
                isLocation: false,
                isInventory: false,
            }
        }
        case types.ISPRODUCT: {
            return {
                ...state,
                isProfile: false,
                isProduct: action.payload,
                isPurchase: false,
                isSale: false,
                isLocation: false,
                isInventory: false,
            }
        }
        case types.ISPURCHASE: {
            return {
                ...state,
                isProfile: false,
                isProduct: false,
                isPurchase: action.payload,
                isSale: false,
                isLocation: false,
                isInventory: false,
            }
        }
        case types.ISSALE: {
            return {
                ...state,
                isProfile: false,
                isProduct: false,
                isPurchase: false,
                isSale: action.payload,
                isLocation: false,
                isInventory: false,
            }
        }
        case types.ISLOCATION: {
            return {
                ...state,
                isProfile: false,
                isProduct: false,
                isPurchase: false,
                isSale: false,
                isLocation: action.payload,
                isInventory: false,
            }
        }
        case types.ISINVENTORY: {
            return {
                ...state,
                isProfile: false,
                isProduct: false,
                isPurchase: false,
                isSale: false,
                isLocation: false,
                isInventory: action.payload,
            }
        }
        case types.ONADDPRODUCT: {
            return {
                ...state,
                product: state.product.concat(action.payload),
            }
        }
        case types.ONEDITPRODUCT: {
            const row = state.product.splice(action.payload.ind, 1);
            row.name = action.payload.row.name;
            row.manufacturer = action.payload.row.manufacturer;
            row.description = action.payload.row.description;
            state.product.splice(action.payload.ind, 1, row);
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
            const ind = state.product.findIndex(val => val.name === action.payload.row.productName);
            state.product[ind][action.payload.row.locationName] += parseInt(action.payload.row.quantity);
            state.purchase.splice(action.payload.ind, 1, action.payload.row);
            return {
                ...state,
            }
        }
        case types.ONEDITROWOFPURCHASE: {
            const ind = state.product.findIndex(val => val.name === action.payload.row.productName);
            state.product[ind][action.payload.row.locationName] -= parseInt(action.payload.row.quantity);
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
            const ind = state.product.findIndex(val => val.name === action.payload.row.productName);
            state.product[ind][action.payload.row.locationName] -= parseInt(action.payload.row.quantity);
            state.sale.splice(action.payload.ind, 1, action.payload.row);
            return {
                ...state,
            }
        }
        case types.ONEDITROWOFSALE: {
            const ind = state.product.findIndex(val => val.name === action.payload.row.productName);
            state.product[ind][action.payload.row.locationName] += parseInt(action.payload.row.quantity);
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