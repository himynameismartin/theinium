import { useTheme } from '@emotion/react';
import { defaultsDeep, isEmpty } from 'lodash';
import { getOr } from 'lodash/fp';
import * as React from 'react';
import { Element } from '../components';
import {
  DEFAULT_HTML_TAG,
  PSEUDO_CLASS_NAMES,
  PSEUDO_ELEMENT_NAMES,
} from '../constants';

type ThemeableComponentProps = Record<string, unknown>;

type CreateThemeableComponentGroup = {
  (params: { name: string, component?: React.ElementType }): (
    options?: { as?: React.ElementType, component?: React.ElementType, name?: string }
  ) => React.ComponentType<ThemeableComponentProps>;
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

  const mergePseudoThemes = (pseudoKey: string) => {
    const groupPseudoTheme = getOr({}, `${groupName}.${pseudoKey}`, theme);
    const componentPseudoTheme = getOr({}, `${groupName}.${name}.${pseudoKey}`, theme);
  
    return defaultsDeep(groupPseudoTheme, componentPseudoTheme);
  };
  
  const mergedPseudoThemes = [
    ...PSEUDO_CLASS_NAMES,
    ...PSEUDO_ELEMENT_NAMES,
  ].reduce((accumulator, pseudo) => {
    if (pseudo instanceof RegExp) {
      const matchingKeys = Object.keys(getOr({}, groupName, theme)).filter(key => pseudo.test(key));
      matchingKeys.forEach((matchedKey) => {
        const mergedPseudoTheme = mergePseudoThemes(matchedKey);
        if (!isEmpty(mergedPseudoTheme)) {
          accumulator[matchedKey] = mergedPseudoTheme;
        }
      });
    } else {
      const mergedPseudoTheme = mergePseudoThemes(pseudo);
      if (!isEmpty(mergedPseudoTheme)) {
        accumulator[pseudo] = mergedPseudoTheme;
      }
    }
  
    return accumulator;
  }, {} as Record<string, Record<string, string>>);
  
  return <Tag as={as} {...mergedTheme} pseudo={mergedPseudoThemes} {...rest} />;
};

export default createThemeableComponentGroup;
