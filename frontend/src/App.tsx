import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./Components/Layout/Layout"
import Home from "./pages/Home/Home"
import Editor from "./pages/Editor/Editor"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="editor" element={<Editor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
