import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import PropTypes from 'prop-types';
import '@splidejs/react-splide/css';
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
export default function HomeRepate (props) {


  const getFood = async ({queryKey }) => {
    try {
      const [, food] = queryKey;
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=10&tags=${food}`); 
      return await api.json();
    } catch (error) {
      console.log(error.message);
    }
  }
  const foodQuery = useQuery({
    queryKey: ['foodQuery',props.food],
    queryFn: getFood,
  });
  const food = foodQuery?.data?.recipes ?? [];

  return (
    <Wrapper>
      <h3>{props.title}</h3>
      <Splide  options={{perPage:props.page,gap: '1rem',arrows:false, drag:"free", pagination:false}}>
        {
          foodQuery.isLoading && <Loader/>
        }
        {
          food.length !== 0 &&
          food.map((recipe) => {
            return (
              <SplideSlide key={recipe.id} >
                <Link to={'/recipe/'+recipe.id}>
                  <Card >
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient/>
                  </Card>
                </Link>
              </SplideSlide>
            )
          })  
        }
      </Splide>
    </Wrapper>
  )
  
}


HomeRepate.propTypes = {
  food: PropTypes.string.isRequired, // Required string
  title: PropTypes.string.isRequired, // Required string
  page: PropTypes.number.isRequired, // Required string
};

const Wrapper = styled(motion.div)`
  margin: 2rem 0rem;
  h3{
    margin: 0.5rem 0rem;
    font-size: 1.5rem;
  }
`;

const Card = styled.div`
  min-height: 15rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p{
    padding: 0px 10px;
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%,0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.5));
`;
