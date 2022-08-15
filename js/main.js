const gap = 16;

const carousel = document.getElementById("carousel"),
  content = document.getElementById("content"),
  next = document.getElementById("next"),
  prev = document.getElementById("prev");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));


window.addEventListener('load', function() {
  const redcar = document.querySelector(".redcar");
  const bluecar = this.document.querySelector(".bluecar");
  if (window.innerWidth > 1400){
    redcar.style.left = '-2000px';
    bluecar.style.right = '-2000px';
    redcar.style.transform = 'translateX(2000px)';
    bluecar.style.transform = 'translateX(-2000px)';
  } else {
    redcar.style.position = 'relative';
    redcar.style.left = '-2000px';
    redcar.style.transform = 'translateX(2000px)';
  }  
});

document.querySelectorAll('.product__card').forEach(item =>{
  item.addEventListener('mouseover', ()=>{
    item.querySelector('.product__card-popup').classList.remove('none');
    item.querySelector('.popup-btn').classList.remove('none');
    item.addEventListener('mouseout', ()=>{
      item.querySelector('.product__card-popup').classList.add('none');
      item.querySelector('.popup-btn').classList.add('none');
    })
  })
});

document.querySelectorAll('.popup-btn').forEach(item=>{
  item.addEventListener('click', (e)=>{
    const product = e.target.parentElement.querySelector('.product__card-title').textContent;
    document.querySelector('#input-product').value = product;
  })
});


function filterFunction(that, event) {
  let container, input, filter, li, input_val;
  container = $(that).closest(".searchable");
  input_val = container.find("input").val().toUpperCase();

  if (["ArrowDown", "ArrowUp", "Enter"].indexOf(event.key) != -1) {
      keyControl(event, container)
  } else {
      li = container.find("ul li");
      li.each(function (i, obj) {
          if ($(this).text().toUpperCase().indexOf(input_val) > -1) {
              $(this).show();
          } else {
              $(this).hide();
          }
      });

      container.find("ul li").removeClass("selected");
      setTimeout(function () {
          container.find("ul li:visible").first().addClass("selected");
      }, 100)
  }
}

function keyControl(e, container) {
  if (e.key == "ArrowDown") {

      if (container.find("ul li").hasClass("selected")) {
          if (container.find("ul li:visible").index(container.find("ul li.selected")) + 1 < container.find("ul li:visible").length) {
              container.find("ul li.selected").removeClass("selected").nextAll().not('[style*="display: none"]').first().addClass("selected");
          }

      } else {
          container.find("ul li:first-child").addClass("selected");
      }

  } else if (e.key == "ArrowUp") {

      if (container.find("ul li:visible").index(container.find("ul li.selected")) > 0) {
          container.find("ul li.selected").removeClass("selected").prevAll().not('[style*="display: none"]').first().addClass("selected");
      }
  } else if (e.key == "Enter") {
      container.find("input").val(container.find("ul li.selected").text()).blur();
      onSelect(container.find("ul li.selected").text())
  }

  container.find("ul li.selected")[0].scrollIntoView({
      behavior: "smooth",
  });
}

$(".searchable input").focus(function () {
  $(this).closest(".searchable").find("ul").show();
  $(this).closest(".searchable").find("ul li").show();
});
$(".searchable input").blur(function () {
  let that = this;
  setTimeout(function () {
      $(that).closest(".searchable").find("ul").hide();
  }, 300);
});

$(document).on('click', '.searchable ul li', function () {
  $(this).closest(".searchable").find("input").val($(this).text()).blur();
});

$(".searchable ul li").hover(function () {
  $(this).closest(".searchable").find("ul li.selected").removeClass("selected");
  $(this).addClass("selected");
}); 

document.querySelector('.call-link').addEventListener('click', (e)=>{
  e.preventDefault();
  document.querySelector('.call').classList.remove('none');
  document.querySelector('.book__link').classList.add('none');
  document.querySelector('body').classList.add('no-scroll');
  document.querySelector('.call-link').classList.add('none');
  document.querySelector('.call').addEventListener('click', (e)=>{
    if(e.target === document.querySelector('.call')){
      document.querySelector('.call').classList.add('none');
      document.querySelector('.book__link').classList.remove('none');
      document.querySelector('body').classList.remove('no-scroll');
      document.querySelector('.call-link').classList.remove('none');
    };
  });
});

document.querySelectorAll('.map__point').forEach(item =>{
  item.addEventListener('mouseover', ()=>{
      item.querySelector('.map__feedback').classList.remove('none');
    item.addEventListener('mouseout', ()=>{
      item.querySelector('.map__feedback').classList.add('none');
    });
  });
});
 
$(document).ready(function() {
	$('.book__form').submit(function() { 
		if (document.querySelector('[name="name"]').value == '' || document.querySelector('[name="phone"]').value == '' || document.querySelector('[name="product"]').value == '' || document.querySelector('[name="time"]').value == '') {
			valid = false;
			return valid;
		}
		$.ajax({
			type: "POST",
			url: "main.php",
			data: $(this).serialize()
		}).done(function() {
      $('.thank-block').removeClass('none');
      document.querySelector('.thank-block').addEventListener('click', (e)=>{
        if(e.target === document.querySelector('.thank-block')){
          document.querySelector('.thank-block').classList.add('none');
        };
      });
			$(this).find('input').val('');
			$('.book__form').trigger('reset');
		});
		return false;
	});
});

$(document).ready(function() {
	$('.call__wrapper').submit(function() { 
		if (document.querySelector('.call__wrapper').querySelector('[name="phone"]').value == '') {
			valid = false;
			return valid;
		}
		$.ajax({
			type: "POST",
			url: "main.php",
			data: $(this).serialize()
		}).done(function() {
      $('.thank-block').removeClass('none');
      document.querySelector('.thank-block').addEventListener('click', (e)=>{
        if(e.target === document.querySelector('.thank-block')){
          document.querySelector('.thank-block').classList.add('none');
        };
      });
			$(this).find('input').val('');
			$('.call__wrapper').trigger('reset');
		});
		return false;
	});
});


$(function($){
	$('input[name="phone"]').mask("+7(999)-999-99-99");
});

document.querySelectorAll('.promo-link').forEach(item => {
  item.addEventListener('click', ()=>{
    document.querySelector('#input-product').value = item.querySelector('.promo__card-title').textContent;
  });
});