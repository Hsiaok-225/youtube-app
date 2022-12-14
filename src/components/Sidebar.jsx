import { sidebarData } from "../utils/sidebarData";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import useDarkMode from "../hooks/useDarkMode";

const Container = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.secondary};
  padding: 8px 10px;

  height: calc(100vh - 56px);
  overflow-y: auto;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.text};
  padding: 12px 12px;
  border-radius: 8px;

  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.secondary_light_color};
  }

  span {
    margin-left: 12px;
  }
`;

export default function Sidebar() {
  const { setDarkMode } = useDarkMode();

  const handleSignIn = () => {
    //
  };

  return (
    <Container>
      {sidebarData.map((data) => (
        <Item key={data.name}>
          {data.icon}
          <span>{data.name}</span>
        </Item>
      ))}
      <Item onClick={() => setDarkMode((prev) => !prev)}>
        <SettingsBrightnessOutlinedIcon />
        <span>Mode</span>
      </Item>
      <Item onClick={handleSignIn}>
        <AccountCircleOutlinedIcon />
        <span>Sign in to like videos, comment, and subscribe.</span>
      </Item>
    </Container>
  );
}
