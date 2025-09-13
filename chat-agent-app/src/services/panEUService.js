import * as XLSX from 'xlsx';

let uploadedData = {};

function getFileTypeKey(filename) {
	const name = filename.toLowerCase().replace(/[-\s]/g, '');
	if (name.includes('sku') && (name.includes('report') || name.includes('销售'))) return 'skuReport';
	if (name.includes('paneu') && !name.includes('expansion') && !name.includes('checkli')) return 'paneuReport';
	if (name.includes('库存') || name.includes('inventory')) return 'inventoryReport';
	return null;
}

// VAT费用数据
const vatCostData = {
	'UK': { cost: 218, time: '8-16 weeks' },
	'DE': { cost: 298, time: '8-12 weeks' },
	'FR': { cost: 1377, time: '16-24 weeks' },
	'IT': { cost: 978, time: '1 week' },
	'ES': { cost: 2375, time: '8-12 weeks' }
};

/**
 * 读取文件（CSV/Excel），返回二维数组
 * @param {File} file - 要读取的文件
 * @returns {Promise<Array>} 返回解析后的二维数组
 */
async function readFile(file) {
	const extension = file.name.split('.').pop().toLowerCase();
  
	// CSV 文件
	if (extension === 'csv') {
	  // 尝试 UTF-8
	  try {
		const text = await file.text(); // 默认 UTF-8
		return parseCSV(text);
	  } catch (errUtf8) {
		console.warn('UTF-8 parse failed, trying GBK fallback', errUtf8);
		// 尝试 GBK
		try {
		  const arrayBuffer = await file.arrayBuffer();
		  let text = '';
		  try {
			text = new TextDecoder('gbk').decode(arrayBuffer);
		  } catch (tdErr) {
			console.warn('TextDecoder gbk not supported, fallback to Latin1', tdErr);
			const arr = new Uint8Array(arrayBuffer);
			text = Array.from(arr).map(v => String.fromCharCode(v)).join('');
		  }
		  return parseCSV(text);
		} catch (errGbk) {
		  throw new Error('CSV 文件解析失败：' + errGbk.message);
		}
	  }
	} else {
	  // Excel 文件
	  try {
		const buffer = await file.arrayBuffer();
		const data = new Uint8Array(buffer);
		const workbook = XLSX.read(data, { type: 'array' });
		const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
		// header:1 保留第一行
		return XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: null });
	  } catch (err) {
		throw new Error('Excel 文件解析失败：' + err.message);
	  }
	}
  }
  

function parseCSV(text) {
	const lines = text.split('\n');
	const result = [];
	for (let line of lines) {
		if (line.trim()) {
			const row = [];
			let current = '';
			let inQuotes = false;
			for (let i = 0; i < line.length; i++) {
				const char = line[i];
				if (char === '"') {
					inQuotes = !inQuotes;
				} else if (char === ',' && !inQuotes) {
					row.push(current.trim());
					current = '';
				} else {
					current += char;
				}
			}
			row.push(current.trim());
			result.push(row);
		}
	}
	return result;
}

function normalizeCountry(country) {
	const mapping = {
		'GB': 'UK', 'UK': 'UK', '英国': 'UK',
		'DE': 'DE', '德国': 'DE',
		'FR': 'FR', '法国': 'FR',
		'ES': 'ES', '西班牙': 'ES',
		'IT': 'IT', '意大利': 'IT',
		'NL': 'NL', '荷兰': 'NL',
		'PL': 'PL', '波兰': 'PL',
		'SE': 'SE', '瑞典': 'SE'
	};
	return mapping[country] || country;
}

export async function analyzePanEUOpportunitiesAuto(files, expansionChecklist) {

  
	for (const file of files) {
	  const fileTypeKey = getFileTypeKey(file.name);
	  if (!fileTypeKey) continue; // 跳过不识别文件
  
	  try {
		const data = await readFile(file); // 使用 Promise 版本 readFile
		uploadedData[fileTypeKey] = data;
	  } catch (err) {
		console.error(`读取文件失败: ${file.name}`, err);
		uploadedData[fileTypeKey] = null; // 可选：标记失败
	  }
	}
  
	// 全部文件处理完成后生成表格
	return generateTable1(expansionChecklist, uploadedData);
  }
  

