package com.icss.util;

import java.io.File;
import java.io.FileInputStream;

import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.*;

import com.icss.bean.*;

public class ReadExcel {
	 private static String EXCEL_2003 = ".xls";
	 private static String EXCEL_2007 = ".xlsx";
	

	public ReadExcel() {
		// TODO Auto-generated constructor stub
	}

	/**
     * 通过POI方式读取Excel
     * @param excelFile
	 * @throws Exception 
     */
	public List<Signed> ReadInExcel(String path) throws Exception{
		Signed signed=null;
		List<Signed> list = new ArrayList<Signed>();
		
		
		File excelFile = new File(path);
        String fileName = excelFile.getName();
		InputStream is = new FileInputStream(path);	
		
        
       //  Workbook  	XssFworkbook = new XSSFWorkbook(is);
        
		//EXCEL_2003
		if(fileName.toLowerCase().endsWith(EXCEL_2003)){
		 Workbook   Hssfworkbook = new HSSFWorkbook(is);   
         Integer sheetNum = Hssfworkbook.getNumberOfSheets();
         System.out.println(sheetNum);
         
         for (int i= 0; i < sheetNum; i++) {// 循环工作表Sheet
	            HSSFSheet hssfSheet = (HSSFSheet) Hssfworkbook.getSheetAt(i);
	            if (hssfSheet == null) {
	                continue;
	            }// 循环行Row
	            for(int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++){
	            	System.out.println(hssfSheet.getLastRowNum());
	            	HSSFRow hssfRow = hssfSheet.getRow(rowNum);
	            	if (hssfRow!= null) {
	            		signed= new Signed();
	            		HSSFCell stime=hssfRow.getCell(0);
	            		HSSFCell scustomername=hssfRow.getCell(1);
	            		HSSFCell scustomerschool=hssfRow.getCell(2);
	            		HSSFCell scustomercollege=hssfRow.getCell(3);
	            		HSSFCell scustomermajor=hssfRow.getCell(4);
	            		HSSFCell scutomercardid=hssfRow.getCell(5);
	            		HSSFCell scutomerbankcardid=hssfRow.getCell(6);
	            		HSSFCell scustomergrade=hssfRow.getCell(7);
	            		HSSFCell speplenum=hssfRow.getCell(8);
	            		HSSFCell studyfee=hssfRow.getCell(9);
	            		HSSFCell spacefee=hssfRow.getCell(10);
	            		HSSFCell backfee=hssfRow.getCell(11);
	            		HSSFCell depositfree=hssfRow.getCell(12);
	            		HSSFCell sale=hssfRow.getCell(13);
	            		HSSFCell dpet=hssfRow.getCell(14);
	            		HSSFCell sarea=hssfRow.getCell(15);
	            		HSSFCell sbusinessstype=hssfRow.getCell(16);
	            		HSSFCell sremark=hssfRow.getCell(17);
	            		HSSFCell bank=hssfRow.getCell(18);
	            	
	            		
	            		
	            		signed.setStime(getValue(stime));
	            		signed.setScustomername(getValue(scustomername));
	            		signed.setScustomerschool(getValue(scustomerschool));
	            		signed.setScustomercollege(getValue(scustomercollege));
	            		signed.setScustomermajor(getValue(scustomermajor));
	            		signed.setScustomercardid(getValue(scutomercardid));
	            	
	            		signed.setScustomerbankcardid(getValue(scutomerbankcardid));
	            		signed.setScustomergrade(getValue(scustomergrade));            		
	            		signed.setSale(getValue(sale));
	            	
	            		signed.setDept(getValue(dpet));
	            		signed.setSarea(getValue(sarea));
	            	
	            		signed.setSbusinesstype(getValue(sbusinessstype));
	            		signed.setSremark(getValue(sremark));
	            		signed.setBank(getValue(bank));
	            		
	            		/*//转换时需要进行非空判断empty String和“”;
	            		if(speplenum!=null&&speplenum.equals("")){
	            			System.out.println("我进来了。");
	            			
	            		}*/
	            		try {
	            			signed.setSpacefee(Float.valueOf(getValue(spacefee).trim()));
	            			signed.setSpeoplenum(Integer.valueOf(getValue(speplenum).trim()));
	            			signed.setStudyfee(Float.valueOf(getValue(studyfee).trim()));
	            			signed.setBackfee(Float.valueOf(getValue(backfee).trim()));
	            			signed.setStateid(1);
	            			signed.setDepositfee(Float.valueOf(getValue(depositfree)));
	            			//System.out.println("定金youduoshao"+signed.getDepositfee());
						} catch (Exception e) {
							System.out.println(e);
						}           		
	            		list.add(signed);
	            		//System.out.println("定金youduoshao==="+signed.getDepositfee());
	            		
	            	}
	            	
	            }
         	}
         }	
		//EXCEL_2007
		if(fileName.toLowerCase().endsWith(EXCEL_2007)){
			 Workbook   Xssfworkbook = new XSSFWorkbook(is);   
	         Integer sheetNum = Xssfworkbook.getNumberOfSheets();
	         System.out.println(sheetNum);
	         
	         for (int i= 0; i < sheetNum; i++) {// 循环工作表Sheet
	        	 XSSFSheet hssfSheet =(XSSFSheet) Xssfworkbook.getSheetAt(i);
		            if (hssfSheet == null) {
		                continue;
		            }// 循环行Row
		            for(int rowNum = 1; rowNum <= hssfSheet.getLastRowNum(); rowNum++){
		            	System.out.println(hssfSheet.getLastRowNum());
		            	XSSFRow hssfRow = hssfSheet.getRow(rowNum);
		            	if (hssfRow!= null) {
		            		signed= new Signed();
		            		XSSFCell stime=hssfRow.getCell(0);
		            		XSSFCell scustomername=hssfRow.getCell(1);
		            		XSSFCell scustomerschool=hssfRow.getCell(2);
		            		XSSFCell scustomercollege=hssfRow.getCell(3);
		            		XSSFCell scustomermajor=hssfRow.getCell(4);
		            		XSSFCell scutomercardid=hssfRow.getCell(5);
		            		XSSFCell scutomerbankcardid=hssfRow.getCell(6);
		            		XSSFCell scustomergrade=hssfRow.getCell(7);
		            		XSSFCell speplenum=hssfRow.getCell(8);
		            		XSSFCell studyfee=hssfRow.getCell(9);
		            		XSSFCell spacefee=hssfRow.getCell(10);
		            		XSSFCell backfee=hssfRow.getCell(11);
		            		XSSFCell depositfree=hssfRow.getCell(12);
		            		XSSFCell sale=hssfRow.getCell(13);
		            		XSSFCell dpet=hssfRow.getCell(14);
		            		XSSFCell sarea=hssfRow.getCell(15);
		            		XSSFCell sbusinessstype=hssfRow.getCell(16);
		            		XSSFCell sremark=hssfRow.getCell(17);
		            		XSSFCell bank=hssfRow.getCell(18);
		            		
		            		signed.setStime(getValue(stime));
		            		signed.setScustomername(getValue(scustomername));
		            		signed.setScustomerschool(getValue(scustomerschool));
		            		signed.setScustomercollege(getValue(scustomercollege));
		            		signed.setScustomermajor(getValue(scustomermajor));
		            		signed.setScustomercardid(getValue(scutomercardid));
		            	
		            		signed.setScustomerbankcardid(getValue(scutomerbankcardid));
		            		signed.setScustomergrade(getValue(scustomergrade));            		
		            		signed.setSale(getValue(sale));
		            	
		            		signed.setDept(getValue(dpet));
		            		signed.setSarea(getValue(sarea));
		            	
		            		signed.setSbusinesstype(getValue(sbusinessstype));
		            		signed.setSremark(getValue(sremark));
		            		signed.setBank(getValue(bank));
		            		//转换时需要进行非空判断empty String和“”;
		            		if(speplenum!=null&&speplenum.equals("")){
		            			System.out.println("我进来了。");
		            			
		            		}
		            		try {
		            			signed.setSpacefee(Float.valueOf(getValue(spacefee).trim()));
		            			signed.setSpeoplenum(Integer.valueOf(getValue(speplenum).trim()));
		            			signed.setStudyfee(Float.valueOf(getValue(studyfee).trim()));
		            			signed.setBackfee(Float.valueOf(getValue(backfee).trim()));
		            			signed.setDepositfee(Float.valueOf(getValue(depositfree).trim()));
		            			signed.setStateid(1);
		            			
							} catch (Exception e) {
								// TODO: handle exception
							}           		
		            		list.add(signed);
		            		System.out.println(signed.getDepositfee());
		            		
		            	}
		            	
		            }
	         	}
	         }	
		
		return list;
	}
	/**
	 * 获取单元格数据内容为字符串类型的数据
	 * 
	 * @param cell 2007
	 *  Excel单元格
	 * @return String 单元格数据内容
	 */
	private String getValue(XSSFCell cell) {
		// TODO Auto-generated method stub
		String strCell = "";
		if (cell == null)
			return "";
		switch (cell.getCellType()) {
		case HSSFCell.CELL_TYPE_STRING:
			strCell = cell.getStringCellValue();
			break;
		case HSSFCell.CELL_TYPE_NUMERIC:
			strCell = String.valueOf(cell.getNumericCellValue());
			strCell = getDate(cell);
			break;
	//	case HSSFCell.
		case HSSFCell.CELL_TYPE_BOOLEAN:
			strCell = String.valueOf(cell.getBooleanCellValue());
			break;
		case HSSFCell.CELL_TYPE_BLANK:
			strCell = "";
			break;
		default:
			strCell = "";
			break;
		}
		if (strCell.equals("") || strCell == null) {
			return "";
		}
		if (cell == null) {
			return "";
		}
		return strCell;
	}
	
