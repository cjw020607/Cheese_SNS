import styled from "styled-components";
import { auth, db, storage } from "./firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Unsubscribe, updateProfile } from "firebase/auth";
import { collection, getDocs, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { IPost } from "../components/timeline";
import Post from "../components/post";

const Wrapper = styled.div`
display:flex;
align-items:center;
flex-direction:column;
gap:20px;
`;

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
const AvatarInput = styled.input`
display:none;
`;
const Name = styled.span`
font-weight:600;
font-size:24px;`;

const Button = styled.button`
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

const Posts=styled.div`
display:flex;
flex-direction:column;
// width:100%;
gap:20px;
`;

export default function Profile() {
    const user = auth.currentUser;
    const [name,setName]=useState(user?.displayName??'' );
    const [avatar, setAvatar] = useState(user?.photoURL);
    const [posts, setPost] = useState<IPost[]>([]); // [1
    const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (!user) return;
        if (files && files.length === 1) {
            const file = files[0];
            const locationRef = ref(storage, `avatars/${user?.uid}`);
            const result = await uploadBytes(locationRef, file);
            const avatarUrl = await getDownloadURL(result.ref);
            setAvatar(avatarUrl);
            await updateProfile(user, {
                photoURL: avatarUrl
            })
        }
    }
    const onEdit = async () => {
        if(!user) return;
        const newName=prompt("Enter your new name",user.displayName??'');
        if(newName===user.displayName||!newName) return;
        await updateProfile(user,{
            displayName:newName
        });
        setName(newName);
    }
    useEffect(() => {
        let unsubscribe: Unsubscribe | null = null;
        const fetchPosts = async () => {
            const postsQuery = query(
                collection(db, "posts"),
                where( "userId", "==", user?.uid),
                orderBy("createdAt", "desc"),
                limit(25)
            );
            unsubscribe = await onSnapshot(postsQuery, (snapshot) => {
                const posts=snapshot.docs.map(doc=>{
                    const {post,createdAt,userId,username,photo}=doc.data();
                        return{
                            post,createdAt,userId,username,photo,id:doc.id,
                        }
                })
                setPost(posts);
            })

        }
        fetchPosts();
        return ()=>{
            unsubscribe&&unsubscribe();
        }
    },[])

    return <Wrapper>
        <AvatarUpload htmlFor="avatar">
            {avatar ? <AvatarImg src={avatar} /> :
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path clipRule="evenodd" fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
                </svg>}
        </AvatarUpload>
        <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*" />
        <Name>
            {name ?? "Anonymous"}
        </Name>
        <Button onClick={onEdit}>
            Edit
        </Button>
        <Posts>
            {posts.map(post=><Post key={post.id}{...post}/>)}
        </Posts>
    </Wrapper>;
}