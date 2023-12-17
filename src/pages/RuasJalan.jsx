import { useEffect, useState } from "react";
import axios from "axios";
import useUserStore from "../store/userStore";
import { PuffLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

function RuasJalan() {
  const store = useUserStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [dataAllPerUser, setDataAllPerUser] = useState(null);

  const fetchDataPerUser = async () => {
    setLoading(true);
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
      setLoading(false);
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
          <Link to="/tambah" className="btn btn-primary">
            + Tambah
          </Link>
        </div>
        <div className="flex flex-col gap-[32px] items-center relative z-30 w-full h-[500px]">
          <div className="overflow-x-auto w-full">
            <table className="table table-zebra table-pin-rows table-pin-cols">
              {/* head */}
              <thead>
                <tr>
                  <th className="text-center"></th>
                  <th className="text-center">desa_id</th>
                  <th className="text-center">kode_ruas</th>
                  <th className="text-center">nama_ruas</th>
                  <th className="text-center">keterangan</th>
                  <th className="text-center">action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="w-full flex flex-row justify-center py-40">
                        <PuffLoader color="#fff" />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <>
                    {" "}
                    {dataAllPerUser?.ruasjalan.map((item, key) => (
                      <tr>
                        <th className="text-center">{key + 1}</th>
                        <th className="text-center">{item.desa_id}</th>
                        <td className="text-center">{item.kode_ruas}</td>
                        <td className="text-center">{item.nama_ruas}</td>
                        <td className="text-center">{item.keterangan}</td>
                        {/* <td className="text-center">{item.kecamatan}</td> */}
                        <td className="flex flex-row gap-2 items-center justify-center">
                          <button
                            onClick={() => {
                              store.updateIdRuas(item.id);
                              navigate("/edit");
                            }}
                            className="btn btn-warning btn-sm text-xs"
                          >
                            Edit
                          </button>
                          {/* <button
                            onClick={() => handleDelete(item.id)} // Pass a function reference
                            className="btn btn-error btn-sm text-xs"
                          >
                            Hapus
                          </button> */}
                          <button
                            className="btn btn-error btn-sm text-xs"
                            onClick={() =>
                              document.getElementById(item.id).showModal()
                            }
                          >
                            Hapus
                          </button>
                          <dialog id={item.id} className="modal">
                            <div className="px-10 py-10 bg-[#1d232a] rounded-2xl items-center flex flex-col justify-center">
                              <h3 className="font-bold text-lg">
                                Apakah yakin ingin anda hapus?
                              </h3>

                              <div className="modal-action w-full">
                                <form
                                  method="dialog"
                                  className="flex flex-col item-center gap-2 w-full"
                                >
                                  {/* if there is a button in form, it will close the modal */}
                                  <button className="btn btn-outline w-full">
                                    Batal
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="btn btn-error w-full"
                                  >
                                    Hapus
                                  </button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </td>
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

export default RuasJalan;
