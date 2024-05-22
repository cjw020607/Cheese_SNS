import styled from "styled-components";

import { auth } from "./firebase";
import PostForm from "../components/post-form";
import Timeline from "../components/timeline";
import { useState } from "react";

const Wrapper = styled.div`
display:flex;
flex-direction:column;
gap:30px;
overfow-y:scroll;
`;

const Row = styled.div`
display:flex;
gap:30px;
align-items:center;
width:100%;

`;
const Name = styled.span`
font-weight:600;
font-size:24px;`;

const AvatarUpload = styled.label`
width:80px;
height:80px;
border-radius:50%;
overflow:hidden;
background-color:lightgray;
cursor:pointer;
display:flex;
justify-content:center;
align-items:center;
svg{
    width:50px;
}
`;

const AvatarImg = styled.img`
width:100%;
`;
const Title = styled.span`
font-size:36px;

`;
export default function Home() {
    const user = auth.currentUser;
    const name=user?.displayName??'';
    const avatar=user?.photoURL;
    return (
        <Wrapper>
            <Row>
            <AvatarUpload>
                {avatar ? <AvatarImg src={avatar} /> :
                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
                    </svg>}
            </AvatarUpload>
            <Name>
                {name ?? "Anonymous"}
            </Name>
            </Row>
            <PostForm />
            <Title>
                All posts
            </Title>
            <Timeline />
        </Wrapper>
    )
}