import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
display:grid;
grid-template-rows:3fr 1fr;
gap:10px;
`;
const TextArea = styled.textarea`
border:2px solid white;
padding:20px;
border-radius:10px;
font-size:16px;
width:100%;
resize:none;
&::placeholder{
    font-size:16px;
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
export default function PostTweetForm(){
    const [tweet,setTweet]=useState("");
    const [isLoading,setIsLoading]=useState(false);
    const [file,setFile]=useState<File|null>(null);
    const onChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setTweet(e.target.value);
    };
    const onFileChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const {files}=e.target;
        if(files&&files.length===1)
            setFile(files[0]);

    };
    return <Form>
        <TextArea maxLength={1000} onChange={onChange} placeholder="What is happening!?"/>
        <Row>
        <AttachFileBtn htmlFor="file">
            {file?"✅":"🖼️"}
{/* //         <svg fill="none" strokeWidth={1.5} stroke="sandybrown" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
//   <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
// </svg> */}
        </AttachFileBtn>
        <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*"/>
        <SubmitBtn type="submit" value="Post Tweet"/>
        </Row>
    </Form>
}
