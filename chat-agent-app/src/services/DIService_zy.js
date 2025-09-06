import Papa from 'papaparse';
import * as XLSX from 'xlsx';


class DiReportGenerator {
    constructor(uploadedFiles) {
        this.uploadedData = {};
        this.processedData = {};
		this.uploadedFiles = uploadedFiles;
    }

    normalizeFileName(fileName) {
        return fileName.toLowerCase().replace(/[^a-z0-9]/g, '');
    }

	async handleFileUpload(uploadedFiles) {
        const files = uploadedFiles;
    
        for (const file of files) {
            try {
                const data = await this.parseFile(file);
                this.uploadedData[this.normalizeFileName(file.name)] = data;
            } catch (error) {
                console.error(`Error parsing ${file.name}:`, error);
            }
        }
        
        this.checkRequiredFiles();
    }

    async parseFile(file) {
        const fileName = file.name.toLowerCase();
        
        if (fileName.endsWith('.csv')) {
            return this.parseCSV(file);
        } else if (fileName.endsWith('.xlsx')) {
            return this.parseExcel(file);
        }
        throw new Error('Unsupported file format');
    }

    parseCSV(file) {
        return new Promise((resolve, reject) => {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => resolve(results.data),
                error: (error) => reject(error)
            });
        });
    }

    parseExcel(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const workbook = XLSX.read(e.target.result, { type: 'array' });
                    const result = {};
                    
                    workbook.SheetNames.forEach(sheetName => {
                        const worksheet = workbook.Sheets[sheetName];
                        
                        // For Remote_Fulfillment Order files, use enhanced parsing
                        if (file.name.includes('Remote_Fulfillment_Order_Report')) {
                            console.log(`=== PROCESSING REMOTE ORDER REPORT: "${file.name}", SHEET: "${sheetName}" ===`);
                            
                            // Force read entire sheet with raw cell access
                            const range = worksheet['!ref'];
                            console.log(`Original sheet range: ${range}`);
                            
                            // Get all cell addresses and find actual data bounds
                            const cellAddresses = Object.keys(worksheet).filter(key => !key.startsWith('!'));
                            console.log(`Found ${cellAddresses.length} cells`);
                            
                            let maxRow = 0, maxCol = 0;
                            cellAddresses.forEach(addr => {
                                const decoded = XLSX.utils.decode_cell(addr);
                                maxRow = Math.max(maxRow, decoded.r);
                                maxCol = Math.max(maxCol, decoded.c);
                            });
                            
                            console.log(`Actual data bounds: ${maxRow + 1} rows x ${maxCol + 1} cols`);
                            
                            // Read all data using raw cell access
                            const data = [];
                            for (let R = 0; R <= maxRow; R++) {
                                const row = [];
                                for (let C = 0; C <= maxCol; C++) {
                                    const cellAddr = XLSX.utils.encode_cell({r: R, c: C});
                                    const cell = worksheet[cellAddr];
                                    row.push(cell ? (cell.v !== undefined ? cell.v : null) : null);
                                }
                                data.push(row);
                            }
                            
                            console.log(`Successfully read ${data.length} rows of data`);
                            console.log('Sample rows:');
                            console.log('Row 0 (title):', data[0]);
                            console.log('Row 1 (header):', data[1]);
                            if (data.length > 2) {
                                console.log('Row 2 (first data):', data[2]);
                                console.log(`Last row (${data.length-1}):`, data[data.length-1]);
                            }
                            
                            result[sheetName] = data;
                        } else if (file.name.includes('Remote_Fulfillment') && sheetName === 'Enrollment_EU4') {
                            console.log(`Processing ${sheetName} with raw cell reading`);
                            
                            const range = worksheet['!ref'];
                            console.log(`Original range: ${range}`);
                            
                            // Find the actual data range by checking all cells
                            const cellKeys = Object.keys(worksheet).filter(key => !key.startsWith('!'));
                            let maxRow = 0, maxCol = 0;
                            
                            cellKeys.forEach(key => {
                                const decoded = XLSX.utils.decode_cell(key);
                                maxRow = Math.max(maxRow, decoded.r);
                                maxCol = Math.max(maxCol, decoded.c);
                            });
                            
                            console.log(`Actual data range: 0 to ${maxRow} rows, 0 to ${maxCol} cols`);
                            
                            const data = [];
                            
                            // Read all rows up to the maximum found
                            for (let R = 0; R <= maxRow; ++R) {
                                const row = [];
                                for (let C = 0; C <= maxCol; ++C) {
                                    const cellAddress = XLSX.utils.encode_cell({r: R, c: C});
                                    const cell = worksheet[cellAddress];
                                    row.push(cell ? (cell.v || null) : null);
                                }
                                data.push(row);
                            }
                            
                            console.log(`Raw cell reading: ${data.length} rows for ${sheetName}`);
                            result[sheetName] = data;
                        } else {
                            // Use standard parsing for other files
                            let data = XLSX.utils.sheet_to_json(worksheet, { 
                                header: 1, 
                                defval: null,
                                raw: false
                            });
                            
                            // For recommendation files, skip first 2 rows
                            if (file.name.includes('recommendations') && sheetName === 'Recommendations') {
                                data = data.slice(2);
                            }
                            
                            result[sheetName] = data;
                        }
                    });
                    
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsArrayBuffer(file);
        });
    }

    checkRequiredFiles() {
        const requiredFiles = ['asin', 'sku', 'kingdom', 'germany', 'france', 'italy', 'spain'];
        const uploadedFileNames = Object.keys(this.uploadedData);
        console.log('Uploaded files:', uploadedFileNames);
        
        const foundFiles = requiredFiles.filter(required => 
            uploadedFileNames.some(uploaded => uploaded.includes(required))
        );
        
        console.log('Found required files:', foundFiles);
        const hasAllRequired = foundFiles.length >= 7;
    
        
        if (hasAllRequired) {
            console.log('All required files found, enabling generate button');
        }
    }

    async generateReport() {
        try {
			await this.handleFileUpload(this.uploadedFiles)
            this.processData();
        } catch (error) {
            alert('生成报告时出错: ' + error.message);
            console.error(error);
        }
    }

    processData() {
        console.log('Starting data processing...');
        console.log('Available files:', Object.keys(this.uploadedData));
        
        const asinList = this.getFileData('asinlist') || this.getFileData('asin1756');
        const skuReport = this.getFileData('skureport');
        const remoteFulfillmentStatus = this.getFileData('remotefulfillmentasinstatus');
        const remoteFulfillmentOrder = this.getFileData('remotefulfillmentorder');
        const ukEuCredits = this.getFileData('eligibleasinsdefrites');
        const euUkCredits = this.getFileData('eligibleasinsuk');
        
        console.log('Found files:', {
            asinList: !!asinList,
            skuReport: !!skuReport,
            remoteFulfillmentStatus: !!remoteFulfillmentStatus,
            remoteFulfillmentOrder: !!remoteFulfillmentOrder,
            ukEuCredits: !!ukEuCredits,
            euUkCredits: !!euUkCredits
        });
        
        // Debug ASIN List structure
        if (asinList) {
            console.log('=== ASIN LIST STRUCTURE DEBUG ===');
            console.log('ASIN List type:', typeof asinList);
            console.log('ASIN List is array:', Array.isArray(asinList));
            if (Array.isArray(asinList)) {
                console.log('ASIN List length:', asinList.length);
                console.log('First 3 rows:', asinList.slice(0, 3));
            } else {
                console.log('ASIN List keys:', Object.keys(asinList));
                Object.keys(asinList).forEach(key => {
                    if (Array.isArray(asinList[key])) {
                        console.log(`Sheet ${key}: ${asinList[key].length} rows`);
                        console.log(`${key} first 3 rows:`, asinList[key].slice(0, 3));
                    }
                });
            }
        } else {
            console.log('❌ ASIN List not found!');
        }
        
        console.log('=== PROCESSING UK TO EU OPPORTUNITIES ===');
        this.processedData.ukToEu = this.processUkToEuOpportunities(
            asinList, skuReport, remoteFulfillmentStatus, remoteFulfillmentOrder, ukEuCredits
        );
        
        console.log('=== PROCESSING EU TO UK OPPORTUNITIES ===');
        this.processedData.euToUk = this.processEuToUkOpportunities(
            asinList, skuReport, remoteFulfillmentStatus, remoteFulfillmentOrder, euUkCredits
        );
        
        console.log('Data processing completed');
    }

    getFileData(partialName) {
        console.log(`Looking for ${partialName}, checking files:`, Object.keys(this.uploadedData));
        const fileName = Object.keys(this.uploadedData).find(name => 
            name.toLowerCase().includes(partialName.toLowerCase())
        );
        console.log(`Looking for ${partialName}, found: ${fileName}`);
        return fileName ? this.uploadedData[fileName] : null;
    }

    processUkToEuOpportunities(asinList, skuReport, remoteFulfillmentStatus, remoteFulfillmentOrder, ukEuCredits) {
        const opportunities = {};
        
        const ukOnlyAsins = this.getUkOnlyAsins(asinList);
        console.log('=== UK ONLY ASINS DETAILED LIST ===');
        console.log('UK only ASINs count:', ukOnlyAsins.length);
        console.log('UK only ASINs full list:', ukOnlyAsins);
        ukOnlyAsins.forEach((asin, index) => {
            console.log(`UK only ASIN ${index + 1}: ${asin}`);
        });
        
        const remoteEnabledAsins = this.getRemoteEnabledAsins(remoteFulfillmentStatus, ['法国', '德国', '意大利', '西班牙']);
        console.log('Remote enabled ASINs (EU):', remoteEnabledAsins.length, remoteEnabledAsins);
        console.log('Remote enabled ASINs (EU) detailed list:', remoteEnabledAsins);
        
        const ukOnlyLocalAsins = [...new Set([...ukOnlyAsins, ...remoteEnabledAsins])];
        console.log('UK only local ASINs (combined):', ukOnlyLocalAsins.length, ukOnlyLocalAsins);
        
        // Check for duplicates
        const ukOnlyDuplicates = ukOnlyAsins.filter((item, index) => ukOnlyAsins.indexOf(item) !== index);
        const remoteDuplicates = remoteEnabledAsins.filter((item, index) => remoteEnabledAsins.indexOf(item) !== index);
        const overlap = ukOnlyAsins.filter(asin => remoteEnabledAsins.includes(asin));
        
        console.log('UK only duplicates:', ukOnlyDuplicates);
        console.log('Remote enabled duplicates:', remoteDuplicates);
        console.log('Overlap between UK only and remote enabled:', overlap);
        
        opportunities.ukOnlyLocal = {
            count: ukOnlyLocalAsins.length,
            revenue: this.calculateRevenue(ukOnlyLocalAsins, skuReport, '£', ['GB'])
        };
        
        const highPotentialAsins = this.getHighPotentialAsins(ukOnlyAsins, 'eu');
        console.log('High potential ASINs:', highPotentialAsins.length, highPotentialAsins);
        
        // Check if high potential ASINs are subset of UK only
        const highPotentialNotInUkOnly = highPotentialAsins.filter(asin => !ukOnlyAsins.includes(asin));
        console.log('High potential ASINs not in UK only:', highPotentialNotInUkOnly);
        
        opportunities.highPotentialEu = {
            count: highPotentialAsins.length,
            revenue: this.calculateRevenue(highPotentialAsins, skuReport, '£', ['GB']),
            potentialSales: this.calculatePotentialSales(highPotentialAsins, 'eu')
        };
        
        if (ukEuCredits) {
            const gsiData = this.processGsiCredits(ukEuCredits, skuReport, 'eu', ukOnlyLocalAsins);
            if (gsiData && gsiData.cAsins.length > 0) {
                gsiData.revenue = this.calculateRevenue(gsiData.cAsins, skuReport, '£', ['GB']);
                console.log('GSI C-ASINs (EU direction):', gsiData.cAsins.length, gsiData.cAsins);
            }
            opportunities.gsiCredits = gsiData;
        }
        
        const notRemoteAsins = ukOnlyLocalAsins.filter(asin => !remoteEnabledAsins.includes(asin));
        console.log('Not remote ASINs:', notRemoteAsins.length, notRemoteAsins);
        
        opportunities.notRemote = {
            count: notRemoteAsins.length,
            revenue: this.calculateRevenue(notRemoteAsins, skuReport, '£', ['GB'])
        };
        
        // Remote active = UK ASINs with EU remote fulfillment enabled
        const remoteActiveRevenue = this.calculateRemoteFulfillmentRevenue(remoteEnabledAsins, remoteFulfillmentOrder, 'GB');
        opportunities.remoteActive = {
            count: remoteEnabledAsins.length,
            revenue: this.calculateRevenue(remoteEnabledAsins, skuReport, '£', ['GB']),
            remoteRevenue: remoteActiveRevenue, // Revenue from remote fulfillment orders
            highVolumeCount: 0,
            highVolumeRevenue: '£0'
        };
        
        // Validation summary
        console.log('=== UK TO EU VALIDATION SUMMARY ===');
        console.log(`UK only ASINs: ${ukOnlyAsins.length} (duplicates: ${ukOnlyDuplicates.length})`);
        console.log(`Remote enabled ASINs: ${remoteEnabledAsins.length} (duplicates: ${remoteDuplicates.length})`);
        console.log(`Combined (UK only local): ${ukOnlyLocalAsins.length}`);
        console.log(`High potential: ${highPotentialAsins.length} (not in UK only: ${highPotentialNotInUkOnly.length})`);
        console.log(`Not remote: ${notRemoteAsins.length}`);
        console.log(`Overlap between UK only and remote: ${overlap.length}`);
        
        return opportunities;
    }

    processEuToUkOpportunities(asinList, skuReport, remoteFulfillmentStatus, remoteFulfillmentOrder, euUkCredits) {
        const opportunities = {};
        
        const euOnlyAsins = this.getEuOnlyAsins(asinList);
        console.log('=== EU ONLY ASINS DETAILED LIST ===');
        console.log('EU only ASINs count:', euOnlyAsins.length);
        console.log('EU only ASINs full list:', euOnlyAsins);
        euOnlyAsins.forEach((asin, index) => {
            console.log(`EU only ASIN ${index + 1}: ${asin}`);
        });
        
        const remoteEnabledAsins = this.getRemoteEnabledAsins(remoteFulfillmentStatus, ['英国']);
        console.log('Remote enabled ASINs (UK):', remoteEnabledAsins.length, remoteEnabledAsins);
        
        const euOnlyLocalAsins = [...new Set([...euOnlyAsins, ...remoteEnabledAsins])];
        console.log('EU only local ASINs (combined):', euOnlyLocalAsins.length, euOnlyLocalAsins);
        
        // Check for duplicates
        const euOnlyDuplicates = euOnlyAsins.filter((item, index) => euOnlyAsins.indexOf(item) !== index);
        const remoteDuplicates = remoteEnabledAsins.filter((item, index) => remoteEnabledAsins.indexOf(item) !== index);
        const overlap = euOnlyAsins.filter(asin => remoteEnabledAsins.includes(asin));
        
        console.log('EU only duplicates:', euOnlyDuplicates);
        console.log('Remote enabled duplicates:', remoteDuplicates);
        console.log('Overlap between EU only and remote enabled:', overlap);
        
        opportunities.euOnlyLocal = {
            count: euOnlyLocalAsins.length,
            revenue: this.calculateRevenue(euOnlyLocalAsins, skuReport, '€', ['DE', 'FR', 'ES', 'IT'])
        };
        
        const highPotentialAsins = this.getHighPotentialAsins(euOnlyAsins, 'uk');
        console.log('High potential ASINs (UK):', highPotentialAsins.length, highPotentialAsins);
        
        // Check if high potential ASINs are subset of EU only
        const highPotentialNotInEuOnly = highPotentialAsins.filter(asin => !euOnlyAsins.includes(asin));
        console.log('High potential ASINs not in EU only:', highPotentialNotInEuOnly);
        
        opportunities.highPotentialUk = {
            count: highPotentialAsins.length,
            revenue: this.calculateRevenue(highPotentialAsins, skuReport, '€', ['DE', 'FR', 'ES', 'IT']),
            potentialSales: this.calculatePotentialSales(highPotentialAsins, 'uk')
        };
        
        if (euUkCredits) {
            const gsiData = this.processGsiCredits(euUkCredits, skuReport, 'uk', euOnlyLocalAsins);
            if (gsiData && gsiData.cAsins.length > 0) {
                gsiData.revenue = this.calculateRevenue(gsiData.cAsins, skuReport, '€', ['DE', 'FR', 'ES', 'IT']);
                console.log('GSI C-ASINs (UK direction):', gsiData.cAsins.length, gsiData.cAsins);
            }
            opportunities.gsiCredits = gsiData;
        }
        
        const notRemoteAsins = euOnlyLocalAsins.filter(asin => !remoteEnabledAsins.includes(asin));
        console.log('Not remote ASINs (UK):', notRemoteAsins.length, notRemoteAsins);
        
        opportunities.notRemote = {
            count: notRemoteAsins.length,
            revenue: this.calculateRevenue(notRemoteAsins, skuReport, '€', ['DE', 'FR', 'ES', 'IT'])
        };
        
        // Remote active = EU ASINs with UK remote fulfillment enabled  
        const remoteActiveRevenue = this.calculateRemoteFulfillmentRevenue(remoteEnabledAsins, remoteFulfillmentOrder, 'non-GB');
        opportunities.remoteActive = {
            count: remoteEnabledAsins.length,
            revenue: this.calculateRevenue(remoteEnabledAsins, skuReport, '€', ['DE', 'FR', 'ES', 'IT']),
            remoteRevenue: remoteActiveRevenue, // Revenue from remote fulfillment orders
            highVolumeCount: 0,
            highVolumeRevenue: '€0'
        };
        
        // Validation summary
        console.log('=== EU TO UK VALIDATION SUMMARY ===');
        console.log(`EU only ASINs: ${euOnlyAsins.length} (duplicates: ${euOnlyDuplicates.length})`);
        console.log(`Remote enabled ASINs: ${remoteEnabledAsins.length} (duplicates: ${remoteDuplicates.length})`);
        console.log(`Combined (EU only local): ${euOnlyLocalAsins.length}`);
        console.log(`High potential: ${highPotentialAsins.length} (not in EU only: ${highPotentialNotInEuOnly.length})`);
        console.log(`Not remote: ${notRemoteAsins.length}`);
        console.log(`Overlap between EU only and remote: ${overlap.length}`);
        
        return opportunities;
    }

    getUkOnlyAsins(asinList) {
        console.log('=== DEBUGGING UK ONLY ASINS (UNIVERSAL FORMAT) ===');
        
        if (!asinList) return [];
        
        let data = [];
        let isExcelFormat = false;
        
        // 检测数据格式
        if (Array.isArray(asinList)) {
            // CSV格式：直接是对象数组
            data = asinList;
            console.log('Detected CSV format');
        } else {
            // Excel格式：有sheet结构
            data = asinList.Sheet1 || asinList.sheet1 || asinList;
            if (!Array.isArray(data)) {
                const firstSheet = Object.keys(asinList)[0];
                if (firstSheet && Array.isArray(asinList[firstSheet])) {
                    data = asinList[firstSheet];
                }
            }
            isExcelFormat = Array.isArray(data) && Array.isArray(data[0]);
            console.log(`Detected Excel format: ${isExcelFormat}`);
        }
        
        if (!Array.isArray(data) || data.length === 0) {
            console.log('No valid data found');
            return [];
        }
        
        console.log(`Processing data: ${data.length} rows`);
        console.log('First 3 rows:', data.slice(0, 3));
        
        const ukOnlyAsins = [];
        
        if (isExcelFormat) {
            // Excel格式：数组访问
            const dataRows = data.slice(3); // 跳过标题行
            console.log(`Excel: Processing ${dataRows.length} data rows`);
            
            dataRows.forEach((row, index) => {
                if (!row || !Array.isArray(row)) return;
                
                let asin, diType;
                
                // 检测列位置
                if (row[2] && String(row[2]).startsWith('B0')) {
                    asin = row[2]; // C列ASIN
                    diType = row[3]; // D列DI_type
                } else {
                    asin = row[1]; // B列ASIN
                    diType = row[2]; // C列DI_type
                }
                
                if (index < 5) {
                    console.log(`Excel UK Row ${index}: ASIN=${asin}, DI_type="${diType}"`);
                }
                
                if (diType === 'UK only' && asin && String(asin).startsWith('B0')) {
                    ukOnlyAsins.push(asin);
                    console.log(`✓ Found UK only ASIN: ${asin}`);
                }
            });
        } else {
            // CSV格式：对象访问
            console.log(`CSV: Processing ${data.length} rows`);
            if (data.length > 0) {
                console.log('CSV columns:', Object.keys(data[0]));
            }
            
            data.forEach((row, index) => {
                if (!row) return;
                
                const asin = row['Asin'] || row['ASIN']; // 支持不同列名
                const diType = row['DI_type'];
                
                if (index < 5) {
                    console.log(`CSV UK Row ${index}: ASIN=${asin}, DI_type="${diType}"`);
                }
                
                if (diType === 'UK only' && asin && String(asin).startsWith('B0')) {
                    ukOnlyAsins.push(asin);
                    console.log(`✓ Found UK only ASIN: ${asin}`);
                }
            });
        }
        
        // 显示DI_type值分析
        let uniqueDiTypes = [];
        if (isExcelFormat) {
            const dataRows = data.slice(3);
            uniqueDiTypes = [...new Set(dataRows.map(row => {
                if (!row || !Array.isArray(row)) return null;
                return row[2] && String(row[2]).startsWith('B0') ? row[3] : row[2];
            }).filter(Boolean))];
        } else {
            uniqueDiTypes = [...new Set(data.map(row => row && row['DI_type']).filter(Boolean))];
        }
        console.log('Unique DI_type values:', uniqueDiTypes);
        
        console.log(`Total UK only ASINs found: ${ukOnlyAsins.length}`);
        return ukOnlyAsins;
    }

    getEuOnlyAsins(asinList) {
        console.log('=== DEBUGGING EU ONLY ASINS (UNIVERSAL FORMAT) ===');
        
        if (!asinList) return [];
        
        let data = [];
        let isExcelFormat = false;
        
        // 检测数据格式
        if (Array.isArray(asinList)) {
            // CSV格式：直接是对象数组
            data = asinList;
            console.log('Detected CSV format');
        } else {
            // Excel格式：有sheet结构
            data = asinList.Sheet1 || asinList.sheet1 || asinList;
            if (!Array.isArray(data)) {
                const firstSheet = Object.keys(asinList)[0];
                if (firstSheet && Array.isArray(asinList[firstSheet])) {
                    data = asinList[firstSheet];
                }
            }
            isExcelFormat = Array.isArray(data) && Array.isArray(data[0]);
            console.log(`Detected Excel format: ${isExcelFormat}`);
        }
        
        if (!Array.isArray(data) || data.length === 0) {
            console.log('No valid data found');
            return [];
        }
        
        console.log(`Processing data: ${data.length} rows`);
        
        const euOnlyAsins = [];
        
        if (isExcelFormat) {
            // Excel格式：数组访问
            const dataRows = data.slice(3); // 跳过标题行
            console.log(`Excel: Processing ${dataRows.length} data rows`);
            
            dataRows.forEach((row, index) => {
                if (!row || !Array.isArray(row)) return;
                
                let asin, diType;
                
                // 检测列位置
                if (row[2] && String(row[2]).startsWith('B0')) {
                    asin = row[2]; // C列ASIN
                    diType = row[3]; // D列DI_type
                } else {
                    asin = row[1]; // B列ASIN
                    diType = row[2]; // C列DI_type
                }
                
                if (index < 5) {
                    console.log(`Excel EU Row ${index}: ASIN=${asin}, DI_type="${diType}"`);
                }
                
                if (diType === 'EU only' && asin && String(asin).startsWith('B0')) {
                    euOnlyAsins.push(asin);
                    console.log(`✓ Found EU only ASIN: ${asin}`);
                }
            });
        } else {
            // CSV格式：对象访问
            console.log(`CSV: Processing ${data.length} rows`);
            if (data.length > 0) {
                console.log('CSV columns:', Object.keys(data[0]));
            }
            
            data.forEach((row, index) => {
                if (!row) return;
                
                const asin = row['Asin'] || row['ASIN']; // 支持不同列名
                const diType = row['DI_type'];
                
                if (index < 5) {
                    console.log(`CSV EU Row ${index}: ASIN=${asin}, DI_type="${diType}"`);
                }
                
                if (diType === 'EU only' && asin && String(asin).startsWith('B0')) {
                    euOnlyAsins.push(asin);
                    console.log(`✓ Found EU only ASIN: ${asin}`);
                }
            });
        }
        
        console.log(`Total EU only ASINs found: ${euOnlyAsins.length}`);
        return euOnlyAsins;
    }

    getRemoteEnabledAsins(remoteFulfillmentStatus, countries) {
        if (!remoteFulfillmentStatus) return [];
        
        console.log('Remote fulfillment status keys:', Object.keys(remoteFulfillmentStatus));
        
        let data = remoteFulfillmentStatus.Enrollment_EU4 || remoteFulfillmentStatus['Enrollment_EU4'];
        
        if (!Array.isArray(data)) {
            console.log('Remote fulfillment data is not array:', typeof data);
            return [];
        }
        
        console.log('Remote fulfillment data length:', data.length);
        console.log('First 10 rows of raw data:');
        for (let i = 0; i < Math.min(10, data.length); i++) {
            console.log(`Row ${i}:`, data[i]);
        }
        
        const enabledAsins = [];
        
        // Try different starting points to find actual data
        let dataStartRow = 4;
        for (let startRow = 3; startRow < Math.min(10, data.length); startRow++) {
            const row = data[startRow];
            if (Array.isArray(row) && row[1] && typeof row[1] === 'string' && row[1].startsWith('B')) {
                dataStartRow = startRow;
                console.log(`Found data starting at row ${startRow}`);
                break;
            }
        }
        
        const dataRows = data.slice(dataStartRow);
        console.log(`Processing ${dataRows.length} data rows starting from row ${dataStartRow}`);
        
        if (dataRows.length === 0) {
            console.log('No data rows found');
            return [];
        }
        
        // Show first few data rows
        console.log('First 3 data rows:');
        for (let i = 0; i < Math.min(3, dataRows.length); i++) {
            console.log(`Data row ${i}:`, dataRows[i]);
        }
        
        // Column mapping based on the actual file structure
        const statusCols = {
            '法国': 3,    // 商品状态 for 法国
            '德国': 6,    // 商品状态 for 德国  
            '意大利': 9,  // 商品状态 for 意大利
            '西班牙': 12, // 商品状态 for 西班牙
            '英国': 15    // 商品状态 for 英国
        };
        
        dataRows.forEach((row, index) => {
            if (!Array.isArray(row) || !row[1]) return; // ASIN is in column 1
            
            const asin = row[1];
            if (typeof asin !== 'string' || !asin.startsWith('B')) return;
            
            if (index < 5) {
                console.log(`Checking ASIN ${asin}:`);
                countries.forEach(country => {
                    const statusCol = statusCols[country];
                    const status = row[statusCol];
                    console.log(`  ${country} (col ${statusCol}): ${status}`);
                });
            }
            
            const isEnabled = countries.some(country => {
                const statusCol = statusCols[country];
                if (statusCol === undefined) return false;
                
                const status = row[statusCol];
                const enabled = status && String(status).trim() === '已启用';
                
                if (enabled) {
                    console.log(`ASIN ${asin} enabled for ${country}: ${status}`);
                }
                return enabled;
            });
            
            if (isEnabled) {
                enabledAsins.push(asin);
            }
        });
        
        console.log(`Found ${enabledAsins.length} enabled ASINs for countries:`, countries);
        console.log('Enabled ASINs:', enabledAsins);
        return enabledAsins;
    }

    calculateRemoteFulfillmentRevenue(asins, remoteOrderReport, inventoryCountryFilter) {
        if (!remoteOrderReport || !asins.length) return 0;
        
        console.log('=== REMOTE FULFILLMENT ORDER REPORT DEBUGGING ===');
        console.log('Remote Order Report type:', typeof remoteOrderReport);
        console.log('Input ASINs:', asins);
        console.log('Inventory Country Filter:', inventoryCountryFilter);
        
        let data = Array.isArray(remoteOrderReport) ? remoteOrderReport : [];
        
        if (!Array.isArray(remoteOrderReport)) {
            console.log('Remote Order Report keys:', Object.keys(remoteOrderReport || {}));
            console.log('=== CHECKING ALL SHEETS ===');
            
            if (remoteOrderReport) {
                const keys = Object.keys(remoteOrderReport);
                keys.forEach(key => {
                    console.log(`Sheet "${key}":`, Array.isArray(remoteOrderReport[key]) ? `${remoteOrderReport[key].length} rows` : 'not array');
                    if (Array.isArray(remoteOrderReport[key])) {
                        console.log(`  First 3 rows of sheet "${key}":`);
                        for (let i = 0; i < Math.min(3, remoteOrderReport[key].length); i++) {
                            console.log(`    Row ${i}:`, remoteOrderReport[key][i]);
                        }
                    }
                });
                
                // Try to find the sheet with most data
                let bestSheet = null;
                let maxRows = 0;
                for (const key of keys) {
                    if (Array.isArray(remoteOrderReport[key]) && remoteOrderReport[key].length > maxRows) {
                        maxRows = remoteOrderReport[key].length;
                        bestSheet = key;
                    }
                }
                
                if (bestSheet) {
                    console.log(`Using sheet with most data: "${bestSheet}" with ${maxRows} rows`);
                    data = remoteOrderReport[bestSheet];
                } else {
                    console.log('No valid sheet found');
                }
            }
        }
        
        if (!Array.isArray(data) || data.length === 0) {
            console.log('No valid Remote Order Report data found');
            return 0;
        }
        
        console.log(`Remote Order Report data: ${data.length} rows`);
        console.log('All rows in Remote Order Report:');
        for (let i = 0; i < data.length; i++) {
            console.log(`Row ${i} (length: ${data[i] ? data[i].length : 'null'}):`, data[i]);
            
            // Show complete header row
            if (i === 1 && data[i]) {
                console.log('=== COMPLETE HEADER ROW ===');
                data[i].forEach((header, index) => {
                    console.log(`Column ${index}: "${header}"`);
                });
                
                // Find Item Price column
                const itemPriceCol = data[i].findIndex(h => h && h.toString().includes('Item Price'));
                console.log(`Item Price column index: ${itemPriceCol}`);
            }
        }
        
        if (data.length <= 2) {
            console.log('⚠️ WARNING: Remote Order Report has only', data.length, 'rows. Expected at least 3 rows (title + header + data)');
            console.log('This means there is no actual order data to process.');
            console.log('File might be empty or contain only headers.');
            return 0;
        }
        
        // Skip first row, use second row as header, data starts from row 3
        const dataRows = data.slice(2);
        console.log(`Processing ${dataRows.length} data rows (starting from row 3)`);
        console.log('Header row (row 2):', data[1]);
        console.log('First 3 data rows:', dataRows.slice(0, 3));
        
        // Calculate date 12 months ago
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
        console.log('12 months ago date:', twelveMonthsAgo.toISOString().split('T')[0]);
        
        let totalRevenue = 0;
        let matchCount = 0;
        let processedRows = 0;
        
        // Check column structure
        if (dataRows.length > 0) {
            console.log('Sample data row structure:');
            console.log('Column B (ASIN):', dataRows[0][1]);
            console.log('Column C (Inventory Country):', dataRows[0][2]);
            console.log('Column E (Purchase Date):', dataRows[0][4]);
            console.log('Column M (Item Price):', dataRows[0][12]);
        }
        
        asins.forEach((asin, asinIndex) => {
            console.log(`\n--- Processing ASIN ${asinIndex + 1}/${asins.length}: ${asin} ---`);
            
            const matchingRows = dataRows.filter((row, rowIndex) => {
                processedRows++;
                
                if (!row || !Array.isArray(row)) {
                    if (rowIndex < 3) console.log(`Row ${rowIndex}: Invalid row format`);
                    return false;
                }
                
                const rowAsin = row[8]; // I column (Product ASIN)
                const inventoryCountry = row[2]; // C column (Inventory Country)
                
                if (rowIndex < 3) {
                    console.log(`Row ${rowIndex}: ASIN=${rowAsin}, Country=${inventoryCountry}, Match ASIN=${rowAsin === asin}`);
                }
                
                // Check ASIN match
                if (rowAsin !== asin) return false;
                
                // Check inventory country filter
                let countryMatch = false;
                if (inventoryCountryFilter === 'GB') {
                    countryMatch = inventoryCountry === 'GB';
                } else {
                    countryMatch = inventoryCountry !== 'GB';
                }
                
                if (rowIndex < 10 && rowAsin === asin) {
                    console.log(`ASIN ${asin} Row ${rowIndex}: Country=${inventoryCountry}, Filter=${inventoryCountryFilter}, Match=${countryMatch}`);
                }
                
                return countryMatch;
            });
            
            console.log(`ASIN ${asin}: Found ${matchingRows.length} matching rows`);
            
            if (matchingRows.length > 0) {
                console.log(`First 3 matching rows for ASIN ${asin}:`);
                matchingRows.slice(0, 3).forEach((row, idx) => {
                    console.log(`Match ${idx}: Date=${row[4]}, Price=${row[12]}, Country=${row[2]}`);
                });
            }
            
            let asinRevenue = 0;
            let asinMatches = 0;
            
            matchingRows.forEach((row, rowIdx) => {
                const purchaseDate = row[4]; // E column (Purchase Date)
                const itemPrice = parseFloat(row[11]) || 0; // L column (Item Price)
                
                if (rowIdx < 5) {
                    console.log(`Processing match ${rowIdx}: Date="${purchaseDate}", Price="${row[12]}" -> ${itemPrice}`);
                }
                
                if (purchaseDate && typeof purchaseDate === 'string') {
                    // Clean the date string - remove [UTC] suffix if present
                    let cleanDate = purchaseDate.replace(/\[UTC\]$/, '');
                    const orderDate = new Date(cleanDate);
                    
                    if (rowIdx < 5) {
                        console.log(`Processing match ${rowIdx}: Date="${purchaseDate}" -> cleaned="${cleanDate}" -> parsed="${orderDate.toISOString().split('T')[0]}" -> valid=${!isNaN(orderDate.getTime())}`);
                    }
                    
                    // Check if date is valid and within last 12 months
                    if (!isNaN(orderDate.getTime()) && orderDate >= twelveMonthsAgo) {
                        totalRevenue += itemPrice;
                        asinRevenue += itemPrice;
                        matchCount++;
                        asinMatches++;
                        
                        if (matchCount <= 10) {
                            console.log(`✓ INCLUDED: ASIN ${asin}, Date: ${purchaseDate}, Price: ${itemPrice}, Country: ${row[2]}`);
                        }
                    } else {
                        if (rowIdx < 3) {
                            console.log(`✗ EXCLUDED (too old): ASIN ${asin}, Date: ${purchaseDate}, Price: ${itemPrice}`);
                        }
                    }
                } else {
                    if (rowIdx < 3) {
                        console.log(`✗ EXCLUDED (invalid date): ASIN ${asin}, Date: "${purchaseDate}"`);
                    }
                }
            });
            
            console.log(`ASIN ${asin} summary: ${asinMatches} valid matches, revenue: ${asinRevenue}`);
        });
        
        console.log(`\n=== FINAL SUMMARY ===`);
        console.log(`Total rows processed: ${processedRows}`);
        console.log(`Total valid matches: ${matchCount}`);
        console.log(`Total revenue: ${totalRevenue}`);
        console.log(`Filter used: ${inventoryCountryFilter}`);
        console.log(`Date range: ${twelveMonthsAgo.toISOString().split('T')[0]} to ${new Date().toISOString().split('T')[0]}`);
        
        return totalRevenue;
    }

    calculateRevenue(asins, skuReport, currency, marketplaces = null) {
        if (!skuReport || !asins.length) return `${currency}0`;
        
        console.log('=== SKU REPORT DEBUGGING ===');
        console.log('SKU Report type:', typeof skuReport);
        console.log('SKU Report is array:', Array.isArray(skuReport));
        
        let data = Array.isArray(skuReport) ? skuReport : [];
        
        if (!Array.isArray(skuReport)) {
            console.log('SKU Report keys:', Object.keys(skuReport || {}));
            // Try to find the correct sheet/data
            if (skuReport) {
                const keys = Object.keys(skuReport);
                for (const key of keys) {
                    if (Array.isArray(skuReport[key])) {
                        console.log(`Using SKU Report sheet: ${key} with ${skuReport[key].length} rows`);
                        data = skuReport[key];
                        break;
                    }
                }
            }
        }
        
        if (!Array.isArray(data)) {
            console.log('No valid SKU Report data found');
            return `${currency}0`;
        }
        
        console.log(`SKU Report data: ${data.length} rows`);
        console.log('First 3 rows:', data.slice(0, 3));
        
        // Skip header row if needed
        const dataRows = data.length > 0 && data[0] && data[0].includes && data[0].includes('ASIN') ? data.slice(1) : data;
        console.log(`After header check: ${dataRows.length} rows`);
        console.log('First 3 data rows:', dataRows.slice(0, 3));
        
        console.log(`Calculating revenue for ${asins.length} ASINs with currency ${currency}`);
        console.log('Target marketplaces:', marketplaces);
        console.log('Sample ASINs:', asins.slice(0, 3));
        
        // Check what marketplaces exist in the data - handle both formats
        let uniqueMarketplaces;
        if (dataRows.length > 0 && Array.isArray(dataRows[0])) {
            // Array format
            uniqueMarketplaces = [...new Set(dataRows.map(row => row && row[0]).filter(Boolean))];
            console.log('Detected array format SKU Report');
        } else {
            // Object format  
            uniqueMarketplaces = [...new Set(dataRows.map(row => row && row['亚马逊商城']).filter(Boolean))];
            console.log('Detected object format SKU Report');
        }
        console.log('Available marketplaces in SKU report:', uniqueMarketplaces);
        
        let totalRevenue = 0;
        let matchCount = 0;
        
        asins.forEach(asin => {
            // Find all rows matching this ASIN - handle both formats
            let matchingRows;
            if (dataRows.length > 0 && Array.isArray(dataRows[0])) {
                // Array format: ASIN in column 4 (E column)
                matchingRows = dataRows.filter(row => row && row[4] === asin);
            } else {
                // Object format: ASIN in 'ASIN' property
                matchingRows = dataRows.filter(row => row && row['ASIN'] === asin);
            }
            
            if (matchingRows.length > 0 && matchCount < 5) {
                console.log(`ASIN ${asin} found in ${matchingRows.length} rows`);
            }
            
            matchingRows.forEach(row => {
                let marketplace, netSales;
                
                if (Array.isArray(row)) {
                    // Array format
                    marketplace = row[0]; // A column
                    netSales = parseFloat(row[13]) || 0; // N column
                } else {
                    // Object format
                    marketplace = row['亚马逊商城'];
                    netSales = parseFloat(row['净销售额']) || 0;
                }
                
                // If marketplaces specified, filter by marketplace
                if (marketplaces && !marketplaces.includes(marketplace)) {
                    if (matchCount < 5) {
                        console.log(`- Skipping ASIN ${asin}, marketplace ${marketplace} not in target list`);
                    }
                    return; // Skip this row
                }
                
                totalRevenue += netSales;
                matchCount++;
                
                if (matchCount <= 5) {
                    console.log(`✓ ASIN ${asin}, Marketplace: ${marketplace}, Net Sales: ${netSales}`);
                }
            });
        });
        
        console.log(`Revenue calculation: ${matchCount} matches, total: ${totalRevenue}`);
        return `${currency}${Math.round(totalRevenue).toLocaleString()}`;
    }

    getHighPotentialAsins(asins, direction) {
        if (direction === 'uk') {
            // For UK direction: use only Germany recommendations
            const fileData = this.getFileData('germany');
            console.log('Germany file data found:', !!fileData);
            
            const highPotentialAsins = [];
            
            if (fileData) {
                console.log('Germany file keys:', Object.keys(fileData));
                let recommendations = fileData.Recommendations || fileData.Sheet1 || fileData;
                
                console.log('Recommendations type:', typeof recommendations, Array.isArray(recommendations));
                console.log('Recommendations length:', recommendations ? recommendations.length : 'null');
                
                // Check first 5 rows to find the actual header
                if (Array.isArray(recommendations)) {
                    console.log('=== CHECKING FIRST 5 ROWS FOR HEADER ===');
                    for (let i = 0; i < Math.min(5, recommendations.length); i++) {
                        console.log(`Row ${i}:`, recommendations[i]);
                    }
                    
                    // Find the row that contains "ASIN" - that's our header
                    let headerRowIndex = -1;
                    for (let i = 0; i < Math.min(10, recommendations.length); i++) {
                        if (recommendations[i] && recommendations[i].includes && recommendations[i].includes('ASIN')) {
                            headerRowIndex = i;
                            console.log(`Found header at row ${i}:`, recommendations[i]);
                            break;
                        }
                    }
                    
                    if (headerRowIndex >= 0) {
                        // Skip to data rows (header + 1)
                        recommendations = recommendations.slice(headerRowIndex + 1);
                        console.log(`Using data starting from row ${headerRowIndex + 1}, length: ${recommendations.length}`);
                    } else {
                        console.log('No header row found, using original slice(2)');
                        recommendations = recommendations.slice(2);
                    }
                    
                    console.log('First 3 data rows after header adjustment:', recommendations.slice(0, 3));
                }
                
                if (Array.isArray(recommendations)) {
                    console.log('Processing recommendations...');
                    console.log('Input ASINs to match:', asins.slice(0, 5), '(showing first 5)');
                    
                    let matchCount = 0;
                    recommendations.forEach((row, index) => {
                        if (!row || !Array.isArray(row)) return;
                        
                        const asin = row[2]; // C column (ASIN)
                        // Parse G column value, removing currency symbols and spaces
                        let potentialStr = row[6] || '';
                        if (typeof potentialStr === 'string') {
                            // Remove €, $, spaces, commas and parse
                            potentialStr = potentialStr.replace(/[€$\s,]/g, '');
                        }
                        const potential = parseFloat(potentialStr) || 0;
                        
                        if (index < 5) {
                            console.log(`Row ${index}: ASIN=${asin}, Raw G value="${row[6]}", Cleaned="${potentialStr}", Potential=${potential}, In input list=${asins.includes(asin)}`);
                        }
                        
                        if (asins.includes(asin)) {
                            matchCount++;
                            if (potential > 0) {
                                highPotentialAsins.push(asin);
                                console.log(`✓ ASIN ${asin} has high potential in UK: ${potential}`);
                            } else {
                                console.log(`- ASIN ${asin} matched but potential is 0: ${potential}`);
                            }
                        }
                    });
                    
                    console.log(`Total matches found: ${matchCount}, High potential: ${highPotentialAsins.length}`);
                }
            }
            
            return [...new Set(highPotentialAsins)];
        } else {
            // For EU direction: use multiple country recommendations
            const recommendationFiles = ['germany', 'france', 'italy', 'spain'];
            const highPotentialAsins = [];
            
            recommendationFiles.forEach(country => {
                const fileData = this.getFileData(country);
                if (fileData) {
                    let recommendations = fileData.Recommendations || fileData.Sheet1 || fileData;
                    
                    if (Array.isArray(recommendations) && recommendations.length > 2) {
                        recommendations = recommendations.slice(2);
                    }
                    
                    if (Array.isArray(recommendations)) {
                        recommendations.forEach(row => {
                            if (!row || !Array.isArray(row)) return;
                            
                            const asin = row[2];
                            const potential = parseFloat(row[6]) || 0;
                            
                            if (asins.includes(asin) && potential > 0) {
                                highPotentialAsins.push(asin);
                            }
                        });
                    }
                }
            });
            
            return [...new Set(highPotentialAsins)];
        }
    }

    calculatePotentialSales(asins, direction) {
        let totalPotential = 0;
        let processedAsins = [];
        
        console.log(`=== Calculating potential sales for ${direction} direction ===`);
        console.log(`Input ASINs (${asins.length}):`, asins);
        
        if (direction === 'eu') {
            // For EU direction: use 4 UK to EU recommendation files
            const recommendationFiles = [
                { country: 'france', key: 'unitedkingdomtofrancexlsx' },
                { country: 'germany', key: 'unitedkingdomtogermanyxlsx' }, 
                { country: 'italy', key: 'unitedkingdomtoitalyxlsx' },
                { country: 'spain', key: 'unitedkingdomtospainxlsx' }
            ];
            
            recommendationFiles.forEach(({ country, key }) => {
                const fileData = this.getFileData(key);
                console.log(`Processing ${country} recommendations with key '${key}':`, !!fileData);
                
                if (fileData) {
                    let recommendations = fileData.Recommendations || fileData.Sheet1 || fileData;
                    
                    // Read all data starting from row 1 (skip only row 0 if it's a title)
                    if (Array.isArray(recommendations) && recommendations.length > 1) {
                        recommendations = recommendations.slice(1);
                        console.log(`${country}: ${recommendations.length} rows after slice(1)`);
                    }
                    
                    if (Array.isArray(recommendations)) {
                        let countryMatches = 0;
                        let countryTotal = 0;
                        recommendations.forEach(row => {
                            if (!row || !Array.isArray(row)) return;
                            
                            const asin = row[2]; // C column (ASIN)
                            // Parse G column value, removing currency symbols and spaces
                            let potentialStr = row[6] || '';
                            if (typeof potentialStr === 'string') {
                                potentialStr = potentialStr.replace(/[€$\s,]/g, '');
                            }
                            const potential = parseFloat(potentialStr) || 0;
                            
                            if (asins.includes(asin)) {
                                countryMatches++;
                                if (potential > 0) {
                                    totalPotential += potential;
                                    countryTotal += potential;
                                    processedAsins.push({ asin, potential, country });
                                    console.log(`✓ Potential sales: ASIN ${asin} from ${country}: ${potential}`);
                                } else {
                                    console.log(`- ASIN ${asin} found in ${country} but potential is 0 or empty: "${row[6]}"`);
                                }
                            }
                        });
                        console.log(`${country}: ${countryMatches} ASIN matches found, total: ${countryTotal}`);
                    }
                } else {
                    console.log(`No data found for ${country} with key '${key}'`);
                }
            });
        } else if (direction === 'uk') {
            // For UK direction: use Germany to UK recommendation file only
            const fileData = this.getFileData('germany');
            if (fileData) {
                let recommendations = fileData.Recommendations || fileData.Sheet1 || fileData;
                
                // Read all data starting from row 1 (skip only row 0 if it's a title)
                if (Array.isArray(recommendations) && recommendations.length > 1) {
                    recommendations = recommendations.slice(1);
                }
                
                if (Array.isArray(recommendations)) {
                    recommendations.forEach(row => {
                        if (!row || !Array.isArray(row)) return;
                        
                        const asin = row[2]; // C column (ASIN)
                        // Parse G column value, removing currency symbols and spaces
                        let potentialStr = row[6] || '';
                        if (typeof potentialStr === 'string') {
                            potentialStr = potentialStr.replace(/[€$\s,]/g, '');
                        }
                        const potential = parseFloat(potentialStr) || 0;
                        
                        if (asins.includes(asin)) {
                            if (potential > 0) {
                                totalPotential += potential;
                                processedAsins.push({ asin, potential });
                                console.log(`✓ Potential sales: ASIN ${asin}: ${potential}`);
                            } else {
                                console.log(`- ASIN ${asin} found but potential is 0 or empty: "${row[6]}"`);
                            }
                        }
                    });
                }
            }
        }
        
        console.log(`Potential sales summary: ${processedAsins.length} ASINs processed, total: ${totalPotential}`);
        console.log('Missing ASINs:', asins.filter(asin => !processedAsins.some(p => p.asin === asin)));
        
        return `$${Math.round(totalPotential).toLocaleString()}`;
    }

    processGsiCredits(creditsData, skuReport, direction = 'uk', ukOnlyLocalAsins = []) {
        if (!creditsData || !skuReport) return null;
        
        console.log(`=== GSI CREDITS DEBUGGING (${direction}) ===`);
        console.log('Credits data type:', typeof creditsData);
        console.log('Credits data is array:', Array.isArray(creditsData));
        
        let dataArray = Array.isArray(creditsData) ? creditsData : [];
        if (dataArray.length === 0) {
            console.log('No GSI credits data found');
            return null;
        }
        
        console.log(`GSI Credits data: ${dataArray.length} rows`);
        console.log('First 3 rows:', dataArray.slice(0, 3));
        
        // Check the structure of the first few rows
        console.log('Checking row structure:');
        dataArray.slice(0, 3).forEach((row, index) => {
            if (row && typeof row === 'object') {
                console.log(`Row ${index} keys:`, Object.keys(row));
                console.log(`Row ${index} 资格值:`, row['资格值']);
                console.log(`Row ${index} 福利截止日:`, row['福利截止日']);
                console.log(`Row ${index} 代金券:`, row['可获得的福利代金券（最高）']);
            } else {
                console.log(`Row ${index} is not an object:`, typeof row, row);
            }
        });
        
        let skuData = Array.isArray(skuReport) ? skuReport : [];
        
        console.log('SKU Report debugging:');
        console.log('- SKU Report type:', typeof skuReport);
        console.log('- Is array:', Array.isArray(skuReport));
        console.log('- SKU data length:', skuData.length);
        
        if (!Array.isArray(skuReport) && skuReport) {
            console.log('- SKU Report keys:', Object.keys(skuReport));
            if (skuReport.Sheet1) {
                skuData = skuReport.Sheet1;
                console.log('- Using Sheet1, length:', skuData.length);
            }
        }
        
        if (skuData.length > 0) {
            console.log('- First row sample:', skuData[0]);
            console.log('- Second row sample:', skuData[1]);
        }
        
        const pAsins = [];
        const cAsins = [];
        const matchedPAsins = [];
        let totalCredits = 0;
        let validRowsCount = 0;
        
        console.log(`Processing GSI credits for ${direction} direction`);
        if (direction === 'eu') {
            console.log('UK only local ASINs for matching:', ukOnlyLocalAsins.length);
        } else if (direction === 'uk') {
            console.log('EU only local ASINs for matching:', ukOnlyLocalAsins.length); // This is actually euOnlyLocalAsins
        }
        
        // Show sample parent ASINs from SKU Report
        console.log('Debugging SKU Report parent ASIN column:');
        console.log('First 5 rows D column values:', skuData.slice(0, 5).map(row => row ? row[3] : null));
        console.log('First 5 rows full structure:', skuData.slice(0, 5).map(row => row ? {
            marketplace: row[0],
            parentAsin: row[3], 
            asin: row[4],
            netSales: row[13]
        } : null));
        
        const sampleParentAsins = [...new Set(skuData.slice(0, 20).map(row => row && row[3]).filter(Boolean))];
        console.log('Sample parent ASINs in SKU Report:', sampleParentAsins.slice(0, 10));
        
        dataArray.forEach((row, index) => {
            if (!row || typeof row !== 'object') return;
            
            // Handle both object and array formats
            const benefitEndDate = row['福利截止日'] || row[4];
            const pAsin = row['资格值'] || row[2];
            const creditText = row['可获得的福利代金券（最高）'] || row[3];
            
            if (!benefitEndDate || !benefitEndDate.includes('2025-10-07')) {
                if (index < 5) console.log(`Row ${index}: Skipping, benefit date: ${benefitEndDate}`);
                return;
            }
            
            validRowsCount++;
            
            if (index < 5) {
                console.log(`Row ${index}: P-ASIN=${pAsin}, Credits=${creditText}, Benefit date=${benefitEndDate}`);
            }
            
            if (pAsin) {
                pAsins.push(pAsin);
                let hasMatchingCAsins = false;
                
                if (direction === 'eu') {
                    // For EU direction: P-ASIN -> SKU report (父 ASIN) where 亚马逊商城 = "GB" -> get ASIN -> match with ukOnlyLocalAsins
                    const matchingRows = skuData.filter(skuRow => {
                        if (!skuRow) return false;
                        
                        // Handle both array and object formats
                        const parentAsin = Array.isArray(skuRow) ? skuRow[3] : skuRow['父 ASIN'];
                        const marketplace = Array.isArray(skuRow) ? skuRow[0] : skuRow['亚马逊商城'];
                        
                        return parentAsin === pAsin && marketplace === 'GB';
                    });
                    
                    if (validRowsCount <= 5) {
                        console.log(`P-ASIN ${pAsin} search in SKU Report (EU direction):`);
                        console.log(`- Found ${matchingRows.length} GB marketplace matches`);
                        
                        // Check if P-ASIN exists in any marketplace
                        const allMatches = skuData.filter(skuRow => {
                            if (!skuRow) return false;
                            const parentAsin = Array.isArray(skuRow) ? skuRow[3] : skuRow['父 ASIN'];
                            return parentAsin === pAsin;
                        });
                        console.log(`- Found ${allMatches.length} total matches (any marketplace)`);
                        if (allMatches.length > 0) {
                            const marketplaces = allMatches.map(row => Array.isArray(row) ? row[0] : row['亚马逊商城']);
                            console.log(`- Marketplaces: ${marketplaces.join(', ')}`);
                        }
                    }
                    
                    matchingRows.forEach(skuRow => {
                        const cAsin = Array.isArray(skuRow) ? skuRow[4] : skuRow['ASIN'];
                        if (cAsin && ukOnlyLocalAsins.includes(cAsin)) {
                            cAsins.push(cAsin);
                            hasMatchingCAsins = true;
                            console.log(`✓ EU GSI: P-ASIN ${pAsin} -> C-ASIN ${cAsin} (matched with UK only local)`);
                        } else if (cAsin) {
                            if (validRowsCount <= 3) {
                                console.log(`- C-ASIN ${cAsin} not in UK only local list (${ukOnlyLocalAsins.length} total)`);
                            }
                        }
                    });
                } else if (direction === 'uk') {
                    // For UK direction: P-ASIN -> SKU report (父 ASIN) where 亚马逊商城 != "GB" -> get ASIN -> match with euOnlyLocalAsins
                    const matchingRows = skuData.filter(skuRow => {
                        if (!skuRow) return false;
                        
                        // Handle both array and object formats
                        const parentAsin = Array.isArray(skuRow) ? skuRow[3] : skuRow['父 ASIN'];
                        const marketplace = Array.isArray(skuRow) ? skuRow[0] : skuRow['亚马逊商城'];
                        
                        return parentAsin === pAsin && marketplace !== 'GB';
                    });
                    
                    if (validRowsCount <= 5) {
                        console.log(`P-ASIN ${pAsin} search in SKU Report:`);
                        console.log(`- Found ${matchingRows.length} non-GB marketplace matches`);
                        
                        // Check if P-ASIN exists in any marketplace
                        const allMatches = skuData.filter(skuRow => {
                            if (!skuRow) return false;
                            const parentAsin = Array.isArray(skuRow) ? skuRow[3] : skuRow['父 ASIN'];
                            return parentAsin === pAsin;
                        });
                        console.log(`- Found ${allMatches.length} total matches (any marketplace)`);
                        if (allMatches.length > 0) {
                            const marketplaces = allMatches.map(row => Array.isArray(row) ? row[0] : row['亚马逊商城']);
                            console.log(`- Marketplaces: ${marketplaces.join(', ')}`);
                        }
                    }
                    
                    matchingRows.forEach(skuRow => {
                        const cAsin = Array.isArray(skuRow) ? skuRow[4] : skuRow['ASIN'];
                        if (cAsin && ukOnlyLocalAsins.includes(cAsin)) { // ukOnlyLocalAsins is actually euOnlyLocalAsins for UK direction
                            cAsins.push(cAsin);
                            hasMatchingCAsins = true;
                            console.log(`✓ UK GSI: P-ASIN ${pAsin} -> C-ASIN ${cAsin} (matched with EU only local)`);
                        } else if (cAsin) {
                            if (validRowsCount <= 3) {
                                console.log(`- C-ASIN ${cAsin} not in EU only local list (${ukOnlyLocalAsins.length} total)`);
                            }
                        }
                    });
                } else {
                    // Original logic for backward compatibility
                    const matchingRows = skuData.filter(skuRow => skuRow && skuRow[3] === pAsin);
                    matchingRows.forEach(skuRow => {
                        const cAsin = skuRow[4];
                        if (cAsin) {
                            cAsins.push(cAsin);
                            hasMatchingCAsins = true;
                        }
                    });
                }
                
                // Only count P-ASIN if it has matching C-ASINs
                if (hasMatchingCAsins) {
                    matchedPAsins.push(pAsin);
                }
                
                if (creditText) {
                    const creditMatch = String(creditText).match(/(\d+)/);
                    if (creditMatch) {
                        totalCredits += parseInt(creditMatch[1]);
                    }
                }
            }
        });
        
        console.log(`GSI ${direction} summary:`);
        console.log(`- Valid rows (2025-10-07): ${validRowsCount}`);
        console.log(`- Total P-ASINs: ${pAsins.length}`);
        console.log(`- Sample P-ASINs: ${[...new Set(pAsins)].slice(0, 5)}`);
        console.log(`- Matched P-ASINs: ${[...new Set(matchedPAsins)].length}`);
        console.log(`- Total C-ASINs: ${[...new Set(cAsins)].length}`);
        console.log(`- Total credits: ${totalCredits}`);
        
        return {
            pAsinCount: [...new Set(matchedPAsins)].length,
            cAsinCount: [...new Set(cAsins)].length,
            totalCredits: totalCredits,
            cAsins: [...new Set(cAsins)]
        };
    }



}

export default DiReportGenerator;
