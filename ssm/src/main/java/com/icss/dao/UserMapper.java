/**
 * @date 2016/10/17
 * @author 王梓
 */
package com.icss.dao;

import java.util.List;

import com.icss.bean.Permission;
import com.icss.bean.Role;
import com.icss.bean.User;
import com.icss.util.PageBean;

public interface UserMapper {

    User selectByPrimaryKey(String username);

    List<Permission> getPermissions(String username);

	List<Role> getRoles(String username);
	

	String getPwd(Integer eid);
	
	int updatePwd(User user);
	
	
	int getuidByeid(int eid);
	
	
	

}