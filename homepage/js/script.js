//
// alerts.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {

  // Variables
  // =========

  var LIFETIME = 5000;

  // Methods
  // =======

  function toggleAlert(detail) {
    var alert = document.createElement('div');

    alert.classList.add(
      'alert',
      'alert-' + detail.type,
      'alert-fixed',
      'fade',
      'show'
    );

    alert.innerHTML = detail.message.replace('0 -', '');

    // Append to body
    document.body.appendChild(alert);

    // Close alert
    setTimeout(function() {
      $(alert).alert('close');
    }, LIFETIME);

  }

  // Events
  // ======

  window.addEventListener('alert.show', function(e) {
    toggleAlert(e.detail);
  });

});
//
// animation.js
// Theme component
//

'use strict';

jQuery(document).ready(function($) {

  // Variables
  // =========

  var animations = document.querySelectorAll('[data-toggle="animation"]');

  // Methods
  // =======

  function animate(elem, event, index) {
    if ( event == 'fpAfterLoad' ) {
      var currentSection = elem.closest('.fp-section').classList.contains('active');
      
      if ( currentSection ) {
        elem.classList.add('animate');
      }
    } else {
      elem.classList.add('animate');
    }
  }

  // Events
  // ======

  "load fpAfterLoad".split(' ').forEach(function(event) {
    window.addEventListener(event, function(e) {
      var event = e.type;

      [].forEach.call(animations, function(elem) {
        var trigger = elem.getAttribute('data-animation-trigger');

        // Window events
        if ( trigger == 'load' && event == 'load' ) {
          animate(elem, event);
        }

        // Fullpage.js events
        if ( trigger == 'fpAfterLoad' && event == 'fpAfterLoad' ) {
          var index = e.detail.destination.index;

          animate(elem, event, index);
        }

        // Waypoints.js events
        if ( trigger == 'enter' && event == 'load' || trigger =='entered' && event == 'load' ) {
          new Waypoint.Inview({
            element: elem,
            enter: function() {
              if ( trigger == 'enter' ) {
                animate(elem, event);
              }
            },
            entered: function() {
              if ( trigger == 'entered' ) {
                animate(elem, event);
              }
            }
          });
        }

      });

    });
  });
  
});
//
// code.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {
  
  // Variables
  // =========

  var code = document.querySelectorAll('.code');

  // Methods
  // =======

  function highlight(elem) {
    hljs.highlightBlock(elem);
  }

  // Events
  // ======

  if ( window.hljs ) {
    [].forEach.call(code,function(elem) {
      highlight(elem);
    });
  }

});
//
// Dropdown ==================================
//

'use strict';

