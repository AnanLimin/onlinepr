/**
	 * @author chen
	 * 提交 退返款的所有信息
	 * @param signed.jsp
	 * @return 
	 */
$(document).ready(function(){
	//修改申请信息
	$(".backfeeupdate").click(function() {   
		var sid = $(this).parent().parent().children(); 
		if(sid.eq(6).text()!="不同意"){
			alert("不能修改！");
			return false;
		}
		$("#updatadrawback div .col-md-3:eq(0)").html(sid.eq(0).text());
		$("#updatadrawback input[name=dbid]").val(sid.eq(0).text());
		$("#updatadrawback div .col-md-3:eq(1)").html(sid.eq(1).text());
		$("#updatadrawback div .col-md-3:eq(2)").html(sid.eq(2).text());
		$("#updatadrawback div .col-md-3:eq(3)").html(sid.eq(3).text());
		$("#updatadrawback div .col-md-3:eq(4)").html(sid.eq(4).text());
		var dbid= sid.eq(5).text();
		dbid=dbid.substr(dbid.indexOf("￥")+1,dbid.length);
		dbid= dbid.replace(",","");
		$("#updatadrawback input[name=dbamount]").val(dbid);		$("#updatadrawback").modal("show");
		$("#updatadrawback input[name=dbamount]").select();
	 });
	//删除自己的申请
	$(".backfeedelete").click(function() {   
		var sid = $(this).parent().parent().children(); 
		if(sid.eq(6).text()!="不同意" && sid.eq(6).text()!="已申请"){
			alert("不能删除！");
			return false;
		}else{
			if(!confirm("确定要删除这条申请吗？不可恢复！")){
				return false;
			}else{
				window.location.href="signed/deletebackfee.do?dbid="+sid.eq(0).text();
			}
		}
	});
	
	//生成分页按钮，并且能够查看分页后信息
	$("#myback").createPage({
	    pageCount:$("#pagecount").val(),
	    current:1,
	    backFn:function(p){
	    	$.ajax({
	    		type : 'POST',
	    		url : 'signed/Backinfo.do',
	    		dataType :'json',
	    		async:false, //这是重要的一步，防止重复提交的
	    		data : { "pagenum" : p},
	    		success : function(list) {
	    			if(list!=null || list.length>0){
	    				var htmlcontext = "";
	    				for(var obj in list){
	    					 var type ="";
	    					if(list[obj].dbtype==1){
	    						type="返款";
	    					}else{
	    						type="退款";
	    					}
	    					htmlcontext +="<tr><td>"+list[obj].dbid+"</td>";
	    					htmlcontext +="<td>"+list[obj].dbtime+"</td>";
	    					htmlcontext +="<td>"+list[obj].scustomername+"</td>";
	    					htmlcontext +="<td>"+list[obj].scustomercardid+"</td>";
	    					htmlcontext +="<td>￥"+(list[obj].bank).toLocaleString()+"</td>";
	    					htmlcontext +="<td>￥"+(list[obj].dbamount).toLocaleString()+"</td>";
	    					htmlcontext +="<td>"+list[obj].condition+"</td>";
	    					htmlcontext +="<td>"+type+"</td>";
	    					htmlcontext +="<td>"+list[obj].dbremark+"</td></tr>";
	
	    				}
					}
	    			$("#mybackinfotable").find("tbody").html(htmlcontext);
	    		}
	    	});
	    }
	});
	
	 
})
//返款申请
function BackModel(){
	var signcheckbox = $("input[name^='signed_checkbox']:checkbox:checked");
	if(signcheckbox.length!=1){
		alert("请选择单条数据操作！")
		return false;
	}else{
		$("input[name='time']").val(nowDate());
		$("input[name='handler']").val(username());
		$.ajax({
			type : 'POST',
    		url : 'signed/onesign.do',
    		dataType :'json',
    		async:false, 
    		data : { "sid" : signcheckbox.val()},
    		success : function(data){
    			for(var obj in data){
    				if(data[obj].stateid==5){
    					alert("正在申请中！不能再次申请");
    					return false;
    				}else if(data[obj].stateid!=3){
						alert("不符合返款条件，不能申请返款！");
    					return false;
    				}
    				$("input[name='stateid']").val(data[obj].stateid);
    				$("input[name='customername']").val(data[obj].scustomername);
    				$("input[name='sid']").val(data[obj].sid);
    				$("input[name='sale']").val(data[obj].sale);    			
    				$("input[name='scustomercardid']").val(data[obj].scustomercardid);
    				$("input[name='scustomerbankcardid']").val(data[obj].scustomerbankcardid);
    				$("input[name='backfee']").val(data[obj].backfee);    				
    				$("input[name='bank']").val(data[obj].bank);
    				$("input[name='remark']").text(data[obj].sremark);
    			}
    			$("#infoback").modal("show");	
    		}
		})
		
	}
};
//退款申请
function ExitModel(){
	var signcheckbox = $("input[name^='signed_checkbox']:checkbox:checked");
	if(signcheckbox.length!=1){
		alert("请选择单条数据操作！")
		return false;
	}else{
		$("input[name='time']").val(nowDate());
		$("input[name='handler']").val(username());
		$.ajax({
			type : 'POST',
    		url : 'signed/onesign.do',
    		dataType :'json',
    		async:false, 
    		data : { "sid" : signcheckbox.val()},
    		success : function(data){
    			for(var obj in data){
    				if(data[obj].stateid==5){
    					alert("正在申请中！不能再次申请");
    					return false;
    				}else if(data[obj].stateid!=2){
    					if(data[obj].condition<data[obj].depositfee||data[obj].stateid==3){
    						alert("不符合退款条件，不能申请退款！");
        					return false;
    					}
    				}
    				$("input[name='stateid']").val(data[obj].stateid);
    				$("input[name='customername']").val(data[obj].scustomername);
    				$("input[name='sid']").val(data[obj].sid);
    				$("input[name='sale']").val(data[obj].sale);    			
    				$("input[name='scustomercardid']").val(data[obj].scustomercardid);
    				$("input[name='scustomerbankcardid']").val(data[obj].scustomerbankcardid);
    				$("input[name='backfee']").val(data[obj].backfee);    				
    				$("input[name='bank']").val(data[obj].bank);
    				$("input[name='remark']").text(data[obj].sremark);
    			}
    			$("#info").modal("show");	
    		}
		})
		
	}
};
//提交事件。submitbyback 返款提交！待返款才可以申请返款，即statid=3的时候才可以！
function submitbyexit(){	
	if($("#incomeform .has-error").length>0){
		return false;
	}
	var  statid=document.getElementById("stateid").value;//订单状态。
	if(statid!=2){//临时改的。
		alert("不能退款");
		return false; 		
	}	
	else{		
		alert("申请中，请等待");
		return true;			
	}
};

//提交事件。submitbyback 退款提交。退款前提是缴费了才可以退钱，statid=2的时候才可以退款。
function submitbyback(){
	if($("#incomeform2 .has-error").length>0){
		return false;
	}
	var  statid=document.getElementById("stateid").value;//订单状态。
	if(statid!=3){
		alert("不能返款");
		return false; 	
		
	}else{
		alert("申请中，请等待");
		return true;				
	}	
};

//获得当前系统时间
function nowDate(){
	var d = new Date();
	var month = d.getMonth()>=9?"-"+(d.getMonth()+1):"-0"+(d.getMonth()+1);
	var day = d.getDate()>=10?"-"+d.getDate():"-0"+d.getDate();
	var str = d.getFullYear()+month+day;
	return str;
}

//获取当前登录用户名
function username(){
	var handler =$.trim($(".navbar li:eq(0) a").text());
	handler = handler.substr(handler.indexOf('[')+1, handler.indexOf(']')- handler.indexOf('[')-1);
	return handler;
}

//修改申请信息

