$(function() {
	
	
	
	

	/*为了平衡iframe自适应高度，和侧边的高度等于内容区的高度*/
	$("#rightMain").load(function() {
		var mainheight = $(this).contents().find("body").height() + 30;
		$(this).height(mainheight);
		var webHeight = $('.web_Personal_cont').height()
		var web_list = $('.web_list').height(webHeight - 135 + 'px')
	});

	/*个人中心left*/
	$('.web_list ul li').click(function() {
		$(this).addClass('web_aver').siblings().removeClass('web_aver')
	})

	/*通用弹窗*/
	$('.tcon').click(function() {
		var msg = $(this).attr('data-msg');
		layer.confirm(msg, {
			skin: 'sancu',
			closeBtn: 0,
			area: ['200px', 'auto'],
			//宽高
			title: '提示信息'
		}, function(index) {
			layer.closeAll();
			layer.msg('提交成功', {
				time: 2000
			});
		});
	});
	

	//方法封装
	var addCondition = function(th) {
		var id = th.attr("id");
		var text_ipt = th.next().text();
		if(text_ipt == "") {
			text_ipt = th.next().next().text();
		}
		var str = "<button name=" + "'" + id + "'" + " class='condition'>" + text_ipt + "<b><i class='close' ></i></b></button>";
		$(".blue_line>div").append(str);
	}

	var removeCondition = function(th) {
		var id = th.attr("id");
		var str = "[name=" + "'" + id + "'" + "]";
		$(str).remove();
	}

	//图片上传即时预览方法
	var ImageUpload = function(ts, obj, imgId) {
		//判断浏览器是否支持FileReader接口
		if(typeof FileReader == 'undefined') {
			alert("当前浏览器不支持FileReader接口");
			//使选择控件不可操作
			obj.attr("disabled", "disabled");
		}
		var file = ts.target.files[0];

		var reader = new FileReader();

		reader.onload = function(e) {
			imgId.attr("src", e.target.result);
			//或者 img.src = this.result;  //e.target == this
		}
		reader.readAsDataURL(file)
	}

	//选项卡切换
	$(".tab_li").click(function() {
		$(this).addClass("tab_active").siblings().removeClass("tab_active");
		var index = $(this).index();
		$(".tab_detail").eq(index).addClass("show_detail").siblings().removeClass("show_detail");
	})

	//搜素详情页中收藏按钮图片切换
	$(".list_heart img").click(function() {
		
		var src = $(this).attr("src");
		if(src == "../img/xq07.png") {
			$(this).attr("src", "../img/xq08.png")
			layer.msg('收藏成功', {
				time: 2000
			});
		} else {
			$(this).attr("src", "../img/xq07.png");
			layer.msg('取消收藏', {
				time: 2000
			});
		}
		
	})

	//客房详情中收藏按钮图片切换
	$(".heart img").click(function() {
		var src = $(this).attr("src");
		if(src == "../img/kf01.png") {
			$(this).attr("src", "../img/kf02.png");
			$('.text_stroct').html('')
		} else {
			$(this).attr("src", "../img/kf01.png");
			$('.text_stroct').html('已收藏')
		}
		event.preventDefault();
	})

	//搜素详情添加条件
	$(".address_type input[type=checkbox]").change(function() {
		var isChecked = $(this).is(":checked");
		if(isChecked == true) {
			$(this).next().css("color", "#0ba3ae");
			//添加条件
			addCondition($(this));
		} else {
			$(this).next().css("color", "#272727");
			//删除条件
			removeCondition($(this));
		}
	})

	//搜素详情删除条件
	$(".blue_line>div").on('click', '.condition', function() {
		var text = $(this).text();
		$(".address_type>div:first-child label").each(function() {
			if($(this).text() == text) {
				$(this).css("color", "#272727");
				var id = $(this).attr("for");
				var inputId = "#" + id;
				$(inputId).attr("checked", false);
				var imgId = $(this).attr("for");
				var str = "#" + imgId;
				$(str).removeClass("checkbox_active");
			}
		})
		$(this).remove();
	})

	//搜素详情条件全部删除
	$(".blue_line>div button:first-child").click(function() {
		$(this).siblings().remove();
		$(".address_type>div:first-child input").each(function() {
			$(this).attr("checked", false);
			$(this).removeClass("checkbox_active");
			$(this).next().css("color", "#272727");
		})
	})

	//注册商家头像上传
	$("#xdaTanFileImg").on("change", function(e) {
		ImageUpload(e, $("#xdaTanFileImg"), $("#xmTanImg"));
	})

	//营业执照上传
	$("#license").on("change", function(e) {
		ImageUpload(e, $("#license"), $("#licenseImg"));
	})
	$("#license1").on("change", function(e) {
		ImageUpload(e, $("#license1"), $("#licenseImg1"));
	})
	$("#license2").on("change", function(e) {
		ImageUpload(e, $("#license2"), $("#licenseImg2"));
	})
	$("#license3").on("change", function(e) {
		ImageUpload(e, $("#license3"), $("#licenseImg3"));
	})
	$("#license4").on("change", function(e) {
		ImageUpload(e, $("#license4"), $("#licenseImg4"));
	})
	$("#license5").on("change", function(e) {
		ImageUpload(e, $("#license5"), $("#licenseImg5"));
	})

	//填写订单按钮点击加减
	var num = $(".num").text();

	$(".pre_btn_rt").click(function() {
		num++;
		$(".num").html(num);
	})

	$(".pre_btn_lf").click(function() {
		if(num == 0) {
			return;
		}
		num--;
		$(".num").html(num);
	})

	/*添加入住人*/
	$(".addpson").click(function() {
		var ht = $(".message_detail_addpson")[0];
		var htt = $(ht).clone();
		$(this).before(htt);
		$(".trueP span").css("display","inline-block");
	})
	
	/*减少入住人*/
	$(".message_detail").on("click",".remove_person",function () {
		var len = $(".message_detail_addpson").length;
		if (len==2) {
			$(".trueP span").css("display","none");
		}
		$(this).parent().parent().remove();
	})
	
	/*优惠券说明弹窗*/
	$('.sinopr').click(function() {
		layer.open({
			type: 1,
			title: "优惠券说明",
			skin: 'wert', //样式类名
			move: false,
			closeBtn: 2, //不显示关闭按钮
			anim: 2,
			area: ['600px', '300px'],
			shadeClose: true, //开启遮罩关闭
			content: $("#sinopr").html()
		});
	});

	/*优惠券选项卡*/

	$('.fr_coupon ul li').click(function() {
		$(this).addClass('web_cou_aver').siblings().removeClass('web_cou_aver')

	})
	
	$('.getCoupon_a').click(function() {
		
		
		layer.open({
		  type: 2,
		  resize  : false,
		  closeBtn: 2,
		  title: false,
		  shadeClose: true,
		  shade: 0.8,
		  area: ['820px', '500px'],
		  content: '弹窗优惠卷.html' //iframe的url
		}); 
		
	});

	/*App点击二维码*/
	$(".header_bots span").click(function () {
		$(".header_bots .qr_code").show();
		$(this).css({"border-bottom-left-radius":0,"border-bottom-right-radius":0});
	})
	
	$("html").mousedown(function (e) {
		if($(e.target)!=$('.header_bots span')){
			$(".header_bots .qr_code").hide();
			$(".header_bots span").css("border-radius","5px");
		}
	})
	
	/*协议弹窗*/
	$('.agree_box span').click(function() {
		layer.open({
			type: 1,
			title: "协议说明",
			skin: 'wert', //样式类名
			move: false,
			closeBtn: 2, //不显示关闭按钮
			anim: 2,
			area: ['600px', '300px'],
			shadeClose: true, //开启遮罩关闭
			content: $("#agreement").html()
		});
	});
	
	
})



