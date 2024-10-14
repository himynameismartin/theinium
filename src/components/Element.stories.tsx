import type { Meta, StoryObj } from '@storybook/react';

import Element from './Element';

const meta: Meta<typeof Element> = {
  title: 'Element',
  component: Element,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'theinium',
  },
};

export default meta;

type Story = StoryObj<typeof Element>;

export const Primary: Story = {};

export const AsEm: Story = {
  args: {
    as: 'em',
  },
};

export const AsStrong: Story = {
  args: {
    as: 'strong',
  },
};

export const ColorBlue: Story = {
  args: {
    color: '#0000ff',
  },
};

export const ColorGreen: Story = {
  args: {
    color: '#00ff00',
  },
};

export const ColorRed: Story = {
  args: {
    color: '#ff0000',
  },
};

export const BackgroundColorBlackColorWhiteFontSizeThirtyTwo: Story = {
  args: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 32,
  },
};

export const OnClick: Story = {
  args: {
    onClick: () => {
      alert('=)');
    },
  },
};
