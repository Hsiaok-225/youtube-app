import { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import ChannelCard from "../components/ChannelCard";

import { fetchData } from "../utils/Web_API";

const Container = styled.div`
  display: flex;
  margin-top: 56px;
  height: calc(100vh - 56px);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;

  height: 100%;
  width: 100%;
  padding: 0 20px;
`;

const TagContainer = styled.ul`
  display: flex;
  align-items: center;
  height: 56px;
  margin: 12px 20px;
`;

const TagItem = styled.li`
  height: 20px;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 16px 20px;
  margin-right: 12px;
  border-radius: 6px;
  color: ${({ tag, category, theme }) =>
    tag === category ? "black" : `${theme.text}`};
  background-color: ${({ tag, category, theme }) =>
    tag === category ? "white" : `${theme.secondary_light_color}`};
  cursor: pointer;

  :hover {
    background-color: ${({ tag, category, theme }) =>
      tag === category ? "null" : `${theme.hover_text}`};
  }
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 60px;

  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const tags = [
  "All",
  "Music",
  "Game",
  "Cartoon",
  "Animate",
  "Tourist",
  "Pets",
  "Art",
  "New",
  "JS Mastery",
];

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState("New");

  useEffect(() => {
    fetchData(`search?part=snippet&q=${category}`).then((data) =>
      setVideos(data.items)
    );
  }, [category]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <TagContainer>
          {tags.map((tag, i) => (
            <TagItem
              key={i}
              onClick={() => setCategory(tag)}
              tag={tag}
              category={category}
            >
              {tag}
            </TagItem>
          ))}
        </TagContainer>
        <VideoContainer>
          {videos?.map((video) => (
            <div key={video.id.videoId}>
              {video.id.videoId && <VideoCard video={video} />}
              {video.id.channelId && <ChannelCard channel={video} />}
            </div>
          ))}
        </VideoContainer>
      </Content>
    </Container>
  );
}
