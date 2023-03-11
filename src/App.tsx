import React, { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import RoutesRenderer from './routes/RoutesRenderer'

const App = () => {
  return (
      <BrowserRouter>
        <RoutesRenderer />
      </BrowserRouter>
  )
}

export default App