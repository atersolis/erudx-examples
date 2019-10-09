import * as React from "react";
import { store, action, route, reduce, mount, props } from "erudx";
import { useStore } from "erudx/hooks";
import "./todo-list-style.css";
import { CollectionStore } from "erudx/stores";

@store
class TaskStore {
	text: string;
	done: boolean;

	constructor(text: string, done: boolean = false) {
		this.text = text;
		this.done = done;
	}

	@action
	toggleDone() {
		this.done = !this.done;
	}

	@action
	setText(text: string) {
		this.text = text;
	}
}

const Task = ({ text, done, toggleDone, close }) => {
	return (
		<div class={"task-container" + (done ? " done" : "")}>
			<span class="task-check" onClick={toggleDone}>
				<span>{done ? "✔" : ""}</span>
			</span>
			<span class={"task-text"}>{text}</span>
			<span class="close" onClick={close}>
				x
			</span>
		</div>
	);
};

type Filter = "all" | "done" | "todo";
@store
class TodoListStore {
	tasks: CollectionStore<TaskStore>;
	filter: Filter = "all";

	constructor(tasks: string[] = []) {
		let taskStores = tasks.map(task => new TaskStore(task));
		this.tasks = mount(new CollectionStore(taskStores), this, "tasks");
	}

	addTask(text: string) {
		let task = new TaskStore(text, false);
		this.tasks.push(task);
	}

	remove(index: number) {
		this.tasks.splice(index, 1);
	}

	@action
	setFilter(filter: Filter) {
		this.filter = filter;
	}

	requestedTasks() {
		return this.tasks.filter(
			task =>
				this.filter === "all" ||
				(this.filter === "done" && task.done) ||
				(this.filter === "todo" && !task.done)
		);
	}
}

@store
class InputStore {
	value: string = "";

	constructor(text: string = "") {
		this.value = text;
	}

	@action
	setValue(text) {
		this.value = text;
	}

	@action
	clear() {
		this.value = "";
	}
}

const Input = ({ value, setValue, placeholder }) => {
	return (
		<input
			type="text"
			value={value}
			placeholder={placeholder}
			onChange={e => setValue((e.target as any).value)}
		/>
	);
};

const TodoListApp = () => {
	let input = useStore(new InputStore());
	let todoList = useStore(new TodoListStore(["Task A", "Task B"]));

	return (
		<div class="todo-list-container">
			<form
				onSubmit={event => {
					event.preventDefault();
					todoList.addTask(input.value);
					input.clear();
				}}
			>
				<Input placeholder="What need to be done ?" {...props(input)} />
			</form>
			<div class="todo-list-tasks">
				{todoList.requestedTasks().map((task, i) => (
					<div>
						<Task {...props(task)} close={() => todoList.remove(i)} />
					</div>
				))}
			</div>
			<div class="todo-filter">
				<a href="#" onClick={() => todoList.setFilter("all")}>
					All
				</a>
				<a href="#" onClick={() => todoList.setFilter("done")}>
					Done
				</a>
				<a href="#" onClick={() => todoList.setFilter("todo")}>
					Todo
				</a>
			</div>
		</div>
	);
};

export default TodoListApp;
