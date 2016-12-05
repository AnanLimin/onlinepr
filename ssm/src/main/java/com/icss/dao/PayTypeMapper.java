package com.icss.dao;

import java.util.List;

import com.icss.bean.PayType;

public interface PayTypeMapper {
    int deleteByPrimaryKey(Integer ptid);

    int insert(PayType record);

    int insertSelective(PayType record);

    PayType selectByPrimaryKey(Integer ptid);

    int updateByPrimaryKeySelective(PayType record);

    int updateByPrimaryKey(PayType record);
    
    List<PayType> alltype();
}