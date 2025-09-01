import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';
import type { RadiosTypeKnobValue, RadiosTypeOptionsProp } from './types';

export const radios = <T extends RadiosTypeKnobValue>(name: string, radioOptions: RadiosTypeOptionsProp<T>, value: T, groupId?: string): T => {
  const knobs = useKnobs();

  useEffect(() => {
    const labels = Array.isArray(radioOptions)
      ? undefined
      : Object.fromEntries(Object.entries(radioOptions)
          .map(([key, value]) => [value, key]));

    const options: InputType = {
      name,
      control: {
        type: 'radio',
        labels,
      },
      options: Array.isArray(radioOptions)
        ? radioOptions
        : Object.values(radioOptions),
      table: {
        subcategory: groupId,
      },
    };
    channelEmit(Events.Set, name, value, options);
  }, []);

  return knobs.state.knobs[name] as T;
};
