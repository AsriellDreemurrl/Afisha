import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './pages/Home/Home'
import Editor from './pages/Editor/Editor'
import EventPage from './components/EventPage/EventPage'


function App() {
  return (
    <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/events/:id" element={<EventPage />} />
          </Routes>
        </Layout>
    </BrowserRouter>
  )
}

export default App
