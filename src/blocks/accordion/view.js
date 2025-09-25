/**
 * Accordion Interactivity API implementation
 */

import { store, getContext, getElement } from '@wordpress/interactivity';

store( 'pikari/accordion', {
	actions: {
		/**
		 * Toggle an accordion item.
		 *
		 * @param {Event} event The click or keyboard event.
		 */
		toggle: ( event ) => {
			// Only respond to clicks/keydowns on heading elements
			if ( event ) {
				const target = event.target;
				const heading = target.closest( '.wp-block-heading, .wp-block-post-title, h1, h2, h3, h4, h5, h6' );

				// If this is a keydown event, only respond to Enter and Space
				if ( event.type === 'keydown' && event.key !== 'Enter' && event.key !== ' ' ) {
					return;
				}

				// Only proceed if the event was on a heading element
				if ( ! heading ) {
					return;
				}

				// Prevent default behavior for keyboard events
				if ( event.type === 'keydown' ) {
					event.preventDefault();
				}
			}

			const { ref } = getElement();
			const itemId = ref.id || ref.dataset.itemId;

			if ( ! itemId ) {
				return;
			}

			const context = getContext();

			const isExpanded = context.expandedItems[ itemId ] || false;

			// If not allowing multiple and we're expanding, close all others
			const newExpandedItems = { ...context.expandedItems };
			if ( ! context.allowMultipleExpanded && ! isExpanded ) {
				Object.keys( newExpandedItems ).forEach( ( key ) => {
					if ( key !== itemId ) {
						newExpandedItems[ key ] = false;
					}
				} );
			}

			// Toggle the current item
			newExpandedItems[ itemId ] = ! isExpanded;
			context.expandedItems = newExpandedItems;

			// Update visual state manually
			updateAccordionItemVisualState( ref, ! isExpanded );

			// Dispatch custom events for backward compatibility
			ref.dispatchEvent( new CustomEvent( 'pikari-gutenberg-accordion:toggle', {
				detail: { expanded: ! isExpanded },
				bubbles: true,
			} ) );

			const eventType = ! isExpanded ? 'pikari-gutenberg-accordion:open' : 'pikari-gutenberg-accordion:close';
			ref.dispatchEvent( new CustomEvent( eventType, {
				bubbles: true,
			} ) );
		},
	},
	callbacks: {
		/**
		 * Initialize accordion items when the DOM is ready.
		 */
		init: () => {
			const { ref } = getElement();
			const context = getContext();

			// Initialize accordion items
			const accordionItems = ref.querySelectorAll( '.wp-block-pikari-gutenberg-accordion-item' );

			accordionItems.forEach( ( item ) => {
				// Ensure each accordion item has the necessary attributes for backward compatibility
				if ( ! item.dataset.iconStyle ) {
					item.dataset.iconStyle = context.iconStyle;
				}
				if ( ! item.dataset.iconPosition ) {
					item.dataset.iconPosition = context.iconPosition;
				}

				// Look for heading elements - support multiple types for Block Bindings API
				const heading = item.querySelector( '.wp-block-heading, .wp-block-post-title, h1, h2, h3, h4, h5, h6' );
				const content = item.querySelector( '.wp-block-group' );

				if ( heading && content ) {
					// Setup unique IDs for ARIA attributes
					const headingId = heading.id || `accordion-heading-${ generateId() }`;
					const contentId = content.id || `accordion-content-${ generateId() }`;
					const itemId = item.id || `accordion-item-${ generateId() }`;

					heading.id = headingId;
					content.id = contentId;
					item.id = itemId;

					// Store item ID for easier access
					item.dataset.itemId = itemId;

					// Make heading interactive
					heading.setAttribute( 'role', 'button' );
					heading.setAttribute( 'tabindex', '0' );
					heading.setAttribute( 'aria-controls', contentId );
					heading.style.cursor = 'pointer';

					content.setAttribute( 'aria-labelledby', headingId );
					content.setAttribute( 'role', 'region' );

					// Initialize expanded state based on data attribute
					const isInitiallyExpanded = item.dataset.initiallyExpanded === 'true';
					context.expandedItems[ itemId ] = isInitiallyExpanded;

					// Add CSS class for animations
					if ( context.enableAnimations ) {
						item.classList.add( 'has-animation' );
					}

					// Set initial ARIA state and visual state
					heading.setAttribute( 'aria-expanded', isInitiallyExpanded ? 'true' : 'false' );

					// Set initial visual state
					updateAccordionItemVisualState( item, isInitiallyExpanded );
				}
			} );
		},

		/**
		 * Initialize an individual accordion item.
		 */
		initAccordionItem: () => {
			const { ref } = getElement();
			const context = getContext();

			// Ensure each accordion item has the necessary attributes for backward compatibility
			if ( ! ref.dataset.iconStyle ) {
				ref.dataset.iconStyle = context.iconStyle;
			}
			if ( ! ref.dataset.iconPosition ) {
				ref.dataset.iconPosition = context.iconPosition;
			}

			// Look for heading elements - support multiple types for Block Bindings API
			const heading = ref.querySelector( '.wp-block-heading, .wp-block-post-title, h1, h2, h3, h4, h5, h6' );
			const content = ref.querySelector( '.wp-block-group' );

			if ( heading && content ) {
				// Setup unique IDs for ARIA attributes
				const headingId = heading.id || `accordion-heading-${ generateId() }`;
				const contentId = content.id || `accordion-content-${ generateId() }`;
				const itemId = ref.id || `accordion-item-${ generateId() }`;

				heading.id = headingId;
				content.id = contentId;
				ref.id = itemId;

				// Store item ID for easier access
				ref.dataset.itemId = itemId;

				// Make heading interactive
				heading.setAttribute( 'role', 'button' );
				heading.setAttribute( 'tabindex', '0' );
				heading.setAttribute( 'aria-controls', contentId );
				heading.style.cursor = 'pointer';

				content.setAttribute( 'aria-labelledby', headingId );
				content.setAttribute( 'role', 'region' );

				// Initialize expanded state based on data attribute
				const isInitiallyExpanded = ref.dataset.initiallyExpanded === 'true';
				context.expandedItems[ itemId ] = isInitiallyExpanded;

				// Add CSS class for animations
				if ( context.enableAnimations ) {
					ref.classList.add( 'has-animation' );
				}

				// Set initial ARIA state
				heading.setAttribute( 'aria-expanded', isInitiallyExpanded ? 'true' : 'false' );

				// Set initial visual state
				updateAccordionItemVisualState( ref, isInitiallyExpanded );
			}
		},
	},
} );

/**
 * Update the visual state of an accordion item.
 *
 * @param {HTMLElement} accordionItem The accordion item element.
 * @param {boolean}     isExpanded    Whether the item should be expanded.
 */
function updateAccordionItemVisualState( accordionItem, isExpanded ) {
	// Update the accordion item class
	if ( isExpanded ) {
		accordionItem.classList.add( 'is-expanded' );
	} else {
		accordionItem.classList.remove( 'is-expanded' );
	}

	// Find and update the content element
	const content = accordionItem.querySelector( '.wp-block-group' );
	if ( content ) {
		if ( isExpanded ) {
			content.removeAttribute( 'hidden' );
		} else {
			content.setAttribute( 'hidden', '' );
		}
	}

	// Update ARIA state on heading
	const heading = accordionItem.querySelector( '.wp-block-heading, .wp-block-post-title, h1, h2, h3, h4, h5, h6' );
	if ( heading ) {
		heading.setAttribute( 'aria-expanded', isExpanded ? 'true' : 'false' );
	}
}

/**
 * Generate a unique ID.
 *
 * @return {string} Unique ID.
 */
function generateId() {
	return Math.random().toString( 36 ).substring( 2, 11 );
}
