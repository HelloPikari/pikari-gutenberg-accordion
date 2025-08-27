# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

pikari-gutenberg-accordion is a WordPress plugin that provides a comprehensive Accordion/Toggle block system for the WordPress Gutenberg editor. The plugin consists of two main blocks:

1. **Accordion Container** (`pikari-gutenberg-accordion/accordion`): The parent block that manages settings and provides context
2. **Accordion Item** (`pikari-gutenberg-accordion/accordion-item`): Individual collapsible items with heading and content areas

### Key Features

- **Accessibility First**: Full ARIA support, keyboard navigation, proper focus management, and semantic HTML
- **Flexible Layout**: Supports WordPress core layout features including alignment, spacing, colors, and borders
- **Animation Support**: Optional smooth expand/collapse animations with CSS transitions
- **Icon Customization**: Multiple icon styles (chevron, plus, arrow) with left/right positioning
- **Multi-expand Control**: Option to allow multiple items expanded simultaneously or accordion-style single expansion
- **Schema.org Support**: Optional FAQ schema markup generation for SEO benefits
- **Context System**: Parent accordion block provides settings context to child accordion items

## Development Commands

### Build and Development

```bash
# Install dependencies
npm install
composer install

# Start development build with file watching
npm start

# Production build
npm run build

# Create plugin ZIP for distribution
npm run plugin-zip
```

### Code Quality

```bash
# Run all linting
npm run lint:all

# Auto-fix linting issues
npm run lint:fix

# Run PHP linting only
npm run lint:php

# Run JavaScript linting only
npm run lint:js

# Run CSS linting only
npm run lint:css
```

### Testing

```bash
# Run JavaScript tests
npm test

# Run PHP tests
composer test
```

### WordPress Playground

```bash
# Start local WordPress Playground
npm run playground
```

## Coding Standards

### PHP Coding Standards

- Follow WordPress Coding Standards with **4 spaces indentation (NOT TABS)**
- This project's phpcs.xml enforces space-based indentation
- Use meaningful function and variable names with underscores (not camelCase)
- Prefix all global functions with your plugin/theme prefix
- Document all functions with proper PHPDoc blocks
- Use WordPress functions when available (e.g., `wp_remote_get()` instead of `curl`)

### JavaScript Standards

- Use WordPress ESLint configuration
- Single quotes for strings
- Space indentation as configured in .eslintrc.cjs
- Meaningful variable names in camelCase
- Use `wp` global for WordPress JavaScript APIs

### CSS/SCSS Standards

- Follow WordPress CSS coding standards
- Use semantic, descriptive class names
- Prefix all CSS classes with your plugin/theme prefix
- Mobile-first responsive design
- Use CSS custom properties for theme compatibility

### HTML Standards

- Use semantic HTML5 elements
- Ensure proper accessibility (ARIA labels, alt text, etc.)
- Follow WordPress HTML coding standards
- Validate HTML output

### Database Queries

- Use WordPress database APIs (`$wpdb`)
- Always prepare SQL queries to prevent injection
- Cache expensive queries using transients
- Follow WordPress database schema conventions

### Code Style and Linting

**IMPORTANT**: All generated code MUST follow the linting configurations defined in this project:

- **PHP**: Use 4 spaces for indentation (NO TABS) - see phpcs.xml
- **JavaScript**: Follow ESLint configuration (ESLint handles all JS formatting)
- **CSS/SCSS**: Follow Stylelint configuration (Prettier formats CSS/SCSS)
- Generated code must pass all linting checks without modifications

Note: Prettier is configured to ignore JavaScript files. ESLint handles all JavaScript formatting to ensure WordPress coding standards are followed.

### General Principles

- Write clean, readable, and maintainable code
- Follow the principle of least surprise
- Prefer clarity over cleverness
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility
- Comment complex logic, not obvious code
- Maintain consistent formatting (enforced by linters)

### Documentation

- Document all public APIs
- Include examples in documentation
- Keep documentation up-to-date with code changes
- Use inline comments sparingly and only when necessary

### Error Handling

- Always handle errors appropriately
- Provide meaningful error messages
- Log errors for debugging but don't expose sensitive info
- Fail fast and fail clearly

### Performance

- Optimize for readability first, performance second
- Profile before optimizing
- Avoid premature optimization
- Consider caching for expensive operations

## Architecture

### Project Structure

- `pikari-gutenberg-accordion.php` - Main plugin file with WordPress headers, block registration, and schema functionality
- `src/blocks/accordion/` - Parent accordion container block (edit.js, save.js, render.php, styles)
- `src/blocks/accordion-item/` - Child accordion item block (edit.js, save.js, styles)
- `src/components/icons.js` - Reusable icon components for accordion expand/collapse indicators
- `src/frontend/accordion.js` - Frontend JavaScript for accordion interactions and accessibility
- `build/` - Compiled assets (gitignored, created by wp-scripts build process)
- `languages/` - Translation files for internationalization
- `_playground/` - WordPress Playground configuration for local development

