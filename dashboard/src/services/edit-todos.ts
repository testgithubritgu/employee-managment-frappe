import { FrappeAPI } from "@/lib/FrappeApi"

interface UpdateToDo {
    title:string
}

export const updateTodo = async(data:UpdateToDo)=>{
    const res = await FrappeAPI.request("put","/api/resource/To Do",{...data})
    return res?.data
}