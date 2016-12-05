$(document).ready(function() {
	Defalt();
$('.option_').change(function()  {
		var d = $("#option_").val();		
		switch(d){
			case "0": {
				var myDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
				var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
				var starttime = myDate.getFullYear()+month+"-0"+1;
				var endtime = myDate.getFullYear()+month+"-"+myDate.getDate();
				getalliaerinfo(starttime,endtime);
				DepyCollections(starttime,endtime);
				
			}break;
			case "1": {
				var myDate = new Date(new Date().getFullYear(),new Date().getMonth(),0);
				var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
				var starttime = myDate.getFullYear()+month+"-0"+1;
				var endtime = myDate.getFullYear()+month+"-"+myDate.getDate();
				getalliaerinfo(starttime,endtime);
				DepyCollections(starttime,endtime);
				
			}break;
			case "2": {
				var now = new Date();
				var time = now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
				getalliaerinfo(time,time);
				DepyCollections(starttime,endtime);
				
			}break;
			case "3": {
				var now = new Date();
				var month = now.getMonth()>=9?"-"+(now.getMonth()+1):"-0"+(now.getMonth()+1);
				var date = now.getDate()-now.getDay();
				var starttime = now.getFullYear()+month+"-0"+date;
				var endtime = now.getFullYear()+month+"-"+(date+6);
				getalliaerinfo(starttime,endtime);
				DepyCollections(starttime,endtime);
				
			}break;
			case "4": {
				var now = new Date();
				var m = parseInt(now.getMonth()/3)*3;
				var starttime = now.getFullYear()+"-"+(m+1)+"-01";
				var endtime = now.getFullYear()+"-"+(m+3)+"-31";
				getalliaerinfo(starttime,endtime);
				DepyCollections(starttime,endtime);
				
			}break;
			case "5":{
				var now = new Date();
				getalliaerinfo(now.getFullYear()+"-01-01",now.getFullYear()+"-12-31");
				DepyCollections(now.getFullYear()+"-01-01",now.getFullYear()+"-12-31");
			} break;
		}
}
);
	//getalliaerinfo(starttime,endtime);/* 查询财务收支记录 */

})			
function Defalt(){	
	var s= document.getElementById("option_");
	var d= s.options[s.selectedIndex].value;
	if(d==0){
		var myDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
		var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
		var starttime = myDate.getFullYear()+month+"-0"+1;
		var endtime = myDate.getFullYear()+month+"-"+myDate.getDate();
		getalliaerinfo(starttime,endtime);
		DepyCollections(starttime,endtime);
	}
	else{	
		return false;
	}

};
function getalliaerinfo(starttime,endtime){
			var iaertype=[1];
			var iaeramount=[1];
			var Lastime;
			var Nextime;
			
			if(starttime=='0'&&endtime==0){ //默认显示本月
				
				var myDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
				var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
				Lastime = myDate.getFullYear()+month+"-0"+1;
				Nextime = myDate.getFullYear()+month+"-"+myDate.getDate();
				Lastime=starttime;
				Nextime=endtime;				
			}
			else{
				
			$.ajax({
				type:'post',
				url : '../signed/iaerByType.do',
				dataType : 'json',
				data:{starttime:starttime,	
				      endtime:endtime
					},				      
				success : function(data) {
				//	alert(data.length);
					var i=0;
					for (tmp in data) {
						if (i == 0) {
							iaertype[0] = data[tmp].type;
							iaeramount[0] = data[tmp].amount;
						} else if (i == 1) {
							iaertype[1] = data[tmp].type;
							iaeramount[1] = data[tmp].amount;
						}
						i++;
					}
				setAlliaerinfOption(iaertype,iaeramount,starttime,endtime);
				}			
			});
		}
}	
function setAlliaerinfOption(iaertype,iaeramount,starttime,endtime) {
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('alliaerinfo'));		
			// 指定图表的配置项和数据
			
			var option = {
				title : {
		        text: '收支',
		      
		    },
		    	 tooltip : {
      			  trigger: 'item',
   			 },
		     legend: {
      			  data:['收入','支出']
  			  },
		     toolbox: {
       			 show : true,
        	  feature : {
            		mark : {show: true},
           		    dataView : {show: true, readOnly: false},
           	 magicType : {
                show: true, 
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
		     restore : {show: true},
            saveAsImage : {show: true},
        }
    },
    calculable : true,
    series : [
        {
            name:'收支记录',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:iaeramount[0], name:iaertype[0]},
                {value:iaeramount[1], name:iaertype[1]},
               
            ]
        }
    ]
};
			// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart.on('click', function (param){	
	var type=param.name;  
	if(type=="收入"){
		type=1;
			window.location.href="../signed/allType.do?type="+type+"&starttime="+starttime+"&endtime="+endtime;		   
           }
           else{
         type=2;
        	window.location.href="../signed/allType.do?type="+type+"&starttime="+starttime+"&endtime="+endtime;	
           } 
		          
        });  
     myChart.on('click',eConsole);  
}



