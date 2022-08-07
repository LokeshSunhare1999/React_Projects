import { PRODUCT_LIST, SEARCH_PRODUCT, SET_PRODUCT_LIST } from "./constant"

export const productList = () => {
    return {
        type: PRODUCT_LIST,
    }
}

export const productSearch = (query) => {
    return {
        type: SEARCH_PRODUCT,
        query,
    }
}

