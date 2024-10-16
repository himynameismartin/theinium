import isPropValid from '@emotion/is-prop-valid';
import { Interpolation } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { getOr } from 'lodash/fp';
import { DEFAULT_HTML_TAG } from '../constants';

/* For complete list, see https://github.com/emotion-js/emotion/blob/main/packages/is-prop-valid/src/props.js */
const CSS_PROPERTIES = [
  'backgroundColor',
  'color',
  'fontSize',
  'fontWeight',
] as const;

type Properties = typeof CSS_PROPERTIES[number];

type DeclarationsHandler = {
  properties: readonly Properties[];
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

const StyledElement = styled(DEFAULT_HTML_TAG, {
  shouldForwardProp: (prop) => {
    return isPropValid(prop) && !CSS_PROPERTIES.includes(prop as Properties);
  },
})`
  ${declarationsHandler({ properties: CSS_PROPERTIES })}
`;

type ElementProps = HTMLAttributesProps & Partial<DeclarationRecordType> & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const Element = React.forwardRef<HTMLDivElement, ElementProps>((props, ref) => (
  <StyledElement ref={ref} {...props} />
))

Element.displayName = 'Element';

export default Element;
