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
<script type="text/javascript" src="<%=basePath%>js/jquery.min.js"></script>
	
</head>
<body>
<div class="col-sm-3 col-md-2 sidebar">
	<ul class="nav nav-sidebar">
		<li><a href="<%=basePath%>user/login.do">首页<span class="sr-only">(current)</span></a></li>
		<li><a href="<%=basePath%>signed/signedinfo.do">销售管理</a></li>
		<!-- <li><a href="#userMeun" class="nav-header collapsed" data-toggle="collapse">销售管理</a>
			<ul id="userMeun" class="nav nav-list collapse menu-second">
				<li><a style="margin-left: 10px;">我的订单</a></li>
				<li><a style="margin-left: 10px;">我的申请</a></li>
			</ul>	
		</li> -->
		<li><a href="<%=basePath%>signed/firstincomepay.do">财务管理</a></li>
		<li><a href="<%=basePath%>signed/ourmanagment.do">我的工作</a></li>
		<%-- <li><a href="<%=basePath%>signed/dataStatistics.do">数据统计</a></li> --%>
	</ul>
	<ul class="nav nav-sidebar">
	</ul>
</div>
<script type="text/javascript">
$(document).ready(function(){
	$("li").removeClass("active");
	var leftNavmun = <%=session.getAttribute("leftNav") %>+3;
	$("li:eq("+leftNavmun+")").addClass("active");
});
</script>
</body>
</html>
