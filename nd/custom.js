import { findIndex, propEq, append, assocPath } from "ramda"

export const addTodo = ({ props: { todos }, val: { newTask }, set }) =>
  set(append({ task: newTask, key: Date.now() })(todos), "todos")
addTodo.props = ["todos"]
