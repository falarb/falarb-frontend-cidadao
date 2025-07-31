import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from './pages/Template';
import Home from './pages/Home';
import ReviewProgress from './pages/ReviewProgress';
import Page404 from './pages/Page404';

function App() {
  return (
<>
  <BrowserRouter>
    <Routes>
      {/* Rotas com Template */}
      <Route path="/" element={<Template />}>
        <Route index element={<Home />} />
        <Route path="acompanhar-solicitacao" element={<ReviewProgress />} />
      </Route>
      {/* 404 fora do Template */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  </BrowserRouter>
</>
  );
}

export default App;
