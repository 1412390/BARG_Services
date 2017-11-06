$(document).ready(function () {

    $('body').on('focus','#dob', function () {

        $('#dob').datepicker({
            dateFormat: 'yy/mm/dd',
            maxDate: new Date()
        });
    });

});