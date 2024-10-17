import isPropValid from '@emotion/is-prop-valid';
import { Interpolation } from '@emotion/react';
import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import { getOr } from 'lodash/fp';
import * as React from 'react';
import {
  CSS_PROPERTIES,
  DEFAULT_HTML_TAG,
  PSEUDO_CLASS_NAMES,
  PSEUDO_ELEMENT_NAMES,
} from '../constants';

const PSEUDO_CLASS_NAME_INDICATOR = ':';
const PSEUDO_ELEMENT_NAME_INDICATOR = '::';

type Indicator = typeof PSEUDO_CLASS_NAME_INDICATOR | typeof PSEUDO_ELEMENT_NAME_INDICATOR;

type Properties = typeof CSS_PROPERTIES[number];

type DeclarationsHandler = {
  properties: readonly Properties[];
};

type PseudoDeclarationsHandler = DeclarationsHandler &
  {
    indicator: Indicator;
    pseudoName: string | RegExp;
  };
  
type HTMLAttributesProps = React.HTMLAttributes<HTMLElement>;

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
  return (props: HTMLAttributesProps & { pseudo?: Record<string, string> }): Interpolation<React.CSSProperties> => {
    const { pseudo = {} } = props;
    let pseudoClassProps: Record<string, React.CSSProperties> = {};
    let finalPseudoName = pseudoName;

    if (pseudoName instanceof RegExp) {
      Object.keys(pseudo).every((matchedKey) => {
        if (pseudoName.test(matchedKey)) {
          finalPseudoName = matchedKey;
          const matchedProps = getOr(null, `pseudo.${finalPseudoName}`, props);
          if (!isEmpty(matchedProps)) {
            pseudoClassProps = matchedProps;
          }
          return false;
        }
      });
    } else {
      pseudoClassProps = getOr(null, `pseudo.${finalPseudoName}`, props);
    }

    if (!isEmpty(pseudoClassProps)) {
      return {
        [`&${indicator}${finalPseudoName}`]: declarationsHandler({ properties })(pseudoClassProps),
      } as Interpolation<React.CSSProperties>;
    }
    return null;
  }
};

const StyledElement = styled(DEFAULT_HTML_TAG, {
  shouldForwardProp: (prop) => {
    return isPropValid(prop) && !CSS_PROPERTIES.includes(prop as Properties);
  },
})`
  ${declarationsHandler({ properties: CSS_PROPERTIES })}
  ${props => {
    return PSEUDO_CLASS_NAMES.map(pseudoName => pseudoSelectorsHandler({
      properties: CSS_PROPERTIES,
      indicator: PSEUDO_CLASS_NAME_INDICATOR,
      pseudoName,
    })(props))
  }}
  ${PSEUDO_ELEMENT_NAMES.map(pseudoName => pseudoSelectorsHandler({
    properties: CSS_PROPERTIES,
    indicator: PSEUDO_ELEMENT_NAME_INDICATOR,
    pseudoName,
  }))}
`;

type ElementProps = HTMLAttributesProps & Partial<DeclarationRecordType> & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<unknown>;
};

const Element = React.forwardRef<HTMLDivElement, ElementProps>((props, ref) => (
  <StyledElement ref={ref} {...props} />
));

Element.displayName = 'Element';

export default Element;
