let fnList = ['position', 'enable', 'disable', 'setValue', 'getValue', 'getValues'
				, 'changeWheel', 'isVisible', 'tap', 'show', 'hide', 'select'
				, 'alert', 'cancel', 'init', 'trigger', 'option', 'destroy', 'getInst']
	, defaultOptions = {
		preset: 'list'
		, theme: 'spice-mobiscroll'
		, mode: 'scroller'
		, display: 'bottom'
		, ariaDesc: ''
		// 自定义数据
		, customWheels: [{}]
		, showLabel: false
		, setText: '确定'
		, cancelText: '取消'
		, joinResult: '/'
	}
	, defaultFunc = {
		funcList: (elem) => {
			let o = {}
			$.each(fnList, (i, v)=>{
				o[v] = ()=>{
					return elem.spiceMobIScroll(v);
				}
			});
			return o;
		}
	};

$.spice = $.spice || {};

require('./mobIScrollCore');
require('./extend/mobIScrollList');
require('./extend/mobIScrollLinkage');
require('./extend/mobIScrollDatetime');

let MobIScroll = (selector, options) => {
	if( !(selector && !$.isPlainObject(selector)) ) return false;

	let rtn = [];
	$(selector).each((index, self)=>{
		let $self = $(self)
			, data  = $self.data('spice.mobIScroll')
			, obj = $.extend(true, {}, defaultOptions, options)
			, preset = obj.preset
			, formatResult = null;

		if (data){
			data.destroy();
		}

		if( preset == 'linkage' ){
			formatResult = (d, w)=>{
				let sz = [];
				$.each(w[0], (i, o)=>{
					sz.push( o[ d[i] ] );
				});
				if( $.inArray(undefined, sz) == -1 ){
					return sz.join( obj.joinResult );
				}else{
					return $('.spice-mobiscroll .dwv').html();
				}
			}
		}else if( preset == 'list' ){
			formatResult = (d, w)=>{
				let sz = [];
				$.each(w[0], (i, o)=>{
					let v = o[ d[i] ];
					if( v != 0 ){
						sz.push( v );
					}else if( sz.length > 0 ){
						sz.push( v );
					}
				});

				if( sz.length == 1 ){
					sz.unshift(0);
				}
				return sz.join( obj.joinResult );
			}
		}

		if( !obj.formatResult && formatResult ){
			obj.formatResult = formatResult;
		}
		$self.spiceMobIScroll( obj );
		$self.data('spice.mobIScroll', (data = defaultFunc.funcList($self)));
		rtn.push(data);
		$self.removeAttr('disabled');
	});

	if( $(selector).length == 1 ){
		rtn = rtn[0];
	}
	return rtn;
}

$.spice.MobIScroll = MobIScroll;

module.exports = MobIScroll;