jQuery(document).ready(function($) {
    $("#fileUpload").on("change", function(e) {
        var file = e.target.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, { type: 'array' });

            // Suponha que a primeira planilha seja a que contém os dados
            var firstSheetName = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[firstSheetName];

            // Converter a planilha para JSON
            var jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Processar os dados
            processarDados(jsonData);
        };
        reader.readAsArrayBuffer(file);
    });

    function processarDados(data) {
        // Suponha que a primeira coluna contenha os números dos retidos
        var retidos = data.map(row => row[0]).filter(Boolean); // Filtra valores vazios

        // Atualizar a quantidade de retidos na interface
        $("#senhaAtualNumero").text(retidos.length);
        $("#senhaNormal").val(retidos.length);
    }
}); 

