import Image from "next/image";

import DbConnect from "@/config/dbConfig";
import { useEffect } from "react";

export default function Home() {


  useEffect(()=>{

    DbConnect();

    
  },[]);

  return (

    <div>

        <h1>helllow world dugdiug </h1>

    </div>
  );
}







