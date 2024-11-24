import styled from "styled-components"
import { GiKnifeFork } from "react-icons/gi"
import { Outlet,Link } from 'react-router-dom';
import Search from "./Search";
import Category from "./Category";

export default function NavUp() {
  return (
  <Main>
    <Nav>
      <GiKnifeFork/>
        <Logo to={'home'} >
          <LogoName>
            deliciousss
          </LogoName>
      </Logo>
    </Nav>
    <Search />
    <Category />
    <Outlet/>
  </Main>
  )
}

const LogoName = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  font-style: italic;
`

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Tow",cursive;
`

const Main = styled.div`
  margin: 0% 15%;
`

const Nav = styled.div`
  padding: 2rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg{
    font-size: 2.5rem;
  }
`
