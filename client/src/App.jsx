import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/auth";
import CommonLayout from "./components/commonLayout";
import TaskPage from "./pages/tasks";
import ScrumBoardPage from "./pages/ScrumBoard";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/tasks" element={<CommonLayout />}>
        <Route path="lists" element={<TaskPage />} />
        <Route path="scrum-board" element={<ScrumBoardPage />} />
      </Route>
    </Routes>
  );
}

export default App;