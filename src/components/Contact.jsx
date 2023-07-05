import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';

export default function Contact({userRef , destination}) {
    const [broker , setBroker] = useState(null);
    const [message , setMessage] = useState("");

    useEffect(()=>{
     async function getBroker() {
        const docRef = doc(db, "users", userRef);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setBroker(docSnap.data())
        }else{
            toast.error("Cant get Broker data")
        }
     }
     getBroker();
    },[userRef]);
   
  return (
    <>
    {broker!== null && (
        <div className='flex flex-col w-full'>  
            <p>Contact {broker.name} for the {destination.name} </p>
            <div className='mt-3 mb-6'>
                <textarea className='w-full px-4 py-2 text-xl 
                text-grey-700 rounded bg-white border border-grey-300 transition 
                duration-150 ease-in-out focus:text-gray-700 focus:bg-white 
                focus:border-slate-600' name="messaage" id="message" row="2" value={message} onChange={(e)=> {setMessage(e.target.value)}}></textarea>
            </div>
            <a href={`mailto:${broker.email}?Subject=${destination.name}&body=${message}`}>
                <button type="button" className='py-3 px-7 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg
                 focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg  transition duration-150 ease-in-out w-full text-center mb-6'>Send Message</button>
            </a>
            </div>
            )}
            </>
  )
}
