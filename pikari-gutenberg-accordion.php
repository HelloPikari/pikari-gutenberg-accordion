<?php
/**
 * Plugin Name: Pikari Gutenberg Accordion
 * Plugin URI:  https://pikari.io
 * Description: A Wordpress Gutenberg Accordion/Toggle block
 * Version: 1.0.0
 * Author:      Pikari Inc.
 * Author URI:  https://pikari.io
 * License:     GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: pikari-gutenberg-accordion
 * Domain Path: /languages
 *
 * @package pikari-gutenberg-accordion
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Plugin version.
 */
define( 'PIKARI_GUTENBERG_ACCORDION_VERSION', '1.0.0' );

/**
 * Plugin directory path.
 */
define( 'PIKARI_GUTENBERG_ACCORDION_DIR', plugin_dir_path( __FILE__ ) );

/**
 * Plugin directory URL.
 */
define( 'PIKARI_GUTENBERG_ACCORDION_URL', plugin_dir_url( __FILE__ ) );

/**
 * Initialize the plugin.
 */
function pikari_gutenberg_accordion_init() {
    // Load plugin text domain.
    load_plugin_textdomain( 'pikari-gutenberg-accordion', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

    // Register blocks.
    pikari_gutenberg_accordion_register_blocks();
}
add_action( 'init', 'pikari_gutenberg_accordion_init' );

/**
 * Register Gutenberg blocks.
 */
function pikari_gutenberg_accordion_register_blocks() {
    // Register accordion container block.
    register_block_type( __DIR__ . '/build/blocks/accordion' );

    // Register accordion item block.
    register_block_type( __DIR__ . '/build/blocks/accordion-item' );
}

/**
 * Extract schema data from accordion content.
 *
 * @param string $content    The block content.
 * @param string $schema_type The type of schema to generate.
 * @return array The schema data array.
 */
function pikari_gutenberg_accordion_extract_schema_data( $content, $schema_type = 'FAQPage' ) {
    $schema_data = array();

    if ( 'FAQPage' === $schema_type ) {
        $schema_data = array(
            '@context' => 'https://schema.org',
            '@type'    => 'FAQPage',
            'mainEntity' => array(),
        );

        // Parse the content to extract questions and answers.
        $dom = new DOMDocument();
        @$dom->loadHTML( mb_convert_encoding( $content, 'HTML-ENTITIES', 'UTF-8' ) );
        $xpath = new DOMXPath( $dom );

        // Find all accordion items.
        $items = $xpath->query( "//*[contains(@class, 'wp-block-pikari-gutenberg-accordion-item')]" );

        foreach ( $items as $item ) {
            // Find heading (question) - support both regular headings and post-title blocks.
            $headings = $xpath->query( ".//*[contains(@class, 'pikari-gutenberg-accordion-heading') or contains(@class, 'wp-block-post-title') or self::h1 or self::h2 or self::h3 or self::h4 or self::h5 or self::h6]", $item );
            $question = '';
            if ( $headings->length > 0 ) {
                $question = trim( $headings->item(0)->textContent );
            }

            // Find content (answer).
            $contents = $xpath->query( ".//*[contains(@class, 'pikari-gutenberg-accordion-content') or contains(@class, 'wp-block-group')]", $item );
            $answer = '';
            if ( $contents->length > 0 ) {
                $answer = trim( $contents->item(0)->textContent );
            }

            if ( ! empty( $question ) && ! empty( $answer ) ) {
                $schema_data['mainEntity'][] = array(
                    '@type' => 'Question',
                    'name'  => $question,
                    'acceptedAnswer' => array(
                        '@type' => 'Answer',
                        'text'  => $answer,
                    ),
                );
            }
        }
    }

    return $schema_data;
}

/**
 * Filter to customize accordion icon HTML.
 *
 * @param string $html  The icon HTML.
 * @param string $style The icon style.
 * @return string Modified icon HTML.
 */
add_filter(
    'pikari_gutenberg_accordion_icon_html',
    function ( $html, $style ) {
        // Allow themes to customize the icon.
        return $html;
    },
    10,
    2
);

/**
 * Activation hook.
 */
function pikari_gutenberg_accordion_activate() {
    // Code to run on plugin activation.
    flush_rewrite_rules();
}
register_activation_hook( __FILE__, 'pikari_gutenberg_accordion_activate' );

/**
 * Deactivation hook.
 */
function pikari_gutenberg_accordion_deactivate() {
    // Code to run on plugin deactivation.
    flush_rewrite_rules();
}
register_deactivation_hook( __FILE__, 'pikari_gutenberg_accordion_deactivate' );
