import { PureArgsTable as ArgsTable } from '@storybook/addon-docs/blocks';
import { dequal as deepEqual } from 'dequal';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AddonPanel } from 'storybook/internal/components';
import { addons, type API, useGlobals, useStorybookState } from 'storybook/internal/manager-api';
import { styled } from 'storybook/internal/theming';
import type { Args, ArgTypes } from 'storybook/internal/types';

import { BottomBar } from './BottomBar';
import { Events } from '../../../constants';
import { usePanelKnobs } from '../state/panel';
import { copyToClipboard } from '../utils/clipboard';
import { shallowDiff } from '../utils/helpers';
import { buildKnobParamsFromKnobs } from '../utils/knobs_url';

interface PanelProps {
  active: boolean;
  api: API;
}

export const Panel: React.FC<PanelProps> = ({ active }) => {
  const tableRef = useRef<HTMLDivElement | null>(null);
  const { path, previewInitialized, layout } = useStorybookState();
  const [isLoading, setIsLoading] = useState(true);
  const { state, updateKnobs, resetKnobs } = usePanelKnobs();
  const [globals] = useGlobals();

  const args: Args = state.current;
  const initialArgs: Args = state.initial;
  const argTypes: ArgTypes = Object.fromEntries(Object.entries(state.knobs).map(([key, value]) => [key, value.options ?? {}]));

  const updateArgs = (newArgs: Args) => {
    const fixedArgs: Args = {};

    for (const [k, value] of Object.entries(newArgs)) {
      if (Array.isArray(value)) {
        // @ts-expect-error - Storybook does this, so need to fix it :(
        const newValue = value[undefined];
        fixedArgs[k] = newValue === undefined ? [...value] : [...value, newValue];
      } else if (value && typeof value === 'object' && state.knobs[k]?.options.table?.type?.summary === 'array') {
        // setting a new array value should start as empty array not object
        fixedArgs[k] = [];
      }
    }

    updateKnobs({
      ...newArgs,
      ...fixedArgs,
    });
  };

  const channel = useMemo(() => addons.getChannel(), []);
  const compact = useMemo(() => layout.panelPosition === 'right', [layout.panelPosition]);

  useEffect(() => {
    if (previewInitialized) {
      setIsLoading(false);
    }
  }, [previewInitialized]);

  useEffect(() => {
    const handleClickFn = (name: string) => (e: MouseEvent) => {
      e.stopPropagation();
      console.log('clicked');
      channel.emit(Events.Call, name);
    };

    const listeners = Object.keys(state.buttons).map((name) => {
      const id = `set-${name.split(' ').join('-')}`;
      // const id = `set-${kebabCase(name)}`
      const element = tableRef.current?.querySelector(`#${id}`) as HTMLButtonElement;
      const tableCell = element?.parentElement as HTMLTableCellElement;
      const tableRow = tableCell?.parentElement as HTMLTableRowElement;

      if (element && tableCell && tableRow) {
        const handleClick = handleClickFn(name);
        element.innerText = name;
        element.classList.add('btn');
        tableCell.colSpan = compact ? 2 : 4;
        element.addEventListener('click', handleClick);

        const rows = [...tableRow.children] as HTMLTableCellElement[];
        rows.forEach((child) => {
          if (child === tableCell) return;
          child.style.display = 'none';
        });

        return {
          unsubscribe: () => element.removeEventListener('click', handleClick),
        };
      }

      return {};
    });

    return () => {
      listeners.forEach((listener) => listener.unsubscribe?.());
    };
  }, [channel, compact, state.buttons]);

  const copyCurrentUrl = useCallback((withDefaults = false) => {
    const url = new URL(window.location.href);
    let params = state.current;

    if (!withDefaults) {
      const diff = shallowDiff(state.initial, state.current);

      params = {
        ...diff.added,
        ...diff.changed,
      };
    }

    const knobParams = buildKnobParamsFromKnobs(params, state.knobs);
    Object.keys(knobParams).forEach((key) => {
      url.searchParams.set(key, knobParams[key] as string);
    });

    copyToClipboard(decodeURIComponent(url.href));
  }, [state]);

  const hasUpdatedArgs = useMemo(
    () => !!args && !!initialArgs && !deepEqual(state.initial, state.current),
    [args, initialArgs, state],
  );

  return (
    <AddonPanel active={active}>
      <AddonWrapper ref={tableRef}>
        <ArgsTable
          key={path}
          compact={compact}
          rows={argTypes}
          args={args}
          globals={globals}
          updateArgs={updateArgs}
          resetArgs={resetKnobs}
          inAddonPanel
          isLoading={isLoading}
        />
        {Object.keys(state.knobs).length > 0 && (
          <BottomBar
            onReset={hasUpdatedArgs ? resetKnobs : undefined}
            onCopy={() => {
              copyCurrentUrl();
            }}
            onCopyWithDefaults={() => {
              copyCurrentUrl(true);
            }}
          />
        )}
      </AddonWrapper>
    </AddonPanel>
  );
};

const AddonWrapper = styled.div({
  display: 'grid',
  gridTemplateRows: '1fr 39px',
  height: '100%',
  maxHeight: '100vh',
  overflowY: 'auto',

  '& table': {
    'th:last-of-type, td:last-of-type': {
      width: '40% !important',
    },
    'th:nth-of-type(3), td:nth-of-type(3)': {
      display: 'none !important',
    },
  },

  '& :not(table) button[title="Reset controls"]': {
    display: 'none !important',
  },
});
