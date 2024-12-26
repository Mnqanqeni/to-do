import React, { useState } from "react";
import { useTodo } from "../contexts/TodoContext";


export default function TodoItem({todo}) {
  const [isTodoEditable, setIsTodoEditble] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  const { toggleComplete, deleteTodo,updateTodo } = useTodo();
  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditble(false);
  };
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };
  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
        <input 
        type="checkbox"
        className="cursor-pointer border"
        checked={todo.completed}
        onChange={toggleCompleted}

        />
          <input type="text" 
        className={`border outline-none w-full bg-transparent rounded-lg ${isTodoEditable ? "border-black/10 px-2" : "border-transparent"}`}
        value={todoMsg}
        onChange={(e) => {
            setTodoMsg(e.target.value)
           
        }}
        readOnly={!isTodoEditable}
        />
        <button
        className='inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50'
        onClick={() => {
            if (todo.completed) return
            if (isTodoEditable) {
                editTodo()
            }else setIsTodoEditble((prev) => !prev)
        }}
        disabled={todo.completed}
        >{isTodoEditable ? "📁": "✏️"}</button>
        <button
        className='inline-flex w-8 h-8 rounded-lg text-lg border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 text-red-900 font-bold'
        onClick={() => deleteTodo(todo.id)}
        >❌</button>
    </div>
  );
}
