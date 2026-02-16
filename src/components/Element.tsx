import isPropValid from '@emotion/is-prop-valid';
import { CSSObject, Interpolation } from '@emotion/react';
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
import { MediaQueriesType, useMediaQueries } from '../contexts/MediaQueriesProvider'

const PSEUDO_CLASS_NAME_INDICATOR = ':';
const PSEUDO_ELEMENT_NAME_INDICATOR = '::';

const isNonArrayObject = (value: unknown): boolean => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

type Indicator = typeof PSEUDO_CLASS_NAME_INDICATOR | typeof PSEUDO_ELEMENT_NAME_INDICATOR;

type Properties = typeof CSS_PROPERTIES[number];

type DeclarationsHandler = {
  properties: ReadonlyArray<(keyof React.CSSProperties)>;
};

type PseudoDeclarationsHandler = DeclarationsHandler &
  {
    indicator: Indicator;
    pseudoName: string | RegExp;
  };

type HTMLAttributesProps = React.HTMLAttributes<HTMLElement>;

const declarationsHandler = ({ properties }: DeclarationsHandler) => {
  return (
    props: HTMLAttributesProps & { mediaQueries?: MediaQueriesType }
  ): Interpolation<React.CSSProperties> => {
    const { mediaQueries } = props;
    const declarations: CSSObject = {};

    properties.forEach((property) => {
      const value = getOr(null, property, props) as (React.CSSProperties[keyof React.CSSProperties] | Record<string, React.CSSProperties[keyof React.CSSProperties]>);

      if (isNonArrayObject(value) && isNonArrayObject(mediaQueries)) {
        Object.entries(value as Record<string, React.CSSProperties[keyof React.CSSProperties]>).forEach(([key, val]) => {
          const mediaQuery = (mediaQueries as MediaQueriesType)[key];

          if (val !== undefined && val !== null && mediaQuery) {
            if (!declarations[`@media ${mediaQuery}`]) {
              declarations[`@media ${mediaQuery}`] = {};
            }

            (declarations[`@media ${mediaQuery}`] as CSSObject)[property as keyof CSSObject] = val;
          }
        });
      } else if (value !== undefined && value !== null) {
        declarations[property as keyof CSSObject] = value;
      }
    });

    return declarations;
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
      } as CSSObject;
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
  ${PSEUDO_CLASS_NAMES.map(pseudoName => pseudoSelectorsHandler({
    properties: CSS_PROPERTIES,
    indicator: PSEUDO_CLASS_NAME_INDICATOR,
    pseudoName,
  }))}
  ${PSEUDO_ELEMENT_NAMES.map(pseudoName => pseudoSelectorsHandler({
    properties: CSS_PROPERTIES,
    indicator: PSEUDO_ELEMENT_NAME_INDICATOR,
    pseudoName,
  }))}
`;

type ResponsiveCSSProperties = {
  [K in keyof React.CSSProperties]?: React.CSSProperties[K] | Record<string, React.CSSProperties[K]>;
};

type ElementProps = Omit<
  HTMLAttributesProps, keyof ResponsiveCSSProperties
> & ResponsiveCSSProperties & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<unknown>;
  mediaQueries?: MediaQueriesType;
  children?: React.ReactNode;
};

const Element = React.forwardRef<HTMLElement, ElementProps>((props, ref) => {
  const mediaQueries = useMediaQueries();
  return (
    /* @ts-expect-error React.HTMLAttributes<HTMLElement> not getting overridden by ResponsiveCSSProperties */
    <StyledElement ref={ref} mediaQueries={mediaQueries} {...props} />
  )
});

Element.displayName = 'Element';

export default Element;
