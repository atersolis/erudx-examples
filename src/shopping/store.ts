import { createStore } from "redux";
import ShoppingStore from "./ShoppingStore";
import products from "./products";
import { getReducer, setDispatch } from "erudx";

const shoppingCart = new ShoppingStore(products);
const store = createStore(getReducer(shoppingCart), shoppingCart);
setDispatch(shoppingCart, store.dispatch);

export type Store = ShoppingStore;
export default store;