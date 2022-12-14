import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 380px;
  margin-right: 20px;
  margin-bottom: 12px;
  border-radius: 16px;

  :hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  img {
    width: 168px;
    border-radius: 16px;
    object-fit: cover;
    cursor: pointer;
  }
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

const VideoLink = styled(Link)`
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const ChannelLink = styled(Link)`
  font-size: 12px;
  margin-top: 8px;
  color: ${({ theme }) => theme.text_light};
  :hover {
    color: ${({ theme }) => theme.text};
  }
  cursor: pointer;
`;

export default function MiniVideoCard({ video }) {
  const {
    id: { videoId },
    snippet,
  } = video;

  return (
    <CardContainer>
      <Link to={`/video/${videoId}`}>
        <img src={snippet?.thumbnails?.high?.url} alt={snippet.title} />
      </Link>
      <InfoContent>
        <VideoLink to={`/video/${videoId}`}>
          {snippet?.title.slice(0, 60)}
        </VideoLink>
        <ChannelLink to={`/channel/${snippet.channelId}`}>
          {snippet?.channelTitle}
        </ChannelLink>
      </InfoContent>
    </CardContainer>
  );
}
