import renderHTML from "react-render-html";
import moment from "moment";
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";
import Image from "rc-image"
const PostList = ({ posts,handledelete,handlelike,handlecomment }) => {
    const [state,setState]=useContext(UserContext)
    const router=useRouter()
return (
<>
{posts &&
posts.map((post) => (
<div key={post._id} className="mb-5 my-24">
<div className="flex items-center">
<div className="flex-shrink-0">
<div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-400 text-white">
{post.postedBy.name[0]}
</div>
</div>
<div className="ml-3">
<div className="font-medium text-gray-900">{post.postedBy.name}</div>
<div className="text-gray-500 text-sm">
{moment(post.createdAt).fromNow()}
</div>
</div>
</div>
<div className="mt-2">{renderHTML(post.content)}</div>
{post.image && (
<div
style={{
backgroundImage: "url("+post.image.url+")",
backgroundRepeat: "no-repeat",
backgroundPosition: "center center",
backgroundSize: "cover",
height: "500px",
width:"600px"
}}
></div>
)}
<div className="mt-2 flex justify-between text-gray-500 text-sm">
<div className="flex items-center">
<span class="flex ml-2 space-x-24">
<span className="cursor-pointer" onClick={() => handlelike(post)}>&#x2764;&#xFE0F; {post.likes.length} likes</span>

<span className="cursor-pointer" onClick={() => handlecomment(post)}>&#x1F4AC; {post.comments.length} comments</span>

  {state && state.user && state.user._id===post.postedBy._id&&(
    <>
<span className="cursor-pointer" onClick={() => router.push(`/${post._id}`)} style={{ color: 'blue', backgroundColor: 'white', borderRadius: '5px', padding: '5px' }}>&#x270E;Edit</span>

<span className="cursor-pointer" onClick={() => handledelete(post)} style={{ color: 'blue', backgroundColor: 'white', borderRadius: '5px', padding: '5px' }}>&#x1F5D1;Delete</span>

    </>
  )}
  
  
</span>
</div>
</div>
{post.comments && post.comments.length>0 &&(
  <ul className="divide-y divide-gray-200">
    <h4>Comments</h4>
    {post.comments
      .sort((a, b) => new Date(b.created) - new Date(a.created)) // sort by created time
      .map((c) => (
        <li key={c.id} className="py-4 flex">
          <div className="rounded-full bg-gray-200 h-10 w-10 flex items-center justify-center">
            <span className="font-medium text-gray-600">{c.postedbyname[0]}</span>
          </div>
          <div className="ml-3">
            <div className="flex space-x-3">
              <h4 className="text-lg leading-6 font-medium text-gray-900">{c.postedbyname}</h4>
              <p className="text-gray-500 text-md">{moment(c.created).fromNow()}</p>
            </div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{c.text}</p>
          </div>
        </li>
      ))}
  </ul>
)}

</div>
))}
</>
);
};

export default PostList;