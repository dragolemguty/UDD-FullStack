$(document).ready(function() {
    $('.hover-image').on('mouseenter', function() {
        var $this = $(this);
        var gifSrc = $this.data('gif');
        // Guarda la ruta de la imagen original antes de cambiarla
        $this.data('imgSrc', $this.attr('src'));
        $this.attr('src', gifSrc);
    }).on('mouseleave', function() {
        var $this = $(this);
        // Restaura la imagen original desde los datos almacenados
        var imgSrc = $this.data('imgSrc');
        $this.attr('src', imgSrc);
    });
});
