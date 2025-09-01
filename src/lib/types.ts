import type { InputType } from 'storybook/internal/csf';

import type { Events } from '../constants';

export type KnobKey = string;

export type KnobsState = Record<KnobKey, unknown>;
export interface KnobConfig {
  key: KnobKey;
  value: unknown;
  options: InputType;
}

export type SetKnobEventHandler = (key: KnobKey, value: unknown, options: InputType) => void;
export type UpdateKnobValueEventHandler = (key: KnobKey, value: unknown) => void;
export type SyncKnobsEventHandler = (state: KnobsState) => void;
export type CallKnobEventHandler = (key: KnobKey) => void;

export interface EventHandlerMap {
  [Events.Set]: SetKnobEventHandler;
  [Events.UpdateValue]: UpdateKnobValueEventHandler;
  [Events.Sync]: SyncKnobsEventHandler;
  [Events.Call]: CallKnobEventHandler;
}

export type EventTypes = typeof Events[keyof typeof Events];
export type EventHandler<T extends EventTypes> = EventHandlerMap[T];

export type EmitFunction = <T extends EventTypes>(
  event: T,
  ...args: Parameters<EventHandler<T>>
) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GenericEventHandler = (...args: any[]) => void;
export interface GenericEventHandlerMap extends Partial<EventHandlerMap> {
  [event: string]: GenericEventHandler | undefined;
}
