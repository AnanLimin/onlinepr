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

<title>ETC-财务管理-检索</title>
<!-- Bootstrap core CSS -->
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

<script type="text/javascript" src="<%=basePath%>myjs/financial.js"></script>
<script type="text/javascript" src="<%=basePath%>myjs/refund.js"></script>
</head>

<body>
	<jsp:include page="../public/navheader.jsp"></jsp:include>
	<input value="${pages }" id="pagecountTb" type="hidden">
	<div class="container-fluid">
		<div class="row">
		<jsp:include page="../public/navleft.jsp"></jsp:include>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
				<div class="container">
					<div class="row">
						<div>
							<a href="<%=basePath %>signed/firstincomepay.do">收款</a> | 
							<a href="<%=basePath %>signed/backmoney.do">返款</a> | 
							<a href="<%=basePath %>signed/refund.do">退款</a> | 
							<a href="<%=basePath %>signed/iaer.do">收支记录</a> | 
							<a href="<%=basePath %>signed/tobeprint.do" style="text-decoration:underline;">检索</a> | 
						</div>
					</div>
				</div>
				<div class="container" style="height:20px;"></div>
					<table class="table table-striped table-hover table-responsive table-bordered" id="tobeprinttable">
						<thead>
							<tr>
							  <th>签单编号</th>
							  <th>姓名</th>
							  <th>院系</th>
							  <th>申请时间</th>
							  <th>交费金额</th>
							  <th>退费金额</th>
							  <th>身份证</th>
							  <th>银行卡号码</th>
							  <th>开户行</th>
							  <th>原因</th>
							  <th>经办人</th>
							  <th>操作</th>
							</tr>
						  </thead>
						  <tbody>
						 	<c:forEach items="${tobeprint }" var="signed">
						 	<tr>
							  <td>${signed.sid}</td>
							  <td>${signed.scustomername}</td>
							  <td>${signed.scustomerschool}</td>
							  <td>${signed.stime}</td>
							  <td><fmt:formatNumber value="${signed.studyfee}" type="currency" /></td>
							  <td><fmt:formatNumber value="${signed.backfee}" type="currency" /></td>
							  <td>${signed.scustomercardid}</td>
							  <td>${signed.scustomerbankcardid}</td>
							  <td>${signed.bank}</td>
							  <td>${signed.sremark}</td>
							  <td>${signed.sale}</td>
							  <td><a onclick="showprint()">打印</a></td>
							</tr>
						 	</c:forEach>
						</tbody>
					</table>
					<!-- 分页按钮  -->
					<div class="container">
						<div class="row" id="pagegroup">
							<div id="printpage" class='tcdPageCode col-xs-12 col-sm-6 col-md-8 col-lg-6 col-sm-offset-3 col-md-offset-2 col-lg-offset-3'></div>
						</div>
					</div>
				</div>
		</div>
	</div>

<div class="modal" id="tobrfprintinfo" tabindex="-1" role="dialog" aria-labelledby="myModal" aria-hidden="true" >
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title"><b>打印退费退款单</b></h4>
      </div>
      <div class="modal-body" id="printArea" align="center">
      	<table class="table" id="ptable" style="width: 200mm;">
	  		<thead>
	  			<tr style="height: 70px;"><th colspan="4" style="font-size: 24px;text-align:center;vertical-align:middle; font-weight: bold;">退 费 单</th></tr>
	  		</thead>
	  		<tbody>
	  			<tr >
	  				<td style="width: 20%;">姓名</td>
	  				<td></td>
	  				<td style="width: 20%;">院系</td>
	  				<td></td>
	  			</tr>
	  			<tr>
	  				<td>申请时间</td>
	  				<td></td>
	  				<td>签单编号</td>
	  				<td></td>
	  			</tr>
	  			<tr>
	  				<td>缴费金额</td>
	  				<td></td>
	  				<td>退费金额</td>
	  				<td></td>
	  			</tr>
	  			<tr>
	  				<td>原因</td>
	  				<td colspan="3"></td>
	  			</tr>
	  			<tr>
	  				<td>身份证</td>
	  				<td></td>
	  				<td>银行卡</td>
	  				<td></td>
	  			</tr>
	  			<tr>
	  				<td>开户行</td>
	  				<td></td>
	  				<td>经办人</td>
	  				<td></td>
	  			</tr>
	  			<tr>
	  				<td>办理日期</td>
	  				<td></td>
	  				<td>退款人</td>
	  				<td></td>
	  			</tr>
	  			<tr>
	  				<td>签字</td>
	  				<td colspan="3"></td>
	  			</tr>
	  		</tbody>
	  	</table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
        <input type="submit" class="btn btn-primary" data-dismiss="modal" value="打印" onclick="printar()"/>
      </div>
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
	<script type="text/javascript" src="<%=basePath%>js/jquery.PrintArea.min.js"></script>

</body>
</html>
						