import { CopyIcon, UndoIcon } from '@storybook/icons';
import React from 'react';
import {
  Bar as BaseBar,
  IconButton,
  TooltipNote,
  WithTooltip,
} from 'storybook/internal/components';
import { styled } from 'storybook/theming';

const Container = styled.div({
  containerType: 'size',
  position: 'sticky',
  bottom: 0,
  height: 39,
  overflow: 'hidden',
  zIndex: 1,
});

const Bar = styled(BaseBar)(({ theme }) => ({
  '--highlight-bg-color': theme.base === 'dark' ? '#153B5B' : '#E0F0FF',
  display: 'flex',
  flexDirection: 'row-reverse', // hide Info rather than Actions on overflow
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 6,
  padding: '6px 10px',
  background: theme.background.bar,
  borderTop: `1px solid ${theme.appBorderColor}`,
  fontSize: theme.typography.size.s2,

  '@container (max-width: 799px)': {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

const Actions = styled.div(({ theme }) => ({
  display: 'flex',
  flex: '1 0 0',
  alignItems: 'center',
  justifyContent: 'end',
  gap: 6,
  color: theme.color.mediumdark,
  fontSize: theme.typography.size.s2,
}));

const Label = styled.div({
  '@container (max-width: 799px)': {
    lineHeight: 0,
    textIndent: '-9999px',

    '&::after': {
      content: 'attr(data-short-label)',
      display: 'block',
      lineHeight: 'initial',
      textIndent: '0',
    },
  },
});

interface BottomBarProps {
  onReset?: () => void;
  onCopy: () => void;
  onCopyWithDefaults: () => void;
};

export const BottomBar = ({
  onReset,
  onCopy,
  onCopyWithDefaults,
}: BottomBarProps) => {
  return (
    <Container>
      <Bar>
        <Actions>
          <WithTooltip
            as="div"
            hasChrome={false}
            trigger="hover"
            tooltip={<TooltipNote note="Copy story url with overrides and default" />}
          >
            <IconButton onClick={onCopyWithDefaults}>
              <CopyIcon />
              <Label>Copy with defaults</Label>
            </IconButton>
          </WithTooltip>

          <WithTooltip
            as="div"
            hasChrome={false}
            trigger="hover"
            tooltip={<TooltipNote note="Copy story url with overrides" />}
          >
            <IconButton onClick={onCopy}>
              <CopyIcon />
              <Label>Copy</Label>
            </IconButton>
          </WithTooltip>

          <WithTooltip
            as="div"
            hasChrome={false}
            trigger="hover"
            tooltip={<TooltipNote note={onReset ? 'Reset changes' : 'No changes to reset'} />}
          >
            <IconButton disabled={!Boolean(onReset)} onClick={() => onReset?.()}>
              <UndoIcon />
              <span>Reset</span>
            </IconButton>
          </WithTooltip>
        </Actions>
      </Bar>
    </Container>
  );
};
