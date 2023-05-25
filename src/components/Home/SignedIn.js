'use client';

import { useEffect, useState } from 'react';
import supabase from '../../lib/supabase-browser.js';

export default function SignedIn() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getTodos();
  }, []);

  // Fetches the user id from the database
  async function getUserId() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user.id;
  }

  // Fetches the todos from the database
  async function getTodos() {
    const userId = await getUserId();
    const { data } = await supabase.from('todos').select('*').eq('user_id', userId);
    setTodos(data);
  }

  // Adds a new todo to the database
  async function addTodo(event) {
    event.preventDefault();

    const userId = await getUserId();
    await supabase.from('todos').insert([{ text, user_id: userId }]);
    getTodos();

    setText('');
  }

  // Deletes a todo from the database
  async function deleteTodo(id) {
    await supabase.from('todos').delete().match({ id });
    getTodos();
  }

  return (
    <div className="flex flex-col items-center space-y-8">
      <form onSubmit={addTodo} className="flex w-full max-w-xl">
        <input
          type="text"
          placeholder="New Todo"
          onChange={(event) => setText(event.target.value)}
          value={text}
          className="w-full rounded-l border border-gray-300 p-2 px-4 focus:ring-inset"
          required
        />
        <button
          type="submit"
          className="whitespace-nowrap rounded-r bg-indigo-500 px-3 py-2 text-white hover:bg-indigo-600"
          onClick={addTodo}
        >
          New todo
        </button>
      </form>
      <ul className="w-full max-w-xl space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between space-x-4 rounded border border-gray-300 bg-white px-4 py-3 text-gray-500"
          >
            <span className="line-clamp-1">{todo.text}</span>
            <button
              type="button"
              className="rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
