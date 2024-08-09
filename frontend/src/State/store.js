import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { customerProductReducer } from "./Product/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";
import { adminOrderReducer } from "./AdminOrder/Reducer";
import { collectionsReducer } from "./Collection/Reducer";
import { addressReducer } from "./Address/Reducer";
import { walletReducer } from "./Wallet/Reducer";
import { couponReducer } from "./Coupon/Reducer";

import journalReducer from "./Journal/reducers";

const rootReducers = combineReducers({
    auth: authReducer,
    products: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
    journal: journalReducer,
    collections: collectionsReducer,
    address: addressReducer,
    wallet: walletReducer,
    coupon: couponReducer,
})

export const store = createStore(rootReducers, applyMiddleware(thunk))