/**
 * @date 2016/10/17
 * @author 李敏
 * 签单相关的业务
 */
package com.icss.business;


import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.transaction.annotation.Transactional;

import com.icss.bean.Drawback;
import com.icss.bean.Iaer;
import com.icss.bean.Signed;
import com.icss.bean.User;
import com.icss.dao.SignedMapper;
import com.icss.util.PageBean;

public class SignedBusiness {
	private SignedMapper signedDao;
	
	public SignedMapper getSignedDao() {
		return signedDao;
	}

	public void setSignedDao(SignedMapper signedDao) {
		this.signedDao = signedDao;
	}
	
	/**
	 * @param pagenum
	 * @return 查询自己以及下属的签单信息
	 */
	public PageBean<Signed> allsigninfo(int pagenum,HttpSession session){
		String sale = ((User)session.getAttribute("tempuser")).getUsername();
		String job =  signedDao.myjob(sale);
		if(job.equals("总经理")||job.indexOf("副总")!=-1){
			return signedDao.allsign(pagenum);
		}else if(job.indexOf("主管")!=-1 || job.indexOf("总监")!=-1){
			System.out.println(sale+"//"+job);
			return signedDao.lowerlevesigninfo(new Signed(sale,job), pagenum);
		}else {
			return signedDao.signedinfoIsMine(sale,pagenum);
		}
	}
	/**
	 * 
	 * @return 查看签单排名
	 */
	public List<Signed> signranking(HttpServletRequest request,HttpSession session){
		String sale = ((User)session.getAttribute("tempuser")).getUsername();
		Signed s = new Signed();
		s.setStime(request.getParameter("starttime"));
		s.setSremark(request.getParameter("endtime"));
		String job = signedDao.myjob(sale);
		if(job.indexOf("总经理")!=-1||job.indexOf("副总")!=-1){
			return signedDao.DepyCollections(s);//按部门分查询
		}else if(job.indexOf("总监")!=-1||job.indexOf("主管")!=-1){
			s.setSale(sale);
			return signedDao.salecontribute(s);//查询自己和自己部门的信息
		}else{
			s.setSale(sale);
			return signedDao.salecontribute(s);
		}
	}
	
	
	public PageBean<Signed> nopayinfo(int pagenum,HttpSession session){
		String sale = ((User)session.getAttribute("tempuser")).getUsername();
		Signed signed = new Signed();
		if(signedDao.myjob(sale).indexOf("主管")!=-1||signedDao.myjob(sale).indexOf("总监")!=-1){
			signed.setDept(sale);
		}else if(signedDao.myjob(sale).indexOf("总经理")!=-1||signedDao.myjob(sale).indexOf("副总")!=-1){
		}else{
			signed.setSale(sale);
		}
		return signedDao.nopayinfo(pagenum, signed);
	}
	
	/**
	 * @param signed
	 * @return 查询某部门所有员工在某段时间内的签单和收款信息
	 */
	public List<Signed> deptempsigniaer(Signed signed){
		return signedDao.deptempiaer(signed);
	}
	
	/**
	 * 插入新增签单-条
	 * @param signed
	 * @return
	 */
	public int addonesign(Signed signed){
		signed.setDept(signedDao.getdname(signed.getSale()));
		return signedDao.insert(signed);
	}

	/**
	 * @param session
	 * 查询自己的签单（第一页）
	 */
	public PageBean<Signed> getSignedinfo(HttpSession session){
		String sale = ((User)session.getAttribute("tempuser")).getUsername();
		return signedDao.signedinfoIsMine(sale,1);
	}
	/**
	 * @param session
	 * 查询自己的签单（第一页）
	 */
	public PageBean<Signed> getnextSignedinfo(HttpSession session,int pagenum){
		String sale = ((User)session.getAttribute("tempuser")).getUsername();
		return signedDao.signedinfoIsMine(sale,pagenum);
	}
	
	
	/**
	 * 
	 * @param sale
	 * @param pagenum
	 * @return 查看指定页数自己的签单
	 */
	public List<Signed> nextPageSigninfo(String sale ,int pagenum){
		return (signedDao.signedinfoIsMine(sale, pagenum)).getList();
	}
	
