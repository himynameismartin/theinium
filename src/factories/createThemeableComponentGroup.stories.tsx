import type { Meta, StoryObj } from '@storybook/react';

import styled from '@emotion/styled';
import React from 'react';
import { ThemeContextProvider, ThemeProvider } from '../contexts/ThemeProvider';
import Element from '../components/Element';
import createThemeableComponentGroup from './createThemeableComponentGroup'

const themes = {
  vanilla: {
    components: {
      default: {
        color: '#F3E5AB'
      }
    }
  },
  pistachio: {
    components: {
      default: {
        color: '#93C572'
      }
    }
  }
}

const StyledComponent = styled(Element)``;

const createThemeableComponent = createThemeableComponentGroup({ name: 'components' });
const ThemeableComponent = createThemeableComponent({ as: 'div', component: StyledComponent });

const THEME_OPTIONS = ['vanilla', 'pistachio'];

const ThemeableComponentApp: React.FC<{ theme: (typeof THEME_OPTIONS)[number] }> = ({ theme }) => (
  <ThemeContextProvider themes={themes}>
    <ThemeProvider name="vanilla">
      <ThemeProvider name={theme}>
        <ThemeableComponent>theinium</ThemeableComponent>
      </ThemeProvider>
    </ThemeProvider>
  </ThemeContextProvider>
);

const meta: Meta<typeof ThemeableComponentApp> = {
  title: 'createThemeableComponentGroup',
  component: ThemeableComponentApp,
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

type Story = StoryObj<typeof ThemeableComponentApp>;

export const Default: Story = {};
