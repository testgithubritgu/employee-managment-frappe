import { FrappeAPI } from "@/lib/FrappeApi";

export const updateTodo = async (payload: { status: string; name: string }) => {
  const { name, ...data } = payload;

  const res = await FrappeAPI.request(
    "put",
    `/api/resource/To Do/${name}`,
    data,
  );

  return res?.data || [];
};
