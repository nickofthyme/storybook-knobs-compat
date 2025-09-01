import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';

export const text = (name: string, value: string, groupId?: string): string => {
  const knobs = useKnobs();

  useEffect(() => {
    const options: InputType = {
      name,
      control: {
        type: 'text',

      },
      table: {
        subcategory: groupId,
        // TODO: This should be an option not assumed as the inigial value
        // defaultValue: {
        //   summary: JSON.stringify(value),
        // },
      },
      type: { name: 'string' },
    };
    channelEmit(Events.Set, name, value, options);
  }, []);

  return knobs.state.knobs[name] as string;
};
