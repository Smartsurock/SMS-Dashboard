//========================================================
//ImageBackGround
function ibg() {
	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg();
//========================================================
//WebP
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else {
		document.querySelector('body').classList.add('no-webp');
	}
});
//========================================================
// Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let delay = 500;
	let body = document.querySelector("body");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", (e) => {
		if (!body.classList.contains("wait")) {
			body_lock(delay);
			iconMenu.classList.toggle("active");
			menuBody.classList.toggle("active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.toggle("active");
	menuBody.classList.toggle("active");
}

document.addEventListener("click", function (e) {
	// console.log(e);
	if (!e.target.closest(".menu, .icon-menu")) {
		let user_menu = document.querySelector(".menu__body");
		user_menu.classList.remove("active");
		let user_icon = document.querySelector(".icon-menu");
		user_icon.classList.remove("active");
	}
});

//========================================================

//BodyLock
function body_lock(delay) {
	var body = document.querySelector("body");
	if (body.classList.contains('lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}

function body_lock_remove(delay) {
	var body = document.querySelector("body");
	if (!body.classList.contains('wait')) {
		var lock_padding = document.querySelectorAll(".lp");
		setTimeout(function () {
			for (var index = 0; index < lock_padding.length; index++) {
				var el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("lock");
		}, delay);
		body.classList.add("wait");
		setTimeout(function () {
			body.classList.remove("wait");
		}, delay);
	}
}

function body_lock_add(delay) {
	var body = document.querySelector("body");
	if (!body.classList.contains('wait')) {
		var lock_padding = document.querySelectorAll(".lp");
		for (var index = 0; index < lock_padding.length; index++) {
			var el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("lock");
		body.classList.add("wait");
		setTimeout(function () {
			body.classList.remove("wait");
		}, delay);
	}
}
//========================================================
/*
<div class="form__line">
<input autocomplete="off" type="text" name="form[]" data-value="First Name" class="input req" />
</div>

<div class="form__area">
<textarea autocomplete="off" name="form[]" data-value="Message" class="input"></textarea>
</div>

<div class="form__checkbox">
<label>
<input type="checkbox" name="subscribe" value="yes">
<span>subscribe to the newsletter</span>
</label>
</div>

<div class="form__button">
<button type="submit" class="form__btn">SEND</button>
</div>

<div class="header__search search">
<div class="search__line">
	<a href="#" class="search__btn"><i class="fa fa-search" aria-hidden="true"></i></a>
	<input class="search__text" autocomplete="off" data-value="Search" type="text">
</div>
</div>
*/
//========================================================
//FORMS
function forms() {
	//SELECT
	if ($('select').length > 0) {
		function selectscrolloptions() {
			var scs = 100;
			var mss = 50;
			if (isMobile.any()) {
				scs = 10;
				mss = 1;
			}
			var opt = {
				cursorcolor: "#9B4E7C",
				cursorwidth: "12px",
				background: "",
				autohidemode: false,
				bouncescroll: false,
				cursorborderradius: "10px",
				scrollspeed: scs,
				mousescrollstep: mss,
				directionlockdeadzone: 0,
				cursorborder: "0px solid #fff",
			};
			return opt;
		}

		function select() {
			$.each($('select'), function (index, val) {
				var ind = index;
				$(this).hide();
				if ($(this).parent('.select-block').length == 0) {
					$(this).wrap("<div class='select-block " + $(this).attr('class') + "-select-block'></div>");
				} else {
					$(this).parent('.select-block').find('.select').remove();
				}
				let cl = '';
				var milti = '';
				var check = '';
				var sblock = $(this).parent('.select-block');
				var soptions = "<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if ($(this).attr('multiple') == 'multiple') {
					milti = 'multiple';
					check = 'check';
				}
				$.each($(this).find('option'), function (index, val) {
					if ($(this).attr('class') != '' && $(this).attr('class') != null) {
						let cl = $(this).attr('class');
					}
					if ($(this).attr('value') != '') {
						if ($(this).attr('data-icon') != '' && $(this).attr('data-icon') != null) {
							soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + cl + " " + check + "'><div><img src=" + $(this).attr('data-icon') + " alt=\"\"></div><div>" + $(this).html() + "</div></div>";
						} else {
							soptions = soptions + "<div data-value='" + $(this).attr('value') + "' class='select-options__value_" + ind + " select-options__value value_" + $(this).val() + " " + cl + " " + check + "'>" + $(this).html() + "</div>";
						}
					} else if ($(this).parent().attr('data-label') == 'on') {
						if (sblock.find('.select__label').length == 0) {
							sblock.prepend('<div class="select__label">' + $(this).html() + '</div>');
						}
					}
				});
				soptions = soptions + "</div></div></div>";
				if ($(this).attr('data-type') == 'search') {
					sblock.append("<div data-type='search' class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<input data-value='" + $(this).find('option[selected="selected"]').html() + "' class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "' />" +
						"</div>" +
						soptions +
						"</div>");
					$('.select_' + ind).find('input.select-title__value').jcOnPageFilter({
						parentSectionClass: 'select-options_' + ind,
						parentLookupClass: 'select-options__value_' + ind,
						childBlockClass: 'select-options__value_' + ind
					});
				} else if ($(this).attr('data-icon') == 'true') {
					sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select icon " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'><div><img src=" + $(this).find('option[selected="selected"]').attr('data-icon') + " alt=\"\"></div><div>" + $(this).find('option[selected="selected"]').html() + "</div></div>" +
						"</div>" +
						soptions +
						"</div>");
				} else {
					sblock.append("<div class='select_" + ind + " select" + " " + $(this).attr('class') + "__select " + milti + "'>" +
						"<div class='select-title'>" +
						"<div class='select-title__arrow ion-ios-arrow-down'></div>" +
						"<div class='select-title__value value_" + $(this).find('option[selected="selected"]').val() + "'>" + $(this).find('option[selected="selected"]').html() + "</div>" +
						"</div>" +
						soptions +
						"</div>");
				}
				if ($(this).find('option[selected="selected"]').val() != '') {
					sblock.find('.select').addClass('focus');
				}

				if (sblock.find('.select-options__value').length == 1) {
					sblock.find('.select').addClass('one');
				}

				if ($(this).attr('data-req') == 'on') {
					$(this).addClass('req');
				}
				$(".select_" + ind + " .select-options-scroll").niceScroll('.select-options-list', selectscrolloptions());
			});
		}
		select();

		$('body').on('keyup', 'input.select-title__value', function () {
			$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
			$(this).parents('.select').addClass('active');
			$(this).parents('.select').find('.select-options').slideDown(50, function () {
				$(this).find(".select-options-scroll").getNiceScroll().resize();
			});
			$(this).parents('.select-block').find('select').val('');
		});
		$('body').on('click', '.select', function () {
			if (!$(this).hasClass('disabled') && !$(this).hasClass('one')) {
				$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
				$(this).toggleClass('active');
				$(this).find('.select-options').slideToggle(50, function () {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if ($(this).attr('data-type') == 'search') {
					if (!$(this).hasClass('active')) {
						searchselectreset();
					}
					$(this).find('.select-options__value').show();
				}


				var cl = $.trim($(this).find('.select-title__value').attr('class').replace('select-title__value', ''));
				$(this).find('.select-options__value').show().removeClass('hide').removeClass('last');
				if (cl != '') {
					$(this).find('.select-options__value.' + cl).hide().addClass('hide');
				}
				if ($(this).find('.select-options__value').last().hasClass('hide')) {
					$(this).find('.select-options__value').last().prev().addClass('last');
				}
			}
		});
		$('body').on('click', '.select-options__value', function () {
			if ($(this).parents('.select').hasClass('multiple')) {
				if ($(this).hasClass('active')) {
					if ($(this).parents('.select').find('.select-title__value span').length > 0) {
						$(this).parents('.select').find('.select-title__value').append('<span data-value="' + $(this).data('value') + '">, ' + $(this).html() + '</span>');
					} else {
						$(this).parents('.select').find('.select-title__value').data('label', $(this).parents('.select').find('.select-title__value').html());
						$(this).parents('.select').find('.select-title__value').html('<span data-value="' + $(this).data('value') + '">' + $(this).html() + '</span>');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', true);
					$(this).parents('.select').addClass('focus');
				} else {
					$(this).parents('.select').find('.select-title__value').find('span[data-value="' + $(this).data('value') + '"]').remove();
					if ($(this).parents('.select').find('.select-title__value span').length == 0) {
						$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
						$(this).parents('.select').removeClass('focus');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index() + 1).prop('selected', false);
				}
				return false;
			}


			if ($(this).parents('.select').attr('data-type') == 'search') {
				$(this).parents('.select').find('.select-title__value').val($(this).html());
				$(this).parents('.select').find('.select-title__value').attr('data-value', $(this).html());
			} else {
				$(this).parents('.select').find('.select-title__value').attr('class', 'select-title__value value_' + $(this).data('value'));
				$(this).parents('.select').find('.select-title__value').html($(this).html());

			}

			$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
			if ($.trim($(this).data('value')) != '') {
				$(this).parents('.select-block').find('select').val($(this).data('value'));
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).data('value') + '"]').attr('selected', 'selected');
			} else {
				$(this).parents('.select-block').find('select').val($(this).html());
				$(this).parents('.select-block').find('select').find('option[value="' + $(this).html() + '"]').attr('selected', 'selected');
			}


			if ($(this).parents('.select-block').find('select').val() != '') {
				$(this).parents('.select-block').find('.select').addClass('focus');
			} else {
				$(this).parents('.select-block').find('.select').removeClass('focus');

				$(this).parents('.select-block').find('.select').removeClass('err');
				$(this).parents('.select-block').parent().removeClass('err');
				$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
			}
			if (!$(this).parents('.select').data('tags') != "") {
				if ($(this).parents('.form-tags').find('.form-tags__item[data-value="' + $(this).data('value') + '"]').length == 0) {
					$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="' + $(this).data('value') + '" href="" class="form-tags__item">' + $(this).html() + '<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents('.select-block').find('select').change();

			if ($(this).parents('.select-block').find('select').data('update') == 'on') {
				select();
			}
		});
		$(document).on('click touchstart', function (e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () { });
				searchselectreset();
			};
		});
		$(document).on('keydown', function (e) {
			if (e.which == 27) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50, function () { });
				searchselectreset();
			}
		});
	}
	//FIELDS
	$('input,textarea').focus(function () {
		if ($(this).val() == $(this).attr('data-value')) {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).attr('data-type') == 'pass') {
				$(this).attr('type', 'password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function () {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			} else {
				this.value = $(this).attr('data-value');
			}
		}
		if (this.value != $(this).attr('data-value') && this.value != '') {
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if ($(this).hasClass('l') && $(this).parent().find('.form__label').length == 0) {
				$(this).parent().append('<div class="form__label">' + $(this).attr('data-value') + '</div>');
			}
		}

		$(this).click(function () {
			if (this.value == $(this).attr('data-value')) {
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'password');
				};
				this.value = '';
			};
		});
		$(this).blur(function () {
			if (this.value == '') {
				if (!$(this).hasClass('l')) {
					this.value = $(this).attr('data-value');
				}
				$(this).removeClass('focus');
				$(this).parent().removeClass('focus');
				if ($(this).attr('data-type') == 'pass') {
					$(this).attr('type', 'text');
				};
			};
			if ($(this).hasClass('vn')) {
				formValidate($(this));
			}
		});
	});
	$('.form-input__viewpass').click(function (event) {
		if ($(this).hasClass('active')) {
			$(this).parent().find('input').attr('type', 'password');
		} else {
			$(this).parent().find('input').attr('type', 'text');
		}
		$(this).toggleClass('active');
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});


	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($('input.phone'), function (index, val) {
		$(this).attr('type', 'tel');
		$(this).focus(function () {
			$(this).inputmask('+7(999) 999 9999', {
				clearIncomplete: true, clearMaskOnLostFocus: true,
				"onincomplete": function () { maskclear($(this)); }
			});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.phone').focusout(function (event) {
		maskclear($(this));
	});
	$.each($('input.num'), function (index, val) {
		$(this).focus(function () {
			$(this).inputmask('9{1,1000}', { clearIncomplete: true, placeholder: "", clearMaskOnLostFocus: true, "onincomplete": function () { maskclear($(this)); } });
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.num').focusout(function (event) {
		maskclear($(this));
	});
	/*
	$.each($('input.date'), function(index, val) {
		$(this).focus(function(){
			$(this).inputmask('dd.mm.yyyy',{
				clearIncomplete: true,
				placeholder:"_",
				//yearrange:{'minyear':n-40,'maxyear':n},
				clearMaskOnLostFocus: true,
				"onincomplete": function(){maskclear($(this));},
				"oncomplete": function(){
					$(this).datepicker("setDate",$(this).val());
				}
			});
			$(this).addClass('focus');
			$(this).parents('.form-column').addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
		$(this).focusout(function(event) {
			maskclear($(this));
		});
		$(this).datepicker({
			dateFormat : "dd.mm.yy",
			//yearRange: "1915:2015",
			//defaultDate: '-18Y', 
			//inDate: '-85Y', 
			//maxDate: "0Y",
			beforeShow :function(event){
				$('.ui-datepicker').show();
			},
			onSelect:function(event){
				if($(this).val()!=$(this).attr('data-value') && $(this).val()!=''){
					$(this).addClass('focus');
					$(this).parent().addClass('focus');
					if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
						$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
					}
				}
			}
		});
	});
	*/

	//CHECK
	$.each($('.check'), function (index, val) {
		if ($(this).find('input').prop('checked') == true) {
			$(this).addClass('active');
		}
	});
	$('body').off('click', '.check', function (event) { });
	$('body').on('click', '.check', function (event) {
		if (!$(this).hasClass('disable')) {
			var target = $(event.target);
			if (!target.is("a")) {
				$(this).toggleClass('active');
				if ($(this).hasClass('active')) {
					$(this).find('input').prop('checked', true);
				} else {
					$(this).find('input').prop('checked', false);
				}
			}
		}
	});

	//OPTION
	$.each($('.option.active'), function (index, val) {
		$(this).find('input').prop('checked', true);
	});
	$('.option').click(function (event) {
		if (!$(this).hasClass('disable')) {
			var target = $(event.target);
			if (!target.is("a")) {
				if ($(this).hasClass('active') && $(this).hasClass('order')) {
					$(this).toggleClass('orderactive');
				}
				$(this).parents('.options').find('.option').removeClass('active');
				$(this).toggleClass('active');
				$(this).children('input').prop('checked', true);
			}
		}
	});
	//RATING
	$('.rating.edit .star').hover(function () {
		var block = $(this).parents('.rating');
		block.find('.rating__activeline').css({ width: '0%' });
		var ind = $(this).index() + 1;
		var linew = ind / block.find('.star').length * 100;
		setrating(block, linew);
	}, function () {
		var block = $(this).parents('.rating');
		block.find('.star').removeClass('active');
		var ind = block.find('input').val();
		var linew = ind / block.find('.star').length * 100;
		setrating(block, linew);
	});
	$('.rating.edit .star').click(function (event) {
		var block = $(this).parents('.rating');
		var re = $(this).index() + 1;
		block.find('input').val(re);
		var linew = re / block.find('.star').length * 100;
		setrating(block, linew);
	});
	$.each($('.rating'), function (index, val) {
		var ind = $(this).find('input').val();
		var linew = ind / $(this).parent().find('.star').length * 100;
		setrating($(this), linew);
	});
	function setrating(th, val) {
		th.find('.rating__activeline').css({ width: val + '%' });
	}
	//QUANTITY
	$('.quantity__btn').click(function (event) {
		var n = parseInt($(this).parent().find('.quantity__input').val());
		if ($(this).hasClass('dwn')) {
			n = n - 1;
			if (n < 1) { n = 1; }
		} else {
			n = n + 1;
		}
		$(this).parent().find('.quantity__input').val(n);
		return false;
	});
	//RANGE
	if ($("#range").length > 0) {
		$("#range").slider({
			range: true,
			min: 0,
			max: 5000,
			values: [0, 5000],
			slide: function (event, ui) {
				$('#rangefrom').val(ui.values[0]);
				$('#rangeto').val(ui.values[1]);
				$(this).find('.ui-slider-handle').eq(0).html('<span>' + ui.values[0] + '</span>');
				$(this).find('.ui-slider-handle').eq(1).html('<span>' + ui.values[1] + '</span>');
			},
			change: function (event, ui) {
				if (ui.values[0] != $("#range").slider("option", "min") || ui.values[1] != $("#range").slider("option", "max")) {
					$('#range').addClass('act');
				} else {
					$('#range').removeClass('act');
				}
			}
		});
		$('#rangefrom').val($("#range").slider("values", 0));
		$('#rangeto').val($("#range").slider("values", 1));

		$("#range").find('.ui-slider-handle').eq(0).html('<span>' + $("#range").slider("option", "min") + '</span>');
		$("#range").find('.ui-slider-handle').eq(1).html('<span>' + $("#range").slider("option", "max") + '</span>');

		$("#rangefrom").bind("change", function () {
			if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
				$(this).val($("#range").slider("option", "max"));
			}
			if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
				$(this).val($("#range").slider("option", "min"));
			}
			$("#range").slider("values", 0, $(this).val());
		});
		$("#rangeto").bind("change", function () {
			if ($(this).val() * 1 > $("#range").slider("option", "max") * 1) {
				$(this).val($("#range").slider("option", "max"));
			}
			if ($(this).val() * 1 < $("#range").slider("option", "min") * 1) {
				$(this).val($("#range").slider("option", "min"));
			}
			$("#range").slider("values", 1, $(this).val());
		});
		$("#range").find('.ui-slider-handle').eq(0).addClass('left');
		$("#range").find('.ui-slider-handle').eq(1).addClass('right');
	}
	//ADDFILES
	$('.form-addfile__input').change(function (e) {
		if ($(this).val() != '') {
			var ts = $(this);
			ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
			$.each(e.target.files, function (index, val) {
				if (ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("' + e.target.files[index].name + '")').length == 0) {
					ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>' + e.target.files[index].name + '</li>');
				}
			});
		}
	});
}
forms();

function digi(str) {
	var r = str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

//VALIDATE FORMS
$('form button[type=submit]').click(function () {
	var er = 0;
	var form = $(this).parents('form');
	var ms = form.data('ms');
	$.each(form.find('.req'), function (index, val) {
		er += formValidate($(this));
	});
	if (er == 0) {
		removeFormError(form);
		/*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

		//ОПТРАВКА ФОРМЫ
		/*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/
		if (ms != null && ms != '') {
			showMessageByClass(ms);
			return false;
		}
	} else {
		return false;
	}
});
function formValidate(input) {
	var er = 0;
	var form = input.parents('form');
	if (input.attr('name') == 'email' || input.hasClass('email')) {
		if (input.val() != input.attr('data-value')) {
			var em = input.val().replace(" ", "");
			input.val(em);
		}
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.val())) || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	} else {
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			er++;
			addError(input);
		} else {
			removeError(input);
		}
	}
	if (input.attr('type') == 'checkbox') {
		if (input.prop('checked') == true) {
			input.removeClass('err').parent().removeClass('err');
		} else {
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if (input.hasClass('name')) {
		if (!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))) {
			er++;
			addError(input);
		}
	}
	if (input.hasClass('pass-2')) {
		if (form.find('.pass-1').val() != form.find('.pass-2').val()) {
			addError(input);
		} else {
			removeError(input);
		}
	}
	return er;
}
function formLoad() {
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms) {
	$('.popup').hide();
	popupOpen('message.' + ms, '');
}
function showMessage(html) {
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form) {
	$.each(form.find('.input'), function (index, val) {
		$(this).removeClass('focus').val($(this).data('value'));
		$(this).parent().removeClass('focus');
		if ($(this).hasClass('phone')) {
			maskclear($(this));
		}
	});
}
function addError(input) {
	input.addClass('err');
	input.parent().addClass('err');
	input.parent().find('.form__error').remove();
	if (input.hasClass('email')) {
		var error = '';
		if (input.val() == '' || input.val() == input.attr('data-value')) {
			error = input.data('error');
		} else {
			error = input.data('error');
		}
		if (error != null) {
			input.parent().append('<div class="form__error">' + error + '</div>');
		}
	} else {
		if (input.data('error') != null && input.parent().find('.form__error').length == 0) {
			input.parent().append('<div class="form__error">' + input.data('error') + '</div>');
		}
	}
	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form, input__name, error_text) {
	var input = form.find('[name="' + input__name + '"]');
	input.attr('data-error', error_text);
	addError(input);
}
function addFormError(form, error_text) {
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form) {
	form.find('.form__generalerror').hide().html('');
}
function removeError(input) {
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if (input.parents('.select-block').length > 0) {
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form) {
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}
function maskclear(n) {
	if (n.val() == "") {
		n.inputmask('remove');
		if (!n.hasClass('l')) {
			n.val(n.attr('data-value'));
		}
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}
function searchselectreset() {
	$.each($('.select[data-type="search"]'), function (index, val) {
		var block = $(this).parent();
		var select = $(this).parent().find('select');
		if ($(this).find('.select-options__value:visible').length == 1) {
			$(this).addClass('focus');
			$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
			$(this).find('.select-title__value').val($('.select-options__value:visible').html());
			$(this).find('.select-title__value').attr('data-value', $('.select-options__value:visible').html());
		} else if (select.val() == '') {
			$(this).removeClass('focus');
			block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
			block.find('input.select-title__value').attr('data-value', select.find('option[selected="selected"]').html());
		}
	});
}
//========================================================
//Click
$(".features").on("click", function () {
	$(this).toggleClass("active")
	// $(this).parent().toggleClass("active")
});

// let user_icon = document.querySelector(".filter__arrow");
// user_icon.addEventListener("click", function (e) {
// 	let user_menu = document.querySelector(".filter__menu");
// 	user_menu.classList.toggle("active");
// });

document.addEventListener("click", function (e) {
	// console.log(e);
	if (!e.target.closest(".features")) {
		let user_menu = document.querySelector(".features");
		user_menu.classList.remove("active");
	}
});
//========================================================
//GoTo
$('.goto').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 50;
	$('body,html').animate({ scrollTop: $('.' + el).offset().top - offset }, 500, function () { });
	if ($('.menu__body').hasClass('active')) {
		$('.menu__body,.icon-menu').removeClass('active');
		$('body').removeClass('lock');
	}
	return false;
});

//Focus on click
$('.header__trial, .header__btn-1').on('click', function () {
	setTimeout(() => { $('.fox').focus(); }, 1000);
});

$('.goto1').click(function () {
	var el = $(this).attr('href').replace('#', '');
	var offset = 0;
	$('body,html').animate({ scrollTop: $('.' + el).offset().top - offset }, 500, function () { });
	if ($('.menu__body').hasClass('active')) {
		$('.menu__body,.icon-menu').removeClass('active');
		$('body').removeClass('lock');
	}
	return false;
});

//For - position: fixed;
// $('.goto').click(function () {
// 	var el = $(this).attr('href').replace('#', '');
// 	var offset = 0;
// 	$('body,html').animate({ scrollTop: $('.' + el).offset().top - $('.header').outerHeight() }, 500, function () { });
// 	if ($('.menu__body').hasClass('active')) {
// 		$('.menu__body,.icon-menu').removeClass('active');
// 		$('body').removeClass('lock');
// 	}
// 	return false;
// });
//========================================================
//PopUp
const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelectorAll("body");
const lockPadding = document.querySelectorAll(".lock-padding");
let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute("href").replace("#", "");
			const curentPopup = document.getElementById(popupName).parentElement;
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll(".close-popup");
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener("click", function (e) {
			popupClose(el.closest(".popup"));
			e.preventDefault();
		});
	}
}
function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector(".popup.open");
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add("open");
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest(".popup__content, .popup__image")) {
				popupClose(e.target.closest(".popup"));
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove("open");
		if (doUnlock) {
			bodyUnLock();
		}
	}
}
function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	document.body.style.paddingRight = lockPaddingValue;
	document.body.classList.add("lock");
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
function bodyUnLock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = "0px";
			}
		}
		document.body.style.paddingRight = "0px";
		document.body.classList.remove("lock");
	}, timeout);
	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}
document.addEventListener("keydown", function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector(".popup.open");
		popupClose(popupActive);
	}
});
//========================================================
// Dynamic Adaptiv v.1
// HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
// Example: data-move="menu__body,1,767"
var move_array = [];
var move_objects = document.querySelectorAll("[data-move]");

if (move_objects.length > 0) {
	for (var _index10 = 0; _index10 < move_objects.length; _index10++) {
		var _el6 = move_objects[_index10];
		var data_move = _el6.getAttribute("data-move");
		if (data_move != "" || data_move != null) {
			_el6.setAttribute("data-move-index", _index10);
			move_array[_index10] = {
				parent: _el6.parentNode,
				index: index_in_parent(_el6)
			};
		}
	}
}

function dynamic_adapt() {
	var w = document.querySelector("body").offsetWidth;
	if (move_objects.length > 0) {
		for (var _index11 = 0; _index11 < move_objects.length; _index11++) {
			var _el7 = move_objects[_index11];
			var _data_move = _el7.getAttribute("data-move");
			if (_data_move != "" || _data_move != null) {
				var data_array = _data_move.split(",");
				var data_parent = document.querySelector("." + data_array[0]);
				var data_index = data_array[1];
				var data_bp = data_array[2];
				if (w < data_bp) {
					if (!_el7.classList.contains("js-move_done_" + data_bp)) {
						if (data_index > 0) {
							//insertAfter
							var actual_index = index_of_elements(data_parent)[data_index];
							data_parent.insertBefore(_el7, data_parent.childNodes[actual_index]);
						} else {
							data_parent.insertBefore(_el7, data_parent.firstChild);
						}
						_el7.classList.add("js-move_done_" + data_bp);
					}
				} else {
					if (_el7.classList.contains("js-move_done_" + data_bp)) {
						dynamic_adaptive_back(_el7);
						_el7.classList.remove("js-move_done_" + data_bp);
					}
				}
			}
		}
	}
	custom_adapt(w);
}

function dynamic_adaptive_back(el) {
	var index_original = el.getAttribute("data-move-index");
	var move_place = move_array[index_original];
	var parent_place = move_place["parent"];
	var index_place = move_place["index"];
	if (index_place > 0) {
		//insertAfter
		var actual_index = index_of_elements(parent_place)[index_place];
		parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
	} else {
		parent_place.insertBefore(el, parent_place.firstChild);
	}
}

function index_in_parent(node) {
	var children = node.parentNode.childNodes;
	var num = 0;
	for (var _i2 = 0; _i2 < children.length; _i2++) {
		if (children[_i2] == node) return num;
		if (children[_i2].nodeType == 1) num++;
	}
	return -1;
}

function index_of_elements(parent) {
	var children = [];
	for (var _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
		if (parent.childNodes[_i3].nodeType == 1 && parent.childNodes[_i3].getAttribute("data-move") == null) {
			children.push(_i3);
		}
	}
	return children;
}

window.addEventListener("resize", function (event) {
	dynamic_adapt();
});
dynamic_adapt();

function custom_adapt(w) { }
//========================================================
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['module', 'exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(module, exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod, mod.exports);
		global.WOW = mod.exports;
	}
})(this, function (module, exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _class, _temp;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function isIn(needle, haystack) {
		return haystack.indexOf(needle) >= 0;
	}

	function extend(custom, defaults) {
		for (var key in defaults) {
			if (custom[key] == null) {
				var value = defaults[key];
				custom[key] = value;
			}
		}
		return custom;
	}

	function isMobile(agent) {
		return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(agent)
		);
	}

	function createEvent(event) {
		var bubble = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
		var cancel = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
		var detail = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

		var customEvent = void 0;
		if (document.createEvent != null) {
			// W3C DOM
			customEvent = document.createEvent('CustomEvent');
			customEvent.initCustomEvent(event, bubble, cancel, detail);
		} else if (document.createEventObject != null) {
			// IE DOM < 9
			customEvent = document.createEventObject();
			customEvent.eventType = event;
		} else {
			customEvent.eventName = event;
		}

		return customEvent;
	}

	function emitEvent(elem, event) {
		if (elem.dispatchEvent != null) {
			// W3C DOM
			elem.dispatchEvent(event);
		} else if (event in (elem != null)) {
			elem[event]();
		} else if ('on' + event in (elem != null)) {
			elem['on' + event]();
		}
	}

	function addEvent(elem, event, fn) {
		if (elem.addEventListener != null) {
			// W3C DOM
			elem.addEventListener(event, fn, false);
		} else if (elem.attachEvent != null) {
			// IE DOM
			elem.attachEvent('on' + event, fn);
		} else {
			// fallback
			elem[event] = fn;
		}
	}

	function removeEvent(elem, event, fn) {
		if (elem.removeEventListener != null) {
			// W3C DOM
			elem.removeEventListener(event, fn, false);
		} else if (elem.detachEvent != null) {
			// IE DOM
			elem.detachEvent('on' + event, fn);
		} else {
			// fallback
			delete elem[event];
		}
	}

	function getInnerHeight() {
		if ('innerHeight' in window) {
			return window.innerHeight;
		}

		return document.documentElement.clientHeight;
	}

	// Minimalistic WeakMap shim, just in case.
	var WeakMap = window.WeakMap || window.MozWeakMap || function () {
		function WeakMap() {
			_classCallCheck(this, WeakMap);

			this.keys = [];
			this.values = [];
		}

		_createClass(WeakMap, [{
			key: 'get',
			value: function get(key) {
				for (var i = 0; i < this.keys.length; i++) {
					var item = this.keys[i];
					if (item === key) {
						return this.values[i];
					}
				}
				return undefined;
			}
		}, {
			key: 'set',
			value: function set(key, value) {
				for (var i = 0; i < this.keys.length; i++) {
					var item = this.keys[i];
					if (item === key) {
						this.values[i] = value;
						return this;
					}
				}
				this.keys.push(key);
				this.values.push(value);
				return this;
			}
		}]);

		return WeakMap;
	}();

	// Dummy MutationObserver, to avoid raising exceptions.
	var MutationObserver = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (_temp = _class = function () {
		function MutationObserver() {
			_classCallCheck(this, MutationObserver);

			if (typeof console !== 'undefined' && console !== null) {
				console.warn('MutationObserver is not supported by your browser.');
				console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.');
			}
		}

		_createClass(MutationObserver, [{
			key: 'observe',
			value: function observe() { }
		}]);

		return MutationObserver;
	}(), _class.notSupported = true, _temp);

	// getComputedStyle shim, from http://stackoverflow.com/a/21797294
	var getComputedStyle = window.getComputedStyle || function getComputedStyle(el) {
		var getComputedStyleRX = /(\-([a-z]){1})/g;
		return {
			getPropertyValue: function getPropertyValue(prop) {
				if (prop === 'float') {
					prop = 'styleFloat';
				}
				if (getComputedStyleRX.test(prop)) {
					prop.replace(getComputedStyleRX, function (_, _char) {
						return _char.toUpperCase();
					});
				}
				var currentStyle = el.currentStyle;

				return (currentStyle != null ? currentStyle[prop] : void 0) || null;
			}
		};
	};

	var WOW = function () {
		function WOW() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			_classCallCheck(this, WOW);

			this.defaults = {
				boxClass: 'wow',
				animateClass: 'animated',
				offset: 0,
				mobile: true,
				live: true,
				callback: null,
				scrollContainer: null
			};

			this.animate = function animateFactory() {
				if ('requestAnimationFrame' in window) {
					return function (callback) {
						return window.requestAnimationFrame(callback);
					};
				}
				return function (callback) {
					return callback();
				};
			}();

			this.vendors = ['moz', 'webkit'];

			this.start = this.start.bind(this);
			this.resetAnimation = this.resetAnimation.bind(this);
			this.scrollHandler = this.scrollHandler.bind(this);
			this.scrollCallback = this.scrollCallback.bind(this);
			this.scrolled = true;
			this.config = extend(options, this.defaults);
			if (options.scrollContainer != null) {
				this.config.scrollContainer = document.querySelector(options.scrollContainer);
			}
			// Map of elements to animation names:
			this.animationNameCache = new WeakMap();
			this.wowEvent = createEvent(this.config.boxClass);
		}

		_createClass(WOW, [{
			key: 'init',
			value: function init() {
				this.element = window.document.documentElement;
				if (isIn(document.readyState, ['interactive', 'complete'])) {
					this.start();
				} else {
					addEvent(document, 'DOMContentLoaded', this.start);
				}
				this.finished = [];
			}
		}, {
			key: 'start',
			value: function start() {
				var _this = this;

				this.stopped = false;
				this.boxes = [].slice.call(this.element.querySelectorAll('.' + this.config.boxClass));
				this.all = this.boxes.slice(0);
				if (this.boxes.length) {
					if (this.disabled()) {
						this.resetStyle();
					} else {
						for (var i = 0; i < this.boxes.length; i++) {
							var box = this.boxes[i];
							this.applyStyle(box, true);
						}
					}
				}
				if (!this.disabled()) {
					addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
					addEvent(window, 'resize', this.scrollHandler);
					this.interval = setInterval(this.scrollCallback, 50);
				}
				if (this.config.live) {
					var mut = new MutationObserver(function (records) {
						for (var j = 0; j < records.length; j++) {
							var record = records[j];
							for (var k = 0; k < record.addedNodes.length; k++) {
								var node = record.addedNodes[k];
								_this.doSync(node);
							}
						}
						return undefined;
					});
					mut.observe(document.body, {
						childList: true,
						subtree: true
					});
				}
			}
		}, {
			key: 'stop',
			value: function stop() {
				this.stopped = true;
				removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler);
				removeEvent(window, 'resize', this.scrollHandler);
				if (this.interval != null) {
					clearInterval(this.interval);
				}
			}
		}, {
			key: 'sync',
			value: function sync() {
				if (MutationObserver.notSupported) {
					this.doSync(this.element);
				}
			}
		}, {
			key: 'doSync',
			value: function doSync(element) {
				if (typeof element === 'undefined' || element === null) {
					element = this.element;
				}
				if (element.nodeType !== 1) {
					return;
				}
				element = element.parentNode || element;
				var iterable = element.querySelectorAll('.' + this.config.boxClass);
				for (var i = 0; i < iterable.length; i++) {
					var box = iterable[i];
					if (!isIn(box, this.all)) {
						this.boxes.push(box);
						this.all.push(box);
						if (this.stopped || this.disabled()) {
							this.resetStyle();
						} else {
							this.applyStyle(box, true);
						}
						this.scrolled = true;
					}
				}
			}
		}, {
			key: 'show',
			value: function show(box) {
				this.applyStyle(box);
				box.className = box.className + ' ' + this.config.animateClass;
				if (this.config.callback != null) {
					this.config.callback(box);
				}
				emitEvent(box, this.wowEvent);

				addEvent(box, 'animationend', this.resetAnimation);
				addEvent(box, 'oanimationend', this.resetAnimation);
				addEvent(box, 'webkitAnimationEnd', this.resetAnimation);
				addEvent(box, 'MSAnimationEnd', this.resetAnimation);

				return box;
			}
		}, {
			key: 'applyStyle',
			value: function applyStyle(box, hidden) {
				var _this2 = this;

				var duration = box.getAttribute('data-wow-duration');
				var delay = box.getAttribute('data-wow-delay');
				var iteration = box.getAttribute('data-wow-iteration');

				return this.animate(function () {
					return _this2.customStyle(box, hidden, duration, delay, iteration);
				});
			}
		}, {
			key: 'resetStyle',
			value: function resetStyle() {
				for (var i = 0; i < this.boxes.length; i++) {
					var box = this.boxes[i];
					box.style.visibility = 'visible';
				}
				return undefined;
			}
		}, {
			key: 'resetAnimation',
			value: function resetAnimation(event) {
				if (event.type.toLowerCase().indexOf('animationend') >= 0) {
					var target = event.target || event.srcElement;
					target.className = target.className.replace(this.config.animateClass, '').trim();
				}
			}
		}, {
			key: 'customStyle',
			value: function customStyle(box, hidden, duration, delay, iteration) {
				if (hidden) {
					this.cacheAnimationName(box);
				}
				box.style.visibility = hidden ? 'hidden' : 'visible';

				if (duration) {
					this.vendorSet(box.style, { animationDuration: duration });
				}
				if (delay) {
					this.vendorSet(box.style, { animationDelay: delay });
				}
				if (iteration) {
					this.vendorSet(box.style, { animationIterationCount: iteration });
				}
				this.vendorSet(box.style, { animationName: hidden ? 'none' : this.cachedAnimationName(box) });

				return box;
			}
		}, {
			key: 'vendorSet',
			value: function vendorSet(elem, properties) {
				for (var name in properties) {
					if (properties.hasOwnProperty(name)) {
						var value = properties[name];
						elem['' + name] = value;
						for (var i = 0; i < this.vendors.length; i++) {
							var vendor = this.vendors[i];
							elem['' + vendor + name.charAt(0).toUpperCase() + name.substr(1)] = value;
						}
					}
				}
			}
		}, {
			key: 'vendorCSS',
			value: function vendorCSS(elem, property) {
				var style = getComputedStyle(elem);
				var result = style.getPropertyCSSValue(property);
				for (var i = 0; i < this.vendors.length; i++) {
					var vendor = this.vendors[i];
					result = result || style.getPropertyCSSValue('-' + vendor + '-' + property);
				}
				return result;
			}
		}, {
			key: 'animationName',
			value: function animationName(box) {
				var aName = void 0;
				try {
					aName = this.vendorCSS(box, 'animation-name').cssText;
				} catch (error) {
					// Opera, fall back to plain property value
					aName = getComputedStyle(box).getPropertyValue('animation-name');
				}

				if (aName === 'none') {
					return ''; // SVG/Firefox, unable to get animation name?
				}

				return aName;
			}
		}, {
			key: 'cacheAnimationName',
			value: function cacheAnimationName(box) {
				// https://bugzilla.mozilla.org/show_bug.cgi?id=921834
				// box.dataset is not supported for SVG elements in Firefox
				return this.animationNameCache.set(box, this.animationName(box));
			}
		}, {
			key: 'cachedAnimationName',
			value: function cachedAnimationName(box) {
				return this.animationNameCache.get(box);
			}
		}, {
			key: 'scrollHandler',
			value: function scrollHandler() {
				this.scrolled = true;
			}
		}, {
			key: 'scrollCallback',
			value: function scrollCallback() {
				if (this.scrolled) {
					this.scrolled = false;
					var results = [];
					for (var i = 0; i < this.boxes.length; i++) {
						var box = this.boxes[i];
						if (box) {
							if (this.isVisible(box)) {
								this.show(box);
								continue;
							}
							results.push(box);
						}
					}
					this.boxes = results;
					if (!this.boxes.length && !this.config.live) {
						this.stop();
					}
				}
			}
		}, {
			key: 'offsetTop',
			value: function offsetTop(element) {
				// SVG elements don't have an offsetTop in Firefox.
				// This will use their nearest parent that has an offsetTop.
				// Also, using ('offsetTop' of element) causes an exception in Firefox.
				while (element.offsetTop === undefined) {
					element = element.parentNode;
				}
				var top = element.offsetTop;
				while (element.offsetParent) {
					element = element.offsetParent;
					top += element.offsetTop;
				}
				return top;
			}
		}, {
			key: 'isVisible',
			value: function isVisible(box) {
				var offset = box.getAttribute('data-wow-offset') || this.config.offset;
				var viewTop = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset;
				var viewBottom = viewTop + Math.min(this.element.clientHeight, getInnerHeight()) - offset;
				var top = this.offsetTop(box);
				var bottom = top + box.clientHeight;

				return top <= viewBottom && bottom >= viewTop;
			}
		}, {
			key: 'disabled',
			value: function disabled() {
				return !this.config.mobile && isMobile(navigator.userAgent);
			}
		}]);

		return WOW;
	}();

	exports.default = WOW;
	module.exports = exports['default'];
});

new WOW().init();