import { ADD_TO_CARD, REMOVE_FROM_CARD, EMPTY_CARD } from "./constant";

export const cartData = (data = [], action) => {
  
   switch (action.type) {
      case ADD_TO_CARD:
         console.log("Add to card condition ", action);
         return [action.data, ...data];
      case REMOVE_FROM_CARD:
         console.log("REMOVE_FROM_CARD condition ", action);
         // data.length =data.length ? data.length-1 : [] 
         const remainingItem=data.filter((item)=>item.id!==action.data)
         
         return [...data];
      case EMPTY_CARD:
         console.log("EMPTY_CARD condition ", action);
         data=[]
         return [...data];
      default:
         return data
   }

}
