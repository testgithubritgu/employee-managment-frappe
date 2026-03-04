import SelectDropdown from "@/components/commen/DropDown"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUpdateToDo } from "@/hooks/useUpdateToDo"
import { useQueryClient } from "@tanstack/react-query"
import { memo, useEffect, useState } from "react"
interface DialogProps {
    togglePopup: () => void
    data: any
    open: boolean
}


function DialogDemo({ togglePopup, data, open }: DialogProps) {
    const [category, setCategory] = useState("Pending");
    const options = [
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
    ];
    const { mutate, isPending } = useUpdateToDo()
    const queryClient = useQueryClient()
    const updateTask = () => {

        mutate({
            name: data.name,
            status: category.toLowerCase()
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["my-todos"] })
                togglePopup()
            },
            onError: () => {
                console.log("error occured in updating todo")
            }
        })

    }

    useEffect(() => {
        const status = String(data?.status || "").toLowerCase()
        setCategory(status === "completed" ? "completed" : "pending")

    }, [data?.status])
    return (
        <Dialog open={open} onOpenChange={(v) => !v && togglePopup()}>
            <form>
                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <SelectDropdown label='Country' className='md:w-full' options={options} selectedValue={category} onChange={(value) => { setCategory(value.value) }} />

                            <p className="mt-4">Selected: {category}</p>
                        </Field>
                        <Field>
                            <Label htmlFor="task-1">Task</Label>
                            <Input
                                id="task-1"
                                name="name"
                                defaultValue={data.title}
                            />
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={() => updateTask()}>{isPending ? "saving..." : "Save changes"}</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export const UpdateDialog = memo(DialogDemo)
