import { Option } from "../../components/forms/SelectInput";
import { Header } from "../contracts/files/Upload";
import { ModelColumnsProps } from "../models/Model";
type Raw = {
  [key: string]: any;
};

type RowData = {
  id: number;
  [key: string]: unknown;
  created_at?: string;
  undated_at?: string;
};

// interface MemeberImportData {
//   name: string;
//   membership_no: string;
//   total_contribution: number;
//   contribution: number;
// }

interface MemberServerResponse {
  headers: Header[];
  data: MemberExportServerData[];
}

interface MemberExportServerData {
  firstname: string;
  surname: string;
  middlename: string;
  email: string;
  contribution: number;
  total_contribution: number;
  membership_no: string;
  type: string;
}

export const generateUniqueString = (length = 25) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export type ConditionalArray = [keyof Raw, string | number, string | number];

export const optionDataFormat = (
  data: Record<string, any>[] | undefined,
  key: string,
  name: any
) => {
  const response: { value: any; label: any }[] = [];

  data?.map((row: Record<string, any>) =>
    response.push({
      value: row[key],
      label: row[name],
    })
  );

  return response;
};

export const range = (value: number): Option[] => {
  if (value < 1 || !Number.isInteger(value)) {
    return [];
  }

  return Array.from({ length: value }, (_, i) => ({
    value: i + 1,
    label: i + 1,
  }));
};

const getOperations = (raw: Raw, conditions: ConditionalArray): boolean => {
  let response = false;
  if (conditions.length !== 3) {
    throw new Error("Array must have exactly 3 elements.");
  }

  const operator = conditions[1];
  const data = raw[conditions[0]];

  switch (operator) {
    case "!=":
      response = data !== conditions[2];
      break;

    case "<":
      response = data < conditions[2];
      break;

    case "<=":
      response = data <= conditions[2];
      break;

    case ">":
      response = data > conditions[2];
      break;

    case ">=":
      response = data >= conditions[2];
      break;

    default:
      response = data === conditions[2];
      break;
  }

  return response;
};

export const formatCurrency = (amount: string | number) => {
  const num = parseFloat(amount as string);

  if (num >= 1e12) {
    return (num / 1e12).toFixed(1) + "T"; // Trillions
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + "B"; // Billions
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + "M"; // Millions
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + "K"; // Thousands
  } else {
    return num.toFixed(1); // Less than 1000
  }
};

export const checkButtonStatus = (
  raw: Raw,
  dataConditions: ConditionalArray[],
  operator: "and" | "or" = "and"
): boolean => {
  let isDisabled: boolean = false;

  switch (operator) {
    case "or":
      isDisabled = dataConditions.some(
        (condition) => getOperations(raw, condition) === true
      );
      break;

    default:
      isDisabled = dataConditions.every(
        (condition) => getOperations(raw, condition) === true
      );
      break;
  }

  return isDisabled;
};

export const currency = (amount: number | string | undefined) => {
  if (!amount || isNaN(Number(amount))) {
    return "0.00";
  }

  const numericAmount =
    typeof amount === "string" ? parseFloat(amount) : amount;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(numericAmount);
};

export const columnData = (col: ModelColumnsProps, row: RowData) => {
  let data;

  return data;
};

export const formatMembersUploadFile = (
  members: Record<string, any>[]
): MemberServerResponse => {
  let formatted: MemberExportServerData[] = [];

  members.forEach((member) => {
    // Get the name column
    const name = member.name;

    // split the string in the name field
    const spliter = name.split(/[ ,]/).filter(Boolean);

    if (spliter.length < 1) {
      return;
    }

    // Get the firstname, if the first value is empty,
    // assume the second value is the firstname
    const firstname = spliter[0];

    // Get the surname
    const surname =
      spliter.length === 2 ? spliter[1] : spliter[spliter.length - 1];

    const middlename =
      spliter.length > 2
        ? spliter
            .filter((word: string) => word !== firstname && word !== surname)
            .join(" ")
        : "";

    return formatted.push({
      firstname,
      surname,
      middlename,
      email: `${firstname.toLowerCase()}.${surname.toLowerCase()}@ncdmb.gov.ng`,
      contribution: member.contribution,
      total_contribution: member.total_contribution,
      membership_no: member.membership_no,
      type: "member",
    });
  });

  // Add Headers
  const headers: Header[] = [
    { accessor: "firstname", label: "Firstname" },
    { accessor: "middlename", label: "Middlename" },
    { accessor: "surname", label: "Surname" },
    { accessor: "membership_no", label: "Memebership No." },
    { accessor: "email", label: "Email" },
    { accessor: "contribution", label: "Contribution" },
    { accessor: "total_contribution", label: "Total Contribution" },
    { accessor: "type", label: "Type" },
  ];

  return { headers, data: formatted };
};
