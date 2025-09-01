import React, { createContext, type PropsWithChildren, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import events from 'storybook/internal/core-events';
import { addons, type API } from 'storybook/internal/manager-api';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import type { KnobConfig, KnobKey, KnobsState, SetKnobEventHandler } from '../../types';
import { shallowDiff } from '../utils/helpers';
import { buildKnobParamsFromKnobs, getKnobsFromParams, type KnobsFromUrl } from '../utils/knobs_url';
import { parseKnobsFromConfigs } from '../utils/parse';
import { useKnobsParameters } from '../utils/use_parameters';

enum ActionTypes {
  Sync = 'SYNC',
  Clear = 'CLEAR',
  SetKnob = 'SET_KNOB',
  SetFromUrl = 'SET__FROM_URL',
  ResetKnobs = 'RESET_KNOBS',
  UpdateKnobValue = 'UPDATE_KNOB_VALUE',
  UpdateKnobValues = 'UPDATE_KNOB_VALUES',
}

interface SyncAction {
  type: ActionTypes.Sync;
}

interface ClearAction {
  type: ActionTypes.Clear;
}

interface SetKnobAction {
  type: ActionTypes.SetKnob;
  payload: KnobConfig;
}

interface UpdateKnobValueAction {
  type: ActionTypes.UpdateKnobValue;
  payload: {
    key: KnobKey;
    value: unknown;
  };
}

interface UpdateKnobValuesAction {
  type: ActionTypes.UpdateKnobValues;
  payload: KnobsState;
}

interface ResetKnobsAction {
  type: ActionTypes.ResetKnobs;
}

type Actions = SyncAction | ClearAction | SetKnobAction | ResetKnobsAction | UpdateKnobValueAction | UpdateKnobValuesAction;

interface KnobsPanelState {
  knobs: Record<KnobKey, KnobConfig>;
  buttons: Record<KnobKey, true>;
  current: KnobsState;
  initial: KnobsState;
  synced: boolean;
}

const initialState: KnobsPanelState = {
  knobs: {},
  buttons: {},
  current: {},
  initial: {},
  synced: true,
};

const knobsReducer = (state: KnobsPanelState, action: Actions): KnobsPanelState => {
  switch (action.type) {
    case ActionTypes.SetKnob:
      if (state.knobs[action.payload.key]) {
        return {
          ...state,
          synced: false,
        };
      }

      if ((action.payload.options?.control as any).button) {
        return {
          ...state,
          synced: false,
          knobs: {
            ...state.knobs,
            [action.payload.key]: {
              ...(state.knobs[action.payload.key] ?? {}),
              ...action.payload,
            },
          },
          buttons: {
            ...state.buttons,
            [action.payload.key]: true,
          },
        };
      }

      return {
        ...state,
        synced: false,
        knobs: {
          ...state.knobs,
          [action.payload.key]: {
            ...(state.knobs[action.payload.key] ?? {}),
            ...action.payload,
          },
        },
        current: {
          ...state.current,
          [action.payload.key]: action.payload.value,
        },
        initial: {
          ...state.initial,
          [action.payload.key]: action.payload.value,
        },
      } satisfies KnobsPanelState;

    case ActionTypes.UpdateKnobValue:
      return {
        ...state,
        synced: false,
        current: {
          ...state.current,
          [action.payload.key]: action.payload.value,
        },
      } satisfies KnobsPanelState;

    case ActionTypes.UpdateKnobValues:
      return {
        ...state,
        synced: false,
        current: {
          ...state.current,
          ...action.payload,
        },
      } satisfies KnobsPanelState;

    case ActionTypes.ResetKnobs:
      return {
        ...state,
        synced: false,
        current: { ...state.initial },
      } satisfies KnobsPanelState;

    case ActionTypes.Sync:
      return {
        ...state,
        synced: true,
      } satisfies KnobsPanelState;

    case ActionTypes.Clear:
      return initialState;

    default:
      return state;
  }
};

interface KnobsPanelContext {
  state: KnobsPanelState;
  updateKnobs: (newKnobs: KnobsState) => void;
  resetKnobs: () => void;
}

const KnobsPanelContext = createContext<KnobsPanelContext>({
  state: initialState,
  updateKnobs: () => {},
  resetKnobs: () => {},
});

export const KnobsPanelProvider = ({ children, api }: PropsWithChildren<{ api: API }>) => {
  const [state, dispatch] = useReducer(knobsReducer, initialState);
  const channel = useMemo(() => addons.getChannel(), []);
  const parameters = useKnobsParameters();

  // This is needed as putting in the state does not properly trigger the update
  const urlKnobs = useRef<KnobsFromUrl | null>(null);

  const updateKnobs = (newKnobs: KnobsState) => {
    dispatch({
      type: ActionTypes.UpdateKnobValues,
      payload: newKnobs,
    });
  };

  const resetKnobs = () => {
    dispatch({ type: ActionTypes.ResetKnobs });
  };

  const setKnob = useCallback((key: string, value: unknown, options: InputType) => {
    dispatch({
      type: ActionTypes.SetKnob,
      payload: { key, value, options },
    });
  }, [dispatch]);

  useEffect(() => {
    const currentUrlParams = Object.entries(api.getUrlState().queryParams);
    const currentKnobs = getKnobsFromParams(currentUrlParams);

    urlKnobs.current = currentKnobs;
  }, [api]);

  useEffect(() => {
    if (!state.synced) {
      let initialKnobs: KnobsState = {};

      if (urlKnobs.current) {
        initialKnobs = parseKnobsFromConfigs(urlKnobs.current, state.knobs);
        urlKnobs.current = null;
        dispatch({
          type: ActionTypes.UpdateKnobValues,
          payload: initialKnobs,
        });
      }

      const current = {
        ...state.current,
        ...initialKnobs,
      };

      if (parameters.syncToUrl) {
        const diff = shallowDiff(state.initial, current);

        const currentKnobParams = Object.fromEntries(Object.keys(api.getUrlState().queryParams)
          .filter((k) => k.startsWith('knob-')).map((k) => [k, undefined]));
        const knobParams = buildKnobParamsFromKnobs({
          ...diff.added,
          ...diff.changed,
        }, state.knobs);

        api.applyQueryParams({
          ...currentKnobParams, // clear defaults in url
          ...knobParams,
        });
      }

      channel.emit(Events.Sync, current);
      dispatch({ type: ActionTypes.Sync });
    }
  }, [api, channel, parameters.syncToUrl, state]);

  useEffect(() => {
    channel.on(Events.Set, (((name, value, options) => {
      setKnob(name, value, options);
    }) satisfies SetKnobEventHandler));

    channel.on(events.CURRENT_STORY_WAS_SET, () => {
      if (parameters.clearParamsBetweenStories) {
        const currentKnobParams = Object.fromEntries(Object.keys(api.getUrlState().queryParams)
          .filter((k) => k.startsWith('knob-')).map((k) => [k, undefined]));
        api.applyQueryParams(currentKnobParams);
      }
      dispatch({ type: ActionTypes.Clear });
    });
  }, [api, channel, parameters.clearParamsBetweenStories, setKnob]);

  return (
    <KnobsPanelContext.Provider value={{ state, updateKnobs, resetKnobs }}>
      { children }
    </KnobsPanelContext.Provider>
  );
};

export const usePanelKnobs = () => {
  const context = useContext(KnobsPanelContext);

  if (!context) {
    throw new Error('useKnobs must be used within an KnobsProvider');
  }
  return context;
};
