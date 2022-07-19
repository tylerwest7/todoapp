import React from "react";

export default function Todo(props) {
  return (
    <li className="pr-2 pl-2 pt-2">
      <div className="h-12 flex w-full items-center rounded-md bg-gray-50 p-2">
        {props.todoCompleted ? (
          <h3 className="w-6/12 text-left opacity-10 line-through">
            {props.title}
          </h3>
        ) : (
          <h3 className="w-6/12 text-left opacity-100">{props.title}</h3>
        )}
        <div className="w-6/12 flex justify-end">
          <button
            className="text-xs float-right bg-blue-600 rounded-md p-2 text-white order-last"
            onClick={props.handleDelete}
          >
            Delete
          </button>
          {props.todoCompleted ? (
            <button
              onClick={props.handleComplete}
              className="text-xs float-right mr-2 bg-green-200 p-2 rounded-md"
            >
              Task completed
            </button>
          ) : (
            <button
              onClick={props.handleComplete}
              className="text-xs float-right mr-2 bg-red-400 h-full p-2 rounded-md"
            >
              Complete task
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
