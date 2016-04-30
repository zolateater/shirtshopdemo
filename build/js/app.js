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
    var originalEvent = e;

    // Quick hack
    if (typeof TouchEvent != "undefined" && e instanceof TouchEvent) {
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

    // This is moving en element.
    // Mobile devices will try to scroll down,
    // and we don't wont that if we are resizing
    // or moving
    if (this.isMovingClick || this.isResizingClick) {
        originalEvent.preventDefault();
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
    var dragIconSize = 20;

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
 * @param {WebGLRenderingContext} glContext
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
    this.worldMatrix = new Float32Array(16);
    this.projectionMatrix = new Float32Array(16);
    mat4.identity(this.worldMatrix);
    mat4.perspective(this.projectionMatrix, glMatrix.toRadian(30), this.canvas.width / this.canvas.height, 0.1, 1000.0);
    
    // Какую шейдерную программу используем
    gl.useProgram(this.shaderProgram);

    // Поле обзора (в радианах), closest plane, far plane
    this.gl.uniformMatrix4fv(this.matWorldUniformLocation, this.gl.FALSE, this.worldMatrix);

    // Передаем в шейдер. TRUE - чтобы транспонировать
    gl.uniformMatrix4fv(this.matWorldUniformLocation, gl.FALSE, this.worldMatrix);
    gl.uniformMatrix4fv(this.matViewUniformLocation, gl.FALSE, this.camera.matrix);
    gl.uniformMatrix4fv(this.matProjectionUniformLocation, gl.FALSE, this.projectionMatrix);

    this.bindCanvasHandlers();

    // Сберегаем вычислительные мощности
    // Главный цикр рендера
    this.animationRequest = requestAnimationFrame(this.loop.bind(this));
};


/**
 * Updates render viewport
 */
ModelView.prototype.updateViewport = function () {
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
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

    var cupCanvas = document.getElementById('cupCanvas');
    var loader = new ResourceLoader();

    /**
     * @type {ModelView}
     */
    var modelView;

    var resourcePreparer = new ResourcePreparer(loader, [
        {key: 'modelCup1', src: '/models/cup1.json', type: 'json'},
        {key: 'modelCup2', src: '/models/cup2.json', type: 'json'},
        {key: 'vertexShader', src: '/shaders/fragment.glsl', type: 'text'},
        {key: 'fragmentShader', src: '/shaders/vertex.glsl', type: 'text'},
        {key: 'initialTexture', src: '/img/logoGrey.jpg', type: 'image'}
    ], function () {

        // TODO: extract all checks
        var glContext = cupCanvas.getContext('webgl');

        if (!glContext) {
            glContext = cupCanvas.getContext('experimental-webgl')
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

        modelView = new ModelView(
            cupCanvas,
            glContext,
            Storage.get('initialTexture'),
            Storage.get('fragmentShader'),
            Storage.get('vertexShader')
        );

        // Setting initial model cup
        modelView.setModel(models.cup1);
        modelView.startRender();

        // Panel for creating new elements on
        var componentPanel = new ComponentsPanel(surface, modelView);
        componentPanel.bindHandlers();

        // Panel for 3D magic
        var modelViewPanel = new ModelViewPanel(modelView, models);
        modelViewPanel.bindHandlers();
    });

    var drawingContainer = document.getElementById('drawingContainer');
    var modelViewContainer = document.getElementById('cupCanvasContainer');

    var fitCanvasSize = function () {
        // Changing size of the drawing
        var drawingCanvasRatio = surface.canvas.width / surface.canvas.height;
        var newWidth = drawingContainer.offsetWidth;
        var newHeight = newWidth / drawingCanvasRatio;

        surface.canvas.width = newWidth;
        surface.canvas.height = newHeight;
        surface.render();

        var modelViewRatio = cupCanvas.width / cupCanvas.height;
        var newWidthModelView = modelViewContainer.offsetWidth;
        cupCanvas.width = newWidthModelView;
        cupCanvas.height = newWidthModelView / modelViewRatio;
        
        if (modelView) {
            modelView.updateViewport();
        }
    };
    fitCanvasSize();

    // Listen for resize event to resize canvas
    window.addEventListener('resize', fitCanvasSize);

    resourcePreparer.startLoading();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsLW1hdHJpeC5qcyIsIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsIkNhbnZhc1VJRmFjdG9yeS5qcyIsIkNhbnZhc1VJSW1hZ2VWaWV3LmpzIiwiQ2FudmFzVUlMYWJlbFZpZXcuanMiLCJDYW52YXNVSVNlbGVjdGVkVmlldy5qcyIsIlBvc2l0aW9uLmpzIiwiUmVzb3VyY2VMb2FkZXIuanMiLCJSZXNvdXJjZVByZXBhcmVyLmpzIiwiU2l6ZS5qcyIsIlN0b3JhZ2UuanMiLCJVSUNvbGxlY3Rpb24uanMiLCJVSUVsZW1lbnQuanMiLCJVSUVsZW1lbnRWaWV3LmpzIiwiVUlJbWFnZUVsZW1lbnQuanMiLCJVSUxhYmVsRWxlbWVudC5qcyIsIkNhbWVyYS5qcyIsIk1vZGVsLmpzIiwiTW9kZWxWaWV3LmpzIiwiU2hhZGVyQ29tcGlsZXIuanMiLCJDYW52YXNSZXNpemVFdmVudExpc3RlbmVyLmpzIiwiQ29tcG9uZW50c1BhbmVsLmpzIiwiTW9kZWxWaWV3UGFuZWwuanMiLCJQcm9wZXJ0aWVzUGFuZWwuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDck5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVvdmVydmlldyBnbC1tYXRyaXggLSBIaWdoIHBlcmZvcm1hbmNlIG1hdHJpeCBhbmQgdmVjdG9yIG9wZXJhdGlvbnNcbiAqIEBhdXRob3IgQnJhbmRvbiBKb25lc1xuICogQGF1dGhvciBDb2xpbiBNYWNLZW56aWUgSVZcbiAqIEB2ZXJzaW9uIDIuMy4yXG4gKi9cblxuLyogQ29weXJpZ2h0IChjKSAyMDE1LCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS4gKi9cblxuIWZ1bmN0aW9uKHQsYSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9YSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxhKTtlbHNle3ZhciBuPWEoKTtmb3IodmFyIHIgaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czp0KVtyXT1uW3JdfX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbih0KXtmdW5jdGlvbiBhKHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtleHBvcnRzOnt9LGlkOnIsbG9hZGVkOiExfTtyZXR1cm4gdFtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxhKSxvLmxvYWRlZD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGEubT10LGEuYz1uLGEucD1cIlwiLGEoMCl9KFtmdW5jdGlvbih0LGEsbil7YS5nbE1hdHJpeD1uKDEpLGEubWF0Mj1uKDIpLGEubWF0MmQ9bigzKSxhLm1hdDM9big0KSxhLm1hdDQ9big1KSxhLnF1YXQ9big2KSxhLnZlYzI9big5KSxhLnZlYzM9big3KSxhLnZlYzQ9big4KX0sZnVuY3Rpb24odCxhKXt2YXIgbj17fTtuLkVQU0lMT049MWUtNixuLkFSUkFZX1RZUEU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZsb2F0MzJBcnJheT9GbG9hdDMyQXJyYXk6QXJyYXksbi5SQU5ET009TWF0aC5yYW5kb20sbi5FTkFCTEVfU0lNRD0hMSxuLlNJTURfQVZBSUxBQkxFPW4uQVJSQVlfVFlQRT09PUZsb2F0MzJBcnJheSYmXCJTSU1EXCJpbiB0aGlzLG4uVVNFX1NJTUQ9bi5FTkFCTEVfU0lNRCYmbi5TSU1EX0FWQUlMQUJMRSxuLnNldE1hdHJpeEFycmF5VHlwZT1mdW5jdGlvbih0KXtuLkFSUkFZX1RZUEU9dH07dmFyIHI9TWF0aC5QSS8xODA7bi50b1JhZGlhbj1mdW5jdGlvbih0KXtyZXR1cm4gdCpyfSxuLmVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiBNYXRoLmFicyh0LWEpPD1uLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh0KSxNYXRoLmFicyhhKSl9LHQuZXhwb3J0cz1ufSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvKXt2YXIgdT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB1WzBdPXQsdVsxXT1hLHVbMl09bix1WzNdPW8sdX0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHR9LG8udHJhbnNwb3NlPWZ1bmN0aW9uKHQsYSl7aWYodD09PWEpe3ZhciBuPWFbMV07dFsxXT1hWzJdLHRbMl09bn1lbHNlIHRbMF09YVswXSx0WzFdPWFbMl0sdFsyXT1hWzFdLHRbM109YVszXTtyZXR1cm4gdH0sby5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bip1LW8qcjtyZXR1cm4gbD8obD0xL2wsdFswXT11KmwsdFsxXT0tcipsLHRbMl09LW8qbCx0WzNdPW4qbCx0KTpudWxsfSxvLmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdO3JldHVybiB0WzBdPWFbM10sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHRbM109bix0fSxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdKnRbM10tdFsyXSp0WzFdfSxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9blswXSxNPW5bMV0scz1uWzJdLGk9blszXTtyZXR1cm4gdFswXT1yKmUrdSpNLHRbMV09byplK2wqTSx0WzJdPXIqcyt1KmksdFszXT1vKnMrbCppLHR9LG8ubXVsPW8ubXVsdGlwbHksby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTSt1KmUsdFsxXT1vKk0rbCplLHRbMl09ciotZSt1Kk0sdFszXT1vKi1lK2wqTSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9blswXSxNPW5bMV07cmV0dXJuIHRbMF09ciplLHRbMV09byplLHRbMl09dSpNLHRbM109bCpNLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPS1uLHRbM109cix0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109YVsxXSx0fSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDIoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKSl9LG8uTERVPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzJdPXJbMl0vclswXSxuWzBdPXJbMF0sblsxXT1yWzFdLG5bM109clszXS10WzJdKm5bMV0sW3QsYSxuXX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdH0sby5zdWI9by5zdWJ0cmFjdCxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT1hWzBdLE09YVsxXSxzPWFbMl0saT1hWzNdO3JldHVybiBNYXRoLmFicyhuLWUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhlKSkmJk1hdGguYWJzKG8tTSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKE0pKSYmTWF0aC5hYnModS1zKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMocykpJiZNYXRoLmFicyhsLWkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhpKSl9LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHR9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg2KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHRbNF09MCx0WzVdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDYpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYVs0XT10WzRdLGFbNV09dFs1XSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHRbNF09MCx0WzVdPTAsdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8sdSxsKXt2YXIgZT1uZXcgci5BUlJBWV9UWVBFKDYpO3JldHVybiBlWzBdPXQsZVsxXT1hLGVbMl09bixlWzNdPW8sZVs0XT11LGVbNV09bCxlfSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8sdSxsKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHRbNF09dSx0WzVdPWwsdH0sby5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1uKnUtcipvO3JldHVybiBNPyhNPTEvTSx0WzBdPXUqTSx0WzFdPS1yKk0sdFsyXT0tbypNLHRbM109bipNLHRbNF09KG8qZS11KmwpKk0sdFs1XT0ocipsLW4qZSkqTSx0KTpudWxsfSxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdKnRbM10tdFsxXSp0WzJdfSxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1uWzBdLGk9blsxXSxjPW5bMl0saD1uWzNdLFM9bls0XSxJPW5bNV07cmV0dXJuIHRbMF09cipzK3UqaSx0WzFdPW8qcytsKmksdFsyXT1yKmMrdSpoLHRbM109bypjK2wqaCx0WzRdPXIqUyt1KkkrZSx0WzVdPW8qUytsKkkrTSx0fSxvLm11bD1vLm11bHRpcGx5LG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1NYXRoLnNpbihuKSxpPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqaSt1KnMsdFsxXT1vKmkrbCpzLHRbMl09ciotcyt1KmksdFszXT1vKi1zK2wqaSx0WzRdPWUsdFs1XT1NLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPW5bMF0saT1uWzFdO3JldHVybiB0WzBdPXIqcyx0WzFdPW8qcyx0WzJdPXUqaSx0WzNdPWwqaSx0WzRdPWUsdFs1XT1NLHR9LG8udHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1uWzBdLGk9blsxXTtyZXR1cm4gdFswXT1yLHRbMV09byx0WzJdPXUsdFszXT1sLHRbNF09cipzK3UqaStlLHRbNV09bypzK2wqaStNLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPS1uLHRbM109cix0WzRdPTAsdFs1XT0wLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT1hWzFdLHRbNF09MCx0WzVdPTAsdH0sby5mcm9tVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHRbNF09YVswXSx0WzVdPWFbMV0sdH0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQyZChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiLCBcIit0WzRdK1wiLCBcIit0WzVdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpK01hdGgucG93KHRbNF0sMikrTWF0aC5wb3codFs1XSwyKSsxKX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0WzRdPWFbNF0rbls0XSx0WzVdPWFbNV0rbls1XSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdFs0XT1hWzRdLW5bNF0sdFs1XT1hWzVdLW5bNV0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdFs0XT1hWzRdKm4sdFs1XT1hWzVdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0WzRdPWFbNF0rbls0XSpyLHRbNV09YVs1XStuWzVdKnIsdH0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXSYmdFs0XT09PWFbNF0mJnRbNV09PT1hWzVdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT10WzRdLE09dFs1XSxzPWFbMF0saT1hWzFdLGM9YVsyXSxoPWFbM10sUz1hWzRdLEk9YVs1XTtyZXR1cm4gTWF0aC5hYnMobi1zKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMocykpJiZNYXRoLmFicyhvLWkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhpKSkmJk1hdGguYWJzKHUtYyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKGMpKSYmTWF0aC5hYnMobC1oKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoaCkpJiZNYXRoLmFicyhlLVMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhlKSxNYXRoLmFicyhTKSkmJk1hdGguYWJzKE0tSSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKE0pLE1hdGguYWJzKEkpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDkpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0xLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLmZyb21NYXQ0PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVs0XSx0WzRdPWFbNV0sdFs1XT1hWzZdLHRbNl09YVs4XSx0WzddPWFbOV0sdFs4XT1hWzEwXSx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoOSk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhWzRdPXRbNF0sYVs1XT10WzVdLGFbNl09dFs2XSxhWzddPXRbN10sYVs4XT10WzhdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyx1LGwsZSxNLHMpe3ZhciBpPW5ldyByLkFSUkFZX1RZUEUoOSk7cmV0dXJuIGlbMF09dCxpWzFdPWEsaVsyXT1uLGlbM109byxpWzRdPXUsaVs1XT1sLGlbNl09ZSxpWzddPU0saVs4XT1zLGl9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwsZSxNLHMpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdFs0XT11LHRbNV09bCx0WzZdPWUsdFs3XT1NLHRbOF09cyx0fSxvLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0xLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe2lmKHQ9PT1hKXt2YXIgbj1hWzFdLHI9YVsyXSxvPWFbNV07dFsxXT1hWzNdLHRbMl09YVs2XSx0WzNdPW4sdFs1XT1hWzddLHRbNl09cix0WzddPW99ZWxzZSB0WzBdPWFbMF0sdFsxXT1hWzNdLHRbMl09YVs2XSx0WzNdPWFbMV0sdFs0XT1hWzRdLHRbNV09YVs3XSx0WzZdPWFbMl0sdFs3XT1hWzVdLHRbOF09YVs4XTtyZXR1cm4gdH0sby5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1pKmwtZSpzLGg9LWkqdStlKk0sUz1zKnUtbCpNLEk9bipjK3IqaCtvKlM7cmV0dXJuIEk/KEk9MS9JLHRbMF09YypJLHRbMV09KC1pKnIrbypzKSpJLHRbMl09KGUqci1vKmwpKkksdFszXT1oKkksdFs0XT0oaSpuLW8qTSkqSSx0WzVdPSgtZSpuK28qdSkqSSx0WzZdPVMqSSx0WzddPSgtcypuK3IqTSkqSSx0WzhdPShsKm4tcip1KSpJLHQpOm51bGx9LG8uYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XTtyZXR1cm4gdFswXT1sKmktZSpzLHRbMV09bypzLXIqaSx0WzJdPXIqZS1vKmwsdFszXT1lKk0tdSppLHRbNF09bippLW8qTSx0WzVdPW8qdS1uKmUsdFs2XT11KnMtbCpNLHRbN109cipNLW4qcyx0WzhdPW4qbC1yKnUsdH0sby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdLHU9dFs0XSxsPXRbNV0sZT10WzZdLE09dFs3XSxzPXRbOF07cmV0dXJuIGEqKHMqdS1sKk0pK24qKC1zKm8rbCplKStyKihNKm8tdSplKX0sby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9blswXSxTPW5bMV0sST1uWzJdLGY9blszXSx4PW5bNF0sRD1uWzVdLEY9bls2XSxtPW5bN10sZD1uWzhdO3JldHVybiB0WzBdPWgqcitTKmwrSSpzLHRbMV09aCpvK1MqZStJKmksdFsyXT1oKnUrUypNK0kqYyx0WzNdPWYqcit4KmwrRCpzLHRbNF09ZipvK3gqZStEKmksdFs1XT1mKnUreCpNK0QqYyx0WzZdPUYqcittKmwrZCpzLHRbN109RipvK20qZStkKmksdFs4XT1GKnUrbSpNK2QqYyx0fSxvLm11bD1vLm11bHRpcGx5LG8udHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1uWzBdLFM9blsxXTtyZXR1cm4gdFswXT1yLHRbMV09byx0WzJdPXUsdFszXT1sLHRbNF09ZSx0WzVdPU0sdFs2XT1oKnIrUypsK3MsdFs3XT1oKm8rUyplK2ksdFs4XT1oKnUrUypNK2MsdH0sby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPU1hdGguc2luKG4pLFM9TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09UypyK2gqbCx0WzFdPVMqbytoKmUsdFsyXT1TKnUraCpNLHRbM109UypsLWgqcix0WzRdPVMqZS1oKm8sdFs1XT1TKk0taCp1LHRbNl09cyx0WzddPWksdFs4XT1jLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPW5bMF0sbz1uWzFdO3JldHVybiB0WzBdPXIqYVswXSx0WzFdPXIqYVsxXSx0WzJdPXIqYVsyXSx0WzNdPW8qYVszXSx0WzRdPW8qYVs0XSx0WzVdPW8qYVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0fSxvLmZyb21UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0xLHRbNV09MCx0WzZdPWFbMF0sdFs3XT1hWzFdLHRbOF09MSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0wLHRbM109LW4sdFs0XT1yLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPWFbMV0sdFs1XT0wLHRbNl09MCx0WzddPTAsdFs4XT0xLHR9LG8uZnJvbU1hdDJkPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT0wLHRbM109YVsyXSx0WzRdPWFbM10sdFs1XT0wLHRbNl09YVs0XSx0WzddPWFbNV0sdFs4XT0xLHR9LG8uZnJvbVF1YXQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bituLGU9cityLE09bytvLHM9bipsLGk9cipsLGM9ciplLGg9bypsLFM9byplLEk9bypNLGY9dSpsLHg9dSplLEQ9dSpNO3JldHVybiB0WzBdPTEtYy1JLHRbM109aS1ELHRbNl09aCt4LHRbMV09aStELHRbNF09MS1zLUksdFs3XT1TLWYsdFsyXT1oLXgsdFs1XT1TK2YsdFs4XT0xLXMtYyx0fSxvLm5vcm1hbEZyb21NYXQ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9YVs5XSxoPWFbMTBdLFM9YVsxMV0sST1hWzEyXSxmPWFbMTNdLHg9YVsxNF0sRD1hWzE1XSxGPW4qZS1yKmwsbT1uKk0tbypsLGQ9bipzLXUqbCxiPXIqTS1vKmUsdj1yKnMtdSplLHo9bypzLXUqTSxwPWkqZi1jKkksdz1pKngtaCpJLEU9aSpELVMqSSxBPWMqeC1oKmYsUD1jKkQtUypmLEw9aCpELVMqeCxxPUYqTC1tKlArZCpBK2IqRS12KncreipwO3JldHVybiBxPyhxPTEvcSx0WzBdPShlKkwtTSpQK3MqQSkqcSx0WzFdPShNKkUtbCpMLXMqdykqcSx0WzJdPShsKlAtZSpFK3MqcCkqcSx0WzNdPShvKlAtcipMLXUqQSkqcSx0WzRdPShuKkwtbypFK3UqdykqcSx0WzVdPShyKkUtbipQLXUqcCkqcSx0WzZdPShmKnoteCp2K0QqYikqcSx0WzddPSh4KmQtSSp6LUQqbSkqcSx0WzhdPShJKnYtZipkK0QqRikqcSx0KTpudWxsfSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDMoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIiwgXCIrdFs0XStcIiwgXCIrdFs1XStcIiwgXCIrdFs2XStcIiwgXCIrdFs3XStcIiwgXCIrdFs4XStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKStNYXRoLnBvdyh0WzRdLDIpK01hdGgucG93KHRbNV0sMikrTWF0aC5wb3codFs2XSwyKStNYXRoLnBvdyh0WzddLDIpK01hdGgucG93KHRbOF0sMikpfSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHRbNF09YVs0XStuWzRdLHRbNV09YVs1XStuWzVdLHRbNl09YVs2XStuWzZdLHRbN109YVs3XStuWzddLHRbOF09YVs4XStuWzhdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0WzRdPWFbNF0tbls0XSx0WzVdPWFbNV0tbls1XSx0WzZdPWFbNl0tbls2XSx0WzddPWFbN10tbls3XSx0WzhdPWFbOF0tbls4XSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0WzRdPWFbNF0qbix0WzVdPWFbNV0qbix0WzZdPWFbNl0qbix0WzddPWFbN10qbix0WzhdPWFbOF0qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHRbNF09YVs0XStuWzRdKnIsdFs1XT1hWzVdK25bNV0qcix0WzZdPWFbNl0rbls2XSpyLHRbN109YVs3XStuWzddKnIsdFs4XT1hWzhdK25bOF0qcix0fSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdJiZ0WzRdPT09YVs0XSYmdFs1XT09PWFbNV0mJnRbNl09PT1hWzZdJiZ0WzddPT09YVs3XSYmdFs4XT09PWFbOF19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPXRbNF0sTT10WzVdLHM9dFs2XSxpPXRbN10sYz10WzhdLGg9YVswXSxTPWFbMV0sST1hWzJdLGY9YVszXSx4PWFbNF0sRD1hWzVdLEY9dFs2XSxtPWFbN10sZD1hWzhdO3JldHVybiBNYXRoLmFicyhuLWgpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhoKSkmJk1hdGguYWJzKG8tUyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKFMpKSYmTWF0aC5hYnModS1JKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoSSkpJiZNYXRoLmFicyhsLWYpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhmKSkmJk1hdGguYWJzKGUteCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGUpLE1hdGguYWJzKHgpKSYmTWF0aC5hYnMoTS1EKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoTSksTWF0aC5hYnMoRCkpJiZNYXRoLmFicyhzLUYpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhzKSxNYXRoLmFicyhGKSkmJk1hdGguYWJzKGktbSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGkpLE1hdGguYWJzKG0pKSYmTWF0aC5hYnMoYy1kKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoYyksTWF0aC5hYnMoZCkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17c2NhbGFyOnt9LFNJTUQ6e319O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSgxNik7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoMTYpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYVs0XT10WzRdLGFbNV09dFs1XSxhWzZdPXRbNl0sYVs3XT10WzddLGFbOF09dFs4XSxhWzldPXRbOV0sYVsxMF09dFsxMF0sYVsxMV09dFsxMV0sYVsxMl09dFsxMl0sYVsxM109dFsxM10sYVsxNF09dFsxNF0sYVsxNV09dFsxNV0sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyx1LGwsZSxNLHMsaSxjLGgsUyxJLGYseCl7dmFyIEQ9bmV3IHIuQVJSQVlfVFlQRSgxNik7cmV0dXJuIERbMF09dCxEWzFdPWEsRFsyXT1uLERbM109byxEWzRdPXUsRFs1XT1sLERbNl09ZSxEWzddPU0sRFs4XT1zLERbOV09aSxEWzEwXT1jLERbMTFdPWgsRFsxMl09UyxEWzEzXT1JLERbMTRdPWYsRFsxNV09eCxEfSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxmLHgpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdFs0XT11LHRbNV09bCx0WzZdPWUsdFs3XT1NLHRbOF09cyx0WzldPWksdFsxMF09Yyx0WzExXT1oLHRbMTJdPVMsdFsxM109SSx0WzE0XT1mLHRbMTVdPXgsdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uc2NhbGFyLnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe2lmKHQ9PT1hKXt2YXIgbj1hWzFdLHI9YVsyXSxvPWFbM10sdT1hWzZdLGw9YVs3XSxlPWFbMTFdO3RbMV09YVs0XSx0WzJdPWFbOF0sdFszXT1hWzEyXSx0WzRdPW4sdFs2XT1hWzldLHRbN109YVsxM10sdFs4XT1yLHRbOV09dSx0WzExXT1hWzE0XSx0WzEyXT1vLHRbMTNdPWwsdFsxNF09ZX1lbHNlIHRbMF09YVswXSx0WzFdPWFbNF0sdFsyXT1hWzhdLHRbM109YVsxMl0sdFs0XT1hWzFdLHRbNV09YVs1XSx0WzZdPWFbOV0sdFs3XT1hWzEzXSx0WzhdPWFbMl0sdFs5XT1hWzZdLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTRdLHRbMTJdPWFbM10sdFsxM109YVs3XSx0WzE0XT1hWzExXSx0WzE1XT1hWzE1XTtyZXR1cm4gdH0sby5TSU1ELnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe3ZhciBuLHIsbyx1LGwsZSxNLHMsaSxjO3JldHVybiBuPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxyPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMiksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwwLDEsNCw1KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDAsMSw0LDUpLE09U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMCwyLDQsNikscz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwxLDMsNSw3KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsTSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LHMpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMiwzLDYsNyksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwyLDMsNiw3KSxpPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDAsMiw0LDYpLGM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMSwzLDUsNyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LGkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsYyksdH0sby50cmFuc3Bvc2U9ci5VU0VfU0lNRD9vLlNJTUQudHJhbnNwb3NlOm8uc2NhbGFyLnRyYW5zcG9zZSxvLnNjYWxhci5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1hWzldLGg9YVsxMF0sUz1hWzExXSxJPWFbMTJdLGY9YVsxM10seD1hWzE0XSxEPWFbMTVdLEY9biplLXIqbCxtPW4qTS1vKmwsZD1uKnMtdSpsLGI9cipNLW8qZSx2PXIqcy11KmUsej1vKnMtdSpNLHA9aSpmLWMqSSx3PWkqeC1oKkksRT1pKkQtUypJLEE9Yyp4LWgqZixQPWMqRC1TKmYsTD1oKkQtUyp4LHE9RipMLW0qUCtkKkErYipFLXYqdyt6KnA7cmV0dXJuIHE/KHE9MS9xLHRbMF09KGUqTC1NKlArcypBKSpxLHRbMV09KG8qUC1yKkwtdSpBKSpxLHRbMl09KGYqei14KnYrRCpiKSpxLHRbM109KGgqdi1jKnotUypiKSpxLHRbNF09KE0qRS1sKkwtcyp3KSpxLHRbNV09KG4qTC1vKkUrdSp3KSpxLHRbNl09KHgqZC1JKnotRCptKSpxLHRbN109KGkqei1oKmQrUyptKSpxLHRbOF09KGwqUC1lKkUrcypwKSpxLHRbOV09KHIqRS1uKlAtdSpwKSpxLHRbMTBdPShJKnYtZipkK0QqRikqcSx0WzExXT0oYypkLWkqdi1TKkYpKnEsdFsxMl09KGUqdy1sKkEtTSpwKSpxLHRbMTNdPShuKkEtcip3K28qcCkqcSx0WzE0XT0oZiptLUkqYi14KkYpKnEsdFsxNV09KGkqYi1jKm0raCpGKSpxLHQpOm51bGx9LG8uU0lNRC5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbixyLG8sdSxsLGUsTSxzLGksYyxoPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxTPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxJPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxmPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMik7cmV0dXJuIGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShoLFMsMCwxLDQsNSkscj1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKEksZiwwLDEsNCw1KSxuPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxyLDAsMiw0LDYpLHI9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShyLGwsMSwzLDUsNyksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGgsUywyLDMsNiw3KSx1PVNJTUQuRmxvYXQzMng0LnNodWZmbGUoSSxmLDIsMyw2LDcpLG89U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLHUsMCwyLDQsNiksdT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHUsbCwxLDMsNSw3KSxsPVNJTUQuRmxvYXQzMng0Lm11bChvLHUpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLGU9U0lNRC5GbG9hdDMyeDQubXVsKHIsbCksTT1TSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxlKSxNPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxNKSxNPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoTSwyLDMsMCwxKSxsPVNJTUQuRmxvYXQzMng0Lm11bChyLG8pLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLGU9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLGUpLGk9U0lNRC5GbG9hdDMyeDQubXVsKG4sbCksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5zdWIoZSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG4sbCksaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShyLDIsMywwLDEpLHUpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLG89U0lNRC5GbG9hdDMyeDQuc3dpenpsZShvLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChvLGwpLGUpLHM9U0lNRC5GbG9hdDMyeDQubXVsKG4sbCksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5zdWIoZSxTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSkscz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG4sbCkscykscz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMiwzLDAsMSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobixyKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxzPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxzKSxpPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSxpKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxzPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxzKSxpPVNJTUQuRmxvYXQzMng0LnN1YihpLFNJTUQuRmxvYXQzMng0Lm11bChvLGwpKSxsPVNJTUQuRmxvYXQzMng0Lm11bChuLHUpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLE09U0lNRC5GbG9hdDMyeDQuc3ViKE0sU0lNRC5GbG9hdDMyeDQubXVsKG8sbCkpLHM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyLGwpLHMpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLE09U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChvLGwpLE0pLHM9U0lNRC5GbG9hdDMyeDQuc3ViKHMsU0lNRC5GbG9hdDMyeDQubXVsKHIsbCkpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG4sbyksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksTT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCksTSksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoaSxTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksTT1TSU1ELkZsb2F0MzJ4NC5zdWIoTSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSksaT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHIsbCksaSksYz1TSU1ELkZsb2F0MzJ4NC5tdWwobixlKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMiwzLDAsMSksYyksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDEsMCwzLDIpLGMpLGw9U0lNRC5GbG9hdDMyeDQucmVjaXByb2NhbEFwcHJveGltYXRpb24oYyksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQuYWRkKGwsbCksU0lNRC5GbG9hdDMyeDQubXVsKGMsU0lNRC5GbG9hdDMyeDQubXVsKGwsbCkpKSwoYz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMCwwLDAsMCkpPyhTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQubXVsKGMsZSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxNKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0Lm11bChjLHMpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLFNJTUQuRmxvYXQzMng0Lm11bChjLGkpKSx0KTpudWxsfSxvLmludmVydD1yLlVTRV9TSU1EP28uU0lNRC5pbnZlcnQ6by5zY2FsYXIuaW52ZXJ0LG8uc2NhbGFyLmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1hWzldLGg9YVsxMF0sUz1hWzExXSxJPWFbMTJdLGY9YVsxM10seD1hWzE0XSxEPWFbMTVdO3JldHVybiB0WzBdPWUqKGgqRC1TKngpLWMqKE0qRC1zKngpK2YqKE0qUy1zKmgpLHRbMV09LShyKihoKkQtUyp4KS1jKihvKkQtdSp4KStmKihvKlMtdSpoKSksdFsyXT1yKihNKkQtcyp4KS1lKihvKkQtdSp4KStmKihvKnMtdSpNKSx0WzNdPS0ociooTSpTLXMqaCktZSoobypTLXUqaCkrYyoobypzLXUqTSkpLHRbNF09LShsKihoKkQtUyp4KS1pKihNKkQtcyp4KStJKihNKlMtcypoKSksdFs1XT1uKihoKkQtUyp4KS1pKihvKkQtdSp4KStJKihvKlMtdSpoKSx0WzZdPS0obiooTSpELXMqeCktbCoobypELXUqeCkrSSoobypzLXUqTSkpLHRbN109biooTSpTLXMqaCktbCoobypTLXUqaCkraSoobypzLXUqTSksdFs4XT1sKihjKkQtUypmKS1pKihlKkQtcypmKStJKihlKlMtcypjKSx0WzldPS0obiooYypELVMqZiktaSoocipELXUqZikrSSoocipTLXUqYykpLHRbMTBdPW4qKGUqRC1zKmYpLWwqKHIqRC11KmYpK0kqKHIqcy11KmUpLHRbMTFdPS0obiooZSpTLXMqYyktbCoocipTLXUqYykraSoocipzLXUqZSkpLHRbMTJdPS0obCooYyp4LWgqZiktaSooZSp4LU0qZikrSSooZSpoLU0qYykpLHRbMTNdPW4qKGMqeC1oKmYpLWkqKHIqeC1vKmYpK0kqKHIqaC1vKmMpLHRbMTRdPS0obiooZSp4LU0qZiktbCoocip4LW8qZikrSSoocipNLW8qZSkpLHRbMTVdPW4qKGUqaC1NKmMpLWwqKHIqaC1vKmMpK2kqKHIqTS1vKmUpLHR9LG8uU0lNRC5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG4scixvLHUsbCxlLE0scyxpLGMsaCxTLEksbj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCkscj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpO3JldHVybiBpPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDAsMSw0LDUpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMCwxLDQsNSksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGksZSwwLDIsNCw2KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoZSxpLDEsMyw1LDcpLGk9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMiwzLDYsNykscz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwyLDMsNiw3KSxNPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaSxzLDAsMiw0LDYpLHM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShzLGksMSwzLDUsNyksaT1TSU1ELkZsb2F0MzJ4NC5tdWwoTSxzKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxjPVNJTUQuRmxvYXQzMng0Lm11bChlLGkpLGg9U0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGUsaSksYyksaD1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaCksaD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGgsMiwzLDAsMSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwoZSxNKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxjKSxJPVNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKGMsU0lNRC5GbG9hdDMyeDQubXVsKHMsaSkpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLGkpLEkpLEk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShJLDIsMywwLDEpLGk9U0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwyLDMsMCwxKSxzKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxNPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoTSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSxjKSxTPVNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKGMsU0lNRC5GbG9hdDMyeDQubXVsKE0saSkpLFM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLGkpLFMpLFM9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDIsMywwLDEpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGwsZSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksUz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksUyksST1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKE0saSksSSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksUz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksUyksST1TSU1ELkZsb2F0MzJ4NC5zdWIoSSxTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobCxzKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxoPVNJTUQuRmxvYXQzMng0LnN1YihoLFNJTUQuRmxvYXQzMng0Lm11bChNLGkpKSxTPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxTKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxoPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSxoKSxTPVNJTUQuRmxvYXQzMng0LnN1YihTLFNJTUQuRmxvYXQzMng0Lm11bChlLGkpKSxpPVNJTUQuRmxvYXQzMng0Lm11bChsLE0pLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLGg9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLGgpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKEksU0lNRC5GbG9hdDMyeDQubXVsKGUsaSkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGg9U0lNRC5GbG9hdDMyeDQuc3ViKGgsU0lNRC5GbG9hdDMyeDQubXVsKHMsaSkpLEk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChlLGkpLEkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxjKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsaCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFMpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsSSksdH0sby5hZGpvaW50PXIuVVNFX1NJTUQ/by5TSU1ELmFkam9pbnQ6by5zY2FsYXIuYWRqb2ludCxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM10sdT10WzRdLGw9dFs1XSxlPXRbNl0sTT10WzddLHM9dFs4XSxpPXRbOV0sYz10WzEwXSxoPXRbMTFdLFM9dFsxMl0sST10WzEzXSxmPXRbMTRdLHg9dFsxNV0sRD1hKmwtbip1LEY9YSplLXIqdSxtPWEqTS1vKnUsZD1uKmUtcipsLGI9bipNLW8qbCx2PXIqTS1vKmUsej1zKkktaSpTLHA9cypmLWMqUyx3PXMqeC1oKlMsRT1pKmYtYypJLEE9aSp4LWgqSSxQPWMqeC1oKmY7cmV0dXJuIEQqUC1GKkErbSpFK2Qqdy1iKnArdip6fSxvLlNJTUQubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMiksZT1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sMCksTT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDMsMywzLDMpLGwpKSkpO1NJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxNKTt2YXIgcz1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sNCksaT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDMsMywzLDMpLGwpKSkpO1NJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxpKTt2YXIgYz1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sOCksaD1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDMsMywzLDMpLGwpKSkpO1NJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxoKTt2YXIgUz1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sMTIpLEk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywzLDMsMywzKSxsKSkpKTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixJKSx0fSxvLnNjYWxhci5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9YVs5XSxTPWFbMTBdLEk9YVsxMV0sZj1hWzEyXSx4PWFbMTNdLEQ9YVsxNF0sRj1hWzE1XSxtPW5bMF0sZD1uWzFdLGI9blsyXSx2PW5bM107cmV0dXJuIHRbMF09bSpyK2QqZStiKmMrdipmLHRbMV09bSpvK2QqTStiKmgrdip4LHRbMl09bSp1K2QqcytiKlMrdipELHRbM109bSpsK2QqaStiKkkrdipGLG09bls0XSxkPW5bNV0sYj1uWzZdLHY9bls3XSx0WzRdPW0qcitkKmUrYipjK3YqZix0WzVdPW0qbytkKk0rYipoK3YqeCx0WzZdPW0qdStkKnMrYipTK3YqRCx0WzddPW0qbCtkKmkrYipJK3YqRixtPW5bOF0sZD1uWzldLGI9blsxMF0sdj1uWzExXSx0WzhdPW0qcitkKmUrYipjK3YqZix0WzldPW0qbytkKk0rYipoK3YqeCx0WzEwXT1tKnUrZCpzK2IqUyt2KkQsdFsxMV09bSpsK2QqaStiKkkrdipGLG09blsxMl0sZD1uWzEzXSxiPW5bMTRdLHY9blsxNV0sdFsxMl09bSpyK2QqZStiKmMrdipmLHRbMTNdPW0qbytkKk0rYipoK3YqeCx0WzE0XT1tKnUrZCpzK2IqUyt2KkQsdFsxNV09bSpsK2QqaStiKkkrdipGLHR9LG8ubXVsdGlwbHk9ci5VU0VfU0lNRD9vLlNJTUQubXVsdGlwbHk6by5zY2FsYXIubXVsdGlwbHksby5tdWw9by5tdWx0aXBseSxvLnNjYWxhci50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxmPW5bMF0seD1uWzFdLEQ9blsyXTtyZXR1cm4gYT09PXQ/KHRbMTJdPWFbMF0qZithWzRdKngrYVs4XSpEK2FbMTJdLHRbMTNdPWFbMV0qZithWzVdKngrYVs5XSpEK2FbMTNdLHRbMTRdPWFbMl0qZithWzZdKngrYVsxMF0qRCthWzE0XSx0WzE1XT1hWzNdKmYrYVs3XSp4K2FbMTFdKkQrYVsxNV0pOihyPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPWFbOV0sUz1hWzEwXSxJPWFbMTFdLHRbMF09cix0WzFdPW8sdFsyXT11LHRbM109bCx0WzRdPWUsdFs1XT1NLHRbNl09cyx0WzddPWksdFs4XT1jLHRbOV09aCx0WzEwXT1TLHRbMTFdPUksdFsxMl09cipmK2UqeCtjKkQrYVsxMl0sdFsxM109bypmK00qeCtoKkQrYVsxM10sdFsxNF09dSpmK3MqeCtTKkQrYVsxNF0sdFsxNV09bCpmK2kqeCtJKkQrYVsxNV0pLHR9LG8uU0lNRC50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMiksZT1TSU1ELkZsb2F0MzJ4NChuWzBdLG5bMV0sblsyXSwwKTthIT09dCYmKHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSkscj1TSU1ELkZsb2F0MzJ4NC5tdWwocixTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMCwwLDAsMCkpLG89U0lNRC5GbG9hdDMyeDQubXVsKG8sU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDEsMSwxLDEpKSx1PVNJTUQuRmxvYXQzMng0Lm11bCh1LFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwyLDIsMiwyKSk7dmFyIE09U0lNRC5GbG9hdDMyeDQuYWRkKHIsU0lNRC5GbG9hdDMyeDQuYWRkKG8sU0lNRC5GbG9hdDMyeDQuYWRkKHUsbCkpKTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixNKSx0fSxvLnRyYW5zbGF0ZT1yLlVTRV9TSU1EP28uU0lNRC50cmFuc2xhdGU6by5zY2FsYXIudHJhbnNsYXRlLG8uc2NhbGFyLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uWzBdLG89blsxXSx1PW5bMl07cmV0dXJuIHRbMF09YVswXSpyLHRbMV09YVsxXSpyLHRbMl09YVsyXSpyLHRbM109YVszXSpyLHRbNF09YVs0XSpvLHRbNV09YVs1XSpvLHRbNl09YVs2XSpvLHRbN109YVs3XSpvLHRbOF09YVs4XSp1LHRbOV09YVs5XSp1LHRbMTBdPWFbMTBdKnUsdFsxMV09YVsxMV0qdSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSx0fSxvLlNJTUQuc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByLG8sdSxsPVNJTUQuRmxvYXQzMng0KG5bMF0sblsxXSxuWzJdLDApO3JldHVybiByPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQubXVsKHIsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDAsMCwwLDApKSksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0Lm11bChvLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDEsMSwxKSkpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5tdWwodSxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwyLDIsMikpKSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSx0fSxvLnNjYWxlPXIuVVNFX1NJTUQ/by5TSU1ELnNjYWxlOm8uc2NhbGFyLnNjYWxlLG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuLG8pe3ZhciB1LGwsZSxNLHMsaSxjLGgsUyxJLGYseCxELEYsbSxkLGIsdix6LHAsdyxFLEEsUCxMPW9bMF0scT1vWzFdLFI9b1syXSxOPU1hdGguc3FydChMKkwrcSpxK1IqUik7cmV0dXJuIE1hdGguYWJzKE4pPHIuRVBTSUxPTj9udWxsOihOPTEvTixMKj1OLHEqPU4sUio9Tix1PU1hdGguc2luKG4pLGw9TWF0aC5jb3MobiksZT0xLWwsTT1hWzBdLHM9YVsxXSxpPWFbMl0sYz1hWzNdLGg9YVs0XSxTPWFbNV0sST1hWzZdLGY9YVs3XSx4PWFbOF0sRD1hWzldLEY9YVsxMF0sbT1hWzExXSxkPUwqTCplK2wsYj1xKkwqZStSKnUsdj1SKkwqZS1xKnUsej1MKnEqZS1SKnUscD1xKnEqZStsLHc9UipxKmUrTCp1LEU9TCpSKmUrcSp1LEE9cSpSKmUtTCp1LFA9UipSKmUrbCx0WzBdPU0qZCtoKmIreCp2LHRbMV09cypkK1MqYitEKnYsdFsyXT1pKmQrSSpiK0Yqdix0WzNdPWMqZCtmKmIrbSp2LHRbNF09TSp6K2gqcCt4KncsdFs1XT1zKnorUypwK0Qqdyx0WzZdPWkqeitJKnArRip3LHRbN109Yyp6K2YqcCttKncsdFs4XT1NKkUraCpBK3gqUCx0WzldPXMqRStTKkErRCpQLHRbMTBdPWkqRStJKkErRipQLHRbMTFdPWMqRStmKkErbSpQLGEhPT10JiYodFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHQpfSxvLnNjYWxhci5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1NYXRoLnNpbihuKSxvPU1hdGguY29zKG4pLHU9YVs0XSxsPWFbNV0sZT1hWzZdLE09YVs3XSxzPWFbOF0saT1hWzldLGM9YVsxMF0saD1hWzExXTtyZXR1cm4gYSE9PXQmJih0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHRbNF09dSpvK3Mqcix0WzVdPWwqbytpKnIsdFs2XT1lKm8rYypyLHRbN109TSpvK2gqcix0WzhdPXMqby11KnIsdFs5XT1pKm8tbCpyLHRbMTBdPWMqby1lKnIsdFsxMV09aCpvLU0qcix0fSxvLlNJTUQucm90YXRlWD1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5zaW4obikpLG89U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MobikpO2EhPT10JiYodFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKTt2YXIgdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbyksU0lNRC5GbG9hdDMyeDQubXVsKGwscikpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLG8pLFNJTUQuRmxvYXQzMng0Lm11bCh1LHIpKSksdH0sby5yb3RhdGVYPXIuVVNFX1NJTUQ/by5TSU1ELnJvdGF0ZVg6by5zY2FsYXIucm90YXRlWCxvLnNjYWxhci5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1NYXRoLnNpbihuKSxvPU1hdGguY29zKG4pLHU9YVswXSxsPWFbMV0sZT1hWzJdLE09YVszXSxzPWFbOF0saT1hWzldLGM9YVsxMF0saD1hWzExXTtyZXR1cm4gYSE9PXQmJih0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHRbMF09dSpvLXMqcix0WzFdPWwqby1pKnIsdFsyXT1lKm8tYypyLHRbM109TSpvLWgqcix0WzhdPXUqcitzKm8sdFs5XT1sKnIraSpvLHRbMTBdPWUqcitjKm8sdFsxMV09TSpyK2gqbyx0fSxvLlNJTUQucm90YXRlWT1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5zaW4obikpLG89U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MobikpO2EhPT10JiYodFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKTt2YXIgdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHUsbyksU0lNRC5GbG9hdDMyeDQubXVsKGwscikpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LHIpLFNJTUQuRmxvYXQzMng0Lm11bChsLG8pKSksdH0sby5yb3RhdGVZPXIuVVNFX1NJTUQ/by5TSU1ELnJvdGF0ZVk6by5zY2FsYXIucm90YXRlWSxvLnNjYWxhci5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1NYXRoLnNpbihuKSxvPU1hdGguY29zKG4pLHU9YVswXSxsPWFbMV0sZT1hWzJdLE09YVszXSxzPWFbNF0saT1hWzVdLGM9YVs2XSxoPWFbN107cmV0dXJuIGEhPT10JiYodFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSksdFswXT11Km8rcypyLHRbMV09bCpvK2kqcix0WzJdPWUqbytjKnIsdFszXT1NKm8raCpyLHRbNF09cypvLXUqcix0WzVdPWkqby1sKnIsdFs2XT1jKm8tZSpyLHRbN109aCpvLU0qcix0fSxvLlNJTUQucm90YXRlWj1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5zaW4obikpLG89U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MobikpO2EhPT10JiYodFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSk7dmFyIHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LG8pLFNJTUQuRmxvYXQzMng0Lm11bChsLHIpKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxyKSkpLHR9LG8ucm90YXRlWj1yLlVTRV9TSU1EP28uU0lNRC5yb3RhdGVaOm8uc2NhbGFyLnJvdGF0ZVosby5mcm9tVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT1hWzBdLHRbMTNdPWFbMV0sdFsxNF09YVsyXSx0WzE1XT0xLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPWFbMV0sdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPWFbMl0sdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSxuKXt2YXIgbyx1LGwsZT1uWzBdLE09blsxXSxzPW5bMl0saT1NYXRoLnNxcnQoZSplK00qTStzKnMpO3JldHVybiBNYXRoLmFicyhpKTxyLkVQU0lMT04/bnVsbDooaT0xL2ksZSo9aSxNKj1pLHMqPWksbz1NYXRoLnNpbihhKSx1PU1hdGguY29zKGEpLGw9MS11LHRbMF09ZSplKmwrdSx0WzFdPU0qZSpsK3Mqbyx0WzJdPXMqZSpsLU0qbyx0WzNdPTAsdFs0XT1lKk0qbC1zKm8sdFs1XT1NKk0qbCt1LHRbNl09cypNKmwrZSpvLHRbN109MCx0WzhdPWUqcypsK00qbyx0WzldPU0qcypsLWUqbyx0WzEwXT1zKnMqbCt1LHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0KX0sby5mcm9tWFJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPXIsdFs2XT1uLHRbN109MCx0WzhdPTAsdFs5XT0tbix0WzEwXT1yLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21ZUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT0wLHRbMl09LW4sdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPW4sdFs5XT0wLHRbMTBdPXIsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVpSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0wLHRbM109MCx0WzRdPS1uLHRbNV09cix0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tUm90YXRpb25UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPXIrcixNPW8rbyxzPXUrdSxpPXIqZSxjPXIqTSxoPXIqcyxTPW8qTSxJPW8qcyxmPXUqcyx4PWwqZSxEPWwqTSxGPWwqcztyZXR1cm4gdFswXT0xLShTK2YpLHRbMV09YytGLHRbMl09aC1ELHRbM109MCx0WzRdPWMtRix0WzVdPTEtKGkrZiksdFs2XT1JK3gsdFs3XT0wLHRbOF09aCtELHRbOV09SS14LHRbMTBdPTEtKGkrUyksdFsxMV09MCx0WzEyXT1uWzBdLHRbMTNdPW5bMV0sdFsxNF09blsyXSx0WzE1XT0xLHR9LG8uZ2V0VHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzEyXSx0WzFdPWFbMTNdLHRbMl09YVsxNF0sdH0sby5nZXRSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0rYVs1XSthWzEwXSxyPTA7cmV0dXJuIG4+MD8ocj0yKk1hdGguc3FydChuKzEpLHRbM109LjI1KnIsdFswXT0oYVs2XS1hWzldKS9yLHRbMV09KGFbOF0tYVsyXSkvcix0WzJdPShhWzFdLWFbNF0pL3IpOmFbMF0+YVs1XSZhWzBdPmFbMTBdPyhyPTIqTWF0aC5zcXJ0KDErYVswXS1hWzVdLWFbMTBdKSx0WzNdPShhWzZdLWFbOV0pL3IsdFswXT0uMjUqcix0WzFdPShhWzFdK2FbNF0pL3IsdFsyXT0oYVs4XSthWzJdKS9yKTphWzVdPmFbMTBdPyhyPTIqTWF0aC5zcXJ0KDErYVs1XS1hWzBdLWFbMTBdKSx0WzNdPShhWzhdLWFbMl0pL3IsdFswXT0oYVsxXSthWzRdKS9yLHRbMV09LjI1KnIsdFsyXT0oYVs2XSthWzldKS9yKToocj0yKk1hdGguc3FydCgxK2FbMTBdLWFbMF0tYVs1XSksdFszXT0oYVsxXS1hWzRdKS9yLHRbMF09KGFbOF0rYVsyXSkvcix0WzFdPShhWzZdK2FbOV0pL3IsdFsyXT0uMjUqciksdH0sby5mcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdLGw9YVsyXSxlPWFbM10sTT1vK28scz11K3UsaT1sK2wsYz1vKk0saD1vKnMsUz1vKmksST11KnMsZj11KmkseD1sKmksRD1lKk0sRj1lKnMsbT1lKmksZD1yWzBdLGI9clsxXSx2PXJbMl07cmV0dXJuIHRbMF09KDEtKEkreCkpKmQsdFsxXT0oaCttKSpkLHRbMl09KFMtRikqZCx0WzNdPTAsdFs0XT0oaC1tKSpiLHRbNV09KDEtKGMreCkpKmIsdFs2XT0oZitEKSpiLHRbN109MCx0WzhdPShTK0YpKnYsdFs5XT0oZi1EKSp2LHRbMTBdPSgxLShjK0kpKSp2LHRbMTFdPTAsdFsxMl09blswXSx0WzEzXT1uWzFdLHRbMTRdPW5bMl0sdFsxNV09MSx0fSxvLmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVPcmlnaW49ZnVuY3Rpb24odCxhLG4scixvKXtcbiAgICB2YXIgdT1hWzBdLGw9YVsxXSxlPWFbMl0sTT1hWzNdLHM9dSt1LGk9bCtsLGM9ZStlLGg9dSpzLFM9dSppLEk9dSpjLGY9bCppLHg9bCpjLEQ9ZSpjLEY9TSpzLG09TSppLGQ9TSpjLGI9clswXSx2PXJbMV0sej1yWzJdLHA9b1swXSx3PW9bMV0sRT1vWzJdO3JldHVybiB0WzBdPSgxLShmK0QpKSpiLHRbMV09KFMrZCkqYix0WzJdPShJLW0pKmIsdFszXT0wLHRbNF09KFMtZCkqdix0WzVdPSgxLShoK0QpKSp2LHRbNl09KHgrRikqdix0WzddPTAsdFs4XT0oSSttKSp6LHRbOV09KHgtRikqeix0WzEwXT0oMS0oaCtmKSkqeix0WzExXT0wLHRbMTJdPW5bMF0rcC0odFswXSpwK3RbNF0qdyt0WzhdKkUpLHRbMTNdPW5bMV0rdy0odFsxXSpwK3RbNV0qdyt0WzldKkUpLHRbMTRdPW5bMl0rRS0odFsyXSpwK3RbNl0qdyt0WzEwXSpFKSx0WzE1XT0xLHR9LG8uZnJvbVF1YXQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bituLGU9cityLE09bytvLHM9bipsLGk9cipsLGM9ciplLGg9bypsLFM9byplLEk9bypNLGY9dSpsLHg9dSplLEQ9dSpNO3JldHVybiB0WzBdPTEtYy1JLHRbMV09aStELHRbMl09aC14LHRbM109MCx0WzRdPWktRCx0WzVdPTEtcy1JLHRbNl09UytmLHRbN109MCx0WzhdPWgreCx0WzldPVMtZix0WzEwXT0xLXMtYyx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcnVzdHVtPWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwpe3ZhciBlPTEvKG4tYSksTT0xLyhvLXIpLHM9MS8odS1sKTtyZXR1cm4gdFswXT0yKnUqZSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0yKnUqTSx0WzZdPTAsdFs3XT0wLHRbOF09KG4rYSkqZSx0WzldPShvK3IpKk0sdFsxMF09KGwrdSkqcyx0WzExXT0tMSx0WzEyXT0wLHRbMTNdPTAsdFsxNF09bCp1KjIqcyx0WzE1XT0wLHR9LG8ucGVyc3BlY3RpdmU9ZnVuY3Rpb24odCxhLG4scixvKXt2YXIgdT0xL01hdGgudGFuKGEvMiksbD0xLyhyLW8pO3JldHVybiB0WzBdPXUvbix0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT11LHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0obytyKSpsLHRbMTFdPS0xLHRbMTJdPTAsdFsxM109MCx0WzE0XT0yKm8qcipsLHRbMTVdPTAsdH0sby5wZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldz1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1NYXRoLnRhbihhLnVwRGVncmVlcypNYXRoLlBJLzE4MCksdT1NYXRoLnRhbihhLmRvd25EZWdyZWVzKk1hdGguUEkvMTgwKSxsPU1hdGgudGFuKGEubGVmdERlZ3JlZXMqTWF0aC5QSS8xODApLGU9TWF0aC50YW4oYS5yaWdodERlZ3JlZXMqTWF0aC5QSS8xODApLE09Mi8obCtlKSxzPTIvKG8rdSk7cmV0dXJuIHRbMF09TSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT1zLHRbNl09MCx0WzddPTAsdFs4XT0tKChsLWUpKk0qLjUpLHRbOV09KG8tdSkqcyouNSx0WzEwXT1yLyhuLXIpLHRbMTFdPS0xLHRbMTJdPTAsdFsxM109MCx0WzE0XT1yKm4vKG4tciksdFsxNV09MCx0fSxvLm9ydGhvPWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwpe3ZhciBlPTEvKGEtbiksTT0xLyhyLW8pLHM9MS8odS1sKTtyZXR1cm4gdFswXT0tMiplLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPS0yKk0sdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTIqcyx0WzExXT0wLHRbMTJdPShhK24pKmUsdFsxM109KG8rcikqTSx0WzE0XT0obCt1KSpzLHRbMTVdPTEsdH0sby5sb29rQXQ9ZnVuY3Rpb24odCxhLG4sdSl7dmFyIGwsZSxNLHMsaSxjLGgsUyxJLGYseD1hWzBdLEQ9YVsxXSxGPWFbMl0sbT11WzBdLGQ9dVsxXSxiPXVbMl0sdj1uWzBdLHo9blsxXSxwPW5bMl07cmV0dXJuIE1hdGguYWJzKHgtdik8ci5FUFNJTE9OJiZNYXRoLmFicyhELXopPHIuRVBTSUxPTiYmTWF0aC5hYnMoRi1wKTxyLkVQU0lMT04/by5pZGVudGl0eSh0KTooaD14LXYsUz1ELXosST1GLXAsZj0xL01hdGguc3FydChoKmgrUypTK0kqSSksaCo9ZixTKj1mLEkqPWYsbD1kKkktYipTLGU9YipoLW0qSSxNPW0qUy1kKmgsZj1NYXRoLnNxcnQobCpsK2UqZStNKk0pLGY/KGY9MS9mLGwqPWYsZSo9ZixNKj1mKToobD0wLGU9MCxNPTApLHM9UypNLUkqZSxpPUkqbC1oKk0sYz1oKmUtUypsLGY9TWF0aC5zcXJ0KHMqcytpKmkrYypjKSxmPyhmPTEvZixzKj1mLGkqPWYsYyo9Zik6KHM9MCxpPTAsYz0wKSx0WzBdPWwsdFsxXT1zLHRbMl09aCx0WzNdPTAsdFs0XT1lLHRbNV09aSx0WzZdPVMsdFs3XT0wLHRbOF09TSx0WzldPWMsdFsxMF09SSx0WzExXT0wLHRbMTJdPS0obCp4K2UqRCtNKkYpLHRbMTNdPS0ocyp4K2kqRCtjKkYpLHRbMTRdPS0oaCp4K1MqRCtJKkYpLHRbMTVdPTEsdCl9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0NChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiLCBcIit0WzRdK1wiLCBcIit0WzVdK1wiLCBcIit0WzZdK1wiLCBcIit0WzddK1wiLCBcIit0WzhdK1wiLCBcIit0WzldK1wiLCBcIit0WzEwXStcIiwgXCIrdFsxMV0rXCIsIFwiK3RbMTJdK1wiLCBcIit0WzEzXStcIiwgXCIrdFsxNF0rXCIsIFwiK3RbMTVdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpK01hdGgucG93KHRbNF0sMikrTWF0aC5wb3codFs1XSwyKStNYXRoLnBvdyh0WzZdLDIpK01hdGgucG93KHRbN10sMikrTWF0aC5wb3codFs4XSwyKStNYXRoLnBvdyh0WzldLDIpK01hdGgucG93KHRbMTBdLDIpK01hdGgucG93KHRbMTFdLDIpK01hdGgucG93KHRbMTJdLDIpK01hdGgucG93KHRbMTNdLDIpK01hdGgucG93KHRbMTRdLDIpK01hdGgucG93KHRbMTVdLDIpKX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0WzRdPWFbNF0rbls0XSx0WzVdPWFbNV0rbls1XSx0WzZdPWFbNl0rbls2XSx0WzddPWFbN10rbls3XSx0WzhdPWFbOF0rbls4XSx0WzldPWFbOV0rbls5XSx0WzEwXT1hWzEwXStuWzEwXSx0WzExXT1hWzExXStuWzExXSx0WzEyXT1hWzEyXStuWzEyXSx0WzEzXT1hWzEzXStuWzEzXSx0WzE0XT1hWzE0XStuWzE0XSx0WzE1XT1hWzE1XStuWzE1XSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdFs0XT1hWzRdLW5bNF0sdFs1XT1hWzVdLW5bNV0sdFs2XT1hWzZdLW5bNl0sdFs3XT1hWzddLW5bN10sdFs4XT1hWzhdLW5bOF0sdFs5XT1hWzldLW5bOV0sdFsxMF09YVsxMF0tblsxMF0sdFsxMV09YVsxMV0tblsxMV0sdFsxMl09YVsxMl0tblsxMl0sdFsxM109YVsxM10tblsxM10sdFsxNF09YVsxNF0tblsxNF0sdFsxNV09YVsxNV0tblsxNV0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdFs0XT1hWzRdKm4sdFs1XT1hWzVdKm4sdFs2XT1hWzZdKm4sdFs3XT1hWzddKm4sdFs4XT1hWzhdKm4sdFs5XT1hWzldKm4sdFsxMF09YVsxMF0qbix0WzExXT1hWzExXSpuLHRbMTJdPWFbMTJdKm4sdFsxM109YVsxM10qbix0WzE0XT1hWzE0XSpuLHRbMTVdPWFbMTVdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0WzRdPWFbNF0rbls0XSpyLHRbNV09YVs1XStuWzVdKnIsdFs2XT1hWzZdK25bNl0qcix0WzddPWFbN10rbls3XSpyLHRbOF09YVs4XStuWzhdKnIsdFs5XT1hWzldK25bOV0qcix0WzEwXT1hWzEwXStuWzEwXSpyLHRbMTFdPWFbMTFdK25bMTFdKnIsdFsxMl09YVsxMl0rblsxMl0qcix0WzEzXT1hWzEzXStuWzEzXSpyLHRbMTRdPWFbMTRdK25bMTRdKnIsdFsxNV09YVsxNV0rblsxNV0qcix0fSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdJiZ0WzRdPT09YVs0XSYmdFs1XT09PWFbNV0mJnRbNl09PT1hWzZdJiZ0WzddPT09YVs3XSYmdFs4XT09PWFbOF0mJnRbOV09PT1hWzldJiZ0WzEwXT09PWFbMTBdJiZ0WzExXT09PWFbMTFdJiZ0WzEyXT09PWFbMTJdJiZ0WzEzXT09PWFbMTNdJiZ0WzE0XT09PWFbMTRdJiZ0WzE1XT09PWFbMTVdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT10WzRdLE09dFs1XSxzPXRbNl0saT10WzddLGM9dFs4XSxoPXRbOV0sUz10WzEwXSxJPXRbMTFdLGY9dFsxMl0seD10WzEzXSxEPXRbMTRdLEY9dFsxNV0sbT1hWzBdLGQ9YVsxXSxiPWFbMl0sdj1hWzNdLHo9YVs0XSxwPWFbNV0sdz1hWzZdLEU9YVs3XSxBPWFbOF0sUD1hWzldLEw9YVsxMF0scT1hWzExXSxSPWFbMTJdLE49YVsxM10sTz1hWzE0XSxZPWFbMTVdO3JldHVybiBNYXRoLmFicyhuLW0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhtKSkmJk1hdGguYWJzKG8tZCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGQpKSYmTWF0aC5hYnModS1iKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoYikpJiZNYXRoLmFicyhsLXYpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyh2KSkmJk1hdGguYWJzKGUteik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGUpLE1hdGguYWJzKHopKSYmTWF0aC5hYnMoTS1wKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoTSksTWF0aC5hYnMocCkpJiZNYXRoLmFicyhzLXcpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhzKSxNYXRoLmFicyh3KSkmJk1hdGguYWJzKGktRSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGkpLE1hdGguYWJzKEUpKSYmTWF0aC5hYnMoYy1BKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoYyksTWF0aC5hYnMoQSkpJiZNYXRoLmFicyhoLVApPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhoKSxNYXRoLmFicyhQKSkmJk1hdGguYWJzKFMtTCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKFMpLE1hdGguYWJzKEwpKSYmTWF0aC5hYnMoSS1xKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoSSksTWF0aC5hYnMocSkpJiZNYXRoLmFicyhmLVIpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhmKSxNYXRoLmFicyhSKSkmJk1hdGguYWJzKHgtTik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHgpLE1hdGguYWJzKE4pKSYmTWF0aC5hYnMoRC1PKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoRCksTWF0aC5hYnMoTykpJiZNYXRoLmFicyhGLVkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhGKSxNYXRoLmFicyhZKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPW4oNCksdT1uKDcpLGw9big4KSxlPXt9O2UuY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LGUucm90YXRpb25Ubz1mdW5jdGlvbigpe3ZhciB0PXUuY3JlYXRlKCksYT11LmZyb21WYWx1ZXMoMSwwLDApLG49dS5mcm9tVmFsdWVzKDAsMSwwKTtyZXR1cm4gZnVuY3Rpb24ocixvLGwpe3ZhciBNPXUuZG90KG8sbCk7cmV0dXJuLS45OTk5OTk+TT8odS5jcm9zcyh0LGEsbyksdS5sZW5ndGgodCk8MWUtNiYmdS5jcm9zcyh0LG4sbyksdS5ub3JtYWxpemUodCx0KSxlLnNldEF4aXNBbmdsZShyLHQsTWF0aC5QSSkscik6TT4uOTk5OTk5PyhyWzBdPTAsclsxXT0wLHJbMl09MCxyWzNdPTEscik6KHUuY3Jvc3ModCxvLGwpLHJbMF09dFswXSxyWzFdPXRbMV0sclsyXT10WzJdLHJbM109MStNLGUubm9ybWFsaXplKHIscikpfX0oKSxlLnNldEF4ZXM9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvKXtyZXR1cm4gdFswXT1yWzBdLHRbM109clsxXSx0WzZdPXJbMl0sdFsxXT1vWzBdLHRbNF09b1sxXSx0WzddPW9bMl0sdFsyXT0tblswXSx0WzVdPS1uWzFdLHRbOF09LW5bMl0sZS5ub3JtYWxpemUoYSxlLmZyb21NYXQzKGEsdCkpfX0oKSxlLmNsb25lPWwuY2xvbmUsZS5mcm9tVmFsdWVzPWwuZnJvbVZhbHVlcyxlLmNvcHk9bC5jb3B5LGUuc2V0PWwuc2V0LGUuaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxlLnNldEF4aXNBbmdsZT1mdW5jdGlvbih0LGEsbil7bj0uNSpuO3ZhciByPU1hdGguc2luKG4pO3JldHVybiB0WzBdPXIqYVswXSx0WzFdPXIqYVsxXSx0WzJdPXIqYVsyXSx0WzNdPU1hdGguY29zKG4pLHR9LGUuZ2V0QXhpc0FuZ2xlPWZ1bmN0aW9uKHQsYSl7dmFyIG49MipNYXRoLmFjb3MoYVszXSkscj1NYXRoLnNpbihuLzIpO3JldHVybiAwIT1yPyh0WzBdPWFbMF0vcix0WzFdPWFbMV0vcix0WzJdPWFbMl0vcik6KHRbMF09MSx0WzFdPTAsdFsyXT0wKSxufSxlLmFkZD1sLmFkZCxlLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9blswXSxNPW5bMV0scz1uWzJdLGk9blszXTtyZXR1cm4gdFswXT1yKmkrbCplK28qcy11Kk0sdFsxXT1vKmkrbCpNK3UqZS1yKnMsdFsyXT11KmkrbCpzK3IqTS1vKmUsdFszXT1sKmktciplLW8qTS11KnMsdH0sZS5tdWw9ZS5tdWx0aXBseSxlLnNjYWxlPWwuc2NhbGUsZS5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuKXtuKj0uNTt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0rbCplLHRbMV09bypNK3UqZSx0WzJdPXUqTS1vKmUsdFszXT1sKk0tciplLHR9LGUucm90YXRlWT1mdW5jdGlvbih0LGEsbil7bio9LjU7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNLXUqZSx0WzFdPW8qTStsKmUsdFsyXT11Kk0rciplLHRbM109bCpNLW8qZSx0fSxlLnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4pe24qPS41O3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTStvKmUsdFsxXT1vKk0tciplLHRbMl09dSpNK2wqZSx0WzNdPWwqTS11KmUsdH0sZS5jYWxjdWxhdGVXPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdO3JldHVybiB0WzBdPW4sdFsxXT1yLHRbMl09byx0WzNdPU1hdGguc3FydChNYXRoLmFicygxLW4qbi1yKnItbypvKSksdH0sZS5kb3Q9bC5kb3QsZS5sZXJwPWwubGVycCxlLnNsZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvLHUsbCxlLE0scz1hWzBdLGk9YVsxXSxjPWFbMl0saD1hWzNdLFM9blswXSxJPW5bMV0sZj1uWzJdLHg9blszXTtyZXR1cm4gdT1zKlMraSpJK2MqZitoKngsMD51JiYodT0tdSxTPS1TLEk9LUksZj0tZix4PS14KSwxLXU+MWUtNj8obz1NYXRoLmFjb3ModSksbD1NYXRoLnNpbihvKSxlPU1hdGguc2luKCgxLXIpKm8pL2wsTT1NYXRoLnNpbihyKm8pL2wpOihlPTEtcixNPXIpLHRbMF09ZSpzK00qUyx0WzFdPWUqaStNKkksdFsyXT1lKmMrTSpmLHRbM109ZSpoK00qeCx0fSxlLnNxbGVycD1mdW5jdGlvbigpe3ZhciB0PWUuY3JlYXRlKCksYT1lLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihuLHIsbyx1LGwsTSl7cmV0dXJuIGUuc2xlcnAodCxyLGwsTSksZS5zbGVycChhLG8sdSxNKSxlLnNsZXJwKG4sdCxhLDIqTSooMS1NKSksbn19KCksZS5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bipuK3IqcitvKm8rdSp1LGU9bD8xL2w6MDtyZXR1cm4gdFswXT0tbiplLHRbMV09LXIqZSx0WzJdPS1vKmUsdFszXT11KmUsdH0sZS5jb25qdWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdFszXT1hWzNdLHR9LGUubGVuZ3RoPWwubGVuZ3RoLGUubGVuPWUubGVuZ3RoLGUuc3F1YXJlZExlbmd0aD1sLnNxdWFyZWRMZW5ndGgsZS5zcXJMZW49ZS5zcXVhcmVkTGVuZ3RoLGUubm9ybWFsaXplPWwubm9ybWFsaXplLGUuZnJvbU1hdDM9ZnVuY3Rpb24odCxhKXt2YXIgbixyPWFbMF0rYVs0XSthWzhdO2lmKHI+MCluPU1hdGguc3FydChyKzEpLHRbM109LjUqbixuPS41L24sdFswXT0oYVs1XS1hWzddKSpuLHRbMV09KGFbNl0tYVsyXSkqbix0WzJdPShhWzFdLWFbM10pKm47ZWxzZXt2YXIgbz0wO2FbNF0+YVswXSYmKG89MSksYVs4XT5hWzMqbytvXSYmKG89Mik7dmFyIHU9KG8rMSklMyxsPShvKzIpJTM7bj1NYXRoLnNxcnQoYVszKm8rb10tYVszKnUrdV0tYVszKmwrbF0rMSksdFtvXT0uNSpuLG49LjUvbix0WzNdPShhWzMqdStsXS1hWzMqbCt1XSkqbix0W3VdPShhWzMqdStvXSthWzMqbyt1XSkqbix0W2xdPShhWzMqbCtvXSthWzMqbytsXSkqbn1yZXR1cm4gdH0sZS5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJxdWF0KFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIpXCJ9LGUuZXhhY3RFcXVhbHM9bC5leGFjdEVxdWFscyxlLmVxdWFscz1sLmVxdWFscyx0LmV4cG9ydHM9ZX0sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoMyk7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSgzKTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYX0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgbz1uZXcgci5BUlJBWV9UWVBFKDMpO3JldHVybiBvWzBdPXQsb1sxXT1hLG9bMl09bixvfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHR9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuWzBdLHRbMV09YVsxXSpuWzFdLHRbMl09YVsyXSpuWzJdLHR9LG8ubXVsPW8ubXVsdGlwbHksby5kaXZpZGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0vblswXSx0WzFdPWFbMV0vblsxXSx0WzJdPWFbMl0vblsyXSx0fSxvLmRpdj1vLmRpdmlkZSxvLmNlaWw9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmNlaWwoYVswXSksdFsxXT1NYXRoLmNlaWwoYVsxXSksdFsyXT1NYXRoLmNlaWwoYVsyXSksdH0sby5mbG9vcj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguZmxvb3IoYVswXSksdFsxXT1NYXRoLmZsb29yKGFbMV0pLHRbMl09TWF0aC5mbG9vcihhWzJdKSx0fSxvLm1pbj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5taW4oYVswXSxuWzBdKSx0WzFdPU1hdGgubWluKGFbMV0sblsxXSksdFsyXT1NYXRoLm1pbihhWzJdLG5bMl0pLHR9LG8ubWF4PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1heChhWzBdLG5bMF0pLHRbMV09TWF0aC5tYXgoYVsxXSxuWzFdKSx0WzJdPU1hdGgubWF4KGFbMl0sblsyXSksdH0sby5yb3VuZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGgucm91bmQoYVswXSksdFsxXT1NYXRoLnJvdW5kKGFbMV0pLHRbMl09TWF0aC5yb3VuZChhWzJdKSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdH0sby5zY2FsZUFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdH0sby5kaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXTtyZXR1cm4gTWF0aC5zcXJ0KG4qbityKnIrbypvKX0sby5kaXN0PW8uZGlzdGFuY2Usby5zcXVhcmVkRGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl07cmV0dXJuIG4qbityKnIrbypvfSxvLnNxckRpc3Q9by5zcXVhcmVkRGlzdGFuY2Usby5sZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdO3JldHVybiBNYXRoLnNxcnQoYSphK24qbityKnIpfSxvLmxlbj1vLmxlbmd0aCxvLnNxdWFyZWRMZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdO3JldHVybiBhKmErbipuK3Iqcn0sby5zcXJMZW49by5zcXVhcmVkTGVuZ3RoLG8ubmVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHR9LG8uaW52ZXJzZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEvYVswXSx0WzFdPTEvYVsxXSx0WzJdPTEvYVsyXSx0fSxvLm5vcm1hbGl6ZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PW4qbityKnIrbypvO3JldHVybiB1PjAmJih1PTEvTWF0aC5zcXJ0KHUpLHRbMF09YVswXSp1LHRbMV09YVsxXSp1LHRbMl09YVsyXSp1KSx0fSxvLmRvdD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdKmFbMF0rdFsxXSphWzFdK3RbMl0qYVsyXX0sby5jcm9zcz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blswXSxlPW5bMV0sTT1uWzJdO3JldHVybiB0WzBdPW8qTS11KmUsdFsxXT11KmwtcipNLHRbMl09ciplLW8qbCx0fSxvLmxlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV0sbD1hWzJdO3JldHVybiB0WzBdPW8rciooblswXS1vKSx0WzFdPXUrciooblsxXS11KSx0WzJdPWwrciooblsyXS1sKSx0fSxvLmhlcm1pdGU9ZnVuY3Rpb24odCxhLG4scixvLHUpe3ZhciBsPXUqdSxlPWwqKDIqdS0zKSsxLE09bCoodS0yKSt1LHM9bCoodS0xKSxpPWwqKDMtMip1KTtyZXR1cm4gdFswXT1hWzBdKmUrblswXSpNK3JbMF0qcytvWzBdKmksdFsxXT1hWzFdKmUrblsxXSpNK3JbMV0qcytvWzFdKmksdFsyXT1hWzJdKmUrblsyXSpNK3JbMl0qcytvWzJdKmksdH0sby5iZXppZXI9ZnVuY3Rpb24odCxhLG4scixvLHUpe3ZhciBsPTEtdSxlPWwqbCxNPXUqdSxzPWUqbCxpPTMqdSplLGM9MypNKmwsaD1NKnU7cmV0dXJuIHRbMF09YVswXSpzK25bMF0qaStyWzBdKmMrb1swXSpoLHRbMV09YVsxXSpzK25bMV0qaStyWzFdKmMrb1sxXSpoLHRbMl09YVsyXSpzK25bMl0qaStyWzJdKmMrb1syXSpoLHR9LG8ucmFuZG9tPWZ1bmN0aW9uKHQsYSl7YT1hfHwxO3ZhciBuPTIqci5SQU5ET00oKSpNYXRoLlBJLG89MipyLlJBTkRPTSgpLTEsdT1NYXRoLnNxcnQoMS1vKm8pKmE7cmV0dXJuIHRbMF09TWF0aC5jb3MobikqdSx0WzFdPU1hdGguc2luKG4pKnUsdFsyXT1vKmEsdH0sby50cmFuc2Zvcm1NYXQ0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1uWzNdKnIrbls3XSpvK25bMTFdKnUrblsxNV07cmV0dXJuIGw9bHx8MSx0WzBdPShuWzBdKnIrbls0XSpvK25bOF0qdStuWzEyXSkvbCx0WzFdPShuWzFdKnIrbls1XSpvK25bOV0qdStuWzEzXSkvbCx0WzJdPShuWzJdKnIrbls2XSpvK25bMTBdKnUrblsxNF0pL2wsdH0sby50cmFuc2Zvcm1NYXQzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl07cmV0dXJuIHRbMF09cipuWzBdK28qblszXSt1Km5bNl0sdFsxXT1yKm5bMV0rbypuWzRdK3Uqbls3XSx0WzJdPXIqblsyXStvKm5bNV0rdSpuWzhdLHR9LG8udHJhbnNmb3JtUXVhdD1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blswXSxlPW5bMV0sTT1uWzJdLHM9blszXSxpPXMqcitlKnUtTSpvLGM9cypvK00qci1sKnUsaD1zKnUrbCpvLWUqcixTPS1sKnItZSpvLU0qdTtyZXR1cm4gdFswXT1pKnMrUyotbCtjKi1NLWgqLWUsdFsxXT1jKnMrUyotZStoKi1sLWkqLU0sdFsyXT1oKnMrUyotTStpKi1lLWMqLWwsdH0sby5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPVtdLHU9W107cmV0dXJuIG9bMF09YVswXS1uWzBdLG9bMV09YVsxXS1uWzFdLG9bMl09YVsyXS1uWzJdLHVbMF09b1swXSx1WzFdPW9bMV0qTWF0aC5jb3Mociktb1syXSpNYXRoLnNpbihyKSx1WzJdPW9bMV0qTWF0aC5zaW4ocikrb1syXSpNYXRoLmNvcyhyKSx0WzBdPXVbMF0rblswXSx0WzFdPXVbMV0rblsxXSx0WzJdPXVbMl0rblsyXSx0fSxvLnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89W10sdT1bXTtyZXR1cm4gb1swXT1hWzBdLW5bMF0sb1sxXT1hWzFdLW5bMV0sb1syXT1hWzJdLW5bMl0sdVswXT1vWzJdKk1hdGguc2luKHIpK29bMF0qTWF0aC5jb3MociksdVsxXT1vWzFdLHVbMl09b1syXSpNYXRoLmNvcyhyKS1vWzBdKk1hdGguc2luKHIpLHRbMF09dVswXStuWzBdLHRbMV09dVsxXStuWzFdLHRbMl09dVsyXStuWzJdLHR9LG8ucm90YXRlWj1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1bXSx1PVtdO3JldHVybiBvWzBdPWFbMF0tblswXSxvWzFdPWFbMV0tblsxXSxvWzJdPWFbMl0tblsyXSx1WzBdPW9bMF0qTWF0aC5jb3Mociktb1sxXSpNYXRoLnNpbihyKSx1WzFdPW9bMF0qTWF0aC5zaW4ocikrb1sxXSpNYXRoLmNvcyhyKSx1WzJdPW9bMl0sdFswXT11WzBdK25bMF0sdFsxXT11WzFdK25bMV0sdFsyXT11WzJdK25bMl0sdH0sby5mb3JFYWNoPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyx1LGwpe3ZhciBlLE07Zm9yKG58fChuPTMpLHJ8fChyPTApLE09bz9NYXRoLm1pbihvKm4rcixhLmxlbmd0aCk6YS5sZW5ndGgsZT1yO00+ZTtlKz1uKXRbMF09YVtlXSx0WzFdPWFbZSsxXSx0WzJdPWFbZSsyXSx1KHQsdCxsKSxhW2VdPXRbMF0sYVtlKzFdPXRbMV0sYVtlKzJdPXRbMl07cmV0dXJuIGF9fSgpLG8uYW5nbGU9ZnVuY3Rpb24odCxhKXt2YXIgbj1vLmZyb21WYWx1ZXModFswXSx0WzFdLHRbMl0pLHI9by5mcm9tVmFsdWVzKGFbMF0sYVsxXSxhWzJdKTtvLm5vcm1hbGl6ZShuLG4pLG8ubm9ybWFsaXplKHIscik7dmFyIHU9by5kb3QobixyKTtyZXR1cm4gdT4xPzA6TWF0aC5hY29zKHUpfSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInZlYzMoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIilcIn0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPWFbMF0sZT1hWzFdLE09YVsyXTtyZXR1cm4gTWF0aC5hYnMobi1sKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMobCkpJiZNYXRoLmFicyhvLWUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhlKSkmJk1hdGguYWJzKHUtTSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKE0pKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0WzNdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYX0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8pe3ZhciB1PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHVbMF09dCx1WzFdPWEsdVsyXT1uLHVbM109byx1fSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHR9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0fSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qblswXSx0WzFdPWFbMV0qblsxXSx0WzJdPWFbMl0qblsyXSx0WzNdPWFbM10qblszXSx0fSxvLm11bD1vLm11bHRpcGx5LG8uZGl2aWRlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdL25bMF0sdFsxXT1hWzFdL25bMV0sdFsyXT1hWzJdL25bMl0sdFszXT1hWzNdL25bM10sdH0sby5kaXY9by5kaXZpZGUsby5jZWlsPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5jZWlsKGFbMF0pLHRbMV09TWF0aC5jZWlsKGFbMV0pLHRbMl09TWF0aC5jZWlsKGFbMl0pLHRbM109TWF0aC5jZWlsKGFbM10pLHR9LG8uZmxvb3I9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmZsb29yKGFbMF0pLHRbMV09TWF0aC5mbG9vcihhWzFdKSx0WzJdPU1hdGguZmxvb3IoYVsyXSksdFszXT1NYXRoLmZsb29yKGFbM10pLHR9LG8ubWluPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1pbihhWzBdLG5bMF0pLHRbMV09TWF0aC5taW4oYVsxXSxuWzFdKSx0WzJdPU1hdGgubWluKGFbMl0sblsyXSksdFszXT1NYXRoLm1pbihhWzNdLG5bM10pLHR9LG8ubWF4PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1heChhWzBdLG5bMF0pLHRbMV09TWF0aC5tYXgoYVsxXSxuWzFdKSx0WzJdPU1hdGgubWF4KGFbMl0sblsyXSksdFszXT1NYXRoLm1heChhWzNdLG5bM10pLHR9LG8ucm91bmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLnJvdW5kKGFbMF0pLHRbMV09TWF0aC5yb3VuZChhWzFdKSx0WzJdPU1hdGgucm91bmQoYVsyXSksdFszXT1NYXRoLnJvdW5kKGFbM10pLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0fSxvLnNjYWxlQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHR9LG8uZGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl0sdT1hWzNdLXRbM107cmV0dXJuIE1hdGguc3FydChuKm4rcipyK28qbyt1KnUpfSxvLmRpc3Q9by5kaXN0YW5jZSxvLnNxdWFyZWREaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXSx1PWFbM10tdFszXTtyZXR1cm4gbipuK3IqcitvKm8rdSp1fSxvLnNxckRpc3Q9by5zcXVhcmVkRGlzdGFuY2Usby5sZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXTtyZXR1cm4gTWF0aC5zcXJ0KGEqYStuKm4rcipyK28qbyl9LG8ubGVuPW8ubGVuZ3RoLG8uc3F1YXJlZExlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdO3JldHVybiBhKmErbipuK3IqcitvKm99LG8uc3FyTGVuPW8uc3F1YXJlZExlbmd0aCxvLm5lZ2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0WzNdPS1hWzNdLHR9LG8uaW52ZXJzZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEvYVswXSx0WzFdPTEvYVsxXSx0WzJdPTEvYVsyXSx0WzNdPTEvYVszXSx0fSxvLm5vcm1hbGl6ZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uKm4rcipyK28qbyt1KnU7cmV0dXJuIGw+MCYmKGw9MS9NYXRoLnNxcnQobCksdFswXT1uKmwsdFsxXT1yKmwsdFsyXT1vKmwsdFszXT11KmwpLHR9LG8uZG90PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF0qYVswXSt0WzFdKmFbMV0rdFsyXSphWzJdK3RbM10qYVszXX0sby5sZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdLGw9YVsyXSxlPWFbM107cmV0dXJuIHRbMF09bytyKihuWzBdLW8pLHRbMV09dStyKihuWzFdLXUpLHRbMl09bCtyKihuWzJdLWwpLHRbM109ZStyKihuWzNdLWUpLHR9LG8ucmFuZG9tPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIGE9YXx8MSx0WzBdPXIuUkFORE9NKCksdFsxXT1yLlJBTkRPTSgpLHRbMl09ci5SQU5ET00oKSx0WzNdPXIuUkFORE9NKCksby5ub3JtYWxpemUodCx0KSxvLnNjYWxlKHQsdCxhKSx0fSxvLnRyYW5zZm9ybU1hdDQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM107cmV0dXJuIHRbMF09blswXSpyK25bNF0qbytuWzhdKnUrblsxMl0qbCx0WzFdPW5bMV0qcituWzVdKm8rbls5XSp1K25bMTNdKmwsdFsyXT1uWzJdKnIrbls2XSpvK25bMTBdKnUrblsxNF0qbCx0WzNdPW5bM10qcituWzddKm8rblsxMV0qdStuWzE1XSpsLHR9LG8udHJhbnNmb3JtUXVhdD1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blswXSxlPW5bMV0sTT1uWzJdLHM9blszXSxpPXMqcitlKnUtTSpvLGM9cypvK00qci1sKnUsaD1zKnUrbCpvLWUqcixTPS1sKnItZSpvLU0qdTtyZXR1cm4gdFswXT1pKnMrUyotbCtjKi1NLWgqLWUsdFsxXT1jKnMrUyotZStoKi1sLWkqLU0sdFsyXT1oKnMrUyotTStpKi1lLWMqLWwsdFszXT1hWzNdLHR9LG8uZm9yRWFjaD1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8sdSxsKXt2YXIgZSxNO2ZvcihufHwobj00KSxyfHwocj0wKSxNPW8/TWF0aC5taW4obypuK3IsYS5sZW5ndGgpOmEubGVuZ3RoLGU9cjtNPmU7ZSs9bil0WzBdPWFbZV0sdFsxXT1hW2UrMV0sdFsyXT1hW2UrMl0sdFszXT1hW2UrM10sdSh0LHQsbCksYVtlXT10WzBdLGFbZSsxXT10WzFdLGFbZSsyXT10WzJdLGFbZSszXT10WzNdO3JldHVybiBhfX0oKSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInZlYzQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIilcIn0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9YVswXSxNPWFbMV0scz1hWzJdLGk9YVszXTtyZXR1cm4gTWF0aC5hYnMobi1lKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMoZSkpJiZNYXRoLmFicyhvLU0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhNKSkmJk1hdGguYWJzKHUtcyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKHMpKSYmTWF0aC5hYnMobC1pKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoaSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoMik7cmV0dXJuIHRbMF09MCx0WzFdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDIpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGF9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEpe3ZhciBuPW5ldyByLkFSUkFZX1RZUEUoMik7cmV0dXJuIG5bMF09dCxuWzFdPWEsbn0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWEsdFsxXT1uLHR9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuWzBdLHRbMV09YVsxXSpuWzFdLHR9LG8ubXVsPW8ubXVsdGlwbHksby5kaXZpZGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0vblswXSx0WzFdPWFbMV0vblsxXSx0fSxvLmRpdj1vLmRpdmlkZSxvLmNlaWw9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmNlaWwoYVswXSksdFsxXT1NYXRoLmNlaWwoYVsxXSksdH0sby5mbG9vcj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguZmxvb3IoYVswXSksdFsxXT1NYXRoLmZsb29yKGFbMV0pLHR9LG8ubWluPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1pbihhWzBdLG5bMF0pLHRbMV09TWF0aC5taW4oYVsxXSxuWzFdKSx0fSxvLm1heD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5tYXgoYVswXSxuWzBdKSx0WzFdPU1hdGgubWF4KGFbMV0sblsxXSksdH0sby5yb3VuZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGgucm91bmQoYVswXSksdFsxXT1NYXRoLnJvdW5kKGFbMV0pLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0fSxvLnNjYWxlQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdH0sby5kaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXTtyZXR1cm4gTWF0aC5zcXJ0KG4qbityKnIpfSxvLmRpc3Q9by5kaXN0YW5jZSxvLnNxdWFyZWREaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXTtyZXR1cm4gbipuK3Iqcn0sby5zcXJEaXN0PW8uc3F1YXJlZERpc3RhbmNlLG8ubGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdO3JldHVybiBNYXRoLnNxcnQoYSphK24qbil9LG8ubGVuPW8ubGVuZ3RoLG8uc3F1YXJlZExlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXTtyZXR1cm4gYSphK24qbn0sby5zcXJMZW49by5zcXVhcmVkTGVuZ3RoLG8ubmVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0fSxvLmludmVyc2U9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xL2FbMF0sdFsxXT0xL2FbMV0sdH0sby5ub3JtYWxpemU9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPW4qbityKnI7cmV0dXJuIG8+MCYmKG89MS9NYXRoLnNxcnQobyksdFswXT1hWzBdKm8sdFsxXT1hWzFdKm8pLHR9LG8uZG90PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF0qYVswXSt0WzFdKmFbMV19LG8uY3Jvc3M9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0qblsxXS1hWzFdKm5bMF07cmV0dXJuIHRbMF09dFsxXT0wLHRbMl09cix0fSxvLmxlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV07cmV0dXJuIHRbMF09bytyKihuWzBdLW8pLHRbMV09dStyKihuWzFdLXUpLHR9LG8ucmFuZG9tPWZ1bmN0aW9uKHQsYSl7YT1hfHwxO3ZhciBuPTIqci5SQU5ET00oKSpNYXRoLlBJO3JldHVybiB0WzBdPU1hdGguY29zKG4pKmEsdFsxXT1NYXRoLnNpbihuKSphLHR9LG8udHJhbnNmb3JtTWF0Mj1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bMl0qbyx0WzFdPW5bMV0qcituWzNdKm8sdH0sby50cmFuc2Zvcm1NYXQyZD1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bMl0qbytuWzRdLHRbMV09blsxXSpyK25bM10qbytuWzVdLHR9LG8udHJhbnNmb3JtTWF0Mz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bM10qbytuWzZdLHRbMV09blsxXSpyK25bNF0qbytuWzddLHR9LG8udHJhbnNmb3JtTWF0ND1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bNF0qbytuWzEyXSx0WzFdPW5bMV0qcituWzVdKm8rblsxM10sdH0sby5mb3JFYWNoPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyx1LGwpe3ZhciBlLE07Zm9yKG58fChuPTIpLHJ8fChyPTApLE09bz9NYXRoLm1pbihvKm4rcixhLmxlbmd0aCk6YS5sZW5ndGgsZT1yO00+ZTtlKz1uKXRbMF09YVtlXSx0WzFdPWFbZSsxXSx1KHQsdCxsKSxhW2VdPXRbMF0sYVtlKzFdPXRbMV07cmV0dXJuIGF9fSgpLG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwidmVjMihcIit0WzBdK1wiLCBcIit0WzFdK1wiKVwifSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PWFbMF0sbD1hWzFdO3JldHVybiBNYXRoLmFicyhuLXUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyh1KSkmJk1hdGguYWJzKG8tbCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGwpKX0sdC5leHBvcnRzPW99XSl9KTsiLCIvKipcbiAqIENhbnZhcyBSZW5kZXJpbmcgU3VyZmFjZS5cbiAqIEl0IGlzIGEgdG9wIGxldmVsIGNvbXBvbmVudCB0aGF0IGNvbWJpbmVzIGl0IGFsbCB0b2dldGhlciBhbmQgaGlkZXMgdW5uZWNlc3NhcnkgZGV0YWlscy5cbiAqXG4gKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNTdXJmYWNlKGNhbnZhcylcbntcbiAgICBpZiAoICEgKGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGFzc2VkIGNhbnZhcyBpcyBub3QgSFRNTENhbnZhc0VsZW1lbnQhJyk7XG4gICAgfVxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuZmFjdG9yeSA9IG5ldyBDYW52YXNVSUZhY3RvcnkodGhpcy5jb250ZXh0KTtcbiAgICB0aGlzLmVsZW1lbnRzID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKHRoaXMuZmFjdG9yeS5jcmVhdGVMYWJlbCgpKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlciA9IG5ldyBDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyKHRoaXMpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLmJpbmRIdG1sQ2FudmFzRXZlbnRzKCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGEgZmxhZyBmb3IgZGV0ZWN0aW5nIGlmIHdlIGFyZSBleHBvcnRpbmdcbiAgICAgKiByZXN1bHQgaW1hZ2UgYXMgZmluYWwgdGV4dHVyZS5cbiAgICAgKlxuICAgICAqIElmIHRoaXMgaXMgdHJ1ZSwgdGhlbiB3ZSBzaG91bGRuJ3Qgc2hvdyBhbnlcbiAgICAgKiBzZWxlY3Rpb24gYm9yZGVyc1xuICAgICAqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5jbGVhckNvbG9yID0gJyNGRkZGRkYnO1xufVxuXG4vKipcbiAqIFJldHVybnMgVUlDb2xsZWN0aW9uIHJlbGF0ZWQgdG8gdGhlIHN1cmZhY2UuXG4gKiBcbiAqIEByZXR1cm5zIHtVSUNvbGxlY3Rpb259XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBsYWJlbCBlbGVtZW50IGluIHVpIGNvbGxlY3Rpb24gb2YgdGhlIHN1cmZhY2UgYW5kIHJldHVybnMgaXQuXG4gKiBcbiAqIEByZXR1cm5zIHtVSUxhYmVsRWxlbWVudH1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucHVzaExhYmVsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYWJlbCA9IHRoaXMuZmFjdG9yeS5jcmVhdGVMYWJlbCgpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKGxhYmVsKTtcbiAgICB0aGlzLmVsZW1lbnRzLnNlbGVjdExhc3QoKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJTZWxlY3QobGFiZWwpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGltYWdlIGVsZW1lbnQgaW4gdWkgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnB1c2hJbWFnZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgIHZhciBpbWFnZUVsZW1lbnQgPSB0aGlzLmZhY3RvcnkuY3JlYXRlSW1hZ2UoaW1hZ2UpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKGltYWdlRWxlbWVudCk7XG4gICAgdGhpcy5lbGVtZW50cy5zZWxlY3RMYXN0KCk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyU2VsZWN0KGltYWdlRWxlbWVudCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENsZWFyIHRoZSByZWxhdGVkIGNhbnZhcy5cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY2xlYXJDb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNsZWFyIGNvbG9yXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgdGhpcy5jbGVhckNvbG9yID0gY29sb3I7XG59O1xuXG4vKipcbiAqIFJlbmRlcnMgYWxsIG9mIHRoZSBlbGVtZW50cyBvbiB0aGUgc3VyZmFjZS5cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGVjdGVkSW5kZXggPSB0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5nZXQoaSkucmVuZGVyKCk7XG5cbiAgICAgICAgaWYgKGkgPT0gc2VsZWN0ZWRJbmRleCAmJiAhIHRoaXMuX2lzRXhwb3J0aW5nUmVuZGVyKSB7XG5cbiAgICAgICAgICAgIC8vIFdlIGNhbGwgaXQgJ2tvc3R5bCdcbiAgICAgICAgICAgIC8vIFdlaXJkIHdheSB0byBzZXQgY29sb3JcbiAgICAgICAgICAgIHZhciBjb2xvciA9ICcjZmZmZmZmJztcbiAgICAgICAgICAgIGlmICh0aGlzLmNsZWFyQ29sb3IudG9Mb3dlckNhc2UoKSA9PSAnI2ZmZmZmZicpIHtcbiAgICAgICAgICAgICAgICBjb2xvciA9ICcjMmU2ZGE0JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3IENhbnZhc1VJU2VsZWN0ZWRWaWV3KHRoaXMuY29udGV4dCwge1xuICAgICAgICAgICAgICAgIC8vIGtpbmRhIGZlZWxzIGxpa2UgaGFyZCBjb2RlXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICAgIHNpemU6IDE1XG4gICAgICAgICAgICB9KS5yZW5kZXIodGhpcy5lbGVtZW50cy5nZXQoaSkpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBDbGVhcnMgdGhlIHN1cmZhY2UgYW5kIHJlbmRlcnMgaXQgd2l0aCBhbGwgZWxlbWVudHMuXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5yZW5kZXJFbGVtZW50cygpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gaW1hZ2UgZnJvbSBkcmF3biBjb250ZW50XG4gKiBAcmV0dXJucyB7SW1hZ2V9XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnRvSW1hZ2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlciA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLnNyYyA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgpO1xuXG4gICAgdGhpcy5faXNFeHBvcnRpbmdSZW5kZXIgPSBmYWxzZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgcmV0dXJuIGltYWdlO1xufTtcblxuLyoqXG4gKiBNb3ZlcyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudCB0byB0aGUgYmFja2dyb3VuZFxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5zZWxlY3RlZFRvQmFja2dyb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVsZW1lbnRzLnRvU3RhcnQodGhpcy5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCkpO1xufTtcblxuLyoqXG4gKiBNb3ZlcyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudCB0byB0aGUgZm9yZWdyb3VuZFxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5zZWxlY3RlZFRvRm9yZWdyb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVsZW1lbnRzLnRvRW5kKHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudFxuICpcbiAqIEByZXR1cm4ge1VJRWxlbWVudH1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVtb3ZlU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzLnJlbW92ZSh0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlc2VsZWN0KCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQWRkcyBuZXcgZXZlbnQgaGFuZGxlciBvbiBzZWxlY3Rpb24gb2YgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7VUlTZWxlY3RlZENhbGxiYWNrfSBjYWxsYmFja1xuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5hZGRTZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5hZGRTZWxlY3RFdmVudEhhbmRsZXIoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5hZGREZXNlbGVjdEV2ZW50SGFuZGxlcihjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEdldCBjYW52YXMgYm91bmQgcmVjdGFuZ2xlLlxuICogS2luZGEgdWdseSBtZXRob2QuXG4gKlxuICogQHJldHVybnMge3t0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIGxlZnQ6IG51bWJlcn19XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHJpZ2h0OiB0aGlzLmNhbnZhcy53aWR0aCxcbiAgICAgICAgYm90dG9tOiB0aGlzLmNhbnZhcy5oZWlnaHQsXG4gICAgICAgIGxlZnQ6IDBcbiAgICB9O1xufTtcblxuLyoqXG4gKiBDYWxsYmFjayB0eXBlIGZvciBzZWxlY3RpbmcgYW5kIGVsZW1lbnRcbiAqXG4gKiBAY2FsbGJhY2sgVUlTZWxlY3RlZENhbGxiYWNrXG4gKiBAcGFyYW0ge1VJRWxlbWVudH1cbiAqLyIsIi8qKlxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgRE9NIGV2ZW50cyBhbmQgdHJpZ2dlcmluZyBhcHBsaWNhdGlvbiBldmVudHNcbiAqIEtpbmRhIHVnbHkgY29kZSBoZXJlXG4gKlxuICogQHBhcmFtIHtDYW52YXNTdXJmYWNlfSBzdXJmYWNlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlciAoc3VyZmFjZSlcbntcbiAgICB0aGlzLnN1cmZhY2UgPSBzdXJmYWNlO1xuICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGZhbHNlO1xuICAgIHRoaXMubGFzdENsaWNrT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IG51bGw7XG5cbiAgICB0aGlzLmhhbmRsZXJzID0ge1xuICAgICAgICBvblNlbGVjdDogW10sXG4gICAgICAgIG9uRGVzZWxlY3Q6IFtdXG4gICAgfVxufVxuXG4vKipcbiAqIEJpbmRzIGFsbCBldmVudCBoYW5kbGVycyB0byB0aGUgSFRNTCBjYW52YXNcbiAqIFxuICogQHBhcmFtIGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuYmluZEh0bWxDYW52YXNFdmVudHMgPSBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG5cbiAgICAvLyBXZSBiaW5kaW5nIHRoaXMgZXZlbnQgdG8gdGhlIHdob2xlIGRvY3VtZW50IHRvIHN0b3AgbW92aW5nXG4gICAgLy8gaWYgdXNlciB0cmllcyB0byBkcmFnIGFuIGVsZW1lbnQgb3V0IG9mIHRoZSBjYW52YXNcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcykpO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VycyBzZWxlY3QgZXZlbnQuXG4gKiBUaGlzIG1lYW5zIHRoYXQgYWxsIGFzc2lnbmVkIGhhbmRsZXJzIHdpbGwgYmUgZXhlY3V0ZWQuXG4gKlxuICogVE9ETzogQWJhbmRvbiBKYXZhU2NyaXB0IGFuZCBsZWFybiBUeXBlU2NyaXB0XG4gKlxuICogQHBhcmFtIHtVSUVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudHJpZ2dlclNlbGVjdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaGFuZGxlcnMub25TZWxlY3QpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5oYW5kbGVycy5vblNlbGVjdFtrZXldO1xuXG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogVHJpZ2dlcnMgZGVzZWxlY3QgZXZlbnQuXG4gKiBUaGlzIG1lYW5zIHRoYXQgYWxsIGFzc2lnbmVkIGhhbmRsZXJzIHdpbGwgYmUgZXhlY3V0ZWQuXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXJEZXNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0KSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdFtrZXldO1xuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogQWRkcyBuZXcgaGFuZGxlciBvbiBlbGVtZW50IHNlbGVjdGlvbiBldmVudFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZFNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuaGFuZGxlcnMub25TZWxlY3QucHVzaChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEFkZHMgbmV3IGhhbmRsZXIgb24gZWxlbWVudCBkZXNlbGVjdGlvbiBldmVudFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0LnB1c2goY2FsbGJhY2spO1xufTtcblxuXG4vKipcbiAqIEhhbmRsZXIgZm9yIHRoZSBtb3VzZWRvd24gZXZlbnRcbiAqXG4gKiBAcGFyYW0gZVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuaXNNb3VzZURvd24gPSB0cnVlO1xuXG4gICAgLy8gUXVpY2sgaGFja1xuICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGUgPSBlLnRvdWNoZXNbMF07XG4gICAgfVxuXG4gICAgdmFyIGxvY2FsQ29vcmRpbmF0ZXMgPSB0aGlzLnRvTG9jYWxDb29yZGluYXRlcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgdmFyIG9sZFNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc3VyZmFjZS5nZXRFbGVtZW50cygpLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICB2YXIgbmV3U2VsZWN0ZWRJbmRleCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5mZXRjaEluZGV4QnlPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xuICAgIHZhciBuZXdTZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0KG5ld1NlbGVjdGVkSW5kZXgpO1xuXG4gICAgdmFyIGRvV2VIYXZlU29tZXRoaW5nU2VsZWN0ZWQgPSBuZXdTZWxlY3RlZEluZGV4ICE9PSBudWxsO1xuICAgIHZhciBpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUgPSBkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkICYmXG4gICAgICAgIG9sZFNlbGVjdGVkRWxlbWVudCA9PSBuZXdTZWxlY3RlZEluZGV4O1xuXG4gICAgaWYgKCFkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkKSB7XG5cbiAgICAgICAgLy8gSWYgd2UgaGFkIHNvbWV0aGluZyBzZWxlY3RlZCBiZWZvcmUsXG4gICAgICAgIC8vIGl0IG1lYW5zIGl0IGlzIHRpbWUgdG8gY2FsbCBkZXNlbGVjdCBoYW5kbGVyc1xuICAgICAgICBpZiAob2xkU2VsZWN0ZWRFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckRlc2VsZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZGVzZWxlY3QoKTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSkge1xuICAgICAgICB0aGlzLnRyaWdnZXJTZWxlY3QobmV3U2VsZWN0ZWRFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBXZSByZW1lbWJlciBoZXJlIHRoZSBsYXN0IGNsaWNrIG9mZnNldCByZWxhdGl2ZWx5IHNlbGVjdGVkIGVsZW1lbnRcbiAgICB0aGlzLmxhc3RDbGlja09mZnNldCA9IG5ld1NlbGVjdGVkRWxlbWVudC5nZXRDbGlja09mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XG5cbiAgICAvLyBJcyBpdCBhIGNsaWNrIHN0YXJ0aW5nIHJlc2l6ZSBvcGVyYXRpb24gP1xuICAgIHRoaXMuaXNSZXNpemluZ0NsaWNrID0gaXNDdXJyZW50bHlTZWxlY3RlZFdhc1NlbGVjdGVkQmVmb3JlICYmXG4gICAgICAgIHRoaXMuaXNSZXNpemVQb3NzaWJsZShuZXdTZWxlY3RlZEVsZW1lbnQsIGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcblxuICAgIGlmICh0aGlzLmlzUmVzaXppbmdDbGljaykge1xuICAgICAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IGxvY2FsQ29vcmRpbmF0ZXM7XG4gICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUodHJ1ZSk7XG4gICAgfVxuICAgIC8vIEl0IGlzIGEgY2xpY2sgZm9yIG1vdmluZ1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSB0cnVlO1xuICAgICAgICB0aGlzLnN1cmZhY2UuZWxlbWVudHMuc2VsZWN0KG5ld1NlbGVjdGVkSW5kZXgpO1xuICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1cmZhY2UucmVuZGVyKCk7XG59O1xuXG4vKipcbiAqXG4gKiBIYW5kbGVyIGZvciBtb3VzZSB1cCBldmVudFxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZVVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyBjb29yZGluYXRlcyB0byBjb29yZGluYXRlcyBpbnNpZGUgY2FudmFzXG4gKlxuICogQHBhcmFtIGNsaWVudFhcbiAqIEBwYXJhbSBjbGllbnRZXG4gKiBAcmV0dXJucyB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudG9Mb2NhbENvb3JkaW5hdGVzID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICB2YXIgdmlld3BvcnRPZmZzZXQgPSB0aGlzLnN1cmZhY2UuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIHRoZXNlIGFyZSByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnQsIGkuZS4gdGhlIHdpbmRvd1xuICAgIHZhciB0b3AgPSB2aWV3cG9ydE9mZnNldC50b3A7XG4gICAgdmFyIGxlZnQgPSB2aWV3cG9ydE9mZnNldC5sZWZ0O1xuICAgIHZhciB0b3BPZmZzZXQgPSBjbGllbnRZIC0gdG9wO1xuICAgIHZhciBsZWZ0T2Zmc2V0ID0gY2xpZW50WCAtIGxlZnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBsZWZ0T2Zmc2V0LFxuICAgICAgICB5OiB0b3BPZmZzZXRcbiAgICB9O1xufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBtb3VzZSBtb3ZlIGV2ZW50XG4gKlxuICogQHBhcmFtIGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgb3JpZ2luYWxFdmVudCA9IGU7XG5cbiAgICAvLyBRdWljayBoYWNrXG4gICAgaWYgKHR5cGVvZiBUb3VjaEV2ZW50ICE9IFwidW5kZWZpbmVkXCIgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcbiAgICAgICAgZSA9IGUudG91Y2hlc1swXTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCk7XG4gICAgdmFyIGxvY2FsQ29vcmRpbmF0ZXMgPSB0aGlzLnRvTG9jYWxDb29yZGluYXRlcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgdmFyIGVsZW1lbnRIb3ZlckluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmZldGNoSW5kZXhCeU9mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XG5cbiAgICAvLyBJdCBpcyBzaW1wbGUgbW91c2UgbW92ZSxcbiAgICAvLyB3ZSBoYXZlIG5vdGhpbmcgbW9yZSB0byBkbyBoZXJlXG4gICAgaWYgKCF0aGlzLmlzTW91c2VEb3duKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlV2l0aG91dE1vdXNlRG93bihlbGVtZW50SG92ZXJJbmRleCwgc2VsZWN0ZWRJbmRleCwgbG9jYWxDb29yZGluYXRlcyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGlzIG1vdmluZyBlbiBlbGVtZW50LlxuICAgIC8vIE1vYmlsZSBkZXZpY2VzIHdpbGwgdHJ5IHRvIHNjcm9sbCBkb3duLFxuICAgIC8vIGFuZCB3ZSBkb24ndCB3b250IHRoYXQgaWYgd2UgYXJlIHJlc2l6aW5nXG4gICAgLy8gb3IgbW92aW5nXG4gICAgaWYgKHRoaXMuaXNNb3ZpbmdDbGljayB8fCB0aGlzLmlzUmVzaXppbmdDbGljaykge1xuICAgICAgICBvcmlnaW5hbEV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG5cbiAgICB2YXIgc2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkRWxlbWVudCgpO1xuXG4gICAgLy8gSWYgd2UgYXJlIGhlcmUsIHRoZW4gd2UgaGF2ZSBidXR0b24gcHJlc3NlZCBhbmQgd2UgbXVzdCByZXNpemUhXG4gICAgaWYgKHRoaXMuaXNSZXNpemluZ0NsaWNrKSB7XG4gICAgICAgIHZhciBuZXdTaXplRGVsdGEgPSB7XG4gICAgICAgICAgICB3aWR0aDogbG9jYWxDb29yZGluYXRlcy54IC0gdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMueCxcbiAgICAgICAgICAgIGhlaWdodDogbG9jYWxDb29yZGluYXRlcy55IC0gdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMueVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzID0gbG9jYWxDb29yZGluYXRlcztcblxuICAgICAgICB2YXIgc2l6ZSA9IHNlbGVjdGVkRWxlbWVudC5nZXRTaXplKCk7XG4gICAgICAgIHNpemUucmVzaXplQnkobmV3U2l6ZURlbHRhLndpZHRoLCBuZXdTaXplRGVsdGEuaGVpZ2h0KTtcbiAgICB9XG4gICAgLy8gTmFoLCBpdCdzIGp1c3QgbW92aW5nXG4gICAgZWxzZSBpZiAodGhpcy5pc01vdmluZ0NsaWNrKSB7XG4gICAgICAgIHNlbGVjdGVkRWxlbWVudC5tb3ZlVG8obmV3IFBvc2l0aW9uKFxuICAgICAgICAgICAgbG9jYWxDb29yZGluYXRlcy54IC0gdGhpcy5sYXN0Q2xpY2tPZmZzZXQudG9wLFxuICAgICAgICAgICAgbG9jYWxDb29yZGluYXRlcy55IC0gdGhpcy5sYXN0Q2xpY2tPZmZzZXQubGVmdFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1cmZhY2UucmVuZGVyKCk7XG59O1xuXG4vKipcbiAqIEFkZHMgbW92YWJsZSBodG1sIGNsYXNzIHRvIHRoZSBjYW52YXMgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gYm9vbFxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zZXRNb3ZhYmxlU3RhdGUgPSBmdW5jdGlvbiAoYm9vbCkge1xuICAgIGlmIChib29sKSB7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LmFkZCgnbW92YWJsZScpO1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc2l6YWJsZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZhYmxlJyk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBBZGRzIHJlc2l6YWJsZSBodG1sIGNsYXNzIHRvIHRoZSBjYW52YXMgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gYm9vbFxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zZXRSZXNpemFibGVTdGF0ZSA9IGZ1bmN0aW9uIChib29sKSB7XG4gICAgaWYgKGJvb2wpIHtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZhYmxlJyk7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LmFkZCgncmVzaXphYmxlJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc2l6YWJsZScpO1xuICAgIH1cbn07XG5cbi8qKlxuICogSGFuZGxlcyBtb3VzZSBtb3ZlIGV2ZW50IHdoZW4gbW91c2UgYnV0dG9uIGlzIG5vdCBwcmVzc2VkXG4gKlxuICogQHBhcmFtIGVsZW1lbnRIb3ZlckluZGV4XG4gKiBAcGFyYW0gc2VsZWN0ZWRJbmRleFxuICogQHBhcmFtIG1vdXNlQ29vcmRpbmF0ZXNcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VNb3ZlV2l0aG91dE1vdXNlRG93biA9IGZ1bmN0aW9uIChlbGVtZW50SG92ZXJJbmRleCwgc2VsZWN0ZWRJbmRleCwgbW91c2VDb29yZGluYXRlcykge1xuICAgIGlmIChlbGVtZW50SG92ZXJJbmRleCA9PSBzZWxlY3RlZEluZGV4KSB7XG4gICAgICAgIC8vIFdoYXQgc3RhdGUgaXMgY3Vyc29yIGluP1xuICAgICAgICB2YXIgcmVzaXplU3RhdGUgPSB0aGlzLmlzUmVzaXplUG9zc2libGUodGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkRWxlbWVudCgpLCBtb3VzZUNvb3JkaW5hdGVzLngsIG1vdXNlQ29vcmRpbmF0ZXMueSk7XG4gICAgICAgIGlmIChyZXNpemVTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRSZXNpemFibGVTdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TW92YWJsZVN0YXRlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUoZmFsc2UpO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgcGFzc2VkIGNvb3JkaW5hdGVzIGFyZSBsb2NhdGVkIG9uIHBvc2l0aW9uIG9mIGRyYWcgaWNvbiBvZiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5pc1Jlc2l6ZVBvc3NpYmxlID0gZnVuY3Rpb24oZWxlbWVudCwgeCwgeSkge1xuICAgIHZhciBkcmFnSWNvblNpemUgPSAyMDtcblxuICAgIHZhciB0ZW1wRWxlbWVudERhdGEgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBuZXcgUG9zaXRpb24oXG4gICAgICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSAtIGRyYWdJY29uU2l6ZSxcbiAgICAgICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKSAtIGRyYWdJY29uU2l6ZVxuICAgICAgICApLFxuICAgICAgICBzaXplOiBuZXcgU2l6ZShkcmFnSWNvblNpemUsIGRyYWdJY29uU2l6ZSlcbiAgICB9O1xuXG4gICAgdmFyIHRlbXBFbGVtZW50ID0gbmV3IFVJRWxlbWVudCh0ZW1wRWxlbWVudERhdGEucG9zaXRpb24sIHRlbXBFbGVtZW50RGF0YS5zaXplKTtcbiAgICByZXR1cm4gdGVtcEVsZW1lbnQuaXNPZmZzZXRJbih4LCB5KTtcbn07IiwiLyoqXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSUVsZW1lbnRWaWV3KGNvbnRleHQpIHtcbiAgICBpZiAoICEgKGNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyBVSSBFbGVtZW50IFZpZXcgZXJyb3IhIENvbnRleHQgaXMgbm90IGEgY29udGV4dCcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XG4gICAgICovXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbn1cblxuQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcblxuQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxufTsiLCIvKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1VJRmFjdG9yeShjb250ZXh0KVxue1xuICAgIGlmICggISAoY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIHJlbmRlcmluZyBjb250ZXh0IG11c3QgYmUgaW5zdGFuY2Ugb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEISAoZmFjdG9yeSBjcmVhdGluZyknKTtcbiAgICB9XG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbGFiZWwgZWxlbWVudCwgd2hpY2ggaXMgcmVhZHkgdG8gYmUgcmVuZGVyZWQgb24gdGhlIGNhbnZhc1xuICpcbiAqIEByZXR1cm5zIHtVSUxhYmVsRWxlbWVudH1cbiAqL1xuQ2FudmFzVUlGYWN0b3J5LnByb3RvdHlwZS5jcmVhdGVMYWJlbCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBsYWJlbCA9IG5ldyBVSUxhYmVsRWxlbWVudChuZXcgUG9zaXRpb24oMCwgNTApKTtcbiAgICBsYWJlbC5zZXRWaWV3KG5ldyBDYW52YXNVSUxhYmVsVmlldyh0aGlzLmNvbnRleHQpKTtcblxuICAgIHJldHVybiBsYWJlbDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBpbWFnZSBlbGVtZW50LCB3aGljaCBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBvbiB0aGUgY2FudmFzXG4gKlxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcbiAqL1xuQ2FudmFzVUlGYWN0b3J5LnByb3RvdHlwZS5jcmVhdGVJbWFnZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgIHZhciBpbWFnZUVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgaW1hZ2UpO1xuICAgIGltYWdlRWxlbWVudC5zZXRWaWV3KG5ldyBDYW52YXNVSUltYWdlVmlldyh0aGlzLmNvbnRleHQpKTtcblxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XG59OyIsIi8qKlxuICogVmlldyBvZiBhbiBpbWFnZSBlbGVtZW50IG9uIHRoZSBjYW52YXNcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1VJSW1hZ2VWaWV3KGNvbnRleHQpIHtcbiAgICBDYW52YXNVSUVsZW1lbnRWaWV3LmNhbGwodGhpcywgY29udGV4dCk7XG59XG5cbkNhbnZhc1VJSW1hZ2VWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFJlbmRlcnMgYW4gaW1hZ2UgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7VUlJbWFnZUVsZW1lbnR9IHVpSW1hZ2VFbGVtZW50XG4gKi9cbkNhbnZhc1VJSW1hZ2VWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAodWlJbWFnZUVsZW1lbnQpIHtcbiAgICB2YXIgcG9zID0gdWlJbWFnZUVsZW1lbnQuZ2V0UG9zaXRpb24oKTtcbiAgICB2YXIgc2l6ZSA9IHVpSW1hZ2VFbGVtZW50LmdldFNpemUoKTtcblxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXG4gICAgICAgIHVpSW1hZ2VFbGVtZW50LmdldEltYWdlKCksXG4gICAgICAgIHBvcy5nZXRYKCksXG4gICAgICAgIHBvcy5nZXRZKCksXG4gICAgICAgIHNpemUuZ2V0V2lkdGgoKSxcbiAgICAgICAgc2l6ZS5nZXRIZWlnaHQoKVxuICAgICk7XG59OyIsIi8qKlxuICpcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlMYWJlbFZpZXcoY29udGV4dCkge1xuICAgIENhbnZhc1VJRWxlbWVudFZpZXcuY2FsbCh0aGlzLCBjb250ZXh0KTtcbn1cblxuQ2FudmFzVUlMYWJlbFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XG5cbi8qKlxuICogUmVuZGVycyB0ZXh0IGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge1VJTGFiZWxFbGVtZW50fSBlbGVtZW50XG4gKi9cbkNhbnZhc1VJTGFiZWxWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIC8vIE91ciB0ZXh0IHNpemUgZml0cyBib3VuZHNcbiAgICB2YXIgZm9udFNpemUgPSBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKTtcblxuICAgIHRoaXMuY29udGV4dC5mb250ID0gZm9udFNpemUgKyBcInB4IFwiICsgZWxlbWVudC5nZXRGb250KCk7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IGVsZW1lbnQuZ2V0Q29sb3IoKTtcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2hhbmdpbmcnO1xuXG4gICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFxuICAgICAgICBlbGVtZW50LmdldFRleHQoKSxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSxcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKVxuICAgICk7XG59OyIsIi8qKlxuICogQmFzZSB2aWV3IGZvciBzZWxlY3RlZCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBwYXJhbSB7e2NvbG9yOiBzdHJpbmd9LCB7c2l6ZTogaW50fX0gc3R5bGUgLSBpY29uIHNpemUgYW5kIGhleCBjb2xvciBzdHJpbmdcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSVNlbGVjdGVkVmlldyhjb250ZXh0LCBzdHlsZSkge1xuICAgIGlmICggISAoY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIFVJIEVsZW1lbnQgVmlldyBlcnJvciEgQ29udGV4dCBkb2VzIG5vdCBoYXZlIHR5cGUgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIScpO1xuICAgIH1cblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgdGhpcy5maWxsU3R5bGUgPSBzdHlsZS5jb2xvciB8fCAnI0FBQUFBQSc7XG4gICAgdGhpcy5yZXNpemVJY29uV2lkdGggPSBzdHlsZS5zaXplIHx8IDE1O1xufVxuXG5DYW52YXNVSVNlbGVjdGVkVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcblxuQ2FudmFzVUlTZWxlY3RlZFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMucmVzaXplSWNvbldpZHRoICsgXCJweCBBcmlhbFwiO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmZpbGxTdHlsZTtcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2JvdHRvbSc7XG5cbiAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoXG4gICAgICAgIENhbnZhc1VJU2VsZWN0ZWRWaWV3LlJlc2l6ZVN5bWJvbCxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgLSB0aGlzLnJlc2l6ZUljb25XaWR0aCxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpLFxuICAgICAgICB0aGlzLnJlc2l6ZUljb25XaWR0aFxuICAgICk7XG5cbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLmZpbGxTdHlsZTtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdChcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSxcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSxcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KClcbiAgICApO1xufTtcblxuLyoqXG4gKiBAY29uc3Qg4oeYXG4gKiBAdHlwZSB7c3RyaW5nfVxuICovXG5DYW52YXNVSVNlbGVjdGVkVmlldy5SZXNpemVTeW1ib2wgPSAnXFx1MjFmMic7IiwiLyoqXG4gKiBQb3NpdGlvbiBpbiAyRCBzcGFjZVxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gKiBAcGFyYW0ge251bWJlcn0geVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFBvc2l0aW9uKHgsIHkpIHtcbiAgICB0aGlzLnggPSAreCB8fCAwO1xuICAgIHRoaXMueSA9ICt5IHx8IDA7XG59XG5cbi8qKlxuICpcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cblBvc2l0aW9uLnByb3RvdHlwZS5nZXRYID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMueDtcbn07XG5cbi8qKlxuICpcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cblBvc2l0aW9uLnByb3RvdHlwZS5nZXRZID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMueTtcbn07XG5cbi8qKlxuICogQ2hhbmdlcyBwb3NpdGlvbnMgb2YgYW4gb2JqZWN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhWFxuICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhWVxuICogQHJldHVybiBQb3NpdGlvblxuICovXG5Qb3NpdGlvbi5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgdmFyIG5ld1hQb3MgPSB0aGlzLnggKyBkZWx0YVg7XG4gICAgdmFyIG5ld1lQb3MgPSB0aGlzLnkgKyBkZWx0YVk7XG5cbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKG5ld1hQb3MsIG5ld1lQb3MpO1xufTsiLCIvKipcbiAqIFRoaXMgb2JqZWN0IGlzIG9ubHkgcHVycG9zZWQgZm9yIGxvYWRpbmcgZXh0ZXJuYWwgcmVzb3VyY2VzXG4gKiBUaGlzIGlzIHN1cHBvc2VkIHRvIGJlIGFuIG9iamVjdCBkdXJpbmcgdGVzdGluZyBwdXJwb3Nlc1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBSZXNvdXJjZUxvYWRlcigpIHtcbiAgICBcbn1cblxuXG4vKipcbiAqIExvYWRzIGltYWdlIHRoZW4gY2FsbHMgYSBmdW5jdGlvbi5cbiAqIFRoYXQgc2ltcGxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAqIEBwYXJhbSBjYWxsYmFja1xuICovXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZEltYWdlID0gZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICBpbWcub25sb2FkID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgaW1nLnNyYyA9IHNyYztcbn07XG5cbi8qKlxuICogTG9hZHMgdGV4dCBjb250ZW50LCBjYWxscyBmdW5jdGlvblxuICogXG4gKiBAcGFyYW0gc3JjXG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqL1xuUmVzb3VyY2VMb2FkZXIucHJvdG90eXBlLmxvYWRUZXh0ID0gZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2sodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHhoci5vcGVuKCdHRVQnLCBzcmMsIHRydWUpO1xuICAgIHhoci5zZW5kKCk7XG59O1xuXG4vKipcbiAqIExvYWRzIEpTT04gY29udGVudCwgY2FsbHMgY2FsbGJhY2tcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqL1xuUmVzb3VyY2VMb2FkZXIucHJvdG90eXBlLmxvYWRKc29uT2JqZWN0ID0gZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcbiAgICB0aGlzLmxvYWRUZXh0KHNyYywgZnVuY3Rpb24gKGxvYWRlZFRleHQpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKEpTT04ucGFyc2UobG9hZGVkVGV4dCkpO1xuICAgICAgICB9XG4gICAgfSlcbn07XG5cbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB7UmVzb3VyY2VMb2FkZXJ9IHJlc291cmNlTG9hZGVyXG4gKiBAcGFyYW0ge1t7a2V5OiBzdHJpbmcsIHNyYzogc3RyaW5nLCB0eXBlOiBzdHJpbmcgfV19IHJlc291cmNlcyAtIHdoYXQgcmVzb3VyY2VzIGFyZSB5b3UgZ29pbmcgdG8gbG9hZFxuICogS2V5IGlzIHVzZWQgdG8gc2F2ZSBsb2FkZWQgY29udGVudCB0byBTdG9yYWdlLFxuICogVHlwZSBtdXN0IGJlOiAndGV4dCcsICdpbWFnZScgb3IgJ2pzb24nLFxuICogU3JjIGlzIHRoZSBwYXRoIHRvIHRoZSByZXNvdXJjZSBmcm9tIGRvY3VtZW50IHJvb3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uTG9hZCAtIGNhbGxiYWNrLCB3aGljaCB3aWxsIGJlIGV4ZWN1dGVkIG9uIGxvYWQgb2YgZWFjaCBlbGVtZW50XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUmVzb3VyY2VQcmVwYXJlcihyZXNvdXJjZUxvYWRlciwgcmVzb3VyY2VzLCBvbkxvYWQpXG57XG4gICAgdGhpcy5sb2FkZXIgPSByZXNvdXJjZUxvYWRlcjtcbiAgICB0aGlzLnJlc291cmNlc1RvTG9hZCA9IHJlc291cmNlcztcbiAgICB0aGlzLm9uTG9hZCA9IG9uTG9hZDtcbn1cblxuLyoqXG4gKiBTdGFydHMgbG9hZGluZyBvZiByZXF1ZXN0ZWQgcmVzb3VyY2VzXG4gKi9cblJlc291cmNlUHJlcGFyZXIucHJvdG90eXBlLnN0YXJ0TG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdG90YWxMb2FkZWRDb3VudCA9IDA7XG4gICAgdmFyIHNob3VsZExvYWRDb3VudCA9IHRoaXMucmVzb3VyY2VzVG9Mb2FkLmxlbmd0aDtcbiAgICB2YXIgb25Mb2FkQ2FsbGJhY2sgPSB0aGlzLm9uTG9hZDtcbiAgICB2YXIgbG9hZGVyID0gdGhpcy5sb2FkZXI7XG5cbiAgICAvLyBFYWNoIHRpbWUgd2UgaGF2ZSBsb2FkZWQgYSByZXNvdXJjZVxuICAgIC8vIHdlIGNoZWNrIGV2ZXJ5dGhpbmcgaXMgbG9hZGVkXG4gICAgdmFyIHNhdmVSZXNvdXJjZSA9IGZ1bmN0aW9uIChrZXksIG9iamVjdCkge1xuICAgICAgICBTdG9yYWdlLnJlbWVtYmVyKGtleSwgb2JqZWN0KTtcbiAgICAgICAgdG90YWxMb2FkZWRDb3VudCsrO1xuICAgICAgICBpZiAodG90YWxMb2FkZWRDb3VudCA9PSBzaG91bGRMb2FkQ291bnQpIHtcbiAgICAgICAgICAgIG9uTG9hZENhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG5cbiAgICB2YXIgcmVxdWVzdE1ldGhvZHMgPSB7XG4gICAgICAgIGltYWdlOiBmdW5jdGlvbiAoc3JjLCBrZXkpIHtcbiAgICAgICAgICAgIGxvYWRlci5sb2FkSW1hZ2Uoc3JjLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2F2ZVJlc291cmNlKGtleSwgdGhpcyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBqc29uOiBmdW5jdGlvbiAoc3JjLCBrZXkpIHtcbiAgICAgICAgICAgIGxvYWRlci5sb2FkSnNvbk9iamVjdChzcmMsIGZ1bmN0aW9uIChqc29uUmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCBqc29uUmVzb3VyY2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgdGV4dDogZnVuY3Rpb24gKHNyYywga2V5KSB7XG4gICAgICAgICAgICBsb2FkZXIubG9hZFRleHQoc3JjLCBmdW5jdGlvbiAodGV4dFJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgc2F2ZVJlc291cmNlKGtleSwgdGV4dFJlc291cmNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5yZXNvdXJjZXNUb0xvYWQuZm9yRWFjaChmdW5jdGlvbiAocmVzb3VyY2UpIHtcbiAgICAgICAgdmFyIHR5cGUgPSByZXNvdXJjZS50eXBlO1xuICAgICAgICB2YXIga2V5ID0gcmVzb3VyY2Uua2V5O1xuICAgICAgICB2YXIgc3JjID0gcmVzb3VyY2Uuc3JjO1xuXG4gICAgICAgIGlmICggISByZXF1ZXN0TWV0aG9kcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdUcnlpbmcgdG8gbG9hZCB1bmtub3duIHJlc291cmNlIHR5cGUhJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYWxsaW5nIGFwcHJvcHJpYXRlIGxvYWQgbWV0aG9kXG4gICAgICAgIHJlcXVlc3RNZXRob2RzW3R5cGVdKHNyYywga2V5KTtcbiAgICB9KTtcbn07IiwiLyoqXG4gKiBTaXplIG9mIHRoZSByZWN0YW5nbGUgc3Vycm91bmRpbmcgdGhlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFNpemUod2lkdGgsIGhlaWdodCkge1xuICAgIHRoaXMud2lkdGggPSArd2lkdGggfHwgU2l6ZS5kZWZhdWx0V2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSAraGVpZ2h0IHx8IFNpemUuZGVmYXVsdEhlaWdodDtcbn1cblxuU2l6ZS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy53aWR0aDtcbn07XG5cblNpemUucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmhlaWdodDtcbn07XG5cblxuU2l6ZS5wcm90b3R5cGUucmVzaXplQnkgPSBmdW5jdGlvbiAoZGVsdGFXaWR0aCwgZGVsdGFIZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoICs9IGRlbHRhV2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgKz0gZGVsdGFIZWlnaHQ7XG5cbiAgICBpZiAodGhpcy53aWR0aCA8IFNpemUubWluV2lkdGgpIHtcbiAgICAgICAgdGhpcy53aWR0aCA9IFNpemUubWluV2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaGVpZ2h0IDwgU2l6ZS5taW5IZWlnaHQpIHtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBTaXplLm1pbkhlaWdodDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEluY3JlYXNlcyB0aGUgc2l6ZSBieSBtdWx0aXBsaWVyXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IG11bHRpcGxpZXJcbiAqIEByZXR1cm5zIHtTaXplfVxuICovXG5TaXplLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uKG11bHRpcGxpZXIpIHtcbiAgICByZXR1cm4gbmV3IFNpemUodGhpcy53aWR0aCAqIG11bHRpcGxpZXIsIHRoaXMuaGVpZ2h0ICogbXVsdGlwbGllcik7XG59O1xuXG4vKipcbiAqIE1pbmltYWwgd2lkdGhcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cblNpemUubWluV2lkdGggPSA0MDtcblxuLyoqXG4gKiBNaW5pbWFsIGhlaWdodFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5taW5IZWlnaHQgPSA0MDtcblxuLyoqXG4gKiBjb25zdCBmb3IgZGVmYXVsdCB3aWR0aFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5kZWZhdWx0V2lkdGggPSAxNTA7XG5cbi8qKlxuICogY29uc3QgZm9yIGRlZmF1bHQgaGVpZ2h0XG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5TaXplLmRlZmF1bHRIZWlnaHQgPSA3MDsiLCIvKipcbiAqIEl0IGlzIHB1cnBvc2VkIGZvciByZW1lbWJlcmluZyBzb21lIGRhdGEuXG4gKiBGdW5jdGlvbmFsIGRlY2xhcmF0aW9uIGlzIHVzZWQgZm9yIGl0cyB2aXNpYmlsaXR5IG9ubHkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFN0b3JhZ2UoKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlRoaXMgaXMgbm90IGZvciBjcmVhdGluZyBvYmplY3RzIVwiKTtcbn1cblxuU3RvcmFnZS5fY29udGVudCA9IHt9O1xuXG4vKipcbiAqIFJlbWVtYmVycyBhbnkgdmFsdWVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKi9cblN0b3JhZ2UucmVtZW1iZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgIFN0b3JhZ2UuX2NvbnRlbnRba2V5XSA9IHZhbHVlO1xufTtcblxuLyoqXG4gKiBBbGxvd3MgeW91IHRvIGdldCB3aGF0IHlvdSB3YW50IGJ1dCBvbmx5IGlmIHlvdSByZW1lbWJlciB0aGlzIGVhcmxpZXJcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICovXG5TdG9yYWdlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgc29tZXRoaW5nWW91V2FudCA9IFN0b3JhZ2UuX2NvbnRlbnRba2V5XTtcblxuICAgIGlmICh0eXBlb2Ygc29tZXRoaW5nWW91V2FudCA9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJXZSBoYXZlIG5vdGhpbmcgdG8gcmV0dXJuIHVzaW5nIGtleTogXCIgKyBrZXkpO1xuICAgIH1cblxuICAgIHJldHVybiBzb21ldGhpbmdZb3VXYW50O1xufTtcbiIsIi8qKlxuICogQ29sbGVjdGlvbiBmb3IgVUkgZWxlbWVudHMuXG4gKlxuICogSXQgaXMgcHVycG9zZWQgZm9yIGtlZXBpbmcgdWkgZWxlbWVudHMgd2l0aCBjb3JyZWN0IG9yZGVyXG4gKiBBbHNvIHN1cHBvcnRzIHNlbGVjdGlvbiByZW1lbWJlcmluZ1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUNvbGxlY3Rpb24oKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdsZW5ndGgnLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gc2VsZi5lbGVtZW50cy5sZW5ndGhcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbi8qKlxuICogUHVzaGVzIGVsZW1lbnQgdG8gdGhlIHRvcCBsYXllciBvZiB0aGUgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZWxlbWVudCkge1xuICAgIGlmICggISAoZWxlbWVudCBpbnN0YW5jZW9mIFVJRWxlbWVudCkgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VsZW1lbnQgaW4gVUlDb2xsZWN0aW9uIG11c3QgaGF2ZSBVSUVsZW1lbnQgdHlwZScpO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudHMucHVzaChlbGVtZW50KTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhcnJheSB3aXRoIGFsbCBlbGVtZW50cyBpbiBpdFxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBlbGVtZW50IHdpdGggcGFzc2VkIGluZGV4IGZyb20gdGhlIGNvbGxlY3Rpb24gYW5kIHJldHVybnMgaXRcbiAqXG4gKiBAcmV0dXJuIHtVSUVsZW1lbnR9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcbiAgICB9XG4gICAgaWYgKGluZGV4ID09IHRoaXMuc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICB0aGlzLmRlc2VsZWN0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLnNwbGljZShpbmRleCwgMSlbMF07XG59O1xuXG4vKipcbiAqIFN3YXBzIHBsYWNlcyBvZiB0d28gZWxlbWVudHMgaW4gdGhlIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0gaW5kZXgxXG4gKiBAcGFyYW0gaW5kZXgyXG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc3dhcCA9IGZ1bmN0aW9uIChpbmRleDEsIGluZGV4Mikge1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgxKSB8fCAhdGhpcy5oYXMoaW5kZXgyKSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cblxuICAgIHZhciB0ZW1wID0gdGhpcy5lbGVtZW50c1tpbmRleDFdO1xuICAgIHRoaXMuZWxlbWVudHNbaW5kZXgxXSAgPSB0aGlzLmVsZW1lbnRzW2luZGV4Ml07XG4gICAgdGhpcy5lbGVtZW50c1tpbmRleDJdID0gdGVtcDtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgaW5kZXggZXhpc3RzIGluIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIHJldHVybiBpbmRleCA+PSAwIHx8IGluZGV4IDwgdGhpcy5sZW5ndGg7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tpbmRleF07XG59O1xuXG4vKipcbiAqIEZvcmdldHMgd2hpY2ggZWxlbWVudCB3YXMgc2VsZWN0ZWRcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5kZXNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBpbmRleFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xufTtcblxuLyoqXG4gKiBTZWxlY3RzIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb25cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RMYXN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMubGVuZ3RoID8gdGhpcy5sZW5ndGggLSAxIDogLTE7XG59O1xuXG4vKipcbiAqIFJldHVybnMgc2VsZWN0ZWQgZWxlbWVudFxuICpcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR8bnVsbH1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRTZWxlY3RlZEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCAhPSAtMSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50c1t0aGlzLnNlbGVjdGVkSW5kZXhdXG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGluZGV4IG9mIHNlbGVjdGVkIGVsZW1lbnRcbiAqIElmIG5vbmUsIHJldHVybnMgLTFcbiAqXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldFNlbGVjdGVkSW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRJbmRleDtcbn07XG5cbi8qKlxuICogRmV0Y2hlcyBlbGVtZW50IGJ5IHBhc3NlZCBvZmZzZXRcbiAqXG4gKiBAcGFyYW0gb2Zmc2V0WFxuICogQHBhcmFtIG9mZnNldFlcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR8bnVsbH1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5mZXRjaEVsZW1lbnRCeU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgdmFyIG1hdGNoZWRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIGlmIChlbC5pc09mZnNldEluKG9mZnNldFgsIG9mZnNldFkpKSB7XG4gICAgICAgICAgICBtYXRjaGVkRWxlbWVudCA9IGVsO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoZWRFbGVtZW50O1xufTtcblxuLyoqXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgZW5kIG9mIHRoZSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIGluZGV4XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUudG9FbmQgPSBmdW5jdGlvbihpbmRleClcbntcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cbiAgICB2YXIgd2FzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gaW5kZXg7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgdGhpcy5hZGQoZWxlbWVudCk7XG5cbiAgICBpZiAod2FzU2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5sZW5ndGggLSAxO1xuICAgIH1cbn07XG5cbi8qKlxuICogUHVzaGVzIGVsZW1lbnQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBpbmRleFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnRvU3RhcnQgPSBmdW5jdGlvbihpbmRleClcbntcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cbiAgICB2YXIgd2FzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gaW5kZXg7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnJlbW92ZShpbmRleCk7XG4gICAgdGhpcy5lbGVtZW50cyA9IFtlbGVtZW50XS5jb25jYXQodGhpcy5lbGVtZW50cyk7XG5cbiAgICBpZiAod2FzU2VsZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogRmV0Y2hlcyBpbmRleCBieSBwYXNzZWQgb2Zmc2V0XG4gKlxuICogQHBhcmFtIG9mZnNldFhcbiAqIEBwYXJhbSBvZmZzZXRZXG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5mZXRjaEluZGV4QnlPZmZzZXQgPSBmdW5jdGlvbiAob2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgIHZhciBtYXRjaGVkSW5kZXggPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XG4gICAgICAgIGlmIChlbC5pc09mZnNldEluKG9mZnNldFgsIG9mZnNldFkpKSB7XG4gICAgICAgICAgICBtYXRjaGVkSW5kZXggPSBpbmRleDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXRjaGVkSW5kZXg7XG59OyIsIi8qKlxuICogU29tZSBlbGVtZW50IG9mIHVzZXIgaW50ZXJmYWNlXG4gKlxuICogQHBhcmFtIHtQb3NpdGlvbnx1bmRlZmluZWR9IHBvc2l0aW9uXG4gKiBAcGFyYW0ge1NpemV8dW5kZWZpbmVkfSBzaXplXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUlFbGVtZW50KHBvc2l0aW9uLCBzaXplKVxue1xuICAgIGlmICggISAocG9zaXRpb24gaW5zdGFuY2VvZiBQb3NpdGlvbikgKSB7XG4gICAgICAgIHBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKCk7XG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcblxuICAgIGlmICggISAoc2l6ZSBpbnN0YW5jZW9mIFBvc2l0aW9uKSkge1xuICAgICAgICBzaXplID0gbmV3IFNpemUoKTtcbiAgICB9XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSB2aWV3IG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtVSUVsZW1lbnRWaWV3fSB2aWV3XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuc2V0VmlldyA9IGZ1bmN0aW9uKHZpZXcpIHtcbiAgICBpZiAoICEgKHZpZXcgaW5zdGFuY2VvZiBVSUVsZW1lbnRWaWV3KSApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmlldyBtdXN0IGhhdmUgVUlFbGVtZW50VmlldyB0eXBlIScpO1xuICAgIH1cbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGN1cnJlbnQgdmlldyBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnRWaWV3fHVuZGVmaW5lZH1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRWaWV3ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnZpZXc7XG59O1xuXG4vKipcbiAqIFJlbmRlcnMgdGhlIGVsZW1lbnQgdXNpbmcgaXRzIHZpZXdcbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLnZpZXcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdWaWV3IGlzIG5vdCBzZXQhJyk7XG4gICAgfVxuXG4gICAgdGhpcy52aWV3LnJlbmRlcih0aGlzKTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7UG9zaXRpb259IHBvc2l0aW9uXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50fVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uKHBvc2l0aW9uKSB7XG4gICAgaWYgKCFwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25ldyBwb3NpdGlvbiBtdXN0IGhhdmUgUG9zaXRpb24gdHlwZSEnKVxuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHVybnMgcG9zaXRpb24gb2YgYW4gZWxlbWVudFxuICpcbiAqIEByZXR1cm5zIHtQb3NpdGlvbn1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICB0aGlzLnNpemUgPSBzaXplO1xufTtcblxuXG4vKipcbiAqIFJldHVybiB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEByZXR1cm5zIHtTaXplfVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgcGFzc2VkIG9mZnNldCBtYXRjaGVzIGVsZW1lbnQgcG9zaXRpb25cbiAqXG4gKiBAcGFyYW0gY2xpZW50WFxuICogQHBhcmFtIGNsaWVudFlcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmlzT2Zmc2V0SW4gPSBmdW5jdGlvbiAoY2xpZW50WCwgY2xpZW50WSlcbntcbiAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgIHZhciBjdXJyZW50U2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xuXG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbi5nZXRYKCkgPiBjbGllbnRYIHx8IGN1cnJlbnRQb3NpdGlvbi5nZXRYKCkgKyBjdXJyZW50U2l6ZS5nZXRXaWR0aCgpIDwgY2xpZW50WCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChjdXJyZW50UG9zaXRpb24uZ2V0WSgpID4gY2xpZW50WSB8fCBjdXJyZW50UG9zaXRpb24uZ2V0WSgpICsgY3VycmVudFNpemUuZ2V0SGVpZ2h0KCkgPCBjbGllbnRZKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBob3cgZmFyIGlzIHBhc3NlZCBvZmZzZXQgZnJvbSBwb2ludCAoMCwgMClcbiAqXG4gKiBAcGFyYW0gY2xpZW50WFxuICogQHBhcmFtIGNsaWVudFlcbiAqIEByZXR1cm5zIHt7dG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlcn19XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0Q2xpY2tPZmZzZXQgPSBmdW5jdGlvbiAoY2xpZW50WCwgY2xpZW50WSkge1xuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IGNsaWVudFggLSBwb3NpdGlvbi5nZXRYKCksXG4gICAgICAgIGxlZnQ6IGNsaWVudFkgLSBwb3NpdGlvbi5nZXRZKClcbiAgICB9XG59OyIsIi8qKlxuICogT2JqZWN0LCB3aGljaCBkZWZpbmVzIGhvdyB0byByZW5kZXIgc3BlY2lmaWMgVUlFbGVtZW50XG4gKiBUaGlzIG9iamVjdCBrbm93cyBldmVyeXRoaW5nIGFib3V0IGFuIG9iamVjdCBpdCBuZWVkcyB0byBkcmF3LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUVsZW1lbnRWaWV3KClcbntcblxufVxuLyoqXG4gKlxuICogQHBhcmFtIFVJRWxlbWVudFxuICovXG5VSUVsZW1lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoVUlFbGVtZW50KSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKCdZb3Ugc2hvdWxkIG5vdCBiZSB1c2luZyBhbiBhYnN0cmFjdCBvYmplY3QgZm9yIHJlbmRlcmluZyEnKTtcbn07XG4iLCIvKipcbiAqXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufG51bGx9IHBvc2l0aW9uXG4gKiBAcGFyYW0ge1NpemV8bnVsbH0gc2l6ZVxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUltYWdlRWxlbWVudChwb3NpdGlvbiwgc2l6ZSwgaW1hZ2UpXG57XG4gICAgVUlFbGVtZW50LmNhbGwodGhpcywgcG9zaXRpb24sIHNpemUpO1xuXG4gICAgaWYgKCAhIChpbWFnZSBpbnN0YW5jZW9mIEltYWdlKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW1hZ2UgbXVzdCBoYXZlIEltYWdlIHR5cGUhXCIpO1xuICAgIH1cblxuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbn1cblxuVUlJbWFnZUVsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnQucHJvdG90eXBlKTtcblxuLyoqXG4gKlxuICogQHJldHVybnMge0ltYWdlfVxuICovXG5VSUltYWdlRWxlbWVudC5wcm90b3R5cGUuZ2V0SW1hZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW1hZ2U7XG59OyIsIi8qKlxuICogQ2xhc3MgZm9yIGNyZWF0aW5nXG4gKlxuICogQHBhcmFtIHtQb3NpdGlvbnxudWxsfSBwb3NpdGlvblxuICogQHBhcmFtIHtTaXplfG51bGx9IHNpemVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcGFyYW0geyp9IHN0eWxlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUlMYWJlbEVsZW1lbnQocG9zaXRpb24sIHNpemUsIHRleHQsIHN0eWxlKSB7XG4gICAgVUlFbGVtZW50LmFwcGx5KHRoaXMsIFtwb3NpdGlvbiwgc2l6ZV0pO1xuXG4gICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIHRleHQgPSBVSUxhYmVsRWxlbWVudC5kZWZhdWx0VGV4dDtcbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xuXG4gICAgaWYgKCEgKHN0eWxlIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgICBzdHlsZSA9IHt9O1xuICAgIH1cblxuICAgIHRoaXMuZm9udCA9IHN0eWxlLmZvbnQgfHwgVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFN0eWxlLmZvbnQ7XG4gICAgdGhpcy5jb2xvciA9IHN0eWxlLmNvbG9yIHx8IFVJTGFiZWxFbGVtZW50LmRlZmF1bHRTdHlsZS5jb2xvcjtcbn1cblxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnQucHJvdG90eXBlKTtcblxuLyoqXG4gKiBHZXRzIGEgdGV4dCBvZiB0aGUgY3VycmVudCBVSUxhYmVsRWxlbWVudFxuICpcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5nZXRUZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnRleHQ7XG59O1xuXG4vKipcbiAqIFNldHMgYSB0ZXh0IG9mIHRoZSBjdXJyZW50IFVJTGFiZWxFbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqL1xuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xuICAgIHRoaXMudGV4dCA9IHRleHQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdFxuICpcbiAqIEByZXR1cm4ge3N0cmluZ3xzdHJpbmd8Kn1cbiAqL1xuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLmdldEZvbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9udDtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgZm9udCBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb250XG4gKi9cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRGb250ID0gZnVuY3Rpb24gKGZvbnQpIHtcbiAgICB0aGlzLmZvbnQgPSBmb250O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb2xvciBvZiB0aGUgdGV4dFxuICpcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLmdldENvbG9yID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmNvbG9yO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjb2xvciBvZiB0aGUgdGV4dFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuc2V0Q29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XG59O1xuXG5VSUxhYmVsRWxlbWVudC5kZWZhdWx0VGV4dCA9IFwi0JLQstC10LTQuNGC0LUg0YLQtdC60YHRgi4uLlwiO1xuXG5VSUxhYmVsRWxlbWVudC5kZWZhdWx0U3R5bGUgPSB7XG4gICAgZm9udDogJ0FyaWFsJyxcbiAgICBjb2xvcjogJyMwMDAwMDAnXG59OyIsIi8qKlxuICogQ2FtZXJhXG4gKiBNYW5hZ2VzIHZpZXcgY2hhbmdpbmdcbiAqIFVzZXMgc3BoZXJpY2FsIGNvb3JkaW5hdGVzIHRvIGNoYW5nZSB0aGUgdmlldyBhcm91bmQgdGhlIG9iamVjdFxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW1lcmEoKVxue1xuICAgIC8vIEluaXRpYWwgYW5nbGUgYW5kIGRpc3RhbmNlXG4gICAgdGhpcy5hbmdsZVRoZXRhID0gMzA7XG4gICAgdGhpcy5hbmdsZUZpID0gMDtcbiAgICB0aGlzLmRpc3RhbmNlID0gMTU7XG5cbiAgICB0aGlzLm1pbkFuZ2xlVGhldGEgPSAxMDtcbiAgICB0aGlzLm1heEFuZ2xlVGhldGEgPSAxNzA7XG5cbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5nZXROZXdQb3NpdGlvbigpO1xuXG4gICAgLy8gV2hlcmUgdG8gbG9va1xuICAgIHRoaXMubG9va0F0ID0gWzAsIDAsIDEuM107XG4gICAgdGhpcy51cCA9IFswLCAwLCAxXTtcblxuICAgIHRoaXMubWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBwb3NpdGlvbnMgb2YgYSB2aWV3ZXJcbiAqXG4gKiBAcmV0dXJucyB7KltdfVxuICovXG5DYW1lcmEucHJvdG90eXBlLmdldE5ld1Bvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIE1hdGguY29zKHRoaXMuYW5nbGVGaSAqIENhbWVyYS5Ub1JhZGlhbnMpICogTWF0aC5zaW4odGhpcy5hbmdsZVRoZXRhICogQ2FtZXJhLlRvUmFkaWFucykgKiB0aGlzLmRpc3RhbmNlLFxuICAgICAgICBNYXRoLnNpbih0aGlzLmFuZ2xlVGhldGEgKiBDYW1lcmEuVG9SYWRpYW5zKSAqIE1hdGguc2luKHRoaXMuYW5nbGVGaSAqIENhbWVyYS5Ub1JhZGlhbnMpICogdGhpcy5kaXN0YW5jZSxcbiAgICAgICAgdGhpcy5kaXN0YW5jZSAqIE1hdGguY29zKHRoaXMuYW5nbGVUaGV0YSAqIENhbWVyYS5Ub1JhZGlhbnMpXG4gICAgXTtcbn07XG5cbi8qKlxuICogTW92ZXMgY2FtZXJhIGFyb3VuZCB0aGUgb2JqZWN0XG4gKlxuICogQHBhcmFtIGFuZ2xlRmlcbiAqIEBwYXJhbSBhbmdsZVRoZXRhXG4gKi9cbkNhbWVyYS5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uIChhbmdsZUZpLCBhbmdsZVRoZXRhKSB7XG5cbiAgICB0aGlzLmFuZ2xlRmkgKz0gYW5nbGVGaTtcblxuICAgIHZhciBjaGFuZ2VkQW5nbGVUaGV0YSA9IHRoaXMuYW5nbGVUaGV0YSArIGFuZ2xlVGhldGE7XG5cbiAgICBpZiAoY2hhbmdlZEFuZ2xlVGhldGEgPCB0aGlzLm1heEFuZ2xlVGhldGEgJiYgY2hhbmdlZEFuZ2xlVGhldGEgPiB0aGlzLm1pbkFuZ2xlVGhldGEpIHtcbiAgICAgICAgdGhpcy5hbmdsZVRoZXRhID0gY2hhbmdlZEFuZ2xlVGhldGE7XG4gICAgfVxuXG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0TmV3UG9zaXRpb24oKTtcbiAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xufTtcblxuLyoqXG4gKiBNb3ZlIGNhbWVyYSBmb3J3YXJkXG4gKi9cbkNhbWVyYS5wcm90b3R5cGUuem9vbUluID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmRpc3RhbmNlID4gNCkge1xuICAgICAgICB0aGlzLmRpc3RhbmNlLS07XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldE5ld1Bvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBNb3ZlIGNhbWVyYSBiYWNrd2FyZFxuICovXG5DYW1lcmEucHJvdG90eXBlLnpvb21PdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZGlzdGFuY2UgPCAyMCkge1xuICAgICAgICB0aGlzLmRpc3RhbmNlKys7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldE5ld1Bvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBTZXRzIGNhbWVyYSBhbmdsZVxuICpcbiAqIEBwYXJhbSBhbmdsZUZpXG4gKiBAcGFyYW0gYW5nbGVUaGV0YVxuICovXG5DYW1lcmEucHJvdG90eXBlLnNldEFuZ2xlID0gZnVuY3Rpb24gKGFuZ2xlRmksIGFuZ2xlVGhldGEpIHtcbiAgICB0aGlzLmFuZ2xlRmkgPSBhbmdsZUZpO1xuICAgIHRoaXMuYW5nbGVUaGV0YSA9IGFuZ2xlVGhldGE7XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgdmlldyBtYXRyaXhcbiAqL1xuQ2FtZXJhLnByb3RvdHlwZS51cGRhdGVNYXRyaXggPSBmdW5jdGlvbiAoKSB7XG4gICAgbWF0NC5sb29rQXQodGhpcy5tYXRyaXgsIHRoaXMucG9zaXRpb24sIHRoaXMubG9va0F0LCB0aGlzLnVwKTtcbn07XG5cbi8qKlxuICogQ29uc3QgZm9yIHRyYW5zbGF0aW5nIGRlZ3JlZXMgdG8gcmFkaWFuc1xuICpcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbkNhbWVyYS5Ub1JhZGlhbnMgPSBNYXRoLlBJIC8gMTgwOyIsIi8qKlxuICogT2JqZWN0IGZvciBjcmVhdGluZyBWQk8gYW5kIHN0b3JpbmcgaXRcbiAqIHRvIGhhdmUgY2FwYWJpbGl0eSB0byBkeW5hbWljYWxseSBjaGFuZ2UgY3VycmVudCBtb2RlbFxuICpcbiAqIEBwYXJhbSBnbFxuICogQHBhcmFtIGpzb25Nb2RlbFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1vZGVsKGdsLCBqc29uTW9kZWwpIHtcbiAgICB0aGlzLmJ1aWxkQnVmZmVycyhnbCwganNvbk1vZGVsKVxufVxuXG4vKipcbiAqIEJpbmRzIGFsbCBidWZmZXJzXG4gKlxuICogQHBhcmFtIGdsXG4gKiBAcGFyYW0ganNvbk1vZGVsXG4gKi9cbk1vZGVsLnByb3RvdHlwZS5idWlsZEJ1ZmZlcnMgPSBmdW5jdGlvbiAoZ2wsIGpzb25Nb2RlbClcbntcbiAgICAvLyDQodC+0LfQtNCw0LXQvCDQsdGD0YTQtdGA0YtcbiAgICB0aGlzLm1vZGVsVmVydGV4ZXMgPSBqc29uTW9kZWwubWVzaGVzWzBdLnZlcnRpY2VzO1xuICAgIHRoaXMubW9kZWxJbmRleGVzID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwganNvbk1vZGVsLm1lc2hlc1swXS5mYWNlcyk7XG4gICAgdGhpcy5tb2RlbFRleENvb3JkcyA9IGpzb25Nb2RlbC5tZXNoZXNbMF0udGV4dHVyZWNvb3Jkc1swXTtcbiAgICB0aGlzLm1vZGVsTm9ybWFscyA9IGpzb25Nb2RlbC5tZXNoZXNbMF0ubm9ybWFscztcblxuICAgIC8vINCh0L7Qt9C00LDQtdC8INCx0YPRhNC10YAgLSDRh9C10YDQtdC3INC90LXQs9C+INC/0LXRgNC10LTQsNC10YLRgdGPINC40L3RhNC+0YDQvNCw0YbQuNGPINCyIEdQVVxuICAgIHRoaXMubW9kZWxWZXJ0ZXhCdWZmZXJPYmplY3QgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICAvLyDQndCw0LfQvdCw0YfQsNC10Lwg0LXQs9C+INCw0LrRgtC40LLQvdGL0LxcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCk7XG4gICAgLy8gU1RBVElDX0RSQVcgLSDQutC+0L/QuNGA0YPQtdC8INC10LTQuNC90L7QttC00Ysg0LjQtyBDUFUg0LIgR1BVXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5tb2RlbFZlcnRleGVzKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy8g0J7RgtC00LXQu9GM0L3Ri9C5INCx0YPRhNC10YAg0LTQu9GPINGC0LXQutGB0YLRg9GA0L3Ri9GFINC60L7QvtGA0LTQuNC90LDRglxuICAgIHRoaXMubW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5tb2RlbFRleENvb3JkcyksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIC8vINCh0L7Qt9C00LDQtdC8INC40L3QtNC10LrRgdC90YvQuSDQsdGD0YTQtdGAINC00LvRjyDRg9C60LDQt9Cw0L3QuNGPINC/0L7RgNGP0LTQutCwINCy0LXRgNGI0LjQvVxuICAgIHRoaXMubW9kZWxJbmRleEJ1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIC8vINCd0LDQt9C90LDRh9Cw0LXQvCDQtdCz0L4g0LDQutGC0LjQstC90YvQvFxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxJbmRleEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KHRoaXMubW9kZWxJbmRleGVzKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy8g0JHRg9GE0LXRgCDRgSDQvdC+0YDQvNCw0LvRj9C80LhcbiAgICB0aGlzLm1vZGVsTm9ybWFsQnVmZmVyT2JqZWN0ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRoaXMubW9kZWxOb3JtYWxzKSwgZ2wuU1RBVElDX0RSQVcpO1xufTtcblxuTW9kZWwucHJvdG90eXBlLmJpbmRCdWZmZXJzID0gZnVuY3Rpb24gKGdsKSB7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxWZXJ0ZXhCdWZmZXJPYmplY3QpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsVGV4Q29vcmRzQnVmZmVyT2JqZWN0KTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsSW5kZXhCdWZmZXJPYmplY3QpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsTm9ybWFsQnVmZmVyT2JqZWN0KTtcbn07IiwiLyoqXG4gKiBAcGFyYW0gY2FudmFzXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gZ2xDb250ZXh0XG4gKiBAcGFyYW0ge0ltYWdlfSBpbml0aWFsVGV4dHVyZVxuICogQHBhcmFtIHtzdHJpbmd9IHZlcnRleFNoYWRlclxuICogQHBhcmFtIHtzdHJpbmd9IGZyYWdtZW50U2hhZGVyXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTW9kZWxWaWV3KGNhbnZhcywgZ2xDb250ZXh0LCBpbml0aWFsVGV4dHVyZSwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcikge1xuXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5nbCA9IGdsQ29udGV4dDtcblxuICAgIHRoaXMudGV4dHVyZSA9IGluaXRpYWxUZXh0dXJlO1xuICAgIHRoaXMuaW5pdGlhbGl6ZSh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcblxuICAgIHRoaXMuY2FtZXJhID0gbmV3IENhbWVyYSgpO1xuXG4gICAgdGhpcy5zZXRUZXh0dXJlKGluaXRpYWxUZXh0dXJlKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZlcnRleFNoYWRlciAtIHZlcnRleCBzaGFkZXIgc291cmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnRTaGFkZXIgLSBmcmFnbWVudCBzaGFkZXIgc291cmNlXG4gKi9cbk1vZGVsVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKVxue1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG5cbiAgICAvLyDQktC60LvRjtGH0LDQtdC8INC/0YDQvtCy0LXRgNC60YMg0LPQu9GD0LHQuNC90YtcbiAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG5cbiAgICAvLyDQl9Cw0LTQsNC10Lwg0YbQstC10YIg0L7Rh9C40YHRgtC60LhcbiAgICBnbC5jbGVhckNvbG9yKDAuOCwgMC45LCAwLjkgLCAwLjApO1xuICAgIC8vINCe0YfQuNGB0YLQutCwIC0g0YfRgtC+INC+0YfQuNGJ0LDQtdC8IC0g0LHRg9GE0LXRgCDRhtCy0LXRgtCwLCDQuNC70Lgg0LbQtSDQsdGD0YTQtdGAINCz0LvRg9Cx0LjQvdGLXG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQpO1xuXG4gICAgdmFyIHNoYWRlckNvbXBpbGVyID0gbmV3IFNoYWRlckNvbXBpbGVyKGdsKTtcbiAgICB0aGlzLnNoYWRlclByb2dyYW0gPSBzaGFkZXJDb21waWxlci5tYWtlUHJvZ3JhbSh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcbn07XG5cbi8qKlxuICogU2V0cyBhIG5ldyB0ZXh0dXJlIGFzIGFjdGl2ZSB0ZXh0dXJlXG4gKiBcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXG4gKi9cbk1vZGVsVmlldy5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuXG4gICAgdGhpcy50ZXh0dXJlID0gaW1hZ2U7XG4gICAgdmFyIGdsID0gdGhpcy5nbDtcblxuICAgIC8vIENyZWF0aW5nIHRleHR1cmVcbiAgICB0aGlzLm1vZGVsVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAvLyBCaW5kaW5nIGl0XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5tb2RlbFRleHR1cmUpO1xuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xuICAgIC8vIGkgZm9yIGludGVnZXIgLCBzLCB0IC0gdSwgdlxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIC8vIEZpbHRlcnNcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICAvLyDQodCw0LzQsCDRgtC10LrRgdGC0YPRgNCwXG4gICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgZ2wuVEVYVFVSRV8yRCwgLy8gVGV4dHVyZSB0eXBlXG4gICAgICAgIDAsIC8vIERldGFpbCBsZXZlbFxuICAgICAgICBnbC5SR0JBLCAvLyBXaGF0IGZvcm1hdCBkbyB3ZSB1c2VcbiAgICAgICAgZ2wuUkdCQSxcbiAgICAgICAgZ2wuVU5TSUdORURfQllURSwgLy8gRGF0YSB0eXBlXG4gICAgICAgIHRoaXMudGV4dHVyZSAvLyBUZXh0dXJlIGl0c2VsZlxuICAgICk7XG4gICAgLy8gVW5iaW5kIGZvciBub3dcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbn07XG5cbi8qKlxuICogU2V0cyBhY3RpdmUgbW9kZWwgYW5kIGJpbmRzIGFsbCBvZiB0aGUgYnVmZmVyc1xuICpcbiAqIEBwYXJhbSB7TW9kZWx9IG1vZGVsXG4gKi9cbk1vZGVsVmlldy5wcm90b3R5cGUuc2V0TW9kZWwgPSBmdW5jdGlvbiAobW9kZWwpIHtcblxuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB2YXIgcHJvZ3JhbSA9IHRoaXMuc2hhZGVyUHJvZ3JhbTtcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuXG4gICAgbW9kZWwuYmluZEJ1ZmZlcnMoZ2wpO1xuXG4gICAgLy8g0KPQstC10LTQvtC80LvRj9C10Lwg0YjQtdC50LTQtdGAINC+INGC0L7QvCwg0LrQsNC6INCx0YDQsNGC0Ywg0LTQsNC90L3Ri9C1INC40Lcg0LHRg9GE0LXRgNCwINCyINC60LDRh9C10YHRgtCy0LUg0LLRhdC+0LTQvdGL0YUg0L/QsNGA0LDQvNC10YLRgNC+0LJcbiAgICB2YXIgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0UG9zaXRpb24nKTtcblxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBtb2RlbC5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgLy8g0L3QsNGIINCw0YLRgNC40LHRg9GCXG4gICAgICAgIDMsIC8vINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINCw0YLRgNC40LHRg9GCXG4gICAgICAgIGdsLkZMT0FULCAvLyDQotC40L8g0LrQsNC20LTQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQsdGD0YTQtdGA0LBcbiAgICAgICAgZ2wuRkFMU0UsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XG4gICAgICAgIDMgKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIC8vINCg0LDQt9C80LXRgCDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdGLICjQsdCw0LnRgilcbiAgICAgICAgMCAvLyDQntGC0YHRgtGD0L8gKNCyINCx0LDQudGC0LDRhSkg0L7RgiDQvdCw0YfQsNC70LAg0LTQsNC90L3Ri9GFLCDQv9GA0LjQvdCw0LTQu9C10LbQsNGJ0LjRhSDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdC1XG4gICAgKTtcbiAgICAvLyDQktC60LvRjtGH0LDQtdC8INCw0YLRgNC40LHRg9GCXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbW9kZWwubW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QpO1xuICAgIHZhciB0ZXhDb29yZEF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnRUZXhDb29yZCcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgIHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24sIC8vINC90LDRiCDQsNGC0YDQuNCx0YPRglxuICAgICAgICAyLCAvLyDQmtC+0LvQuNGH0LXRgdGC0LLQviDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDQsNGC0YDQuNCx0YPRglxuICAgICAgICBnbC5GTE9BVCwgLy8g0KLQuNC/INC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LHRg9GE0LXRgNCwXG4gICAgICAgIGdsLkZBTFNFLCAvLyDQndC+0YDQvNCw0LvQuNC30L7QstCw0L3QvdGL0Lkg0LLQuNC0P1xuICAgICAgICAyICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCAvLyDQoNCw0LfQvNC10YAg0L7QtNC90L7QuSDQstC10YDRiNC40L3RiyAo0LHQsNC50YIpXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxuICAgICk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbik7XG5cbiAgICAvLyDQndC+0YDQvNCw0LvQuCDQsiDRiNC10LnQtNC10YDQtVxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBtb2RlbC5tb2RlbE5vcm1hbEJ1ZmZlck9iamVjdCk7XG4gICAgdmFyIG5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnROb3JtYWwnKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICBub3JtYWxBdHRyaWJ1dGVMb2NhdGlvbiwgLy8g0L3QsNGIINCw0YLRgNC40LHRg9GCXG4gICAgICAgIDMsIC8vINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINCw0YLRgNC40LHRg9GCXG4gICAgICAgIGdsLkZMT0FULCAvLyDQotC40L8g0LrQsNC20LTQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQsdGD0YTQtdGA0LBcbiAgICAgICAgZ2wuVFJVRSwgLy8g0J3QvtGA0LzQsNC70LjQt9C+0LLQsNC90L3Ri9C5INCy0LjQtD9cbiAgICAgICAgMyAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxuICAgICAgICAwIC8vINCe0YLRgdGC0YPQvyAo0LIg0LHQsNC50YLQsNGFKSDQvtGCINC90LDRh9Cw0LvQsCDQtNCw0L3QvdGL0YUsINC/0YDQuNC90LDQtNC70LXQttCw0YnQuNGFINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90LVcbiAgICApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uKTtcblxufTtcblxuTW9kZWxWaWV3LnByb3RvdHlwZS5zdGFydFJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuXG4gICAgLy8g0JzQsNGC0YDQuNGG0YsgLSDQvNC10YHRgtC+0L/QvtC70L7QttC10L3QuNC1INCyINGI0LXQudC00LXRgNCw0YVcbiAgICB0aGlzLm1hdFdvcmxkVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgJ21Xb3JsZCcpO1xuICAgIHRoaXMubWF0Vmlld1VuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNoYWRlclByb2dyYW0sICdtVmlldycpO1xuICAgIHRoaXMubWF0UHJvamVjdGlvblVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNoYWRlclByb2dyYW0sICdtUHJvamVjdGlvbicpO1xuXG4gICAgLy8g0KHQsNC80Lgg0LzQsNGC0YDQuNGG0YtcbiAgICB0aGlzLndvcmxkTWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgdGhpcy5wcm9qZWN0aW9uTWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgbWF0NC5pZGVudGl0eSh0aGlzLndvcmxkTWF0cml4KTtcbiAgICBtYXQ0LnBlcnNwZWN0aXZlKHRoaXMucHJvamVjdGlvbk1hdHJpeCwgZ2xNYXRyaXgudG9SYWRpYW4oMzApLCB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuY2FudmFzLmhlaWdodCwgMC4xLCAxMDAwLjApO1xuICAgIFxuICAgIC8vINCa0LDQutGD0Y4g0YjQtdC50LTQtdGA0L3Rg9GOINC/0YDQvtCz0YDQsNC80LzRgyDQuNGB0L/QvtC70YzQt9GD0LXQvFxuICAgIGdsLnVzZVByb2dyYW0odGhpcy5zaGFkZXJQcm9ncmFtKTtcblxuICAgIC8vINCf0L7Qu9C1INC+0LHQt9C+0YDQsCAo0LIg0YDQsNC00LjQsNC90LDRhSksIGNsb3Nlc3QgcGxhbmUsIGZhciBwbGFuZVxuICAgIHRoaXMuZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLm1hdFdvcmxkVW5pZm9ybUxvY2F0aW9uLCB0aGlzLmdsLkZBTFNFLCB0aGlzLndvcmxkTWF0cml4KTtcblxuICAgIC8vINCf0LXRgNC10LTQsNC10Lwg0LIg0YjQtdC50LTQtdGALiBUUlVFIC0g0YfRgtC+0LHRiyDRgtGA0LDQvdGB0L/QvtC90LjRgNC+0LLQsNGC0YxcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubWF0V29ybGRVbmlmb3JtTG9jYXRpb24sIGdsLkZBTFNFLCB0aGlzLndvcmxkTWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubWF0Vmlld1VuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHRoaXMuY2FtZXJhLm1hdHJpeCk7XG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLm1hdFByb2plY3Rpb25Vbmlmb3JtTG9jYXRpb24sIGdsLkZBTFNFLCB0aGlzLnByb2plY3Rpb25NYXRyaXgpO1xuXG4gICAgdGhpcy5iaW5kQ2FudmFzSGFuZGxlcnMoKTtcblxuICAgIC8vINCh0LHQtdGA0LXQs9Cw0LXQvCDQstGL0YfQuNGB0LvQuNGC0LXQu9GM0L3Ri9C1INC80L7RidC90L7RgdGC0LhcbiAgICAvLyDQk9C70LDQstC90YvQuSDRhtC40LrRgCDRgNC10L3QtNC10YDQsFxuICAgIHRoaXMuYW5pbWF0aW9uUmVxdWVzdCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyByZW5kZXIgdmlld3BvcnRcbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS51cGRhdGVWaWV3cG9ydCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmdsLnZpZXdwb3J0KDAsIDAsIHRoaXMuZ2wuZHJhd2luZ0J1ZmZlcldpZHRoLCB0aGlzLmdsLmRyYXdpbmdCdWZmZXJIZWlnaHQpO1xufTtcblxuLyoqXG4gKiBSZW5kZXIgbG9vcFxuICovXG5Nb2RlbFZpZXcucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbiAoKVxue1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG4gICAgLy8g0J7QsdC90L7QstC70Y/QtdC8INC/0LXRgNC10LzQtdC90L3Rg9GOINCyINGI0LXQudC00LXRgNC1XG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLm1hdFZpZXdVbmlmb3JtTG9jYXRpb24sIGdsLkZBTFNFLCB0aGlzLmNhbWVyYS5tYXRyaXgpO1xuXG4gICAgLy8g0J3QsNC30L3QsNGH0LXQvdC40LUg0YLQtdC60YHRgtGD0YDRi1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMubW9kZWxUZXh0dXJlKTtcblxuICAgIC8vINCQ0LrRgtC40LLQvdGL0Lkg0YHQu9C+0YIg0YLQtdC60YHRgtGD0YDRi1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuXG4gICAgLy8g0KbQstC10YIg0L7Rh9C40YHRgtC60LhcbiAgICBnbC5jbGVhckNvbG9yKDAuOSwgMC45LCAwLjksIDEuMCk7XG4gICAgZ2wuY2xlYXIoZ2wuREVQVEhfQlVGRkVSX0JJVCB8IGdsLkNPTE9SX0JVRkZFUl9CSVQgKTtcblxuICAgIGdsLmRyYXdFbGVtZW50cyhcbiAgICAgICAgZ2wuVFJJQU5HTEVTLCAvLyDQmtCw0Log0YDQuNGB0YPQtdC8LFxuICAgICAgICB0aGlzLm1vZGVsLm1vZGVsSW5kZXhlcy5sZW5ndGgsXG4gICAgICAgIGdsLlVOU0lHTkVEX1NIT1JULCAvLyDQotC40L9cbiAgICAgICAgMCAvLyDQodC60L7Qu9GM0LrQviDQv9GA0L7Qv9GD0YHQutCw0Lwg0LLQtdGA0YjQuNC9XG4gICAgKTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xufTtcblxuXG5Nb2RlbFZpZXcucHJvdG90eXBlLmJpbmRDYW52YXNIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaXNNb3VzZVByZXNzZWQgPSBmYWxzZTtcbiAgICB2YXIgaW5pdGlhbEV2ZW50ID0gbnVsbDtcblxuICAgIHZhciBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcblxuICAgIHZhciBoYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNNb3VzZVByZXNzZWQgPSB0cnVlO1xuICAgICAgICBpbml0aWFsRXZlbnQgPSBlO1xuICAgIH07XG5cbiAgICB2YXIgaGFuZGxlTW91c2VVcCA9ICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpc01vdXNlUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICBpbml0aWFsRXZlbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICB2YXIgaGFuZGxlTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gYW5vdGhlciBxdWljayBoYWNrXG4gICAgICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTW91c2VQcmVzc2VkKSB7XG4gICAgICAgICAgICB2YXIgZGlmZlggPSBpbml0aWFsRXZlbnQuY2xpZW50WCAtIGUuY2xpZW50WDtcbiAgICAgICAgICAgIHZhciBkaWZmWSA9IGluaXRpYWxFdmVudC5jbGllbnRZIC0gZS5jbGllbnRZO1xuICAgICAgICAgICAgaW5pdGlhbEV2ZW50ID0gZTtcblxuICAgICAgICAgICAgY2FtZXJhLm1vdmUoZGlmZlgsIGRpZmZZKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBoYW5kbGVNb3VzZURvd24pO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBoYW5kbGVNb3VzZURvd24pO1xuXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgaGFuZGxlTW91c2VVcCk7XG5cbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVNb3VzZU1vdmUpO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG59OyIsIi8qKlxuICogU2hhZGVyIGNvbXBpbGVyXG4gKiBTaW1wbHkgbWFrZXMgV2ViR0xQcm9ncmFtIGZyb20gc2hhZGVyIHNvdXJjZXNcbiAqXG4gKiBAcGFyYW0ge1dlYkdMUmVuZGVyaW5nQ29udGV4dH0gd2ViR0xSZW5kZXJpbmdDb250ZW50XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU2hhZGVyQ29tcGlsZXIod2ViR0xSZW5kZXJpbmdDb250ZW50KSB7XG4gICAgdGhpcy53ZWJHTENvbnRleHQgPSB3ZWJHTFJlbmRlcmluZ0NvbnRlbnQ7ICAgICBcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZlcnRleFNoYWRlclNvdXJjZVxuICogQHBhcmFtIHtzdHJpbmd9IGZyYWdtZW50U2hhZGVyU291cmNlXG4gKiBAcmV0dXJuIHtXZWJHTFByb2dyYW19XG4gKi9cblNoYWRlckNvbXBpbGVyLnByb3RvdHlwZS5tYWtlUHJvZ3JhbSA9IGZ1bmN0aW9uICh2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKSB7XG4gICAgdmFyIGdsID0gdGhpcy53ZWJHTENvbnRleHQ7XG5cbiAgICAvLyBDcmVhdGluZyBzaGFkZXJcbiAgICB2YXIgdmVydGV4U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xuICAgIHZhciBmcmFnbWVudFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuXG4gICAgLy8gU2V0dGluZyBzaGFkZXIgc291cmNlc1xuICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXIsIHZlcnRleFNoYWRlclNvdXJjZSk7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVyLCBmcmFnbWVudFNoYWRlclNvdXJjZSk7XG5cbiAgICAvLyBDb21waWxpbmcgc2hhZGVyXG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xuXG4gICAgLy8gQ2hlY2tpbmcgY29tcGlsYXRpb24gc3RhdHVzXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodmVydGV4U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBjb21waWxpbmcgdmVydGV4IHNoYWRlciEnLCBnbC5nZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcikpO1xuXG4gICAgfVxuXG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGNvbXBpbGluZyBmcmFnbWVudCBzaGFkZXIhJywgZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnbWVudFNoYWRlcikpO1xuICAgIH1cblxuICAgIC8vIFdlIHdhbnQgdG8gbWFrZSBhIHByb2dyYW0gc2hhZGVyIHNvdXJjZXNcbiAgICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKTtcblxuICAgIC8vIFdlYkdMIGtub3dzIHR5cGUgb2YgZWFjaCBzaGFkZXJcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdmVydGV4U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xuXG4gICAgLy8gTGlua2luZ1xuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgLy8gRG8gd2UgaGF2ZSBsaW5raW5nIGVycm9ycz9cbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTGlua2luZyBlcnJvciEnLCBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XG4gICAgfVxuXG4gICAgLy8gT25seSBmb3IgdGVzdGluZyBwdXJwb3Nlc1xuICAgIGdsLnZhbGlkYXRlUHJvZ3JhbShwcm9ncmFtKTtcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuVkFMSURBVEVfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbGlkYXRpbmcgZXJyb3IhJywgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9ncmFtO1xufTtcblxuIiwiIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSBwbGFjZSB3aGVyZSBtYWdpYyBoYXBwZW5zLlxuICogSGFuZGxpbmcgZXZlbnRzXG4gKlxuICogQHBhcmFtIHtDYW52YXNTdXJmYWNlfSBzdXJmYWNlXG4gKiBAcGFyYW0ge01vZGVsVmlld30gbW9kZWxWaWV3XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ29tcG9uZW50c1BhbmVsKHN1cmZhY2UsIG1vZGVsVmlldylcbntcbiAgICB0aGlzLl9zdXJmYWNlID0gc3VyZmFjZTtcbiAgICBcbiAgICB0aGlzLl9maWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZVVwbG9hZGVyJyk7XG4gICAgdGhpcy5fYnRuVXBkYXRlVGV4dHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGRhdGVUZXh0dXJlJyk7XG4gICAgdGhpcy5fYnRuQWRkVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5BZGRUZXh0Jyk7XG4gICAgdGhpcy5fc2VsZWN0QmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RCYWNrZ3JvdW5kJyk7XG4gICAgdGhpcy5fbW9kZWxWaWV3ID0gbW9kZWxWaWV3O1xufVxuXG5Db21wb25lbnRzUGFuZWwucHJvdG90eXBlLmJpbmRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgXG4gICAgLy8gQWRkIGxpc3RlbmVyIGZvciBhIGNsaWNrIGV2ZW50IG9uIHRleHQgYnV0dG9uXG4gICAgdGhpcy5fYnRuQWRkVGV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5wdXNoTGFiZWwoKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBVcGRhdGUgY3VycmVudCB0ZXh0dXJlIGJ1dHRvblxuICAgIHRoaXMuX2J0blVwZGF0ZVRleHR1cmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX21vZGVsVmlldy5zZXRUZXh0dXJlKHNlbGYuX3N1cmZhY2UudG9JbWFnZSgpKTtcbiAgICB9KTtcblxuICAgIC8vIE9uIGNsaWNrIHdlIHNldCBjdXJyZW50IHZhbHVlIHRvIGVtcHR5IGFuZCB0aGUgcmVhc29uXG4gICAgLy8gd2h5IHdlIGFyZSBkb2luZyB0aGlzIGlzIGJlY2F1c2Ugd2Ugd2FudCB0b1xuICAgIC8vIGFkZCBuZXcgaW1hZ2Ugb24gdGhlIHN1cmZhY2UsIGV2ZW4gaWYgaXQgaXMgdGhlXG4gICAgLy8gc2FtZSBmaWxlIChpbiBjYXNlIGlmIHVzZXIgc2VsZWN0ZWQgaXQgZWFybGllcilcbiAgICB0aGlzLl9maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgfSk7XG5cbiAgICAvLyBTZXR0aW5nIGNsZWFyIGNvbG9yIGZvciBhIGNhbnZhcyBzdXJmYWNlXG4gICAgdGhpcy5fc2VsZWN0QmFja2dyb3VuZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFRoZXJlIGlzIGFuIGVtcHR5IHZhbHVlIGluIHRoZSBsaXN0XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBzZWxmLl9zdXJmYWNlLnNldENsZWFyQ29sb3IodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBPbiBjaGFuZ2Ugd2UgYXJlIGxvYWRpbmcgYSBmaWxlLlxuICAgIHRoaXMuX2ZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyBXZSBuZWVkIG9ubHkgb25lIGZpbGUuXG4gICAgICAgIC8vIFRoZSBmaXJzdCBvbmUuXG4gICAgICAgIHZhciBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGRhdGFJbWFnZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBkYXRhSW1hZ2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGFkZGluZyB1cGxvYWRlZCBpbWFnZSB0byB0aGUgc3VyZmFjZVxuICAgICAgICAgICAgc2VsZi5fc3VyZmFjZS5wdXNoSW1hZ2UoaW1hZ2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9KTtcbn07XG4iLCIvKipcbiAqIFBhbmVsIGZvciBpbnRlcmFjdGluZyB3aXRoIG1vZGVsIHZpZXcgZWxlbWVudFxuICogWm9vbWluZywgdHlwZSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge01vZGVsVmlld30gbW9kZWxWaWV3XG4gKiBAcGFyYW0ge3tNb2RlbH19IG1vZGVsc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1vZGVsVmlld1BhbmVsKG1vZGVsVmlldywgbW9kZWxzKVxue1xuICAgIHRoaXMuX2J0blpvb21JbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5ab29tSW4nKTtcbiAgICB0aGlzLl9idG5ab29tT3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blpvb21PdXQnKTtcbiAgICB0aGlzLl9jdXBUeXBlU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cFR5cGVTZWxlY3QnKTtcblxuICAgIHRoaXMuX21vZGVsVmlldyA9IG1vZGVsVmlldztcbiAgICB0aGlzLl9tb2RlbHMgPSBtb2RlbHM7XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzXG4gKi9cbk1vZGVsVmlld1BhbmVsLnByb3RvdHlwZS5iaW5kSGFuZGxlcnMgPSBmdW5jdGlvbiAoKVxue1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFpvb21pbmcgYnV0dG9uc1xuICAgIHRoaXMuX2J0blpvb21Jbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fbW9kZWxWaWV3LmNhbWVyYS56b29tSW4oKTtcbiAgICB9KTtcbiAgICB0aGlzLl9idG5ab29tT3V0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9tb2RlbFZpZXcuY2FtZXJhLnpvb21PdXQoKTtcbiAgICB9KTtcblxuICAgIC8vIENoYW5naW5nIG1vZGVsIHR5cGVcbiAgICB0aGlzLl9jdXBUeXBlU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gdGhpcy52YWx1ZTtcbiAgICAgICAgc2VsZi5fbW9kZWxWaWV3LnNldE1vZGVsKHNlbGYuX21vZGVsc1tzZWxlY3RlZF0pO1xuICAgIH0pO1xufTsiLCIvKipcbiAqIFBhcnQgb2YgdGhlIGRvY3VtZW50IGZvciBtYW5pcHVsYXRpb24gd2l0aCBwcm9wZXJ0aWVzIFxuICogb2YgdGhlIHNlbGVjdGVkIFVJRWxlbWVudCBvbiBDYW52YXNTdXJmYWNlXG4gKlxuICogQXdhcmUgb2YgdGhlIGRvY3VtZW50IGNvbnRlbnRcbiAqIEhhbmRsZXMgSFRNTCBtYW5pcHVsYXRpb25zXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFByb3BlcnRpZXNQYW5lbChzdXJmYWNlKVxue1xuICAgIHRoaXMuX3RleHRQYW5lbCA9IHtcbiAgICAgICAgcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0T3B0aW9ucycpLFxuICAgICAgICBzZWxlY3RGb250OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9udFNlbGVjdCcpLFxuICAgICAgICBzZWxlY3RDb2xvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yRm9udFNlbGVjdCcpLFxuICAgICAgICB0ZXh0QXJlYTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGVkVGV4dENvbnRlbnQnKSxcbiAgICAgICAgdGV4dFVwQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dFVwQnRuJyksXG4gICAgICAgIHRleHREb3duQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dERvd25CdG4nKVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5fY29tbW9uUGFuZWwgPSB7XG4gICAgICAgIHBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbW9uT3B0aW9ucycpLFxuICAgICAgICByZW1vdmVCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmVCdG4nKSxcbiAgICAgICAgdXBCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cEJ0bicpLFxuICAgICAgICBkb3duQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG93bkJ0bicpXG4gICAgfTtcbiAgICBcbiAgICB0aGlzLl9pbWFnZVBhbmVsID0ge1xuICAgICAgICBwYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlT3B0aW9ucycpXG4gICAgfTtcbiAgICB0aGlzLl9lbXB0eVBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vU2VsZWN0ZWRPcHRpb25zJyk7XG4gICAgXG4gICAgdGhpcy5fc2VsZWN0ZWRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl9zdXJmYWNlID0gc3VyZmFjZTtcbn1cblxuLyoqXG4gKiBCaW5kcyBoYW5kbGVycyB0byB0aGUgZXZlbnRzXG4gKi9cblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuYmluZEhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFNlbGVjdGlvbiBldmVudHMgZnJvbSBjYW52YXMgc3VyZmFjZVxuICAgIHRoaXMuX3N1cmZhY2UuYWRkU2VsZWN0RXZlbnRIYW5kbGVyKGZ1bmN0aW9uICh1aUVsZW1lbnQpIHtcbiAgICAgICAgc2VsZi5zZXRTZWxlY3RlZCh1aUVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHRoaXMuX3N1cmZhY2UuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnNldFNlbGVjdGVkKG51bGwpO1xuICAgIH0pO1xuXG4gICAgLy8gQnV0dG9uIGNsaWNrIGZvciBjb21tb24gb3B0aW9ucyAtIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudFxuICAgIHRoaXMuX2NvbW1vblBhbmVsLnJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbW92ZVNlbGVjdGVkKCk7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBNb3ZlIGZvcmVncm91bmRcbiAgICB0aGlzLl9jb21tb25QYW5lbC51cEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnNlbGVjdGVkVG9Gb3JlZ3JvdW5kKCk7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBNb3ZlIGJhY2tncm91bmRcbiAgICB0aGlzLl9jb21tb25QYW5lbC5kb3duQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNlbGYuX3N1cmZhY2Uuc2VsZWN0ZWRUb0JhY2tncm91bmQoKTtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIEJpbmRpbmcgdGV4dCBjaGFuZ2UgZXZlbnQgdGhyb3VnaCB0ZXh0IGFyZWEgZWxlbWVudFxuICAgIHRoaXMuX3RleHRQYW5lbC50ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIElmIHRoaXMgZXZlbnQgaGFwcGVuZWRcbiAgICAgICAgLy8gdGhlbiB3ZSBoYXZlIGEgbGFiZWwgYXMgc2VsZWN0ZWQgZWxlbWVudFxuICAgICAgICBzZWxmLl9zZWxlY3RlZEVsZW1lbnQuc2V0VGV4dCh0aGlzLnZhbHVlKTtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIFVwZGF0ZXMgc2VsZWN0ZWQgZm9udFxuICAgIHRoaXMuX3RleHRQYW5lbC5zZWxlY3RGb250LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fc2VsZWN0ZWRFbGVtZW50LnNldEZvbnQodGhpcy52YWx1ZSk7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGVzIHNlbGVjdGVkIGNvbG9yXG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdENvbG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fc2VsZWN0ZWRFbGVtZW50LnNldENvbG9yKHRoaXMudmFsdWUpO1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBTZXRzIHNlbGVjdGVkIGVsZW1lbnQuXG4gKiBTaG93IHByb3BlcnRpZXMgd2luZG93IGRlcGVuZGluZyBvbiB3aGF0IGlzIHRoZSB0eXBlIG9mIGFuIGVsZW1lbnQgXG4gKiBcbiAqIEBwYXJhbSB7VUlFbGVtZW50fG51bGx9IHVpRWxlbWVudFxuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLnNldFNlbGVjdGVkID0gZnVuY3Rpb24gKHVpRWxlbWVudCkge1xuICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudCA9IHVpRWxlbWVudDtcbiAgICBcbiAgICBpZiAodWlFbGVtZW50IGluc3RhbmNlb2YgVUlMYWJlbEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zaG93VGV4dFByb3BlcnRpZXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBpZiAodWlFbGVtZW50IGluc3RhbmNlb2YgVUlJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zaG93SW1hZ2VQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBcbiAgICB0aGlzLnNob3dOb3RoaW5nU2VsZWN0ZWRQYW5lbCgpO1xufTtcblxuLyoqXG4gKiBIaWRlcyBhbGwgb2YgdGhlIHBhbmVsc1xuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLmhpZGVBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIHRoaXMuX2ltYWdlUGFuZWwucGFuZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy5fY29tbW9uUGFuZWwucGFuZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy5fZW1wdHlQYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn07XG5cbi8qKlxuICogSGlkZXMgYWxsIGV4Y2VwdCB0ZXh0IHByb3BlcnRpZXMgcGFuZWxcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zaG93VGV4dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaWRlQWxsKCk7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnRleHRBcmVhLmlubmVySFRNTCA9IHRoaXMuX3NlbGVjdGVkRWxlbWVudC5nZXRUZXh0KCk7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdEZvbnQudmFsdWUgPSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQuZ2V0Rm9udCgpO1xuICAgIHRoaXMuX3RleHRQYW5lbC5zZWxlY3RDb2xvci52YWx1ZSA9IHRoaXMuX3NlbGVjdGVkRWxlbWVudC5nZXRDb2xvcigpO1xuICAgIHRoaXMuX3RleHRQYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB0aGlzLl9jb21tb25QYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07XG5cbi8qKlxuICogSGlkZXMgZXZlcnl0aGluZyBleGNlcHQgaW1hZ2VzIHBhbmVsXG4gKi9cblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd0ltYWdlUHJvcGVydGllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmhpZGVBbGwoKTtcbiAgICB0aGlzLl9pbWFnZVBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIHRoaXMuX2NvbW1vblBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufTtcblxuLyoqXG4gKiBIaWRlcyBhbGwgZXhjZXB0IFwibm90aGluZyBzZWxlY3RlZFwiIHBhbmVsXG4gKi9cblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd05vdGhpbmdTZWxlY3RlZFBhbmVsID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGlkZUFsbCgpO1xuICAgIHRoaXMuX2VtcHR5UGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59OyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgdmFyIHN1cmZhY2UgPSBuZXcgQ2FudmFzU3VyZmFjZShjYW52YXMpO1xuICAgIHN1cmZhY2UucmVuZGVyKCk7XG5cbiAgICAvLyBDcmVhdGUgcHJvcGVydGllcyBwYW5lbFxuICAgIC8vIGFuZCBhdHRhY2hpbmcgaXQgdG8gY2FudmFzIGV2ZW50c1xuICAgIHZhciBwcm9wZXJ0aWVzUGFuZWwgPSBuZXcgUHJvcGVydGllc1BhbmVsKHN1cmZhY2UpO1xuICAgIHByb3BlcnRpZXNQYW5lbC5iaW5kSGFuZGxlcnMoKTtcblxuICAgIHZhciBjdXBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VwQ2FudmFzJyk7XG4gICAgdmFyIGxvYWRlciA9IG5ldyBSZXNvdXJjZUxvYWRlcigpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge01vZGVsVmlld31cbiAgICAgKi9cbiAgICB2YXIgbW9kZWxWaWV3O1xuXG4gICAgdmFyIHJlc291cmNlUHJlcGFyZXIgPSBuZXcgUmVzb3VyY2VQcmVwYXJlcihsb2FkZXIsIFtcbiAgICAgICAge2tleTogJ21vZGVsQ3VwMScsIHNyYzogJy9tb2RlbHMvY3VwMS5qc29uJywgdHlwZTogJ2pzb24nfSxcbiAgICAgICAge2tleTogJ21vZGVsQ3VwMicsIHNyYzogJy9tb2RlbHMvY3VwMi5qc29uJywgdHlwZTogJ2pzb24nfSxcbiAgICAgICAge2tleTogJ3ZlcnRleFNoYWRlcicsIHNyYzogJy9zaGFkZXJzL2ZyYWdtZW50Lmdsc2wnLCB0eXBlOiAndGV4dCd9LFxuICAgICAgICB7a2V5OiAnZnJhZ21lbnRTaGFkZXInLCBzcmM6ICcvc2hhZGVycy92ZXJ0ZXguZ2xzbCcsIHR5cGU6ICd0ZXh0J30sXG4gICAgICAgIHtrZXk6ICdpbml0aWFsVGV4dHVyZScsIHNyYzogJy9pbWcvbG9nb0dyZXkuanBnJywgdHlwZTogJ2ltYWdlJ31cbiAgICBdLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gVE9ETzogZXh0cmFjdCBhbGwgY2hlY2tzXG4gICAgICAgIHZhciBnbENvbnRleHQgPSBjdXBDYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKTtcblxuICAgICAgICBpZiAoIWdsQ29udGV4dCkge1xuICAgICAgICAgICAgZ2xDb250ZXh0ID0gY3VwQ2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWdsQ29udGV4dCkge1xuICAgICAgICAgICAgYWxlcnQoJ1NlZW1zIGxpa2UgeW91ciBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgV2ViR0wuIENvbWUgYmFjayBsYXRlciB3aGVuIHlvdSB1cGRhdGUgeW91ciBicm93c2VyIScpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJHTCBzdXBwb3J0IGlzIHJlcXVpcmVkIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8ga2V5IG11c3QgYmUgc2FtZSBhcyBzZWxlY3Qgb3B0aW9uIHZhbHVlXG4gICAgICAgIHZhciBtb2RlbHMgPSB7XG4gICAgICAgICAgICBjdXAxOiBuZXcgTW9kZWwoZ2xDb250ZXh0LCBTdG9yYWdlLmdldCgnbW9kZWxDdXAxJykpLFxuICAgICAgICAgICAgY3VwMjogbmV3IE1vZGVsKGdsQ29udGV4dCwgU3RvcmFnZS5nZXQoJ21vZGVsQ3VwMicpKVxuICAgICAgICB9O1xuXG4gICAgICAgIG1vZGVsVmlldyA9IG5ldyBNb2RlbFZpZXcoXG4gICAgICAgICAgICBjdXBDYW52YXMsXG4gICAgICAgICAgICBnbENvbnRleHQsXG4gICAgICAgICAgICBTdG9yYWdlLmdldCgnaW5pdGlhbFRleHR1cmUnKSxcbiAgICAgICAgICAgIFN0b3JhZ2UuZ2V0KCdmcmFnbWVudFNoYWRlcicpLFxuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ3ZlcnRleFNoYWRlcicpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gU2V0dGluZyBpbml0aWFsIG1vZGVsIGN1cFxuICAgICAgICBtb2RlbFZpZXcuc2V0TW9kZWwobW9kZWxzLmN1cDEpO1xuICAgICAgICBtb2RlbFZpZXcuc3RhcnRSZW5kZXIoKTtcblxuICAgICAgICAvLyBQYW5lbCBmb3IgY3JlYXRpbmcgbmV3IGVsZW1lbnRzIG9uXG4gICAgICAgIHZhciBjb21wb25lbnRQYW5lbCA9IG5ldyBDb21wb25lbnRzUGFuZWwoc3VyZmFjZSwgbW9kZWxWaWV3KTtcbiAgICAgICAgY29tcG9uZW50UGFuZWwuYmluZEhhbmRsZXJzKCk7XG5cbiAgICAgICAgLy8gUGFuZWwgZm9yIDNEIG1hZ2ljXG4gICAgICAgIHZhciBtb2RlbFZpZXdQYW5lbCA9IG5ldyBNb2RlbFZpZXdQYW5lbChtb2RlbFZpZXcsIG1vZGVscyk7XG4gICAgICAgIG1vZGVsVmlld1BhbmVsLmJpbmRIYW5kbGVycygpO1xuICAgIH0pO1xuXG4gICAgdmFyIGRyYXdpbmdDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJhd2luZ0NvbnRhaW5lcicpO1xuICAgIHZhciBtb2RlbFZpZXdDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VwQ2FudmFzQ29udGFpbmVyJyk7XG5cbiAgICB2YXIgZml0Q2FudmFzU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQ2hhbmdpbmcgc2l6ZSBvZiB0aGUgZHJhd2luZ1xuICAgICAgICB2YXIgZHJhd2luZ0NhbnZhc1JhdGlvID0gc3VyZmFjZS5jYW52YXMud2lkdGggLyBzdXJmYWNlLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHZhciBuZXdXaWR0aCA9IGRyYXdpbmdDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIHZhciBuZXdIZWlnaHQgPSBuZXdXaWR0aCAvIGRyYXdpbmdDYW52YXNSYXRpbztcblxuICAgICAgICBzdXJmYWNlLmNhbnZhcy53aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICBzdXJmYWNlLmNhbnZhcy5oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgIHN1cmZhY2UucmVuZGVyKCk7XG5cbiAgICAgICAgdmFyIG1vZGVsVmlld1JhdGlvID0gY3VwQ2FudmFzLndpZHRoIC8gY3VwQ2FudmFzLmhlaWdodDtcbiAgICAgICAgdmFyIG5ld1dpZHRoTW9kZWxWaWV3ID0gbW9kZWxWaWV3Q29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgICBjdXBDYW52YXMud2lkdGggPSBuZXdXaWR0aE1vZGVsVmlldztcbiAgICAgICAgY3VwQ2FudmFzLmhlaWdodCA9IG5ld1dpZHRoTW9kZWxWaWV3IC8gbW9kZWxWaWV3UmF0aW87XG4gICAgICAgIFxuICAgICAgICBpZiAobW9kZWxWaWV3KSB7XG4gICAgICAgICAgICBtb2RlbFZpZXcudXBkYXRlVmlld3BvcnQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZml0Q2FudmFzU2l6ZSgpO1xuXG4gICAgLy8gTGlzdGVuIGZvciByZXNpemUgZXZlbnQgdG8gcmVzaXplIGNhbnZhc1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmaXRDYW52YXNTaXplKTtcblxuICAgIHJlc291cmNlUHJlcGFyZXIuc3RhcnRMb2FkaW5nKCk7XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