jQuery(document).ready(function($) {

  // Variables
  // =========

  var dropdown = document.querySelectorAll('.dropup, .dropright, .dropdown, .dropleft');
  var dropdownSubmenuToggle = document.querySelectorAll('.dropdown-menu .dropdown-toggle');


  // Methods
  // =======

  function toggleSubmenu(elem) {
    var dropdownSubmenus = elem.closest('.dropdown-menu').querySelectorAll('.dropdown-menu');
    var dropdownSubmenu = elem.parentElement.querySelector('.dropdown-menu');

    // Hide siblings menus
    [].forEach.call(dropdownSubmenus, function(menu) {
      if ( menu !== dropdownSubmenu ) {
        menu.classList.remove('show');
      }
    });

    // Toggle current menu
    dropdownSubmenu.classList.toggle('show');
  }

  function hideMenu(elem) {
    var dropdownSubmenus = elem.querySelectorAll('.dropdown-menu');

    // Hide submenus
    [].forEach.call(dropdownSubmenus, function(menu) {
      menu.classList.remove('show');
    });
  }


  // Events
  // ======

  if ( dropdownSubmenuToggle ) {
    [].forEach.call(dropdownSubmenuToggle, function(elem) {
      elem.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Toggle submenu
        toggleSubmenu(elem);
      });
    });
  }

  $(dropdown).on('hide.bs.dropdown', function(e) {
    hideMenu(this);
  });


});
//
// faq.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {

  // Variables
  // =========

  var faqCollapse = document.querySelectorAll('.faq-item .collapse');

  // Methods
  // =======

  function toggleCollapse($this) {
    var $faq = $this.closest('.faq');
    var $faqCollapse = $faq.find('.collapse').not($this);

    $faqCollapse.collapse('hide');
  }

  // Events
  // ======

  if ( faqCollapse ) {
    [].forEach.call(faqCollapse, function(elem) {
      var $this = $(elem);

      $this.on('show.bs.collapse', function() {
        toggleCollapse($this);
      });
    });
  };
  
});
//
// fullpage.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {

  // Variables
  // =========

  var fpWrapper = document.querySelector('.fp-wrapper');

  // Methods
  // =======

  function init(fpWrapper) {

    new fullpage(fpWrapper, {

      // License
      licenseKey: 'CA9DA262-9BD6447E-B1BF8C11-D1480312',

      // Navigation
      anchors: ['hero', 'about-1', 'about-2', 'services', 'promo', 'testimonials', 'pricing'],

      // Custom selectors
      sectionSelector: '.fp-section',

      // Scrolling
      scrollingSpeed: 700,
      easingcss3: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
      scrollOverflow: true,

      // Design
      responsiveWidth: 768,

      // Events
      afterLoad: function(origin, destination, direction) {
        var event = new CustomEvent('fpAfterLoad', {'detail': {
          origin: origin,
          destination: destination,
          direction: direction
        }});

        window.dispatchEvent(event);
      },
      onLeave: function(origin, destination, direction) {
        var event = new CustomEvent('fpOnLeave', {'detail': {
          origin: origin,
          destination: destination,
          direction: direction
        }});
        
        window.dispatchEvent(event);
      }
    });
  }

  // Events
  // ======

  if ( fpWrapper ) {
    init(fpWrapper);
  }

});
//
// map.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {
  
  // Variables
  // =========

  var maps = document.querySelectorAll('.map-container');

  // Methods
  // =======

  function initMap(elem) {

    // Get map data
    var zoom = parseInt(elem.getAttribute('data-zoom'));
    var markers = JSON.parse(elem.getAttribute('data-markers'));
    var styles = [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}];
    var center = {
      lat: markers[0][0],
      lng: markers[0][1]
    };

    // Init map
    var map = new google.maps.Map(elem, {
      center: center,
      styles: styles,
      zoom: zoom
    });

    // Get bounds
    var bounds = new google.maps.LatLngBounds();

    // Create markers
    markers.forEach(function(item, i, arr) {
      var position = {
        lat: item[0],
        lng: item[1]
      };
      var marker = new google.maps.Marker({
        position: position,
        map: map
      });

      // Extend bounds
      bounds.extend(position);
    });

    // Fit markers into bounds
    if ( !zoom ) {
      map.fitBounds(bounds);
    }
  }

  // Events
  // ======

  // Init map

  if ( maps ) {
    [].forEach.call(maps, function(elem) {
      initMap(elem);
    });
  }

});
//
// modal.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {
  
  // Variables
  // =========

  var modal = document.querySelector('.modal');

  // Methods
  // =======

  function startVideo(video) {
    video.play();
  }

  function pauseVideo(video) {
    video.pause();
  }

  // Events
  // ======

  $(modal).on('shown.bs.modal hide.bs.modal', function(e) {
    var video = this.querySelector('video');

    if ( video && e.type == 'shown' ) {
      startVideo(video);
    } else if ( video && e.type == 'hide' ) {
      pauseVideo(video);
    }
  });

});
//
// navbar.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {
  
  // Variables
  // =========

  var navbar = document.querySelector('.navbar');
  var navbarCollapse = document.querySelector('.navbar-collapse');
  var navbarLogo = document.querySelector('.navbar-logo');

  var isLight = false;
  var isCollapsed = false;
  var isTogglable = navbar.classList.contains('navbar-togglable');

  // Methods
  // =======

  function makeNavbarLight() {

    if ( !isLight && isTogglable ) {
      navbar.classList.remove('navbar-dark');
      navbar.classList.add('navbar-light');
      navbarLogo.src = navbarLogo.src.replace("navbar-logo-white", "navbar-logo-light");

      isLight = true;
    }
  }
  
  function makeNavbarDark() {

    if ( isLight && isTogglable ) {
      navbar.classList.remove('navbar-light');
      navbar.classList.add('navbar-dark');
      navbarLogo.src = navbarLogo.src.replace("navbar-logo-light", "navbar-logo-white");
      isLight = false;
    }
  }

  function toggleNavbar(event, index) {

    if ( event == 'fpOnLeave' ) {

      if ( index == 0 ) {
        makeNavbarLight();
      } else {
        makeNavbarLight();
      }

    } else if ( event == 'collapse' ) {
      var scrollTop = window.pageYOffset;

      if ( scrollTop == 0 && isCollapsed ) {
        makeNavbarLight();
      } else {
        makeNavbarLight();
      }

    } else if ( event == 'scroll' || event == 'load' ) {
      var scrollTop = window.pageYOffset;

      if ( scrollTop == 0 && !isCollapsed && isLight ) {
        makeNavbarLight();
      } else if ( scrollTop !== 0 && !isLight ) {
        makeNavbarLight();
      }

    }

  }

  // Events
  // ======

  // Window events

  "load scroll fpOnLeave".split(' ').forEach(function(e) {
    window.addEventListener(e, function(e) {
      var type = e.type;
      var index = ( e.detail ) ? e.detail.destination.index : undefined;

      toggleNavbar(type, index);
    });
  });

  // Collapse events

  $(navbarCollapse).on({
    'show.bs.collapse': function() {
      toggleNavbar('collapse');

      isCollapsed = true;
    },
    'hidden.bs.collapse': function() {
      toggleNavbar('collapse');

      isCollapsed = false;
    }
  });

});
//
// newsletter.js
// Theme component
//

