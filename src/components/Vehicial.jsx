import { useState, useEffect } from "react";
import { sendRQApiJson } from "../api/service";
import { localGet } from "../api/storage";
import VehicialTable from "./VehicialTable";
import VehicialModel from "./VehicialModel";

const Vehicial = () => {
  const [editData, setEditData] = useState(null);
  const [vehicialData, setVehicialData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [openVehicialModel, setOpenVehicialModel] = useState();

  const handelEdit = (data) => {
    setEditData(data);
    setOpenVehicialModel(true);
  };

  const getVehicialData = async () => {
    try {
      let result = await sendRQApiJson(
        "GET",
        "/api/vehicals",
        localGet("token"),
        null
      );
      setVehicialData(result);
    } catch (error) {
      console.error("API call failed: ", error);
    }
    setEditData(null);
  };

  const getCategoryData = async () => {
    try {
      let result = await sendRQApiJson(
        "GET",
        "/api/categories",
        localGet("token"),
        null
      );
      setCategoryData(result);
    } catch (error) {
      console.error("API call failed: ", error);
    }
  };

  useEffect(() => {
    getVehicialData();
    getCategoryData();
  }, []);

  const handelCloseModel = () => {
    setOpenVehicialModel(false);
    setEditData(null);
  };

  return (
    <div>
      <VehicialModel
        open={openVehicialModel}
        data={editData}
        onClose={() => handelCloseModel()}
        reCallVechical={() => getVehicialData()}
        categories={categoryData}
      />
      <VehicialTable
        data={vehicialData}
        reCallData={() => getVehicialData()}
        handelEditCategory={(data) => {
          handelEdit(data);
        }}
        openAddVehicialModel={() => setOpenVehicialModel(true)}
      />
    </div>
  );
};

export default Vehicial;
