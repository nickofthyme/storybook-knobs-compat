import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';

export const date = (name: string, value?: Date, groupId?: string): number => {
  const knobs = useKnobs();

  useEffect(() => {
    const options: InputType = {
      name,
      control: {
        type: 'date',
      },
      table: {
        subcategory: groupId,
        type: {
          summary: 'number',
        },
      },
    };
    channelEmit(Events.Set, name, value, options);
  }, []);

  return (knobs.state.knobs[name] as Date)?.valueOf();
};
