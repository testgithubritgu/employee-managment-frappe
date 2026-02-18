import { useMutation } from "@tanstack/react-query"
import { addNotes, type AddNoteProps, type QuickNoteResponse } from "../services/addQuickNote"

 
export const useAddNote = ()=>{
    // the first responcse is from backend site and middle one is for errir and 2rd one is for payloa 
    return useMutation<QuickNoteResponse,Error,AddNoteProps>({
      mutationFn: addNotes,
    });
}