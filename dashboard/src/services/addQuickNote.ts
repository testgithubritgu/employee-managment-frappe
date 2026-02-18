import { FrappeAPI } from "../lib/FrappeApi"
export interface AddNoteProps {
  title: string;
  details?: string;
}

export interface QuickNoteResponse {
  name: string; // doc name
  title: string;
  details?: string;
  status?: string;
  owner: string;
  creation: string;
}

export const addNotes = async (payload: AddNoteProps): Promise<QuickNoteResponse> => {
  const res = await FrappeAPI.request("post", "/api/resource/Quick Note", 
    payload,
  );
  return res?.data;
};