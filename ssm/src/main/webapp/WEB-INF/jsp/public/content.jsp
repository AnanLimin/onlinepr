<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
<head>
<link href="<%=basePath %>css/datePicker.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="<%=basePath %>laydate/laydate.js"></script>
</head>
<body>
	<div class="container-fluid">
		<div class="row">
			<jsp:include page="navleft.jsp"></jsp:include>
			<%-- <div class="col-sm-3 col-md-2 sidebar">
				<ul class="nav nav-sidebar">
					<li class="active"><a href="<%=basePath %>user/login.do">首页<span class="sr-only">(current)</span></a></li>
					<li><a href="<%=basePath %>signed/signedinfo.do">销售管理</a></li>
					<li><a href="<%=basePath %>signed/firstincomepay.do">财务管理</a></li>
					<li><a href="<%=basePath %>signed/ourmanagment.do">待办工作</a></li>
					<li><a href="<%=basePath %>signed/dataStatistics.do">数据统计</a></li>
					<li><a href="<%=basePath %>signed/signedinfo.do">培训管理</a></li>
					<li><a href="<%=basePath %>signed/signedinfo.do">就业管理</a></li>
					<li><a href="<%=basePath %>signed/signedinfo.do">考勤管理</a></li>
					<li><a href="<%=basePath %>signed/signedinfo.do">基本信息</a></li>
					<li><a href="<%=basePath %>signed/signedinfo.do">签单客户</a></li>
					<li><a href="<%=basePath %>signed/firstincomepay.do">收款</a></li>
					<li><a href="<%=basePath %>signed/status.do?status=3&pagenum=1">返款</a></li>
					<li><a href="<%=basePath %>signed/status.do?status=4&pagenum=1">退款</a></li>
<!-- 					<li><a href="<%=basePath %>customer/manager.do">客户管理</a></li> -->
<!-- 					<li><a href="<%=basePath %>etcclass/management.do">班级管理</a></li> -->
<!-- 					<li><a href="<%=basePath %>student/management.do">学员管理</a></li> -->
<!-- 					<li><a href="<%=basePath %>student/stayinfo.do">宿舍管理</a></li> -->    
				</ul>
				<ul class="nav nav-sidebar">
