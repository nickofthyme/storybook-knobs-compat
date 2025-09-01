import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';

export const boolean = (name: string, value: boolean, groupId?: string): boolean => {
  const knobs = useKnobs();

  useEffect(() => {
    const options: InputType = {
      name,
      control: {
        type: 'boolean',

      },
      table: {
        subcategory: groupId,
      },
      type: { name: 'boolean' },
    };
    channelEmit(Events.Set, name, value, options);
  }, []);

  return knobs.state.knobs[name] as boolean;
};
