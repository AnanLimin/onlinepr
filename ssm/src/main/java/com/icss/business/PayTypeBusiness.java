package com.icss.business;

import java.util.List;

import com.icss.bean.PayType;
import com.icss.dao.PayTypeMapper;

public class PayTypeBusiness {
	
	private PayTypeMapper paytypeDao;
	

	public PayTypeMapper getPaytypeDao() {
		return paytypeDao;
	}

	public void setPaytypeDao(PayTypeMapper paytypeDao) {
		this.paytypeDao = paytypeDao;
	}
	
	public List<PayType> selectall(){
		return paytypeDao.alltype();
	}

}
