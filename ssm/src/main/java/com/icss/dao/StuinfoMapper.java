package com.icss.dao;

import java.util.List;

import com.icss.bean.Stuinfo;
import com.icss.util.PageBean;

public interface StuinfoMapper {
    int deleteByPrimaryKey(Integer stuid1);

    int insert(Stuinfo record);

    int insertSelective(Stuinfo record);

    Stuinfo selectByPrimaryKey(Integer stuid1);

    int updateByPrimaryKeySelective(Stuinfo record);

    int updateByPrimaryKey(Stuinfo record);
   
    
    PageBean<Stuinfo> selectall(int pagenum);
    
    List<Stuinfo> info_view();
}