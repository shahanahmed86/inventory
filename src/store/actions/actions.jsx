import types from './types';

const allMethods = {
    getProfile: data => {
        return dispatch => {
            dispatch({ type: types.GETPROFILE, payload: data })
        }
    },
    onAddProduct: data => {
        return dispatch => {
            dispatch({ type: types.ONADDPRODUCT, payload: data })
        }
    },
    onEditProduct: (row, ind) => {
        return dispatch => {
            dispatch({ type: types.ONEDITPRODUCT, payload: { row, ind } })
        }
    },
    onDeleteProduct: index => {
        return dispatch => {
            dispatch({ type: types.ONDELETEPRODUCT, payload: index })
        }
    },
    onAddLocation: data => {
        return dispatch => {
            dispatch({ type: types.ONADDLOCATION, payload: data })
        }
    },
    onEditLocation: (row, ind) => {
        return dispatch => {
            dispatch({ type: types.ONEDITLOCATION, payload: { row, ind } })
        }
    },
    onDeleteLocation: index => {
        return dispatch => {
            dispatch({ type: types.ONDELETELOCATION, payload: index })
        }
    },
    onAddPurchase: data => {
        return dispatch => {
            dispatch({ type: types.ONADDPURCHASE, payload: data })
        }
    },
    onEditPurchase: (row, ind, oldQty, oldProductName, oldLocationName) => {
        return dispatch => {
            dispatch({ type: types.ONEDITPURCHASE, payload: { row, ind, oldQty, oldProductName, oldLocationName } })
        }
    },
    onDeletePurchase: (row, ind) => {
        return dispatch => {
            dispatch({ type: types.ONDELETEPURCHASE, payload: {row, ind} })
        }
    },
    onAddSale: data => {
        return dispatch => {
            dispatch({ type: types.ONADDSALE, payload: data })
        }
    },
    onEditSale: (row, ind, oldQty, oldProductName, oldLocationName) => {
        return dispatch => {
            dispatch({ type: types.ONEDITSALE, payload: { row, ind, oldQty, oldProductName, oldLocationName } })
        }
    },
    onDeleteSale: (row, ind) => {
        return dispatch => {
            dispatch({ type: types.ONDELETESALE, payload: {row, ind} })
        }
    },
}

export default allMethods;