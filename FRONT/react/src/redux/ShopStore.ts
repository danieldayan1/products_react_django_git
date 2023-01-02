import { createStore } from "redux";
import BuyModel from "../Models/BuyModel";



// 1. Global State -
export class ShopState {
    public buys:BuyModel[]=[] ;
}


// 2. Action Type - the list of operation we perform on our global state:
export enum ShopActionType {
    EditProduct = "Edit Product" ,
    FetchAllBuys = "Fetch All Buys"
}

//3. Action - a single object which dispatch sends to Redux for some changes:
export interface ShopAction {
    type: ShopActionType,
    payload:any;
}


//4. Reducer - a function which will be invoked when calling dispatch to perform the operation 
export function shopReducer(currentState = new ShopState(), action: ShopAction) {

    const newState = { ...currentState };

    switch(action.type){
        case ShopActionType.EditProduct : //Here the payload is a product to Edit 
            const indexToUpdate = newState.buys.findIndex(buy => buy.id === action.payload.id)
            if (indexToUpdate >= 0) {
                newState.buys[indexToUpdate] = action.payload;
            }else{
                newState.buys.push(action.payload)
            }
            break;
        case ShopActionType.FetchAllBuys:
            newState.buys = action.payload;
            break;
    }

    return newState;
}

//5. Store - manager object from redux which handles the entire operations: (dispatch, getState, subscribe)
export const shopStore = createStore(shopReducer);