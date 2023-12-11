import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { Link, useNavigate } from "react-router-dom";

function RuasJalan() {
  const store = useUserStore();
  const navigate = useNavigate();
  const [dataAllPerUser, setDataAllPerUser] = useState(null);

  const fetchDataPerUser = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/ruasjalan",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      setDataAllPerUser(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataPerUser();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`https://gisapis.manpits.xyz/api/ruasjalan/${id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${store.userToken}`,
        },
      });

      // Remove the deleted item from the state
      setDataAllPerUser((prevData) => ({
        ...prevData,
        ruasjalan: prevData.ruasjalan.filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="px-[40px] text-xs flex justify-start flex-col items-center gap-[60px] w-full h-screen">
        {/* Log data proses */}
        <div className="flex flex-row items-center w-full justify-between">
          <h1 className="font-bold text-xl">Ruas Jalan</h1>
          <Link to="/dashboard/tambah" className="btn btn-primary">
            + Tambah
          </Link>
        </div>
        <div className="flex flex-col gap-[32px] items-center relative z-30 w-full h-[500px]">
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra table-pin-rows table-pin-cols">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>desa_id</th>
                  <th>kode_ruas</th>
                  <th>nama_ruas</th>
                  <th>keterangan</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {dataAllPerUser?.ruasjalan.map((item, key) => (
                  <tr>
                    <th>{key + 1}</th>
                    <th>{item.desa_id}</th>
                    <td>{item.kode_ruas}</td>
                    <td>{item.nama_ruas}</td>
                    <td>{item.keterangan}</td>
                    {/* <td>{item.kecamatan}</td> */}
                    <td className="flex flex-row gap-2">
                      <button
                        onClick={() => {
                          store.updateIdRuas(item.id);
                          navigate("/dashboard/edit");
                        }}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)} // Pass a function reference
                        className="btn btn-error"
                      >
                        Hapus
                      </button>
                    </td>
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

export default RuasJalan;
