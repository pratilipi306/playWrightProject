import * as xlsx from "xlsx";
interface LoginData {
  UserName: string;
  Password: string;
}

export function excelRead(path: string, sheet: string): LoginData[] {
  const workbook = xlsx.readFile(path);
  const sheetToUse = workbook.Sheets[sheet];
  const testData = xlsx.utils.sheet_to_json(sheetToUse, {
    raw: true,
  }) as LoginData[];
  return testData;
}
