/**
 * Icon components for the accordion
 */

/**
 * Chevron icon
 */
export const ChevronIcon = () => (
    <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        className="pikari-gutenberg-accordion-icon pikari-gutenberg-accordion-icon--chevron"
        aria-hidden="true"
    >
        <path 
            d="M7 10l5 5 5-5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
    </svg>
);

/**
 * Plus icon
 */
export const PlusIcon = () => (
    <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        className="pikari-gutenberg-accordion-icon pikari-gutenberg-accordion-icon--plus"
        aria-hidden="true"
    >
        <path 
            d="M12 5v14M5 12h14" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
        />
    </svg>
);

/**
 * Minus icon
 */
export const MinusIcon = () => (
    <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        className="pikari-gutenberg-accordion-icon pikari-gutenberg-accordion-icon--minus"
        aria-hidden="true"
    >
        <path 
            d="M5 12h14" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
        />
    </svg>
);

/**
 * Arrow icon
 */
export const ArrowIcon = () => (
    <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none"
        className="pikari-gutenberg-accordion-icon pikari-gutenberg-accordion-icon--arrow"
        aria-hidden="true"
    >
        <path 
            d="M9 18l6-6-6-6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        />
    </svg>
);

/**
 * Get icon component based on style
 *
 * @param {string}  style      - Icon style (chevron, plus-minus, arrow, none)
 * @param {boolean} isExpanded - Whether the accordion item is expanded
 * @return {JSX.Element|null} Icon component or null
 */
export function getIcon( style, isExpanded = false ) {
    switch ( style ) {
        case 'chevron':
            return <ChevronIcon />;
        case 'plus-minus':
            return isExpanded ? <MinusIcon /> : <PlusIcon />;
        case 'arrow':
            return <ArrowIcon />;
        case 'none':
        default:
            return null;
    }
}

/**
 * Get icon HTML string for frontend rendering
 *
 * @param {string}  style      - Icon style (chevron, plus-minus, arrow, none)
 * @param {boolean} isExpanded - Whether the accordion item is expanded
 * @return {string} Icon HTML string
 */
export function getIconHTML( style, isExpanded = false ) {
    let html = '';
    
    switch ( style ) {
        case 'chevron':
            html = `<svg class="pikari-gutenberg-accordion-icon pikari-gutenberg-accordion-icon--chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
            break;
        case 'plus-minus':
            if ( isExpanded ) {
                html = `<svg class="pikari-gutenberg-accordion-icon pikari-gutenberg-accordion-icon--minus" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>`;
            } else {
                html = `<svg class="pikari-gutenberg-accordion-icon pikari-gutenberg-accordion-icon--plus" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>`;
            }
            break;
        case 'arrow':
            html = `<svg class="pikari-gutenberg-accordion-icon pikari-gutenberg-accordion-icon--arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`;
            break;
        case 'none':
        default:
            html = '';
    }
    
    // Allow filtering via WordPress hooks if available
    if ( typeof window !== 'undefined' && window.wp && window.wp.hooks ) {
        html = window.wp.hooks.applyFilters( 'pikari.gutenberg.accordion.iconHTML', html, style, isExpanded );
    }
    
    return html;
}