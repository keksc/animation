#version 450

layout(location = 0) in vec2 inPosition;

layout(location = 0) out vec4 outColor;

layout( push_constant ) uniform constants {
  float time;
} pushConstants;

/*vec2 random(vec2 uv) {
  return vec2(fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123));
}

vec2 voronoi(vec2 uv, float columns, float rows) {
  vec2 index_uv = floor(vec2(uv.x * columns, uv.y * rows));
  vec2 fract_uv = fract(vec2(uv.x * columns, uv.y * rows));

  float minDist = 1.0;
  vec2 minPoint;

  for(int y=-1;y<=1;y++) {
    for(int x=-1;x<=1;x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 point = random(index_uv + neighbor);
      
      float speed = 4.5;
      point = vec2(cos(pushConstants.time * point.x * speed), sin(pushConstants.time * point.y * speed)) * 0.5 + 0.5;

      vec2 diff = neighbor + point - fract_uv;
      float dist = length(diff);

      if(dist < minDist) {
        minDist = dist;
        minPoint = point;
      }
    }
  }
  return minPoint;
}

void main() {
  float col = voronoi(inPosition, 10.0, 5.0).r;
  outColor = vec4(col, 0.0, col * 0.7, 1.0);
}*/
float bubble(vec2 uv, vec2 pos, float radius) {
    vec2 dist = uv - pos;
    return length(dist) - radius;
}

void main() {
  vec2 uv = inPosition;
    // Background color
    vec3 color = vec3(1.0, 0.0, 0.7); // dark blue background
    
    // Parameters for bubbles
    vec2 bubblePositions[5]; // Positions for bubbles
    bubblePositions[0] = vec2(0.3, 0.6) + vec2(sin(pushConstants.time), cos(pushConstants.time)) * 0.05;
    bubblePositions[1] = vec2(0.7, 0.4) + vec2(cos(pushConstants.time * 0.8), sin(pushConstants.time * 0.8)) * 0.05;
    bubblePositions[2] = vec2(0.5, 0.5) + vec2(sin(pushConstants.time * 1.2), cos(pushConstants.time * 1.2)) * 0.03;
    bubblePositions[3] = vec2(0.8, 0.8) + vec2(cos(pushConstants.time * 0.6), sin(pushConstants.time * 0.6)) * 0.07;
    bubblePositions[4] = vec2(0.2, 0.3) + vec2(sin(pushConstants.time * 1.5), cos(pushConstants.time * 1.5)) * 0.04;
    
    float radii[5] = { 0.1, 0.12, 0.09, 0.08, 0.11 }; // Radii of bubbles
    
    // Iterate through bubbles
    for (int i = 0; i < 5; ++i) {
        float dist = bubble(uv, bubblePositions[i], radii[i]);
        if (dist < 0.0) {
            // Calculate shading for 3D effect (basic lighting model)
            vec3 bubbleColor = vec3(0.6, 0.8, 1.0);  // Light blue color for bubbles
            float light = dot(normalize(vec2(0.5, 0.5) - uv), vec2(0.5, 0.5)) + 1.0;
            light = clamp(light, 0.0, 1.0);
            bubbleColor *= light;
            
            // Add transparency effect based on distance to edge
            float edgeFade = smoothstep(0.0, 0.03, -dist);
            color = mix(color, bubbleColor, edgeFade);
        }
    }
    
    outColor = vec4(color, 1.0); // Final color output
}

