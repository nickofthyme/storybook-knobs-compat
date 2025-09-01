import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';

export const object = <T>(name: string, value: T, groupId?: string): T => {
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
          summary: 'object',
        },
      },
    };
    channelEmit(Events.Set, name, value, options);
  }, []);

  return knobs.state.knobs[name] as T;
};
