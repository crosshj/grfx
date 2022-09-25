import undoable from './undoable.js';

const state = undoable({
	todos: [],
	filter: "all"
});
const setTodos = state.setter("todos");
const setFilter = state.setter("filter");

const log = (which) => (x) => console.log(
	which + ": " + JSON.stringify(x,null,2),
	//history
);

const unsubscribeTodos = state.subscribe("todos", log("todos"))
const unsubscribeFilter = state.subscribe("filter", log("filter"))

setTodos((todos) => todos.push({ caption: "Hello", done: false }));
state.undo();
state.redo();
setFilter("none");

export default {};
