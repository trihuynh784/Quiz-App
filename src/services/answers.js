import { get, post } from "../utils/request";
import { getCookie } from "../helpers/cookie";

export const getAnswersByUserId = async () => {
  const userId = getCookie("id");
  const result = await get(`answers?userId=${userId}`);
  return result;
}

export const postAnswer = async (options) => {
  const result = await post("answers", options)
  return result;
}

export const getAnswersById = async (id) => {
  const result = await get(`answers/${id}`);
  return result;
}