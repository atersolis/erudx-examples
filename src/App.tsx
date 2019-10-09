import * as React from "react";
import CounterApp from "./counter/Counter";
import TodoListApp from "./todo/TodoList";
import { useStore } from "erudx/hooks";
import { CollectionStore, record } from "erudx/stores";
import "./app";

const App = () => {
	let collection = useStore(new CollectionStore([0, 1]));

	return (
		<div>
			<h1>Counter example</h1>
			<CounterApp />
			<div class="separator"></div>
			<h1>Todo List example</h1>
			<TodoListApp />
			<div class="separator"></div>
			<h1>Collection</h1>
			{collection.map((n, i) => (
				<span key={i}>{n}</span>
			))}
		</div>
	);
};

export default App;
