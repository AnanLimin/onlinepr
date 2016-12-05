$(document).ready(function(){
	$("#addcardid").change(function() {
		$('#addcardid').parent().removeClass("has-error");
		if(!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($('#addcardid').val())){
			$('#addcardid').parent().addClass("has-error");
		}
	});
	$("#refundcardid").change(function() {
		$('#refundcardid').parent().removeClass("has-error");
		if(!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($('#refundcardid').val())){
			$('#refundcardid').parent().addClass("has-error");
		}
	});
	$("#backcardid").change(function() {
		$('#backcardid').parent().removeClass("has-error");
		if(!/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test($('#backcardid').val())){
			$('#backcardid').parent().addClass("has-error");
		}
	});
	
	notpay();
	
	$("#mysign").createPage({
	    pageCount:$("#pagecount").val(),
	    current:1,
	    backFn:function(p){
	    	$.ajax({
	    		type : 'POST',
	    		url : 'signed/nextsignedinfo.do',
	    		dataType :'json',
	    		async:false, //这是重要的一步，防止重复提交的
	    		data : { "pagenum" : p },
	    		success : function(data) {
	    			if(data!=null || data.length>0){
	    				var htmlcontext = "";
	    				for(var obj in data){
	    					var count  = data[obj].studyfee+data[obj].spacefee+data[obj].backfee+data[obj].depositfee;
	    					if(data[obj].condition=="已完成"){
	    						htmlcontext +="<tr class='success'>";
	    					}else if(data[obj].condition=="未收款"){
	    						htmlcontext +="<tr class='warning'>";
	    					}else if(data[obj].condition=="已收款"){
	    						htmlcontext +="<tr class='info'>";
	    					}else if(data[obj].condition=="已删除"){
	    						htmlcontext +="<tr class='danger'>";
	    					}else{
	    						htmlcontext +="<tr>";
	    					}
	    					htmlcontext +="<td>&nbsp;&nbsp;<input type='checkbox' value='"+data[obj].sid+"' name='signed_checkbox'></td>"
	    					htmlcontext +="<td>"+data[obj].sid+"</td>"
	    					htmlcontext +="<td>"+data[obj].stime+"</td>"
	    					htmlcontext +="<td>"+data[obj].sbusinesstype+"</td>"
	    					htmlcontext +="<td>"+data[obj].sale+"</td>"
	    					htmlcontext +="<td>"+data[obj].dept+"</td>"
	    					htmlcontext +="<td>"+data[obj].scustomername+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].studyfee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].spacefee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].backfee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].depositfee).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(count).toLocaleString()+"</td>"
	    					htmlcontext +="<td>￥"+(data[obj].stateid).toLocaleString()+"</td>"
	    					htmlcontext +="<td>"+data[obj].sarea+"</td>"
	    					htmlcontext +="<td>"+data[obj].condition+"</td></tr>"
	    				}
	    			}
	    			
	    			$("#customerinfotable").find("tbody").html(htmlcontext);
	    		}
	    		
	    	});
	    }
	});
	$("#ourmanament").createPage({
		pageCount:$("#ourmanagmentpages").val(),
		current:1,
		backFn:function(p){
			$.ajax({
				type : 'POST',
				url : 'signed/nextourmanagment.do',
				dataType :'json',
				async:false, //这是重要的一步，防止重复提交的
				data : { "pagenum" : p },
				success : function(data) {
					if(data!=null || data.length>0){
						var htmlcontext = "";
						for(var obj in data){
							var type ="";
							if(data[obj].dbtype==1){
								type="返款";
							}else{
								type="退款";
							}
							htmlcontext +="<tr><td>"+data[obj].sid+"</td>"
							htmlcontext +="<td>"+data[obj].dbtime+"</td>"
							htmlcontext +="<td>"+data[obj].dbemp+"</td>"
							htmlcontext +="<td>￥"+(data[obj].dbamount).toLocaleString()+"</td>"
							htmlcontext +="<td>"+data[obj].statu+"</td>"
							htmlcontext +="<td>"+type+"</td>"
							htmlcontext +="<td>"+data[obj].scustomername+"</td>"
							htmlcontext +="<td>"+data[obj].scustomercardid+"</td>"
							htmlcontext +="<td>"+data[obj].scustomerbankcardid+"</td>"
							htmlcontext +="<td>"+data[obj].dbremark+"</td></tr>"
						}
					}
					$("#ourmanamentinfotable").find("tbody").html(htmlcontext);
				}
			});
		}
	});
	$("#allsign").createPage({
	    pageCount:$("#allsignpages").val(),
	    current:1,
	    backFn:function(p){
	    	$.ajax({
    		type : 'POST',
    		url : 'signed/nextallsigninfo.do',
    		dataType :'json',
    		async:false, //这是重要的一步，防止重复提交的
    		data : { "pagenum" : p },
    		success : function(data) {
    			if(data!=null || data.length>0){
    				var htmlcontext = "";
    				for(var obj in data){
    					var count  = data[obj].studyfee+data[obj].spacefee;
    					if(data[obj].bank=="已完成"){
    						htmlcontext +="<tr class='success'>";
    					}else if(data[obj].bank=="未收款"){
    						htmlcontext +="<tr class='warning'>";
    					}else if(data[obj].bank=="已收款"){
    						htmlcontext +="<tr class='info'>";
    					}else if(data[obj].bank=="已删除"){
    						htmlcontext +="<tr class='danger'>";
    					}else{
    						htmlcontext +="<tr>";
    					}
    					htmlcontext +="<td>"+data[obj].sid+"</td>"
    					htmlcontext +="<td>"+data[obj].stime+"</td>"
    					htmlcontext +="<td>"+data[obj].scustomername+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].studyfee).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].spacefee).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(count).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].backfee).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].depositfee).toLocaleString()+"</td>"
    					htmlcontext +="<td>￥"+(data[obj].stateid).toLocaleString()+"</td>"
    					htmlcontext +="<td>"+data[obj].bank+"</td>"
    					htmlcontext +="<td><a>"+data[obj].sale+"</a></td>"
    					htmlcontext +="</tr>"
    				}
    			}
    			$("#allsigninfotable").find("tbody").html(htmlcontext);
    		}
    	});
	    }
    });
	
});


