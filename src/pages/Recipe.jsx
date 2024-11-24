import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { HiOutlineXCircle } from "react-icons/hi";

export default function Recipe() {
  const [recipeDatails, setRecipeDatails] = useState({});
  const [activeTab, setActiveTab] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [, setRecipe] = useState(null);
  const [video, setVideo] = useState(null);

  const params = useParams();


  const getDetails = async (id) => {
    const api = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`);
    const data = await api.json();
    setRecipeDatails(data);
    console.log(data)
    /// get video
    setRecipe(data.title);
          const videoResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          data.title
        )}&key=AIzaSyC9kxLzNzrJ5ZaG_zo86V6eB7R-8fAPYgs`
      );
      const videoData = await videoResponse.json();
      const selectedVideo = videoData.items[0];
      setVideo(selectedVideo);
  }

  useEffect(() => {
    getDetails(params.id)
  },[params.id])

  return (
    <DetailWrapper>
      <TitileImage>
        <h1>{ recipeDatails.title }</h1>
        <img src={recipeDatails.image} alt={recipeDatails.title} />
        <ButtonVideo onClick={()=>{setShowModal(true)}}>Recipe on YouTube</ButtonVideo>
      </TitileImage>
      <Info>
        <Buttton className={activeTab === true ?"active":""} onClick={()=>setActiveTab(true)}>Instructions</Buttton>
        <Buttton className={activeTab === true ?"":"active"} onClick={()=>setActiveTab(false)}>ingredients</Buttton>
        {
          activeTab === true && (
            <Tex>
              <h3 dangerouslySetInnerHTML={{__html:recipeDatails.summary}}></h3>
              <h3 dangerouslySetInnerHTML={{__html:recipeDatails.instructions}}></h3>
            </Tex>
          )
        }
        {
          activeTab === false && (
            <UII>
              {recipeDatails.extendedIngredients.map((ingredient) => {
                return (
                  <li key={ingredient.id}>
                    {ingredient.original}
                  </li>
                )
              })}
            </UII>
          )
        }
      </Info>
      {
        showModal &&
        <Modal idDOM="modal">
            <ModalBackground >
              <Ground>
                <ExitBackground>
                  <Exit color="white" onClick={()=>{setShowModal(false)}} />
                </ExitBackground>
                <iframe
                  width="100%"
                  height="80%"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                >
                </iframe>
              </Ground>
            </ModalBackground>
        </Modal>
      }
    </DetailWrapper>
  )
}

const Exit = styled(HiOutlineXCircle)`
  cursor: pointer;
  width: 40px;
  height: 40px;
  margin-bottom: 1rem;
  :hover{
    color: gray;
  }
`

const ExitBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`


const Ground = styled.div`
  height: 100%;
  width: 100%;
  margin: 0% 15%;
  margin-top: 3%;
`

const ModalBackground = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonVideo = styled.button`
  background-color:#e94057;
  color: white;
  border: 1px;
  border-radius: 5px;
  padding: 1rem 2rem;
  margin-top: 1rem ;
  font-weight: 600;
  cursor: pointer;
  &:hover{
    background: linear-gradient(to right, #f27121,#e94057);
  }
`

const UII = styled.ul`
  margin-left: 1.1rem;
  font-weight:500;
`
const TitileImage = styled.div`
  width: 100%;
  h1{
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  img{
    width: 100%;
  }
`

const DetailWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 5rem;
  display: grid;
  grid-template-columns: 2fr 2fr;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom: 2rem;
  }
  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul{
    margin-top: 2rem;
  }
`
const Buttton = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white ;
  border: 2px solid black;
  margin-right: 2rem ;
  font-weight: 600;
  cursor: pointer;
`

const Info =styled.div`
  margin-left: 2rem;
    font-weight:500;

`

const Tex = styled.div`
  h3{
    font-size: 1rem;
    font-weight: 600;
    ol{
      margin-left:1.5rem;
      il{
        font-size: 1rem;
      }
    }
  }
`