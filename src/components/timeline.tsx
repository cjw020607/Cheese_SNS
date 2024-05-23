import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../routes/firebase";
import Post from "./post";
import { Unsubscribe } from "firebase/auth";

export interface IPost{
    id:string;
    photo?:string;
    post:string;
    userId:string;
    username:string;
    createdAt:number;
}

const Wrapper=styled.div`
display:grid;
// flex-direction:column;
overflow-y:scroll;
// gap:10px;

`;

export default function Timeline(){
    const [posts,setPost]=useState<IPost[]>([]); 
    useEffect(()=>{
        let unsubscribe : Unsubscribe|null=null;
        const fetchPosts=async()=>{
            const postsQuery=query(
                collection(db,"posts"),
                orderBy("createdAt","desc"),
                limit(25)
            );
            // const snapshot=await getDocs(postsQuery);
            // const posts=snapshot.docs.map(doc=>{
            //     const {post,createdAt,userId,username,photo}=doc.data();
            //     return{
            //         post,createdAt,userId,username,photo,id:doc.id,
            //     }
            // });
            // setPost(posts);
    
            unsubscribe=await onSnapshot(postsQuery,(snapshot)=>{
                const posts= snapshot.docs.map(doc=>{
                        const {post,createdAt,userId,username,photo}=doc.data();
                        return{
                            post,createdAt,userId,username,photo,id:doc.id,
                        }
                    });
                setPost(posts);
            })
        }
        fetchPosts();
        return ()=>{
            unsubscribe&&unsubscribe();
        
        }
    },[])
    return <Wrapper>
        {/* {JSON.stringify(posts)} */}
        {posts.map(post=><Post key={post.id}{...post}/>)}
    </Wrapper>;
}