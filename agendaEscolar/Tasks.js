import React, { Fragment, useState, useRef } from "react";

import { TodoList } from "./components/TodoList";

export function Tasks() {
    const [todos, setTodos] = useState([
        { id: 1, task: "Tarea 1", completed: false}
    ]);

    const todoTaskRef = useRef();

    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if (task == '') return;

        setTodos((prevTodos) => {
            return [...prevTodos, {id: 0, task, completed: false}]
        });

        todoTaskRef.current.value = null;
    };

    return (
        <Fragment>
            <TodoList todos={todos} />
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
            <button onClick={handleTodoAdd}>Añadir</button>
            <button>Eliminar</button>
        </Fragment>
    );
}