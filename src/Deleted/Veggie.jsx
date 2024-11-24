import { useState } from "react";
import { useEffect } from "react"
import { Card, Wrapper, Gradient } from "./HomeCompoents";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Link } from "react-router-dom";
import '@splidejs/react-splide/css';


export default function Veggie() {
  const [veggie, setVeggier] = useState([]);

  const getVeggier = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=10&tags=vegetarian`); 
    const data = await api.json();
    setVeggier(data.recipes)
  }

  useEffect(() => {
    getVeggier();
  },[])

  return (
    
    <Wrapper>
      <h3>Our Vegetarian Picks</h3>
      <Splide  options={{perPage:3,gap: '1rem',arrows:false, drag:"free", pagination:false}}>
        {
          veggie.map((recipe) => {
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

