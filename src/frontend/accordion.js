/**
 * Frontend accordion functionality
 */

( function() {
	'use strict';

	/**
	 * Accordion class for managing accordion behavior
	 */
	class PikariGutenbergAccordion {
		/**
		 * Constructor
		 *
		 * @param {HTMLElement} element - The accordion container element
		 */
		constructor( element ) {
			this.accordion = element;
			this.items = element.querySelectorAll( '.wp-block-pikari-gutenberg-accordion-item' );
			this.allowMultiple = element.dataset.allowMultiple !== 'false';
			this.iconStyle = element.dataset.iconStyle || 'chevron';
			this.iconPosition = element.dataset.iconPosition || 'right';
			this.enableAnimations = element.dataset.animations !== 'false';

			this.init();
		}

		/**
		 * Initialize the accordion
		 */
		init() {
			this.items.forEach( ( item ) => {
				// Ensure each accordion item has the icon style and position data attributes
				// This fixes issues with existing blocks that don't have these attributes
				if ( ! item.dataset.iconStyle ) {
					item.dataset.iconStyle = this.iconStyle;
				}
				if ( ! item.dataset.iconPosition ) {
					item.dataset.iconPosition = this.iconPosition;
				}

				// Look for heading elements - WordPress saves these as wp-block-heading or wp-block-post-title
				// The accordion-item contains: heading/post-title block and group block (wp-block-group)
				const heading = item.querySelector( '.wp-block-heading, .wp-block-post-title, h1, h2, h3, h4, h5, h6' );

				// Look for content area - WordPress saves this as wp-block-group
				const content = item.querySelector( '.wp-block-group' );

				if ( heading && content ) {
					// Setup ARIA attributes
					const headingId = heading.id || `accordion-heading-${ this.generateId() }`;
					const contentId = content.id || `accordion-content-${ this.generateId() }`;

					heading.id = headingId;
					content.id = contentId;

					// Make heading interactive
					heading.setAttribute( 'role', 'button' );
					heading.setAttribute( 'tabindex', '0' );
					heading.setAttribute( 'aria-expanded', item.dataset.expanded === 'true' ? 'true' : 'false' );
					heading.setAttribute( 'aria-controls', contentId );
					heading.style.cursor = 'pointer'; // Ensure cursor shows it's clickable

					content.setAttribute( 'aria-labelledby', headingId );
					content.setAttribute( 'role', 'region' );

					// Set initial state
					if ( item.dataset.expanded !== 'true' ) {
						content.setAttribute( 'hidden', '' );
						item.classList.remove( 'is-expanded' );
					} else {
						item.classList.add( 'is-expanded' );
					}

					// Add CSS class for animations
					if ( this.enableAnimations ) {
						item.classList.add( 'has-animation' );
					}

					// Add event listeners
					heading.addEventListener( 'click', ( e ) => {
						e.preventDefault();
						e.stopPropagation();
						this.toggle( item );
					} );

					heading.addEventListener( 'keydown', ( e ) => {
						if ( e.key === 'Enter' || e.key === ' ' ) {
							e.preventDefault();
							e.stopPropagation();
							this.toggle( item );
						}
					} );
				}
			} );
		}

		/**
		 * Generate a unique ID
		 *
		 * @return {string} Unique ID
		 */
		generateId() {
			return Math.random().toString( 36 ).substr( 2, 9 );
		}

		/**
		 * Toggle accordion item
		 *
		 * @param {HTMLElement} item - The accordion item element
		 */
		toggle( item ) {
			const heading = item.querySelector( '.wp-block-heading, .wp-block-post-title, h1, h2, h3, h4, h5, h6' );
			const isExpanded = heading.getAttribute( 'aria-expanded' ) === 'true';

			if ( ! this.allowMultiple && ! isExpanded ) {
				// Close other items
				this.items.forEach( ( otherItem ) => {
					if ( otherItem !== item ) {
						this.close( otherItem );
					}
				} );
			}

			if ( isExpanded ) {
				this.close( item );
			} else {
				this.open( item );
			}

			// Dispatch custom event
			item.dispatchEvent( new CustomEvent( 'pikari-gutenberg-accordion:toggle', {
				detail: { expanded: ! isExpanded },
				bubbles: true,
			} ) );
		}

		/**
		 * Open accordion item
		 *
		 * @param {HTMLElement} item - The accordion item element
		 */
		open( item ) {
			const heading = item.querySelector( '.wp-block-heading, .wp-block-post-title, h1, h2, h3, h4, h5, h6' );
			const content = item.querySelector( '[role="region"]' );

			heading.setAttribute( 'aria-expanded', 'true' );
			content.removeAttribute( 'hidden' );
			item.classList.add( 'is-expanded' );

			// Dispatch custom event
			item.dispatchEvent( new CustomEvent( 'pikari-gutenberg-accordion:open', {
				bubbles: true,
			} ) );
		}

		/**
		 * Close accordion item
		 *
		 * @param {HTMLElement} item - The accordion item element
		 */
		close( item ) {
			const heading = item.querySelector( '.wp-block-heading, .wp-block-post-title, h1, h2, h3, h4, h5, h6' );
			const content = item.querySelector( '[role="region"]' );

			heading.setAttribute( 'aria-expanded', 'false' );
			content.setAttribute( 'hidden', '' );
			item.classList.remove( 'is-expanded' );

			// Dispatch custom event
			item.dispatchEvent( new CustomEvent( 'pikari-gutenberg-accordion:close', {
				bubbles: true,
			} ) );
		}
	}

	/**
	 * Initialize accordions on DOM ready
	 */
	function initAccordions() {
		// Look for accordions with both new and old class structures
		const accordions = document.querySelectorAll( '.wp-block-pikari-gutenberg-accordion, .wp-block-pikari-gutenberg-accordion-accordion' );

		accordions.forEach( ( accordion ) => {
			// Skip if already initialized
			if ( accordion.dataset.pikariGutenbergAccordionInitialized ) {
				return;
			}

			// Skip if this is a nested duplicate wrapper (old structure issue)
			if ( accordion.querySelector( '.wp-block-pikari-gutenberg-accordion, .wp-block-pikari-gutenberg-accordion-accordion' ) ) {
				return;
			}

			new PikariGutenbergAccordion( accordion );
			accordion.dataset.pikariGutenbergAccordionInitialized = 'true';
		} );
	}

	// Initialize on DOM ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAccordions );
	} else {
		initAccordions();
	}

	// Re-initialize on Gutenberg block updates (for block editor preview)
	if ( window.wp && window.wp.domReady ) {
		window.wp.domReady( initAccordions );
	}

	// Expose class for external use
	window.PikariGutenbergAccordion = PikariGutenbergAccordion;
}() );
