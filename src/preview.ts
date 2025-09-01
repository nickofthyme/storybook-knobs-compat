import type { ProjectAnnotations, Renderer } from 'storybook/internal/types';

import { KEY } from './constants';
import { withKnobs } from './lib/preview/decorator';
import type { KnobsParameters } from './types';

const preview: ProjectAnnotations<Renderer> = {
  decorators: [withKnobs],
  parameters: {
    [KEY]: {
      syncToUrl: false,
      clearParamsBetweenStories: true,
    } satisfies KnobsParameters,
  },
};

export default preview;
