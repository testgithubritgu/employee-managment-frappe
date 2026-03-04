import { updateTodo, type TodoResponse, type UpdateTodo } from "@/services/updateTodo"
import { useMutation } from "@tanstack/react-query"

export const  useUpdateToDo = ()=>{
    return useMutation<TodoResponse, Error, UpdateTodo>({
      mutationFn: updateTodo,
    });
}