import { useTheme } from '@emotion/react';
import { defaultsDeep } from 'lodash';
import { getOr } from 'lodash/fp';
import React, { ElementType, ComponentType } from 'react';
import { Element } from '../components';
import { DEFAULT_HTML_TAG } from '../constants';

type ThemeableComponentProps = Record<string, any>;

type CreateThemeableComponentGroup = {
  (params: { name: string, component?: ElementType }): (
    options?: { as?: ElementType, component?: ElementType, name?: string }
  ) => ComponentType<ThemeableComponentProps>;
};

const createThemeableComponentGroup: CreateThemeableComponentGroup = ({
  name: groupName,
  component: groupComponent = Element
}) => ({ as = DEFAULT_HTML_TAG, component = Element, name = '' } = {}) => {
  const ThemeableComponent: React.FC<ThemeableComponentProps> = ({ ...rest }) => {
    const theme = useTheme();
    const Tag = component || groupComponent;

    const groupTheme = getOr({}, `${groupName}.default`, theme);
    const componentTheme = getOr({}, `${groupName}.${name}`, theme);

    const mergedTheme = defaultsDeep(
      componentTheme,
      groupTheme,
    )

    return <Tag as={as} {...mergedTheme} {...rest} />;
  };

  return ThemeableComponent;
};

export default createThemeableComponentGroup;
