import { Routes, Route } from "react-router-dom";
import TodoList from "./component/TodoList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TodoList/>} />
      </Routes>
    </>
  );
}

export default App;
