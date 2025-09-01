import { defineMain } from '@storybook/react-vite/node';

const config = defineMain({
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs', './local-preset.ts'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: false, // disable react strict mode
    },
  },
  features: {
    backgrounds: false,
    viewport: false,
    outline: false,
    measure: false,
    interactions: false,
    actions: false,
    controls: false,
  },
});

export default config;
