document.addEventListener('DOMContentLoaded', function() {

  var scroller_elements = [
    document.getElementsByClassName('scroller_red')[0],
    document.getElementsByClassName('scroller_orange')[0],
    document.getElementsByClassName('scroller_yellow')[0],
    document.getElementsByClassName('scroller_green')[0],
    document.getElementsByClassName('scroller_blue')[0],
    document.getElementsByClassName('scroller_purple')[0]
  ]
  var next_scroller_element = 0

  window.addEventListener("click", function(e) {
    console.log('******');
  });

  var run_scroller = true;
  window.addEventListener("scroll", function(e) {
    if (run_scroller == true) {
      if (scroll_on_last_element()) {
        console.log('scroll_on_last_element() = true');
        remove_first_element();
        add_next_trailing_element();
        // adjust_scroll_position();
      } else if (scroll_on_first_element()) {
        console.log('scroll_on_first_element() = true');
        remove_last_element();
        add_next_leading_element();
        // adjust_scroll_position();
      }
      run_scroller = false;
      setTimeout(function() {
        run_scroller = true;
        console.log('setting run_scroller to true');
      }, 2000);
    }
  });

  scroller_elements.forEach(function(el, i) {
    document.getElementById('scroll_container').appendChild(el.cloneNode(true));
  });

  function page_height() {
    return document.documentElement.scrollHeight;
  }

  function scroll_position() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }

  function client_height() {
    return document.documentElement.clientHeight;
  }

  function height_of_top_element() {
    return document.getElementById('scroll_container').children[0].offsetHeight;
  }

  function height_of_bottom_element() {
    return document.getElementById('scroll_container').children[5].offsetHeight;
  }

  function max_scroll() {
    return page_height() - client_height();
  }

  function get_new_first_element() {
    next_el = scroller_elements[next_scroller_element].cloneNode(true);
    if (next_scroller_element <= 0) {
      next_scroller_element = 5
    } else {
      next_scroller_element = next_scroller_element - 1
    }
    return next_el
  }

  function get_new_last_element() {
    next_el = scroller_elements[next_scroller_element].cloneNode(true);
    if (next_scroller_element >= 5) {
      next_scroller_element = 0
    } else {
      next_scroller_element = next_scroller_element + 1
    }
    return next_el
  }

  function scroll_on_first_element() {
    return (0 <= scroll_position()) && (scroll_position() <= height_of_top_element())
  }

  function scroll_on_last_element() {
      return ((max_scroll() - height_of_bottom_element()) <= scroll_position()) && (scroll_position() <= max_scroll())
  }

  function remove_first_element() {
    parent = document.getElementById('scroll_container')
    child = parent.children[0]
    parent.removeChild(child)
  }

  function remove_last_element() {
    parent = document.getElementById('scroll_container')
    child = parent.children[5]
    parent.removeChild(child)
  }

  function add_next_leading_element() {
    document.getElementById('scroll_container').appendChild(get_new_first_element());
  }

  function add_next_trailing_element() {
    document.getElementById('scroll_container').appendChild(get_new_last_element());
  }

});