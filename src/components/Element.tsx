import isPropValid from '@emotion/is-prop-valid';
import { Interpolation } from '@emotion/react';
import styled from '@emotion/styled';
import * as React from 'react';
import { getOr } from 'lodash/fp';
import { DEFAULT_HTML_TAG } from '../constants';

const BACKGROUND_COLOR = 'backgroundColor';
const COLOR = 'color';
const FONT_SIZE = 'fontSize';
const FONT_WEIGHT = 'fontWeight';

/* For complete list, see https://github.com/emotion-js/emotion/blob/main/packages/is-prop-valid/src/props.js */
const ATTRIBUTES_NOT_TO_PASS = [
  BACKGROUND_COLOR,
  COLOR,
  FONT_SIZE,
  FONT_WEIGHT,
] as const;

type Properties = typeof ATTRIBUTES_NOT_TO_PASS[number];
type CreateDeclarationFactory = {
  property: Properties;
};

type HTMLAttributesProps = React.HTMLAttributes<HTMLElement>

type ValueType = string | number;
type DeclarationRecordType = Partial<Record<Properties, ValueType>>;

const createDeclarationFactory = (
  { property }: CreateDeclarationFactory): (props: HTMLAttributesProps
) => Interpolation<React.CSSProperties> => {
  return (props: HTMLAttributesProps): Interpolation<React.CSSProperties> => {
    const value = getOr(null, property, props);

    if (value !== undefined && value !== null) {
      return { [property]: value } as Interpolation<React.CSSProperties>;
    }

    return {};
  }
};

const backgroundColorDeclaration = createDeclarationFactory({
  property: BACKGROUND_COLOR,
});
const colorDeclaration = createDeclarationFactory({
  property: COLOR,
});
const fontSizeDeclaration = createDeclarationFactory({
  property: FONT_SIZE,
});
const fontWeightDeclaration = createDeclarationFactory({
  property: FONT_WEIGHT,
});

const StyledElement = styled(DEFAULT_HTML_TAG, {
  shouldForwardProp: (prop) => {
    return isPropValid(prop) && !ATTRIBUTES_NOT_TO_PASS.includes(prop as Properties);
  },
})`
  ${backgroundColorDeclaration}
  ${colorDeclaration}
  ${fontSizeDeclaration}
  ${fontWeightDeclaration}
`;

type ElementProps = HTMLAttributesProps & Partial<DeclarationRecordType> & {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
};

const Element = React.forwardRef<HTMLDivElement, ElementProps>((props, ref) => (
  <StyledElement ref={ref} {...props} />
))

Element.displayName = 'Element';

export default Element;
