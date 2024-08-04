"use client";

import { authService } from "@/services/auth.service";
import { IAuthForm, ICategory, ICategoryImage } from "@/types/auth.types";
import { useState } from "react";

export function Auth() {
  const [categories, setCategories] = useState<ICategory[]>();

  const login = (data: IAuthForm) => {
    authService.main("login", data);
  };
  const logout = () => {
    authService.logout();
  };
  const getAll = () => {
    authService.getAllAdmin();
  };
  const getCategory = async () => {
    const res = await authService.getCategory();
    setCategories(res.data);
    console.log(categories);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 20, padding: 20 }}
    >
      <div style={{ display: "flex", gap: 20, padding: 20 }}>
        <button
          onClick={() =>
            login({ email: "siniyfilin@yandex.ru", password: "superadmin777" })
          }
        >
          login
        </button>
        <button onClick={() => logout()}>logout</button>
        <button onClick={() => getAll()}>getAllAdmin</button>
        <button onClick={() => getCategory()}>getCategory</button>
      </div>
      {/* {categories &&
        categories.map((i) => (
          <div key={i.id}>
            <span>{i.name}</span>
            <span>
              <div>
                <div>{i.image.filename}</div>
                <div>{i.image.mimetype}</div>
              </div>
            </span>
          </div>
        ))} */}
    </div>
  );
}
