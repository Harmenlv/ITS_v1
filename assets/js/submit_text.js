// function text_submit()
// {
//     var text_content = $("#text_input").val();
//     alert(text_content);
//     $.post("http://localhost:3000/submit_content",
//     {
//         text_content: text_content,
//     },
//     function(data,status)
//     {
//         // 假设服务器返回的data已经是一个对象，如果不是，使用JSON.parse(data)转换
//         // data = JSON.parse(data); // 如果data不是对象，取消注释这行代码
//         var message = data.message; // 从服务器响应中获取消息
//         $("#get_response").text(message); // 将消息显示在label中

//         // 根据服务器返回的状态，执行额外的操作
//         if (data.status === "error") {
//             alert("发生错误：" + message);
//         } else {
            
//         }
//     });
// }


function text_submit() {
    var text_content = $("#text_input").val(); // 获取输入框的值

    // 使用$.ajax发送数据
    $.ajax({
        url: "http://localhost:3000/submit_content", // 服务器端的URL
        type: "POST", // 请求方法
        contentType: "application/json", // 设置请求头Content-Type为application/json
        data: JSON.stringify({ // 将数据转换为JSON字符串
            text_content: text_content
        }),
        success: function(data, status) {
            // 请求成功时的回调函数
            console.log("Response Status:", status);
            console.log("Data from server:", data);

            // 假设服务器返回的data是一个对象，如果不是，可能需要使用JSON.parse(data)转换
            var message = data.message[0].generated_text; // 从服务器响应中获取消息
            console.log(data.message);
            $("#get_response").text('output:'+message); // 将消息显示在页面上

            // 根据服务器返回的状态，执行额外的操作
            if (data.status === "error") {
                alert("发生错误：" + message);
            }
        },
        error: function(xhr, status, error) {
            // 请求失败时的回调函数
            console.error("Error - Status:", status, "Error:", error);
            alert("请求失败：" + error);
        }
    });
}


