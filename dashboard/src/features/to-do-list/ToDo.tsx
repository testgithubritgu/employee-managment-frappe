import { Button } from "@/components/ui/button"
import { Edit, Trash } from "lucide-react"
import { useMemo, useState } from "react"

const ToDo = () => {
    const [appStage, setAppStage] = useState("Today")
    const appState: string[] = [
        "Today",
        "Pending",
        "OverDue"
    ]
    const taskArray =useMemo(()=>(
        [
            { title: "draft project proposel", time: new Date().getTime() },
            { title: "Take Trash Out", time: new Date().getTime() },
            { title: "Get Groceries", time: new Date().getTime() }
        ]
    ),[])

    const onIconClicks = (e:any)=>{
        console.log(e)
    }

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
                <div className="mt-6 overflow-x-auto">
                    <table className="w-full border-separate border-spacing-y-4 ">
                        <thead className="">
                            <tr>
                                <th className=" px-4 py-2 text-left">Task</th>
                                <th className=" px-4 py-2 text-left">Created Time</th>
                            </tr>
                        </thead>

                        <tbody className="space-y-4">
                            {taskArray.map((task, index) => (
                                <tr key={index} className="my-4 ">
                                    <td className="">{task.title}</td>
                                    <td className="">
                                        {new Date(task.time).toLocaleString()}
                                    </td>
                                    <td>
                                       <div className="flex justify-center items-center gap-4">
                                            <Edit onClick={() => onIconClicks(task.title)}  className="size-4 text-blue-600"/>
                                            <Trash className="size-4 text-red-600"/>
                                       </div>
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
