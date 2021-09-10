$(document).ready(function () {
    //-------------------------------SELECT CASCADING-------------------------//
    var selectedCountry = (selectedRegion = selectedCity = "");
  
   
    var BATTUTA_KEY = "41eb5c912d94cfae4728f97b790167f5";
    // Populate country select box from battuta API
    url =
      "https://battuta.medunes.net/api/country/all/?key=" +
      BATTUTA_KEY +
      "&callback=?";
  
    // EXTRACT JSON DATA.
    $.getJSON(url, function (data) {
      console.log(data);
      $.each(data, function (index, value) {
        // APPEND OR INSERT DATA TO SELECT ELEMENT.
        $("#country").append(
          '<option value="' + value.code + '">' + value.name + "</option>"
        );
      });
    });
    // Country selected --> update region list .
    $("#country").change(function () {
      selectedCountry = this.options[this.selectedIndex].text;
      countryCode = $("#country").val();
      // Populate country select box from battuta API
      url =
        "https://battuta.medunes.net/api/region/" +
        countryCode +
        "/all/?key=" +
        BATTUTA_KEY +
        "&callback=?";
      $.getJSON(url, function (data) {
        $("#region option").remove();
        $.each(data, function (index, value) {
          // APPEND OR INSERT DATA TO SELECT ELEMENT.
          $("#region").append(
            '<option value="' + value.region + '">' + value.region + "</option>"
          );
        });
      });
    });
    // Region selected --> updated city list
    $("#region").on("change", function () {
      selectedRegion = this.options[this.selectedIndex].text;
      // Populate country select box from battuta API
      countryCode = $("#country").val();
      region = $("#region").val();
      url =
        "https://battuta.medunes.net/api/city/" +
        countryCode +
        "/search/?region=" +
        region +
        "&key=" +
        BATTUTA_KEY +
        "&callback=?";
      $.getJSON(url, function (data) {
        console.log(data);
        $("#city option").remove();
        $.each(data, function (index, value) {
          // APPEND OR INSERT DATA TO SELECT ELEMENT.
          $("#city").append(
            '<option value="' + value.city + '">' + value.city + "</option>"
          );
        });
      });
    });
    // city selected --> update location string
    $("#city").on("change", function () {
      selectedCity = this.options[this.selectedIndex].text;
      $("#location").html(
        "Locatation: Country: " +
        selectedCountry +
        ", Region: " +
        selectedRegion +
        ", City: " +
        selectedCity
      );
    });
  });