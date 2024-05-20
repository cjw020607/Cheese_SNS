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
export default function Post({ username, photo, post, userId,id }: IPost) {
    const user = auth.currentUser;
    const onDelete=async()=>{
        const ok=window.confirm("Are you sure you want to delete this post?");
        if(!ok||user?.uid!==userId)return;
        try{
            await deleteDoc(doc(db,"posts",id))
            if(photo){
                const photoRef=ref(storage,`tweets/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        }catch(e){
            console.log(e);
        }finally{

        }

    }
    const onEdit=async()=>{
        const newPost=prompt("Edit your post",post);
        if(!newPost||newPost===post)return;
        try{
            await updateDoc(doc(db,"posts",id),{
                post:newPost
            });
        }catch(e){
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
                        <Username>{username}</Username>
                        <Payload>{post}</Payload>
                        {user?.uid === userId ?
                            <Button>
                                <EditButton onClick={onEdit}>Edit</EditButton>
                                <DeleteButton onClick={onDelete}>Delete</DeleteButton>
                            </Button> : null}
                    </Wrapper>
                    :
                    <Column>
                        <Username>{username}</Username>
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