import { ChangeEvent, MouseEventHandler, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  changeFilter: (value: FilterValuesType) => void;
  remainingTasksCount: number;
  clearCompletedTasks: MouseEventHandler<HTMLButtonElement>;
  addTask: (title: string) => void;
  changeStatus: (taskId: string, isDone: boolean) => void;
  filter: FilterValuesType;
};

function Todo(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13 && newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    }
  };
  const onAllClickHandler = () => props.changeFilter("all");
  const onActiveClickHandler = () => props.changeFilter("active");
  const onCompletedClickHandler = () => props.changeFilter("completed");
  return (
    <div>
      <h1 className="title">todos</h1>
      <div className="container">
        <div className="input-container">
          <input
            className="input"
            value={newTaskTitle}
            onChange={onNewTaskTitle}
            onKeyPress={onKeyPressHandler}
            placeholder="What needs to be done?"
          />
        </div>
        <ul className="list">
          {props.tasks.map((t) => {
            const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
              props.changeStatus(t.id, e.currentTarget.checked);
            };
            return (
              <li key={t.id} className="item">
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={onchangeHandler}
                  checked={t.isDone}
                />
                <span className="task__title">{t.title}</span>
              </li>
            );
          })}
        </ul>
        <div className="button__container">
          <button>
            {props.remainingTasksCount}{" "}
            {props.remainingTasksCount === 1 ? "item" : "items"} left
          </button>
          <div>
            <button
              id="вutton"
              className={props.filter === "all" ? "active__filter" : ""}
              onClick={onAllClickHandler}
            >
              All
            </button>
            <button
              id="вutton"
              className={props.filter === "active" ? "active__filter" : ""}
              onClick={onActiveClickHandler}
            >
              Active
            </button>
            <button
              id="вutton"
              className={props.filter === "completed" ? "active__filter" : ""}
              onClick={onCompletedClickHandler}
            >
              Completed
            </button>
          </div>
          <button id="вutton" onClick={props.clearCompletedTasks}>
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
