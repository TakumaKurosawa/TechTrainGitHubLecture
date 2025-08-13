import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReviewListPage, ReviewDetailPage } from './pages'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReviewListPage />} />
        <Route path="/reviews/:id" element={<ReviewDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App