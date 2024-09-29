/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import TableDataManager from "./TableDataManager";
import Pagination from "./Pagination";
import TextInput from "../forms/TextInput";
import Button from "../forms/Button";
import { checkButtonStatus } from "src/app/helpers/Helpers";
import _ from "lodash";

const TableButton = ({ raw = null, bttn = {}, actions = undefined }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [btn, setBtn] = useState({});

  const checkStatus = (raw) => {
    let isDisabled = false;

    if (btn?.conditions?.length > 0) {
      isDisabled = checkButtonStatus(raw, btn?.conditions, btn?.terms);
    }

    setIsDisabled(isDisabled);
  };

  useEffect(() => {
    if (
      _.isObject(raw) &&
      _.isObject(bttn) &&
      _.has(bttn, "conditions") &&
      _.has(bttn, "terms") &&
      _.has(bttn, "action")
    ) {
      setBtn(bttn);
      checkStatus(raw);
    }
  }, [raw, bttn]);

  return (
    <Button
      label={bttn?.label}
      icon={bttn?.icon}
      handleClick={() => actions(raw, bttn?.action)}
      isDisabled={isDisabled}
      variant={bttn?.variant}
      size="sm"
      fullWidth
    />
  );
};

const StormDataTable = ({
  data = [],
  columns = [],
  actions = undefined,
  buttons = [],
}) => {
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // Instantiate DataManager with initial data
  const dataManager = new TableDataManager(data, columns, pageSize);

  const generateButtons = (bttns = [], raw) => {
    return (
      <div className="flex column gap-sm">
        {bttns.map((bttn, i) => (
          <TableButton key={i} raw={raw} bttn={bttn} actions={actions} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const updatedData = dataManager.paginate(page, filters, searchTerm);
    setTableData(updatedData);
  }, [page, pageSize, filters, searchTerm, data]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to the first page on search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [column]: value }));
    setPage(1); // Reset to the first page on filter change
  };

  return (
    <div className="storm-table-container">
      <div className="search-container">
        <TextInput
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
          size="md"
        />
      </div>
      <table className="storm-data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.accessor}>
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
                {actions !== undefined && (
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
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default StormDataTable;