function notpay(){
	$.ajax({
		type : 'POST',
		url : 'signed/notpay.do',
		dataType :'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { "pagenum" : "" },
		success : function(data) {
			$("#notpaymoney").html("<a href='signed/nopayinfo.do?pagenum=1'>未收款：￥"+data.toLocaleString()+"</a>");
		}
		
	})
	
}


function addsigned(){
	if($(".has-error").length>0){
		return false;
	}
	$("#sale").val(username());
	$("#stime").val(nowDate());
	
}


function updatacustomerinfo(){
	
}



function ck(){
    var tbodyObj = document.getElementById('tbodyID');
        $("table :checkbox").each(function(key,value){
            if($(value).prop('checked')){
                alert(tbodyObj.rows[key].cells[1].innerHTML); 
                alert(tbodyObj.rows[key].cells[2].innerHTML); 
            }
        })
    }
function delectsigninfo(){
	var cuscheckbox = $("input[name='signed_checkbox']:checkbox:checked");
	if(cuscheckbox.length>0){
		if (!confirm("确定要删除这"+cuscheckbox.length+"条签单信息吗，只允许删除未收款的签单")) {
			return false;
		}
		var checkboxarray ="";
		cuscheckbox.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
			checkboxarray += $(this).val()+",";
		});
		
		var flag=0;
		var tbodyObj = document.getElementById('customerinfotable');
        $("table :checkbox").each(function(key,value){
            if($(value).prop('checked')){
                if(tbodyObj.rows[key+1].cells[13].innerHTML!="未收款"){
                	alert("所选数据中有不符合要求的数据，不能删除！");
                	flag=1;
                	return false;
                }
            }
        })
		if(flag!=1){
			window.location.href="signed/delectmultiple.do?str="+checkboxarray;
		}
		
	}
}

//同意申请
function agree(){
	var cuscheckbox = $("input[name='agree_checkbox']:checkbox:checked");
	if(cuscheckbox.length>0){
		if (!confirm("确定要同意这"+cuscheckbox.length+"条申请信息吗")) {
			return false;
		}
		var checkboxarray ="";
		cuscheckbox.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
			checkboxarray += $(this).val()+",";
		});
		window.location.href="signed/updateByStateid.do?str="+checkboxarray;
	}
}

//不同意申请
function oppose(){
	var cuscheckbox = $("input[name='agree_checkbox']:checkbox:checked");
	if(cuscheckbox.length!=1){
		alert("请选择一条申请再操作")
		return false;
	}
	$("#opporeason input[name=dbid]").val(cuscheckbox.val());
	$("#opporeason").modal('show');
}
