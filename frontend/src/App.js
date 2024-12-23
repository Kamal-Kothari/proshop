import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeSceen from './screens/HomeSceen'


const App = () => {
  return (
    <>
    <Header />
    <main className='py-3'>
      <Container>
        <h1>Welcome to Proshop</h1>
        <HomeSceen/>
      </Container>
    </main>
    <Footer />
    </>
  )
}

export default App