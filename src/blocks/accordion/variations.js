/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Block variations
 */
const variations = [
	{
		name: 'faq',
		title: __( 'FAQ', 'pikari-gutenberg-accordion' ),
		description: __( 'Frequently asked questions with optional schema markup', 'pikari-gutenberg-accordion' ),
		icon: 'editor-help',
		attributes: {
			className: 'is-style-faq',
			enableSchema: false,
		},
		innerBlocks: [
			[ 'pikari-gutenberg-accordion/accordion-item', {
				headingLevel: 3,
			} ],
		],
		scope: [ 'inserter', 'transform' ],
		isActive: ( blockAttributes ) => blockAttributes.className?.includes( 'is-style-faq' ),
	},
];

export default variations;
