export interface KnobControlConfig<T = never> {
  name: string;
  value: T;
  defaultValue?: T;
}
export interface KnobControlProps<T> {
  knob: KnobControlConfig<T>;
  onChange: (value: T) => T;
}

export type KnobType = keyof typeof KnobControls;
export type KnobControlType = ComponentType<any> & {
  serialize: (v: any) => any;
  deserialize: (v: any) => any;
};
export const getKnobControl: (type: KnobType) => KnobControlType;
