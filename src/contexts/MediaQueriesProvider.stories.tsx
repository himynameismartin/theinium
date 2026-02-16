import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { MediaQueriesProvider } from './MediaQueriesProvider';
import Element from '../components/Element';

const MEDIA_QUERIES = {
  'light': '(prefers-color-scheme: light)',
  'dark': '(prefers-color-scheme: dark)',
}

const MediaQueriesApp = () => (
  <MediaQueriesProvider mediaQueries={MEDIA_QUERIES}>
    <Element
      color={{
        'light': '#93C572',
        'dark': '#F3E5AB',
      }}
    >
      theinium
    </Element>
  </MediaQueriesProvider>
);

const meta: Meta<typeof MediaQueriesApp> = {
  title: 'MediaQueries',
  component: MediaQueriesApp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MediaQueriesApp>;

export const Primary: Story = {};
