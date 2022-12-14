import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import YTlogo from "../images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
  background-color: ${({ theme }) => theme.secondary};
  padding: 0 16px;
`;

const LogoContainer = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    :hover {
      background-color: ${({ theme }) => theme.secondary_light_color};
    }
  }
`;

const HomeLink = styled(Link)`
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    height: 25px;
  }
  span {
    color: ${({ theme }) => theme.text};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;

  input {
    min-width: 550px;
    color: ${({ theme }) => theme.text};
    background: transparent;
    font-size: 16px;
    border: 1px solid ${({ theme }) => theme.secondary_light_color};
    border-radius: 20px 0 0 20px;
    outline: none;
    padding: 9px 15px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    border: none;
    border-radius: 0 20px 20px 0;
    padding: 0 20px;
    background-color: ${({ theme }) => theme.secondary_light_color};
    cursor: pointer;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  gap: 10px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    :hover {
      border-radius: 50%;
      background-color: ${({ theme }) => theme.secondary_light_color};
    }
  }
`;

export default function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query) {
      navigate(`/search/${query}`);
      setQuery("");
    }
  };

  return (
    <Container>
      <LogoContainer>
        <div>
          <MenuIcon sx={{ color: "white", cursor: "pointer" }} />
        </div>
        <HomeLink to="/">
          <img src={YTlogo} alt="logo" />
          <span>Youtube</span>
        </HomeLink>
      </LogoContainer>
      <SearchContainer>
        <input
          type="text"
          placeholder="搜尋"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <SearchIcon sx={{ color: "white" }} />
        </button>
      </SearchContainer>
      <ProfileContainer>
        <div>
          <VideoCallIcon
            sx={{ color: "white", cursor: "pointer" }}
            fontSize="medium"
          />
        </div>
        <div>
          <NotificationsNoneIcon
            sx={{ color: "white", cursor: "pointer" }}
            fontSize="medium"
          />
        </div>
        <div>
          <PermIdentityIcon
            sx={{ color: "white", cursor: "pointer" }}
            fontSize="medium"
          />
        </div>
      </ProfileContainer>
    </Container>
  );
}
