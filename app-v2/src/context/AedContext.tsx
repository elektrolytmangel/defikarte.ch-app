import { Feature, FeatureCollection } from 'geojson';
import React, { ReactNode, createContext, useReducer } from 'react';

type State = {
  data: FeatureCollection;
  selectedData: Feature | null;
};

interface SetAedDataAction {
  type: 'SET_AED_DATA';
  payload: FeatureCollection;
}

interface SetSelectedAedDataAction {
  type: 'SET_SELECTED_AED_DATA';
  payload: Feature | null;
}

type Actions = SetAedDataAction | SetSelectedAedDataAction;

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'SET_AED_DATA':
      return { ...state, data: action.payload };
    case 'SET_SELECTED_AED_DATA':
      return { ...state, selectedData: action.payload };
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

const aedContext = createAedContext(reducer, { data: { type: 'FeatureCollection', features: [] }, selectedData: null });
export const { Context, Provider } = aedContext;
export const useAedContext = () => React.useContext(aedContext.Context);
