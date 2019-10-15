import * as React from "react";
import { Provider, useSelector } from "react-redux";
import store, { Store } from "./store";
import "./shopping-style.css";

const ShopApp = () => {
	let shopping = useSelector((store: Store) => store);
	return (
		<div className="shopping">
			<div className="stock">
				<h2>Shop stock</h2>
				{shopping.stock.map(product => (
					<div className="product">
						<span className="quantity">x{product.quantity}</span>
						<span className="name">{product.name}</span>
						<span className="price">{product.price} credits/unit</span>
						<span className="add-to-cart">
							{product.quantity > 0 ? (
								<button onClick={() => shopping.buy(product.id, 1)}>
									Add to cart
								</button>
							) : (
								<span>out of stock</span>
							)}
						</span>
					</div>
				))}
			</div>
			<div className="separator"></div>
			<div className="cart">
				<h2>Your cart</h2>
				{shopping.cart
					.filter(product => product.quantity > 0)
					.map(product => (
						<div className="product">
							<span className="quantity">x{product.quantity}</span>
							<span className="name">{product.name}</span>
							<span className="price">{product.price} credits/unit</span>
							<span className="total">{product.total()} credits</span>
						</div>
					))}

				{shopping.cart.filter(({ quantity }) => quantity > 0).length === 0
					? "Your cart is empty. Click on 'Add to cart' to add an item to the cart."
					: ""}
			</div>
			<div class="cart-total">{shopping.cart.total()} credits</div>
			<button onClick={shopping.checkout.bind(shopping)}>Checkout</button>
		</div>
	);
};

const ShopAppWrapper = () => {
	return (
		<Provider store={store}>
			<ShopApp />
		</Provider>
	);
};

export default ShopAppWrapper;
