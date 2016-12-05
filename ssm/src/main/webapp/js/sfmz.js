 var national = [
            "汉族", "壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族",
            "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族",
            "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族",
            "俄罗斯族", "裕固族", "乌孜别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族"
    ];
 var provinces =['北京市','上海市','天津市','重庆市','湖北省','湖南省','广东省','河北省','山西省','辽宁省','吉林省','黑龙江省','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','海南省','四川省',
                 '贵州省','云南省','陕西省','甘肃省','青海省','台湾省','内蒙古自治区','广西壮族自治区','西藏自治区','宁夏回族自治区','新疆维吾尔自治区','香港特别行政区','澳门特别行政区'];
 
 var politics=['中共党员','共青团员','群众'];
 
 var qualifications=['初中','高中','中专','高职','专科','本科','硕士研究生','博士研究生','其他'];
 window.onload = function ()
 {
     var nat = document.getElementById ("national");
     var nat1 = document.getElementById ("provinces");
     var nat2 = document.getElementById ("politics");
     var nat3 = document.getElementById ("qualifications");
     
     for ( var i = 0; i < national.length; i++)
     {
         var option = document.createElement ('option');
         option.value = national[i];
         var txt = document.createTextNode (national[i]);
         option.appendChild (txt);
         nat.appendChild (option);
     }
     for ( var i = 0; i < provinces.length; i++)
     {
    	 var option = document.createElement ('option');
    	 option.value = provinces[i];
    	 var txt = document.createTextNode (provinces[i]);
    	 option.appendChild (txt);
    	 nat1.appendChild (option);
     }
     for ( var i = 0; i < politics.length; i++)
     {
    	 var option = document.createElement ('option');
    	 option.value = politics[i];
    	 var txt = document.createTextNode (politics[i]);
    	 option.appendChild (txt);
    	 nat2.appendChild (option);
     }
     for ( var i = 0; i < qualifications.length; i++)
     {
    	 var option = document.createElement ('option');
    	 option.value = qualifications[i];
    	 var txt = document.createTextNode (qualifications[i]);
    	 option.appendChild (txt);
    	 nat3.appendChild (option);
     }
    
 }