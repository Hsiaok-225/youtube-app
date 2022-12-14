import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchData } from "../utils/Web_API";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import MiniVideoCard from "../components/MiniVideoCard";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary};
  margin-top: 56px;
  height: calc(100vh - 56px);

  overflow: hidden;
`;

const VideoDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 32px;
  padding: 24px 24px 0 0;

  flex: 1;
`;

const VideoBox = styled.div`
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  position: relative;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }
`;

const TagBox = styled.div`
  display: flex;

  a {
    font-size: 6px;
    color: #6a90bc;
    margin-right: 12px;
    cursor: pointer;
  }
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
`;

const ChannelLink = styled(Link)`
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 10px;
  span {
    color: ${({ theme }) => theme.text};
  }
`;

const RelativeVideo = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  box-sizing: border-box;
  margin-top: 24px;
  overflow-y: auto;
`;

export default function Video() {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    fetchData(`videos?part=contentDetails,snippet,statistics&id=${id}`)
      .then((data) => setVideoDetail(data.items[0]))
      .catch((err) => console.log(err));

    fetchData(`search?part=snippet&relatedToVideoId=${id}&type=video`)
      .then((data) => setVideos(data.items))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    console.log(videoDetail);
  }, [videoDetail]);
  useEffect(() => {
    console.log(videos);
  }, [videos]);

  if (!videoDetail?.snippet) return "Loading...";
  const { snippet, statistics } = videoDetail;

  return (
    <Container>
      <VideoDetail>
        <VideoBox>
          <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls />
        </VideoBox>
        <Info>
          <Title>
            <TagBox>
              {snippet?.tags?.slice(0, 6).map((tag) => (
                <a key={tag}>#{tag}</a>
              ))}
            </TagBox>
            <span>{snippet?.localized?.title}</span>
          </Title>
          <Description>
            <ChannelLink to={`/channel/${snippet?.chaanelId}`}>
              {snippet?.channelTitle}
            </ChannelLink>
            <ChannelInfo>
              <span>{`${parseInt(
                statistics?.viewCount
              ).toLocaleString()} views`}</span>
              <span>{`${parseInt(
                statistics?.likeCount
              ).toLocaleString()} likes`}</span>
            </ChannelInfo>
          </Description>
        </Info>
      </VideoDetail>
      <RelativeVideo>
        {videos.map((video) => (
          <MiniVideoCard key={video.id.videoId} video={video} />
        ))}
      </RelativeVideo>
    </Container>
  );
}
