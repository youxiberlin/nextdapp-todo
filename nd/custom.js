import { findIndex, propEq, append, assocPath } from "ramda"

export const addTodo = ({ props: { todos }, val: { newTask }, set }) =>
  set(append({ task: newTask, key: Date.now() })(todos), "todos")
addTodo.props = ["todos"]

export const markDone = ({ props: { todos }, val: { todo }, set }) => {
  const index = findIndex(propEq("key", todo.key))(todos)
  set(assocPath([index, "done"], true)(todos), "todos")
}
markDone.props = ["todos"]
