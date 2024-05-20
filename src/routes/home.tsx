import styled from "styled-components";

import { auth } from "./firebase";
import PostForm from "../components/post-form";
import Timeline from "../components/timeline";

const Wrapper=styled.div`
display:flex;
flex-direction:column;
gap:30px;
overfow-y:scroll;
`;
const Title=styled.span`
font-size:36px;

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