<!-- 					<li><a href="<%=basePath %>paycode/reports.do">数据统计</a></li> -->
<!-- 					<li><a href="<%=basePath %>empinfo/showMe.do"><i class="manager"></i>个人中心</a></li> -->
<!-- 					<li><a href="<%=basePath %>admin/manager.do"><i class="manager"></i>管理员</a></li> -->
<!-- 					<li><a href="">中文</a></li> -->
				</ul>
			</div> --%>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<!-- <div class="container" style="height:20px;"></div> -->
				<div class="container" style="height:20px;">
					<div class="row">
						<div class="col-md-1">
							<select id="selectdate">
								<option value="thismonth">本月 </option>
								<option value="lastmonth">上月 </option>
								<option value="today">今日 </option>
								<option value="thisweek">本周</option>
								<option value="thisseason">本季</option>
								<option value="thisyear">今年</option>
							</select>
							<!-- <input type="text" id="strattime" class="date_picker" placeholder="开始时间"/>
							<input type="text" id="endtime" class="date_picker" placeholder="结束时间"/> -->
						</div>
						<div class="col-md-5" >
	   						<input placeholder="开始日期" class="laydate-icon" onclick="laydate()" id="startime" size="6px">
	   						<input placeholder="结束日期" class="laydate-icon" onclick="laydate()" id="endtime" size="6px">
	   						<input class="btn btn-primary btn-xs" type="button" style="margin-left: 2px; line-height: 1.2;font-size: 13px;margin-bottom: 3px; padding: 2px 5px;" onclick="timeselect()" value="确定" />
						</div>
					</div>
				</div>
				
				<div class="container" style="height:20px;"></div>
				<div class="container" id="echartsmain" style="width: 85%;height:600px;"></div>
				
				<div class="container" id="DepyCollections" style="width: 75%;height:80px;"></div>
				<div class="container" id="AmountCollections" style="display: none;width: 75%;height:80%;"></div> 
				
			</div>
		</div>
	</div>	

	<!-- Bootstrap core JavaScript  ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="<%=basePath %>js/bootstrap.js"></script>
	<script src="<%=basePath %>js/jquery.date_input.pack.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath %>js/ie10-viewport-bug-workaround.js"></script>
	<script type="text/javascript" src="<%=basePath %>myjs/content.js"></script>
	<script type="text/javascript">
	$(document).ready(function() {
		//为下拉框绑定点击事件，点击下拉框选项就向后台获得数据
		$("#selectdate>option").on('click', function() {
			var d = $("#selectdate").val();
			var starttime;
			var endtime;
			switch(d){
				case "thismonth": {
					var myDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
					var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
					starttime = myDate.getFullYear()+month+"-0"+1;
					endtime = myDate.getFullYear()+month+"-"+myDate.getDate();
					
				}break;
				case "lastmonth": {
					var myDate = new Date(new Date().getFullYear(),new Date().getMonth(),0);
					var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
					starttime = myDate.getFullYear()+month+"-0"+1;
					endtime = myDate.getFullYear()+month+"-"+myDate.getDate();
				}break;
				case "today": {
					var now = new Date();
					starttime = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
					endtime = starttime;
				}break;
				case "thisweek": {
					var now = new Date();
					var month = now.getMonth()>=9?"-"+(now.getMonth()+1):"-0"+(now.getMonth()+1);
					var date = now.getDate()-now.getDay();
					starttime = now.getFullYear()+month+"-0"+date;
					endtime = now.getFullYear()+month+"-"+(date+6);
				}break;
				case "thisseason": {
					var now = new Date();
					var m = parseInt(now.getMonth()/3)*3;
					starttime = now.getFullYear()+"-"+(m+1)+"-01";
					endtime = now.getFullYear()+"-"+(m+3)+"-31";
				}break;
				case "thisyear":{
					var now = new Date();
					starttime = now.getFullYear()+"-01-01";
					endtime = now.getFullYear()+"-12-31";
				} break;
			}
			getData(starttime,endtime);
		});
		
		
		
		//获得当前当前系统时间的
		var myDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
		var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
		var starttime = myDate.getFullYear()+month+"-0"+1;
		var endtime = myDate.getFullYear()+month+"-"+myDate.getDate();
		getData(starttime,endtime);
		
		
		 
	}); 
	
	//根据开始时间和结束时间获得柱状图数据
	function getData(starttime,endtime) {
		var salename = [];
		var sign = [];
		var payment = [];
		var speoplenum = [];
		var backfee = [];
		$.ajax({
			type : 'POST',
			url : '../signed/saleranking.do',
			dataType : 'json',
			data : {
				"starttime" : starttime,
				"endtime" : endtime
			},
			success : function(data) {
				var qd = 0;
				var sk = 0;
				var qdr = 0;
				var skr = 0;
				if (data) {
					$.each(data, function(i, p) {
						salename[i] = p['sale'];
						sign[i] = p['studyfee'];
						qd += p['studyfee'];
						payment[i] = p['depositfee'];
						sk += p['depositfee'];
						speoplenum[i] = p['speoplenum'];
						backfee[i] = p['backfee'];
						qdr+=p['speoplenum'];
						skr+=p['backfee'];
					});
				}
				subtext = "签单小计: ￥"+qd.toLocaleString()+"，"+qdr+"人  ；   收款小计: ￥"+sk.toLocaleString()+"，"+skr+"人";
				setOption(salename,sign,payment,subtext,starttime,endtime,speoplenum,backfee);
			}
		});
	}
	
	//画柱状图
	function setOption(salename,sign,payment,subtext,starttime,endtime,speoplenum,backfee){
		var myChart = echarts.init(document.getElementById('echartsmain'));
		option = {
		    title : {
		        text: '签单收款排名',
		        subtext: subtext,
		        sublink:'../signed/allsigninfo.do',
		        
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:[
		            '签单数据','收款数据','签单人数','收款人数'
		        ]
		    },
		    toolbox: {
		        show : true,
		        feature : {
		            mark : {show: true},
		            dataView : {show: true, readOnly: false},
		            magicType : {show: true, type: ['line', 'bar']},
		            restore : {show: true},
		            saveAsImage : {show: true}
		        }
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : salename
		        },
		        {
		            type : 'category',
		            axisLine: {show:false},
		            axisTick: {show:false},
		            axisLabel: {show:false},
		            splitArea: {show:false},
		            splitLine: {show:false},
		            data : salename
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel:{formatter:'{value} 元'}
		        },
		        {
		            type : 'value',
		            splitNumber: 5,
		            axisLabel : {
		                formatter: function (value) {
		                    // Function formatter
		                    return value + ' 人'
		                }
		            },
		            splitLine : {
		                show: false
		            }
		        }
		    ],
		    series : [
		        {
		            name:'签单数据',
		            type:'bar',
		            itemStyle: {normal: {color:'rgba(217,104,49,1)', label:{show:true,position: 'insideTop',formatter: sign}}},
		            data:sign
		        },
		        {
		            name:'收款数据',
		            type:'bar',
		            xAxisIndex:1,
		            itemStyle: {normal: {color:'rgba(141,11,128,1)', label:{show:true,position: 'inside',formatter:function(p){return p.value > 0 ? (p.value +'\n'):'';}}}},
		            data:payment
		        },
		        {
		            name:'签单人数',
		            type: 'line',
		            yAxisIndex: 1,
		            itemStyle: {normal: {color:'rgba(2,71,168,1)', label:{show:true,position: 'top',formatter:sign}}},
		            data: speoplenum
		        },
		        {
		            name:'收款人数',
		            type: 'line',
		            yAxisIndex: 1,
		            itemStyle: {normal: {color:'rgba(102,205,73,1)', label:{show:true,position: 'top',formatter:sign}}},
		            data: backfee
		        }
		    ]
		};
		myChart.setOption(option);
		myChart.on('click', function (param){
			//根据点击的部门来查询签单与收款
			clickbar(param.name,starttime,endtime);
	    });  
	    /*  myChart.on('click',eConsole);  
	     window.onresize = myChart.resize;  */
		  
	}
	
	function clickbar(dept,starttime,endtime){
		if(dept.indexOf("销售")== -1||dept.indexOf("部")== -1){
			return false;
		}
		$.ajax({
			type:'POST',
			url:'../signed/deptempsignediaer.do',
			dataType : 'json',
			data : {
				"starttime" : starttime,
				"endtime" : endtime,
				"dept" : dept
			},
			success : function(data) {
				var salename = [];
				var sign = [];
				var payment = [];
				var speoplenum = [];
				var backfee = [];
				var qd = 0;
				var sk = 0;
				var qdr = 0;
				var skr = 0;
				if (data) {
					$.each(data, function(i, p) {
						salename[i] = p['sale'];
						sign[i] = p['studyfee'];
						qd += p['studyfee'];
						payment[i] = p['depositfee'];
						speoplenum[i] = p['speoplenum'];
						backfee[i] = p['backfee'];
						sk += p['depositfee'];
						qdr+=p['speoplenum'];
						skr+=p['backfee'];
					});
				}
				subtext = "签单小计: ￥"+qd.toLocaleString()+"，"+qdr+"人  ；   收款小计: ￥"+sk.toLocaleString()+"，"+skr+"人";
				setOption(salename,sign,payment,subtext,starttime,endtime,speoplenum,backfee);
			}
		
		});
	}
		
	function timeselect(){
		var starttime;
		var endtime;
		if($("#startime").val()!='' && $("#endtime").val()!=""){
			if($("#startime").val()<$("#endtime").val()){
				starttime = $("#startime").val();
				endtime = $("#endtime").val();
			}else {
				starttime = $("#endtime").val();
				endtime = $("#startime").val();
			}
		}
		getData(starttime,endtime);
	}
	

	</script>
</body>
</html>