jQuery(function(){
      $(document).ready(
        function(){
        $("a[href='/administration_dashboard/']").last().prepend('<a class="hover-alert" rel="nofollow" data-method="delete" href="/admins/sign_out">Sign Out  </a>')
      })
})
