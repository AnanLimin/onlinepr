$(document).ready(function() {
	 $('.datetimepicker').datetimepicker({  
	        format: 'YYYY-MM-DD',  
	        locale: moment.locale('zh-cn')  
	    });
	$("#accoadd").on('change', function() {
		if($("#accoadd").val()!=0){
			$.ajax({
				type : "POST",
				url : "student/getroomid.do",
				dataType :'json',
				data : { "belongid" : $("#accoadd").val() },
				success : function(data) {
					var htmlcontext = "";
					for(var obj in data){
						htmlcontext += "<option value='"+data[obj].spid+"'>"+data[obj].spname+"</option>"
					}
					$("#roomid").html(htmlcontext);
				}
			});
			
		}
		
	})
});