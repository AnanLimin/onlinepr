$(document).ready(function(){
	
	$("#etcid").bind('change', function() { 
		var str = $("#etcid option:selected").val();
		var cname = $("#etcid option:selected").text();
		if(str==0){$("#studentid").text("还没有选择班级");return;}
		cname = cname.substr(cname.indexOf("-")+1,cname.lastIndexOf("-")-cname.indexOf("-")-1);//取学号前面部分
		var str1 = str.substr(str.lastIndexOf("!")+1,str.length);//取当前班级已有人数
		str1++;//取当前学号后面部分
		if(str1<10){ str1 = "0"+str1; }
		cname = cname + str1;
		$("input[name='sid']").val(cname);
		$("input[name='etcid']").val(str.substr(0,str.indexOf("!")));
		$("#studentid").text(cname);
	});
	
	$('.datetimepicker').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')  
	});
});