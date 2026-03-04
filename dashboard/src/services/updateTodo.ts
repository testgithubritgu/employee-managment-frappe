import { FrappeAPI } from "@/lib/FrappeApi";
export interface UpdateTodo {
    status:string
    name:string
}
export interface TodoResponse {
name:string , status:string
}
export const updateTodo = async (payload: UpdateTodo): Promise<TodoResponse> => {
  const { name, ...data } = payload;

  const res = await FrappeAPI.request(
    "put",
    `/api/resource/To Do/${name}`,
    data,
  );

  return res?.data || [];
};
