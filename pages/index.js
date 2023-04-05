import Link from "next/link";
import { UserContext } from "../context";
import { useContext } from "react";
const Home =()=>{
  const [state,setState]=useContext(UserContext)
  return(
     <div>
  <main className="px-4 py-6" style={{width:"1550px"}}>
    <section className="mx-auto max-w-lg">
      <h2 className="font-bold text-xl mb-4">Welcome to Social Network!</h2>
      <p className="text-gray-700">Connect with friends and share your thoughts and experiences.</p>
    </section>
    <section className="mx-auto max-w-lg mt-6">
      <h2 className="font-bold text-xl mb-4">Trending Posts</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2"></div>
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maec
          </p></div></div></section></main></div>

  )
}
export default Home;