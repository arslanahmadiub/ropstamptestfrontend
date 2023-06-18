/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Button } from "@mui/material";
import { sendRQApiJson } from "../api/service";
import { localGet } from "../api/storage";

const CategoryTable = ({
  openAddCategoryModel,
  data,
  reCallData,
  handelEditCategory,
}) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
    ],
    []
  );

  const handelDeleteCategory = async (rowData) => {
    const categoryId = rowData.original._id;

    try {
      await sendRQApiJson(
        "DELETE",
        `/api/remove-categories/${categoryId}`,
        localGet("token"),
        null
      );
      reCallData();
    } catch (error) {
      console.error("API call failed: ", error);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <h2>Category Table</h2>
        <Button
          color="primary"
          variant="contained"
          onClick={openAddCategoryModel}
        >
          Add New Category
        </Button>
      </Box>
      <MaterialReactTable
        renderRowActions={({ row }) => (
          <Box>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton
                color="warning"
                onClick={() => handelEditCategory(row.original)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip
              arrow
              placement="right"
              title="Delete"
              onClick={() => handelDeleteCategory(row)}
            >
              <IconButton color="error">
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        columns={columns}
        data={data}
        enableEditing
      />
    </>
  );
};

export default CategoryTable;
