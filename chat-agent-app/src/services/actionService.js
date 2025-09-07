// src/services/actionService.js

class ActionService {
    constructor(panEUResult, diResult, ceeResult, EU_expansion_checkli, policyResult) {
      this.panEUResult = panEUResult;
      this.diResult = diResult;
      this.ceeResult = ceeResult;
      this.EU_expansion_checkli = EU_expansion_checkli;
      this.policyResult = policyResult;
    }
  
    // 逻辑1：合规 - new policy (NL/IT)
    // checkNewPolicy() {
    //   const result = {}

    //   const vatItem = this.EU_expansion_checkli.find(item => item["指标"] === "持有有效增值税号国家");
      
    //   if (!vatItem) {
    //     result.content = "-";
    //     result.value = 0
    //   };
      
    //   if (vatItem["意大利"] === 1) {
    //     result.content = "意大利税号需注意";
    //     result.value = 1
    //   } else {
    //     result.content = "-";
    //     result.value = 0
    //   }
      
    //   return {
    //     newPolicy: result.content,
    //     newPolicyValue: result.value
    //   };
    // }
  

    // 逻辑1：合规 - new policy (NL/IT)
    checkNewPolicy() {
      const results = [];
      let value = 0; // 默认值

      // 1. NL policy
      if (Array.isArray(this.panEUResult?.value?.nlPolicy)) {
        if (this.panEUResult.value.nlPolicy.length > 0) {
          results.push(`需同步到荷兰的ASIN数量：${this.panEUResult.value.nlPolicy.length}`);
        } else {
          results.push("目前没有需要同步至荷兰站的ASIN，但需要注意，未来上新的ASIN需要将listing同步至荷兰站；");
        }
      }

      // 2. IT logic1
      if (this.policyResult?.it_logic1_result?.option === 2) {
        results.push(
          "意大利税号失效将会影响您的Pan-EU资格。建议在意大利税号失效前申请其他欧盟国家的税号并启用库存配置（例如选择德国、法国进行VAT税号注册），以确保继续Pan-EU资格。"
        );
      }

      // 3. IT logic2
      if (this.policyResult?.it_logic2_result?.option === 1) {
        results.push(
          "请注意：您需要密切和您的税代保持沟通，以确保意大利税局是否通知您进行保证金政策相关的缴纳。"
        );
        // 保持 newPolicyValue = 0 或 1
        value = value || 1;
      }

      // 4. CID
      const cid = this.policyResult?.cid_result;
      if (cid?.is_in_cid1 || cid?.is_in_cid2) {
        results.push("请尽快提供IEN信息，否则将无法创建新的发往英国的货件");
      }

      return {
        newPolicy: results,
        newPolicyValue: value
      };
    }



