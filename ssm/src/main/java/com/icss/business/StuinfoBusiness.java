package com.icss.business;

import com.icss.dao.StuinfoMapper;
import com.icss.util.PageBean;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.tools.ant.types.CommandlineJava.SysProperties;

import com.icss.bean.Stuinfo;

public class StuinfoBusiness {

	public StuinfoBusiness() {
		// TODO Auto-generated constructor stub
	}
	
	
	private StuinfoMapper stuDao;
	
	public void setStuDao(StuinfoMapper stuDao) {
		this.stuDao = stuDao;
	}
	public StuinfoMapper getStuDao() {
		return stuDao;
	}
	
	/**
	 * @param pagenum
	 * @return 查询所有的学员信息档案表(分页)
	 * @author chen
	 */
	
	public PageBean<Stuinfo> select(HttpSession session,int pagenum){	
		System.out.println("123");
		return stuDao.selectall(pagenum);
	}
	

	/**
	 * @param pagenum
	 * @return 插入学员信息
	 * @author chen
	 */
	public  int insertSelective(Stuinfo record,HttpServletRequest request){	
		String name=record.getStuname();
		System.out.println(name);
		return stuDao.insert(record);
	}
	/**
	 * @param pagenum
	 * @return 导出
	 * @author chen
	 */
	public List<Stuinfo> info_view(){
		
		return stuDao.info_view();
	}
}
