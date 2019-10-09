import * as React from "react";
import CounterApp from "./counter/Counter";
import TodoListApp from "./todo/TodoList";
import "./app";

const App = () => {
	return (
		<div>
			<h1>Erudx examples</h1>
			This page showcases examples written using <a href="https://github.com/atersolis/erudx">erudx</a>. <br/>
			The source code of those examples can be found <a href="https://github.com/atersolis/erudx-examples">here</a>.
			<div class="separator"></div>
			<h2>Counter example</h2>
			<CounterApp />
			<div class="separator"></div>
			<h2>Todo List example</h2>
			<TodoListApp />
		</div>
	);
};

export default App;