	/**
	 * @param stateid
	 * @return 根据状态查询签单相关信息
	 */
	public PageBean<Signed> financeSignedinfo(int stateid,int pagenum){
		return signedDao.pending(stateid,pagenum); 
	}
	
	/**
	 * @param request
	 * @return 根据id查询整个签单信息
	 */
	public Signed selectSignedById(HttpServletRequest request){
		int sid = Integer.parseInt(request.getParameter("sid"));
		return signedDao.onesignedinfo(sid);
	}
	
	/**
	 * @param request
	 * @param iaer
	 * @return 插入数据进收支记录表，更改签单状态
	 */
	@Transactional
	public int addAndChange(HttpServletRequest request, Iaer iaer){
		//插入收支记录
		//获得传来的收入个款项的数据
		
		//插入收入记录
		if(request.getParameter("studyfee")!=""&&request.getParameter("studyfee")!=null){
			float studyfee = Float.parseFloat(request.getParameter("studyfee"));
			if(studyfee!=0){
				Iaer studtiaer = new Iaer(iaer.getTime(),iaer.getType(),studyfee,iaer.getHandler(),"学费",iaer.getSid());
				signedDao.addrecord(studtiaer);
			}
		}
		if(request.getParameter("spacefee")!=""&&request.getParameter("spacefee")!=null){
			float spacefee =  Float.parseFloat(request.getParameter("spacefee"));
			if(spacefee!=0){
				Iaer studtiaer = new Iaer(iaer.getTime(),iaer.getType(),spacefee,iaer.getHandler(),"住宿费",iaer.getSid());
				signedDao.addrecord(studtiaer);
			}
		}
		if(request.getParameter("backfee")!=""&&request.getParameter("backfee")!=null){
			float backfee =  Float.parseFloat(request.getParameter("backfee"));
			if(backfee!=0){
				Iaer studtiaer = new Iaer(iaer.getTime(),iaer.getType(),backfee,iaer.getHandler(),"补贴",iaer.getSid());
				signedDao.addrecord(studtiaer);
			}
		}
		if(request.getParameter("depositfee")!=""&& request.getParameter("depositfee")!=null){
			float depositfee =  Float.parseFloat(request.getParameter("depositfee"));
			if(depositfee!=0){
				Iaer studtiaer = new Iaer(iaer.getTime(),iaer.getType(),depositfee,iaer.getHandler(),"定金",iaer.getSid());
				signedDao.addrecord(studtiaer);
			}
		}
		if(request.getParameter("amount")!=""&&request.getParameter("amount")!=null){
			float amount =  Float.parseFloat(request.getParameter("amount"));
			if(amount!=0){
				System.out.println(request.getParameter("remark"));
				Iaer studtiaer = new Iaer(iaer.getTime(),iaer.getType(),amount,iaer.getHandler(),request.getParameter("remark"),iaer.getSid());
				signedDao.addrecord(studtiaer);
			}
		}
		
		
		//更改签单状态
		if(request.getParameter("stateid")!=""&&request.getParameter("stateid")!=null ){
			Signed signed = new Signed();
			signed.setSid(iaer.getSid());
			signed.setStateid(Integer.parseInt(request.getParameter("stateid")));//签单状态10-已完成;2、3-已收款、待返款
			signedDao.updateByPrimaryKeySelective(signed);
		}
		//更改退返款申请的状态
		if(request.getParameter("ask")!=""&&request.getParameter("ask")!=null ){
			Drawback drawback = new Drawback();
			drawback.setSid(iaer.getSid());;
			drawback.setStateid(Integer.parseInt(request.getParameter("ask")));//11、12-已退款、已返款
			signedDao.updatedrawback(drawback);
		}
		return 1;
	}
	
