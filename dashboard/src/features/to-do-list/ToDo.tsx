import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useGetToDo } from "@/hooks/useGetToDo"
import { Edit, Loader2, Trash } from "lucide-react"
import {  useState } from "react"
import { useDeleteTodo } from "@/hooks/useDeleteTodo"
import {useQueryClient } from "@tanstack/react-query"
import  AddTodoDialog  from "./components/addTodoDialog"
import { UpdateDialog } from "./components/Dialog"

//lazy loading

interface Task {
    title: string
    time?: string
}

const ToDo = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [appStage, setAppStage] = useState("Pending")
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const { data, isLoading } = useGetToDo(appStage)
    const [showAddTodoModel,setShowAddTodoModel] = useState(false)
    const queryClient = useQueryClient()
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const appState: string[] = [
        "Pending",
        "Completed"
    ]
    const { mutate: deleteTask } = useDeleteTodo()
    const handleDelete = (name: string) => {
        setDeletingId(name)
        console.log("render problem in deleteTodo function")
        deleteTask({
            name
        }, {
            onSuccess: () => {
                console.log("Task Deleted Successfully....")
                queryClient.invalidateQueries({ queryKey: ['my-todos'] })
            },
            onSettled: () => {
                setDeletingId(null)
            }
        })
    }
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
                    <Button onClick={() => setShowAddTodoModel(true)}>Add Task</Button>
                </div>
                {showAddTodoModel && <AddTodoDialog showAddTodoPopup={showAddTodoModel} togglPopup={()=>setShowAddTodoModel(false)}/>}
                <div className="mt-6 overflow-x-auto">
                    {selectedTask && (
                        <UpdateDialog
                            open={!!selectedTask}
                            togglePopup={() => setSelectedTask(null)}
                            data={selectedTask}
                        />
                    )}
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
                                        <td>{days[new Date(task.time).getDay()]}</td>
                                        <td><Badge variant={`${task.status === "pending" ? "secondary" : "destructive"}`}>{task.status}</Badge></td>
                                        <td>
                                            <div className="flex gap-4 justify-center">
                                                <Edit onClick={() => setSelectedTask(task)} className="size-4 text-blue-600" />
                                                {deletingId === task.name ? (
                                                    <Loader2 className="size-4 animate-spin text-red-600" />
                                                ) : (
                                                    <Trash
                                                        onClick={() => handleDelete(task.name)}
                                                        className="size-4 text-red-600 cursor-pointer"
                                                    />
                                                )}
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
