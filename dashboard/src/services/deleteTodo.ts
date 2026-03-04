import { FrappeAPI } from "@/lib/FrappeApi"
export interface DeleteProps {
  name: string;
}
export const deleteTodo = async ({ name }: DeleteProps): Promise<any> => {
  const res = await FrappeAPI.request("delete", `/api/resource/To Do/${name}`);
  return res?.data || [];
};