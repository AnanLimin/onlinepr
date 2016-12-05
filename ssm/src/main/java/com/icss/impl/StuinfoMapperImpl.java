package com.icss.impl;

import java.util.List;

import com.github.pagehelper.PageHelper;
import com.icss.bean.Signed;
import com.icss.bean.Stuinfo;
import com.icss.dao.StuinfoMapper;
import com.icss.util.BasicSqlSupport;
import com.icss.util.PageBean;

public class StuinfoMapperImpl extends BasicSqlSupport implements StuinfoMapper{
	static final Integer PAGESIZE = 15;
	
	@Override
	public int deleteByPrimaryKey(Integer stuid1) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(Stuinfo record) {
		// TODO Auto-generated method stub
		return this.session.insert("com.icss.dao.StuinfoMapper.insert",record);
	}

	@Override
	public int insertSelective(Stuinfo record) {
		// TODO Auto-generated method stub
		return this.session.insert("com.icss.dao.StuinfoMapper.insertSelective",record);
	}

	@Override
	public Stuinfo selectByPrimaryKey(Integer stuid1) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(Stuinfo record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(Stuinfo record) {
		// TODO Auto-generated method stub
		return 0;
	}	

	@Override
	public PageBean<Stuinfo> selectall(int pagenum) {
		// TODO Auto-generated method stub
		PageHelper.startPage(pagenum,PAGESIZE);
		System.out.println("111");
		List<Stuinfo> list=this.session.selectList("com.icss.dao.StuinfoMapper.info_view");
		return new PageBean<Stuinfo>(list);
	}

	@Override
	public List<Stuinfo> info_view() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.StuinfoMapper.info_view");
	}

	
}
