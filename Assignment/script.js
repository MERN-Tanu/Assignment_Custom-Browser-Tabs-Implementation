$(document).ready(function () {
  let tabCount = 1;

  function createTab() {
    const tabId = `tab-${tabCount}`;
    const tabContent = `
        <div id="${tabId}" class="tab">
          <input type="text" placeholder="Enter URL">
          <button class="close">X</button>
        </div>
      `;
    $("#tabs").append(tabContent);
    $("#tab-content").append(`<iframe id="${tabId}-content"></iframe>`);
    tabCount++;

    $(`#${tabId} input`).keypress(function (e) {
      if (e.which === 13) {
        const url = $(this).val();
        if (isValidURL(url)) {
          $(`#${tabId}-content`).attr("src", url);
        } else {
          alert("Invalid URL");
        }
      }
    });

    $(`#${tabId} .close`).click(function () {
      $(`#${tabId}`).remove();
      $(`#${tabId}-content`).remove();
    });

    $(`#${tabId}`).click(function () {
      $(".tab").removeClass("active");
      $(this).addClass("active");
      $(".tab").find("input").hide();
      $(this).find("input").show().focus();
      $("#tab-content iframe").hide();
      $(`#${tabId}-content`).show();
    });
  }

  function isValidURL(url) {
    return url.startsWith("http://") || url.startsWith("https://");
  }

  $("#add-tab").click(createTab);
});
