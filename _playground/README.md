# WordPress Playground Configuration

This directory contains the configuration files for testing the Pikari Accordion plugin in WordPress Playground.

## Files

- `blueprint-local.json` - Configuration for local development testing
- `blueprint.json` - Configuration for public demo (requires GitHub repository)
- `demo-content.xml` - WordPress export file with demo accordion examples

## Local Development

To test the plugin locally:

```bash
npm run playground
```

This will:

1. Start WordPress Playground with PHP 8.3
2. Install WordPress with TwentyTwentyFour theme
3. Activate the Pikari Accordion plugin
4. Open the page editor where you can create test content

## Creating Demo Content

The local playground opens directly to the page editor. To test the accordion:

1. Add the **Accordion** block from the block inserter
2. Each accordion comes with one item by default
3. Click **Add Accordion Item** to add more items
4. Configure settings in the block inspector:
   - Icon style (chevron, plus/minus, arrow)
   - Allow multiple expanded
   - Enable animations
   - Enable Schema.org (for FAQ variation)

### Example Patterns

#### Basic Accordion

```
- Question: What is this?
  Answer: This is a demo accordion
- Question: How does it work?
  Answer: Click to expand/collapse
```

#### FAQ with Schema

1. Select the FAQ variation when adding the block
2. Enable Schema.org in block settings
3. Add Q&A pairs

## Public Demo

Once the repository is on GitHub, the public demo will work with:

```bash
npm run playground:demo
```

This uses `blueprint.json` which:

1. Downloads the plugin from the GitHub repository
2. Imports the demo-content.xml file
3. Sets up a complete demo page automatically

## Demo Content Structure

The `demo-content.xml` file includes:

- Basic accordion examples
- FAQ section with Schema.org
- Different icon styles
- Keyboard navigation test
- Styled accordion with colors
- Multiple configuration examples

## PHP Version

The playground is configured to use PHP 8.3 as specified in:

- Blueprint files: `"php": "8.3"`
- NPM scripts: `--php=8.3`

## Troubleshooting

If the playground doesn't start:

1. Ensure the plugin is built: `npm run build`
2. Check that port 8881 is available
3. Try clearing the WordPress Playground cache

## Testing Accessibility

Once in the playground:

1. Use Tab key to navigate between accordion items
2. Press Enter or Space to expand/collapse
3. Test with screen reader if available
4. Check focus indicators are visible
5. Verify ARIA attributes in browser DevTools
