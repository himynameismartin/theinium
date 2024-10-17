export const DEFAULT_HTML_TAG = 'div';

export const CSS_PROPERTIES = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'animation',
  'animationDelay',
  'animationDirection',
  'animationDuration',
  'animationFillMode',
  'animationIterationCount',
  'animationName',
  'animationPlayState',
  'animationTimingFunction',
  'backfaceVisibility',
  'background',
  'backgroundAttachment',
  'backgroundBlendMode',
  'backgroundClip',
  'backgroundColor',
  'backgroundImage',
  'backgroundOrigin',
  'backgroundPosition',
  'backgroundPositionX',
  'backgroundPositionY',
  'backgroundRepeat',
  'backgroundSize',
  'border',
  'borderBottom',
  'borderBottomColor',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderBottomStyle',
  'borderBottomWidth',
  'borderCollapse',
  'borderColor',
  'borderImage',
  'borderImageOutset',
  'borderImageRepeat',
  'borderImageSlice',
  'borderImageSource',
  'borderImageWidth',
  'borderLeft',
  'borderLeftColor',
  'borderLeftStyle',
  'borderLeftWidth',
  'borderRadius',
  'borderRight',
  'borderRightColor',
  'borderRightStyle',
  'borderRightWidth',
  'borderSpacing',
  'borderStyle',
  'borderTop',
  'borderTopColor',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderTopStyle',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'boxDecorationBreak',
  'boxShadow',
  'boxSizing',
  'breakAfter',
  'breakBefore',
  'breakInside',
  'captionSide',
  'caretColor',
  'clear',
  'clip',
  'clipPath',
  'color',
  'columnCount',
  'columnFill',
  'columnGap',
  'columnRule',
  'columnRuleColor',
  'columnRuleStyle',
  'columnRuleWidth',
  'columnSpan',
  'columnWidth',
  'columns',
  'content',
  'counterIncrement',
  'counterReset',
  'cursor',
  'direction',
  'display',
  'emptyCells',
  'filter',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexFlow',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'float',
  'font',
  'fontFamily',
  'fontFeatureSettings',
  'fontKerning',
  'fontLanguageOverride',
  'fontOpticalSizing',
  'fontSize',
  'fontSizeAdjust',
  'fontStretch',
  'fontStyle',
  'fontSynthesis',
  'fontVariant',
  'fontVariantAlternates',
  'fontVariantCaps',
  'fontVariantEastAsian',
  'fontVariantLigatures',
  'fontVariantNumeric',
  'fontVariantPosition',
  'fontWeight',
  'gap',
  'grid',
  'gridArea',
  'gridAutoColumns',
  'gridAutoFlow',
  'gridAutoRows',
  'gridColumn',
  'gridColumnEnd',
  'gridColumnGap',
  'gridColumnStart',
  'gridGap',
  'gridRow',
  'gridRowEnd',
  'gridRowGap',
  'gridRowStart',
  'gridTemplate',
  'gridTemplateAreas',
  'gridTemplateColumns',
  'gridTemplateRows',
  'hangingPunctuation',
  'height',
  'hyphens',
  'imageRendering',
  'inlineSize',
  'inset',
  'insetBlock',
  'insetBlockEnd',
  'insetBlockStart',
  'insetInline',
  'insetInlineEnd',
  'insetInlineStart',
  'isolation',
  'justifyContent',
  'justifyItems',
  'justifySelf',
  'left',
  'letterSpacing',
  'lineBreak',
  'lineHeight',
  'listStyle',
  'listStyleImage',
  'listStylePosition',
  'listStyleType',
  'margin',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginBottom',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'marginLeft',
  'marginRight',
  'marginTop',
  'mask',
  'maskBorder',
  'maskBorderMode',
  'maskBorderOutset',
  'maskBorderRepeat',
  'maskBorderSlice',
  'maskBorderSource',
  'maskBorderWidth',
  'maskClip',
  'maskComposite',
  'maskImage',
  'maskMode',
  'maskOrigin',
  'maskPosition',
  'maskRepeat',
  'maskSize',
  'maskType',
  'maxBlockSize',
  'maxHeight',
  'maxInlineSize',
  'maxWidth',
  'minBlockSize',
  'minHeight',
  'minInlineSize',
  'minWidth',
  'mixBlendMode',
  'objectFit',
  'objectPosition',
  'offset',
  'offsetAnchor',
  'offsetBlock',
  'offsetBlockEnd',
  'offsetBlockStart',
  'offsetDistance',
  'offsetInline',
  'offsetInlineEnd',
  'offsetInlineStart',
  'offsetPath',
  'offsetPosition',
  'offsetRotate',
  'opacity',
  'order',
  'orphans',
  'outline',
  'outlineColor',
  'outlineOffset',
  'outlineStyle',
  'outlineWidth',
  'overflow',
  'overflowAnchor',
  'overflowBlock',
  'overflowClipMargin',
  'overflowInline',
  'overflowWrap',
  'overflowX',
  'overflowY',
  'overscrollBehavior',
  'overscrollBehaviorBlock',
  'overscrollBehaviorInline',
  'overscrollBehaviorX',
  'overscrollBehaviorY',
  'padding',
  'paddingBlock',
  'paddingBlockEnd',
  'paddingBlockStart',
  'paddingBottom',
  'paddingInline',
  'paddingInlineEnd',
  'paddingInlineStart',
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'pageBreakAfter',
  'pageBreakBefore',
  'pageBreakInside',
  'paintOrder',
  'perspective',
  'perspectiveOrigin',
  'placeContent',
  'placeItems',
  'placeSelf',
  'pointerEvents',
  'position',
  'quotes',
  'resize',
  'right',
  'rotate',
  'rowGap',
  'rubyAlign',
  'rubyMerge',
  'rubyPosition',
  'scale',
  'scrollBehavior',
  'scrollMargin',
  'scrollMarginBlock',
  'scrollMarginBlockEnd',
  'scrollMarginBlockStart',
  'scrollMarginBottom',
  'scrollMarginInline',
  'scrollMarginInlineEnd',
  'scrollMarginInlineStart',
  'scrollMarginLeft',
  'scrollMarginRight',
  'scrollMarginTop',
  'scrollPadding',
  'scrollPaddingBlock',
  'scrollPaddingBlockEnd',
  'scrollPaddingBlockStart',
  'scrollPaddingBottom',
  'scrollPaddingInline',
  'scrollPaddingInlineEnd',
  'scrollPaddingInlineStart',
  'scrollPaddingLeft',
  'scrollPaddingRight',
  'scrollPaddingTop',
  'scrollSnapAlign',
  'scrollSnapStop',
  'scrollSnapType',
  'scrollbarColor',
  'scrollbarGutter',
  'scrollbarWidth',
  'shapeImageThreshold',
  'shapeMargin',
  'shapeOutside',
  'tabSize',
  'tableLayout',
  'textAlign',
  'textAlignLast',
  'textCombineUpright',
  'textDecoration',
  'textDecorationColor',
  'textDecorationLine',
  'textDecorationSkip',
  'textDecorationSkipInk',
  'textDecorationStyle',
  'textEmphasis',
  'textEmphasisColor',
  'textEmphasisPosition',
  'textEmphasisStyle',
  'textIndent',
  'textJustify',
  'textOrientation',
  'textOverflow',
  'textRendering',
  'textShadow',
  'textTransform',
  'textUnderlineOffset',
  'textUnderlinePosition',
  'top',
  'touchAction',
  'transform',
  'transformBox',
  'transformOrigin',
  'transformStyle',
  'transition',
  'transitionDelay',
  'transitionDuration',
  'transitionProperty',
  'transitionTimingFunction',
  'translate',
  'unicodeBidi',
  'userSelect',
  'verticalAlign',
  'visibility',
  'whiteSpace',
  'widows',
  'width',
  'willChange',
  'wordBreak',
  'wordSpacing',
  'writingMode',
  'zIndex',
  'zoom',
] as const;

