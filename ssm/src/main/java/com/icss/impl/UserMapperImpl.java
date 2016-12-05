/**
 * @date 2016/10/17
 * @author 王梓
 */
package com.icss.impl;

import java.util.List;

import com.github.pagehelper.PageHelper;
import com.icss.bean.Permission;
import com.icss.bean.Role;
import com.icss.bean.User;
import com.icss.dao.UserMapper;
import com.icss.util.BasicSqlSupport;
import com.icss.util.PageBean;

public class UserMapperImpl extends BasicSqlSupport implements UserMapper{

	@Override
	public User selectByPrimaryKey(String username) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.UserMapper.selectByPrimaryKey",username);
	}
	
	@Override
	public List<Role> getRoles(String username) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.UserMapper.getRoles",username);
	}
	
	@Override
	public List<Permission> getPermissions(String username) {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.UserMapper.getPermissions",username);
	}

	@Override
	public String getPwd(Integer eid) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.UserMapper.getPwd",eid);
	}

	@Override
	public int updatePwd(User user) {
		// TODO Auto-generated method stub
		return this.session.update("com.icss.dao.UserMapper.updatePwd", user);
	}

	






	
	@Override
	public int getuidByeid(int eid) {
		// TODO Auto-generated method stub
		return this.session.selectOne("com.icss.dao.UserMapper.getuidByeid", eid);
	}
	
	

}