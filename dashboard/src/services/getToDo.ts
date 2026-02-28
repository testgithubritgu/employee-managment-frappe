import { FrappeAPI } from "@/lib/FrappeApi"

export const getTodo = async(status:string):Promise<any> =>{
    const res = await FrappeAPI.request("get", "/api/resource/To Do", null, {
      params: {
        fields:JSON.stringify(["*"]),
        filters: JSON.stringify([["status", "=", status]]),
      },
    });
    return res?.data
}