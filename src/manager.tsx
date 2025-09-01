import React from 'react';
import { addons, types } from 'storybook/manager-api';

import { ADDON_ID, PANEL_ID } from './constants';
import { Panel } from './lib/manager/components/Panel';
import { KnobsPanelProvider } from './lib/manager/state/panel';

addons.register(ADDON_ID, (api) => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Knobs',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active = false }) => (
      <KnobsPanelProvider api={api}>
        <Panel active={active} api={api} />
      </KnobsPanelProvider>
    ),
  });
});
