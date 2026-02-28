import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useGetToDo } from "@/hooks/useGetToDo"
import { Edit, Loader2, Trash } from "lucide-react"
import { useState } from "react"
import { UpdateDialog } from "./components/Dialog"

const ToDo = () => {
    const [appStage, setAppStage] = useState("Pending")
    const { data, isLoading } = useGetToDo(appStage)
    const [showDialog,setShowDialog] = useState(false)
    const appState: string[] = [
        "Pending",
        "Completed"
    ]


    const onIconClicks = (e: any) => {
        console.log(e)
    }
    console.log(data)
    return (
        <>
            <div className="header flex items-center justify-center text-center text-white py-10 bg-linear-0 from-gray-600 via-gray-800 to-gray-900">
                <h1 className="font-semibold text-5xl">Todo App</h1>
            </div>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center  items-center  my-10">
                    {appState?.map((state, _) => (
                        <span className={`${appStage === state ? "bg-green-600" : ""} border-2 p-4 cursor-pointer w-50 text-center`} onClick={() => { setAppStage(state) }} key={state}>{state}</span>
                    ))}
                </div>
                <div className="flex justify-between items-center w-full">
                    <span className="font-semibold text-2xl">Tasks</span>
                    <Button>Add Task</Button>
                </div>
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-4 ">
                        <thead className="">
                            <tr>
                                <th className=" px-4 py-2 text-left">Task</th>
                                <th className=" px-4 py-2 text-left">Created Time</th>
                                <th className=" px-4 py-2 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody className="space-y-4">
                            {isLoading && (
                                <tr>
                                    <td colSpan={3} className="text-center py-6">
                                        <Loader2 className="size-6 animate-spin mx-auto" />
                                    </td>
                                </tr>
                            )}

                            {!isLoading && data?.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="text-center py-6">
                                        No task found
                                    </td>
                                </tr>
                            )}

                            {!isLoading &&
                                data?.map((task: any, idx: number) => (
                                    <tr key={idx}>
                                        <td>{task.title}</td>
                                        <td>{task.time}</td>
                                        <td><Badge variant={`${task.status === "pending" ? "secondary":"destructive"}`}>{task.status}</Badge></td>
                                        <td>
                                            <div className="flex gap-4 justify-center">
                                                <Edit onClick={()=>setShowDialog(true)} className="size-4 text-blue-600" />
                                                <Trash className="size-4 text-red-600" />
                                            </div>
                                            {showDialog && <UpdateDialog togglePopup={setShowDialog} data={task.title}/>}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default ToDo
