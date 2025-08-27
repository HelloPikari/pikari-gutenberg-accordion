# Composer Installation Guide

This guide explains how to install the Pikari Gutenberg Accordion plugin using Composer directly from GitHub.

## Quick Start

```bash
# Add the GitHub repository
composer config repositories.pikari-accordion vcs https://github.com/HelloPikari/pikari-gutenberg-accordion

# Install latest stable version
composer require pikari-inc/pikari-gutenberg-accordion:^1.0
```

The plugin will be installed to `wp-content/plugins/pikari-gutenberg-accordion/` and automatically activated when you activate it in WordPress.

## Installation Methods

### Method 1: Command Line (Recommended)

```bash
# Navigate to your WordPress root directory
cd /path/to/your/wordpress

# Add repository configuration
composer config repositories.pikari-accordion vcs https://github.com/HelloPikari/pikari-gutenberg-accordion

# Install the plugin
composer require pikari-inc/pikari-gutenberg-accordion:^1.0
```

### Method 2: composer.json Configuration

Add to your `composer.json` file:

```json
{
	"repositories": [
		{
			"type": "vcs",
			"url": "https://github.com/HelloPikari/pikari-gutenberg-accordion"
		}
	],
	"require": {
		"pikari-inc/pikari-gutenberg-accordion": "^1.0"
	},
	"config": {
		"preferred-install": {
			"pikari-inc/pikari-gutenberg-accordion": "dist"
		}
	}
}
```

Then run:

```bash
composer install
```

### Method 3: Global Composer Configuration

Add the repository globally (useful for multiple projects):

```bash
composer config --global repositories.pikari-accordion vcs https://github.com/HelloPikari/pikari-gutenberg-accordion
```

Then in any project:

```bash
composer require pikari-inc/pikari-gutenberg-accordion:^1.0
```

## Version Constraints

| Constraint | Behavior                         | Example                         |
| ---------- | -------------------------------- | ------------------------------- |
| `^1.0`     | Compatible updates (recommended) | 1.0.0, 1.1.0, 1.9.0 (not 2.0.0) |
| `~1.2.0`   | Patch updates only               | 1.2.0, 1.2.1, 1.2.9 (not 1.3.0) |
| `1.0.0`    | Exact version                    | Only 1.0.0                      |
| `>=1.0.0`  | Minimum version                  | 1.0.0 and any newer             |
| `dev-dist` | Latest from dist branch          | Latest development build        |

### Recommended Constraints

```bash
# For production (stable updates)
composer require pikari-inc/pikari-gutenberg-accordion:^1.0

# For development (latest features)
composer require pikari-inc/pikari-gutenberg-accordion:dev-dist

# For specific version
composer require pikari-inc/pikari-gutenberg-accordion:1.0.0
```

## What Gets Installed

When you install via Composer, you receive the **distribution version** from the `dist` branch, which includes:

### ✅ Included Files

- **PHP files**: Main plugin file and all WordPress code
- **Built assets**: `/build/` directory with compiled JavaScript and CSS
- **Translations**: `/languages/` directory (if available)
- **Documentation**: `readme.txt` (WordPress.org format)
- **License**: `LICENSE` file
- **Composer config**: `composer.json` for dependency management

### ❌ Excluded Files (Development Only)

- Source files (`/src/` directory)
- Documentation (`/docs/`, `README.md`, `CLAUDE.md`)
- Development configs (`.eslintrc.js`, `phpcs.xml`, etc.)
- Build tools (`package.json`, `webpack.config.js`)
- Tests (`/tests/` directory)
- GitHub configurations (`.github/` directory)

## Installation Directory

The plugin will be installed to:

```
wp-content/plugins/pikari-gutenberg-accordion/
├── pikari-gutenberg-accordion.php    # Main plugin file
├── build/                           # Compiled assets
│   ├── blocks/
│   │   ├── accordion/
│   │   └── accordion-item/
├── languages/                       # Translations (if available)
├── readme.txt                       # WordPress readme
├── LICENSE                          # License file
├── composer.json                    # Composer configuration
└── VERSION                          # Version reference
```

## WordPress Integration

### Plugin Activation

After installation, activate the plugin in WordPress:

1. **Via WordPress Admin**: Go to Plugins → Installed Plugins → Activate "Pikari Gutenberg Accordion"
2. **Via WP-CLI**: `wp plugin activate pikari-gutenberg-accordion`

### Block Usage

Once activated, you can use the accordion blocks:

