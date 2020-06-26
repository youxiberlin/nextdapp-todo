import { bind } from "nd"
import { map } from "ramda"
import style from "./style";
import { useState } from "react"

const isBlank = val => /^\s*$/.test(val);

const NewTask = bind(
  ({ init }) => {
    const [newTask, setNewTask] = useState("");
    const fn = init();
    return (
      <div sytle={style.newTask}>
        <input
          style={style.input}
          value={newTask}
          onChange={e => {
            setNewTask(e.target.value)
          }}
        />
        <div
          style={style.add}
          onClick={() => {
            if (!isBlank(newTask)) {
              fn.addTodo({ newTask })
              setNewTask("")
            }
          }}
        >
          Add
        </div>
      </div>
    )
  },
  ["addTodo"]
)

export default bind(
  ({ todos }) => {
    // const { todos } = props;
    // console.log('todos', todos)
    return (
      <div style={style.container}>
        <div style={style.todos}>
          <NewTask />
          {todos.map(todo => <div>{todo.task}</div>)}
        </div>
      </div>
    )
  },
  ["todos"]
)
