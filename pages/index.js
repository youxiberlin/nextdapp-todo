import { bind } from "nd"
import { map } from "ramda"
import style from "./style";

export default bind(
  ({ todos }) => (
    <div style={style.container}>
      <div style={style.todos}>{map(v => <div>{v.task}</div>)(todos)}</div>
    </div>
  ),
  ["todos"]
)