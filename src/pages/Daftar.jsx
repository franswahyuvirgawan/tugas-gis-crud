import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Daftar = () => {
  const store = useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      name: store.newName,
      email: store.newEmail,
      password: store.newPassword,
    };
    try {
      await axios.post("https://gisapis.manpits.xyz/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Sign up berhasil!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.msg);
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
        <input
          value={store.newName}
          onChange={(e) => store.updateNewName(e.target.value)}
          type="text"
          placeholder="Masukkan Nama"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
        <input
          value={store.newEmail}
          onChange={(e) => store.updateNewEmail(e.target.value)}
          type="text"
          placeholder="Masukkan Email"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
        <input
          type="password"
          value={store.newPassword}
          onChange={(e) => store.updatenewPassword(e.target.value)}
          placeholder="Masukkan Password"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
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