	public List<Iaer> alliaeramount(Signed signed){
		List<Iaer> list = signedDao.alliaeramount(signed);
		Iterator<Iaer>it = list.iterator();
		float i = 0;
		float o = 0;
		while(it.hasNext()){
			Iaer iaer = it.next();
			if(iaer.getType().equals("收入")){
				i += iaer.getAmount();
			}else if(iaer.getType().equals("支出")){
				o += iaer.getAmount();
			}
		}
		list.clear();
		list.add(new Iaer("收入",i));
		list.add(new Iaer("支出",o));
		return signedDao.alliaeramount(signed);
	}
	
	/**
	 * @param pagenum
	 * @param dbtype
	 * @return 根据类型查看退返款信息(多条)
	 */
	public PageBean<Drawback> drawbackinfo(int pagenum,int dbtype){
		return signedDao.drawbackinfo(pagenum, dbtype);
	}
	
	/**
	 * @param dbid
	 * @return 查看一条退返款申请信息
	 */
	public Drawback onebackinfo(int dbid){
		if(signedDao.applicationstatus(dbid).equals("9")){
			return signedDao.onebackinfo(dbid);
			
		}else{
			return null;
		}
		
	}
	
	/**
	 * @return 所有的收支记录
	 */
	public PageBean<Iaer> alliaerinfo(int pagenum){
		return signedDao.alliaerinfo(pagenum);
	}
	
	public PageBean<Signed> tobeprint(int pagenum){
		return signedDao.tobeprint(pagenum);
	}
	
	/**
	 * 根据客户姓名和销售查询收支记录
	 * @param request
	 * @return
	 */
	public PageBean<Iaer> selectiaerbyname(HttpServletRequest request){
		int pagenum = Integer.parseInt(request.getParameter("pagenum"));
		System.out.println(pagenum);
		Signed signed = new Signed(request.getParameter("sale"), request.getParameter("customername"));
		return signedDao.selectiaerbyname(pagenum, signed);
	}
	/**
	 * 根据条件筛选收支记录
	 * @param signed
	 * @param pagenum
	 * @return
	 */
	public PageBean<Iaer> iaerbycon(Signed signed,int pagenum){
		return signedDao.iaerbycondition(signed, pagenum);
	}
	
	/**
	 * 批量删除签单信息
	 * @param str
	 * @return (实际更新)
	 */
	public int delectmultiple(String str){
		String [] strArrays = str.trim().split(",");
		Integer[] intArray=new Integer[strArrays.length];     
        for (int i = 0; i < intArray.length; i++) {
            intArray[i] = Integer.parseInt((strArrays[i]));
        }
        List<Integer> list  = Arrays.asList(intArray);
		return signedDao.updatemultiple(list);
	}
	
	/**
	 * 查询本月销售的签单和收款
	 * @return
	 */
	public List<Signed> saleAchievement(){
		return signedDao.saleAchievement();
	}
	
	/**
	 * 查询今年的收入类型排名
	 * @return
	 */
	public List<Iaer> typeranking(){
		return signedDao.typeranking();
	}
	
	public String notpay(){
		return  null;
	}
	
	public String myjob(String sale){
		return signedDao.myjob(sale);
	}
	
	/**
	 * 根据用户查询还未收到的款项
	 */
	public Double notpay(HttpSession session){
		String sale = ((User)session.getAttribute("tempuser")).getUsername();
		String job = signedDao.myjob(sale);
		Double notreceive;
		if(job.equals("销售")){
			notreceive = signedDao.recedone(sale);
		}else if(job.equals("总经理")||job.indexOf("副总")!=-1){
			notreceive= signedDao.recedone();
		}else if(job.equals("销售主管")){
			notreceive = signedDao.exerecedone(sale);
		}else if(job.equals("销售总监")){
			notreceive = signedDao.deptrecedone(sale);
		}else{
			notreceive = 0.0;
		}
		System.out.println(notreceive);
		return notreceive;
	}
	
