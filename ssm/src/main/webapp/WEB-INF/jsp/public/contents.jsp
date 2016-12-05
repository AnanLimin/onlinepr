<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<meta name="description" content="">
<meta name="author" content="">
<link rel="icon" href="http://v3.bootcss.com/favicon.ico">

<title>ETC-数据统计</title>

<!-- Bootstrap core CSS -->
<link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">

<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="<%=basePath%>js/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
      <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<script src="<%=basePath%>js/jquery.min.js" type="text/javascript"></script>
<!-- 引入 ECharts 文件 -->
<script type="text/javascript" src="<%=basePath%>js/echarts.js"></script>
<script type="text/javascript">
	var typelist = <%=session.getAttribute("typelist")%>
	var deptlist = <%=session.getAttribute("deptlist")%>
	var arealist = <%=session.getAttribute("arealist")%>
	var monthlist = <%=session.getAttribute("monthlist")%>
	var monthtypelist = <%=session.getAttribute("monthtypelist")%>
</script>
<script type="text/javascript" src="<%=basePath%>myjs/reports.js"></script>
</head>

<body>
	
	<jsp:include page="navheader.jsp"></jsp:include>
	<div class="container-fluid">
		<div class="row">
			<jsp:include page="navleft.jsp"></jsp:include>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<div class="panel panel-info ">
					<div class="panel-heading">
						<h3 class="panel-title">上月收入类型排名</h3>
					</div>
					<div class="panel-body"><div id="typeRanking" style="width: 450px;height:500px;"></div></div>
				</div>
				<div class="panel panel-info">
					<div class="panel-heading">
						<h3 class="panel-title">上月收入类型百分比</h3>
					</div>
					<div class="panel-body"><div id="Percentage" style="width: 450px;height:500px;"></div></div>
				</div>
				<div class="panel panel-info">
					<div class="panel-heading">
						<h3 class="panel-title">上月销售部门收入</h3>
					</div>
					<div class="panel-body"><div id="deptBar" style="width: 450px;height:500px;"></div></div>
				</div>
				<div class="panel panel-info">
					<div class="panel-heading">
						<h3 class="panel-title">上月销售部门收入百分比</h3>
					</div>
					<div class="panel-body"><div id="deptPie" style="width: 450px;height:500px;"></div></div>
				</div>
				<div class="panel panel-info">
					<div class="panel-heading">
						<h3 class="panel-title">上月区域收入</h3>
					</div>
					<div class="panel-body"><div id="areaBar" style="width: 450px;height:500px;"></div></div>
				</div>
				<div class="panel panel-info">
					<div class="panel-heading">
						<h3 class="panel-title">上月区域收入百分比</h3>
					</div>
					<div class="panel-body"><div id="areaPie" style="width: 450px;height:500px;"></div></div>
				</div>
				<div class="panel panel-info">
					<div class="panel-heading">
						<h3 class="panel-title">月度收入走势</h3>
					</div>
					<div class="panel-body"><div id="monthLine" style="width: 450px;height:500px;"></div></div>
				</div>
				<div class="panel panel-info">
					<div class="panel-heading">
						<h3 class="panel-title">月度区域收入类型分析</h3>
					</div>
					<div class="panel-body"><div id="monthTyprBar" style="width: 450px;height:500px;"></div></div>
				</div>
			</div>
		</div>
	</div>
	<%@ include file="footer.jsp"%>
	
	<!-- Bootstrap core JavaScript  ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	
	<script src="<%=basePath %>js/bootstrap.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath %>js/ie10-viewport-bug-workaround.js"></script>
</body>
</html>
