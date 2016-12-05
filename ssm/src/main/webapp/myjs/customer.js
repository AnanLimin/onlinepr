 $(document).ready(function () {
	 $('.datetimepicker').datetimepicker({  
	        format: 'YYYY-MM-DD',  
	        locale: moment.locale('zh-cn')  
	    });
	 
	$('.nav-pills a:first').tab('show');
	$("#complete").click(function () {
	    if ($("#complete").is(":checked")) { // 全选 
	        $("input[name='complete_checkbox']").each(function () {
	        	$(this).prop("checked", true);
	        });
	    }else { // 取消全选 
	        $("input[name='complete_checkbox']").each(function () {
	            $(this).prop("checked", false);
	        });
	    }
	});
	
	 $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) { 
		 switch($(e.target).text()){
		 	case "全部客户": customertype("all");break;
		 	case "潜在客户": customertype(1);break;
		 	case "上门客户": customertype(2);break;
		 	case "签约客户": customertype(3);break;
		 	case "入学客户": customertype(4);break;
		 }
//		 alert($(e.relatedTarget).text()); 前一个激活标签的名称
	 });
	 
});
 
 function customertype(type){
	 $.ajax({
			type : 'POST',
			url : 'customer/customertype.do',
			dataType :'json',
			data : { "type" : type },
			success : function(data) {
				if(data.length>0){
					if(type==1){
						var htmlContent = "<thead><tr><th>姓名</th><th>性别</th><th>籍贯</th><th>民族</th><th>政治面貌</th><th>最高学历</th><th>毕业院校</th><th>专业</th><th>手机</th><th>操作</th></tr></thead><tbody>";
						var pages;
						for(var tmp in data){
							pages = data[tmp].pages;
							var list = data[tmp].list;
							for(var obj in list){
								htmlContent += "<tr><td>"+list[obj].crname+"</td>";
								htmlContent += "<td>"+list[obj].crsex+"</td>";
								htmlContent += "<td>"+list[obj].cdhometown+"</td>";
								htmlContent += "<td>"+list[obj].cdnation+"</td>";
								htmlContent += "<td>"+list[obj].cdlandscape+"</td>";
								htmlContent += "<td>"+list[obj].cdeducation+"</td>";
								htmlContent += "<td>"+list[obj].crschool+"</td>";
								htmlContent += "<td>"+list[obj].crmajor+"</td>";
								htmlContent += "<td>"+list[obj].crtel+"</td>";
								htmlContent += "<td><a href='customer/selectOnecustomer.do?crid="+list[obj].crid+"' >邀约上门</a></td></tr>";
							}
						}
						htmlContent += "</tbody>"
						$("#potentialtable").html(htmlContent);
						addpagegroup("potentialcustomer",type,pages);
						
					}else if(type==2){
						var htmlContent = "<thead><tr><th>姓名</th><th>性别</th><th>籍贯</th><th>民族</th><th>政治面貌</th><th>最高学历</th><th>毕业院校</th><th>专业</th><th>手机</th><th>操作</th></tr></thead><tbody>";
						var pages;
						for(var tmp in data){
							pages = data[tmp].pages;
							var list = data[tmp].list;
							for(var obj in list){
								htmlContent += "<tr><td>"+list[obj].crname+"</td>";
								htmlContent += "<td>"+list[obj].crsex+"</td>";
								htmlContent += "<td>"+list[obj].cdhometown+"</td>";
								htmlContent += "<td>"+list[obj].cdnation+"</td>";
								htmlContent += "<td>"+list[obj].cdlandscape+"</td>";
								htmlContent += "<td>"+list[obj].cdeducation+"</td>";
								htmlContent += "<td>"+list[obj].crschool+"</td>";
								htmlContent += "<td>"+list[obj].crmajor+"</td>";
								htmlContent += "<td>"+list[obj].crtel+"</td>";
								htmlContent += "<td><a href='customer/addcode.do?crid="+list[obj].crid+"'>客户签单</a></td></tr>";
							}
						}
						htmlContent += "</tbody>"
						$("#welcometable").html(htmlContent);
						addpagegroup("welcomecustomer",type,pages);
					}else if(type==3){
						var htmlContent = "<thead><tr><th>姓名</th><th>性别</th><th>电话</th><th>签单时间</th><th>学习方向</th><th>应缴金额</th><th>毕业院校</th><th>专业</th><th>操作</th></tr></thead><tbody>";
						var pages;
						for(var tmp in data){
							pages = data[tmp].pages;
							var list = data[tmp].list;
							for(var obj in list){
								htmlContent += "<tr><td>"+list[obj].crname+"</td>";
								htmlContent += "<td>"+list[obj].crsex+"</td>";
								htmlContent += "<td>"+list[obj].crtel+"</td>";
								htmlContent += "<td>"+list[obj].ctime+"</td>";
								htmlContent += "<td>"+list[obj].syname+"</td>";
								htmlContent += "<td>"+list[obj].creceivables+"</td>";
								htmlContent += "<td>"+list[obj].crschool+"</td>";
								htmlContent += "<td>"+list[obj].crmajor+"</td>";
								htmlContent += "<td><a href='customer/cheques.do?cid="+list[obj].cid+"&syname="+list[obj].syname+"'>收款</a>&nbsp;&nbsp;<a href='customer/rebate.do?cid="+list[obj].cid+"&syname="+list[obj].syname+"'>退款</a></td></tr>";
							}
						}
						htmlContent += "</tbody>"
						$("#paycodetable").html(htmlContent);
						addpagegroup("paycodecustomer",type,pages);
					}else if(type==4){
						var htmlContent = "<thead><tr><th>姓名</th><th>入学时间</th><th>籍贯</th><th>电话</th><th>qq</th><th>最高学历</th><th>毕业院校</th><th>班级编号</th><th>操作</th></tr></thead><tbody>";
						var pages;
						for(var tmp in data){
							pages = data[tmp].pages;
							var list = data[tmp].list;
							for(var obj in list){
								htmlContent += "<tr><td>"+list[obj].crname+"</td>";
								htmlContent += "<td>"+list[obj].sdate+"</td>";
								htmlContent += "<td>"+list[obj].cdhometown+"</td>";
								htmlContent += "<td>"+list[obj].crtel+"</td>";
								htmlContent += "<td>"+list[obj].sqq+"</td>";
								htmlContent += "<td>"+list[obj].cdeducation+"</td>";
								htmlContent += "<td>"+list[obj].crschool+"</td>";
								htmlContent += "<td><a href='student/classstudent.do?etcid="+list[obj].etcid+"'>"+list[obj].etcid+"</a></td>";
								htmlContent += "<td><a href='student/occupancy.do?crid="+list[obj].crid+"'>入住</a></td></tr>";
							}
						}
						htmlContent += "</tbody>"
						$("#cometable").html(htmlContent);
						addpagegroup("comecustomer",type,pages);
					}
				}
			}
			
	 });
 }
			