### Block Architecture Patterns

- **Parent-Child Relationship**: Accordion uses `providesContext` and accordion-item uses `usesContext` for settings inheritance
- **Block Registration**: Both blocks registered via `register_block_type()` with `build/blocks/` directory structure
- **Frontend Rendering**: Accordion block uses `render.php` for server-side rendering with schema support
- **Context Passing**: Settings like `iconStyle`, `iconPosition`, `allowMultipleExpanded` flow from parent to children
- **Accessibility Implementation**: Frontend JavaScript in `accordion.js` adds proper ARIA attributes and keyboard handling
- **Schema Generation**: `pikari_gutenberg_accordion_extract_schema_data()` function parses block content for FAQ schema

### Key WordPress Patterns

- Block registration follows WordPress standards with block.json metadata
- Uses `@wordpress/scripts` for build tooling and development workflow
- Proper WordPress coding standards with 4-space indentation (enforced by phpcs.xml)
- Internationalization ready with proper text domain usage
- Schema output uses `wp_json_encode()` for safe JSON-LD generation

### Dependencies

- WordPress 6.0
- PHP 8.2
- Node.js for build tools
- Composer for PHP dependencies

## Git Workflow

- Main branch: `main`
- Feature branches: `feature/description`
- Bugfix branches: `fix/description`
- Commit format: `type: Brief description`
  - Types: feat, fix, docs, style, refactor, test, chore
- Pre-commit hooks run linting automatically via Husky
- All commits must pass linting

## Testing

- JavaScript tests in `tests/unit/`
- PHP tests in `tests/` following PHPUnit structure
- Run all tests before submitting PR
- Write tests for new features and bug fixes
- Aim for good test coverage

## Security Considerations

### WordPress Security Best Practices

#### Output Escaping

- `esc_html()` - For plain text output
- `esc_attr()` - For HTML attribute values
- `esc_url()` - For URLs
- `esc_js()` - For inline JavaScript (deprecated, avoid inline JS)
- `wp_kses_post()` - For content with allowed HTML
- `esc_textarea()` - For textarea content

#### Input Sanitization

- `sanitize_text_field()` - For plain text input
- `sanitize_email()` - For email addresses
- `sanitize_url()` - For URLs
- `sanitize_key()` - For keys and slugs
- `wp_kses_post()` - For content with HTML
- `absint()` - For positive integers
- `intval()` - For integers

#### Nonces

- Always use nonces for forms and AJAX requests
- `wp_nonce_field()` - Add nonce to forms
- `check_admin_referer()` - Verify nonce in admin
- `wp_verify_nonce()` - Verify nonce programmatically

#### Capabilities

- Always check user capabilities before operations
- `current_user_can()` - Check if user has capability
- Use appropriate capabilities (e.g., 'edit_posts', 'manage_options')
- Never check for roles directly, always use capabilities

#### SQL Security

- Use `$wpdb->prepare()` for all queries with variables
- Never concatenate user input into SQL
- Use WordPress query functions when possible
- Validate and sanitize all database inputs

### Input Validation

- Never trust user input
- Validate all input on the server side
- Use allowlists over blocklists when possible
- Validate data type, length, format, and range

### Output Escaping

- Escape all output based on context
- Escape late (right before output)
- Use context-appropriate escaping functions

### Authentication & Authorization

- Check user permissions before any sensitive operation
- Use secure session management
- Implement proper access controls
- Never store passwords in plain text

### Data Protection

- Use HTTPS for all communications
- Encrypt sensitive data at rest
- Follow the principle of least privilege
- Never commit secrets or API keys to version control
- Use environment variables for sensitive configuration

### Dependencies

- Keep all dependencies up to date
- Regularly audit dependencies for vulnerabilities
- Only use trusted packages from reputable sources
- Review dependency licenses for compatibility

## Important Notes

### Development Workflow

- This project uses Husky for pre-commit hooks with lint-staged
- All code must pass linting before commit: `npm run lint:all`
- The `build/` folder is gitignored but required for plugin to function in WordPress
- Use `npm run plugin-zip` to create distribution-ready plugin package

### Block Structure Specifics

- Accordion items require both a heading block (wp-block-heading) and content group (wp-block-group)
- Frontend JavaScript handles backward compatibility with different class naming conventions
- Schema generation only activates when `enableSchema` attribute is explicitly true
- Animation behavior controlled by `has-animation` CSS class and data attributes

### Accessibility Requirements

- All interactive elements must have proper ARIA attributes
- Keyboard navigation support (Enter/Space keys) is mandatory
- Focus management ensures proper tab order
- Content areas use `hidden` attribute (not just CSS) for screen reader compatibility

