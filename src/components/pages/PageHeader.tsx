import Button from "../forms/Button";

interface PageHeaderProps {
  title: string;
  handleClick?: (value?: any) => void;
  icon?: string;
  variant?: "success" | "info" | "warning" | "danger";
  label?: string;
  isDisabled?: boolean;
  btnTitle?: string;
}

const PageHeader = ({
  title,
  icon,
  variant,
  label,
  handleClick,
  isDisabled = false,
  btnTitle,
}: PageHeaderProps) => {
  return (
    <div className="flex space-between center-align">
      <h3 className="page-title">{title}</h3>
      {handleClick && (
        <Button
          variant={variant}
          label={`${btnTitle ?? `Add ${label ?? title}`}`}
          handleClick={handleClick}
          icon={icon}
          isDisabled={isDisabled}
        />
      )}
    </div>
  );
};

export default PageHeader;