function getall(mainchecktab){
	switch(mainchecktab){
		case 1: changebox("#potential","potential_checkbox") ;break;
		case 2: changebox("#visit","visit_checkbox") ;break;
		case 3: changebox("#checkedAll","checkbox_name") ;break;
		case 4: changebox("#checkedAll","checkbox_name") ;break;
		default : changebox("#checkedAll","checkbox_name");
	}
}
				
function changebox(maincheck,arrayboxname){
	if ($(maincheck).is(":checked")) { // 全选 
        $("input[name='"+arrayboxname+"']").each(function () {
        	$(this).prop("checked", true);
        });
    }else { // 取消全选 
        $("input[name='"+arrayboxname+"']").each(function () {
            $(this).prop("checked", false);
        });
    }
}


//按名字查找客户
function customerByName(){
	$('.nav-pills a:last').tab('show');
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
					var htmlContent = "<thead><tr><th>&nbsp;&nbsp;<input type='checkbox' id='potential' onclick='getall(1)'></th><th>姓名</th><th>性别</th><th>籍贯</th><th>民族</th><th>政治面貌</th><th>最高学历</th><th>毕业院校</th><th>专业</th><th>手机</th><th>操作</th></tr></thead><tbody>";
					for(var obj in data){
						htmlContent += "<tr><td>&nbsp;&nbsp;<input type='checkbox' name='potential_checkbox'></td>";
						htmlContent += "<td>"+data[obj].crname+"</td>";
						htmlContent += "<td>"+data[obj].crsex+"</td>";
						htmlContent += "<td>"+data[obj].cdhometown+"</td>";
						htmlContent += "<td>"+data[obj].cdnation+"</td>";
						htmlContent += "<td>"+data[obj].cdlandscape+"</td>";
						htmlContent += "<td>"+data[obj].cdeducation+"</td>";
						htmlContent += "<td>"+data[obj].crschool+"</td>";
						htmlContent += "<td>"+data[obj].crmajor+"</td>";
						htmlContent += "<td>"+data[obj].crtel+"</td>";
						htmlContent += "<td>"+data[obj].csname+"</td></tr>";
					}
					htmlContent += "</tbody>"
					$("#othertable").html(htmlContent);
				}
			}
		});
	}
	
}


//修改客户信息
function updatacustomerinfo(){
	var cuscheckbox = $("input[name^='complete']:checkbox:checked");
	if(cuscheckbox.length>1){
		alert("只能修改一个客户信息，请修改选中信息！")
	}else{
		cuscheckbox.each(function(){  
			var crid = $(this).val();
			window.location.href="customer/updatecustrunonjsp.do?crid="+crid;
		}); 
	}
	
}

//删除客户信息
function delectcustomerinfo(){
	var cuscheckbox = $("input[name^='complete']:checkbox:checked");
	if(cuscheckbox.length>0){
		if (!confirm("确定要删除这"+cuscheckbox.length+"条客户信息吗")) {
			return false;
		}
		var checkboxarray ="";
		cuscheckbox.each(function(){ //由于复选框一般选中的是多个,所以可以循环输出 
			checkboxarray += $(this).val()+",";
		});
		window.location.href="customer/batchupdatecus.do?str="+checkboxarray;
	}
}


//将分页按钮组增加到页面中
function addpagegroup(divid,type,pages){
	
	$(".tcdPageCode:eq("+type+")").createPage({
	    pageCount:pages,
	    current:1,
	    backFn:function(p){}
	});
}

	 