function generateTable1(expansionChecklist) {
	try {
		const paneuData = uploadedData.paneuReport;
		const inventoryData = uploadedData.inventoryReport;
		const skuData = uploadedData.skuReport;
		
		if (!paneuData || !skuData) {
			throw new Error('请至少上传SKU Report和PanEU Report')
		}

		// Process SKU report data for financial calculations
		let skuFinancialMap = {};
		if (skuData) {
			const skuHeaders = skuData[0];
			const skuRows = skuData.slice(1);
			
			console.log('SKU Headers:', skuHeaders);
			
			console.log('All SKU Headers with indices:');
			skuHeaders.forEach((header, index) => {
				if (header && (header.includes('配送费用') || header.includes('ASIN'))) {
					console.log(`${index}: "${header}"`);
				}
			});
			
			// Find column indices in SKU report - exact matching
			const asinSkuCol = skuHeaders.findIndex(h => h === 'ASIN');
			const deliveryFeeTotalCol = skuHeaders.findIndex(h => h === '亚马逊物流配送费用（总计）');
			const netSalesCol = skuHeaders.findIndex(h => h === '净销售额');
			
			console.log('SKU Report columns:', {asinSkuCol, deliveryFeeTotalCol, netSalesCol});
			console.log('Found headers:', {
				asin: skuHeaders[asinSkuCol],
				delivery: skuHeaders[deliveryFeeTotalCol], 
				sales: skuHeaders[netSalesCol]
			});
			
			skuRows.forEach(row => {
				if (row && row[asinSkuCol]) {
					const asin = row[asinSkuCol];
					const deliveryFeeStr = row[deliveryFeeTotalCol] || '0';
					const netSalesStr = row[netSalesCol] || '0';
					
					// Clean and parse numbers - remove currency symbols and commas
					const deliveryFee = parseFloat(String(deliveryFeeStr).replace(/[€$£,]/g, '')) || 0;
					const netSales = parseFloat(String(netSalesStr).replace(/[€$£,]/g, '')) || 0;
					
					if (!skuFinancialMap[asin]) {
						skuFinancialMap[asin] = { deliveryFee: 0, netSales: 0 };
					}
					skuFinancialMap[asin].deliveryFee += deliveryFee;
					skuFinancialMap[asin].netSales += netSales;
				}
			});
			
			console.log('SKU Financial Map entries:', Object.keys(skuFinancialMap).length);
			console.log('Sample financial data:', Object.entries(skuFinancialMap).slice(0, 3));
		}

		// Find actual header row for PanEU data
		let paneuHeaders = null;
		let headerRowIndex = 0;
		
		// Try to find header row with more flexible matching
		for (let i = 0; i < Math.min(10, paneuData.length); i++) {
			const row = paneuData[i];
			if (row && row.length > 0) {
				// Check if this row has meaningful headers
				const hasHeaders = row.some(cell => {
					if (!cell || typeof cell !== 'string') return false;
					const cellLower = cell.toLowerCase();
					return cellLower.includes('asin') || 
						   cellLower.includes('fnsku') || 
						   cellLower.includes('pan-eu') || 
						   cellLower.includes('status') || 
						   cellLower.includes('title') ||
						   cellLower.includes('offer') ||
						   cellLower.includes('merchantsku');
				});
				
				if (hasHeaders) {
					paneuHeaders = row;
					headerRowIndex = i;
					break;
				}
			}
		}
		
		// If still no headers found, use first non-empty row
		if (!paneuHeaders) {
			for (let i = 0; i < paneuData.length; i++) {
				if (paneuData[i] && paneuData[i].length > 0 && paneuData[i].some(cell => cell)) {
					paneuHeaders = paneuData[i];
					headerRowIndex = i;
					console.log('Using first non-empty row as headers:', paneuHeaders);
					break;
				}
			}
		}
		
		if (!paneuHeaders) {
			throw new Error('PanEU文件为空或格式错误')
		}

		console.log('Found PanEU Headers at row', headerRowIndex, ':', paneuHeaders);
		if (inventoryData) console.log('Inventory Headers:', inventoryData[0]);

		const paneuRows = paneuData.slice(headerRowIndex + 1);
		
		// Find column indices
		const asinCol = paneuHeaders.findIndex(h => h && typeof h === 'string' && (h.includes('ASIN') || h.includes('asin')));
		const fnskuCol = paneuHeaders.findIndex(h => h && typeof h === 'string' && h === 'FNSKU');
		const statusCol = paneuHeaders.findIndex(h => h && typeof h === 'string' && (h.includes('Pan-EU status') || h.includes('status')));
		const titleCol = paneuHeaders.findIndex(h => h && typeof h === 'string' && (h.includes('Title') || h.includes('title')));
		
		console.log('Column indices:', {asinCol, fnskuCol, statusCol, titleCol});
		
		// Offer status columns
		const offerCols = {
			DE: paneuHeaders.findIndex(h => h && typeof h === 'string' && (h.includes('DE offer') || h.includes('德国'))),
			FR: paneuHeaders.findIndex(h => h && typeof h === 'string' && (h.includes('FR offer') || h.includes('法国'))),
			IT: paneuHeaders.findIndex(h => h && typeof h === 'string' && (h.includes('IT offer') || h.includes('意大利'))),
			ES: paneuHeaders.findIndex(h => h && typeof h === 'string' && (h.includes('ES offer') || h.includes('西班牙'))),
			NL: paneuHeaders.findIndex(h => h && typeof h === 'string' && (h.includes('NL offer') || h.includes('荷兰')))
		};

		console.log('Offer columns:', offerCols);

		// Process inventory data - create both inventory and FNSKU->ASIN mapping
		let inventoryMap = {};
		let fnskuToAsinMap = {};
		if (inventoryData) {
			const invHeaders = inventoryData[0];
			const invRows = inventoryData.slice(1);
			const fnskuInvCol = invHeaders.findIndex(h => h && h.includes('fulfillment-channel-sku'));
			const asinInvCol = invHeaders.findIndex(h => h && h.includes('asin'));
			const countryCol = invHeaders.findIndex(h => h && h.includes('country'));
			const quantityCol = invHeaders.findIndex(h => h && h.includes('quantity-for-local-fulfillment'));
			
			console.log('Inventory columns:', {fnskuInvCol, asinInvCol, countryCol, quantityCol});
			
			invRows.forEach(row => {
				if (row && row[countryCol] && row[fnskuInvCol]) {
					const country = normalizeCountry(row[countryCol]);
					const fnsku = row[fnskuInvCol];
					const asin = row[asinInvCol];
					const quantity = parseInt(row[quantityCol]) || 0;
					
					// Build FNSKU->ASIN mapping
					if (asin && !fnskuToAsinMap[fnsku]) {
						fnskuToAsinMap[fnsku] = asin;
					}
					
					// Build inventory map (exclude UK)
					if (country !== 'UK') {
						if (fnsku) {
							if (!inventoryMap[fnsku]) inventoryMap[fnsku] = 0;
							inventoryMap[fnsku] += quantity;
						}
					}
				}
			});
			
			console.log('FNSKU to ASIN mappings:', Object.keys(fnskuToAsinMap).length);
			console.log('FNSKU inventory entries:', Object.keys(inventoryMap).length);
		}

		console.log('Starting ASIN processing...');
		console.log('paneuRows length:', paneuRows.length);
		console.log('inventoryMap keys:', Object.keys(inventoryMap).length);

		// Analyze each ASIN
		const analysis = {
			'缺少1至2个报价': [],
			'缺少3个报价（仅在X国可售）': [],
			'缺少3个报价-仅DE可售': [],
			'缺少3个报价-仅FR可售': [],
			'缺少3个报价-仅IT可售': [],
			'缺少3个报价-仅ES可售': [],
			'缺少3个报价-仅NL可售': [],
			'失效PanEU ASIN': [],
			'缺少荷兰(NL)报价ASIN': []
		};

		let processedCount = 0;
		let skippedCount = 0;

		let statusBreakdown = {};
		let statusWithInventory = {};
		let eligibleForClassification = 0;
		let sampleEligible = [];
		let foundValidOffers = 0;
		let sampleValidOffers = [];
		
		// Track processed ASINs to avoid duplicates
		let processedASINs = new Set();

		for (let i = 0; i < paneuRows.length; i++) {
			const row = paneuRows[i];
			
			if (!row || row.length === 0) {
				skippedCount++;
				continue;
			}
			
			processedCount++;
			
			if (processedCount % 500 === 0) {
				console.log('Processed', processedCount, 'ASINs...');
			}
			
			const fnsku = row[fnskuCol];
			const status = row[statusCol];
			const title = row[titleCol];
			
			// Get ASIN from inventory mapping via FNSKU
			const asin = fnskuToAsinMap[fnsku];
			if (!asin) {
				skippedCount++;
				continue;
			}
			
			// Skip if ASIN already processed (deduplication)
			if (processedASINs.has(asin)) {
				skippedCount++;
				continue;
			}
			processedASINs.add(asin);
			
			// Calculate inventory - FNSKU matching only
			const inv = inventoryMap[fnsku] || 0;
			
			// Debug first few rows to see actual offer values
			if (processedCount <= 3) {
				console.log(`Sample ${processedCount} offers:`, {
					asin, 
					DE: row[offerCols.DE], 
					FR: row[offerCols.FR],
					IT: row[offerCols.IT],
					ES: row[offerCols.ES],
					NL: row[offerCols.NL]
				});
			}

			// Count offers - only numeric values or € symbols count as valid offers
			let offerCount = 0;
			let activeCountries = [];
			let hasValidOffer = false;
			
			Object.keys(offerCols).forEach(country => {
				const colIndex = offerCols[country];
				if (colIndex >= 0) {
					const value = row[colIndex];
					if (value && value !== '' && value !== null && value !== undefined) {
						// Check if value contains currency symbols or is a number
						const valueStr = String(value);
						const hasCurrency = valueStr.includes('€') || valueStr.includes('£') || valueStr.includes('$');
						const isNumeric = !isNaN(parseFloat(valueStr)) && isFinite(valueStr);
						
						if (processedCount <= 3) {
							console.log(`${country}: "${value}" -> hasCurrency: ${hasCurrency}, isNumeric: ${isNumeric}`);
						}
						
						if (hasCurrency || isNumeric) {
							offerCount++;
							activeCountries.push(country);
							hasValidOffer = true;
						}
					}
				}
			});

			// Track status breakdown
			if (!statusBreakdown[status]) statusBreakdown[status] = 0;
			statusBreakdown[status]++;
			
			if (inv > 0) {
				if (!statusWithInventory[status]) statusWithInventory[status] = 0;
				statusWithInventory[status]++;
				
				// Debug: Show the single Eligible ASIN with inventory
				if (status === 'Eligible') {
					console.log('Found Eligible ASIN with inventory:', {
						asin, status, inv, offerCount,
						offers: {
							UK: row[offerCols.UK],
							DE: row[offerCols.DE],
							FR: row[offerCols.FR],
							IT: row[offerCols.IT],
							ES: row[offerCols.ES],
							NL: row[offerCols.NL]
						}
					});
					console.log('Eligible ASIN offer details:', {
						UK: `"${row[offerCols.UK]}" (${typeof row[offerCols.UK]})`,
						DE: `"${row[offerCols.DE]}" (${typeof row[offerCols.DE]})`,
						FR: `"${row[offerCols.FR]}" (${typeof row[offerCols.FR]})`,
						IT: `"${row[offerCols.IT]}" (${typeof row[offerCols.IT]})`,
						ES: `"${row[offerCols.ES]}" (${typeof row[offerCols.ES]})`,
						NL: `"${row[offerCols.NL]}" (${typeof row[offerCols.NL]})`
					});
				}
			}

			// Track ASINs with valid offers for debugging
			if (hasValidOffer) {
				foundValidOffers++;
				if (sampleValidOffers.length < 5) {
					sampleValidOffers.push({
						asin, 
						status,
						inv,
						offerCount,
						offers: {
							UK: row[offerCols.UK],
							DE: row[offerCols.DE],
							FR: row[offerCols.FR],
							IT: row[offerCols.IT],
							ES: row[offerCols.ES],
							NL: row[offerCols.NL]
						}
					});
				}
			}

			// Track ASINs eligible for classification (not enrolled + has inventory + has offers)
			if (status.toLowerCase() !== 'enrolled' && inv > 0 && offerCount > 0) {
				eligibleForClassification++;
				if (sampleEligible.length < 5) {
					sampleEligible.push({
						asin,
						status,
						inv,
						offerCount,
						offers: {
							UK: row[offerCols.UK],
							DE: row[offerCols.DE],
							FR: row[offerCols.FR],
							IT: row[offerCols.IT],
							ES: row[offerCols.ES],
							NL: row[offerCols.NL]
						}
					});
				}
			}

			const rowData = {
				asin, title, status, inv, offerCount, activeCountries,
				offers: {
					DE: row[offerCols.DE] || '',
					FR: row[offerCols.FR] || '',
					IT: row[offerCols.IT] || '',
					ES: row[offerCols.ES] || '',
					NL: row[offerCols.NL] || ''
				}
			};

			// Debug first few rows
			if (processedCount <= 5) {
				console.log(`Sample ${processedCount}:`, {
					asin, status, inv, offerCount, 
					statusCheck: status !== 'enrolled',
					invCheck: inv > 0,
					offers: rowData.offers
				});
			}

			// Classification logic with correct Pan-EU status requirements
			const statusLower = status.toLowerCase();
			
			// 缺少1至2个报价: inv>0 + 2-3国offer + eligible/ineligible status
			if (inv > 0 && (offerCount === 2 || offerCount === 3) && 
				(statusLower === 'eligible' || statusLower === 'ineligible')) {
				analysis['缺少1至2个报价'].push(rowData);
			}

			// 缺少3个报价: inv>0 + 1国offer + eligible/ineligible status
			if (inv > 0 && offerCount === 1 && 
				(statusLower === 'eligible' || statusLower === 'ineligible')) {
				
				// 找出具体是哪个国家有offer
				let activeCountry = '';
				Object.keys(offerCols).forEach(country => {
					const colIndex = offerCols[country];
					if (colIndex >= 0) {
						const value = row[colIndex];
						if (value && value !== '' && value !== null && value !== undefined) {
							const valueStr = String(value);
							const hasCurrency = valueStr.includes('€') || valueStr.includes('£') || valueStr.includes('$');
							const isNumeric = !isNaN(parseFloat(valueStr)) && isFinite(valueStr);
							
							if (hasCurrency || isNumeric) {
								activeCountry = country;
							}
						}
					}
				});
				
				// 添加到总类别和具体国家类别
				analysis['缺少3个报价（仅在X国可售）'].push(rowData);
				if (activeCountry) {
					const countryKey = `缺少3个报价-仅${activeCountry}可售`;
					if (analysis[countryKey]) {
						analysis[countryKey].push(rowData);
					}
				}
			}

			// 失效PanEU ASIN: inv>0 + 1-4国offer + Enrolment ended/ending soon status
			if (inv > 0 && (offerCount >= 1 && offerCount <= 4) && 
				(statusLower.includes('enrolment ended') || statusLower.includes('enrolment ending soon'))) {
				analysis['失效PanEU ASIN'].push(rowData);
			}

			// 缺少荷兰报价: inv>0 + 4国offer + Enrolment ended/ending soon status + NL无报价
			if (inv > 0 && offerCount === 4 && 
				(statusLower.includes('enrolment ended') || statusLower.includes('enrolment ending soon'))) {
				const nlValue = row[offerCols.NL];
				if (!nlValue || (typeof nlValue === 'string' && 
					!nlValue.toLowerCase().includes('active') && 
					!nlValue.includes('€'))) {
					analysis['缺少荷兰(NL)报价ASIN'].push(rowData);
				}
			}
		}

		console.log('Processing complete!');
		console.log('Total rows:', paneuRows.length);
		console.log('Processed ASINs (after deduplication):', processedCount);
		console.log('Unique ASINs processed:', processedASINs.size);
		console.log('Skipped rows:', skippedCount);
		console.log('Pan-EU Status breakdown:', statusBreakdown);
		console.log('Pan-EU Status with inventory > 0:', statusWithInventory);
		console.log('ASINs with valid offers found:', foundValidOffers);
		console.log('ASINs eligible for classification (not enrolled + inv>0 + offers>0):', eligibleForClassification);
		
		if (sampleValidOffers.length > 0) {
			console.log('Sample ASINs with valid offers:');
			sampleValidOffers.forEach((sample, index) => {
				console.log(`Valid offer ${index + 1}:`, sample);
			});
		}
		
		if (sampleEligible.length > 0) {
			console.log('Sample eligible ASINs for classification:');
			sampleEligible.forEach((sample, index) => {
				console.log(`Eligible ${index + 1}:`, sample);
			});
		} else {
			console.log('No ASINs found that meet classification criteria (not enrolled + inventory > 0 + offers > 0)');
		}
		
		console.log('Results:', {
			'缺少1至2个报价': analysis['缺少1至2个报价'].length,
			'缺少3个报价（仅在X国可售）': analysis['缺少3个报价（仅在X国可售）'].length,
			'失效PanEU ASIN': analysis['失效PanEU ASIN'].length,
			'缺少荷兰(NL)报价ASIN': analysis['缺少荷兰(NL)报价ASIN'].length
		});

		// Debug: Compare ASIN lists
		console.log('=== DEBUGGING ASIN DIFFERENCES ===');
		Object.keys(analysis).forEach(category => {
			const asins = analysis[category];
			console.log(`${category}: ${asins.length} ASINs`);
			if (asins.length > 0) {
				console.log(`First 3 ASINs:`, asins.slice(0, 3).map(a => a.asin));
			}
		});

		// Log analysis object before displayResults
		console.log('=== BEFORE displayResults ===');
		Object.keys(analysis).forEach(category => {
			console.log(`${category}: ${analysis[category].length} ASINs`);
		});

		// Freeze analysis object to prevent further modification
		Object.freeze(analysis);
		Object.keys(analysis).forEach(key => Object.freeze(analysis[key]));

		// Generate Table2 first (placement optimization)
		console.log('Checking for expansion checklist:', !!uploadedData.expansionChecklist);
		const cost_save = generateTable2HTML(expansionChecklist);
		
		
		// Then generate Table1 (ASIN level opportunities)
		console.log('Generating Table1...');
		const excelData = displayResults(analysis, skuFinancialMap);

		// 统计 荷兰政策
		const nlPolicy = countNlPolicy(paneuData)

		// 统计 德国 销售数量
		const totalSoldDE = sumSoldCountByMarketplace(skuData, "DE")

		const report = {
			report_title: 'PanEU选品拓展机会分析报告',
			report_subtitle: ``,
			note: '点击蓝色数字可查看对应的ASIN详情',
			excel_data: excelData,
	
			cost_save: cost_save,
	
			nlPolicy: nlPolicy,
	
			totalSoldDE: totalSoldDE
	
		};


		return report;


		
	} catch (error) {
		throw new Error('Paneu处理报错：' + error.message)
	}
}

