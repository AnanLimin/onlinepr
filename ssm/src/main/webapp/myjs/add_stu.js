$(document).ready(function(){
	//默认为隐藏
	$("#paytime").hide();
	$("#payli").hide();
	$("#paymoney").hide(); 
	$("#payhostel").hide(); 

	$(".tcdPageCode:eq(0)").createPage({
	    pageCount:$("#pagecount").val(),
	    current:1,
	    backFn:function(p){
	    	$.ajax({
	    		type : 'POST',
	    		url : 'customer/cuspage.do',
	    		dataType :'json',
	    		async:false, //这是重要的一步，防止重复提交的
	    		data : { "pagenum" : p },
	    		success : function(data) {
	    			if(data!=null || data.length>0){
	    				var htmlcontext = "";
	    				for(var obj in data){
	    					htmlcontext +="<tr><td>&nbsp;&nbsp;<input type='checkbox' value='"+data[obj].crid+"' name='complete_checkbox'></td>"
	    					htmlcontext +="<td><a href='customer/updatecustrunonjsp.do?crid="+data[obj].crid+"'>"+data[obj].crname+"</a></td>"
	    					htmlcontext +="<td>"+data[obj].crsex+"</td>"
	    					htmlcontext +="<td>"+data[obj].cdbrithday+"</td>"
	    					htmlcontext +="<td>"+data[obj].cdhometown+"</td>"
	    					htmlcontext +="<td>"+data[obj].cdnation+"</td>"
	    					htmlcontext +="<td>"+data[obj].cdlandscape+"</td>"
	    					htmlcontext +="<td>"+data[obj].cdeducation+"</td>"
	    					htmlcontext +="<td>"+data[obj].crschool+"</td>"
	    					htmlcontext +="<td>"+data[obj].crmajor+"</td>"
	    					htmlcontext +="<td>"+data[obj].crtel+"</td>"
	    					htmlcontext +="<td>"+data[obj].csname+"</td></tr>"
	    				}
	    			}
	    			
	    			$("#customerinfotable").find("tbody").html(htmlcontext);
	    		}
	    		
	    	});
	    }
	});
	
});



//弹出隐藏层
function ShowDiv(show_div,bg_div){
	document.getElementById(show_div).style.display='block';
	document.getElementById(bg_div).style.display='block' ;
	var bgdiv = document.getElementById(bg_div);
	bgdiv.style.width = document.body.scrollWidth;
	// bgdiv.style.height = $(document).height();
	$("#"+bg_div).height($(document).height());
};
//关闭弹出层
function CloseDiv(show_div,bg_div)
{
	document.getElementById(show_div).style.display='none';
	document.getElementById(bg_div).style.display='none';
	
};


function checkCoutomer(){
	
	if($('#ispay').is(":checked")){
		//$('#cstime').date_input();
		if($('#cpay').val().length==0){
			alert("应缴金额不能为空");
			return false;
		}else if($('#chostel').val().length==0){
			alert("签单时间不能为空");
			return false;
		}else{
			return true;
		}
		
	}else {
//		alert("否按钮");
		return true;
	}
	
}

function checkRadio(name,flag){
	if(name.checked){
		if(flag=="yes"){
			getsomeinfo("#ctype","#carea");
			$("#payli").show();
			$("#paymoney").show(); 
			$("#payhostel").show();
		}else{
			//alert("你点击了否");
			$("#paytime").hide();
			$("#payli").hide();
			$("#paymoney").hide(); 
			$("#payhostel").hide(); 
		}
	}
	
}

function getsomeinfo(ct,ca){
	var htmlContenttype = "";
	var htmlContentarea = "";
	$.ajax({
		type : 'POST',
		url : 'customer/getAllbustype.do',
		dataType :'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { "pageNum" : "" },
		success : function(data) {
			//alert(data);
			for(var obj in data){
				htmlContenttype += "<option value='"+data[obj].btid+"'>"+data[obj].btname+"</option>";
			}
		}
		
	});
	$(ct).html(htmlContenttype);
	$.ajax({
		type : 'POST',
		url : 'customer/getAllareaname.do',
		dataType :'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { "pageNum" : "" },
		success : function(data) {
			for(var obj in data){
				htmlContentarea += "<option value='"+data[obj].aid+"'>"+data[obj].aname+"</option>";
			}
		}
	});
	$(ca).html(htmlContentarea);
//	alert($(ca).html());
}

