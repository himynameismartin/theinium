import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { MediaQueriesProvider } from './MediaQueriesProvider';
import Element from '../components/Element';

const MEDIA_QUERIES = [
  '(prefers-color-scheme: light)',
  '(prefers-color-scheme: dark)',
]

const MediaQueriesApp: React.FC = () => (
  <MediaQueriesProvider mediaQueries={MEDIA_QUERIES}>
    <Element color={['#93C572', '#F3E5AB']}>theinuim</Element>
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
