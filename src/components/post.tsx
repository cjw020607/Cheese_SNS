import styled from "styled-components";
import { IPost } from "./timeline";

const Wrapper = styled.div`
display: flex;
// grid-template-rows:1fr;
flex-direction: column;
border:4px solid orange;
border-radius:10px;
padding:20px;
margin:10px 0px;
gap:20px;
background-color:oldlace;
`;
const Column = styled.div`
display:grid;
grid-template-rows:1fr 1fr;
border:4px solid orange;
border-radius:10px;
padding:20px;
margin:10px 0px;
gap:20px;
background-color:oldlace;

`;

const Pic = styled.div`
display:flex;
justify-content:center;
width:100%;
`;
const Photo = styled.img`
width:50%;
height:auto;
border-radius:15px;
align-self:center;

`;
const Username = styled.span`
font-weight:600;
font-size:24px;
`;

const Payload = styled.p`
font-size:18px;
`;

export default function Post({ username, photo, post }: IPost) {
    return (
        <>
            {
                photo ?
                    <Wrapper>
                        
                        <Pic>
                        <Photo src={photo} />
                        </Pic>
                        <Username>{username}</Username>
                        <Payload>{post}</Payload>
                    </Wrapper>
                    :
                    <Column>
                        <Username>{username}</Username>
                        <Payload>{post}</Payload>
                    </Column>
            }
        </>
    )
}