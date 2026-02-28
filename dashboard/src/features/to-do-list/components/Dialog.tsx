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
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { memo } from "react"
interface DialogProps {
    togglePopup: () => void
    data: any
    open: boolean
}

function DialogDemo({ togglePopup, data,open }: DialogProps) {
    console.log(data)
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
                            <Label htmlFor="name-1">Name</Label>
                            <SelectDropdown  />
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
                            <Button  variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
export const UpdateDialog = memo(DialogDemo)