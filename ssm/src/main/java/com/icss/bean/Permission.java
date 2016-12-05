package com.icss.bean;

public class Permission {
    private Integer pid;

    private String description;

    private String name;

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getName() {
        return name;
    }

    public void setname(String name) {
        this.name = name == null ? null : name.trim();
    }
}