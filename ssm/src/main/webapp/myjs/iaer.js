$(document).ready(function(){
	
	$("#iaerpagegroup").html("<div id='iaerpages' class='tcdPageCode sign col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3'> </div>");
	createpage('signed/nextiaer.do');
	getnowyear();
	
	$("#iaermonth").change(function(){
		var y = $("#iaeryear").val();
		var m = $("#iaermonth").val();
		var date = new Date(y,m,0);
		var days = date.getDate();
		m = m<10? "0"+m :m;
		var start = y+"-"+m+"-01";
		var end = y+"-"+m+"-"+days;
		$("input[name='stime']").val(start);
		$("input[name='sremark']").val(end);
	});
	
	$("#iaeryear>option").click(function(){
		$("input[name='stime']").val( $("#iaeryear").val()+"-01-01");
		$("input[name='sremark']").val($("#iaeryear").val()+"-12-31");
	});
	
	$("#iaermonth>option").click(function(){
		var m = $("#iaermonth").val();
		var y = $("#iaeryear").val();
		var d=0 ;
		var htmlcontext="" ;
		switch (m) {
			case '1': d=31;break;
			case '2': if( (y % 4 == 0 &&  y % 100 != 0)|| y % 400 == 0){
						d=29;
					}else{
						d=28;
					};break;
			case '3': d=31;break;
			case '4': d=30;break;
			case '5': d=31;break;
			case '6': d=30;break;
			case '7': d=31;break;
			case '8': d=31;break;
			case '9': d=30;break;
			case '10': d=31;break;
			case '11': d=30;break;
			case '12': d=31;break;
		}
		for(var i=1;i<=d;i++){
			htmlcontext += "<option value='"+i+"'>"+i+"</option>";
		}
		$("#iaerday").html(htmlcontext);
	});
	
	
});


function createpage(url){
	$("#iaerpages").createPage({
	    pageCount:$("#pagecount").val(),
	    current:1,
	    backFn:function(p){
	    	$.ajax({
	    		type : 'POST',
	    		url : url,
	    		dataType :'json',
	    		async:false, //这是重要的一步，防止重复提交的
	    		data : { "pagenum" : p,"sale":$("#sale").val(),"customername":$("#customername").val() },
	    		success : function(data) {
	    		 var htmlcontext= "";
	   			 var pagecount= "";
	   			 var i=0;
	   			 var o=0;
	   			 for(var tmp in data){
	   	        	   var list = data[tmp].list;
	   	        	   pagecount = data[tmp].pages;
	   	        	   if(pagecount==0){
	   	        		   alert("没有相关数据!");
	   	        		   return false;
	   	        	   }
	   	        	   for(var obj in list){
	   	        		   if(list[obj].type == "收入"){
	   	        			   htmlcontext += "<tr class='success'><td>"+list[obj].time+"</td>"
	   	            		   htmlcontext += "<td>"+list[obj].scustomername+"</td>"
	   	            		   htmlcontext += "<td>"+list[obj].remark+"</td>"
	   	        			   htmlcontext += "<td>￥"+(list[obj].amount).toLocaleString()+"</td><td></td>"
	   	        			   htmlcontext += "<td>"+list[obj].scustomerschool+"</td>"
	   	            		   htmlcontext += "<td>"+list[obj].sale+"</td>"
	   	            		   htmlcontext += "<td>"+list[obj].handler+"</td></tr>"
	   	            		   i+=list[obj].amount;
	   	        		   }else if(list[obj].type == "支出"){
	   	        			   htmlcontext += "<tr class='danger'><td>"+list[obj].time+"</td>"
	   	            		   htmlcontext += "<td>"+list[obj].scustomername+"</td>"
	   	            		   htmlcontext += "<td>"+list[obj].remark+"</td>"
	   	        			   htmlcontext += "<td></td><td>￥"+(list[obj].amount).toLocaleString()+"</td>"
	   	        			   htmlcontext += "<td>"+list[obj].scustomerschool+"</td>"
	   	            		   htmlcontext += "<td>"+list[obj].sale+"</td>"
	   	            		   htmlcontext += "<td>"+list[obj].handler+"</td></tr>"
	   	            		   o+=list[obj].amount;
	   	        		   }
	   	        	   }
	   	           }
				$("#inamount").html("￥"+i.toLocaleString());
				$("#outamount").html("￥"+o.toLocaleString());
    			$("#iaerinfotable").find("tbody").html(htmlcontext);
				}
	    			
	    	});
	    }
	});
}

function getnowyear(){
	var now = new Date();
	var year = now.getFullYear();
	var htmlcontext='';
	for(var i= year;i>year-5;i--){
		htmlcontext +="<option value='"+i+"'>"+i+"</option>";
	}
	$("#iaeryear").html(htmlcontext);
}


