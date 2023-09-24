export function drawRotatingRectangle(gl) {
    // 頂点座標データ
    const vertices = new Float32Array([
        -0.5, -0.5,
        0.5, -0.5,
        0.5, 0.5,
        -0.5, 0.5
    ]);

    // 頂点座標バッファを作成
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // シェーダープログラム
    const vertexShaderSource = `
        attribute vec2 a_position;
        uniform mat4 u_matrix;

        void main() {
            gl_Position = u_matrix * vec4(a_position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        uniform vec4 u_color;

        void main() {
            gl_FragColor = u_color;
        }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // 頂点位置属性を有効化
    const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // 四角形の色
    const colorLocation = gl.getUniformLocation(shaderProgram, 'u_color');
    gl.uniform4fv(colorLocation, [0.0, 0.0, 1.0, 1.0]); // 青色

    // 回転行列
    const matrixLocation = gl.getUniformLocation(shaderProgram, 'u_matrix');
    const rotationMatrix = new Float32Array(16);

    // 描画ループ
    let angle = 0;
    function draw() {
        angle += 1; // 回転角度を更新

        // 回転行列を計算
        const radians = (angle * Math.PI) / 180;
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        rotationMatrix[0] = cos;
        rotationMatrix[1] = sin;
        rotationMatrix[4] = -sin;
        rotationMatrix[5] = cos;
        rotationMatrix[10] = 1;
        rotationMatrix[15] = 1;

        gl.uniformMatrix4fv(matrixLocation, false, rotationMatrix);

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    return draw;
}

