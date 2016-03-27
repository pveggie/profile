$(document).ready(function() {

  $(document)[0].oncontextmenu = function() {return false;}
  // Good luck!

  //cover all elements
  function restart() {
    $('#mariosweeper-result-message').text("");
    $('#mariosweeper-restart').addClass('hidden');
    $('td').removeClass();
    $('td').addClass('unopened');
    placeMarios();
    placeNumbers();
  }

  var numberOfElements = $('td').length;
  var numberOfMarios = numberOfMarios()

  //populate grid
  function numberOfMarios () {
    var multiplier = Math.random() + 1;
    var numberOfMarios = Math.floor(numberOfElements/10 * multiplier);
    return numberOfMarios;
  }

  function getMarioLocations () {
   var i = numberOfMarios;
   var indexes = [];

   while (indexes.length < i) {
    index = Math.floor(Math.random() * numberOfElements);
    if (!indexes.includes(index)) {
      indexes.push(index);
    };
  }
  return indexes;
}

function placeMarios() {
  $('td').removeClass('mario')
  marioLocations = getMarioLocations();
  marioLocations.forEach( function(location) {
    $('td:eq(' + location+ ')').addClass('mario');
  });
}

function placeNumbers() {

  var marioCount = 0;

  $('td').each(function() {

    var marioCount = 0;
    var cell = $(this);
    var cellId = cell.attr('id');
    var data= cellId.match(/\D+(\d)\-\D+(\d)/);
    var row = parseInt(data[1]);
    var column = parseInt(data[2]);
    var directions =
    [{row: -1, col: -1},
    {row: -1, col: 0},
    {row: -1, col: 1},
    {row: 0, col: -1},
    {row: 0, col: 0},
    {row: 0, col: 1},
    {row: 1, col: -1},
    {row: 1, col: 0},
    {row: 1, col: 1}];

    if (!cell.hasClass('mario')) {
      directions.forEach( function(direction) {
        if ($('#row' + (row + direction.row) + '-col' +
          (column + direction.col)).hasClass('mario')) {
          marioCount += 1;
      };

    });

      cell.addClass('mario-neighbour-' + marioCount);
    };

  });

};

function lose() {
  $('#mariosweeper-result-message').text("Ouch! It's-a-he!");
  $('#mariosweeper-restart').removeClass('hidden');
  $('td').removeClass('unopened');
  $('td').addClass('opened');

};

function checkWin() {
  var cleared = ($('.opened').length) + numberOfMarios;
  if (cleared == numberOfElements) {
    $('#mariosweeper-result-message').text("Nice one! You won!");
    $('#mariosweeper-restart').removeClass('hidden');
    $('td').removeClass('unopened');
  }
}

function rightClick (cell) {

  if (cell.hasClass('unopened')) {
    cell.addClass('flagged');
    cell.removeClass('unopened');
  }

  else if (cell.hasClass('flagged')) {
    cell.addClass('question');
    cell.removeClass('flagged');

  }
  else if (cell.hasClass('question')) {
    cell.addClass('unopened');
    cell.removeClass('question');

  };
};

function leftClick (cell) {

  if (cell.hasClass('unopened')) {
    cell.removeClass('unopened');
    cell.addClass('opened');
  };

  if (cell.hasClass('mario')) {
    lose();

  }
};

$('td').on('mousedown', function(event) {
  event.preventDefault();
      // left == 1, right == 3
      var cell = $(this);
      var button = event.keyCode || event.which;

      if (button == 3) {
        rightClick(cell);

      } else if (button == 1) {
        leftClick(cell);
      };
      checkWin();
    });

$('#mariosweeper-restart').on('click', function(event) {
  restart();
});

restart();


});