//根据部门查询数据全部的签单和收款
function DepyCollections(starttime,endtime){

	var xAxisData=[];
	var seriesData=[];
	var amount=[];	
	var Lastime;
	var Nextime;

	if(starttime=='0'&&endtime==0){ //默认显示本月
		
		var myDate = new Date(new Date().getFullYear(),new Date().getMonth()+1,0);
		var month = myDate.getMonth()>=9?"-"+(myDate.getMonth()+1):"-0"+(myDate.getMonth()+1);
		Lastime = myDate.getFullYear()+month+"-0"+1;
		Nextime = myDate.getFullYear()+month+"-"+myDate.getDate();
		Lastime=starttime;
		Nextime=endtime;				
	}else
	{	
		$.ajax({
			type : 'POST',
			url : '../signed/DepyCollections.do',
			dataType : 'json',
			data : {
					starttime:starttime,	
			      endtime:endtime
			},
			success : function(data) {
				$.each(data,function(index,obj){  
					xAxisData.push(obj.dept);  
					seriesData.push(obj.studyfee);  
					amount.push(obj.amount);  
	            });  
				DepyCollection(xAxisData,seriesData,amount,starttime,endtime);
			}
		});	
		
	}
	
	
	var barData = {  
            xAxisData:function(){             	
                return xAxisData;  
            },  
            seriesData:function(){  
            	if(seriesData==null){
            		 seriesData=0;
            	}
            	else{
            		return seriesData; 
            	}
                 
            },
            amount:function(){  
            	if(amount==null){
            		amount=0;
            	}
            	else{
            		return amount;  
            	}
               
            }  
    };  
}
function  DepyCollection(xAxisData,seriesData,amount,starttime,endtime){
	var myChart = echarts.init(document.getElementById('DepyCollections'));	
	
	// 指定图1表的配置项和数据	
	var option = {
			 title : {
			        text: '部门签单数据',
			 
			    },
			    tooltip : {
			        trigger: 'axis'
			        
			    },
			    legend: {
			        data:[
			            '签单','收款'
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
			    calculable : true,
			    grid: {y: 70, y2:50, x2:20},
			    xAxis : [
			        {
			            type : 'category',
			            data : xAxisData
			        },
			        {
			            type : 'category',
			            axisLine: {show:false},
			            axisTick: {show:false},
			            axisLabel: {show:false},
			            splitArea: {show:false},
			            splitLine: {show:false},
			            data : xAxisData
			        }
			    ],
			    yAxis : [
			             {
			                 type : 'value',
			                 axisLabel:{formatter:'{value} 元'}
			             }
			         ],
			     series : [
			                   {
			                       name:'签单',
			                       type:'bar',
			                       data:seriesData,
			                       itemStyle: {
			                    	   	normal: {
			                    	   		color:'rgba(193,35,43,0.5)',				                    	   		
			                    	    	label:{
			                    	    		show:true,
			                    	    		textStyle:{
			                    	    			position:'top',
			                    	    			fontWeight:'bolder',  
			                                        fontSize : '12',  
			                                        fontFamily : '微软雅黑',  
			                                       
			                    	    		}
			                   				
			                    	    			}
			                    	   			}
			                       			 },
			                    
			                   				},
			                   {
			                       name:'收款',
			                       type:'bar',
			                       xAxisIndex:1,
			                       itemStyle: {
			                    	   		normal:
			                    	   			{
			                    	   				color:'rgba(193,35,43,1)', 
			                    	   				label:{show:true,
					                    	    		textStyle:{
					                    	    			fontWeight:'bolder',  
					                                        fontSize : '12',  
					                                        fontFamily : '微软雅黑',
					                                        position:'top'
					                    	    					}
			                    	   						}
			                   		
			                       }},
			                       data:amount
			                       
			                       
			                   }
			               ]  


};
	// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
myChart.on('click', function (param){
	//根据点击的部门来查询签单与收款
	
	var dept=param.name; 
	alert(dept);
	var xAxisD=[];
	var	seriesD=[];
	var amounts=[];
	alert(starttime);
	$.ajax({
		type:'post',
		url : '../signed/AmountCollections.do',
		dataType : 'json',
		data:{starttime:starttime,	
		      endtime:endtime,
		      dept:dept
			},				      
		success : function(data) {
			$.each(data,function(index,obj){  
				xAxisD.push(obj.dept);  
				seriesD.push(obj.studyfee);  
				amounts.push(obj.amount);  
            });  
			AmountCollections(xAxisD,seriesD,amount);
			
		}	
			
	});		
		document.getElementById("DepyCollections").style.display="none";//隐藏
	
		document.getElementById("AmountCollections").style.display="";//显示 	
	
	
	var barDatas = {  
            xAxisD:function(){             	
                return xAxisD;  
            },  
            seriesD:function(){  	
            	if(seriesD==null){
            		 seriesD=0;
            	}
            	else{
            		return seriesD; 
            	}
                 
            },
            amounts:function(){  
            	if(amounts==null){
            		amounts=0;
            	}
            	else{
            		return amounts;  
            	}
               
            }  
    };  
//window.location.href="../signed/allType.do?type="+type+"&starttime="+starttime+"&endtime="+endtime;	
	          
        });  
     myChart.on('click',eConsole);  
     window.onresize = myChart.resize; 
 
}
function AmountCollections(xAxisData,seriesData,amount){
	alert("123456"+xAxisData);
	var myChart = echarts.init(document.getElementById('AmountCollections'));		
	var option = {
			 title : {
			        text: '部门签单数据',
			 
			    },
			    tooltip : {
			        trigger: 'axis'
			        
			    },
			    legend: {
			        data:[
			            '签单','收款'
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
			    calculable : true,
			    grid: {y: 70, y2:50, x2:20},
			    xAxis : [
			        {
			            type : 'category',
			            data : xAxisData
			        },
			        
			    ],
			    yAxis : [
			             {
			                 type : 'value',
			                 axisLabel:{formatter:'{value} 元'}
			             }
			         ],
			     series : [
			                   {
			                       name:'签单',
			                       type:'bar',
			                       data:seriesData,
			                       itemStyle: {
			                    	   	normal: {
			                    	   		color:'rgba(193,35,43,0.5)',				                    	   		
			                    	    	label:{
			                    	    		show:true,
			                    	    		textStyle:{
			                    	    			position:'top',
			                    	    			fontWeight:'bolder',  
			                                        fontSize : '12',  
			                                        fontFamily : '微软雅黑',  
			                                       
			                    	    		}
			                   				
			                    	    			}
			                    	   			}
			                       			 },
			                    
			                   				},
			                   {
			                       name:'收款',
			                       type:'bar',
			                       itemStyle: {
			                    	   		normal:
			                    	   			{
			                    	   				color:'rgba(193,35,43,1)', 
			                    	   				label:{show:true,
					                    	    		textStyle:{
					                    	    			fontWeight:'bolder',  
					                                        fontSize : '12',  
					                                        fontFamily : '微软雅黑',
					                                        position:'top'
					                    	    					}
			                    	   						}
			                   		
			                       }},
			                       data:amount
			                       
			                       
			                   }
			               ]  


};
}
