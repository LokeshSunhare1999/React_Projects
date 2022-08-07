import { ADD_TO_CARD } from "./constant";
import { REMOVE_FROM_CARD } from "./constant";
import { EMPTY_CARD } from "./constant";

export const addToCart = (data) =>{
    console.log(data);
    return{
        type: ADD_TO_CARD,
        data: data
    }
}
export const removeFromCart = (data) =>{
    console.log(data);
    return{
        type: REMOVE_FROM_CARD,
        data: data
    }
}
export const emptyCart = () =>{
    console.log("action emptyCart");
    return{
        type: EMPTY_CARD,
    }
}
 