package com.icss.bean;

public class PayRecord {
    private Integer prid;

    private String prtime;

    private Integer prhandler;

    private Integer prpaycode;

    private Integer prpaytype;

    private Float prpaymoney;

    public Integer getPrid() {
        return prid;
    }

    public void setPrid(Integer prid) {
        this.prid = prid;
    }

    public String getPrtime() {
        return prtime;
    }

    public void setPrtime(String prtime) {
        this.prtime = prtime == null ? null : prtime.trim();
    }

    public Integer getPrhandler() {
        return prhandler;
    }

    public void setPrhandler(Integer prhandler) {
        this.prhandler = prhandler;
    }

    public Integer getPrpaycode() {
        return prpaycode;
    }

    public void setPrpaycode(Integer prpaycode) {
        this.prpaycode = prpaycode;
    }

    public Integer getPrpaytype() {
        return prpaytype;
    }

    public void setPrpaytype(Integer prpaytype) {
        this.prpaytype = prpaytype;
    }

    public Float getPrpaymoney() {
        return prpaymoney;
    }

    public void setPrpaymoney(Float prpaymoney) {
        this.prpaymoney = prpaymoney;
    }
}