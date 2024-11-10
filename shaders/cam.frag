#version 450

layout(location = 0) in vec2 inPosition;

layout(location = 0) out vec4 outColor;

layout( push_constant ) uniform constants {
  float time;
} pushConstants;

void main() {
  vec2 uv = inPosition;
  uv.x *= inPosition.x/inPosition.y;
  vec3 col;
  float l;
  for(int i=0;i<3;i++) {
    vec2 p = inPosition;
    uv = p;
    p -= 0.5;
    p.x *= inPosition.x/inPosition.y;
    float z = pushConstants.time+0.7*i;
    l = length(uv);
    uv += p/l*(sin(z)+1.0)*abs(sin(l*9.0-2.0*z));
    col[i] = 0.01/length(mod(uv, 1.0)-0.5);
  }
  outColor = vec4(col/l, pushConstants.time);
}

