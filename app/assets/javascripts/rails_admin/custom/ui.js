jQuery(function(){
      $(document).ready(
        function(){
        $("ul.nav.navbar-nav.navbar-right.root_links").last().prepend('<li><a class="hover-alert" rel="nofollow" data-method="delete" href="/admins/sign_out">Sign Out</a></li><li><a class= "pjax" href="/admin_dashboard">Replate Admin Dashboard</a></li>')
      })
})
