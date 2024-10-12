#version 450

layout(location = 0) in vec2 inPosition;

layout(location = 0) out vec4 outColor;

layout( push_constant ) uniform constants {
  float time;
} pushConstants;

vec2 random(vec2 uv) {
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
}

