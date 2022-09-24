import undoable from './undoable.js';

const state = undoable({
	todos: [{ caption: "get started", done: true }],
	filter: "all"
});
const setTodos = state.setter("todos");

const log = (x) => console.log(
	JSON.stringify(x,null,2),
	//history
);

const unsubscribe = state.subscribe("todos", log)

setTodos((todos) => todos.push({ caption: "Hello", done: false }));
state.undo();
state.redo();

export default {};
