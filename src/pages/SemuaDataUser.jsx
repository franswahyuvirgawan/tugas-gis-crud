"use client";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

function SemuaDataUSer() {
  const state = useUserStore();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      try {
        const res = await fetch("https://gisapis.manpits.xyz/api/user", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
        });
        const data = await res.json();
        setData(data?.data?.user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  console.log(data);
  return (
    <>
      <div className="px-[40px] text-xs flex justify-center flex-col items-center gap-[60px]">
        <div className="py-16 px-8 shadow-lg rounded-xl flex flex-col justify-center items-center gap-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-20 h-20"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          {loading ? (
            <div className="w-60 flex flex-row justify-center">
              <PuffLoader color="#fff" />
            </div>
          ) : (
            <div className="overflow-x-auto w-full">
              <table className="table table-pin-rows">
                <tbody>
                  <tr>
                    <th>Nama</th>
                    <td>:</td>
                    <td>{data?.name}</td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>:</td>
                    <td>{data?.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SemuaDataUSer;