export const NON_FUNCTIONAL_PSEUDO_CLASS_NAMES = [
  'active',
  'checked',
  'default',
  'disabled',
  'empty',
  'enabled',
  'first',
  'first-child',
  'first-of-type',
  'focus',
  'focus-visible',
  'focus-within',
  'hover',
  'indeterminate',
  'in-range',
  'invalid',
  'last-child',
  'last-of-type',
  'link',
  'only-child',
  'only-of-type',
  'optional',
  'out-of-range',
  'placeholder-shown',
  'read-only',
  'read-write',
  'required',
  'root',
  'scope',
  'target',
  'valid',
  'visited',
] as const;

export const FUNCTIONAL_PSEUDO_CLASS_NAMES = [
  /nth-(child|last-child|of-type|last-of-type|col|last-col)\((even|odd|([+-]?\d*n(?:[+-]\d+)?)?)\)/,
  /(not|is|where|has|matches|any)\(([^)]+)\)/,
  /lang\(([a-zA-Z-]+)\)/,
  /dir\((ltr|rtl|auto)\)/,
  /state\(([a-zA-Z0-9_-]+)\)/
] as const;

export const PSEUDO_CLASS_NAMES = [
  ...FUNCTIONAL_PSEUDO_CLASS_NAMES,
  ...NON_FUNCTIONAL_PSEUDO_CLASS_NAMES,
] as const;

export const NON_FUNCTIONAL_PSEUDO_ELEMENT_NAMES = [
  'after',
  'before',
  'cue',
  'first-letter',
  'first-line',
  'grammar-error',
  'marker',
  'placeholder',
  'selection',
  'slotted',
  'spelling-error',
] as const;

export const FUNCTIONAL_PSEUDO_ELEMENT_NAMES = [
  /part\(([a-zA-Z0-9_-]+)\)/,
  /slotted\(([a-zA-Z0-9._-]+)\)/,
  /(cue|cue-region)\(([a-zA-Z0-9._-]*)\)/,
] as const;

export const PSEUDO_ELEMENT_NAMES = [
  ...FUNCTIONAL_PSEUDO_ELEMENT_NAMES,
  ...NON_FUNCTIONAL_PSEUDO_ELEMENT_NAMES,
] as const;
