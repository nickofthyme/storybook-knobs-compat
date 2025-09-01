import React, { createContext, type PropsWithChildren, useContext } from 'react';
import { addons, useEffect, useMemo, useReducer } from 'storybook/internal/preview-api';

import { Events } from '../../constants';
import type { KnobConfig, KnobKey, KnobsState, SyncKnobsEventHandler } from '../types';

enum ActionTypes {
  SetKnob = 'SET_KNOB',
  SetKnobs = 'SET_KNOBS',
  SetButton = 'SET_BUTTON',
}

interface SetKnobAction {
  type: ActionTypes.SetKnob;
  payload: KnobConfig;
}

interface SetKnobsAction {
  type: ActionTypes.SetKnobs;
  payload: KnobsState;
}

interface SetButtonAction {
  type: ActionTypes.SetButton;
  payload: { name: KnobKey; disabled?: boolean };
}

type Actions = SetKnobAction | SetKnobsAction | SetButtonAction;

interface KnobsPreviewState {
  knobs: Record<KnobKey, unknown>;
  buttons: Record<string, boolean>;
}

const initialState: KnobsPreviewState = {
  knobs: {},
  buttons: {},
};

const knobsReducer = (state: KnobsPreviewState, action: Actions): KnobsPreviewState => {
  switch (action.type) {
    case ActionTypes.SetKnob:
      return {
        ...state,
        knobs: {
          ...state.knobs,
          [action.payload.key]: action.payload.value,
        },
      } satisfies KnobsPreviewState;

    case ActionTypes.SetKnobs:
      return {
        ...state,
        knobs: action.payload,
      } satisfies KnobsPreviewState;

    case ActionTypes.SetButton:
      return {
        ...state,
        buttons: {
          ...state.buttons,
          [action.payload.name]: !(action.payload.disabled ?? false),
        },
      } satisfies KnobsPreviewState;

    default:
      return state;
  }
};

interface KnobsPreviewContext {
  state: KnobsPreviewState;
  setButton: (name: string, disabled?: boolean) => void;
}

const KnobsContext = createContext<KnobsPreviewContext>({
  state: initialState,
  setButton: () => {},
});

export const KnobsProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(knobsReducer, initialState);

  const channel = useMemo(() => addons.getChannel(), []);

  const setButton = (name: string, disabled = false) => {
    dispatch({
      type: ActionTypes.SetButton,
      payload: { name, disabled },
    });
  };

  const setKnobs = (knobs: KnobsState) => {
    dispatch({ type: ActionTypes.SetKnobs, payload: knobs });
  };

  useEffect(() => {
    channel.on(Events.Sync, ((newState) => {
      setKnobs(newState);
    }) satisfies SyncKnobsEventHandler);

    // channel.on(Events.UpdateValue, ((id, value) => {
    //   setKnob(id, value);
    // }) satisfies UpdateKnobValueEventHandler);
  }, []);

  return (
    <KnobsContext.Provider value={{ state, setButton }}>
      { children }
    </KnobsContext.Provider>
  );
};

export const useKnobs = () => {
  const context = useContext(KnobsContext);

  if (!context) {
    throw new Error('useKnobs must be used within an KnobsProvider');
  }
  return context;
};
