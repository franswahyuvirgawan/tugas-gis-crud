import axios from "axios";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import useUserStore from "../store/userStore";

function TotalDataPerUser({ apiPerUser }) {
  const store = useUserStore();

  const [dataAllPerUser, setDataAllPerUser] = useState(null);

  const [loadingPerUser, setLoadingPerUser] = useState < boolean > false;

  const fetchDataPerUser = async () => {
    setLoadingPerUser(true);
    try {
      const response = await axios.get(apiPerUser, {
        headers: {
          Authorization: `Bearer ${store.userToken}`, // Replace YOUR_TOKEN_HERE with your actual Bearer token
        },
      });
      setDataAllPerUser(response.data);
      setLoadingPerUser(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataPerUser();
  }, [apiPerUser]);

  return (
    <>
      <div className="px-[40px] text-xs flex justify-center flex-col items-center gap-[60px]">
        {/* Log data all user */}
        <h1 className="lg:text-4xl text-2xl font-bold text-center">
          Log perhitungan jumlah total per user
        </h1>
        <div className="flex flex-col w-[320px] lg:w-[800px] gap-[32px] items-center relative z-30">
          <div className="flex flex-row gap-2 items-center">
            <button
              disabled={loadingPerUser ? true : false}
              className="btn btn-xs p-5 btn-primary flex flex-col items-center"
              onClick={() => fetchDataPerUser()}
            >
              {loadingPerUser ? (
                <div className="w-ful flex flex-row gap-2 items-center">
                  <span className="text-white loading loading-spinner loading-xs"></span>{" "}
                  Reload
                </div>
              ) : (
                <div className="w-ful flex flex-row gap-2 items-center">
                  Reload
                </div>
              )}
            </button>
          </div>

          <div className="relative z-0 overflow-x-auto lg:w-[800px] w-full h-[280px] lg:h-[500px] gap-[26px]">
            <table className="table table-pin-rows table-pin-cols table-zebra table-xs lg:table-md text-center">
              <thead>
                <tr>
                  <th>No</th>
                  <th>NIM</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="w-full">
                {loadingPerUser ? (
                  <tr>
                    <td colSpan={5}>
                      <div className="w-full flex flex-row justify-center py-40">
                        <PuffLoader
                          color="#fff"
                          // loading={loading}
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {dataAllPerUser?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.nim}</td>
                        <td>{item.count}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default TotalDataPerUser;
