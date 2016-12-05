package com.icss.bean;

public class Role {
    private Integer rid;

    private String name;

    private String description;
    
    private String permlist;

    public Integer getRid() {
        return rid;
    }

    public void setRid(Integer rid) {
        this.rid = rid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
	public String getPermlist() {
		return permlist;
	}

	public void setPermlist(String permlist) {
		this.permlist = permlist == null ? null : permlist.trim();
	}
}