import React from "react";

export default function Todo(props) {
  return (
    <li className="pr-2 pl-2 pt-2">
      <div className="h-12 flex w-full items-center rounded-md bg-gray-50 p-2">
        <div className="w-6/12 overflow-hidden">
          {props.todoCompleted ? (
            <h3 className="text-left opacity-10 line-through text-sm overflow-ellipsis w-4/5 overflow-hidden">
              {props.title}
            </h3>
          ) : (
            <h3 className="text-left opacity-100 overflow-ellipsis w-4/5 overflow-hidden">
              {props.title}
            </h3>
          )}
        </div>
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
              className="text-xs float-right mr-2 bg-green-200 p-1 rounded-md"
            >
              Task completed
            </button>
          ) : (
            <button
              onClick={props.handleComplete}
              className="text-xs float-right mr-2 bg-red-400 p-1 rounded-md"
            >
              Complete task
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
