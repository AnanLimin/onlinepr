$(document).ready(function(){
	$(".tab_menu ul li").click(function(){
		 $(this).addClass("on").siblings().removeClass("on"); //切换选中的按钮高亮状态
		 var index=$(this).index(); //获取被按下按钮的索引值，需要注意index是从0开始的
		 $(".tab_box > div").eq(index).show().siblings().hide(); //在按钮选中时在下面显示相应的内容，同时隐藏不需要的框架内容
	 });
	
    $("#customerinfotable tr").dblclick(function() {    
    	var sid = $(this).children().eq(1).text(); 
    	dbinfo(sid);
    });
    
    $("#allsigninfotable tr").dblclick(function() {    
    	var sid = $(this).children().eq(0).text(); 
    	dbinfo(sid);
    });
    
	$("#nopayinfopagegroup").createPage({
		pageCount:$("#nopayinfopages").val(),
		current:1,
		backFn:function(p){
			$.ajax({
				type : 'POST',
				url : 'signed/nextnopayinfo.do',
				dataType :'json',
				async:false, //这是重要的一步，防止重复提交的
				data : { "pagenum" : p },
				success : function(data) {
					if(data!=null || data.length>0){
						var htmlcontext = "";
						for(var obj in data){
							var count  = data[obj].studyfee+data[obj].spacefee;
							htmlcontext +="<tr><td>"+data[obj].sid+"</td>";
							htmlcontext +="<td>"+data[obj].stime+"</td>";
							htmlcontext +="<td>"+data[obj].scustomername+"</td>";
							htmlcontext +="<td>￥"+(data[obj].studyfee).toLocaleString()+"</td>";
							htmlcontext +="<td>￥"+(data[obj].spacefee).toLocaleString()+"</td>";
							htmlcontext +="<td>￥"+(count).toLocaleString()+"</td>";
							htmlcontext +="<td>￥"+(data[obj].backfee).toLocaleString()+"</td>";
							htmlcontext +="<td>￥"+(data[obj].depositfee).toLocaleString()+"</td>";
							htmlcontext +="<td><a>"+data[obj].sale+"</a></td>";
							htmlcontext +="</tr>";
						}
					}
					$("#nopayinfotable").find("tbody").html(htmlcontext);
				}
			});
		}
	});

    
});


function dbinfo(sid){
	if(isNaN(sid)||sid==''){
		return false;
	}
	$.ajax({
		type : 'POST',
		url : 'signed/selectByPrimaryKey.do',
		dataType :'json',
		async:false,
		data : { "sid" : sid},
		success : function(data){
			for(var obj in data){
				$("input[name='sid']").val(data[obj].sid);
				$("input[name='stime']").val(data[obj].stime);   				
				$("input[name='scustomername']").val(data[obj].scustomername);
				$("input[name='scustomercardid']").val(data[obj].scustomercardid);
				$("input[name='scustomerbankcardid']").val(data[obj].scustomerbankcardid);
				$("input[name='scustomercollege']").val(data[obj].scustomercollege);
				$("input[name='scustomerschool']").val(data[obj].scustomerschool);
				$("input[name='sbusinesstype']").val(data[obj].sbusinesstype);
				$("input[name='scustomergrade']").val(data[obj].scustomergrade);
				$("input[name='speoplenum']").val(data[obj].speoplenum);
				$("input[name='scustomermajor']").val(data[obj].scustomermajor);   				
				$("input[name='sale']").val(data[obj].sale);
				$("input[name='dept']").val(data[obj].dept);
				$("input[name='sarea']").val(data[obj].sarea);
				$("input[name='sremark']").val(data[obj].sremark);
				$("input[name='studyfee']").val(data[obj].studyfee);
				$("input[name='spacefee']").val(data[obj].spacefee);
				$("input[name='backfee']").val(data[obj].backfee);
				$("input[name='stateid']").val(data[obj].stateid);
				$("input[name='depositfee']").val(data[obj].depositfee);
				$("input[name='bank']").val(data[obj].bank);
			}
		}
		
	});
	
	var divcss = {  width: '156px',  margin: '0', padding: '0', border: '0px solid' };
	$("#SigneDetailsInfo input").css(divcss);
	$("#SigneDetailsInfo textarea").css(divcss);
	$("#SigneDetailsInfo").modal('show');
}

function updatasigninfo(){
	var sid = $("#SigneDetailsInfo input[name='sid']").val();
	$.ajax({
		type : 'POST',
		url : 'signed/selectByPrimaryKey.do',
		dataType :'json',
		async:false,
		data : { "sid" : sid},
		success : function(data){
			for(var obj in data){
				$("input[name='sid']").val(data[obj].sid);
				$("input[name='stime']").val(data[obj].stime);   				
				$("input[name='scustomername']").val(data[obj].scustomername);
				$("input[name='scustomercardid']").val(data[obj].scustomercardid);
				$("input[name='scustomerbankcardid']").val(data[obj].scustomerbankcardid);
				$("input[name='scustomercollege']").val(data[obj].scustomercollege);
				$("input[name='scustomerschool']").val(data[obj].scustomerschool);
				$("input[name='sbusinesstype']").val(data[obj].sbusinesstype);
				$("input[name='scustomergrade']").val(data[obj].scustomergrade);
				$("input[name='speoplenum']").val(data[obj].speoplenum);
				$("input[name='scustomermajor']").val(data[obj].scustomermajor);   				
				$("input[name='sale']").val(data[obj].sale);
				$("input[name='dept']").val(data[obj].dept);
				$("input[name='sarea']").val(data[obj].sarea);
				$("input[name='sremark']").val(data[obj].sremark);
				$("input[name='studyfee']").val(data[obj].studyfee);
				$("input[name='spacefee']").val(data[obj].spacefee);
				$("input[name='backfee']").val(data[obj].backfee);
				$("input[name='stateid']").val(data[obj].stateid);
				$("input[name='depositfee']").val(data[obj].depositfee);
				$("input[name='bank']").val(data[obj].bank);
			}
		}
		
	});
	$("#updataSigneInfo").modal('show');	
}

//导出所有数据
function outalldata(){
	if(!confirm("确定要导出所有签单信息吗？这里面包含了已经删除或者已经完成的签单")){
		return false;
	}
}
