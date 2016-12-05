package com.icss.bean;

public class Iaer {
    private Integer id;

    private String time;

    private String type;

    private Float amount;

    private String handler;

    private String remark;
    
    private String sale;
    
    private String scustomername;
    
    private String scustomerschool;

    private Integer sid;
    
    public Iaer() {}

	public Iaer(String time, String type, Float amount,
			String handler, String remark, Integer sid) {
		this.time = time;
		this.type = type;
		this.amount = amount;
		this.handler = handler;
		this.remark = remark;
		this.sid = sid;
	}
	
	public Iaer(String type, Float amount) {
		this.type = type;
		this.amount = amount;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time == null ? null : time.trim();
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public String getHandler() {
		return handler;
	}

	public void setHandler(String handler) {
		this.handler = handler;
	}

	public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    public Integer getSid() {
        return sid;
    }

    public void setSid(Integer sid) {
        this.sid = sid;
    }

	public String getSale() {
		return sale;
	}

	public void setSale(String sale) {
		this.sale = sale;
	}

	public String getScustomername() {
		return scustomername;
	}

	public void setScustomername(String scustomername) {
		this.scustomername = scustomername;
	}

	public String getScustomerschool() {
		return scustomerschool;
	}

	public void setScustomerschool(String scustomerschool) {
		this.scustomerschool = scustomerschool;
	}
    
    
}