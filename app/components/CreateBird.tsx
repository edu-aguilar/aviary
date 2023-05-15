"use client";

import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import React, { useState } from "react";
import { Bird } from "../entities/Bird";

interface CreateBirdProps {
  onCreateBird: (bird: Bird) => void;
}

const CreateBird: React.FC<CreateBirdProps> = ({onCreateBird}) => {

  const [name, setName] = useState<string>();
  const [bornAt, setBornAt] = useState<Date>();

  const createBird = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();
    onCreateBird({
      name: name ?? "",
      bornAt: bornAt as Date,
    })
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={createBird}>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="name"
            value="bird name"
          />
        </div>
        <TextInput
          id="name"
          type="text"
          required={true}
          onChange={(event) => {setName(event.target.value)}}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="bornDate"
          />
        </div>
        <TextInput
          id="bornDate"
          type="date"
          required={true}
          onChange={(event) => {setBornAt(new Date(event.target.value))}}
        />
      </div>
      <Button type="submit">
        Create Bird
      </Button>
    </form>
  )
}


export default CreateBird;
