import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

let formatExcel = json => {
  let widthArr = Object.keys(json).map(() => {
    return { width: 22, hpt: 25 };
  });
  return widthArr;
};
export function JSONToEXcel(data, fileName) {
  let excelFileName = fileName + ".xlsx";
  const jsonWorkSheet = XLSX.utils.json_to_sheet(data);
  const finalData = formatExcel(jsonWorkSheet);
  jsonWorkSheet["!cols"] = finalData;
  jsonWorkSheet["!rows"] = finalData;
  const workBook = {
    SheetNames: ["jsonWorkSheet"],
    Sheets: {
      jsonWorkSheet: jsonWorkSheet,
    },
  };
  XLSX.writeFile(workBook, excelFileName);
}
let excelToJSON = (fileData, callback) => {
  const files = fileData;
  this.readJsoneData = [];
  const fileReader = new FileReader(); // construction function that can read the file content
  fileReader.onload = ev => {
    const data = ev.target.result;
    const workbook = XLSX.read(data, {
      type: "binary", // binary
    });
    const wsname = workbook.SheetNames[0]; //take the first sheet
    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //Get the data in this table
    ws.forEach((value, index, ws) => {
      this.readJsoneData.push(value);
    });
    callback(this.readJsoneData);
  };
  fileReader.readAsBinaryString(files); // read file, trigger onload
};

// export const JSONTOPDF = (testcolumns, newArray, fileName) => {
//   let doc = new jsPDF("p", "pt");
//   doc.autoTable(testcolumns, newArray);
//   doc.save(fileName);
// };

export const JSONTOPDF = (data, fileName) => {
  let doc = new jsPDF("p", "pt");
  data.forEach(item => {
    doc.autoTable(item.column, item.arr);
  });
  doc.save(fileName);
};

export const PrintPdf = (testcolumns, newArray, fileName) => {
  var doc = new jsPDF();
  testcolumns.forEach((value, index) => {
    doc.autoTable(testcolumns[index], newArray[index]);
  });
  doc.autoPrint();
  //This is a key for printing
  doc.output("dataurlnewwindow");
};
let JSToPdfLandscape = (testcolumns, newArray, fileName) => {
  const doc = new jsPDF({
    orientation: "landscape",
  });

  doc.autoTable(testcolumns, newArray);
  doc.save(fileName);
};
