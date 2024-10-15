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

const ThemedApp: React.FC = () => {
  return (
    <ThemeContextProvider themes={themes}>
      <ThemeProvider name="vanilla">
        <ThemeAwareComponent>vanilla</ThemeAwareComponent>
        <ThemeProvider name="pistachio">
          <ThemeAwareComponent>pistachio</ThemeAwareComponent>
        </ThemeProvider>
      </ThemeProvider>
    </ThemeContextProvider>
  );
};

const meta: Meta<typeof Element> = {
  title: 'ThemeProvider',
  component: ThemedApp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: 'theinium',
  },
};

export default meta;

type Story = StoryObj<typeof ThemedApp>;

export const Primary: Story = {};
