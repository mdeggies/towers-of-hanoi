'use strict';

var $left_tower;
var $middle_tower;
var $right_tower;
var $paddle1;
var $paddle2;
var $paddle3;
var $paddle4;
var $reset;

var tower_selected = false;
var selected_tower;
var previous_tower;

$(document).ready(init);

function init() {
  $left_tower = $('.left_tower');
  $middle_tower = $('.middle_tower');
  $right_tower = $('.right_tower');
  $paddle1 = $('#paddle-1');
  $paddle2 = $('#paddle-2');
  $paddle3 = $('#paddle-3');
  $paddle4 = $('#paddle-4');
  $reset = $('#reset');
  $left_tower.on('click', towerClicked);
  $middle_tower.on('click', towerClicked);
  $right_tower.on('click', towerClicked);
}

function towerClicked(event) {
  if (!tower_selected) {
    tower_selected = true;
    previous_tower = $(this);
  }
  else {
    selected_tower = $(this);
    tower_selected = false;
    if (previous_tower === selected_tower) {
      return;
    }
    else {
      if (($right_tower.children(':nth-child(1)')).children().length >= 4) {
        event.stopPropagation();
        $('.fancy_title').text('You won!')
      }
      else {
        paddleMove();
      }
    }
  }
}

function paddleMove() {
  var move_me = (previous_tower.children(':nth-child(1)')).children(':nth-child(1)');
  console.log('move 1st child:',move_me);
  if (selected_tower.children(':nth-child(1)').children().length < 1) { //no children
    selected_tower.children(':nth-child(1)').prepend(move_me);
    console.log('to this location:',selected_tower.children(':nth-child(1)'));
  }
  else {
    var paddle_check = (selected_tower.children(':nth-child(1)')).children(':nth-child(1)');
    var goto_id = (paddle_check.attr('id').replace(/p/,''));
    var move_me_id = (move_me.attr('id').replace(/p/,''));
    if (move_me_id < goto_id) {
      selected_tower.children(':nth-child(1)').prepend(move_me);
    }
    else {
      return;
    }
  }
}
