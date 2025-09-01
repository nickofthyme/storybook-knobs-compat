import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';
import type { SelectTypeKnobValue, SelectTypeOptionsProp } from './types';

export const select = <T extends SelectTypeKnobValue>(name: string, selectOptions: SelectTypeOptionsProp<T>, value: T, groupId?: string): T => {
  const knobs = useKnobs();

  useEffect(() => {
    const labels = Array.isArray(selectOptions)
      ? undefined
      : Object.fromEntries(Object.entries(selectOptions)
          .map(([key, value]) => [value, key]));

    const options: InputType = {
      name,
      control: {
        type: 'select',
        labels,
      },
      options: Array.isArray(selectOptions)
        ? selectOptions
        : Object.values(selectOptions),
      table: {
        subcategory: groupId,
      },
    };
    channelEmit(Events.Set, name, value, options);
  }, []);

  return knobs.state.knobs[name] as T;
};
