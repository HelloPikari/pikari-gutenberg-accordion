/**
 * WordPress dependencies
 */
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * Save component for accordion item block.
 *
 * Since this block uses server-side rendering (render.php),
 * the save function returns null to indicate dynamic rendering.
 */
export default function save() {
	return <InnerBlocks.Content />;
}