    // 逻辑2：合规 - 开了仓储没开税号
    checkWarehouseVATCompliance() {
      const vatItem = this.EU_expansion_checkli.find(item => item["指标"] === "持有有效增值税号国家");
      const warehouseItem = this.EU_expansion_checkli.find(item => item["指标"] === "授权仓储国家");
      
      if (!vatItem || !warehouseItem) return [];
      
      // 动态获取国家列表，排除"指标"字段
      const countries = Object.keys(vatItem).filter(key => key !== "指标");
      
      // 按情况分组存储国家
      const groupedResults = {
        compliant: [],      // 已合规：warehouse=1, vat=1
        needVAT: [],        // 需上传税号：warehouse=1, vat=0
        canOpenWarehouse: [], // 可开启仓储：warehouse=0, vat=1
        needVATAndWarehouse: [] // 需上传税号并开启仓储：warehouse=0, vat=0
      };
      
      // 遍历所有国家并分组
      countries.forEach(country => {
        const vatStatus = vatItem[country];
        const warehouseStatus = warehouseItem[country];
        
        // 跳过无效值（null或undefined）
        if (vatStatus === null || vatStatus === undefined || 
            warehouseStatus === null || warehouseStatus === undefined) {
          return;
        }
        
        if (warehouseStatus === 1 && vatStatus === 1) {
          groupedResults.compliant.push(country);
        } else if (warehouseStatus === 1 && vatStatus === 0) {
          groupedResults.needVAT.push(country);
        } else if (warehouseStatus === 0 && vatStatus === 1) {
          groupedResults.canOpenWarehouse.push(country);
        } else if (warehouseStatus === 0 && vatStatus === 0) {
          groupedResults.needVATAndWarehouse.push(country);
        }
      });
      
      const results = [];
      
      // 生成合并后的结果
      if (groupedResults.compliant.length > 0) {
        results.push(`${groupedResults.compliant.join('、')}已经合规开启了PanEU所有的仓储，无需额外操作。`);
      }
      
      if (groupedResults.needVAT.length > 0) {
        results.push(`您已开启${groupedResults.needVAT.join('、')}仓储，请尽快上传 ${groupedResults.needVAT.join('、')}税号，否则将面临合规风险。`);
      }
      
      if (groupedResults.canOpenWarehouse.length > 0) {
        results.push(`${groupedResults.canOpenWarehouse.join('、')}可以开启本地仓储，享受本地配送费。`);
      }
      
      if (groupedResults.needVATAndWarehouse.length > 0) {
        results.push(`需上传${groupedResults.needVATAndWarehouse.join('、')}税号，可以开启${groupedResults.needVATAndWarehouse.join('、')}仓储，享受本地配送费`);
      }
      
      return {
        warehouseVATCompliance : results,
        warehouseVATComplianceValue: groupedResults
      };
    }
  
    // 逻辑3：cost saving - pan-EU placement
    calculatePanEUCostSaving() {
      const costSaveData = this.panEUResult.value.cost_save;
      
      if (!costSaveData.value || costSaveData.value.length === 0) {
        return [];
      }
      
      const results = [];
      
      // 遍历所有国家数据
      costSaveData.value.forEach(countryData => {
        Object.entries(countryData).forEach(([country, values]) => {
          if (Array.isArray(values) && values.length > 1) {
            results.push(`可开启 ${country} 仓储，获得配送费用节约 ${values[1].toFixed(2)} RMB`);
          }
        });
      });
      
      return results;
    }
  
    // 逻辑4：cost saving - pan-EU ASIN parity
    calculatePanEUASINParity() {
      const excel_data = this.panEUResult?.value?.excel_data;

      // excel_data 必须存在且有 rows 数组
      if (!excel_data || !Array.isArray(excel_data.rows) || excel_data.rows.length === 0) {
        return '-';
      }

      // 获取最后一行数据（假设是“可加入PanEU ASIN”）
      const lastRow = excel_data.rows[excel_data.rows.length - 1];

      // 累加第 1-3 行的 count
      const sum = excel_data.rows
        .slice(1, 4) // 取第 2~4 行
        .reduce((acc, row) => {
          const num = parseFloat(row.formula);
          return acc + (isNaN(num) ? 0 : num);
        }, 0);

      return `同步 ${lastRow?.count ?? 0} ASIN，获得配送费用节约€${sum.toFixed(2)}`;
    }

  
    // 逻辑5：cost saving - CEE
    calculateCEECostSaving() {
      if (this.ceeResult.hasJoined) {
        return '-';
      }

      if (!this.ceeResult.value) {
        return '您已加入，无需操作';
      }
      
      const countries = [];
      if (this.ceeResult.hasPolishVAT) countries.push("波兰");
      if (this.ceeResult.hasCzechVAT) countries.push("捷克");
      
      const countryText = countries.length > 0 ? `需要注册${countries.join('和')}税号` : "";
      
      return `可开启中欧计划，获得配送费用节约€${this.ceeResult.value.finalSaving} ${countryText}`;
    }
  
