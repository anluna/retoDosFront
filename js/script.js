$(document).ready(function() {
  var datos;

  $.getJSON('autocomplete.json', function(data) {
    datos = data;
    mostrarDatos();
  });

  function mostrarDatos() {
    $('#table-body').empty();

    $.each(datos, function(key, value) {
      var row = $('<tr>');
      row.append($('<td>').text(value.label));
      row.append($('<td>').text(value.value));
      row.append($('<td>').text(value.tipo));
      row.append($('<td>').text(value.marca));
      row.append($('<td>').text(value.CODIGO));

      var actions = $('<td>');
      var editButton = $('<button class="acciones">').text('Editar');
      var deleteButton = $('<button class="acciones" >').text('Eliminar');

      editButton.click(function() {
        mostrarFormularioEditar(value);
      });

      deleteButton.click(function() {
        eliminarDato(value);
      });

      actions.append(editButton);
      actions.append(deleteButton);

      row.append(actions);
      $('#table-body').append(row);
    });
  }

  function mostrarFormularioEditar(dato) {
    $('#edit-label').val(dato.label);
    $('#edit-value').val(dato.value);
    $('#edit-tipo').val(dato.tipo);
    $('#edit-marca').val(dato.marca);
    $('#edit-codigo').val(dato.CODIGO);
    
    $('#edit-form').show();
    
    $('#edit-submit').off('click').on('click', function() {
      editarDato(dato);
    });
    
    $('#edit-cancel').off('click').on('click', function() {
      cancelarEdicion();
    });
  }
  
  function editarDato(dato) {
    var nuevoLabel = $('#edit-label').val();
    var nuevoValue = $('#edit-value').val();
    var nuevoTipo = $('#edit-tipo').val();
    var nuevaMarca = $('#edit-marca').val();
    var nuevoCodigo = $('#edit-codigo').val();
    
    dato.label = nuevoLabel;
    dato.value = nuevoValue;
    dato.tipo = nuevoTipo;
    dato.marca = nuevaMarca;
    dato.CODIGO = nuevoCodigo;
    
    $('#edit-form').hide();
    mostrarDatos();
  }
  
  function cancelarEdicion() {
    $('#edit-form').hide();
  }
  
  function eliminarDato(dato) {
    console.log('Eliminar:', dato.label);
  }
});
