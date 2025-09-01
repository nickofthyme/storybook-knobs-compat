import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';
import type { OptionsKnobOptions, OptionsTypeKnobSingleValue, OptionsTypeKnobValue, OptionsTypeOptionsProp } from './types';
import type { OptionsKnobOptionsDisplay } from './types/Options';

export const optionsKnob = <T extends OptionsTypeKnobSingleValue>(name: string, valuesObj: OptionsTypeOptionsProp<T>, value: OptionsTypeKnobValue<T>, optionsObj?: OptionsKnobOptions, groupId?: string): T => {
  const knobs = useKnobs();

  useEffect(() => {
    const labels = Array.isArray(valuesObj)
      ? undefined
      : Object.fromEntries(Object.entries(valuesObj)
          .map(([key, value]) => [value, key]));
    const type = optionsObj?.display ?? 'select';
    const adjustedValue = singleValueType.has(type) ? (Array.isArray(value) ? value[0] : value) : (Array.isArray(value) ? value : [value]);
    const options: InputType = {
      name,
      control: {
        type,
        labels,
      },
      options: Array.isArray(valuesObj)
        ? valuesObj
        : Object.values(valuesObj),
      table: {
        subcategory: groupId,
      },
    };
    channelEmit(Events.Set, name, adjustedValue, options);
  }, []);

  return knobs.state.knobs[name] as T;
};

const singleValueType = new Set<OptionsKnobOptionsDisplay>(['inline-radio', 'radio', 'select']);
