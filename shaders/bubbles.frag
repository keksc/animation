#version 450

layout(location = 0) in vec2 inPosition;

layout(location = 0) out vec4 outColor;

layout( push_constant ) uniform constants {
  float time;
} pushConstants;

float bubble(vec2 uv, vec2 pos, float radius) {
    vec2 dist = uv - pos;
    return length(dist) - radius;
}

void main() {
  vec2 uv = inPosition;
    vec3 col = vec3(0.0, 0.0, 0.1);    

    vec2 bubblePositions[5];
    bubblePositions[0] = vec2(0.3, 0.6) + vec2(sin(pushConstants.time), cos(pushConstants.time)) * 0.05;
    bubblePositions[1] = vec2(0.7, 0.4) + vec2(cos(pushConstants.time * 0.8), sin(pushConstants.time * 0.8)) * 0.05;
    bubblePositions[2] = vec2(0.5, 0.5) + vec2(sin(pushConstants.time * 1.2), cos(pushConstants.time * 1.2)) * 0.03;
    bubblePositions[3] = vec2(0.8, 0.8) + vec2(cos(pushConstants.time * 0.6), sin(pushConstants.time * 0.6)) * 0.07;
    bubblePositions[4] = vec2(0.2, 0.3) + vec2(sin(pushConstants.time * 1.5), cos(pushConstants.time * 1.5)) * 0.04;
    
    float radii[5] = { 0.1, 0.12, 0.09, 0.08, 0.11 };
    
    for (int i = 0; i < 5; ++i) {
        float dist = bubble(uv, bubblePositions[i], radii[i]);
        if (dist < 0.0) {
            /*float edgeFade = smoothstep(0.0, 0.03, -dist);
            col = mix(col, vec3(1.0, 0.0, 0.7), edgeFade);*/
      col = vec3(1.0, 0.0, 0.7);
        }
    }
    
    outColor = vec4(col, 1.0);
}

