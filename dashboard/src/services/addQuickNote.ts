import { FrappeAPI } from "../lib/FrappeApi"

export const addNotes = async(payload:any)=>{
    const res = await FrappeAPI.request("post",
        "/api/resource/Quick Note",
        {payload}
    )
    return res?.data
}