## Block Bindings API Integration

The accordion blocks are fully compatible with WordPress's Block Bindings API, making them ideal for dynamic content scenarios like FAQ post types in Query Loops.

### FAQ Post Type Pattern

> ⚠️ **IMPORTANT**: Query Loop must be set to "Custom" query type on regular pages. Using "Default/Inherit" will result in empty content. See [Query Loop Compatibility](#query-loop-compatibility-important) section below.

The accordion blocks support two approaches for displaying dynamic post titles in Query Loops:

#### Option A: Using core/post-title Block (Recommended)

1. **Set up Query Loop**: Add a Query Loop block configured to display your post type
2. **Add Accordion Container**: Insert the accordion block inside the Query Loop template
3. **Configure Accordion Items**: For each accordion item:
   - **Replace the heading**: Remove the default `core/heading` and add a `core/post-title` block
   - **Add post content**: Replace the paragraph with a `core/post-content` block
   - **Optional**: Enable template locking to preserve structure

#### Option B: Using core/heading with Custom Bindings

1. **Set up Query Loop**: Add a Query Loop block configured to display your post type
2. **Add Accordion Container**: Insert the accordion block inside the Query Loop template
3. **Configure Accordion Items**: For each accordion item:
   - **Bind the heading**: Select the `core/heading` block and bind it to post title using a custom binding source
   - **Add post content**: Replace the paragraph with a `core/post-content` block
   - **Optional**: Enable template locking to preserve structure

### Template Locking for Structure Preservation

The accordion-item block includes a `templateLock` attribute with three options:

- **None** (default): Full editing flexibility - users can add, remove, and reorder blocks
- **Insert**: Preserves the heading + group structure while allowing content editing within the group
- **All**: Complete lock - no structural changes allowed

**Recommended for Block Bindings**: Use "Insert" template locking to:

- Maintain the required heading and content group structure
- Allow theme authors to add content blocks within the group
- Prevent accidental removal of bound blocks

### Example Implementation

#### Option A: Using core/post-title (Simpler)

```php
// In your theme's functions.php or block pattern
register_block_pattern(
    'my-theme/faq-accordion-simple',
    array(
        'title'       => 'FAQ Accordion (Post Title)',
        'description' => 'Display FAQ posts with automatic title binding',
        'content'     => '
            <!-- wp:query {"queryId":1,"query":{"perPage":10,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false}} -->
            <div class="wp-block-query">
                <!-- wp:post-template -->
                    <!-- wp:pikari-gutenberg-accordion/accordion -->
                        <!-- wp:pikari-gutenberg-accordion/accordion-item {"templateLock":"insert"} -->
                            <!-- wp:post-title {"level":3} /-->
                            <!-- wp:group {"className":"pikari-gutenberg-accordion-content"} -->
                            <div class="wp-block-group pikari-gutenberg-accordion-content">
                                <!-- wp:post-content /-->
                            </div>
                            <!-- /wp:group -->
                        <!-- /wp:pikari-gutenberg-accordion/accordion-item -->
                    <!-- /wp:pikari-gutenberg-accordion/accordion -->
                <!-- /wp:post-template -->
            </div>
            <!-- /wp:query -->
        ',
    )
);
```

#### Option B: Using core/heading with Custom Bindings

```php
// Requires custom binding source for post titles
register_block_pattern(
    'my-theme/faq-accordion-bindings',
    array(
        'title'       => 'FAQ Accordion (Custom Bindings)',
        'description' => 'Display FAQ posts with custom title binding',
        'content'     => '
            <!-- wp:query {"queryId":1,"query":{"perPage":10,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date","author":"","search":"","exclude":[],"sticky":"","inherit":false}} -->
            <div class="wp-block-query">
                <!-- wp:post-template -->
                    <!-- wp:pikari-gutenberg-accordion/accordion -->
                        <!-- wp:pikari-gutenberg-accordion/accordion-item {"templateLock":"insert"} -->
                            <!-- wp:heading {"level":3,"metadata":{"bindings":{"content":{"source":"my-theme/post-title"}}}} /-->
                            <!-- wp:group {"className":"pikari-gutenberg-accordion-content"} -->
                            <div class="wp-block-group pikari-gutenberg-accordion-content">
                                <!-- wp:post-content /-->
                            </div>
                            <!-- /wp:group -->
                        <!-- /wp:pikari-gutenberg-accordion/accordion-item -->
                    <!-- /wp:pikari-gutenberg-accordion/accordion -->
                <!-- /wp:post-template -->
            </div>
            <!-- /wp:query -->
        ',
    )
);
```

### Benefits

- **Dynamic Content**: Accordion headings and content automatically populate from post data
- **SEO Friendly**: Schema.org FAQ markup still generates from bound content
- **Accessibility Maintained**: All ARIA attributes work correctly with dynamic content
- **Theme Flexibility**: Authors can customize the content within each accordion item

### Query Loop Compatibility (Important)

**CRITICAL**: When using accordions inside Query Loop blocks, you MUST use "Custom" query type on regular pages.

#### The Issue

- **Default/Inherit Query**: Only works on archive, category, or search pages where a global query exists
- **On Regular Pages**: No global query to inherit → empty content → accordion appears broken
- **WordPress Core Bug**: This is a known WordPress limitation, not an accordion issue

#### Solution

Always use "Custom" query settings:

```html
<!-- wp:query {"queryId":1,"query":{"perPage":3,"postType":"post"}} -->
```

#### Why This Happens

1. **Default Mode**: Query Loop tries to inherit from global query context
2. **Regular Pages**: No global query exists (unlike archive pages)
3. **Result**: `core/post-content` has no post context → displays nothing
4. **Custom Mode**: Creates explicit WP_Query with proper post context

**References**: WordPress GitHub issues #40743, #67252 document this core limitation.

### Technical Notes

- **Dual Heading Support**: Frontend JavaScript recognizes both `core/heading` and `core/post-title` blocks as triggers
- **Schema Compatibility**: Schema extraction works with both heading types, capturing bound data correctly
- **Context Flow**: Block context (icons, animations) flows properly to all accordion items regardless of heading type
- **Template Locking**: Editor-only feature that doesn't affect frontend functionality
- **Backward Compatibility**: Existing accordions with regular headings continue working unchanged

### WordPress Compatibility

- Compatible with WordPress 6.0+ and Gutenberg block editor
- Requires PHP 8.2+ (specified in composer.json)
- Uses modern block.json registration with apiVersion 3
- Follows WordPress coding standards with space-based indentation

## Release Process

This project uses **Release Drafter** for automated release management. No manual scripts are required.

### Modern Release Workflow

**For Development:**

1. Create feature branches with descriptive names (`feature/description`, `fix/description`)
2. Add appropriate labels to PRs (`feature`, `bug`, `breaking`, etc.)
3. Merge PRs to `main` → Release Drafter automatically updates draft release
4. Continue development → Draft accumulates all changes

**For Releases:**

1. Review the draft release at GitHub → Releases
2. Edit version number if needed (auto-calculated from PR labels)
3. Edit release notes if needed (auto-generated from PR titles)
4. Click "Publish release" → GitHub Actions automatically builds and attaches ZIP

### Version Bumping Rules

Release Drafter automatically calculates version numbers based on PR labels:

- **Major** (1.0.0 → 2.0.0): `breaking`, `breaking-change`
- **Minor** (1.0.0 → 1.1.0): `feature`, `enhancement`
- **Patch** (1.0.0 → 1.0.1): `bug`, `fix`, `docs`, `dependencies`, `chore`

### Release Documentation

For complete release management information, see:

- **[Release Management Guide](docs/releases.md)** - Comprehensive release documentation
- **[Development Workflow](docs/development-workflow.md)** - Contributing and development process

### Benefits of New System

- ✅ **No manual version management** - Automatically calculated
- ✅ **No complex scripts** - Simple GitHub UI
- ✅ **No build branch complexity** - Clean, linear workflow
- ✅ **Automatic changelog** - Generated from PR titles
- ✅ **Always ready** - Draft release stays current
- ✅ **Asset automation** - ZIP builds on release publish

## WordPress-Specific Guidelines

### Block Editor (Gutenberg)

- Use `@wordpress/*` packages for block editor functionality
- Register blocks properly with `register_block_type()`
- Provide block.json for block metadata
- Support WordPress core blocks where applicable

### Internationalization

- All user-facing strings must be translatable
- Use proper text domains: `__()`, `_e()`, `_n()`, `_x()`, etc.
- Text domain must match plugin/theme slug
- Generate .pot files for translators

### Performance

- Minimize database queries
- Use object caching when available
- Lazy load assets and functionality
- Follow WordPress performance best practices

### Backwards Compatibility

- Maintain compatibility with supported WordPress versions
- Check for function existence when using newer functions
- Provide graceful degradation

## Quick Reference

### Common WordPress Functions

```php
// Escaping
esc_html( $text )
esc_attr( $text )
esc_url( $url )
wp_kses_post( $content )

// Sanitization
sanitize_text_field( $input )
sanitize_email( $email )
absint( $number )

// Capabilities
current_user_can( 'edit_posts' )
current_user_can( 'manage_options' )

// Nonces
wp_nonce_field( 'action_name' )
wp_verify_nonce( $_POST['_wpnonce'], 'action_name' )
```

### WP-CLI Commands

```bash
# Useful during development
wp cache flush
wp rewrite flush
wp cron run --all
```
