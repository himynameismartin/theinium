import type { Meta, StoryObj } from '@storybook/react';

import styled from '@emotion/styled';
import React from 'react';
import Element from '../components/Element';
import { ThemeContextProvider, ThemeProvider } from '../contexts/ThemeProvider';
import createThemeableComponentGroup from './createThemeableComponentGroup'

const THEME_OPTIONS = ['vanilla', 'pistachio'];

const themes = {
  vanilla: {
    components: {
      defaults: {
        color: '#F3E5AB'
      }
    },
    headings: {
      defaults: {
        color: '#F3E5AB'
      },
      H1: {
        fontSize: '32px'
      },
      H2: {
        fontSize: '24px'
      },
      H3: {
        fontSize: '20px'
      },
      H4: {
        fontSize: '16px'
      }
    },
    pseudoClasses: {
      defaults: {
        color: '#F3E5AB'
      },
      hover: {
        color: '#93C572'
      },
      'nth-of-type(even)': {
        background: '#000000'
      }
    },
    pseudoElements: {
      defaults: {
        color: '#F3E5AB'
      },
      'first-letter': {
        color: '#93C572'
      }
    }
  },
  pistachio: {
    components: {
      defaults: {
        color: '#93C572'
      }
    },
    headings: {
      defaults: {
        color: '#93C572'
      }
    },
    pseudoClasses: {
      defaults: {
        color: '#93C572'
      },
      hover: {
        color: '#F3E5AB'
      },
      'nth-of-type(even)': {
        background: '#000000'
      }
    },
    pseudoElements: {
      defaults: {
        color: '#93C572'
      },
      'first-letter': {
        color: '#F3E5AB'
      }
    }
  }
}

const StyledComponent = styled(Element)``;

const createThemeableComponent = createThemeableComponentGroup({ name: 'components' });
const ThemeableComponent = createThemeableComponent({ as: 'div', component: StyledComponent });

const ThemeableComponentApp: React.FC<{
  theme: (typeof THEME_OPTIONS)[number], children: React.ReactNode
}> = ({ theme, children }) => (
  <ThemeContextProvider themes={themes}>
    <ThemeProvider name="vanilla">
      <ThemeProvider name={theme}>
        {children}
      </ThemeProvider>
    </ThemeProvider>
  </ThemeContextProvider>
);

const createThemeableHeading = createThemeableComponentGroup({ name: 'headings' });
const ThemeableH1 = createThemeableHeading({ as: 'h1', component: StyledComponent, name: 'H1' });
const ThemeableH2 = createThemeableHeading({ as: 'h2', component: StyledComponent, name: 'H2' });
const ThemeableH3 = createThemeableHeading({ as: 'h3', component: StyledComponent, name: 'H3' });
const ThemeableH4 = createThemeableHeading({ as: 'h4', component: StyledComponent, name: 'H4' });

const createThemeablePseudoClasses = createThemeableComponentGroup({ name: 'pseudoClasses' });
const ThemeableHoverPseudoClass = createThemeablePseudoClasses({ as: 'div', component: StyledComponent });
const ThemeableNthOfTypeEvenPseudoClass = createThemeablePseudoClasses({ as: 'div', component: StyledComponent });

const createThemeablePseudoElements = createThemeableComponentGroup({ name: 'pseudoElements' });
const ThemeableFirstLetterPseudoElement = createThemeablePseudoElements({ as: 'div', component: StyledComponent });

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

export const Default: Story = {
  args: {
    children: <ThemeableComponent>theinium</ThemeableComponent>,
  },
};

export const H1: Story = {
  args: {
    children: <ThemeableH1>theinium</ThemeableH1>,
  },
};

export const H2: Story = {
  args: {
    children: <ThemeableH2>theinium</ThemeableH2>,
  },
};

export const H3: Story = {
  args: {
    children: <ThemeableH3>theinium</ThemeableH3>,
  },
};

export const H4: Story = {
  args: {
    children: <ThemeableH4>theinium</ThemeableH4>,
  },
};

export const HoverPseudoClass: Story = {
  args: {
    children: <ThemeableHoverPseudoClass>theinium</ThemeableHoverPseudoClass>,
  },
};

export const NthOfTypeEvenPseudoClass: Story = {
  args: {
    children: (
      <React.Fragment>
        <ThemeableNthOfTypeEvenPseudoClass>theinium</ThemeableNthOfTypeEvenPseudoClass>
        <ThemeableNthOfTypeEvenPseudoClass>theinium</ThemeableNthOfTypeEvenPseudoClass>
        <ThemeableNthOfTypeEvenPseudoClass>theinium</ThemeableNthOfTypeEvenPseudoClass>
        <ThemeableNthOfTypeEvenPseudoClass>theinium</ThemeableNthOfTypeEvenPseudoClass>
      </React.Fragment>
    ),
  },
};

export const FirstLetterPseudoElement: Story = {
  args: {
    children: <ThemeableFirstLetterPseudoElement>theinium</ThemeableFirstLetterPseudoElement>,
  },
};