function typeandarea(){
	getsomeinfo("#ctype1","#carea1")
}
function checkCustomerStatus(part,pageNum){
	statuschange(2); 
	var url="customer/selectCustomerStatus.do";
	$.ajax({
		type : 'POST',
		url : url,
		dataType :'json',
		data : { "pageNum" : pageNum },
		success : function(data) {
			//alert(data);
			var htmlContent = "<tr><th>姓名</th><th>电话</th><th>qq</th><th>状态</th><th>操作</th></tr>";
			for(var obj in data){
				htmlContent += "<tr><td>" + data[obj].crname + "</td>";
				htmlContent += "<td>" +  data[obj].crtel + "</td>";
				htmlContent += "<td>" +  data[obj].cronline + "</td>";
				if(data[obj].cid==""){
					htmlContent += "<td>未签单</td>";
					htmlContent +="<td><a onclick='return delectsomeone()' href='customer/deleteOneCustomer.do?crid="+data[obj].crid+"'>删除</a>";
					htmlContent +="&nbsp;&nbsp;&nbsp;&nbsp;<a onclick='typeandarea()' href='customer/addcode.do?crid="+data[obj].crid+"&crname="+data[obj].crname+"'>签单</a></td></tr>";
				}else if(data[obj].cid!=""){
					htmlContent += "<td>已签单</td>";
					htmlContent +="<td><a href='customer/cheques.do?cid="+data[obj].cid+"'>核对收款</a>&nbsp;&nbsp;<a href='customer/rebate.do?cid="+data[obj].cid+"'>退款</a></td></tr>";
				}
			}
			$("#customerStatusTable").html(htmlContent);
		}
	});
}

function delectsomeone(){
	if(confirm("确定要删除这条记录吗？")){
		return true;
	}else{
		return false;
	}
}

function customerByName(){
	var cusName = $("#cusName").val();
	if(cusName!=""){
		$.ajax({
			type : 'POST',
			url : 'customer/customersName.do',
			dataType :'json',
			async:false,
			data : { "cusName" : cusName },
			success : function(data) {
				if(data!=null&&data.length!=0){
					var htmlContent = "<tr><th>姓名</th><th>电话</th><th>qq</th><th>是否签单</th><th>操作</th></tr>";
					for(var obj in data){
						htmlContent += "<tr><td>" + data[obj].crname + "</td>";
						htmlContent += "<td>" +  data[obj].crtel + "</td>";
						htmlContent += "<td>" +  data[obj].cronline + "</td>";
						if(data[obj].cid==""){
							htmlContent += "<td>未签单</td>";
							htmlContent +="<td><a onclick='return delectsomeone()' href='customer/deleteOneCustomer.do?crid="+data[obj].crid+"'>删除</a>";
							htmlContent +="&nbsp;&nbsp;&nbsp;&nbsp;<a onclick='typeandarea()' href='customer/addcode.do?crid="+data[obj].crid+"&crname="+data[obj].crname+"'>签单</a></td></tr>";
						}else if(data[obj].cid!=""){
							htmlContent += "<td>已签单</td>";
							htmlContent +="<td><a href='customer/cheques.do?cid="+data[obj].cid+"'>核对收款</a>&nbsp;&nbsp;<a href='customer/rebate.do?cid="+data[obj].cid+"'>退款</a>&nbsp;&nbsp;<a href='customer/addcode.do?crid="+data[obj].crid+"&crname="+data[obj].crname+"'>再次签单</a></td></tr>";
						}
					}
					//alert(htmlContent);
					$("#selectCusTable").html(htmlContent);
				}else{
					$("#selectCusTable").html("<tr><td><font color='red'>没有查到相关学生信息！</font></td></tr>");
				}
				
			}
		});
	}
	
}

function statuschange(status){
	$("#statusLog").val(status);
}
