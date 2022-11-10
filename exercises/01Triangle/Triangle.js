
import GLSLProgram from "./../../lib/helper/glsl-program.js";
import { loadDataFromURL } from "./../../lib/helper/http.js";

function SimpleTriangle() {
  const mCanvas = document.querySelector("#canvas");
  const gl = mCanvas.getContext("webgl2");
  let mGlslProgram = null;
  let vao = null;

  async function setup() {
    // 1. Create Mesh on the CPU
    // 1.1 Positions
    const positions = [
      0.0, 1.0, 0.0, 1.0,
      1.0, -1.0, 0.0, 1.0,
      -1.0, -1.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 0.0];

    // 1.2 Colors
    const colors = 
    [
      0.2 , 1.0, 0.2,
      0.0, 0.5, 1.0,
      0.8, 0.2, 1.0
    ];

    // 1.3 Index Buffer
    const indices = [0, 1, 2];

    // 2. Create & Bind Vertex Array on the GPU
    vao = gl.createVertexArray(); //erstellt Array
    gl.bindVertexArray(vao); // binded Array zu GPU

    // 2.1 Create, bind and upload Vertex Positions to GPU
    const pb = gl.createBuffer(); // erstellt Positionsbuffer
    gl.bindBuffer(gl.ARRAY_BUFFER, pb); // bindet Array buffer an Positionsbuffer
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW); // Speicher zu Vertex Buffer hinzufÃ¼gen
    

    // 2.2 Configure Vertex Position attribute
    const positionAttributeLocation = 0;
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 4, gl.FLOAT, false, 0, 0);


/////////////////////////////////////////////////////////////////
    const cb = gl.createBuffer(); 
    gl.bindBuffer(gl.ARRAY_BUFFER, cb); 
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW); 
    
    const colorAttributeLocation = 1;
    gl.enableVertexAttribArray(colorAttributeLocation);
    gl.vertexAttribPointer(colorAttributeLocation, 3, gl.FLOAT, false, 0, 0);
/////////////////////////////////////////////////////////////////


    // 3. Create, bind and upload Index Buffer
    const ib = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);

    // 4. Create a Shader
    const vertexShaderUrl = document.querySelector("#vertexShader").src;
    const fragmentShaderUrl = document.querySelector("#fragmentShader").src;
    mGlslProgram = new GLSLProgram(
      mCanvas,
      await loadDataFromURL(vertexShaderUrl),
      await loadDataFromURL(fragmentShaderUrl)
    );

    requestAnimationFrame(draw);
  }


  function draw() {
    
    // 5. Clear screen (see 00ClearScreen)
    mCanvas.width = mCanvas.clientWidth;
    mCanvas.height = mCanvas.clientHeight;
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0,0, gl.canvas.width, gl.canvas.height);

    // 6. Bind shader program
    mGlslProgram.use();

    const u_scale = mGlslProgram.getUniformLocation("u_scale");
    gl.uniform1f(u_scale, 1.0);

    // 7. Bind Vertex Array Object (see step 2)
    gl.bindVertexArray(vao);
    //gl.drawElements(gl.TRIANGLES, 3, gl.UNSIGNED_INT, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    
    // 8. Draw triangle mesh.
    
    requestAnimationFrame(draw);
  }



  setup();
}

async function main() {
  let t = new SimpleTriangle();
}

main();