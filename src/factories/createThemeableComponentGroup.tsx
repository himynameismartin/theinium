import { useTheme } from '@emotion/react';
import { getOr } from 'lodash/fp';
import React, { ElementType, ComponentType } from 'react';
import { Element } from '../components';
import { DEFAULT_HTML_TAG } from '../constants';

type ThemeableComponentProps = Record<string, any>;

type CreateThemeableComponentGroup = {
  (params: { name: string, component?: ElementType }): (
    options?: { as?: ElementType, component?: ElementType }
  ) => ComponentType<ThemeableComponentProps>;
};

const createThemeableComponentGroup: CreateThemeableComponentGroup = ({
  name,
  component: groupComponent = Element
}) => ({ as = DEFAULT_HTML_TAG, component = Element } = {}) => {
  const ThemeableComponent: React.FC<ThemeableComponentProps> = ({ ...rest }) => {
    const theme = useTheme();
    const Tag = component || groupComponent;

    const groupTheme = getOr({}, `${name}.default`, theme);

    return <Tag as={as} {...groupTheme} {...rest} />;
  };

  return ThemeableComponent;
};

export default createThemeableComponentGroup;
