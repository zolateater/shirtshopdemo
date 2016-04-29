/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.3.2
 */

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE. */

!function(t,a){if("object"==typeof exports&&"object"==typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var n=a();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}(this,function(){return function(t){function a(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,a),o.loaded=!0,o.exports}var n={};return a.m=t,a.c=n,a.p="",a(0)}([function(t,a,n){a.glMatrix=n(1),a.mat2=n(2),a.mat2d=n(3),a.mat3=n(4),a.mat4=n(5),a.quat=n(6),a.vec2=n(9),a.vec3=n(7),a.vec4=n(8)},function(t,a){var n={};n.EPSILON=1e-6,n.ARRAY_TYPE="undefined"!=typeof Float32Array?Float32Array:Array,n.RANDOM=Math.random,n.ENABLE_SIMD=!1,n.SIMD_AVAILABLE=n.ARRAY_TYPE===Float32Array&&"SIMD"in this,n.USE_SIMD=n.ENABLE_SIMD&&n.SIMD_AVAILABLE,n.setMatrixArrayType=function(t){n.ARRAY_TYPE=t};var r=Math.PI/180;n.toRadian=function(t){return t*r},n.equals=function(t,a){return Math.abs(t-a)<=n.EPSILON*Math.max(1,Math.abs(t),Math.abs(a))},t.exports=n},function(t,a,n){var r=n(1),o={};o.create=function(){var t=new r.ARRAY_TYPE(4);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},o.clone=function(t){var a=new r.ARRAY_TYPE(4);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a},o.copy=function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t},o.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t},o.fromValues=function(t,a,n,o){var u=new r.ARRAY_TYPE(4);return u[0]=t,u[1]=a,u[2]=n,u[3]=o,u},o.set=function(t,a,n,r,o){return t[0]=a,t[1]=n,t[2]=r,t[3]=o,t},o.transpose=function(t,a){if(t===a){var n=a[1];t[1]=a[2],t[2]=n}else t[0]=a[0],t[1]=a[2],t[2]=a[1],t[3]=a[3];return t},o.invert=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=n*u-o*r;return l?(l=1/l,t[0]=u*l,t[1]=-r*l,t[2]=-o*l,t[3]=n*l,t):null},o.adjoint=function(t,a){var n=a[0];return t[0]=a[3],t[1]=-a[1],t[2]=-a[2],t[3]=n,t},o.determinant=function(t){return t[0]*t[3]-t[2]*t[1]},o.multiply=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=n[0],M=n[1],s=n[2],i=n[3];return t[0]=r*e+u*M,t[1]=o*e+l*M,t[2]=r*s+u*i,t[3]=o*s+l*i,t},o.mul=o.multiply,o.rotate=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=Math.sin(n),M=Math.cos(n);return t[0]=r*M+u*e,t[1]=o*M+l*e,t[2]=r*-e+u*M,t[3]=o*-e+l*M,t},o.scale=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=n[0],M=n[1];return t[0]=r*e,t[1]=o*e,t[2]=u*M,t[3]=l*M,t},o.fromRotation=function(t,a){var n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=n,t[2]=-n,t[3]=r,t},o.fromScaling=function(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=a[1],t},o.str=function(t){return"mat2("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},o.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2))},o.LDU=function(t,a,n,r){return t[2]=r[2]/r[0],n[0]=r[0],n[1]=r[1],n[3]=r[3]-t[2]*n[1],[t,a,n]},o.add=function(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t[3]=a[3]+n[3],t},o.subtract=function(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t[3]=a[3]-n[3],t},o.sub=o.subtract,o.exactEquals=function(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]},o.equals=function(t,a){var n=t[0],o=t[1],u=t[2],l=t[3],e=a[0],M=a[1],s=a[2],i=a[3];return Math.abs(n-e)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(e))&&Math.abs(o-M)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(M))&&Math.abs(u-s)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(s))&&Math.abs(l-i)<=r.EPSILON*Math.max(1,Math.abs(l),Math.abs(i))},o.multiplyScalar=function(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t},o.multiplyScalarAndAdd=function(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t[2]=a[2]+n[2]*r,t[3]=a[3]+n[3]*r,t},t.exports=o},function(t,a,n){var r=n(1),o={};o.create=function(){var t=new r.ARRAY_TYPE(6);return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},o.clone=function(t){var a=new r.ARRAY_TYPE(6);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a},o.copy=function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t},o.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=0,t[5]=0,t},o.fromValues=function(t,a,n,o,u,l){var e=new r.ARRAY_TYPE(6);return e[0]=t,e[1]=a,e[2]=n,e[3]=o,e[4]=u,e[5]=l,e},o.set=function(t,a,n,r,o,u,l){return t[0]=a,t[1]=n,t[2]=r,t[3]=o,t[4]=u,t[5]=l,t},o.invert=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=a[4],e=a[5],M=n*u-r*o;return M?(M=1/M,t[0]=u*M,t[1]=-r*M,t[2]=-o*M,t[3]=n*M,t[4]=(o*e-u*l)*M,t[5]=(r*l-n*e)*M,t):null},o.determinant=function(t){return t[0]*t[3]-t[1]*t[2]},o.multiply=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=a[4],M=a[5],s=n[0],i=n[1],c=n[2],h=n[3],S=n[4],I=n[5];return t[0]=r*s+u*i,t[1]=o*s+l*i,t[2]=r*c+u*h,t[3]=o*c+l*h,t[4]=r*S+u*I+e,t[5]=o*S+l*I+M,t},o.mul=o.multiply,o.rotate=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=a[4],M=a[5],s=Math.sin(n),i=Math.cos(n);return t[0]=r*i+u*s,t[1]=o*i+l*s,t[2]=r*-s+u*i,t[3]=o*-s+l*i,t[4]=e,t[5]=M,t},o.scale=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=a[4],M=a[5],s=n[0],i=n[1];return t[0]=r*s,t[1]=o*s,t[2]=u*i,t[3]=l*i,t[4]=e,t[5]=M,t},o.translate=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=a[4],M=a[5],s=n[0],i=n[1];return t[0]=r,t[1]=o,t[2]=u,t[3]=l,t[4]=r*s+u*i+e,t[5]=o*s+l*i+M,t},o.fromRotation=function(t,a){var n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=n,t[2]=-n,t[3]=r,t[4]=0,t[5]=0,t},o.fromScaling=function(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=a[1],t[4]=0,t[5]=0,t},o.fromTranslation=function(t,a){return t[0]=1,t[1]=0,t[2]=0,t[3]=1,t[4]=a[0],t[5]=a[1],t},o.str=function(t){return"mat2d("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+")"},o.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+1)},o.add=function(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t[3]=a[3]+n[3],t[4]=a[4]+n[4],t[5]=a[5]+n[5],t},o.subtract=function(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t[3]=a[3]-n[3],t[4]=a[4]-n[4],t[5]=a[5]-n[5],t},o.sub=o.subtract,o.multiplyScalar=function(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t[4]=a[4]*n,t[5]=a[5]*n,t},o.multiplyScalarAndAdd=function(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t[2]=a[2]+n[2]*r,t[3]=a[3]+n[3]*r,t[4]=a[4]+n[4]*r,t[5]=a[5]+n[5]*r,t},o.exactEquals=function(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]&&t[4]===a[4]&&t[5]===a[5]},o.equals=function(t,a){var n=t[0],o=t[1],u=t[2],l=t[3],e=t[4],M=t[5],s=a[0],i=a[1],c=a[2],h=a[3],S=a[4],I=a[5];return Math.abs(n-s)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(s))&&Math.abs(o-i)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(i))&&Math.abs(u-c)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(c))&&Math.abs(l-h)<=r.EPSILON*Math.max(1,Math.abs(l),Math.abs(h))&&Math.abs(e-S)<=r.EPSILON*Math.max(1,Math.abs(e),Math.abs(S))&&Math.abs(M-I)<=r.EPSILON*Math.max(1,Math.abs(M),Math.abs(I))},t.exports=o},function(t,a,n){var r=n(1),o={};o.create=function(){var t=new r.ARRAY_TYPE(9);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},o.fromMat4=function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[4],t[4]=a[5],t[5]=a[6],t[6]=a[8],t[7]=a[9],t[8]=a[10],t},o.clone=function(t){var a=new r.ARRAY_TYPE(9);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[8]=t[8],a},o.copy=function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t},o.fromValues=function(t,a,n,o,u,l,e,M,s){var i=new r.ARRAY_TYPE(9);return i[0]=t,i[1]=a,i[2]=n,i[3]=o,i[4]=u,i[5]=l,i[6]=e,i[7]=M,i[8]=s,i},o.set=function(t,a,n,r,o,u,l,e,M,s){return t[0]=a,t[1]=n,t[2]=r,t[3]=o,t[4]=u,t[5]=l,t[6]=e,t[7]=M,t[8]=s,t},o.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},o.transpose=function(t,a){if(t===a){var n=a[1],r=a[2],o=a[5];t[1]=a[3],t[2]=a[6],t[3]=n,t[5]=a[7],t[6]=r,t[7]=o}else t[0]=a[0],t[1]=a[3],t[2]=a[6],t[3]=a[1],t[4]=a[4],t[5]=a[7],t[6]=a[2],t[7]=a[5],t[8]=a[8];return t},o.invert=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=a[4],e=a[5],M=a[6],s=a[7],i=a[8],c=i*l-e*s,h=-i*u+e*M,S=s*u-l*M,I=n*c+r*h+o*S;return I?(I=1/I,t[0]=c*I,t[1]=(-i*r+o*s)*I,t[2]=(e*r-o*l)*I,t[3]=h*I,t[4]=(i*n-o*M)*I,t[5]=(-e*n+o*u)*I,t[6]=S*I,t[7]=(-s*n+r*M)*I,t[8]=(l*n-r*u)*I,t):null},o.adjoint=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=a[4],e=a[5],M=a[6],s=a[7],i=a[8];return t[0]=l*i-e*s,t[1]=o*s-r*i,t[2]=r*e-o*l,t[3]=e*M-u*i,t[4]=n*i-o*M,t[5]=o*u-n*e,t[6]=u*s-l*M,t[7]=r*M-n*s,t[8]=n*l-r*u,t},o.determinant=function(t){var a=t[0],n=t[1],r=t[2],o=t[3],u=t[4],l=t[5],e=t[6],M=t[7],s=t[8];return a*(s*u-l*M)+n*(-s*o+l*e)+r*(M*o-u*e)},o.multiply=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=a[4],M=a[5],s=a[6],i=a[7],c=a[8],h=n[0],S=n[1],I=n[2],f=n[3],x=n[4],D=n[5],F=n[6],m=n[7],d=n[8];return t[0]=h*r+S*l+I*s,t[1]=h*o+S*e+I*i,t[2]=h*u+S*M+I*c,t[3]=f*r+x*l+D*s,t[4]=f*o+x*e+D*i,t[5]=f*u+x*M+D*c,t[6]=F*r+m*l+d*s,t[7]=F*o+m*e+d*i,t[8]=F*u+m*M+d*c,t},o.mul=o.multiply,o.translate=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=a[4],M=a[5],s=a[6],i=a[7],c=a[8],h=n[0],S=n[1];return t[0]=r,t[1]=o,t[2]=u,t[3]=l,t[4]=e,t[5]=M,t[6]=h*r+S*l+s,t[7]=h*o+S*e+i,t[8]=h*u+S*M+c,t},o.rotate=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=a[4],M=a[5],s=a[6],i=a[7],c=a[8],h=Math.sin(n),S=Math.cos(n);return t[0]=S*r+h*l,t[1]=S*o+h*e,t[2]=S*u+h*M,t[3]=S*l-h*r,t[4]=S*e-h*o,t[5]=S*M-h*u,t[6]=s,t[7]=i,t[8]=c,t},o.scale=function(t,a,n){var r=n[0],o=n[1];return t[0]=r*a[0],t[1]=r*a[1],t[2]=r*a[2],t[3]=o*a[3],t[4]=o*a[4],t[5]=o*a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t},o.fromTranslation=function(t,a){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=a[0],t[7]=a[1],t[8]=1,t},o.fromRotation=function(t,a){var n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=n,t[2]=0,t[3]=-n,t[4]=r,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},o.fromScaling=function(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=0,t[4]=a[1],t[5]=0,t[6]=0,t[7]=0,t[8]=1,t},o.fromMat2d=function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=0,t[3]=a[2],t[4]=a[3],t[5]=0,t[6]=a[4],t[7]=a[5],t[8]=1,t},o.fromQuat=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=n+n,e=r+r,M=o+o,s=n*l,i=r*l,c=r*e,h=o*l,S=o*e,I=o*M,f=u*l,x=u*e,D=u*M;return t[0]=1-c-I,t[3]=i-D,t[6]=h+x,t[1]=i+D,t[4]=1-s-I,t[7]=S-f,t[2]=h-x,t[5]=S+f,t[8]=1-s-c,t},o.normalFromMat4=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=a[4],e=a[5],M=a[6],s=a[7],i=a[8],c=a[9],h=a[10],S=a[11],I=a[12],f=a[13],x=a[14],D=a[15],F=n*e-r*l,m=n*M-o*l,d=n*s-u*l,b=r*M-o*e,v=r*s-u*e,z=o*s-u*M,p=i*f-c*I,w=i*x-h*I,E=i*D-S*I,A=c*x-h*f,P=c*D-S*f,L=h*D-S*x,q=F*L-m*P+d*A+b*E-v*w+z*p;return q?(q=1/q,t[0]=(e*L-M*P+s*A)*q,t[1]=(M*E-l*L-s*w)*q,t[2]=(l*P-e*E+s*p)*q,t[3]=(o*P-r*L-u*A)*q,t[4]=(n*L-o*E+u*w)*q,t[5]=(r*E-n*P-u*p)*q,t[6]=(f*z-x*v+D*b)*q,t[7]=(x*d-I*z-D*m)*q,t[8]=(I*v-f*d+D*F)*q,t):null},o.str=function(t){return"mat3("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+")"},o.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2))},o.add=function(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t[3]=a[3]+n[3],t[4]=a[4]+n[4],t[5]=a[5]+n[5],t[6]=a[6]+n[6],t[7]=a[7]+n[7],t[8]=a[8]+n[8],t},o.subtract=function(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t[3]=a[3]-n[3],t[4]=a[4]-n[4],t[5]=a[5]-n[5],t[6]=a[6]-n[6],t[7]=a[7]-n[7],t[8]=a[8]-n[8],t},o.sub=o.subtract,o.multiplyScalar=function(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t[4]=a[4]*n,t[5]=a[5]*n,t[6]=a[6]*n,t[7]=a[7]*n,t[8]=a[8]*n,t},o.multiplyScalarAndAdd=function(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t[2]=a[2]+n[2]*r,t[3]=a[3]+n[3]*r,t[4]=a[4]+n[4]*r,t[5]=a[5]+n[5]*r,t[6]=a[6]+n[6]*r,t[7]=a[7]+n[7]*r,t[8]=a[8]+n[8]*r,t},o.exactEquals=function(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]&&t[4]===a[4]&&t[5]===a[5]&&t[6]===a[6]&&t[7]===a[7]&&t[8]===a[8]},o.equals=function(t,a){var n=t[0],o=t[1],u=t[2],l=t[3],e=t[4],M=t[5],s=t[6],i=t[7],c=t[8],h=a[0],S=a[1],I=a[2],f=a[3],x=a[4],D=a[5],F=t[6],m=a[7],d=a[8];return Math.abs(n-h)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(h))&&Math.abs(o-S)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(S))&&Math.abs(u-I)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(I))&&Math.abs(l-f)<=r.EPSILON*Math.max(1,Math.abs(l),Math.abs(f))&&Math.abs(e-x)<=r.EPSILON*Math.max(1,Math.abs(e),Math.abs(x))&&Math.abs(M-D)<=r.EPSILON*Math.max(1,Math.abs(M),Math.abs(D))&&Math.abs(s-F)<=r.EPSILON*Math.max(1,Math.abs(s),Math.abs(F))&&Math.abs(i-m)<=r.EPSILON*Math.max(1,Math.abs(i),Math.abs(m))&&Math.abs(c-d)<=r.EPSILON*Math.max(1,Math.abs(c),Math.abs(d))},t.exports=o},function(t,a,n){var r=n(1),o={scalar:{},SIMD:{}};o.create=function(){var t=new r.ARRAY_TYPE(16);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},o.clone=function(t){var a=new r.ARRAY_TYPE(16);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a[4]=t[4],a[5]=t[5],a[6]=t[6],a[7]=t[7],a[8]=t[8],a[9]=t[9],a[10]=t[10],a[11]=t[11],a[12]=t[12],a[13]=t[13],a[14]=t[14],a[15]=t[15],a},o.copy=function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t},o.fromValues=function(t,a,n,o,u,l,e,M,s,i,c,h,S,I,f,x){var D=new r.ARRAY_TYPE(16);return D[0]=t,D[1]=a,D[2]=n,D[3]=o,D[4]=u,D[5]=l,D[6]=e,D[7]=M,D[8]=s,D[9]=i,D[10]=c,D[11]=h,D[12]=S,D[13]=I,D[14]=f,D[15]=x,D},o.set=function(t,a,n,r,o,u,l,e,M,s,i,c,h,S,I,f,x){return t[0]=a,t[1]=n,t[2]=r,t[3]=o,t[4]=u,t[5]=l,t[6]=e,t[7]=M,t[8]=s,t[9]=i,t[10]=c,t[11]=h,t[12]=S,t[13]=I,t[14]=f,t[15]=x,t},o.identity=function(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},o.scalar.transpose=function(t,a){if(t===a){var n=a[1],r=a[2],o=a[3],u=a[6],l=a[7],e=a[11];t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=n,t[6]=a[9],t[7]=a[13],t[8]=r,t[9]=u,t[11]=a[14],t[12]=o,t[13]=l,t[14]=e}else t[0]=a[0],t[1]=a[4],t[2]=a[8],t[3]=a[12],t[4]=a[1],t[5]=a[5],t[6]=a[9],t[7]=a[13],t[8]=a[2],t[9]=a[6],t[10]=a[10],t[11]=a[14],t[12]=a[3],t[13]=a[7],t[14]=a[11],t[15]=a[15];return t},o.SIMD.transpose=function(t,a){var n,r,o,u,l,e,M,s,i,c;return n=SIMD.Float32x4.load(a,0),r=SIMD.Float32x4.load(a,4),o=SIMD.Float32x4.load(a,8),u=SIMD.Float32x4.load(a,12),l=SIMD.Float32x4.shuffle(n,r,0,1,4,5),e=SIMD.Float32x4.shuffle(o,u,0,1,4,5),M=SIMD.Float32x4.shuffle(l,e,0,2,4,6),s=SIMD.Float32x4.shuffle(l,e,1,3,5,7),SIMD.Float32x4.store(t,0,M),SIMD.Float32x4.store(t,4,s),l=SIMD.Float32x4.shuffle(n,r,2,3,6,7),e=SIMD.Float32x4.shuffle(o,u,2,3,6,7),i=SIMD.Float32x4.shuffle(l,e,0,2,4,6),c=SIMD.Float32x4.shuffle(l,e,1,3,5,7),SIMD.Float32x4.store(t,8,i),SIMD.Float32x4.store(t,12,c),t},o.transpose=r.USE_SIMD?o.SIMD.transpose:o.scalar.transpose,o.scalar.invert=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=a[4],e=a[5],M=a[6],s=a[7],i=a[8],c=a[9],h=a[10],S=a[11],I=a[12],f=a[13],x=a[14],D=a[15],F=n*e-r*l,m=n*M-o*l,d=n*s-u*l,b=r*M-o*e,v=r*s-u*e,z=o*s-u*M,p=i*f-c*I,w=i*x-h*I,E=i*D-S*I,A=c*x-h*f,P=c*D-S*f,L=h*D-S*x,q=F*L-m*P+d*A+b*E-v*w+z*p;return q?(q=1/q,t[0]=(e*L-M*P+s*A)*q,t[1]=(o*P-r*L-u*A)*q,t[2]=(f*z-x*v+D*b)*q,t[3]=(h*v-c*z-S*b)*q,t[4]=(M*E-l*L-s*w)*q,t[5]=(n*L-o*E+u*w)*q,t[6]=(x*d-I*z-D*m)*q,t[7]=(i*z-h*d+S*m)*q,t[8]=(l*P-e*E+s*p)*q,t[9]=(r*E-n*P-u*p)*q,t[10]=(I*v-f*d+D*F)*q,t[11]=(c*d-i*v-S*F)*q,t[12]=(e*w-l*A-M*p)*q,t[13]=(n*A-r*w+o*p)*q,t[14]=(f*m-I*b-x*F)*q,t[15]=(i*b-c*m+h*F)*q,t):null},o.SIMD.invert=function(t,a){var n,r,o,u,l,e,M,s,i,c,h=SIMD.Float32x4.load(a,0),S=SIMD.Float32x4.load(a,4),I=SIMD.Float32x4.load(a,8),f=SIMD.Float32x4.load(a,12);return l=SIMD.Float32x4.shuffle(h,S,0,1,4,5),r=SIMD.Float32x4.shuffle(I,f,0,1,4,5),n=SIMD.Float32x4.shuffle(l,r,0,2,4,6),r=SIMD.Float32x4.shuffle(r,l,1,3,5,7),l=SIMD.Float32x4.shuffle(h,S,2,3,6,7),u=SIMD.Float32x4.shuffle(I,f,2,3,6,7),o=SIMD.Float32x4.shuffle(l,u,0,2,4,6),u=SIMD.Float32x4.shuffle(u,l,1,3,5,7),l=SIMD.Float32x4.mul(o,u),l=SIMD.Float32x4.swizzle(l,1,0,3,2),e=SIMD.Float32x4.mul(r,l),M=SIMD.Float32x4.mul(n,l),l=SIMD.Float32x4.swizzle(l,2,3,0,1),e=SIMD.Float32x4.sub(SIMD.Float32x4.mul(r,l),e),M=SIMD.Float32x4.sub(SIMD.Float32x4.mul(n,l),M),M=SIMD.Float32x4.swizzle(M,2,3,0,1),l=SIMD.Float32x4.mul(r,o),l=SIMD.Float32x4.swizzle(l,1,0,3,2),e=SIMD.Float32x4.add(SIMD.Float32x4.mul(u,l),e),i=SIMD.Float32x4.mul(n,l),l=SIMD.Float32x4.swizzle(l,2,3,0,1),e=SIMD.Float32x4.sub(e,SIMD.Float32x4.mul(u,l)),i=SIMD.Float32x4.sub(SIMD.Float32x4.mul(n,l),i),i=SIMD.Float32x4.swizzle(i,2,3,0,1),l=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(r,2,3,0,1),u),l=SIMD.Float32x4.swizzle(l,1,0,3,2),o=SIMD.Float32x4.swizzle(o,2,3,0,1),e=SIMD.Float32x4.add(SIMD.Float32x4.mul(o,l),e),s=SIMD.Float32x4.mul(n,l),l=SIMD.Float32x4.swizzle(l,2,3,0,1),e=SIMD.Float32x4.sub(e,SIMD.Float32x4.mul(o,l)),s=SIMD.Float32x4.sub(SIMD.Float32x4.mul(n,l),s),s=SIMD.Float32x4.swizzle(s,2,3,0,1),l=SIMD.Float32x4.mul(n,r),l=SIMD.Float32x4.swizzle(l,1,0,3,2),s=SIMD.Float32x4.add(SIMD.Float32x4.mul(u,l),s),i=SIMD.Float32x4.sub(SIMD.Float32x4.mul(o,l),i),l=SIMD.Float32x4.swizzle(l,2,3,0,1),s=SIMD.Float32x4.sub(SIMD.Float32x4.mul(u,l),s),i=SIMD.Float32x4.sub(i,SIMD.Float32x4.mul(o,l)),l=SIMD.Float32x4.mul(n,u),l=SIMD.Float32x4.swizzle(l,1,0,3,2),M=SIMD.Float32x4.sub(M,SIMD.Float32x4.mul(o,l)),s=SIMD.Float32x4.add(SIMD.Float32x4.mul(r,l),s),l=SIMD.Float32x4.swizzle(l,2,3,0,1),M=SIMD.Float32x4.add(SIMD.Float32x4.mul(o,l),M),s=SIMD.Float32x4.sub(s,SIMD.Float32x4.mul(r,l)),l=SIMD.Float32x4.mul(n,o),l=SIMD.Float32x4.swizzle(l,1,0,3,2),M=SIMD.Float32x4.add(SIMD.Float32x4.mul(u,l),M),i=SIMD.Float32x4.sub(i,SIMD.Float32x4.mul(r,l)),l=SIMD.Float32x4.swizzle(l,2,3,0,1),M=SIMD.Float32x4.sub(M,SIMD.Float32x4.mul(u,l)),i=SIMD.Float32x4.add(SIMD.Float32x4.mul(r,l),i),c=SIMD.Float32x4.mul(n,e),c=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c,2,3,0,1),c),c=SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c,1,0,3,2),c),l=SIMD.Float32x4.reciprocalApproximation(c),c=SIMD.Float32x4.sub(SIMD.Float32x4.add(l,l),SIMD.Float32x4.mul(c,SIMD.Float32x4.mul(l,l))),(c=SIMD.Float32x4.swizzle(c,0,0,0,0))?(SIMD.Float32x4.store(t,0,SIMD.Float32x4.mul(c,e)),SIMD.Float32x4.store(t,4,SIMD.Float32x4.mul(c,M)),SIMD.Float32x4.store(t,8,SIMD.Float32x4.mul(c,s)),SIMD.Float32x4.store(t,12,SIMD.Float32x4.mul(c,i)),t):null},o.invert=r.USE_SIMD?o.SIMD.invert:o.scalar.invert,o.scalar.adjoint=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=a[4],e=a[5],M=a[6],s=a[7],i=a[8],c=a[9],h=a[10],S=a[11],I=a[12],f=a[13],x=a[14],D=a[15];return t[0]=e*(h*D-S*x)-c*(M*D-s*x)+f*(M*S-s*h),t[1]=-(r*(h*D-S*x)-c*(o*D-u*x)+f*(o*S-u*h)),t[2]=r*(M*D-s*x)-e*(o*D-u*x)+f*(o*s-u*M),t[3]=-(r*(M*S-s*h)-e*(o*S-u*h)+c*(o*s-u*M)),t[4]=-(l*(h*D-S*x)-i*(M*D-s*x)+I*(M*S-s*h)),t[5]=n*(h*D-S*x)-i*(o*D-u*x)+I*(o*S-u*h),t[6]=-(n*(M*D-s*x)-l*(o*D-u*x)+I*(o*s-u*M)),t[7]=n*(M*S-s*h)-l*(o*S-u*h)+i*(o*s-u*M),t[8]=l*(c*D-S*f)-i*(e*D-s*f)+I*(e*S-s*c),t[9]=-(n*(c*D-S*f)-i*(r*D-u*f)+I*(r*S-u*c)),t[10]=n*(e*D-s*f)-l*(r*D-u*f)+I*(r*s-u*e),t[11]=-(n*(e*S-s*c)-l*(r*S-u*c)+i*(r*s-u*e)),t[12]=-(l*(c*x-h*f)-i*(e*x-M*f)+I*(e*h-M*c)),t[13]=n*(c*x-h*f)-i*(r*x-o*f)+I*(r*h-o*c),t[14]=-(n*(e*x-M*f)-l*(r*x-o*f)+I*(r*M-o*e)),t[15]=n*(e*h-M*c)-l*(r*h-o*c)+i*(r*M-o*e),t},o.SIMD.adjoint=function(t,a){var n,r,o,u,l,e,M,s,i,c,h,S,I,n=SIMD.Float32x4.load(a,0),r=SIMD.Float32x4.load(a,4),o=SIMD.Float32x4.load(a,8),u=SIMD.Float32x4.load(a,12);return i=SIMD.Float32x4.shuffle(n,r,0,1,4,5),e=SIMD.Float32x4.shuffle(o,u,0,1,4,5),l=SIMD.Float32x4.shuffle(i,e,0,2,4,6),e=SIMD.Float32x4.shuffle(e,i,1,3,5,7),i=SIMD.Float32x4.shuffle(n,r,2,3,6,7),s=SIMD.Float32x4.shuffle(o,u,2,3,6,7),M=SIMD.Float32x4.shuffle(i,s,0,2,4,6),s=SIMD.Float32x4.shuffle(s,i,1,3,5,7),i=SIMD.Float32x4.mul(M,s),i=SIMD.Float32x4.swizzle(i,1,0,3,2),c=SIMD.Float32x4.mul(e,i),h=SIMD.Float32x4.mul(l,i),i=SIMD.Float32x4.swizzle(i,2,3,0,1),c=SIMD.Float32x4.sub(SIMD.Float32x4.mul(e,i),c),h=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,i),h),h=SIMD.Float32x4.swizzle(h,2,3,0,1),i=SIMD.Float32x4.mul(e,M),i=SIMD.Float32x4.swizzle(i,1,0,3,2),c=SIMD.Float32x4.add(SIMD.Float32x4.mul(s,i),c),I=SIMD.Float32x4.mul(l,i),i=SIMD.Float32x4.swizzle(i,2,3,0,1),c=SIMD.Float32x4.sub(c,SIMD.Float32x4.mul(s,i)),I=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,i),I),I=SIMD.Float32x4.swizzle(I,2,3,0,1),i=SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,2,3,0,1),s),i=SIMD.Float32x4.swizzle(i,1,0,3,2),M=SIMD.Float32x4.swizzle(M,2,3,0,1),c=SIMD.Float32x4.add(SIMD.Float32x4.mul(M,i),c),S=SIMD.Float32x4.mul(l,i),i=SIMD.Float32x4.swizzle(i,2,3,0,1),c=SIMD.Float32x4.sub(c,SIMD.Float32x4.mul(M,i)),S=SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,i),S),S=SIMD.Float32x4.swizzle(S,2,3,0,1),i=SIMD.Float32x4.mul(l,e),i=SIMD.Float32x4.swizzle(i,1,0,3,2),S=SIMD.Float32x4.add(SIMD.Float32x4.mul(s,i),S),I=SIMD.Float32x4.sub(SIMD.Float32x4.mul(M,i),I),i=SIMD.Float32x4.swizzle(i,2,3,0,1),S=SIMD.Float32x4.sub(SIMD.Float32x4.mul(s,i),S),I=SIMD.Float32x4.sub(I,SIMD.Float32x4.mul(M,i)),i=SIMD.Float32x4.mul(l,s),i=SIMD.Float32x4.swizzle(i,1,0,3,2),h=SIMD.Float32x4.sub(h,SIMD.Float32x4.mul(M,i)),S=SIMD.Float32x4.add(SIMD.Float32x4.mul(e,i),S),i=SIMD.Float32x4.swizzle(i,2,3,0,1),h=SIMD.Float32x4.add(SIMD.Float32x4.mul(M,i),h),S=SIMD.Float32x4.sub(S,SIMD.Float32x4.mul(e,i)),i=SIMD.Float32x4.mul(l,M),i=SIMD.Float32x4.swizzle(i,1,0,3,2),h=SIMD.Float32x4.add(SIMD.Float32x4.mul(s,i),h),I=SIMD.Float32x4.sub(I,SIMD.Float32x4.mul(e,i)),i=SIMD.Float32x4.swizzle(i,2,3,0,1),h=SIMD.Float32x4.sub(h,SIMD.Float32x4.mul(s,i)),I=SIMD.Float32x4.add(SIMD.Float32x4.mul(e,i),I),SIMD.Float32x4.store(t,0,c),SIMD.Float32x4.store(t,4,h),SIMD.Float32x4.store(t,8,S),SIMD.Float32x4.store(t,12,I),t},o.adjoint=r.USE_SIMD?o.SIMD.adjoint:o.scalar.adjoint,o.determinant=function(t){var a=t[0],n=t[1],r=t[2],o=t[3],u=t[4],l=t[5],e=t[6],M=t[7],s=t[8],i=t[9],c=t[10],h=t[11],S=t[12],I=t[13],f=t[14],x=t[15],D=a*l-n*u,F=a*e-r*u,m=a*M-o*u,d=n*e-r*l,b=n*M-o*l,v=r*M-o*e,z=s*I-i*S,p=s*f-c*S,w=s*x-h*S,E=i*f-c*I,A=i*x-h*I,P=c*x-h*f;return D*P-F*A+m*E+d*w-b*p+v*z},o.SIMD.multiply=function(t,a,n){var r=SIMD.Float32x4.load(a,0),o=SIMD.Float32x4.load(a,4),u=SIMD.Float32x4.load(a,8),l=SIMD.Float32x4.load(a,12),e=SIMD.Float32x4.load(n,0),M=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,0,0,0,0),r),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,1,1,1,1),o),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,2,2,2,2),u),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(e,3,3,3,3),l))));SIMD.Float32x4.store(t,0,M);var s=SIMD.Float32x4.load(n,4),i=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s,0,0,0,0),r),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s,1,1,1,1),o),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s,2,2,2,2),u),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(s,3,3,3,3),l))));SIMD.Float32x4.store(t,4,i);var c=SIMD.Float32x4.load(n,8),h=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,0,0,0,0),r),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,1,1,1,1),o),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,2,2,2,2),u),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c,3,3,3,3),l))));SIMD.Float32x4.store(t,8,h);var S=SIMD.Float32x4.load(n,12),I=SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S,0,0,0,0),r),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S,1,1,1,1),o),SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S,2,2,2,2),u),SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(S,3,3,3,3),l))));return SIMD.Float32x4.store(t,12,I),t},o.scalar.multiply=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=a[4],M=a[5],s=a[6],i=a[7],c=a[8],h=a[9],S=a[10],I=a[11],f=a[12],x=a[13],D=a[14],F=a[15],m=n[0],d=n[1],b=n[2],v=n[3];return t[0]=m*r+d*e+b*c+v*f,t[1]=m*o+d*M+b*h+v*x,t[2]=m*u+d*s+b*S+v*D,t[3]=m*l+d*i+b*I+v*F,m=n[4],d=n[5],b=n[6],v=n[7],t[4]=m*r+d*e+b*c+v*f,t[5]=m*o+d*M+b*h+v*x,t[6]=m*u+d*s+b*S+v*D,t[7]=m*l+d*i+b*I+v*F,m=n[8],d=n[9],b=n[10],v=n[11],t[8]=m*r+d*e+b*c+v*f,t[9]=m*o+d*M+b*h+v*x,t[10]=m*u+d*s+b*S+v*D,t[11]=m*l+d*i+b*I+v*F,m=n[12],d=n[13],b=n[14],v=n[15],t[12]=m*r+d*e+b*c+v*f,t[13]=m*o+d*M+b*h+v*x,t[14]=m*u+d*s+b*S+v*D,t[15]=m*l+d*i+b*I+v*F,t},o.multiply=r.USE_SIMD?o.SIMD.multiply:o.scalar.multiply,o.mul=o.multiply,o.scalar.translate=function(t,a,n){var r,o,u,l,e,M,s,i,c,h,S,I,f=n[0],x=n[1],D=n[2];return a===t?(t[12]=a[0]*f+a[4]*x+a[8]*D+a[12],t[13]=a[1]*f+a[5]*x+a[9]*D+a[13],t[14]=a[2]*f+a[6]*x+a[10]*D+a[14],t[15]=a[3]*f+a[7]*x+a[11]*D+a[15]):(r=a[0],o=a[1],u=a[2],l=a[3],e=a[4],M=a[5],s=a[6],i=a[7],c=a[8],h=a[9],S=a[10],I=a[11],t[0]=r,t[1]=o,t[2]=u,t[3]=l,t[4]=e,t[5]=M,t[6]=s,t[7]=i,t[8]=c,t[9]=h,t[10]=S,t[11]=I,t[12]=r*f+e*x+c*D+a[12],t[13]=o*f+M*x+h*D+a[13],t[14]=u*f+s*x+S*D+a[14],t[15]=l*f+i*x+I*D+a[15]),t},o.SIMD.translate=function(t,a,n){var r=SIMD.Float32x4.load(a,0),o=SIMD.Float32x4.load(a,4),u=SIMD.Float32x4.load(a,8),l=SIMD.Float32x4.load(a,12),e=SIMD.Float32x4(n[0],n[1],n[2],0);a!==t&&(t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11]),r=SIMD.Float32x4.mul(r,SIMD.Float32x4.swizzle(e,0,0,0,0)),o=SIMD.Float32x4.mul(o,SIMD.Float32x4.swizzle(e,1,1,1,1)),u=SIMD.Float32x4.mul(u,SIMD.Float32x4.swizzle(e,2,2,2,2));var M=SIMD.Float32x4.add(r,SIMD.Float32x4.add(o,SIMD.Float32x4.add(u,l)));return SIMD.Float32x4.store(t,12,M),t},o.translate=r.USE_SIMD?o.SIMD.translate:o.scalar.translate,o.scalar.scale=function(t,a,n){var r=n[0],o=n[1],u=n[2];return t[0]=a[0]*r,t[1]=a[1]*r,t[2]=a[2]*r,t[3]=a[3]*r,t[4]=a[4]*o,t[5]=a[5]*o,t[6]=a[6]*o,t[7]=a[7]*o,t[8]=a[8]*u,t[9]=a[9]*u,t[10]=a[10]*u,t[11]=a[11]*u,t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t},o.SIMD.scale=function(t,a,n){var r,o,u,l=SIMD.Float32x4(n[0],n[1],n[2],0);return r=SIMD.Float32x4.load(a,0),SIMD.Float32x4.store(t,0,SIMD.Float32x4.mul(r,SIMD.Float32x4.swizzle(l,0,0,0,0))),o=SIMD.Float32x4.load(a,4),SIMD.Float32x4.store(t,4,SIMD.Float32x4.mul(o,SIMD.Float32x4.swizzle(l,1,1,1,1))),u=SIMD.Float32x4.load(a,8),SIMD.Float32x4.store(t,8,SIMD.Float32x4.mul(u,SIMD.Float32x4.swizzle(l,2,2,2,2))),t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15],t},o.scale=r.USE_SIMD?o.SIMD.scale:o.scalar.scale,o.rotate=function(t,a,n,o){var u,l,e,M,s,i,c,h,S,I,f,x,D,F,m,d,b,v,z,p,w,E,A,P,L=o[0],q=o[1],R=o[2],N=Math.sqrt(L*L+q*q+R*R);return Math.abs(N)<r.EPSILON?null:(N=1/N,L*=N,q*=N,R*=N,u=Math.sin(n),l=Math.cos(n),e=1-l,M=a[0],s=a[1],i=a[2],c=a[3],h=a[4],S=a[5],I=a[6],f=a[7],x=a[8],D=a[9],F=a[10],m=a[11],d=L*L*e+l,b=q*L*e+R*u,v=R*L*e-q*u,z=L*q*e-R*u,p=q*q*e+l,w=R*q*e+L*u,E=L*R*e+q*u,A=q*R*e-L*u,P=R*R*e+l,t[0]=M*d+h*b+x*v,t[1]=s*d+S*b+D*v,t[2]=i*d+I*b+F*v,t[3]=c*d+f*b+m*v,t[4]=M*z+h*p+x*w,t[5]=s*z+S*p+D*w,t[6]=i*z+I*p+F*w,t[7]=c*z+f*p+m*w,t[8]=M*E+h*A+x*P,t[9]=s*E+S*A+D*P,t[10]=i*E+I*A+F*P,t[11]=c*E+f*A+m*P,a!==t&&(t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t)},o.scalar.rotateX=function(t,a,n){var r=Math.sin(n),o=Math.cos(n),u=a[4],l=a[5],e=a[6],M=a[7],s=a[8],i=a[9],c=a[10],h=a[11];return a!==t&&(t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[4]=u*o+s*r,t[5]=l*o+i*r,t[6]=e*o+c*r,t[7]=M*o+h*r,t[8]=s*o-u*r,t[9]=i*o-l*r,t[10]=c*o-e*r,t[11]=h*o-M*r,t},o.SIMD.rotateX=function(t,a,n){var r=SIMD.Float32x4.splat(Math.sin(n)),o=SIMD.Float32x4.splat(Math.cos(n));a!==t&&(t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]);var u=SIMD.Float32x4.load(a,4),l=SIMD.Float32x4.load(a,8);return SIMD.Float32x4.store(t,4,SIMD.Float32x4.add(SIMD.Float32x4.mul(u,o),SIMD.Float32x4.mul(l,r))),SIMD.Float32x4.store(t,8,SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,o),SIMD.Float32x4.mul(u,r))),t},o.rotateX=r.USE_SIMD?o.SIMD.rotateX:o.scalar.rotateX,o.scalar.rotateY=function(t,a,n){var r=Math.sin(n),o=Math.cos(n),u=a[0],l=a[1],e=a[2],M=a[3],s=a[8],i=a[9],c=a[10],h=a[11];return a!==t&&(t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[0]=u*o-s*r,t[1]=l*o-i*r,t[2]=e*o-c*r,t[3]=M*o-h*r,t[8]=u*r+s*o,t[9]=l*r+i*o,t[10]=e*r+c*o,t[11]=M*r+h*o,t},o.SIMD.rotateY=function(t,a,n){var r=SIMD.Float32x4.splat(Math.sin(n)),o=SIMD.Float32x4.splat(Math.cos(n));a!==t&&(t[4]=a[4],t[5]=a[5],t[6]=a[6],t[7]=a[7],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]);var u=SIMD.Float32x4.load(a,0),l=SIMD.Float32x4.load(a,8);return SIMD.Float32x4.store(t,0,SIMD.Float32x4.sub(SIMD.Float32x4.mul(u,o),SIMD.Float32x4.mul(l,r))),SIMD.Float32x4.store(t,8,SIMD.Float32x4.add(SIMD.Float32x4.mul(u,r),SIMD.Float32x4.mul(l,o))),t},o.rotateY=r.USE_SIMD?o.SIMD.rotateY:o.scalar.rotateY,o.scalar.rotateZ=function(t,a,n){var r=Math.sin(n),o=Math.cos(n),u=a[0],l=a[1],e=a[2],M=a[3],s=a[4],i=a[5],c=a[6],h=a[7];return a!==t&&(t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]),t[0]=u*o+s*r,t[1]=l*o+i*r,t[2]=e*o+c*r,t[3]=M*o+h*r,t[4]=s*o-u*r,t[5]=i*o-l*r,t[6]=c*o-e*r,t[7]=h*o-M*r,t},o.SIMD.rotateZ=function(t,a,n){var r=SIMD.Float32x4.splat(Math.sin(n)),o=SIMD.Float32x4.splat(Math.cos(n));a!==t&&(t[8]=a[8],t[9]=a[9],t[10]=a[10],t[11]=a[11],t[12]=a[12],t[13]=a[13],t[14]=a[14],t[15]=a[15]);var u=SIMD.Float32x4.load(a,0),l=SIMD.Float32x4.load(a,4);return SIMD.Float32x4.store(t,0,SIMD.Float32x4.add(SIMD.Float32x4.mul(u,o),SIMD.Float32x4.mul(l,r))),SIMD.Float32x4.store(t,4,SIMD.Float32x4.sub(SIMD.Float32x4.mul(l,o),SIMD.Float32x4.mul(u,r))),t},o.rotateZ=r.USE_SIMD?o.SIMD.rotateZ:o.scalar.rotateZ,o.fromTranslation=function(t,a){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=a[0],t[13]=a[1],t[14]=a[2],t[15]=1,t},o.fromScaling=function(t,a){return t[0]=a[0],t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=a[1],t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=a[2],t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},o.fromRotation=function(t,a,n){var o,u,l,e=n[0],M=n[1],s=n[2],i=Math.sqrt(e*e+M*M+s*s);return Math.abs(i)<r.EPSILON?null:(i=1/i,e*=i,M*=i,s*=i,o=Math.sin(a),u=Math.cos(a),l=1-u,t[0]=e*e*l+u,t[1]=M*e*l+s*o,t[2]=s*e*l-M*o,t[3]=0,t[4]=e*M*l-s*o,t[5]=M*M*l+u,t[6]=s*M*l+e*o,t[7]=0,t[8]=e*s*l+M*o,t[9]=M*s*l-e*o,t[10]=s*s*l+u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t)},o.fromXRotation=function(t,a){var n=Math.sin(a),r=Math.cos(a);return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=r,t[6]=n,t[7]=0,t[8]=0,t[9]=-n,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},o.fromYRotation=function(t,a){var n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=0,t[2]=-n,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=n,t[9]=0,t[10]=r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},o.fromZRotation=function(t,a){var n=Math.sin(a),r=Math.cos(a);return t[0]=r,t[1]=n,t[2]=0,t[3]=0,t[4]=-n,t[5]=r,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},o.fromRotationTranslation=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=r+r,M=o+o,s=u+u,i=r*e,c=r*M,h=r*s,S=o*M,I=o*s,f=u*s,x=l*e,D=l*M,F=l*s;return t[0]=1-(S+f),t[1]=c+F,t[2]=h-D,t[3]=0,t[4]=c-F,t[5]=1-(i+f),t[6]=I+x,t[7]=0,t[8]=h+D,t[9]=I-x,t[10]=1-(i+S),t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t},o.getTranslation=function(t,a){return t[0]=a[12],t[1]=a[13],t[2]=a[14],t},o.getRotation=function(t,a){var n=a[0]+a[5]+a[10],r=0;return n>0?(r=2*Math.sqrt(n+1),t[3]=.25*r,t[0]=(a[6]-a[9])/r,t[1]=(a[8]-a[2])/r,t[2]=(a[1]-a[4])/r):a[0]>a[5]&a[0]>a[10]?(r=2*Math.sqrt(1+a[0]-a[5]-a[10]),t[3]=(a[6]-a[9])/r,t[0]=.25*r,t[1]=(a[1]+a[4])/r,t[2]=(a[8]+a[2])/r):a[5]>a[10]?(r=2*Math.sqrt(1+a[5]-a[0]-a[10]),t[3]=(a[8]-a[2])/r,t[0]=(a[1]+a[4])/r,t[1]=.25*r,t[2]=(a[6]+a[9])/r):(r=2*Math.sqrt(1+a[10]-a[0]-a[5]),t[3]=(a[1]-a[4])/r,t[0]=(a[8]+a[2])/r,t[1]=(a[6]+a[9])/r,t[2]=.25*r),t},o.fromRotationTranslationScale=function(t,a,n,r){var o=a[0],u=a[1],l=a[2],e=a[3],M=o+o,s=u+u,i=l+l,c=o*M,h=o*s,S=o*i,I=u*s,f=u*i,x=l*i,D=e*M,F=e*s,m=e*i,d=r[0],b=r[1],v=r[2];return t[0]=(1-(I+x))*d,t[1]=(h+m)*d,t[2]=(S-F)*d,t[3]=0,t[4]=(h-m)*b,t[5]=(1-(c+x))*b,t[6]=(f+D)*b,t[7]=0,t[8]=(S+F)*v,t[9]=(f-D)*v,t[10]=(1-(c+I))*v,t[11]=0,t[12]=n[0],t[13]=n[1],t[14]=n[2],t[15]=1,t},o.fromRotationTranslationScaleOrigin=function(t,a,n,r,o){
    var u=a[0],l=a[1],e=a[2],M=a[3],s=u+u,i=l+l,c=e+e,h=u*s,S=u*i,I=u*c,f=l*i,x=l*c,D=e*c,F=M*s,m=M*i,d=M*c,b=r[0],v=r[1],z=r[2],p=o[0],w=o[1],E=o[2];return t[0]=(1-(f+D))*b,t[1]=(S+d)*b,t[2]=(I-m)*b,t[3]=0,t[4]=(S-d)*v,t[5]=(1-(h+D))*v,t[6]=(x+F)*v,t[7]=0,t[8]=(I+m)*z,t[9]=(x-F)*z,t[10]=(1-(h+f))*z,t[11]=0,t[12]=n[0]+p-(t[0]*p+t[4]*w+t[8]*E),t[13]=n[1]+w-(t[1]*p+t[5]*w+t[9]*E),t[14]=n[2]+E-(t[2]*p+t[6]*w+t[10]*E),t[15]=1,t},o.fromQuat=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=n+n,e=r+r,M=o+o,s=n*l,i=r*l,c=r*e,h=o*l,S=o*e,I=o*M,f=u*l,x=u*e,D=u*M;return t[0]=1-c-I,t[1]=i+D,t[2]=h-x,t[3]=0,t[4]=i-D,t[5]=1-s-I,t[6]=S+f,t[7]=0,t[8]=h+x,t[9]=S-f,t[10]=1-s-c,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t},o.frustum=function(t,a,n,r,o,u,l){var e=1/(n-a),M=1/(o-r),s=1/(u-l);return t[0]=2*u*e,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=2*u*M,t[6]=0,t[7]=0,t[8]=(n+a)*e,t[9]=(o+r)*M,t[10]=(l+u)*s,t[11]=-1,t[12]=0,t[13]=0,t[14]=l*u*2*s,t[15]=0,t},o.perspective=function(t,a,n,r,o){var u=1/Math.tan(a/2),l=1/(r-o);return t[0]=u/n,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=u,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(o+r)*l,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*o*r*l,t[15]=0,t},o.perspectiveFromFieldOfView=function(t,a,n,r){var o=Math.tan(a.upDegrees*Math.PI/180),u=Math.tan(a.downDegrees*Math.PI/180),l=Math.tan(a.leftDegrees*Math.PI/180),e=Math.tan(a.rightDegrees*Math.PI/180),M=2/(l+e),s=2/(o+u);return t[0]=M,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=s,t[6]=0,t[7]=0,t[8]=-((l-e)*M*.5),t[9]=(o-u)*s*.5,t[10]=r/(n-r),t[11]=-1,t[12]=0,t[13]=0,t[14]=r*n/(n-r),t[15]=0,t},o.ortho=function(t,a,n,r,o,u,l){var e=1/(a-n),M=1/(r-o),s=1/(u-l);return t[0]=-2*e,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*M,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*s,t[11]=0,t[12]=(a+n)*e,t[13]=(o+r)*M,t[14]=(l+u)*s,t[15]=1,t},o.lookAt=function(t,a,n,u){var l,e,M,s,i,c,h,S,I,f,x=a[0],D=a[1],F=a[2],m=u[0],d=u[1],b=u[2],v=n[0],z=n[1],p=n[2];return Math.abs(x-v)<r.EPSILON&&Math.abs(D-z)<r.EPSILON&&Math.abs(F-p)<r.EPSILON?o.identity(t):(h=x-v,S=D-z,I=F-p,f=1/Math.sqrt(h*h+S*S+I*I),h*=f,S*=f,I*=f,l=d*I-b*S,e=b*h-m*I,M=m*S-d*h,f=Math.sqrt(l*l+e*e+M*M),f?(f=1/f,l*=f,e*=f,M*=f):(l=0,e=0,M=0),s=S*M-I*e,i=I*l-h*M,c=h*e-S*l,f=Math.sqrt(s*s+i*i+c*c),f?(f=1/f,s*=f,i*=f,c*=f):(s=0,i=0,c=0),t[0]=l,t[1]=s,t[2]=h,t[3]=0,t[4]=e,t[5]=i,t[6]=S,t[7]=0,t[8]=M,t[9]=c,t[10]=I,t[11]=0,t[12]=-(l*x+e*D+M*F),t[13]=-(s*x+i*D+c*F),t[14]=-(h*x+S*D+I*F),t[15]=1,t)},o.str=function(t){return"mat4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+", "+t[4]+", "+t[5]+", "+t[6]+", "+t[7]+", "+t[8]+", "+t[9]+", "+t[10]+", "+t[11]+", "+t[12]+", "+t[13]+", "+t[14]+", "+t[15]+")"},o.frob=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2)+Math.pow(t[2],2)+Math.pow(t[3],2)+Math.pow(t[4],2)+Math.pow(t[5],2)+Math.pow(t[6],2)+Math.pow(t[7],2)+Math.pow(t[8],2)+Math.pow(t[9],2)+Math.pow(t[10],2)+Math.pow(t[11],2)+Math.pow(t[12],2)+Math.pow(t[13],2)+Math.pow(t[14],2)+Math.pow(t[15],2))},o.add=function(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t[3]=a[3]+n[3],t[4]=a[4]+n[4],t[5]=a[5]+n[5],t[6]=a[6]+n[6],t[7]=a[7]+n[7],t[8]=a[8]+n[8],t[9]=a[9]+n[9],t[10]=a[10]+n[10],t[11]=a[11]+n[11],t[12]=a[12]+n[12],t[13]=a[13]+n[13],t[14]=a[14]+n[14],t[15]=a[15]+n[15],t},o.subtract=function(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t[3]=a[3]-n[3],t[4]=a[4]-n[4],t[5]=a[5]-n[5],t[6]=a[6]-n[6],t[7]=a[7]-n[7],t[8]=a[8]-n[8],t[9]=a[9]-n[9],t[10]=a[10]-n[10],t[11]=a[11]-n[11],t[12]=a[12]-n[12],t[13]=a[13]-n[13],t[14]=a[14]-n[14],t[15]=a[15]-n[15],t},o.sub=o.subtract,o.multiplyScalar=function(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t[4]=a[4]*n,t[5]=a[5]*n,t[6]=a[6]*n,t[7]=a[7]*n,t[8]=a[8]*n,t[9]=a[9]*n,t[10]=a[10]*n,t[11]=a[11]*n,t[12]=a[12]*n,t[13]=a[13]*n,t[14]=a[14]*n,t[15]=a[15]*n,t},o.multiplyScalarAndAdd=function(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t[2]=a[2]+n[2]*r,t[3]=a[3]+n[3]*r,t[4]=a[4]+n[4]*r,t[5]=a[5]+n[5]*r,t[6]=a[6]+n[6]*r,t[7]=a[7]+n[7]*r,t[8]=a[8]+n[8]*r,t[9]=a[9]+n[9]*r,t[10]=a[10]+n[10]*r,t[11]=a[11]+n[11]*r,t[12]=a[12]+n[12]*r,t[13]=a[13]+n[13]*r,t[14]=a[14]+n[14]*r,t[15]=a[15]+n[15]*r,t},o.exactEquals=function(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]&&t[4]===a[4]&&t[5]===a[5]&&t[6]===a[6]&&t[7]===a[7]&&t[8]===a[8]&&t[9]===a[9]&&t[10]===a[10]&&t[11]===a[11]&&t[12]===a[12]&&t[13]===a[13]&&t[14]===a[14]&&t[15]===a[15]},o.equals=function(t,a){var n=t[0],o=t[1],u=t[2],l=t[3],e=t[4],M=t[5],s=t[6],i=t[7],c=t[8],h=t[9],S=t[10],I=t[11],f=t[12],x=t[13],D=t[14],F=t[15],m=a[0],d=a[1],b=a[2],v=a[3],z=a[4],p=a[5],w=a[6],E=a[7],A=a[8],P=a[9],L=a[10],q=a[11],R=a[12],N=a[13],O=a[14],Y=a[15];return Math.abs(n-m)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(m))&&Math.abs(o-d)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(d))&&Math.abs(u-b)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(b))&&Math.abs(l-v)<=r.EPSILON*Math.max(1,Math.abs(l),Math.abs(v))&&Math.abs(e-z)<=r.EPSILON*Math.max(1,Math.abs(e),Math.abs(z))&&Math.abs(M-p)<=r.EPSILON*Math.max(1,Math.abs(M),Math.abs(p))&&Math.abs(s-w)<=r.EPSILON*Math.max(1,Math.abs(s),Math.abs(w))&&Math.abs(i-E)<=r.EPSILON*Math.max(1,Math.abs(i),Math.abs(E))&&Math.abs(c-A)<=r.EPSILON*Math.max(1,Math.abs(c),Math.abs(A))&&Math.abs(h-P)<=r.EPSILON*Math.max(1,Math.abs(h),Math.abs(P))&&Math.abs(S-L)<=r.EPSILON*Math.max(1,Math.abs(S),Math.abs(L))&&Math.abs(I-q)<=r.EPSILON*Math.max(1,Math.abs(I),Math.abs(q))&&Math.abs(f-R)<=r.EPSILON*Math.max(1,Math.abs(f),Math.abs(R))&&Math.abs(x-N)<=r.EPSILON*Math.max(1,Math.abs(x),Math.abs(N))&&Math.abs(D-O)<=r.EPSILON*Math.max(1,Math.abs(D),Math.abs(O))&&Math.abs(F-Y)<=r.EPSILON*Math.max(1,Math.abs(F),Math.abs(Y))},t.exports=o},function(t,a,n){var r=n(1),o=n(4),u=n(7),l=n(8),e={};e.create=function(){var t=new r.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},e.rotationTo=function(){var t=u.create(),a=u.fromValues(1,0,0),n=u.fromValues(0,1,0);return function(r,o,l){var M=u.dot(o,l);return-.999999>M?(u.cross(t,a,o),u.length(t)<1e-6&&u.cross(t,n,o),u.normalize(t,t),e.setAxisAngle(r,t,Math.PI),r):M>.999999?(r[0]=0,r[1]=0,r[2]=0,r[3]=1,r):(u.cross(t,o,l),r[0]=t[0],r[1]=t[1],r[2]=t[2],r[3]=1+M,e.normalize(r,r))}}(),e.setAxes=function(){var t=o.create();return function(a,n,r,o){return t[0]=r[0],t[3]=r[1],t[6]=r[2],t[1]=o[0],t[4]=o[1],t[7]=o[2],t[2]=-n[0],t[5]=-n[1],t[8]=-n[2],e.normalize(a,e.fromMat3(a,t))}}(),e.clone=l.clone,e.fromValues=l.fromValues,e.copy=l.copy,e.set=l.set,e.identity=function(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t},e.setAxisAngle=function(t,a,n){n=.5*n;var r=Math.sin(n);return t[0]=r*a[0],t[1]=r*a[1],t[2]=r*a[2],t[3]=Math.cos(n),t},e.getAxisAngle=function(t,a){var n=2*Math.acos(a[3]),r=Math.sin(n/2);return 0!=r?(t[0]=a[0]/r,t[1]=a[1]/r,t[2]=a[2]/r):(t[0]=1,t[1]=0,t[2]=0),n},e.add=l.add,e.multiply=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3],e=n[0],M=n[1],s=n[2],i=n[3];return t[0]=r*i+l*e+o*s-u*M,t[1]=o*i+l*M+u*e-r*s,t[2]=u*i+l*s+r*M-o*e,t[3]=l*i-r*e-o*M-u*s,t},e.mul=e.multiply,e.scale=l.scale,e.rotateX=function(t,a,n){n*=.5;var r=a[0],o=a[1],u=a[2],l=a[3],e=Math.sin(n),M=Math.cos(n);return t[0]=r*M+l*e,t[1]=o*M+u*e,t[2]=u*M-o*e,t[3]=l*M-r*e,t},e.rotateY=function(t,a,n){n*=.5;var r=a[0],o=a[1],u=a[2],l=a[3],e=Math.sin(n),M=Math.cos(n);return t[0]=r*M-u*e,t[1]=o*M+l*e,t[2]=u*M+r*e,t[3]=l*M-o*e,t},e.rotateZ=function(t,a,n){n*=.5;var r=a[0],o=a[1],u=a[2],l=a[3],e=Math.sin(n),M=Math.cos(n);return t[0]=r*M+o*e,t[1]=o*M-r*e,t[2]=u*M+l*e,t[3]=l*M-u*e,t},e.calculateW=function(t,a){var n=a[0],r=a[1],o=a[2];return t[0]=n,t[1]=r,t[2]=o,t[3]=Math.sqrt(Math.abs(1-n*n-r*r-o*o)),t},e.dot=l.dot,e.lerp=l.lerp,e.slerp=function(t,a,n,r){var o,u,l,e,M,s=a[0],i=a[1],c=a[2],h=a[3],S=n[0],I=n[1],f=n[2],x=n[3];return u=s*S+i*I+c*f+h*x,0>u&&(u=-u,S=-S,I=-I,f=-f,x=-x),1-u>1e-6?(o=Math.acos(u),l=Math.sin(o),e=Math.sin((1-r)*o)/l,M=Math.sin(r*o)/l):(e=1-r,M=r),t[0]=e*s+M*S,t[1]=e*i+M*I,t[2]=e*c+M*f,t[3]=e*h+M*x,t},e.sqlerp=function(){var t=e.create(),a=e.create();return function(n,r,o,u,l,M){return e.slerp(t,r,l,M),e.slerp(a,o,u,M),e.slerp(n,t,a,2*M*(1-M)),n}}(),e.invert=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=n*n+r*r+o*o+u*u,e=l?1/l:0;return t[0]=-n*e,t[1]=-r*e,t[2]=-o*e,t[3]=u*e,t},e.conjugate=function(t,a){return t[0]=-a[0],t[1]=-a[1],t[2]=-a[2],t[3]=a[3],t},e.length=l.length,e.len=e.length,e.squaredLength=l.squaredLength,e.sqrLen=e.squaredLength,e.normalize=l.normalize,e.fromMat3=function(t,a){var n,r=a[0]+a[4]+a[8];if(r>0)n=Math.sqrt(r+1),t[3]=.5*n,n=.5/n,t[0]=(a[5]-a[7])*n,t[1]=(a[6]-a[2])*n,t[2]=(a[1]-a[3])*n;else{var o=0;a[4]>a[0]&&(o=1),a[8]>a[3*o+o]&&(o=2);var u=(o+1)%3,l=(o+2)%3;n=Math.sqrt(a[3*o+o]-a[3*u+u]-a[3*l+l]+1),t[o]=.5*n,n=.5/n,t[3]=(a[3*u+l]-a[3*l+u])*n,t[u]=(a[3*u+o]+a[3*o+u])*n,t[l]=(a[3*l+o]+a[3*o+l])*n}return t},e.str=function(t){return"quat("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},e.exactEquals=l.exactEquals,e.equals=l.equals,t.exports=e},function(t,a,n){var r=n(1),o={};o.create=function(){var t=new r.ARRAY_TYPE(3);return t[0]=0,t[1]=0,t[2]=0,t},o.clone=function(t){var a=new r.ARRAY_TYPE(3);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a},o.fromValues=function(t,a,n){var o=new r.ARRAY_TYPE(3);return o[0]=t,o[1]=a,o[2]=n,o},o.copy=function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t},o.set=function(t,a,n,r){return t[0]=a,t[1]=n,t[2]=r,t},o.add=function(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t},o.subtract=function(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t},o.sub=o.subtract,o.multiply=function(t,a,n){return t[0]=a[0]*n[0],t[1]=a[1]*n[1],t[2]=a[2]*n[2],t},o.mul=o.multiply,o.divide=function(t,a,n){return t[0]=a[0]/n[0],t[1]=a[1]/n[1],t[2]=a[2]/n[2],t},o.div=o.divide,o.ceil=function(t,a){return t[0]=Math.ceil(a[0]),t[1]=Math.ceil(a[1]),t[2]=Math.ceil(a[2]),t},o.floor=function(t,a){return t[0]=Math.floor(a[0]),t[1]=Math.floor(a[1]),t[2]=Math.floor(a[2]),t},o.min=function(t,a,n){return t[0]=Math.min(a[0],n[0]),t[1]=Math.min(a[1],n[1]),t[2]=Math.min(a[2],n[2]),t},o.max=function(t,a,n){return t[0]=Math.max(a[0],n[0]),t[1]=Math.max(a[1],n[1]),t[2]=Math.max(a[2],n[2]),t},o.round=function(t,a){return t[0]=Math.round(a[0]),t[1]=Math.round(a[1]),t[2]=Math.round(a[2]),t},o.scale=function(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t},o.scaleAndAdd=function(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t[2]=a[2]+n[2]*r,t},o.distance=function(t,a){var n=a[0]-t[0],r=a[1]-t[1],o=a[2]-t[2];return Math.sqrt(n*n+r*r+o*o)},o.dist=o.distance,o.squaredDistance=function(t,a){var n=a[0]-t[0],r=a[1]-t[1],o=a[2]-t[2];return n*n+r*r+o*o},o.sqrDist=o.squaredDistance,o.length=function(t){var a=t[0],n=t[1],r=t[2];return Math.sqrt(a*a+n*n+r*r)},o.len=o.length,o.squaredLength=function(t){var a=t[0],n=t[1],r=t[2];return a*a+n*n+r*r},o.sqrLen=o.squaredLength,o.negate=function(t,a){return t[0]=-a[0],t[1]=-a[1],t[2]=-a[2],t},o.inverse=function(t,a){return t[0]=1/a[0],t[1]=1/a[1],t[2]=1/a[2],t},o.normalize=function(t,a){var n=a[0],r=a[1],o=a[2],u=n*n+r*r+o*o;return u>0&&(u=1/Math.sqrt(u),t[0]=a[0]*u,t[1]=a[1]*u,t[2]=a[2]*u),t},o.dot=function(t,a){return t[0]*a[0]+t[1]*a[1]+t[2]*a[2]},o.cross=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=n[0],e=n[1],M=n[2];return t[0]=o*M-u*e,t[1]=u*l-r*M,t[2]=r*e-o*l,t},o.lerp=function(t,a,n,r){var o=a[0],u=a[1],l=a[2];return t[0]=o+r*(n[0]-o),t[1]=u+r*(n[1]-u),t[2]=l+r*(n[2]-l),t},o.hermite=function(t,a,n,r,o,u){var l=u*u,e=l*(2*u-3)+1,M=l*(u-2)+u,s=l*(u-1),i=l*(3-2*u);return t[0]=a[0]*e+n[0]*M+r[0]*s+o[0]*i,t[1]=a[1]*e+n[1]*M+r[1]*s+o[1]*i,t[2]=a[2]*e+n[2]*M+r[2]*s+o[2]*i,t},o.bezier=function(t,a,n,r,o,u){var l=1-u,e=l*l,M=u*u,s=e*l,i=3*u*e,c=3*M*l,h=M*u;return t[0]=a[0]*s+n[0]*i+r[0]*c+o[0]*h,t[1]=a[1]*s+n[1]*i+r[1]*c+o[1]*h,t[2]=a[2]*s+n[2]*i+r[2]*c+o[2]*h,t},o.random=function(t,a){a=a||1;var n=2*r.RANDOM()*Math.PI,o=2*r.RANDOM()-1,u=Math.sqrt(1-o*o)*a;return t[0]=Math.cos(n)*u,t[1]=Math.sin(n)*u,t[2]=o*a,t},o.transformMat4=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=n[3]*r+n[7]*o+n[11]*u+n[15];return l=l||1,t[0]=(n[0]*r+n[4]*o+n[8]*u+n[12])/l,t[1]=(n[1]*r+n[5]*o+n[9]*u+n[13])/l,t[2]=(n[2]*r+n[6]*o+n[10]*u+n[14])/l,t},o.transformMat3=function(t,a,n){var r=a[0],o=a[1],u=a[2];return t[0]=r*n[0]+o*n[3]+u*n[6],t[1]=r*n[1]+o*n[4]+u*n[7],t[2]=r*n[2]+o*n[5]+u*n[8],t},o.transformQuat=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=n[0],e=n[1],M=n[2],s=n[3],i=s*r+e*u-M*o,c=s*o+M*r-l*u,h=s*u+l*o-e*r,S=-l*r-e*o-M*u;return t[0]=i*s+S*-l+c*-M-h*-e,t[1]=c*s+S*-e+h*-l-i*-M,t[2]=h*s+S*-M+i*-e-c*-l,t},o.rotateX=function(t,a,n,r){var o=[],u=[];return o[0]=a[0]-n[0],o[1]=a[1]-n[1],o[2]=a[2]-n[2],u[0]=o[0],u[1]=o[1]*Math.cos(r)-o[2]*Math.sin(r),u[2]=o[1]*Math.sin(r)+o[2]*Math.cos(r),t[0]=u[0]+n[0],t[1]=u[1]+n[1],t[2]=u[2]+n[2],t},o.rotateY=function(t,a,n,r){var o=[],u=[];return o[0]=a[0]-n[0],o[1]=a[1]-n[1],o[2]=a[2]-n[2],u[0]=o[2]*Math.sin(r)+o[0]*Math.cos(r),u[1]=o[1],u[2]=o[2]*Math.cos(r)-o[0]*Math.sin(r),t[0]=u[0]+n[0],t[1]=u[1]+n[1],t[2]=u[2]+n[2],t},o.rotateZ=function(t,a,n,r){var o=[],u=[];return o[0]=a[0]-n[0],o[1]=a[1]-n[1],o[2]=a[2]-n[2],u[0]=o[0]*Math.cos(r)-o[1]*Math.sin(r),u[1]=o[0]*Math.sin(r)+o[1]*Math.cos(r),u[2]=o[2],t[0]=u[0]+n[0],t[1]=u[1]+n[1],t[2]=u[2]+n[2],t},o.forEach=function(){var t=o.create();return function(a,n,r,o,u,l){var e,M;for(n||(n=3),r||(r=0),M=o?Math.min(o*n+r,a.length):a.length,e=r;M>e;e+=n)t[0]=a[e],t[1]=a[e+1],t[2]=a[e+2],u(t,t,l),a[e]=t[0],a[e+1]=t[1],a[e+2]=t[2];return a}}(),o.angle=function(t,a){var n=o.fromValues(t[0],t[1],t[2]),r=o.fromValues(a[0],a[1],a[2]);o.normalize(n,n),o.normalize(r,r);var u=o.dot(n,r);return u>1?0:Math.acos(u)},o.str=function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},o.exactEquals=function(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]},o.equals=function(t,a){var n=t[0],o=t[1],u=t[2],l=a[0],e=a[1],M=a[2];return Math.abs(n-l)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(l))&&Math.abs(o-e)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(e))&&Math.abs(u-M)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(M))},t.exports=o},function(t,a,n){var r=n(1),o={};o.create=function(){var t=new r.ARRAY_TYPE(4);return t[0]=0,t[1]=0,t[2]=0,t[3]=0,t},o.clone=function(t){var a=new r.ARRAY_TYPE(4);return a[0]=t[0],a[1]=t[1],a[2]=t[2],a[3]=t[3],a},o.fromValues=function(t,a,n,o){var u=new r.ARRAY_TYPE(4);return u[0]=t,u[1]=a,u[2]=n,u[3]=o,u},o.copy=function(t,a){return t[0]=a[0],t[1]=a[1],t[2]=a[2],t[3]=a[3],t},o.set=function(t,a,n,r,o){return t[0]=a,t[1]=n,t[2]=r,t[3]=o,t},o.add=function(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t[2]=a[2]+n[2],t[3]=a[3]+n[3],t},o.subtract=function(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t[2]=a[2]-n[2],t[3]=a[3]-n[3],t},o.sub=o.subtract,o.multiply=function(t,a,n){return t[0]=a[0]*n[0],t[1]=a[1]*n[1],t[2]=a[2]*n[2],t[3]=a[3]*n[3],t},o.mul=o.multiply,o.divide=function(t,a,n){return t[0]=a[0]/n[0],t[1]=a[1]/n[1],t[2]=a[2]/n[2],t[3]=a[3]/n[3],t},o.div=o.divide,o.ceil=function(t,a){return t[0]=Math.ceil(a[0]),t[1]=Math.ceil(a[1]),t[2]=Math.ceil(a[2]),t[3]=Math.ceil(a[3]),t},o.floor=function(t,a){return t[0]=Math.floor(a[0]),t[1]=Math.floor(a[1]),t[2]=Math.floor(a[2]),t[3]=Math.floor(a[3]),t},o.min=function(t,a,n){return t[0]=Math.min(a[0],n[0]),t[1]=Math.min(a[1],n[1]),t[2]=Math.min(a[2],n[2]),t[3]=Math.min(a[3],n[3]),t},o.max=function(t,a,n){return t[0]=Math.max(a[0],n[0]),t[1]=Math.max(a[1],n[1]),t[2]=Math.max(a[2],n[2]),t[3]=Math.max(a[3],n[3]),t},o.round=function(t,a){return t[0]=Math.round(a[0]),t[1]=Math.round(a[1]),t[2]=Math.round(a[2]),t[3]=Math.round(a[3]),t},o.scale=function(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t[2]=a[2]*n,t[3]=a[3]*n,t},o.scaleAndAdd=function(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t[2]=a[2]+n[2]*r,t[3]=a[3]+n[3]*r,t},o.distance=function(t,a){var n=a[0]-t[0],r=a[1]-t[1],o=a[2]-t[2],u=a[3]-t[3];return Math.sqrt(n*n+r*r+o*o+u*u)},o.dist=o.distance,o.squaredDistance=function(t,a){var n=a[0]-t[0],r=a[1]-t[1],o=a[2]-t[2],u=a[3]-t[3];return n*n+r*r+o*o+u*u},o.sqrDist=o.squaredDistance,o.length=function(t){var a=t[0],n=t[1],r=t[2],o=t[3];return Math.sqrt(a*a+n*n+r*r+o*o)},o.len=o.length,o.squaredLength=function(t){var a=t[0],n=t[1],r=t[2],o=t[3];return a*a+n*n+r*r+o*o},o.sqrLen=o.squaredLength,o.negate=function(t,a){return t[0]=-a[0],t[1]=-a[1],t[2]=-a[2],t[3]=-a[3],t},o.inverse=function(t,a){return t[0]=1/a[0],t[1]=1/a[1],t[2]=1/a[2],t[3]=1/a[3],t},o.normalize=function(t,a){var n=a[0],r=a[1],o=a[2],u=a[3],l=n*n+r*r+o*o+u*u;return l>0&&(l=1/Math.sqrt(l),t[0]=n*l,t[1]=r*l,t[2]=o*l,t[3]=u*l),t},o.dot=function(t,a){return t[0]*a[0]+t[1]*a[1]+t[2]*a[2]+t[3]*a[3]},o.lerp=function(t,a,n,r){var o=a[0],u=a[1],l=a[2],e=a[3];return t[0]=o+r*(n[0]-o),t[1]=u+r*(n[1]-u),t[2]=l+r*(n[2]-l),t[3]=e+r*(n[3]-e),t},o.random=function(t,a){return a=a||1,t[0]=r.RANDOM(),t[1]=r.RANDOM(),t[2]=r.RANDOM(),t[3]=r.RANDOM(),o.normalize(t,t),o.scale(t,t,a),t},o.transformMat4=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=a[3];return t[0]=n[0]*r+n[4]*o+n[8]*u+n[12]*l,t[1]=n[1]*r+n[5]*o+n[9]*u+n[13]*l,t[2]=n[2]*r+n[6]*o+n[10]*u+n[14]*l,t[3]=n[3]*r+n[7]*o+n[11]*u+n[15]*l,t},o.transformQuat=function(t,a,n){var r=a[0],o=a[1],u=a[2],l=n[0],e=n[1],M=n[2],s=n[3],i=s*r+e*u-M*o,c=s*o+M*r-l*u,h=s*u+l*o-e*r,S=-l*r-e*o-M*u;return t[0]=i*s+S*-l+c*-M-h*-e,t[1]=c*s+S*-e+h*-l-i*-M,t[2]=h*s+S*-M+i*-e-c*-l,t[3]=a[3],t},o.forEach=function(){var t=o.create();return function(a,n,r,o,u,l){var e,M;for(n||(n=4),r||(r=0),M=o?Math.min(o*n+r,a.length):a.length,e=r;M>e;e+=n)t[0]=a[e],t[1]=a[e+1],t[2]=a[e+2],t[3]=a[e+3],u(t,t,l),a[e]=t[0],a[e+1]=t[1],a[e+2]=t[2],a[e+3]=t[3];return a}}(),o.str=function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},o.exactEquals=function(t,a){return t[0]===a[0]&&t[1]===a[1]&&t[2]===a[2]&&t[3]===a[3]},o.equals=function(t,a){var n=t[0],o=t[1],u=t[2],l=t[3],e=a[0],M=a[1],s=a[2],i=a[3];return Math.abs(n-e)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(e))&&Math.abs(o-M)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(M))&&Math.abs(u-s)<=r.EPSILON*Math.max(1,Math.abs(u),Math.abs(s))&&Math.abs(l-i)<=r.EPSILON*Math.max(1,Math.abs(l),Math.abs(i))},t.exports=o},function(t,a,n){var r=n(1),o={};o.create=function(){var t=new r.ARRAY_TYPE(2);return t[0]=0,t[1]=0,t},o.clone=function(t){var a=new r.ARRAY_TYPE(2);return a[0]=t[0],a[1]=t[1],a},o.fromValues=function(t,a){var n=new r.ARRAY_TYPE(2);return n[0]=t,n[1]=a,n},o.copy=function(t,a){return t[0]=a[0],t[1]=a[1],t},o.set=function(t,a,n){return t[0]=a,t[1]=n,t},o.add=function(t,a,n){return t[0]=a[0]+n[0],t[1]=a[1]+n[1],t},o.subtract=function(t,a,n){return t[0]=a[0]-n[0],t[1]=a[1]-n[1],t},o.sub=o.subtract,o.multiply=function(t,a,n){return t[0]=a[0]*n[0],t[1]=a[1]*n[1],t},o.mul=o.multiply,o.divide=function(t,a,n){return t[0]=a[0]/n[0],t[1]=a[1]/n[1],t},o.div=o.divide,o.ceil=function(t,a){return t[0]=Math.ceil(a[0]),t[1]=Math.ceil(a[1]),t},o.floor=function(t,a){return t[0]=Math.floor(a[0]),t[1]=Math.floor(a[1]),t},o.min=function(t,a,n){return t[0]=Math.min(a[0],n[0]),t[1]=Math.min(a[1],n[1]),t},o.max=function(t,a,n){return t[0]=Math.max(a[0],n[0]),t[1]=Math.max(a[1],n[1]),t},o.round=function(t,a){return t[0]=Math.round(a[0]),t[1]=Math.round(a[1]),t},o.scale=function(t,a,n){return t[0]=a[0]*n,t[1]=a[1]*n,t},o.scaleAndAdd=function(t,a,n,r){return t[0]=a[0]+n[0]*r,t[1]=a[1]+n[1]*r,t},o.distance=function(t,a){var n=a[0]-t[0],r=a[1]-t[1];return Math.sqrt(n*n+r*r)},o.dist=o.distance,o.squaredDistance=function(t,a){var n=a[0]-t[0],r=a[1]-t[1];return n*n+r*r},o.sqrDist=o.squaredDistance,o.length=function(t){var a=t[0],n=t[1];return Math.sqrt(a*a+n*n)},o.len=o.length,o.squaredLength=function(t){var a=t[0],n=t[1];return a*a+n*n},o.sqrLen=o.squaredLength,o.negate=function(t,a){return t[0]=-a[0],t[1]=-a[1],t},o.inverse=function(t,a){return t[0]=1/a[0],t[1]=1/a[1],t},o.normalize=function(t,a){var n=a[0],r=a[1],o=n*n+r*r;return o>0&&(o=1/Math.sqrt(o),t[0]=a[0]*o,t[1]=a[1]*o),t},o.dot=function(t,a){return t[0]*a[0]+t[1]*a[1]},o.cross=function(t,a,n){var r=a[0]*n[1]-a[1]*n[0];return t[0]=t[1]=0,t[2]=r,t},o.lerp=function(t,a,n,r){var o=a[0],u=a[1];return t[0]=o+r*(n[0]-o),t[1]=u+r*(n[1]-u),t},o.random=function(t,a){a=a||1;var n=2*r.RANDOM()*Math.PI;return t[0]=Math.cos(n)*a,t[1]=Math.sin(n)*a,t},o.transformMat2=function(t,a,n){var r=a[0],o=a[1];return t[0]=n[0]*r+n[2]*o,t[1]=n[1]*r+n[3]*o,t},o.transformMat2d=function(t,a,n){var r=a[0],o=a[1];return t[0]=n[0]*r+n[2]*o+n[4],t[1]=n[1]*r+n[3]*o+n[5],t},o.transformMat3=function(t,a,n){var r=a[0],o=a[1];return t[0]=n[0]*r+n[3]*o+n[6],t[1]=n[1]*r+n[4]*o+n[7],t},o.transformMat4=function(t,a,n){var r=a[0],o=a[1];return t[0]=n[0]*r+n[4]*o+n[12],t[1]=n[1]*r+n[5]*o+n[13],t},o.forEach=function(){var t=o.create();return function(a,n,r,o,u,l){var e,M;for(n||(n=2),r||(r=0),M=o?Math.min(o*n+r,a.length):a.length,e=r;M>e;e+=n)t[0]=a[e],t[1]=a[e+1],u(t,t,l),a[e]=t[0],a[e+1]=t[1];return a}}(),o.str=function(t){return"vec2("+t[0]+", "+t[1]+")"},o.exactEquals=function(t,a){return t[0]===a[0]&&t[1]===a[1]},o.equals=function(t,a){var n=t[0],o=t[1],u=a[0],l=a[1];return Math.abs(n-u)<=r.EPSILON*Math.max(1,Math.abs(n),Math.abs(u))&&Math.abs(o-l)<=r.EPSILON*Math.max(1,Math.abs(o),Math.abs(l))},t.exports=o}])});
/**
 * Canvas Rendering Surface.
 * It is a top level component that combines it all together and hides unnecessary details.
 *
 * @param {HTMLCanvasElement} canvas
 * @constructor
 */
function CanvasSurface(canvas)
{
    if ( ! (canvas instanceof HTMLCanvasElement) ) {
        throw new TypeError('Passed canvas is not HTMLCanvasElement!');
    }
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.factory = new CanvasUIFactory(this.context);
    this.elements = new UICollection();
    this.elements.add(this.factory.createLabel());
    this.eventHandler = new CanvasSurfaceEventHandler(this);
    this.eventHandler.bindHtmlCanvasEvents();

    /**
     * This is a flag for detecting if we are exporting
     * result image as final texture.
     *
     * If this is true, then we shouldn't show any
     * selection borders
     *
     * @type {boolean}
     * @private
     */
    this._isExportingRender = false;

    this.clearColor = '#FFFFFF';
}

/**
 * Returns UICollection related to the surface.
 * 
 * @returns {UICollection}
 */
CanvasSurface.prototype.getElements = function () {
    return this.elements;
};

/**
 * Creates new label element in ui collection of the surface and returns it.
 * 
 * @returns {UILabelElement}
 */
CanvasSurface.prototype.pushLabel = function () {
    var label = this.factory.createLabel();
    this.elements.add(label);
    this.elements.selectLast();

    this.eventHandler.triggerSelect(label);
    this.render();

    return label;
};

/**
 * Creates new image element in ui collection
 *
 * @param {Image} image
 */
CanvasSurface.prototype.pushImage = function (image) {
    var imageElement = this.factory.createImage(image);
    this.elements.add(imageElement);
    this.elements.selectLast();

    this.eventHandler.triggerSelect(imageElement);
    this.render();

    return imageElement;
};

/**
 * Clear the related canvas.
 */
CanvasSurface.prototype.clear = function () {
    this.context.fillStyle = this.clearColor;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

/**
 * Sets the clear color
 * 
 * @param {string} color
 */
CanvasSurface.prototype.setClearColor = function (color) {
    this.clearColor = color;
};

/**
 * Renders all of the elements on the surface.
 */
CanvasSurface.prototype.renderElements = function () {
    var selectedIndex = this.elements.getSelectedIndex();
    for (var i = 0; i < this.elements.length; i++) {
        this.elements.get(i).render();

        if (i == selectedIndex && ! this._isExportingRender) {

            // We call it 'kostyl'
            // Weird way to set color
            var color = '#ffffff';
            if (this.clearColor.toLowerCase() == '#ffffff') {
                color = '#2e6da4';
            }

            new CanvasUISelectedView(this.context, {
                // kinda feels like hard code
                color: color,
                size: 15
            }).render(this.elements.get(i));
        }
    }
};

/**
 * Clears the surface and renders it with all elements.
 */
CanvasSurface.prototype.render = function () {
    this.clear();
    this.renderElements();
};

/**
 * Generates an image from drawn content
 * @returns {Image}
 */
CanvasSurface.prototype.toImage = function () {

    this._isExportingRender = true;
    this.render();

    var image = new Image();
    image.src = this.canvas.toDataURL();

    this._isExportingRender = false;
    this.render();

    return image;
};

/**
 * Moves currently selected element to the background
 */
CanvasSurface.prototype.selectedToBackground = function () {
    this.elements.toStart(this.elements.getSelectedIndex());
};

/**
 * Moves currently selected element to the foreground
 */
CanvasSurface.prototype.selectedToForeground = function () {
    this.elements.toEnd(this.elements.getSelectedIndex());
};

/**
 * Removes currently selected element
 *
 * @return {UIElement}
 */
CanvasSurface.prototype.removeSelected = function () {
    var element = this.elements.remove(this.elements.getSelectedIndex());
    this.eventHandler.triggerDeselect();

    return element;
};

/**
 * Adds new event handler on selection of an element
 *
 * @param {UISelectedCallback} callback
 */
CanvasSurface.prototype.addSelectEventHandler = function (callback) {
    this.eventHandler.addSelectEventHandler(callback);
};

/**
 *
 * @param {Function} callback
 */
CanvasSurface.prototype.addDeselectEventHandler = function (callback) {
    this.eventHandler.addDeselectEventHandler(callback);
};

/**
 * Get canvas bound rectangle.
 * Kinda ugly method.
 *
 * @returns {{top: number, right: number, bottom: number, left: number}}
 */
CanvasSurface.prototype.getBounds = function () {
    return {
        top: 0,
        right: this.canvas.width,
        bottom: this.canvas.height,
        left: 0
    };
};

/**
 * Callback type for selecting and element
 *
 * @callback UISelectedCallback
 * @param {UIElement}
 */
/**
 * This class is responsible for handling DOM events and triggering application events
 * Kinda ugly code here
 *
 * @param {CanvasSurface} surface
 * @constructor
 */
function CanvasSurfaceEventHandler (surface)
{
    this.surface = surface;
    this.isMouseDown = false;
    this.isMovingClick = false;
    this.isResizingClick = false;
    this.lastClickOffset = null;
    this.lastResizeCoordinates = null;

    this.handlers = {
        onSelect: [],
        onDeselect: []
    }
}

/**
 * Binds all event handlers to the HTML canvas
 * 
 * @param e
 */
CanvasSurfaceEventHandler.prototype.bindHtmlCanvasEvents = function (e) {
    this.surface.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    this.surface.canvas.addEventListener('touchstart', this.handleMouseDown.bind(this));

    // We binding this event to the whole document to stop moving
    // if user tries to drag an element out of the canvas
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.addEventListener('touchend', this.handleMouseUp.bind(this));

    this.surface.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    this.surface.canvas.addEventListener('touchmove', this.handleMouseMove.bind(this));
};

/**
 * Triggers select event.
 * This means that all assigned handlers will be executed.
 *
 * TODO: Abandon JavaScript and learn TypeScript
 *
 * @param {UIElement} element
 */
CanvasSurfaceEventHandler.prototype.triggerSelect = function (element) {
    for (var key in this.handlers.onSelect) {
        var callback = this.handlers.onSelect[key];

        if (callback instanceof Function) {
            callback(element);
        }
    }
};

/**
 * Triggers deselect event.
 * This means that all assigned handlers will be executed.
 */
CanvasSurfaceEventHandler.prototype.triggerDeselect = function () {
    for (var key in this.handlers.onDeselect) {
        var callback = this.handlers.onDeselect[key];
        if (callback instanceof Function) {
            callback();
        }
    }
};

/**
 * Adds new handler on element selection event
 *
 * @param {function} callback
 */
CanvasSurfaceEventHandler.prototype.addSelectEventHandler = function (callback) {
    this.handlers.onSelect.push(callback);
};

/**
 * Adds new handler on element deselection event
 *
 * @param {function} callback
 */
CanvasSurfaceEventHandler.prototype.addDeselectEventHandler = function (callback) {
    this.handlers.onDeselect.push(callback);
};


/**
 * Handler for the mousedown event
 *
 * @param e
 */
CanvasSurfaceEventHandler.prototype.handleMouseDown = function (e) {
    this.isMouseDown = true;

    // Quick hack
    if (typeof TouchEvent != "undefined" && e instanceof TouchEvent) {
        e = e.touches[0];
    }

    var localCoordinates = this.toLocalCoordinates(e.clientX, e.clientY);
    var oldSelectedElement = this.surface.getElements().getSelectedIndex();
    var newSelectedIndex = this.surface.elements.fetchIndexByOffset(localCoordinates.x, localCoordinates.y);
    var newSelectedElement = this.surface.elements.get(newSelectedIndex);

    var doWeHaveSomethingSelected = newSelectedIndex !== null;
    var isCurrentlySelectedWasSelectedBefore = doWeHaveSomethingSelected &&
        oldSelectedElement == newSelectedIndex;

    if (!doWeHaveSomethingSelected) {

        // If we had something selected before,
        // it means it is time to call deselect handlers
        if (oldSelectedElement != null) {
            this.triggerDeselect();
        }

        this.surface.elements.deselect();
        this.surface.render();

        return;
    }

    if (!isCurrentlySelectedWasSelectedBefore) {
        this.triggerSelect(newSelectedElement);
    }

    // We remember here the last click offset relatively selected element
    this.lastClickOffset = newSelectedElement.getClickOffset(localCoordinates.x, localCoordinates.y);

    // Is it a click starting resize operation ?
    this.isResizingClick = isCurrentlySelectedWasSelectedBefore &&
        this.isResizePossible(newSelectedElement, localCoordinates.x, localCoordinates.y);

    if (this.isResizingClick) {
        this.lastResizeCoordinates = localCoordinates;
        this.setResizableState(true);
    }
    // It is a click for moving
    else {
        this.isMovingClick = true;
        this.surface.elements.select(newSelectedIndex);
        this.setMovableState(true);
    }

    this.surface.render();
};

/**
 *
 * Handler for mouse up event
 *
 * @param {MouseEvent} e
 */
CanvasSurfaceEventHandler.prototype.handleMouseUp = function (e) {
    this.isMouseDown = false;
    this.isResizingClick = false;
    this.isMovingClick = false;
};

/**
 * Transforms coordinates to coordinates inside canvas
 *
 * @param clientX
 * @param clientY
 * @returns {{x: number, y: number}}
 */
CanvasSurfaceEventHandler.prototype.toLocalCoordinates = function (clientX, clientY) {
    var viewportOffset = this.surface.canvas.getBoundingClientRect();
    // these are relative to the viewport, i.e. the window
    var top = viewportOffset.top;
    var left = viewportOffset.left;
    var topOffset = clientY - top;
    var leftOffset = clientX - left;

    return {
        x: leftOffset,
        y: topOffset
    };
};

/**
 * Handler for mouse move event
 *
 * @param e
 */
CanvasSurfaceEventHandler.prototype.handleMouseMove = function (e) {

    // Quick hack
    if (typeof TouchEvent != "undefined" && e instanceof TouchEvent) {
        e.preventDefault();
        e = e.touches[0];
    }

    var selectedIndex = this.surface.elements.getSelectedIndex();
    var localCoordinates = this.toLocalCoordinates(e.clientX, e.clientY);
    var elementHoverIndex = this.surface.elements.fetchIndexByOffset(localCoordinates.x, localCoordinates.y);

    // It is simple mouse move,
    // we have nothing more to do here
    if (!this.isMouseDown) {
        this.handleMouseMoveWithoutMouseDown(elementHoverIndex, selectedIndex, localCoordinates);
        return;
    }

    var selectedElement = this.surface.elements.getSelectedElement();

    // If we are here, then we have button pressed and we must resize!
    if (this.isResizingClick) {
        var newSizeDelta = {
            width: localCoordinates.x - this.lastResizeCoordinates.x,
            height: localCoordinates.y - this.lastResizeCoordinates.y
        };

        this.lastResizeCoordinates = localCoordinates;

        var size = selectedElement.getSize();
        size.resizeBy(newSizeDelta.width, newSizeDelta.height);
    }
    // Nah, it's just moving
    else if (this.isMovingClick) {
        selectedElement.moveTo(new Position(
            localCoordinates.x - this.lastClickOffset.top,
            localCoordinates.y - this.lastClickOffset.left
        ));
    }

    this.surface.render();
};

/**
 * Adds movable html class to the canvas element.
 *
 * @param bool
 */
CanvasSurfaceEventHandler.prototype.setMovableState = function (bool) {
    if (bool) {
        this.surface.canvas.classList.add('movable');
        this.surface.canvas.classList.remove('resizable');
    }
    else {
        this.surface.canvas.classList.remove('movable');
    }
};

/**
 * Adds resizable html class to the canvas element.
 *
 * @param bool
 */
CanvasSurfaceEventHandler.prototype.setResizableState = function (bool) {
    if (bool) {
        this.surface.canvas.classList.remove('movable');
        this.surface.canvas.classList.add('resizable');
    }
    else {
        this.surface.canvas.classList.remove('resizable');
    }
};

/**
 * Handles mouse move event when mouse button is not pressed
 *
 * @param elementHoverIndex
 * @param selectedIndex
 * @param mouseCoordinates
 */
CanvasSurfaceEventHandler.prototype.handleMouseMoveWithoutMouseDown = function (elementHoverIndex, selectedIndex, mouseCoordinates) {
    if (elementHoverIndex == selectedIndex) {
        // What state is cursor in?
        var resizeState = this.isResizePossible(this.surface.elements.getSelectedElement(), mouseCoordinates.x, mouseCoordinates.y);
        if (resizeState) {
            this.setResizableState(true);
        }
        else {
            this.setMovableState(true);
        }
    }
    else {
        this.setMovableState(false);
        this.setResizableState(false);
    }
};


/**
 * Returns true if passed coordinates are located on position of drag icon of an element
 *
 * @param element
 * @param x
 * @param y
 */
CanvasSurfaceEventHandler.prototype.isResizePossible = function(element, x, y) {
    var dragIconSize = 10;

    var tempElementData = {
        position: new Position(
            element.getPosition().getX() + element.getSize().getWidth() - dragIconSize,
            element.getPosition().getY() + element.getSize().getHeight() - dragIconSize
        ),
        size: new Size(dragIconSize, dragIconSize)
    };

    var tempElement = new UIElement(tempElementData.position, tempElementData.size);
    return tempElement.isOffsetIn(x, y);
};
/**
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUIElementView(context) {
    if ( ! (context instanceof CanvasRenderingContext2D)) {
        throw new TypeError('Canvas UI Element View error! Context is not a context');
    }

    /**
     * @type {CanvasRenderingContext2D}
     */
    this.context = context;
}

CanvasUIElementView.prototype = Object.create(UIElementView.prototype);

CanvasUIElementView.prototype.render = function (element) {

};
/**
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUIFactory(context)
{
    if ( ! (context instanceof CanvasRenderingContext2D)) {
        throw new TypeError('Canvas rendering context must be instance of CanvasRenderingContext2D! (factory creating)');
    }
    this.context = context;
}

/**
 * Creates a label element, which is ready to be rendered on the canvas
 *
 * @returns {UILabelElement}
 */
CanvasUIFactory.prototype.createLabel = function () {

    var label = new UILabelElement(new Position(0, 50));
    label.setView(new CanvasUILabelView(this.context));

    return label;
};

/**
 * Creates an image element, which is ready to be rendered on the canvas
 *
 * @param {Image} image
 */
CanvasUIFactory.prototype.createImage = function (image) {
    var imageElement = new UIImageElement(null, null, image);
    imageElement.setView(new CanvasUIImageView(this.context));

    return imageElement;
};
/**
 * View of an image element on the canvas
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUIImageView(context) {
    CanvasUIElementView.call(this, context);
}

CanvasUIImageView.prototype = Object.create(CanvasUIElementView.prototype);

/**
 * Renders an image element
 *
 * @param {UIImageElement} uiImageElement
 */
CanvasUIImageView.prototype.render = function (uiImageElement) {
    var pos = uiImageElement.getPosition();
    var size = uiImageElement.getSize();

    this.context.drawImage(
        uiImageElement.getImage(),
        pos.getX(),
        pos.getY(),
        size.getWidth(),
        size.getHeight()
    );
};
/**
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUILabelView(context) {
    CanvasUIElementView.call(this, context);
}

CanvasUILabelView.prototype = Object.create(CanvasUIElementView.prototype);

/**
 * Renders text element
 *
 * @param {UILabelElement} element
 */
CanvasUILabelView.prototype.render = function (element) {
    // Our text size fits bounds
    var fontSize = element.getSize().getHeight();

    this.context.font = fontSize + "px " + element.getFont();
    this.context.fillStyle = element.getColor();
    this.context.textBaseline = 'hanging';

    this.context.fillText(
        element.getText(),
        element.getPosition().getX(),
        element.getPosition().getY(),
        element.getSize().getWidth()
    );
};
/**
 * Base view for selected element
 *
 * @param {CanvasRenderingContext2D} context
 * @param {{color: string}, {size: int}} style - icon size and hex color string
 * @constructor
 */
function CanvasUISelectedView(context, style) {
    if ( ! (context instanceof CanvasRenderingContext2D)) {
        throw new TypeError('Canvas UI Element View error! Context does not have type CanvasRenderingContext2D!');
    }

    this.context = context;
    this.fillStyle = style.color || '#AAAAAA';
    this.resizeIconWidth = style.size || 15;
}

CanvasUISelectedView.prototype = Object.create(CanvasUIElementView.prototype);

CanvasUISelectedView.prototype.render = function (element) {

    this.context.font = this.resizeIconWidth + "px Arial";
    this.context.fillStyle = this.fillStyle;
    this.context.textBaseline = 'bottom';

    this.context.fillText(
        CanvasUISelectedView.ResizeSymbol,
        element.getPosition().getX() + element.getSize().getWidth() - this.resizeIconWidth,
        element.getPosition().getY() + element.getSize().getHeight(),
        this.resizeIconWidth
    );

    this.context.strokeStyle = this.fillStyle;
    this.context.strokeRect(
        element.getPosition().getX(),
        element.getPosition().getY(),
        element.getSize().getWidth(),
        element.getSize().getHeight()
    );
};

/**
 * @const ⇘
 * @type {string}
 */
CanvasUISelectedView.ResizeSymbol = '\u21f2';
/**
 * Position in 2D space
 *
 * @param {number} x
 * @param {number} y
 * @constructor
 */
function Position(x, y) {
    this.x = +x || 0;
    this.y = +y || 0;
}

/**
 *
 * @returns {number}
 */
Position.prototype.getX = function() {
    return this.x;
};

/**
 *
 * @returns {number}
 */
Position.prototype.getY = function() {
    return this.y;
};

/**
 * Changes positions of an object
 *
 * @param {number} deltaX
 * @param {number} deltaY
 * @return Position
 */
Position.prototype.move = function(deltaX, deltaY) {
    var newXPos = this.x + deltaX;
    var newYPos = this.y + deltaY;

    return new Position(newXPos, newYPos);
};
/**
 * This object is only purposed for loading external resources
 * This is supposed to be an object during testing purposes
 *
 * @constructor
 */
function ResourceLoader() {
    
}


/**
 * Loads image then calls a function.
 * That simple.
 *
 * @param {string} src
 * @param callback
 */
ResourceLoader.prototype.loadImage = function (src, callback) {
    var img = new Image();

    if (callback instanceof Function) {
        img.onload = callback;
    }

    img.src = src;
};

/**
 * Loads text content, calls function
 * 
 * @param src
 * @param callback
 */
ResourceLoader.prototype.loadText = function (src, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if (callback instanceof Function) {
            callback(this.responseText);
        }
    };

    xhr.open('GET', src, true);
    xhr.send();
};

/**
 * Loads JSON content, calls callback
 *
 * @param {string} src
 * @param callback
 */
ResourceLoader.prototype.loadJsonObject = function (src, callback) {
    this.loadText(src, function (loadedText) {
        if (callback instanceof Function) {
            callback(JSON.parse(loadedText));
        }
    })
};


/**
 *
 * @param {ResourceLoader} resourceLoader
 * @param {[{key: string, src: string, type: string }]} resources - what resources are you going to load
 * Key is used to save loaded content to Storage,
 * Type must be: 'text', 'image' or 'json',
 * Src is the path to the resource from document root
 * @param {Function} onLoad - callback, which will be executed on load of each element
 * @constructor
 */
function ResourcePreparer(resourceLoader, resources, onLoad)
{
    this.loader = resourceLoader;
    this.resourcesToLoad = resources;
    this.onLoad = onLoad;
}

/**
 * Starts loading of requested resources
 */
ResourcePreparer.prototype.startLoading = function () {
    var totalLoadedCount = 0;
    var shouldLoadCount = this.resourcesToLoad.length;
    var onLoadCallback = this.onLoad;
    var loader = this.loader;

    // Each time we have loaded a resource
    // we check everything is loaded
    var saveResource = function (key, object) {
        Storage.remember(key, object);
        totalLoadedCount++;
        if (totalLoadedCount == shouldLoadCount) {
            onLoadCallback();
        }
    };


    var requestMethods = {
        image: function (src, key) {
            loader.loadImage(src, function () {
                saveResource(key, this);
            })
        },
        json: function (src, key) {
            loader.loadJsonObject(src, function (jsonResource) {
                saveResource(key, jsonResource);
            })
        },
        text: function (src, key) {
            loader.loadText(src, function (textResource) {
                saveResource(key, textResource);
            })
        }
    };

    this.resourcesToLoad.forEach(function (resource) {
        var type = resource.type;
        var key = resource.key;
        var src = resource.src;

        if ( ! requestMethods.hasOwnProperty(type)) {
            throw new ReferenceError('Trying to load unknown resource type!');
        }

        // calling appropriate load method
        requestMethods[type](src, key);
    });
};
/**
 * Size of the rectangle surrounding the object
 *
 * @param {number} width
 * @param {number} height
 * @constructor
 */
function Size(width, height) {
    this.width = +width || Size.defaultWidth;
    this.height = +height || Size.defaultHeight;
}

Size.prototype.getWidth = function() {
    return this.width;
};

Size.prototype.getHeight = function() {
    return this.height;
};


Size.prototype.resizeBy = function (deltaWidth, deltaHeight) {
    this.width += deltaWidth;
    this.height += deltaHeight;

    if (this.width < Size.minWidth) {
        this.width = Size.minWidth;
    }

    if (this.height < Size.minHeight) {
        this.height = Size.minHeight;
    }
};

/**
 * Increases the size by multiplier
 *
 * @param {number} multiplier
 * @returns {Size}
 */
Size.prototype.multiply = function(multiplier) {
    return new Size(this.width * multiplier, this.height * multiplier);
};

/**
 * Minimal width
 * @type {number}
 */
Size.minWidth = 40;

/**
 * Minimal height
 * @type {number}
 */
Size.minHeight = 40;

/**
 * const for default width
 * @type {number}
 */
Size.defaultWidth = 150;

/**
 * const for default height
 * @type {number}
 */
Size.defaultHeight = 70;
/**
 * It is purposed for remembering some data.
 * Functional declaration is used for its visibility only.
 *
 * @constructor
 */
function Storage() {
    throw new TypeError("This is not for creating objects!");
}

Storage._content = {};

/**
 * Remembers any value
 *
 * @param {string} key
 * @param {*} value
 */
Storage.remember = function (key, value) {
    Storage._content[key] = value;
};

/**
 * Allows you to get what you want but only if you remember this earlier
 * 
 * @param {string} key
 */
Storage.get = function (key) {
    var somethingYouWant = Storage._content[key];

    if (typeof somethingYouWant == 'undefined') {
        throw new ReferenceError("We have nothing to return using key: " + key);
    }

    return somethingYouWant;
};

/**
 * Collection for UI elements.
 *
 * It is purposed for keeping ui elements with correct order
 * Also supports selection remembering
 *
 * @constructor
 */
function UICollection() {
    var self = this;

    this.elements = [];
    this.selectedIndex = -1;

    Object.defineProperty(this, 'length', {
        get: function() {
            return self.elements.length
        }
    })
}

/**
 * Pushes element to the top layer of the collection
 *
 * @param {UIElement} element
 */
UICollection.prototype.add = function(element) {
    if ( ! (element instanceof UIElement) ) {
        throw new TypeError('Element in UICollection must have UIElement type');
    }

    this.elements.push(element);
};

/**
 * Returns array with all elements in it
 *
 * @returns {Array}
 */
UICollection.prototype.getAll = function() {
    return this.elements;
};

/**
 * Removes element with passed index from the collection and returns it
 *
 * @return {UIElement}
 */
UICollection.prototype.remove = function (index) {
    if (!this.has(index)) {
        throw new RangeError("Collection: index out of bounds!");
    }
    if (index == this.selectedIndex) {
        this.deselect();
    }
    return this.elements.splice(index, 1)[0];
};

/**
 * Swaps places of two elements in the collection
 *
 * @param index1
 * @param index2
 */
UICollection.prototype.swap = function (index1, index2) {
    if (!this.has(index1) || !this.has(index2)) {
        throw new RangeError("Collection: index out of bounds!");
    }

    var temp = this.elements[index1];
    this.elements[index1]  = this.elements[index2];
    this.elements[index2] = temp;
};

/**
 * Check if index exists in collection
 *
 * @param index
 * @returns {boolean}
 */
UICollection.prototype.has = function (index) {
    return index >= 0 || index < this.length;
};

/**
 *
 * @param index
 */
UICollection.prototype.get = function (index) {
    if (!this.has(index)) {
        throw new RangeError("Collection: index out of bounds!");
    }
    return this.elements[index];
};

/**
 * Forgets which element was selected
 */
UICollection.prototype.deselect = function () {
    this.selectedIndex = -1;
};

/**
 *
 * @param index
 */
UICollection.prototype.select = function (index) {
    if (!this.has(index)) {
        throw new RangeError("Collection: index out of bounds!");
    }
    this.selectedIndex = index;
};

/**
 * Selects the last element in the collection
 */
UICollection.prototype.selectLast = function () {
    this.selectedIndex = this.length ? this.length - 1 : -1;
};

/**
 * Returns selected element
 *
 * @returns {UIElement|null}
 */
UICollection.prototype.getSelectedElement = function () {
    if (this.selectedIndex != -1) {
        return this.elements[this.selectedIndex]
    }
    return null;
};

/**
 * Returns index of selected element
 * If none, returns -1
 *
 * @returns {number}
 */
UICollection.prototype.getSelectedIndex = function () {
    return this.selectedIndex;
};

/**
 * Fetches element by passed offset
 *
 * @param offsetX
 * @param offsetY
 * @returns {UIElement|null}
 */
UICollection.prototype.fetchElementByOffset = function (offsetX, offsetY) {
    var matchedElement = null;
    this.elements.forEach(function (el) {
        if (el.isOffsetIn(offsetX, offsetY)) {
            matchedElement = el;
        }
    });
    return matchedElement;
};

/**
 * Pushes element to the end of the collection
 *
 * @param index
 */
UICollection.prototype.toEnd = function(index)
{
    if (!this.has(index)) {
        throw new RangeError("Collection: index out of bounds!");
    }
    var wasSelected = this.selectedIndex == index;
    var element = this.remove(index);
    this.add(element);

    if (wasSelected) {
        this.selectedIndex = this.length - 1;
    }
};

/**
 * Pushes element to the bottom of the collection
 *
 * @param index
 */
UICollection.prototype.toStart = function(index)
{
    if (!this.has(index)) {
        throw new RangeError("Collection: index out of bounds!");
    }
    var wasSelected = this.selectedIndex == index;
    var element = this.remove(index);
    this.elements = [element].concat(this.elements);

    if (wasSelected) {
        this.selectedIndex = 0;
    }
};


/**
 * Fetches index by passed offset
 *
 * @param offsetX
 * @param offsetY
 * @returns {*}
 */
UICollection.prototype.fetchIndexByOffset = function (offsetX, offsetY) {
    var matchedIndex = null;
    this.elements.forEach(function (el, index) {
        if (el.isOffsetIn(offsetX, offsetY)) {
            matchedIndex = index;
        }
    });
    return matchedIndex;
};
/**
 * Some element of user interface
 *
 * @param {Position|undefined} position
 * @param {Size|undefined} size
 * @constructor
 */
function UIElement(position, size)
{
    if ( ! (position instanceof Position) ) {
        position = new Position();
    }
    this.position = position;

    if ( ! (size instanceof Position)) {
        size = new Size();
    }
    this.size = size;
}

/**
 * Sets the view of the element
 *
 * @param {UIElementView} view
 */
UIElement.prototype.setView = function(view) {
    if ( ! (view instanceof UIElementView) ) {
        throw new TypeError('View must have UIElementView type!');
    }
    this.view = view;
};

/**
 * Returns current view of the element
 *
 * @returns {UIElementView|undefined}
 */
UIElement.prototype.getView = function () {
    return this.view;
};

/**
 * Renders the element using its view
 */
UIElement.prototype.render = function () {
    if (!this.view) {
        throw new ReferenceError('View is not set!');
    }

    this.view.render(this);
};

/**
 *
 * @param {Position} position
 * @returns {UIElement}
 */
UIElement.prototype.moveTo = function(position) {
    if (!position instanceof Position) {
        throw new TypeError('new position must have Position type!')
    }
    this.position = position;
    return this;
};

/**
 * Returns position of an element
 *
 * @returns {Position}
 */
UIElement.prototype.getPosition = function() {
    return this.position;
};

/**
 * Sets the size of the element
 */
UIElement.prototype.setSize = function(size) {
    this.size = size;
};


/**
 * Return the size of the element
 *
 * @returns {Size}
 */
UIElement.prototype.getSize = function () {
    return this.size;
};


/**
 * Returns true if passed offset matches element position
 *
 * @param clientX
 * @param clientY
 * @returns {boolean}
 */
UIElement.prototype.isOffsetIn = function (clientX, clientY)
{
    var currentPosition = this.getPosition();
    var currentSize = this.getSize();

    if (currentPosition.getX() > clientX || currentPosition.getX() + currentSize.getWidth() < clientX) {
        return false;
    }
    if (currentPosition.getY() > clientY || currentPosition.getY() + currentSize.getHeight() < clientY) {
        return false;
    }

    return true;
};

/**
 * Returns object containing information about how far is passed offset from point (0, 0)
 *
 * @param clientX
 * @param clientY
 * @returns {{top: number, left: number}}
 */
UIElement.prototype.getClickOffset = function (clientX, clientY) {
    var position = this.getPosition();
    return {
        top: clientX - position.getX(),
        left: clientY - position.getY()
    }
};
/**
 * Object, which defines how to render specific UIElement
 * This object knows everything about an object it needs to draw.
 *
 * @constructor
 */
function UIElementView()
{

}
/**
 *
 * @param UIElement
 */
UIElementView.prototype.render = function (UIElement) {
    throw TypeError('You should not be using an abstract object for rendering!');
};

/**
 *
 * @param {Position|null} position
 * @param {Size|null} size
 * @param {Image} image
 * @constructor
 */
function UIImageElement(position, size, image)
{
    UIElement.call(this, position, size);

    if ( ! (image instanceof Image)) {
        throw new TypeError("Image must have Image type!");
    }

    this.image = image;
}

UIImageElement.prototype = Object.create(UIElement.prototype);

/**
 *
 * @returns {Image}
 */
UIImageElement.prototype.getImage = function () {
    return this.image;
};
/**
 * Class for creating
 *
 * @param {Position|null} position
 * @param {Size|null} size
 * @param {string} text
 * @param {*} style
 * @constructor
 */
function UILabelElement(position, size, text, style) {
    UIElement.apply(this, [position, size]);

    if (!text) {
        text = UILabelElement.defaultText;
    }

    this.text = text;

    if (! (style instanceof Object)) {
        style = {};
    }

    this.font = style.font || UILabelElement.defaultStyle.font;
    this.color = style.color || UILabelElement.defaultStyle.color;
}

UILabelElement.prototype = Object.create(UIElement.prototype);

/**
 * Gets a text of the current UILabelElement
 *
 * @returns {string}
 */
UILabelElement.prototype.getText = function () {
    return this.text;
};

/**
 * Sets a text of the current UILabelElement
 *
 * @param {string} text
 */
UILabelElement.prototype.setText = function (text) {
    this.text = text;
};

/**
 * Returns t
 *
 * @return {string|string|*}
 */
UILabelElement.prototype.getFont = function () {
    return this.font;
};

/**
 * Sets the font of the element
 *
 * @param {string} font
 */
UILabelElement.prototype.setFont = function (font) {
    this.font = font;
};

/**
 * Returns the color of the text
 *
 * @return {string}
 */
UILabelElement.prototype.getColor = function () {
    return this.color;
};

/**
 * Sets the color of the text
 *
 * @param {string} color
 */
UILabelElement.prototype.setColor = function (color) {
    this.color = color;
};

UILabelElement.defaultText = "Введите текст...";

UILabelElement.defaultStyle = {
    font: 'Arial',
    color: '#000000'
};
/**
 * Camera
 * Manages view changing
 * Uses spherical coordinates to change the view around the object
 *
 * @constructor
 */
function Camera()
{
    // Initial angle and distance
    this.angleTheta = 30;
    this.angleFi = 0;
    this.distance = 15;

    this.minAngleTheta = 10;
    this.maxAngleTheta = 170;

    this.position = this.getNewPosition();

    // Where to look
    this.lookAt = [0, 0, 1.3];
    this.up = [0, 0, 1];

    this.matrix = new Float32Array(16);
    this.updateMatrix();
}

/**
 * Returns new positions of a viewer
 *
 * @returns {*[]}
 */
Camera.prototype.getNewPosition = function () {
    return [
        Math.cos(this.angleFi * Camera.ToRadians) * Math.sin(this.angleTheta * Camera.ToRadians) * this.distance,
        Math.sin(this.angleTheta * Camera.ToRadians) * Math.sin(this.angleFi * Camera.ToRadians) * this.distance,
        this.distance * Math.cos(this.angleTheta * Camera.ToRadians)
    ];
};

/**
 * Moves camera around the object
 *
 * @param angleFi
 * @param angleTheta
 */
Camera.prototype.move = function (angleFi, angleTheta) {

    this.angleFi += angleFi;

    var changedAngleTheta = this.angleTheta + angleTheta;

    if (changedAngleTheta < this.maxAngleTheta && changedAngleTheta > this.minAngleTheta) {
        this.angleTheta = changedAngleTheta;
    }

    this.position = this.getNewPosition();
    this.updateMatrix();
};

/**
 * Move camera forward
 */
Camera.prototype.zoomIn = function () {
    if (this.distance > 4) {
        this.distance--;
        this.position = this.getNewPosition();
        this.updateMatrix();
    }
};

/**
 * Move camera backward
 */
Camera.prototype.zoomOut = function () {
    if (this.distance < 20) {
        this.distance++;
        this.position = this.getNewPosition();
        this.updateMatrix();
    }
};

/**
 * Sets camera angle
 *
 * @param angleFi
 * @param angleTheta
 */
Camera.prototype.setAngle = function (angleFi, angleTheta) {
    this.angleFi = angleFi;
    this.angleTheta = angleTheta;
};

/**
 * Updates view matrix
 */
Camera.prototype.updateMatrix = function () {
    mat4.lookAt(this.matrix, this.position, this.lookAt, this.up);
};

/**
 * Const for translating degrees to radians
 *
 * @type {number}
 */
Camera.ToRadians = Math.PI / 180;
/**
 * Object for creating VBO and storing it
 * to have capability to dynamically change current model
 *
 * @param gl
 * @param jsonModel
 * @constructor
 */
function Model(gl, jsonModel) {
    this.buildBuffers(gl, jsonModel)
}

/**
 * Binds all buffers
 *
 * @param gl
 * @param jsonModel
 */
Model.prototype.buildBuffers = function (gl, jsonModel)
{
    // Создаем буферы
    this.modelVertexes = jsonModel.meshes[0].vertices;
    this.modelIndexes = Array.prototype.concat.apply([], jsonModel.meshes[0].faces);
    this.modelTexCoords = jsonModel.meshes[0].texturecoords[0];
    this.modelNormals = jsonModel.meshes[0].normals;

    // Создаем буфер - через него передается информация в GPU
    this.modelVertexBufferObject = gl.createBuffer();
    // Назначаем его активным
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelVertexBufferObject);
    // STATIC_DRAW - копируем единожды из CPU в GPU
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.modelVertexes), gl.STATIC_DRAW);

    // Отдельный буфер для текстурных координат
    this.modelTexCoordsBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelTexCoordsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.modelTexCoords), gl.STATIC_DRAW);

    // Создаем индексный буфер для указания порядка вершин
    this.modelIndexBufferObject = gl.createBuffer();
    // Назначаем его активным
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.modelIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.modelIndexes), gl.STATIC_DRAW);

    // Буфер с нормалями
    this.modelNormalBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelNormalBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.modelNormals), gl.STATIC_DRAW);
};

Model.prototype.bindBuffers = function (gl) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelVertexBufferObject);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelTexCoordsBufferObject);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.modelIndexBufferObject);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.modelNormalBufferObject);
};
/**
 * @param canvas
 * @param {CanvasRenderingContext2D} glContext
 * @param {Image} initialTexture
 * @param {string} vertexShader
 * @param {string} fragmentShader
 * @constructor
 */
function ModelView(canvas, glContext, initialTexture, vertexShader, fragmentShader) {

    this.canvas = canvas;
    this.gl = glContext;

    this.texture = initialTexture;
    this.initialize(vertexShader, fragmentShader);

    this.camera = new Camera();

    this.setTexture(initialTexture);
}

/**
 *
 * @param {string} vertexShader - vertex shader source
 * @param {string} fragmentShader - fragment shader source
 */
ModelView.prototype.initialize = function (vertexShader, fragmentShader)
{
    var gl = this.gl;

    // Включаем проверку глубины
    gl.enable(gl.DEPTH_TEST);

    // Задаем цвет очистки
    gl.clearColor(0.8, 0.9, 0.9 , 0.0);
    // Очистка - что очищаем - буфер цвета, или же буфер глубины
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var shaderCompiler = new ShaderCompiler(gl);
    this.shaderProgram = shaderCompiler.makeProgram(vertexShader, fragmentShader);
};

/**
 * Sets a new texture as active texture
 * 
 * @param {Image} image
 */
ModelView.prototype.setTexture = function (image) {

    this.texture = image;
    var gl = this.gl;

    // Creating texture
    this.modelTexture = gl.createTexture();
    // Binding it
    gl.bindTexture(gl.TEXTURE_2D, this.modelTexture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    // i for integer , s, t - u, v
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // Filters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // Сама текстура
    gl.texImage2D(
        gl.TEXTURE_2D, // Texture type
        0, // Detail level
        gl.RGBA, // What format do we use
        gl.RGBA,
        gl.UNSIGNED_BYTE, // Data type
        this.texture // Texture itself
    );
    // Unbind for now
    gl.bindTexture(gl.TEXTURE_2D, null);
};

/**
 * Sets active model and binds all of the buffers
 *
 * @param {Model} model
 */
ModelView.prototype.setModel = function (model) {

    this.model = model;
    var program = this.shaderProgram;
    var gl = this.gl;

    model.bindBuffers(gl);

    // Уведомляем шейдер о том, как брать данные из буфера в качестве входных параметров
    var positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');

    gl.bindBuffer(gl.ARRAY_BUFFER, model.modelVertexBufferObject);
    gl.vertexAttribPointer(
        positionAttributeLocation, // наш атрибут
        3, // Количество элементов на атрибут
        gl.FLOAT, // Тип каждого элемента буфера
        gl.FALSE, // Нормализованный вид?
        3 * Float32Array.BYTES_PER_ELEMENT, // Размер одной вершины (байт)
        0 // Отступ (в байтах) от начала данных, принадлежащих одной вершине
    );
    // Включаем атрибут
    gl.enableVertexAttribArray(positionAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, model.modelTexCoordsBufferObject);
    var texCoordAttributeLocation = gl.getAttribLocation(program, 'vertTexCoord');
    gl.vertexAttribPointer(
        texCoordAttributeLocation, // наш атрибут
        2, // Количество элементов на атрибут
        gl.FLOAT, // Тип каждого элемента буфера
        gl.FALSE, // Нормализованный вид?
        2 * Float32Array.BYTES_PER_ELEMENT, // Размер одной вершины (байт)
        0 // Отступ (в байтах) от начала данных, принадлежащих одной вершине
    );
    gl.enableVertexAttribArray(texCoordAttributeLocation);

    // Нормали в шейдере
    gl.bindBuffer(gl.ARRAY_BUFFER, model.modelNormalBufferObject);
    var normalAttributeLocation = gl.getAttribLocation(program, 'vertNormal');
    gl.vertexAttribPointer(
        normalAttributeLocation, // наш атрибут
        3, // Количество элементов на атрибут
        gl.FLOAT, // Тип каждого элемента буфера
        gl.TRUE, // Нормализованный вид?
        3 * Float32Array.BYTES_PER_ELEMENT, // Размер одной вершины (байт)
        0 // Отступ (в байтах) от начала данных, принадлежащих одной вершине
    );
    gl.enableVertexAttribArray(normalAttributeLocation);

};

ModelView.prototype.startRender = function () {
    var gl = this.gl;

    // Матрицы - местоположение в шейдерах
    this.matWorldUniformLocation = gl.getUniformLocation(this.shaderProgram, 'mWorld');
    this.matViewUniformLocation = gl.getUniformLocation(this.shaderProgram, 'mView');
    this.matProjectionUniformLocation = gl.getUniformLocation(this.shaderProgram, 'mProjection');

    // Сами матрицы
    var worldMatrix = new Float32Array(16);
    var projectionMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);

    // Поле обзора (в радианах), viewport, closest plane, far plane
    mat4.perspective(projectionMatrix, glMatrix.toRadian(30), this.canvas.width / this.canvas.height, 0.1, 1000.0);

    // Какую шейдерную программу используем
    gl.useProgram(this.shaderProgram);

    // Передаем в шейдер. TRUE - чтобы транспонировать
    gl.uniformMatrix4fv(this.matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(this.matViewUniformLocation, gl.FALSE, this.camera.matrix);
    gl.uniformMatrix4fv(this.matProjectionUniformLocation, gl.FALSE, projectionMatrix);

    this.bindCanvasHandlers();

    // Сберегаем вычислительные мощности
    // Главный цикр рендера
    requestAnimationFrame(this.loop.bind(this));
};

/**
 * Render loop
 */
ModelView.prototype.loop = function ()
{
    var gl = this.gl;
    // Обновляем переменную в шейдере
    gl.uniformMatrix4fv(this.matViewUniformLocation, gl.FALSE, this.camera.matrix);

    // Назначение текстуры
    gl.bindTexture(gl.TEXTURE_2D, this.modelTexture);

    // Активный слот текстуры
    gl.activeTexture(gl.TEXTURE0);

    // Цвет очистки
    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT );

    gl.drawElements(
        gl.TRIANGLES, // Как рисуем,
        this.model.modelIndexes.length,
        gl.UNSIGNED_SHORT, // Тип
        0 // Сколько пропускам вершин
    );
    requestAnimationFrame(this.loop.bind(this));
};


ModelView.prototype.bindCanvasHandlers = function () {
    var sensitivity = 15;

    var isMousePressed = false;
    var initialEvent = null;

    var camera = this.camera;

    var handleMouseDown = function(e) {
        if (typeof TouchEvent != "undefined" && e instanceof TouchEvent) {
            e = e.touches[0];
        }

        isMousePressed = true;
        initialEvent = e;
    };

    var handleMouseUp =  function (e) {
        isMousePressed = false;
        initialEvent = null;
    };

    var handleMouseMove = function (e) {
        // another quick hack
        if (typeof TouchEvent != "undefined" && e instanceof TouchEvent) {
            e.preventDefault();
            e = e.touches[0];
        }

        if (isMousePressed) {
            var diffX = initialEvent.clientX - e.clientX;
            var diffY = initialEvent.clientY - e.clientY;
            initialEvent = e;

            camera.move(diffX, diffY);
        }
    };

    this.canvas.addEventListener('mousedown', handleMouseDown);
    this.canvas.addEventListener('touchstart', handleMouseDown);

    this.canvas.addEventListener('mouseup', handleMouseUp);
    this.canvas.addEventListener('touchend', handleMouseUp);

    this.canvas.addEventListener('mousemove', handleMouseMove);
    this.canvas.addEventListener('touchmove', handleMouseMove);
};
/**
 * Shader compiler
 * Simply makes WebGLProgram from shader sources
 *
 * @param {WebGLRenderingContext} webGLRenderingContent
 * @constructor
 */
function ShaderCompiler(webGLRenderingContent) {
    this.webGLContext = webGLRenderingContent;     
}

/**
 *
 * @param {string} vertexShaderSource
 * @param {string} fragmentShaderSource
 * @return {WebGLProgram}
 */
ShaderCompiler.prototype.makeProgram = function (vertexShaderSource, fragmentShaderSource) {
    var gl = this.webGLContext;

    // Creating shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Setting shader sources
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // Compiling shader
    gl.compileShader(vertexShader);

    // Checking compilation status
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        throw new Error('Error compiling vertex shader!', gl.getShaderInfoLog(vertexShader));

    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        throw new Error('Error compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
    }

    // We want to make a program shader sources
    var program = gl.createProgram();

    // WebGL knows type of each shader
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // Linking
    gl.linkProgram(program);

    // Do we have linking errors?
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error('Linking error!', gl.getProgramInfoLog(program));
    }

    // Only for testing purposes
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        throw new Error('Validating error!', gl.getProgramInfoLog(program));
    }

    return program;
};



/**
 * This is the place where magic happens.
 * Handling events
 *
 * @param {CanvasSurface} surface
 * @param {ModelView} modelView
 * @constructor
 */
function ComponentsPanel(surface, modelView)
{
    this._surface = surface;
    
    this._fileInput = document.getElementById('fileUploader');
    this._btnUpdateTexture = document.getElementById('updateTexture');
    this._btnAddText = document.getElementById('btnAddText');
    this._selectBackground = document.getElementById('selectBackground');
    this._modelView = modelView;
}

ComponentsPanel.prototype.bindHandlers = function () {
    var self = this;
    
    // Add listener for a click event on text button
    this._btnAddText.addEventListener('click', function () {
        self._surface.pushLabel();
    });
    
    // Update current texture button
    this._btnUpdateTexture.addEventListener('click', function () {
        self._modelView.setTexture(self._surface.toImage());
    });

    // On click we set current value to empty and the reason
    // why we are doing this is because we want to
    // add new image on the surface, even if it is the
    // same file (in case if user selected it earlier)
    this._fileInput.addEventListener('click', function (e) {
        this.value = '';
    });

    // Setting clear color for a canvas surface
    this._selectBackground.addEventListener('change', function () {
        // There is an empty value in the list
        if (this.value) {
            self._surface.setClearColor(this.value);
            self._surface.render();
        }
    });

    // On change we are loading a file.
    this._fileInput.addEventListener('change', function (e) {
        // We need only one file.
        // The first one.
        var file = e.target.files[0];
        var fileReader = new FileReader();

        fileReader.onload = function (event) {
            var dataImage = event.currentTarget.result;
            var image = new Image();
            image.src = dataImage;
            
            // adding uploaded image to the surface
            self._surface.pushImage(image);
        };

        fileReader.readAsDataURL(file);
    });
};

/**
 * Panel for interacting with model view element
 * Zooming, type selector.
 *
 * @param {ModelView} modelView
 * @param {{Model}} models
 * @constructor
 */
function ModelViewPanel(modelView, models)
{
    this._btnZoomIn = document.getElementById('btnZoomIn');
    this._btnZoomOut = document.getElementById('btnZoomOut');
    this._cupTypeSelect = document.getElementById('cupTypeSelect');

    this._modelView = modelView;
    this._models = models;
}

/**
 * Binds all event handlers
 */
ModelViewPanel.prototype.bindHandlers = function ()
{
    var self = this;

    // Zooming buttons
    this._btnZoomIn.addEventListener('click', function () {
        self._modelView.camera.zoomIn();
    });
    this._btnZoomOut.addEventListener('click', function () {
        self._modelView.camera.zoomOut();
    });

    // Changing model type
    this._cupTypeSelect.addEventListener('change', function () {
        var selected = this.value;
        self._modelView.setModel(self._models[selected]);
    });
};
/**
 * Part of the document for manipulation with properties 
 * of the selected UIElement on CanvasSurface
 *
 * Aware of the document content
 * Handles HTML manipulations
 *
 * @constructor
 */
function PropertiesPanel(surface)
{
    this._textPanel = {
        panel: document.getElementById('textOptions'),
        selectFont: document.getElementById('fontSelect'),
        selectColor: document.getElementById('colorFontSelect'),
        textArea: document.getElementById('selectedTextContent'),
        textUpButton: document.getElementById('textUpBtn'),
        textDownButton: document.getElementById('textDownBtn')
    };
    
    this._commonPanel = {
        panel: document.getElementById('commonOptions'),
        removeBtn: document.getElementById('removeBtn'),
        upBtn: document.getElementById('upBtn'),
        downBtn: document.getElementById('downBtn')
    };
    
    this._imagePanel = {
        panel: document.getElementById('imageOptions')
    };
    this._emptyPanel = document.getElementById('noSelectedOptions');
    
    this._selectedElement = null;
    this._surface = surface;
}

/**
 * Binds handlers to the events
 */
PropertiesPanel.prototype.bindHandlers = function () {
    var self = this;

    // Selection events from canvas surface
    this._surface.addSelectEventHandler(function (uiElement) {
        self.setSelected(uiElement);
    });
    this._surface.addDeselectEventHandler(function () {
        self.setSelected(null);
    });

    // Button click for common options - remove currently selected element
    this._commonPanel.removeBtn.addEventListener('click', function (event) {
        self._surface.removeSelected();
        self._surface.render();
    });

    // Move foreground
    this._commonPanel.upBtn.addEventListener('click', function (event) {
        self._surface.selectedToForeground();
        self._surface.render();
    });

    // Move background
    this._commonPanel.downBtn.addEventListener('click', function (event) {
        self._surface.selectedToBackground();
        self._surface.render();
    });

    // Binding text change event through text area element
    this._textPanel.textArea.addEventListener('input', function (e) {
        // If this event happened
        // then we have a label as selected element
        self._selectedElement.setText(this.value);
        self._surface.render();
    });

    // Updates selected font
    this._textPanel.selectFont.addEventListener('change', function () {
        self._selectedElement.setFont(this.value);
        self._surface.render();
    });

    // Updates selected color
    this._textPanel.selectColor.addEventListener('change', function () {
        self._selectedElement.setColor(this.value);
        self._surface.render();
    });
};

/**
 * Sets selected element.
 * Show properties window depending on what is the type of an element 
 * 
 * @param {UIElement|null} uiElement
 */
PropertiesPanel.prototype.setSelected = function (uiElement) {
    this._selectedElement = uiElement;
    
    if (uiElement instanceof UILabelElement) {
        this.showTextProperties();
        return;
    }
    
    if (uiElement instanceof UIImageElement) {
        this.showImageProperties();
        return
    }
    
    this.showNothingSelectedPanel();
};

/**
 * Hides all of the panels
 */
PropertiesPanel.prototype.hideAll = function () {
    this._textPanel.panel.classList.add('hidden');
    this._imagePanel.panel.classList.add('hidden');
    this._commonPanel.panel.classList.add('hidden');
    this._emptyPanel.classList.add('hidden');
};

/**
 * Hides all except text properties panel
 */
PropertiesPanel.prototype.showTextProperties = function () {
    this.hideAll();
    this._textPanel.textArea.innerHTML = this._selectedElement.getText();
    this._textPanel.selectFont.value = this._selectedElement.getFont();
    this._textPanel.selectColor.value = this._selectedElement.getColor();
    this._textPanel.panel.classList.remove('hidden');
    this._commonPanel.panel.classList.remove('hidden');
};

/**
 * Hides everything except images panel
 */
PropertiesPanel.prototype.showImageProperties = function () {
    this.hideAll();
    this._imagePanel.panel.classList.remove('hidden');
    this._commonPanel.panel.classList.remove('hidden');
};

/**
 * Hides all except "nothing selected" panel
 */
PropertiesPanel.prototype.showNothingSelectedPanel = function () {
    this.hideAll();
    this._emptyPanel.classList.remove('hidden');
};
document.addEventListener('DOMContentLoaded', function() {

    var canvas = document.getElementById('canvas');
    var surface = new CanvasSurface(canvas);
    surface.render();

    // Create properties panel
    // and attaching it to canvas events
    var propertiesPanel = new PropertiesPanel(surface);
    propertiesPanel.bindHandlers();

    var cupSurface = document.getElementById('cupSurface');
    var loader = new ResourceLoader();

    var resourcePreparer = new ResourcePreparer(loader, [
        {key: 'modelCup1', src: '/models/cup1.json', type: 'json'},
        {key: 'modelCup2', src: '/models/cup2.json', type: 'json'},
        {key: 'vertexShader', src: '/shaders/fragment.glsl', type: 'text'},
        {key: 'fragmentShader', src: '/shaders/vertex.glsl', type: 'text'},
        {key: 'initialTexture', src: '/img/logoGrey.jpg', type: 'image'}
    ], function () {

        // TODO: extract all checks
        var glContext = cupSurface.getContext('webgl');

        if (!glContext) {
            glContext = cupSurface.getContext('experimental-webgl')
        }

        if (!glContext) {
            alert('Seems like your browser does not support WebGL. Come back later when you update your browser!');
            throw new Error('WebGL support is required!');
        }

        // key must be same as select option value
        var models = {
            cup1: new Model(glContext, Storage.get('modelCup1')),
            cup2: new Model(glContext, Storage.get('modelCup2'))
        };

        var modelView = new ModelView(
            cupSurface,
            glContext,
            Storage.get('initialTexture'),
            Storage.get('fragmentShader'),
            Storage.get('vertexShader')
        );

        modelView.setModel(models.cup1);
        modelView.startRender();

        // Panel for creating new elements on
        var componentPanel = new ComponentsPanel(surface, modelView);
        componentPanel.bindHandlers();

        // Panel for 3D magic
        var modelViewPanel = new ModelViewPanel(modelView, models);
        modelViewPanel.bindHandlers();
    });

    resourcePreparer.startLoading();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsLW1hdHJpeC5qcyIsIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsIkNhbnZhc1VJRmFjdG9yeS5qcyIsIkNhbnZhc1VJSW1hZ2VWaWV3LmpzIiwiQ2FudmFzVUlMYWJlbFZpZXcuanMiLCJDYW52YXNVSVNlbGVjdGVkVmlldy5qcyIsIlBvc2l0aW9uLmpzIiwiUmVzb3VyY2VMb2FkZXIuanMiLCJSZXNvdXJjZVByZXBhcmVyLmpzIiwiU2l6ZS5qcyIsIlN0b3JhZ2UuanMiLCJVSUNvbGxlY3Rpb24uanMiLCJVSUVsZW1lbnQuanMiLCJVSUVsZW1lbnRWaWV3LmpzIiwiVUlJbWFnZUVsZW1lbnQuanMiLCJVSUxhYmVsRWxlbWVudC5qcyIsIkNhbWVyYS5qcyIsIk1vZGVsLmpzIiwiTW9kZWxWaWV3LmpzIiwiU2hhZGVyQ29tcGlsZXIuanMiLCJDYW52YXNSZXNpemVFdmVudExpc3RlbmVyLmpzIiwiQ29tcG9uZW50c1BhbmVsLmpzIiwiTW9kZWxWaWV3UGFuZWwuanMiLCJQcm9wZXJ0aWVzUGFuZWwuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcFRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDck5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGZpbGVvdmVydmlldyBnbC1tYXRyaXggLSBIaWdoIHBlcmZvcm1hbmNlIG1hdHJpeCBhbmQgdmVjdG9yIG9wZXJhdGlvbnNcclxuICogQGF1dGhvciBCcmFuZG9uIEpvbmVzXHJcbiAqIEBhdXRob3IgQ29saW4gTWFjS2VuemllIElWXHJcbiAqIEB2ZXJzaW9uIDIuMy4yXHJcbiAqL1xyXG5cclxuLyogQ29weXJpZ2h0IChjKSAyMDE1LCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuXHJcblxyXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXHJcbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cclxuIFRIRSBTT0ZUV0FSRS4gKi9cclxuXHJcbiFmdW5jdGlvbih0LGEpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWEoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYSk7ZWxzZXt2YXIgbj1hKCk7Zm9yKHZhciByIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6dClbcl09bltyXX19KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gYShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17ZXhwb3J0czp7fSxpZDpyLGxvYWRlZDohMX07cmV0dXJuIHRbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsYSksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiBhLm09dCxhLmM9bixhLnA9XCJcIixhKDApfShbZnVuY3Rpb24odCxhLG4pe2EuZ2xNYXRyaXg9bigxKSxhLm1hdDI9bigyKSxhLm1hdDJkPW4oMyksYS5tYXQzPW4oNCksYS5tYXQ0PW4oNSksYS5xdWF0PW4oNiksYS52ZWMyPW4oOSksYS52ZWMzPW4oNyksYS52ZWM0PW4oOCl9LGZ1bmN0aW9uKHQsYSl7dmFyIG49e307bi5FUFNJTE9OPTFlLTYsbi5BUlJBWV9UWVBFPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBGbG9hdDMyQXJyYXk/RmxvYXQzMkFycmF5OkFycmF5LG4uUkFORE9NPU1hdGgucmFuZG9tLG4uRU5BQkxFX1NJTUQ9ITEsbi5TSU1EX0FWQUlMQUJMRT1uLkFSUkFZX1RZUEU9PT1GbG9hdDMyQXJyYXkmJlwiU0lNRFwiaW4gdGhpcyxuLlVTRV9TSU1EPW4uRU5BQkxFX1NJTUQmJm4uU0lNRF9BVkFJTEFCTEUsbi5zZXRNYXRyaXhBcnJheVR5cGU9ZnVuY3Rpb24odCl7bi5BUlJBWV9UWVBFPXR9O3ZhciByPU1hdGguUEkvMTgwO24udG9SYWRpYW49ZnVuY3Rpb24odCl7cmV0dXJuIHQqcn0sbi5lcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gTWF0aC5hYnModC1hKTw9bi5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModCksTWF0aC5hYnMoYSkpfSx0LmV4cG9ydHM9bn0sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyl7dmFyIHU9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdVswXT10LHVbMV09YSx1WzJdPW4sdVszXT1vLHV9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0fSxvLnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe2lmKHQ9PT1hKXt2YXIgbj1hWzFdO3RbMV09YVsyXSx0WzJdPW59ZWxzZSB0WzBdPWFbMF0sdFsxXT1hWzJdLHRbMl09YVsxXSx0WzNdPWFbM107cmV0dXJuIHR9LG8uaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4qdS1vKnI7cmV0dXJuIGw/KGw9MS9sLHRbMF09dSpsLHRbMV09LXIqbCx0WzJdPS1vKmwsdFszXT1uKmwsdCk6bnVsbH0sby5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXTtyZXR1cm4gdFswXT1hWzNdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0WzNdPW4sdH0sby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXtyZXR1cm4gdFswXSp0WzNdLXRbMl0qdFsxXX0sby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPW5bMF0sTT1uWzFdLHM9blsyXSxpPW5bM107cmV0dXJuIHRbMF09ciplK3UqTSx0WzFdPW8qZStsKk0sdFsyXT1yKnMrdSppLHRbM109bypzK2wqaSx0fSxvLm11bD1vLm11bHRpcGx5LG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0rdSplLHRbMV09bypNK2wqZSx0WzJdPXIqLWUrdSpNLHRbM109byotZStsKk0sdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPW5bMF0sTT1uWzFdO3JldHVybiB0WzBdPXIqZSx0WzFdPW8qZSx0WzJdPXUqTSx0WzNdPWwqTSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0tbix0WzNdPXIsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPWFbMV0sdH0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQyKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikpfSxvLkxEVT1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFsyXT1yWzJdL3JbMF0sblswXT1yWzBdLG5bMV09clsxXSxuWzNdPXJbM10tdFsyXSpuWzFdLFt0LGEsbl19LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9YVswXSxNPWFbMV0scz1hWzJdLGk9YVszXTtyZXR1cm4gTWF0aC5hYnMobi1lKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMoZSkpJiZNYXRoLmFicyhvLU0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhNKSkmJk1hdGguYWJzKHUtcyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKHMpKSYmTWF0aC5hYnMobC1pKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoaSkpfSxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0fSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNik7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0WzRdPTAsdFs1XT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg2KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGFbNF09dFs0XSxhWzVdPXRbNV0sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0WzRdPTAsdFs1XT0wLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvLHUsbCl7dmFyIGU9bmV3IHIuQVJSQVlfVFlQRSg2KTtyZXR1cm4gZVswXT10LGVbMV09YSxlWzJdPW4sZVszXT1vLGVbNF09dSxlWzVdPWwsZX0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvLHUsbCl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0WzRdPXUsdFs1XT1sLHR9LG8uaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09bip1LXIqbztyZXR1cm4gTT8oTT0xL00sdFswXT11Kk0sdFsxXT0tcipNLHRbMl09LW8qTSx0WzNdPW4qTSx0WzRdPShvKmUtdSpsKSpNLHRbNV09KHIqbC1uKmUpKk0sdCk6bnVsbH0sby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXtyZXR1cm4gdFswXSp0WzNdLXRbMV0qdFsyXX0sby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9blswXSxpPW5bMV0sYz1uWzJdLGg9blszXSxTPW5bNF0sST1uWzVdO3JldHVybiB0WzBdPXIqcyt1KmksdFsxXT1vKnMrbCppLHRbMl09cipjK3UqaCx0WzNdPW8qYytsKmgsdFs0XT1yKlMrdSpJK2UsdFs1XT1vKlMrbCpJK00sdH0sby5tdWw9by5tdWx0aXBseSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9TWF0aC5zaW4obiksaT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKmkrdSpzLHRbMV09byppK2wqcyx0WzJdPXIqLXMrdSppLHRbM109byotcytsKmksdFs0XT1lLHRbNV09TSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1uWzBdLGk9blsxXTtyZXR1cm4gdFswXT1yKnMsdFsxXT1vKnMsdFsyXT11KmksdFszXT1sKmksdFs0XT1lLHRbNV09TSx0fSxvLnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9blswXSxpPW5bMV07cmV0dXJuIHRbMF09cix0WzFdPW8sdFsyXT11LHRbM109bCx0WzRdPXIqcyt1KmkrZSx0WzVdPW8qcytsKmkrTSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0tbix0WzNdPXIsdFs0XT0wLHRbNV09MCx0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109YVsxXSx0WzRdPTAsdFs1XT0wLHR9LG8uZnJvbVRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0WzRdPWFbMF0sdFs1XT1hWzFdLHR9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0MmQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIiwgXCIrdFs0XStcIiwgXCIrdFs1XStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKStNYXRoLnBvdyh0WzRdLDIpK01hdGgucG93KHRbNV0sMikrMSl9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdFs0XT1hWzRdK25bNF0sdFs1XT1hWzVdK25bNV0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHRbNF09YVs0XS1uWzRdLHRbNV09YVs1XS1uWzVdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHRbNF09YVs0XSpuLHRbNV09YVs1XSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdFs0XT1hWzRdK25bNF0qcix0WzVdPWFbNV0rbls1XSpyLHR9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM10mJnRbNF09PT1hWzRdJiZ0WzVdPT09YVs1XX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9dFs0XSxNPXRbNV0scz1hWzBdLGk9YVsxXSxjPWFbMl0saD1hWzNdLFM9YVs0XSxJPWFbNV07cmV0dXJuIE1hdGguYWJzKG4tcyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKHMpKSYmTWF0aC5hYnMoby1pKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoaSkpJiZNYXRoLmFicyh1LWMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhjKSkmJk1hdGguYWJzKGwtaCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGgpKSYmTWF0aC5hYnMoZS1TKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZSksTWF0aC5hYnMoUykpJiZNYXRoLmFicyhNLUkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhNKSxNYXRoLmFicyhJKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg5KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MSx0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby5mcm9tTWF0ND1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbNF0sdFs0XT1hWzVdLHRbNV09YVs2XSx0WzZdPWFbOF0sdFs3XT1hWzldLHRbOF09YVsxMF0sdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDkpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYVs0XT10WzRdLGFbNV09dFs1XSxhWzZdPXRbNl0sYVs3XT10WzddLGFbOF09dFs4XSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8sdSxsLGUsTSxzKXt2YXIgaT1uZXcgci5BUlJBWV9UWVBFKDkpO3JldHVybiBpWzBdPXQsaVsxXT1hLGlbMl09bixpWzNdPW8saVs0XT11LGlbNV09bCxpWzZdPWUsaVs3XT1NLGlbOF09cyxpfSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8sdSxsLGUsTSxzKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHRbNF09dSx0WzVdPWwsdFs2XT1lLHRbN109TSx0WzhdPXMsdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MSx0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXtpZih0PT09YSl7dmFyIG49YVsxXSxyPWFbMl0sbz1hWzVdO3RbMV09YVszXSx0WzJdPWFbNl0sdFszXT1uLHRbNV09YVs3XSx0WzZdPXIsdFs3XT1vfWVsc2UgdFswXT1hWzBdLHRbMV09YVszXSx0WzJdPWFbNl0sdFszXT1hWzFdLHRbNF09YVs0XSx0WzVdPWFbN10sdFs2XT1hWzJdLHRbN109YVs1XSx0WzhdPWFbOF07cmV0dXJuIHR9LG8uaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9aSpsLWUqcyxoPS1pKnUrZSpNLFM9cyp1LWwqTSxJPW4qYytyKmgrbypTO3JldHVybiBJPyhJPTEvSSx0WzBdPWMqSSx0WzFdPSgtaSpyK28qcykqSSx0WzJdPShlKnItbypsKSpJLHRbM109aCpJLHRbNF09KGkqbi1vKk0pKkksdFs1XT0oLWUqbitvKnUpKkksdFs2XT1TKkksdFs3XT0oLXMqbityKk0pKkksdFs4XT0obCpuLXIqdSkqSSx0KTpudWxsfSxvLmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF07cmV0dXJuIHRbMF09bCppLWUqcyx0WzFdPW8qcy1yKmksdFsyXT1yKmUtbypsLHRbM109ZSpNLXUqaSx0WzRdPW4qaS1vKk0sdFs1XT1vKnUtbiplLHRbNl09dSpzLWwqTSx0WzddPXIqTS1uKnMsdFs4XT1uKmwtcip1LHR9LG8uZGV0ZXJtaW5hbnQ9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXSx1PXRbNF0sbD10WzVdLGU9dFs2XSxNPXRbN10scz10WzhdO3JldHVybiBhKihzKnUtbCpNKStuKigtcypvK2wqZSkrciooTSpvLXUqZSl9LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPW5bMF0sUz1uWzFdLEk9blsyXSxmPW5bM10seD1uWzRdLEQ9bls1XSxGPW5bNl0sbT1uWzddLGQ9bls4XTtyZXR1cm4gdFswXT1oKnIrUypsK0kqcyx0WzFdPWgqbytTKmUrSSppLHRbMl09aCp1K1MqTStJKmMsdFszXT1mKnIreCpsK0Qqcyx0WzRdPWYqbyt4KmUrRCppLHRbNV09Zip1K3gqTStEKmMsdFs2XT1GKnIrbSpsK2Qqcyx0WzddPUYqbyttKmUrZCppLHRbOF09Rip1K20qTStkKmMsdH0sby5tdWw9by5tdWx0aXBseSxvLnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9blswXSxTPW5bMV07cmV0dXJuIHRbMF09cix0WzFdPW8sdFsyXT11LHRbM109bCx0WzRdPWUsdFs1XT1NLHRbNl09aCpyK1MqbCtzLHRbN109aCpvK1MqZStpLHRbOF09aCp1K1MqTStjLHR9LG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1NYXRoLnNpbihuKSxTPU1hdGguY29zKG4pO3JldHVybiB0WzBdPVMqcitoKmwsdFsxXT1TKm8raCplLHRbMl09Uyp1K2gqTSx0WzNdPVMqbC1oKnIsdFs0XT1TKmUtaCpvLHRbNV09UypNLWgqdSx0WzZdPXMsdFs3XT1pLHRbOF09Yyx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uWzBdLG89blsxXTtyZXR1cm4gdFswXT1yKmFbMF0sdFsxXT1yKmFbMV0sdFsyXT1yKmFbMl0sdFszXT1vKmFbM10sdFs0XT1vKmFbNF0sdFs1XT1vKmFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdH0sby5mcm9tVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MSx0WzVdPTAsdFs2XT1hWzBdLHRbN109YVsxXSx0WzhdPTEsdH0sby5mcm9tUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09MCx0WzNdPS1uLHRbNF09cix0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT1hWzFdLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLmZyb21NYXQyZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09MCx0WzNdPWFbMl0sdFs0XT1hWzNdLHRbNV09MCx0WzZdPWFbNF0sdFs3XT1hWzVdLHRbOF09MSx0fSxvLmZyb21RdWF0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4rbixlPXIrcixNPW8rbyxzPW4qbCxpPXIqbCxjPXIqZSxoPW8qbCxTPW8qZSxJPW8qTSxmPXUqbCx4PXUqZSxEPXUqTTtyZXR1cm4gdFswXT0xLWMtSSx0WzNdPWktRCx0WzZdPWgreCx0WzFdPWkrRCx0WzRdPTEtcy1JLHRbN109Uy1mLHRbMl09aC14LHRbNV09UytmLHRbOF09MS1zLWMsdH0sby5ub3JtYWxGcm9tTWF0ND1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XSxjPWFbOV0saD1hWzEwXSxTPWFbMTFdLEk9YVsxMl0sZj1hWzEzXSx4PWFbMTRdLEQ9YVsxNV0sRj1uKmUtcipsLG09bipNLW8qbCxkPW4qcy11KmwsYj1yKk0tbyplLHY9cipzLXUqZSx6PW8qcy11Kk0scD1pKmYtYypJLHc9aSp4LWgqSSxFPWkqRC1TKkksQT1jKngtaCpmLFA9YypELVMqZixMPWgqRC1TKngscT1GKkwtbSpQK2QqQStiKkUtdip3K3oqcDtyZXR1cm4gcT8ocT0xL3EsdFswXT0oZSpMLU0qUCtzKkEpKnEsdFsxXT0oTSpFLWwqTC1zKncpKnEsdFsyXT0obCpQLWUqRStzKnApKnEsdFszXT0obypQLXIqTC11KkEpKnEsdFs0XT0obipMLW8qRSt1KncpKnEsdFs1XT0ocipFLW4qUC11KnApKnEsdFs2XT0oZip6LXgqditEKmIpKnEsdFs3XT0oeCpkLUkqei1EKm0pKnEsdFs4XT0oSSp2LWYqZCtEKkYpKnEsdCk6bnVsbH0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQzKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIsIFwiK3RbNF0rXCIsIFwiK3RbNV0rXCIsIFwiK3RbNl0rXCIsIFwiK3RbN10rXCIsIFwiK3RbOF0rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikrTWF0aC5wb3codFs0XSwyKStNYXRoLnBvdyh0WzVdLDIpK01hdGgucG93KHRbNl0sMikrTWF0aC5wb3codFs3XSwyKStNYXRoLnBvdyh0WzhdLDIpKX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0WzRdPWFbNF0rbls0XSx0WzVdPWFbNV0rbls1XSx0WzZdPWFbNl0rbls2XSx0WzddPWFbN10rbls3XSx0WzhdPWFbOF0rbls4XSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdFs0XT1hWzRdLW5bNF0sdFs1XT1hWzVdLW5bNV0sdFs2XT1hWzZdLW5bNl0sdFs3XT1hWzddLW5bN10sdFs4XT1hWzhdLW5bOF0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdFs0XT1hWzRdKm4sdFs1XT1hWzVdKm4sdFs2XT1hWzZdKm4sdFs3XT1hWzddKm4sdFs4XT1hWzhdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0WzRdPWFbNF0rbls0XSpyLHRbNV09YVs1XStuWzVdKnIsdFs2XT1hWzZdK25bNl0qcix0WzddPWFbN10rbls3XSpyLHRbOF09YVs4XStuWzhdKnIsdH0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXSYmdFs0XT09PWFbNF0mJnRbNV09PT1hWzVdJiZ0WzZdPT09YVs2XSYmdFs3XT09PWFbN10mJnRbOF09PT1hWzhdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT10WzRdLE09dFs1XSxzPXRbNl0saT10WzddLGM9dFs4XSxoPWFbMF0sUz1hWzFdLEk9YVsyXSxmPWFbM10seD1hWzRdLEQ9YVs1XSxGPXRbNl0sbT1hWzddLGQ9YVs4XTtyZXR1cm4gTWF0aC5hYnMobi1oKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMoaCkpJiZNYXRoLmFicyhvLVMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhTKSkmJk1hdGguYWJzKHUtSSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKEkpKSYmTWF0aC5hYnMobC1mKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoZikpJiZNYXRoLmFicyhlLXgpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhlKSxNYXRoLmFicyh4KSkmJk1hdGguYWJzKE0tRCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKE0pLE1hdGguYWJzKEQpKSYmTWF0aC5hYnMocy1GKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMocyksTWF0aC5hYnMoRikpJiZNYXRoLmFicyhpLW0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhpKSxNYXRoLmFicyhtKSkmJk1hdGguYWJzKGMtZCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGMpLE1hdGguYWJzKGQpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e3NjYWxhcjp7fSxTSU1EOnt9fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoMTYpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09MSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDE2KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGFbNF09dFs0XSxhWzVdPXRbNV0sYVs2XT10WzZdLGFbN109dFs3XSxhWzhdPXRbOF0sYVs5XT10WzldLGFbMTBdPXRbMTBdLGFbMTFdPXRbMTFdLGFbMTJdPXRbMTJdLGFbMTNdPXRbMTNdLGFbMTRdPXRbMTRdLGFbMTVdPXRbMTVdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0sdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxmLHgpe3ZhciBEPW5ldyByLkFSUkFZX1RZUEUoMTYpO3JldHVybiBEWzBdPXQsRFsxXT1hLERbMl09bixEWzNdPW8sRFs0XT11LERbNV09bCxEWzZdPWUsRFs3XT1NLERbOF09cyxEWzldPWksRFsxMF09YyxEWzExXT1oLERbMTJdPVMsRFsxM109SSxEWzE0XT1mLERbMTVdPXgsRH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvLHUsbCxlLE0scyxpLGMsaCxTLEksZix4KXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHRbNF09dSx0WzVdPWwsdFs2XT1lLHRbN109TSx0WzhdPXMsdFs5XT1pLHRbMTBdPWMsdFsxMV09aCx0WzEyXT1TLHRbMTNdPUksdFsxNF09Zix0WzE1XT14LHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLnNjYWxhci50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXtpZih0PT09YSl7dmFyIG49YVsxXSxyPWFbMl0sbz1hWzNdLHU9YVs2XSxsPWFbN10sZT1hWzExXTt0WzFdPWFbNF0sdFsyXT1hWzhdLHRbM109YVsxMl0sdFs0XT1uLHRbNl09YVs5XSx0WzddPWFbMTNdLHRbOF09cix0WzldPXUsdFsxMV09YVsxNF0sdFsxMl09byx0WzEzXT1sLHRbMTRdPWV9ZWxzZSB0WzBdPWFbMF0sdFsxXT1hWzRdLHRbMl09YVs4XSx0WzNdPWFbMTJdLHRbNF09YVsxXSx0WzVdPWFbNV0sdFs2XT1hWzldLHRbN109YVsxM10sdFs4XT1hWzJdLHRbOV09YVs2XSx0WzEwXT1hWzEwXSx0WzExXT1hWzE0XSx0WzEyXT1hWzNdLHRbMTNdPWFbN10sdFsxNF09YVsxMV0sdFsxNV09YVsxNV07cmV0dXJuIHR9LG8uU0lNRC50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXt2YXIgbixyLG8sdSxsLGUsTSxzLGksYztyZXR1cm4gbj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCkscj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMCwxLDQsNSksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwwLDEsNCw1KSxNPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDAsMiw0LDYpLHM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMSwzLDUsNyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLE0pLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxzKSxsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDIsMyw2LDcpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMiwzLDYsNyksaT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwwLDIsNCw2KSxjPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDEsMyw1LDcpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLGMpLHR9LG8udHJhbnNwb3NlPXIuVVNFX1NJTUQ/by5TSU1ELnRyYW5zcG9zZTpvLnNjYWxhci50cmFuc3Bvc2Usby5zY2FsYXIuaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9YVs5XSxoPWFbMTBdLFM9YVsxMV0sST1hWzEyXSxmPWFbMTNdLHg9YVsxNF0sRD1hWzE1XSxGPW4qZS1yKmwsbT1uKk0tbypsLGQ9bipzLXUqbCxiPXIqTS1vKmUsdj1yKnMtdSplLHo9bypzLXUqTSxwPWkqZi1jKkksdz1pKngtaCpJLEU9aSpELVMqSSxBPWMqeC1oKmYsUD1jKkQtUypmLEw9aCpELVMqeCxxPUYqTC1tKlArZCpBK2IqRS12KncreipwO3JldHVybiBxPyhxPTEvcSx0WzBdPShlKkwtTSpQK3MqQSkqcSx0WzFdPShvKlAtcipMLXUqQSkqcSx0WzJdPShmKnoteCp2K0QqYikqcSx0WzNdPShoKnYtYyp6LVMqYikqcSx0WzRdPShNKkUtbCpMLXMqdykqcSx0WzVdPShuKkwtbypFK3UqdykqcSx0WzZdPSh4KmQtSSp6LUQqbSkqcSx0WzddPShpKnotaCpkK1MqbSkqcSx0WzhdPShsKlAtZSpFK3MqcCkqcSx0WzldPShyKkUtbipQLXUqcCkqcSx0WzEwXT0oSSp2LWYqZCtEKkYpKnEsdFsxMV09KGMqZC1pKnYtUypGKSpxLHRbMTJdPShlKnctbCpBLU0qcCkqcSx0WzEzXT0obipBLXIqdytvKnApKnEsdFsxNF09KGYqbS1JKmIteCpGKSpxLHRbMTVdPShpKmItYyptK2gqRikqcSx0KTpudWxsfSxvLlNJTUQuaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG4scixvLHUsbCxlLE0scyxpLGMsaD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksUz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksST1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksZj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpO3JldHVybiBsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaCxTLDAsMSw0LDUpLHI9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShJLGYsMCwxLDQsNSksbj1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsciwwLDIsNCw2KSxyPVNJTUQuRmxvYXQzMng0LnNodWZmbGUocixsLDEsMyw1LDcpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShoLFMsMiwzLDYsNyksdT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKEksZiwyLDMsNiw3KSxvPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCx1LDAsMiw0LDYpLHU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZSh1LGwsMSwzLDUsNyksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobyx1KSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxlPVNJTUQuRmxvYXQzMng0Lm11bChyLGwpLE09U0lNRC5GbG9hdDMyeDQubXVsKG4sbCksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHIsbCksZSksTT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG4sbCksTSksTT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKE0sMiwzLDAsMSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwocixvKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxlPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxlKSxpPVNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuc3ViKGUsU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkpLGk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGw9U0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUociwyLDMsMCwxKSx1KSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxvPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobywyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSxlKSxzPVNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuc3ViKGUsU0lNRC5GbG9hdDMyeDQubXVsKG8sbCkpLHM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChuLGwpLHMpLHM9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDIsMywwLDEpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG4sciksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMikscz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkscyksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG8sbCksaSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSkscz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkscyksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoaSxTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobix1KSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxNPVNJTUQuRmxvYXQzMng0LnN1YihNLFNJTUQuRmxvYXQzMng0Lm11bChvLGwpKSxzPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxzKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxNPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSxNKSxzPVNJTUQuRmxvYXQzMng0LnN1YihzLFNJTUQuRmxvYXQzMng0Lm11bChyLGwpKSxsPVNJTUQuRmxvYXQzMng0Lm11bChuLG8pLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLE09U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLE0pLGk9U0lNRC5GbG9hdDMyeDQuc3ViKGksU0lNRC5GbG9hdDMyeDQubXVsKHIsbCkpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLE09U0lNRC5GbG9hdDMyeDQuc3ViKE0sU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkpLGk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyLGwpLGkpLGM9U0lNRC5GbG9hdDMyeDQubXVsKG4sZSksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDIsMywwLDEpLGMpLGM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywxLDAsMywyKSxjKSxsPVNJTUQuRmxvYXQzMng0LnJlY2lwcm9jYWxBcHByb3hpbWF0aW9uKGMpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0LmFkZChsLGwpLFNJTUQuRmxvYXQzMng0Lm11bChjLFNJTUQuRmxvYXQzMng0Lm11bChsLGwpKSksKGM9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDAsMCwwLDApKT8oU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0Lm11bChjLGUpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQubXVsKGMsTSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxzKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixTSU1ELkZsb2F0MzJ4NC5tdWwoYyxpKSksdCk6bnVsbH0sby5pbnZlcnQ9ci5VU0VfU0lNRD9vLlNJTUQuaW52ZXJ0Om8uc2NhbGFyLmludmVydCxvLnNjYWxhci5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9YVs5XSxoPWFbMTBdLFM9YVsxMV0sST1hWzEyXSxmPWFbMTNdLHg9YVsxNF0sRD1hWzE1XTtyZXR1cm4gdFswXT1lKihoKkQtUyp4KS1jKihNKkQtcyp4KStmKihNKlMtcypoKSx0WzFdPS0ociooaCpELVMqeCktYyoobypELXUqeCkrZioobypTLXUqaCkpLHRbMl09ciooTSpELXMqeCktZSoobypELXUqeCkrZioobypzLXUqTSksdFszXT0tKHIqKE0qUy1zKmgpLWUqKG8qUy11KmgpK2MqKG8qcy11Kk0pKSx0WzRdPS0obCooaCpELVMqeCktaSooTSpELXMqeCkrSSooTSpTLXMqaCkpLHRbNV09biooaCpELVMqeCktaSoobypELXUqeCkrSSoobypTLXUqaCksdFs2XT0tKG4qKE0qRC1zKngpLWwqKG8qRC11KngpK0kqKG8qcy11Kk0pKSx0WzddPW4qKE0qUy1zKmgpLWwqKG8qUy11KmgpK2kqKG8qcy11Kk0pLHRbOF09bCooYypELVMqZiktaSooZSpELXMqZikrSSooZSpTLXMqYyksdFs5XT0tKG4qKGMqRC1TKmYpLWkqKHIqRC11KmYpK0kqKHIqUy11KmMpKSx0WzEwXT1uKihlKkQtcypmKS1sKihyKkQtdSpmKStJKihyKnMtdSplKSx0WzExXT0tKG4qKGUqUy1zKmMpLWwqKHIqUy11KmMpK2kqKHIqcy11KmUpKSx0WzEyXT0tKGwqKGMqeC1oKmYpLWkqKGUqeC1NKmYpK0kqKGUqaC1NKmMpKSx0WzEzXT1uKihjKngtaCpmKS1pKihyKngtbypmKStJKihyKmgtbypjKSx0WzE0XT0tKG4qKGUqeC1NKmYpLWwqKHIqeC1vKmYpK0kqKHIqTS1vKmUpKSx0WzE1XT1uKihlKmgtTSpjKS1sKihyKmgtbypjKStpKihyKk0tbyplKSx0fSxvLlNJTUQuYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuLHIsbyx1LGwsZSxNLHMsaSxjLGgsUyxJLG49U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKTtyZXR1cm4gaT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwwLDEsNCw1KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDAsMSw0LDUpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShpLGUsMCwyLDQsNiksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGUsaSwxLDMsNSw3KSxpPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDIsMyw2LDcpLHM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMiwzLDYsNyksTT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGkscywwLDIsNCw2KSxzPVNJTUQuRmxvYXQzMng0LnNodWZmbGUocyxpLDEsMyw1LDcpLGk9U0lNRC5GbG9hdDMyeDQubXVsKE0scyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksYz1TSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxoPVNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChlLGkpLGMpLGg9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGgpLGg9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShoLDIsMywwLDEpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGUsTSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksYyksST1TSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LnN1YihjLFNJTUQuRmxvYXQzMng0Lm11bChzLGkpKSxJPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxJKSxJPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoSSwyLDMsMCwxKSxpPVNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMiwzLDAsMSkscyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksTT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKE0sMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKE0saSksYyksUz1TSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LnN1YihjLFNJTUQuRmxvYXQzMng0Lm11bChNLGkpKSxTPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxTKSxTPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywyLDMsMCwxKSxpPVNJTUQuRmxvYXQzMng0Lm11bChsLGUpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLFM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLFMpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChNLGkpLEkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLFM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLFMpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKEksU0lNRC5GbG9hdDMyeDQubXVsKE0saSkpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGwscyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksaD1TSU1ELkZsb2F0MzJ4NC5zdWIoaCxTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSksUz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKGUsaSksUyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksaD1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKE0saSksaCksUz1TSU1ELkZsb2F0MzJ4NC5zdWIoUyxTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobCxNKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxoPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxoKSxJPVNJTUQuRmxvYXQzMng0LnN1YihJLFNJTUQuRmxvYXQzMng0Lm11bChlLGkpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxoPVNJTUQuRmxvYXQzMng0LnN1YihoLFNJTUQuRmxvYXQzMng0Lm11bChzLGkpKSxJPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxJKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsYyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LGgpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLEkpLHR9LG8uYWRqb2ludD1yLlVTRV9TSU1EP28uU0lNRC5hZGpvaW50Om8uc2NhbGFyLmFkam9pbnQsby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdLHU9dFs0XSxsPXRbNV0sZT10WzZdLE09dFs3XSxzPXRbOF0saT10WzldLGM9dFsxMF0saD10WzExXSxTPXRbMTJdLEk9dFsxM10sZj10WzE0XSx4PXRbMTVdLEQ9YSpsLW4qdSxGPWEqZS1yKnUsbT1hKk0tbyp1LGQ9biplLXIqbCxiPW4qTS1vKmwsdj1yKk0tbyplLHo9cypJLWkqUyxwPXMqZi1jKlMsdz1zKngtaCpTLEU9aSpmLWMqSSxBPWkqeC1oKkksUD1jKngtaCpmO3JldHVybiBEKlAtRipBK20qRStkKnctYipwK3Yqen0sby5TSU1ELm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpLGU9U0lNRC5GbG9hdDMyeDQubG9hZChuLDApLE09U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwzLDMsMywzKSxsKSkpKTtTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsTSk7dmFyIHM9U0lNRC5GbG9hdDMyeDQubG9hZChuLDQpLGk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywzLDMsMywzKSxsKSkpKTtTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsaSk7dmFyIGM9U0lNRC5GbG9hdDMyeDQubG9hZChuLDgpLGg9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywzLDMsMywzKSxsKSkpKTtTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsaCk7dmFyIFM9U0lNRC5GbG9hdDMyeDQubG9hZChuLDEyKSxJPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDAsMCwwLDApLHIpLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDEsMSwxLDEpLG8pLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDIsMiwyLDIpLHUpLFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMywzLDMsMyksbCkpKSk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsSSksdH0sby5zY2FsYXIubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPWFbOV0sUz1hWzEwXSxJPWFbMTFdLGY9YVsxMl0seD1hWzEzXSxEPWFbMTRdLEY9YVsxNV0sbT1uWzBdLGQ9blsxXSxiPW5bMl0sdj1uWzNdO3JldHVybiB0WzBdPW0qcitkKmUrYipjK3YqZix0WzFdPW0qbytkKk0rYipoK3YqeCx0WzJdPW0qdStkKnMrYipTK3YqRCx0WzNdPW0qbCtkKmkrYipJK3YqRixtPW5bNF0sZD1uWzVdLGI9bls2XSx2PW5bN10sdFs0XT1tKnIrZCplK2IqYyt2KmYsdFs1XT1tKm8rZCpNK2IqaCt2KngsdFs2XT1tKnUrZCpzK2IqUyt2KkQsdFs3XT1tKmwrZCppK2IqSSt2KkYsbT1uWzhdLGQ9bls5XSxiPW5bMTBdLHY9blsxMV0sdFs4XT1tKnIrZCplK2IqYyt2KmYsdFs5XT1tKm8rZCpNK2IqaCt2KngsdFsxMF09bSp1K2QqcytiKlMrdipELHRbMTFdPW0qbCtkKmkrYipJK3YqRixtPW5bMTJdLGQ9blsxM10sYj1uWzE0XSx2PW5bMTVdLHRbMTJdPW0qcitkKmUrYipjK3YqZix0WzEzXT1tKm8rZCpNK2IqaCt2KngsdFsxNF09bSp1K2QqcytiKlMrdipELHRbMTVdPW0qbCtkKmkrYipJK3YqRix0fSxvLm11bHRpcGx5PXIuVVNFX1NJTUQ/by5TSU1ELm11bHRpcGx5Om8uc2NhbGFyLm11bHRpcGx5LG8ubXVsPW8ubXVsdGlwbHksby5zY2FsYXIudHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcixvLHUsbCxlLE0scyxpLGMsaCxTLEksZj1uWzBdLHg9blsxXSxEPW5bMl07cmV0dXJuIGE9PT10Pyh0WzEyXT1hWzBdKmYrYVs0XSp4K2FbOF0qRCthWzEyXSx0WzEzXT1hWzFdKmYrYVs1XSp4K2FbOV0qRCthWzEzXSx0WzE0XT1hWzJdKmYrYVs2XSp4K2FbMTBdKkQrYVsxNF0sdFsxNV09YVszXSpmK2FbN10qeCthWzExXSpEK2FbMTVdKToocj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1hWzldLFM9YVsxMF0sST1hWzExXSx0WzBdPXIsdFsxXT1vLHRbMl09dSx0WzNdPWwsdFs0XT1lLHRbNV09TSx0WzZdPXMsdFs3XT1pLHRbOF09Yyx0WzldPWgsdFsxMF09Uyx0WzExXT1JLHRbMTJdPXIqZitlKngrYypEK2FbMTJdLHRbMTNdPW8qZitNKngraCpEK2FbMTNdLHRbMTRdPXUqZitzKngrUypEK2FbMTRdLHRbMTVdPWwqZitpKngrSSpEK2FbMTVdKSx0fSxvLlNJTUQudHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpLGU9U0lNRC5GbG9hdDMyeDQoblswXSxuWzFdLG5bMl0sMCk7YSE9PXQmJih0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0pLHI9U0lNRC5GbG9hdDMyeDQubXVsKHIsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDAsMCwwLDApKSxvPVNJTUQuRmxvYXQzMng0Lm11bChvLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwxLDEsMSwxKSksdT1TSU1ELkZsb2F0MzJ4NC5tdWwodSxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMiwyLDIsMikpO3ZhciBNPVNJTUQuRmxvYXQzMng0LmFkZChyLFNJTUQuRmxvYXQzMng0LmFkZChvLFNJTUQuRmxvYXQzMng0LmFkZCh1LGwpKSk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsTSksdH0sby50cmFuc2xhdGU9ci5VU0VfU0lNRD9vLlNJTUQudHJhbnNsYXRlOm8uc2NhbGFyLnRyYW5zbGF0ZSxvLnNjYWxhci5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9blswXSxvPW5bMV0sdT1uWzJdO3JldHVybiB0WzBdPWFbMF0qcix0WzFdPWFbMV0qcix0WzJdPWFbMl0qcix0WzNdPWFbM10qcix0WzRdPWFbNF0qbyx0WzVdPWFbNV0qbyx0WzZdPWFbNl0qbyx0WzddPWFbN10qbyx0WzhdPWFbOF0qdSx0WzldPWFbOV0qdSx0WzEwXT1hWzEwXSp1LHRbMTFdPWFbMTFdKnUsdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0sdH0sby5TSU1ELnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcixvLHUsbD1TSU1ELkZsb2F0MzJ4NChuWzBdLG5bMV0sblsyXSwwKTtyZXR1cm4gcj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0Lm11bChyLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwwLDAsMCwwKSkpLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5tdWwobyxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwxLDEsMSkpKSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQubXVsKHUsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMiwyLDIpKSksdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0sdH0sby5zY2FsZT1yLlVTRV9TSU1EP28uU0lNRC5zY2FsZTpvLnNjYWxhci5zY2FsZSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbixvKXt2YXIgdSxsLGUsTSxzLGksYyxoLFMsSSxmLHgsRCxGLG0sZCxiLHYseixwLHcsRSxBLFAsTD1vWzBdLHE9b1sxXSxSPW9bMl0sTj1NYXRoLnNxcnQoTCpMK3EqcStSKlIpO3JldHVybiBNYXRoLmFicyhOKTxyLkVQU0lMT04/bnVsbDooTj0xL04sTCo9TixxKj1OLFIqPU4sdT1NYXRoLnNpbihuKSxsPU1hdGguY29zKG4pLGU9MS1sLE09YVswXSxzPWFbMV0saT1hWzJdLGM9YVszXSxoPWFbNF0sUz1hWzVdLEk9YVs2XSxmPWFbN10seD1hWzhdLEQ9YVs5XSxGPWFbMTBdLG09YVsxMV0sZD1MKkwqZStsLGI9cSpMKmUrUip1LHY9UipMKmUtcSp1LHo9TCpxKmUtUip1LHA9cSpxKmUrbCx3PVIqcSplK0wqdSxFPUwqUiplK3EqdSxBPXEqUiplLUwqdSxQPVIqUiplK2wsdFswXT1NKmQraCpiK3gqdix0WzFdPXMqZCtTKmIrRCp2LHRbMl09aSpkK0kqYitGKnYsdFszXT1jKmQrZipiK20qdix0WzRdPU0qeitoKnAreCp3LHRbNV09cyp6K1MqcCtEKncsdFs2XT1pKnorSSpwK0Yqdyx0WzddPWMqeitmKnArbSp3LHRbOF09TSpFK2gqQSt4KlAsdFs5XT1zKkUrUypBK0QqUCx0WzEwXT1pKkUrSSpBK0YqUCx0WzExXT1jKkUrZipBK20qUCxhIT09dCYmKHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0KX0sby5zY2FsYXIucm90YXRlWD1mdW5jdGlvbih0LGEsbil7dmFyIHI9TWF0aC5zaW4obiksbz1NYXRoLmNvcyhuKSx1PWFbNF0sbD1hWzVdLGU9YVs2XSxNPWFbN10scz1hWzhdLGk9YVs5XSxjPWFbMTBdLGg9YVsxMV07cmV0dXJuIGEhPT10JiYodFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0WzRdPXUqbytzKnIsdFs1XT1sKm8raSpyLHRbNl09ZSpvK2Mqcix0WzddPU0qbytoKnIsdFs4XT1zKm8tdSpyLHRbOV09aSpvLWwqcix0WzEwXT1jKm8tZSpyLHRbMTFdPWgqby1NKnIsdH0sby5TSU1ELnJvdGF0ZVg9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKG4pKSxvPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKG4pKTthIT09dCYmKHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSk7dmFyIHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LG8pLFNJTUQuRmxvYXQzMng0Lm11bChsLHIpKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxyKSkpLHR9LG8ucm90YXRlWD1yLlVTRV9TSU1EP28uU0lNRC5yb3RhdGVYOm8uc2NhbGFyLnJvdGF0ZVgsby5zY2FsYXIucm90YXRlWT1mdW5jdGlvbih0LGEsbil7dmFyIHI9TWF0aC5zaW4obiksbz1NYXRoLmNvcyhuKSx1PWFbMF0sbD1hWzFdLGU9YVsyXSxNPWFbM10scz1hWzhdLGk9YVs5XSxjPWFbMTBdLGg9YVsxMV07cmV0dXJuIGEhPT10JiYodFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0WzBdPXUqby1zKnIsdFsxXT1sKm8taSpyLHRbMl09ZSpvLWMqcix0WzNdPU0qby1oKnIsdFs4XT11KnIrcypvLHRbOV09bCpyK2kqbyx0WzEwXT1lKnIrYypvLHRbMTFdPU0qcitoKm8sdH0sby5TSU1ELnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKG4pKSxvPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKG4pKTthIT09dCYmKHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSk7dmFyIHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bCh1LG8pLFNJTUQuRmxvYXQzMng0Lm11bChsLHIpKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxyKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxvKSkpLHR9LG8ucm90YXRlWT1yLlVTRV9TSU1EP28uU0lNRC5yb3RhdGVZOm8uc2NhbGFyLnJvdGF0ZVksby5zY2FsYXIucm90YXRlWj1mdW5jdGlvbih0LGEsbil7dmFyIHI9TWF0aC5zaW4obiksbz1NYXRoLmNvcyhuKSx1PWFbMF0sbD1hWzFdLGU9YVsyXSxNPWFbM10scz1hWzRdLGk9YVs1XSxjPWFbNl0saD1hWzddO3JldHVybiBhIT09dCYmKHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHRbMF09dSpvK3Mqcix0WzFdPWwqbytpKnIsdFsyXT1lKm8rYypyLHRbM109TSpvK2gqcix0WzRdPXMqby11KnIsdFs1XT1pKm8tbCpyLHRbNl09YypvLWUqcix0WzddPWgqby1NKnIsdH0sby5TSU1ELnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKG4pKSxvPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKG4pKTthIT09dCYmKHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pO3ZhciB1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxyKSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsbyksU0lNRC5GbG9hdDMyeDQubXVsKHUscikpKSx0fSxvLnJvdGF0ZVo9ci5VU0VfU0lNRD9vLlNJTUQucm90YXRlWjpvLnNjYWxhci5yb3RhdGVaLG8uZnJvbVRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09YVswXSx0WzEzXT1hWzFdLHRbMTRdPWFbMl0sdFsxNV09MSx0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT1hWzFdLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT1hWzJdLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEsbil7dmFyIG8sdSxsLGU9blswXSxNPW5bMV0scz1uWzJdLGk9TWF0aC5zcXJ0KGUqZStNKk0rcypzKTtyZXR1cm4gTWF0aC5hYnMoaSk8ci5FUFNJTE9OP251bGw6KGk9MS9pLGUqPWksTSo9aSxzKj1pLG89TWF0aC5zaW4oYSksdT1NYXRoLmNvcyhhKSxsPTEtdSx0WzBdPWUqZSpsK3UsdFsxXT1NKmUqbCtzKm8sdFsyXT1zKmUqbC1NKm8sdFszXT0wLHRbNF09ZSpNKmwtcypvLHRbNV09TSpNKmwrdSx0WzZdPXMqTSpsK2Uqbyx0WzddPTAsdFs4XT1lKnMqbCtNKm8sdFs5XT1NKnMqbC1lKm8sdFsxMF09cypzKmwrdSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdCl9LG8uZnJvbVhSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT1yLHRbNl09bix0WzddPTAsdFs4XT0wLHRbOV09LW4sdFsxMF09cix0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tWVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09MCx0WzJdPS1uLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT1uLHRbOV09MCx0WzEwXT1yLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21aUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09MCx0WzNdPTAsdFs0XT0tbix0WzVdPXIsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVJvdGF0aW9uVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1yK3IsTT1vK28scz11K3UsaT1yKmUsYz1yKk0saD1yKnMsUz1vKk0sST1vKnMsZj11KnMseD1sKmUsRD1sKk0sRj1sKnM7cmV0dXJuIHRbMF09MS0oUytmKSx0WzFdPWMrRix0WzJdPWgtRCx0WzNdPTAsdFs0XT1jLUYsdFs1XT0xLShpK2YpLHRbNl09SSt4LHRbN109MCx0WzhdPWgrRCx0WzldPUkteCx0WzEwXT0xLShpK1MpLHRbMTFdPTAsdFsxMl09blswXSx0WzEzXT1uWzFdLHRbMTRdPW5bMl0sdFsxNV09MSx0fSxvLmdldFRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVsxMl0sdFsxXT1hWzEzXSx0WzJdPWFbMTRdLHR9LG8uZ2V0Um90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdK2FbNV0rYVsxMF0scj0wO3JldHVybiBuPjA/KHI9MipNYXRoLnNxcnQobisxKSx0WzNdPS4yNSpyLHRbMF09KGFbNl0tYVs5XSkvcix0WzFdPShhWzhdLWFbMl0pL3IsdFsyXT0oYVsxXS1hWzRdKS9yKTphWzBdPmFbNV0mYVswXT5hWzEwXT8ocj0yKk1hdGguc3FydCgxK2FbMF0tYVs1XS1hWzEwXSksdFszXT0oYVs2XS1hWzldKS9yLHRbMF09LjI1KnIsdFsxXT0oYVsxXSthWzRdKS9yLHRbMl09KGFbOF0rYVsyXSkvcik6YVs1XT5hWzEwXT8ocj0yKk1hdGguc3FydCgxK2FbNV0tYVswXS1hWzEwXSksdFszXT0oYVs4XS1hWzJdKS9yLHRbMF09KGFbMV0rYVs0XSkvcix0WzFdPS4yNSpyLHRbMl09KGFbNl0rYVs5XSkvcik6KHI9MipNYXRoLnNxcnQoMSthWzEwXS1hWzBdLWFbNV0pLHRbM109KGFbMV0tYVs0XSkvcix0WzBdPShhWzhdK2FbMl0pL3IsdFsxXT0oYVs2XSthWzldKS9yLHRbMl09LjI1KnIpLHR9LG8uZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZT1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXSxsPWFbMl0sZT1hWzNdLE09bytvLHM9dSt1LGk9bCtsLGM9bypNLGg9bypzLFM9byppLEk9dSpzLGY9dSppLHg9bCppLEQ9ZSpNLEY9ZSpzLG09ZSppLGQ9clswXSxiPXJbMV0sdj1yWzJdO3JldHVybiB0WzBdPSgxLShJK3gpKSpkLHRbMV09KGgrbSkqZCx0WzJdPShTLUYpKmQsdFszXT0wLHRbNF09KGgtbSkqYix0WzVdPSgxLShjK3gpKSpiLHRbNl09KGYrRCkqYix0WzddPTAsdFs4XT0oUytGKSp2LHRbOV09KGYtRCkqdix0WzEwXT0oMS0oYytJKSkqdix0WzExXT0wLHRbMTJdPW5bMF0sdFsxM109blsxXSx0WzE0XT1uWzJdLHRbMTVdPTEsdH0sby5mcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlT3JpZ2luPWZ1bmN0aW9uKHQsYSxuLHIsbyl7XHJcbiAgICB2YXIgdT1hWzBdLGw9YVsxXSxlPWFbMl0sTT1hWzNdLHM9dSt1LGk9bCtsLGM9ZStlLGg9dSpzLFM9dSppLEk9dSpjLGY9bCppLHg9bCpjLEQ9ZSpjLEY9TSpzLG09TSppLGQ9TSpjLGI9clswXSx2PXJbMV0sej1yWzJdLHA9b1swXSx3PW9bMV0sRT1vWzJdO3JldHVybiB0WzBdPSgxLShmK0QpKSpiLHRbMV09KFMrZCkqYix0WzJdPShJLW0pKmIsdFszXT0wLHRbNF09KFMtZCkqdix0WzVdPSgxLShoK0QpKSp2LHRbNl09KHgrRikqdix0WzddPTAsdFs4XT0oSSttKSp6LHRbOV09KHgtRikqeix0WzEwXT0oMS0oaCtmKSkqeix0WzExXT0wLHRbMTJdPW5bMF0rcC0odFswXSpwK3RbNF0qdyt0WzhdKkUpLHRbMTNdPW5bMV0rdy0odFsxXSpwK3RbNV0qdyt0WzldKkUpLHRbMTRdPW5bMl0rRS0odFsyXSpwK3RbNl0qdyt0WzEwXSpFKSx0WzE1XT0xLHR9LG8uZnJvbVF1YXQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bituLGU9cityLE09bytvLHM9bipsLGk9cipsLGM9ciplLGg9bypsLFM9byplLEk9bypNLGY9dSpsLHg9dSplLEQ9dSpNO3JldHVybiB0WzBdPTEtYy1JLHRbMV09aStELHRbMl09aC14LHRbM109MCx0WzRdPWktRCx0WzVdPTEtcy1JLHRbNl09UytmLHRbN109MCx0WzhdPWgreCx0WzldPVMtZix0WzEwXT0xLXMtYyx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcnVzdHVtPWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwpe3ZhciBlPTEvKG4tYSksTT0xLyhvLXIpLHM9MS8odS1sKTtyZXR1cm4gdFswXT0yKnUqZSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0yKnUqTSx0WzZdPTAsdFs3XT0wLHRbOF09KG4rYSkqZSx0WzldPShvK3IpKk0sdFsxMF09KGwrdSkqcyx0WzExXT0tMSx0WzEyXT0wLHRbMTNdPTAsdFsxNF09bCp1KjIqcyx0WzE1XT0wLHR9LG8ucGVyc3BlY3RpdmU9ZnVuY3Rpb24odCxhLG4scixvKXt2YXIgdT0xL01hdGgudGFuKGEvMiksbD0xLyhyLW8pO3JldHVybiB0WzBdPXUvbix0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT11LHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0obytyKSpsLHRbMTFdPS0xLHRbMTJdPTAsdFsxM109MCx0WzE0XT0yKm8qcipsLHRbMTVdPTAsdH0sby5wZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldz1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1NYXRoLnRhbihhLnVwRGVncmVlcypNYXRoLlBJLzE4MCksdT1NYXRoLnRhbihhLmRvd25EZWdyZWVzKk1hdGguUEkvMTgwKSxsPU1hdGgudGFuKGEubGVmdERlZ3JlZXMqTWF0aC5QSS8xODApLGU9TWF0aC50YW4oYS5yaWdodERlZ3JlZXMqTWF0aC5QSS8xODApLE09Mi8obCtlKSxzPTIvKG8rdSk7cmV0dXJuIHRbMF09TSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT1zLHRbNl09MCx0WzddPTAsdFs4XT0tKChsLWUpKk0qLjUpLHRbOV09KG8tdSkqcyouNSx0WzEwXT1yLyhuLXIpLHRbMTFdPS0xLHRbMTJdPTAsdFsxM109MCx0WzE0XT1yKm4vKG4tciksdFsxNV09MCx0fSxvLm9ydGhvPWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwpe3ZhciBlPTEvKGEtbiksTT0xLyhyLW8pLHM9MS8odS1sKTtyZXR1cm4gdFswXT0tMiplLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPS0yKk0sdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTIqcyx0WzExXT0wLHRbMTJdPShhK24pKmUsdFsxM109KG8rcikqTSx0WzE0XT0obCt1KSpzLHRbMTVdPTEsdH0sby5sb29rQXQ9ZnVuY3Rpb24odCxhLG4sdSl7dmFyIGwsZSxNLHMsaSxjLGgsUyxJLGYseD1hWzBdLEQ9YVsxXSxGPWFbMl0sbT11WzBdLGQ9dVsxXSxiPXVbMl0sdj1uWzBdLHo9blsxXSxwPW5bMl07cmV0dXJuIE1hdGguYWJzKHgtdik8ci5FUFNJTE9OJiZNYXRoLmFicyhELXopPHIuRVBTSUxPTiYmTWF0aC5hYnMoRi1wKTxyLkVQU0lMT04/by5pZGVudGl0eSh0KTooaD14LXYsUz1ELXosST1GLXAsZj0xL01hdGguc3FydChoKmgrUypTK0kqSSksaCo9ZixTKj1mLEkqPWYsbD1kKkktYipTLGU9YipoLW0qSSxNPW0qUy1kKmgsZj1NYXRoLnNxcnQobCpsK2UqZStNKk0pLGY/KGY9MS9mLGwqPWYsZSo9ZixNKj1mKToobD0wLGU9MCxNPTApLHM9UypNLUkqZSxpPUkqbC1oKk0sYz1oKmUtUypsLGY9TWF0aC5zcXJ0KHMqcytpKmkrYypjKSxmPyhmPTEvZixzKj1mLGkqPWYsYyo9Zik6KHM9MCxpPTAsYz0wKSx0WzBdPWwsdFsxXT1zLHRbMl09aCx0WzNdPTAsdFs0XT1lLHRbNV09aSx0WzZdPVMsdFs3XT0wLHRbOF09TSx0WzldPWMsdFsxMF09SSx0WzExXT0wLHRbMTJdPS0obCp4K2UqRCtNKkYpLHRbMTNdPS0ocyp4K2kqRCtjKkYpLHRbMTRdPS0oaCp4K1MqRCtJKkYpLHRbMTVdPTEsdCl9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0NChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiLCBcIit0WzRdK1wiLCBcIit0WzVdK1wiLCBcIit0WzZdK1wiLCBcIit0WzddK1wiLCBcIit0WzhdK1wiLCBcIit0WzldK1wiLCBcIit0WzEwXStcIiwgXCIrdFsxMV0rXCIsIFwiK3RbMTJdK1wiLCBcIit0WzEzXStcIiwgXCIrdFsxNF0rXCIsIFwiK3RbMTVdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpK01hdGgucG93KHRbNF0sMikrTWF0aC5wb3codFs1XSwyKStNYXRoLnBvdyh0WzZdLDIpK01hdGgucG93KHRbN10sMikrTWF0aC5wb3codFs4XSwyKStNYXRoLnBvdyh0WzldLDIpK01hdGgucG93KHRbMTBdLDIpK01hdGgucG93KHRbMTFdLDIpK01hdGgucG93KHRbMTJdLDIpK01hdGgucG93KHRbMTNdLDIpK01hdGgucG93KHRbMTRdLDIpK01hdGgucG93KHRbMTVdLDIpKX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0WzRdPWFbNF0rbls0XSx0WzVdPWFbNV0rbls1XSx0WzZdPWFbNl0rbls2XSx0WzddPWFbN10rbls3XSx0WzhdPWFbOF0rbls4XSx0WzldPWFbOV0rbls5XSx0WzEwXT1hWzEwXStuWzEwXSx0WzExXT1hWzExXStuWzExXSx0WzEyXT1hWzEyXStuWzEyXSx0WzEzXT1hWzEzXStuWzEzXSx0WzE0XT1hWzE0XStuWzE0XSx0WzE1XT1hWzE1XStuWzE1XSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdFs0XT1hWzRdLW5bNF0sdFs1XT1hWzVdLW5bNV0sdFs2XT1hWzZdLW5bNl0sdFs3XT1hWzddLW5bN10sdFs4XT1hWzhdLW5bOF0sdFs5XT1hWzldLW5bOV0sdFsxMF09YVsxMF0tblsxMF0sdFsxMV09YVsxMV0tblsxMV0sdFsxMl09YVsxMl0tblsxMl0sdFsxM109YVsxM10tblsxM10sdFsxNF09YVsxNF0tblsxNF0sdFsxNV09YVsxNV0tblsxNV0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdFs0XT1hWzRdKm4sdFs1XT1hWzVdKm4sdFs2XT1hWzZdKm4sdFs3XT1hWzddKm4sdFs4XT1hWzhdKm4sdFs5XT1hWzldKm4sdFsxMF09YVsxMF0qbix0WzExXT1hWzExXSpuLHRbMTJdPWFbMTJdKm4sdFsxM109YVsxM10qbix0WzE0XT1hWzE0XSpuLHRbMTVdPWFbMTVdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0WzRdPWFbNF0rbls0XSpyLHRbNV09YVs1XStuWzVdKnIsdFs2XT1hWzZdK25bNl0qcix0WzddPWFbN10rbls3XSpyLHRbOF09YVs4XStuWzhdKnIsdFs5XT1hWzldK25bOV0qcix0WzEwXT1hWzEwXStuWzEwXSpyLHRbMTFdPWFbMTFdK25bMTFdKnIsdFsxMl09YVsxMl0rblsxMl0qcix0WzEzXT1hWzEzXStuWzEzXSpyLHRbMTRdPWFbMTRdK25bMTRdKnIsdFsxNV09YVsxNV0rblsxNV0qcix0fSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdJiZ0WzRdPT09YVs0XSYmdFs1XT09PWFbNV0mJnRbNl09PT1hWzZdJiZ0WzddPT09YVs3XSYmdFs4XT09PWFbOF0mJnRbOV09PT1hWzldJiZ0WzEwXT09PWFbMTBdJiZ0WzExXT09PWFbMTFdJiZ0WzEyXT09PWFbMTJdJiZ0WzEzXT09PWFbMTNdJiZ0WzE0XT09PWFbMTRdJiZ0WzE1XT09PWFbMTVdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT10WzRdLE09dFs1XSxzPXRbNl0saT10WzddLGM9dFs4XSxoPXRbOV0sUz10WzEwXSxJPXRbMTFdLGY9dFsxMl0seD10WzEzXSxEPXRbMTRdLEY9dFsxNV0sbT1hWzBdLGQ9YVsxXSxiPWFbMl0sdj1hWzNdLHo9YVs0XSxwPWFbNV0sdz1hWzZdLEU9YVs3XSxBPWFbOF0sUD1hWzldLEw9YVsxMF0scT1hWzExXSxSPWFbMTJdLE49YVsxM10sTz1hWzE0XSxZPWFbMTVdO3JldHVybiBNYXRoLmFicyhuLW0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhtKSkmJk1hdGguYWJzKG8tZCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGQpKSYmTWF0aC5hYnModS1iKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoYikpJiZNYXRoLmFicyhsLXYpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyh2KSkmJk1hdGguYWJzKGUteik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGUpLE1hdGguYWJzKHopKSYmTWF0aC5hYnMoTS1wKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoTSksTWF0aC5hYnMocCkpJiZNYXRoLmFicyhzLXcpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhzKSxNYXRoLmFicyh3KSkmJk1hdGguYWJzKGktRSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGkpLE1hdGguYWJzKEUpKSYmTWF0aC5hYnMoYy1BKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoYyksTWF0aC5hYnMoQSkpJiZNYXRoLmFicyhoLVApPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhoKSxNYXRoLmFicyhQKSkmJk1hdGguYWJzKFMtTCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKFMpLE1hdGguYWJzKEwpKSYmTWF0aC5hYnMoSS1xKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoSSksTWF0aC5hYnMocSkpJiZNYXRoLmFicyhmLVIpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhmKSxNYXRoLmFicyhSKSkmJk1hdGguYWJzKHgtTik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHgpLE1hdGguYWJzKE4pKSYmTWF0aC5hYnMoRC1PKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoRCksTWF0aC5hYnMoTykpJiZNYXRoLmFicyhGLVkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhGKSxNYXRoLmFicyhZKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPW4oNCksdT1uKDcpLGw9big4KSxlPXt9O2UuY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LGUucm90YXRpb25Ubz1mdW5jdGlvbigpe3ZhciB0PXUuY3JlYXRlKCksYT11LmZyb21WYWx1ZXMoMSwwLDApLG49dS5mcm9tVmFsdWVzKDAsMSwwKTtyZXR1cm4gZnVuY3Rpb24ocixvLGwpe3ZhciBNPXUuZG90KG8sbCk7cmV0dXJuLS45OTk5OTk+TT8odS5jcm9zcyh0LGEsbyksdS5sZW5ndGgodCk8MWUtNiYmdS5jcm9zcyh0LG4sbyksdS5ub3JtYWxpemUodCx0KSxlLnNldEF4aXNBbmdsZShyLHQsTWF0aC5QSSkscik6TT4uOTk5OTk5PyhyWzBdPTAsclsxXT0wLHJbMl09MCxyWzNdPTEscik6KHUuY3Jvc3ModCxvLGwpLHJbMF09dFswXSxyWzFdPXRbMV0sclsyXT10WzJdLHJbM109MStNLGUubm9ybWFsaXplKHIscikpfX0oKSxlLnNldEF4ZXM9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvKXtyZXR1cm4gdFswXT1yWzBdLHRbM109clsxXSx0WzZdPXJbMl0sdFsxXT1vWzBdLHRbNF09b1sxXSx0WzddPW9bMl0sdFsyXT0tblswXSx0WzVdPS1uWzFdLHRbOF09LW5bMl0sZS5ub3JtYWxpemUoYSxlLmZyb21NYXQzKGEsdCkpfX0oKSxlLmNsb25lPWwuY2xvbmUsZS5mcm9tVmFsdWVzPWwuZnJvbVZhbHVlcyxlLmNvcHk9bC5jb3B5LGUuc2V0PWwuc2V0LGUuaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxlLnNldEF4aXNBbmdsZT1mdW5jdGlvbih0LGEsbil7bj0uNSpuO3ZhciByPU1hdGguc2luKG4pO3JldHVybiB0WzBdPXIqYVswXSx0WzFdPXIqYVsxXSx0WzJdPXIqYVsyXSx0WzNdPU1hdGguY29zKG4pLHR9LGUuZ2V0QXhpc0FuZ2xlPWZ1bmN0aW9uKHQsYSl7dmFyIG49MipNYXRoLmFjb3MoYVszXSkscj1NYXRoLnNpbihuLzIpO3JldHVybiAwIT1yPyh0WzBdPWFbMF0vcix0WzFdPWFbMV0vcix0WzJdPWFbMl0vcik6KHRbMF09MSx0WzFdPTAsdFsyXT0wKSxufSxlLmFkZD1sLmFkZCxlLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9blswXSxNPW5bMV0scz1uWzJdLGk9blszXTtyZXR1cm4gdFswXT1yKmkrbCplK28qcy11Kk0sdFsxXT1vKmkrbCpNK3UqZS1yKnMsdFsyXT11KmkrbCpzK3IqTS1vKmUsdFszXT1sKmktciplLW8qTS11KnMsdH0sZS5tdWw9ZS5tdWx0aXBseSxlLnNjYWxlPWwuc2NhbGUsZS5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuKXtuKj0uNTt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0rbCplLHRbMV09bypNK3UqZSx0WzJdPXUqTS1vKmUsdFszXT1sKk0tciplLHR9LGUucm90YXRlWT1mdW5jdGlvbih0LGEsbil7bio9LjU7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNLXUqZSx0WzFdPW8qTStsKmUsdFsyXT11Kk0rciplLHRbM109bCpNLW8qZSx0fSxlLnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4pe24qPS41O3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTStvKmUsdFsxXT1vKk0tciplLHRbMl09dSpNK2wqZSx0WzNdPWwqTS11KmUsdH0sZS5jYWxjdWxhdGVXPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdO3JldHVybiB0WzBdPW4sdFsxXT1yLHRbMl09byx0WzNdPU1hdGguc3FydChNYXRoLmFicygxLW4qbi1yKnItbypvKSksdH0sZS5kb3Q9bC5kb3QsZS5sZXJwPWwubGVycCxlLnNsZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvLHUsbCxlLE0scz1hWzBdLGk9YVsxXSxjPWFbMl0saD1hWzNdLFM9blswXSxJPW5bMV0sZj1uWzJdLHg9blszXTtyZXR1cm4gdT1zKlMraSpJK2MqZitoKngsMD51JiYodT0tdSxTPS1TLEk9LUksZj0tZix4PS14KSwxLXU+MWUtNj8obz1NYXRoLmFjb3ModSksbD1NYXRoLnNpbihvKSxlPU1hdGguc2luKCgxLXIpKm8pL2wsTT1NYXRoLnNpbihyKm8pL2wpOihlPTEtcixNPXIpLHRbMF09ZSpzK00qUyx0WzFdPWUqaStNKkksdFsyXT1lKmMrTSpmLHRbM109ZSpoK00qeCx0fSxlLnNxbGVycD1mdW5jdGlvbigpe3ZhciB0PWUuY3JlYXRlKCksYT1lLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihuLHIsbyx1LGwsTSl7cmV0dXJuIGUuc2xlcnAodCxyLGwsTSksZS5zbGVycChhLG8sdSxNKSxlLnNsZXJwKG4sdCxhLDIqTSooMS1NKSksbn19KCksZS5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bipuK3IqcitvKm8rdSp1LGU9bD8xL2w6MDtyZXR1cm4gdFswXT0tbiplLHRbMV09LXIqZSx0WzJdPS1vKmUsdFszXT11KmUsdH0sZS5jb25qdWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdFszXT1hWzNdLHR9LGUubGVuZ3RoPWwubGVuZ3RoLGUubGVuPWUubGVuZ3RoLGUuc3F1YXJlZExlbmd0aD1sLnNxdWFyZWRMZW5ndGgsZS5zcXJMZW49ZS5zcXVhcmVkTGVuZ3RoLGUubm9ybWFsaXplPWwubm9ybWFsaXplLGUuZnJvbU1hdDM9ZnVuY3Rpb24odCxhKXt2YXIgbixyPWFbMF0rYVs0XSthWzhdO2lmKHI+MCluPU1hdGguc3FydChyKzEpLHRbM109LjUqbixuPS41L24sdFswXT0oYVs1XS1hWzddKSpuLHRbMV09KGFbNl0tYVsyXSkqbix0WzJdPShhWzFdLWFbM10pKm47ZWxzZXt2YXIgbz0wO2FbNF0+YVswXSYmKG89MSksYVs4XT5hWzMqbytvXSYmKG89Mik7dmFyIHU9KG8rMSklMyxsPShvKzIpJTM7bj1NYXRoLnNxcnQoYVszKm8rb10tYVszKnUrdV0tYVszKmwrbF0rMSksdFtvXT0uNSpuLG49LjUvbix0WzNdPShhWzMqdStsXS1hWzMqbCt1XSkqbix0W3VdPShhWzMqdStvXSthWzMqbyt1XSkqbix0W2xdPShhWzMqbCtvXSthWzMqbytsXSkqbn1yZXR1cm4gdH0sZS5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJxdWF0KFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIpXCJ9LGUuZXhhY3RFcXVhbHM9bC5leGFjdEVxdWFscyxlLmVxdWFscz1sLmVxdWFscyx0LmV4cG9ydHM9ZX0sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoMyk7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSgzKTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYX0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgbz1uZXcgci5BUlJBWV9UWVBFKDMpO3JldHVybiBvWzBdPXQsb1sxXT1hLG9bMl09bixvfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHR9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuWzBdLHRbMV09YVsxXSpuWzFdLHRbMl09YVsyXSpuWzJdLHR9LG8ubXVsPW8ubXVsdGlwbHksby5kaXZpZGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0vblswXSx0WzFdPWFbMV0vblsxXSx0WzJdPWFbMl0vblsyXSx0fSxvLmRpdj1vLmRpdmlkZSxvLmNlaWw9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmNlaWwoYVswXSksdFsxXT1NYXRoLmNlaWwoYVsxXSksdFsyXT1NYXRoLmNlaWwoYVsyXSksdH0sby5mbG9vcj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguZmxvb3IoYVswXSksdFsxXT1NYXRoLmZsb29yKGFbMV0pLHRbMl09TWF0aC5mbG9vcihhWzJdKSx0fSxvLm1pbj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5taW4oYVswXSxuWzBdKSx0WzFdPU1hdGgubWluKGFbMV0sblsxXSksdFsyXT1NYXRoLm1pbihhWzJdLG5bMl0pLHR9LG8ubWF4PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1heChhWzBdLG5bMF0pLHRbMV09TWF0aC5tYXgoYVsxXSxuWzFdKSx0WzJdPU1hdGgubWF4KGFbMl0sblsyXSksdH0sby5yb3VuZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGgucm91bmQoYVswXSksdFsxXT1NYXRoLnJvdW5kKGFbMV0pLHRbMl09TWF0aC5yb3VuZChhWzJdKSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdH0sby5zY2FsZUFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdH0sby5kaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXTtyZXR1cm4gTWF0aC5zcXJ0KG4qbityKnIrbypvKX0sby5kaXN0PW8uZGlzdGFuY2Usby5zcXVhcmVkRGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl07cmV0dXJuIG4qbityKnIrbypvfSxvLnNxckRpc3Q9by5zcXVhcmVkRGlzdGFuY2Usby5sZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdO3JldHVybiBNYXRoLnNxcnQoYSphK24qbityKnIpfSxvLmxlbj1vLmxlbmd0aCxvLnNxdWFyZWRMZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdO3JldHVybiBhKmErbipuK3Iqcn0sby5zcXJMZW49by5zcXVhcmVkTGVuZ3RoLG8ubmVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHR9LG8uaW52ZXJzZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEvYVswXSx0WzFdPTEvYVsxXSx0WzJdPTEvYVsyXSx0fSxvLm5vcm1hbGl6ZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PW4qbityKnIrbypvO3JldHVybiB1PjAmJih1PTEvTWF0aC5zcXJ0KHUpLHRbMF09YVswXSp1LHRbMV09YVsxXSp1LHRbMl09YVsyXSp1KSx0fSxvLmRvdD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdKmFbMF0rdFsxXSphWzFdK3RbMl0qYVsyXX0sby5jcm9zcz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blswXSxlPW5bMV0sTT1uWzJdO3JldHVybiB0WzBdPW8qTS11KmUsdFsxXT11KmwtcipNLHRbMl09ciplLW8qbCx0fSxvLmxlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV0sbD1hWzJdO3JldHVybiB0WzBdPW8rciooblswXS1vKSx0WzFdPXUrciooblsxXS11KSx0WzJdPWwrciooblsyXS1sKSx0fSxvLmhlcm1pdGU9ZnVuY3Rpb24odCxhLG4scixvLHUpe3ZhciBsPXUqdSxlPWwqKDIqdS0zKSsxLE09bCoodS0yKSt1LHM9bCoodS0xKSxpPWwqKDMtMip1KTtyZXR1cm4gdFswXT1hWzBdKmUrblswXSpNK3JbMF0qcytvWzBdKmksdFsxXT1hWzFdKmUrblsxXSpNK3JbMV0qcytvWzFdKmksdFsyXT1hWzJdKmUrblsyXSpNK3JbMl0qcytvWzJdKmksdH0sby5iZXppZXI9ZnVuY3Rpb24odCxhLG4scixvLHUpe3ZhciBsPTEtdSxlPWwqbCxNPXUqdSxzPWUqbCxpPTMqdSplLGM9MypNKmwsaD1NKnU7cmV0dXJuIHRbMF09YVswXSpzK25bMF0qaStyWzBdKmMrb1swXSpoLHRbMV09YVsxXSpzK25bMV0qaStyWzFdKmMrb1sxXSpoLHRbMl09YVsyXSpzK25bMl0qaStyWzJdKmMrb1syXSpoLHR9LG8ucmFuZG9tPWZ1bmN0aW9uKHQsYSl7YT1hfHwxO3ZhciBuPTIqci5SQU5ET00oKSpNYXRoLlBJLG89MipyLlJBTkRPTSgpLTEsdT1NYXRoLnNxcnQoMS1vKm8pKmE7cmV0dXJuIHRbMF09TWF0aC5jb3MobikqdSx0WzFdPU1hdGguc2luKG4pKnUsdFsyXT1vKmEsdH0sby50cmFuc2Zvcm1NYXQ0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1uWzNdKnIrbls3XSpvK25bMTFdKnUrblsxNV07cmV0dXJuIGw9bHx8MSx0WzBdPShuWzBdKnIrbls0XSpvK25bOF0qdStuWzEyXSkvbCx0WzFdPShuWzFdKnIrbls1XSpvK25bOV0qdStuWzEzXSkvbCx0WzJdPShuWzJdKnIrbls2XSpvK25bMTBdKnUrblsxNF0pL2wsdH0sby50cmFuc2Zvcm1NYXQzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl07cmV0dXJuIHRbMF09cipuWzBdK28qblszXSt1Km5bNl0sdFsxXT1yKm5bMV0rbypuWzRdK3Uqbls3XSx0WzJdPXIqblsyXStvKm5bNV0rdSpuWzhdLHR9LG8udHJhbnNmb3JtUXVhdD1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blswXSxlPW5bMV0sTT1uWzJdLHM9blszXSxpPXMqcitlKnUtTSpvLGM9cypvK00qci1sKnUsaD1zKnUrbCpvLWUqcixTPS1sKnItZSpvLU0qdTtyZXR1cm4gdFswXT1pKnMrUyotbCtjKi1NLWgqLWUsdFsxXT1jKnMrUyotZStoKi1sLWkqLU0sdFsyXT1oKnMrUyotTStpKi1lLWMqLWwsdH0sby5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPVtdLHU9W107cmV0dXJuIG9bMF09YVswXS1uWzBdLG9bMV09YVsxXS1uWzFdLG9bMl09YVsyXS1uWzJdLHVbMF09b1swXSx1WzFdPW9bMV0qTWF0aC5jb3Mociktb1syXSpNYXRoLnNpbihyKSx1WzJdPW9bMV0qTWF0aC5zaW4ocikrb1syXSpNYXRoLmNvcyhyKSx0WzBdPXVbMF0rblswXSx0WzFdPXVbMV0rblsxXSx0WzJdPXVbMl0rblsyXSx0fSxvLnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89W10sdT1bXTtyZXR1cm4gb1swXT1hWzBdLW5bMF0sb1sxXT1hWzFdLW5bMV0sb1syXT1hWzJdLW5bMl0sdVswXT1vWzJdKk1hdGguc2luKHIpK29bMF0qTWF0aC5jb3MociksdVsxXT1vWzFdLHVbMl09b1syXSpNYXRoLmNvcyhyKS1vWzBdKk1hdGguc2luKHIpLHRbMF09dVswXStuWzBdLHRbMV09dVsxXStuWzFdLHRbMl09dVsyXStuWzJdLHR9LG8ucm90YXRlWj1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1bXSx1PVtdO3JldHVybiBvWzBdPWFbMF0tblswXSxvWzFdPWFbMV0tblsxXSxvWzJdPWFbMl0tblsyXSx1WzBdPW9bMF0qTWF0aC5jb3Mociktb1sxXSpNYXRoLnNpbihyKSx1WzFdPW9bMF0qTWF0aC5zaW4ocikrb1sxXSpNYXRoLmNvcyhyKSx1WzJdPW9bMl0sdFswXT11WzBdK25bMF0sdFsxXT11WzFdK25bMV0sdFsyXT11WzJdK25bMl0sdH0sby5mb3JFYWNoPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyx1LGwpe3ZhciBlLE07Zm9yKG58fChuPTMpLHJ8fChyPTApLE09bz9NYXRoLm1pbihvKm4rcixhLmxlbmd0aCk6YS5sZW5ndGgsZT1yO00+ZTtlKz1uKXRbMF09YVtlXSx0WzFdPWFbZSsxXSx0WzJdPWFbZSsyXSx1KHQsdCxsKSxhW2VdPXRbMF0sYVtlKzFdPXRbMV0sYVtlKzJdPXRbMl07cmV0dXJuIGF9fSgpLG8uYW5nbGU9ZnVuY3Rpb24odCxhKXt2YXIgbj1vLmZyb21WYWx1ZXModFswXSx0WzFdLHRbMl0pLHI9by5mcm9tVmFsdWVzKGFbMF0sYVsxXSxhWzJdKTtvLm5vcm1hbGl6ZShuLG4pLG8ubm9ybWFsaXplKHIscik7dmFyIHU9by5kb3QobixyKTtyZXR1cm4gdT4xPzA6TWF0aC5hY29zKHUpfSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInZlYzMoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIilcIn0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPWFbMF0sZT1hWzFdLE09YVsyXTtyZXR1cm4gTWF0aC5hYnMobi1sKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMobCkpJiZNYXRoLmFicyhvLWUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhlKSkmJk1hdGguYWJzKHUtTSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKE0pKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0WzNdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYX0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8pe3ZhciB1PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHVbMF09dCx1WzFdPWEsdVsyXT1uLHVbM109byx1fSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHR9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0fSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qblswXSx0WzFdPWFbMV0qblsxXSx0WzJdPWFbMl0qblsyXSx0WzNdPWFbM10qblszXSx0fSxvLm11bD1vLm11bHRpcGx5LG8uZGl2aWRlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdL25bMF0sdFsxXT1hWzFdL25bMV0sdFsyXT1hWzJdL25bMl0sdFszXT1hWzNdL25bM10sdH0sby5kaXY9by5kaXZpZGUsby5jZWlsPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5jZWlsKGFbMF0pLHRbMV09TWF0aC5jZWlsKGFbMV0pLHRbMl09TWF0aC5jZWlsKGFbMl0pLHRbM109TWF0aC5jZWlsKGFbM10pLHR9LG8uZmxvb3I9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmZsb29yKGFbMF0pLHRbMV09TWF0aC5mbG9vcihhWzFdKSx0WzJdPU1hdGguZmxvb3IoYVsyXSksdFszXT1NYXRoLmZsb29yKGFbM10pLHR9LG8ubWluPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1pbihhWzBdLG5bMF0pLHRbMV09TWF0aC5taW4oYVsxXSxuWzFdKSx0WzJdPU1hdGgubWluKGFbMl0sblsyXSksdFszXT1NYXRoLm1pbihhWzNdLG5bM10pLHR9LG8ubWF4PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1heChhWzBdLG5bMF0pLHRbMV09TWF0aC5tYXgoYVsxXSxuWzFdKSx0WzJdPU1hdGgubWF4KGFbMl0sblsyXSksdFszXT1NYXRoLm1heChhWzNdLG5bM10pLHR9LG8ucm91bmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLnJvdW5kKGFbMF0pLHRbMV09TWF0aC5yb3VuZChhWzFdKSx0WzJdPU1hdGgucm91bmQoYVsyXSksdFszXT1NYXRoLnJvdW5kKGFbM10pLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0fSxvLnNjYWxlQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHR9LG8uZGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl0sdT1hWzNdLXRbM107cmV0dXJuIE1hdGguc3FydChuKm4rcipyK28qbyt1KnUpfSxvLmRpc3Q9by5kaXN0YW5jZSxvLnNxdWFyZWREaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXSx1PWFbM10tdFszXTtyZXR1cm4gbipuK3IqcitvKm8rdSp1fSxvLnNxckRpc3Q9by5zcXVhcmVkRGlzdGFuY2Usby5sZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXTtyZXR1cm4gTWF0aC5zcXJ0KGEqYStuKm4rcipyK28qbyl9LG8ubGVuPW8ubGVuZ3RoLG8uc3F1YXJlZExlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdO3JldHVybiBhKmErbipuK3IqcitvKm99LG8uc3FyTGVuPW8uc3F1YXJlZExlbmd0aCxvLm5lZ2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0WzNdPS1hWzNdLHR9LG8uaW52ZXJzZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEvYVswXSx0WzFdPTEvYVsxXSx0WzJdPTEvYVsyXSx0WzNdPTEvYVszXSx0fSxvLm5vcm1hbGl6ZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uKm4rcipyK28qbyt1KnU7cmV0dXJuIGw+MCYmKGw9MS9NYXRoLnNxcnQobCksdFswXT1uKmwsdFsxXT1yKmwsdFsyXT1vKmwsdFszXT11KmwpLHR9LG8uZG90PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF0qYVswXSt0WzFdKmFbMV0rdFsyXSphWzJdK3RbM10qYVszXX0sby5sZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdLGw9YVsyXSxlPWFbM107cmV0dXJuIHRbMF09bytyKihuWzBdLW8pLHRbMV09dStyKihuWzFdLXUpLHRbMl09bCtyKihuWzJdLWwpLHRbM109ZStyKihuWzNdLWUpLHR9LG8ucmFuZG9tPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIGE9YXx8MSx0WzBdPXIuUkFORE9NKCksdFsxXT1yLlJBTkRPTSgpLHRbMl09ci5SQU5ET00oKSx0WzNdPXIuUkFORE9NKCksby5ub3JtYWxpemUodCx0KSxvLnNjYWxlKHQsdCxhKSx0fSxvLnRyYW5zZm9ybU1hdDQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM107cmV0dXJuIHRbMF09blswXSpyK25bNF0qbytuWzhdKnUrblsxMl0qbCx0WzFdPW5bMV0qcituWzVdKm8rbls5XSp1K25bMTNdKmwsdFsyXT1uWzJdKnIrbls2XSpvK25bMTBdKnUrblsxNF0qbCx0WzNdPW5bM10qcituWzddKm8rblsxMV0qdStuWzE1XSpsLHR9LG8udHJhbnNmb3JtUXVhdD1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blswXSxlPW5bMV0sTT1uWzJdLHM9blszXSxpPXMqcitlKnUtTSpvLGM9cypvK00qci1sKnUsaD1zKnUrbCpvLWUqcixTPS1sKnItZSpvLU0qdTtyZXR1cm4gdFswXT1pKnMrUyotbCtjKi1NLWgqLWUsdFsxXT1jKnMrUyotZStoKi1sLWkqLU0sdFsyXT1oKnMrUyotTStpKi1lLWMqLWwsdFszXT1hWzNdLHR9LG8uZm9yRWFjaD1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8sdSxsKXt2YXIgZSxNO2ZvcihufHwobj00KSxyfHwocj0wKSxNPW8/TWF0aC5taW4obypuK3IsYS5sZW5ndGgpOmEubGVuZ3RoLGU9cjtNPmU7ZSs9bil0WzBdPWFbZV0sdFsxXT1hW2UrMV0sdFsyXT1hW2UrMl0sdFszXT1hW2UrM10sdSh0LHQsbCksYVtlXT10WzBdLGFbZSsxXT10WzFdLGFbZSsyXT10WzJdLGFbZSszXT10WzNdO3JldHVybiBhfX0oKSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInZlYzQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIilcIn0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9YVswXSxNPWFbMV0scz1hWzJdLGk9YVszXTtyZXR1cm4gTWF0aC5hYnMobi1lKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMoZSkpJiZNYXRoLmFicyhvLU0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhNKSkmJk1hdGguYWJzKHUtcyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKHMpKSYmTWF0aC5hYnMobC1pKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoaSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoMik7cmV0dXJuIHRbMF09MCx0WzFdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDIpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGF9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEpe3ZhciBuPW5ldyByLkFSUkFZX1RZUEUoMik7cmV0dXJuIG5bMF09dCxuWzFdPWEsbn0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWEsdFsxXT1uLHR9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuWzBdLHRbMV09YVsxXSpuWzFdLHR9LG8ubXVsPW8ubXVsdGlwbHksby5kaXZpZGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0vblswXSx0WzFdPWFbMV0vblsxXSx0fSxvLmRpdj1vLmRpdmlkZSxvLmNlaWw9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmNlaWwoYVswXSksdFsxXT1NYXRoLmNlaWwoYVsxXSksdH0sby5mbG9vcj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguZmxvb3IoYVswXSksdFsxXT1NYXRoLmZsb29yKGFbMV0pLHR9LG8ubWluPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1pbihhWzBdLG5bMF0pLHRbMV09TWF0aC5taW4oYVsxXSxuWzFdKSx0fSxvLm1heD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5tYXgoYVswXSxuWzBdKSx0WzFdPU1hdGgubWF4KGFbMV0sblsxXSksdH0sby5yb3VuZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGgucm91bmQoYVswXSksdFsxXT1NYXRoLnJvdW5kKGFbMV0pLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0fSxvLnNjYWxlQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdH0sby5kaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXTtyZXR1cm4gTWF0aC5zcXJ0KG4qbityKnIpfSxvLmRpc3Q9by5kaXN0YW5jZSxvLnNxdWFyZWREaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXTtyZXR1cm4gbipuK3Iqcn0sby5zcXJEaXN0PW8uc3F1YXJlZERpc3RhbmNlLG8ubGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdO3JldHVybiBNYXRoLnNxcnQoYSphK24qbil9LG8ubGVuPW8ubGVuZ3RoLG8uc3F1YXJlZExlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXTtyZXR1cm4gYSphK24qbn0sby5zcXJMZW49by5zcXVhcmVkTGVuZ3RoLG8ubmVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0fSxvLmludmVyc2U9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xL2FbMF0sdFsxXT0xL2FbMV0sdH0sby5ub3JtYWxpemU9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPW4qbityKnI7cmV0dXJuIG8+MCYmKG89MS9NYXRoLnNxcnQobyksdFswXT1hWzBdKm8sdFsxXT1hWzFdKm8pLHR9LG8uZG90PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF0qYVswXSt0WzFdKmFbMV19LG8uY3Jvc3M9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0qblsxXS1hWzFdKm5bMF07cmV0dXJuIHRbMF09dFsxXT0wLHRbMl09cix0fSxvLmxlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV07cmV0dXJuIHRbMF09bytyKihuWzBdLW8pLHRbMV09dStyKihuWzFdLXUpLHR9LG8ucmFuZG9tPWZ1bmN0aW9uKHQsYSl7YT1hfHwxO3ZhciBuPTIqci5SQU5ET00oKSpNYXRoLlBJO3JldHVybiB0WzBdPU1hdGguY29zKG4pKmEsdFsxXT1NYXRoLnNpbihuKSphLHR9LG8udHJhbnNmb3JtTWF0Mj1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bMl0qbyx0WzFdPW5bMV0qcituWzNdKm8sdH0sby50cmFuc2Zvcm1NYXQyZD1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bMl0qbytuWzRdLHRbMV09blsxXSpyK25bM10qbytuWzVdLHR9LG8udHJhbnNmb3JtTWF0Mz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bM10qbytuWzZdLHRbMV09blsxXSpyK25bNF0qbytuWzddLHR9LG8udHJhbnNmb3JtTWF0ND1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bNF0qbytuWzEyXSx0WzFdPW5bMV0qcituWzVdKm8rblsxM10sdH0sby5mb3JFYWNoPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyx1LGwpe3ZhciBlLE07Zm9yKG58fChuPTIpLHJ8fChyPTApLE09bz9NYXRoLm1pbihvKm4rcixhLmxlbmd0aCk6YS5sZW5ndGgsZT1yO00+ZTtlKz1uKXRbMF09YVtlXSx0WzFdPWFbZSsxXSx1KHQsdCxsKSxhW2VdPXRbMF0sYVtlKzFdPXRbMV07cmV0dXJuIGF9fSgpLG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwidmVjMihcIit0WzBdK1wiLCBcIit0WzFdK1wiKVwifSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PWFbMF0sbD1hWzFdO3JldHVybiBNYXRoLmFicyhuLXUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyh1KSkmJk1hdGguYWJzKG8tbCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGwpKX0sdC5leHBvcnRzPW99XSl9KTsiLCIvKipcclxuICogQ2FudmFzIFJlbmRlcmluZyBTdXJmYWNlLlxyXG4gKiBJdCBpcyBhIHRvcCBsZXZlbCBjb21wb25lbnQgdGhhdCBjb21iaW5lcyBpdCBhbGwgdG9nZXRoZXIgYW5kIGhpZGVzIHVubmVjZXNzYXJ5IGRldGFpbHMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGNhbnZhc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1N1cmZhY2UoY2FudmFzKVxyXG57XHJcbiAgICBpZiAoICEgKGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSApIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXNzZWQgY2FudmFzIGlzIG5vdCBIVE1MQ2FudmFzRWxlbWVudCEnKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICB0aGlzLmZhY3RvcnkgPSBuZXcgQ2FudmFzVUlGYWN0b3J5KHRoaXMuY29udGV4dCk7XHJcbiAgICB0aGlzLmVsZW1lbnRzID0gbmV3IFVJQ29sbGVjdGlvbigpO1xyXG4gICAgdGhpcy5lbGVtZW50cy5hZGQodGhpcy5mYWN0b3J5LmNyZWF0ZUxhYmVsKCkpO1xyXG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBuZXcgQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlcih0aGlzKTtcclxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLmJpbmRIdG1sQ2FudmFzRXZlbnRzKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGlzIGlzIGEgZmxhZyBmb3IgZGV0ZWN0aW5nIGlmIHdlIGFyZSBleHBvcnRpbmdcclxuICAgICAqIHJlc3VsdCBpbWFnZSBhcyBmaW5hbCB0ZXh0dXJlLlxyXG4gICAgICpcclxuICAgICAqIElmIHRoaXMgaXMgdHJ1ZSwgdGhlbiB3ZSBzaG91bGRuJ3Qgc2hvdyBhbnlcclxuICAgICAqIHNlbGVjdGlvbiBib3JkZXJzXHJcbiAgICAgKlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICovXHJcbiAgICB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlciA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuY2xlYXJDb2xvciA9ICcjRkZGRkZGJztcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgVUlDb2xsZWN0aW9uIHJlbGF0ZWQgdG8gdGhlIHN1cmZhY2UuXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7VUlDb2xsZWN0aW9ufVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuZ2V0RWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIG5ldyBsYWJlbCBlbGVtZW50IGluIHVpIGNvbGxlY3Rpb24gb2YgdGhlIHN1cmZhY2UgYW5kIHJldHVybnMgaXQuXHJcbiAqIFxyXG4gKiBAcmV0dXJucyB7VUlMYWJlbEVsZW1lbnR9XHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5wdXNoTGFiZWwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbGFiZWwgPSB0aGlzLmZhY3RvcnkuY3JlYXRlTGFiZWwoKTtcclxuICAgIHRoaXMuZWxlbWVudHMuYWRkKGxhYmVsKTtcclxuICAgIHRoaXMuZWxlbWVudHMuc2VsZWN0TGFzdCgpO1xyXG5cclxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJTZWxlY3QobGFiZWwpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBuZXcgaW1hZ2UgZWxlbWVudCBpbiB1aSBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5wdXNoSW1hZ2UgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcclxuICAgIHZhciBpbWFnZUVsZW1lbnQgPSB0aGlzLmZhY3RvcnkuY3JlYXRlSW1hZ2UoaW1hZ2UpO1xyXG4gICAgdGhpcy5lbGVtZW50cy5hZGQoaW1hZ2VFbGVtZW50KTtcclxuICAgIHRoaXMuZWxlbWVudHMuc2VsZWN0TGFzdCgpO1xyXG5cclxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJTZWxlY3QoaW1hZ2VFbGVtZW50KTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIGltYWdlRWxlbWVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGVhciB0aGUgcmVsYXRlZCBjYW52YXMuXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNsZWFyQ29sb3I7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgY2xlYXIgY29sb3JcclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG4gICAgdGhpcy5jbGVhckNvbG9yID0gY29sb3I7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhbGwgb2YgdGhlIGVsZW1lbnRzIG9uIHRoZSBzdXJmYWNlLlxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50cy5nZXQoaSkucmVuZGVyKCk7XHJcblxyXG4gICAgICAgIGlmIChpID09IHNlbGVjdGVkSW5kZXggJiYgISB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlcikge1xyXG5cclxuICAgICAgICAgICAgLy8gV2UgY2FsbCBpdCAna29zdHlsJ1xyXG4gICAgICAgICAgICAvLyBXZWlyZCB3YXkgdG8gc2V0IGNvbG9yXHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9ICcjZmZmZmZmJztcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xlYXJDb2xvci50b0xvd2VyQ2FzZSgpID09ICcjZmZmZmZmJykge1xyXG4gICAgICAgICAgICAgICAgY29sb3IgPSAnIzJlNmRhNCc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5ldyBDYW52YXNVSVNlbGVjdGVkVmlldyh0aGlzLmNvbnRleHQsIHtcclxuICAgICAgICAgICAgICAgIC8vIGtpbmRhIGZlZWxzIGxpa2UgaGFyZCBjb2RlXHJcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3IsXHJcbiAgICAgICAgICAgICAgICBzaXplOiAxNVxyXG4gICAgICAgICAgICB9KS5yZW5kZXIodGhpcy5lbGVtZW50cy5nZXQoaSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGVhcnMgdGhlIHN1cmZhY2UgYW5kIHJlbmRlcnMgaXQgd2l0aCBhbGwgZWxlbWVudHMuXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB0aGlzLnJlbmRlckVsZW1lbnRzKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2VuZXJhdGVzIGFuIGltYWdlIGZyb20gZHJhd24gY29udGVudFxyXG4gKiBAcmV0dXJucyB7SW1hZ2V9XHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS50b0ltYWdlID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHRoaXMuX2lzRXhwb3J0aW5nUmVuZGVyID0gdHJ1ZTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICBpbWFnZS5zcmMgPSB0aGlzLmNhbnZhcy50b0RhdGFVUkwoKTtcclxuXHJcbiAgICB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlciA9IGZhbHNlO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICByZXR1cm4gaW1hZ2U7XHJcbn07XHJcblxyXG4vKipcclxuICogTW92ZXMgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnQgdG8gdGhlIGJhY2tncm91bmRcclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnNlbGVjdGVkVG9CYWNrZ3JvdW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5lbGVtZW50cy50b1N0YXJ0KHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNb3ZlcyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudCB0byB0aGUgZm9yZWdyb3VuZFxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuc2VsZWN0ZWRUb0ZvcmVncm91bmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnRzLnRvRW5kKHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm4ge1VJRWxlbWVudH1cclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbW92ZVNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzLnJlbW92ZSh0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKSk7XHJcbiAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVzZWxlY3QoKTtcclxuXHJcbiAgICByZXR1cm4gZWxlbWVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIG5ldyBldmVudCBoYW5kbGVyIG9uIHNlbGVjdGlvbiBvZiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlTZWxlY3RlZENhbGxiYWNrfSBjYWxsYmFja1xyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuYWRkU2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5hZGRTZWxlY3RFdmVudEhhbmRsZXIoY2FsbGJhY2spO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5hZGREZXNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgdGhpcy5ldmVudEhhbmRsZXIuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIoY2FsbGJhY2spO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBjYW52YXMgYm91bmQgcmVjdGFuZ2xlLlxyXG4gKiBLaW5kYSB1Z2x5IG1ldGhvZC5cclxuICpcclxuICogQHJldHVybnMge3t0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIGxlZnQ6IG51bWJlcn19XHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvcDogMCxcclxuICAgICAgICByaWdodDogdGhpcy5jYW52YXMud2lkdGgsXHJcbiAgICAgICAgYm90dG9tOiB0aGlzLmNhbnZhcy5oZWlnaHQsXHJcbiAgICAgICAgbGVmdDogMFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDYWxsYmFjayB0eXBlIGZvciBzZWxlY3RpbmcgYW5kIGVsZW1lbnRcclxuICpcclxuICogQGNhbGxiYWNrIFVJU2VsZWN0ZWRDYWxsYmFja1xyXG4gKiBAcGFyYW0ge1VJRWxlbWVudH1cclxuICovIiwiLyoqXHJcbiAqIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIERPTSBldmVudHMgYW5kIHRyaWdnZXJpbmcgYXBwbGljYXRpb24gZXZlbnRzXHJcbiAqIEtpbmRhIHVnbHkgY29kZSBoZXJlXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzU3VyZmFjZX0gc3VyZmFjZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIgKHN1cmZhY2UpXHJcbntcclxuICAgIHRoaXMuc3VyZmFjZSA9IHN1cmZhY2U7XHJcbiAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSZXNpemluZ0NsaWNrID0gZmFsc2U7XHJcbiAgICB0aGlzLmxhc3RDbGlja09mZnNldCA9IG51bGw7XHJcbiAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IG51bGw7XHJcblxyXG4gICAgdGhpcy5oYW5kbGVycyA9IHtcclxuICAgICAgICBvblNlbGVjdDogW10sXHJcbiAgICAgICAgb25EZXNlbGVjdDogW11cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEJpbmRzIGFsbCBldmVudCBoYW5kbGVycyB0byB0aGUgSFRNTCBjYW52YXNcclxuICogXHJcbiAqIEBwYXJhbSBlXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5iaW5kSHRtbENhbnZhc0V2ZW50cyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XHJcblxyXG4gICAgLy8gV2UgYmluZGluZyB0aGlzIGV2ZW50IHRvIHRoZSB3aG9sZSBkb2N1bWVudCB0byBzdG9wIG1vdmluZ1xyXG4gICAgLy8gaWYgdXNlciB0cmllcyB0byBkcmFnIGFuIGVsZW1lbnQgb3V0IG9mIHRoZSBjYW52YXNcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKSk7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcykpO1xyXG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmlnZ2VycyBzZWxlY3QgZXZlbnQuXHJcbiAqIFRoaXMgbWVhbnMgdGhhdCBhbGwgYXNzaWduZWQgaGFuZGxlcnMgd2lsbCBiZSBleGVjdXRlZC5cclxuICpcclxuICogVE9ETzogQWJhbmRvbiBKYXZhU2NyaXB0IGFuZCBsZWFybiBUeXBlU2NyaXB0XHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50cmlnZ2VyU2VsZWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmhhbmRsZXJzLm9uU2VsZWN0KSB7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5oYW5kbGVycy5vblNlbGVjdFtrZXldO1xyXG5cclxuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogVHJpZ2dlcnMgZGVzZWxlY3QgZXZlbnQuXHJcbiAqIFRoaXMgbWVhbnMgdGhhdCBhbGwgYXNzaWduZWQgaGFuZGxlcnMgd2lsbCBiZSBleGVjdXRlZC5cclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXJEZXNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmhhbmRsZXJzLm9uRGVzZWxlY3QpIHtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLmhhbmRsZXJzLm9uRGVzZWxlY3Rba2V5XTtcclxuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICBjYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIG5ldyBoYW5kbGVyIG9uIGVsZW1lbnQgc2VsZWN0aW9uIGV2ZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5hZGRTZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgIHRoaXMuaGFuZGxlcnMub25TZWxlY3QucHVzaChjYWxsYmFjayk7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBuZXcgaGFuZGxlciBvbiBlbGVtZW50IGRlc2VsZWN0aW9uIGV2ZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5hZGREZXNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0LnB1c2goY2FsbGJhY2spO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVyIGZvciB0aGUgbW91c2Vkb3duIGV2ZW50XHJcbiAqXHJcbiAqIEBwYXJhbSBlXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgdGhpcy5pc01vdXNlRG93biA9IHRydWU7XHJcblxyXG4gICAgLy8gUXVpY2sgaGFja1xyXG4gICAgaWYgKHR5cGVvZiBUb3VjaEV2ZW50ICE9IFwidW5kZWZpbmVkXCIgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcclxuICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBsb2NhbENvb3JkaW5hdGVzID0gdGhpcy50b0xvY2FsQ29vcmRpbmF0ZXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgdmFyIG9sZFNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc3VyZmFjZS5nZXRFbGVtZW50cygpLmdldFNlbGVjdGVkSW5kZXgoKTtcclxuICAgIHZhciBuZXdTZWxlY3RlZEluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmZldGNoSW5kZXhCeU9mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XHJcbiAgICB2YXIgbmV3U2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldChuZXdTZWxlY3RlZEluZGV4KTtcclxuXHJcbiAgICB2YXIgZG9XZUhhdmVTb21ldGhpbmdTZWxlY3RlZCA9IG5ld1NlbGVjdGVkSW5kZXggIT09IG51bGw7XHJcbiAgICB2YXIgaXNDdXJyZW50bHlTZWxlY3RlZFdhc1NlbGVjdGVkQmVmb3JlID0gZG9XZUhhdmVTb21ldGhpbmdTZWxlY3RlZCAmJlxyXG4gICAgICAgIG9sZFNlbGVjdGVkRWxlbWVudCA9PSBuZXdTZWxlY3RlZEluZGV4O1xyXG5cclxuICAgIGlmICghZG9XZUhhdmVTb21ldGhpbmdTZWxlY3RlZCkge1xyXG5cclxuICAgICAgICAvLyBJZiB3ZSBoYWQgc29tZXRoaW5nIHNlbGVjdGVkIGJlZm9yZSxcclxuICAgICAgICAvLyBpdCBtZWFucyBpdCBpcyB0aW1lIHRvIGNhbGwgZGVzZWxlY3QgaGFuZGxlcnNcclxuICAgICAgICBpZiAob2xkU2VsZWN0ZWRFbGVtZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRGVzZWxlY3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5lbGVtZW50cy5kZXNlbGVjdCgpO1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNDdXJyZW50bHlTZWxlY3RlZFdhc1NlbGVjdGVkQmVmb3JlKSB7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyU2VsZWN0KG5ld1NlbGVjdGVkRWxlbWVudCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2UgcmVtZW1iZXIgaGVyZSB0aGUgbGFzdCBjbGljayBvZmZzZXQgcmVsYXRpdmVseSBzZWxlY3RlZCBlbGVtZW50XHJcbiAgICB0aGlzLmxhc3RDbGlja09mZnNldCA9IG5ld1NlbGVjdGVkRWxlbWVudC5nZXRDbGlja09mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XHJcblxyXG4gICAgLy8gSXMgaXQgYSBjbGljayBzdGFydGluZyByZXNpemUgb3BlcmF0aW9uID9cclxuICAgIHRoaXMuaXNSZXNpemluZ0NsaWNrID0gaXNDdXJyZW50bHlTZWxlY3RlZFdhc1NlbGVjdGVkQmVmb3JlICYmXHJcbiAgICAgICAgdGhpcy5pc1Jlc2l6ZVBvc3NpYmxlKG5ld1NlbGVjdGVkRWxlbWVudCwgbG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xyXG5cclxuICAgIGlmICh0aGlzLmlzUmVzaXppbmdDbGljaykge1xyXG4gICAgICAgIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzID0gbG9jYWxDb29yZGluYXRlcztcclxuICAgICAgICB0aGlzLnNldFJlc2l6YWJsZVN0YXRlKHRydWUpO1xyXG4gICAgfVxyXG4gICAgLy8gSXQgaXMgYSBjbGljayBmb3IgbW92aW5nXHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5lbGVtZW50cy5zZWxlY3QobmV3U2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgdGhpcy5zZXRNb3ZhYmxlU3RhdGUodHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEhhbmRsZXIgZm9yIG1vdXNlIHVwIGV2ZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VVcCA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc01vdmluZ0NsaWNrID0gZmFsc2U7XHJcbn07XHJcblxyXG4vKipcclxuICogVHJhbnNmb3JtcyBjb29yZGluYXRlcyB0byBjb29yZGluYXRlcyBpbnNpZGUgY2FudmFzXHJcbiAqXHJcbiAqIEBwYXJhbSBjbGllbnRYXHJcbiAqIEBwYXJhbSBjbGllbnRZXHJcbiAqIEByZXR1cm5zIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudG9Mb2NhbENvb3JkaW5hdGVzID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpIHtcclxuICAgIHZhciB2aWV3cG9ydE9mZnNldCA9IHRoaXMuc3VyZmFjZS5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAvLyB0aGVzZSBhcmUgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0LCBpLmUuIHRoZSB3aW5kb3dcclxuICAgIHZhciB0b3AgPSB2aWV3cG9ydE9mZnNldC50b3A7XHJcbiAgICB2YXIgbGVmdCA9IHZpZXdwb3J0T2Zmc2V0LmxlZnQ7XHJcbiAgICB2YXIgdG9wT2Zmc2V0ID0gY2xpZW50WSAtIHRvcDtcclxuICAgIHZhciBsZWZ0T2Zmc2V0ID0gY2xpZW50WCAtIGxlZnQ7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB4OiBsZWZ0T2Zmc2V0LFxyXG4gICAgICAgIHk6IHRvcE9mZnNldFxyXG4gICAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVyIGZvciBtb3VzZSBtb3ZlIGV2ZW50XHJcbiAqXHJcbiAqIEBwYXJhbSBlXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZU1vdmUgPSBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgIC8vIFF1aWNrIGhhY2tcclxuICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUgPSBlLnRvdWNoZXNbMF07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNlbGVjdGVkSW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xyXG4gICAgdmFyIGxvY2FsQ29vcmRpbmF0ZXMgPSB0aGlzLnRvTG9jYWxDb29yZGluYXRlcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcbiAgICB2YXIgZWxlbWVudEhvdmVySW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZmV0Y2hJbmRleEJ5T2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcclxuXHJcbiAgICAvLyBJdCBpcyBzaW1wbGUgbW91c2UgbW92ZSxcclxuICAgIC8vIHdlIGhhdmUgbm90aGluZyBtb3JlIHRvIGRvIGhlcmVcclxuICAgIGlmICghdGhpcy5pc01vdXNlRG93bikge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlV2l0aG91dE1vdXNlRG93bihlbGVtZW50SG92ZXJJbmRleCwgc2VsZWN0ZWRJbmRleCwgbG9jYWxDb29yZGluYXRlcyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRFbGVtZW50KCk7XHJcblxyXG4gICAgLy8gSWYgd2UgYXJlIGhlcmUsIHRoZW4gd2UgaGF2ZSBidXR0b24gcHJlc3NlZCBhbmQgd2UgbXVzdCByZXNpemUhXHJcbiAgICBpZiAodGhpcy5pc1Jlc2l6aW5nQ2xpY2spIHtcclxuICAgICAgICB2YXIgbmV3U2l6ZURlbHRhID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogbG9jYWxDb29yZGluYXRlcy54IC0gdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMueCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBsb2NhbENvb3JkaW5hdGVzLnkgLSB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcy55XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBsb2NhbENvb3JkaW5hdGVzO1xyXG5cclxuICAgICAgICB2YXIgc2l6ZSA9IHNlbGVjdGVkRWxlbWVudC5nZXRTaXplKCk7XHJcbiAgICAgICAgc2l6ZS5yZXNpemVCeShuZXdTaXplRGVsdGEud2lkdGgsIG5ld1NpemVEZWx0YS5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgLy8gTmFoLCBpdCdzIGp1c3QgbW92aW5nXHJcbiAgICBlbHNlIGlmICh0aGlzLmlzTW92aW5nQ2xpY2spIHtcclxuICAgICAgICBzZWxlY3RlZEVsZW1lbnQubW92ZVRvKG5ldyBQb3NpdGlvbihcclxuICAgICAgICAgICAgbG9jYWxDb29yZGluYXRlcy54IC0gdGhpcy5sYXN0Q2xpY2tPZmZzZXQudG9wLFxyXG4gICAgICAgICAgICBsb2NhbENvb3JkaW5hdGVzLnkgLSB0aGlzLmxhc3RDbGlja09mZnNldC5sZWZ0XHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgbW92YWJsZSBodG1sIGNsYXNzIHRvIHRoZSBjYW52YXMgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGJvb2xcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnNldE1vdmFibGVTdGF0ZSA9IGZ1bmN0aW9uIChib29sKSB7XHJcbiAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LmFkZCgnbW92YWJsZScpO1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgncmVzaXphYmxlJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ21vdmFibGUnKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIHJlc2l6YWJsZSBodG1sIGNsYXNzIHRvIHRoZSBjYW52YXMgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGJvb2xcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnNldFJlc2l6YWJsZVN0YXRlID0gZnVuY3Rpb24gKGJvb2wpIHtcclxuICAgIGlmIChib29sKSB7XHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZhYmxlJyk7XHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QuYWRkKCdyZXNpemFibGUnKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgncmVzaXphYmxlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBtb3VzZSBtb3ZlIGV2ZW50IHdoZW4gbW91c2UgYnV0dG9uIGlzIG5vdCBwcmVzc2VkXHJcbiAqXHJcbiAqIEBwYXJhbSBlbGVtZW50SG92ZXJJbmRleFxyXG4gKiBAcGFyYW0gc2VsZWN0ZWRJbmRleFxyXG4gKiBAcGFyYW0gbW91c2VDb29yZGluYXRlc1xyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VNb3ZlV2l0aG91dE1vdXNlRG93biA9IGZ1bmN0aW9uIChlbGVtZW50SG92ZXJJbmRleCwgc2VsZWN0ZWRJbmRleCwgbW91c2VDb29yZGluYXRlcykge1xyXG4gICAgaWYgKGVsZW1lbnRIb3ZlckluZGV4ID09IHNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAvLyBXaGF0IHN0YXRlIGlzIGN1cnNvciBpbj9cclxuICAgICAgICB2YXIgcmVzaXplU3RhdGUgPSB0aGlzLmlzUmVzaXplUG9zc2libGUodGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkRWxlbWVudCgpLCBtb3VzZUNvb3JkaW5hdGVzLngsIG1vdXNlQ29vcmRpbmF0ZXMueSk7XHJcbiAgICAgICAgaWYgKHJlc2l6ZVN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zZXRSZXNpemFibGVTdGF0ZShmYWxzZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBwYXNzZWQgY29vcmRpbmF0ZXMgYXJlIGxvY2F0ZWQgb24gcG9zaXRpb24gb2YgZHJhZyBpY29uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIGVsZW1lbnRcclxuICogQHBhcmFtIHhcclxuICogQHBhcmFtIHlcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmlzUmVzaXplUG9zc2libGUgPSBmdW5jdGlvbihlbGVtZW50LCB4LCB5KSB7XHJcbiAgICB2YXIgZHJhZ0ljb25TaXplID0gMTA7XHJcblxyXG4gICAgdmFyIHRlbXBFbGVtZW50RGF0YSA9IHtcclxuICAgICAgICBwb3NpdGlvbjogbmV3IFBvc2l0aW9uKFxyXG4gICAgICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSAtIGRyYWdJY29uU2l6ZSxcclxuICAgICAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpIC0gZHJhZ0ljb25TaXplXHJcbiAgICAgICAgKSxcclxuICAgICAgICBzaXplOiBuZXcgU2l6ZShkcmFnSWNvblNpemUsIGRyYWdJY29uU2l6ZSlcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHRlbXBFbGVtZW50ID0gbmV3IFVJRWxlbWVudCh0ZW1wRWxlbWVudERhdGEucG9zaXRpb24sIHRlbXBFbGVtZW50RGF0YS5zaXplKTtcclxuICAgIHJldHVybiB0ZW1wRWxlbWVudC5pc09mZnNldEluKHgsIHkpO1xyXG59OyIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJRWxlbWVudFZpZXcoY29udGV4dCkge1xyXG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyBVSSBFbGVtZW50IFZpZXcgZXJyb3IhIENvbnRleHQgaXMgbm90IGEgY29udGV4dCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufVxyXG5cclxuQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblxyXG59OyIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJRmFjdG9yeShjb250ZXh0KVxyXG57XHJcbiAgICBpZiAoICEgKGNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIHJlbmRlcmluZyBjb250ZXh0IG11c3QgYmUgaW5zdGFuY2Ugb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEISAoZmFjdG9yeSBjcmVhdGluZyknKTtcclxuICAgIH1cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbGFiZWwgZWxlbWVudCwgd2hpY2ggaXMgcmVhZHkgdG8gYmUgcmVuZGVyZWQgb24gdGhlIGNhbnZhc1xyXG4gKlxyXG4gKiBAcmV0dXJucyB7VUlMYWJlbEVsZW1lbnR9XHJcbiAqL1xyXG5DYW52YXNVSUZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUxhYmVsID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBsYWJlbCA9IG5ldyBVSUxhYmVsRWxlbWVudChuZXcgUG9zaXRpb24oMCwgNTApKTtcclxuICAgIGxhYmVsLnNldFZpZXcobmV3IENhbnZhc1VJTGFiZWxWaWV3KHRoaXMuY29udGV4dCkpO1xyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGltYWdlIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcclxuICpcclxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcclxuICovXHJcbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlSW1hZ2UgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcclxuICAgIHZhciBpbWFnZUVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgaW1hZ2UpO1xyXG4gICAgaW1hZ2VFbGVtZW50LnNldFZpZXcobmV3IENhbnZhc1VJSW1hZ2VWaWV3KHRoaXMuY29udGV4dCkpO1xyXG5cclxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XHJcbn07IiwiLyoqXHJcbiAqIFZpZXcgb2YgYW4gaW1hZ2UgZWxlbWVudCBvbiB0aGUgY2FudmFzXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlJbWFnZVZpZXcoY29udGV4dCkge1xyXG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG59XHJcblxyXG5DYW52YXNVSUltYWdlVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIGFuIGltYWdlIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtVSUltYWdlRWxlbWVudH0gdWlJbWFnZUVsZW1lbnRcclxuICovXHJcbkNhbnZhc1VJSW1hZ2VWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAodWlJbWFnZUVsZW1lbnQpIHtcclxuICAgIHZhciBwb3MgPSB1aUltYWdlRWxlbWVudC5nZXRQb3NpdGlvbigpO1xyXG4gICAgdmFyIHNpemUgPSB1aUltYWdlRWxlbWVudC5nZXRTaXplKCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICB1aUltYWdlRWxlbWVudC5nZXRJbWFnZSgpLFxyXG4gICAgICAgIHBvcy5nZXRYKCksXHJcbiAgICAgICAgcG9zLmdldFkoKSxcclxuICAgICAgICBzaXplLmdldFdpZHRoKCksXHJcbiAgICAgICAgc2l6ZS5nZXRIZWlnaHQoKVxyXG4gICAgKTtcclxufTsiLCIvKipcclxuICpcclxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNVSUxhYmVsVmlldyhjb250ZXh0KSB7XHJcbiAgICBDYW52YXNVSUVsZW1lbnRWaWV3LmNhbGwodGhpcywgY29udGV4dCk7XHJcbn1cclxuXHJcbkNhbnZhc1VJTGFiZWxWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlcnMgdGV4dCBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlMYWJlbEVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbkNhbnZhc1VJTGFiZWxWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgLy8gT3VyIHRleHQgc2l6ZSBmaXRzIGJvdW5kc1xyXG4gICAgdmFyIGZvbnRTaXplID0gZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBmb250U2l6ZSArIFwicHggXCIgKyBlbGVtZW50LmdldEZvbnQoKTtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBlbGVtZW50LmdldENvbG9yKCk7XHJcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2hhbmdpbmcnO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcclxuICAgICAgICBlbGVtZW50LmdldFRleHQoKSxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKVxyXG4gICAgKTtcclxufTsiLCIvKipcclxuICogQmFzZSB2aWV3IGZvciBzZWxlY3RlZCBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBwYXJhbSB7e2NvbG9yOiBzdHJpbmd9LCB7c2l6ZTogaW50fX0gc3R5bGUgLSBpY29uIHNpemUgYW5kIGhleCBjb2xvciBzdHJpbmdcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNVSVNlbGVjdGVkVmlldyhjb250ZXh0LCBzdHlsZSkge1xyXG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyBVSSBFbGVtZW50IFZpZXcgZXJyb3IhIENvbnRleHQgZG9lcyBub3QgaGF2ZSB0eXBlIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCEnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG4gICAgdGhpcy5maWxsU3R5bGUgPSBzdHlsZS5jb2xvciB8fCAnI0FBQUFBQSc7XHJcbiAgICB0aGlzLnJlc2l6ZUljb25XaWR0aCA9IHN0eWxlLnNpemUgfHwgMTU7XHJcbn1cclxuXHJcbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xyXG5cclxuQ2FudmFzVUlTZWxlY3RlZFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLnJlc2l6ZUljb25XaWR0aCArIFwicHggQXJpYWxcIjtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmZpbGxTdHlsZTtcclxuICAgIHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnYm90dG9tJztcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgQ2FudmFzVUlTZWxlY3RlZFZpZXcuUmVzaXplU3ltYm9sLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpIC0gdGhpcy5yZXNpemVJY29uV2lkdGgsXHJcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpLFxyXG4gICAgICAgIHRoaXMucmVzaXplSWNvbldpZHRoXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuZmlsbFN0eWxlO1xyXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoXHJcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KClcclxuICAgICk7XHJcbn07XHJcblxyXG4vKipcclxuICogQGNvbnN0IOKHmFxyXG4gKiBAdHlwZSB7c3RyaW5nfVxyXG4gKi9cclxuQ2FudmFzVUlTZWxlY3RlZFZpZXcuUmVzaXplU3ltYm9sID0gJ1xcdTIxZjInOyIsIi8qKlxyXG4gKiBQb3NpdGlvbiBpbiAyRCBzcGFjZVxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0geFxyXG4gKiBAcGFyYW0ge251bWJlcn0geVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFBvc2l0aW9uKHgsIHkpIHtcclxuICAgIHRoaXMueCA9ICt4IHx8IDA7XHJcbiAgICB0aGlzLnkgPSAreSB8fCAwO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcblBvc2l0aW9uLnByb3RvdHlwZS5nZXRYID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy54O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5Qb3NpdGlvbi5wcm90b3R5cGUuZ2V0WSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMueTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2VzIHBvc2l0aW9ucyBvZiBhbiBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhWFxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFZXHJcbiAqIEByZXR1cm4gUG9zaXRpb25cclxuICovXHJcblBvc2l0aW9uLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24oZGVsdGFYLCBkZWx0YVkpIHtcclxuICAgIHZhciBuZXdYUG9zID0gdGhpcy54ICsgZGVsdGFYO1xyXG4gICAgdmFyIG5ld1lQb3MgPSB0aGlzLnkgKyBkZWx0YVk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQb3NpdGlvbihuZXdYUG9zLCBuZXdZUG9zKTtcclxufTsiLCIvKipcclxuICogVGhpcyBvYmplY3QgaXMgb25seSBwdXJwb3NlZCBmb3IgbG9hZGluZyBleHRlcm5hbCByZXNvdXJjZXNcclxuICogVGhpcyBpcyBzdXBwb3NlZCB0byBiZSBhbiBvYmplY3QgZHVyaW5nIHRlc3RpbmcgcHVycG9zZXNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBSZXNvdXJjZUxvYWRlcigpIHtcclxuICAgIFxyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIExvYWRzIGltYWdlIHRoZW4gY2FsbHMgYSBmdW5jdGlvbi5cclxuICogVGhhdCBzaW1wbGUuXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZEltYWdlID0gZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcclxuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSBjYWxsYmFjaztcclxuICAgIH1cclxuXHJcbiAgICBpbWcuc3JjID0gc3JjO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvYWRzIHRleHQgY29udGVudCwgY2FsbHMgZnVuY3Rpb25cclxuICogXHJcbiAqIEBwYXJhbSBzcmNcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZFRleHQgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cclxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHNyYywgdHJ1ZSk7XHJcbiAgICB4aHIuc2VuZCgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvYWRzIEpTT04gY29udGVudCwgY2FsbHMgY2FsbGJhY2tcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcblJlc291cmNlTG9hZGVyLnByb3RvdHlwZS5sb2FkSnNvbk9iamVjdCA9IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmxvYWRUZXh0KHNyYywgZnVuY3Rpb24gKGxvYWRlZFRleHQpIHtcclxuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICBjYWxsYmFjayhKU09OLnBhcnNlKGxvYWRlZFRleHQpKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59O1xyXG5cclxuIiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7UmVzb3VyY2VMb2FkZXJ9IHJlc291cmNlTG9hZGVyXHJcbiAqIEBwYXJhbSB7W3trZXk6IHN0cmluZywgc3JjOiBzdHJpbmcsIHR5cGU6IHN0cmluZyB9XX0gcmVzb3VyY2VzIC0gd2hhdCByZXNvdXJjZXMgYXJlIHlvdSBnb2luZyB0byBsb2FkXHJcbiAqIEtleSBpcyB1c2VkIHRvIHNhdmUgbG9hZGVkIGNvbnRlbnQgdG8gU3RvcmFnZSxcclxuICogVHlwZSBtdXN0IGJlOiAndGV4dCcsICdpbWFnZScgb3IgJ2pzb24nLFxyXG4gKiBTcmMgaXMgdGhlIHBhdGggdG8gdGhlIHJlc291cmNlIGZyb20gZG9jdW1lbnQgcm9vdFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkxvYWQgLSBjYWxsYmFjaywgd2hpY2ggd2lsbCBiZSBleGVjdXRlZCBvbiBsb2FkIG9mIGVhY2ggZWxlbWVudFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFJlc291cmNlUHJlcGFyZXIocmVzb3VyY2VMb2FkZXIsIHJlc291cmNlcywgb25Mb2FkKVxyXG57XHJcbiAgICB0aGlzLmxvYWRlciA9IHJlc291cmNlTG9hZGVyO1xyXG4gICAgdGhpcy5yZXNvdXJjZXNUb0xvYWQgPSByZXNvdXJjZXM7XHJcbiAgICB0aGlzLm9uTG9hZCA9IG9uTG9hZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFN0YXJ0cyBsb2FkaW5nIG9mIHJlcXVlc3RlZCByZXNvdXJjZXNcclxuICovXHJcblJlc291cmNlUHJlcGFyZXIucHJvdG90eXBlLnN0YXJ0TG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0b3RhbExvYWRlZENvdW50ID0gMDtcclxuICAgIHZhciBzaG91bGRMb2FkQ291bnQgPSB0aGlzLnJlc291cmNlc1RvTG9hZC5sZW5ndGg7XHJcbiAgICB2YXIgb25Mb2FkQ2FsbGJhY2sgPSB0aGlzLm9uTG9hZDtcclxuICAgIHZhciBsb2FkZXIgPSB0aGlzLmxvYWRlcjtcclxuXHJcbiAgICAvLyBFYWNoIHRpbWUgd2UgaGF2ZSBsb2FkZWQgYSByZXNvdXJjZVxyXG4gICAgLy8gd2UgY2hlY2sgZXZlcnl0aGluZyBpcyBsb2FkZWRcclxuICAgIHZhciBzYXZlUmVzb3VyY2UgPSBmdW5jdGlvbiAoa2V5LCBvYmplY3QpIHtcclxuICAgICAgICBTdG9yYWdlLnJlbWVtYmVyKGtleSwgb2JqZWN0KTtcclxuICAgICAgICB0b3RhbExvYWRlZENvdW50Kys7XHJcbiAgICAgICAgaWYgKHRvdGFsTG9hZGVkQ291bnQgPT0gc2hvdWxkTG9hZENvdW50KSB7XHJcbiAgICAgICAgICAgIG9uTG9hZENhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcblxyXG4gICAgdmFyIHJlcXVlc3RNZXRob2RzID0ge1xyXG4gICAgICAgIGltYWdlOiBmdW5jdGlvbiAoc3JjLCBrZXkpIHtcclxuICAgICAgICAgICAgbG9hZGVyLmxvYWRJbWFnZShzcmMsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNhdmVSZXNvdXJjZShrZXksIHRoaXMpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAganNvbjogZnVuY3Rpb24gKHNyYywga2V5KSB7XHJcbiAgICAgICAgICAgIGxvYWRlci5sb2FkSnNvbk9iamVjdChzcmMsIGZ1bmN0aW9uIChqc29uUmVzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIHNhdmVSZXNvdXJjZShrZXksIGpzb25SZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICB0ZXh0OiBmdW5jdGlvbiAoc3JjLCBrZXkpIHtcclxuICAgICAgICAgICAgbG9hZGVyLmxvYWRUZXh0KHNyYywgZnVuY3Rpb24gKHRleHRSZXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgc2F2ZVJlc291cmNlKGtleSwgdGV4dFJlc291cmNlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMucmVzb3VyY2VzVG9Mb2FkLmZvckVhY2goZnVuY3Rpb24gKHJlc291cmNlKSB7XHJcbiAgICAgICAgdmFyIHR5cGUgPSByZXNvdXJjZS50eXBlO1xyXG4gICAgICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXk7XHJcbiAgICAgICAgdmFyIHNyYyA9IHJlc291cmNlLnNyYztcclxuXHJcbiAgICAgICAgaWYgKCAhIHJlcXVlc3RNZXRob2RzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVHJ5aW5nIHRvIGxvYWQgdW5rbm93biByZXNvdXJjZSB0eXBlIScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gY2FsbGluZyBhcHByb3ByaWF0ZSBsb2FkIG1ldGhvZFxyXG4gICAgICAgIHJlcXVlc3RNZXRob2RzW3R5cGVdKHNyYywga2V5KTtcclxuICAgIH0pO1xyXG59OyIsIi8qKlxyXG4gKiBTaXplIG9mIHRoZSByZWN0YW5nbGUgc3Vycm91bmRpbmcgdGhlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFNpemUod2lkdGgsIGhlaWdodCkge1xyXG4gICAgdGhpcy53aWR0aCA9ICt3aWR0aCB8fCBTaXplLmRlZmF1bHRXaWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gK2hlaWdodCB8fCBTaXplLmRlZmF1bHRIZWlnaHQ7XHJcbn1cclxuXHJcblNpemUucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy53aWR0aDtcclxufTtcclxuXHJcblNpemUucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG59O1xyXG5cclxuXHJcblNpemUucHJvdG90eXBlLnJlc2l6ZUJ5ID0gZnVuY3Rpb24gKGRlbHRhV2lkdGgsIGRlbHRhSGVpZ2h0KSB7XHJcbiAgICB0aGlzLndpZHRoICs9IGRlbHRhV2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCArPSBkZWx0YUhlaWdodDtcclxuXHJcbiAgICBpZiAodGhpcy53aWR0aCA8IFNpemUubWluV2lkdGgpIHtcclxuICAgICAgICB0aGlzLndpZHRoID0gU2l6ZS5taW5XaWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5oZWlnaHQgPCBTaXplLm1pbkhlaWdodCkge1xyXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gU2l6ZS5taW5IZWlnaHQ7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSW5jcmVhc2VzIHRoZSBzaXplIGJ5IG11bHRpcGxpZXJcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpcGxpZXJcclxuICogQHJldHVybnMge1NpemV9XHJcbiAqL1xyXG5TaXplLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uKG11bHRpcGxpZXIpIHtcclxuICAgIHJldHVybiBuZXcgU2l6ZSh0aGlzLndpZHRoICogbXVsdGlwbGllciwgdGhpcy5oZWlnaHQgKiBtdWx0aXBsaWVyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNaW5pbWFsIHdpZHRoXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5TaXplLm1pbldpZHRoID0gNDA7XHJcblxyXG4vKipcclxuICogTWluaW1hbCBoZWlnaHRcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcblNpemUubWluSGVpZ2h0ID0gNDA7XHJcblxyXG4vKipcclxuICogY29uc3QgZm9yIGRlZmF1bHQgd2lkdGhcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcblNpemUuZGVmYXVsdFdpZHRoID0gMTUwO1xyXG5cclxuLyoqXHJcbiAqIGNvbnN0IGZvciBkZWZhdWx0IGhlaWdodFxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuU2l6ZS5kZWZhdWx0SGVpZ2h0ID0gNzA7IiwiLyoqXHJcbiAqIEl0IGlzIHB1cnBvc2VkIGZvciByZW1lbWJlcmluZyBzb21lIGRhdGEuXHJcbiAqIEZ1bmN0aW9uYWwgZGVjbGFyYXRpb24gaXMgdXNlZCBmb3IgaXRzIHZpc2liaWxpdHkgb25seS5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBTdG9yYWdlKCkge1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoaXMgaXMgbm90IGZvciBjcmVhdGluZyBvYmplY3RzIVwiKTtcclxufVxyXG5cclxuU3RvcmFnZS5fY29udGVudCA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIFJlbWVtYmVycyBhbnkgdmFsdWVcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKiBAcGFyYW0geyp9IHZhbHVlXHJcbiAqL1xyXG5TdG9yYWdlLnJlbWVtYmVyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcclxuICAgIFN0b3JhZ2UuX2NvbnRlbnRba2V5XSA9IHZhbHVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFsbG93cyB5b3UgdG8gZ2V0IHdoYXQgeW91IHdhbnQgYnV0IG9ubHkgaWYgeW91IHJlbWVtYmVyIHRoaXMgZWFybGllclxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gKi9cclxuU3RvcmFnZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICB2YXIgc29tZXRoaW5nWW91V2FudCA9IFN0b3JhZ2UuX2NvbnRlbnRba2V5XTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHNvbWV0aGluZ1lvdVdhbnQgPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJXZSBoYXZlIG5vdGhpbmcgdG8gcmV0dXJuIHVzaW5nIGtleTogXCIgKyBrZXkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBzb21ldGhpbmdZb3VXYW50O1xyXG59O1xyXG4iLCIvKipcclxuICogQ29sbGVjdGlvbiBmb3IgVUkgZWxlbWVudHMuXHJcbiAqXHJcbiAqIEl0IGlzIHB1cnBvc2VkIGZvciBrZWVwaW5nIHVpIGVsZW1lbnRzIHdpdGggY29ycmVjdCBvcmRlclxyXG4gKiBBbHNvIHN1cHBvcnRzIHNlbGVjdGlvbiByZW1lbWJlcmluZ1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJQ29sbGVjdGlvbigpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLmVsZW1lbnRzID0gW107XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuXHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xlbmd0aCcsIHtcclxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbGVtZW50cy5sZW5ndGhcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxyXG4vKipcclxuICogUHVzaGVzIGVsZW1lbnQgdG8gdGhlIHRvcCBsYXllciBvZiB0aGUgY29sbGVjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudH0gZWxlbWVudFxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihlbGVtZW50KSB7XHJcbiAgICBpZiAoICEgKGVsZW1lbnQgaW5zdGFuY2VvZiBVSUVsZW1lbnQpICkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VsZW1lbnQgaW4gVUlDb2xsZWN0aW9uIG11c3QgaGF2ZSBVSUVsZW1lbnQgdHlwZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZWxlbWVudHMucHVzaChlbGVtZW50KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGFycmF5IHdpdGggYWxsIGVsZW1lbnRzIGluIGl0XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtBcnJheX1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGVsZW1lbnQgd2l0aCBwYXNzZWQgaW5kZXggZnJvbSB0aGUgY29sbGVjdGlvbiBhbmQgcmV0dXJucyBpdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtVSUVsZW1lbnR9XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4ID09IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xyXG4gICAgICAgIHRoaXMuZGVzZWxlY3QoKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLnNwbGljZShpbmRleCwgMSlbMF07XHJcbn07XHJcblxyXG4vKipcclxuICogU3dhcHMgcGxhY2VzIG9mIHR3byBlbGVtZW50cyBpbiB0aGUgY29sbGVjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXgxXHJcbiAqIEBwYXJhbSBpbmRleDJcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIChpbmRleDEsIGluZGV4Mikge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleDEpIHx8ICF0aGlzLmhhcyhpbmRleDIpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgdGVtcCA9IHRoaXMuZWxlbWVudHNbaW5kZXgxXTtcclxuICAgIHRoaXMuZWxlbWVudHNbaW5kZXgxXSAgPSB0aGlzLmVsZW1lbnRzW2luZGV4Ml07XHJcbiAgICB0aGlzLmVsZW1lbnRzW2luZGV4Ml0gPSB0ZW1wO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGluZGV4IGV4aXN0cyBpbiBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleFxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICByZXR1cm4gaW5kZXggPj0gMCB8fCBpbmRleCA8IHRoaXMubGVuZ3RoO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleFxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2luZGV4XTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGb3JnZXRzIHdoaWNoIGVsZW1lbnQgd2FzIHNlbGVjdGVkXHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmRlc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XHJcbn07XHJcblxyXG4vKipcclxuICogU2VsZWN0cyB0aGUgbGFzdCBlbGVtZW50IGluIHRoZSBjb2xsZWN0aW9uXHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdExhc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmxlbmd0aCA/IHRoaXMubGVuZ3RoIC0gMSA6IC0xO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgc2VsZWN0ZWQgZWxlbWVudFxyXG4gKlxyXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50fG51bGx9XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldFNlbGVjdGVkRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggIT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1t0aGlzLnNlbGVjdGVkSW5kZXhdXHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGluZGV4IG9mIHNlbGVjdGVkIGVsZW1lbnRcclxuICogSWYgbm9uZSwgcmV0dXJucyAtMVxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRTZWxlY3RlZEluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGZXRjaGVzIGVsZW1lbnQgYnkgcGFzc2VkIG9mZnNldFxyXG4gKlxyXG4gKiBAcGFyYW0gb2Zmc2V0WFxyXG4gKiBAcGFyYW0gb2Zmc2V0WVxyXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50fG51bGx9XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmZldGNoRWxlbWVudEJ5T2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldFgsIG9mZnNldFkpIHtcclxuICAgIHZhciBtYXRjaGVkRWxlbWVudCA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgaWYgKGVsLmlzT2Zmc2V0SW4ob2Zmc2V0WCwgb2Zmc2V0WSkpIHtcclxuICAgICAgICAgICAgbWF0Y2hlZEVsZW1lbnQgPSBlbDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaGVkRWxlbWVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgZW5kIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleFxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS50b0VuZCA9IGZ1bmN0aW9uKGluZGV4KVxyXG57XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcbiAgICB2YXIgd2FzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gaW5kZXg7XHJcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMucmVtb3ZlKGluZGV4KTtcclxuICAgIHRoaXMuYWRkKGVsZW1lbnQpO1xyXG5cclxuICAgIGlmICh3YXNTZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMubGVuZ3RoIC0gMTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgYm90dG9tIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleFxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS50b1N0YXJ0ID0gZnVuY3Rpb24oaW5kZXgpXHJcbntcclxuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcclxuICAgIH1cclxuICAgIHZhciB3YXNTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PSBpbmRleDtcclxuICAgIHZhciBlbGVtZW50ID0gdGhpcy5yZW1vdmUoaW5kZXgpO1xyXG4gICAgdGhpcy5lbGVtZW50cyA9IFtlbGVtZW50XS5jb25jYXQodGhpcy5lbGVtZW50cyk7XHJcblxyXG4gICAgaWYgKHdhc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogRmV0Y2hlcyBpbmRleCBieSBwYXNzZWQgb2Zmc2V0XHJcbiAqXHJcbiAqIEBwYXJhbSBvZmZzZXRYXHJcbiAqIEBwYXJhbSBvZmZzZXRZXHJcbiAqIEByZXR1cm5zIHsqfVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5mZXRjaEluZGV4QnlPZmZzZXQgPSBmdW5jdGlvbiAob2Zmc2V0WCwgb2Zmc2V0WSkge1xyXG4gICAgdmFyIG1hdGNoZWRJbmRleCA9IG51bGw7XHJcbiAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xyXG4gICAgICAgIGlmIChlbC5pc09mZnNldEluKG9mZnNldFgsIG9mZnNldFkpKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZWRJbmRleCA9IGluZGV4O1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoZWRJbmRleDtcclxufTsiLCIvKipcclxuICogU29tZSBlbGVtZW50IG9mIHVzZXIgaW50ZXJmYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb258dW5kZWZpbmVkfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge1NpemV8dW5kZWZpbmVkfSBzaXplXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlFbGVtZW50KHBvc2l0aW9uLCBzaXplKVxyXG57XHJcbiAgICBpZiAoICEgKHBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pICkge1xyXG4gICAgICAgIHBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgaWYgKCAhIChzaXplIGluc3RhbmNlb2YgUG9zaXRpb24pKSB7XHJcbiAgICAgICAgc2l6ZSA9IG5ldyBTaXplKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgdmlldyBvZiB0aGUgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudFZpZXd9IHZpZXdcclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuc2V0VmlldyA9IGZ1bmN0aW9uKHZpZXcpIHtcclxuICAgIGlmICggISAodmlldyBpbnN0YW5jZW9mIFVJRWxlbWVudFZpZXcpICkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZpZXcgbXVzdCBoYXZlIFVJRWxlbWVudFZpZXcgdHlwZSEnKTtcclxuICAgIH1cclxuICAgIHRoaXMudmlldyA9IHZpZXc7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBjdXJyZW50IHZpZXcgb2YgdGhlIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1VJRWxlbWVudFZpZXd8dW5kZWZpbmVkfVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRWaWV3ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudmlldztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIHRoZSBlbGVtZW50IHVzaW5nIGl0cyB2aWV3XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy52aWV3KSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdWaWV3IGlzIG5vdCBzZXQhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy52aWV3LnJlbmRlcih0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufSBwb3NpdGlvblxyXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50fVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbihwb3NpdGlvbikge1xyXG4gICAgaWYgKCFwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmV3IHBvc2l0aW9uIG11c3QgaGF2ZSBQb3NpdGlvbiB0eXBlIScpXHJcbiAgICB9XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1Bvc2l0aW9ufVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtTaXplfVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogUmV0dXJucyB0cnVlIGlmIHBhc3NlZCBvZmZzZXQgbWF0Y2hlcyBlbGVtZW50IHBvc2l0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBjbGllbnRYXHJcbiAqIEBwYXJhbSBjbGllbnRZXHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5pc09mZnNldEluID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpXHJcbntcclxuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XHJcbiAgICB2YXIgY3VycmVudFNpemUgPSB0aGlzLmdldFNpemUoKTtcclxuXHJcbiAgICBpZiAoY3VycmVudFBvc2l0aW9uLmdldFgoKSA+IGNsaWVudFggfHwgY3VycmVudFBvc2l0aW9uLmdldFgoKSArIGN1cnJlbnRTaXplLmdldFdpZHRoKCkgPCBjbGllbnRYKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgPiBjbGllbnRZIHx8IGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgKyBjdXJyZW50U2l6ZS5nZXRIZWlnaHQoKSA8IGNsaWVudFkpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBob3cgZmFyIGlzIHBhc3NlZCBvZmZzZXQgZnJvbSBwb2ludCAoMCwgMClcclxuICpcclxuICogQHBhcmFtIGNsaWVudFhcclxuICogQHBhcmFtIGNsaWVudFlcclxuICogQHJldHVybnMge3t0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyfX1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0Q2xpY2tPZmZzZXQgPSBmdW5jdGlvbiAoY2xpZW50WCwgY2xpZW50WSkge1xyXG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0b3A6IGNsaWVudFggLSBwb3NpdGlvbi5nZXRYKCksXHJcbiAgICAgICAgbGVmdDogY2xpZW50WSAtIHBvc2l0aW9uLmdldFkoKVxyXG4gICAgfVxyXG59OyIsIi8qKlxyXG4gKiBPYmplY3QsIHdoaWNoIGRlZmluZXMgaG93IHRvIHJlbmRlciBzcGVjaWZpYyBVSUVsZW1lbnRcclxuICogVGhpcyBvYmplY3Qga25vd3MgZXZlcnl0aGluZyBhYm91dCBhbiBvYmplY3QgaXQgbmVlZHMgdG8gZHJhdy5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUVsZW1lbnRWaWV3KClcclxue1xyXG5cclxufVxyXG4vKipcclxuICpcclxuICogQHBhcmFtIFVJRWxlbWVudFxyXG4gKi9cclxuVUlFbGVtZW50Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKFVJRWxlbWVudCkge1xyXG4gICAgdGhyb3cgVHlwZUVycm9yKCdZb3Ugc2hvdWxkIG5vdCBiZSB1c2luZyBhbiBhYnN0cmFjdCBvYmplY3QgZm9yIHJlbmRlcmluZyEnKTtcclxufTtcclxuIiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cclxuICogQHBhcmFtIHtTaXplfG51bGx9IHNpemVcclxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUltYWdlRWxlbWVudChwb3NpdGlvbiwgc2l6ZSwgaW1hZ2UpXHJcbntcclxuICAgIFVJRWxlbWVudC5jYWxsKHRoaXMsIHBvc2l0aW9uLCBzaXplKTtcclxuXHJcbiAgICBpZiAoICEgKGltYWdlIGluc3RhbmNlb2YgSW1hZ2UpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkltYWdlIG11c3QgaGF2ZSBJbWFnZSB0eXBlIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbn1cclxuXHJcblVJSW1hZ2VFbGVtZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50LnByb3RvdHlwZSk7XHJcblxyXG4vKipcclxuICpcclxuICogQHJldHVybnMge0ltYWdlfVxyXG4gKi9cclxuVUlJbWFnZUVsZW1lbnQucHJvdG90eXBlLmdldEltYWdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XHJcbn07IiwiLyoqXHJcbiAqIENsYXNzIGZvciBjcmVhdGluZ1xyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufG51bGx9IHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7U2l6ZXxudWxsfSBzaXplXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqIEBwYXJhbSB7Kn0gc3R5bGVcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUxhYmVsRWxlbWVudChwb3NpdGlvbiwgc2l6ZSwgdGV4dCwgc3R5bGUpIHtcclxuICAgIFVJRWxlbWVudC5hcHBseSh0aGlzLCBbcG9zaXRpb24sIHNpemVdKTtcclxuXHJcbiAgICBpZiAoIXRleHQpIHtcclxuICAgICAgICB0ZXh0ID0gVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuXHJcbiAgICBpZiAoISAoc3R5bGUgaW5zdGFuY2VvZiBPYmplY3QpKSB7XHJcbiAgICAgICAgc3R5bGUgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZvbnQgPSBzdHlsZS5mb250IHx8IFVJTGFiZWxFbGVtZW50LmRlZmF1bHRTdHlsZS5mb250O1xyXG4gICAgdGhpcy5jb2xvciA9IHN0eWxlLmNvbG9yIHx8IFVJTGFiZWxFbGVtZW50LmRlZmF1bHRTdHlsZS5jb2xvcjtcclxufVxyXG5cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnQucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKiBHZXRzIGEgdGV4dCBvZiB0aGUgY3VycmVudCBVSUxhYmVsRWxlbWVudFxyXG4gKlxyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gKi9cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLmdldFRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgYSB0ZXh0IG9mIHRoZSBjdXJyZW50IFVJTGFiZWxFbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XHJcbiAqL1xyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd8c3RyaW5nfCp9XHJcbiAqL1xyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0Rm9udCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmZvbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgZm9udCBvZiB0aGUgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9udFxyXG4gKi9cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLnNldEZvbnQgPSBmdW5jdGlvbiAoZm9udCkge1xyXG4gICAgdGhpcy5mb250ID0gZm9udDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBjb2xvciBvZiB0aGUgdGV4dFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtzdHJpbmd9XHJcbiAqL1xyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0Q29sb3IgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jb2xvcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBjb2xvciBvZiB0aGUgdGV4dFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICovXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xyXG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xyXG59O1xyXG5cclxuVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQgPSBcItCS0LLQtdC00LjRgtC1INGC0LXQutGB0YIuLi5cIjtcclxuXHJcblVJTGFiZWxFbGVtZW50LmRlZmF1bHRTdHlsZSA9IHtcclxuICAgIGZvbnQ6ICdBcmlhbCcsXHJcbiAgICBjb2xvcjogJyMwMDAwMDAnXHJcbn07IiwiLyoqXHJcbiAqIENhbWVyYVxyXG4gKiBNYW5hZ2VzIHZpZXcgY2hhbmdpbmdcclxuICogVXNlcyBzcGhlcmljYWwgY29vcmRpbmF0ZXMgdG8gY2hhbmdlIHRoZSB2aWV3IGFyb3VuZCB0aGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FtZXJhKClcclxue1xyXG4gICAgLy8gSW5pdGlhbCBhbmdsZSBhbmQgZGlzdGFuY2VcclxuICAgIHRoaXMuYW5nbGVUaGV0YSA9IDMwO1xyXG4gICAgdGhpcy5hbmdsZUZpID0gMDtcclxuICAgIHRoaXMuZGlzdGFuY2UgPSAxNTtcclxuXHJcbiAgICB0aGlzLm1pbkFuZ2xlVGhldGEgPSAxMDtcclxuICAgIHRoaXMubWF4QW5nbGVUaGV0YSA9IDE3MDtcclxuXHJcbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5nZXROZXdQb3NpdGlvbigpO1xyXG5cclxuICAgIC8vIFdoZXJlIHRvIGxvb2tcclxuICAgIHRoaXMubG9va0F0ID0gWzAsIDAsIDEuM107XHJcbiAgICB0aGlzLnVwID0gWzAsIDAsIDFdO1xyXG5cclxuICAgIHRoaXMubWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XHJcbiAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBuZXcgcG9zaXRpb25zIG9mIGEgdmlld2VyXHJcbiAqXHJcbiAqIEByZXR1cm5zIHsqW119XHJcbiAqL1xyXG5DYW1lcmEucHJvdG90eXBlLmdldE5ld1Bvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgICBNYXRoLmNvcyh0aGlzLmFuZ2xlRmkgKiBDYW1lcmEuVG9SYWRpYW5zKSAqIE1hdGguc2luKHRoaXMuYW5nbGVUaGV0YSAqIENhbWVyYS5Ub1JhZGlhbnMpICogdGhpcy5kaXN0YW5jZSxcclxuICAgICAgICBNYXRoLnNpbih0aGlzLmFuZ2xlVGhldGEgKiBDYW1lcmEuVG9SYWRpYW5zKSAqIE1hdGguc2luKHRoaXMuYW5nbGVGaSAqIENhbWVyYS5Ub1JhZGlhbnMpICogdGhpcy5kaXN0YW5jZSxcclxuICAgICAgICB0aGlzLmRpc3RhbmNlICogTWF0aC5jb3ModGhpcy5hbmdsZVRoZXRhICogQ2FtZXJhLlRvUmFkaWFucylcclxuICAgIF07XHJcbn07XHJcblxyXG4vKipcclxuICogTW92ZXMgY2FtZXJhIGFyb3VuZCB0aGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSBhbmdsZUZpXHJcbiAqIEBwYXJhbSBhbmdsZVRoZXRhXHJcbiAqL1xyXG5DYW1lcmEucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbiAoYW5nbGVGaSwgYW5nbGVUaGV0YSkge1xyXG5cclxuICAgIHRoaXMuYW5nbGVGaSArPSBhbmdsZUZpO1xyXG5cclxuICAgIHZhciBjaGFuZ2VkQW5nbGVUaGV0YSA9IHRoaXMuYW5nbGVUaGV0YSArIGFuZ2xlVGhldGE7XHJcblxyXG4gICAgaWYgKGNoYW5nZWRBbmdsZVRoZXRhIDwgdGhpcy5tYXhBbmdsZVRoZXRhICYmIGNoYW5nZWRBbmdsZVRoZXRhID4gdGhpcy5taW5BbmdsZVRoZXRhKSB7XHJcbiAgICAgICAgdGhpcy5hbmdsZVRoZXRhID0gY2hhbmdlZEFuZ2xlVGhldGE7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0TmV3UG9zaXRpb24oKTtcclxuICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XHJcbn07XHJcblxyXG4vKipcclxuICogTW92ZSBjYW1lcmEgZm9yd2FyZFxyXG4gKi9cclxuQ2FtZXJhLnByb3RvdHlwZS56b29tSW4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5kaXN0YW5jZSA+IDQpIHtcclxuICAgICAgICB0aGlzLmRpc3RhbmNlLS07XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0TmV3UG9zaXRpb24oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vdmUgY2FtZXJhIGJhY2t3YXJkXHJcbiAqL1xyXG5DYW1lcmEucHJvdG90eXBlLnpvb21PdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5kaXN0YW5jZSA8IDIwKSB7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZSsrO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldE5ld1Bvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIGNhbWVyYSBhbmdsZVxyXG4gKlxyXG4gKiBAcGFyYW0gYW5nbGVGaVxyXG4gKiBAcGFyYW0gYW5nbGVUaGV0YVxyXG4gKi9cclxuQ2FtZXJhLnByb3RvdHlwZS5zZXRBbmdsZSA9IGZ1bmN0aW9uIChhbmdsZUZpLCBhbmdsZVRoZXRhKSB7XHJcbiAgICB0aGlzLmFuZ2xlRmkgPSBhbmdsZUZpO1xyXG4gICAgdGhpcy5hbmdsZVRoZXRhID0gYW5nbGVUaGV0YTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcGRhdGVzIHZpZXcgbWF0cml4XHJcbiAqL1xyXG5DYW1lcmEucHJvdG90eXBlLnVwZGF0ZU1hdHJpeCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIG1hdDQubG9va0F0KHRoaXMubWF0cml4LCB0aGlzLnBvc2l0aW9uLCB0aGlzLmxvb2tBdCwgdGhpcy51cCk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ29uc3QgZm9yIHRyYW5zbGF0aW5nIGRlZ3JlZXMgdG8gcmFkaWFuc1xyXG4gKlxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuQ2FtZXJhLlRvUmFkaWFucyA9IE1hdGguUEkgLyAxODA7IiwiLyoqXHJcbiAqIE9iamVjdCBmb3IgY3JlYXRpbmcgVkJPIGFuZCBzdG9yaW5nIGl0XHJcbiAqIHRvIGhhdmUgY2FwYWJpbGl0eSB0byBkeW5hbWljYWxseSBjaGFuZ2UgY3VycmVudCBtb2RlbFxyXG4gKlxyXG4gKiBAcGFyYW0gZ2xcclxuICogQHBhcmFtIGpzb25Nb2RlbFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1vZGVsKGdsLCBqc29uTW9kZWwpIHtcclxuICAgIHRoaXMuYnVpbGRCdWZmZXJzKGdsLCBqc29uTW9kZWwpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBhbGwgYnVmZmVyc1xyXG4gKlxyXG4gKiBAcGFyYW0gZ2xcclxuICogQHBhcmFtIGpzb25Nb2RlbFxyXG4gKi9cclxuTW9kZWwucHJvdG90eXBlLmJ1aWxkQnVmZmVycyA9IGZ1bmN0aW9uIChnbCwganNvbk1vZGVsKVxyXG57XHJcbiAgICAvLyDQodC+0LfQtNCw0LXQvCDQsdGD0YTQtdGA0YtcclxuICAgIHRoaXMubW9kZWxWZXJ0ZXhlcyA9IGpzb25Nb2RlbC5tZXNoZXNbMF0udmVydGljZXM7XHJcbiAgICB0aGlzLm1vZGVsSW5kZXhlcyA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGpzb25Nb2RlbC5tZXNoZXNbMF0uZmFjZXMpO1xyXG4gICAgdGhpcy5tb2RlbFRleENvb3JkcyA9IGpzb25Nb2RlbC5tZXNoZXNbMF0udGV4dHVyZWNvb3Jkc1swXTtcclxuICAgIHRoaXMubW9kZWxOb3JtYWxzID0ganNvbk1vZGVsLm1lc2hlc1swXS5ub3JtYWxzO1xyXG5cclxuICAgIC8vINCh0L7Qt9C00LDQtdC8INCx0YPRhNC10YAgLSDRh9C10YDQtdC3INC90LXQs9C+INC/0LXRgNC10LTQsNC10YLRgdGPINC40L3RhNC+0YDQvNCw0YbQuNGPINCyIEdQVVxyXG4gICAgdGhpcy5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgLy8g0J3QsNC30L3QsNGH0LDQtdC8INC10LPQviDQsNC60YLQuNCy0L3Ri9C8XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCk7XHJcbiAgICAvLyBTVEFUSUNfRFJBVyAtINC60L7Qv9C40YDRg9C10Lwg0LXQtNC40L3QvtC20LTRiyDQuNC3IENQVSDQsiBHUFVcclxuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRoaXMubW9kZWxWZXJ0ZXhlcyksIGdsLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICAvLyDQntGC0LTQtdC70YzQvdGL0Lkg0LHRg9GE0LXRgCDQtNC70Y8g0YLQtdC60YHRgtGD0YDQvdGL0YUg0LrQvtC+0YDQtNC40L3QsNGCXHJcbiAgICB0aGlzLm1vZGVsVGV4Q29vcmRzQnVmZmVyT2JqZWN0ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCk7XHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0aGlzLm1vZGVsVGV4Q29vcmRzKSwgZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgIC8vINCh0L7Qt9C00LDQtdC8INC40L3QtNC10LrRgdC90YvQuSDQsdGD0YTQtdGAINC00LvRjyDRg9C60LDQt9Cw0L3QuNGPINC/0L7RgNGP0LTQutCwINCy0LXRgNGI0LjQvVxyXG4gICAgdGhpcy5tb2RlbEluZGV4QnVmZmVyT2JqZWN0ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAvLyDQndCw0LfQvdCw0YfQsNC10Lwg0LXQs9C+INCw0LrRgtC40LLQvdGL0LxcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxJbmRleEJ1ZmZlck9iamVjdCk7XHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodGhpcy5tb2RlbEluZGV4ZXMpLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgLy8g0JHRg9GE0LXRgCDRgSDQvdC+0YDQvNCw0LvRj9C80LhcclxuICAgIHRoaXMubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsTm9ybWFsQnVmZmVyT2JqZWN0KTtcclxuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRoaXMubW9kZWxOb3JtYWxzKSwgZ2wuU1RBVElDX0RSQVcpO1xyXG59O1xyXG5cclxuTW9kZWwucHJvdG90eXBlLmJpbmRCdWZmZXJzID0gZnVuY3Rpb24gKGdsKSB7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsSW5kZXhCdWZmZXJPYmplY3QpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QpO1xyXG59OyIsIi8qKlxyXG4gKiBAcGFyYW0gY2FudmFzXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBnbENvbnRleHRcclxuICogQHBhcmFtIHtJbWFnZX0gaW5pdGlhbFRleHR1cmVcclxuICogQHBhcmFtIHtzdHJpbmd9IHZlcnRleFNoYWRlclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnRTaGFkZXJcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNb2RlbFZpZXcoY2FudmFzLCBnbENvbnRleHQsIGluaXRpYWxUZXh0dXJlLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKSB7XHJcblxyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmdsID0gZ2xDb250ZXh0O1xyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IGluaXRpYWxUZXh0dXJlO1xyXG4gICAgdGhpcy5pbml0aWFsaXplKHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpO1xyXG5cclxuICAgIHRoaXMuY2FtZXJhID0gbmV3IENhbWVyYSgpO1xyXG5cclxuICAgIHRoaXMuc2V0VGV4dHVyZShpbml0aWFsVGV4dHVyZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVydGV4U2hhZGVyIC0gdmVydGV4IHNoYWRlciBzb3VyY2VcclxuICogQHBhcmFtIHtzdHJpbmd9IGZyYWdtZW50U2hhZGVyIC0gZnJhZ21lbnQgc2hhZGVyIHNvdXJjZVxyXG4gKi9cclxuTW9kZWxWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpXHJcbntcclxuICAgIHZhciBnbCA9IHRoaXMuZ2w7XHJcblxyXG4gICAgLy8g0JLQutC70Y7Rh9Cw0LXQvCDQv9GA0L7QstC10YDQutGDINCz0LvRg9Cx0LjQvdGLXHJcbiAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XHJcblxyXG4gICAgLy8g0JfQsNC00LDQtdC8INGG0LLQtdGCINC+0YfQuNGB0YLQutC4XHJcbiAgICBnbC5jbGVhckNvbG9yKDAuOCwgMC45LCAwLjkgLCAwLjApO1xyXG4gICAgLy8g0J7Rh9C40YHRgtC60LAgLSDRh9GC0L4g0L7Rh9C40YnQsNC10LwgLSDQsdGD0YTQtdGAINGG0LLQtdGC0LAsINC40LvQuCDQttC1INCx0YPRhNC10YAg0LPQu9GD0LHQuNC90YtcclxuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuXHJcbiAgICB2YXIgc2hhZGVyQ29tcGlsZXIgPSBuZXcgU2hhZGVyQ29tcGlsZXIoZ2wpO1xyXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gc2hhZGVyQ29tcGlsZXIubWFrZVByb2dyYW0odmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhIG5ldyB0ZXh0dXJlIGFzIGFjdGl2ZSB0ZXh0dXJlXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxyXG4gKi9cclxuTW9kZWxWaWV3LnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKGltYWdlKSB7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0gaW1hZ2U7XHJcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xyXG5cclxuICAgIC8vIENyZWF0aW5nIHRleHR1cmVcclxuICAgIHRoaXMubW9kZWxUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgLy8gQmluZGluZyBpdFxyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5tb2RlbFRleHR1cmUpO1xyXG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XHJcbiAgICAvLyBpIGZvciBpbnRlZ2VyICwgcywgdCAtIHUsIHZcclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAvLyBGaWx0ZXJzXHJcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xyXG4gICAgLy8g0KHQsNC80LAg0YLQtdC60YHRgtGD0YDQsFxyXG4gICAgZ2wudGV4SW1hZ2UyRChcclxuICAgICAgICBnbC5URVhUVVJFXzJELCAvLyBUZXh0dXJlIHR5cGVcclxuICAgICAgICAwLCAvLyBEZXRhaWwgbGV2ZWxcclxuICAgICAgICBnbC5SR0JBLCAvLyBXaGF0IGZvcm1hdCBkbyB3ZSB1c2VcclxuICAgICAgICBnbC5SR0JBLFxyXG4gICAgICAgIGdsLlVOU0lHTkVEX0JZVEUsIC8vIERhdGEgdHlwZVxyXG4gICAgICAgIHRoaXMudGV4dHVyZSAvLyBUZXh0dXJlIGl0c2VsZlxyXG4gICAgKTtcclxuICAgIC8vIFVuYmluZCBmb3Igbm93XHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIGFjdGl2ZSBtb2RlbCBhbmQgYmluZHMgYWxsIG9mIHRoZSBidWZmZXJzXHJcbiAqXHJcbiAqIEBwYXJhbSB7TW9kZWx9IG1vZGVsXHJcbiAqL1xyXG5Nb2RlbFZpZXcucHJvdG90eXBlLnNldE1vZGVsID0gZnVuY3Rpb24gKG1vZGVsKSB7XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG4gICAgdmFyIHByb2dyYW0gPSB0aGlzLnNoYWRlclByb2dyYW07XHJcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xyXG5cclxuICAgIG1vZGVsLmJpbmRCdWZmZXJzKGdsKTtcclxuXHJcbiAgICAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXQvCDRiNC10LnQtNC10YAg0L4g0YLQvtC8LCDQutCw0Log0LHRgNCw0YLRjCDQtNCw0L3QvdGL0LUg0LjQtyDQsdGD0YTQtdGA0LAg0LIg0LrQsNGH0LXRgdGC0LLQtSDQstGF0L7QtNC90YvRhSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgdmFyIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydFBvc2l0aW9uJyk7XHJcblxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG1vZGVsLm1vZGVsVmVydGV4QnVmZmVyT2JqZWN0KTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgLy8g0L3QsNGIINCw0YLRgNC40LHRg9GCXHJcbiAgICAgICAgMywgLy8g0JrQvtC70LjRh9C10YHRgtCy0L4g0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0LDRgtGA0LjQsdGD0YJcclxuICAgICAgICBnbC5GTE9BVCwgLy8g0KLQuNC/INC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LHRg9GE0LXRgNCwXHJcbiAgICAgICAgZ2wuRkFMU0UsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XHJcbiAgICAgICAgMyAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxyXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxyXG4gICAgKTtcclxuICAgIC8vINCS0LrQu9GO0YfQsNC10Lwg0LDRgtGA0LjQsdGD0YJcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xyXG5cclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBtb2RlbC5tb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCk7XHJcbiAgICB2YXIgdGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0VGV4Q29vcmQnKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgdGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbiwgLy8g0L3QsNGIINCw0YLRgNC40LHRg9GCXHJcbiAgICAgICAgMiwgLy8g0JrQvtC70LjRh9C10YHRgtCy0L4g0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0LDRgtGA0LjQsdGD0YJcclxuICAgICAgICBnbC5GTE9BVCwgLy8g0KLQuNC/INC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LHRg9GE0LXRgNCwXHJcbiAgICAgICAgZ2wuRkFMU0UsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XHJcbiAgICAgICAgMiAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxyXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxyXG4gICAgKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24pO1xyXG5cclxuICAgIC8vINCd0L7RgNC80LDQu9C4INCyINGI0LXQudC00LXRgNC1XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbW9kZWwubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QpO1xyXG4gICAgdmFyIG5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnROb3JtYWwnKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgbm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIC8vINC90LDRiCDQsNGC0YDQuNCx0YPRglxyXG4gICAgICAgIDMsIC8vINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINCw0YLRgNC40LHRg9GCXHJcbiAgICAgICAgZ2wuRkxPQVQsIC8vINCi0LjQvyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCx0YPRhNC10YDQsFxyXG4gICAgICAgIGdsLlRSVUUsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XHJcbiAgICAgICAgMyAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxyXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxyXG4gICAgKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uKTtcclxuXHJcbn07XHJcblxyXG5Nb2RlbFZpZXcucHJvdG90eXBlLnN0YXJ0UmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGdsID0gdGhpcy5nbDtcclxuXHJcbiAgICAvLyDQnNCw0YLRgNC40YbRiyAtINC80LXRgdGC0L7Qv9C+0LvQvtC20LXQvdC40LUg0LIg0YjQtdC50LTQtdGA0LDRhVxyXG4gICAgdGhpcy5tYXRXb3JsZFVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNoYWRlclByb2dyYW0sICdtV29ybGQnKTtcclxuICAgIHRoaXMubWF0Vmlld1VuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNoYWRlclByb2dyYW0sICdtVmlldycpO1xyXG4gICAgdGhpcy5tYXRQcm9qZWN0aW9uVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgJ21Qcm9qZWN0aW9uJyk7XHJcblxyXG4gICAgLy8g0KHQsNC80Lgg0LzQsNGC0YDQuNGG0YtcclxuICAgIHZhciB3b3JsZE1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xyXG4gICAgdmFyIHByb2plY3Rpb25NYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcclxuICAgIG1hdDQuaWRlbnRpdHkod29ybGRNYXRyaXgpO1xyXG5cclxuICAgIC8vINCf0L7Qu9C1INC+0LHQt9C+0YDQsCAo0LIg0YDQsNC00LjQsNC90LDRhSksIHZpZXdwb3J0LCBjbG9zZXN0IHBsYW5lLCBmYXIgcGxhbmVcclxuICAgIG1hdDQucGVyc3BlY3RpdmUocHJvamVjdGlvbk1hdHJpeCwgZ2xNYXRyaXgudG9SYWRpYW4oMzApLCB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuY2FudmFzLmhlaWdodCwgMC4xLCAxMDAwLjApO1xyXG5cclxuICAgIC8vINCa0LDQutGD0Y4g0YjQtdC50LTQtdGA0L3Rg9GOINC/0YDQvtCz0YDQsNC80LzRgyDQuNGB0L/QvtC70YzQt9GD0LXQvFxyXG4gICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnNoYWRlclByb2dyYW0pO1xyXG5cclxuICAgIC8vINCf0LXRgNC10LTQsNC10Lwg0LIg0YjQtdC50LTQtdGALiBUUlVFIC0g0YfRgtC+0LHRiyDRgtGA0LDQvdGB0L/QvtC90LjRgNC+0LLQsNGC0YxcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5tYXRXb3JsZFVuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHdvcmxkTWF0cml4KTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5tYXRWaWV3VW5pZm9ybUxvY2F0aW9uLCBnbC5GQUxTRSwgdGhpcy5jYW1lcmEubWF0cml4KTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5tYXRQcm9qZWN0aW9uVW5pZm9ybUxvY2F0aW9uLCBnbC5GQUxTRSwgcHJvamVjdGlvbk1hdHJpeCk7XHJcblxyXG4gICAgdGhpcy5iaW5kQ2FudmFzSGFuZGxlcnMoKTtcclxuXHJcbiAgICAvLyDQodCx0LXRgNC10LPQsNC10Lwg0LLRi9GH0LjRgdC70LjRgtC10LvRjNC90YvQtSDQvNC+0YnQvdC+0YHRgtC4XHJcbiAgICAvLyDQk9C70LDQstC90YvQuSDRhtC40LrRgCDRgNC10L3QtNC10YDQsFxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXIgbG9vcFxyXG4gKi9cclxuTW9kZWxWaWV3LnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgdmFyIGdsID0gdGhpcy5nbDtcclxuICAgIC8vINCe0LHQvdC+0LLQu9GP0LXQvCDQv9C10YDQtdC80LXQvdC90YPRjiDQsiDRiNC10LnQtNC10YDQtVxyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLm1hdFZpZXdVbmlmb3JtTG9jYXRpb24sIGdsLkZBTFNFLCB0aGlzLmNhbWVyYS5tYXRyaXgpO1xyXG5cclxuICAgIC8vINCd0LDQt9C90LDRh9C10L3QuNC1INGC0LXQutGB0YLRg9GA0YtcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMubW9kZWxUZXh0dXJlKTtcclxuXHJcbiAgICAvLyDQkNC60YLQuNCy0L3Ri9C5INGB0LvQvtGCINGC0LXQutGB0YLRg9GA0YtcclxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xyXG5cclxuICAgIC8vINCm0LLQtdGCINC+0YfQuNGB0YLQutC4XHJcbiAgICBnbC5jbGVhckNvbG9yKDAuOSwgMC45LCAwLjksIDEuMCk7XHJcbiAgICBnbC5jbGVhcihnbC5ERVBUSF9CVUZGRVJfQklUIHwgZ2wuQ09MT1JfQlVGRkVSX0JJVCApO1xyXG5cclxuICAgIGdsLmRyYXdFbGVtZW50cyhcclxuICAgICAgICBnbC5UUklBTkdMRVMsIC8vINCa0LDQuiDRgNC40YHRg9C10LwsXHJcbiAgICAgICAgdGhpcy5tb2RlbC5tb2RlbEluZGV4ZXMubGVuZ3RoLFxyXG4gICAgICAgIGdsLlVOU0lHTkVEX1NIT1JULCAvLyDQotC40L9cclxuICAgICAgICAwIC8vINCh0LrQvtC70YzQutC+INC/0YDQvtC/0YPRgdC60LDQvCDQstC10YDRiNC40L1cclxuICAgICk7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG59O1xyXG5cclxuXHJcbk1vZGVsVmlldy5wcm90b3R5cGUuYmluZENhbnZhc0hhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbnNpdGl2aXR5ID0gMTU7XHJcblxyXG4gICAgdmFyIGlzTW91c2VQcmVzc2VkID0gZmFsc2U7XHJcbiAgICB2YXIgaW5pdGlhbEV2ZW50ID0gbnVsbDtcclxuXHJcbiAgICB2YXIgY2FtZXJhID0gdGhpcy5jYW1lcmE7XHJcblxyXG4gICAgdmFyIGhhbmRsZU1vdXNlRG93biA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT0gXCJ1bmRlZmluZWRcIiAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xyXG4gICAgICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNNb3VzZVByZXNzZWQgPSB0cnVlO1xyXG4gICAgICAgIGluaXRpYWxFdmVudCA9IGU7XHJcbiAgICB9O1xyXG5cclxuICAgIHZhciBoYW5kbGVNb3VzZVVwID0gIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaXNNb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICBpbml0aWFsRXZlbnQgPSBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgaGFuZGxlTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyBhbm90aGVyIHF1aWNrIGhhY2tcclxuICAgICAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT0gXCJ1bmRlZmluZWRcIiAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUgPSBlLnRvdWNoZXNbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNNb3VzZVByZXNzZWQpIHtcclxuICAgICAgICAgICAgdmFyIGRpZmZYID0gaW5pdGlhbEV2ZW50LmNsaWVudFggLSBlLmNsaWVudFg7XHJcbiAgICAgICAgICAgIHZhciBkaWZmWSA9IGluaXRpYWxFdmVudC5jbGllbnRZIC0gZS5jbGllbnRZO1xyXG4gICAgICAgICAgICBpbml0aWFsRXZlbnQgPSBlO1xyXG5cclxuICAgICAgICAgICAgY2FtZXJhLm1vdmUoZGlmZlgsIGRpZmZZKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlRG93bik7XHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlTW91c2VEb3duKTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGhhbmRsZU1vdXNlVXApO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xyXG59OyIsIi8qKlxyXG4gKiBTaGFkZXIgY29tcGlsZXJcclxuICogU2ltcGx5IG1ha2VzIFdlYkdMUHJvZ3JhbSBmcm9tIHNoYWRlciBzb3VyY2VzXHJcbiAqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSB3ZWJHTFJlbmRlcmluZ0NvbnRlbnRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBTaGFkZXJDb21waWxlcih3ZWJHTFJlbmRlcmluZ0NvbnRlbnQpIHtcclxuICAgIHRoaXMud2ViR0xDb250ZXh0ID0gd2ViR0xSZW5kZXJpbmdDb250ZW50OyAgICAgXHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVydGV4U2hhZGVyU291cmNlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudFNoYWRlclNvdXJjZVxyXG4gKiBAcmV0dXJuIHtXZWJHTFByb2dyYW19XHJcbiAqL1xyXG5TaGFkZXJDb21waWxlci5wcm90b3R5cGUubWFrZVByb2dyYW0gPSBmdW5jdGlvbiAodmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSkge1xyXG4gICAgdmFyIGdsID0gdGhpcy53ZWJHTENvbnRleHQ7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgc2hhZGVyXHJcbiAgICB2YXIgdmVydGV4U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xyXG4gICAgdmFyIGZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcblxyXG4gICAgLy8gU2V0dGluZyBzaGFkZXIgc291cmNlc1xyXG4gICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleFNoYWRlciwgdmVydGV4U2hhZGVyU291cmNlKTtcclxuICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpO1xyXG5cclxuICAgIC8vIENvbXBpbGluZyBzaGFkZXJcclxuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcclxuXHJcbiAgICAvLyBDaGVja2luZyBjb21waWxhdGlvbiBzdGF0dXNcclxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHZlcnRleFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBjb21waWxpbmcgdmVydGV4IHNoYWRlciEnLCBnbC5nZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcikpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcclxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGNvbXBpbGluZyBmcmFnbWVudCBzaGFkZXIhJywgZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnbWVudFNoYWRlcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIHdhbnQgdG8gbWFrZSBhIHByb2dyYW0gc2hhZGVyIHNvdXJjZXNcclxuICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG5cclxuICAgIC8vIFdlYkdMIGtub3dzIHR5cGUgb2YgZWFjaCBzaGFkZXJcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcclxuXHJcbiAgICAvLyBMaW5raW5nXHJcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcclxuXHJcbiAgICAvLyBEbyB3ZSBoYXZlIGxpbmtpbmcgZXJyb3JzP1xyXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTGlua2luZyBlcnJvciEnLCBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT25seSBmb3IgdGVzdGluZyBwdXJwb3Nlc1xyXG4gICAgZ2wudmFsaWRhdGVQcm9ncmFtKHByb2dyYW0pO1xyXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLlZBTElEQVRFX1NUQVRVUykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbGlkYXRpbmcgZXJyb3IhJywgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm9ncmFtO1xyXG59O1xyXG5cclxuIiwiIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHBsYWNlIHdoZXJlIG1hZ2ljIGhhcHBlbnMuXHJcbiAqIEhhbmRsaW5nIGV2ZW50c1xyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1N1cmZhY2V9IHN1cmZhY2VcclxuICogQHBhcmFtIHtNb2RlbFZpZXd9IG1vZGVsVmlld1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENvbXBvbmVudHNQYW5lbChzdXJmYWNlLCBtb2RlbFZpZXcpXHJcbntcclxuICAgIHRoaXMuX3N1cmZhY2UgPSBzdXJmYWNlO1xyXG4gICAgXHJcbiAgICB0aGlzLl9maWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZVVwbG9hZGVyJyk7XHJcbiAgICB0aGlzLl9idG5VcGRhdGVUZXh0dXJlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZVRleHR1cmUnKTtcclxuICAgIHRoaXMuX2J0bkFkZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuQWRkVGV4dCcpO1xyXG4gICAgdGhpcy5fc2VsZWN0QmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RCYWNrZ3JvdW5kJyk7XHJcbiAgICB0aGlzLl9tb2RlbFZpZXcgPSBtb2RlbFZpZXc7XHJcbn1cclxuXHJcbkNvbXBvbmVudHNQYW5lbC5wcm90b3R5cGUuYmluZEhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgXHJcbiAgICAvLyBBZGQgbGlzdGVuZXIgZm9yIGEgY2xpY2sgZXZlbnQgb24gdGV4dCBidXR0b25cclxuICAgIHRoaXMuX2J0bkFkZFRleHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5wdXNoTGFiZWwoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBVcGRhdGUgY3VycmVudCB0ZXh0dXJlIGJ1dHRvblxyXG4gICAgdGhpcy5fYnRuVXBkYXRlVGV4dHVyZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9tb2RlbFZpZXcuc2V0VGV4dHVyZShzZWxmLl9zdXJmYWNlLnRvSW1hZ2UoKSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPbiBjbGljayB3ZSBzZXQgY3VycmVudCB2YWx1ZSB0byBlbXB0eSBhbmQgdGhlIHJlYXNvblxyXG4gICAgLy8gd2h5IHdlIGFyZSBkb2luZyB0aGlzIGlzIGJlY2F1c2Ugd2Ugd2FudCB0b1xyXG4gICAgLy8gYWRkIG5ldyBpbWFnZSBvbiB0aGUgc3VyZmFjZSwgZXZlbiBpZiBpdCBpcyB0aGVcclxuICAgIC8vIHNhbWUgZmlsZSAoaW4gY2FzZSBpZiB1c2VyIHNlbGVjdGVkIGl0IGVhcmxpZXIpXHJcbiAgICB0aGlzLl9maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSAnJztcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFNldHRpbmcgY2xlYXIgY29sb3IgZm9yIGEgY2FudmFzIHN1cmZhY2VcclxuICAgIHRoaXMuX3NlbGVjdEJhY2tncm91bmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFRoZXJlIGlzIGFuIGVtcHR5IHZhbHVlIGluIHRoZSBsaXN0XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgc2VsZi5fc3VyZmFjZS5zZXRDbGVhckNvbG9yKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9uIGNoYW5nZSB3ZSBhcmUgbG9hZGluZyBhIGZpbGUuXHJcbiAgICB0aGlzLl9maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyBXZSBuZWVkIG9ubHkgb25lIGZpbGUuXHJcbiAgICAgICAgLy8gVGhlIGZpcnN0IG9uZS5cclxuICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGFJbWFnZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gZGF0YUltYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gYWRkaW5nIHVwbG9hZGVkIGltYWdlIHRvIHRoZSBzdXJmYWNlXHJcbiAgICAgICAgICAgIHNlbGYuX3N1cmZhY2UucHVzaEltYWdlKGltYWdlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICB9KTtcclxufTtcclxuIiwiLyoqXHJcbiAqIFBhbmVsIGZvciBpbnRlcmFjdGluZyB3aXRoIG1vZGVsIHZpZXcgZWxlbWVudFxyXG4gKiBab29taW5nLCB0eXBlIHNlbGVjdG9yLlxyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGVsVmlld30gbW9kZWxWaWV3XHJcbiAqIEBwYXJhbSB7e01vZGVsfX0gbW9kZWxzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTW9kZWxWaWV3UGFuZWwobW9kZWxWaWV3LCBtb2RlbHMpXHJcbntcclxuICAgIHRoaXMuX2J0blpvb21JbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5ab29tSW4nKTtcclxuICAgIHRoaXMuX2J0blpvb21PdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuWm9vbU91dCcpO1xyXG4gICAgdGhpcy5fY3VwVHlwZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXBUeXBlU2VsZWN0Jyk7XHJcblxyXG4gICAgdGhpcy5fbW9kZWxWaWV3ID0gbW9kZWxWaWV3O1xyXG4gICAgdGhpcy5fbW9kZWxzID0gbW9kZWxzO1xyXG59XHJcblxyXG4vKipcclxuICogQmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzXHJcbiAqL1xyXG5Nb2RlbFZpZXdQYW5lbC5wcm90b3R5cGUuYmluZEhhbmRsZXJzID0gZnVuY3Rpb24gKClcclxue1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIFpvb21pbmcgYnV0dG9uc1xyXG4gICAgdGhpcy5fYnRuWm9vbUluLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX21vZGVsVmlldy5jYW1lcmEuem9vbUluKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX2J0blpvb21PdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VsZi5fbW9kZWxWaWV3LmNhbWVyYS56b29tT3V0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDaGFuZ2luZyBtb2RlbCB0eXBlXHJcbiAgICB0aGlzLl9jdXBUeXBlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2VsZWN0ZWQgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIHNlbGYuX21vZGVsVmlldy5zZXRNb2RlbChzZWxmLl9tb2RlbHNbc2VsZWN0ZWRdKTtcclxuICAgIH0pO1xyXG59OyIsIi8qKlxyXG4gKiBQYXJ0IG9mIHRoZSBkb2N1bWVudCBmb3IgbWFuaXB1bGF0aW9uIHdpdGggcHJvcGVydGllcyBcclxuICogb2YgdGhlIHNlbGVjdGVkIFVJRWxlbWVudCBvbiBDYW52YXNTdXJmYWNlXHJcbiAqXHJcbiAqIEF3YXJlIG9mIHRoZSBkb2N1bWVudCBjb250ZW50XHJcbiAqIEhhbmRsZXMgSFRNTCBtYW5pcHVsYXRpb25zXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUHJvcGVydGllc1BhbmVsKHN1cmZhY2UpXHJcbntcclxuICAgIHRoaXMuX3RleHRQYW5lbCA9IHtcclxuICAgICAgICBwYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRPcHRpb25zJyksXHJcbiAgICAgICAgc2VsZWN0Rm9udDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbnRTZWxlY3QnKSxcclxuICAgICAgICBzZWxlY3RDb2xvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yRm9udFNlbGVjdCcpLFxyXG4gICAgICAgIHRleHRBcmVhOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZWRUZXh0Q29udGVudCcpLFxyXG4gICAgICAgIHRleHRVcEJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRVcEJ0bicpLFxyXG4gICAgICAgIHRleHREb3duQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dERvd25CdG4nKVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdGhpcy5fY29tbW9uUGFuZWwgPSB7XHJcbiAgICAgICAgcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tb25PcHRpb25zJyksXHJcbiAgICAgICAgcmVtb3ZlQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVtb3ZlQnRuJyksXHJcbiAgICAgICAgdXBCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cEJ0bicpLFxyXG4gICAgICAgIGRvd25CdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb3duQnRuJylcclxuICAgIH07XHJcbiAgICBcclxuICAgIHRoaXMuX2ltYWdlUGFuZWwgPSB7XHJcbiAgICAgICAgcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZU9wdGlvbnMnKVxyXG4gICAgfTtcclxuICAgIHRoaXMuX2VtcHR5UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm9TZWxlY3RlZE9wdGlvbnMnKTtcclxuICAgIFxyXG4gICAgdGhpcy5fc2VsZWN0ZWRFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuX3N1cmZhY2UgPSBzdXJmYWNlO1xyXG59XHJcblxyXG4vKipcclxuICogQmluZHMgaGFuZGxlcnMgdG8gdGhlIGV2ZW50c1xyXG4gKi9cclxuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5iaW5kSGFuZGxlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8gU2VsZWN0aW9uIGV2ZW50cyBmcm9tIGNhbnZhcyBzdXJmYWNlXHJcbiAgICB0aGlzLl9zdXJmYWNlLmFkZFNlbGVjdEV2ZW50SGFuZGxlcihmdW5jdGlvbiAodWlFbGVtZW50KSB7XHJcbiAgICAgICAgc2VsZi5zZXRTZWxlY3RlZCh1aUVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9zdXJmYWNlLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLnNldFNlbGVjdGVkKG51bGwpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQnV0dG9uIGNsaWNrIGZvciBjb21tb24gb3B0aW9ucyAtIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudFxyXG4gICAgdGhpcy5fY29tbW9uUGFuZWwucmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW1vdmVTZWxlY3RlZCgpO1xyXG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNb3ZlIGZvcmVncm91bmRcclxuICAgIHRoaXMuX2NvbW1vblBhbmVsLnVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5zZWxlY3RlZFRvRm9yZWdyb3VuZCgpO1xyXG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBNb3ZlIGJhY2tncm91bmRcclxuICAgIHRoaXMuX2NvbW1vblBhbmVsLmRvd25CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnNlbGVjdGVkVG9CYWNrZ3JvdW5kKCk7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIEJpbmRpbmcgdGV4dCBjaGFuZ2UgZXZlbnQgdGhyb3VnaCB0ZXh0IGFyZWEgZWxlbWVudFxyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnRleHRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyBJZiB0aGlzIGV2ZW50IGhhcHBlbmVkXHJcbiAgICAgICAgLy8gdGhlbiB3ZSBoYXZlIGEgbGFiZWwgYXMgc2VsZWN0ZWQgZWxlbWVudFxyXG4gICAgICAgIHNlbGYuX3NlbGVjdGVkRWxlbWVudC5zZXRUZXh0KHRoaXMudmFsdWUpO1xyXG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGVzIHNlbGVjdGVkIGZvbnRcclxuICAgIHRoaXMuX3RleHRQYW5lbC5zZWxlY3RGb250LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9zZWxlY3RlZEVsZW1lbnQuc2V0Rm9udCh0aGlzLnZhbHVlKTtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVXBkYXRlcyBzZWxlY3RlZCBjb2xvclxyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdENvbG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9zZWxlY3RlZEVsZW1lbnQuc2V0Q29sb3IodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgc2VsZWN0ZWQgZWxlbWVudC5cclxuICogU2hvdyBwcm9wZXJ0aWVzIHdpbmRvdyBkZXBlbmRpbmcgb24gd2hhdCBpcyB0aGUgdHlwZSBvZiBhbiBlbGVtZW50IFxyXG4gKiBcclxuICogQHBhcmFtIHtVSUVsZW1lbnR8bnVsbH0gdWlFbGVtZW50XHJcbiAqL1xyXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLnNldFNlbGVjdGVkID0gZnVuY3Rpb24gKHVpRWxlbWVudCkge1xyXG4gICAgdGhpcy5fc2VsZWN0ZWRFbGVtZW50ID0gdWlFbGVtZW50O1xyXG4gICAgXHJcbiAgICBpZiAodWlFbGVtZW50IGluc3RhbmNlb2YgVUlMYWJlbEVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLnNob3dUZXh0UHJvcGVydGllcygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKHVpRWxlbWVudCBpbnN0YW5jZW9mIFVJSW1hZ2VFbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5zaG93SW1hZ2VQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICBcclxuICAgIHRoaXMuc2hvd05vdGhpbmdTZWxlY3RlZFBhbmVsKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogSGlkZXMgYWxsIG9mIHRoZSBwYW5lbHNcclxuICovXHJcblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuaGlkZUFsbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX3RleHRQYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIHRoaXMuX2ltYWdlUGFuZWwucGFuZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbiAgICB0aGlzLl9jb21tb25QYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIHRoaXMuX2VtcHR5UGFuZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogSGlkZXMgYWxsIGV4Y2VwdCB0ZXh0IHByb3BlcnRpZXMgcGFuZWxcclxuICovXHJcblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd1RleHRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5oaWRlQWxsKCk7XHJcbiAgICB0aGlzLl90ZXh0UGFuZWwudGV4dEFyZWEuaW5uZXJIVE1MID0gdGhpcy5fc2VsZWN0ZWRFbGVtZW50LmdldFRleHQoKTtcclxuICAgIHRoaXMuX3RleHRQYW5lbC5zZWxlY3RGb250LnZhbHVlID0gdGhpcy5fc2VsZWN0ZWRFbGVtZW50LmdldEZvbnQoKTtcclxuICAgIHRoaXMuX3RleHRQYW5lbC5zZWxlY3RDb2xvci52YWx1ZSA9IHRoaXMuX3NlbGVjdGVkRWxlbWVudC5nZXRDb2xvcigpO1xyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG4gICAgdGhpcy5fY29tbW9uUGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogSGlkZXMgZXZlcnl0aGluZyBleGNlcHQgaW1hZ2VzIHBhbmVsXHJcbiAqL1xyXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLnNob3dJbWFnZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmhpZGVBbGwoKTtcclxuICAgIHRoaXMuX2ltYWdlUGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICB0aGlzLl9jb21tb25QYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIaWRlcyBhbGwgZXhjZXB0IFwibm90aGluZyBzZWxlY3RlZFwiIHBhbmVsXHJcbiAqL1xyXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLnNob3dOb3RoaW5nU2VsZWN0ZWRQYW5lbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuaGlkZUFsbCgpO1xyXG4gICAgdGhpcy5fZW1wdHlQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxufTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcclxuICAgIHZhciBzdXJmYWNlID0gbmV3IENhbnZhc1N1cmZhY2UoY2FudmFzKTtcclxuICAgIHN1cmZhY2UucmVuZGVyKCk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgcGFuZWxcclxuICAgIC8vIGFuZCBhdHRhY2hpbmcgaXQgdG8gY2FudmFzIGV2ZW50c1xyXG4gICAgdmFyIHByb3BlcnRpZXNQYW5lbCA9IG5ldyBQcm9wZXJ0aWVzUGFuZWwoc3VyZmFjZSk7XHJcbiAgICBwcm9wZXJ0aWVzUGFuZWwuYmluZEhhbmRsZXJzKCk7XHJcblxyXG4gICAgdmFyIGN1cFN1cmZhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VwU3VyZmFjZScpO1xyXG4gICAgdmFyIGxvYWRlciA9IG5ldyBSZXNvdXJjZUxvYWRlcigpO1xyXG5cclxuICAgIHZhciByZXNvdXJjZVByZXBhcmVyID0gbmV3IFJlc291cmNlUHJlcGFyZXIobG9hZGVyLCBbXHJcbiAgICAgICAge2tleTogJ21vZGVsQ3VwMScsIHNyYzogJy9tb2RlbHMvY3VwMS5qc29uJywgdHlwZTogJ2pzb24nfSxcclxuICAgICAgICB7a2V5OiAnbW9kZWxDdXAyJywgc3JjOiAnL21vZGVscy9jdXAyLmpzb24nLCB0eXBlOiAnanNvbid9LFxyXG4gICAgICAgIHtrZXk6ICd2ZXJ0ZXhTaGFkZXInLCBzcmM6ICcvc2hhZGVycy9mcmFnbWVudC5nbHNsJywgdHlwZTogJ3RleHQnfSxcclxuICAgICAgICB7a2V5OiAnZnJhZ21lbnRTaGFkZXInLCBzcmM6ICcvc2hhZGVycy92ZXJ0ZXguZ2xzbCcsIHR5cGU6ICd0ZXh0J30sXHJcbiAgICAgICAge2tleTogJ2luaXRpYWxUZXh0dXJlJywgc3JjOiAnL2ltZy9sb2dvR3JleS5qcGcnLCB0eXBlOiAnaW1hZ2UnfVxyXG4gICAgXSwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBleHRyYWN0IGFsbCBjaGVja3NcclxuICAgICAgICB2YXIgZ2xDb250ZXh0ID0gY3VwU3VyZmFjZS5nZXRDb250ZXh0KCd3ZWJnbCcpO1xyXG5cclxuICAgICAgICBpZiAoIWdsQ29udGV4dCkge1xyXG4gICAgICAgICAgICBnbENvbnRleHQgPSBjdXBTdXJmYWNlLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWdsQ29udGV4dCkge1xyXG4gICAgICAgICAgICBhbGVydCgnU2VlbXMgbGlrZSB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWJHTC4gQ29tZSBiYWNrIGxhdGVyIHdoZW4geW91IHVwZGF0ZSB5b3VyIGJyb3dzZXIhJyk7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViR0wgc3VwcG9ydCBpcyByZXF1aXJlZCEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGtleSBtdXN0IGJlIHNhbWUgYXMgc2VsZWN0IG9wdGlvbiB2YWx1ZVxyXG4gICAgICAgIHZhciBtb2RlbHMgPSB7XHJcbiAgICAgICAgICAgIGN1cDE6IG5ldyBNb2RlbChnbENvbnRleHQsIFN0b3JhZ2UuZ2V0KCdtb2RlbEN1cDEnKSksXHJcbiAgICAgICAgICAgIGN1cDI6IG5ldyBNb2RlbChnbENvbnRleHQsIFN0b3JhZ2UuZ2V0KCdtb2RlbEN1cDInKSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB2YXIgbW9kZWxWaWV3ID0gbmV3IE1vZGVsVmlldyhcclxuICAgICAgICAgICAgY3VwU3VyZmFjZSxcclxuICAgICAgICAgICAgZ2xDb250ZXh0LFxyXG4gICAgICAgICAgICBTdG9yYWdlLmdldCgnaW5pdGlhbFRleHR1cmUnKSxcclxuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ2ZyYWdtZW50U2hhZGVyJyksXHJcbiAgICAgICAgICAgIFN0b3JhZ2UuZ2V0KCd2ZXJ0ZXhTaGFkZXInKVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIG1vZGVsVmlldy5zZXRNb2RlbChtb2RlbHMuY3VwMSk7XHJcbiAgICAgICAgbW9kZWxWaWV3LnN0YXJ0UmVuZGVyKCk7XHJcblxyXG4gICAgICAgIC8vIFBhbmVsIGZvciBjcmVhdGluZyBuZXcgZWxlbWVudHMgb25cclxuICAgICAgICB2YXIgY29tcG9uZW50UGFuZWwgPSBuZXcgQ29tcG9uZW50c1BhbmVsKHN1cmZhY2UsIG1vZGVsVmlldyk7XHJcbiAgICAgICAgY29tcG9uZW50UGFuZWwuYmluZEhhbmRsZXJzKCk7XHJcblxyXG4gICAgICAgIC8vIFBhbmVsIGZvciAzRCBtYWdpY1xyXG4gICAgICAgIHZhciBtb2RlbFZpZXdQYW5lbCA9IG5ldyBNb2RlbFZpZXdQYW5lbChtb2RlbFZpZXcsIG1vZGVscyk7XHJcbiAgICAgICAgbW9kZWxWaWV3UGFuZWwuYmluZEhhbmRsZXJzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXNvdXJjZVByZXBhcmVyLnN0YXJ0TG9hZGluZygpO1xyXG59KTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
