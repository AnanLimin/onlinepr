package com.icss.bean;

public class Drawback {
    private Integer dbid;

    private String dbtime;

    private String dbemp;

    private Float dbamount;

    private Integer dbtype;

    private Integer stateid;
    
    private String statu;
    
    private Integer signedstatus;

    private String dbremark;

    private Integer sid;
    
    private String scustomername;
    
    private String scustomercardid;
    
    private String scustomerbankcardid;
    
    private String condition;
    
    private String bank;
    
    
    public void setCondition(String condition) {
		this.condition = condition;
	}
    public String getCondition() {
		return condition;
	}
    

    public Integer getDbid() {
        return dbid;
    }

    public void setDbid(Integer dbid) {
        this.dbid = dbid;
    }

    public String getDbtime() {
        return dbtime;
    }

    public void setDbtime(String dbtime) {
        this.dbtime = dbtime == null ? null : dbtime.trim();
    }

    public String getDbemp() {
        return dbemp;
    }

    public void setDbemp(String dbemp) {
        this.dbemp = dbemp == null ? null : dbemp.trim();
    }

    public Float getDbamount() {
        return dbamount;
    }

    public void setDbamount(Float dbamount) {
        this.dbamount = dbamount;
    }

    public Integer getStateid() {
        return stateid;
    }

    public void setStateid(Integer stateid) {
        this.stateid = stateid;
    }
    
    public String getStatu() {
		return statu;
	}

	public void setStatu(String statu) {
		this.statu = statu;
	}

	public Integer getDbtype() {
		return dbtype;
	}

	public void setDbtype(Integer dbtype) {
		this.dbtype = dbtype;
	}

	public Integer getSignedstatus() {
		return signedstatus;
	}

	public void setSignedstatus(Integer signedstatus) {
		this.signedstatus = signedstatus;
	}

	public String getDbremark() {
        return dbremark;
    }

    public void setDbremark(String dbremark) {
        this.dbremark = dbremark == null ? null : dbremark.trim();
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

	public String getScustomername() {
		return scustomername;
	}

	public void setScustomername(String scustomername) {
		this.scustomername = scustomername;
	}

	public String getScustomercardid() {
		return scustomercardid;
	}

	public void setScustomercardid(String scustomercardid) {
		this.scustomercardid = scustomercardid;
	}

	public String getScustomerbankcardid() {
		return scustomerbankcardid;
	}

	public void setScustomerbankcardid(String scustomerbankcardid) {
		this.scustomerbankcardid = scustomerbankcardid;
	}
	public String getBank() {
		return bank;
	}
	public void setBank(String bank) {
		this.bank = bank;
	}
    
    
}