package com.icss.bean;

public class Signed {
    private Integer sid;

    private String stime;

    private String sbusinesstype;

    private String scustomername;

    private String scustomerschool;

    private String scustomercollege;

    private String scustomermajor;

    private String scustomercardid;

    private String scustomerbankcardid;

    private String scustomergrade;

    private Integer speoplenum;

    private Float studyfee;

    private Float spacefee;

    private Float backfee;

    private Float depositfee;

    private String sale;

    private String dept;

    private String sarea;

    private String sremark;

    private Integer stateid;
    
    private String condition;
    
    private String bank;
    
    private String lasttime;
    
    private String nexttime;
    
    private String subtotal;
    
    private String ctime;
    
    private String tale;
    
    public Signed() {
	}

	public Signed(String sale, String sremark) {
		this.sale = sale;
		this.sremark = sremark;
	}


	public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

    public String getStime() {
        return stime;
    }

    public void setStime(String stime) {
        this.stime = stime == null ? null : stime.trim();
    }

    public String getSbusinesstype() {
        return sbusinesstype;
    }

    public void setSbusinesstype(String sbusinesstype) {
        this.sbusinesstype = sbusinesstype == null ? null : sbusinesstype.trim();
    }

    public String getScustomername() {
        return scustomername;
    }

    public void setScustomername(String scustomername) {
        this.scustomername = scustomername == null ? null : scustomername.trim();
    }

    public String getScustomerschool() {
        return scustomerschool;
    }

    public void setScustomerschool(String scustomerschool) {
        this.scustomerschool = scustomerschool == null ? null : scustomerschool.trim();
    }

    public String getScustomercollege() {
        return scustomercollege;
    }

    public void setScustomercollege(String scustomercollege) {
        this.scustomercollege = scustomercollege == null ? null : scustomercollege.trim();
    }

    public String getScustomermajor() {
        return scustomermajor;
    }

    public void setScustomermajor(String scustomermajor) {
        this.scustomermajor = scustomermajor == null ? null : scustomermajor.trim();
    }

    public String getScustomercardid() {
        return scustomercardid;
    }

    public void setScustomercardid(String scustomercardid) {
        this.scustomercardid = scustomercardid == null ? null : scustomercardid.trim();
    }

    public String getScustomerbankcardid() {
        return scustomerbankcardid;
    }

    public void setScustomerbankcardid(String scustomerbankcardid) {
        this.scustomerbankcardid = scustomerbankcardid == null ? null : scustomerbankcardid.trim();
    }

    public String getScustomergrade() {
        return scustomergrade;
    }

    public void setScustomergrade(String scustomergrade) {
        this.scustomergrade = scustomergrade == null ? null : scustomergrade.trim();
    }

    public Integer getSpeoplenum() {
        return speoplenum;
    }

    public void setSpeoplenum(Integer speoplenum) {
        this.speoplenum = speoplenum;
    }

    public Float getStudyfee() {
        return studyfee;
    }

    public void setStudyfee(Float studyfee) {
        this.studyfee = studyfee;
    }

    public Float getSpacefee() {
        return spacefee;
    }

    public void setSpacefee(Float spacefee) {
        this.spacefee = spacefee;
    }

    public Float getBackfee() {
        return backfee;
    }

    public void setBackfee(Float backfee) {
        this.backfee = backfee;
    }

    public Float getDepositfee() {
        return depositfee;
    }

    public void setDepositfee(Float depositfee) {
        this.depositfee = depositfee;
    }

    public String getSale() {
        return sale;
    }

    public void setSale(String sale) {
        this.sale = sale == null ? null : sale.trim();
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept == null ? null : dept.trim();
    }

    public String getSarea() {
        return sarea;
    }

    public void setSarea(String sarea) {
        this.sarea = sarea == null ? null : sarea.trim();
    }

    public String getSremark() {
        return sremark;
    }

    public void setSremark(String sremark) {
        this.sremark = sremark == null ? null : sremark.trim();
    }

    public Integer getStateid() {
        return stateid;
    }

    public void setStateid(Integer stateid) {
        this.stateid = stateid;
    }

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public String getBank() {
		return bank;
	}

	public void setBank(String bank) {
		this.bank = bank;
	}

	public String getLasttime() {
		return lasttime;
	}

	public void setLasttime(String lasttime) {
		this.lasttime = lasttime;
	}

	public String getNexttime() {
		return nexttime;
	}

	public void setNexttime(String nexttime) {
		this.nexttime = nexttime;
	}

	public String getSubtotal() {
		return subtotal;
	}

	public void setSubtotal(String subtotal) {
		this.subtotal = subtotal;
	}

	public String getCtime() {
		return ctime;
	}

	public void setCtime(String ctime) {
		this.ctime = ctime;
	}

	public String getTale() {
		return tale;
	}

	public void setTale(String tale) {
		this.tale = tale;
	}
    
    
}