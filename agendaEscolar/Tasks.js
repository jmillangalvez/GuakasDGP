import React, { Fragment, useState, useRef, useEffect } from "react";
import { TodoList } from "./components/TodoList";

const KEY ="todoApp.todos";

export function Tasks() {
    const [todos, setTodos] = useState([
        { id: 0, task: "Tarea 1", completed: false}
    ]);

    const todoTaskRef = useRef();
    const idTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id == id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    };

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        const id = idTaskRef.current.value;
        if (task == '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id, task, completed: false}]
        });

        todoTaskRef.current.value = null;
    };

    const handleClearAll = () => {
        const newTodos = todos.filter((todo) => !todo.completed);
        setTodos(newTodos);
    };

    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
            <input ref={idTaskRef} type="text" placeholder="Id de la Nueva Tarea" />
            <button onClick={handleTodoAdd}>Añadir</button>
            <button onClick={handleClearAll}>Eliminar Completadas</button>
            <div>Te quedan {todos.filter((todo) => !todo.completed).length}</div>
        </Fragment>
    );
}