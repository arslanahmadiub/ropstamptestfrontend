/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";
import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Button } from "@mui/material";

import { sendRQApiJson } from "../api/service";
import { localGet } from "../api/storage";

const VehicialTable = ({
  openAddVehicialModel,
  data,
  reCallData,
  handelEditCategory,
}) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "category.name",
        header: "Category",
        size: 60,
      },
      {
        accessorKey: "color",
        header: "Color",
        size: 60,
      },
      {
        accessorKey: "model",
        header: "Model",
        size: 60,
      },
      {
        accessorKey: "make",
        header: "Make",
        size: 60,
      },
      {
        accessorKey: "registrationNumber",
        header: "Registration Number",
        size: 60,
      },
    ],
    []
  );

  const handelDeleteCategory = async (rowData) => {
    const vehicialId = rowData.original._id;

    try {
      await sendRQApiJson(
        "DELETE",
        `/api/vehical/${vehicialId}`,
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
        <h2>Vehicial Table</h2>
        <Button
          color="primary"
          variant="contained"
          onClick={openAddVehicialModel}
        >
          Add New Vehical
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

export default VehicialTable;