function checkiaerbycondition(){
	$("input[name='pagenum']").val(1);
	
	if(!$("#onlymonth").is(':checked')){
		var m=$("#iaermonth").val();
		var d=$("#iaerday").val();
		m = m<10? "0"+m :m;
		d = d<10? "0"+d :d;
		var start = $("#iaeryear").val()+"-"+m+"-"+d;
		$("input[name='stime']").val(start);
		$("input[name='sremark']").val(start);
	}
	$.ajax({
		type:'POST',
		url:'signed/iaerbycondition.do',
		dataType:'json',
		data:$("#iaerbycondition").serialize(),
		async: false,
        success: function(data) {
           var pagecount;
           var htmlcontext='';
           var i = 0;
		   var o = 0;
           for(var tmp in data){
        	   var list = data[tmp].list;
        	   pagecount = data[tmp].pages;
        	   for(var obj in list){
        		   if(list[obj].type == "收入"){
        			   htmlcontext += "<tr class='success'><td>"+list[obj].time+"</td>"
            		   htmlcontext += "<td>"+list[obj].scustomername+"</td>"
            		   htmlcontext += "<td>"+list[obj].remark+"</td>"
        			   htmlcontext += "<td>￥"+(list[obj].amount).toLocaleString()+"</td><td></td>"
        			   htmlcontext += "<td>"+list[obj].scustomerschool+"</td>"
            		   htmlcontext += "<td>"+list[obj].sale+"</td>"
            		   htmlcontext += "<td>"+list[obj].handler+"</td></tr>"
            		   i+=list[obj].amount;
        		   }else if(list[obj].type == "支出"){
        			   htmlcontext += "<tr class='danger'><td>"+list[obj].time+"</td>"
            		   htmlcontext += "<td>"+list[obj].scustomername+"</td>"
            		   htmlcontext += "<td>"+list[obj].remark+"</td>"
        			   htmlcontext += "<td></td><td>￥"+(list[obj].amount).toLocaleString()+"</td>"
        			   htmlcontext += "<td>"+list[obj].scustomerschool+"</td>"
            		   htmlcontext += "<td>"+list[obj].sale+"</td>"
            		   htmlcontext += "<td>"+list[obj].handler+"</td></tr>"
            		   o+=list[obj].amount;
        		   }
        	   }
           }
           $("#inamount").html("￥"+i.toLocaleString());
			$("#outamount").html("￥"+o.toLocaleString());
           $("#iaerinfotable").find("tbody").html(htmlcontext);
           monthmoney();
           condition(pagecount);
        }
		
	});
}

function monthmoney(){
	$.ajax({
		type : 'POST',
		url : 'signed/iaermoneybymonth.do',
		dataType :'json',
		async:false, //这是重要的一步，防止重复提交的
		data : $("#iaerbycondition").serialize(),
		success : function(data) {
			var i =0;
			var o =0;
			for(var obj in data){
				if(data[obj].type=='收入'){
					i=data[obj].amount;
				}else if(data[obj].type=='支出'){
					o=data[obj].amount;
				}
			}
			var start = $("input[name='stime']").val();
			var end = $("input[name='sremark']").val();
			start = start.substr(start.indexOf("-")+1,start.lastIndexOf("-")-start.indexOf("-")-1);
			end = end.substr(end.indexOf("-")+1,end.lastIndexOf("-")-end.indexOf("-")-1);
			if($("#onlymonth").is(':checked')){
				if(end-start==0){
					$("#money label:eq(0)").html($("#iaermonth").val()+"月收入总计：");
					$("#money label:eq(1)").html($("#iaermonth").val()+"月支出总计");
				}else if(end-start>0){
					$("#money label:eq(0)").html(start+"-"+end+"月收入总计：");
					$("#money label:eq(1)").html(start+"-"+end+"月支出总计");
				}
			}else{
				$("#money label:eq(0)").html($("#iaermonth").val()+"月"+$("#iaerday").val()+"日收入总计：");
				$("#money label:eq(1)").html($("#iaermonth").val()+"月"+$("#iaerday").val()+"日支出总计：");
			}
			
			
			$("#money span:eq(0)").html("￥"+i.toLocaleString());
			$("#money span:eq(1)").html("￥"+o.toLocaleString());
		}
	});
}

