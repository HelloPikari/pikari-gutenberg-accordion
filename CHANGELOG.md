# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **BREAKING**: Migrated from custom JavaScript to WordPress Interactivity API
- Accordion-item blocks now use server-side rendering for better integration
- Frontend interactions now handled through WordPress Interactivity API actions and state management
- Improved performance and reliability with native WordPress reactivity system

### Technical

- Added `view.js` with WordPress Interactivity API store implementation
- Updated `accordion-item/render.php` for server-side rendering
- Removed legacy custom JavaScript implementation
- Enhanced state management with proper context inheritance
- Manual DOM updates for visual state (class binding compatibility)

## [1.0.0] - 2025-01-XX

### Added

- Complete WordPress Gutenberg accordion/toggle block system
- Parent Accordion Container block with settings context
- Child Accordion Item blocks with heading and content areas
- Full accessibility support with ARIA attributes and keyboard navigation
- Smooth expand/collapse animations with CSS transitions
- Multiple icon styles (chevron, plus, arrow) with positioning options
- Multi-expand control and accordion-style single expansion
- Optional FAQ schema markup generation for SEO
- Block Bindings API support for dynamic content integration
- Query Loop compatibility for displaying post content
- Template locking system (None, Insert, All modes)
- Comprehensive WordPress core layout support
- Modern CI/CD pipeline with automated releases
- Composer distribution support

### Changed

- Migrated to release-drafter for automated changelog generation
- Updated to require PHP 8.3+ and WordPress 6.8+
- Streamlined development workflow with branch protection
- Enhanced build process with production-only distribution

### Technical

- Automated dependency updates via Dependabot
- GitHub Actions workflows for CI/CD
- Branch protection with required PR reviews
- Automated security auditing
- Label-based release categorization

[Unreleased]: https://github.com/HelloPikari/pikari-gutenberg-accordion/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/HelloPikari/pikari-gutenberg-accordion/releases/tag/v1.0.0
