import { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";

import { fetchData } from "../utils/Web_API";
import ChannelCard from "../components/ChannelCard";
import { useParams } from "react-router-dom";

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

export default function Search() {
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchData(`search?part=snippet&q=${id}`).then((data) =>
      setVideos(data.items)
    );
  }, [id]);

  return (
    <Container>
      <Sidebar />
      <Content>
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
