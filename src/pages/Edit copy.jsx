import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import useUserStore from "../store/userStore";
import polyline from "polyline-encoded";
import L from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet/dist/leaflet.css";
import { FeatureGroup, MapContainer, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const Edit = () => {
  const store = useUserStore();
  const [dataAllDesa, setDataAllDesa] = useState([]);
  const [dataAllEksistingJalan, setDataAllEksistingJalan] = useState([]);
  const [dataAllKondisiJalan, setDataAllKondisiJalan] = useState([]);
  const [dataAllJenisJalan, setDataAllJenisJalan] = useState([]);
  const [dataAllRuasJalan, setDataAllRuasJalan] = useState([]);

  const fetchDataEksistingJalan = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/meksisting",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`, // Replace YOUR_TOKEN_HERE with your actual Bearer token
          },
        }
      );
      const options = response.data.eksisting.map((item) => ({
        value: item.id,
        label: item.eksisting,
      }));
      setDataAllEksistingJalan(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataDesa = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mregion",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`,
          },
        }
      );
      const options = response.data.desa.map((item) => ({
        value: item.id,
        label: item.desa,
      }));
      setDataAllDesa(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
      const options = response.data.eksisting.map((item) => ({
        value: item.id,
        label: item.kondisi,
      }));
      setDataAllKondisiJalan(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataJenisJalan = async () => {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mjenisjalan",
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`, // Replace YOUR_TOKEN_HERE with your actual Bearer token
          },
        }
      );
      const options = response.data.eksisting.map((item) => ({
        value: item.id,
        label: item.jenisjalan,
      }));
      setDataAllJenisJalan(options);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataRuasJalan = async () => {
    try {
      const response = await axios.get(
        `https://gisapis.manpits.xyz/api/ruasjalan/${store.idRuas}`,
        {
          headers: {
            Authorization: `Bearer ${store.userToken}`, // Replace YOUR_TOKEN_HERE with your actual Bearer token
          },
        }
      );
      setDataAllRuasJalan(response.data.ruasjalan);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataDesa();
    fetchDataEksistingJalan();
    fetchDataKondisiJalan();
    fetchDataJenisJalan();
    fetchDataRuasJalan();
  }, []);

  console.log(dataAllRuasJalan?.paths);

  const featureGroupRef = useRef();
  const [decodePolylines, setDecodePolylines] = useState([]);

  useEffect(() => {
    if (featureGroupRef.current) {
      // Clear existing layers from the feature group
      featureGroupRef.current.clearLayers();
      // Add the decoded polylines back to the map
      const decodedCoords = polyline.decode(dataAllRuasJalan?.paths);
      const polylineLayer = L.polyline(decodedCoords, {
        color: "blue",
      });
      featureGroupRef.current.addLayer(polylineLayer);
      if (Array.isArray(decodedCoords) && decodedCoords.length > 0) {
        setDecodePolylines(decodedCoords[0]);
      }
    }
  }, [dataAllRuasJalan]);

  // useEffect(() => {
  //   // Mengambil data polyline dari endpoint GET
  //   axios
  //     .get("http://localhost:8888/api/polyline.php")
  //     .then((response) => {
  //       // Menyimpan data yang diterima ke dalam state
  //       setEncodedPolylines(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error saat mengambil data polyline:", error);
  //     });
  // }, []);

  // const onCreated = (e) => {
  //   const marker = e.layer;
  //   const coordinates = marker.getLatLngs().map((latLng) => ({
  //     lat: latLng.lat,
  //     lng: latLng.lng,
  //   }));

  //   const encodedPolyline = polyline.encode(
  //     coordinates.map((coord) => [coord.lat, coord.lng])
  //   );

  //   // Generate a unique id for the polyline
  //   const id = Date.now();

  //   // POST request untuk menyimpan id dan encodedPolyline
  //   axios
  //     .post("http://localhost:8888/api/polyline.php", {
  //       id: id,
  //       encoded_polyline: encodedPolyline,
  //     })
  //     .then(() => {
  //       // Setelah permintaan POST berhasil, lakukan permintaan GET
  //       return axios.get("http://localhost:8888/api/polyline.php");
  //     })
  //     .then((response) => {
  //       setEncodedPolylines(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error saat mengambil data polyline:", error);
  //     });
  // };
  // const onEdited = async (e) => {
  //   let storedPolyline = [];
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8888/api/polyline.php"
  //     );
  //     storedPolyline = response.data;
  //   } catch (error) {
  //     console.error("Error saat mengambil data polyline:", error);
  //   }
  //   const editedLayers = e.layers.getLayers();

  //   if (storedPolyline) {
  //     editedLayers.forEach(async (editedPolyline) => {
  //       const id = editedPolyline.options.id;
  //       const editedCoords = editedPolyline.getLatLngs().map((latLng) => ({
  //         lat: latLng.lat,
  //         lng: latLng.lng,
  //       }));
  //       const encodedPolyline = polyline.encode(
  //         editedCoords.map((coord) => [coord.lat, coord.lng])
  //       );

  //       // Temukan indeks polyline yang sesuai dengan ID dalam data yang ada
  //       const index = storedPolyline.findIndex((poly) => poly.id === id);

  //       if (index !== -1) {
  //         const updatedData = {
  //           id: id,
  //           encoded_polyline: encodedPolyline,
  //         };

  //         try {
  //           const response = await axios.put(
  //             `http://localhost:8888/api/polyline.php`,
  //             updatedData
  //           );

  //           if (response.status === 200) {
  //             // Jika permintaan PUT berhasil, perbarui polyline di dalam storedPolyline
  //             storedPolyline[index] = {
  //               id: id,
  //               encoded_polyline: encodedPolyline,
  //             };
  //           }
  //         } catch (error) {
  //           console.error("Error saat mengirim permintaan PUT:", error);
  //         }
  //       } else {
  //         console.error("Polyline dengan ID tidak ditemukan:", id);
  //       }

  //       console.log("Updated Polylines:", storedPolyline);
  //     });

  //     console.log(storedPolyline);

  //     // Jika diperlukan, perbarui state dengan polyline yang sudah diperbarui
  //     // setEncodedPolylines(updatedPolylines);
  //   }
  // };

  // const onDeleted = async () => {
  //   await axios.delete("http://localhost:8888/api/polyline.php").then(() => {
  //     // Setelah berhasil menghapus polyline, perbarui data dari server
  //     axios
  //       .get("http://localhost:8888/api/polyline.php")
  //       .then((response) => {
  //         setEncodedPolylines(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error saat mengambil data polyline:", error);
  //       });
  //   });
  // };

  console.log(decodePolylines[0]);

  return (
    <div
      className={
        "text-xs flex justify-center flex-col items-center gap-[100px]"
      }
    >
      <form className="flex flex-col gap-[20px] h-screen justify-start items-center w-[70%] px-[70px]">
        <h1 className="lg:text-4xl text-2xl font-bold mb-[40px]">
          Edit Ruas Jalan
        </h1>
        <div className="flex justify-center items-center py-[40px] flex-col font-martian text-white gap-[50px]">
          <MapContainer
            className="Map"
            center={{ lat: decodePolylines[0], lng: decodePolylines[1] }}
            zoom={15}
            scrollWheelZoom={true}
            style={{ height: "80vh", width: "1000px", borderRadius: "0px" }}
          >
            <FeatureGroup ref={featureGroupRef}>
              <EditControl
                // onCreated={onCreated}
                // onEdited={onEdited}
                // onDeleted={onDeleted}
                position="topright"
                draw={{
                  rectangle: false,
                  circle: false,
                  circlemarker: false,
                  marker: false,
                  polyline: true,
                  polygon: false,
                }}
              />
            </FeatureGroup>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Desa</label>
          <Select options={dataAllDesa} className="transparent-input" />
        </div>
        <input
          value={dataAllRuasJalan?.kode_ruas}
          // onChange={(e) => store.updateNewEmail(e.target.value)}
          type="text"
          placeholder="Kode Ruas"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
        <input
          value={dataAllRuasJalan?.nama_ruas}
          // onChange={(e) => store.updateNewEmail(e.target.value)}
          type="text"
          placeholder="Nama Ruas"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
        <input
          value={dataAllRuasJalan?.panjang}
          // onChange={(e) => store.updateNewEmail(e.target.value)}
          type="text"
          placeholder="Panjang"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
        <input
          value={dataAllRuasJalan?.lebar}
          // onChange={(e) => store.updateNewEmail(e.target.value)}
          type="text"
          placeholder="Lebar"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Eksisting Jalan</label>
          <Select
            options={dataAllEksistingJalan}
            className="transparent-input"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Kondisi Jalan</label>
          <Select options={dataAllKondisiJalan} className="transparent-input" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="">Jenis Jalan</label>
          <Select options={dataAllJenisJalan} className="transparent-input" />
        </div>
        <input
          value={dataAllRuasJalan?.keterangan}
          // onChange={(e) => store.updateNewEmail(e.target.value)}
          type="text"
          placeholder="Keterangan"
          className="input input-xs h-11 input-bordered lg:w-full w-full"
        />
        <Link
          to="/dashboard/ruas-jalan"
          className="w-full btn btn-xs p-5 btn-primary flex flex-col items-center"
        >
          Edit
        </Link>
      </form>
    </div>
  );
};

export default Edit;
