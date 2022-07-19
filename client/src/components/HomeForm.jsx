import React, {useState, useEffect, useContext} from "react";
import axios from 'axios';
import TodoListItem from './TodoListItem';
import { useNavigate } from "react-router-dom";

function HomeForm(props){

    //
    const navigate = useNavigate();

    //Set states
    const [todos, setTodos] = useState({
        title: "",
        desc: ""
    })
    const [todoList, setTodoList] = useState([])
    const [user, setUser] = useState([]);
    const emptyFields = function(){
        setTodos({
            title: "",
            desc: ""
        })
    }

    //Get posts
    const getUser = async () => {
        return await axios.get('/userlist');
    };

    //Get posts
    const getPosts = async () => {
        return await axios.get('/todos');
    };

    //Use effect
    useEffect(() => {
        getUser()
        .then((response) => {
            const newUserList = response.data;
            setUser(newUserList);
        })
        getPosts()
        .then((response) => {
            const newTodoList = response.data;
            setTodoList(newTodoList);
        })
    },[])

    //Handle change
    function changeHandler(e){
        const name = e.target.name;
        const value = e.target.value;
        setTodos({...todos, [name]: value});
    }

    //Post
    function handleSubmit(e){
        e.preventDefault();
        axios.post('/todos', {
            title: todos.title,
            desc: todos.desc,
            completed: false
        })
        .then(function (response) {
            getPosts()
                .then((response) => {
                    const newTodoList = response.data;
                    setTodoList(newTodoList);
                    emptyFields();
                })
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    //Delete
    function deleteHandler(e, todo){
        e.preventDefault();

        //Delete database
        axios.post('/todos/delete', {
            todoToDelete: todo
        })
        .then(function(){
            //Filter locally
            const newTodoListFiltered = todoList.filter(todoItem => todoItem._id !== todo._id);
            setTodoList(newTodoListFiltered);
        })

        //Update posts
        getPosts()
            .then((response) => {
                const newTodoList = response.data;
                setTodoList(newTodoList);
            })
    }

    //Sign out
    function soHandler(){
        //console.log('Logging out');
        //auth.logout(user);
        axios.post('/auth/logout')
            .then((response) => {
                console.log('Logged out');
                navigate('/login');
            })
    }

    return(
        <div>
            <h1>Hello</h1>
            <button onClick={soHandler}>Sign out</button>
            <form onSubmit={handleSubmit}>
                <input name="title" value={todos.title} onChange={changeHandler} placeholder="todoTitle"></input>
                <input name="desc" value={todos.desc} onChange={changeHandler} placeholder="todoDesc"></input>
                <button>Submit todo</button>
            </form>
            <div>
                {todoList.map((todo) => 
                    <TodoListItem key={todo._id} title={todo.title} desc={todo.desc} deleteHandler={(e) => deleteHandler(e, todo)}/>
                )}
            </div>
        </div>
    )
}

export default HomeForm;