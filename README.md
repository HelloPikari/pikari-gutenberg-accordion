# Pikari Gutenberg Accordion

A fully accessible WordPress Gutenberg block plugin for creating accordion/toggle content sections with optional FAQ schema markup.

## Description

Pikari Gutenberg Accordion provides a modern, accessible accordion block for the WordPress block editor. Perfect for FAQs, documentation, product features, or any collapsible content. The block features smooth animations, customizable icons, and full accessibility support.

## Features

- **🎯 Gutenberg Native**: Built with WordPress Block Editor best practices
- **♿ Fully Accessible**: WCAG 2.1 compliant with ARIA attributes and keyboard navigation
- **🎨 Theme Integration**: Inherits colors, spacing, and typography from theme.json
- **📱 Responsive**: Mobile-first design that works on all devices
- **🔍 SEO Friendly**: Optional Schema.org FAQ structured data
- **⚡ Performance Optimized**: Lightweight vanilla JavaScript, no jQuery dependency
- **🎛️ Highly Customizable**: CSS variables, PHP/JS filters, and block supports

## Requirements

- WordPress 6.0 or higher
- PHP 8.2 or higher
- Modern browser with JavaScript enabled

## Installation

### From WordPress Admin

1. Download the plugin ZIP file from the releases page
2. Navigate to Plugins → Add New in your WordPress admin
3. Click "Upload Plugin" and select the ZIP file
4. Click "Install Now" and then "Activate"

### Manual Installation

```bash
# Navigate to your WordPress plugins directory
cd wp-content/plugins/

# Clone or download the plugin
# Then activate through WordPress admin
```

## Usage

### Basic Usage

1. In the block editor, click the "+" button to add a new block
2. Search for "Accordion" and select the Pikari Gutenberg Accordion block
3. Each accordion automatically includes one accordion item
4. Click into the heading to add your question or title
5. Click into the content area to add your answer or content
6. Click "Add Accordion Item" to add more items

### FAQ Variation

1. When adding the block, select the "FAQ" variation
2. This pre-configures the block for FAQ content
3. Optionally enable Schema.org markup in the block settings panel
4. The schema markup helps search engines understand your FAQ content

### Block Settings

#### Accordion Container Settings

- **Allow Multiple Expanded**: Allow multiple items to be open simultaneously
- **Enable Animations**: Toggle smooth expand/collapse transitions
- **Icon Style**: Choose between chevron, plus/minus, arrow, or none
- **Enable Schema.org**: Add FAQ structured data (FAQ variation only)

#### Accordion Item Settings

- **Initially Expanded**: Set whether the item is open by default

#### Style Settings (Block Supports)

- **Colors**: Background, text, and link colors
- **Spacing**: Padding, margin, and block gap
- **Border**: Style, width, color, and radius
- **Typography**: Inherited from the heading block

## Customization

### CSS Variables

Customize the accordion appearance using CSS variables:

```css
.wp-block-pikari-gutenberg-accordion {
	--pikari-gutenberg-accordion-icon-size: 1.25em;
	--pikari-gutenberg-accordion-icon-rotation: 180deg;
	--pikari-gutenberg-accordion-transition-duration: 0.3s;
	--pikari-gutenberg-accordion-transition-easing: ease-in-out;
	--pikari-gutenberg-accordion-icon-color: currentColor;
	--pikari-gutenberg-accordion-hover-opacity: 0.8;
}
```

### PHP Filters

#### Customize Icon HTML

```php
add_filter('pikari_gutenberg_accordion_icon_html', function($html, $style) {
    if ($style === 'custom') {
        return '<svg><!-- Your custom SVG --></svg>';
    }
    return $html;
}, 10, 2);
```

#### Modify Schema.org Data

```php
add_filter('pikari_gutenberg_accordion_schema_data', function($data, $attributes) {
    // Modify schema data structure
    return $data;
}, 10, 2);
```

### JavaScript Hooks

```javascript
// Customize icon via JavaScript
wp.hooks.addFilter(
	'pikari.accordion.iconHTML',
	'my-theme/accordion-icon',
	(html, style, isExpanded) => {
		// Return custom icon HTML
		return html;
	}
);
```

### JavaScript Events

Listen for accordion events:

```javascript
document.addEventListener('pikari-gutenberg-accordion:toggle', (e) => {
	console.log('Accordion toggled:', e.detail.expanded);
});

document.addEventListener('pikari-gutenberg-accordion:open', (e) => {
	console.log('Accordion opened');
});

document.addEventListener('pikari-gutenberg-accordion:close', (e) => {
	console.log('Accordion closed');
});
```

## Accessibility

- ✅ **Semantic HTML**: Uses appropriate heading levels and regions
- ✅ **ARIA Support**: Proper aria-expanded, aria-controls, and aria-labelledby
- ✅ **Keyboard Navigation**: Enter and Space keys to toggle items
- ✅ **Focus Management**: Visible focus indicators for keyboard users
- ✅ **Screen Readers**: Fully compatible with NVDA, JAWS, and VoiceOver
- ✅ **Motion Preferences**: Respects prefers-reduced-motion setting

## Development

### Setup Development Environment

```bash
# Install dependencies
npm install
composer install

# Run development build with watch mode
npm start

# Build for production
npm run build

# Run all linters
npm run lint:all

# Fix auto-fixable linting issues
npm run lint:fix

# Test in WordPress Playground
npm run playground

# Create distributable plugin ZIP
npm run plugin-zip
```

### Available Scripts

- `npm start` - Start development build with file watching
- `npm run build` - Create optimized production build
- `npm run lint:all` - Run JS, CSS, PHP, and Markdown linters
- `npm run lint:fix` - Auto-fix all fixable linting issues
- `npm run lint:js` - Lint JavaScript files
- `npm run lint:css` - Lint CSS/SCSS files
- `npm run lint:php` - Lint PHP files
- `npm run playground` - Launch WordPress Playground for testing
- `npm run plugin-zip` - Create distributable plugin ZIP file

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

GPL-2.0-or-later

## Author

**Pikari Inc.**

- Email: development@pikari.io
- Homepage: <https://pikari.io>

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a list of changes.
