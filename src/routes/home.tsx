import styled from "styled-components";

import { auth } from "./firebase";
import PostForm from "../components/post-form";
import Timeline from "../components/timeline";

const Wrapper=styled.div`
display:flex;
flex-direction:column;
gap:30px;
overfow-y:scroll;
// grid-template-rows:1fr 0fr 5fr;
// height:1200px; 
`;
const Title=styled.span`
// height:100%;
font-size:44px;
// padding:20px;
`;
export default function Home(){
    return (
        <Wrapper>
            <PostForm/>
            <Title>
                            All posts
             </Title>
            <Timeline/>
        </Wrapper>
    )
}