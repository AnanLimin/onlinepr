package com.icss.bean;

public class PayType {
    private Integer ptid;

    private String ptname;
    
    private float pmoney;

    public Integer getPtid() {
        return ptid;
    }

    public void setPtid(Integer ptid) {
        this.ptid = ptid;
    }

    public String getPtname() {
        return ptname;
    }

    public void setPtname(String ptname) {
        this.ptname = ptname == null ? null : ptname.trim();
    }

	public float getPmoney() {
		return pmoney;
	}

	public void setPmoney(float pmoney) {
		this.pmoney = pmoney;
	}
}