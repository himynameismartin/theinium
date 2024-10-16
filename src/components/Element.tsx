import isPropValid from '@emotion/is-prop-valid';
import { Interpolation } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { isEmpty } from 'lodash';
import { getOr } from 'lodash/fp';
import {
  CSS_PROPERTIES,
  DEFAULT_HTML_TAG,
  NON_FUNCTIONAL_PSEUDO_CLASS_NAMES,
  NON_FUNCTIONAL_PSEUDO_ELEMENT_NAMES,
} from '../constants';

const PSEUDO_CLASS_NAME_INDICATOR = ':';
const PSEUDO_ELEMENT_NAME_INDICATOR = '::';
const PSEUDO_ENTITIES_NAME_INDICATORS = [
  PSEUDO_CLASS_NAME_INDICATOR,
  PSEUDO_ELEMENT_NAME_INDICATOR,
] as const;

type Indicator = typeof PSEUDO_ENTITIES_NAME_INDICATORS[number];

type Properties = typeof CSS_PROPERTIES[number];

type DeclarationsHandler = {
  properties: readonly Properties[];
};

type PseudoDeclarationsHandler = DeclarationsHandler &
  {
    indicator: Indicator;
    pseudoName: string;
  };
  
type HTMLAttributesProps = React.HTMLAttributes<HTMLElement>

type ValueType = string | number;
type DeclarationRecordType = Partial<Record<Properties, ValueType>>;

const declarationsHandler = ({ properties }: DeclarationsHandler) => {
  return (props: HTMLAttributesProps): Interpolation<React.CSSProperties> => {
    return properties.reduce((accumulator, property) => {
      const value = getOr(null, property, props);
      if (value !== undefined && value !== null) {
        (accumulator as Partial<React.CSSProperties>)[property] = value;
      }
      return accumulator;
    }, {} as Interpolation<React.CSSProperties>);
  };
};

const pseudoSelectorsHandler = (
  { properties, indicator, pseudoName }: PseudoDeclarationsHandler
) => {
  return (props: HTMLAttributesProps): Interpolation<React.CSSProperties> => {
    const pseudoClassProps = getOr(null, `pseudo.${pseudoName}`, props);
    if (!isEmpty(pseudoClassProps)) {
      return {
        [`&${indicator}${pseudoName}`]: declarationsHandler({ properties })(pseudoClassProps),
      } as Interpolation<React.CSSProperties>;
    }
    return null;
  }
}

const StyledElement = styled(DEFAULT_HTML_TAG, {
  shouldForwardProp: (prop) => {
    return isPropValid(prop) && !CSS_PROPERTIES.includes(prop as Properties);
  },
})`
  ${declarationsHandler({ properties: CSS_PROPERTIES })}
  ${NON_FUNCTIONAL_PSEUDO_CLASS_NAMES.map(pseudoName => pseudoSelectorsHandler({
    properties: CSS_PROPERTIES,
    indicator: PSEUDO_CLASS_NAME_INDICATOR,
    pseudoName,
  }))}
  ${NON_FUNCTIONAL_PSEUDO_ELEMENT_NAMES.map(pseudoName => pseudoSelectorsHandler({
    properties: CSS_PROPERTIES,
    indicator: PSEUDO_ELEMENT_NAME_INDICATOR,
    pseudoName,
  }))}
`;

type ElementProps = HTMLAttributesProps & Partial<DeclarationRecordType> & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const Element = React.forwardRef<HTMLDivElement, ElementProps>((props, ref) => (
  <StyledElement ref={ref} {...props} />
))

Element.displayName = 'Element';

export default Element;
