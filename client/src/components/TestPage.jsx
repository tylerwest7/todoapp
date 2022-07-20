import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { login } from "../contexts/UserContext";
import Todo from "../components/components/Todo";

function TestPage() {
  const [todoID, setTodoID] = useState(1);
  const [todoText, setTodoText] = useState("");
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [fieldEmpty, setFieldEmpty] = useState(true);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [storageAvail, setStorageAvail] = useState(null);

  const containerStyle = {
    minHeight: "40rem",
    maxHeight: "40rem",
    overflow: "hidden",
  };

  const listStyle = {
    minHeight: "31rem",
    maxHeight: "31rem",
    overflowY: "scroll",
  };

  //Check for local storage

  function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

  function checkStorage() {
    if (storageAvailable("localStorage")) {
      console.log("can use local storage");
      setStorageAvail(true);
    } else {
      console.log("cant use local storage");
      setStorageAvail(false);
    }
  }

  //Check for local storage

  function handleSubmit(e) {
    e.preventDefault();

    if (fieldEmpty) {
      return console.log("Empty");
    } else {
      //Create and set new todo
      setTodoID(todoID + 1);
      const newtodo = { title: todoText, key: todoID, completed: false };
      setTodo(newtodo);

      //Add created todo to todos array
      setTodos([...todos, newtodo]);

      //Reset input text
      //console.log(todos);
      setTodoText("");
    }
  }

  //Handle delete
  function handleDelete(index) {
    const newTodos = todos.filter((todos) => todos.key !== index.key);
    setTodos(newTodos);
  }

  //Handle complete
  function handleComplete(index) {
    setTodos(
      todos?.map((item) => {
        if (item.key === index.key) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  }

  //Check for completed
  function completedList() {
    const completedTodoList = todos?.filter((item) => item.completed == true);
    //console.log(completedTodoList);
    if (completedTodoList) {
      setCompletedTodos(completedTodoList);
    } else {
      setCompletedTodos({});
    }
  }

  //Check for empty array
  function emptyList() {
    if (todos?.length === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }

  //Check for empty field
  function emptyField() {
    //Check if input is empty
    if (todoText == "") {
      //console.log("empty");
      setFieldEmpty(true);
    } else {
      //console.log("typing");
      setFieldEmpty(false);
    }
  }

  function getLocalStorage() {
    try {
      console.log("Getting local storage");
      const data = localStorage.getItem("todos");
      setTodos(JSON.parse(data));
      const dataID = localStorage.getItem("todoID");
      setTodoID(JSON.parse(dataID));
    } catch (e) {
      console.log("Couldnt parse local storage");
    }
  }

  useEffect(() => {
    getLocalStorage();
    storageAvailable();
    checkStorage();
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("todoID", JSON.stringify(todoID));
    completedList();
    emptyList();
    emptyField();
  }, [todos, todoID, todoText]);

  return (
    <div className="w-screen h-screen bg-blue-100 flex items-center justify-center">
      <div
        style={containerStyle}
        className="container w-11/12 bg-gray-50 rounded-md relative"
      >
        <div className="p-4 flex">
          <h1 className="w-6/12 text-left font-bold text-left float-left">
            Todo app
          </h1>
          <div className="w-6/12 text-right flex justify-end">
            <h2 className="">{completedTodos?.length + "/"}</h2>
            <h2 className="">{todos?.length + " Completed"}</h2>
          </div>
        </div>
        <form className="pr-4 pl-4 w-full flex" onSubmit={handleSubmit}>
          <input
            placeholder="Enter a todo (ex. Wash the dishes)"
            className="rounded-l-md bg-gray-100 w-9/12 h-12 p-4"
            type="text"
            id={todoID}
            name="todo"
            value={todoText}
            onChange={(e) => {
              setTodoText(e.target.value);
            }}
          />
          {!fieldEmpty ? (
            <button className="bg-blue-600 w-3/12 h-12 rounded-r-md text-white">
              Add todo
            </button>
          ) : (
            <button className="bg-blue-600 w-3/12 h-12 rounded-r-md text-gray-300">
              Add todo
            </button>
          )}
        </form>
        {isEmpty ? (
          <div
            style={listStyle}
            className="bg-gray-200 m-4 rounded-md flex items-center justify-center"
          >
            <h1>No todos added!</h1>
          </div>
        ) : (
          <ul style={listStyle} className="bg-gray-200 m-4 rounded-md">
            {todos?.map((item, index) => (
              <Todo
                key={item.key}
                handleDelete={() => handleDelete(item, index)}
                title={item.title}
                completed={false}
                handleComplete={() => handleComplete(item, index)}
                todoCompleted={item.completed}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TestPage;
