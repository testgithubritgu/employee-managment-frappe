import { Button } from "@/components/ui/button"
import { EditIcon, Trash } from "lucide-react"
import { useState } from "react"

const ToDo = () => {
    const [appStage, setAppStage] = useState("Today")
    const appState: string[] = [
        "Today",
        "Pending",
        "OverDue"
    ]
    const taskArray = [
        {title:"draft project proposel",time:new Date().getTime()},
        {title:"Take Trash Out",time:new Date().getTime()},
        {title:"Get Groceries",time:new Date().getTime()}
    ]
    return (
        <>
            <div className="header flex items-center justify-center text-center text-white py-10 bg-linear-0 from-gray-600 via-gray-800 to-gray-900">
                <h1 className="font-semibold text-5xl">Todo App</h1>
            </div>
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-center  items-center  my-10">
                    {appState?.map((state, _) => (
                        <span className={`${appStage === state ? "bg-green-600" : ""} border-2 p-4 cursor-pointer  w-[200px] text-center`} onClick={() => { setAppStage(state) }} key={state}>{state}</span>
                    ))}
                </div>
                <div className="flex justify-between items-center w-full">
                    <span className="font-semibold text-2xl">Tasks</span>
                    <Button>Add Task</Button>
                </div>
            </div>
        </>
    )
}

export default ToDo
