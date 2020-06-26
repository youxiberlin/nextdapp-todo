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

const TodoDone = ({ todo }) => (
  <div style={style.todo}>
    <s>{todo.task}</s>
    <div style={style.emptyBtn}/>
  </div>
)

const TodoUndone = ({ todo }) => (
  <div style={style.todo}>
    <div style={style.task}>{todo.task}</div>
    <div
      style={style.btn}
      onClick={() => {
        // Mark done
      }}
    >
      Done
    </div>
  </div>
)

const Todo = ({ todo }) =>
      todo.done
      ? <TodoDone todo={todo} />
      : <TodoUndone todo={todo} />

export default bind(
  ({ todos }) => {
    // const { todos } = props;
    // console.log('todos', todos)
    return (
      <div style={style.container}>
        <div style={style.todos}>
          <NewTask />
          {todos.map(todo => <Todo todo={todo}/>)}
        </div>
      </div>
    )
  },
  ["todos"]
)
