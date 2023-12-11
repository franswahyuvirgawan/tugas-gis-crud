import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import useUserStore from "../store/userStore";

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

  console.log(dataAllRuasJalan);

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
