import { addons } from 'storybook/internal/preview-api';

import type { EventHandler, EventTypes } from '../types';

export function channelEmit<T extends EventTypes>(event: T, ...args: Parameters<EventHandler<T>>): void {
  const channel = addons.getChannel();

  channel.emit(event, ...args);
}
