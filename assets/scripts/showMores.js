
function setupSeeMore(elem, block, group) {
  elem.innerHTML = "See more <i>" + group + "</i> pages »"
  elem.addEventListener('click', () => {
    var cur = block.style.getPropertyValue("display")
    if (cur == "unset") {
      block.style.setProperty("display", "none")
      elem.innerHTML = "See more <i>" + group + "</i> pages »"
    }
    else {
      elem.innerHTML = "See less <i>" + group + "</i> pages «"
      block.style.setProperty("display", "unset")
    }
  })
}

window.addEventListener('load', () => {
  seeMores = document.getElementsByClassName("SeeMore")
  
  var index = 0
  
  for (index = 0; index < seeMores.length; index++) {
    var elem = seeMores[index]
    var group = elem.getAttribute("group")
    var h = document.getElementById("#Older-" + group)
    setupSeeMore(elem, h, group)
  }
})

