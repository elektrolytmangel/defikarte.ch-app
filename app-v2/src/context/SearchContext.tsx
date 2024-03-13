import React, { ReactNode, createContext, useReducer } from 'react';
import { Feature, FeatureCollection } from 'geojson';

type State = {
  selectedResult: Feature | null;
  searchText: string;
  searchResults: FeatureCollection | null;
};

interface SetSelectedResultAction {
  type: 'SET_SELECTED_RESULT';
  payload: Feature | null;
}

interface SetSearchResultsAction {
  type: 'SET_SEARCH_RESULTS';
  payload: { searchText: string; searchResults: FeatureCollection | null };
}

interface ResetStateAction {
  type: 'RESET_STATE';
}

type Actions = SetSelectedResultAction | SetSearchResultsAction | ResetStateAction;

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'SET_SELECTED_RESULT':
      return { ...state, selectedResult: action.payload };
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchText: action.payload.searchText, searchResults: action.payload.searchResults };
    case 'RESET_STATE':
      return { selectedResult: null, searchText: '', searchResults: null };
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

const createSearchContext = (reducer: React.Reducer<State, Actions>, initialState: State) => {
  const Context = createContext<ContextValue>({ state: initialState, dispatch: () => null });

  const Provider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};

const searchContext = createSearchContext(reducer, { selectedResult: null, searchText: '', searchResults: null });
export const { Context, Provider } = searchContext;
export const useSearchContext = () => React.useContext(searchContext.Context);
