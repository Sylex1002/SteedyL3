import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./DataTableAdmin.css";
import PropTypes from "prop-types";

export default function DataTableAdmin({ rows, columns, actionColumn, title }) {
  return (
    <div id="DataTableAdmin">
      <div className="DataTableAdmin-content">
        {title && (
          <div className="DataTableAdmin_title">
            <h1>{title}</h1>
          </div>
        )}
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns.concat(actionColumn)}
            rowsPerPageOptions={[9]}
            checkboxSelection
            selectionModel
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
      </div>
    </div>
  );
}
DataTableAdmin.propTypes = {
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  actionColumn: PropTypes.array.isRequired,
};