'use strict';

jQuery(document).ready(function($) {

  // Variables
  // =========

  var form = document.querySelector('#mc-embedded-subscribe-form');
  var formEmail = document.querySelector('#mce-EMAIL');
  var formClone = document.querySelectorAll('.form-mailchimp-clone');
  var formCloneEmail = document.querySelectorAll('.form-mailchimp-clone input[type="email"]');

  var message = {
    error: 'Could not connect to the registration server. Please try again later.'
  };

  // Methods
  // =======

  function signUp(form) {

    $.ajax({
      type: form.getAttribute('method'),
      url: form.getAttribute('action'),
      data: $(form).serialize(),
      cache: false,
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      error: function(err) {
        var event = new CustomEvent('alert.show', {'detail': {
          type: 'danger',
          message: message.error
        }});

        window.dispatchEvent(event);
      },
      success: function(data) {
        
        if (data.result != 'success') {
          var event = new CustomEvent('alert.show', {'detail': {
            type: 'danger',
            message: data.msg
          }});

          window.dispatchEvent(event);
        } else {

          // Show a confirmation
          var event = new CustomEvent('alert.show', {'detail': {
            type: 'success',
            message: data.msg
          }});

          window.dispatchEvent(event);
          
          // Reset the form
          form.reset();
        }
      }
    });
  }

  function imitateSignUp(form) {
    if ( form ) {
      form.submit();
    }
  }

  function copyInputContent(formCloneEmail, formEmail) {
    var val = formCloneEmail.value;

    if ( formEmail ) {
      formEmail.value = val;
    }
  }

  // Events
  // ======

  // Sign up to a Mailchimp newsletter campaign on form submit
  if ( form ) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      signUp(form);
    });
  }

  // Imitate form submission on clone submit
  if ( formClone ) {
    [].forEach.call(formClone, function(elem) {
      elem.addEventListener('submit', function(e) {
        e.preventDefault();

        imitateSignUp(form);
      });
    });
  }

  // Copy input content to the original form input field
  if ( formCloneEmail ) {
    [].forEach.call(formCloneEmail, function(elem) {
      elem.addEventListener('keyup', function() {
        copyInputContent(this, formEmail);
      });
    });
  }

});
//
// polyfill.js
// Theme polyfills
//

