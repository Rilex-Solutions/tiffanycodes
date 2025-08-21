import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Portfolio from "./components/Portfolio";
import ResumeViewer from "./components/ResumeViewer";
import ErrorBoundary from "./components/ErrorBoundary";

// Styles
import "./App.css";

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/resume/:type" element={<ResumeViewer />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;