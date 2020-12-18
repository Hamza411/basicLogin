// const mainPoint = "https://kwanso-backend.herokuapp.com/api"
const mainPoint = "http://localhost:8080/api"


export const login = `${mainPoint}/auth/login`
export const register = `${mainPoint}/auth/register`

export const createTask = `${mainPoint}/task/create-task`
export const listTasks = `${mainPoint}/task/list-task`
export const deleteBulk = `${mainPoint}/task/delete-task-in-bulk`
export const deleteTask = `${mainPoint}/task/delete-task`
export const updateTask = `${mainPoint}/task/"/update-task`