	/**
	 * 根据客户姓名模糊查找签单信息
	 * @param request
	 * @return
	 */
	public PageBean<Signed> selectcusbyname(HttpServletRequest request){
		return signedDao.selectcusbyname(Integer.parseInt(request.getParameter("pagenum")), request.getParameter("cusname"));
	}
	
	/**
	 * 修改退返款申请
	 * @param drawback
	 * @return
	 */
	public int opporeason(Drawback drawback){
		return signedDao.opporeason(drawback);
	}

	/**
	 * 删除退返款申请
	 * @param dbid
	 * @return
	 */
	public int deletebackfee(int dbid){
		return signedDao.deletebackfee(dbid);
	}
	/***********************************************************************************************************/
	
	/** 
     * 读取Excel数据到数据库 
     * @param signed 
     * @return 
     * @author chen
     */  
	
	public void InsertSigned(Signed signed){
		signedDao.insertSelective(signed);	
	
	}
	/**
	 * @author chen
	 * @param session
	 * 查询自己的退款返款信息
	 */
	public PageBean<Signed> getdbdinfo(HttpSession session,int pagenum){
		String emp = ((User)session.getAttribute("tempuser")).getUsername();
		return signedDao.dbinfoIsMine(emp, pagenum);
	}
	
	/**
	 * @author chen
	 * @param request
	 * @param drawback
	 * @return 更新退款返款记录
	 */
	public int updateByExit(HttpServletRequest request,Drawback drawback){
		drawback.setDbtime(request.getParameter("time"));
		
		drawback.setDbemp(request.getParameter("sale"));
		drawback.setDbamount(Float.valueOf(request.getParameter("backfee")));
		String statid =request.getParameter("stateid");
		drawback.setDbremark(request.getParameter("remark"));
		
		if(statid.equals("2")){	//只有状态为2才能退款。		
			drawback.setDbtype(2);//退款为2
			drawback.setStateid(5);//dreaback表 状态变更为5
			if(request.getParameter("stateid")!=""&&request.getParameter("stateid")!=null ){
				
				Signed signed = new Signed();
				signed.setScustomerbankcardid(request.getParameter("scustomerbankcardid"));
				signed.setScustomercardid(request.getParameter("scustomercardid"));
				signed.setBank(request.getParameter("bank"));
				
				signed.setSid(drawback.getSid());
				signed.setStateid(4);//signed 表 状态也变为4
				signedDao.updateByPrimaryKeySelective(signed);
			}
			
		}
		else{			
			drawback.setDbtype(1);//返款为1
			drawback.setStateid(5);//dreaback表 状态变更为5
			if(request.getParameter("stateid")!=""&&request.getParameter("stateid")!=null ){
				
				Signed signed = new Signed();
				signed.setScustomerbankcardid(request.getParameter("scustomerbankcardid"));
				signed.setScustomercardid(request.getParameter("scustomercardid"));
				signed.setBank(request.getParameter("bank"));
				signed.setSid(drawback.getSid());
				signed.setStateid(5);//signed 表 状态也变为5
				signedDao.updateByPrimaryKeySelective(signed);
			}
		}
		signedDao.insertDreaBack(drawback);//增加退返款信息记录。										
		return 1;
	}	
	
	/**
	 * @param pagenum
	 * @return 查询所有stateid 5-9的信息
	 */
	public PageBean<Signed> selectByAll(int pagenum){
		return signedDao.selectByAll(pagenum);
	}
	
	/**
	 * @param pagenum
	 * @return 更新一条stateid 5-9的信息
	 */
	public int updateByStateid(Signed signed){
		
		return signedDao.updateByStateid(signed);
	}
	
	

