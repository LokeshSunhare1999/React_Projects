// import {createStore} from 'redux';
import { configureStore } from "@reduxjs/toolkit"
import productSaga from "./productSaga";
import rootReducer from './rootReducer';
import createSagaMiddleware from "@redux-saga/core";

const sagaMidleware = createSagaMiddleware();
const Store = configureStore(
    {
        reducer: rootReducer,
        middleware: () => [sagaMidleware]
    }
)

sagaMidleware.run(productSaga)
export default Store;