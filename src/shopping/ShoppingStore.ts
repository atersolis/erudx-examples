import { store, action, afterClone, mount, composedAction } from "erudx";

interface Product {
	id: string;
	name: string;
	price: number;
	quantity: number;
};

@store
class ProductStore implements Product {
	id: string;
	name: string;
	price: number;
	quantity: number;

	constructor(id: string, name: string, price: number, quantity: number) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.quantity = quantity;
	}

	@action
	add(quantity: number) {
		this.quantity += quantity;
	}

	@action
	remove(quantity: number) {
		this.quantity -= Math.min(quantity, this.quantity);
	}

	@action
	setQuantity(quantity: number) {
		this.quantity = quantity;
	}

	total() {
		return this.price * this.quantity;
	}
}

@store
class ProductCollectionStore {
	constructor(products: Product[], maxQuantity: number = Infinity) {
		for (let { id, name, price, quantity } of products) {
			let finalQuantity = maxQuantity <= quantity ? maxQuantity : quantity;
			let store = new ProductStore(id, name, price, finalQuantity);
			mount(store, this, id);
			this[id] = store;
		}
	}

	asArray() {
		return Object.values(this) as ProductStore[];
	}

	filter(callbackfn: (value: ProductStore, index: number, array: ProductStore[]) => boolean, thisArg?: any) {
		return this.asArray().filter(callbackfn, thisArg);
	}

	map(callbackfn: (value: ProductStore, index: number, array: ProductStore[]) => unknown, thisArg?: any) {
		return this.asArray().map(callbackfn, thisArg);
	}

	total() {
		let total = 0;
		for(let {price, quantity} of this.asArray()) {
			total += price * quantity;
		}
		return total;
	}
}

@store
class ShoppingStore {
	stock: ProductCollectionStore;
	cart: ProductCollectionStore;

	constructor(products: Product[]) {
		this.stock = mount(new ProductCollectionStore(products), this, "stock");
		this.cart = mount(new ProductCollectionStore(products, 0), this, "cart");
	}

	@composedAction
	buy(productId: string, quantity: number) {
		let stockProduct = this.stock[productId];
		let cartProduct = this.cart[productId];

		if (stockProduct && cartProduct && stockProduct.quantity >= quantity) {
			stockProduct.remove(quantity);
			cartProduct.add(quantity);
		}
	}

	@composedAction
	checkout() {
		for (let productId in this.cart) {
			this.cart[productId].setQuantity(0);
		}
	}
}

export default ShoppingStore;