import  { deleteTodo, type DeleteProps } from "@/services/deleteTodo"
import { useMutation } from "@tanstack/react-query"

export const useDeleteTodo = () => {
    return useMutation<any, Error, DeleteProps>({
      mutationFn: deleteTodo,
    });
}