import { useParameter } from 'storybook/internal/manager-api';

import { KEY } from '../../../constants';
import type { KnobsParameters } from '../../../types';

export function useKnobsParameters(): KnobsParameters {
  const parameters = useParameter<KnobsParameters>(KEY, {});

  return {
    syncToUrl: true,
    clearParamsBetweenStories: true,
    ...parameters,
  };
}
