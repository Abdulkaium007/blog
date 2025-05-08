window.onscroll = function () {
    var scrollTopButton = document.querySelector('.scroll-to-top');
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollTopButton.style.display = "block";
    } else {
      scrollTopButton.style.display = "none";
    }
  };
  