    // 逻辑6：growth - DI
    getDIIncentive() {
      if (!this.diResult.value.key_opportunity_analysis || 
          !this.diResult.value.key_opportunity_analysis.points) {
        return [];
      }
      
      return this.diResult.value.key_opportunity_analysis.points.map(point => ({
        title: point.title,
        description: point.description
      }));
    }

    // 逻辑计算入口函数
    calculateAll() {
      const {newPolicy, newPolicyValue} = this.checkNewPolicy()
      const {warehouseVATCompliance, warehouseVATComplianceValue} = this.checkWarehouseVATCompliance()

      return {
        newPolicy: newPolicy,
        warehouseVATCompliance: warehouseVATCompliance,
        panEUCostSaving: this.calculatePanEUCostSaving(),
        panEUASINParity: this.calculatePanEUASINParity(),
        ceeCostSaving: this.calculateCEECostSaving(),
        diIncentive: this.getDIIncentive(),
        newPolicyValue: newPolicyValue,
        warehouseVATComplianceValue: warehouseVATComplianceValue
      };
    }
  }
  

export default ActionService;
  
  // 默认参数（供测试使用）
  export const defaultPanEUResult = {
    value: {
      opportunity_data: {
        headers: ["opportunityType", "count", "detail", "recommendation", "estimatedAnnualSavingsEUR"],
        rows: [
          {
            count: 560,
            detail: "",
            estimatedAnnualSavingsEUR: "10000",
            opportunityType: "可加入PanEU ASIN",
            recommendation: "同步商品到DE/FR/IT/ES四国，启用PanEU服务"
          },
          {
            count: 39,
            detail: "同步ASIN预计可节省0.3k RMB/年",
            estimatedAnnualSavingsEUR: "€41.71",
            opportunityType: "缺少1至2个报价",
            recommendation: "补充缺失国家的商品listing",
          },
          {
            count: 127,
            detail: "同步ASIN预计可获得3.7k RMB销售额",
            estimatedAnnualSavingsEUR: "-",
            opportunityType: "缺少3个报价",
            recommendation: "从德国扩展到其他三国市场"
          },
          {
            count: 4,
            detail: "修复ASIN预计可节省0.1k RMB/年",
            estimatedAnnualSavingsEUR: "€12.84",
            opportunityType: "失效PanEU ASIN",
            recommendation: "修复商品状态，恢复PanEU资格"
          },
          {
            count: 564,
            detail: "",
            estimatedAnnualSavingsEUR: "",
            opportunityType: "总计",
            recommendation: "优先处理高价值商品的市场拓展"
          }
        ]
      },
      cost_save: {
        title: ["跨境配送国家", "预计可节约费用(RMB)", "预计节约配送费(RMB)", "申请VAT所需费用(RMB)", "申请VAT所器时间"],
        value: [
          {
            FR: [6914.51, 15451.09, 142355, "8-13 weeks"],
            DE: [6914.51, 15451.09, 142355, "8-13 weeks"],
          }
        ],
        "总额": [213123, 42134, 3244234, "-"]
      }
    }
  };
  
  export const defaultDiResult = {
    value: {
      key_opportunity_analysis: {
        points: [
          {title: '高销售潜力ASIN', description: 'UK>EU方向有37个ASIN在欧盟市场具有高销售潜力,预计销售额€242,290.77(12M); EU>UK方向有45个ASIN在英国市场具有高销售潜力,预计销售额£59,075.44(12M)'},
          {title: '全球拓展大礼包', description: 'UK>EU方向有159个ASIN可获得最高€714,000.00代金券; EU>UK方向有51个ASIN可获得最高£180,600.00代金券'},
          {title: '远程配送优化', description: '目前有0个ASIN开启远程配送,其中0个达到高销售额(>€100),预计可节省配送费'},
          {title: '市场扩展潜力', description: '229个UK>EU ASIN和230个EU>UK ASIN都未开启远程配送,存在巨大扩展空间'}
        ]
      }
    }
  };
  
  export const defaultCeeResult = {
    hasJoined: false,
    hasPolishVAT: true,
    hasCzechVAT: false,
    value: {
      estimatedSaving: 2600,
      vatRegistrationCost: 300,
      finalSaving: 2300
    }
  };
  
  export const defaultEUExpansionCheckli = [
    {
      "指标": "账户健康情况",
      "英国": 1,
      "德国": 1,
      "意大利": 1,
      "法国": 1,
      "西班牙": 1
    },
    {
      "指标": "FBA选品数量",
      "英国": 116,
      "德国": 46,
      "意大利": 24,
      "法国": 19,
      "西班牙": 12
    },
    {
      "指标": "FBA潜在销售机会 (数量)*",
      "英国": 46,
      "德国": 116,
      "意大利": 138,
      "法国": 143,
      "西班牙": 150
    },
    {
      "指标": "FBA BA /3P BA %",
      "英国": 1,
      "德国": 1,
      "意大利": 1,
      "法国": 1,
      "西班牙": 1
    },
    {
      "指标": "FBA GMS/total GMS %",
      "英国": 1,
      "德国": 1,
      "意大利": 1,
      "法国": 1,
      "西班牙": 1
    },
    {
      "指标": "持有有效增值税号国家",
      "英国": 1,
      "德国": 0,
      "意大利": 1,
      "法国": 1,
      "西班牙": 0
    },
    {
      "指标": "授权仓储国家",
      "英国": 1,
      "德国": 1,
      "意大利": 1,
      "法国": 1,
      "西班牙": 0
    },
    {
      "指标": "是否启用亚马逊物流欧洲整合服务(PanEU)",
      "英国": null,
      "德国": 1,
      "意大利": 1,
      "法国": 1,
      "西班牙": 0
    },
    {
      "指标": "是否使用英国和欧盟之间的远程配送服务",
      "英国": 0,
      "德国": 0,
      "意大利": 0,
      "法国": 0,
      "西班牙": 0
    }
  ];


  // export const defaultEUExpansionCheckli = [
  //   {
  //     "指标": "账户健康情况",
  //     "德国": 1,
  //     "意大利": 1,
  //     "法国": 1,
  //     "西班牙": 1
  //   },
  //   {
  //     "指标": "FBA选品数量",
  //     "德国": 46,
  //     "意大利": 24,
  //     "法国": 19,
  //     "西班牙": 12
  //   },
  //   {
  //     "指标": "FBA潜在销售机会 (数量)*",
  //     "德国": 116,
  //     "意大利": 138,
  //     "法国": 143,
  //     "西班牙": 150
  //   },
  //   {
  //     "指标": "FBA BA /3P BA %",
  //     "德国": 1,
  //     "意大利": 1,
  //     "法国": 1,
  //     "西班牙": 1
  //   },
  //   {
  //     "指标": "FBA GMS/total GMS %",
  //     "德国": 1,
  //     "意大利": 1,
  //     "法国": 1,
  //     "西班牙": 1
  //   },
  //   {
  //     "指标": "持有有效增值税号国家",
  //     "德国": 0,
  //     "意大利": 1,
  //     "法国": 1,
  //     "西班牙": 0
  //   },
  //   {
  //     "指标": "授权仓储国家",
  //     "德国": 1,
  //     "意大利": 1,
  //     "法国": 1,
  //     "西班牙": 0
  //   },
  //   {
  //     "指标": "是否启用亚马逊物流欧洲整合服务(PanEU)",
  //     "德国": 1,
  //     "意大利": 1,
  //     "法国": 1,
  //     "西班牙": 0
  //   },
  //   {
  //     "指标": "是否使用英国和欧盟之间的远程配送服务",
  //     "德国": 0,
  //     "意大利": 0,
  //     "法国": 0,
  //     "西班牙": 0
  //   }
  // ];