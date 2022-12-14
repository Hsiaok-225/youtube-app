import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ChannelLink = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 380px;
  margin-right: 20px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text};

  img {
    width: 220px;
    height: 220px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    margin-bottom: 12px;
  }

  :hover {
    color: ${({ theme }) => theme.text_light};
  }

  span {
    margin-top: 6px;
    font-size: 14px;
  }
`;

export default function ChannelCard({ channel }) {
  return (
    <ChannelLink to={`/channel/${channel?.snippet?.channelId}`}>
      <img
        src={channel?.snippet?.thumbnails?.high?.url}
        alt={channel?.snippet?.thumbnails?.title}
      />
      <div>{channel?.snippet?.title}</div>
      <span>
        {channel?.statistics?.subscriberCount &&
          `${parseInt(
            channel?.statistics?.subscriberCount
          ).toLocaleString()} Subscriber`}
      </span>
    </ChannelLink>
  );
}
