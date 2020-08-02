import React from 'react';
import { GlobalState } from "./GlobalState"
import MainPlayer from "../components/player/MainPlayer"

function App() {
  return (
    <GlobalState>
      <MainPlayer />
    </GlobalState>
  );
}

export default App;
