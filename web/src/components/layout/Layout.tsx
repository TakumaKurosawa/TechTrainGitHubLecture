import styled from 'styled-components'

interface LayoutProps {
  children: React.ReactNode
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`

const Header = styled.header`
  background-color: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Header>
        <HeaderContent>
          <Title>Tech Train Reviews</Title>
        </HeaderContent>
      </Header>
      <Main>
        {children}
      </Main>
    </LayoutContainer>
  )
}

export default Layout