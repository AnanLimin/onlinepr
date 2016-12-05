package com.icss.bean;

public class Stuinfo {
    private Integer stuid;

    private String stuname;

    private String stuscure;

    private String stucard;

    private String stuphone;

    private String stuperson;

    private String stuemai;

    private String stuschool;

    private String stugrade;

    private String stuspecia;

    private String studatetime;

    private String strenglev;
    
    private String stusex;
    
    

    public String getStusex() {
		return stusex;
	}

	public void setStusex(String stusex) {
		this.stusex = stusex;
	}

	public Integer getStuid() {
        return stuid;
    }

    public void setStuid(Integer stuid) {
        this.stuid = stuid;
    }

    public String getStuname() {
        return stuname;
    }

    public void setStuname(String stuname) {
        this.stuname = stuname == null ? null : stuname.trim();
    }

    public String getStuscure() {
        return stuscure;
    }

    public void setStuscure(String stuscure) {
        this.stuscure = stuscure == null ? null : stuscure.trim();
    }

    public String getStucard() {
        return stucard;
    }

    public void setStucard(String stucard) {
        this.stucard = stucard == null ? null : stucard.trim();
    }

    public String getStuphone() {
        return stuphone;
    }

    public void setStuphone(String stuphone) {
        this.stuphone = stuphone == null ? null : stuphone.trim();
    }

    public String getStuperson() {
        return stuperson;
    }

    public void setStuperson(String stuperson) {
        this.stuperson = stuperson == null ? null : stuperson.trim();
    }

    public String getStuemai() {
        return stuemai;
    }

    public void setStuemai(String stuemai) {
        this.stuemai = stuemai == null ? null : stuemai.trim();
    }

    public String getStuschool() {
        return stuschool;
    }

    public void setStuschool(String stuschool) {
        this.stuschool = stuschool == null ? null : stuschool.trim();
    }

    public String getStugrade() {
        return stugrade;
    }

    public void setStugrade(String stugrade) {
        this.stugrade = stugrade == null ? null : stugrade.trim();
    }

    public String getStuspecia() {
        return stuspecia;
    }

    public void setStuspecia(String stuspecia) {
        this.stuspecia = stuspecia == null ? null : stuspecia.trim();
    }

    public String getStudatetime() {
        return studatetime;
    }

    public void setStudatetime(String studatetime) {
        this.studatetime = studatetime == null ? null : studatetime.trim();
    }

    public String getStrenglev() {
        return strenglev;
    }

    public void setStrenglev(String strenglev) {
        this.strenglev = strenglev == null ? null : strenglev.trim();
    }
}