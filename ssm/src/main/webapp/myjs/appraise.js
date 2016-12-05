$(document).ready(function(){
	//日期选择控件
	$('.datetimepicker').datetimepicker({  
        format: 'YYYY-MM-DD',  
        locale: moment.locale('zh-cn')  
    });
	
});

function checkinAppraise(){
	if($(".datetimepicker input").val()==""||$(".datetimepicker input").val()==null){
		alert("请选择考核日期");
		$(".datetimepicker").focus();
		return false;
	}
	var radiochecked = $("input[type='radio']:checked");
	if(radiochecked.length>0){
		var jsondata="";
		radiochecked.each(function(){
			jsondata += $(this).parent().parent().find('td').html()+":";
			jsondata += $(this).val()+",";
		});
		jsondata = jsondata.substring(0, jsondata.length-1);
		$.ajax({
			type:'POST',
			url:'student/checkinappraise.do',
			data:{
					"jsondata":jsondata,
					"stage":$("select").val(),
					"appraisedate":$("input[name='appraisedate']").val(),
					"etcid":$("input[name='etcid']").val()},
			dataType:'text',
			success:function(data){
				if(data!=""){
					if(confirm("该班级此阶段的成绩已经录入，点击[确定]查看或修改成绩，点击[取消]更改阶段再录入")){
						window.location.href="student/selectstuscore.do?etcid="+$("input[name='etcid']").val();
					}
					return false;
				}
				window.location.href="student/selectstuscore.do?etcid="+$("input[name='etcid']").val();
			}
		})

	}
	
	
}