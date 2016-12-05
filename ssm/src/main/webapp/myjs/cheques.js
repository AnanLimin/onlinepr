function cheques(pageNum){
	statuschange(5);
	var url="code/selectCheques.do";
	$.ajax({
		type : 'POST',
		url : url,
		dataType :'json',
		data : { "pageNum" : pageNum },
		success : function(data) {
			if(data.length==0){
				$("#customerStatusTable").html("<font color='blue' size='14px'>没有已收款信息！</font>");
			}else{
				var htmlContent = "<tr><th>收款编号</th><th>收款时间</th><th>客户姓名</th><th>签单部门</th><th>业务类型</th><th>缴费</th><th>住宿费</th><th>区域</th><th>操作</th></tr>";
				for(var obj in data){
					var date = new Date(data[obj].cctime.time);
					htmlContent += "<tr><td>"+data[obj].cid+"</td>";
					htmlContent += "<td>"+formatDate(date)+"</td>";
					htmlContent += "<td>"+data[obj].cremark+"</td>";
					htmlContent += "<td>"+data[obj].cdepartment+"</td>";
					htmlContent += "<td>"+data[obj].ctype+"</td>";
					htmlContent += "<td>"+data[obj].cpay+"</td>";
					htmlContent += "<td>"+data[obj].chostel+"</td>";
					htmlContent += "<td>"+data[obj].carea+"</td>";
					htmlContent += "<td></td></tr>";
				}
				$("#customerStatusTable").html(htmlContent);
			}
		}
	});
	
	var codepage = $("#codepage").val();
	if(codepage>5){
		page_icon(1,5,0);
	}else{
		page_icon(1,codepage,0);
	}
}

function formatDate(date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
};