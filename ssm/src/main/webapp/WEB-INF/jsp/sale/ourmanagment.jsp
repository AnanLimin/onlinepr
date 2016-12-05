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

<title>ETC-我的工作-退返款申请</title>
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
<script type="text/javascript" src="<%=basePath%>myjs/financial.js"></script>
<script type="text/javascript" src="<%=basePath%>myjs/signed.js"></script>
</head>

<body>
	<jsp:include page="../public/navheader.jsp"></jsp:include>
	<input value="${pages }" id="ourmanagmentpages" type="hidden">
	<div class="container-fluid">
		<div class="row">
			<jsp:include page="../public/navleft.jsp"></jsp:include>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				
				<div class="container">
						<div class="row">
							<div>
								
							</div>
						</div>
				</div>
				<div class="container" style="height:20px;"></div>
					<table class="table table-striped table-hover table-responsive table-bordered" id="ourmanamentinfotable">
						<thead>
							<tr>
								<td colspan="14">
									<div class="btn-group">
										<button type="button" class="btn btn-xs btn-success" onclick="agree()">
											<span class="glyphicon glyphicon-ok" aria-hidden="true">同意</span>
										</button>
										<button type="button" class="btn btn-xs btn-danger" onclick="oppose()">
											<span class="glyphicon glyphicon-remove" aria-hidden="true">不同意</span>
										</button>
									</div>
								</td>
							</tr>
							<tr>
							  <th>&nbsp;&nbsp;<input type="checkbox" value="refund_all" id="csign"></th>
							  <th>签单编号</th>
							  <th>申请日期</th>
							  <th>申请发起人</th>
							  <th>申请金额</th>
							  <th>申请状态</th>
							  <th>申请类型</th>
							  <th>客户姓名</th>
							  <th>身份证号码</th>
							  <th>银行卡号码</th>
							  <th>备注</th>
							</tr>
						  </thead>
						  <tbody>
						 	<c:forEach items="${InfoByall}" var="signed">
						 	<tr>
							  <td>&nbsp;&nbsp;<input type="checkbox" value="${signed.dbid}" name="agree_checkbox"></td>
							  <td>${signed.sid}</td>
							  <td>${signed.dbtime}</td>
							  <td>${signed.dbemp}</td>
							  <td><fmt:formatNumber value="${signed.dbamount}" type="currency" /></td>
							  <td>${signed.statu}</td>
							  <c:choose>
								<c:when test="${signed.dbtype==2}">
									<td>退款</td>
								</c:when>
								<c:when test="${signed.dbtype==1}">
									<td>返款</td>
								</c:when>								
							  </c:choose>
							  <td>${signed.scustomername}</td>
							  <td>${signed.scustomercardid}</td>
							  <td>${signed.scustomerbankcardid}</td>
							  <td>${signed.dbremark}</td>
							</tr>
						 	</c:forEach>
						</tbody>
					</table>
					<!-- 分页按钮  -->
					<div class="container">
						<div class="row" id="pagegroup">
							<div id="ourmanament" class='tcdPageCode col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3'></div>
						</div>
					</div>
				</div>
		</div>
	</div>
	<div class="modal" id="opporeason">
	  <div class="modal-dialog">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	        <h4 class="modal-title">不同意的理由</h4>
	      </div>
	      <form action="signed/opporeason.do" method="post" >
	      	<div class="modal-body">
	      		<textarea name="dbremark" rows="3" cols="20" placeholder="在这里填写不同意该申请的理由"></textarea>
	      		<input name="stateid" value="13" type="hidden">
	      		<input name="dbid" type="hidden">
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
	<%-- <script type="text/javascript" src="<%=basePath%>myjs/customer.js"></script> --%>
	<script src="<%=basePath%>js/page.js"></script>
	<script src="<%=basePath%>js/move-model.js"></script>
</body>
</html>
						