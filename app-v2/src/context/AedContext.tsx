import { FeatureCollection } from 'geojson';
import React, { ReactNode, createContext, useReducer } from 'react';

type State = {
  data: FeatureCollection;
};

interface PermissionAction {
  type: 'SET_AED_DATA';
  payload: State;
}

type Actions = PermissionAction;

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'SET_AED_DATA':
      return action.payload;
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<Actions>;
}

const createAedContext = (reducer: React.Reducer<State, Actions>, initialState: State) => {
  const Context = createContext<ContextValue>({ state: initialState, dispatch: () => null });

  const Provider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};

const aedContext = createAedContext(reducer, { data: { type: 'FeatureCollection', features: [] } });
export const { Context, Provider } = aedContext;
export const useAedContext = () => React.useContext(aedContext.Context);
