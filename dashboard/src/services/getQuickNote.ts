import { getDocList } from "../utils/FrappeAPI";

export const getQuickNote = async ( doctype: string ) => {
  const res = await getDocList(doctype);
  return res?.data;
};
