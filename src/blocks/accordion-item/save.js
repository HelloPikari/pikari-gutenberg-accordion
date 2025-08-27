/**
 * WordPress dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

/**
 * Save component
 *
 * @param {Object} root0            - Component props.
 * @param {Object} root0.attributes - Block attributes.
 * @param {Object} root0.context    - Block context from parent.
 */
export default function save( { attributes, context = {} } ) {
    const { isInitiallyExpanded } = attributes;
    
    // Get icon settings from parent accordion block context
    const iconStyle = context['pikari-gutenberg-accordion/iconStyle'] || 'chevron';
    const iconPosition = context['pikari-gutenberg-accordion/iconPosition'] || 'right';

    const blockProps = useBlockProps.save( {
        className: 'wp-block-pikari-gutenberg-accordion-item',
        'data-expanded': isInitiallyExpanded,
        'data-icon-style': iconStyle,
        'data-icon-position': iconPosition,
    } );

    return (
        <div { ...blockProps }>
            <InnerBlocks.Content />
        </div>
    );
}