1. In the block editor, click the "+" button
2. Search for "Accordion"
3. Select "Pikari Gutenberg Accordion"
4. Configure your accordion items

## Advanced Configuration

### Custom Installation Path

To install to a different directory (not recommended):

```json
{
	"extra": {
		"installer-paths": {
			"wp-content/plugins/custom-accordion/": [
				"pikari-inc/pikari-gutenberg-accordion"
			]
		}
	}
}
```

### Development Installation

To install the source version (requires building):

```bash
# Install from main branch
composer require pikari-inc/pikari-gutenberg-accordion:dev-main

# Navigate to plugin directory
cd wp-content/plugins/pikari-gutenberg-accordion

# Install and build (requires Node.js)
npm install
npm run build
```

**Note**: Development installation is not recommended for production sites.

## Updating

### Update to Latest Compatible Version

```bash
composer update pikari-inc/pikari-gutenberg-accordion
```

### Update to Specific Version

```bash
composer require pikari-inc/pikari-gutenberg-accordion:1.2.0
```

### Check Available Versions

```bash
composer show pikari-inc/pikari-gutenberg-accordion --all
```

## Troubleshooting

### Common Issues

#### 1. Plugin Directory Mismatch

**Error**: Plugin appears as broken in WordPress
**Solution**: Ensure the directory name matches:

```
wp-content/plugins/pikari-gutenberg-accordion/pikari-gutenberg-accordion.php
```

#### 2. Missing Build Files

**Error**: Frontend doesn't work, styles/scripts missing
**Solution**: Ensure you're installing from the `dist` branch:

```json
{
	"config": {
		"preferred-install": {
			"pikari-inc/pikari-gutenberg-accordion": "dist"
		}
	}
}
```

#### 3. Version Constraint Issues

**Error**: "Could not find a version matching..."
**Solution**: Check available versions:

```bash
composer show pikari-inc/pikari-gutenberg-accordion --all
```

#### 4. Repository Not Found

**Error**: "Could not find package..."
**Solution**: Ensure repository is configured:

```bash
composer config repositories.pikari-accordion vcs https://github.com/HelloPikari/pikari-gutenberg-accordion
```

### Debugging Commands

```bash
# Show repository configuration
composer config repositories

# Show installed packages
composer show

# Clear Composer cache
composer clear-cache

# Validate composer.json
composer validate

# Show detailed package information
composer show pikari-inc/pikari-gutenberg-accordion
```

### Getting Help

If you encounter issues:

1. **Check the version**: Ensure you're using a released version
2. **Clear cache**: Run `composer clear-cache`
3. **Check logs**: Look in `wp-content/debug.log` for PHP errors
4. **GitHub Issues**: Report bugs at https://github.com/HelloPikari/pikari-gutenberg-accordion/issues

## Security Considerations

### Repository Verification

When adding repositories, always verify the source:

- ✅ Official repository: `https://github.com/HelloPikari/pikari-gutenberg-accordion`
- ❌ Avoid unofficial forks or mirrors

### Version Pinning for Production

For production sites, consider pinning to specific versions:

```json
{
	"require": {
		"pikari-inc/pikari-gutenberg-accordion": "1.0.0"
	}
}
```

This prevents unexpected updates that could break your site.

## Best Practices

1. **Use version constraints**: `^1.0` for automatic compatible updates
2. **Test updates**: Always test plugin updates in a staging environment
3. **Backup first**: Backup your site before updating plugins
4. **Monitor releases**: Subscribe to GitHub releases for update notifications
5. **Use dist branch**: Always install from distribution branch for production

## Integration with WordPress Management

### With Composer-Based WordPress

If you manage WordPress entirely with Composer:

```json
{
	"name": "my-site/wordpress",
	"repositories": [
		{
			"type": "composer",
			"url": "https://wpackagist.org"
		},
		{
			"type": "vcs",
			"url": "https://github.com/HelloPikari/pikari-gutenberg-accordion"
		}
	],
	"require": {
		"johnpbloch/wordpress": "^6.8",
		"wpackagist-theme/twentytwentyfour": "^1.0",
		"pikari-inc/pikari-gutenberg-accordion": "^1.0"
	},
	"extra": {
		"wordpress-install-dir": "wp",
		"installer-paths": {
			"wp-content/plugins/{$name}/": ["type:wordpress-plugin"],
			"wp-content/themes/{$name}/": ["type:wordpress-theme"]
		}
	}
}
```

This creates a fully Composer-managed WordPress installation with the accordion plugin.
