// import  { useRef } from "react";
import { useState } from "react";
export default function Mot() {
  
  const [recipe, setRecipe] = useState(null);
  const [video, setVideo] = useState(null);

  const fetchRecipe = async () => {
    try {
      // Fetch recipe from Spoonacular API
      const recipeResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=pasta&apiKey=${import.meta.env.VITE_API_KEY}`
      );
      const recipeData = await recipeResponse.json();
      const selectedRecipe = recipeData.results[0];
      setRecipe(selectedRecipe);

      // Fetch video from YouTube API using recipe title
      const videoResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          selectedRecipe.title
        )}&key=AIzaSyC9kxLzNzrJ5ZaG_zo86V6eB7R-8fAPYgs`
      );
      const videoData = await videoResponse.json();
      const selectedVideo = videoData.items[0];
      setVideo(selectedVideo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <button onClick={fetchRecipe}>Get Recipe with Video</button>

      {recipe && (
        <div>
          <h1>{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} />
        </div>
      )}

      {video && (
        <div>
          <h2>Video Tutorial:</h2>
          <a
            href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch {video.snippet.title} on YouTube
          </a>
        </div>
      )}
    </div>
  );
};
