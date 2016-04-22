precision mediump float;

varying vec2 fragTexCoord;
varying vec3 fragNormal;
uniform sampler2D texture;

void main ()
{
    vec3 ambientLightIntensity = vec3(0.3, 0.3, 0.4);
    vec3 sunLightIntensity = vec3(0.7, 0.7, 0.7);
    vec3 sunLightDirection = normalize(vec3(1.0, -4.0, -10.0));

    vec4 texel = texture2D(texture, fragTexCoord);
    vec3 lightIntensity = ambientLightIntensity +
        sunLightIntensity * max(dot(fragNormal, sunLightDirection), 0.0);

    gl_FragColor = vec4(texel.xyz * lightIntensity, texel.a);
    // gl_FragColor = texture2D(texel, fragTexCoord);
}