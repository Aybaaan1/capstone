"use client";
import { useState, useEffect } from "react";

export default function TodoList() {
  const [type, setType] = useState("");
  const [des, setDes] = useState("");
  const [list, setList] = useState([]);

  async function fetchUser() {
    try {
      const res = await fetch("/api/todolist");
      const data = await res.json();
      setList(data.todolist);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  console.log(list);

  async function handleSubmit(e) {
    e.preventDefault();
    alert("Submitted successfully");
    const res = await fetch("/api/todolist/new", {
      method: "POST",
      body: JSON.stringify({ type, des }),
    });
    if (res.ok) {
      fetchUser();
      alert("Submitted successfully");
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form>
        <label>Type</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          value={des}
          onChange={(e) => setDes(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          click me
        </button>
      </form>
      {list.map((list) => (
        <div>
          <p>{list.type}</p>
          <p>{list.des}</p>
        </div>
      ))}
    </div>
  );
}
