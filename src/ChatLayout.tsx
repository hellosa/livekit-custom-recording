/*
 * ChatLayout.tsx - Layout for video chat.
 * The remote participant occupies the entire screen, and the local participant is shown in a small overlay in the top-right corner.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { TrackReference } from '@livekit/components-core';
import { VideoTrack, useVisualStableUpdate } from '@livekit/components-react';
import { LayoutProps } from './common';

const ChatLayout = ({ tracks: references }: LayoutProps) => {
  // Use a stable update to avoid unnecessary re-renders, similar to SpeakerLayout
  const sortedTracks = useVisualStableUpdate(references, 1);

  if (sortedTracks.length === 0) {
    return <></>;
  }

  // Assume the first track is the remote participant and the second (if exists) is self
  const remoteTrack = sortedTracks[0];
  const selfTrack = sortedTracks[1];

  return (
    <div className="chat-layout" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {remoteTrack && (
        <div className="chat-layout-remote" style={{ width: '100%', height: '100%' }}>
          <VideoTrack trackRef={remoteTrack as TrackReference} />
        </div>
      )}
      {selfTrack && (
        <div
          className="chat-layout-self"
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 200,
            height: 150,
            border: '2px solid #fff',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)',
            backgroundColor: '#000'
          }}
        >
          <VideoTrack trackRef={selfTrack as TrackReference} />
        </div>
      )}
    </div>
  );
};

export default ChatLayout; 