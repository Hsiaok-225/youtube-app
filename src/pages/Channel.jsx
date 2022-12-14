import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ChannelCard from "../components/ChannelCard";
import Sidebar from "../components/Sidebar";
import VideoCard from "../components/VideoCard";
import { fetchData } from "../utils/Web_API";

const Container = styled.div`
  display: flex;
  margin-top: 56px;
  height: calc(100vh - 56px);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  height: 100%;
  width: 100%;

  position: relative;
`;

const Background = styled.div`
  width: 100%;
  min-height: 240px;
  background: linear-gradient(
    90deg,
    rgba(0, 238, 247, 1) 0%,
    rgba(206, 3, 184, 1) 100%,
    rgba(0, 212, 255, 1) 100%
  );
`;

const ChannelBox = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
`;

const VideoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 150px;

  h2 {
    font-size: 32px;
    margin-left: 60px;
    color: ${({ theme }) => theme.text};
  }
`;

const Hr = styled.hr`
  margin-bottom: 8px;
  border: 0.5px solid rgba(255, 255, 255, 0.1);
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-left: 60px;

  width: 100%;
`;

export default function Channel() {
  const [channelDetails, setChannelDetails] = useState();
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const channelData = await fetchData(`channels?part=snippet&id=${id}`);
        setChannelDetails(channelData?.items[0]);
        // `search?part=snippet&q=${category}`

        const videoData = await fetchData(
          `search?channelId=${id}&part=snippet%2Cid&order=date`
        );
        setVideos(videoData?.items);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  return (
    <Container>
      <Sidebar />
      <Content>
        <Background />
        <ChannelBox>
          <ChannelCard channel={channelDetails} />
        </ChannelBox>
        <VideoBox>
          <h2>Videos</h2>
          <Hr />
          <VideoContainer>
            {videos?.map((video, i) => (
              <VideoCard key={i} video={video} />
            ))}
          </VideoContainer>
        </VideoBox>
      </Content>
    </Container>
  );
}
