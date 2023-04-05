import { useContext, useState } from "react";
import { UserContext } from "../context";
import { useEffect } from "react";
import Image from "rc-image";
import { useRouter } from "next/router";
import axios from "axios";

const Profile = () => {
  const router = useRouter();
  const [state, setState] = useContext(UserContext);
  const [image,setImage]=useState("");
  const [post,setPost]=useState("")
  
  const [showPopup, setShowPopup] = useState(false);
  const [bio, setBio] = useState('');
  // const[newid,setNewid]=useState('')

  const handlebio = () => {
    //  setNewid(post._id);
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
    setComment('');
  };

  const handleSave = async() => {
    setShowPopup(false);
    setBio('');
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/updatebio`, {
        bio: bio,
        user: state.user._id
      });
      toast.success(data)
      await fetchuserdata();
    } catch (error) {
      // handle error
    }
  };
  
const biocancel=()=>{
  setShowPopup(false);

}
const [newbio,setNewbio]=useState('');
const fetchuserdata=async()=>{
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/getbio?user=${state.user._id}`);
setBio(data);
console.log(newbio)
}

  // const handleSubmit=async()=>{

  //   try{
  //     const {data}=await axios.put(`${process.env.NEXT_PUBLIC_API}/postprofile`,
  //   {
  //     user:state.user._id,
  //     image:image,
  //   })

  //   if(data.success){
    
  //     toast.success("Profile updated Sucessfully")
  //     fetchuserdata();
  //   }
  //   }
  //   catch(err){
  //   console.log(err);
  //   }
  //   }
  // const fetchuserdata=async()=>{
  //   try{
  //     const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/getprofile?user=${state.user._id}`);
  //     setPost(data)
  //   //  console.log(data)
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }
 
  
  // const handleimage=async(e)=>{
  //    const file=e.target.files[0];
  //       let formData= new FormData();
  //       formData.append("image",file)
  //       console.log({...formData})
  //       try{
  //         const {data}=await axios.post(`${process.env.NEXT_PUBLIC_API}/profilepic`,formData)
  // setImage({
  //   url:data.url,
  //   public_id:data.public_id,
  // })
  //         console.log(data)
  //       }
  //       catch(err){
  //       console.log(err);
  //       }
  //         }
  useEffect(()=>{if(state && state.token){
    fetchuserdata()
    // findpeople()
    
  }
  },[state && state.token])
          
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
      />
      <link
        rel="stylesheet"
        href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
      />
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                  <div 
                      className="rounded-full bg-gray-400 w-32 h-32 flex items-center justify-center text-white font-bold text-5xl">
                       {state?.user?.name?.[0]}
                          </div>

                  </div>
                </div>
                <div className="w-full px-4 text-center mt-4">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {state?.user?.followers?.length ?? 0}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Followers
                      </span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        {state?.user?.following?.length ?? 0}
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Following
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {state?.user?.name ?? ""}
                </h3>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                  <span className="text-sm text-blueGray-400">
                        {bio}
                      </span>
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      <button onClick={handlebio} className="bg-blue-500 text-white py-2 px-4 rounded">Update Bio</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
                  placeholder="Update Your bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={biocancel}
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
  );
};

export default Profile
