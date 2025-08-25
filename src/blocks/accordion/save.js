/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Save component
 *
 * Since we're using a render callback (render.php),
 * we only need to save the inner blocks content.
 * The wrapper will be added by the PHP render callback.
 */
export default function save() {
    return <InnerBlocks.Content />;
}