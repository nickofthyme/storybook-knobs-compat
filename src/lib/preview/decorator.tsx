import React from 'react';
import { makeDecorator } from 'storybook/preview-api';

import { KnobsProvider } from './state';

export const withKnobs = makeDecorator({
  name: 'withKnobs',
  parameterName: 'knobs',
  wrapper: (getStory, context) => {
    return (
      <KnobsProvider>
        {getStory(context) as React.ReactNode}
      </KnobsProvider>
    );
  },
});
