'use client';

import React, { useEffect, useState } from 'react';
import supabase from '@/lib/supabase-browser';

export default function AddNewTodo() {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log(text);
  }, [text]);

  async function getUserId() {
    const { data: user } = await supabase.auth.getUser();
    return user.user.id;
  }

  async function addTodo(event) {
    event.preventDefault();

    const userId = await getUserId();

    await supabase.from('todos').insert([{ text, user_id: userId }]);

    event.target.reset();
  }

  return (
    <form onSubmit={addTodo}>
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
        placeholder="New Todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
