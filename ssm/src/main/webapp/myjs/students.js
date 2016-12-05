$(function(){
	$("#errortext").hide();

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) { 
		 switch($(e.target).text()){
		 case '全部学员': break;
		 case '学员考核': stagescore(); break;
		 case '待结业学员': break;
		 case '已结业学员': break;
		 case '已退学学员': break;
		 case '查询结果': break;
		 }
	});
	
	$(".tcdPageCode:eq(0)").createPage({
	    pageCount:$("#stupages").val(),
	    current:1,
	    backFn:function(p){}
	});
	
	$(".tcdPageCode").createPage({
		pageCount:1,
		current:1,
		backFn:function(p){}
	});
	
	if($("#deletemsg").val()!=""){
		$("#errortext").show();
		$("#deletemsg").val("");
	}
	
	$("#stuName").bind('input propertychange', function() { 
		var sname = $('#stuName').val();
		$("#stuName").autocomplete({
	    	minLength: 1,//最少输入1个字符才执行
	        source: 'student/search.do?sname='+sname,//后台取数据
	    });
	});
  
	$("#allstu").click(function () {
	    if ($("#allstu").is(":checked")) { // 全选 
	        $("input[name='allstu_checkbox']").each(function () {
	        	$(this).prop("checked", true);
	        });
	    }else { // 全不选 
	        $("input[name='allstu_checkbox']").each(function () {
	            $(this).prop("checked", false);
	        });
	    }
	});

	
	$('.datetimepicker').datetimepicker({  
	    format: 'YYYY-MM-DD',  
	    locale: moment.locale('zh-cn')  
	});
	
	$("#crname").bind('change', function() { 
		$("#sphonetic").val($("#crname").val());
	});
	
});

function stuByName(){
	$('.nav-pills a:last').tab('show');
	var sname = $("#stuName").val();
	if(sname!="" && sname!=null){
		$.ajax({
			type:'POST',
			url:'student/searchbyname.do',
			dataType :'json',
			data : { "sname" : sname },
			success : function(data) {
				if(data.length>0&& data!=null){
					var htmlcontext = "<tr><th>学号</th><th>姓名</th><th>电话</th><th>班级名称</th><th>进班日期</th><th>开班日期</th><th>结业日期</th><th>状态</th><th>身份证号码</th><th>意向职业</th><th>期望薪水</th></tr>";
					for(var obj in data){
						htmlcontext += "<tr><td>"+data[obj].sid+"</td>"
						htmlcontext += "<td>"+data[obj].crname+"</td>"
						htmlcontext += "<td>"+data[obj].crtel+"</td>"
						htmlcontext += "<td>"+data[obj].crschool+"</td>"
						htmlcontext += "<td>"+data[obj].sdate+"</td>"
						htmlcontext += "<td>"+data[obj].cddate+"</td>"
						htmlcontext += "<td>"+data[obj].sremark+"</td>"
						htmlcontext += "<td>"+data[obj].cdmariage+"</td>"
						htmlcontext += "<td>"+data[obj].cdcaidid+"</td>"
						htmlcontext += "<td>"+data[obj].cdwork+"</td>"
						htmlcontext += "<td>"+data[obj].cdsalary+"</td><tr>"
					}
					$("#selectstudenttable").html(htmlcontext);
				}
			}
		})
	}
}


function pinyin(){
	if($("#sphonetic").val() == 0 || $("#sphonetic").val() == '0' ){
		alert("请先选择学员再新增");
		return false;
	}
	return true;
}

//删除学员信息
function delectstudentsinfo(){
	var cuscheckbox = $("input[name^='allstu']:checkbox:checked");
	if(cuscheckbox.length>0){
		if (!confirm("确定要让这"+cuscheckbox.length+"位学员退学吗?将不能恢复")) {
			return false;
		}
		var checkboxarray ="";
		cuscheckbox.each(function(){
			checkboxarray += $(this).val()+",";
		});
		window.location.href="student/batchdeletestu.do?str="+checkboxarray;
	}
}


//修改单个学员信息
function updatestuinfo(){
	var cuscheckbox = $("input[name^='allstu']:checkbox:checked");
	if(cuscheckbox.length>1){
		alert("只能修改一个客户信息，请修改选中信息！")
	}else{
		cuscheckbox.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
			var sid = $(this).val();
			window.location.href="student/editstudent.do?sid="+sid;
		}); 
	}
}

//学员考核
function stagescore(){
	$.ajax({
		type:'POST',
		url:'student/stagescore.do',
		data : { "type" : "" },
		dateType:'json',
		success: function(data){
			if(data!=null&& data.length>0){
				for(var obj in data){
				//alert(data[obj].status);
				}
			}
		}
	})
}