'use strict';

//
// Dispatch ===================================
//

jQuery(document).ready(function ($) {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
});


//
// Closest ===================================
//

(function(ELEMENT) {
    ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
    ELEMENT.closest = ELEMENT.closest || function closest(selector) {
        if (!this) return null;
        if (this.matches(selector)) return this;
        if (!this.parentElement) {return null}
        else return this.parentElement.closest(selector)
      };
}(Element.prototype));
//
// slider.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {
  
  // Variables
  // =========

  var sliders = document.querySelectorAll('.slider');
  var sliderControls = document.querySelectorAll('.slider-control');
  var sliderBinded = document.querySelectorAll('[data-bind="slider"]');

  // Methods
  // =======

  function initSlider(elem) {
    var flkty = new Flickity(elem, {
      arrowShape: 'M 35 50 L 60 25 L 65 30 L 45 50 L 65 70 L 60 75 Z',
      cellAlign: 'left',
      contain: true,
      draggable: !elem.classList.contains('slider-no-draggable'),
      fade: elem.classList.contains('slider-fade'),
      imagesLoaded: true,
      pageDots: false,
      prevNextButtons: !elem.classList.contains('slider-no-controls'),
      wrapAround: true
    });
  }

  function controlSlider(elem) {
    var direction = elem.getAttribute('data-slide');
    var selector = ( elem.getAttribute('data-target') ) ? elem.getAttribute('data-target') : elem.getAttribute('href');
    var target = document.querySelector(selector);

    // Get flickity instance
    var flkty = Flickity.data(target);
    
    // Slide specified direction
    if ( direction == 'previous' ) {
      flkty.previous();
    } else if ( direction == 'next' ) {
      flkty.next();
    }
  }

  function bindSliders(elem) {
    var flkty = Flickity.data(elem);

    // Listen to slide events
    flkty.on('change', function(index) {
      var selector = elem.getAttribute('data-target');
      var target = document.querySelector(selector);

      // Get flickity instance
      var flkty = Flickity.data(target);

      // Select slide
      flkty.select(index);
    })
  }

  // Events
  // ======

  // Init

  if ( sliders ) {
    [].forEach.call(sliders, function(elem) {
      initSlider(elem);
    });
  }

  // Control

  if ( sliderControls ) {
    [].forEach.call(sliderControls, function(elem) {
      elem.addEventListener('click', function(e) {
        e.preventDefault();

        controlSlider(this);
      });
    });
  }

  // Bind
  if ( sliderBinded ) {
    [].forEach.call(sliderBinded, function(elem) {
      bindSliders(elem);
    });
  }

});
//
// testimonials.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {
  
  // Variables
  // =========

  var testimonialSliders = document.querySelectorAll('.testimonial-slider');

  // Methods
  // =======

  function initSlider(slider) {
    new Flickity(slider, {
      cellAlign: 'center',
      initialIndex: 2,
      prevNextButtons: false,
      pageDots: false,
      contain: true,
      wrapAround: true,
      imagesLoaded: true,
      percentPosition: true
    });
  }

  // Events
  // ======

  // Init slider

  if ( testimonialSliders ) {
    [].forEach.call(testimonialSliders, function(slider) {
      initSlider(slider);
    });
  }

});
//
// year.js
// Theme module
//

'use strict';

jQuery(document).ready(function($) {
  
  // Variables
  // =========

  var year = document.querySelectorAll('.current-year');

  // Methods
  // =======

  function appendYear(elem) {
    var date = new Date().getFullYear();
    var text = document.createTextNode(date);

    elem.appendChild(text);
  }

  // Events
  // ======

  if ( year ) {
    [].forEach.call(year, function(elem) {
      appendYear(elem);
    });
  }

});
//# sourceMappingURL=main.js.map