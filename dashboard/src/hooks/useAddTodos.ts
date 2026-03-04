import { addTodo, type CreateTodoPayload } from "@/services/addTodo"
import type { TodoResponse } from "@/services/updateTodo"
import { useMutation } from "@tanstack/react-query"


export const useAddTodos = ()=>{
    return useMutation<TodoResponse, Error ,CreateTodoPayload>({
        mutationFn:addTodo
    })
}