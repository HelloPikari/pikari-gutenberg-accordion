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
import { useSelect, useDispatch } from '@wordpress/data';
// Simple SVG icons
const expandAllIcon = (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
		<path d="M15 8l-4.03 6L7 8h8z" />
	</svg>
);

const collapseAllIcon = (
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
 * @param {string}   root0.clientId      - The block's client ID.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		enableAnimations,
		enableSchema,
		schemaType,
		iconStyle,
		iconPosition,
		allowMultipleExpanded,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'wp-block-pikari-gutenberg-accordion',
		'data-allow-multiple': allowMultipleExpanded,
		'data-icon-style': iconStyle,
		'data-icon-position': iconPosition,
		'data-animations': enableAnimations,
	} );

	const ALLOWED_BLOCKS = [ 'pikari-gutenberg-accordion/accordion-item' ];
	const TEMPLATE = [
		[ 'pikari-gutenberg-accordion/accordion-item' ],
	];

	// Get child accordion items
	const { innerBlocks } = useSelect(
		( select ) => {
			const { getBlocks } = select( 'core/block-editor' );
			return {
				innerBlocks: getBlocks( clientId ),
			};
		},
		[ clientId ]
	);

	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	// Functions to expand/collapse all accordion items
	const expandAllItems = () => {
		innerBlocks.forEach( ( block ) => {
			if ( block.name === 'pikari-gutenberg-accordion/accordion-item' ) {
				updateBlockAttributes( block.clientId, { isInitiallyExpanded: true } );
			}
		} );
	};

	const collapseAllItems = () => {
		innerBlocks.forEach( ( block ) => {
			if ( block.name === 'pikari-gutenberg-accordion/accordion-item' ) {
				updateBlockAttributes( block.clientId, { isInitiallyExpanded: false } );
			}
		} );
	};

	// Check if any items are expanded
	const hasExpandedItems = innerBlocks.some(
		( block ) => block.name === 'pikari-gutenberg-accordion/accordion-item' &&
		block.attributes.isInitiallyExpanded
	);

	// Check if any items are collapsed
	const hasCollapsedItems = innerBlocks.some(
		( block ) => block.name === 'pikari-gutenberg-accordion/accordion-item' &&
		! block.attributes.isInitiallyExpanded
	);

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon={ expandAllIcon }
						label={ __( 'Expand All', 'pikari-gutenberg-accordion' ) }
						onClick={ expandAllItems }
						disabled={ ! hasCollapsedItems }
					/>
					<ToolbarButton
						icon={ collapseAllIcon }
						label={ __( 'Collapse All', 'pikari-gutenberg-accordion' ) }
						onClick={ collapseAllItems }
						disabled={ ! hasExpandedItems }
					/>
				</ToolbarGroup>
			</BlockControls>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Settings', 'pikari-gutenberg-accordion' ) }>
					<ToggleControl
						label={ __( 'Allow Multiple Expanded', 'pikari-gutenberg-accordion' ) }
						help={ __( 'Allow multiple accordion items to be expanded at the same time.', 'pikari-gutenberg-accordion' ) }
						checked={ allowMultipleExpanded }
						onChange={ ( value ) => setAttributes( { allowMultipleExpanded: value } ) }
					/>
					<ToggleControl
						label={ __( 'Enable Animations', 'pikari-gutenberg-accordion' ) }
						help={ __( 'Enable smooth expand/collapse animations.', 'pikari-gutenberg-accordion' ) }
						checked={ enableAnimations }
						onChange={ ( value ) => setAttributes( { enableAnimations: value } ) }
					/>
					<SelectControl
						label={ __( 'Icon Style', 'pikari-gutenberg-accordion' ) }
						value={ iconStyle }
						options={ [
							{ label: __( 'Chevron', 'pikari-gutenberg-accordion' ), value: 'chevron' },
							{ label: __( 'Plus/Minus', 'pikari-gutenberg-accordion' ), value: 'plus-minus' },
							{ label: __( 'Arrow', 'pikari-gutenberg-accordion' ), value: 'arrow' },
							{ label: __( 'None', 'pikari-gutenberg-accordion' ), value: 'none' },
						] }
						onChange={ ( value ) => setAttributes( { iconStyle: value } ) }
					/>
					{ iconStyle !== 'none' && (
						<SelectControl
							label={ __( 'Icon Position', 'pikari-gutenberg-accordion' ) }
							value={ iconPosition }
							options={ [
								{ label: __( 'Right', 'pikari-gutenberg-accordion' ), value: 'right' },
								{ label: __( 'Left', 'pikari-gutenberg-accordion' ), value: 'left' },
							] }
							onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
						/>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Schema Settings', 'pikari-gutenberg-accordion' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Enable Schema.org Markup', 'pikari-gutenberg-accordion' ) }
						help={ __( 'Add structured data for search engines. Only use for actual FAQ content.', 'pikari-gutenberg-accordion' ) }
						checked={ enableSchema }
						onChange={ ( value ) => setAttributes( { enableSchema: value } ) }
					/>
					{ enableSchema && (
						<SelectControl
							label={ __( 'Schema Type', 'pikari-gutenberg-accordion' ) }
							value={ schemaType }
							options={ [
								{ label: __( 'FAQ Page', 'pikari-gutenberg-accordion' ), value: 'FAQPage' },
							] }
							onChange={ ( value ) => setAttributes( { schemaType: value } ) }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					defaultBlock={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					orientation="vertical"
				/>
			</div>
		</>
	);
}
