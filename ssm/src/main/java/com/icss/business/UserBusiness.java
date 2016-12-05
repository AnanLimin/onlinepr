package com.icss.business;


import java.util.List;

import org.apache.shiro.crypto.hash.Md5Hash;

import com.icss.bean.Permission;
import com.icss.bean.Role;
import com.icss.bean.Signed;
import com.icss.bean.User;
import com.icss.dao.UserMapper;

public class UserBusiness {
	/*********************************************Mapper配置*******************************************/
	private UserMapper userDao;	
	
	public UserMapper getUserDao() {
		return userDao;
	}

	public void setUserDao(UserMapper userDao) {
		this.userDao = userDao;
	}

	/*********************************************Business函数*******************************************/	
	
	/**  
     * 得到用户名
     * @param  String username
     * @param  无
     * @return User
     */ 
	public User getByUsername(String username){
		return userDao.selectByPrimaryKey(username);
	}
	
	/**  
     * 得到用户角色
     * @param  String username
     * @param  无
     * @return List<String>
     */ 
	public List<Role> getRoles(String username){	
		return userDao.getRoles(username);
	}
	
	/**  
     * 得到用户权限
     * @param  String username
     * @param  无
     * @return List<String>
     */ 
	public List<Permission> getPermissions(String username){		
		return userDao.getPermissions(username);
	}
	
	/**  
     * 修改密码钱，检测老密码比对是否输入正确
     * @param  int eid
     * @param  String password
     * @return String
     */ 
	public String getPwd(Integer eid,String password){
		System.out.println("password:"+password);
		String oldpwd =md5(password);
		System.out.println("oldpwd:"+oldpwd);
		System.out.println(userDao.getPwd(eid));
		if(oldpwd.equals(userDao.getPwd(eid))){
			//老密码比对正确
			System.out.println("比对成功");
			return "yes";
		}else{
			System.out.println("比对失败");
			return "密码不正确！";
		}
	}
	
	/**  
     * 更新用户密码(数据库内容修改)
     * @param  int eid
     * @param  String password
     * @return String
     */ 
	public int updatePwd(User user){
		System.out.println("username:"+user.getUsername());
		String password = user.getPassword();
		System.out.println("password:"+password);
		String newPwd =md5(password);
		user.setPassword(newPwd);
		System.out.println("newPwd（MD5后）:"+newPwd);
		System.out.println("class:"+user.getClass());
		System.out.println("eid:"+user.getEid());
		System.out.println("rid:"+user.getRid());
		return userDao.updatePwd(user);
	}

    
	/**
	 * 加密函数
	 */
    public static String md5(String str){
    	//加密盐
		String salt = "zhongruanguojietc";
	    return new Md5Hash(str,salt).toString() ;
	 }
   
}
