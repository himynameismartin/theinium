import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';
import * as React from 'react';

/* For complete list, see https://github.com/emotion-js/emotion/blob/main/packages/is-prop-valid/src/props.js */
const ATTRIBUTES_NOT_TO_PASS = [
  'color',
];

const StyledElement = styled('div', {
  shouldForwardProp: (prop) => {
    return isPropValid(prop) && !ATTRIBUTES_NOT_TO_PASS.includes(prop)
  },
})`
  ${({ color }) => color !== undefined && color !== null
    ? { color }
    : null
  }
`;

type ElementProps = React.HTMLAttributes<HTMLDivElement> & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const Element: React.FC<ElementProps> = (props) => (
  <StyledElement {...props} />
);

Element.displayName = 'Element';

export default Element;
