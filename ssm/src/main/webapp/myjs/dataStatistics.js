$(document).ready(function(){
	getsaledata();
});

function getsaledata(){
	var salename = []; 
	var sign = [];
	var payment = [];
	$.ajax({
		type : 'POST',
		url : 'signed/saleAchievement.do',
		dataType :'json',
		async:false, //这是重要的一步，防止重复提交的
		data : { "pagenum" : "" },
		success : function(data) {
			if (data) {
				$.each(data, function(i, p) {
					salename[i] = p['sale'];
					sign[i] = p['studyfee'];
					payment[i] = p['depositfee'];
				});
			}
			
		}
	});
	saleOption(salename,sign,payment);
}

function saleOption(salename,sign,payment){
	var myChart = echarts.init(document.getElementById('saleAchievemnet'));
	option = {
		    title : {
		        text: '销售本月签单与收款排名',
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    color :['#FE8463','#B5C334'],
		    legend: {
		        data:['签单额','收款额']
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
		    xAxis : [
		        {
		            type : 'category',
		            data : salename,
		            /*itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                          '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
		                           '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
		                           '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
		                        ];
		                        return colorList[params.dataIndex]
		                    }
		                }
		            }*/
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'签单额',
		            type:'bar',
		            data:sign,
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'}
		                ]
		            }
		        },
		        {
		            name:'收款额',
		            type:'line',
		            data:payment,
		            markPoint : {
		                data : [
		                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
		                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name : '平均值'}
		                ]
		            }
		        }
		    ]
		};
	// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
	/*function typeData(typelist){
    	var typename = [];
		var typemoney = [];
		$.each(typelist,function(i,p){
			typename[i] = p['ename'];
			typemoney[i] = p['money'];
		});	
		setOption(typename,typemoney,'typeRanking','上月收入类型排名');
		setpieOption(typename,typemoney,'Percentage','上月收入类型百分比');
		return typename;
	}
	
	function deptData(deptlist){
		var deptname = [];
		var deptmoney = [];
		$.each(deptlist,function(i,p){
			deptname[i] = p.dname;
			deptmoney[i] = p.money;
		});
		setOption(deptname,deptmoney,'deptBar','上月销售部门收入');
		setpieOption(deptname,deptmoney,'deptPie','上月销售部门贡献百分比');
	}
	
	function areaData(arealist){
		var areaname = [];
		var areamoney = [];
		$.each(arealist,function(i,p){
			areaname[i] = p.ename;
			areamoney[i] = p.money;
		});
		setOption(areaname,areamoney,'areaBar','上月区域收入');
		setpieOption(areaname,areamoney,'areaPie','上月区域收入贡献百分比');
	}
	
	function monthDate(monthlist){
		var name = [1,2,3,4,5,6,7,8,9,10,11,12];
		var monthname = [];
		var monthmoney = [];
		$.each(monthlist,function(i,p){
			monthname[i] = p.ename;
			monthmoney[i] = p.money;
		});
		$.each(name,function(i,p){
			var flag = 1;
			$.each(monthname,function(j,o){
				if(p==o){
					flag = 0;
				}
			});
			if(flag==1){
				monthmoney.splice(i,0,0);
			}
			name[i] = name[i]+'月';
		});
		setOption(name,monthmoney,'monthLine','月度收入走势图');
	}
	
	
	function monthTypeDate(monthtypelist,type){
		var month = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

		var countmoney = [];
		$.each(monthtypelist,function(i,p){
			var yue = [];
			var money = [];
			 $.each(p,function(j,o){
				 yue.push(o.dname);
				 money.push(o.money);
			 });
			 countmoney[i] = loop(p,month,yue,money);
//			 alert(countmoney[i]);
		});
		
		var series = [];
		for(var i = 0;i<type.length;i++){
	        series.push({
	            name: type[i],
	            type: 'line',
	            // data:[120, 132, 101, 134, 90, 230, 210]
	            data: countmoney[i],
	            markPoint : {
	                data : [
	                    {type : 'max', name: '最大值'},
	                    {type : 'min', name: '最小值'}
	                ]
	            },
	            markLine : {
	                data : [
	                    {type : 'average', name : '平均值'}
	                ]
	            }
	        });
	    }		
		setMonthTypeOption(type,series);	
	}
	
	
	function loop(monthtypelist,name,yue,money){
		
		$.each(monthtypelist,function(i,p){
			yue[i]=p.dname+'月';
			money[i]=p.money;
		});
		
		$.each(name,function(i,p){
			var flag = 1;
			$.each(yue,function(j,o){
				if(p==o){
					flag = 0;
				}
			});
			if(flag==1){
				money.splice(i,0,0);
			}
		});
		return money;
	}
	function setOption(name,typemoney,divId,titletext){
		// 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(divId));
        // 指定图表的配置项和数据
        var option = {
             title : {
		        text: titletext,
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['收入额']
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
		    xAxis : [
		        {
		            type : 'category',
		            data : name
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'收入额',
		            type:'bar',
		            data:typemoney,
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
		                    {type : 'min', name: '最小值'}
		                ]
		            },
		            markLine : {
		                data : [
		                    {type : 'average', name: '平均值'}
		                ]
		            }
		        }
		    ]
        };
		// 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
	}
	
	
	function setpieOption(name,typemoney,divId,titletext){
		var myChart = echarts.init(document.getElementById(divId));
		option = {
		    title : {
		        text: titletext,
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient : 'vertical',
		        x : 'left',
		        data:name
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
		            saveAsImage : {show: true}
		        }
		    },
		    calculable : true,
		    series : [
		        {
		            name:'百分比',
		            type:'pie',
		            radius : '55%',
		            center: ['50%', '60%'],
		            data:[
		                {value:typemoney[0], name:name[0]},
		                {value:typemoney[1], name:name[1]},
		                {value:typemoney[2], name:name[2]},
		                {value:typemoney[3], name:name[3]},
		                {value:typemoney[4], name:name[4]}
		            ]
		        }
		    ]
		};
		 myChart.setOption(option);
	}
	
	function setMonthTypeOption(type,series){
		var myChart = echarts.init(document.getElementById("monthTyprBar"));
		option = {
			    title : {
			        text: '月度收入类型分析',
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:type
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
			    xAxis : [
			        {
			            type : 'category',
			            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value'
			        }
			    ],
			    series : series
			};
		myChart.setOption(option);
	}
*/