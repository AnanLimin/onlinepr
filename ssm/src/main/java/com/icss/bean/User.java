package com.icss.bean;

public class User {
    private String username;

    private Integer rid;

    private String password;
    			   
    private Integer eid;
    
    private String ehr;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public Integer getEid() {
        return eid;
    }

    public void setEid(Integer eid) {
        this.eid = eid;
    }

	public String getEhr() {
		return ehr;
	}

	public void setEhr(String ehr) {
		this.ehr = ehr;
	}
    
    
}