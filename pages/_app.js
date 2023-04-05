import '../styles/globals.css'
import "../public/css/App.css"
import Head from 'next/head'
import Nav from '../components/navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '../context';


export default function App({ Component, pageProps }) {
  return (
  <UserProvider>
     <Nav/>
     <Component {...pageProps} />
     <ToastContainer position='top-center'/>
  </UserProvider> 
  
)
}