function displayResults(analysis, skuFinancialMap = {}) {
	console.log('Displaying results:', analysis);
	
	// Calculate financial benefits
	function calculateSavings(asins, type) {
		let totalDeliveryFee = 0;
		let totalNetSales = 0;
		let matchedCount = 0;
		let debugInfo = [];
		
		asins.forEach(asin => {
			const financial = skuFinancialMap[asin.asin];
			if (financial) {
				matchedCount++;
				totalDeliveryFee += financial.deliveryFee;
				totalNetSales += financial.netSales;
				debugInfo.push({asin: asin.asin, deliveryFee: financial.deliveryFee, netSales: financial.netSales});
			}
		});
		
		let result = 0;
		if (type === 'delivery') {
			result = totalDeliveryFee * 0.5; // 配送费用总和 * 0.5
		} else if (type === 'sales') {
			result = totalNetSales * 0.24; // 净销售额总和 * 0.24
		}
		
		console.log(`${type} calculation:`, {
			totalAsins: asins.length,
			matchedCount,
			totalDeliveryFee,
			totalNetSales,
			result: Math.round(result),
			debugInfo: debugInfo.slice(0, 5)
		});
		
		return Math.round(result);
	}
	
	// Debug: Compare with expected counts
	console.log('=== DISPLAY RESULTS COMPARISON ===');
	Object.keys(analysis).forEach(category => {
		const asins = analysis[category];
		console.log(`${category}: ${asins.length} ASINs`);
		if (asins.length > 0) {
			console.log(`First 3 ASINs:`, asins.slice(0, 3).map(a => a.asin));
		}
	});

	// 计算已加入PanEU的总数和国家分布
	const paneuJoinedTotal = analysis['缺少1至2个报价'].length + analysis['缺少3个报价（仅在X国可售）'].length;
	const paneuJoinedAsins = [...analysis['缺少1至2个报价'], ...analysis['缺少3个报价（仅在X国可售）']];
	
	// 统计有数据的国家
	const countriesWithData = ['DE','FR','IT','ES','NL'].filter(c => analysis[`缺少3个报价-仅${c}可售`].length > 0);
	const singleCountry = countriesWithData.length === 1 ? countriesWithData[0] : null;

	// Calculate financial benefits for subcategories
	const missing12Savings = calculateSavings(analysis['缺少1至2个报价'], 'delivery');
	const missing3Sales = calculateSavings(analysis['缺少3个报价（仅在X国可售）'], 'sales');
	const expiredSavings = calculateSavings(analysis['失效PanEU ASIN'], 'delivery');
	
	console.log('Final calculations:', {missing12Savings, missing3Sales, expiredSavings});



	const excelData = {
		headers: ["ASIN同步机会", "ASIN数量", "详细描述", "行动建议"],
		rows: []
	  };
	  
	// 已加入PanEU
	if (paneuJoinedTotal > 0) {
	excelData.rows.push({
		metric: "未加入PanEU",
		count: paneuJoinedTotal,
		operationPoint:
		"ASIN需在德法意西荷5国活跃销售以获得泛欧福利。若没有同步选品，会导致：<br>1. 未同步选品的国家产生远程配送费；<br>2. 可通过拓展ASIN获得潜在销售机会；<br>3.转化率低于本地配送ASIN",
		operationPointRowspan: `${3 + (singleCountry ? 0 : countriesWithData.length)}`,
		action: "在德法意西荷同步选品，以获取完整PanEU福利",
		data: paneuJoinedAsins.map(asin => ({
		asin: asin.asin,
		title: asin.title,
		status: asin.status,
		DE: asin.offers.DE || "-",
		FR: asin.offers.FR || "-",
		IT: asin.offers.IT || "-",
		ES: asin.offers.ES || "-",
		NL: asin.offers.NL || "-"
		}))
	});
	
	// 缺少1至2个报价
	const missing12 = analysis["缺少1至2个报价"];
	if (missing12.length > 0) {
		excelData.rows.push({
		metric: "└ 缺少1至2个报价",
		count: missing12.length,
		operationPoint: "",
		action: `完成ASIN同步预计可节省€${missing12Savings.toLocaleString()}/年`,
		data: missing12.map(asin => ({
				asin: asin.asin,
				title: asin.title,
				status: asin.status,
				DE: asin.offers.DE || "-",
				FR: asin.offers.FR || "-",
				IT: asin.offers.IT || "-",
				ES: asin.offers.ES || "-",
				NL: asin.offers.NL || "-"
			}))
		});
	}
	
	// 缺少3个报价
	const missing3 = analysis["缺少3个报价（仅在X国可售）"];
	if (missing3.length > 0) {
		excelData.rows.push({
		metric: singleCountry
			? `└ 缺少3个报价（仅${singleCountry}可售）`
			: "└ 缺少3个报价",
		count: missing3.length,
		operationPoint: "",
		action: `完成ASIN同步预计可提升€${missing3Sales.toLocaleString()}销售额`,
		actionRowspan: !singleCountry && countriesWithData.length > 1 ? `${countriesWithData.length + 1}` : undefined,
		indentLevel: 1,
		data: missing3.map(asin => ({
				asin: asin.asin,
				title: asin.title,
				status: asin.status,
				DE: asin.offers.DE || "-",
				FR: asin.offers.FR || "-",
				IT: asin.offers.IT || "-",
				ES: asin.offers.ES || "-",
				NL: asin.offers.NL || "-"
			}))
		});
	
		// 缺少3个报价子类别
		if (!singleCountry && countriesWithData.length > 1) {
			countriesWithData.forEach(country => {
				const categoryKey = `缺少3个报价-仅${country}可售`;
				const asins = analysis[categoryKey] || [];
		
				excelData.rows.push({
				metric: `└└ 仅${country}可售`,
				count: asins.length,
				indentLevel: 2,
				data: asins.map(asin => ({
						asin: asin.asin,
						title: asin.title,
						status: asin.status,
						DE: asin.offers.DE || "-",
						FR: asin.offers.FR || "-",
						IT: asin.offers.IT || "-",
						ES: asin.offers.ES || "-",
						NL: asin.offers.NL || "-"
					}))
				});
			});
		}
	}
	}

	// 其他类别 - 只显示数量>0的类别
	const otherCategoryResults = ['失效PanEU ASIN', '缺少荷兰(NL)报价ASIN']
	.map(category => {
		const asins = analysis[category] || [];
		const count = asins.length;

		if (count === 0) return null; // 跳过数量为 0 的类别

		let operationPoint = "";
		let action = "";

		switch (category) {
		case "失效PanEU ASIN":
			operationPoint =
			"因部分国家offer失效，面临失去泛欧福利的风险。（泛欧资格中断后有14天宽限期，需在期限内恢复五国销售状态）";
			action = `尽快修复失效offer，可节省€${expiredSavings.toLocaleString()}`;
			break;

		case "缺少荷兰(NL)报价ASIN":
			operationPoint = "已有德法意西4国销售，缺少荷兰listing";
			action = "在荷兰建立listing以维持PanEU资格";
			break;
		}

		// 汇总行
		const row = {
			metric: category,
			count,
			operationPoint,
			action,
		};

		// 详细 ASIN 数据
		const data = asins.map(asin => ({
			asin: asin.asin,
			title: asin.title,
			status: asin.status,
			DE: asin.offers.DE || "-",
			FR: asin.offers.FR || "-",
			IT: asin.offers.IT || "-",
			ES: asin.offers.ES || "-",
			NL: asin.offers.NL || "-",
		}));

		return { row, data };
	})
	.filter(item => item !== null); // 去掉 count = 0 的类别

	
	// 其他类别
	otherCategoryResults.forEach(item => {
		excelData.rows.push({
			metric: item.row.metric,
			count: item.row.count,
			operationPoint: item.row.operationPoint,
			action: item.row.action,
			data: item.data
		});
	});


	return excelData;
}

