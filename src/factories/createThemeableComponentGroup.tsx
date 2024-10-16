import { Theme, useTheme } from '@emotion/react';
import { defaultsDeep } from 'lodash';
import { getOr } from 'lodash/fp';
import React, { ElementType, ComponentType } from 'react';
import { Element } from '../components';
import {
  DEFAULT_HTML_TAG,
  NON_FUNCTIONAL_PSEUDO_CLASS_NAMES,
  NON_FUNCTIONAL_PSEUDO_ELEMENT_NAMES,
} from '../constants';

type ThemeableComponentProps = Record<string, any>;

type CreateThemeableComponentGroup = {
  (params: { name: string, component?: ElementType }): (
    options?: { as?: ElementType, component?: ElementType, name?: string }
  ) => ComponentType<ThemeableComponentProps>;
};

const createThemeableComponentGroup: CreateThemeableComponentGroup = ({
  name: groupName,
  component: groupComponent = Element
}) => ({ as = DEFAULT_HTML_TAG, component = Element, name = '' } = {}) => ({ ...rest }) => {
  const theme = useTheme();
  const Tag = component || groupComponent;

  const groupTheme = getOr({}, `${groupName}.default`, theme);
  const componentTheme = getOr({}, `${groupName}.${name}`, theme);

  const mergedTheme = defaultsDeep(
    componentTheme,
    groupTheme,
  )

  const mergedPseudoThemes = [
    ...NON_FUNCTIONAL_PSEUDO_CLASS_NAMES,
    ...NON_FUNCTIONAL_PSEUDO_ELEMENT_NAMES
  ].reduce((accumulator, pseudo) => {
    const groupPseudoTheme = getOr({}, `${groupName}.${pseudo}`, theme);
    const componentPseudoTheme = getOr({}, `${groupName}.${name}.${pseudo}`, theme);

    const mergedPseudoTheme = defaultsDeep(groupPseudoTheme, componentPseudoTheme);
    accumulator[pseudo] = mergedPseudoTheme;

    return accumulator;
  }, {} as Theme);

  return <Tag as={as} {...mergedTheme} pseudo={mergedPseudoThemes} {...rest} />;
};

export default createThemeableComponentGroup;
