import { useEffect } from 'react';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import { useKnobs } from '../state';

export const files = (name: string, accept: string, value?: string[], groupId?: string): string[] => {
  const knobs = useKnobs();

  useEffect(() => {
    const options: InputType = {
      name,
      control: {
        type: 'file',
        accept,
      },
      table: {
        subcategory: groupId,
      },
    };
    channelEmit(Events.Set, name, value, options);
  }, []);

  return knobs.state.knobs[name] as string[];
};
