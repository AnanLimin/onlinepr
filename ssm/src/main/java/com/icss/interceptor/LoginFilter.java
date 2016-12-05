package com.icss.interceptor;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;  

public class LoginFilter extends OncePerRequestFilter  {



	@Override
	protected void doFilterInternal(HttpServletRequest request,
			HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		
		Object obj =  (Integer) request.getSession().getAttribute("logged"); 
		String url=request.getRequestURI(); 
		if(obj!=null){
			System.out.println("obj"+url);
			if(url!=null && !url.equals("")){ 
				if(url.indexOf("login.jsp")>=0 || url.equals("/ssm-001/")){
//					System.out.println("------------------------------已经登录不允许访问login.jsp-------------------------------");
					response.sendRedirect("/ssm-001/emp/adminindex.do");  
					chain.doFilter(request, response);
					return ;  
				}else{
/*					System.out.println("------------------------------------已经登录但不跳转-------------------------------");
*/					chain.doFilter(request, response);
					return ;
				}
			}
	    }else{
/*			System.out.println("------------------------------------尚未登录-------------------------------");
*/			chain.doFilter(request, response);
			return;  
		}
	}  

}
