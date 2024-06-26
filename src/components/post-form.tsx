import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { auth, db, storage } from "../routes/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Form = styled.form`
display:flex;
flex-direction:column;
gap:10px;
`;
const TextArea = styled.textarea`
border:3px solid white;
padding:24px;
border-radius:10px;
font-size:18px;
width:100%;
resize:none;
&::placeholder{
    font-size:18px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
};
&:focus{
    outline:none;
    border-color:peru;
}

`;
const Row = styled.div`
display:flex;
flex-direction:row;
justify-content: flex-end;
gap:10px;
`;
const AttachFileBtn = styled.label`
font-size:44px;
display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color:peru;
  border-radius: 5px;
`;
const AttachFileInput = styled.input`
display:none;
`;
const SubmitBtn = styled.input`
background-color:peru;
color:white;
border:none;
border-radius:10px;
font-size:16px;
cursor:pointer;
&:hover,&:active{
    opacity:0.9;
}
`;
export default function PostForm(){
    const [post,setPost]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const [file,setFile]=useState<File|null>(null);
    const onChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setPost(e.target.value);
    };
    const onFileChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {files}=e.target;
        if(files&&files.length===1)
            setFile(files[0]);

    };

    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const user=auth.currentUser;
        if(!user||isLoading||post===""||post.length>500)return;
        try{
            setIsLoading(true);
            const doc=await addDoc(collection(db,"posts"),{
                post,
                createdAt:Date.now(),
                username:user.displayName||"Anonymous",
                userId:user.uid,
            });
            if(file){
                // 이미지 파일이 어디에 저장되는지 지정할 수 있음
                const locationRef=ref(storage,`posts/${user.uid}/${doc.id}`);
                const result=await uploadBytes(locationRef,file);
                const url=await getDownloadURL(result.ref) //result의 퍼블릭 URL을 가져옴
                await updateDoc(doc,{
                    photo:url
                })

            }
            setPost("");
            setFile(null);
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false);
        }
    }

    return <Form onSubmit={onSubmit}>
        <TextArea value={post} rows={8} maxLength={500} onChange={onChange} placeholder="What is happening!?" required/>
        <Row>
        <AttachFileBtn htmlFor="file">
            {file?"✅":"🖼️"}
        </AttachFileBtn>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>
        <SubmitBtn type="submit" value="Post now!"/>
        </Row>
    </Form>
}