function condition(pagecount){
	$("#iaerpagegroup").html("");
	$("#iaerpagegroup").html("<div id='iaerpages' class='tcdPageCode sign col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3'> </div>");
	$("#iaerpages").createPage({
	    pageCount:pagecount,
	    current:1,
	    backFn:function(p){
	    	$("input[name='pagenum']").val(p);
	    	$.ajax({
	    		type : 'POST',
	    		url : 'signed/iaerbycondition.do',
	    		dataType :'json',
	    		async:false, //这是重要的一步，防止重复提交的
	    		data : $("#iaerbycondition").serialize(),
	    		success : function(data) {
	    			if(data!=null || data.length>0){
	    				var htmlcontext = "";
	    				var i = 0;
	    				var o = 0;
	    				for(var tmp in data){
    		        	   var list = data[tmp].list;
    		        	   for(var obj in list){
    		        		   if(list[obj].type == "收入"){
    		        			   htmlcontext += "<tr class='success'><td>"+list[obj].time+"</td>"
    		            		   htmlcontext += "<td>"+list[obj].scustomername+"</td>"
    		            		   htmlcontext += "<td>"+list[obj].remark+"</td>"
    		        			   htmlcontext += "<td>￥"+(list[obj].amount).toLocaleString()+"</td><td></td>"
    		        			   htmlcontext += "<td>"+list[obj].scustomerschool+"</td>"
    		            		   htmlcontext += "<td>"+list[obj].sale+"</td>"
    		            		   htmlcontext += "<td>"+list[obj].handler+"</td></tr>"
    		            		   i+=list[obj].amount;
    		        		   }else if(list[obj].type == "支出"){
    		        			   htmlcontext += "<tr class='danger'><td>"+list[obj].time+"</td>"
    		            		   htmlcontext += "<td>"+list[obj].scustomername+"</td>"
    		            		   htmlcontext += "<td>"+list[obj].remark+"</td>"
    		        			   htmlcontext += "<td></td><td>￥"+(list[obj].amount).toLocaleString()+"</td>"
    		        			   htmlcontext += "<td>"+list[obj].scustomerschool+"</td>"
    		            		   htmlcontext += "<td>"+list[obj].sale+"</td>"
    		            		   htmlcontext += "<td>"+list[obj].handler+"</td></tr>"
    		            		   o+=list[obj].amount;
    		        		   }
    		        	   }
	    		        }
	    				$("#inamount").html("￥"+i.toLocaleString());
	    				$("#outamount").html("￥"+o.toLocaleString());
	    				$("#iaerinfotable").find("tbody").html(htmlcontext);
					}
	    		}
	    	});
	    }
	});
}

//根据姓名搜索收支记录
function findiaer(){
	$.ajax({
		type : 'POST',
		url : 'signed/selectiaerbyname.do',
		dataType :'json',
		async:false, //这是重要的一步，防止重复提交的
		data : {
			"pagenum":1,"sale":$("#sale").val(),"customername":$("#customername").val()
		},
		success : function(data) {
			 var htmlcontext= "";
			 var pagecount= "";
			 var i=0;
			 var o=0;
			 for(var tmp in data){
	        	   var list = data[tmp].list;
	        	   pagecount = data[tmp].pages;
	        	   if(pagecount==0){
	        		   alert("没有相关数据!");
	        		   return false;
	        	   }
	        	   for(var obj in list){
	        		   if(list[obj].type == "收入"){
	        			   htmlcontext += "<tr class='success'><td>"+list[obj].time+"</td>"
	            		   htmlcontext += "<td>"+list[obj].scustomername+"</td>"
	            		   htmlcontext += "<td>"+list[obj].remark+"</td>"
	        			   htmlcontext += "<td>￥"+(list[obj].amount).toLocaleString()+"</td><td></td>"
	        			   htmlcontext += "<td>"+list[obj].scustomerschool+"</td>"
	            		   htmlcontext += "<td>"+list[obj].sale+"</td>"
	            		   htmlcontext += "<td>"+list[obj].handler+"</td></tr>"
	            		   i+=list[obj].amount;
	        		   }else if(list[obj].type == "支出"){
	        			   htmlcontext += "<tr class='danger'><td>"+list[obj].time+"</td>"
	            		   htmlcontext += "<td>"+list[obj].scustomername+"</td>"
	            		   htmlcontext += "<td>"+list[obj].remark+"</td>"
	        			   htmlcontext += "<td></td><td>￥"+(list[obj].amount).toLocaleString()+"</td>"
	        			   htmlcontext += "<td>"+list[obj].scustomerschool+"</td>"
	            		   htmlcontext += "<td>"+list[obj].sale+"</td>"
	            		   htmlcontext += "<td>"+list[obj].handler+"</td></tr>"
	            		   o+=list[obj].amount;
	        		   }
	        	   }
	           }
			 $("#inamount").html("￥"+i.toLocaleString());
			 $("#outamount").html("￥"+o.toLocaleString());
			 $("#iaerinfotable").find("tbody").html(htmlcontext);
			 $("#iaerpagegroup").html("");
			 $("#pagecount").val(pagecount);
			 $("#iaerpagegroup").html("<div id='iaerpages' class='tcdPageCode sign col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3'> </div>");
			 createpage('signed/selectiaerbyname.do');
			
		}
	});
}