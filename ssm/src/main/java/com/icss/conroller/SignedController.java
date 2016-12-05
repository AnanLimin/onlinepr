/**
 * @date 2016/10/17
 * @author 李敏
 */
package com.icss.conroller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.client.support.HttpAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.icss.bean.Drawback;
import com.icss.bean.Iaer;
import com.icss.bean.Signed;
import com.icss.bean.User;
import com.icss.business.SignedBusiness;
import com.icss.util.OutExcel;
import com.icss.util.PageBean;
import com.icss.util.ReadExcel;

@Controller
@RequestMapping("signed")
public class SignedController {
					
	@Resource(name="signedBusiness")
	private SignedBusiness signedBusiness=null;

	public void setSignedBusiness(SignedBusiness signedBusiness) {
		this.signedBusiness = signedBusiness;
	}
	

	/**
	 * @param session
	 * @return 所有签单信息（第一页）
	 */
	@RequestMapping("allsigninfo.do")
	public ModelAndView allsigninfo(HttpSession session){
		PageBean<Signed> page = signedBusiness.allsigninfo(1,session);
		session.setAttribute("pages", page.getPages());
		return new ModelAndView("sale/allsigned","allsigns",page.getList());
	}
		
	/**
	 * 
	 * @param request
	 * @return 查询指定页数的所有签单信息
	 */
	@RequestMapping("nextallsigninfo.do")
	public @ResponseBody String nextallsigninfo(HttpServletRequest request,HttpSession session){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Signed> page = signedBusiness.allsigninfo(pagenum,session);
		JSONArray jsonArray = JSONArray.fromObject(page.getList());
		System.out.println(page.getList().size());
		return jsonArray.toString();
	}
	/**
	 * @return 销售已收款的签单排名
	 */
	@RequestMapping("saleranking.do")
	public @ResponseBody String saleranking(HttpServletRequest request,HttpSession session){
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.signranking(request,session));
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
	}
	
	/**
	 * 
	 * @param request
	 * @param session
	 * @return 获得未收款的签单详情
	 */
	@RequestMapping("nopayinfo.do")
	public String nopayinfo(HttpServletRequest request,HttpSession session){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Signed> page = signedBusiness.nopayinfo(pagenum, session);
		session.setAttribute("nopayinfo", page.getList());
		session.setAttribute("nopayinfopages", page.getPages());
		return "sale/nopayinfo";
	}
	
	/**
	 * 
	 * @param request
	 * @param session
	 * @return 获得未收款的签单详情(下一页)
	 */
	@RequestMapping("nextnopayinfo.do")
	public @ResponseBody String nextnopayinfo(HttpServletRequest request,HttpSession session){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Signed> page = signedBusiness.nopayinfo(pagenum, session);
		JSONArray jsonArray = JSONArray.fromObject(page.getList());
		return jsonArray.toString();
	}
	

	/**
	 * 
	 * @param request
	 * @return 某时间段内的签单和收款信息
	 */
	@RequestMapping("deptempsignediaer.do")
	public @ResponseBody String deptempsignediaer(HttpServletRequest request){
		Signed signed = new Signed();
		signed.setSale(request.getParameter("dept"));
		signed.setStime(request.getParameter("starttime"));
		signed.setSremark(request.getParameter("endtime"));
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.deptempsigniaer(signed));
		return jsonArray.toString();
	}
	
	/**
	 * @param session
	 * @return 自己已签单客户的信息(查询第一页信息十条数据)
	 */
	@RequestMapping("signedinfo.do")
	public String signed(HttpSession session){
		session.setAttribute("leftNav", 1);
		String sale = ((User)session.getAttribute("tempuser")).getUsername();
		String job = signedBusiness.myjob(sale);
		if(job.indexOf("总经理")!=-1||job.indexOf("副总")!=-1){
			return "redirect:/signed/allsigninfo.do";
		}
		return "redirect:/signed/mysign.do";
	}
	
	/**
	 * 
	 * @param session
	 * @return 我的订单
	 */
	@RequestMapping("mysign.do")
	public String mysign(HttpSession session){
		List<Signed> list = (signedBusiness.getSignedinfo(session)).getList();
		session.setAttribute("pages", (signedBusiness.getSignedinfo(session)).getPages());
		session.setAttribute("signedinfo", list);
		return "sale/signed";
		
	}
	
	/**
	 * 
	 * @param session
	 * @return 查询还未收到的款项
	 */
	@RequestMapping("notpay.do")
	public @ResponseBody String ontpay(HttpSession session){
		System.out.println("未收款");
		return (signedBusiness.notpay(session)).toString();
	}
	

	/**
	 * @param request
	 * @return 自己分页后所有的签单信息
	 */
	@RequestMapping("nextsignedinfo.do")
	public @ResponseBody String nextsignedinfo(HttpServletRequest request,HttpSession session){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Signed> page = signedBusiness.getnextSignedinfo(session, pagenum);
		JSONArray jsonArray = JSONArray.fromObject(page.getList());
		return jsonArray.toString();
	}
		
	/**
	 * 从导航栏查询（jsp显示）
	 * @param request
	 * @return 待收款的签单信息(查询第一页十条数据)
	 */
	@RequestMapping("firstincomepay.do")
	public ModelAndView incomepay(HttpSession session){
		List<Signed> list = (signedBusiness.financeSignedinfo(1,1)).getList();
		session.setAttribute("pages", (signedBusiness.financeSignedinfo(1,1)).getPages());
		session.setAttribute("leftNav", 2);
		return new ModelAndView("financial/financial","financial",list);
	}
	
	
	@RequestMapping("status.do")
	public ModelAndView status(HttpServletRequest request,HttpSession session){
		int stateid = Integer.parseInt(request.getParameter("status"));
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Signed> list = signedBusiness.financeSignedinfo(stateid,pagenum);
		session.setAttribute("pages", list.getPages());
		return new ModelAndView("financial/financial","financial",list.getList());
	}
	
	/**
	 * 
	 * @param request
	 * @return  分页后的数据
	 * 用ajax传递数据(@ResponseBody)
	 */
	@RequestMapping("signstatus.do")
	public @ResponseBody String signstatus(HttpServletRequest request){
		int stateid = Integer.parseInt(request.getParameter("status"));
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.financeSignedinfo(stateid,pagenum));
		return jsonArray.toString();
	} 
	
	
	
	/**
	 * @param request
	 * @return 查询一条签单的信息
	 */
	@RequestMapping("onesign.do")
	public @ResponseBody String onesign(HttpServletRequest request){
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.selectSignedById(request));
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
	}
	
	/**
	 * 增加一条收支记录，修改签单信息（有需要的话）
	 * @param signed
	 * @param request
	 * @return
	 */
	@RequestMapping("addoneiaer.do")
	public String addoneiaer(@ModelAttribute("iaer") Iaer iaer, HttpServletRequest request){
		signedBusiness.addAndChange(request, iaer);
		return "redirect:/signed/firstincomepay.do";
	}
	

	/**
	 * dbtype为1时代表申请类型是返款，为2时代表申请类型为退款
	 * @param session
	 * @return 待返款的申请记录信息（jsp）
	 */
	@RequestMapping("backmoney.do")
	public ModelAndView backmoney(HttpSession session){
		PageBean<Drawback> pagebean = signedBusiness.drawbackinfo(1, 1);
		session.setAttribute("pages", pagebean.getPages());
		return new ModelAndView("financial/backmoney","backmoney",pagebean.getList());
	}
	/**
	 * dbtype为1时代表申请类型是返款，为2时代表申请类型为退款
	 * @param request
	 * @return 待返款的申请记录信息下一页
	 */
	@RequestMapping("nextbackmoney.do")
	public @ResponseBody String nextbackmoney(HttpServletRequest request){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Drawback> pagebean = signedBusiness.drawbackinfo(pagenum, 1);
		JSONArray jsonArray = JSONArray.fromObject(pagebean.getList());
		return jsonArray.toString();
	}
	
	/**
	 * @param request
	 * @return 查询出一条返款信息
	 */
	@RequestMapping("onebackmoney.do")
	public @ResponseBody String onrbackmoney(HttpServletRequest request){
		int dbid = Integer.parseInt(request.getParameter("dbid"));
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.onebackinfo(dbid));
		return jsonArray.toString();
	}
	
	/**
	 * dbtype为1时代表申请类型是返款，为2时代表申请类型为退款 
	 * @param session
	 * @return 待退款的申请记录信息（jsp）
	 */
	@RequestMapping("refund.do")
	public ModelAndView refund(HttpSession session){
		PageBean<Drawback> pagebean = signedBusiness.drawbackinfo(1, 2);
		session.setAttribute("pages", pagebean.getPages());
		return new ModelAndView("financial/refund","refund",pagebean.getList());
	}
	
	/**
	 * dbtype为1时代表申请类型是返款，为2时代表申请类型为退款 
	 * @param request
	 * @return 待退款的申请记录信息下一页
	 */
	@RequestMapping("nextrefund.do")
	public @ResponseBody String nextrefund(HttpServletRequest request){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Drawback> pagebean = signedBusiness.drawbackinfo(pagenum, 2);
		JSONArray jsonArray = JSONArray.fromObject(pagebean.getList());
		return jsonArray.toString();
	}
	
	/**
	 * @param session
	 * @return 查询财务收支记录(第一页)
	 */
	@RequestMapping("iaer.do")
	public ModelAndView iear(HttpSession session){
		PageBean<Iaer> page = signedBusiness.alliaerinfo(1);
		List<Iaer> list = page.getList();
		float i = 0;
		float o = 0;
		Iterator<Iaer> it =  list.iterator();
		while(it.hasNext()){
			Iaer iaer = it.next();
			if(iaer.getType().equals("收入")){
				i += iaer.getAmount();
			}else if(iaer.getType().equals("支出")){
				o += iaer.getAmount();
			}
		}
		session.setAttribute("pages", page.getPages());
		session.setAttribute("alliaeramount", signedBusiness.alliaeramount(new Signed()));
		session.setAttribute("i", i);
		session.setAttribute("o", o);
		return new ModelAndView("financial/iaer","iaers",list);
	}
	
	/**
	 * @param signed
	 * @param request
	 * @return 按条件筛选收支记录
	 */
	@RequestMapping("iaerbycondition.do")
	public @ResponseBody String iaerbycondition(@ModelAttribute("signed") Signed signed,HttpServletRequest request){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Iaer> page = signedBusiness.iaerbycon(signed, pagenum);
		JSONArray jsonArray = JSONArray.fromObject(page);
		return jsonArray.toString();
	}
	
	/**
	 * @param signed
	 * @return 月份收收入与支出总额
	 */
	@RequestMapping("iaermoneybymonth.do")
	public @ResponseBody String iaermoneybymonth(@ModelAttribute("signed") Signed signed){
		List<Iaer> list = signedBusiness.alliaeramount(signed);
		JSONArray jsonArray = JSONArray.fromObject(list);
		return jsonArray.toString();
	}
	
	
	/**
	 * 新增一条签单记录
	 */
	@RequestMapping("insertonesign.do")
	public String insertonesign(@ModelAttribute("signed") Signed signed){
		signedBusiness.addonesign(signed);
		return "redirect:/signed/signedinfo.do";
	}
	
	/**
	 * @param request
	 * @return 财务收支记录（指定页）
	 */
	@RequestMapping("nextiaer.do")
	public @ResponseBody String nextiaer(HttpServletRequest request){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.alliaerinfo(pagenum));
		System.out.println(pagenum);
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
	}
	
	/**
	 * @param request
	 * @return 批量删除签单信息(实际更改为已退学退费)
	 */
	@RequestMapping("delectmultiple.do")
	public String delectmultiple(HttpServletRequest request){
		String str = request.getParameter("str").substring(0, request.getParameter("str").length()-1);
		signedBusiness.delectmultiple(str);
		return "redirect:/signed/signedinfo.do";

	}
	
	/**
	 * 跳转页面
	 * @return
	 */
	@RequestMapping("dataStatistics.do")
	public String dataStatistics(HttpSession session){
		session.setAttribute("leftNav", 4);
		return "sale/dataStatistics"; 
	}
	
	/**
	 * 查询本月销售的签单与收款金额
	 * @return
	 */
	@RequestMapping("saleAchievement.do")
	public @ResponseBody String saleAchievement(){
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.saleAchievement());
		return jsonArray.toString();
	}
	

	/**
	 * 今年实际收入类型排名
	 * @return
	 */
	@RequestMapping("typeranking.do")
	public @ResponseBody String typeranking(){
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.typeranking());
		return jsonArray.toString();
	}
	
	/**
	 * 查询已经返完款和收完款的可打印的申请
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping("tobeprint.do")
	public String tobeprint(HttpSession session){
		PageBean<Signed> page = signedBusiness.tobeprint(1);
		session.setAttribute("tobeprint", page.getList());
		session.setAttribute("pages", page.getPages());
		return "financial/tobeprint";
	}
	/**
	 * 查询已经返完款和收完款的可打印的申请(下一页)
	 * @param request
	 * @param session
	 * @return
	 */
	@RequestMapping("nexttobeprint.do")
	public @ResponseBody String nexttobeprint(HttpServletRequest request,HttpSession session){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Signed> page = signedBusiness.tobeprint(pagenum);
		JSONArray jsonArray = JSONArray.fromObject(page.getList());
		return jsonArray.toString();
	}
	
	
	/**
	 * 根据姓名查看客户信息
	 * @param request
	 * @return
	 */
	@RequestMapping("selectcusbyname.do")
	public @ResponseBody String selectcusbyname(HttpServletRequest request){
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.selectcusbyname(request));
		return jsonArray.toString();
	}
	
	/**
	 * 根据客户姓名和销售查询收支记录
	 * @param request
	 * @return
	 */
	@RequestMapping("selectiaerbyname.do")
	public @ResponseBody String selectiaerbyname(HttpServletRequest request){
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.selectiaerbyname(request));
		return jsonArray.toString();
	}
	
	/**
	 * 不同意申请操作和不同意的理由
	 * @param drawback
	 * @return
	 */
	@RequestMapping("opporeason.do")
	public String opporeason(@ModelAttribute("drawback")Drawback drawback){
		signedBusiness.opporeason(drawback);
		return "redirect:/signed/Back.do";
	}
	
	@RequestMapping("deletebackfee.do")
	public String deletebackfee(HttpServletRequest request){
		signedBusiness.deletebackfee(Integer.parseInt(request.getParameter("dbid")));
		return "redirect:/signed/Back.do";
	}
	/********************************************************************************************************/
	
	
	/** 
     * 读取Excel数据到数据库 
     * @param file 
     * @param request 
     * @return 
     * @throws IOException ServletException 
     * @author chen
     */  
    @RequestMapping(value="readExcel.do")   
    public String readExcel(@RequestParam(value="mFile") MultipartFile mFile,HttpServletRequest request,HttpSession session,HttpServletResponse response) throws IOException, ServletException{  
    	
    	System.out.println("jdwedhqhdiqh");
    	MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
    	mFile = multipartRequest.getFile("mFile");
    	String path = request.getSession().getServletContext().getRealPath("/WEB-INF/upload/");//获取文件名 的路径
    	System.out.println(path);
    	String name = mFile.getOriginalFilename();   //获取文件名     
    	System.out.println(name);
    	InputStream inputStream = mFile.getInputStream();
    	 
    	 byte[] b = new byte[1048576];
    	 int length = inputStream.read(b);
    	 path += "\\" + name;
    	 FileOutputStream outputStream = new FileOutputStream(path);
    	 outputStream.write(b, 0, length);
    	 inputStream.close();
    	 outputStream.close();
       

    	ReadExcel xlsMain = new ReadExcel();
    	Signed signed=null;
    	try {
			List<Signed> ListResult =xlsMain.ReadInExcel(path);
			if(ListResult!=null){				
				for(int i=0;i<ListResult.size();i++){
					signed=ListResult.get(i);				
					signedBusiness.InsertSigned(signed);
				}				
			}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
        return "redirect:/signed/signedinfo.do" ;  
    }
    
    /**
     * @author chen
	 * 增加退返款记录
	 * @param drawback
	 * @param request
	 * @return
	 */
	@RequestMapping("UpdateByBack.do")
	public String updateByback(@ModelAttribute("DreaBack") Drawback drawback, HttpServletRequest request){
		signedBusiness.updateByExit(request, drawback);
		
		return "redirect:/signed/Back.do";
	}
	/**
	 * 从导航栏查询（BackFee显示）
	 * @param session
	 * @return 查询该销售的申请记录第一页
	 * @author chen
	 */
	@RequestMapping("Back.do")
	public ModelAndView BackFee(HttpSession session){	
		List<Signed> list = (signedBusiness. getdbdinfo(session,1)).getList();
		session.setAttribute("backpages", (signedBusiness. getdbdinfo(session,1)).getPages());
		return new ModelAndView("sale/BackFee","Back",list);
	}
	/**
	 * 
	 * @param session
	 * @return 我的申请记录下一页
	 */
	@RequestMapping("nextBack.do")
	public String nextBackFee(HttpSession session,HttpServletRequest request){	
		int pagenum =Integer.parseInt(request.getParameter("pagenum"));
		List<Signed> list = (signedBusiness. getdbdinfo(session,pagenum)).getList();
		JSONArray jsonArray = JSONArray.fromObject(list);
		return jsonArray.toString();
	}

	/**
	 * @author chen
	 * @param request ajax
	 * @return 查询所有stateid 5-9的信息
	 */
	@RequestMapping("slectbyall.do")
	public @ResponseBody String slectbyall(HttpServletRequest request,HttpSession session){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Drawback> page = signedBusiness.select(session, pagenum);
		JSONArray jsonArray = JSONArray.fromObject(page.getList());
		return jsonArray.toString();
	}
	/**
	 * @author chen
	 * @param session
	 * @return 查询第一页所有stateid 5-9的信息
	 */
	@RequestMapping("ourmanagment.do")
	public ModelAndView slectbyall(HttpSession session){
		PageBean<Drawback> page = signedBusiness.select(session, 1);
		session.setAttribute("pages", page.getPages());
		session.setAttribute("leftNav", 3);
		return new ModelAndView("sale/ourmanagment","InfoByall",page.getList());
		
	}
	/**
	 * 
	 * @param session
	 * @return 查询下一页所有stateid的信息
	 */
	@RequestMapping("nextourmanagment.do")
	public @ResponseBody String nextslectbyall(HttpSession session,HttpServletRequest request){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		PageBean<Drawback> page = signedBusiness.select(session, pagenum);
		session.setAttribute("leftNav", 3);
		JSONArray jsonArray = JSONArray.fromObject(page.getList());
		return jsonArray.toString();
	}
	/**
	 * @author chen
	 * @param session
	 * @return 更新一条stateid 5-9的信息
	 */
	@RequestMapping("updateByStateid.do")
	public String updateByStateid( HttpServletRequest request,HttpSession session){
		signedBusiness.agree(session, request);		
		return "redirect:/signed/ourmanagment.do";
	}
	
	

	/**
	 * @author chen
	 * @param session
	 * @return sid来查询
	 */
	@RequestMapping("selectByPrimaryKey.do")
	public@ResponseBody String selectByPrimaryKey(HttpServletRequest request,HttpSession session){
		int sid = Integer.parseInt(request.getParameter("sid"));
		List<Signed> signed=signedBusiness.selectByPrimaryKey(sid);		
		JSONArray jsonArray = JSONArray.fromObject(signed);
		return jsonArray.toString();

	}

	
	/**
	 * @author chen
	 * @param record
	 * @return 更新  修改
	 */
	@RequestMapping("UpdateByPrimaryKey.do")
	public String UpdateByPrimaryKey(HttpServletRequest request,HttpSession session,Signed record){
		//int sid = Integer.parseInt(request.getParameter("sid"));
		signedBusiness.UpdateByPrimaryKey(record);		
	
		return "redirect:/signed/signedinfo.do";

	}
	
	
	/**
	 * 查询所有部门签单,收款数据。
	 * @param signed
	 * @author chen
	 */
	@RequestMapping("DepyCollections.do")
	public @ResponseBody String DepyCollections(HttpServletRequest request,Signed signed) {
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.DepyCollections(request,signed));
		return jsonArray.toString();
	}

	
	/**
	 *  按部门签单收款数据。
	 * 
	 * @author chen
	 */
	@RequestMapping(value="AmountCollections.do",produces = "text/plain;charset=UTF-8")
	public @ResponseBody String AreaCollections(HttpServletRequest request,Signed signed) {
		System.out.println("123456123456789454654894563215649779645132");
		JSONArray jsonArray = JSONArray.fromObject(signedBusiness.AmountCollections(request, signed));
		System.out.println(jsonArray.toString());
		return jsonArray.toString();
	}

	/**
	 * @author chen
	 * @param record
	 * @return 下载导出Excel
	 */
	@RequestMapping("OutExcel.do")
	public String view_select(HttpServletRequest request,HttpServletResponse response,String fileName){	
	    
		LinkedHashMap<String, String> propertyHeaderMap = new LinkedHashMap<String, String>();  
		propertyHeaderMap.put("stime","签单时间");
		propertyHeaderMap.put("sbusinesstype","签单类型");
		propertyHeaderMap.put("scustomername","学生姓名");
		propertyHeaderMap.put("scustomerschool","学校");
		propertyHeaderMap.put("scustomercollege","院系");
		propertyHeaderMap.put("scustomermajor","专业");
		propertyHeaderMap.put("scustomercardid","身份证");
		propertyHeaderMap.put("scustomerbankcardid","银行卡");
		propertyHeaderMap.put("scustomergrade","年级");
		propertyHeaderMap.put("speoplenum","人数");
		propertyHeaderMap.put("studyfee","学费");
		propertyHeaderMap.put("spacefee","住宿费");
		propertyHeaderMap.put("backfee","返款");
		propertyHeaderMap.put("depositfee","定金");
		propertyHeaderMap.put("subtotal","小计");
		propertyHeaderMap.put("ctime","收款时间");
		propertyHeaderMap.put("tale","实缴费用");	
		propertyHeaderMap.put("sale","销售");
		propertyHeaderMap.put("dept","销售部门");
		propertyHeaderMap.put("sarea","区域");
		propertyHeaderMap.put("sremark","备注");
		propertyHeaderMap.put("bank","银行");	
		propertyHeaderMap.put("condition","签单状态");	
		
		List<Signed> dataSet=signedBusiness.view_select();
			
		try {
			//导出
			 XSSFWorkbook ex=OutExcel.generateXlsxWorkbook("导出数据", propertyHeaderMap, dataSet);		
			 File file=new File("C://签单数据.xlsx");//这里发布到服务器上可以改路径。
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
		return null;//这里不要写返回页面的，写了会出错，报请求重复的错误。

	}
	
}
