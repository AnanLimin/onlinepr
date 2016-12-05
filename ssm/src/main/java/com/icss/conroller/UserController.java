package com.icss.conroller;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.hibernate.validator.util.GetAnnotationParameter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.icss.bean.User;
import com.icss.business.UserBusiness;



@Controller
@RequestMapping("user")
public class UserController {	
	
	@Resource(name="userBusiness")
	private UserBusiness userBusiness = null;

	public void setUserBusiness(
			UserBusiness userBusiness) {
		this.userBusiness = userBusiness;
	}


	 /** 
	  * 用户登录操作
	  * @param  String username
      * @param  String password
      * @param  ModelMap model
      * @param  HttpSession session
      * @return String
	  */  
	 @RequestMapping(value = "login.do")  
	 public String login(String ehr, String password,ModelMap model,HttpSession session) {  
	    Subject subject = SecurityUtils.getSubject();
	    //如果已经登录则直接返还到首页
	    if(subject.isAuthenticated()){
	        return "redirect:/user/adminindex.do";
	    }else{
	    	//加密前密码
	    	System.out.println("password（未加密）:"+password);
	    	password = UserBusiness.md5(password);
	    	//加密后密码
	    	System.out.println("password（加密）:"+password);
	        UsernamePasswordToken token = new UsernamePasswordToken(ehr, password);  
	        String error = null;
	      try {  
	          subject.login(token);  
	          session.setAttribute("logged", 1);
		      //登录时设置eid到session中
	    	  User tempuser = userBusiness.getByUsername(ehr);
	    	  tempuser.setPassword("");
	    	  session.setAttribute("tempuser", tempuser);
	         // subject.logout();
	      } catch (UnknownAccountException e) {  
	          error = "用户名不存在";  
	      } catch (IncorrectCredentialsException e) {  
	          error = "密码不正确";  
	      } catch (AuthenticationException e) {  
	          //其他错误，比如锁定，如果想单独处理请单独catch处理  
	          error = "其他错误：" + e.getMessage();  
	      } 
	      //返还错误信息到客户端
	      model.addAttribute("msg", error);
	      System.out.println("用户认证状态："+subject.isAuthenticated());
	       	      
	      if(subject.isAuthenticated()){
	        return "redirect:/user/adminindex.do"; 
	      }else{
	        return "redirect:/login.jsp"; 
	      }      

	    }
	 }

	 
    /**
	 * 用户登出操作
	 * @param  HttpServletRequest request
     * @param  无
     * @return String
	 */	 
    @RequestMapping("/logout.do")
    public String logout(HttpServletRequest request) {
    	Subject subject = SecurityUtils.getSubject();
    	if (subject.isAuthenticated()) {
    		 subject.logout(); // session 会销毁，在SessionListener监听session销毁，清理权限缓存
     		System.out.println("用户登出操作");
    		 return "redirect:/login.jsp";
    	}else{
    		System.out.println("用户尚未登录，不能做登出操作");
            return "redirect:/login.jsp";	
    	}
    }   

    
    /**
	 * 跳转到修改页面
	 * @param  HttpSession session
     * @param  无
     * @return String
	 */
    @RequestMapping("/edit_pwd.do")
    public String edit_pwd(HttpSession session) {	
        return "/public/edit_pwd";
    }
    
    
	/**
	 * 修改密码钱，检测老密码比对是否输入正确
	 * @param  HttpServletRequest request
     * @param  无
     * @return String
	 */
    @RequestMapping(value = "/edit.do", produces = "text/plain;charset=UTF-8" )
    public @ResponseBody String edit(HttpServletRequest request) {
		int eid = Integer.valueOf(request.getParameter("eid"));
		String pwd = request.getParameter("oldPwd");
		return userBusiness.getPwd( eid , pwd );
    }

	/**
	 * 更新密码(数据库内容修改)
	 * @param  HttpServletRequest request
     * @param  无
     * @return String
	 */
    @RequestMapping("/update.do")
    public String update(@ModelAttribute("user") User user,HttpSession session) {
		if(userBusiness.updatePwd(user)==1){
			System.out.println("修改密码成功");
			session.setAttribute("updatetemp", "修改密码成功");
			return "redirect:/user/logout.do";
		}else{
			System.out.println("修改密码失败");
			session.setAttribute("updatetemp", "修改密码失败");
			return "redirect:/user/edit_pwd.do";
		}
    }
    
    /**
     * 进入首页
     * @return
     */
    @RequestMapping("adminindex.do")
	public String adminindex(HttpSession session){
    	session.setAttribute("leftNav", 0);
		return "public/index";
}


    
}
