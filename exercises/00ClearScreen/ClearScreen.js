function ClearScreen() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  
  async function setup() {
    requestAnimationFrame(draw);
  }


  function draw() {   
    // YOUR FIRST TASK!
    requestAnimationFrame(draw);
  }

  setup();
}

async function main() {
  let t = new ClearScreen();
}

main();


