import types from './types';

const allMethods = {
    getUID: val => {
        return dispatch => {
            dispatch({ type: types.GETUID, payload: val })
        }
    },
    getProfile: data => {
        return dispatch => {
            dispatch({ type: types.GETPROFILE, payload: data })
        }
    },
    isProfile: result => {
        return dispatch => {
            dispatch({ type: types.ISPROFILE, payload: result })
        }
    },
    isProduct: result => {
        return dispatch => {
            dispatch({ type: types.ISPRODUCT, payload: result })
        }
    },
    isPurchase: result => {
        return dispatch => {
            dispatch({ type: types.ISPURCHASE, payload: result })
        }
    },
    isSale: result => {
        return dispatch => {
            dispatch({ type: types.ISSALE, payload: result })
        }
    },
    isLocation: result => {
        return dispatch => {
            dispatch({ type: types.ISLOCATION, payload: result })
        }
    },
    isInventory: result => {
        return dispatch => {
            dispatch({ type: types.ISINVENTORY, payload: result })
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
    onEditPurchase: (row, ind) => {
        return dispatch => {
            dispatch({ type: types.ONEDITPURCHASE, payload: { row, ind } })
        }
    },
    onEditRowOfPurchase: (row, ind) => {
        return dispatch => {
            dispatch({ type: types.ONEDITROWOFPURCHASE, payload: { row, ind } })
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
    onEditSale: (row, ind) => {
        return dispatch => {
            dispatch({ type: types.ONEDITSALE, payload: { row, ind } })
        }
    },
    onEditRowOfSale: (row, ind) => {
        return dispatch => {
            dispatch({ type: types.ONEDITROWOFSALE, payload: { row, ind } })
        }
    },
    onDeleteSale: (row, ind) => {
        return dispatch => {
            dispatch({ type: types.ONDELETESALE, payload: {row, ind} })
        }
    },
}

export default allMethods;