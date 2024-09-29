const Icon = ({ fontSize = 13, icon = "" }) => {
  return (
    <ion-icon
      style={{ fontSize: fontSize, transition: "all 300ms ease-in-out" }}
      name={icon}
    ></ion-icon>
  );
};

export default Icon;
