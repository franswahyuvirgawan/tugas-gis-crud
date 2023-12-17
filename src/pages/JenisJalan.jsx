import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { PuffLoader } from "react-spinners";

function JenisJalan() {
  const store = useUserStore();
  const [loading, setLoading] = useState(true);
  const [dataAllJenisJalan, setDataAllJenisJalan] = useState(null);

  const fetchDataJenisJalan = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mjenisjalan",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`, // Replace YOUR_TOKEN_HERE with your actual Bearer token
          },
        }
      );
      setDataAllJenisJalan(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataJenisJalan();
  }, []);

  return (
    <>
      <div className="px-[40px] text-xs flex justify-start flex-col items-center gap-[60px] h-screen">
        {/* Log data proses */}
        <h1 className="lg:text-4xl text-2xl font-bold text-center">
          Data Jenis Jalan
        </h1>
        <div className="flex flex-col gap-[32px] items-center relative z-30 w-full">
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-center">Id</th>
                  <th className="text-center">Jenis Jalan</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={2}>
                      <div className="w-full flex flex-row justify-center py-20">
                        <PuffLoader color="#fff" />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {dataAllJenisJalan?.eksisting.map((item) => (
                      <tr>
                        <th className="text-center">{item.id}</th>
                        <td className="text-center">{item.jenisjalan}</td>
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

export default JenisJalan;
