import { useEffect } from 'react';
import { addons } from 'storybook/internal/preview-api';
import type { InputType } from 'storybook/internal/types';

import { Events } from '../../../constants';
import { channelEmit } from '../emit';
import type { ButtonTypeKnob, ButtonTypeOnClickProp } from './types';
import type { CallKnobEventHandler } from '../../types';
import { useKnobs } from '../state';

export const button = (name: string, callback: ButtonTypeOnClickProp, groupId?: string): void => {
  const knobs = useKnobs();

  useEffect(() => {
    if (knobs.state.buttons[name]) return;

    const channel = addons.getChannel();
    const options: InputType = {
      name,
      control: {
        type: 'text',
        button: true,
      },
      table: {
        subcategory: groupId,
      },
    };
    channelEmit(Events.Set, name, undefined, options);
    const handleCall: CallKnobEventHandler = (callerName) => {
      if (callerName === name) {
        callback({ name } as ButtonTypeKnob);
      }
    };
    channel.on(Events.Call, handleCall);
    knobs.setButton(name);

    return () => {
      knobs.setButton(name, true);
      channel.off(Events.Call, handleCall);
    };
  }, []);
};
