export default class TableDataManager {
  constructor(data, columns, pageSize) {
    this.data = data;
    this.columns = columns;
    this.pageSize = pageSize;
  }

  paginate(page, filters, searchTerm) {
    let filteredData = this.applyFilters(this.data, filters);
    let searchedData = this.applySearch(filteredData, searchTerm);
    return this.getPaginatedData(searchedData, page);
  }

  applyFilters(data, filters) {
    let filteredData = data;
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        filteredData = filteredData.filter((item) =>
          item[key]
            ?.toString()
            ?.toLowerCase()
            ?.includes(filters[key].toLowerCase())
        );
      }
    });
    return filteredData;
  }

  applySearch(data, searchTerm) {
    if (!searchTerm) return data;
    const lowerCaseSearch = searchTerm.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString()?.toLowerCase()?.includes(lowerCaseSearch)
      )
    );
  }

  getPaginatedData(data, page) {
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return data.slice(startIndex, endIndex);
  }
}
