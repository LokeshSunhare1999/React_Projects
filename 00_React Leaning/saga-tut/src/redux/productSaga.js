import { takeEvery, put } from 'redux-saga/effects'
import { ADD_TO_CARD, PRODUCT_LIST, SET_PRODUCT_LIST } from './constant'

function* getProducts() {
    let data = yield fetch("http://localhost:3000/product")
    data = yield data.json()
    yield put({type: SET_PRODUCT_LIST,data})
}

function* productSaga() {
    yield takeEvery(PRODUCT_LIST, getProducts)
}

export default productSaga;