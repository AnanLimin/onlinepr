$(document).ready(function(){
	//根据总页数判断，如果小于5页，则显示所有页数，如果大于5页，则显示5页。根据当前点击的页数生成
	var pageCount = $("#pagecount").val();//模拟后台总页
//	alert(allCostomerInfo);
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
			pageGroup(pageNum,pageCount);
		}else{
			$(this).addClass("on");
			$(this).siblings("li").removeClass("on");
		}
//		alert(pageNum);
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
		var pageNum = parseInt($("#pageGro li.on").html());//获取当前页
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
function jump(pageNum,data){
	var status = $("#statusLog").val();
	var part = $("#part").val();
	if(status==="2"){
		checkCustomerStatus(part,pageNum);
	}else if(status==="1"){
		var url="customer/managerement.do";
		$.ajax({
			type : 'POST',
			url : url,
			dataType :'json',
			data : { "pageNum" : pageNum },
			success : function(data) {
				if(data!=null){
					var htmlContent = "<tr><th>姓名</th><th>性别</th><th>电话</th><th>qq</th><th>学校</th><th>专业</th><th>年级</th><th>操作</th></tr>";
					for(var obj in data){
						htmlContent += "<tr><td>" + data[obj].crname + "</td>";
						htmlContent += "<td>" +  data[obj].crsex + "</td>";
						htmlContent += "<td>" +  data[obj].crtel + "</td>";
						htmlContent += "<td>" +  data[obj].cronline + "</td>";
						htmlContent += "<td>" +  data[obj].crschool + "</td>";
						htmlContent += "<td>" +  data[obj].crmajor + "</td>";
						htmlContent += "<td>" +  data[obj].crgrade + "</td>";
						htmlContent += "<td><a href='customer/selectOnecustomer.do?crid=" +  data[obj].crid + "'>修改</a></td></tr>";
					}
					$("#customerInfo").html(htmlContent);
				}else{
					window.location.href="/login.jsp";
				}
			}
			
		});
	}
	
	
	
}