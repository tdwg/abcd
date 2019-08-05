Vue.component("navigation", {
  props:["title"],
  template: 
    "\
    <div id=\"navigation\">\
      <nav class=\"top-nav\">\
        <div class=\"container\">\
          <div class=\"nav-wrapper\">\
            <div class=\"row\">\
              <div class=\"col s12 m10 offset-m1\">\
                <h1 class=\"header\">{{ title }}</h1>\
              </div>\
            </div>\
          </div>\
        </div>\
      </nav>\
      <div class=\"container\"><a href=\"#\" data-target=\"menu\" class=\"top-nav sidenav-trigger full hide-on-large-only\"><i class=\"material-icons\">menu</i></a></div>\
      <div id=\"menu\" class=\"sidenav sidenav-fixed show-on-large\">\
        <ul>\
          <li class=\"title\"><h3 class=\"center-align\">ABCD</h3></li>\
          <li class=\"title\"><h5 class=\"center-align\">Access to Biological Collection Data</h5></li>\
          <li class=\"divider\"></li>\
          <li class=\"bold menu-item sidenav-close\" v-bind:class=\"{ active: currentUrl=='/' }\"><a href=\"/\" class=\"waves-effect waves-green\">Home</a></li>\
          <li class=\"bold menu-item sidenav-close\" v-bind:class=\"{ active: currentUrl=='/3.0/' }\"><a href=\"/3.0\" class=\"waves-effect waves-green\">ABCD 3.0</a></li>\
          <li class=\"bold menu-item sidenav-close\" v-bind:class=\"{ active: currentUrl=='/xml/' }\"><a href=\"/xml\" class=\"waves-effect waves-green\">XML</a>\
            <ul class=\"submenu\">\
              <li class=\"bold menu-item sidenav-close\" v-bind:class=\"{ active: currentUrl=='/xml/documentation/primer/2.06/' }\"><a href=\"/xml/documentation/primer/2.06\" class=\"waves-effect waves-green\">ABCD 2.06 Primer</a></li>\
              <li class=\"bold menu-item sidenav-close\" v-bind:class=\"{ active: currentUrl=='/xml/documentation/changes/' }\"><a href=\"/xml/documentation/changes\" class=\"waves-effect waves-green\">ABCD 3.0 Changes</a></li>\
            </ul>\
          </li>\
          <li class=\"bold menu-item sidenav-close\" v-bind:class=\"{ active: currentUrl=='/ontology/' }\"><a href=\"/ontology\" class=\"waves-effect waves-green\">Ontology</a>\
            <ul class=\"submenu\">\
              <li class=\"bold menu-item sidenav-close\" v-bind:class=\"{ active: currentUrl=='/ontology/documentation/primer/' }\"><a href=\"/ontology/documentation/primer\" class=\"waves-effect waves-green\">Primer</a></li>\
              <li class=\"bold menu-item sidenav-close\" v-bind:class=\"{ active: currentUrl=='/terms/'}\"><a href=\"/terms\" class=\"waves-effect waves-green\">Terms</a></li>\
            </ul>\
          </li>\
        </ul>\
        <div class=\"imprint-link\"><a href=\"https://www.bgbm.org/en/imprint\">Imprint</a></div>\
      </div>\
    </div>\
    "
});

new Vue({
  el: '#navigation-app',
  data: {
    currentUrl: "/",
  },
  created: function() {
    currentUrl = window.location.pathname;
  }
});

function handleScroll() {
  $('.scrollsection').each(function(){
    const elTop = this.getBoundingClientRect().top
    const elBottom = this.getBoundingClientRect().bottom
    if (elTop <= 20 && elBottom >= 20) {
      $('.table-of-contents>li>a[href^="#'+$(this).attr('id')+'"]').addClass('active');
    }else{
      $('.table-of-contents>li>a[href^="#'+$(this).attr('id')+'"]').removeClass('active');
    }
  })
}

$(document).ready(function(){
  $('.pushpin').each(function() {
      var $this = $(this);
      var $target = $('#' + $(this).attr('data-target'));
      $this.pushpin({
          top: $target.offset().top,
          //bottom: $target.offset().top + $target.outerHeight() - $this.height()
      });
  });

  $(".dropdown-trigger").dropdown();

  $(".sidenav").sidenav();

  handleScroll();
  window.addEventListener('scroll', handleScroll);
  $('.table-of-contents>li>a').click(function(){
    $('.table-of-contents>li>a').removeClass('active');
    $(this).addClass('active');
  });
});