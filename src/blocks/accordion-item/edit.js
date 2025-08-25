/**
 * WordPress dependencies
 */
import {
	InnerBlocks,
	InspectorControls,
	BlockControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
// Simple SVG icons
const expandIcon = (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
		<path d="M15 8l-4.03 6L7 8h8z" />
	</svg>
);

const collapseIcon = (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
		<path d="M8 5l6 4.03L8 13V5z" />
	</svg>
);

/**
 * Editor component
 *
 * @param {Object}   root0               - Component props.
 * @param {Object}   root0.attributes    - Block attributes.
 * @param {Function} root0.setAttributes - Function to set block attributes.
 * @param {Object}   root0.context       - Block context.
 */
export default function Edit( { attributes, setAttributes, context } ) {
	const { isInitiallyExpanded, templateLock } = attributes;
	const [ isExpanded, setIsExpanded ] = useState( isInitiallyExpanded );

	const iconStyle = context[ 'pikari-gutenberg-accordion/iconStyle' ] || 'chevron';
	const iconPosition = context[ 'pikari-gutenberg-accordion/iconPosition' ] || 'right';

	useEffect( () => {
		setIsExpanded( isInitiallyExpanded );
	}, [ isInitiallyExpanded ] );

	const blockProps = useBlockProps( {
		className: `wp-block-pikari-gutenberg-accordion-item ${ isExpanded ? 'is-expanded' : '' }`,
		'data-expanded': isExpanded,
		'data-icon-style': iconStyle,
		'data-icon-position': iconPosition,
	} );

	const TEMPLATE = [
		[ 'core/heading', {
			level: 3,
			placeholder: __( 'Enter heading…', 'pikari-gutenberg-accordion' ),
			className: 'pikari-gutenberg-accordion-heading',
		} ],
		[ 'core/group', {
			className: 'pikari-gutenberg-accordion-content',
			layout: { type: 'constrained' },
		}, [
			[ 'core/paragraph' ],
		] ],
	];

	const handleToggle = ( event ) => {
		// Only toggle if the click/key press is not inside an editable element
		if ( event.target.closest( '[contenteditable="true"], input, textarea, [role="textbox"]' ) ) {
			return;
		}
		setIsExpanded( ! isExpanded );
	};

	const handleKeyDown = ( event ) => {
		// Only handle keyboard events if not inside an editable element
		if ( event.target.closest( '[contenteditable="true"], input, textarea, [role="textbox"]' ) ) {
			return;
		}
		if ( event.key === 'Enter' || event.key === ' ' ) {
			event.preventDefault();
			handleToggle( event );
		}
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ isExpanded ? expandIcon : collapseIcon }
						label={ isExpanded ? __( 'Collapse', 'pikari-gutenberg-accordion' ) : __( 'Expand', 'pikari-gutenberg-accordion' ) }
						onClick={ () => handleToggle( { target: document.createElement( 'div' ) } ) }
						isPressed={ isExpanded }
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Item Settings', 'pikari-gutenberg-accordion' ) }>
					<ToggleControl
						label={ __( 'Initially Expanded', 'pikari-gutenberg-accordion' ) }
						help={ __( 'Whether this item should be expanded by default when the page loads.', 'pikari-gutenberg-accordion' ) }
						checked={ isInitiallyExpanded }
						onChange={ ( value ) => setAttributes( { isInitiallyExpanded: value } ) }
					/>
					<SelectControl
						label={ __( 'Template Lock', 'pikari-gutenberg-accordion' ) }
						help={ __( 'Control how the accordion structure can be modified. "Insert" prevents adding/removing blocks while allowing content editing.', 'pikari-gutenberg-accordion' ) }
						value={ templateLock }
						options={ [
							{ label: __( 'None', 'pikari-gutenberg-accordion' ), value: 'false' },
							{ label: __( 'Insert', 'pikari-gutenberg-accordion' ), value: 'insert' },
							{ label: __( 'All', 'pikari-gutenberg-accordion' ), value: 'all' },
						] }
						onChange={ ( value ) => setAttributes( { templateLock: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div
				{ ...blockProps }
				onClick={ handleToggle }
				onKeyDown={ handleKeyDown }
				role="button"
				tabIndex={ 0 }
				aria-expanded={ isExpanded }
			>
				<InnerBlocks
					template={ TEMPLATE }
					templateLock={ templateLock === 'false' ? false : templateLock }
				/>
			</div>
		</>
	);
}
