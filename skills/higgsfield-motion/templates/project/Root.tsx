import React from 'react';
import {Composition} from 'remotion';
import {Main, MAIN_FRAMES, FPS, WIDTH, HEIGHT} from './Main';
import {OfferPromo, OFFER_FRAMES} from './examples/OfferPromo';
import {BundlePromo, BUNDLE_FRAMES} from './examples/BundlePromo';
import {AgentDemo, AGENT_FRAMES} from './examples/AgentDemo';
import {AgentsStory, STORY_FRAMES} from './examples/AgentsStory';
import {AgentmashReel, REEL_FRAMES} from './examples/AgentmashReel';

const p = {music: undefined as string | undefined};
export const Root: React.FC = () => (
  <>
    <Composition id="Main" component={Main} durationInFrames={MAIN_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} defaultProps={{music: 'music.wav' as string | undefined}} />
    <Composition id="ExampleOffer" component={OfferPromo} durationInFrames={OFFER_FRAMES} fps={30} width={1920} height={1080} defaultProps={p} />
    <Composition id="ExampleBundle" component={BundlePromo} durationInFrames={BUNDLE_FRAMES} fps={30} width={1920} height={1080} defaultProps={p} />
    <Composition id="ExampleAgentDemo" component={AgentDemo} durationInFrames={AGENT_FRAMES} fps={30} width={1920} height={1080} defaultProps={p} />
    <Composition id="ExampleAgentsStory" component={AgentsStory} durationInFrames={STORY_FRAMES} fps={30} width={1920} height={1080} defaultProps={p} />
    <Composition id="ExampleAgentmashReel" component={AgentmashReel} durationInFrames={REEL_FRAMES} fps={30} width={1080} height={1920} defaultProps={p} />
  </>
);
