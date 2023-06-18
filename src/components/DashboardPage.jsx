import { useState, useEffect } from "react";
import { sendRQApiJson } from "../api/service";
import { localGet } from "../api/storage";
import DashboardCard from "./DashboardCard";

const DashboardPage = () => {
  const [counts, setCounts] = useState(null);

  const getCounts = async () => {
    try {
      let result = await sendRQApiJson(
        "GET",
        "/api/count",
        localGet("token"),
        null
      );

      setCounts(result);
    } catch (error) {
      console.error("API call failed: ", error);
    }
  };
  console.log("counts", counts);
  useEffect(() => {
    getCounts();
  }, []);

  return (
    <div style={{display:"flex", width:"100%", justifyContent:"space-evenly"}}>
      <DashboardCard title={"Vehical"} counts={counts?.vehicalsCount} />
      <DashboardCard title={"Categories"} counts={counts?.categoriesCount} />
    </div>
  );
};

export default DashboardPage;
