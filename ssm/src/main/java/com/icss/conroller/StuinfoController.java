package com.icss.conroller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.LinkedHashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.icss.bean.Stuinfo;
import com.icss.business.StuinfoBusiness;
import com.icss.util.OutExcel;
import com.icss.util.PageBean;

import net.sf.json.JSONArray;


@Controller
@RequestMapping("student")
public class StuinfoController {

	public StuinfoController() {
		// TODO Auto-generated constructor stub
	}
	@Resource(name="stuinfoBusiness")
	private StuinfoBusiness stuinfoBusiness=null;
	
	public StuinfoBusiness getStuinfoBusiness() {
		return stuinfoBusiness;
	}
	public void setStuinfoBusiness(StuinfoBusiness stuinfoBusiness) {
		this.stuinfoBusiness = stuinfoBusiness;
	}
	
	/**
	 * @param session
	 * @return 所有学员签单档案信息（第一页）
	 */
	@RequestMapping("stuinfo.do")
	public  ModelAndView  selectall(HttpSession session){
		System.out.println("123456");
		List<Stuinfo> list =(stuinfoBusiness.select(session,1)).getList();
		session.setAttribute("pages", (stuinfoBusiness. select(session,1)).getPages());
		return new ModelAndView("stuinfo/stuinfo","stuinfo",list);
	}
	/**
	 * 
	 * @param request
	 * @return  分页后的数据
	 * 用ajax传递数据(@ResponseBody)
	 */
	@RequestMapping("stu.do")
	public  @ResponseBody String select(HttpServletRequest request,HttpSession session){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Stuinfo> pagebean = stuinfoBusiness.select(session,pagenum);
		JSONArray jsonArray = JSONArray.fromObject(pagebean.getList());
		return jsonArray.toString();
	}
	/**
	 * @param Stuinfo
	 * @return 添加后的数据
	 * 
	 */
	@RequestMapping("insertinfo.do")
	public String insertstuinfo(@ModelAttribute("record") Stuinfo record,HttpServletRequest request ){
		stuinfoBusiness.insertSelective(record,request);
		return "redirect:/student/stuinfo.do";
	}
	/**
	 * @author chen
	 * @param record
	 * @return 下载导出Excel
	 */
	@RequestMapping("Outinfo.do")
	public String view_select(HttpServletRequest request,HttpServletResponse response,String fileName){	
		LinkedHashMap<String, String> propertyHeaderMap = new LinkedHashMap<String, String>();  
		propertyHeaderMap.put("stuid","序号");
		propertyHeaderMap.put("stuname","姓名");
		propertyHeaderMap.put("stusex","性别");
		propertyHeaderMap.put("stuscure","学员分档");
		propertyHeaderMap.put("stucard","身份证");
		propertyHeaderMap.put("stuphone","手机号码");
		propertyHeaderMap.put("stuperson","紧急联系人");
		propertyHeaderMap.put("stuemai","邮箱");
		propertyHeaderMap.put("stuschool","毕业院校");
		propertyHeaderMap.put("stugrade","学历");
		propertyHeaderMap.put("stuspecia","专业");
		propertyHeaderMap.put("studatetime","毕业时间");
		propertyHeaderMap.put("strenglev","英语等级");

		List<Stuinfo> dataSet=stuinfoBusiness.info_view();
			
		try {
			//导出
			 XSSFWorkbook ex=OutExcel.generateXlsxWorkbook("导出数据", propertyHeaderMap, dataSet);		
			 File file=new File("C://学生信息档案表.xlsx");//这里发布到服务器上可以改路径。
			 String path=file.getPath();
			 System.out.println(path);
			 OutputStream out = new FileOutputStream(file);  
             ex.write(out);  
             System.out.println("导出成功！");  
             //下载
             response.setCharacterEncoding("utf-8");
             response.setContentType("multipart/form-data");
             response.setHeader("Content-Disposition", "attachment;fileName="+ fileName);
             InputStream inputStream = new FileInputStream(file);
             OutputStream os = response.getOutputStream();
             
             byte[] b = new byte[2048];
             int length;
             while ((length = inputStream.read(b)) > 0) {
                 os.write(b, 0, length);              
             }
             System.out.println("下载成功");
             // 这里主要关闭流。
             os.close();
             //然后删除
             inputStream.close();
             if(file.exists()){
            	 file.delete(); 
            	 System.out.println("删除成功");
             }
		}
		 catch (Exception e) {
			// TODO: handle exception
			 e.printStackTrace();
		} 
		
		
		return null;
	}
}
