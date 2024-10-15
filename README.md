<h1 align="center">Theinium</h1>

<h5 align="center">
A base for UI library I've always wanted to use for work with design systems
</h5>

### Quickstart

```console
yarn
yarn storybook
```

### Example

```js
const themes = {
  vanilla: {
    colors: {
      brand: '#F3E5AB'
    }
  },
  pistachio: {
    colors: {
      brand: '#93C572'
    }
  }
}

const ThemeAwareComponent = styled(Element)`
  color: ${getColor('brand')}
`;

const ThemedApp: React.FC = () => (
  <ThemeContextProvider themes={themes}>
    <ThemeProvider name="vanilla">
      <ThemeAwareComponent>vanilla</ThemeAwareComponent>
      <ThemeProvider name="pistachio">
        <ThemeAwareComponent>pistachio</ThemeAwareComponent>
      </ThemeProvider>
    </ThemeProvider>
  </ThemeContextProvider>
);
```

### TODO

- themeable components
- themeable interactivity
- support for all properties

### License

Dual CC0 and MIT.
