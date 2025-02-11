/**
 * Copyright 2023 LiveKit, Inc.
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

import { VideoTrack, useLocalParticipant } from '@livekit/components-react';
import { LayoutProps } from './common';

const ChatLayout = ({ tracks: references }: LayoutProps) => {
  const { localParticipant } = useLocalParticipant();
  
  // Find the local participant's track reference
  const localTrackRef = references.find(
    (ref) => ref.participant.identity === localParticipant.identity
  );
  
  // Find the remote participant's track reference
  const remoteTrackRef = references.find(
    (ref) => ref.participant.identity !== localParticipant.identity
  );

  if (!remoteTrackRef || !localTrackRef) {
    return <></>;
  }

  return (
    <div className="lk-chat-layout" style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Remote participant's video (full screen) */}
      <div style={{ width: '100%', height: '100%' }}>
        <VideoTrack trackRef={remoteTrackRef} />
      </div>
      
      {/* Local participant's video (small overlay) */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '200px',
          height: '150px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      >
        <VideoTrack trackRef={localTrackRef} />
      </div>
    </div>
  );
};

export default ChatLayout; 