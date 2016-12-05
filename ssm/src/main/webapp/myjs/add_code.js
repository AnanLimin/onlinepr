$(document).ready(function(){
	$('.datetimepicker').datetimepicker({  
        format: 'YYYY-MM-DD',  
        locale: moment.locale('zh-cn')  
    });
	
	var studytime=0,tuition=0,spname=0;
	$("#cremark").change(function(){
		var studay = $("#cremark").val();
		tuition = studay.substr(studay.lastIndexOf("!")+1,studay.lastIndexOf("#")-2);
		studytime = studay.substr(studay.lastIndexOf("#")+1,studay.length) 
		$("#tuition").val("!"+tuition);
		$("#xuefei").html(tuition);
		var tolot = spname*studytime+parseFloat(tuition); 
		$("#creceivables").val(tolot);
	});
	$("#spname").change(function(){
		spname = $("#spname").val();
		$("#zhusufei").html(spname*studytime);
		$("#accommodation").val("#"+spname*studytime);
		var tolot = spname*studytime+parseFloat(tuition); 
		$("#creceivables").val(tolot);
	});
	
	
});