$(document).ready(function() {

    function validCode() {
        var message = '';
        var formMessage = $('#patientCode').parent().find('.form-message');
        if ($('#patientCode').val().length === 0) {
            message = 'Mã bệnh nhân không thể bỏ trống';
            formMessage.show();
            formMessage.text(message);
            return false;
        }

        var regexCode = /^BN-(\d{5})$/;
        if (!regexCode.test($('#patientCode').val())) {
            message = 'Mã bệnh nhân có định dạng BN-YYYYY, trong có BN cố định, YYYYY là 5 chữ số';
            formMessage.show();
            formMessage.text(message);
            return false;
        }

        formMessage.hide();
        formMessage.text(message);
        return true;
    }

    function validPassword() {
        var message = '';
        var formMessage = $('#password').parent().find('.form-message');
        if ($('#password').val().length === 0) {
            message = 'Mật khẩu không thể bỏ trống';
            formMessage.show();
            formMessage.text(message);
            return false;
        }

        if ($('#password').val().length < 6) {
            message = 'Mật khẩu chứa từ 6 ký tự bất kỳ trở lên';
            formMessage.show();
            formMessage.text(message);
            return false;
        }

        formMessage.hide();
        formMessage.text(message);
        return true;
    }

    function getPrice() {
        var service = $('input[type=checkbox][name=typeService]:checked');
        var price = 0;
        $(service).each(function() {
            price += parseFloat($(this).val());
        });
        return price;
    }

    function getSpecialist() {
        return $('#specialist option:checked').text();
    }

    function validOrderDate() {

        var message = '';
        var formMessage = $('#orderDate').parent().find('.form-message');
        if ($('#orderDate').val().length === 0) {
            message = 'Ngày khám không được bỏ trống';
            formMessage.show();
            formMessage.text(message);
            return false;
        }

        var orderDate = new Date($('#orderDate').val());
        orderDate.setHours(0, 0, 0, 0);
        var dateCurrent = new Date();
        dateCurrent.setHours(0, 0, 0, 0);

        if (orderDate.getTime() <= dateCurrent.getTime()) {
            message = 'Ngày khám phải sau ngày hiện tại';
            formMessage.show();
            formMessage.text(message);
            return false;
        }

        formMessage.hide();
        formMessage.text(message);
        return true;
    }

    $('#password').blur(validPassword);
    $('#patientCode').blur(validCode);
    $('#orderDate').blur(validOrderDate);
    $.date = function(dateObject) {
        var d = new Date(dateObject);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = `${day}/${month}/${year}`;

        return date;
    };

    $('#btnCheck').click(() => {
        if (!validCode() || !validPassword() || !validOrderDate()) {
            return;
        }

        var code = $('#patientCode').val();
        var password = $('#password').val();
        var orderDate = $.date($("#orderDate").val());

        console.log(orderDate)
        var price = getPrice();
        var specialist = getSpecialist();

        var table = $('.table').children('tbody');
        var content = `<tr>
                            <td>${table.length + 1}</td>
                            <td>${code}</td>
                            <td>${password}</td>
                            <td>${orderDate}</td>
                            <td>${price}</td>
                            <td>${specialist}</td>
                        </tr>`
        $(table).append(content);

        $('#modal-id').modal('hide');
    })

});