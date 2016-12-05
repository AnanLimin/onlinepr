package com.icss.util;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.CollectionUtils;
import org.apache.shiro.web.filter.authz.AuthorizationFilter;

public class OrPermsAuthorizationFilter extends AuthorizationFilter{

    @SuppressWarnings({"unchecked"})  
    public boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) throws IOException {  
  
        Subject subject = getSubject(request, response);  
        String[] permsArray = (String[]) mappedValue;  
  
        if (permsArray == null || permsArray.length == 0) { //没有角色限制，有权限访问  
            return true;  
        }  
        for (int i = 0; i < permsArray.length; i++) {  
            if (subject.isPermitted(permsArray[i])) { //若当前用户是rolesArray中的任何一个，则有权限访问  
                return true;  
            }  
        }  
        
        return false;  
    } 
	
	
}
