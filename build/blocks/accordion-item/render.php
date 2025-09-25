<?php
/**
 * Accordion item block render callback
 *
 * @package pikari-gutenberg-accordion
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Renders the accordion item block on the front end.
 *
 * @param array    $attributes The block attributes.
 * @param string   $content    The block content.
 * @param WP_Block $block      The block instance.
 *
 * @return string The rendered block HTML.
 */
$context = $block->context;
$is_initially_expanded = $attributes['isInitiallyExpanded'] ?? false;

// Get icon settings from parent accordion block context
$icon_style = $context['pikari-gutenberg-accordion/iconStyle'] ?? 'chevron';
$icon_position = $context['pikari-gutenberg-accordion/iconPosition'] ?? 'right';

$wrapper_attributes = get_block_wrapper_attributes(
    array(
        'class' => 'wp-block-pikari-gutenberg-accordion-item',
        'data-icon-style'           => $icon_style,
        'data-icon-position'        => $icon_position,
        'data-wp-on--click'         => 'actions.toggle',
        'data-wp-on--keydown'       => 'actions.toggle',
        'data-wp-init'              => 'callbacks.initAccordionItem',
        'data-initially-expanded'   => $is_initially_expanded ? 'true' : 'false',
    )
);

// Output the block.
// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
printf(
    '<div %s>%s</div>',
    $wrapper_attributes, // Already escaped by get_block_wrapper_attributes()
    $content // InnerBlocks content, already escaped by WordPress
);
// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped