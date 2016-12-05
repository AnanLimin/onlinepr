/**
 * @date 2016/10/18
 * @author 李敏
 * 财务操作的内容(收款,返款,退款,查看签单详情)
 */
$(document).ready(function(){
	//生成分页按钮，并且能够查看分页后信息
	updatapage("signed/signstatus.do");
})

function updatapage(url){
	//status 为 1时代表未收款，为2时代表已收款，为3时代表待返款，为4时代表待退款
	$("#shoukuan").createPage({
	    pageCount:$("#pagecount").val(),
	    current:1,
	    backFn:function(p){
	    	$.ajax({
	    		type : 'POST',
	    		url : url,
	    		dataType :'json',
	    		async:false, //这是重要的一步，防止重复提交的
	    		data : { "pagenum" : p ,"status" : 1},
	    		success : function(data) {
	    	        var htmlcontext='';
	    	        var pagecount='';
	    			for(var tmp in data ){
	    				 var list = data[tmp].list;
	    	        	 pagecount = data[tmp].pages;
	    	        	 if(pagecount==0){
	    	        		 alert("没有相关客户信息");
	    	        		 return false;
	    	        	 }
	    	        	 for(var obj in list){
	    	        		 var count = list[obj].studyfee+list[obj].spacefee+list[obj].backfee+list[obj].depositfee;
	        					var condition=0;
	        					if (list[obj].condition!=""){
	        						condition = list[obj].condition;
	        						htmlcontext +="<tr style='background-color:#ffa042;'>";
	        					}else{
	        						htmlcontext +="<tr>";
	        					}
	        					htmlcontext +="<td>"+list[obj].sid+"</td>";
	        					htmlcontext +="<td>"+list[obj].scustomername+"</td>";
	        					htmlcontext +="<td>￥"+(list[obj].studyfee).toLocaleString()+"</td>";
	        					htmlcontext +="<td>￥"+(list[obj].spacefee).toLocaleString()+"</td>";
	        					htmlcontext +="<td>￥"+(list[obj].backfee).toLocaleString()+"</td>";
	        					htmlcontext +="<td>￥"+(list[obj].depositfee).toLocaleString()+"</td>";
	        					htmlcontext +="<td>￥"+(count).toLocaleString()+"</td>";
	        					htmlcontext +="<td>￥"+(condition).toLocaleString()+"</td>";
	        					htmlcontext +="<td>￥"+(count-condition).toLocaleString()+"</td>";
	        					htmlcontext +="<td>"+list[obj].sale+"</td>";
	        					htmlcontext +="<td>"+list[obj].stime+"</td>";
	        					htmlcontext +="<td><a style='cursor:pointer' onclick='showModel("+list[obj].sid+")'>收款</a></td></tr>";
	    	        	 }
	    			}
	    			$("#signstautusinfotable").find("tbody").html(htmlcontext);
	    		}
	    	});
	    }
	});
}

//弹出收款对话框
function showModel(sid){
		$("input[name='time']").val(nowDate());
		$("input[name='handler']").val(username());
		$.ajax({
			type : 'POST',
    		url : 'signed/onesign.do',
    		dataType :'json',
    		async:false, //这是重要的一步，防止重复提交的
    		data : { "sid" : sid},
    		success : function(data){
    			$("#incomeinfo span:eq(2)").text(sid);
    			$("input[name='sid']").val(sid);
    			for(var obj in data){
    				var str = data[obj].studyfee+data[obj].spacefee+data[obj].backfee+data[obj].depositfee;
    				if(data[obj].condition>=str){
    					alert("全部款项已经收完，不能继续收款");
    					return false;
    				}
    				$("#incomeinfo span:eq(3)").text(data[obj].scustomername);
    				$("#incomeinfo span:eq(4)").text(data[obj].sale);
    				var s= " = "+data[obj].studyfee+"+"+data[obj].spacefee+"+"+data[obj].backfee+"+"+data[obj].depositfee;
    				$("#incomeinfo span:eq(5)").text(s);
    				$("#incomeinfo label:eq(0)").text(str);
    				$("#incomeinfo span:eq(6)").text(data[obj].condition);
    				$("#incomeinfo span:eq(7)").text(data[obj].backfee);
    			}
    			$("#incomeinfo").modal('show');
    		}
		});
		
};

