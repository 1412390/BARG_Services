$(document).ready(function () {

    $('body').on('focus','#dob', function () {

        $('#dob').datepicker({
            dateFormat: 'yy/mm/dd',
            maxDate: new Date()
        });
    });

    $('a.list-group-item.list-group-item-action').on('click', function () {

        const id = $(this).attr('id');
        let url = '';
        switch (parseInt(id)){// infor account
            case 1:
                url = "/users/get-information";
                break;
            case 2://switchboard
                //url = "/users/get-switchboard"
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }
        if(url === ''){
            return;
        }

        $('a.list-group-item.list-group-item-action').each(function () {

            $(this).removeClass('active');
        });
        $(this).addClass('active');

        $('.right-main-body').load(url);
    });

});