export async function findAndParseValidChecklist(allFiles, ceeParser, panEuParserExcel, panEuParserCsv) {
    // 1. 筛选出所有可能的 "体检表" 文件
    const checklistFiles = allFiles.filter(file => 
      file.name.toLowerCase().includes('eu_expansion_checkli'.toLowerCase())
    );
  
    console.log(`找到 ${checklistFiles.length} 个名为 'eu_expansion_checkli...' 的文件。`);
  
    // 用于存储结果
    const result = {
      ceeFile: null,       
      ceeData: null,         
      paneuFile: null,     
      paneuData: null
    };
  
    // 2. 依次检查每个体检表文件
    for (const file of checklistFiles) {
      try {

        // 加载文件
        await ceeParser.loadFile(file);
  
        // 检查是否包含必需字段
        const hasRequired = ceeParser.hasRequiredFields();
  
        if (hasRequired) {
          result.ceeFile = file;
          result.ceeData = ceeParser.parseData();
        } else {
          // 如果不符合要求，则是paneu文件
          result.paneuFile = file;
          if (file.name.toLowerCase().endsWith('.csv')) {
            result.paneuData = await panEuParserCsv(file);
          } else {
            result.paneuData = await panEuParserExcel(file);
          }
        }
  
      } catch (error) {
        // 如果在加载或检查过程中出错，也视为无效
        console.error(`处理文件 "${file.name}" 时出错:`, error.message);
      } finally {
        // 无论成功与否，都清理当前文件的内存，为处理下一个文件做准备
        ceeParser.clearCurrentFile();
      }
    }
  
    return result;
  }