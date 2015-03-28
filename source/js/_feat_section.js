$( document ).ready(function() {
  $( '.featured' ).attr('data-image');
  $( '.featured' ).css( 'background-image', function(){
    return 'url("/images/' + $( this ).attr('data-image') + '")';
  });
});
