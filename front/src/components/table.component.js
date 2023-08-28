import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'name', headerName: 'Nom', width: 130 },
  { field: 'email', headerName: 'Email', width: 250 },
  
];

export default function DataTable({data, rowSelectionModel, setRowSelectionModel ,columns}) {
    return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          console.log(newRowSelectionModel);
          setRowSelectionModel(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
}
