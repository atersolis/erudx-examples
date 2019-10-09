import * as React from "react";
import { store, action, props } from "erudx";
import { useStore } from "erudx/hooks";
import "./counter-style.css"

@store
class CounterStore {
	counter: number = 0;

	constructor(x) {
		this.counter = x;
	}

	@action
	increment() {
		this.counter++;
	}

	@action
	decrement() {
		this.counter--;
	}
}

const Counter = ({ counter, increment, decrement }) => {
	return (
		<div class="counter-container">
			<h1 class="counter-number">{counter}</h1>
			<div class="counter-actions">
				<button class="plus" onClick={decrement}>-</button>
				<button class="minus" onClick={increment}>+</button>
			</div>
		</div>
	);
};

const CounterApp = () => {
	let counter = useStore(new CounterStore(0));
	return <Counter {...props(counter)} />;
};

export default CounterApp;
