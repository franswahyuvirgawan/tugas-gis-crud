import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { PuffLoader } from "react-spinners";

function Region() {
  const store = useUserStore();
  const [dataAllRegion, setDataAllRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDataPerUser = async () => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataPerUser();
  }, []);

  console.log(loading);

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
                    <th className="text-center">Id</th>
                    <th className="text-center">provinsi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={2}>
                        <div className="w-full flex flex-row justify-center py-5">
                          <PuffLoader color="#fff" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {dataAllRegion?.provinsi.map((item, key) => (
                        <tr key={key}>
                          <th className="text-center">{item.id}</th>
                          <td className="text-center">{item.provinsi}</td>
                        </tr>
                      ))}
                    </>
                  )}
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
                    <th className="text-center">Id</th>
                    <th className="text-center">prov_id</th>
                    <th className="text-center">kabupaten</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="w-full flex flex-row justify-center py-20">
                          <PuffLoader color="#fff" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {dataAllRegion?.kabupaten.map((item, key) => (
                        <tr key={key}>
                          <th className="text-center">{item.id}</th>
                          <th className="text-center">{item.prov_id}</th>
                          <td className="text-center">{item.kabupaten}</td>
                        </tr>
                      ))}
                    </>
                  )}
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
                    <th className="text-center">Id</th>
                    <th className="text-center">kab_id</th>
                    <th className="text-center">kecamatan</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="w-full flex flex-row justify-center py-20">
                          <PuffLoader color="#fff" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {dataAllRegion?.kecamatan.map((item, key) => (
                        <tr key={key}>
                          <th className="text-center">{item.id}</th>
                          <th className="text-center">{item.kab_id}</th>
                          <td className="text-center">{item.kecamatan}</td>
                        </tr>
                      ))}
                    </>
                  )}
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
                    <th className="text-center">Id</th>
                    <th className="text-center">kec_id</th>
                    <th className="text-center">desa</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={3}>
                        <div className="w-full flex flex-row justify-center py-20">
                          <PuffLoader color="#fff" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {dataAllRegion?.desa.map((item, key) => (
                        <tr key={key}>
                          <th className="text-center">{item.id}</th>
                          <th className="text-center">{item.kec_id}</th>
                          <td className="text-center">{item.desa}</td>
                        </tr>
                      ))}
                    </>
                  )}
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