function generateTable2HTML(expansionChecklist) {
	try {
		const skuData = uploadedData.skuReport;
		if (!expansionChecklist || !skuData) {
			return '';
		}

		// Parse expansion checklist (Excel format, header at row 4)
		const headers = expansionChecklist.headers; // Row 4 (index 3) is header
		const vatRow = expansionChecklist.rows[5]; // Row 10 (index 9) - VAT status
		const warehouseRow = expansionChecklist.rows[6]; // Row 11 (index 10) - 授权仓储国家
		const paneuRow = expansionChecklist.rows[7]; // Row 12 (index 11) - PanEU status
		
		console.log('Expansion headers:', headers);
		console.log('VAT row:', vatRow);
		console.log('Warehouse row:', warehouseRow);
		console.log('PanEU row:', paneuRow);
		
		// Find country columns (assuming countries start from column D onwards)
		const countries = ['DE', 'IT', 'FR', 'ES'];
		const countryColumns = {};
		
		// Map country names to column indices
		headers.forEach((header, index) => {
			if (header) {
				const headerLower = header.toLowerCase();
				if (headerLower.includes('德国') || headerLower.includes('germany')) countryColumns['DE'] = index;
				if (headerLower.includes('意大利') || headerLower.includes('italy')) countryColumns['IT'] = index;
				if (headerLower.includes('法国') || headerLower.includes('france')) countryColumns['FR'] = index;
				if (headerLower.includes('西班牙') || headerLower.includes('spain')) countryColumns['ES'] = index;
			}
		});
		
		console.log('Country columns:', countryColumns);
		
		// Check if all 4 countries have PanEU=1 and VAT=1 (hide Table2 if true)
		let allComplete = true;
		let paneuCount = 0;
		
		countries.forEach(country => {
			const colIndex = countryColumns[country];
			if (colIndex !== undefined) {
				const vatStatus = parseInt(vatRow[colIndex]) || 0;
				const paneuStatus = parseInt(paneuRow[colIndex]) || 0;
				
				paneuCount += paneuStatus;
				
				if (vatStatus !== 1 || paneuStatus !== 1) {
					allComplete = false;
				}
			}
		});
		
		console.log('PanEU count:', paneuCount, 'All complete:', allComplete);
		
		// If all complete, don't show Table2
		if (allComplete) {
			return '';
		}
		
		// 计算逻辑
		let title = '';
		let countryValues = [];
		let totalValues = [];
		
		// Check if seller is PanEU seller (>=2 countries with PanEU=1)
		if (paneuCount < 2) {
			// Non-PanEU seller
			title = '请先完成PanEU注册，在德法意西荷5国建立活跃销售后，再考虑placement优化';
		} else {
			// PanEU seller - show optimization opportunities
			title = ["跨境配送国家", "预计可节约费用(RMB)", "预计节约配送费(RMB)", "申请VAT所需费用(RMB)", "申请VAT所需时间"];

			let totalSavings = 0;
			let totalVatCost = 0;
			let totalNetSavings = 0;

			// Find countries that need cross-border delivery (授权仓储国家=0)
			countries.forEach(country => {
				const colIndex = countryColumns[country];
				if (colIndex !== undefined) {
					const warehouseStatus = parseInt(warehouseRow[colIndex]) || 0;
					
					if (warehouseStatus === 0) {
						// Calculate delivery fee savings for this country
						let countrySavings = 0;
						
						// Get SKU data for this country
						const skuHeaders = skuData[0];
						const skuRows = skuData.slice(1);
						
						// Find marketplace column
						const marketplaceCol = skuHeaders.findIndex(h => h && h.includes('亚马逊商城'));
						const deliveryFeeCol = skuHeaders.findIndex(h => h === '亚马逊物流配送费用（总计）');
						
						if (marketplaceCol >= 0 && deliveryFeeCol >= 0) {
							skuRows.forEach(row => {
								if (row && row[marketplaceCol]) {
									const marketplace = row[marketplaceCol];
									if (marketplace.includes(country)) {
										const deliveryFee = parseFloat(String(row[deliveryFeeCol]).replace(/[€$£,]/g, '')) || 0;
										countrySavings += deliveryFee * 0.5; // 50% savings
									}
								}
							});
						}
						
						// Convert EUR to RMB (1 EUR = 7.1813 RMB)
						const savingsRMB = Math.round(countrySavings * 7.1813);
						
						// VAT cost - check VAT status for this country
						const vatCostRMB = vatCostData[country] ? vatCostData[country].cost : 0;
						const vatTime = vatCostData[country] ? vatCostData[country].time : 0;
						
						const netSavingsRMB = savingsRMB - vatCostRMB;
						
						// 只有净节约费用>0的国家才显示
						if (netSavingsRMB > 0) {
							totalSavings += savingsRMB;
							totalVatCost += vatCostRMB;
							totalNetSavings += netSavingsRMB;

							countryValues.push({
								[country]: [
									savingsRMB, 
									netSavingsRMB,
									vatCostRMB > 0 ? vatCostRMB : '-',  
									vatTime
								]
							});
						}
					}
				}
			});
			
			// 如果没有任何国家有正的净节约，不显示表格
			if (totalNetSavings <= 0) {
				return '';
			}

			totalValues = [
				totalSavings, 
				totalNetSavings, 
				totalVatCost, 
				'-'
			]

		}
		
		return {
			title: title,
			value: countryValues,
			总额: totalValues
		  };
		
	} catch (error) {
		console.error('Table2 generation error:', error);
		return {
			title: '',
			value: '',
			总额: ''
		  };
	}
}

