<?php
/**
 * Accordion block render callback
 *
 * @package pikari-gutenberg-accordion
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Renders the accordion block on the front end.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 *
 * @return string The rendered block HTML.
 */
$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'data-allow-multiple'  => $attributes['allowMultipleExpanded'] ? 'true' : 'false',
        'data-icon-style'      => $attributes['iconStyle'],
        'data-icon-position'   => $attributes['iconPosition'],
        'data-animations'      => $attributes['enableAnimations'] ? 'true' : 'false',
    )
);

$schema_output = '';

// Only add schema if explicitly enabled.
if ( ! empty( $attributes['enableSchema'] ) && true === $attributes['enableSchema'] ) {
    $schema_data = pikari_gutenberg_accordion_extract_schema_data( $content, $attributes['schemaType'] );

    // Allow filtering of schema data.
    $schema_data = apply_filters( 'pikari_gutenberg_accordion_schema_data', $schema_data, $attributes );

    if ( ! empty( $schema_data ) ) {
        $schema_output = sprintf(
            '<script type="application/ld+json">%s</script>',
            wp_json_encode( $schema_data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES )
        );
    }
}

// Output the block.
// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
printf(
    '<div %s>%s%s</div>',
    $wrapper_attributes, // Already escaped by get_block_wrapper_attributes()
    $schema_output, // Contains JSON-LD script tag, intentionally unescaped
    $content // InnerBlocks content, already escaped by WordPress
);
// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped
