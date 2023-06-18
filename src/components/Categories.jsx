import { useEffect, useState } from "react";
import CategoryModel from "./CategoryModel";
import CategoryTable from "./CategoryTable";
import { sendRQApiJson } from "../api/service";
import { localGet } from "../api/storage";

const Categories = () => {
  const [openCategoryModel, setOpenCategoryModel] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [editData, setEditData] = useState(null);
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
    getCategoryData();
  }, []);

  const handelEdit = (data) => {
    setEditData(data);
    setOpenCategoryModel(true);
  };

  return (
    <div>
      <CategoryModel
        open={openCategoryModel}
        onClose={() => setOpenCategoryModel(false)}
        reCallCategory={() => getCategoryData()}
        data={editData}
      />
      <CategoryTable
        handelEditCategory={(data) => {
          handelEdit(data);
        }}
        openAddCategoryModel={() => setOpenCategoryModel(true)}
        data={categoryData}
        reCallData={() => getCategoryData()}
      />
    </div>
  );
};

export default Categories;
