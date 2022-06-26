import axios from 'axios';

const baseUrl = "http://localhost:3001/todos";


export const getTodos  = async(id) => {
  id = id || '';
  return   await axios.get(`${baseUrl}/${id}`)
}

export const createTodo = async(todo) => {
  return await axios.post(`${baseUrl}`, todo)
}

export const deleteTodos = async(id) => {
  return await axios.delete(`${baseUrl}/${id}`)
}

export const editTodo = async(id, todo) => {
  return await axios.patch(`${baseUrl}/${id}`, todo)
}