//加入收款记录时验证
function checkdata(){
	$("input[name='stateid']").val("");
	if(!confirm("确定收到这一款项吗")){
		return false;
	}else{
		var studyfee = $("input[name='studyfee']").val()==""?0:parseInt($("input[name='studyfee']").val());
		var spacefee = $("input[name='spacefee']").val()==""?0:parseInt($("input[name='spacefee']").val());
		var backfee = $("input[name='backfee']").val()==""?0:parseInt($("input[name='backfee']").val());
		var depositfee = $("input[name='depositfee']").val()==""?0:parseInt($("input[name='depositfee']").val());
		
		var shouldpaysum = parseInt($("#incomeinfo label:eq(0)").text());
		var paid = parseInt($("#incomeinfo span:eq(6)").text());
		var aa = $("#incomeinfo span:eq(5)").text()
		aa = aa.substr(aa.indexOf("=")+1,aa.length);
		var collect = aa.split("+");
		
		if(studyfee>collect[0]){
			alert("学费大于应交学费，请重填！");
			return false;
		}
		if(spacefee>collect[1]){
			alert("住宿费大于应交费用，请重填");
			return false;
		}
		if(backfee>collect[2]){
			alert("补贴大于应交费用，请重填");
			return false;
		}
		if(depositfee>collect[3]){
			alert("定金大于应交费用，请重填");
			return false;
		}
		if(paid+studyfee+spacefee+backfee+depositfee>shouldpaysum){
			alert("收多款项,请返回重填");
			return false;
		}else if(paid+studyfee+spacefee+backfee+depositfee==shouldpaysum){
			alert("收款成功");
			var backfee = $("#incomeinfo span:eq(7)").text();
			if(backfee!="0"){
				$("input[name='stateid']").val(3);
			}else{
				$("input[name='stateid']").val(2);
			}
		}else if(paid+studyfee+spacefee+backfee+depositfee+shouldpaysum<=0){
			alert("数据不正确，请重填");
			return false;
		}else{
			if(!confirm("没有收到完整款项，确定吗？")){
				return false;
			}
		}
	}
}

//按名字查找未完成收款的信息（模糊查询）
function selectcustomerbyname(){
	$.ajax({
		type : 'POST',
		url : 'signed/selectcusbyname.do',
		dataType :'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { "cusname" : $("#cusname").val(),"pagenum":"1"},
		success : function(data){
			var pagecount;
	        var htmlcontext='';
			for(var tmp in data ){
				 var list = data[tmp].list;
	        	 pagecount = data[tmp].pages;
	        	 if(pagecount==0){
	        		 alert("没有相关客户信息");
	        		 return false;
	        	 }
	        	 for(var obj in list){
	        		 var count = list[obj].studyfee+list[obj].spacefee+list[obj].backfee+list[obj].depositfee;
    					var condition=0;
    					if (list[obj].condition!=""){
    						condition = list[obj].condition;
    						htmlcontext +="<tr style='background-color:#ffa042;'>";
    					}else{
    						htmlcontext +="<tr>";
    					}
    					htmlcontext +="<td>"+list[obj].sid+"</td>";
    					htmlcontext +="<td>"+list[obj].scustomername+"</td>";
    					htmlcontext +="<td>￥"+(list[obj].studyfee).toLocaleString()+"</td>";
    					htmlcontext +="<td>￥"+(list[obj].spacefee).toLocaleString()+"</td>";
    					htmlcontext +="<td>￥"+(list[obj].backfee).toLocaleString()+"</td>";
    					htmlcontext +="<td>￥"+(list[obj].depositfee).toLocaleString()+"</td>";
    					htmlcontext +="<td>￥"+(count).toLocaleString()+"</td>";
    					htmlcontext +="<td>￥"+(condition).toLocaleString()+"</td>";
    					htmlcontext +="<td>￥"+(count-condition).toLocaleString()+"</td>";
    					htmlcontext +="<td>"+list[obj].sale+"</td>";
    					htmlcontext +="<td>"+list[obj].stime+"</td>";
    					htmlcontext +="<td><a style='cursor:pointer' onclick='showModel("+list[obj].sid+")'>收款</a></td></tr>";
	        	 }
			}
			$("#signstautusinfotable").find("tbody").html(htmlcontext);
			$("#shoukuan").html("");
			$("#pagecount").val(pagecount);
			updatapage("signed/selectcusbyname.do");
		}
	});
	
	
}


//获取当前系统时间的（规定格式）
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

//为数字添加千位分隔符
function fmoney(s, n)
{
   n = n > 0 && n <= 20 ? n : 2;
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
   var l = s.split(".")[0].split("").reverse(),
   r = s.split(".")[1];
   t = "";
   for(i = 0; i < l.length; i ++ )
   {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
   }
   return t.split("").reverse().join("") + "." + r;
}
