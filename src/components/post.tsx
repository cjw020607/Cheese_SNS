import styled from "styled-components";
import { IPost } from "./timeline";
import { auth, db, storage } from "../routes/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { update } from "firebase/database";

const Wrapper = styled.div`
display: flex;
// grid-template-rows:1fr;
flex-direction: column;
border:3px solid orange;
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
const Row = styled.div`
display:flex;
gap:20px;
align-items:center;
width:100%;

`;
const AvatarUpload = styled.label`
width:60px;
height:60px;
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

const Name = styled.span`
font-weight:600;
font-size:24px;`;

const Payload = styled.p`
font-size:18px;
`;

const Button = styled.div`
display:flex;
justify-content:flex-end;
gap:10px;
`;

const EditButton = styled.button`
background-color:lightseagreen;
color:white;
font-weight:600;
border:0;
font-size:14px;
padding:10px;
border-radius:10px;
text-transform:uppercase;
width:60px;
cursor:pointer;
`;

const DeleteButton = styled.button`
background-color:tomato;
color:white;
font-weight:600;
border:0;
font-size:14px;
padding:10px;
border-radius:10px;
text-transform:uppercase;
width:80px;
cursor:pointer;
`;
export default function Post({ username, photo, post, userId, id }: IPost) {
    const user = auth.currentUser;
    const avatar = user?.photoURL;
    const onDelete = async () => {
        const ok = window.confirm("Are you sure you want to delete this post?");
        if (!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "posts", id))
            if (photo) {
                const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        } finally {

        }

    }
    const onEdit = async () => {
        const newPost = prompt("Edit your post", post);
        if (!newPost || newPost === post) return;
        try {
            await updateDoc(doc(db, "posts", id), {
                post: newPost
            });
        } catch (e) {
            console.log(e);
        }
    }
    return (
        <>
            {
                photo ?
                    <Wrapper>

                        <Pic>
                            <Photo src={photo} />
                        </Pic>
                        <Row>
                            <AvatarUpload>
                                {avatar ? <AvatarImg src={avatar} /> :
                                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
                                    </svg>}
                            </AvatarUpload>
                            <Name>
                                {username ?? "Anonymous"}
                            </Name>
                        </Row>
                        <Payload>{post}</Payload>
                        {user?.uid === userId ?
                            <Button>
                                <EditButton onClick={onEdit}>Edit</EditButton>
                                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                            </Button> : null}
                    </Wrapper>
                    :
                    <Column>
                        <Row>
                            <AvatarUpload>
                                {avatar ? <AvatarImg src={avatar} /> :
                                    <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                        <path clipRule="evenodd" fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
                                    </svg>}
                            </AvatarUpload>
                            <Name>
                                {username ?? "Anonymous"}
                            </Name>
                        </Row>

                        <Payload>{post}</Payload>
                        {user?.uid === userId ?
                            <Button>
                                <EditButton onClick={onEdit}>Edit</EditButton>
                                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                            </Button> : null}
                    </Column>
            }
        </>
    )
}