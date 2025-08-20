# React Dropdown Component

A feature-rich, customizable dropdown component for React with TypeScript support. Built with modern React patterns, comprehensive accessibility features, and flexible customization options.

## Features

-  **Searchable Dropdown** - Real-time filtering with customizable search
-  **Single/Multiple Selection** - Support for both selection modes
-  **Portal Support** - Render dropdown outside parent container to avoid overflow issues
-  **Customizable Rendering** - Custom option and selected value renderers
-  **Toggle Features** - Enable/disable search, clear, and select all functionality
-  **Z-Index Compatibility** - Configurable z-index for complex layouts
-  **Keyboard Navigation** - Full accessibility with keyboard support
-  **Form Integration** - Hidden input for seamless form compatibility
-  **TypeScript Support** - Complete type safety with comprehensive interfaces
-  **Tailwind CSS** - Modern styling with utility classes
-  **Comprehensive Testing** - Extensive test coverage with edge cases
-  **Storybook Integration** - Interactive documentation and testing

### Local Development
```bash
# Clone the repository
git clone https://github.com/luxuary0054/react-dropdown-component
cd react-dropdown-component

# Install dependencies
npm install

# Build the component
npm run build
```

### Peer Dependencies

This component requires React 16.8+ (for hooks support) and React DOM as peer dependencies:

```json
{
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

## Testing

The component includes comprehensive tests covering:

- Basic rendering and functionality
- Single and multiple selection
- Search functionality
- Keyboard navigation
- Custom renderers
- Portal support
- Edge cases and accessibility

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Storybook

Interactive documentation and testing with Storybook:

```bash
# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Start development mode with watch
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Start Storybook
npm run storybook

# Build Storybook
npm run build-storybook
```

### Project Structure

```
src/
├── components/
│   ├── __tests__/
│   │   └── Dropdown.test.tsx    # Comprehensive tests
│   └── Dropdown.tsx             # Main component
├── types/
│   └── index.ts                 # TypeScript interfaces
├── index.ts                     # Main export
└── setupTests.ts               # Test setup
stories/
└── Dropdown.stories.tsx        # Storybook stories
```

## Browser Support

- React 16.8+ (hooks support required)
- Modern browsers with ES6+ support
- TypeScript 4.0+
- 

### Performance Tips

1. **Memoize large option arrays** using `useMemo`
2. **Limit search results** for better performance with large datasets
3. **Use controlled search** for server-side filtering
4. **Avoid unnecessary re-renders** by memoizing callback functions


### v1.0.0
- Initial release
- Core dropdown functionality with single/multiple selection
- Search functionality with real-time filtering
- Portal support for complex layouts
- Custom option and selected value renderers
- Comprehensive TypeScript types and interfaces
- Full accessibility support with keyboard navigation
- Extensive test coverage with edge cases
- Storybook integration for interactive documentation
- Tailwind CSS styling with customization options
- Form integration with hidden inputs
- Z-index compatibility for complex layouts
