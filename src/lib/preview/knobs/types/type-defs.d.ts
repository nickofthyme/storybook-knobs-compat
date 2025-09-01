import type { ArrayTypeKnob } from './Array';
import type { BooleanTypeKnob } from './Boolean';
import type { ButtonTypeOnClickProp } from './Button';
import type { ColorTypeKnob } from './Color';
import type { DateTypeKnob } from './Date';
import type { FileTypeKnob } from './Files';
import type { NumberTypeKnob } from './Number';
import type { ObjectTypeKnob } from './Object';
import type { OptionsTypeKnob } from './Options';
import type { RadiosTypeKnob } from './Radio';
import type { SelectTypeKnob } from './Select';
import type { TextTypeKnob } from './Text';

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P] extends readonly (infer U)[] ? U[] : T[P];
};

export type KnobPlus<T extends KnobType, K> = K & {
  type: T;
  groupId?: string;
  disableDebounce?: boolean;
  disableForceUpdate?: boolean;
};

export type Knob<T extends KnobType = any> = T extends 'text' ? KnobPlus<T, Pick<TextTypeKnob, 'value'>> : T extends 'boolean' ? KnobPlus<T, Pick<BooleanTypeKnob, 'value'>> : T extends 'number' ? KnobPlus<T, Pick<NumberTypeKnob, 'value' | 'range' | 'min' | 'max' | 'step'>> : T extends 'color' ? KnobPlus<T, Pick<ColorTypeKnob, 'value'>> : T extends 'object' ? KnobPlus<T, Pick<ObjectTypeKnob<any>, 'value'>> : T extends 'select' ? KnobPlus<T, Pick<SelectTypeKnob, 'value' | 'options'> & {
  selectV2: true;
}> : T extends 'radios' ? KnobPlus<T, Pick<RadiosTypeKnob, 'value' | 'options'>> : T extends 'array' ? KnobPlus<T, Pick<ArrayTypeKnob, 'value' | 'separator'>> : T extends 'date' ? KnobPlus<T, Pick<DateTypeKnob, 'value'>> : T extends 'files' ? KnobPlus<T, Pick<FileTypeKnob, 'value' | 'accept'>> : T extends 'button' ? KnobPlus<T, {
  value?: never;
  callback: ButtonTypeOnClickProp;
  hideLabel: true;
}> : T extends 'options' ? KnobPlus<T, Pick<OptionsTypeKnob<any>, 'options' | 'value' | 'optionsObj'>> : never;