	 public String getDate(XSSFCell cell) {
			if (cell.getCellStyle().getDataFormat() == HSSFDataFormat.getBuiltinFormat("m/d/yy")) {
				String sDate = cell.getNumericCellValue() + "";
				if (sDate != null || !sDate.equals("")) {
					Date date = HSSFDateUtil.getJavaDate(cell.getNumericCellValue());
					return new SimpleDateFormat("yyyy-MM-dd").format(date);
				}
				return "";
			}

			// return String.valueOf(cell.getCellStyle().getDataFormat());
			return getInt(cell);
		}
	 public String getInt(XSSFCell cell) {
			String str_value = cell.getNumericCellValue() + "";
			int dotPosition = str_value.indexOf(".");
			String str_dot = str_value.substring(dotPosition + 1);
			String ret_value = null;
			if (str_dot.length() == 1 && str_dot.equals("0")) {
				ret_value = str_value.substring(0, dotPosition);
			} else {
				ret_value = str_value;
			}

			return ret_value;
		}
	 /**
		 * 获取单元格数据内容为日期类型的数据
		 * 
		 * @param cell
		 *  Excel单元格
		 * @return String 单元格数据内容
		 */
	 private String getDateCellValue(XSSFCell cell) {
			String result = "";
			try {
				int cellType = cell.getCellType();
				if (cellType == HSSFCell.CELL_TYPE_NUMERIC) {
					Date date = cell.getDateCellValue();
					result = (date.getYear() + 1900) + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				} else if (cellType == HSSFCell.CELL_TYPE_STRING) {
					String date = getValue(cell);
					result = date.replaceAll("[年月]", "-").replace("日", "").trim();
				} else if (cellType == HSSFCell.CELL_TYPE_BLANK) {
					result = "";
				}
			} catch (Exception e) {
				System.out.println("日期格式不正确!");
				e.printStackTrace();
			}
			return result;
	 }

	 
	 
	 
	/**
	 * 获取单元格数据内容为字符串类型的数据
	 * 
	 * @param cell 2003
	 *  Excel单元格
	 * @return String 单元格数据内容
	 */
	
