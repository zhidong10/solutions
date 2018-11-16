;(function($){
	$.fn.extend({
		"circle":function(e){
			return this.each(function(n){
				a=$.extend({
					posi_length:e.posi_length,
					role_length:e.role_length,
					differ:e.differ||'',
					r:e.r,
					direction:e.direction,
					active_class:e.active_class||"current"
				},e);
				var self=this;
				var show_length=$(".origin a",self).length;
				var css_circle='';
				var angle=360/a.posi_length;
				var rotate=0;
				var active=Math.floor(show_length/2);
				var a_differ=[],a_posi_length=[],a_role_length=[],a_active_class=[];
				var can_rotate=true;
				a_differ[n]=a.differ;
				a_posi_length[n]=a.posi_length;
				a_role_length[n]=a.role_length;
				a_active_class[n]=a.active_class;
				
				for(var i=0; i<a.posi_length; i++){
					if(a.direction=="right"){
						css_circle+="."+a.differ+"posi_"+i+"{ left:"+a.r*Math.cos(angle*i*2*Math.PI/360)+"px;top:"+-a.r*Math.sin(angle*i*2*Math.PI/360)+"px;}";
					}
					if(a.direction=="left"){
						css_circle+="."+a.differ+"posi_"+i+"{ left:"+-a.r*Math.cos(angle*i*2*Math.PI/360)+"px;top:"+a.r*Math.sin(angle*i*2*Math.PI/360)+"px;}";
					}
					if(a.direction=="bottom"){
						css_circle+="."+a.differ+"posi_"+i+"{ left:"+a.r*Math.sin(angle*i*2*Math.PI/360)+"px;top:"+a.r*Math.cos(angle*i*2*Math.PI/360)+"px;}";
					}
					if(a.direction=="top"){
						css_circle+="."+a.differ+"posi_"+i+"{ left:"+-a.r*Math.sin(angle*i*2*Math.PI/360)+"px;top:"+-a.r*Math.cos(angle*i*2*Math.PI/360)+"px;}";
					}
				}
				css_circle="<style>"+css_circle+"</style>";
				
				$("head").append(css_circle);
				
				for(var i=0; i<show_length; i++){
					if(i<active){
						$(".origin a",self).eq(i).addClass(a.differ+"posi_"+(a.posi_length-active+i)+" "+a.differ+"role_"+(a.role_length-active+i));
					}else{
						$(".origin a",self).eq(i).addClass(a.differ+"posi_"+(i-active)+" "+a.differ+"role_"+(i-active));
					}
				}
	
				
				$(".origin a",self).eq(active).addClass(a.active_class);
				$(".origin a",self).live("click",function(){
					if(can_rotate==true){
						var num=$(this).index();
						if(num!=active){
							can_rotate=false;
							$(".origin a",self).eq(num).addClass(a_active_class[n]).siblings().removeClass(a_active_class[n]);
							var cha=num-active;
							var str='';
							var posi_num,role_num;
							if(cha<0){
								var posi=parseInt($(".origin a",self).eq(0).attr("class").split(a_differ[n]+"posi_")[1].split(/\s/)[0]);
								var role=parseInt($(".origin a",self).eq(0).attr("class").split(a_differ[n]+"role_")[1].split(/\s/)[0]);
								for(var i=cha;i<0; i++){
									if(posi+i<0){
										posi_num=posi+i+a_posi_length[n];
									}else{
										posi_num=posi+i;
									}
									if(role+i<0){
										role_num=role+i+a_role_length[n];
									}else{
										role_num=role+i;
									}
									str+='<a class="'+a_differ[n]+'posi_'+posi_num+' '+a_differ[n]+'role_'+role_num+'" href="javascript:;"></a>'
								}
								
								$(".origin",self).prepend(str);
								rotate=rotate+cha*angle
								$(self).css({"transform":"rotate("+rotate+"deg)","-ms-transform":"rotate("+rotate+"deg)"});
								$(".origin a",self).css({"transform":"rotate("+-rotate+"deg)","-ms-transform":"rotate("+-rotate+"deg)"});
								setTimeout(function(){
									$(".origin a:gt("+(show_length-1)+")",self).remove();
									can_rotate=true;
								},400)	
							}
							
							if(cha>0){
								var posi=parseInt($(".origin a",self).eq(show_length-1).attr("class").split(a_differ[n]+"posi_")[1].split(/\s/)[0]);
								var role=parseInt($(".origin a",self).eq(show_length-1).attr("class").split(a_differ[n]+"role_")[1].split(/\s/)[0]);
								for(var i=1;i<=cha; i++){
									if(posi+i>a_posi_length[n]-1){
										posi_num=posi+i-a_posi_length[n];
									}else{
										posi_num=posi+i;
									}
									if(role+i>a_role_length[n]-1){
										role_num=role+i-a_role_length[n];
									}else{
										role_num=role+i;
									}
									str+='<a class="'+a_differ[n]+'posi_'+posi_num+' '+a_differ[n]+'role_'+role_num+'" href="javascript:;"></a>'
								}
								
								$(".origin",self).append(str);
								rotate=rotate+cha*angle
								$(self).css({"transform":"rotate("+rotate+"deg)","-ms-transform":"rotate("+rotate+"deg)"});
								$(".origin a",self).css({"transform":"rotate("+-rotate+"deg)","-ms-transform":"rotate("+-rotate+"deg)"});
								setTimeout(function(){
									$(".origin a:lt("+cha+")",self).remove();
									can_rotate=true;
								},400)	
							}
						}
					}
					
				})
	
			});		
		},
	});
})(jQuery);


