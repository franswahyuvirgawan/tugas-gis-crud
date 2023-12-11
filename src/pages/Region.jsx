import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";

function Region() {
  const store = useUserStore();
  const [dataAllRegion, setDataAllRegion] = useState(null);

  const fetchDataPerUser = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mregion",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`, // Replace YOUR_TOKEN_HERE with your actual Bearer token
          },
        }
      );
      setDataAllRegion(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataPerUser();
  }, []);

  return (
    <>
      <div className="px-[40px] text-xs flex justify-center flex-col items-center gap-[120px]">
        {/* Log data proses */}
        <div className="flex flex-col gap-[60px] w-full">
          <h1 className="lg:text-4xl text-2xl font-bold text-center">
            Data Provinsi
          </h1>
          <div className="flex flex-col gap-[32px] items-center relative z-30 w-full">
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>provinsi</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {dataAllRegion?.provinsi.map((item) => (
                    <tr>
                      <th>{item.id}</th>
                      <td>{item.provinsi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[60px] w-full">
          <h1 className="lg:text-4xl text-2xl font-bold text-center">
            Data kabupaten
          </h1>
          <div className="flex flex-col gap-[32px] items-center relative z-30 w-full h-[500px]">
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>prov_id</th>
                    <th>kabupaten</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {dataAllRegion?.kabupaten.map((item) => (
                    <tr>
                      <th>{item.id}</th>
                      <th>{item.prov_id}</th>
                      <td>{item.kabupaten}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[60px] w-full">
          <h1 className="lg:text-4xl text-2xl font-bold text-center">
            Data kecamatan
          </h1>
          <div className="flex flex-col gap-[32px] items-center relative z-30 w-full h-[500px]">
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>kab_id</th>
                    <th>kecamatan</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {dataAllRegion?.kecamatan.map((item) => (
                    <tr>
                      <th>{item.id}</th>
                      <th>{item.kab_id}</th>
                      <td>{item.kecamatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[60px] w-full">
          <h1 className="lg:text-4xl text-2xl font-bold text-center">
            Data desa
          </h1>
          <div className="flex flex-col gap-[32px] items-center relative z-30 w-full h-[500px]">
            <div className="overflow-x-auto w-full">
              <table className="table table-zebra table-pin-rows table-pin-cols">
                {/* head */}
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>kec_id</th>
                    <th>desa</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {dataAllRegion?.desa.map((item) => (
                    <tr>
                      <th>{item.id}</th>
                      <th>{item.kec_id}</th>
                      <td>{item.desa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Region;