	 @SuppressWarnings("static-access")
		private String getValue(HSSFCell cell) {
		 String strCell = "";
			if (cell == null)
				return "";
			switch (cell.getCellType()) {
			case HSSFCell.CELL_TYPE_STRING:
				strCell = cell.getStringCellValue();
				break;
			case HSSFCell.CELL_TYPE_NUMERIC:
				strCell = String.valueOf(cell.getNumericCellValue());
				strCell = getDate(cell);
				break;
		//	case HSSFCell.
			case HSSFCell.CELL_TYPE_BOOLEAN:
				strCell = String.valueOf(cell.getBooleanCellValue());
				break;
			case HSSFCell.CELL_TYPE_BLANK:
				strCell = "";
				break;
			default:
				strCell = "";
				break;
			}
			if (strCell.equals("") || strCell == null) {
				return "";
			}
			if (cell == null) {
				return "";
			}
			return strCell;
	 }
	 public String getDate(HSSFCell cell) {
			if (cell.getCellStyle().getDataFormat() == HSSFDataFormat.getBuiltinFormat("m/d/yy")) {
				String sDate = cell.getNumericCellValue() + "";
				if (sDate != null || !sDate.equals("")) {
					Date date = HSSFDateUtil.getJavaDate(cell.getNumericCellValue());
					return new SimpleDateFormat("yyyy-MM-dd").format(date);
				}
				return "";
			}

			// return String.valueOf(cell.getCellStyle().getDataFormat());
			return getInt(cell);
		}
	 public String getInt(HSSFCell cell) {
			String str_value = cell.getNumericCellValue() + "";
			int dotPosition = str_value.indexOf(".");
			String str_dot = str_value.substring(dotPosition + 1);
			String ret_value = null;
			if (str_dot.length() == 1 && str_dot.equals("0")) {
				ret_value = str_value.substring(0, dotPosition);
			} else {
				ret_value = str_value;
			}

			return ret_value;
		}
	 /**
		 * 获取单元格数据内容为日期类型的数据
		 * 
		 * @param cell
		 *  Excel单元格
		 * @return String 单元格数据内容
		 */
	 private String getDateCellValue(HSSFCell cell) {
			String result = "";
			try {
				int cellType = cell.getCellType();
				if (cellType == HSSFCell.CELL_TYPE_NUMERIC) {
					Date date = cell.getDateCellValue();
					result = (date.getYear() + 1900) + "-" + (date.getMonth() + 1) + "-" + date.getDate();
				} else if (cellType == HSSFCell.CELL_TYPE_STRING) {
					String date = getValue(cell);
					result = date.replaceAll("[年月]", "-").replace("日", "").trim();
				} else if (cellType == HSSFCell.CELL_TYPE_BLANK) {
					result = "";
				}
			} catch (Exception e) {
				System.out.println("日期格式不正确!");
				e.printStackTrace();
			}
			return result;
	 }
	 
	
    
}