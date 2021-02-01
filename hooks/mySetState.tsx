import {useState, useReducer} from "react";

export const useSetState = () => {
  const [state, setState] = useState<any>();

  const getState = async (): Promise<any> => {
    let state: unknown;

    await setState((currentState: any) => {
      state = currentState;

      return currentState;
    });

    return state as any;
  };

  return [state, setState, getState]
   
};