import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';
import type { ArrayTypeKnobValue } from './types';

/**
 * Array knob
 *
 * @note `separator` is ignored as the `ArgsTable` does not use a simple string to form array.
 */
export const array = (name: string, value: ArrayTypeKnobValue, separator?: string, groupId?: string): string[] => {
  const knobs = useKnobs();

  useEffect(() => {
    const options: InputType = {
      name,
      control: {
        type: 'object',
      },
      table: {
        subcategory: groupId,
        type: {
          summary: 'array',
        },
      },
    };
    channelEmit(Events.Set, name, value, options);
  }, []);

  return knobs.state.knobs[name] as string[];
};
