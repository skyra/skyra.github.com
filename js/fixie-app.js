// FIXIE Frontend JS
$(document).ready(function(){function e(){var e=4;$(".photoset-grid, this").photosetGrid({highresLinks:!0,rel:"",gutter:e+"px",onComplete:function(){$(".photoset-grid").attr("style","");$(".photoset-grid a").colorbox({photo:!0,scalePhotos:!0,maxHeight:"90%",maxWidth:"90%",transition:"none",title:function(){return $("img",this).attr("alt")}});$(".photoset-grid").each(function(){var e=$(this).attr("data-id");$(this).find(".photoset-cell").attr("rel",e)})}})}function t(){setTimeout(function(){$(".audio-player").each(function(){var e=$(this).attr("id"),t=$(this);$.ajax({url:"/api/read/json?id="+e,dataType:"jsonp",timeout:1e4,success:function(e){t.html(e.posts[0]["audio-player"])}})});$(".video-container").each(function(){var e=$(this).attr("id"),t=$(this);$.ajax({url:"/api/read/json?id="+e,dataType:"jsonp",timeout:1e4,success:function(e){t.html(e.posts[0]["video-player"])}})})},2e3)}$(".the-posts article").each(function(){e()});$(".the-posts .posts-grid").imagesLoaded(function(){$(".the-posts .posts-grid").masonry({itemSelector:"article",columnWidth:".the-posts .grid-sizer",hiddenStyle:{opacity:0,transform:"translateY(100%)"},visibleStyle:{opacity:1,transform:"translateY(0)"}})});$(".the-posts .posts-grid").infinitescroll({navSelector:".pagination",nextSelector:".pagination a.next",itemSelector:".the-posts .posts-grid article",bufferPx:100,loading:{img:"http://static.tumblr.com/e6lc7yi/PnCmidqaj/1px.png",speed:200,msgText:"!",finishedMsg:"x"},errorCallback:function(){$(".load-more").addClass("off")}},function(n,r){var i=$(n).css({opacity:0});i.imagesLoaded(function(){i.animate({opacity:1});$(".the-posts .posts-grid").masonry("appended",i,!0)});e();t();var s=r.state.currPage;Tumblr.LikeButton.get_status_by_page(s);$(".dsq-comment-count").length>0&&function(){var e=document.createElement("script");e.async=!0;e.type="text/javascript";e.src="//"+disqus_shortname+".disqus.com/count.js";(document.getElementsByTagName("HEAD")[0]||document.getElementsByTagName("BODY")[0]).appendChild(e)}()});if($(".load-more").length>0){$(window).unbind(".infscr");$(".load-more").click(function(){$(".the-posts .posts-grid").infinitescroll("retrieve")})}$(".scroll-top").click(function(){$("body,html").animate({scrollTop:0},800,"easeInOutQuint");return!1});$(".the-posts").on("click",".social-export",function(e){$(this).parent().toggleClass("on")})});