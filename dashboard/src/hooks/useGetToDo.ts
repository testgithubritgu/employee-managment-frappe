import { getTodo } from "@/services/getToDo";
import { useQuery } from "@tanstack/react-query"

const cacheData = {
  staleTime: 5 * 60 * 1000,
  gcTime: 5 * 60 * 1000,
};
export const useGetToDo = (status:string)=>{
    return useQuery({
      queryKey: ["my-todos", status.toLowerCase()],
      queryFn: () => getTodo(status),
      enabled: !!status,
      ...cacheData
    });
}           