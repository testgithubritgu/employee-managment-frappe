import { FrappeAPI } from "../services/FrappeApi";

export const getDoc = async <T = any>(
  doctype: string,
  name: string,
  fields?: string[],
): Promise<T> => {
  try {
    const data = await FrappeAPI.getDocument(doctype, name, fields);
    return data as T;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong in getDoc Api";

    throw new Error(message);
  }
};