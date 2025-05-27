import React, { useContext } from "react";
import { dataContext } from "../context/MoviesDataContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "Name", width: 100 },
  { field: "role", headerName: "Role", width: 130 },
  { field: "department", headerName: "Department", width: 130 },
  {
    field: "email",
    headerName: "Email",
    type: "number",
    width: 200,
  },
  {
    field: "joinedDate",
    headerName: "Date Joined",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const DataTable = () => {
  const { data } = useContext(dataContext);

  console.log("data", data);
  return (
    //     <TableContainer component={Paper} sx={{
    //         width: '100%',
    //         overflowX: 'auto',
    //         '@media (max-width: 600px)': {
    //           maxWidth: '100vw',
    //         },
    //       }}>
    //     <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>Name</TableCell>
    //           <TableCell align="right">Role</TableCell>
    //           <TableCell align="right">Email</TableCell>
    //           <TableCell align="right">Department</TableCell>
    //           <TableCell align="right">joinedDate</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {data.map((row) => (
    //           <TableRow
    //             key={row.id}
    //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //           >
    //             <TableCell component="th" scope="row">
    //               {row.name}
    //             </TableCell>
    //             <TableCell align="right">{row.role}</TableCell>
    //             <TableCell align="right">{row.email}</TableCell>
    //             <TableCell align="right">{row.department}</TableCell>
    //             <TableCell align="right">{row.joinedDate}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>

    // <div style={{ height: 300, width: '100%' }}>
    <Paper
      sx={{
        width: "100%",
        overflowX: "auto",
        "@media (max-width: 600px)": {
          maxWidth: "100vw",
        },
      }}
    >
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    // </div>
  );
};

export default DataTable;
