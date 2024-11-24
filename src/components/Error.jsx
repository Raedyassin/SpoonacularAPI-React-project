import styled from "styled-components"
export default function Error() {
  return (
    <Page>
      <Err>404 Error- Page Not Found  </Err>
    </Page>
  )
}
const Page = styled.div`
  background-color: gray;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Err = styled.div`
  font-size: clamp(2rem, 5vw, 5rem);
  font-weight: bold;
  /* 
    background-image: url('../../public/download.jpeg'); 
    background-size: cover;
    background-clip: text; 
    -webkit-background-clip: text; 
    color: transparent;  
  */

`