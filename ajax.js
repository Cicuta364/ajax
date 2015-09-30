

function formatearNumero(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}


$(document).ready(function() {
	$.ajax( 'http://www.mindicador.cl/api' )
	.done(function( data ){
		var respuesta = $('#respuesta');
		var ufs = $('#uf');
		var elplazo = $('#elplazo');
		var enviar = $('#enviar');


		$('#enviar').click(function(e) {
			e.preventDefault();
			var credito = $('#uf').val();
			var plazo = $('#elplazo').val();
			var interes =  plazo * 0.03;
			var credito_pesos = credito * data.uf.valor;
			var valor_total = credito_pesos * interes;
			var plazo_pago = valor_total / plazo;
			var html = "<p class='solicitud'> Para un préstamo de ";
			html += "<b>" + formatearNumero(parseInt(credito_pesos)) + "</b> pesos en "
			html += "<b>" + plazo + "</b> plazo. </p>";
			html += "<p class='total'> Debes pagar ";
			html += "<b>" + formatearNumero(parseInt(valor_total)) + "</b> pesos "
			html += "en cuotas de <b>" + formatearNumero(parseInt(plazo_pago)) + "</b> pesos. </p>"

			respuesta.html(html);
		});
	})
	.fail(function( err ){
		console.log('Error '+ err.status);
	})
});

