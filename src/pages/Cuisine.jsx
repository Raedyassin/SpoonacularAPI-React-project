import { useParams, Link } from "react-router-dom"
import styled from "styled-components"
import { motion } from "framer-motion"
import Loader from '../components/Loader'
import { useQuery } from "@tanstack/react-query"


export default function Cuisine() {
  let params = useParams();

  const getCuisine = async ({queryKey}) => {
    const [, name] = queryKey ;
    const api = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}&cuisine=${name}`);
    return await api.json();
  }

  const cusinieQuery = useQuery({
    queryKey: ['foodQuery',params.type],
    queryFn: getCuisine,
  })
  const cuisine = cusinieQuery?.data?.results ?? [];


  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{duration:0.5}}
    >
      {
        cusinieQuery.isLoading && <Loader/>
      }
      {
        cuisine.length !== 0 && 
        cuisine.map((item) => {
          return (
            <Link key={item.id} to={'/recipe/'+item.id} style={{textDecoration:"none"}}>
              <Card >
                <img src={item.image} alt={item.title} />
                <h4>{ item.title }</h4>
              </Card>
            </Link>
          )
        })
      }
      <div style={{marginBottom:"5rem"}}></div>
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem,1fr));
  grid-gap: 2rem;
`

const Card = styled.div`
  img{
    width: 100%;
    border-radius: 2rem;
    &:hover{
      background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
      z-index: 10;
    }
  }
  a{
    text-decoration: none;
  }
  h4{
    text-decoration: none;
    text-align: center;
    padding: 1rem;
  }
`
