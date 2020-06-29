import { bind } from "nd"
import { o, map, addIndex, sortBy } from "ramda"
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

const TodoUndone = bind(
  (props) => {
    const { todo, init } = props;
    const fn = init()
    return (
      <div style={style.todo}>
        <div style={style.task}>{todo.task}</div>
        <div
          style={style.btn}
          onClick={() => {
            fn.markDone({ todo })
            // console.log('todo', todo)
            // console.log('props.todos:', todos)
          }}
        >
          Done
        </div>
      </div>
  )},
  [
    "markDone",
  ]
)

const Todo = ({ todo }) =>
      todo.done
      ? <TodoDone todo={todo} />
      : <TodoUndone todo={todo} />

export default bind(
  ({ todos, getDones }) => {
    return (
      <div style={style.container}>
        <div>Done: {getDones}</div>
        <div>{getDones * 2}</div>
        <div style={style.todos}>
          <NewTask />
          {o(
          map(v => <Todo todo={v} />),
          sortBy(v => (v.done ? 1 : 0))
        )(todos)}
        </div>
      </div>
    )
  },
  [
    "todos",
    {
      getDones: {
        get: atoms => ({ get }) => {
          const todos = get(atoms.todos);
          const dones = todos.filter(todo => todo.done === true);
          return dones.length;
        }
      }
    }
  ]
)
