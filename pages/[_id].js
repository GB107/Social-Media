import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import 'react-quill/dist/quill.snow.css';
import { UserContext } from "../context";
import { useContext } from "react";
import Image from "rc-image";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const Editpost = () => {
  const router = useRouter();
  const _id = router.query._id;
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [state, setState] = useContext(UserContext);
  const [image, setImage] = useState('');
  
  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);
  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/editpost?user=${_id}`);
      console.log(data);
      setPost(data);
      setImage(data.image);
      setContent(data.content);
    } catch(err) {
      console.log(err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API}/updatepost?user=${_id}`, {
        content: content,
        image: image,
      });
      
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post updated");
        router.push("/dashboard");
      }
    } catch(err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    console.log({...formData});
    
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/uploadimg`, formData);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      console.log(data);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div style={{width:"1550px"}}>
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
          <input onChange={handleImage} type="file" accept="images/*" hidden />
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
            <button type="submit"className="my-24 text-white text-md bg-blue-600 w-16 h-7 rounded-lg ml-5 ">
              Post
            </button>
          </li>
        </form> 
      </div>
    </div>
  );
};

export default Editpost;
