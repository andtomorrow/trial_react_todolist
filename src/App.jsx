import { createContext, useEffect, useReducer, useState } from "react"
import "./styles.css"
import { TodoItem } from "./TodoItem"
import { NewTodoForm } from "./NewTodoForm"
import { FilterForm } from "./FilterForm"
import { TodoList } from "./TodoList"

const LOCAL_STORAGE_KEY = "TODOS"

const ACTIONS = {
  ADD: "ADD",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
}

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [...todos, { name: payload.name, completed: false, id: crypto.randomUUID() }]
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.todoId) return { ...todo, completed: payload.completed }

        return todo
      })
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.todoId)
    default:
      throw new Error(`No action found for ${type}.`)
  }
}

export const TodoContext = createContext()

function App() {
  const [filterName, setFilterName] = useState("")
  const [hideCompletedFilter, setHideCompletedFilter] = useState(false)
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value == null) return initialValue

    return JSON.parse(value)
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const filteredTodos = todos.filter((todo) => {
    if (hideCompletedFilter && todo.completed) return false
    return todo.name.includes(filterName)
  })

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } })
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { todoId, completed } })
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { todoId } })
  }

  return (
    <TodoContext.Provider value={{ todos: filteredTodos, addNewTodo, toggleTodo, deleteTodo }}>
      <FilterForm filterName={filterName} setFilterName={setFilterName} hideCompletedFilter={hideCompletedFilter} setHideCompletedFilter={setHideCompletedFilter} />
      <TodoList />
      <NewTodoForm />
    </TodoContext.Provider>
  )
}

export default App
