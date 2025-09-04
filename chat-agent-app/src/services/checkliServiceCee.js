import * as XLSX from "xlsx";
import Papa from "papaparse";

export default class CheckliCeeParser {
  constructor() {
    // 定义必需的字段
    this.requiredFields = ["是否启用中欧计划 (CEP)", "是否持有波兰有效增值税号", "是否持有捷克有效增值税号"];

    // 内部属性用于存储当前处理的工作簿和工作表
    this.currentWorkbook = null;
    this.currentWorksheet = null;
    this.currentSheetName = null;
    this.rows = [];
    this.file = null;
  }

  /**
   * 加载文件
   * @param {File} file
   */
  async loadFile(file) {
    this.file = file;
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".csv")) {
      this.rows = await this._parseCSV(file);
    } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
      this.rows = await this._parseExcel(file);
    } else {
      throw new Error("文件格式不支持，仅支持 CSV / Excel");
    }
  }

  /**
   * 检查是否包含指定字段
   * @returns {boolean}
   */
  hasRequiredFields() {
    if (!this.rows || this.rows.length === 0) return false;
    const headers = Object.keys(this.rows[0]);
    return this.requiredFields.every((field) => headers.includes(field));
  }

  /**
   * 解析数据
   * @returns {Object}
   */
  parseData() {
    if (!this.rows || this.rows.length === 0) {
      throw new Error("请先调用 loadFile(file) 加载文件");
    }

    const row = this.rows[0]; // 默认取第一行

    return {
      MCID: row["MCID"] || "",
      "账户名称": row["账户名称"] || "",
      GL: row["GL"] || "",
      band: row["band"] || "",
      "GMS Band": row["GMS Band"] || "",
      "是否为英国及欧盟国家双边入仓且同步在售的卖家": this._toNumber(row["是否为英国及欧盟国家双边入仓且同步在售的卖家"]),
      "英国及欧盟入仓情况": this._toNumber(row["英国及欧盟入仓情况"]),
      "英国及欧盟选品同步情况": this._toNumber(row["英国及欧盟选品同步情况"]),
      "是否启用中欧计划 (CEP)": this._toNumber(row["是否启用中欧计划 (CEP)"]),
      "是否持有波兰有效增值税号": this._toNumber(row["是否持有波兰有效增值税号"]),
      "是否持有捷克有效增值税号": this._toNumber(row["是否持有捷克有效增值税号"]),
      "使用中欧计划的预估节省": this._toFloat(row["使用中欧计划的预估节省"]),
      "EU5 TTM GMS": this._toFloat(row["EU5 TTM GMS"]),
      "GMS YoY": row["GMS YoY"],
    };
  }



  /**
   * 清理当前加载的文件数据
   */
  clearCurrentFile() {
    this.currentWorkbook = null;
    this.currentWorksheet = null;
    this.currentSheetName = null;
    this.rows = [];
    this.file = null;
  }

  // ===== 内部函数 =====
  async _parseCSV(file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const cleanedData = results.data.map((row) => {
            const newRow = {};
            for (let key in row) {
              const cleanKey = key.trim();
              const value = row[key];
              newRow[cleanKey] = (typeof value === "string" ? value.trim() : value);
            }
            return newRow;
          });
          resolve(cleanedData);
        },
        error: (err) => reject(err),
      });
    });
  }
  

  async _parseExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          this.currentWorkbook = workbook;
          this.currentSheetName = workbook.SheetNames[0];
          this.currentWorksheet = workbook.Sheets[this.currentSheetName];
  
          // 转成二维数组，不带 header
          const sheetData = XLSX.utils.sheet_to_json(this.currentWorksheet, {
            header: 1,
            defval: "",
          });
  
          // 第2行 (索引1) 是基本信息
          const basicInfo = {
            MCID: (sheetData[1][0] || "").toString().trim(),
            账户名称: (sheetData[1][1] || "").toString().trim(),
            GL: (sheetData[1][2] || "").toString().trim(),
            band: (sheetData[1][3] || "").toString().trim(),
            "GMS Band": (sheetData[1][4] || "").toString().trim(),
          };
  
          // F/G 列是指标行 (从第7行开始)
          const extraInfo = {};
          for (let i = 2; i < sheetData.length; i++) {
            let key = sheetData[i][5]; // F 列
            let value = sheetData[i][6]; // G 列
  
            if (typeof key === "string") key = key.trim();
            if (typeof value === "string") value = value.trim();
  
            if (key) {
              extraInfo[key] = value;
            }
          }
  
          // 合并基本信息和扩展信息
          const row = { ...basicInfo, ...extraInfo };
          resolve([row]);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  }
  
  

  // ===== 数据转换工具 =====
  _toNumber(value) {
    return value === "1" || value === 1 ? 1 : 0;
  }

  _toFloat(value) {
    if (typeof value === "string") {
      return parseFloat(value.replace(/,/g, "")) || 0;
    }
    return Number(value) || 0;
  }

  _toPercent(value) {
    if (typeof value === "string" && value.includes("%")) {
      return value.trim();
    }
    return `${value}%`;
  }
}
