import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Daftar = () => {
  const store = useUserStore();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(store);

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();

    setErrors({});

    const inputErrors = {};
    if (!store.newName) {
      inputErrors.newName = "Silahkan isi nama";
    }
    if (!store.newEmail) {
      inputErrors.newEmail = "Silahkan isi email";
    }
    if (!store.newPassword) {
      inputErrors.newPassword = "Silahkan isi password";
    }

    if (Object.keys(inputErrors).length > 0) {
      toast.error("Harap perhatikan form");
      setErrors(inputErrors);
      setLoading(false);
      return;
    }

    const data = {
      name: store.newName,
      email: store.newEmail,
      password: store.newPassword,
    };

    try {
      const res = await axios.post(
        "https://gisapis.manpits.xyz/api/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      if (res.data.meta.message == "Successfully create user") {
        navigate("/login");
      } else {
        toast.error(res.data.meta.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        loading ? "h-screen" : ""
      } text-xs flex justify-center flex-col items-center gap-[100px]`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      {loading && (
        <div className="w-full absolute flex flex-row items-center justify-center bg-[#1D232A] h-screen bg-opacity-90">
          <PuffLoader color="#fff" />
        </div>
      )}
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-[16px] h-screen justify-center items-center w-full md:w-[400px] px-[70px]"
      >
        <h1 className="lg:text-4xl text-2xl font-bold">Daftar Akun</h1>
        <div className="flex flex-col gap-2 w-full">
          <input
            value={store.newName}
            onChange={(e) => store.updateNewName(e.target.value)}
            type="text"
            placeholder="Masukkan Nama"
            className="input input-xs h-11 input-bordered lg:w-full w-full"
          />
          {errors?.newName && (
            <p className="px-2 text-red-500 text-xs">{errors?.newName}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <input
            value={store.newEmail}
            onChange={(e) => store.updateNewEmail(e.target.value)}
            type="text"
            placeholder="Masukkan Email"
            className="input input-xs h-11 input-bordered lg:w-full w-full"
          />
          {errors?.newEmail && (
            <p className="px-2 text-red-500 text-xs">{errors?.newEmail}</p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full">
          <input
            type="password"
            value={store.newPassword}
            onChange={(e) => store.updatenewPassword(e.target.value)}
            placeholder="Masukkan Password"
            className="input input-xs h-11 input-bordered lg:w-full w-full"
          />
          {errors?.newPassword && (
            <p className="px-2 text-red-500 text-xs">{errors?.newPassword}</p>
          )}
        </div>
        <button className="w-full btn btn-xs p-5 btn-primary flex flex-col items-center">
          Daftar
        </button>
        <p>
          Sudah punya akun?{" "}
          <Link className="text-blue-500 underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Daftar;
