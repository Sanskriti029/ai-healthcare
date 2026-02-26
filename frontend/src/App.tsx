import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Triage from "./pages/Triage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
      
        <Route path="/triage" element={<Triage />} />

      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;