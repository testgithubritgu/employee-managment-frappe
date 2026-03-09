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
import { useAddTodos } from "@/hooks/useAddTodos"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import z from "zod"

const formSchema = z.object({
    task: z.string().min(4, { message: "min 4 charactors required" }),
    time: z.string().optional(),
    status: z.enum(["pending", "completed"])
})
export type FormSchemaType = z.infer<typeof formSchema>
export default function AddTodoDialog({ showAddTodoPopup, togglPopup }: { showAddTodoPopup: boolean, togglPopup: () => void }) {
    const { mutate: addTodo, isPending } = useAddTodos()
    const options = [
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
    ];
    const onsubmit = (data: FormSchemaType) => {
        addTodo({
            title: data.task,
            status: data.status,
            time: new Date().toISOString().split("T")[0]
        }, {
            onSuccess: (res) => {
                console.log(res)
                togglPopup()
            }
        })
    }
    const { register, control, formState: { errors, isLoading }, handleSubmit } = useForm<FormSchemaType>({
        defaultValues: {
            task: "",
            status: "pending"
        },
        resolver: zodResolver(formSchema)
    })
    return (
        <Dialog open={!!showAddTodoPopup} onOpenChange={(v) => !v && togglPopup()}>

                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
            <form onSubmit={handleSubmit(onsubmit)}>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="task">task</Label>
                            <Input {...register("task")} id="task" />
                            {errors.task && (
                                <p className="text-red-500 text-sm">{errors.task.message}</p>
                            )}
                        </Field>
                        <Field>
                            <Label htmlFor="status">Status</Label>
                            <Controller name="status" control={control} render={({ field }) => (
                                <SelectDropdown
                                    selectedValue={field.value}
                                    onChange={(value) => field.onChange(value.value)}
                                    options={options}
                                />
                            )} />

                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
            </form>
                </DialogContent>
        </Dialog>
    )
}
