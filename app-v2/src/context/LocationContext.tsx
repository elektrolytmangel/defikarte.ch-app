import React, { ReactNode, createContext, useReducer } from 'react';

type State = {
  isLocationServicesTurnedOn: boolean;
};

interface SetLocationServicesTurnedOnAction {
  type: 'SET_LOCATION_SERVICES_TURNED_ON';
  payload: boolean;
}

type Actions = SetLocationServicesTurnedOnAction;

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'SET_LOCATION_SERVICES_TURNED_ON':
      return { isLocationServicesTurnedOn: action.payload };
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

const createLocationContext = (reducer: React.Reducer<State, Actions>, initialState: State) => {
  const Context = createContext<ContextValue>({ state: initialState, dispatch: () => null });

  const Provider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};

const locationContext = createLocationContext(reducer, { isLocationServicesTurnedOn: false });
export const { Context, Provider } = locationContext;
export const useLocationContext = () => React.useContext(locationContext.Context);
