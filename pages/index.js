import { bind } from "nd"
import { map } from "ramda"
import style from "./style";

export default bind(
  ({ todos }) => (
    <div style={style.container}>
      <div style={style.todos}>
        <div>{todos.map(todo => <div>{todo.task}</div>)}</div>
      </div>
    </div>
  ),
  ["todos"]
)