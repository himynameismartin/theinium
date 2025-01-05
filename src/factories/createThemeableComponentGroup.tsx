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

const VARIANTS_PROP_NAME = 'variants'
const DEFAULTS_KEY_NAME = 'defaults'

type VariantItemType = string;
type VariantType = VariantItemType | Array<VariantItemType> | Record<VariantItemType, boolean>;
type ThemeableComponentProps = { variant?: VariantType } & Record<string, unknown>;

type CreateThemeableComponentGroup = {
  (params: { name: string, component?: React.ElementType }): (
    options?: { as?: React.ElementType, component?: React.ElementType, name?: string }
  ) => React.ComponentType<ThemeableComponentProps>;
};

const createThemeableComponentGroup: CreateThemeableComponentGroup = ({
  name: groupName,
  component: groupComponent = Element
}) => ({ as = DEFAULT_HTML_TAG, component = Element, name = '' } = {}) => ({ variant, ...rest }) => {
  const theme = useTheme();
  const Tag = component || groupComponent;

  const groupTheme = getOr({}, `${groupName}.${DEFAULTS_KEY_NAME}`, theme);
  const groupVariants = getOr({}, `${groupName}.${VARIANTS_PROP_NAME}`, theme);
  const { variants: componentVariants, ...componentTheme } = getOr({}, `${groupName}.${name}`, theme);

  const variantList = Array.isArray(variant)
    ? variant.filter((item) => typeof item === 'string')
    : (typeof variant === 'object' && variant !== null)
      ? Object.keys(variant).filter((key) => typeof key === 'string' && Boolean(variant[key]))
      : (typeof variant === 'string')
        ? variant
          .split(',')
          .filter(Boolean)
        : [];

  const getComponentVariant = (variant: VariantItemType) =>
    componentVariants?.[variant] || {};
  
  const getGroupVariant = (variant: VariantItemType) =>
    groupVariants?.[variant] || {};
  
  const getVariant = (variant: VariantItemType) =>
    defaultsDeep(
      {},
      getComponentVariant(variant),
      getGroupVariant(variant)
    );

  const variantTheme = variantList.reduce((result, variant) => {
    const defaults = getVariant(variant);
    return { ...result, ...defaults };
  }, {});

  const mergedTheme = defaultsDeep(
    {},
    variantTheme,
    componentTheme,
    groupTheme,
  )

  const mergePseudoThemes = (pseudoKey: string) => {
    const groupPseudoTheme = getOr({}, `${groupName}.${pseudoKey}`, theme);
    const componentPseudoTheme = getOr({}, `${groupName}.${name}.${pseudoKey}`, theme);
  
    return defaultsDeep(
      {},
      componentPseudoTheme,
      groupPseudoTheme,
    );
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