	/**
	 * 根据职位来查询申请
	 */
	public PageBean<Drawback> select(HttpSession session,int pagenum){
		String ename = ((User)session.getAttribute("tempuser")).getUsername();
		String job = signedDao.myjob(ename);
		PageBean<Drawback> page = new PageBean<Drawback>(null);
		if(job.indexOf("主管")!=-1){
			System.out.println("1");
			page = signedDao.selectbyjob(pagenum,5);
		}else if(job.indexOf("总监")!=-1){
			System.out.println("2");
			page = signedDao.selectbyjob(pagenum,6);
		}else if(job.indexOf("副总")!=-1){
			System.out.println("3");
			page = signedDao.selectbyjob(pagenum,7);
		}else if(job.indexOf("总经理")!=-1){
			System.out.println("4");
			page= signedDao.selectbyjob(pagenum,8);
		}
		return page;
	}
	
	/**
	 * 根据职位来同意申请信息
	 * @author limin
	 */
	public void agree(HttpSession session ,HttpServletRequest request){
		System.out.println("**************************");
		String str = request.getParameter("str").substring(0, request.getParameter("str").length()-1);
		System.out.println(str);
		String [] strArrays = str.trim().split(",");
		System.out.println(strArrays.toString());
		System.out.println("**************************");
		Integer[] intArray=new Integer[strArrays.length];     
        for (int i = 0; i < intArray.length; i++) {
            intArray[i] = Integer.parseInt((strArrays[i]));
        }
        List<Integer> list  = Arrays.asList(intArray);
		String ename = ((User)session.getAttribute("tempuser")).getUsername();
		String job = signedDao.myjob(ename);
		if(job.indexOf("主管")!=-1){
			signedDao.zhuguanagree(list);
		}else if(job.indexOf("总监")!=-1){
			signedDao.zongjianagree(list);
		}else if(job.indexOf("副总")!=-1){
			signedDao.fuzongagree(list);
		}else if(job.indexOf("总经理")!=-1){
			signedDao.zongjingliagree(list);
		}
		
	}
	
	/**
	 * 更新签单数据
	 * @author chen
	 */
	public int UpdateByPrimaryKey(Signed record){
		signedDao.updateByPrimaryKeySelective(record);
		Signed signed = signedDao.onesignedinfo(record.getSid());
		float sum = Float.parseFloat(signed.getCondition());
		float amount = signed.getStudyfee()+signed.getBackfee()+signed.getSpacefee()+signed.getDepositfee();
		if(signed.getStateid()<=10){
			record = new Signed();
			if(sum<amount){
				record.setSid(signed.getSid());
				record.setStateid(1);
			}else if(sum==amount){
				record.setSid(signed.getSid());
				record.setStateid(2);
			}
			signedDao.updateByPrimaryKeySelective(record);
			System.out.println(record.getStateid());
		}
		return 1;  
	}
	
	
	 /**
	   * 根据查询部门的签单收款数据
	   * @author chen
	   * @param signed
	   */
	  public List<Signed>  AmountCollections(HttpServletRequest request,Signed signed){
		  	String Lastime =request.getParameter("starttime");
		  	System.out.println(Lastime);
			String Nextime =request.getParameter("endtime");
			String dept=request.getParameter("dept");
			System.out.println("部门"+dept);
			signed.setLasttime(Lastime);
			signed.setNexttime(Nextime);
			signed.setDept(dept);
			
		  	return signedDao.AmountCollections(signed);	  	  
	  }
		/**
		 * 根据查询查询所有部门签单数据。 
		 * @author chen
		 * @param signed
		 */
		public List<Signed> DepyCollections(HttpServletRequest request,Signed signed){
			String Lastime =request.getParameter("starttime");
			String Nextime =request.getParameter("endtime");
			signed.setLasttime(Lastime);
			signed.setNexttime(Nextime);	
			return signedDao.DepyCollections(signed);
	}

	/**
	 * view_select 视图查询所有，导出
	 * @author chen
	 */
	public List<Signed> view_select(){
		return  signedDao.view_select();
	}


	/**
	 * 根据sid 查询所有
	 * @author chen
	 */
	public List<Signed> selectByPrimaryKey(Integer sid){
		return  signedDao.select(sid);
	}

}
