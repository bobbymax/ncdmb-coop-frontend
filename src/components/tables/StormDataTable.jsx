/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useCallback } from "react";
import TableDataManager from "./TableDataManager";
import Pagination from "./Pagination";
import TextInput from "../forms/TextInput";
import Button from "../forms/Button";
import {
  checkButtonStatus,
  generateUniqueString,
} from "src/app/helpers/Helpers";
import Alert from "src/app/helpers/Alert";
import _ from "lodash";

const TableButton = ({ raw = null, bttn = {}, actions = undefined }) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const checkStatus = useCallback(() => {
    if (bttn?.conditions?.length > 0) {
      const disabled = checkButtonStatus(raw, bttn.conditions, bttn.terms);
      setIsDisabled(disabled);
    }
  }, [raw, bttn]);

  useEffect(() => {
    if (
      _.isObject(raw) &&
      _.isObject(bttn) &&
      _.has(bttn, "conditions") &&
      _.has(bttn, "terms") &&
      _.has(bttn, "action")
    ) {
      checkStatus();
    }
  }, [raw, bttn, checkStatus]);

  return (
    <Button
      label={bttn?.label}
      icon={bttn?.icon}
      handleClick={() =>
        typeof actions === "function" && actions(raw, bttn?.action)
      }
      isDisabled={isDisabled}
      variant={bttn?.variant}
      size="sm"
      fullWidth
    />
  );
};

TableButton.defaultProps = {
  raw: null,
  bttn: {},
  actions: undefined,
};

const StormDataTable = ({
  data = [],
  columns = [],
  actions = undefined,
  buttons = [],
  exportable = false,
}) => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const dataManager = useMemo(
    () => new TableDataManager(data, columns, pageSize),
    [data, columns, pageSize]
  );

  const exportData = useCallback(() => {
    Alert.flash("Download Excel File", "info", "Perform this action").then(
      (result) => {
        if (result.isConfirmed) {
          dataManager.export(data, generateUniqueString());
        }
      }
    );
  }, [data, dataManager]);

  const generateButtons = useCallback(
    (bttns = [], raw) => (
      <div className="flex column gap-sm">
        {bttns.map((bttn, i) => (
          <TableButton key={i} raw={raw} bttn={bttn} actions={actions} />
        ))}
      </div>
    ),
    [actions]
  );

  const handleSearch = useMemo(
    () =>
      _.debounce((value) => {
        setSearchTerm(value);
        setPage(1);
      }, 300),
    []
  );

  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
    setPage(1);
  };

  useEffect(() => {
    const updatedData = dataManager.paginate(page, filters, searchTerm);
    setTableData(updatedData);
  }, [page, filters, searchTerm, dataManager]);

  return (
    <div className="storm-table-container">
      <div className="flex center-align space-between">
        <div className="search-container" style={{ flexGrow: 1 }}>
          <TextInput
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            size="md"
          />
        </div>
        {exportable && (
          <div className="button-section" style={{ marginBottom: 15 }}>
            <Button
              label="Export to Excel"
              icon="download-outline"
              variant="success"
              handleClick={exportData}
              isDisabled={data.length < 1}
            />
          </div>
        )}
      </div>
      <table className="storm-data-table">
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i}>
                <span>{col.label}</span>
                <TextInput
                  placeholder={`Filter ${col.label}`}
                  onChange={(e) =>
                    handleFilterChange(col.accessor, e.target.value)
                  }
                  size="sm"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col.accessor}>{row[col.accessor]}</td>
                ))}
                {actions && buttons.length > 0 && (
                  <td style={{ maxWidth: "10%", width: "10%" }}>
                    {generateButtons(buttons, row)}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1}>No Data Found!!!</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        totalRecords={data.length}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={setPage}
      />
    </div>
  );
};

// StormDataTable.defaultProps = {
//   data: [],
//   columns: [],
//   buttons: [],
//   actions: undefined,
//   exportable: false,
// };

export default StormDataTable;
