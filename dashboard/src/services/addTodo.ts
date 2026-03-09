import { FrappeAPI } from "@/lib/FrappeApi"


export interface CreateTodoPayload {
    title:string,
    status?:string,
    time:string
}

export interface TodoResponse {
    name:string,
    title:string,
    status:string
}

export const addTodo = async (payload: CreateTodoPayload): Promise<TodoResponse> => {
  const res = await FrappeAPI.request("post", "/api/resource/To Do", payload)
  return res?.data || []
};