import Button from "../forms/Button";

const Pagination = ({ totalRecords, pageSize, currentPage, onPageChange }) => {
  const pageLimit = 5;
  const totalPages = Math.ceil(totalRecords / pageSize);

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit)
      .fill()
      .map((_, idx) => start + idx + 1)
      .filter((page) => page <= totalPages);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  return (
    <div className="pagination flex center-align" style={{ gap: 3 }}>
      <Button
        isDisabled={currentPage === 1}
        handleClick={() => handlePageChange(currentPage - 1)}
        size="sm"
        icon="arrow-back-circle"
        fontSize={18}
        variant="success"
      />
      {/* Page numbers */}
      {getPaginationGroup().map((page, i) => (
        <Button
          key={page}
          label={page}
          handleClick={() => handlePageChange(page)}
          size="sm"
          additionalClass={page === currentPage ? "active" : ""}
          variant="success"
        />
      ))}
      {/* Ellipsis for more pages */}
      {currentPage < totalPages && totalPages > pageLimit && <span>...</span>}
      <Button
        isDisabled={currentPage === totalPages}
        handleClick={() => handlePageChange(currentPage + 1)}
        size="sm"
        icon="arrow-forward-circle"
        place="right"
        fontSize={18}
        variant="success"
      />
    </div>
  );
};

export default Pagination;
