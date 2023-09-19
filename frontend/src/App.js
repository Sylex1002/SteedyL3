import React from "react";
import Router from "./Routes/Router";
import { AppProvider } from "./Context/AppContext";
import { AudioProvider } from "./Context/AudioContext ";
import { WebsocketProvider } from "./Context/WebsocketContext";

function App() {
  return (
    <AppProvider>
      <AudioProvider>
        <WebsocketProvider>
          <Router />
        </WebsocketProvider>
      </AudioProvider>
    </AppProvider>
  );
}

export default App;
