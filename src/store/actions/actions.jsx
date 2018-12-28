//action types
import types from './types';

//store
import store from '../store';

//firebase
import * as firebase from 'firebase';
import '../../component/config';

const ref = firebase.database().ref();

const allMethods = {
    fetchData: data => {
        const profile = data.child('profile').val()[JSON.parse(localStorage.getItem('uid'))];
        const product = data.child('database').child('product').val();
        const purchase = data.child('database').child('purchase').val();
        const sale = data.child('database').child('sale').val();
        const location = data.child('database').child('location').val();
        return dispatch => {
            dispatch({ type: types.FETCHDATA, payload: { profile, product, purchase, sale, location } })
        }
    },
    getClearState: () => {
        return dispatch => {
            dispatch({ type: types.GETCLEARSTATE });
        }
    },
    onAddProduct: data => {
        const { name, manufacturer, description } = data;
        const key = ref.child('database').child('product').push().key;
        ref.child('database').child('product').child(key).set({
            name, manufacturer, description, key
        });
        return dispatch => {
            dispatch({ type: types.ONADDPRODUCT })
        }
    },
    onEditProduct: (row, ind) => {
        const { name, manufacturer, description, key } = row;
        ref.child('database').child('product').child(key).set({
            name, manufacturer, description, key
        })
        return dispatch => {
            dispatch({ type: types.ONEDITPRODUCT })
        }
    },
    onDeleteProduct: key => {
        ref.child('database').child('product').child(key).remove();
        return dispatch => {
            dispatch({ type: types.ONDELETEPRODUCT })
        }
    },
    onAddLocation: data => {
        const { name, address } = data;
        const key = ref.child('database').child('location').push().key;
        ref.child('database').child('location').child(key).set({
            name, address, key,
        });
        return dispatch => {
            dispatch({ type: types.ONADDLOCATION })
        }
    },
    onEditLocation: row => {
        const { name, address, key } = row;
        ref.child('database').child('location').child(key).set({
            name, address, key
        });
        return dispatch => {
            dispatch({ type: types.ONEDITLOCATION })
        }
    },
    onDeleteLocation: key => {
        ref.child('database').child('location').child(key).remove();
        return dispatch => {
            dispatch({ type: types.ONDELETELOCATION })
        }
    },
    onAddPurchase: data => {
        const state = store.getState();
        const ind = state.product.findIndex(val => val.name === data.productName);
        const productKey = state.product[ind].key;
        const qty = state.product[ind][data.locationName];
        if (qty >= 0) {
            state.product[ind][data.locationName] += parseInt(data.quantity);
            ref.child('database').child('product').child(productKey).update({
                [data.locationName]: state.product[ind][data.locationName]
            });
        }
        else {
            ref.child('database').child('product').child(productKey).update({
                [data.locationName]: parseInt(data.quantity)
            });
        }
        const key = ref.child('database').child('purchase').push().key;
        const { date, bill, vendor, quantity, productName, locationName } = data;
        ref.child('database').child('purchase').child(key).set({
            date, bill, vendor, quantity, productName, locationName, key
        });
        return dispatch => {
            dispatch({ type: types.ONADDPURCHASE })
        }
    },
    onEditPurchase: (row, oldQty, oldProductName, oldLocationName) => {
        const state = store.getState();
        //reverse old product
        const oldInd = state.product.findIndex(val => val.name === oldProductName)
        const productKey = state.product[oldInd].key;
        state.product[oldInd][oldLocationName] -= parseInt(oldQty);
        ref.child('database').child('product').child(productKey).update({
            [oldLocationName]: state.product[oldInd][oldLocationName],
        })
        //update new product
        const ind = state.product.findIndex(val => val.name === row.productName);
        const newKey = state.product[ind].key;
        const qty = state.product[ind][row.locationName];
        if (qty >= 0) {
            state.product[ind][row.locationName] += parseInt(row.quantity);
            ref.child('database').child('product').child(newKey).update({
                [row.locationName]: state.product[ind][row.locationName]
            })
        }
        else {
            ref.child('database').child('product').child(newKey).update({
                [row.locationName]: parseInt(row.quantity),
            })
        }
        ref.child('database').child('purchase').child(row.key).update(row);
        return dispatch => {
            dispatch({ type: types.ONEDITPURCHASE })
        }
    },
    onDeletePurchase: row => {
        const state = store.getState();
        const ind = state.product.findIndex(val => val.name === row.productName);
        const productKey = state.product[ind].key;
        state.product[ind][row.locationName] -= parseInt(row.quantity);
        ref.child('database').child('product').child(productKey).update({
            [row.locationName]: state.product[ind][row.locationName],
        });
        ref.child('database').child('purchase').child(row.key).remove();
        return dispatch => {
            dispatch({ type: types.ONDELETEPURCHASE })
        }
    },
    onAddSale: data => {
        const state = store.getState();
        const ind = state.product.findIndex(val => val.name === data.productName);
        const productKey = state.product[ind].key;
        state.product[ind][data.locationName] -= parseInt(data.quantity);
        ref.child('database').child('product').child(productKey).update({
            [data.locationName]: state.product[ind][data.locationName],
        })
        const key = ref.child('database').child('sale').push().key;
        const { date, bill, vendee, quantity, productName, locationName } = data;
        ref.child('database').child('sale').child(key).set({
            date, bill, vendee, quantity, productName, locationName, key
        });
        return dispatch => {
            dispatch({ type: types.ONADDSALE })
        }
    },
    onEditSale: (row, oldQty, oldProductName, oldLocationName) => {
        const state = store.getState();
        //reverse old product
        const oldInd = state.product.findIndex(val => val.name === oldProductName)
        const productKey = state.product[oldInd].key;
        state.product[oldInd][oldLocationName] += parseInt(oldQty);
        ref.child('database').child('product').child(productKey).update({
            [oldLocationName]: state.product[oldInd][oldLocationName],
        });
        //update new product
        const ind = state.product.findIndex(val => val.name === row.productName);
        const newKey = state.product[ind].key;
        state.product[ind][row.locationName] -= parseInt(row.quantity);
        ref.child('database').child('product').child(newKey).update({
            [row.locationName]: state.product[ind][row.locationName],
        });
        ref.child('database').child('sale').child(row.key).update(row);
        return dispatch => {
            dispatch({ type: types.ONEDITSALE })
        }
    },
    onDeleteSale: row => {
        const state = store.getState();
        const ind = state.product.findIndex(val => val.name === row.productName);
        const productKey = state.product[ind].key;
        state.product[ind][row.locationName] += parseInt(row.quantity);
        ref.child('database').child('product').child(productKey).update({
            [row.locationName]: state.product[ind][row.locationName],
        });
        ref.child('database').child('sale').child(row.key).remove();
        return dispatch => {
            dispatch({ type: types.ONDELETESALE })
        }
    },
}

export default allMethods;