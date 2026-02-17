import { useQuery } from "@tanstack/react-query";
import { getQuickNote } from "../services/getQuickNote";

export const useQuickNotes = ( doctype :  string ) => {
  return useQuery({
    queryKey: ["quick-note", doctype],
    queryFn: () => getQuickNote(doctype ),
    enabled: !!doctype, 
  });
};