// 统计荷兰政策
function countNlPolicy(paneuData) { 
	const paneuHeaders = paneuData[0];
	const paneuRows = paneuData.slice(1);

	// Find marketplace column
	const paneuStatusCol = paneuHeaders.findIndex(h => h === 'Pan-EU status');
	const nlOfferStatusCol = paneuHeaders.findIndex(h => h === 'NL offer status');

	if (paneuStatusCol < 0 || nlOfferStatusCol < 0) {
		console.error('Invalid column index');
		return [];
	}

	const nlPolicy = paneuRows.filter(row => row[paneuStatusCol] === 'Enrolled' && row[nlOfferStatusCol] === 'No listing');
	return nlPolicy.map(row => row.slice(0, 13));
}


// 计算德国销售数量
function sumSoldCountByMarketplace(skuData, marketplace = 'DE') {
	
	// Get SKU data for this country
	const skuHeaders = skuData[0];
	const skuRows = skuData.slice(1);
	
	// Find marketplace column
	const marketplaceCol = skuHeaders.findIndex(h => h && h.includes('亚马逊商城'));
	const deliveryFeeCol = skuHeaders.findIndex(h => h === '已售商品数量');

	let soldCount = 0;
	if (marketplaceCol >= 0 && deliveryFeeCol >= 0) {
		skuRows.forEach(row => {
			if (row && row[marketplaceCol]) {
				if (row[marketplaceCol] === marketplace) {
					soldCount += parseInt(String(row[deliveryFeeCol]).replace(/[€$£,]/g, '')) || 0;
				}
			}
		})
	}
	return soldCount;
  }