export interface Todo {
    _id: string | null,
    title: string | null,
    status: number,
    author: string | null
}

export interface TodoStateInterface {
    list: Array<Todo>,
    currentTodo: Todo
}

export interface FormTodoInterface {
    title: string,
    status: string
}
