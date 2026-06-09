import { useState } from 'react'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
