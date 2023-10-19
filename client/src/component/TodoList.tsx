import axios from "axios";
import { useEffect, useState } from "react";
import { Todo } from "../entities/todo.entities";

const TodoList = () => {
  const [listTodo, setListTodo] = useState<Todo[]>([]);
  const [addTodo, setAddTodo] = useState("");

  const loadTodoList = () => {
    axios
      .get("http://localhost:3000/api/v1/todos")
      .then((res) => {
        setListTodo(res.data.todo);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/v1/todos", { todoName: addTodo })
      .then((res) => {
        loadTodoList();
        setAddTodo("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/v1/todos/${id}`)
      .then((res) => {
        setTimeout(() => {
          loadTodoList();
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  const toggleTodoStatus = (id: number, completed: boolean) => {
    axios
      .put(`http://localhost:3000/api/v1/todos/${id}`, { completed: !completed })
      .then(() => {
        loadTodoList();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadTodoList();
  }, []);
  return (
    <div className="flex justify-center">
      <div className=" bg-rose-500 text-white w-1/3 p-10">
        <h1 className="text-3xl">Todo List</h1>
        <p className="">Get things done, one item at a time</p>
        <hr className="my-2 " />
        {listTodo.length > 0 &&
          listTodo.map((todo, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 "
            >
              <div>
                <span>{todo.todoName}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-5">
                  <input
                    value={addTodo}
                    onChange={(e) => setAddTodo(e.target.value)}
                    type="checkbox"
                  />
                </span>
                <i
                  onClick={() => handleDelete(todo.todoId)}
                  className="fa-solid fa-trash"
                ></i>
              </div>
            </div>
          ))}

        <div className=" flex items-center justify-end">
          <span className="mr-5">Move at item the end?</span>
          <span className="bg-white px-1 rounded-2xl">
            <input type="radio" />
            <input type="radio" />
          </span>
        </div>

        <div className="py-10">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl">Add Todo List</h2>
            <div className="flex items-center">
              <input
                className="w-96 h-10 pl-2 text-black"
                placeholder="Add Todo"
                name="todo"
                type="text"
                value={addTodo} // Kết nối giá trị trường văn bản
                onChange={(e) => setAddTodo(e.target.value)}
              />
              <button type="submit" className="bg-blue-400 h-10 px-5">
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
