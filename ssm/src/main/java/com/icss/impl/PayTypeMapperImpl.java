package com.icss.impl;

import java.util.List;

import com.icss.bean.PayType;
import com.icss.dao.PayTypeMapper;
import com.icss.util.BasicSqlSupport;

public class PayTypeMapperImpl extends BasicSqlSupport implements PayTypeMapper{

	@Override
	public int deleteByPrimaryKey(Integer ptid) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insert(PayType record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int insertSelective(PayType record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public PayType selectByPrimaryKey(Integer ptid) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateByPrimaryKeySelective(PayType record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int updateByPrimaryKey(PayType record) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<PayType> alltype() {
		// TODO Auto-generated method stub
		return this.session.selectList("com.icss.dao.PayTypeMapper.alltype");
	}

}
