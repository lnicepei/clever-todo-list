import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export type TasksContextState = {
  userFromDB: QueryDocumentSnapshot<DocumentData> | undefined;
  allTasks: Task[];
  dayToShowTasks: string;
};

type UpdateAction = {
  type: "UPDATE";
  payload: {
    taskContent: Task;
  };
};

type CreateAction = {
  type: "CREATE";
  payload: {
    taskContent: Task;
  };
};

type DeleteAction = {
  type: "DELETE";
  payload: {
    task: Task;
  };
};

type ToggleCompleteAction = {
  type: "TOGGLE_COMPLETE";
  payload: {
    task: Task;
  };
};

type FetchUserDataAction = {
  type: "FETCH_USER_DATA";
  payload: {
    allTasks: Task[];
    name: string;
    userFromDB: QueryDocumentSnapshot<DocumentData>;
  };
};

type SetDayToShowTasks = {
  type: "SET_DAY_TO_SHOW_TASKS";
  payload: {
    dayToShowTasks: string;
  };
};

export type TaskContextAction =
  | UpdateAction
  | DeleteAction
  | ToggleCompleteAction
  | FetchUserDataAction
  | SetDayToShowTasks
  | CreateAction;
