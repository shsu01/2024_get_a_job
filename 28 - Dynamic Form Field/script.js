var survey_options = document.getElementById('survey_options');
var add_more_fields = document.getElementById('add_fields'); // 수정된 부분
var remove_fields = document.getElementById('remove_fields'); // 수정된 부분

add_more_fields.onclick = function () {
    var newField = document.createElement('input'); // 수정된 부분
    var input_tags = survey_options.getElementsByTagName('input'); // 수정된 부분
    newField.setAttribute('type', 'text');
    newField.setAttribute('name', 'survey_options[]');
    newField.setAttribute('class', 'survey_options'); // 수정된 부분
    newField.setAttribute('size', 50); // 수정된 부분
    newField.setAttribute('placeholder', 'Another Field');
    survey_options.appendChild(newField);
    if (input_tags.length >= 2) {
        document.getElementById("remove_fields").style.visibility = "visible"; // 수정된 부분
    }
}

remove_fields.onclick = function () {
    var input_tags = survey_options.getElementsByTagName('input'); // 수정된 부분
    if (input_tags.length >= 2) {
        survey_options.removeChild(input_tags[(input_tags.length) - 1]); // 수정된 부분
        if (input_tags.length < 2) {
            document.getElementById("remove_fields").style.visibility = "hidden"; // 수정된 부분
        }
    }
}
