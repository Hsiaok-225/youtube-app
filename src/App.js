import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./utils/Globalstyle";

import { Home, Channel, Video, Search } from "./pages";
import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import useDarkMode from "./hooks/useDarkMode";

function App() {
  const { darkMode } = useDarkMode();

  return (
    <BrowserRouter>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="video/:id" element={<Video />} />
          <Route path="channel/:id" element={<Channel />} />
          <Route path="search/:id" element={<Search />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
