// JavaScript Document
$(document).ready(function(){
	//根据总页数判断，如果小于5页，则显示所有页数，如果大于5页，则显示5页。根据当前点击的页数生成
	var pageCount = $("#pagecount").val();//模拟后台总页数
	//生成分页按钮
	if(pageCount>5){
		page_icon(1,5,0);
	}else{
		page_icon(1,pageCount,0);
	}
	
	//点击分页按钮触发
	$("#pageGro li").live("click",function(){
		var pageNum = parseInt($(this).html());//获取当前页数
		if(pageCount > 5){
			alert(pageNum);
			pageGroup(pageNum,pageCount);
		}else{
			$(this).addClass("on");
			$(this).siblings("li").removeClass("on");
		}
		jump(pageNum);
	});
	
	//点击上一页触发
	$("#pageGro .pageUp").click(function(){
		var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
		if(pageCount > 5){
			
			pageUp(pageNum,pageCount);
		}else{
			var index = $("#pageGro ul li.on").index();//获取当前页
			if(index > 0){
				$("#pageGro li").removeClass("on");//清除所有选中
				$("#pageGro ul li").eq(index-1).addClass("on");//选中上一页
			}
		}
		if(pageNum-1>0){
			jump(pageNum-1);
		}
	});
	
	//点击下一页触发
	$("#pageGro .pageDown").click(function(){
		var pageNum = parseInt($("#pageGro li.on").html());
		if(pageCount > 5){
			pageDown(pageNum,pageCount);
		}else{
			var index = $("#pageGro ul li.on").index();//获取当前页
			if(index+1 < pageCount){
				$("#pageGro li").removeClass("on");//清除所有选中
				$("#pageGro ul li").eq(index+1).addClass("on");//选中上一页
			}
		}
		if(pageNum<pageCount){
			jump(pageNum+1);
		}
	});
});

//点击跳转页面
function pageGroup(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,0);
		break;
		case 2:
			page_icon(1,5,1);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,3);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,4);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,2);
		break;
	}
}

//根据当前选中页生成页面点击按钮
function page_icon(page,count,eq){
	var ul_html = "";
	for(var i=page; i<=count; i++){
		ul_html += "<li>"+i+"</li>";
	}
	$("#pageGro ul").html(ul_html);
	$("#pageGro ul li").eq(eq).addClass("on");
}

//上一页
function pageUp(pageNum,pageCount){
	switch(pageNum){
		case 1:
		break;
		case 2:
			page_icon(1,5,0);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,2);
		break;
		case pageCount:
			page_icon(pageCount-4,pageCount,3);
		break;
		default:
			page_icon(pageNum-2,pageNum+2,1);
		break;
	}
}

//下一页
function pageDown(pageNum,pageCount){
	switch(pageNum){
		case 1:
			page_icon(1,5,1);
		break;
		case 2:
			page_icon(1,5,2);
		break;
		case pageCount-1:
			page_icon(pageCount-4,pageCount,4);
		break;
		case pageCount:
		break;
		default:
			page_icon(pageNum-2,pageNum+2,3);
		break;
	}
}
//跳转到后台
function jump(pageNum){
	var url="empinfo/empage.do";
	$.ajax({
		type : 'POST',
		url : url,
		dataType :'json',
		data : { "pageNum" : pageNum},
		success : function(data) {
			var htmlContent = "<tr><th>员工姓名</th><th>入职时间</th><th>员工部门</th><th>员工职业</th><th>员工手机</th><th>员工邮箱</th><th>直属上级</th><th>操作</th></tr>";
			for(var obj in data){
				htmlContent += "<tr><td>" + data[obj].ename + "</td>";
				htmlContent += "<td>" +  data[obj].entrytime + "</td>";
				htmlContent += "<td>" +  data[obj].dname + "</td>";
				htmlContent += "<td>" +  data[obj].ejob + "</td>";
				htmlContent += "<td>" +  data[obj].etel + "</td>";
				htmlContent += "<td>" +  data[obj].email + "</td>";
				htmlContent += "<td>" +  data[obj].dremark + "</td>";
				htmlContent += "<td><a href='emp/selectByid.do?eid="+data[obj].eid +"'>修改 </a></td>";
			}
			$("#empInfo").html(htmlContent);

		}
			
		
	});
}
//跳转到后台
function jump_department(pageNum){
	var url="Department/pageselect.do";
	$.ajax({
		type : 'POST',
		url : url,
		dataType :'json',
		data : { "pageNum" : pageNum},
		
		success : function(data) {
			
			var htmlContent = "<tr><th>部门编号</th><th>部门名称</th><th>部门描述</th><th>部门备注</th><th>员工操作</th></tr>";
			for(var obj in data){
				htmlContent += "<tr><td>" + data[obj].did + "</td>";
				htmlContent += "<td>" +  data[obj].dName + "</td>";
				htmlContent += "<td>" +  data[obj].dAddress + "</td>";
				htmlContent += "<td>" +  data[obj].dRemark + "</td>";
			}
			
			$("#Departmentinfo").html(htmlContent);

		}
			
		
	});
}
