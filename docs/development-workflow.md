# Development Workflow

This document outlines the development workflow for contributing to the Pikari Accordion plugin.

## Branch Structure

### Main Branches

- **`main`**: Production-ready code, protected branch
- **`develop`**: Integration branch for features (optional, can work directly with feature branches to main)

### Feature Branches

- **`feature/description`**: New features
- **`fix/description`**: Bug fixes
- **`chore/description`**: Maintenance tasks
- **`docs/description`**: Documentation updates

## Workflow Steps

### 1. Create Feature Branch

```bash
# Create and switch to feature branch
git checkout -b feature/add-keyboard-navigation

# Push branch to remote
git push -u origin feature/add-keyboard-navigation
```

### 2. Development

Make your changes following the coding standards:

```bash
# Install dependencies
npm install
composer install

# Start development server
npm start

# Run linting
npm run lint:all

# Fix linting issues
npm run lint:fix
```

### 3. Testing

```bash
# Run build to ensure no errors
npm run build

# Test the plugin in WordPress
npm run playground
```

### 4. Create Pull Request

1. **Push your changes**:

   ```bash
   git add .
   git commit -m "feat: add keyboard navigation to accordion items"
   git push
   ```

2. **Open PR on GitHub**:

   - Navigate to your repository
   - Click "Compare & pull request"
   - Fill out the PR template

3. **Add appropriate labels**:
   - `feature` for new functionality
   - `bug` for fixes
   - `breaking` for breaking changes
   - `docs` for documentation
   - `dependencies` for dependency updates

### 5. Code Review

- CI will automatically run (linting, building, security checks)
- Address any CI failures
- Respond to review feedback
- Make additional commits as needed

### 6. Merge

Once approved:

- PR will be merged to `main`
- Release Drafter automatically updates draft release
- Feature branch can be deleted

## Coding Standards

### PHP Standards

- **Indentation**: 4 spaces (enforced by phpcs.xml)
- **WordPress Coding Standards**: Follow WPCS guidelines
- **Function naming**: Use underscores, prefix with plugin name
- **Documentation**: PHPDoc for all functions

Example:

```php
/**
 * Register accordion blocks.
 *
 * @since 1.0.0
 * @return void
 */
function pikari_gutenberg_accordion_register_blocks() {
    register_block_type( __DIR__ . '/build/blocks/accordion' );
    register_block_type( __DIR__ . '/build/blocks/accordion-item' );
}
```

### JavaScript Standards

- **ESLint**: WordPress JavaScript coding standards
- **Formatting**: Handled by ESLint (not Prettier)
- **Variable naming**: camelCase
- **File naming**: kebab-case

Example:

```javascript
/**
 * Accordion block edit component.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<InnerBlocks />
		</div>
	);
}
```

### CSS/SCSS Standards

- **Stylelint**: WordPress CSS coding standards
- **Class naming**: BEM methodology preferred
- **File structure**: One file per component
- **Mobile-first**: Responsive design approach

Example:

```scss
.wp-block-pikari-gutenberg-accordion {
	&__item {
		margin-bottom: 1rem;

		&--expanded {
			.wp-block-pikari-gutenberg-accordion__content {
				display: block;
			}
		}
	}

	&__content {
		display: none;
	}
}
```

## Commit Message Format

Use conventional commits for consistency:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

### Examples

```bash
feat: add keyboard navigation support
fix: resolve accordion animation glitch
docs: update installation instructions
chore: update dependencies
```

## Pre-commit Hooks

Husky runs automatic checks before commits:

- **JavaScript linting**: ESLint with WordPress config
- **CSS linting**: Stylelint with WordPress config
- **PHP linting**: PHPCS with WordPress standards

If checks fail, the commit is blocked. Fix issues before committing:

```bash
# Fix JavaScript issues
npm run lint:js -- --fix

# Fix CSS issues
npm run lint:css -- --fix

# Fix PHP issues
composer lint:fix
```

## Local Development Setup

### Prerequisites

- **Node.js**: Version 20+
- **PHP**: Version 8.3+
- **Composer**: Latest version
- **WordPress**: For testing

### Setup Steps

1. **Clone repository**:

   ```bash
   git clone https://github.com/HelloPikari/pikari-gutenberg-accordion.git
   cd pikari-gutenberg-accordion
   ```

2. **Install dependencies**:

   ```bash
   npm install
   composer install
   ```

3. **Start development**:

   ```bash
   npm start  # Watches for changes
   ```

4. **Test in WordPress**:
   ```bash
   npm run playground  # Launches WordPress Playground
   ```

### Build Commands

```bash
# Development build with watch
npm start

# Production build
npm run build

# Create plugin ZIP
npm run plugin-zip

# Linting
npm run lint:all
npm run lint:js
npm run lint:css
npm run lint:php

# Testing
npm test
composer test
```

## CI/CD Pipeline

### Automated Checks

Every PR triggers:

1. **Code Quality**:

   - JavaScript linting (ESLint)
   - CSS linting (Stylelint)
   - PHP linting (PHPCS)

2. **Build Verification**:

   - Production build test
   - Asset verification

3. **Security Scanning**:
   - npm audit for vulnerabilities
   - Composer security check

### Release Process

1. **PR Merge** → Draft release updated automatically
2. **Publish Release** → Production ZIP built and attached
3. **Distribution** → Available for download and Composer install

## Testing Guidelines

### Manual Testing

- Test in multiple WordPress versions (6.8+)
- Verify accessibility with screen readers
- Test responsive design on mobile devices
- Check browser compatibility (modern browsers)

### Automated Testing

Currently minimal automated testing. Planned additions:

- Jest unit tests for JavaScript
- PHPUnit tests for PHP functions
- E2E tests with WordPress Playground

## Debugging

### Common Issues

1. **Build Failures**:

   ```bash
   # Clear cache and rebuild
   rm -rf build node_modules
   npm install
   npm run build
   ```

2. **Linting Errors**:

   ```bash
   # Run auto-fix
   npm run lint:fix
   ```

3. **PHP Errors**:

   ```bash
   # Check syntax
   composer lint

   # Auto-fix spacing/formatting
   composer lint:fix
   ```

### WordPress Playground

Use WordPress Playground for quick testing:

```bash
# Start playground with plugin
npm run playground

# Plugin automatically loaded and activated
# Access at http://localhost:8881
```

## Performance Considerations

### Frontend Optimization

- Minimize JavaScript bundle size
- Use CSS custom properties for theming
- Optimize for Core Web Vitals
- Lazy load non-critical assets

### Backend Optimization

- Minimize database queries
- Cache expensive operations
- Use WordPress transients appropriately
- Follow WordPress performance best practices

## Accessibility Requirements

### ARIA Implementation

- Proper heading hierarchy
- Button roles and states
- Focus management
- Screen reader announcements

### Keyboard Navigation

- Tab navigation through items
- Enter/Space to toggle
- Arrow keys for navigation (optional)
- Escape to close (if applicable)

### Testing

- Test with screen readers
- Verify keyboard-only navigation
- Check color contrast ratios
- Validate semantic HTML structure

## Documentation Standards

### Inline Documentation

- PHPDoc for all PHP functions
- JSDoc for complex JavaScript functions
- CSS comments for complex styles
- README updates for new features

### External Documentation

- Update user guides for new features
- Maintain developer documentation
- Include code examples
- Document breaking changes clearly

## Getting Help

- **GitHub Discussions**: General questions
- **GitHub Issues**: Bug reports and feature requests
- **Code Review**: PR feedback and suggestions
- **Documentation**: Comprehensive guides in `/docs/`
