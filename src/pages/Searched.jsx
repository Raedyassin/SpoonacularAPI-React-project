import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from '../components/Loader'

export default function Searched() {

  const [searched, setSearched] = useState([]);
  const [offset, setOffset] = useState(0);
  const [offsetTotal, setOffsetTotal] = useState(0);
  const [load, setLoad] = useState(true);

  let params = useParams();

  const getSearched = async (searchedText, offs) => {
    try { 
      const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${searchedText}&number=20&offset=${offs}`);
      const data = await api.json();
      setOffsetTotal(data.totalResults)
      setOffset(offset+20)
      setSearched([...searched, ...data.results]);
      setLoad(false)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getSearched(params.search,0);
  }, [params.search])

  return (
    <div>
      <Grid>
        {
          load && <Loader/>
        }
        {
          !load &&
          searched.length === 0 &&
          <NoResult>
            There is no Result
          </NoResult>
        }
        {
          !load &&
          searched &&
          searched.map((item) => {
            return (
              <Link to={'/recipe/'+item.id} key={item.id+offset} style={{textDecoration:"none"}}>
                <Card >
                  <img src={item.image} alt={item.title}  />
                  <h4 >{ item.title }</h4>
                </Card>
              </Link>
            )
          })
        }
      </Grid>
      {
        offset<= offsetTotal &&
        !load &&
        <ShowMore>
          <button onClick={()=>{getSearched(params.search,offset)}}>Show More</button>
        </ShowMore>
      }
      </div>
  )
}
const ShowMore = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  button{
    margin-bottom: 5rem;
    background: linear-gradient(to right, #f27121,#e94057) ;
    padding: 1rem 2rem;
    border: 0cap;
    font-weight: bold;
    cursor: pointer;
    border-radius: 15px;
    color: white;
    &:hover{
      background: linear-gradient(35deg,#494949,#313131);
    }
  } 
`

const NoResult = styled.div`
  font-weight: bold;
  font-style: italic;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem,1fr));
  grid-gap: 2rem;
`

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
  }
  a{
    text-decoration: none;
  }
  h4{
    font-size: 0.8rem;
    text-align: center;
    padding: 1rem;
    text-decoration: none;
  }
`


//////////////////////////////////////////////////////////////

// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import Loader from '../components/Loader'

// export default function Searched() {

//   const [searched, setSearched] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [load, setLoad] = useState(true);

//   let params = useParams();

//   const getSearched = async (searchedText, offs) => {
//     try { 
//       const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&query=${searchedText}&number=10&offset=${offs}`);
//       const data = await api.json();
//       setOffset(offset+10)
//       setSearched([...searched, ...data.results]);
//       setLoad(false)
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   useEffect(() => {
//     getSearched(params.search,0);
//   }, [params.search])

//   return (
//     <div>
//       <Grid>
//         {
//           load && <Loader/>
//         }
//         {
//           !load &&
//           searched.length === 0 &&
//           <NoResult>
//             There is no Result
//           </NoResult>
//         }
//         {
//           !load &&
//           searched &&
//           searched.map((item) => {
//             return (
//               <Link to={'/recipe/'+item.id} key={item.id+offset} style={{textDecoration:"none"}}>
//                 <Card >
//                   <img src={item.image} alt={item.title} />
//                   <h4 >{ item.title }</h4>
//                 </Card>
//               </Link>
//             )
//           })
//         }
//       </Grid>
//       {
//         !load &&
//         <ShowMore>
//         <button onClick={()=>{getSearched(params.search,offset)}}>Show More</button>
//       </ShowMore>
//       }
//       </div>
//   )
// }
// const ShowMore = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-bottom: 5rem;
//   margin-top: 1rem;
//   button{
//     background: linear-gradient(to right, #f27121,#e94057) ;
//     padding: 1rem 2rem;
//     border: 0cap;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 15px;
//     color: white;
//     &:hover{
//       background: linear-gradient(35deg,#494949,#313131);
//     }
//   } 
// `

// const NoResult = styled.div`
//   font-weight: bold;
//   font-style: italic;
// `

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(10rem,1fr));
//   grid-gap: 2rem;
// `

// const Card = styled.div`
//   img{
//     width: 100%;
//     border-radius: 2rem;
//   }
//   a{
//     text-decoration: none;
//   }
//   h4{
//     font-size: 0.8rem;
//     text-align: center;
//     padding: 1rem;
//     text-decoration: none;
//   }
// `
