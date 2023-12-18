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
          <h1 className="text-xl font-bold">Selamat Datang</h1>
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
