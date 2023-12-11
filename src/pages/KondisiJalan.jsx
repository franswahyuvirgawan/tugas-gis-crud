import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";

function KondisiJalan() {
  const store = useUserStore();
  const [dataAllKondisiJalan, setDataAllKondisiJalan] = useState(null);

  const fetchDataKondisiJalan = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mkondisi",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`, // Replace YOUR_TOKEN_HERE with your actual Bearer token
          },
        }
      );
      setDataAllKondisiJalan(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataKondisiJalan();
  }, []);

  return (
    <>
      <div className="px-[40px] text-xs flex justify-start flex-col items-center gap-[60px] h-screen">
        {/* Log data proses */}
        <h1 className="lg:text-4xl text-2xl font-bold text-center">
          Data Kondisi Jalan
        </h1>
        <div className="flex flex-col gap-[32px] items-center relative z-30 w-full">
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Kondisi Jalan</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {dataAllKondisiJalan?.eksisting.map((item) => (
                  <tr>
                    <th>{item.id}</th>
                    <td>{item.kondisi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default KondisiJalan;
