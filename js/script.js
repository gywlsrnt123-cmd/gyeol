/* script.js - 스크립트
---------------------------------------------------------------- */
jQuery(function($) { 
	
	// 스크롤 고정 내비게이션 플러그인을 #header-bar에 연결.
	$('header').scrolledFix();
	
	// 스마트 폰 환경에서 화면을 가득 채우는 함수 호출.
	if($(window).width() < 767) loadedFullScreen();
		
});

function loadedFullScreen() {
	setTimeout(function() { scrollTo(0,0); }, 100);
};

