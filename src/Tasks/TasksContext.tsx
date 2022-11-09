import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useReducer } from "react";
import { ChildrenProps } from "../Authorization/AuthContext/AuthContext";
import {
  createTask,
  deleteTask,
  toggleComplete,
  updateTask,
} from "../firebase/firebase";

type TasksContextState = {
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

const initialState: TasksContextState = {
  userFromDB: undefined,
  allTasks: [],
  dayToShowTasks: new Date().toString(),
};

const TasksContext = createContext<TasksContextState | null>(null);

const TasksDispatchContext =
  createContext<React.Dispatch<TaskContextAction> | null>(null);

const tasksReducer = (state: TasksContextState, action: TaskContextAction) => {
  switch (action.type) {
    case "TOGGLE_COMPLETE": {
      toggleComplete(state.userFromDB, state.allTasks, action.payload.task);

      return {
        ...state,
        allTasks: state.allTasks.map((taskFromDB: Task) => {
          if (taskFromDB.id === action.payload.task.id) {
            return { ...taskFromDB, complete: !action.payload.task.complete };
          }
          return { ...taskFromDB };
        }),
      };
    }

    case "DELETE": {
      deleteTask(state.userFromDB, state.allTasks, action.payload.task);

      return {
        ...state,
        allTasks: state.allTasks.filter((taskFromDB: Task) => {
          if (taskFromDB.id !== action.payload.task.id) {
            return { ...taskFromDB };
          }
        }),
      };
    }

    case "CREATE": {
      createTask(state.userFromDB, state.allTasks, action.payload.taskContent);

      return {
        ...state,
        allTasks: state.allTasks.concat(action.payload.taskContent),
      };
    }

    case "UPDATE": {
      updateTask(state.userFromDB, state.allTasks, action.payload.taskContent);

      return {
        ...state,
        allTasks: state.allTasks.map((task) => {
          if (task.id === action.payload.taskContent.id) {
            return action.payload.taskContent;
          }
          return task;
        }),
      };
    }

    case "SET_DAY_TO_SHOW_TASKS": {
      return {
        ...state,
        dayToShowTasks: action.payload.dayToShowTasks,
      };
    }

    case "FETCH_USER_DATA": {
      return {
        ...state,
        allTasks: action.payload.allTasks,
        name: action.payload.name,
        userFromDB: action.payload.userFromDB,
      };
    }

    default: {
      return { ...state };
    }
  }
};
export const TasksProvider: React.FC<ChildrenProps> = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  return (
    <TasksContext.Provider value={state}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TasksContext);
};

export const useTasksDispatch = () => {
  return useContext(TasksDispatchContext);
};