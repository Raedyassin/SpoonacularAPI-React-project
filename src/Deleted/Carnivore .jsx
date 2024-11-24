import { useState } from "react";
import { useEffect } from "react"
import { Card, Wrapper, Gradient } from "./HomeCompoents";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { Link } from "react-router-dom";
import '@splidejs/react-splide/css';


export default function Carnivore () {
  const [carnivore, setCarnivore] = useState([]);

  const getCarnivore = async () => {
    const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${import.meta.env.VITE_API_KEY}&number=10&tags=`); 
    const data = await api.json();
    setCarnivore(data.recipes)
  }

  useEffect(() => {
    getCarnivore();
  },[])

  return (
    
    <Wrapper>
      <h3>Our carnivore(meat-eater)  Picks</h3>
      <Splide  options={{perPage:3,gap: '1rem',arrows:false, drag:"free", pagination:false}}>
        {
          carnivore.map((recipe) => {
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

