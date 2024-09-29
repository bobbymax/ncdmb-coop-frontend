const Container = ({ children, fluid = false }) => {
  return (
    <div className={`container${fluid ? "-fluid" : ""}`}>
      <div className="row">{children}</div>
    </div>
  );
};

export default Container;
