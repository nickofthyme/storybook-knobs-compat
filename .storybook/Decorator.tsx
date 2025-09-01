import type { Decorator as DecoratorFn } from '@storybook/react';
import React from 'react';
import { styled } from 'storybook/theming';

export const Decorator: DecoratorFn = (Story, context) => {
  const globals = context.globals as any;

  return (
    <Container>
      <Story {...context} />

      <br />
      <hr />

      <h2>Globals</h2>
      <div>
        {`${JSON.stringify(globals, null, 2)}`}
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin: 3rem;
`;
