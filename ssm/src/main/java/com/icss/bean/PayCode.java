package com.icss.bean;

public class PayCode {
    private Integer cid;

    private Integer crid;

    private String ctime;

    private Integer sale;

    private Integer ctype;

    private Integer carea;

    private Long creceivables;

    private String cremark;

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public Integer getCrid() {
        return crid;
    }

    public void setCrid(Integer crid) {
        this.crid = crid;
    }

    public String getCtime() {
        return ctime;
    }

    public void setCtime(String ctime) {
        this.ctime = ctime == null ? null : ctime.trim();
    }

    public Integer getSale() {
        return sale;
    }

    public void setSale(Integer sale) {
        this.sale = sale;
    }

    public Integer getCtype() {
        return ctype;
    }

    public void setCtype(Integer ctype) {
        this.ctype = ctype;
    }

    public Integer getCarea() {
        return carea;
    }

    public void setCarea(Integer carea) {
        this.carea = carea;
    }

    public Long getCreceivables() {
        return creceivables;
    }

    public void setCreceivables(Long creceivables) {
        this.creceivables = creceivables;
    }

    public String getCremark() {
        return cremark;
    }

    public void setCremark(String cremark) {
        this.cremark = cremark == null ? null : cremark.trim();
    }
}