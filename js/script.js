// Открывать лицензии в модальном окне
$('.modal-img').on('click', function(e) {
  e.preventDefault();
  $('.imagepreview').attr('src', $(this).find('img').attr('src'));
  $('#imagemodal').modal('show');
});

// In your Javascript (external .js resource or <script> tag)
$(document).ready(function() {
    $('.select2').select2({
      placeholder: 'Не выбрано',
      minimumResultsForSearch: Infinity
    });
});

// Ползунок 
var slider = document.getElementById('rangeQ');

noUiSlider.create(slider, {
  start: [ 15 ],
  step: 1,
  connect: [true, false],
  range: {
    'min': 0,
    'max': 160
  },
  pips: {
    mode: 'values',
    values: [0, 10, 20, 40, 80, 120, 160],
    density: 9999
  },
  format: {
    to: function ( value ) {
      return value;
    },
    from: function ( value ) {
      return value.replace();
    }
  }
});

var inputFormat = document.getElementById('input-format');

slider.noUiSlider.on('update', function( values, handle ) {
  inputFormat.value = values[handle];
});

inputFormat.addEventListener('change', function(){
  slider.noUiSlider.set(this.value);
});