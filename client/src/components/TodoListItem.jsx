import react from "react";

function TodoListItem(props) {
    return(
        <div>
            <h2>{props.title}</h2>
            <h4>{props.desc}</h4>
            <button onClick={props.deleteHandler}>Delete</button>
        </div>
    )
}

export default TodoListItem;