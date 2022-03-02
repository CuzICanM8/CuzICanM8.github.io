function redirect(destination) {
  window.location.replace(destination)
}

function onePlayer() {
  var playerNumber = {
    howManyPlayers : 1
  }
  redirect("blackjackfrontend.html")
}

function twoPlayer() {
  var playerNumber = {
    howManyPlayers : 2
  }
  redirect("blackjackonlinehostlobby.html")
}
