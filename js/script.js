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
