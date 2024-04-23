import React, { useState } from "react";
import "./App.css";
import Todo from "./Todo";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";

function App() {
  let [tasks, setTasks] = useState([
    { id: v1(), title: "Тестовое задание", isDone: false },
    { id: v1(), title: "Прекрасный код", isDone: false },
    { id: v1(), title: "Покрытие тестами", isDone: false },
  ]);

  const [filter, setFilter] = useState<FilterValuesType>("all");

  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false };
    let newTasks = [...tasks, newTask];
    setTasks(newTasks);
  }

  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }

    setTasks([...tasks]);
  }

  const changeFilter = (value: FilterValuesType) => {
    setFilter(value);
  };

  let tasksForTodolist = tasks;
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.isDone === true);
  }

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.isDone === false);
  }

  const remainingTasksCount = tasks.filter((t) => !t.isDone).length;

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((t) => !t.isDone);
    setTasks(updatedTasks);
  };
  return (
    <div className="App">
      <Todo
        tasks={tasksForTodolist}
        title={""}
        changeFilter={changeFilter}
        remainingTasksCount={remainingTasksCount}
        clearCompletedTasks={clearCompletedTasks}
        addTask={addTask}
        changeStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
