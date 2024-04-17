"use client"

import {connect} from "@/config/dbConfig";
import axios from "axios";

import { useEffect } from "react";

// DbConnect();


export default function Home() {


  async  function  Call(){


    const data = await axios.get("/api/temp");

    console.log(data.data);

  }

  useEffect(() => {

    Call();

  }, [])


  return (

    <div>

        <h1>helllow world cudbhsbvhufvhjfnvjjnjnjnjndugdiug </h1>

    </div>
  );
}








