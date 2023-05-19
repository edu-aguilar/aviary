"use client";

import axios from "axios";
import CreateBird from "./components/CreateBird";
import { Bird } from "./entities/Bird";

export default function Home() {
  const onCreateBird = async (bird: Bird) => {
    console.log("onCreateBirdApi");

    try {
      await axios.post("/api/birds", bird);
      console.log("bird Created");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-2xl">Aviary</h1>
      <h3>Create Bird</h3>
      <CreateBird onCreateBird={onCreateBird}></CreateBird>
    </>
  );
}
