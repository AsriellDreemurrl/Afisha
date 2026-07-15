import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Editor from './pages/Editor/Editor'
import Post from './pages/Post/Post'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App
