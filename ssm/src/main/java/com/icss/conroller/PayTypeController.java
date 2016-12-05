package com.icss.conroller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.icss.bean.PayType;
import com.icss.business.PayTypeBusiness;

@Controller
@RequestMapping("paytype")
public class PayTypeController {
	
	@Resource(name="payTypeBusiness")
	private PayTypeBusiness payTypeBusiness =null;

	public void setPayTypeBusiness(PayTypeBusiness payTypeBusiness) {
		this.payTypeBusiness = payTypeBusiness;
	}

	@RequestMapping("selectypeall.do")
	public  String selectypeall(HttpSession session,HttpServletRequest request){
		List<PayType> list = payTypeBusiness.selectall();
		session.setAttribute("paytype", list);
		if("1".equals(request.getParameter("status"))){
			return "customer/receivables";
		}else{
			return "customer/rebate";
		}
		
		
	}
}
