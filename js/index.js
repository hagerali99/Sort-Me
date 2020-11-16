jQuery(function () {
  var n = 32,
    blockwidth = Math.floor((getWindowWidth() - 32) / n - 8);
  var sorted = false;
  var swapDelay = 1;
  var data = [];
  var CompareColor = "#FF0000",
    BarsColor = "#FFFF00";
  initBars(n, blockwidth);
  function initBars(numberOfBars, bWidth) {
    $("#block_container").empty();
    var maxHeight = Math.floor((getWindowHeight() * 55) / 100);
    n = numberOfBars;
    sorted = false;
    for (i = 0; i < n; i++) {
      var randValue = Math.floor(Math.random() * maxHeight);
      while (randValue < 10) {
        randValue = Math.floor(Math.random() * maxHeight);
      }
      data[i] = randValue;
      $("#block_container").append(
        "<div class='block' id='bar" + i + "'></div>"
      );
      $("#bar" + i).height(data[i] + "px");
      $("#bar" + i).width(bWidth + "px");
      $("#bar" + i).css("background", BarsColor);
    }
  }

  function getWindowWidth() {
    return $(window).width();
  }

  function getWindowHeight() {
    return $(window).height();
  }

  function disableElement(btn) {
    $(btn).prop("disabled", true);
    $(btn).addClass("noHover");
  }

  function enableElement(btn) {
    $(btn).prop("disabled", false);
    $(btn).removeClass("noHover");
  }

  function enableAll() {
    enableElement("#bubble_sort");
    enableElement("#insertion_sort");
    enableElement("#selection_sort");
    enableElement("#merge_sort");
    enableElement("#quick_sort");
    enableElement("#size_slider");
  }
  function disableAll() {
    disableElement("#bubble_sort");
    disableElement("#insertion_sort");
    disableElement("#selection_sort");
    disableElement("#merge_sort");
    disableElement("#quick_sort");
    disableElement("#size_slider");
  }

  function swapValues(i, j) {
    var slideValue = Math.abs(j - i) * 38;
    var slideLeft, slideRight;
    if (i > j) {
      slideLeft = i;
      slideRight = j;
    } else {
      slideLeft = j;
      slideRight = i;
    }
    $("#bar" + slideRight).animate({ left: "+=" + slideValue }, swapDelay);
    $("#bar" + slideLeft).animate(
      { left: "-=" + slideValue },
      swapDelay,
      function () {
        swapCss(i, j);
      }
    );
  }

  function swapValuesWithOutAnimation(i, j) {
    var slideValue = Math.abs(j - i) * 38;
    var slideLeft, slideRight;
    if (i > j) {
      slideLeft = i;
      slideRight = j;
    } else {
      slideLeft = j;
      slideRight = i;
    }
    $("#bar" + slideRight).css({ left: "+=" + slideValue });
    $("#bar" + slideLeft).css({ left: "-=" + slideValue });
    swapCss(i, j);
  }

  function changeHeight(i, newHeight) {
    $("#bar" + i).height(newHeight + "px");
  }

  function changeHeightWithAnimation(i, newHeight) {
    $("#bar" + i).animate({ height: newHeight }, swapDelay);
  }

  function delay(time) {
    return new Promise((r) => setTimeout(r, time));
  }

  function swapCss(i, j) {
    var height1 = $("#bar" + i).css("height");
    var height2 = $("#bar" + j).css("height");
    var v1 = $("#bar" + i).css("visibility");
    var v2 = $("#bar" + j).css("visibility");
    $("#bar" + i).css({ left: "0px", height: height2, visibility: v2 });
    $("#bar" + j).css({ left: "0px", height: height1, visibility: v1 });
  }

  function swapData(i, j) {
    temp = data[i];
    data[i] = data[j];
    data[j] = temp;
  }

  function changeColor(i, newColor) {
    $("#bar" + i).css("background", newColor);
  }

  function changeAllBarsColors(newColor) {
    $(".block").css("background", newColor);
  }

  function changeColorWithAnimation(i, newColor) {
    $("#bar" + i).animate({ "background-color": newColor }, "fast");
    $("#bar" + j).animate({ "background-color": newColor }, "fast");
  }

  function toggleColor(i, from, to) {
    $("#bar" + i).css("background", from);
    $("#bar" + i)
      .delay(swapDelay)
      .queue(function (next) {
        $(this).css("background", to);
        next();
      });
  }
  function changeDisplay(i, display) {
    $("#bar" + i).css("visibility", display);
  }

  async function BubleSort() {
    while (n > 1) {
      for (i = 0; i < n - 1; i++) {
        changeColor(i, CompareColor);
        changeColor(i + 1, CompareColor);
        await delay(swapDelay);

        if (data[i + 1] < data[i]) {
          swapValuesWithOutAnimation(i, i + 1);
          swapData(i, i + 1);
        }
        changeColor(i, BarsColor);
        changeColor(i + 1, BarsColor);
      }
      n--;
    }
    sorted = true;
  }

  async function InsertionSort() {
    var j, currentElement;
    for (i = 1; i < n; i++) {
      currentElement = data[i];

      changeColor(i, CompareColor);
      await delay(swapDelay);
      changeDisplay(i, "hidden");

      for (j = i - 1; j >= 0; j--) {
        changeColor(j, CompareColor);
        await delay(swapDelay);

        if (data[j] < currentElement) break;
        data[j + 1] = data[j];

        swapValuesWithOutAnimation(j, j + 1);
        changeColor(j + 1, BarsColor);
      }
      changeDisplay(j + 1, "visible");
      await delay(swapDelay);
      changeColor(j + 1, BarsColor);
      changeColor(j, BarsColor);
      data[j + 1] = currentElement;
    }
    sorted = true;
  }

  async function selection_sort() {
    var minIndex;
    for (i = -1; i < n - 1; i++) {
      minIndex = i + 1;
      changeColor(i + 1, CompareColor);
      for (j = i + 1; j < n; j++) {
        changeColor(j, CompareColor);
        await delay(swapDelay);

        if (data[j] < data[minIndex]) {
          changeColor(minIndex, BarsColor);
          minIndex = j;
          changeColor(minIndex, CompareColor);
          await delay(swapDelay);
        }
        if (j != minIndex) {
          changeColor(j, BarsColor);
          await delay(swapDelay);
        }
      }
      swapValuesWithOutAnimation(i + 1, minIndex);
      changeColor(i + 1, BarsColor);
      changeColor(minIndex, BarsColor);
      swapData(i + 1, minIndex);
    }
    sorted = true;
  }

  async function mergeSort(l, r) {
    if (l < r) {
      var m = Math.floor((l + r) / 2);
      await mergeSort(l, m);
      await mergeSort(m + 1, r);
      await merge(l, m, r);
    }
    sorted = true;
  }

  async function merge(l, m, r) {
    var infinity = 2e9;
    var size1 = m - l + 1;
    var size2 = r - m;
    var left = [],
      right = [];
    for (i = 0; i < size1; i++) left.push(data[l + i]);
    for (i = 0; i < size2; i++) right.push(data[m + 1 + i]);
    left.push(infinity);
    right.push(infinity);
    var i = 0,
      j = 0,
      k = l;
    while (k <= r) {
      changeColor(l + i, CompareColor);
      changeColor(m + 1 + j, CompareColor);
      await delay(swapDelay);

      if (left[i] < right[j]) {
        data[k] = left[i];
        changeColor(l + i, BarsColor);
        changeColor(m + 1 + j, BarsColor);
        i++;
      } else {
        data[k] = right[j];
        changeColor(m + 1 + j, BarsColor);
        changeColor(l + i, BarsColor);
        j++;
      }
      k++;
    }
    for (i = l; i <= r; i++) {
      changeColor(i, CompareColor);
      changeHeight(i, data[i], swapDelay);
      await delay(swapDelay);
      changeColor(i, BarsColor);
    }
  }

  async function quickSort(l, r) {
    if (l < r) {
      var pivotPosition = await partition(l, r);
      await quickSort(l, pivotPosition - 1);
      await quickSort(pivotPosition + 1, r);
    }
    sorted = true;
  }

  async function colorSwapColor(i, j) {
    changeColor(i, CompareColor);
    changeColor(j, CompareColor);
    await delay(swapDelay);
    swapValuesWithOutAnimation(i, j);
    //await delay(swapDelay + 10);
    changeColor(i, BarsColor);
    changeColor(j, BarsColor);
  }

  async function partition(l, r) {
    var indexOfSmallestElement = l - 1,
      pivotIndex = Math.floor((r + l) / 2),
      pivot;
    swapData(r, pivotIndex);

    await colorSwapColor(r, pivotIndex);

    pivotIndex = r;
    pivot = data[r];
    changeColor(pivotIndex, CompareColor);
    await delay(swapDelay);

    for (i = l; i <= r; i++) {
      changeColor(i, CompareColor);
      await delay(swapDelay);
      if (data[i] < pivot) {
        indexOfSmallestElement += 1;
        await colorSwapColor(indexOfSmallestElement, i);
        swapData(indexOfSmallestElement, i);
      }
      changeColor(i, BarsColor);
    }
    indexOfSmallestElement++;
    await colorSwapColor(indexOfSmallestElement, pivotIndex);
    swapData(indexOfSmallestElement, pivotIndex);

    return indexOfSmallestElement;
  }

  $(window).resize(function () {
    blockwidth = Math.floor((getWindowWidth() - 32) / n - 8);
    initBars(n, blockwidth);
  });

  $("#size_slider").change(function () {
    n = $(this).val();
    blockwidth = Math.floor((getWindowWidth() - 32) / n - 8);
    initBars(n, blockwidth);
    $("#slider_value").empty();
    $("#slider_value").append(n);
  });

  $("#delay_slider").change(function () {
    swapDelay = $(this).val();
    $("#delay_slider_value").empty();
    $("#delay_slider_value").append(swapDelay);
  });

  $("#BarColorPicker").change(function () {
    BarsColor = $(this).val();
    changeAllBarsColors(BarsColor);
  });

  $("#CompareColorPicker").change(function () {
    CompareColor = $(this).val();
  });

  $("#quick_sort").click(async function () {
    if (sorted) initBars(n, blockwidth);
    disableAll();
    await quickSort(0, n - 1);
    enableAll();
  });
  $("#merge_sort").click(async function () {
    if (sorted) initBars(n, blockwidth);
    disableAll();
    await mergeSort(0, n - 1);
    enableAll();
  });

  $("#insertion_sort").click(async function () {
    if (sorted) initBars(n, blockwidth);
    disableAll();
    await InsertionSort();
    enableAll();
  });

  $("#selection_sort").click(async function () {
    if (sorted) initBars(n, blockwidth);
    disableAll();
    await selection_sort();
    enableAll();
  });
  i = 0;
  $("#bubble_sort").click(async function () {
    if (sorted) initBars(n, blockwidth);
    disableAll();
    var size = n;
    await BubleSort();
    n = size;
    enableAll();
  });
});
