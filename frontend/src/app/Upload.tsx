"use client";

import { axiosClassic } from "@/api/interceptors";
import axios from "axios";
import { useState } from "react";

export default function FileUpload() {
  const [category, setCategory] = useState({ image: "", name: "" });

  const handleImageChange = (e) => {
    setCategory({ ...category, image: e.target.files[0] });
  };
  const handleNameChange = (e) => {
    setCategory({ ...category, name: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", category.image);
    formData.append("name", category.name);
    try {
      axiosClassic
        .post("/category", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (resp) {
          console.log(resp);
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
    console.log(category);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="название категории"
        value={category.name}
        onChange={handleNameChange}
      />
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Upload</button>
    </form>
  );
}
