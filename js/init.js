var o = {
	init: function(){
		this.diagram();
	},
	random: function(l, u){
		return Math.floor((Math.random()*(u-l+1))+l);
	},
	diagram: function(){
		var r = Raphael('diagram', 550, 550),
			rad = 73,
			defaultText = '技能',
			speed = 250;
		
		r.circle(300, 300, 85).attr({ stroke: 'none', fill: '#193340' });
		
		var title = r.text(300, 300, defaultText).attr({
			font: '16px Arial',				//设置文字大小
			fill: '#fff'
		}).toFront();
		
		r.customAttributes.arc = function(value, color, rad){
			var v = 3.6*value,
				alpha = v == 360 ? 359.99 : v,
				random = o.random(91, 240),
				a = (random-alpha) * Math.PI/180,
				b = random * Math.PI/180,
				sx = 300 + rad * Math.cos(b),
				sy = 300 - rad * Math.sin(b),
				x = 300 + rad * Math.cos(a),
				y = 300 - rad * Math.sin(a),
				path = [['M', sx, sy], ['A', rad, rad, 0, +(alpha > 180), 1, x, y]];
			return { path: path, stroke: color }
		}
		
		$('.get').find('.arc').each(function(i){
			var t = $(this), 
				color = t.find('.color').val(),
				value = t.find('.percent').val(),
				text = t.find('.text').text();
			
			rad += 24;			//每一个类的间隔
			var z = r.path().attr({ arc: [value, color, rad], 'stroke-width': 20 });
			
			z.mouseover(function(){				//鼠标移入效果	stroke-width表示宽度
                this.animate({ 'stroke-width': 40, opacity: .6 }, 1000, 'elastic');
                if(Raphael.type != 'VML') //solves IE problem
				this.toFront();
				title.stop().animate({ opacity: 0 }, speed, '>', function(){
					this.attr({ text: text + '\n' + value + '%' }).animate({ opacity: 1 }, speed, '<');
				});
            }).mouseout(function(){
				this.stop().animate({ 'stroke-width': 20, opacity: 1 }, speed*4, 'elastic');
				title.stop().animate({ opacity: 0 }, speed, '>', function(){
					title.attr({ text: defaultText }).animate({ opacity: 1 }, speed, '<');
				});	
            });
		});
		
	}
}
$(function(){ o.init(); });
