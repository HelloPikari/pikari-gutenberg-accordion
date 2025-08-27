/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Block variations for accordion components
 */
const variations = [
	{
		name: 'accordion-heading',
		title: __( 'Accordion Component: Heading', 'pikari-gutenberg-accordion' ),
		description: __( 'Heading for accordion items. Use only within Accordion blocks.', 'pikari-gutenberg-accordion' ),
		icon: 'arrow-down-alt2',
		attributes: {
			className: 'is-style-accordion-heading pikari-gutenberg-accordion-heading',
			level: 3,
			placeholder: __( 'Enter heading…', 'pikari-gutenberg-accordion' ),
			fontSize: 'large',
		},
		scope: [ 'inserter' ],
		isActive: ( blockAttributes ) => {
			return blockAttributes.className?.includes( 'pikari-gutenberg-accordion-heading' );
		},
	},
	{
		name: 'accordion-content',
		title: __( 'Accordion Component: Content', 'pikari-gutenberg-accordion' ),
		description: __( 'Content panel for accordion items. Use only within Accordion blocks.', 'pikari-gutenberg-accordion' ),
		icon: 'editor-expand',
		attributes: {
			className: 'is-style-accordion-content pikari-gutenberg-accordion-content',
			layout: { type: 'constrained' },
		},
		innerBlocks: [
			[ 'core/paragraph', {
				placeholder: __( 'Enter accordion content…', 'pikari-gutenberg-accordion' ),
			} ],
		],
		scope: [ 'inserter' ],
		isActive: ( blockAttributes ) => {
			return blockAttributes.className?.includes( 'pikari-gutenberg-accordion-content' );
		},
	},
];

/**
 * Register variations for core blocks
 */
const registerVariations = () => {
	// Register heading variation
	registerBlockVariation( 'core/heading', variations[ 0 ] );

	// Register group variation
	registerBlockVariation( 'core/group', variations[ 1 ] );
};

export default registerVariations;
