// Free stand-ins for the fonts measured in the references, all with Latin + Cyrillic.
// Import this file once (index.ts does) so the fonts load before the first frame renders.
import {loadFont as loadInter} from '@remotion/google-fonts/Inter';
import {loadFont as loadInterTight} from '@remotion/google-fonts/InterTight';
import {loadFont as loadUnbounded} from '@remotion/google-fonts/Unbounded';
import {loadFont as loadGeologica} from '@remotion/google-fonts/Geologica';
import {loadFont as loadPlayfair} from '@remotion/google-fonts/PlayfairDisplay';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

const subsets: ('latin' | 'cyrillic')[] = ['latin', 'cyrillic'];

/** UI text, status lines, small captions, end-card CTA (reference: SF Pro / Inter-like neo-grotesk). */
export const inter = loadInter('normal', {weights: ['400', '500', '600', '700'], subsets}).fontFamily;
/** Big uppercase claims ("FIRST COME, FIRST SERVED", "$20,000,000"): tight neo-grotesk, 700-800. */
export const interTight = loadInterTight('normal', {weights: ['600', '700', '800', '900'], subsets}).fontFamily;
/** Heavy wide sticker type ("PRODUCTION / SKILLS / BUNDLE"); slant it with skewX, it has no italic. */
export const unbounded = loadUnbounded('normal', {weights: ['700', '800', '900'], subsets}).fontFamily;
/** Quirky squarish caps ("UNUSED CASHBACK EXPIRES ..."). */
export const geologica = loadGeologica('normal', {weights: ['600', '700', '800'], subsets}).fontFamily;
/** High-contrast serif hero for Claude collabs ("OPUS 5.5"). */
export const playfair = loadPlayfair('normal', {weights: ['500', '600', '700'], subsets}).fontFamily;
/** Code / data texture on technical grids. */
export const mono = loadMono('normal', {weights: ['400', '500'], subsets}).fontFamily;
