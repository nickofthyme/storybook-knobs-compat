import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';
import type { NumberTypeKnobOptions } from './types';

export const number = (name: string, value: number, knobOptions: NumberTypeKnobOptions = {}, groupId?: string): number => {
  const knobs = useKnobs();

  useEffect(() => {
    const { min, max, step, range } = knobOptions || {};
    const options: InputType = {
      name,
      control: {
        type: range ? 'range' : 'number',
        min,
        max,
        step,
      },
      table: {
        subcategory: groupId,
        // TODO: This should be an option not assumed as the inigial value
        // defaultValue: {
        //   summary: JSON.stringify(value),
        // },
      },
      type: { name: 'number' },
    };
    channelEmit(Events.Set, name, value, options);
  }, []);

  return knobs.state.knobs[name] as number;
};
