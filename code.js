var TimeZone = -7; // PT

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "track.csv",
    dataType: "text",
    success: function (data) {
      check(data);
    },
  });
});

function check(csv_text) {
  var data = $.csv.toArrays(csv_text);
  var date = new Date();
  var workedOut = false;
  var redditLink = "";

  date.setHours(date.getHours() + TimeZone);
  var today = date.toJSON().slice(0, 10).replace(/-/g, "/");

  data.forEach((i) => {
    if (i[0] == today && i[1] != "") {
      workedOut = true;
      redditLink = i[1];
    }
  });

  var iconYes = document.getElementById("icon-yes");
  var iconNo = document.getElementById("icon-no");
  var label = document.getElementById("label");

  var anchor = document.createElement('a');
  anchor.classList.add('underline');
  anchor.href = redditLink;

  var text = document.createElement('p');

  if (workedOut) {
    iconYes.classList.remove("hidden");
    text.textContent = "fuck yes king."
    document.body.classList.add('bg-green')
    label.appendChild(anchor);
    anchor.appendChild(text);
  } else {
    iconNo.classList.remove("hidden");
    text.textContent = "nope."
    document.body.classList.add('bg-red')
    label.appendChild(text);
  }
}
