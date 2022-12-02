import type { Todo } from "../App";
import { LOCAL_STORAGE_KEY } from "../constants";

export const fetchList = () => {
  const data = globalThis.localStorage.getItem(LOCAL_STORAGE_KEY);

  try {
    if (!data) {
      return [];
    }

    const parsedData = (JSON.parse(data).data as unknown[]) ?? [];
    if (!Array.isArray(parsedData)) {
      return [];
    }

    const todos = parsedData.filter<Todo>((datum: unknown): datum is Todo => {
      if (!datum || typeof datum !== "object") {
        return false;
      }

      if (!("key" in datum && "value" in datum)) {
        return false;
      }

      const datumAsTodoCandidate = datum as Todo;
      return !!(datumAsTodoCandidate.key && datumAsTodoCandidate.value);
    });
    return todos;
  } catch {
    return [];
  }
};
