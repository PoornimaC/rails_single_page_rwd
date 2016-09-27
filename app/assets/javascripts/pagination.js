jQuery(function() {
  var page_regexp, pushPage;
  page_regexp = /\d+$/;

  pushPage = function(page, subpage) {
    var page, subpage, url;
    if (page > 0) {
      page = page || 1;
      url = "?page=" + page
    }
    if (subpage > 0) {
      subpage = subpage || 1;
      url = url + "&subpage=" + subpage;
    }

    History.pushState(null, "InfiniteScrolling | Page " + page, url);
  };

  loadPageNos = function(e1, e2) {
    var page, subpage;
    if (e1) {
      page = e1.match(/page=(\d+)/i)[1];
    } else {
      page = -1;
    }

    if (e2) {
      subpage = e2.match(/subpage=(\d+)/i)[1];
    } else {
      subpage = -1;
    }

    return pushPage(page, subpage);
  };

  window.preparePagination = function(el) {
    el.waypoint(function(direction) {
      var $this, page;
      $this = $(this);
      if (!($this.hasClass('first-page') && direction === 'up')) {
        var data;
        if ($this.hasClass('.page-delimiter')) {
          data = $this.data('page');
        }
        page = parseInt(data, 10);
        if (direction === 'up') {
          page -= 1;
        }
      }
    });
  };

  if ($('#infinite-scrolling').size() > 0) {
    preparePagination($('.page-delimiter'));
    $('#my-employees').bindWithDelay('scroll', function() {
      var more_emp_url;
      more_emp_url = $('#infinite-scrolling .next_page a').attr('href');
      if (more_emp_url && $(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        $('#infinite-scrolling .pagination').html('<img src="/assets/ajax-loader.gif" alt="Loading..." title="Loading..." />');
        more_sub_url = $('#sub-infinite-scrolling .active a').attr('href');
        $.getScript(more_emp_url, function() {
          loadPageNos(more_emp_url, more_sub_url);
        });
      }
    }, 100);
  }

  if ($('#sub-infinite-scrolling').size() > 0) {
    preparePagination($('.sub-page-delimiter'));
    $('#my-subordinates').bindWithDelay('scroll', function() {
      var more_sub_url;
      more_sub_url = $('#sub-infinite-scrolling .next_page a').attr('href');
      if (more_sub_url && $(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        $('#sub-infinite-scrolling .pagination').html('<img src="/assets/ajax-loader.gif" alt="Loading..." title="Loading..." />');
        more_emp_url = $('#infinite-scrolling .active a').attr('href');
        $.getScript(more_sub_url, function() {
          loadPageNos(more_emp_url, more_sub_url);
        });
      }
    }, 100);
  }
});
