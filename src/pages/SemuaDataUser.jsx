"use client";
import useUserStore from "../store/userStore";
import { useEffect, useState } from "react";

function SemuaDataUSer() {
  const state = useUserStore();
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://gisapis.manpits.xyz/api/user", {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${state.userToken}`,
          },
        });
        // console.log(res);
        const data = await res.json();
        setData(data?.data?.user);
        // if (res.ok) {
        //   state.updateToken("");
        // } else {
        //   console.log("Oops! Something is wrong.");
        // }
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
        <p className="text-4xl font-bold">Halo : {data?.name}</p>
        <p className="text-4xl font-bold">{data?.email}</p>
      </div>
    </>
  );
}

export default SemuaDataUSer;
