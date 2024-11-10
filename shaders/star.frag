#version 450

layout(location = 0) in vec2 inPosition;

layout(location = 0) out vec4 outColor;

layout( push_constant ) uniform constants {
  float time;
} pushConstants;

void main() {
  vec2 uv = inPosition;
  vec2 center = vec2(0.5, 0.5);
  float radius = 0.5;
  float angle = pushConstants.time * (-3.0);
  vec2 pos = center + radius*vec2(cos(angle), sin(angle));

  float distance = distance(uv, pos);

  float col = pow(sin(uv.x/distance/pos.y), 5.0);

  outColor = vec4(abs(cos(pushConstants.time*0.2))-col, abs(sin(pushConstants.time))-col, abs(sin(pushConstants.time*0.5))-col, 1.0);
}
