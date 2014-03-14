var motf={},self,looper;motf.init=function(){document.addEventListener("backbutton",function(){},!1);self=this;self.poetScroll=0;self.pageNoFooter=["pLanding","pOffine"];self.pageFooterNoChange=["pPoetDetail","pDetailCreate","pUGCPoetDetail"];self.history=[];self.appWidth=window.innerWidth;self.appHeight=window.innerHeight;self.footerHandler();self.isPoemOn=!1;parse.init();self.goToPage("pLanding")};motf.footerHandler=function(){return $(".menu").each(function(e,t){$(this).css({left:e*motf.appWidth/4,width:motf.appWidth/4})})};motf.deployVideoList=function(e){var t=Handlebars.compile($("#tempPoet").html());return t(e)};motf.deployPoet=function(e){var t=Handlebars.compile($("#tempPoetDetail").html()),n={width:self.appWidth,height:self.appWidth*9/16};self.videoData[e].size=n;self.videoData[e].poem=replaceAll("\n","<br>",self.videoData[e].poem);return t(self.videoData[e])};motf.deployUGC=function(e){var t=Handlebars.compile($("#tempUGCPoetDetail").html());return t(self.UGCData[e])};motf.deployMap=function(){var e=Handlebars.compile($("#tempMap").html());return e()};motf.deployInfo=function(){var e=Handlebars.compile($("#tempInfo").html()),t={width:self.appWidth-35,height:(self.appWidth-35)*9/16,url:self.videoData[0].url};return e(t)};motf.deployCreate=function(){var e=Handlebars.compile($("#tempCreate").html());return e()};motf.deployDetailCreate=function(){var e=Handlebars.compile($("#tempDetailCreate").html());return e()};motf.deployOffline=function(){var e=Handlebars.compile($("#tempOffline").html());return e()};motf.goToPage=function(e){if(_.contains(self.pageNoFooter,e))$("footer").hide();else if(!_.contains(self.pageFooterNoChange,e)){if(e=="pMapAfterUGC"||e=="pMapAfterUGCPoetDetail")e="pMap";$("footer").show();$(".footerIcon").css({"-webkit-filter":"invert(100%)"});$("#icon"+e).css({"-webkit-filter":"invert(0%)"});$(".menuTitle").css({color:"white"});$("#menu"+e).find("p").css({color:"black"});$(".menu").removeClass().addClass("menu");$("#menu"+e).addClass("menuSelected")}switch(e){case"pOffline":return this.createPage("pOffline",self.deployOffline());case"pLanding":var t=Handlebars.compile($("#tempLanding").html()),n={loadText:"Retrieveing data..."};return this.createPage("pLanding",t(n));case"pPoets":return this.createPage("pPoetList",self.deployVideoList(self.videoData));case"pPoetDetail":return this.createPage("pPoetDetail",self.deployPoet(self.currPoet),"slide");case"pPoetDetailPrevNext":return this.createPage("pPoetDetail",self.deployPoet(self.currPoet));case"pUGCPoetDetail":return this.createPage("pUGCPoetDetail",self.deployUGC(self.currUGCData,"slide"));case"pMap":return this.createPage("pMap",self.deployMap());case"pMapAfterUGC":return this.createPage("pMapAfterUGC",self.deployMap());case"pMapAfterUGCPoetDetail":return this.createPage("pMapAfterUGCPoetDetail",self.deployMap());case"pInfo":return this.createPage("pInfo",self.deployInfo());case"pCreate":return this.createPage("pCreate",self.deployCreate());case"pDetailCreate":return this.createPage("pDetailCreate",self.deployDetailCreate(),"slide")}};motf.createPage=function(e,t,n){self.unbindAllListeners();n==undefined&&(n="fade");var r=makeid();this.history.push(r);$(".sectionContainer").append('<section class="page '+e+'" id="'+r+'">'+t+"</section>");if(n=="fade"){$("#"+r+"> header").appendTo(".appContainer");sys.os=="ios7"&&$("header").css({top:"18px"});$("#"+r).fadeIn("fast")}else if(n=="slide"){$("#"+r+"> header").appendTo(".appContainer");sys.os=="ios7"&&$("header").css({top:"18px"});$("#"+r).css({left:"100%",top:0,display:"block"});$("#"+r).animate({left:0},200)}if(self.history.length>1){console.log("removing prev page");return this.removeBefore(e)}self.bindEvent(e);return"first page created"};motf.removeBefore=function(e){return setTimeout(function(t){console.log(self.history[0]+" removed");$("#"+self.history[0]).remove();self.history.shift();self.bindEvent(e)},300)};motf.bindEvent=function(e){self.bindMenu();console.log("binding event for "+e);switch(e){case"pOffline":centerEl("#offlineMessage");$("#offlineMessage").show();$("footer").hide();looper=widow.setInterval(function(){$.ajax({url:"http://fiddle.jshell.net/favicon.png",success:function(e){self.goToPage("pLanding")},error:function(){}})},5e3);window.addEventListener("online",function(){self.goToPage("pLanding")});break;case"pLanding":self.currPage="pLanding";centerEl("#fetching");parse.fetchVideo();break;case"pPoetList":sys.os=="ios7"&&$("#listView").css({"padding-bottom":"72px"});self.currPage="pPoets";self.currPoet=-1;$(".page").animate({scrollTop:self.poetScroll},200);$(".page").scroll(function(e){self.poetScroll=$(this).scrollTop()});$(".listNode").on("tap",function(){self.currPoet=parseInt($(this).children().children().html());return self.goToPage("pPoetDetail")});break;case"pPoetDetail":$(".poemDetailBack").on("tap",function(){self.currPoet=-1;self.goToPage(self.currPage)});$(".poemDetailPrev").on("tap",function(){self.isPoemOn=!1;if(self.currPoet==0){self.currPoet=15;self.goToPage("pPoetDetailPrevNext")}else{self.currPoet-=1;self.goToPage("pPoetDetailPrevNext")}});$(".poemDetailNext").on("tap",function(){self.isPoemOn=!1;if(self.currPoet==15){self.currPoet=0;self.goToPage("pPoetDetailPrevNext")}else{self.currPoet+=1;self.goToPage("pPoetDetailPrevNext")}});$(".readPoem").on("tap",function(){if(self.isPoemOn){self.isPoemOn=!self.isPoemOn;$(".poem").slideUp("fast",function(){$(".page").animate({scrollTop:0},300);$(".readPoem").html("+ Read poem").removeClass("readPoemOn")})}else{self.isPoemOn=!self.isPoemOn;$(".readPoem").html("- Read poem").addClass("readPoemOn");$(".poem").slideDown("fast",function(){$(".page").animate({scrollTop:$(".poem").offset().top-100},300)})}});detailMap.init();detailMap.zoom(self.currPoet);$("#detailNodeMap").on("tap",function(){self.goToPage("pMap")});break;case"pMapAfterUGC":self.currPage="pMap";mapView.init([self.UGCData[self.UGCData.length-1].lat,self.UGCData[self.UGCData.length-1].lng]);mapView.feedVideo();mapView.feedUGC();mapView.zoomUGC(self.UGCData.length-1);mapView.detectUserLocation();break;case"pMapAfterUGCPoetDetail":self.currPage="pMap";mapView.init([self.UGCData[self.currUGCData].lat,self.UGCData[self.currUGCData].lng]);mapView.feedVideo();mapView.feedUGC();mapView.zoomUGC(self.currUGCData);mapView.detectUserLocation();break;case"pMap":self.currPage="pMap";if(self.currPoet>-1){mapView.init(self.videoData[self.currPoet].geoData);mapView.feedVideo();mapView.feedUGC();mapView.zoom(self.currPoet);mapView.detectUserLocation()}else{mapView.init();mapView.feedVideo();mapView.feedUGC();mapView.detectUserLocation()}$("#clientLocate").on("tap",function(){mapView.clientLocate()});break;case"pCreate":self.currPage="pCreate";var t=!1;UGCMapView.init();centerEl("#crosshair");UGCMapView.map.on("move",function(){if(!t){$("#ugcAddPoem").fadeIn("fast").on("tap",function(){UGCMapView.capture();self.goToPage("pDetailCreate")});t=!0}});break;case"pDetailCreate":$("input, textarea").on("tap",function(){$(this).focus()});centerEl(".submitCoverContainer");$(".ugcBack").on("tap",function(){self.goToPage("pCreate")});$("#ugcCreateBtn").on("tap",function(){$("input, textarea").blur();setTimeout(function(){window.scrollTo(0,0)},0);var e=$("#ugcTitle").val(),t=$("#ugcContent").val(),n=$("#ugcAuthor").val();console.log("### processing UGC");e.length>3&&t.length>3&&n.length<20?parse.storeUGC(UGCMapView.lat,UGCMapView.lng,n,e,t):t.length<4?sys.os=="web"?alert("Your input is too short. Please try again."):navigator.notification.alert("Please enter a longer poem.",function(){},"Poem Too Short","OK"):e.length<4?sys.os=="web"?alert("Your input is too short. Please try again."):navigator.notification.alert("Please enter a longer title.",function(){},"Title Too Short","OK"):n.length>20&&(sys.os=="web"?alert("Your input is too short. Please try again."):navigator.notification.alert("Please enter a shorter name.",function(){},"Name Too Long","OK"))});break;case"pUGCPoetDetail":$(".UGCPoemDetailBack").on("tap",function(){self.goToPage("pMapAfterUGCPoetDetail")})}};motf.bindMenu=function(){console.log("binding menu");$(".menu").on("tap",function(){var e=$(this).attr("title");self.currPoet=-1;self.goToPage(e)})};motf.unbindAllListeners=function(){$("*").unbind("tap");$("#ugcAddPoem").hide();detailMap.map=null;mapView.map=null;UGCMapView.map=null;$("#submitCover").hide();$("header").remove();window.clearInterval(looper)};var sys={os:null,init:function(){sys.os=checkSystem();if(sys.os=="web")motf.init();else if(sys.os=="ios7"){$(".sectionContainer").addClass("ios7");sys.bindEvents()}else sys.bindEvents()},bindEvents:function(){document.addEventListener("deviceready",this.onDeviceReady,!1)},onDeviceReady:function(){motf.init();sys.receivedEvent("geolocation")},receivedEvent:function(e){function n(e){alert("code: "+e.code+"\n"+"message: "+e.message+"\n")}var t=function(e){alert("Latitude: "+e.coords.latitude+"\n"+"Longitude: "+e.coords.longitude+"\n"+"Altitude: "+e.coords.altitude+"\n"+"Accuracy: "+e.coords.accuracy+"\n"+"Altitude Accuracy: "+e.coords.altitudeAccuracy+"\n"+"Heading: "+e.coords.heading+"\n"+"Speed: "+e.coords.speed+"\n"+"Timestamp: "+e.timestamp+"\n")}}};sys.init();