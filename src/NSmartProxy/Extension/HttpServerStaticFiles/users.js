﻿//@ sourceURL= user.js
(function () {
    var template = "<tr><td><input type='checkbox' value='{cbxval}'></td><td>{ID}</td><td>{Username}</td><td>{RegisterTime}</td><td>{Status}</td></tr>";

    selectUsers();
})();

function addUser() {
    $("#divAddUser").collapse('show');
}

function addUser_submit() {
    $.get(basepath + "AddUser?userid=" + $("#inputEmail1").val()
        + "&userpwd=" + $("#inputPassword1").val(),
        function (res) {
            if (res.State == 0) { alert("保存失败：" + res.Msg); return; }
            alert('保存成功');
            $("#divAddUser").collapse('hide');
            selectUsers();
            $("#inputPassword1").val("");
            $("#inputEmail1").val("");
        }

    );

}
function delUser() {
    if (!confirm('是否删除')) {
        return;
    }
    var ids = [];
    $('input[name="cbxUserIds"]:checked').each(function () {//遍历每一个名字为interest的复选框，其中选中的执行函数    
        ids.push($(this).val());//将选中的值添加到数组chk_value中    
    });

    $.get(basepath + "RemoveUser?id=" + ids.join(','), function (res) {
        alert('删除成功');
        selectUsers();
    });

}
function selectUsers() {

    $.get(basepath + "GetUsers", function (res) {
        var data = res.Data;
        var htmlStr = "";
        var i = 0;
        for (i in data) {
            var user = $.parseJSON(data[i]);
            htmlStr += "<tr>" +
                "<td> <input type='checkbox' name='cbxUserIds' value='" + i + "'></td>" +
                "<td>" + i + "</td>" +
                "<td>" + user.userId + "</td>" +
                "<td>" + user.regTime + "</td>" +
                "<td>" + 1 + "</td>" +
                "</tr>";
            i++;
        }
        $("#user_tb_body").html(htmlStr);

    });
}