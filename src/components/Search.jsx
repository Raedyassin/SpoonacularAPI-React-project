import styled from "styled-components"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

export default function Search() {
  
  const [input, setIntput] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" +input);
  }
  return (
    <DivDiv>
      <FormStyle onSubmit={submitHandler}>
        <div>
          <FaSearch/>
          <input type="text" onChange={(e)=>setIntput(e.target.value)} value={input} />
        </div>
      </FormStyle>
    </DivDiv>
  )
}

const DivDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormStyle = styled.form`
  margin: 0rem 0rem;
  width: 60%;
  display: block;
  position: relative;
  input{
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1rem;
    padding: 1rem 3rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    color: white;
    width: 100%;
  }
  svg{
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(100%,-50%);
    color: white;
  }
`