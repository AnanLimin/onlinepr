<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE html>
<html>
<head>
<base href="<%=basePath%>">

<title>ETC-客户管理-我的申请</title>
<!-- Bootstrap core CSS -->
<%-- <link href=" <%=basePath%>css/add_stu.css" rel="stylesheet" type="text/css"> --%>
<link href="<%=basePath%>css/bootstrap.min.css" rel="stylesheet">
<!-- page CSS -->
<link href="<%=basePath%>css/page.css" rel="stylesheet">

<!-- Custom styles for this template -->
<link href="<%=basePath%>css/dashboard.css" rel="stylesheet">
<link href="<%=basePath%>css/bootstrap-datetimepicker.min.css" rel="stylesheet">


<!-- Just for debugging purposes. Don't actually copy these 2 lines! -->
<!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->
<script src="<%=basePath%>js/ie-emulation-modes-warning.js"></script>

<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
<!--[if lt IE 9]>
  <script src="//cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
  <script src="//cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<script type="text/javascript" src="<%=basePath%>js/jquery.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/moment-with-locales.min.js"></script>
<script type="text/javascript" src="<%=basePath%>js/bootstrap-datetimepicker.min.js"></script>
<script src="<%=basePath%>myjs/BackMoney.js"></script>
<script src="<%=basePath%>js/page.js"></script>
</head>

<body>
	<jsp:include page="../public/navheader.jsp"></jsp:include>
	<input value="${backpages }" id="pagecount" type="hidden">
	<div class="container-fluid">
		<div class="row">
			<jsp:include page="../public/navleft.jsp"></jsp:include>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
					<div class="container">
						<div class="row">
							<div>
								<a href="<%=basePath %>signed/mysign.do">我的订单</a> | 	
								<a href="<%=basePath %>signed/Back.do" style="text-decoration:underline;">我的申请</a> |
								<a href="<%=basePath %>signed/allsigninfo.do">全部订单</a> |
							 </div>
						</div>
					</div>
					<div class="container" style="height:20px;"></div>
						<table class="table table-striped table-hover table-responsive table-bordered" id="mybackinfotable">
							<thead>
								<tr class="active">
								  <th>申请编号</th>
								  <th>申请时间</th>
								  <th>客户姓名</th>
								  <th>签单时间</th>
								  <th>已缴金额</th>
								  <th>申请金额</th>
								  <th>状态</th>
								  <th>类型</th>
								  <th>备注(原因)</th>
								  <th>操作</th>
								</tr>
							  </thead>
							  <tbody>						 
							 	<c:forEach items="${Back}" var="signed">
							 	<tr>
								  <td>${signed.dbid}</td>						 
								  <td>${signed.dbtime}</td>
								  <td>${signed.scustomername}</td>
								  <td>${signed.scustomercardid}</td>
								  <td><fmt:formatNumber value="${signed.bank}" type="currency" /></td>
								  <td><fmt:formatNumber value="${signed.dbamount}" type="currency" /></td>
								  <td>${signed.condition}</td>
								<c:choose>
									<c:when test="${signed.dbtype==2}">
										<td>退款</td>
									</c:when>
									<c:when test="${signed.dbtype==1}">
										<td>返款</td>
									</c:when>								
								</c:choose>
								  <td>${signed.dbremark}</td>			
								  <td><a class="backfeeupdate">修改</a>&nbsp;<a class="backfeedelete">删除</a></td>			
								</tr>
							 	</c:forEach>
							</tbody>
						</table>
						<!-- 分页按钮  -->
						<div class="container">
							<div class="row">
								<div id="myback" class="tcdPageCode sign col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3"> </div>
							</div>
						</div>
		</div>
	</div>
</div>
<div class="modal" id="updatadrawback">
	  <div class="modal-dialog modal-md">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title">修改申请信息</h4>
	      </div>
	      <form action="signed/opporeason.do" method="post" class="form-horizontal" >
	      	<input type="hidden" value="" name="dbid">
	      	<input type="hidden" value="5" name="stateid">
	      	  <div class="modal-body">
      			<div class="form-group">
      				<span class="col-md-2 col-md-offset-1">编号</span><div class="col-md-3"></div>
      				<span class="col-md-2">申请时间</span><div class="col-md-3"></div>
      			</div>
      			<div class="form-group">
      				<span class="col-md-2 col-md-offset-1">客户姓名</span><div class="col-md-3"></div>
      				<span class="col-md-2">签单时间</span><div class="col-md-3"></div>
      			</div>
      			<div class="form-group">
      				<span class="col-md-2 col-md-offset-1">已交金额</span><div class="col-md-3"></div>
      				<span class="col-md-2">申请金额</span><div class="col-md-3"><input name="dbamount" type="text" size="8"></div>
      			</div>
      			<div class="form-group">
      				<span class="col-md-2 col-md-offset-1">备注</span>
      				<div class="col-md-6">
      					<textarea rows="3" cols="20" name="dbremark"></textarea>
      				</div>
      			</div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
		        <button type="submit" class="btn btn-primary">确定</button>
		      </div>
	      </form>
	    </div>
	  </div>
	</div>
<%@ include file="../public/footer.jsp"%>
	<!-- Bootstrap core JavaScript  ================================================== -->
	<!-- Placed at the end of the document so the pages load faster -->
	<script src="<%=basePath%>js/bootstrap.js"></script>
	<!-- Just to make our placeholder images work. Don't actually copy the next line! -->
	<!-- <script src="Dashboard_files/holder.htm"></script> -->
	<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
	<script src="<%=basePath%>js/ie10-viewport-bug-workaround.js"></script>
	
</body>
</html>
						