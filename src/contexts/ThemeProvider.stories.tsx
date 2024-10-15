import type { Meta, StoryObj } from '@storybook/react';

import { Theme } from '@emotion/react';
import styled from '@emotion/styled';
import { getOr } from 'lodash/fp';
import React from 'react';
import { ThemeContextProvider, ThemeProvider } from './ThemeProvider';
import Element from '../components/Element';

const themes = {
  vanilla: {
    colors: {
      brand: '#F3E5AB'
    }
  },
  pistachio: {
    colors: {
      brand: '#93C572'
    }
  }
}

type GetColorType = (
  color: string
) => (props: { theme: Theme }) => string;

const getColor: GetColorType = (color) => ({ theme }) => {
  return getOr('', `colors[${color}]`, theme);
};

const ThemeAwareComponent = styled(Element)`
  color: ${getColor('brand')}
`;

const THEME_OPTIONS = ['vanilla', 'pistachio'];

const ThemedApp: React.FC<{ theme: (typeof THEME_OPTIONS)[number] }> = ({ theme }) => (
  <ThemeContextProvider themes={themes}>
    <ThemeProvider name="vanilla">
      <ThemeProvider name={theme}>
        <ThemeAwareComponent>theinuim</ThemeAwareComponent>
      </ThemeProvider>
    </ThemeProvider>
  </ThemeContextProvider>
);

const meta: Meta<typeof ThemedApp> = {
  title: 'ThemeProvider',
  component: ThemedApp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      options: THEME_OPTIONS,
      control: { type: 'select' },
    },
  },
  args: {
    theme: 'vanilla',
  },
};

export default meta;

type Story = StoryObj<typeof ThemedApp>;

export const Primary: Story = {};
