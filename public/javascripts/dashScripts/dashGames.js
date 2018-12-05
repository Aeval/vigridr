getChart();
getTop5Games();

function getTop5Games() {

  var voteContent = '';

  $.ajax({
    Type: 'GET',
    url: '/games/getTop5Games/',
    dataType: 'JSON'
  }).done(function (resp) {

    $.each(resp, function(){
      voteContent += '<div class="voteStand col m4">';
      voteContent += '<div class="card hoverable small white-text z-depth-3">';
      voteContent += '<div class="card-image" style="background-image: url('+ this.pic +');background-color: #000000;background-size: cover;">';
      voteContent += '</div>';
      voteContent += '<div class="card-content center">';
      voteContent += '<h4>' + this.name + '</h4>';
      voteContent += '</div>';
      voteContent += '</div>';
      voteContent += '</div>';
    })

    $('#voteDisp').html(voteContent);
  });
}

function getChart() {

  $.ajax({
    Type: 'GET',
    url: '/games/getChart/',
    dataType: 'JSON'
  }).done(function (resp) {

    var ctx = document.getElementById("dashGameChart");
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [resp[0].name, resp[1].name, resp[2].name, resp[3].name, resp[4].name, resp[5].name, resp[6].name, resp[7].name, resp[8].name, resp[9].name, resp[10].name, resp[11].name],
        datasets: [{
          label: '# of Votes',
          data: [resp[0].votes, resp[1].votes, resp[2].votes, resp[3].votes, resp[4].votes, resp[5].votes, resp[6].votes, resp[7].votes, resp[8].votes, resp[9].votes, resp[10].votes, resp[11].votes],
          backgroundColor: [
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 96, 0, 0.8)',
            'rgba(255, 192, 0, 0.8)',
            'rgba(255, 255, 0, 0.8)',
            'rgba(128, 220, 0, 0.8)',
            'rgba(0, 255, 0, 0.8)',
            'rgba(0, 255, 224, 0.8)',
            'rgba(0, 125, 255, 0.8)',
            'rgba(0, 0, 255, 0.8)',
            'rgba(96, 0, 255, 0.8)',
            'rgba(224, 0, 255, 0.8)',
            'rgba(255, 0, 128, 0.8)'
          ],
          borderColor: [
            'rgba(255, 0, 0, 0.8)',
            'rgba(255, 96, 0, 0.8)',
            'rgba(255, 192, 0, 0.8)',
            'rgba(255, 255, 0, 0.8)',
            'rgba(128, 255, 0, 0.8)',
            'rgba(0, 255, 0, 0.8)',
            'rgba(0, 255, 224, 0.8)',
            'rgba(0, 125, 255, 0.8)',
            'rgba(0, 0, 255, 0.8)',
            'rgba(96, 0, 255, 0.8)',
            'rgba(224, 0, 255, 0.8)',
            'rgba(255, 0, 128, 0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: '#ffffff'
          }
        }
      }
    });
  })
}