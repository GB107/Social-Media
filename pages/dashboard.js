import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic"
import Image from "rc-image"
const ReactQuill=dynamic(()=> import("react-quill"),{ssr:false})
import { UserContext } from "../context";
import { useContext } from "react";
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";
import PostList from "../components/posts";
import Router, { useRouter } from "next/router";
const dashboard=()=>{
  const router=useRouter()
  const [state,setState]=useContext(UserContext)
const [content,setContent]=useState('')
const [image,setImage]=useState('')
const [post,setPost]=useState('')

const fetchuserdata=async()=>{
  try{
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/userpost?user=${state.user._id}`);
    setPost(data)
   console.log(post)
  }
  catch(err){
    console.log(err)
  }
}
const [people, setPeople] = useState([]);

const findpeople = async () => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/findpeople`, {
      params: {
        user: state.user._id
      }
    });  
    setPeople(data);
  } catch (err) {
    toast.error(err);
  }
}

useEffect(()=>{if(state && state.token){
  fetchuserdata(),
  findpeople()
  
}
},[state && state.token])
const handleSubmit=async(e)=>{
e.preventDefault();
try{
  const {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/post`,
{
  content:content,
  user:state.user._id,
  image:image,
})

if(data.error){
  toast.error("Content is Required")
}
if(data.success){

  toast.success("Post Created Sucessfully")
  fetchuserdata();
}
}
catch(err){
console.log(err);
}
}
const handleimage=async(e)=>{
 
  const file=e.target.files[0];
  let formData= new FormData();
  formData.append("image",file)
  console.log({...formData})
  try{
    const {data}=await axios.put(`${process.env.NEXT_PUBLIC_API}/uploadimg`,formData)
    setImage({
      url:data.url,
      public_id:data.public_id,
    })
    console.log(data)
  }
catch(err){
  console.log(err);
}
}
const handledelete=async(post)=>{
  try{
const answer=window.confirm("Are u Sure??");
// console.log(post._id)
if(!answer) return;
const {data}=await axios.delete(`${process.env.NEXT_PUBLIC_API}/deletepost/${post._id}`)
toast.error("Post Deleted");
fetchuserdata()
  }
  catch(err){
    console.log(err)
  }
}
const handlelike=async(post)=>{
  const {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/likepost/${post._id}`,{user:state.user._id})
  toast.success(data);
  fetchuserdata()


}
const [showPopup, setShowPopup] = useState(false);
  const [comment, setComment] = useState('');
  const[newid,setNewid]=useState('')

  const handlecomment = (post) => {
     setNewid(post._id);
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setComment('');
  };

  const handleSave = async() => {
    setShowPopup(false);
    setComment('');
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/commentpost`, {
        post: newid,
        content: comment,
        user: state.user._id
      });
      toast.success(data)
      await fetchuserdata();
    } catch (error) {
      // handle error
    }
  };
  
const commentcancel=()=>{
  setShowPopup(false);

}
const handlefollow=async (user)=>{
  try{const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API}/follow`, {
    user:state.user._id,
  people:user})
 let auth=JSON.parse(localStorage.getItem('auth'));
 auth.user=data;
 localStorage.setItem("auth",JSON.stringify(auth))
    // console.log(data)
    toast.success("Followed Sucessfully")
     fetchuserdata();

  }

    catch(err){
      toast.error(err);
    }
}
return (
  
  <div style={{ width: "1350px" }}>
    <div className="my-12 ml-96">
      {image && (
        <Image
          src={image.url}
          width={50}
          height={50}
          className="rounded-full"
          alt="Uploaded image"
        />
      )}
      <label className="text-white text-md bg-blue-600 rounded-md px-1 py-1">
        Upload Image
        <input onChange={handleimage} type="file" accept="images/*" hidden />
      </label>
      <form onSubmit={handleSubmit}>
        <li type="none">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={(e) => setContent(e)}
            className="w-3/4 h-32"
            placeholder="Write something....."
          />
        </li>
        <li type="none">
          <button
            type="submit"
            className="my-24 text-white text-md bg-blue-600 w-16 h-7 rounded-lg ml-5"
          >
            Post
          </button>
        </li>
      </form>
    </div>
    <div className="flex justify-center -my-32">
      <div>
        <PostList
          posts={post}
          handledelete={handledelete}
          handlelike={handlelike}
          handlecomment={handlecomment}
        />
      </div>
    </div>
    <div>
      {showPopup && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              ​
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <textarea
                  className="resize-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={commentcancel}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  cancel
                </button>
                <button
                  onClick={handleSave}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <div className="w-96 fixed top-8 right-0 pt-10 pl-6 ">
  <div className="w-full">
  <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="w-full p-6">
      <h3 className="font-bold mb-2">Suggestions</h3>
    </div>
    <div className="w-full flex flex-col px-6 pb-6">
      {people.map((person) => (
        <div key={person.id} className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold mr-2">
              {person.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold">{person.name}</p>
              <p className="text-gray-500">{person.bio}</p>
            </div>
          </div>
          <button onClick={()=>handlefollow(person._id)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">Follow</button>
        </div>
      ))}
    </div>
  </div>
</div>

</div>


    
  </div>
);

}
export default dashboard;
