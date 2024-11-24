import { ThreeCircles } from 'react-loader-spinner'
import styled from 'styled-components'
export default function Loader() {
  return (
    <LoaderErea>
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#c9c3c3"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoaderErea>
  )
}
const LoaderErea = styled.div`
  min-height: 15rem;
  width: 100%;
  border-radius: 2rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`
