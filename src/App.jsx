import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Editor from './pages/Editor/Editor'
import Post from './pages/Post/Post'


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
