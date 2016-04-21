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
    this.context.fillStyle = "#FFFFFF";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

/**
 * Renders all of the elements on the surface.
 */
CanvasSurface.prototype.renderElements = function () {
    var selectedIndex = this.elements.getSelectedIndex();
    for (var i = 0; i < this.elements.length; i++) {
        this.elements.get(i).render();
        if (i == selectedIndex) {
            // TODO: check if we are creating texture
            new CanvasUISelectedView(this.context).render(this.elements.get(i));
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
    var image = new Image();
    image.src = this.canvas.toDataURL();
    return image;
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
 * Ugly method.
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
    if (!context instanceof CanvasRenderingContext2D) {
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
 *
 * @param {CanvasRenderingContext2D} context
 * @constructor
 */
function CanvasUILabelView(context) {
    CanvasUIElementView.call(this, context);
}

CanvasUILabelView.prototype = Object.create(CanvasUIElementView.prototype);

/**
 *
 * @param {UIElement} element
 */
CanvasUILabelView.prototype.render = function (element) {
    var fontSize = element.getSize().getHeight();

    // TODO: color styles


    this.context.font = fontSize + "px Arial";
    this.context.fillStyle = "#000000";
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
 * @param context
 * @constructor
 */
function CanvasUISelectedView(context) {
    if (!context instanceof CanvasRenderingContext2D) {
        throw new TypeError('Canvas UI Element View error! Context does not have type CanvasRenderingContext2D!');
    }

    /**
     * @type {CanvasRenderingContext2D}
     */
    this.context = context;
}

CanvasUISelectedView.prototype = Object.create(CanvasUIElementView.prototype);

CanvasUISelectedView.prototype.render = function (element) {

    var iconResizeWidth = 15;
    this.context.font = iconResizeWidth + "px Arial";
    this.context.fillStyle = "#2e6da4";
    this.context.textBaseline = 'bottom';

    this.context.fillText(
        '\u21f2',
        element.getPosition().getX() + element.getSize().getWidth() - iconResizeWidth,
        element.getPosition().getY() + element.getSize().getHeight(),
        iconResizeWidth
    );

    //this.⇘
    this.context.strokeStyle = "#2e6da4";
    this.context.strokeRect(
        element.getPosition().getX(),
        element.getPosition().getY(),
        element.getSize().getWidth(),
        element.getSize().getHeight()
    );
};
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
Size.defaultWidth = 50;

/**
 * const for default height
 * @type {number}
 */
Size.defaultHeight = 50;
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
 * @param {string} content
 */
Storage.get = function (key, content) {
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
    this.style = style;
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

UILabelElement.defaultText = "Введите текст...";
/**
 * TODO: refactor this!111111one
 *
 * Actually I took this form an old project,
 * so do not watch the code here too much
 * 
 * @param canvas
 * @param model
 * @param initialTexture
 * @param vertexShader
 * @param fragmentShader
 * @constructor
 */
function ModelView(canvas, model, initialTexture, vertexShader, fragmentShader) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl');
    if (!this.gl) {
        alert('some error');
    }
    
    this.model = model;
    this.texture = initialTexture;
    this.vertexShaderSource = vertexShader;
    this.fragmentShaderSource = fragmentShader;
    this.setTexture(initialTexture);
}

/**
 * Sets a new texture
 * 
 * @param {Image} image
 */
ModelView.prototype.setTexture = function (image) {
    // TODO implement texture update
    this.texture = image;

    var gl = this.gl;

    // Создаем текстуру
    this.modelTexture = gl.createTexture();
    // Назначаем ее
    gl.bindTexture(gl.TEXTURE_2D, this.modelTexture);
    // Говорим, как мы и что хотим рисовать
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    // i for integer , s, t - u, v
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    // Как точки назначаются
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    // Сама текстура
    gl.texImage2D(
        gl.TEXTURE_2D, // Тип текстуры
        0, // Уровень детализации
        gl.RGBA, // Формат
        gl.RGBA,
        gl.UNSIGNED_BYTE, // Тип данных
        this.texture // Сама текстура
    );
    // Разназначаем
    gl.bindTexture(gl.TEXTURE_2D, null);
};

ModelView.prototype.startRender = function () {
    var gl = this.gl;
    
    // Включаем проверку глубины
    gl.enable(gl.DEPTH_TEST);
    
    // Задаем цвет очистки
    gl.clearColor(0.8, 0.9, 0.9 ,1.0);
    // Очистка - что очищаем - буфер цвета, или же буфер глубины
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Создаем шейдеры
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Указываем исходный код шейдеров
    gl.shaderSource(vertexShader, this.vertexShaderSource);
    gl.shaderSource(fragmentShader, this.fragmentShaderSource);

    // Компиляция шейдеров
    gl.compileShader(vertexShader);

    // Проверка статуса компиляции
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error('Error compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
        return;
    }

    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error('Error compiling vertex shader!', gl.getShaderInfoLog(fragmentShader));
        return;
    }

    // Сообщаем WebGL, что мы хоти использовать эти шейдеры
    var program = gl.createProgram();

    // WebGL знает, какой шейдер какой тип имеет
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // Линкуем
    gl.linkProgram(program);

    // Ошибки линковки
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Linking error!', gl.getProgramInfoLog(program));
        return;
    }

    // Только для тестирования - ловит доп. ошибки
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
        console.error('Validating error!', gl.getProgramInfoLog(program));
        return;
    }

    var model = this.model;

    // Создаем буферы
    var modelVertexes = model.meshes[0].vertices;
    var modelIndexes = Array.prototype.concat.apply([], model.meshes[0].faces);
    var modelTexCoords = model.meshes[0].texturecoords[0];

    // Создаем буфер - через него передается информация в GPU
    var modelVertexBufferObject = gl.createBuffer();
    // Назначаем его активным
    gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexBufferObject);
    // STATIC_DRAW - копируем единожды из CPU в GPU
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelVertexes), gl.STATIC_DRAW);

    // Отдельный буфер для текстурных координат
    var modelTexCoordsBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, modelTexCoordsBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(modelTexCoords), gl.STATIC_DRAW);

    // Создаем индексный буфер для указания порядка вершин
    var maskIndexBufferObject = gl.createBuffer();
    // Назначаем его активным
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, maskIndexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(modelIndexes), gl.STATIC_DRAW);

    // Уведомляем шейдер о том, как брать данные из буфера в качестве входных параметров
    var positionAttributeLocation = gl.getAttribLocation(program, 'vertPosition');

    gl.bindBuffer(gl.ARRAY_BUFFER, modelVertexBufferObject);
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

    gl.bindBuffer(gl.ARRAY_BUFFER, modelTexCoordsBufferObject);
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


    // Матрицы - местоположение в шейдерах
    var matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(program, 'mView');
    var matProjectionUniformLocation = gl.getUniformLocation(program, 'mProjection');

    // Сами матрицы
    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projectionMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);
    // Позиция наблюдателя, куда он смотрит, плюс вектор верха
    mat4.lookAt(viewMatrix, [0, 0, -5], [0, 0, 0], [0, 1, 0]);
    // Поле обзора (в радианах), viewport, closest plane, far plane
    mat4.perspective(projectionMatrix, glMatrix.toRadian(30), this.canvas.width / this.canvas.height, 0.001, 10.0);

    // Какую шейдерную программу используем
    gl.useProgram(program);

    // Передаем в шейдер. TRUE - чтобы транспонировать
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
    gl.uniformMatrix4fv(matProjectionUniformLocation, gl.FALSE, projectionMatrix);

    // Угол вращения
    var angleX = 0;
    var angleY = 0;
    var isMousePressed = false;
    var initialEvent = null;
    // Это уже отсебятина пошла
    this.canvas.addEventListener('mousedown', function(e) {
        isMousePressed = true;
        initialEvent = e;
    });
    this.canvas.addEventListener('mouseup', function (e) {
        isMousePressed = false;
        initialEvent = null;
    });
    this.canvas.addEventListener('mousemove', function (e) {
        if (isMousePressed) {
            var diffX = initialEvent.clientX - e.clientX;
            var diffY = initialEvent.clientY - e.clientY;
            initialEvent = e;
            angleY += - (diffX / 200);
            angleX +=  (diffY / 200);
        }
    });

    var self = this;

    // Сберегаем вычислительные мощности
    // Главный цикр рендера
    var identityMatrix = new Float32Array(16);
    mat4.identity(identityMatrix);
    var loop = function () {
        // Какую матрицу вокруг какой вращаем
        mat4.rotate(worldMatrix, identityMatrix, angleX, [1, 0, 0]);
        mat4.rotate(worldMatrix, worldMatrix, angleY, [0, 1, 0]);
        // Обновляем переменную в шейдере
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

        // Назначение текстуры
        gl.bindTexture(gl.TEXTURE_2D, self.modelTexture);
        // Слот
        gl.activeTexture(gl.TEXTURE0);

        gl.clearColor(0.8, 0.9, 0.9 ,1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT );

        gl.drawElements(
            gl.TRIANGLES, // Как рисуем,
            modelIndexes.length,
            gl.UNSIGNED_SHORT, // Тип
            0 // Сколько пропускам вершин
        );
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
};
/**
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
    this._surface.addSelectEventHandler(function (uiElement) {
        self.setSelected(uiElement);
    });
    this._surface.addDeselectEventHandler(function () {
        self.setSelected(null);
    });

    // Binding text change event through text area element
    this._textPanel.textArea.addEventListener('input', function (e) {
        // If this event happened
        // then we have a label as selected element
        self._selectedElement.setText(this.value);
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
    this._emptyPanel.classList.add('hidden');
};

/**
 * Hides all except text properties panel
 */
PropertiesPanel.prototype.showTextProperties = function () {
    this.hideAll();
    this._textPanel.textArea.innerHTML = this._selectedElement.getText();
    this._textPanel.panel.classList.remove('hidden');
};

/**
 * Hides everything except images panel
 */
PropertiesPanel.prototype.showImageProperties = function () {
    this.hideAll();
    this._imagePanel.panel.classList.remove('hidden');
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

    var buttonAddElement = document.getElementById('btnAddText');

    // Add event listener for click
    buttonAddElement.addEventListener('click', function () {
        surface.pushLabel();
    });

    surface.render();

    // Create properties panel
    // and attaching it to canvas events
    var propertiesPanel = new PropertiesPanel(surface);
    propertiesPanel.bindHandlers();
    

    // Initializing model viewer
    var modelView = null;
    var cupSurface = document.getElementById('cupSurface');
    var loader = new ResourceLoader();

    var resourcePreparer = new ResourcePreparer(loader, [
        {key: 'model', src: '/models/cupModel.json', type: 'json'},
        {key: 'vertexShader', src: '/shaders/fragment.glsl', type: 'text'},
        {key: 'fragmentShader', src: '/shaders/vertex.glsl', type: 'text'},
        {key: 'initialTexture', src: '/img/logoGrey.jpg', type: 'image'}
    ], function () {

        modelView = new ModelView(
            cupSurface,
            Storage.get('model'),
            Storage.get('initialTexture'),
            Storage.get('fragmentShader'),
            Storage.get('vertexShader')
        );
        modelView.startRender();
    });
    
    
    // TODO: more elegant way to do this
    document.getElementById('updateTexture').addEventListener('click', function () {
        modelView.setTexture(surface.toImage());
    });

    resourcePreparer.startLoading();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsLW1hdHJpeC5qcyIsIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsIkNhbnZhc1VJRmFjdG9yeS5qcyIsIkNhbnZhc1VJSW1hZ2VWaWV3LmpzIiwiQ2FudmFzVUlMYWJlbFZpZXcuanMiLCJDYW52YXNVSVNlbGVjdGVkVmlldy5qcyIsIlBvc2l0aW9uLmpzIiwiUmVzb3VyY2VMb2FkZXIuanMiLCJSZXNvdXJjZVByZXBhcmVyLmpzIiwiU2l6ZS5qcyIsIlN0b3JhZ2UuanMiLCJVSUNvbGxlY3Rpb24uanMiLCJVSUVsZW1lbnQuanMiLCJVSUVsZW1lbnRWaWV3LmpzIiwiVUlJbWFnZUVsZW1lbnQuanMiLCJVSUxhYmVsRWxlbWVudC5qcyIsIk1vZGVsVmlldy5qcyIsIlByb3BlcnRpZXNQYW5lbC5qcyIsImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDblRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgZ2wtbWF0cml4IC0gSGlnaCBwZXJmb3JtYW5jZSBtYXRyaXggYW5kIHZlY3RvciBvcGVyYXRpb25zXG4gKiBAYXV0aG9yIEJyYW5kb24gSm9uZXNcbiAqIEBhdXRob3IgQ29saW4gTWFjS2VuemllIElWXG4gKiBAdmVyc2lvbiAyLjMuMlxuICovXG5cbi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuICovXG5cbiFmdW5jdGlvbih0LGEpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWEoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYSk7ZWxzZXt2YXIgbj1hKCk7Zm9yKHZhciByIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6dClbcl09bltyXX19KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gYShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17ZXhwb3J0czp7fSxpZDpyLGxvYWRlZDohMX07cmV0dXJuIHRbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsYSksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiBhLm09dCxhLmM9bixhLnA9XCJcIixhKDApfShbZnVuY3Rpb24odCxhLG4pe2EuZ2xNYXRyaXg9bigxKSxhLm1hdDI9bigyKSxhLm1hdDJkPW4oMyksYS5tYXQzPW4oNCksYS5tYXQ0PW4oNSksYS5xdWF0PW4oNiksYS52ZWMyPW4oOSksYS52ZWMzPW4oNyksYS52ZWM0PW4oOCl9LGZ1bmN0aW9uKHQsYSl7dmFyIG49e307bi5FUFNJTE9OPTFlLTYsbi5BUlJBWV9UWVBFPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBGbG9hdDMyQXJyYXk/RmxvYXQzMkFycmF5OkFycmF5LG4uUkFORE9NPU1hdGgucmFuZG9tLG4uRU5BQkxFX1NJTUQ9ITEsbi5TSU1EX0FWQUlMQUJMRT1uLkFSUkFZX1RZUEU9PT1GbG9hdDMyQXJyYXkmJlwiU0lNRFwiaW4gdGhpcyxuLlVTRV9TSU1EPW4uRU5BQkxFX1NJTUQmJm4uU0lNRF9BVkFJTEFCTEUsbi5zZXRNYXRyaXhBcnJheVR5cGU9ZnVuY3Rpb24odCl7bi5BUlJBWV9UWVBFPXR9O3ZhciByPU1hdGguUEkvMTgwO24udG9SYWRpYW49ZnVuY3Rpb24odCl7cmV0dXJuIHQqcn0sbi5lcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gTWF0aC5hYnModC1hKTw9bi5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModCksTWF0aC5hYnMoYSkpfSx0LmV4cG9ydHM9bn0sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyl7dmFyIHU9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdVswXT10LHVbMV09YSx1WzJdPW4sdVszXT1vLHV9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0fSxvLnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe2lmKHQ9PT1hKXt2YXIgbj1hWzFdO3RbMV09YVsyXSx0WzJdPW59ZWxzZSB0WzBdPWFbMF0sdFsxXT1hWzJdLHRbMl09YVsxXSx0WzNdPWFbM107cmV0dXJuIHR9LG8uaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4qdS1vKnI7cmV0dXJuIGw/KGw9MS9sLHRbMF09dSpsLHRbMV09LXIqbCx0WzJdPS1vKmwsdFszXT1uKmwsdCk6bnVsbH0sby5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXTtyZXR1cm4gdFswXT1hWzNdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0WzNdPW4sdH0sby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXtyZXR1cm4gdFswXSp0WzNdLXRbMl0qdFsxXX0sby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPW5bMF0sTT1uWzFdLHM9blsyXSxpPW5bM107cmV0dXJuIHRbMF09ciplK3UqTSx0WzFdPW8qZStsKk0sdFsyXT1yKnMrdSppLHRbM109bypzK2wqaSx0fSxvLm11bD1vLm11bHRpcGx5LG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0rdSplLHRbMV09bypNK2wqZSx0WzJdPXIqLWUrdSpNLHRbM109byotZStsKk0sdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPW5bMF0sTT1uWzFdO3JldHVybiB0WzBdPXIqZSx0WzFdPW8qZSx0WzJdPXUqTSx0WzNdPWwqTSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0tbix0WzNdPXIsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPWFbMV0sdH0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQyKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikpfSxvLkxEVT1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFsyXT1yWzJdL3JbMF0sblswXT1yWzBdLG5bMV09clsxXSxuWzNdPXJbM10tdFsyXSpuWzFdLFt0LGEsbl19LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9YVswXSxNPWFbMV0scz1hWzJdLGk9YVszXTtyZXR1cm4gTWF0aC5hYnMobi1lKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMoZSkpJiZNYXRoLmFicyhvLU0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhNKSkmJk1hdGguYWJzKHUtcyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKHMpKSYmTWF0aC5hYnMobC1pKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoaSkpfSxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0fSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNik7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0WzRdPTAsdFs1XT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg2KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGFbNF09dFs0XSxhWzVdPXRbNV0sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0WzRdPTAsdFs1XT0wLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvLHUsbCl7dmFyIGU9bmV3IHIuQVJSQVlfVFlQRSg2KTtyZXR1cm4gZVswXT10LGVbMV09YSxlWzJdPW4sZVszXT1vLGVbNF09dSxlWzVdPWwsZX0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvLHUsbCl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0WzRdPXUsdFs1XT1sLHR9LG8uaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09bip1LXIqbztyZXR1cm4gTT8oTT0xL00sdFswXT11Kk0sdFsxXT0tcipNLHRbMl09LW8qTSx0WzNdPW4qTSx0WzRdPShvKmUtdSpsKSpNLHRbNV09KHIqbC1uKmUpKk0sdCk6bnVsbH0sby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXtyZXR1cm4gdFswXSp0WzNdLXRbMV0qdFsyXX0sby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9blswXSxpPW5bMV0sYz1uWzJdLGg9blszXSxTPW5bNF0sST1uWzVdO3JldHVybiB0WzBdPXIqcyt1KmksdFsxXT1vKnMrbCppLHRbMl09cipjK3UqaCx0WzNdPW8qYytsKmgsdFs0XT1yKlMrdSpJK2UsdFs1XT1vKlMrbCpJK00sdH0sby5tdWw9by5tdWx0aXBseSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9TWF0aC5zaW4obiksaT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKmkrdSpzLHRbMV09byppK2wqcyx0WzJdPXIqLXMrdSppLHRbM109byotcytsKmksdFs0XT1lLHRbNV09TSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1uWzBdLGk9blsxXTtyZXR1cm4gdFswXT1yKnMsdFsxXT1vKnMsdFsyXT11KmksdFszXT1sKmksdFs0XT1lLHRbNV09TSx0fSxvLnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9blswXSxpPW5bMV07cmV0dXJuIHRbMF09cix0WzFdPW8sdFsyXT11LHRbM109bCx0WzRdPXIqcyt1KmkrZSx0WzVdPW8qcytsKmkrTSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0tbix0WzNdPXIsdFs0XT0wLHRbNV09MCx0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109YVsxXSx0WzRdPTAsdFs1XT0wLHR9LG8uZnJvbVRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0WzRdPWFbMF0sdFs1XT1hWzFdLHR9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0MmQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIiwgXCIrdFs0XStcIiwgXCIrdFs1XStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKStNYXRoLnBvdyh0WzRdLDIpK01hdGgucG93KHRbNV0sMikrMSl9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdFs0XT1hWzRdK25bNF0sdFs1XT1hWzVdK25bNV0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHRbNF09YVs0XS1uWzRdLHRbNV09YVs1XS1uWzVdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHRbNF09YVs0XSpuLHRbNV09YVs1XSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdFs0XT1hWzRdK25bNF0qcix0WzVdPWFbNV0rbls1XSpyLHR9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM10mJnRbNF09PT1hWzRdJiZ0WzVdPT09YVs1XX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9dFs0XSxNPXRbNV0scz1hWzBdLGk9YVsxXSxjPWFbMl0saD1hWzNdLFM9YVs0XSxJPWFbNV07cmV0dXJuIE1hdGguYWJzKG4tcyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKHMpKSYmTWF0aC5hYnMoby1pKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoaSkpJiZNYXRoLmFicyh1LWMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhjKSkmJk1hdGguYWJzKGwtaCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGgpKSYmTWF0aC5hYnMoZS1TKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZSksTWF0aC5hYnMoUykpJiZNYXRoLmFicyhNLUkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhNKSxNYXRoLmFicyhJKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg5KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MSx0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby5mcm9tTWF0ND1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbNF0sdFs0XT1hWzVdLHRbNV09YVs2XSx0WzZdPWFbOF0sdFs3XT1hWzldLHRbOF09YVsxMF0sdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDkpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYVs0XT10WzRdLGFbNV09dFs1XSxhWzZdPXRbNl0sYVs3XT10WzddLGFbOF09dFs4XSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8sdSxsLGUsTSxzKXt2YXIgaT1uZXcgci5BUlJBWV9UWVBFKDkpO3JldHVybiBpWzBdPXQsaVsxXT1hLGlbMl09bixpWzNdPW8saVs0XT11LGlbNV09bCxpWzZdPWUsaVs3XT1NLGlbOF09cyxpfSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8sdSxsLGUsTSxzKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHRbNF09dSx0WzVdPWwsdFs2XT1lLHRbN109TSx0WzhdPXMsdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MSx0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXtpZih0PT09YSl7dmFyIG49YVsxXSxyPWFbMl0sbz1hWzVdO3RbMV09YVszXSx0WzJdPWFbNl0sdFszXT1uLHRbNV09YVs3XSx0WzZdPXIsdFs3XT1vfWVsc2UgdFswXT1hWzBdLHRbMV09YVszXSx0WzJdPWFbNl0sdFszXT1hWzFdLHRbNF09YVs0XSx0WzVdPWFbN10sdFs2XT1hWzJdLHRbN109YVs1XSx0WzhdPWFbOF07cmV0dXJuIHR9LG8uaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9aSpsLWUqcyxoPS1pKnUrZSpNLFM9cyp1LWwqTSxJPW4qYytyKmgrbypTO3JldHVybiBJPyhJPTEvSSx0WzBdPWMqSSx0WzFdPSgtaSpyK28qcykqSSx0WzJdPShlKnItbypsKSpJLHRbM109aCpJLHRbNF09KGkqbi1vKk0pKkksdFs1XT0oLWUqbitvKnUpKkksdFs2XT1TKkksdFs3XT0oLXMqbityKk0pKkksdFs4XT0obCpuLXIqdSkqSSx0KTpudWxsfSxvLmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF07cmV0dXJuIHRbMF09bCppLWUqcyx0WzFdPW8qcy1yKmksdFsyXT1yKmUtbypsLHRbM109ZSpNLXUqaSx0WzRdPW4qaS1vKk0sdFs1XT1vKnUtbiplLHRbNl09dSpzLWwqTSx0WzddPXIqTS1uKnMsdFs4XT1uKmwtcip1LHR9LG8uZGV0ZXJtaW5hbnQ9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXSx1PXRbNF0sbD10WzVdLGU9dFs2XSxNPXRbN10scz10WzhdO3JldHVybiBhKihzKnUtbCpNKStuKigtcypvK2wqZSkrciooTSpvLXUqZSl9LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPW5bMF0sUz1uWzFdLEk9blsyXSxmPW5bM10seD1uWzRdLEQ9bls1XSxGPW5bNl0sbT1uWzddLGQ9bls4XTtyZXR1cm4gdFswXT1oKnIrUypsK0kqcyx0WzFdPWgqbytTKmUrSSppLHRbMl09aCp1K1MqTStJKmMsdFszXT1mKnIreCpsK0Qqcyx0WzRdPWYqbyt4KmUrRCppLHRbNV09Zip1K3gqTStEKmMsdFs2XT1GKnIrbSpsK2Qqcyx0WzddPUYqbyttKmUrZCppLHRbOF09Rip1K20qTStkKmMsdH0sby5tdWw9by5tdWx0aXBseSxvLnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9blswXSxTPW5bMV07cmV0dXJuIHRbMF09cix0WzFdPW8sdFsyXT11LHRbM109bCx0WzRdPWUsdFs1XT1NLHRbNl09aCpyK1MqbCtzLHRbN109aCpvK1MqZStpLHRbOF09aCp1K1MqTStjLHR9LG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1NYXRoLnNpbihuKSxTPU1hdGguY29zKG4pO3JldHVybiB0WzBdPVMqcitoKmwsdFsxXT1TKm8raCplLHRbMl09Uyp1K2gqTSx0WzNdPVMqbC1oKnIsdFs0XT1TKmUtaCpvLHRbNV09UypNLWgqdSx0WzZdPXMsdFs3XT1pLHRbOF09Yyx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uWzBdLG89blsxXTtyZXR1cm4gdFswXT1yKmFbMF0sdFsxXT1yKmFbMV0sdFsyXT1yKmFbMl0sdFszXT1vKmFbM10sdFs0XT1vKmFbNF0sdFs1XT1vKmFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdH0sby5mcm9tVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MSx0WzVdPTAsdFs2XT1hWzBdLHRbN109YVsxXSx0WzhdPTEsdH0sby5mcm9tUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09MCx0WzNdPS1uLHRbNF09cix0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT1hWzFdLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLmZyb21NYXQyZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09MCx0WzNdPWFbMl0sdFs0XT1hWzNdLHRbNV09MCx0WzZdPWFbNF0sdFs3XT1hWzVdLHRbOF09MSx0fSxvLmZyb21RdWF0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4rbixlPXIrcixNPW8rbyxzPW4qbCxpPXIqbCxjPXIqZSxoPW8qbCxTPW8qZSxJPW8qTSxmPXUqbCx4PXUqZSxEPXUqTTtyZXR1cm4gdFswXT0xLWMtSSx0WzNdPWktRCx0WzZdPWgreCx0WzFdPWkrRCx0WzRdPTEtcy1JLHRbN109Uy1mLHRbMl09aC14LHRbNV09UytmLHRbOF09MS1zLWMsdH0sby5ub3JtYWxGcm9tTWF0ND1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XSxjPWFbOV0saD1hWzEwXSxTPWFbMTFdLEk9YVsxMl0sZj1hWzEzXSx4PWFbMTRdLEQ9YVsxNV0sRj1uKmUtcipsLG09bipNLW8qbCxkPW4qcy11KmwsYj1yKk0tbyplLHY9cipzLXUqZSx6PW8qcy11Kk0scD1pKmYtYypJLHc9aSp4LWgqSSxFPWkqRC1TKkksQT1jKngtaCpmLFA9YypELVMqZixMPWgqRC1TKngscT1GKkwtbSpQK2QqQStiKkUtdip3K3oqcDtyZXR1cm4gcT8ocT0xL3EsdFswXT0oZSpMLU0qUCtzKkEpKnEsdFsxXT0oTSpFLWwqTC1zKncpKnEsdFsyXT0obCpQLWUqRStzKnApKnEsdFszXT0obypQLXIqTC11KkEpKnEsdFs0XT0obipMLW8qRSt1KncpKnEsdFs1XT0ocipFLW4qUC11KnApKnEsdFs2XT0oZip6LXgqditEKmIpKnEsdFs3XT0oeCpkLUkqei1EKm0pKnEsdFs4XT0oSSp2LWYqZCtEKkYpKnEsdCk6bnVsbH0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQzKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIsIFwiK3RbNF0rXCIsIFwiK3RbNV0rXCIsIFwiK3RbNl0rXCIsIFwiK3RbN10rXCIsIFwiK3RbOF0rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikrTWF0aC5wb3codFs0XSwyKStNYXRoLnBvdyh0WzVdLDIpK01hdGgucG93KHRbNl0sMikrTWF0aC5wb3codFs3XSwyKStNYXRoLnBvdyh0WzhdLDIpKX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0WzRdPWFbNF0rbls0XSx0WzVdPWFbNV0rbls1XSx0WzZdPWFbNl0rbls2XSx0WzddPWFbN10rbls3XSx0WzhdPWFbOF0rbls4XSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdFs0XT1hWzRdLW5bNF0sdFs1XT1hWzVdLW5bNV0sdFs2XT1hWzZdLW5bNl0sdFs3XT1hWzddLW5bN10sdFs4XT1hWzhdLW5bOF0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdFs0XT1hWzRdKm4sdFs1XT1hWzVdKm4sdFs2XT1hWzZdKm4sdFs3XT1hWzddKm4sdFs4XT1hWzhdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0WzRdPWFbNF0rbls0XSpyLHRbNV09YVs1XStuWzVdKnIsdFs2XT1hWzZdK25bNl0qcix0WzddPWFbN10rbls3XSpyLHRbOF09YVs4XStuWzhdKnIsdH0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXSYmdFs0XT09PWFbNF0mJnRbNV09PT1hWzVdJiZ0WzZdPT09YVs2XSYmdFs3XT09PWFbN10mJnRbOF09PT1hWzhdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT10WzRdLE09dFs1XSxzPXRbNl0saT10WzddLGM9dFs4XSxoPWFbMF0sUz1hWzFdLEk9YVsyXSxmPWFbM10seD1hWzRdLEQ9YVs1XSxGPXRbNl0sbT1hWzddLGQ9YVs4XTtyZXR1cm4gTWF0aC5hYnMobi1oKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMoaCkpJiZNYXRoLmFicyhvLVMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhTKSkmJk1hdGguYWJzKHUtSSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKEkpKSYmTWF0aC5hYnMobC1mKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoZikpJiZNYXRoLmFicyhlLXgpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhlKSxNYXRoLmFicyh4KSkmJk1hdGguYWJzKE0tRCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKE0pLE1hdGguYWJzKEQpKSYmTWF0aC5hYnMocy1GKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMocyksTWF0aC5hYnMoRikpJiZNYXRoLmFicyhpLW0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhpKSxNYXRoLmFicyhtKSkmJk1hdGguYWJzKGMtZCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGMpLE1hdGguYWJzKGQpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e3NjYWxhcjp7fSxTSU1EOnt9fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoMTYpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09MSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDE2KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGFbNF09dFs0XSxhWzVdPXRbNV0sYVs2XT10WzZdLGFbN109dFs3XSxhWzhdPXRbOF0sYVs5XT10WzldLGFbMTBdPXRbMTBdLGFbMTFdPXRbMTFdLGFbMTJdPXRbMTJdLGFbMTNdPXRbMTNdLGFbMTRdPXRbMTRdLGFbMTVdPXRbMTVdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0sdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxmLHgpe3ZhciBEPW5ldyByLkFSUkFZX1RZUEUoMTYpO3JldHVybiBEWzBdPXQsRFsxXT1hLERbMl09bixEWzNdPW8sRFs0XT11LERbNV09bCxEWzZdPWUsRFs3XT1NLERbOF09cyxEWzldPWksRFsxMF09YyxEWzExXT1oLERbMTJdPVMsRFsxM109SSxEWzE0XT1mLERbMTVdPXgsRH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvLHUsbCxlLE0scyxpLGMsaCxTLEksZix4KXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHRbNF09dSx0WzVdPWwsdFs2XT1lLHRbN109TSx0WzhdPXMsdFs5XT1pLHRbMTBdPWMsdFsxMV09aCx0WzEyXT1TLHRbMTNdPUksdFsxNF09Zix0WzE1XT14LHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLnNjYWxhci50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXtpZih0PT09YSl7dmFyIG49YVsxXSxyPWFbMl0sbz1hWzNdLHU9YVs2XSxsPWFbN10sZT1hWzExXTt0WzFdPWFbNF0sdFsyXT1hWzhdLHRbM109YVsxMl0sdFs0XT1uLHRbNl09YVs5XSx0WzddPWFbMTNdLHRbOF09cix0WzldPXUsdFsxMV09YVsxNF0sdFsxMl09byx0WzEzXT1sLHRbMTRdPWV9ZWxzZSB0WzBdPWFbMF0sdFsxXT1hWzRdLHRbMl09YVs4XSx0WzNdPWFbMTJdLHRbNF09YVsxXSx0WzVdPWFbNV0sdFs2XT1hWzldLHRbN109YVsxM10sdFs4XT1hWzJdLHRbOV09YVs2XSx0WzEwXT1hWzEwXSx0WzExXT1hWzE0XSx0WzEyXT1hWzNdLHRbMTNdPWFbN10sdFsxNF09YVsxMV0sdFsxNV09YVsxNV07cmV0dXJuIHR9LG8uU0lNRC50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXt2YXIgbixyLG8sdSxsLGUsTSxzLGksYztyZXR1cm4gbj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCkscj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMCwxLDQsNSksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwwLDEsNCw1KSxNPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDAsMiw0LDYpLHM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMSwzLDUsNyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLE0pLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxzKSxsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDIsMyw2LDcpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMiwzLDYsNyksaT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwwLDIsNCw2KSxjPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDEsMyw1LDcpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLGMpLHR9LG8udHJhbnNwb3NlPXIuVVNFX1NJTUQ/by5TSU1ELnRyYW5zcG9zZTpvLnNjYWxhci50cmFuc3Bvc2Usby5zY2FsYXIuaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9YVs5XSxoPWFbMTBdLFM9YVsxMV0sST1hWzEyXSxmPWFbMTNdLHg9YVsxNF0sRD1hWzE1XSxGPW4qZS1yKmwsbT1uKk0tbypsLGQ9bipzLXUqbCxiPXIqTS1vKmUsdj1yKnMtdSplLHo9bypzLXUqTSxwPWkqZi1jKkksdz1pKngtaCpJLEU9aSpELVMqSSxBPWMqeC1oKmYsUD1jKkQtUypmLEw9aCpELVMqeCxxPUYqTC1tKlArZCpBK2IqRS12KncreipwO3JldHVybiBxPyhxPTEvcSx0WzBdPShlKkwtTSpQK3MqQSkqcSx0WzFdPShvKlAtcipMLXUqQSkqcSx0WzJdPShmKnoteCp2K0QqYikqcSx0WzNdPShoKnYtYyp6LVMqYikqcSx0WzRdPShNKkUtbCpMLXMqdykqcSx0WzVdPShuKkwtbypFK3UqdykqcSx0WzZdPSh4KmQtSSp6LUQqbSkqcSx0WzddPShpKnotaCpkK1MqbSkqcSx0WzhdPShsKlAtZSpFK3MqcCkqcSx0WzldPShyKkUtbipQLXUqcCkqcSx0WzEwXT0oSSp2LWYqZCtEKkYpKnEsdFsxMV09KGMqZC1pKnYtUypGKSpxLHRbMTJdPShlKnctbCpBLU0qcCkqcSx0WzEzXT0obipBLXIqdytvKnApKnEsdFsxNF09KGYqbS1JKmIteCpGKSpxLHRbMTVdPShpKmItYyptK2gqRikqcSx0KTpudWxsfSxvLlNJTUQuaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG4scixvLHUsbCxlLE0scyxpLGMsaD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksUz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksST1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksZj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpO3JldHVybiBsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaCxTLDAsMSw0LDUpLHI9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShJLGYsMCwxLDQsNSksbj1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsciwwLDIsNCw2KSxyPVNJTUQuRmxvYXQzMng0LnNodWZmbGUocixsLDEsMyw1LDcpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShoLFMsMiwzLDYsNyksdT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKEksZiwyLDMsNiw3KSxvPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCx1LDAsMiw0LDYpLHU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZSh1LGwsMSwzLDUsNyksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobyx1KSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxlPVNJTUQuRmxvYXQzMng0Lm11bChyLGwpLE09U0lNRC5GbG9hdDMyeDQubXVsKG4sbCksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHIsbCksZSksTT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG4sbCksTSksTT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKE0sMiwzLDAsMSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwocixvKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxlPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxlKSxpPVNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuc3ViKGUsU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkpLGk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGw9U0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUociwyLDMsMCwxKSx1KSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxvPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobywyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSxlKSxzPVNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuc3ViKGUsU0lNRC5GbG9hdDMyeDQubXVsKG8sbCkpLHM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChuLGwpLHMpLHM9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDIsMywwLDEpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG4sciksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMikscz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkscyksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG8sbCksaSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSkscz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkscyksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoaSxTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobix1KSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxNPVNJTUQuRmxvYXQzMng0LnN1YihNLFNJTUQuRmxvYXQzMng0Lm11bChvLGwpKSxzPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxzKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxNPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSxNKSxzPVNJTUQuRmxvYXQzMng0LnN1YihzLFNJTUQuRmxvYXQzMng0Lm11bChyLGwpKSxsPVNJTUQuRmxvYXQzMng0Lm11bChuLG8pLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLE09U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLE0pLGk9U0lNRC5GbG9hdDMyeDQuc3ViKGksU0lNRC5GbG9hdDMyeDQubXVsKHIsbCkpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLE09U0lNRC5GbG9hdDMyeDQuc3ViKE0sU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkpLGk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyLGwpLGkpLGM9U0lNRC5GbG9hdDMyeDQubXVsKG4sZSksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDIsMywwLDEpLGMpLGM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywxLDAsMywyKSxjKSxsPVNJTUQuRmxvYXQzMng0LnJlY2lwcm9jYWxBcHByb3hpbWF0aW9uKGMpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0LmFkZChsLGwpLFNJTUQuRmxvYXQzMng0Lm11bChjLFNJTUQuRmxvYXQzMng0Lm11bChsLGwpKSksKGM9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDAsMCwwLDApKT8oU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0Lm11bChjLGUpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQubXVsKGMsTSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxzKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixTSU1ELkZsb2F0MzJ4NC5tdWwoYyxpKSksdCk6bnVsbH0sby5pbnZlcnQ9ci5VU0VfU0lNRD9vLlNJTUQuaW52ZXJ0Om8uc2NhbGFyLmludmVydCxvLnNjYWxhci5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9YVs5XSxoPWFbMTBdLFM9YVsxMV0sST1hWzEyXSxmPWFbMTNdLHg9YVsxNF0sRD1hWzE1XTtyZXR1cm4gdFswXT1lKihoKkQtUyp4KS1jKihNKkQtcyp4KStmKihNKlMtcypoKSx0WzFdPS0ociooaCpELVMqeCktYyoobypELXUqeCkrZioobypTLXUqaCkpLHRbMl09ciooTSpELXMqeCktZSoobypELXUqeCkrZioobypzLXUqTSksdFszXT0tKHIqKE0qUy1zKmgpLWUqKG8qUy11KmgpK2MqKG8qcy11Kk0pKSx0WzRdPS0obCooaCpELVMqeCktaSooTSpELXMqeCkrSSooTSpTLXMqaCkpLHRbNV09biooaCpELVMqeCktaSoobypELXUqeCkrSSoobypTLXUqaCksdFs2XT0tKG4qKE0qRC1zKngpLWwqKG8qRC11KngpK0kqKG8qcy11Kk0pKSx0WzddPW4qKE0qUy1zKmgpLWwqKG8qUy11KmgpK2kqKG8qcy11Kk0pLHRbOF09bCooYypELVMqZiktaSooZSpELXMqZikrSSooZSpTLXMqYyksdFs5XT0tKG4qKGMqRC1TKmYpLWkqKHIqRC11KmYpK0kqKHIqUy11KmMpKSx0WzEwXT1uKihlKkQtcypmKS1sKihyKkQtdSpmKStJKihyKnMtdSplKSx0WzExXT0tKG4qKGUqUy1zKmMpLWwqKHIqUy11KmMpK2kqKHIqcy11KmUpKSx0WzEyXT0tKGwqKGMqeC1oKmYpLWkqKGUqeC1NKmYpK0kqKGUqaC1NKmMpKSx0WzEzXT1uKihjKngtaCpmKS1pKihyKngtbypmKStJKihyKmgtbypjKSx0WzE0XT0tKG4qKGUqeC1NKmYpLWwqKHIqeC1vKmYpK0kqKHIqTS1vKmUpKSx0WzE1XT1uKihlKmgtTSpjKS1sKihyKmgtbypjKStpKihyKk0tbyplKSx0fSxvLlNJTUQuYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuLHIsbyx1LGwsZSxNLHMsaSxjLGgsUyxJLG49U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKTtyZXR1cm4gaT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwwLDEsNCw1KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDAsMSw0LDUpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShpLGUsMCwyLDQsNiksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGUsaSwxLDMsNSw3KSxpPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDIsMyw2LDcpLHM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMiwzLDYsNyksTT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGkscywwLDIsNCw2KSxzPVNJTUQuRmxvYXQzMng0LnNodWZmbGUocyxpLDEsMyw1LDcpLGk9U0lNRC5GbG9hdDMyeDQubXVsKE0scyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksYz1TSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxoPVNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChlLGkpLGMpLGg9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGgpLGg9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShoLDIsMywwLDEpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGUsTSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksYyksST1TSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LnN1YihjLFNJTUQuRmxvYXQzMng0Lm11bChzLGkpKSxJPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxJKSxJPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoSSwyLDMsMCwxKSxpPVNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMiwzLDAsMSkscyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksTT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKE0sMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKE0saSksYyksUz1TSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LnN1YihjLFNJTUQuRmxvYXQzMng0Lm11bChNLGkpKSxTPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxTKSxTPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywyLDMsMCwxKSxpPVNJTUQuRmxvYXQzMng0Lm11bChsLGUpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLFM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLFMpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChNLGkpLEkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLFM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLFMpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKEksU0lNRC5GbG9hdDMyeDQubXVsKE0saSkpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGwscyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksaD1TSU1ELkZsb2F0MzJ4NC5zdWIoaCxTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSksUz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKGUsaSksUyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksaD1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKE0saSksaCksUz1TSU1ELkZsb2F0MzJ4NC5zdWIoUyxTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobCxNKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxoPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxoKSxJPVNJTUQuRmxvYXQzMng0LnN1YihJLFNJTUQuRmxvYXQzMng0Lm11bChlLGkpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxoPVNJTUQuRmxvYXQzMng0LnN1YihoLFNJTUQuRmxvYXQzMng0Lm11bChzLGkpKSxJPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxJKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsYyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LGgpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLEkpLHR9LG8uYWRqb2ludD1yLlVTRV9TSU1EP28uU0lNRC5hZGpvaW50Om8uc2NhbGFyLmFkam9pbnQsby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdLHU9dFs0XSxsPXRbNV0sZT10WzZdLE09dFs3XSxzPXRbOF0saT10WzldLGM9dFsxMF0saD10WzExXSxTPXRbMTJdLEk9dFsxM10sZj10WzE0XSx4PXRbMTVdLEQ9YSpsLW4qdSxGPWEqZS1yKnUsbT1hKk0tbyp1LGQ9biplLXIqbCxiPW4qTS1vKmwsdj1yKk0tbyplLHo9cypJLWkqUyxwPXMqZi1jKlMsdz1zKngtaCpTLEU9aSpmLWMqSSxBPWkqeC1oKkksUD1jKngtaCpmO3JldHVybiBEKlAtRipBK20qRStkKnctYipwK3Yqen0sby5TSU1ELm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpLGU9U0lNRC5GbG9hdDMyeDQubG9hZChuLDApLE09U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwzLDMsMywzKSxsKSkpKTtTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsTSk7dmFyIHM9U0lNRC5GbG9hdDMyeDQubG9hZChuLDQpLGk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywzLDMsMywzKSxsKSkpKTtTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsaSk7dmFyIGM9U0lNRC5GbG9hdDMyeDQubG9hZChuLDgpLGg9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywzLDMsMywzKSxsKSkpKTtTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsaCk7dmFyIFM9U0lNRC5GbG9hdDMyeDQubG9hZChuLDEyKSxJPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDAsMCwwLDApLHIpLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDEsMSwxLDEpLG8pLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDIsMiwyLDIpLHUpLFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMywzLDMsMyksbCkpKSk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsSSksdH0sby5zY2FsYXIubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPWFbOV0sUz1hWzEwXSxJPWFbMTFdLGY9YVsxMl0seD1hWzEzXSxEPWFbMTRdLEY9YVsxNV0sbT1uWzBdLGQ9blsxXSxiPW5bMl0sdj1uWzNdO3JldHVybiB0WzBdPW0qcitkKmUrYipjK3YqZix0WzFdPW0qbytkKk0rYipoK3YqeCx0WzJdPW0qdStkKnMrYipTK3YqRCx0WzNdPW0qbCtkKmkrYipJK3YqRixtPW5bNF0sZD1uWzVdLGI9bls2XSx2PW5bN10sdFs0XT1tKnIrZCplK2IqYyt2KmYsdFs1XT1tKm8rZCpNK2IqaCt2KngsdFs2XT1tKnUrZCpzK2IqUyt2KkQsdFs3XT1tKmwrZCppK2IqSSt2KkYsbT1uWzhdLGQ9bls5XSxiPW5bMTBdLHY9blsxMV0sdFs4XT1tKnIrZCplK2IqYyt2KmYsdFs5XT1tKm8rZCpNK2IqaCt2KngsdFsxMF09bSp1K2QqcytiKlMrdipELHRbMTFdPW0qbCtkKmkrYipJK3YqRixtPW5bMTJdLGQ9blsxM10sYj1uWzE0XSx2PW5bMTVdLHRbMTJdPW0qcitkKmUrYipjK3YqZix0WzEzXT1tKm8rZCpNK2IqaCt2KngsdFsxNF09bSp1K2QqcytiKlMrdipELHRbMTVdPW0qbCtkKmkrYipJK3YqRix0fSxvLm11bHRpcGx5PXIuVVNFX1NJTUQ/by5TSU1ELm11bHRpcGx5Om8uc2NhbGFyLm11bHRpcGx5LG8ubXVsPW8ubXVsdGlwbHksby5zY2FsYXIudHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcixvLHUsbCxlLE0scyxpLGMsaCxTLEksZj1uWzBdLHg9blsxXSxEPW5bMl07cmV0dXJuIGE9PT10Pyh0WzEyXT1hWzBdKmYrYVs0XSp4K2FbOF0qRCthWzEyXSx0WzEzXT1hWzFdKmYrYVs1XSp4K2FbOV0qRCthWzEzXSx0WzE0XT1hWzJdKmYrYVs2XSp4K2FbMTBdKkQrYVsxNF0sdFsxNV09YVszXSpmK2FbN10qeCthWzExXSpEK2FbMTVdKToocj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1hWzldLFM9YVsxMF0sST1hWzExXSx0WzBdPXIsdFsxXT1vLHRbMl09dSx0WzNdPWwsdFs0XT1lLHRbNV09TSx0WzZdPXMsdFs3XT1pLHRbOF09Yyx0WzldPWgsdFsxMF09Uyx0WzExXT1JLHRbMTJdPXIqZitlKngrYypEK2FbMTJdLHRbMTNdPW8qZitNKngraCpEK2FbMTNdLHRbMTRdPXUqZitzKngrUypEK2FbMTRdLHRbMTVdPWwqZitpKngrSSpEK2FbMTVdKSx0fSxvLlNJTUQudHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpLGU9U0lNRC5GbG9hdDMyeDQoblswXSxuWzFdLG5bMl0sMCk7YSE9PXQmJih0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0pLHI9U0lNRC5GbG9hdDMyeDQubXVsKHIsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDAsMCwwLDApKSxvPVNJTUQuRmxvYXQzMng0Lm11bChvLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwxLDEsMSwxKSksdT1TSU1ELkZsb2F0MzJ4NC5tdWwodSxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMiwyLDIsMikpO3ZhciBNPVNJTUQuRmxvYXQzMng0LmFkZChyLFNJTUQuRmxvYXQzMng0LmFkZChvLFNJTUQuRmxvYXQzMng0LmFkZCh1LGwpKSk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsTSksdH0sby50cmFuc2xhdGU9ci5VU0VfU0lNRD9vLlNJTUQudHJhbnNsYXRlOm8uc2NhbGFyLnRyYW5zbGF0ZSxvLnNjYWxhci5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9blswXSxvPW5bMV0sdT1uWzJdO3JldHVybiB0WzBdPWFbMF0qcix0WzFdPWFbMV0qcix0WzJdPWFbMl0qcix0WzNdPWFbM10qcix0WzRdPWFbNF0qbyx0WzVdPWFbNV0qbyx0WzZdPWFbNl0qbyx0WzddPWFbN10qbyx0WzhdPWFbOF0qdSx0WzldPWFbOV0qdSx0WzEwXT1hWzEwXSp1LHRbMTFdPWFbMTFdKnUsdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0sdH0sby5TSU1ELnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcixvLHUsbD1TSU1ELkZsb2F0MzJ4NChuWzBdLG5bMV0sblsyXSwwKTtyZXR1cm4gcj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0Lm11bChyLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwwLDAsMCwwKSkpLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5tdWwobyxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwxLDEsMSkpKSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQubXVsKHUsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMiwyLDIpKSksdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0sdH0sby5zY2FsZT1yLlVTRV9TSU1EP28uU0lNRC5zY2FsZTpvLnNjYWxhci5zY2FsZSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbixvKXt2YXIgdSxsLGUsTSxzLGksYyxoLFMsSSxmLHgsRCxGLG0sZCxiLHYseixwLHcsRSxBLFAsTD1vWzBdLHE9b1sxXSxSPW9bMl0sTj1NYXRoLnNxcnQoTCpMK3EqcStSKlIpO3JldHVybiBNYXRoLmFicyhOKTxyLkVQU0lMT04/bnVsbDooTj0xL04sTCo9TixxKj1OLFIqPU4sdT1NYXRoLnNpbihuKSxsPU1hdGguY29zKG4pLGU9MS1sLE09YVswXSxzPWFbMV0saT1hWzJdLGM9YVszXSxoPWFbNF0sUz1hWzVdLEk9YVs2XSxmPWFbN10seD1hWzhdLEQ9YVs5XSxGPWFbMTBdLG09YVsxMV0sZD1MKkwqZStsLGI9cSpMKmUrUip1LHY9UipMKmUtcSp1LHo9TCpxKmUtUip1LHA9cSpxKmUrbCx3PVIqcSplK0wqdSxFPUwqUiplK3EqdSxBPXEqUiplLUwqdSxQPVIqUiplK2wsdFswXT1NKmQraCpiK3gqdix0WzFdPXMqZCtTKmIrRCp2LHRbMl09aSpkK0kqYitGKnYsdFszXT1jKmQrZipiK20qdix0WzRdPU0qeitoKnAreCp3LHRbNV09cyp6K1MqcCtEKncsdFs2XT1pKnorSSpwK0Yqdyx0WzddPWMqeitmKnArbSp3LHRbOF09TSpFK2gqQSt4KlAsdFs5XT1zKkUrUypBK0QqUCx0WzEwXT1pKkUrSSpBK0YqUCx0WzExXT1jKkUrZipBK20qUCxhIT09dCYmKHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0KX0sby5zY2FsYXIucm90YXRlWD1mdW5jdGlvbih0LGEsbil7dmFyIHI9TWF0aC5zaW4obiksbz1NYXRoLmNvcyhuKSx1PWFbNF0sbD1hWzVdLGU9YVs2XSxNPWFbN10scz1hWzhdLGk9YVs5XSxjPWFbMTBdLGg9YVsxMV07cmV0dXJuIGEhPT10JiYodFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0WzRdPXUqbytzKnIsdFs1XT1sKm8raSpyLHRbNl09ZSpvK2Mqcix0WzddPU0qbytoKnIsdFs4XT1zKm8tdSpyLHRbOV09aSpvLWwqcix0WzEwXT1jKm8tZSpyLHRbMTFdPWgqby1NKnIsdH0sby5TSU1ELnJvdGF0ZVg9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKG4pKSxvPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKG4pKTthIT09dCYmKHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSk7dmFyIHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LG8pLFNJTUQuRmxvYXQzMng0Lm11bChsLHIpKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxyKSkpLHR9LG8ucm90YXRlWD1yLlVTRV9TSU1EP28uU0lNRC5yb3RhdGVYOm8uc2NhbGFyLnJvdGF0ZVgsby5zY2FsYXIucm90YXRlWT1mdW5jdGlvbih0LGEsbil7dmFyIHI9TWF0aC5zaW4obiksbz1NYXRoLmNvcyhuKSx1PWFbMF0sbD1hWzFdLGU9YVsyXSxNPWFbM10scz1hWzhdLGk9YVs5XSxjPWFbMTBdLGg9YVsxMV07cmV0dXJuIGEhPT10JiYodFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0WzBdPXUqby1zKnIsdFsxXT1sKm8taSpyLHRbMl09ZSpvLWMqcix0WzNdPU0qby1oKnIsdFs4XT11KnIrcypvLHRbOV09bCpyK2kqbyx0WzEwXT1lKnIrYypvLHRbMTFdPU0qcitoKm8sdH0sby5TSU1ELnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKG4pKSxvPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKG4pKTthIT09dCYmKHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSk7dmFyIHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bCh1LG8pLFNJTUQuRmxvYXQzMng0Lm11bChsLHIpKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxyKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxvKSkpLHR9LG8ucm90YXRlWT1yLlVTRV9TSU1EP28uU0lNRC5yb3RhdGVZOm8uc2NhbGFyLnJvdGF0ZVksby5zY2FsYXIucm90YXRlWj1mdW5jdGlvbih0LGEsbil7dmFyIHI9TWF0aC5zaW4obiksbz1NYXRoLmNvcyhuKSx1PWFbMF0sbD1hWzFdLGU9YVsyXSxNPWFbM10scz1hWzRdLGk9YVs1XSxjPWFbNl0saD1hWzddO3JldHVybiBhIT09dCYmKHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHRbMF09dSpvK3Mqcix0WzFdPWwqbytpKnIsdFsyXT1lKm8rYypyLHRbM109TSpvK2gqcix0WzRdPXMqby11KnIsdFs1XT1pKm8tbCpyLHRbNl09YypvLWUqcix0WzddPWgqby1NKnIsdH0sby5TSU1ELnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKG4pKSxvPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKG4pKTthIT09dCYmKHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pO3ZhciB1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxyKSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsbyksU0lNRC5GbG9hdDMyeDQubXVsKHUscikpKSx0fSxvLnJvdGF0ZVo9ci5VU0VfU0lNRD9vLlNJTUQucm90YXRlWjpvLnNjYWxhci5yb3RhdGVaLG8uZnJvbVRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09YVswXSx0WzEzXT1hWzFdLHRbMTRdPWFbMl0sdFsxNV09MSx0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT1hWzFdLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT1hWzJdLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEsbil7dmFyIG8sdSxsLGU9blswXSxNPW5bMV0scz1uWzJdLGk9TWF0aC5zcXJ0KGUqZStNKk0rcypzKTtyZXR1cm4gTWF0aC5hYnMoaSk8ci5FUFNJTE9OP251bGw6KGk9MS9pLGUqPWksTSo9aSxzKj1pLG89TWF0aC5zaW4oYSksdT1NYXRoLmNvcyhhKSxsPTEtdSx0WzBdPWUqZSpsK3UsdFsxXT1NKmUqbCtzKm8sdFsyXT1zKmUqbC1NKm8sdFszXT0wLHRbNF09ZSpNKmwtcypvLHRbNV09TSpNKmwrdSx0WzZdPXMqTSpsK2Uqbyx0WzddPTAsdFs4XT1lKnMqbCtNKm8sdFs5XT1NKnMqbC1lKm8sdFsxMF09cypzKmwrdSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdCl9LG8uZnJvbVhSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT1yLHRbNl09bix0WzddPTAsdFs4XT0wLHRbOV09LW4sdFsxMF09cix0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tWVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09MCx0WzJdPS1uLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT1uLHRbOV09MCx0WzEwXT1yLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21aUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09MCx0WzNdPTAsdFs0XT0tbix0WzVdPXIsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVJvdGF0aW9uVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1yK3IsTT1vK28scz11K3UsaT1yKmUsYz1yKk0saD1yKnMsUz1vKk0sST1vKnMsZj11KnMseD1sKmUsRD1sKk0sRj1sKnM7cmV0dXJuIHRbMF09MS0oUytmKSx0WzFdPWMrRix0WzJdPWgtRCx0WzNdPTAsdFs0XT1jLUYsdFs1XT0xLShpK2YpLHRbNl09SSt4LHRbN109MCx0WzhdPWgrRCx0WzldPUkteCx0WzEwXT0xLShpK1MpLHRbMTFdPTAsdFsxMl09blswXSx0WzEzXT1uWzFdLHRbMTRdPW5bMl0sdFsxNV09MSx0fSxvLmdldFRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVsxMl0sdFsxXT1hWzEzXSx0WzJdPWFbMTRdLHR9LG8uZ2V0Um90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdK2FbNV0rYVsxMF0scj0wO3JldHVybiBuPjA/KHI9MipNYXRoLnNxcnQobisxKSx0WzNdPS4yNSpyLHRbMF09KGFbNl0tYVs5XSkvcix0WzFdPShhWzhdLWFbMl0pL3IsdFsyXT0oYVsxXS1hWzRdKS9yKTphWzBdPmFbNV0mYVswXT5hWzEwXT8ocj0yKk1hdGguc3FydCgxK2FbMF0tYVs1XS1hWzEwXSksdFszXT0oYVs2XS1hWzldKS9yLHRbMF09LjI1KnIsdFsxXT0oYVsxXSthWzRdKS9yLHRbMl09KGFbOF0rYVsyXSkvcik6YVs1XT5hWzEwXT8ocj0yKk1hdGguc3FydCgxK2FbNV0tYVswXS1hWzEwXSksdFszXT0oYVs4XS1hWzJdKS9yLHRbMF09KGFbMV0rYVs0XSkvcix0WzFdPS4yNSpyLHRbMl09KGFbNl0rYVs5XSkvcik6KHI9MipNYXRoLnNxcnQoMSthWzEwXS1hWzBdLWFbNV0pLHRbM109KGFbMV0tYVs0XSkvcix0WzBdPShhWzhdK2FbMl0pL3IsdFsxXT0oYVs2XSthWzldKS9yLHRbMl09LjI1KnIpLHR9LG8uZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZT1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXSxsPWFbMl0sZT1hWzNdLE09bytvLHM9dSt1LGk9bCtsLGM9bypNLGg9bypzLFM9byppLEk9dSpzLGY9dSppLHg9bCppLEQ9ZSpNLEY9ZSpzLG09ZSppLGQ9clswXSxiPXJbMV0sdj1yWzJdO3JldHVybiB0WzBdPSgxLShJK3gpKSpkLHRbMV09KGgrbSkqZCx0WzJdPShTLUYpKmQsdFszXT0wLHRbNF09KGgtbSkqYix0WzVdPSgxLShjK3gpKSpiLHRbNl09KGYrRCkqYix0WzddPTAsdFs4XT0oUytGKSp2LHRbOV09KGYtRCkqdix0WzEwXT0oMS0oYytJKSkqdix0WzExXT0wLHRbMTJdPW5bMF0sdFsxM109blsxXSx0WzE0XT1uWzJdLHRbMTVdPTEsdH0sby5mcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlT3JpZ2luPWZ1bmN0aW9uKHQsYSxuLHIsbyl7XG4gICAgdmFyIHU9YVswXSxsPWFbMV0sZT1hWzJdLE09YVszXSxzPXUrdSxpPWwrbCxjPWUrZSxoPXUqcyxTPXUqaSxJPXUqYyxmPWwqaSx4PWwqYyxEPWUqYyxGPU0qcyxtPU0qaSxkPU0qYyxiPXJbMF0sdj1yWzFdLHo9clsyXSxwPW9bMF0sdz1vWzFdLEU9b1syXTtyZXR1cm4gdFswXT0oMS0oZitEKSkqYix0WzFdPShTK2QpKmIsdFsyXT0oSS1tKSpiLHRbM109MCx0WzRdPShTLWQpKnYsdFs1XT0oMS0oaCtEKSkqdix0WzZdPSh4K0YpKnYsdFs3XT0wLHRbOF09KEkrbSkqeix0WzldPSh4LUYpKnosdFsxMF09KDEtKGgrZikpKnosdFsxMV09MCx0WzEyXT1uWzBdK3AtKHRbMF0qcCt0WzRdKncrdFs4XSpFKSx0WzEzXT1uWzFdK3ctKHRbMV0qcCt0WzVdKncrdFs5XSpFKSx0WzE0XT1uWzJdK0UtKHRbMl0qcCt0WzZdKncrdFsxMF0qRSksdFsxNV09MSx0fSxvLmZyb21RdWF0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4rbixlPXIrcixNPW8rbyxzPW4qbCxpPXIqbCxjPXIqZSxoPW8qbCxTPW8qZSxJPW8qTSxmPXUqbCx4PXUqZSxEPXUqTTtyZXR1cm4gdFswXT0xLWMtSSx0WzFdPWkrRCx0WzJdPWgteCx0WzNdPTAsdFs0XT1pLUQsdFs1XT0xLXMtSSx0WzZdPVMrZix0WzddPTAsdFs4XT1oK3gsdFs5XT1TLWYsdFsxMF09MS1zLWMsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJ1c3R1bT1mdW5jdGlvbih0LGEsbixyLG8sdSxsKXt2YXIgZT0xLyhuLWEpLE09MS8oby1yKSxzPTEvKHUtbCk7cmV0dXJuIHRbMF09Mip1KmUsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09Mip1Kk0sdFs2XT0wLHRbN109MCx0WzhdPShuK2EpKmUsdFs5XT0obytyKSpNLHRbMTBdPShsK3UpKnMsdFsxMV09LTEsdFsxMl09MCx0WzEzXT0wLHRbMTRdPWwqdSoyKnMsdFsxNV09MCx0fSxvLnBlcnNwZWN0aXZlPWZ1bmN0aW9uKHQsYSxuLHIsbyl7dmFyIHU9MS9NYXRoLnRhbihhLzIpLGw9MS8oci1vKTtyZXR1cm4gdFswXT11L24sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09dSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09KG8rcikqbCx0WzExXT0tMSx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MipvKnIqbCx0WzE1XT0wLHR9LG8ucGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXc9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89TWF0aC50YW4oYS51cERlZ3JlZXMqTWF0aC5QSS8xODApLHU9TWF0aC50YW4oYS5kb3duRGVncmVlcypNYXRoLlBJLzE4MCksbD1NYXRoLnRhbihhLmxlZnREZWdyZWVzKk1hdGguUEkvMTgwKSxlPU1hdGgudGFuKGEucmlnaHREZWdyZWVzKk1hdGguUEkvMTgwKSxNPTIvKGwrZSkscz0yLyhvK3UpO3JldHVybiB0WzBdPU0sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09cyx0WzZdPTAsdFs3XT0wLHRbOF09LSgobC1lKSpNKi41KSx0WzldPShvLXUpKnMqLjUsdFsxMF09ci8obi1yKSx0WzExXT0tMSx0WzEyXT0wLHRbMTNdPTAsdFsxNF09cipuLyhuLXIpLHRbMTVdPTAsdH0sby5vcnRobz1mdW5jdGlvbih0LGEsbixyLG8sdSxsKXt2YXIgZT0xLyhhLW4pLE09MS8oci1vKSxzPTEvKHUtbCk7cmV0dXJuIHRbMF09LTIqZSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0tMipNLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0yKnMsdFsxMV09MCx0WzEyXT0oYStuKSplLHRbMTNdPShvK3IpKk0sdFsxNF09KGwrdSkqcyx0WzE1XT0xLHR9LG8ubG9va0F0PWZ1bmN0aW9uKHQsYSxuLHUpe3ZhciBsLGUsTSxzLGksYyxoLFMsSSxmLHg9YVswXSxEPWFbMV0sRj1hWzJdLG09dVswXSxkPXVbMV0sYj11WzJdLHY9blswXSx6PW5bMV0scD1uWzJdO3JldHVybiBNYXRoLmFicyh4LXYpPHIuRVBTSUxPTiYmTWF0aC5hYnMoRC16KTxyLkVQU0lMT04mJk1hdGguYWJzKEYtcCk8ci5FUFNJTE9OP28uaWRlbnRpdHkodCk6KGg9eC12LFM9RC16LEk9Ri1wLGY9MS9NYXRoLnNxcnQoaCpoK1MqUytJKkkpLGgqPWYsUyo9ZixJKj1mLGw9ZCpJLWIqUyxlPWIqaC1tKkksTT1tKlMtZCpoLGY9TWF0aC5zcXJ0KGwqbCtlKmUrTSpNKSxmPyhmPTEvZixsKj1mLGUqPWYsTSo9Zik6KGw9MCxlPTAsTT0wKSxzPVMqTS1JKmUsaT1JKmwtaCpNLGM9aCplLVMqbCxmPU1hdGguc3FydChzKnMraSppK2MqYyksZj8oZj0xL2Yscyo9ZixpKj1mLGMqPWYpOihzPTAsaT0wLGM9MCksdFswXT1sLHRbMV09cyx0WzJdPWgsdFszXT0wLHRbNF09ZSx0WzVdPWksdFs2XT1TLHRbN109MCx0WzhdPU0sdFs5XT1jLHRbMTBdPUksdFsxMV09MCx0WzEyXT0tKGwqeCtlKkQrTSpGKSx0WzEzXT0tKHMqeCtpKkQrYypGKSx0WzE0XT0tKGgqeCtTKkQrSSpGKSx0WzE1XT0xLHQpfSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIiwgXCIrdFs0XStcIiwgXCIrdFs1XStcIiwgXCIrdFs2XStcIiwgXCIrdFs3XStcIiwgXCIrdFs4XStcIiwgXCIrdFs5XStcIiwgXCIrdFsxMF0rXCIsIFwiK3RbMTFdK1wiLCBcIit0WzEyXStcIiwgXCIrdFsxM10rXCIsIFwiK3RbMTRdK1wiLCBcIit0WzE1XStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKStNYXRoLnBvdyh0WzRdLDIpK01hdGgucG93KHRbNV0sMikrTWF0aC5wb3codFs2XSwyKStNYXRoLnBvdyh0WzddLDIpK01hdGgucG93KHRbOF0sMikrTWF0aC5wb3codFs5XSwyKStNYXRoLnBvdyh0WzEwXSwyKStNYXRoLnBvdyh0WzExXSwyKStNYXRoLnBvdyh0WzEyXSwyKStNYXRoLnBvdyh0WzEzXSwyKStNYXRoLnBvdyh0WzE0XSwyKStNYXRoLnBvdyh0WzE1XSwyKSl9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdFs0XT1hWzRdK25bNF0sdFs1XT1hWzVdK25bNV0sdFs2XT1hWzZdK25bNl0sdFs3XT1hWzddK25bN10sdFs4XT1hWzhdK25bOF0sdFs5XT1hWzldK25bOV0sdFsxMF09YVsxMF0rblsxMF0sdFsxMV09YVsxMV0rblsxMV0sdFsxMl09YVsxMl0rblsxMl0sdFsxM109YVsxM10rblsxM10sdFsxNF09YVsxNF0rblsxNF0sdFsxNV09YVsxNV0rblsxNV0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHRbNF09YVs0XS1uWzRdLHRbNV09YVs1XS1uWzVdLHRbNl09YVs2XS1uWzZdLHRbN109YVs3XS1uWzddLHRbOF09YVs4XS1uWzhdLHRbOV09YVs5XS1uWzldLHRbMTBdPWFbMTBdLW5bMTBdLHRbMTFdPWFbMTFdLW5bMTFdLHRbMTJdPWFbMTJdLW5bMTJdLHRbMTNdPWFbMTNdLW5bMTNdLHRbMTRdPWFbMTRdLW5bMTRdLHRbMTVdPWFbMTVdLW5bMTVdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHRbNF09YVs0XSpuLHRbNV09YVs1XSpuLHRbNl09YVs2XSpuLHRbN109YVs3XSpuLHRbOF09YVs4XSpuLHRbOV09YVs5XSpuLHRbMTBdPWFbMTBdKm4sdFsxMV09YVsxMV0qbix0WzEyXT1hWzEyXSpuLHRbMTNdPWFbMTNdKm4sdFsxNF09YVsxNF0qbix0WzE1XT1hWzE1XSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdFs0XT1hWzRdK25bNF0qcix0WzVdPWFbNV0rbls1XSpyLHRbNl09YVs2XStuWzZdKnIsdFs3XT1hWzddK25bN10qcix0WzhdPWFbOF0rbls4XSpyLHRbOV09YVs5XStuWzldKnIsdFsxMF09YVsxMF0rblsxMF0qcix0WzExXT1hWzExXStuWzExXSpyLHRbMTJdPWFbMTJdK25bMTJdKnIsdFsxM109YVsxM10rblsxM10qcix0WzE0XT1hWzE0XStuWzE0XSpyLHRbMTVdPWFbMTVdK25bMTVdKnIsdH0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXSYmdFs0XT09PWFbNF0mJnRbNV09PT1hWzVdJiZ0WzZdPT09YVs2XSYmdFs3XT09PWFbN10mJnRbOF09PT1hWzhdJiZ0WzldPT09YVs5XSYmdFsxMF09PT1hWzEwXSYmdFsxMV09PT1hWzExXSYmdFsxMl09PT1hWzEyXSYmdFsxM109PT1hWzEzXSYmdFsxNF09PT1hWzE0XSYmdFsxNV09PT1hWzE1XX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9dFs0XSxNPXRbNV0scz10WzZdLGk9dFs3XSxjPXRbOF0saD10WzldLFM9dFsxMF0sST10WzExXSxmPXRbMTJdLHg9dFsxM10sRD10WzE0XSxGPXRbMTVdLG09YVswXSxkPWFbMV0sYj1hWzJdLHY9YVszXSx6PWFbNF0scD1hWzVdLHc9YVs2XSxFPWFbN10sQT1hWzhdLFA9YVs5XSxMPWFbMTBdLHE9YVsxMV0sUj1hWzEyXSxOPWFbMTNdLE89YVsxNF0sWT1hWzE1XTtyZXR1cm4gTWF0aC5hYnMobi1tKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMobSkpJiZNYXRoLmFicyhvLWQpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhkKSkmJk1hdGguYWJzKHUtYik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKGIpKSYmTWF0aC5hYnMobC12KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnModikpJiZNYXRoLmFicyhlLXopPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhlKSxNYXRoLmFicyh6KSkmJk1hdGguYWJzKE0tcCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKE0pLE1hdGguYWJzKHApKSYmTWF0aC5hYnMocy13KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMocyksTWF0aC5hYnModykpJiZNYXRoLmFicyhpLUUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhpKSxNYXRoLmFicyhFKSkmJk1hdGguYWJzKGMtQSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGMpLE1hdGguYWJzKEEpKSYmTWF0aC5hYnMoaC1QKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoaCksTWF0aC5hYnMoUCkpJiZNYXRoLmFicyhTLUwpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhTKSxNYXRoLmFicyhMKSkmJk1hdGguYWJzKEktcSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKEkpLE1hdGguYWJzKHEpKSYmTWF0aC5hYnMoZi1SKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZiksTWF0aC5hYnMoUikpJiZNYXRoLmFicyh4LU4pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh4KSxNYXRoLmFicyhOKSkmJk1hdGguYWJzKEQtTyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKEQpLE1hdGguYWJzKE8pKSYmTWF0aC5hYnMoRi1ZKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoRiksTWF0aC5hYnMoWSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz1uKDQpLHU9big3KSxsPW4oOCksZT17fTtlLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxlLnJvdGF0aW9uVG89ZnVuY3Rpb24oKXt2YXIgdD11LmNyZWF0ZSgpLGE9dS5mcm9tVmFsdWVzKDEsMCwwKSxuPXUuZnJvbVZhbHVlcygwLDEsMCk7cmV0dXJuIGZ1bmN0aW9uKHIsbyxsKXt2YXIgTT11LmRvdChvLGwpO3JldHVybi0uOTk5OTk5Pk0/KHUuY3Jvc3ModCxhLG8pLHUubGVuZ3RoKHQpPDFlLTYmJnUuY3Jvc3ModCxuLG8pLHUubm9ybWFsaXplKHQsdCksZS5zZXRBeGlzQW5nbGUocix0LE1hdGguUEkpLHIpOk0+Ljk5OTk5OT8oclswXT0wLHJbMV09MCxyWzJdPTAsclszXT0xLHIpOih1LmNyb3NzKHQsbyxsKSxyWzBdPXRbMF0sclsxXT10WzFdLHJbMl09dFsyXSxyWzNdPTErTSxlLm5vcm1hbGl6ZShyLHIpKX19KCksZS5zZXRBeGVzPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyl7cmV0dXJuIHRbMF09clswXSx0WzNdPXJbMV0sdFs2XT1yWzJdLHRbMV09b1swXSx0WzRdPW9bMV0sdFs3XT1vWzJdLHRbMl09LW5bMF0sdFs1XT0tblsxXSx0WzhdPS1uWzJdLGUubm9ybWFsaXplKGEsZS5mcm9tTWF0MyhhLHQpKX19KCksZS5jbG9uZT1sLmNsb25lLGUuZnJvbVZhbHVlcz1sLmZyb21WYWx1ZXMsZS5jb3B5PWwuY29weSxlLnNldD1sLnNldCxlLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0WzNdPTEsdH0sZS5zZXRBeGlzQW5nbGU9ZnVuY3Rpb24odCxhLG4pe249LjUqbjt2YXIgcj1NYXRoLnNpbihuKTtyZXR1cm4gdFswXT1yKmFbMF0sdFsxXT1yKmFbMV0sdFsyXT1yKmFbMl0sdFszXT1NYXRoLmNvcyhuKSx0fSxlLmdldEF4aXNBbmdsZT1mdW5jdGlvbih0LGEpe3ZhciBuPTIqTWF0aC5hY29zKGFbM10pLHI9TWF0aC5zaW4obi8yKTtyZXR1cm4gMCE9cj8odFswXT1hWzBdL3IsdFsxXT1hWzFdL3IsdFsyXT1hWzJdL3IpOih0WzBdPTEsdFsxXT0wLHRbMl09MCksbn0sZS5hZGQ9bC5hZGQsZS5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPW5bMF0sTT1uWzFdLHM9blsyXSxpPW5bM107cmV0dXJuIHRbMF09cippK2wqZStvKnMtdSpNLHRbMV09byppK2wqTSt1KmUtcipzLHRbMl09dSppK2wqcytyKk0tbyplLHRbM109bCppLXIqZS1vKk0tdSpzLHR9LGUubXVsPWUubXVsdGlwbHksZS5zY2FsZT1sLnNjYWxlLGUucm90YXRlWD1mdW5jdGlvbih0LGEsbil7bio9LjU7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNK2wqZSx0WzFdPW8qTSt1KmUsdFsyXT11Kk0tbyplLHRbM109bCpNLXIqZSx0fSxlLnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4pe24qPS41O3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTS11KmUsdFsxXT1vKk0rbCplLHRbMl09dSpNK3IqZSx0WzNdPWwqTS1vKmUsdH0sZS5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuKXtuKj0uNTt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0rbyplLHRbMV09bypNLXIqZSx0WzJdPXUqTStsKmUsdFszXT1sKk0tdSplLHR9LGUuY2FsY3VsYXRlVz1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXTtyZXR1cm4gdFswXT1uLHRbMV09cix0WzJdPW8sdFszXT1NYXRoLnNxcnQoTWF0aC5hYnMoMS1uKm4tcipyLW8qbykpLHR9LGUuZG90PWwuZG90LGUubGVycD1sLmxlcnAsZS5zbGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbyx1LGwsZSxNLHM9YVswXSxpPWFbMV0sYz1hWzJdLGg9YVszXSxTPW5bMF0sST1uWzFdLGY9blsyXSx4PW5bM107cmV0dXJuIHU9cypTK2kqSStjKmYraCp4LDA+dSYmKHU9LXUsUz0tUyxJPS1JLGY9LWYseD0teCksMS11PjFlLTY/KG89TWF0aC5hY29zKHUpLGw9TWF0aC5zaW4obyksZT1NYXRoLnNpbigoMS1yKSpvKS9sLE09TWF0aC5zaW4ocipvKS9sKTooZT0xLXIsTT1yKSx0WzBdPWUqcytNKlMsdFsxXT1lKmkrTSpJLHRbMl09ZSpjK00qZix0WzNdPWUqaCtNKngsdH0sZS5zcWxlcnA9ZnVuY3Rpb24oKXt2YXIgdD1lLmNyZWF0ZSgpLGE9ZS5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24obixyLG8sdSxsLE0pe3JldHVybiBlLnNsZXJwKHQscixsLE0pLGUuc2xlcnAoYSxvLHUsTSksZS5zbGVycChuLHQsYSwyKk0qKDEtTSkpLG59fSgpLGUuaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4qbityKnIrbypvK3UqdSxlPWw/MS9sOjA7cmV0dXJuIHRbMF09LW4qZSx0WzFdPS1yKmUsdFsyXT0tbyplLHRbM109dSplLHR9LGUuY29uanVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHRbM109YVszXSx0fSxlLmxlbmd0aD1sLmxlbmd0aCxlLmxlbj1lLmxlbmd0aCxlLnNxdWFyZWRMZW5ndGg9bC5zcXVhcmVkTGVuZ3RoLGUuc3FyTGVuPWUuc3F1YXJlZExlbmd0aCxlLm5vcm1hbGl6ZT1sLm5vcm1hbGl6ZSxlLmZyb21NYXQzPWZ1bmN0aW9uKHQsYSl7dmFyIG4scj1hWzBdK2FbNF0rYVs4XTtpZihyPjApbj1NYXRoLnNxcnQocisxKSx0WzNdPS41Km4sbj0uNS9uLHRbMF09KGFbNV0tYVs3XSkqbix0WzFdPShhWzZdLWFbMl0pKm4sdFsyXT0oYVsxXS1hWzNdKSpuO2Vsc2V7dmFyIG89MDthWzRdPmFbMF0mJihvPTEpLGFbOF0+YVszKm8rb10mJihvPTIpO3ZhciB1PShvKzEpJTMsbD0obysyKSUzO249TWF0aC5zcXJ0KGFbMypvK29dLWFbMyp1K3VdLWFbMypsK2xdKzEpLHRbb109LjUqbixuPS41L24sdFszXT0oYVszKnUrbF0tYVszKmwrdV0pKm4sdFt1XT0oYVszKnUrb10rYVszKm8rdV0pKm4sdFtsXT0oYVszKmwrb10rYVszKm8rbF0pKm59cmV0dXJuIHR9LGUuc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwicXVhdChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiKVwifSxlLmV4YWN0RXF1YWxzPWwuZXhhY3RFcXVhbHMsZS5lcXVhbHM9bC5lcXVhbHMsdC5leHBvcnRzPWV9LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDMpO3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoMyk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGF9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbil7dmFyIG89bmV3IHIuQVJSQVlfVFlQRSgzKTtyZXR1cm4gb1swXT10LG9bMV09YSxvWzJdPW4sb30sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHR9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0fSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qblswXSx0WzFdPWFbMV0qblsxXSx0WzJdPWFbMl0qblsyXSx0fSxvLm11bD1vLm11bHRpcGx5LG8uZGl2aWRlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdL25bMF0sdFsxXT1hWzFdL25bMV0sdFsyXT1hWzJdL25bMl0sdH0sby5kaXY9by5kaXZpZGUsby5jZWlsPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5jZWlsKGFbMF0pLHRbMV09TWF0aC5jZWlsKGFbMV0pLHRbMl09TWF0aC5jZWlsKGFbMl0pLHR9LG8uZmxvb3I9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmZsb29yKGFbMF0pLHRbMV09TWF0aC5mbG9vcihhWzFdKSx0WzJdPU1hdGguZmxvb3IoYVsyXSksdH0sby5taW49ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWluKGFbMF0sblswXSksdFsxXT1NYXRoLm1pbihhWzFdLG5bMV0pLHRbMl09TWF0aC5taW4oYVsyXSxuWzJdKSx0fSxvLm1heD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5tYXgoYVswXSxuWzBdKSx0WzFdPU1hdGgubWF4KGFbMV0sblsxXSksdFsyXT1NYXRoLm1heChhWzJdLG5bMl0pLHR9LG8ucm91bmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLnJvdW5kKGFbMF0pLHRbMV09TWF0aC5yb3VuZChhWzFdKSx0WzJdPU1hdGgucm91bmQoYVsyXSksdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHR9LG8uc2NhbGVBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHR9LG8uZGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl07cmV0dXJuIE1hdGguc3FydChuKm4rcipyK28qbyl9LG8uZGlzdD1vLmRpc3RhbmNlLG8uc3F1YXJlZERpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdO3JldHVybiBuKm4rcipyK28qb30sby5zcXJEaXN0PW8uc3F1YXJlZERpc3RhbmNlLG8ubGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXTtyZXR1cm4gTWF0aC5zcXJ0KGEqYStuKm4rcipyKX0sby5sZW49by5sZW5ndGgsby5zcXVhcmVkTGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXTtyZXR1cm4gYSphK24qbityKnJ9LG8uc3FyTGVuPW8uc3F1YXJlZExlbmd0aCxvLm5lZ2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0fSxvLmludmVyc2U9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xL2FbMF0sdFsxXT0xL2FbMV0sdFsyXT0xL2FbMl0sdH0sby5ub3JtYWxpemU9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1uKm4rcipyK28qbztyZXR1cm4gdT4wJiYodT0xL01hdGguc3FydCh1KSx0WzBdPWFbMF0qdSx0WzFdPWFbMV0qdSx0WzJdPWFbMl0qdSksdH0sby5kb3Q9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXSphWzBdK3RbMV0qYVsxXSt0WzJdKmFbMl19LG8uY3Jvc3M9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bMF0sZT1uWzFdLE09blsyXTtyZXR1cm4gdFswXT1vKk0tdSplLHRbMV09dSpsLXIqTSx0WzJdPXIqZS1vKmwsdH0sby5sZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdLGw9YVsyXTtyZXR1cm4gdFswXT1vK3IqKG5bMF0tbyksdFsxXT11K3IqKG5bMV0tdSksdFsyXT1sK3IqKG5bMl0tbCksdH0sby5oZXJtaXRlPWZ1bmN0aW9uKHQsYSxuLHIsbyx1KXt2YXIgbD11KnUsZT1sKigyKnUtMykrMSxNPWwqKHUtMikrdSxzPWwqKHUtMSksaT1sKigzLTIqdSk7cmV0dXJuIHRbMF09YVswXSplK25bMF0qTStyWzBdKnMrb1swXSppLHRbMV09YVsxXSplK25bMV0qTStyWzFdKnMrb1sxXSppLHRbMl09YVsyXSplK25bMl0qTStyWzJdKnMrb1syXSppLHR9LG8uYmV6aWVyPWZ1bmN0aW9uKHQsYSxuLHIsbyx1KXt2YXIgbD0xLXUsZT1sKmwsTT11KnUscz1lKmwsaT0zKnUqZSxjPTMqTSpsLGg9TSp1O3JldHVybiB0WzBdPWFbMF0qcytuWzBdKmkrclswXSpjK29bMF0qaCx0WzFdPWFbMV0qcytuWzFdKmkrclsxXSpjK29bMV0qaCx0WzJdPWFbMl0qcytuWzJdKmkrclsyXSpjK29bMl0qaCx0fSxvLnJhbmRvbT1mdW5jdGlvbih0LGEpe2E9YXx8MTt2YXIgbj0yKnIuUkFORE9NKCkqTWF0aC5QSSxvPTIqci5SQU5ET00oKS0xLHU9TWF0aC5zcXJ0KDEtbypvKSphO3JldHVybiB0WzBdPU1hdGguY29zKG4pKnUsdFsxXT1NYXRoLnNpbihuKSp1LHRbMl09byphLHR9LG8udHJhbnNmb3JtTWF0ND1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blszXSpyK25bN10qbytuWzExXSp1K25bMTVdO3JldHVybiBsPWx8fDEsdFswXT0oblswXSpyK25bNF0qbytuWzhdKnUrblsxMl0pL2wsdFsxXT0oblsxXSpyK25bNV0qbytuWzldKnUrblsxM10pL2wsdFsyXT0oblsyXSpyK25bNl0qbytuWzEwXSp1K25bMTRdKS9sLHR9LG8udHJhbnNmb3JtTWF0Mz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdO3JldHVybiB0WzBdPXIqblswXStvKm5bM10rdSpuWzZdLHRbMV09cipuWzFdK28qbls0XSt1Km5bN10sdFsyXT1yKm5bMl0rbypuWzVdK3Uqbls4XSx0fSxvLnRyYW5zZm9ybVF1YXQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bMF0sZT1uWzFdLE09blsyXSxzPW5bM10saT1zKnIrZSp1LU0qbyxjPXMqbytNKnItbCp1LGg9cyp1K2wqby1lKnIsUz0tbCpyLWUqby1NKnU7cmV0dXJuIHRbMF09aSpzK1MqLWwrYyotTS1oKi1lLHRbMV09YypzK1MqLWUraCotbC1pKi1NLHRbMl09aCpzK1MqLU0raSotZS1jKi1sLHR9LG8ucm90YXRlWD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1bXSx1PVtdO3JldHVybiBvWzBdPWFbMF0tblswXSxvWzFdPWFbMV0tblsxXSxvWzJdPWFbMl0tblsyXSx1WzBdPW9bMF0sdVsxXT1vWzFdKk1hdGguY29zKHIpLW9bMl0qTWF0aC5zaW4ociksdVsyXT1vWzFdKk1hdGguc2luKHIpK29bMl0qTWF0aC5jb3MociksdFswXT11WzBdK25bMF0sdFsxXT11WzFdK25bMV0sdFsyXT11WzJdK25bMl0sdH0sby5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPVtdLHU9W107cmV0dXJuIG9bMF09YVswXS1uWzBdLG9bMV09YVsxXS1uWzFdLG9bMl09YVsyXS1uWzJdLHVbMF09b1syXSpNYXRoLnNpbihyKStvWzBdKk1hdGguY29zKHIpLHVbMV09b1sxXSx1WzJdPW9bMl0qTWF0aC5jb3Mociktb1swXSpNYXRoLnNpbihyKSx0WzBdPXVbMF0rblswXSx0WzFdPXVbMV0rblsxXSx0WzJdPXVbMl0rblsyXSx0fSxvLnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89W10sdT1bXTtyZXR1cm4gb1swXT1hWzBdLW5bMF0sb1sxXT1hWzFdLW5bMV0sb1syXT1hWzJdLW5bMl0sdVswXT1vWzBdKk1hdGguY29zKHIpLW9bMV0qTWF0aC5zaW4ociksdVsxXT1vWzBdKk1hdGguc2luKHIpK29bMV0qTWF0aC5jb3MociksdVsyXT1vWzJdLHRbMF09dVswXStuWzBdLHRbMV09dVsxXStuWzFdLHRbMl09dVsyXStuWzJdLHR9LG8uZm9yRWFjaD1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8sdSxsKXt2YXIgZSxNO2ZvcihufHwobj0zKSxyfHwocj0wKSxNPW8/TWF0aC5taW4obypuK3IsYS5sZW5ndGgpOmEubGVuZ3RoLGU9cjtNPmU7ZSs9bil0WzBdPWFbZV0sdFsxXT1hW2UrMV0sdFsyXT1hW2UrMl0sdSh0LHQsbCksYVtlXT10WzBdLGFbZSsxXT10WzFdLGFbZSsyXT10WzJdO3JldHVybiBhfX0oKSxvLmFuZ2xlPWZ1bmN0aW9uKHQsYSl7dmFyIG49by5mcm9tVmFsdWVzKHRbMF0sdFsxXSx0WzJdKSxyPW8uZnJvbVZhbHVlcyhhWzBdLGFbMV0sYVsyXSk7by5ub3JtYWxpemUobixuKSxvLm5vcm1hbGl6ZShyLHIpO3ZhciB1PW8uZG90KG4scik7cmV0dXJuIHU+MT8wOk1hdGguYWNvcyh1KX0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJ2ZWMzKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIpXCJ9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD1hWzBdLGU9YVsxXSxNPWFbMl07cmV0dXJuIE1hdGguYWJzKG4tbCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGwpKSYmTWF0aC5hYnMoby1lKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoZSkpJiZNYXRoLmFicyh1LU0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhNKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdFszXT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGF9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvKXt2YXIgdT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB1WzBdPXQsdVsxXT1hLHVbMl09bix1WzNdPW8sdX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0fSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8pe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdH0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm5bMF0sdFsxXT1hWzFdKm5bMV0sdFsyXT1hWzJdKm5bMl0sdFszXT1hWzNdKm5bM10sdH0sby5tdWw9by5tdWx0aXBseSxvLmRpdmlkZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS9uWzBdLHRbMV09YVsxXS9uWzFdLHRbMl09YVsyXS9uWzJdLHRbM109YVszXS9uWzNdLHR9LG8uZGl2PW8uZGl2aWRlLG8uY2VpbD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguY2VpbChhWzBdKSx0WzFdPU1hdGguY2VpbChhWzFdKSx0WzJdPU1hdGguY2VpbChhWzJdKSx0WzNdPU1hdGguY2VpbChhWzNdKSx0fSxvLmZsb29yPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5mbG9vcihhWzBdKSx0WzFdPU1hdGguZmxvb3IoYVsxXSksdFsyXT1NYXRoLmZsb29yKGFbMl0pLHRbM109TWF0aC5mbG9vcihhWzNdKSx0fSxvLm1pbj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5taW4oYVswXSxuWzBdKSx0WzFdPU1hdGgubWluKGFbMV0sblsxXSksdFsyXT1NYXRoLm1pbihhWzJdLG5bMl0pLHRbM109TWF0aC5taW4oYVszXSxuWzNdKSx0fSxvLm1heD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5tYXgoYVswXSxuWzBdKSx0WzFdPU1hdGgubWF4KGFbMV0sblsxXSksdFsyXT1NYXRoLm1heChhWzJdLG5bMl0pLHRbM109TWF0aC5tYXgoYVszXSxuWzNdKSx0fSxvLnJvdW5kPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5yb3VuZChhWzBdKSx0WzFdPU1hdGgucm91bmQoYVsxXSksdFsyXT1NYXRoLnJvdW5kKGFbMl0pLHRbM109TWF0aC5yb3VuZChhWzNdKSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdH0sby5zY2FsZUFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0fSxvLmRpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdLHU9YVszXS10WzNdO3JldHVybiBNYXRoLnNxcnQobipuK3IqcitvKm8rdSp1KX0sby5kaXN0PW8uZGlzdGFuY2Usby5zcXVhcmVkRGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl0sdT1hWzNdLXRbM107cmV0dXJuIG4qbityKnIrbypvK3UqdX0sby5zcXJEaXN0PW8uc3F1YXJlZERpc3RhbmNlLG8ubGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM107cmV0dXJuIE1hdGguc3FydChhKmErbipuK3IqcitvKm8pfSxvLmxlbj1vLmxlbmd0aCxvLnNxdWFyZWRMZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXTtyZXR1cm4gYSphK24qbityKnIrbypvfSxvLnNxckxlbj1vLnNxdWFyZWRMZW5ndGgsby5uZWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdFszXT0tYVszXSx0fSxvLmludmVyc2U9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xL2FbMF0sdFsxXT0xL2FbMV0sdFsyXT0xL2FbMl0sdFszXT0xL2FbM10sdH0sby5ub3JtYWxpemU9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bipuK3IqcitvKm8rdSp1O3JldHVybiBsPjAmJihsPTEvTWF0aC5zcXJ0KGwpLHRbMF09bipsLHRbMV09cipsLHRbMl09bypsLHRbM109dSpsKSx0fSxvLmRvdD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdKmFbMF0rdFsxXSphWzFdK3RbMl0qYVsyXSt0WzNdKmFbM119LG8ubGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXSxsPWFbMl0sZT1hWzNdO3JldHVybiB0WzBdPW8rciooblswXS1vKSx0WzFdPXUrciooblsxXS11KSx0WzJdPWwrciooblsyXS1sKSx0WzNdPWUrciooblszXS1lKSx0fSxvLnJhbmRvbT1mdW5jdGlvbih0LGEpe3JldHVybiBhPWF8fDEsdFswXT1yLlJBTkRPTSgpLHRbMV09ci5SQU5ET00oKSx0WzJdPXIuUkFORE9NKCksdFszXT1yLlJBTkRPTSgpLG8ubm9ybWFsaXplKHQsdCksby5zY2FsZSh0LHQsYSksdH0sby50cmFuc2Zvcm1NYXQ0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdO3JldHVybiB0WzBdPW5bMF0qcituWzRdKm8rbls4XSp1K25bMTJdKmwsdFsxXT1uWzFdKnIrbls1XSpvK25bOV0qdStuWzEzXSpsLHRbMl09blsyXSpyK25bNl0qbytuWzEwXSp1K25bMTRdKmwsdFszXT1uWzNdKnIrbls3XSpvK25bMTFdKnUrblsxNV0qbCx0fSxvLnRyYW5zZm9ybVF1YXQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bMF0sZT1uWzFdLE09blsyXSxzPW5bM10saT1zKnIrZSp1LU0qbyxjPXMqbytNKnItbCp1LGg9cyp1K2wqby1lKnIsUz0tbCpyLWUqby1NKnU7cmV0dXJuIHRbMF09aSpzK1MqLWwrYyotTS1oKi1lLHRbMV09YypzK1MqLWUraCotbC1pKi1NLHRbMl09aCpzK1MqLU0raSotZS1jKi1sLHRbM109YVszXSx0fSxvLmZvckVhY2g9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvLHUsbCl7dmFyIGUsTTtmb3Iobnx8KG49NCkscnx8KHI9MCksTT1vP01hdGgubWluKG8qbityLGEubGVuZ3RoKTphLmxlbmd0aCxlPXI7TT5lO2UrPW4pdFswXT1hW2VdLHRbMV09YVtlKzFdLHRbMl09YVtlKzJdLHRbM109YVtlKzNdLHUodCx0LGwpLGFbZV09dFswXSxhW2UrMV09dFsxXSxhW2UrMl09dFsyXSxhW2UrM109dFszXTtyZXR1cm4gYX19KCksby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJ2ZWM0KFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIpXCJ9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM119LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPWFbMF0sTT1hWzFdLHM9YVsyXSxpPWFbM107cmV0dXJuIE1hdGguYWJzKG4tZSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGUpKSYmTWF0aC5hYnMoby1NKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoTSkpJiZNYXRoLmFicyh1LXMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhzKSkmJk1hdGguYWJzKGwtaSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGkpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDIpO3JldHVybiB0WzBdPTAsdFsxXT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSgyKTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhfSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhKXt2YXIgbj1uZXcgci5BUlJBWV9UWVBFKDIpO3JldHVybiBuWzBdPXQsblsxXT1hLG59LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHR9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hLHRbMV09bix0fSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qblswXSx0WzFdPWFbMV0qblsxXSx0fSxvLm11bD1vLm11bHRpcGx5LG8uZGl2aWRlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdL25bMF0sdFsxXT1hWzFdL25bMV0sdH0sby5kaXY9by5kaXZpZGUsby5jZWlsPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5jZWlsKGFbMF0pLHRbMV09TWF0aC5jZWlsKGFbMV0pLHR9LG8uZmxvb3I9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmZsb29yKGFbMF0pLHRbMV09TWF0aC5mbG9vcihhWzFdKSx0fSxvLm1pbj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5taW4oYVswXSxuWzBdKSx0WzFdPU1hdGgubWluKGFbMV0sblsxXSksdH0sby5tYXg9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWF4KGFbMF0sblswXSksdFsxXT1NYXRoLm1heChhWzFdLG5bMV0pLHR9LG8ucm91bmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLnJvdW5kKGFbMF0pLHRbMV09TWF0aC5yb3VuZChhWzFdKSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdH0sby5zY2FsZUFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHR9LG8uZGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV07cmV0dXJuIE1hdGguc3FydChuKm4rcipyKX0sby5kaXN0PW8uZGlzdGFuY2Usby5zcXVhcmVkRGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV07cmV0dXJuIG4qbityKnJ9LG8uc3FyRGlzdD1vLnNxdWFyZWREaXN0YW5jZSxvLmxlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXTtyZXR1cm4gTWF0aC5zcXJ0KGEqYStuKm4pfSxvLmxlbj1vLmxlbmd0aCxvLnNxdWFyZWRMZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV07cmV0dXJuIGEqYStuKm59LG8uc3FyTGVuPW8uc3F1YXJlZExlbmd0aCxvLm5lZ2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdH0sby5pbnZlcnNlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MS9hWzBdLHRbMV09MS9hWzFdLHR9LG8ubm9ybWFsaXplPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1uKm4rcipyO3JldHVybiBvPjAmJihvPTEvTWF0aC5zcXJ0KG8pLHRbMF09YVswXSpvLHRbMV09YVsxXSpvKSx0fSxvLmRvdD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdKmFbMF0rdFsxXSphWzFdfSxvLmNyb3NzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdKm5bMV0tYVsxXSpuWzBdO3JldHVybiB0WzBdPXRbMV09MCx0WzJdPXIsdH0sby5sZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdO3JldHVybiB0WzBdPW8rciooblswXS1vKSx0WzFdPXUrciooblsxXS11KSx0fSxvLnJhbmRvbT1mdW5jdGlvbih0LGEpe2E9YXx8MTt2YXIgbj0yKnIuUkFORE9NKCkqTWF0aC5QSTtyZXR1cm4gdFswXT1NYXRoLmNvcyhuKSphLHRbMV09TWF0aC5zaW4obikqYSx0fSxvLnRyYW5zZm9ybU1hdDI9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzJdKm8sdFsxXT1uWzFdKnIrblszXSpvLHR9LG8udHJhbnNmb3JtTWF0MmQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzJdKm8rbls0XSx0WzFdPW5bMV0qcituWzNdKm8rbls1XSx0fSxvLnRyYW5zZm9ybU1hdDM9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzNdKm8rbls2XSx0WzFdPW5bMV0qcituWzRdKm8rbls3XSx0fSxvLnRyYW5zZm9ybU1hdDQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzRdKm8rblsxMl0sdFsxXT1uWzFdKnIrbls1XSpvK25bMTNdLHR9LG8uZm9yRWFjaD1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8sdSxsKXt2YXIgZSxNO2ZvcihufHwobj0yKSxyfHwocj0wKSxNPW8/TWF0aC5taW4obypuK3IsYS5sZW5ndGgpOmEubGVuZ3RoLGU9cjtNPmU7ZSs9bil0WzBdPWFbZV0sdFsxXT1hW2UrMV0sdSh0LHQsbCksYVtlXT10WzBdLGFbZSsxXT10WzFdO3JldHVybiBhfX0oKSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInZlYzIoXCIrdFswXStcIiwgXCIrdFsxXStcIilcIn0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT1hWzBdLGw9YVsxXTtyZXR1cm4gTWF0aC5hYnMobi11KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnModSkpJiZNYXRoLmFicyhvLWwpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhsKSl9LHQuZXhwb3J0cz1vfV0pfSk7IiwiLyoqXG4gKiBDYW52YXMgUmVuZGVyaW5nIFN1cmZhY2UuXG4gKiBJdCBpcyBhIHRvcCBsZXZlbCBjb21wb25lbnQgdGhhdCBjb21iaW5lcyBpdCBhbGwgdG9nZXRoZXIgYW5kIGhpZGVzIHVubmVjZXNzYXJ5IGRldGFpbHMuXG4gKlxuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzU3VyZmFjZShjYW52YXMpXG57XG4gICAgaWYgKCAhIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Bhc3NlZCBjYW52YXMgaXMgbm90IEhUTUxDYW52YXNFbGVtZW50IScpO1xuICAgIH1cbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmZhY3RvcnkgPSBuZXcgQ2FudmFzVUlGYWN0b3J5KHRoaXMuY29udGV4dCk7XG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcbiAgICB0aGlzLmVsZW1lbnRzLmFkZCh0aGlzLmZhY3RvcnkuY3JlYXRlTGFiZWwoKSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBuZXcgQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlcih0aGlzKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5iaW5kSHRtbENhbnZhc0V2ZW50cygpO1xufVxuXG4vKipcbiAqIFJldHVybnMgVUlDb2xsZWN0aW9uIHJlbGF0ZWQgdG8gdGhlIHN1cmZhY2UuXG4gKiBcbiAqIEByZXR1cm5zIHtVSUNvbGxlY3Rpb259XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBsYWJlbCBlbGVtZW50IGluIHVpIGNvbGxlY3Rpb24gb2YgdGhlIHN1cmZhY2UgYW5kIHJldHVybnMgaXQuXG4gKiBcbiAqIEByZXR1cm5zIHtVSUxhYmVsRWxlbWVudH1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucHVzaExhYmVsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYWJlbCA9IHRoaXMuZmFjdG9yeS5jcmVhdGVMYWJlbCgpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKGxhYmVsKTtcbiAgICB0aGlzLmVsZW1lbnRzLnNlbGVjdExhc3QoKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJTZWxlY3QobGFiZWwpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGltYWdlIGVsZW1lbnQgaW4gdWkgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnB1c2hJbWFnZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgIHZhciBpbWFnZUVsZW1lbnQgPSB0aGlzLmZhY3RvcnkuY3JlYXRlSW1hZ2UoaW1hZ2UpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKGltYWdlRWxlbWVudCk7XG4gICAgdGhpcy5lbGVtZW50cy5zZWxlY3RMYXN0KCk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyU2VsZWN0KGltYWdlRWxlbWVudCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENsZWFyIHRoZSByZWxhdGVkIGNhbnZhcy5cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbn07XG5cbi8qKlxuICogUmVuZGVycyBhbGwgb2YgdGhlIGVsZW1lbnRzIG9uIHRoZSBzdXJmYWNlLlxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5yZW5kZXJFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmdldChpKS5yZW5kZXIoKTtcbiAgICAgICAgaWYgKGkgPT0gc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAgICAgLy8gVE9ETzogY2hlY2sgaWYgd2UgYXJlIGNyZWF0aW5nIHRleHR1cmVcbiAgICAgICAgICAgIG5ldyBDYW52YXNVSVNlbGVjdGVkVmlldyh0aGlzLmNvbnRleHQpLnJlbmRlcih0aGlzLmVsZW1lbnRzLmdldChpKSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIENsZWFycyB0aGUgc3VyZmFjZSBhbmQgcmVuZGVycyBpdCB3aXRoIGFsbCBlbGVtZW50cy5cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLnJlbmRlckVsZW1lbnRzKCk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbiBpbWFnZSBmcm9tIGRyYXduIGNvbnRlbnRcbiAqIEByZXR1cm5zIHtJbWFnZX1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUudG9JbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5zcmMgPSB0aGlzLmNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICByZXR1cm4gaW1hZ2U7XG59O1xuXG4vKipcbiAqIEFkZHMgbmV3IGV2ZW50IGhhbmRsZXIgb24gc2VsZWN0aW9uIG9mIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge1VJU2VsZWN0ZWRDYWxsYmFja30gY2FsbGJhY2tcbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuYWRkU2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIuYWRkU2VsZWN0RXZlbnRIYW5kbGVyKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBHZXQgY2FudmFzIGJvdW5kIHJlY3RhbmdsZS5cbiAqIFVnbHkgbWV0aG9kLlxuICpcbiAqIEByZXR1cm5zIHt7dG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fVxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICByaWdodDogdGhpcy5jYW52YXMud2lkdGgsXG4gICAgICAgIGJvdHRvbTogdGhpcy5jYW52YXMuaGVpZ2h0LFxuICAgICAgICBsZWZ0OiAwXG4gICAgfTtcbn07XG5cbi8qKlxuICogQ2FsbGJhY2sgdHlwZSBmb3Igc2VsZWN0aW5nIGFuZCBlbGVtZW50XG4gKlxuICogQGNhbGxiYWNrIFVJU2VsZWN0ZWRDYWxsYmFja1xuICogQHBhcmFtIHtVSUVsZW1lbnR9XG4gKi8iLCIvKipcbiAqIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIERPTSBldmVudHMgYW5kIHRyaWdnZXJpbmcgYXBwbGljYXRpb24gZXZlbnRzXG4gKiBLaW5kYSB1Z2x5IGNvZGUgaGVyZVxuICpcbiAqIEBwYXJhbSB7Q2FudmFzU3VyZmFjZX0gc3VyZmFjZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIgKHN1cmZhY2UpXG57XG4gICAgdGhpcy5zdXJmYWNlID0gc3VyZmFjZTtcbiAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5pc01vdmluZ0NsaWNrID0gZmFsc2U7XG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RDbGlja09mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBudWxsO1xuXG4gICAgdGhpcy5oYW5kbGVycyA9IHtcbiAgICAgICAgb25TZWxlY3Q6IFtdLFxuICAgICAgICBvbkRlc2VsZWN0OiBbXVxuICAgIH1cbn1cblxuLyoqXG4gKiBCaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIEhUTUwgY2FudmFzXG4gKiBcbiAqIEBwYXJhbSBlXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmJpbmRIdG1sQ2FudmFzRXZlbnRzID0gZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcykpO1xuXG4gICAgLy8gV2UgYmluZGluZyB0aGlzIGV2ZW50IHRvIHRoZSB3aG9sZSBkb2N1bWVudCB0byBzdG9wIG1vdmluZ1xuICAgIC8vIGlmIHVzZXIgdHJpZXMgdG8gZHJhZyBhbiBlbGVtZW50IG91dCBvZiB0aGUgY2FudmFzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbn07XG5cbi8qKlxuICogVHJpZ2dlcnMgc2VsZWN0IGV2ZW50LlxuICogVGhpcyBtZWFucyB0aGF0IGFsbCBhc3NpZ25lZCBoYW5kbGVycyB3aWxsIGJlIGV4ZWN1dGVkLlxuICpcbiAqIFRPRE86IEFiYW5kb24gSmF2YVNjcmlwdCBhbmQgbGVhcm4gVHlwZVNjcmlwdFxuICpcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXJTZWxlY3QgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmhhbmRsZXJzLm9uU2VsZWN0KSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuaGFuZGxlcnMub25TZWxlY3Rba2V5XTtcblxuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2soZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIFRyaWdnZXJzIGRlc2VsZWN0IGV2ZW50LlxuICogVGhpcyBtZWFucyB0aGF0IGFsbCBhc3NpZ25lZCBoYW5kbGVycyB3aWxsIGJlIGV4ZWN1dGVkLlxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50cmlnZ2VyRGVzZWxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLmhhbmRsZXJzLm9uRGVzZWxlY3Rba2V5XTtcbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIEFkZHMgbmV3IGhhbmRsZXIgb24gZWxlbWVudCBzZWxlY3Rpb24gZXZlbnRcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5hZGRTZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmhhbmRsZXJzLm9uU2VsZWN0LnB1c2goY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBBZGRzIG5ldyBoYW5kbGVyIG9uIGVsZW1lbnQgZGVzZWxlY3Rpb24gZXZlbnRcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5hZGREZXNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdC5wdXNoKGNhbGxiYWNrKTtcbn07XG5cblxuLyoqXG4gKiBIYW5kbGVyIGZvciB0aGUgbW91c2Vkb3duIGV2ZW50XG4gKlxuICogQHBhcmFtIGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VEb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLmlzTW91c2VEb3duID0gdHJ1ZTtcblxuICAgIC8vIFF1aWNrIGhhY2tcbiAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT0gXCJ1bmRlZmluZWRcIiAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xuICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xuICAgIH1cblxuICAgIHZhciBsb2NhbENvb3JkaW5hdGVzID0gdGhpcy50b0xvY2FsQ29vcmRpbmF0ZXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIHZhciBvbGRTZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZ2V0RWxlbWVudHMoKS5nZXRTZWxlY3RlZEluZGV4KCk7XG4gICAgdmFyIG5ld1NlbGVjdGVkSW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZmV0Y2hJbmRleEJ5T2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcbiAgICB2YXIgbmV3U2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldChuZXdTZWxlY3RlZEluZGV4KTtcblxuICAgIHZhciBkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkID0gbmV3U2VsZWN0ZWRJbmRleCAhPT0gbnVsbDtcbiAgICB2YXIgaXNDdXJyZW50bHlTZWxlY3RlZFdhc1NlbGVjdGVkQmVmb3JlID0gZG9XZUhhdmVTb21ldGhpbmdTZWxlY3RlZCAmJlxuICAgICAgICBvbGRTZWxlY3RlZEVsZW1lbnQgPT0gbmV3U2VsZWN0ZWRJbmRleDtcblxuICAgIGlmICghZG9XZUhhdmVTb21ldGhpbmdTZWxlY3RlZCkge1xuXG4gICAgICAgIC8vIElmIHdlIGhhZCBzb21ldGhpbmcgc2VsZWN0ZWQgYmVmb3JlLFxuICAgICAgICAvLyBpdCBtZWFucyBpdCBpcyB0aW1lIHRvIGNhbGwgZGVzZWxlY3QgaGFuZGxlcnNcbiAgICAgICAgaWYgKG9sZFNlbGVjdGVkRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJEZXNlbGVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmRlc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyU2VsZWN0KG5ld1NlbGVjdGVkRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gV2UgcmVtZW1iZXIgaGVyZSB0aGUgbGFzdCBjbGljayBvZmZzZXQgcmVsYXRpdmVseSBzZWxlY3RlZCBlbGVtZW50XG4gICAgdGhpcy5sYXN0Q2xpY2tPZmZzZXQgPSBuZXdTZWxlY3RlZEVsZW1lbnQuZ2V0Q2xpY2tPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xuXG4gICAgLy8gSXMgaXQgYSBjbGljayBzdGFydGluZyByZXNpemUgb3BlcmF0aW9uID9cbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSAmJlxuICAgICAgICB0aGlzLmlzUmVzaXplUG9zc2libGUobmV3U2VsZWN0ZWRFbGVtZW50LCBsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XG5cbiAgICBpZiAodGhpcy5pc1Jlc2l6aW5nQ2xpY2spIHtcbiAgICAgICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBsb2NhbENvb3JkaW5hdGVzO1xuICAgICAgICB0aGlzLnNldFJlc2l6YWJsZVN0YXRlKHRydWUpO1xuICAgIH1cbiAgICAvLyBJdCBpcyBhIGNsaWNrIGZvciBtb3ZpbmdcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5pc01vdmluZ0NsaWNrID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmVsZW1lbnRzLnNlbGVjdChuZXdTZWxlY3RlZEluZGV4KTtcbiAgICAgICAgdGhpcy5zZXRNb3ZhYmxlU3RhdGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xufTtcblxuLyoqXG4gKlxuICogSGFuZGxlciBmb3IgbW91c2UgdXAgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VVcCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZXNpemluZ0NsaWNrID0gZmFsc2U7XG4gICAgdGhpcy5pc01vdmluZ0NsaWNrID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgY29vcmRpbmF0ZXMgdG8gY29vcmRpbmF0ZXMgaW5zaWRlIGNhbnZhc1xuICpcbiAqIEBwYXJhbSBjbGllbnRYXG4gKiBAcGFyYW0gY2xpZW50WVxuICogQHJldHVybnMge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRvTG9jYWxDb29yZGluYXRlcyA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKSB7XG4gICAgdmFyIHZpZXdwb3J0T2Zmc2V0ID0gdGhpcy5zdXJmYWNlLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyB0aGVzZSBhcmUgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0LCBpLmUuIHRoZSB3aW5kb3dcbiAgICB2YXIgdG9wID0gdmlld3BvcnRPZmZzZXQudG9wO1xuICAgIHZhciBsZWZ0ID0gdmlld3BvcnRPZmZzZXQubGVmdDtcbiAgICB2YXIgdG9wT2Zmc2V0ID0gY2xpZW50WSAtIHRvcDtcbiAgICB2YXIgbGVmdE9mZnNldCA9IGNsaWVudFggLSBsZWZ0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogbGVmdE9mZnNldCxcbiAgICAgICAgeTogdG9wT2Zmc2V0XG4gICAgfTtcbn07XG5cbi8qKlxuICogSGFuZGxlciBmb3IgbW91c2UgbW92ZSBldmVudFxuICpcbiAqIEBwYXJhbSBlXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlTW92ZSA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICAvLyBRdWljayBoYWNrXG4gICAgaWYgKHR5cGVvZiBUb3VjaEV2ZW50ICE9IFwidW5kZWZpbmVkXCIgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcbiAgICAgICAgZSA9IGUudG91Y2hlc1swXTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCk7XG4gICAgdmFyIGxvY2FsQ29vcmRpbmF0ZXMgPSB0aGlzLnRvTG9jYWxDb29yZGluYXRlcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgdmFyIGVsZW1lbnRIb3ZlckluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmZldGNoSW5kZXhCeU9mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XG5cbiAgICAvLyBJdCBpcyBzaW1wbGUgbW91c2UgbW92ZSxcbiAgICAvLyB3ZSBoYXZlIG5vdGhpbmcgbW9yZSB0byBkbyBoZXJlXG4gICAgaWYgKCF0aGlzLmlzTW91c2VEb3duKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlV2l0aG91dE1vdXNlRG93bihlbGVtZW50SG92ZXJJbmRleCwgc2VsZWN0ZWRJbmRleCwgbG9jYWxDb29yZGluYXRlcyk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkRWxlbWVudCgpO1xuXG4gICAgLy8gSWYgd2UgYXJlIGhlcmUsIHRoZW4gd2UgaGF2ZSBidXR0b24gcHJlc3NlZCBhbmQgd2UgbXVzdCByZXNpemUhXG4gICAgaWYgKHRoaXMuaXNSZXNpemluZ0NsaWNrKSB7XG4gICAgICAgIHZhciBuZXdTaXplRGVsdGEgPSB7XG4gICAgICAgICAgICB3aWR0aDogbG9jYWxDb29yZGluYXRlcy54IC0gdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMueCxcbiAgICAgICAgICAgIGhlaWdodDogbG9jYWxDb29yZGluYXRlcy55IC0gdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMueVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzID0gbG9jYWxDb29yZGluYXRlcztcblxuICAgICAgICB2YXIgc2l6ZSA9IHNlbGVjdGVkRWxlbWVudC5nZXRTaXplKCk7XG4gICAgICAgIHNpemUucmVzaXplQnkobmV3U2l6ZURlbHRhLndpZHRoLCBuZXdTaXplRGVsdGEuaGVpZ2h0KTtcbiAgICB9XG4gICAgLy8gTmFoLCBpdCdzIGp1c3QgbW92aW5nXG4gICAgZWxzZSBpZiAodGhpcy5pc01vdmluZ0NsaWNrKSB7XG4gICAgICAgIHNlbGVjdGVkRWxlbWVudC5tb3ZlVG8obmV3IFBvc2l0aW9uKFxuICAgICAgICAgICAgbG9jYWxDb29yZGluYXRlcy54IC0gdGhpcy5sYXN0Q2xpY2tPZmZzZXQudG9wLFxuICAgICAgICAgICAgbG9jYWxDb29yZGluYXRlcy55IC0gdGhpcy5sYXN0Q2xpY2tPZmZzZXQubGVmdFxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1cmZhY2UucmVuZGVyKCk7XG59O1xuXG4vKipcbiAqIEFkZHMgbW92YWJsZSBodG1sIGNsYXNzIHRvIHRoZSBjYW52YXMgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gYm9vbFxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zZXRNb3ZhYmxlU3RhdGUgPSBmdW5jdGlvbiAoYm9vbCkge1xuICAgIGlmIChib29sKSB7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LmFkZCgnbW92YWJsZScpO1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc2l6YWJsZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZhYmxlJyk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBBZGRzIHJlc2l6YWJsZSBodG1sIGNsYXNzIHRvIHRoZSBjYW52YXMgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gYm9vbFxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zZXRSZXNpemFibGVTdGF0ZSA9IGZ1bmN0aW9uIChib29sKSB7XG4gICAgaWYgKGJvb2wpIHtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZhYmxlJyk7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LmFkZCgncmVzaXphYmxlJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc2l6YWJsZScpO1xuICAgIH1cbn07XG5cbi8qKlxuICogSGFuZGxlcyBtb3VzZSBtb3ZlIGV2ZW50IHdoZW4gbW91c2UgYnV0dG9uIGlzIG5vdCBwcmVzc2VkXG4gKlxuICogQHBhcmFtIGVsZW1lbnRIb3ZlckluZGV4XG4gKiBAcGFyYW0gc2VsZWN0ZWRJbmRleFxuICogQHBhcmFtIG1vdXNlQ29vcmRpbmF0ZXNcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VNb3ZlV2l0aG91dE1vdXNlRG93biA9IGZ1bmN0aW9uIChlbGVtZW50SG92ZXJJbmRleCwgc2VsZWN0ZWRJbmRleCwgbW91c2VDb29yZGluYXRlcykge1xuICAgIGlmIChlbGVtZW50SG92ZXJJbmRleCA9PSBzZWxlY3RlZEluZGV4KSB7XG4gICAgICAgIC8vIFdoYXQgc3RhdGUgaXMgY3Vyc29yIGluP1xuICAgICAgICB2YXIgcmVzaXplU3RhdGUgPSB0aGlzLmlzUmVzaXplUG9zc2libGUodGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkRWxlbWVudCgpLCBtb3VzZUNvb3JkaW5hdGVzLngsIG1vdXNlQ29vcmRpbmF0ZXMueSk7XG4gICAgICAgIGlmIChyZXNpemVTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRSZXNpemFibGVTdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0TW92YWJsZVN0YXRlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZShmYWxzZSk7XG4gICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUoZmFsc2UpO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgcGFzc2VkIGNvb3JkaW5hdGVzIGFyZSBsb2NhdGVkIG9uIHBvc2l0aW9uIG9mIGRyYWcgaWNvbiBvZiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5pc1Jlc2l6ZVBvc3NpYmxlID0gZnVuY3Rpb24oZWxlbWVudCwgeCwgeSkge1xuICAgIHZhciBkcmFnSWNvblNpemUgPSAxMDtcblxuICAgIHZhciB0ZW1wRWxlbWVudERhdGEgPSB7XG4gICAgICAgIHBvc2l0aW9uOiBuZXcgUG9zaXRpb24oXG4gICAgICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSAtIGRyYWdJY29uU2l6ZSxcbiAgICAgICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKSAtIGRyYWdJY29uU2l6ZVxuICAgICAgICApLFxuICAgICAgICBzaXplOiBuZXcgU2l6ZShkcmFnSWNvblNpemUsIGRyYWdJY29uU2l6ZSlcbiAgICB9O1xuXG4gICAgdmFyIHRlbXBFbGVtZW50ID0gbmV3IFVJRWxlbWVudCh0ZW1wRWxlbWVudERhdGEucG9zaXRpb24sIHRlbXBFbGVtZW50RGF0YS5zaXplKTtcbiAgICByZXR1cm4gdGVtcEVsZW1lbnQuaXNPZmZzZXRJbih4LCB5KTtcbn07IiwiLyoqXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSUVsZW1lbnRWaWV3KGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIFVJIEVsZW1lbnQgVmlldyBlcnJvciEgQ29udGV4dCBpcyBub3QgYSBjb250ZXh0Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xufVxuXG5DYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xuXG5DYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG59OyIsIi8qKlxuICpcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlGYWN0b3J5KGNvbnRleHQpXG57XG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgcmVuZGVyaW5nIGNvbnRleHQgbXVzdCBiZSBpbnN0YW5jZSBvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhIChmYWN0b3J5IGNyZWF0aW5nKScpO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBsYWJlbCBlbGVtZW50LCB3aGljaCBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBvbiB0aGUgY2FudmFzXG4gKlxuICogQHJldHVybnMge1VJTGFiZWxFbGVtZW50fVxuICovXG5DYW52YXNVSUZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUxhYmVsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYWJlbCA9IG5ldyBVSUxhYmVsRWxlbWVudChuZXcgUG9zaXRpb24oMCwgNTApKTtcbiAgICBsYWJlbC5zZXRWaWV3KG5ldyBDYW52YXNVSUxhYmVsVmlldyh0aGlzLmNvbnRleHQpKTtcblxuICAgIHJldHVybiBsYWJlbDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBpbWFnZSBlbGVtZW50LCB3aGljaCBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBvbiB0aGUgY2FudmFzXG4gKlxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcbiAqL1xuQ2FudmFzVUlGYWN0b3J5LnByb3RvdHlwZS5jcmVhdGVJbWFnZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgIHZhciBpbWFnZUVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgaW1hZ2UpO1xuICAgIGltYWdlRWxlbWVudC5zZXRWaWV3KG5ldyBDYW52YXNVSUltYWdlVmlldyh0aGlzLmNvbnRleHQpKTtcblxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XG59OyIsIi8qKlxuICogVmlldyBvZiBhbiBpbWFnZSBlbGVtZW50IG9uIHRoZSBjYW52YXNcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1VJSW1hZ2VWaWV3KGNvbnRleHQpIHtcbiAgICBDYW52YXNVSUVsZW1lbnRWaWV3LmNhbGwodGhpcywgY29udGV4dCk7XG59XG5cbkNhbnZhc1VJSW1hZ2VWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpOyIsIi8qKlxuICpcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlMYWJlbFZpZXcoY29udGV4dCkge1xuICAgIENhbnZhc1VJRWxlbWVudFZpZXcuY2FsbCh0aGlzLCBjb250ZXh0KTtcbn1cblxuQ2FudmFzVUlMYWJlbFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XG4gKi9cbkNhbnZhc1VJTGFiZWxWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIHZhciBmb250U2l6ZSA9IGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpO1xuXG4gICAgLy8gVE9ETzogY29sb3Igc3R5bGVzXG5cblxuICAgIHRoaXMuY29udGV4dC5mb250ID0gZm9udFNpemUgKyBcInB4IEFyaWFsXCI7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgIHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnaGFuZ2luZyc7XG5cbiAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoXG4gICAgICAgIGVsZW1lbnQuZ2V0VGV4dCgpLFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpXG4gICAgKTtcbn07IiwiLyoqXG4gKiBCYXNlIHZpZXcgZm9yIHNlbGVjdGVkIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gY29udGV4dFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1VJU2VsZWN0ZWRWaWV3KGNvbnRleHQpIHtcbiAgICBpZiAoIWNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIFVJIEVsZW1lbnQgVmlldyBlcnJvciEgQ29udGV4dCBkb2VzIG5vdCBoYXZlIHR5cGUgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XG4gICAgICovXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbn1cblxuQ2FudmFzVUlTZWxlY3RlZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XG5cbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgdmFyIGljb25SZXNpemVXaWR0aCA9IDE1O1xuICAgIHRoaXMuY29udGV4dC5mb250ID0gaWNvblJlc2l6ZVdpZHRoICsgXCJweCBBcmlhbFwiO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiMyZTZkYTRcIjtcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2JvdHRvbSc7XG5cbiAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoXG4gICAgICAgICdcXHUyMWYyJyxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgLSBpY29uUmVzaXplV2lkdGgsXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKSxcbiAgICAgICAgaWNvblJlc2l6ZVdpZHRoXG4gICAgKTtcblxuICAgIC8vdGhpcy7ih5hcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcIiMyZTZkYTRcIjtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdChcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSxcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSxcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KClcbiAgICApO1xufTsiLCIvKipcbiAqIFBvc2l0aW9uIGluIDJEIHNwYWNlXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHhcbiAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUG9zaXRpb24oeCwgeSkge1xuICAgIHRoaXMueCA9ICt4IHx8IDA7XG4gICAgdGhpcy55ID0gK3kgfHwgMDtcbn1cblxuLyoqXG4gKlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuUG9zaXRpb24ucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy54O1xufTtcblxuLyoqXG4gKlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuUG9zaXRpb24ucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy55O1xufTtcblxuLyoqXG4gKiBDaGFuZ2VzIHBvc2l0aW9ucyBvZiBhbiBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFYXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFZXG4gKiBAcmV0dXJuIFBvc2l0aW9uXG4gKi9cblBvc2l0aW9uLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24oZGVsdGFYLCBkZWx0YVkpIHtcbiAgICB2YXIgbmV3WFBvcyA9IHRoaXMueCArIGRlbHRhWDtcbiAgICB2YXIgbmV3WVBvcyA9IHRoaXMueSArIGRlbHRhWTtcblxuICAgIHJldHVybiBuZXcgUG9zaXRpb24obmV3WFBvcywgbmV3WVBvcyk7XG59OyIsIi8qKlxuICogVGhpcyBvYmplY3QgaXMgb25seSBwdXJwb3NlZCBmb3IgbG9hZGluZyBleHRlcm5hbCByZXNvdXJjZXNcbiAqIFRoaXMgaXMgc3VwcG9zZWQgdG8gYmUgYW4gb2JqZWN0IGR1cmluZyB0ZXN0aW5nIHB1cnBvc2VzXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlTG9hZGVyKCkge1xuICAgIFxufVxuXG5cbi8qKlxuICogTG9hZHMgaW1hZ2UgdGhlbiBjYWxscyBhIGZ1bmN0aW9uLlxuICogVGhhdCBzaW1wbGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICogQHBhcmFtIGNhbGxiYWNrXG4gKi9cblJlc291cmNlTG9hZGVyLnByb3RvdHlwZS5sb2FkSW1hZ2UgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGltZy5vbmxvYWQgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBpbWcuc3JjID0gc3JjO1xufTtcblxuLyoqXG4gKiBMb2FkcyB0ZXh0IGNvbnRlbnQsIGNhbGxzIGZ1bmN0aW9uXG4gKiBcbiAqIEBwYXJhbSBzcmNcbiAqIEBwYXJhbSBjYWxsYmFja1xuICovXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZFRleHQgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHNyYywgdHJ1ZSk7XG4gICAgeGhyLnNlbmQoKTtcbn07XG5cbi8qKlxuICogTG9hZHMgSlNPTiBjb250ZW50LCBjYWxscyBjYWxsYmFja1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAqIEBwYXJhbSBjYWxsYmFja1xuICovXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZEpzb25PYmplY3QgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgIHRoaXMubG9hZFRleHQoc3JjLCBmdW5jdGlvbiAobG9hZGVkVGV4dCkge1xuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2soSlNPTi5wYXJzZShsb2FkZWRUZXh0KSk7XG4gICAgICAgIH1cbiAgICB9KVxufTtcblxuIiwiLyoqXG4gKlxuICogQHBhcmFtIHtSZXNvdXJjZUxvYWRlcn0gcmVzb3VyY2VMb2FkZXJcbiAqIEBwYXJhbSB7W3trZXk6IHN0cmluZywgc3JjOiBzdHJpbmcsIHR5cGU6IHN0cmluZyB9XX0gcmVzb3VyY2VzIC0gd2hhdCByZXNvdXJjZXMgYXJlIHlvdSBnb2luZyB0byBsb2FkXG4gKiBLZXkgaXMgdXNlZCB0byBzYXZlIGxvYWRlZCBjb250ZW50IHRvIFN0b3JhZ2UsXG4gKiBUeXBlIG11c3QgYmU6ICd0ZXh0JywgJ2ltYWdlJyBvciAnanNvbicsXG4gKiBTcmMgaXMgdGhlIHBhdGggdG8gdGhlIHJlc291cmNlIGZyb20gZG9jdW1lbnQgcm9vdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25Mb2FkIC0gY2FsbGJhY2ssIHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQgb24gbG9hZCBvZiBlYWNoIGVsZW1lbnRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBSZXNvdXJjZVByZXBhcmVyKHJlc291cmNlTG9hZGVyLCByZXNvdXJjZXMsIG9uTG9hZClcbntcbiAgICB0aGlzLmxvYWRlciA9IHJlc291cmNlTG9hZGVyO1xuICAgIHRoaXMucmVzb3VyY2VzVG9Mb2FkID0gcmVzb3VyY2VzO1xuICAgIHRoaXMub25Mb2FkID0gb25Mb2FkO1xufVxuXG4vKipcbiAqIFN0YXJ0cyBsb2FkaW5nIG9mIHJlcXVlc3RlZCByZXNvdXJjZXNcbiAqL1xuUmVzb3VyY2VQcmVwYXJlci5wcm90b3R5cGUuc3RhcnRMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b3RhbExvYWRlZENvdW50ID0gMDtcbiAgICB2YXIgc2hvdWxkTG9hZENvdW50ID0gdGhpcy5yZXNvdXJjZXNUb0xvYWQubGVuZ3RoO1xuICAgIHZhciBvbkxvYWRDYWxsYmFjayA9IHRoaXMub25Mb2FkO1xuICAgIHZhciBsb2FkZXIgPSB0aGlzLmxvYWRlcjtcblxuICAgIC8vIEVhY2ggdGltZSB3ZSBoYXZlIGxvYWRlZCBhIHJlc291cmNlXG4gICAgLy8gd2UgY2hlY2sgZXZlcnl0aGluZyBpcyBsb2FkZWRcbiAgICB2YXIgc2F2ZVJlc291cmNlID0gZnVuY3Rpb24gKGtleSwgb2JqZWN0KSB7XG4gICAgICAgIFN0b3JhZ2UucmVtZW1iZXIoa2V5LCBvYmplY3QpO1xuICAgICAgICB0b3RhbExvYWRlZENvdW50Kys7XG4gICAgICAgIGlmICh0b3RhbExvYWRlZENvdW50ID09IHNob3VsZExvYWRDb3VudCkge1xuICAgICAgICAgICAgb25Mb2FkQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHZhciByZXF1ZXN0TWV0aG9kcyA9IHtcbiAgICAgICAgaW1hZ2U6IGZ1bmN0aW9uIChzcmMsIGtleSkge1xuICAgICAgICAgICAgbG9hZGVyLmxvYWRJbWFnZShzcmMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCB0aGlzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGpzb246IGZ1bmN0aW9uIChzcmMsIGtleSkge1xuICAgICAgICAgICAgbG9hZGVyLmxvYWRKc29uT2JqZWN0KHNyYywgZnVuY3Rpb24gKGpzb25SZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNhdmVSZXNvdXJjZShrZXksIGpzb25SZXNvdXJjZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0ZXh0OiBmdW5jdGlvbiAoc3JjLCBrZXkpIHtcbiAgICAgICAgICAgIGxvYWRlci5sb2FkVGV4dChzcmMsIGZ1bmN0aW9uICh0ZXh0UmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCB0ZXh0UmVzb3VyY2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJlc291cmNlc1RvTG9hZC5mb3JFYWNoKGZ1bmN0aW9uIChyZXNvdXJjZSkge1xuICAgICAgICB2YXIgdHlwZSA9IHJlc291cmNlLnR5cGU7XG4gICAgICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXk7XG4gICAgICAgIHZhciBzcmMgPSByZXNvdXJjZS5zcmM7XG5cbiAgICAgICAgaWYgKCAhIHJlcXVlc3RNZXRob2RzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1RyeWluZyB0byBsb2FkIHVua25vd24gcmVzb3VyY2UgdHlwZSEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGxpbmcgYXBwcm9wcmlhdGUgbG9hZCBtZXRob2RcbiAgICAgICAgcmVxdWVzdE1ldGhvZHNbdHlwZV0oc3JjLCBrZXkpO1xuICAgIH0pO1xufTsiLCIvKipcbiAqIFNpemUgb2YgdGhlIHJlY3RhbmdsZSBzdXJyb3VuZGluZyB0aGUgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCA9ICt3aWR0aCB8fCBTaXplLmRlZmF1bHRXaWR0aDtcbiAgICB0aGlzLmhlaWdodCA9ICtoZWlnaHQgfHwgU2l6ZS5kZWZhdWx0SGVpZ2h0O1xufVxuXG5TaXplLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLndpZHRoO1xufTtcblxuU2l6ZS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xufTtcblxuXG5TaXplLnByb3RvdHlwZS5yZXNpemVCeSA9IGZ1bmN0aW9uIChkZWx0YVdpZHRoLCBkZWx0YUhlaWdodCkge1xuICAgIHRoaXMud2lkdGggKz0gZGVsdGFXaWR0aDtcbiAgICB0aGlzLmhlaWdodCArPSBkZWx0YUhlaWdodDtcblxuICAgIGlmICh0aGlzLndpZHRoIDwgU2l6ZS5taW5XaWR0aCkge1xuICAgICAgICB0aGlzLndpZHRoID0gU2l6ZS5taW5XaWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWlnaHQgPCBTaXplLm1pbkhlaWdodCkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IFNpemUubWluSGVpZ2h0O1xuICAgIH1cbn07XG5cbi8qKlxuICogSW5jcmVhc2VzIHRoZSBzaXplIGJ5IG11bHRpcGxpZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlwbGllclxuICogQHJldHVybnMge1NpemV9XG4gKi9cblNpemUucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24obXVsdGlwbGllcikge1xuICAgIHJldHVybiBuZXcgU2l6ZSh0aGlzLndpZHRoICogbXVsdGlwbGllciwgdGhpcy5oZWlnaHQgKiBtdWx0aXBsaWVyKTtcbn07XG5cbi8qKlxuICogTWluaW1hbCB3aWR0aFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5taW5XaWR0aCA9IDQwO1xuXG4vKipcbiAqIE1pbmltYWwgaGVpZ2h0XG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5TaXplLm1pbkhlaWdodCA9IDQwO1xuXG4vKipcbiAqIGNvbnN0IGZvciBkZWZhdWx0IHdpZHRoXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5TaXplLmRlZmF1bHRXaWR0aCA9IDUwO1xuXG4vKipcbiAqIGNvbnN0IGZvciBkZWZhdWx0IGhlaWdodFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5kZWZhdWx0SGVpZ2h0ID0gNTA7IiwiLyoqXG4gKiBJdCBpcyBwdXJwb3NlZCBmb3IgcmVtZW1iZXJpbmcgc29tZSBkYXRhLlxuICogRnVuY3Rpb25hbCBkZWNsYXJhdGlvbiBpcyB1c2VkIGZvciBpdHMgdmlzaWJpbGl0eSBvbmx5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTdG9yYWdlKCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGlzIGlzIG5vdCBmb3IgY3JlYXRpbmcgb2JqZWN0cyFcIik7XG59XG5cblN0b3JhZ2UuX2NvbnRlbnQgPSB7fTtcblxuLyoqXG4gKiBSZW1lbWJlcnMgYW55IHZhbHVlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICovXG5TdG9yYWdlLnJlbWVtYmVyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICBTdG9yYWdlLl9jb250ZW50W2tleV0gPSB2YWx1ZTtcbn07XG5cbi8qKlxuICogQWxsb3dzIHlvdSB0byBnZXQgd2hhdCB5b3Ugd2FudCBidXQgb25seSBpZiB5b3UgcmVtZW1iZXIgdGhpcyBlYXJsaWVyXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gKi9cblN0b3JhZ2UuZ2V0ID0gZnVuY3Rpb24gKGtleSwgY29udGVudCkge1xuICAgIHZhciBzb21ldGhpbmdZb3VXYW50ID0gU3RvcmFnZS5fY29udGVudFtrZXldO1xuXG4gICAgaWYgKHR5cGVvZiBzb21ldGhpbmdZb3VXYW50ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIldlIGhhdmUgbm90aGluZyB0byByZXR1cm4gdXNpbmcga2V5OiBcIiArIGtleSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvbWV0aGluZ1lvdVdhbnQ7XG59O1xuIiwiLyoqXG4gKiBDb2xsZWN0aW9uIGZvciBVSSBlbGVtZW50cy5cbiAqXG4gKiBJdCBpcyBwdXJwb3NlZCBmb3Iga2VlcGluZyB1aSBlbGVtZW50cyB3aXRoIGNvcnJlY3Qgb3JkZXJcbiAqIEFsc28gc3VwcG9ydHMgc2VsZWN0aW9uIHJlbWVtYmVyaW5nXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJQ29sbGVjdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xlbmd0aCcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVsZW1lbnRzLmxlbmd0aFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuLyoqXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgdG9wIGxheWVyIG9mIHRoZSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIHtVSUVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgaWYgKCAhIChlbGVtZW50IGluc3RhbmNlb2YgVUlFbGVtZW50KSApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRWxlbWVudCBpbiBVSUNvbGxlY3Rpb24gbXVzdCBoYXZlIFVJRWxlbWVudCB0eXBlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFycmF5IHdpdGggYWxsIGVsZW1lbnRzIGluIGl0XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGVsZW1lbnQgd2l0aCBwYXNzZWQgaW5kZXggZnJvbSB0aGUgY29sbGVjdGlvbiBhbmQgcmV0dXJucyBpdFxuICpcbiAqIEByZXR1cm4ge1VJRWxlbWVudH1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgIHRoaXMuZGVzZWxlY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKVswXTtcbn07XG5cbi8qKlxuICogU3dhcHMgcGxhY2VzIG9mIHR3byBlbGVtZW50cyBpbiB0aGUgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBpbmRleDFcbiAqIEBwYXJhbSBpbmRleDJcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24gKGluZGV4MSwgaW5kZXgyKSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleDEpIHx8ICF0aGlzLmhhcyhpbmRleDIpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuXG4gICAgdmFyIHRlbXAgPSB0aGlzLmVsZW1lbnRzW2luZGV4MV07XG4gICAgdGhpcy5lbGVtZW50c1tpbmRleDFdICA9IHRoaXMuZWxlbWVudHNbaW5kZXgyXTtcbiAgICB0aGlzLmVsZW1lbnRzW2luZGV4Ml0gPSB0ZW1wO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBpbmRleCBleGlzdHMgaW4gY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIGluZGV4ID49IDAgfHwgaW5kZXggPCB0aGlzLmxlbmd0aDtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBpbmRleFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2luZGV4XTtcbn07XG5cbi8qKlxuICogRm9yZ2V0cyB3aGljaCBlbGVtZW50IHdhcyBzZWxlY3RlZFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmRlc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIGluZGV4XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG59O1xuXG4vKipcbiAqIFNlbGVjdHMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgY29sbGVjdGlvblxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdExhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5sZW5ndGggPyB0aGlzLmxlbmd0aCAtIDEgOiAtMTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBzZWxlY3RlZCBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldFNlbGVjdGVkRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ICE9IC0xKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW3RoaXMuc2VsZWN0ZWRJbmRleF1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIFJldHVybnMgaW5kZXggb2Ygc2VsZWN0ZWQgZWxlbWVudFxuICogSWYgbm9uZSwgcmV0dXJucyAtMVxuICpcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4O1xufTtcblxuLyoqXG4gKiBGZXRjaGVzIGVsZW1lbnQgYnkgcGFzc2VkIG9mZnNldFxuICpcbiAqIEBwYXJhbSBvZmZzZXRYXG4gKiBAcGFyYW0gb2Zmc2V0WVxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmZldGNoRWxlbWVudEJ5T2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICB2YXIgbWF0Y2hlZEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKGVsLmlzT2Zmc2V0SW4ob2Zmc2V0WCwgb2Zmc2V0WSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWRFbGVtZW50ID0gZWw7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2hlZEVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIEZldGNoZXMgaW5kZXggYnkgcGFzc2VkIG9mZnNldFxuICpcbiAqIEBwYXJhbSBvZmZzZXRYXG4gKiBAcGFyYW0gb2Zmc2V0WVxuICogQHJldHVybnMgeyp9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZmV0Y2hJbmRleEJ5T2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICB2YXIgbWF0Y2hlZEluZGV4ID0gbnVsbDtcbiAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xuICAgICAgICBpZiAoZWwuaXNPZmZzZXRJbihvZmZzZXRYLCBvZmZzZXRZKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEluZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2hlZEluZGV4O1xufTsiLCIvKipcbiAqIFNvbWUgZWxlbWVudCBvZiB1c2VyIGludGVyZmFjZVxuICpcbiAqIEBwYXJhbSB7UG9zaXRpb258dW5kZWZpbmVkfSBwb3NpdGlvblxuICogQHBhcmFtIHtTaXplfHVuZGVmaW5lZH0gc2l6ZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJRWxlbWVudChwb3NpdGlvbiwgc2l6ZSlcbntcbiAgICBpZiAoICEgKHBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pICkge1xuICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICBpZiAoICEgKHNpemUgaW5zdGFuY2VvZiBQb3NpdGlvbikpIHtcbiAgICAgICAgc2l6ZSA9IG5ldyBTaXplKCk7XG4gICAgfVxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgdmlldyBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7VUlFbGVtZW50Vmlld30gdmlld1xuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLnNldFZpZXcgPSBmdW5jdGlvbih2aWV3KSB7XG4gICAgaWYgKCAhICh2aWV3IGluc3RhbmNlb2YgVUlFbGVtZW50VmlldykgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZpZXcgbXVzdCBoYXZlIFVJRWxlbWVudFZpZXcgdHlwZSEnKTtcbiAgICB9XG4gICAgdGhpcy52aWV3ID0gdmlldztcbn07XG5cbi8qKlxuICogUmV0dXJucyBjdXJyZW50IHZpZXcgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50Vmlld3x1bmRlZmluZWR9XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0VmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3O1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIHRoZSBlbGVtZW50IHVzaW5nIGl0cyB2aWV3XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy52aWV3KSB7XG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVmlldyBpcyBub3Qgc2V0IScpO1xuICAgIH1cblxuICAgIHRoaXMudmlldy5yZW5kZXIodGhpcyk7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufSBwb3NpdGlvblxuICogQHJldHVybnMge1VJRWxlbWVudH1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgIGlmICghcG9zaXRpb24gaW5zdGFuY2VvZiBQb3NpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCduZXcgcG9zaXRpb24gbXVzdCBoYXZlIFBvc2l0aW9uIHR5cGUhJylcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7UG9zaXRpb259XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm4gdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7U2l6ZX1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHBhc3NlZCBvZmZzZXQgbWF0Y2hlcyBlbGVtZW50IHBvc2l0aW9uXG4gKlxuICogQHBhcmFtIGNsaWVudFhcbiAqIEBwYXJhbSBjbGllbnRZXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5pc09mZnNldEluID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpXG57XG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICB2YXIgY3VycmVudFNpemUgPSB0aGlzLmdldFNpemUoKTtcblxuICAgIGlmIChjdXJyZW50UG9zaXRpb24uZ2V0WCgpID4gY2xpZW50WCB8fCBjdXJyZW50UG9zaXRpb24uZ2V0WCgpICsgY3VycmVudFNpemUuZ2V0V2lkdGgoKSA8IGNsaWVudFgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoY3VycmVudFBvc2l0aW9uLmdldFkoKSA+IGNsaWVudFkgfHwgY3VycmVudFBvc2l0aW9uLmdldFkoKSArIGN1cnJlbnRTaXplLmdldEhlaWdodCgpIDwgY2xpZW50WSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgaG93IGZhciBpcyBwYXNzZWQgb2Zmc2V0IGZyb20gcG9pbnQgKDAsIDApXG4gKlxuICogQHBhcmFtIGNsaWVudFhcbiAqIEBwYXJhbSBjbGllbnRZXG4gKiBAcmV0dXJucyB7e3RvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldENsaWNrT2Zmc2V0ID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiBjbGllbnRYIC0gcG9zaXRpb24uZ2V0WCgpLFxuICAgICAgICBsZWZ0OiBjbGllbnRZIC0gcG9zaXRpb24uZ2V0WSgpXG4gICAgfVxufTsiLCIvKipcbiAqIE9iamVjdCwgd2hpY2ggZGVmaW5lcyBob3cgdG8gcmVuZGVyIHNwZWNpZmljIFVJRWxlbWVudFxuICogVGhpcyBvYmplY3Qga25vd3MgZXZlcnl0aGluZyBhYm91dCBhbiBvYmplY3QgaXQgbmVlZHMgdG8gZHJhdy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUlFbGVtZW50VmlldygpXG57XG5cbn1cbi8qKlxuICpcbiAqIEBwYXJhbSBVSUVsZW1lbnRcbiAqL1xuVUlFbGVtZW50Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKFVJRWxlbWVudCkge1xuICAgIHRocm93IFR5cGVFcnJvcignWW91IHNob3VsZCBub3QgYmUgdXNpbmcgYW4gYWJzdHJhY3Qgb2JqZWN0IGZvciByZW5kZXJpbmchJyk7XG59O1xuIiwiLyoqXG4gKlxuICogQHBhcmFtIHtQb3NpdGlvbnxudWxsfSBwb3NpdGlvblxuICogQHBhcmFtIHtTaXplfG51bGx9IHNpemVcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUlJbWFnZUVsZW1lbnQocG9zaXRpb24sIHNpemUsIGltYWdlKVxue1xuICAgIFVJRWxlbWVudC5jYWxsKHRoaXMsIHBvc2l0aW9uLCBzaXplKTtcblxuICAgIGlmICggISAoaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkltYWdlIG11c3QgaGF2ZSBJbWFnZSB0eXBlIVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG59XG5cblVJSW1hZ2VFbGVtZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50LnByb3RvdHlwZSk7XG5cbi8qKlxuICpcbiAqIEByZXR1cm5zIHtJbWFnZX1cbiAqL1xuVUlJbWFnZUVsZW1lbnQucHJvdG90eXBlLmdldEltYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xufTsiLCIvKipcbiAqIENsYXNzIGZvciBjcmVhdGluZ1xuICpcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cbiAqIEBwYXJhbSB7U2l6ZXxudWxsfSBzaXplXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHBhcmFtIHsqfSBzdHlsZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJTGFiZWxFbGVtZW50KHBvc2l0aW9uLCBzaXplLCB0ZXh0LCBzdHlsZSkge1xuICAgIFVJRWxlbWVudC5hcHBseSh0aGlzLCBbcG9zaXRpb24sIHNpemVdKTtcblxuICAgIGlmICghdGV4dCkge1xuICAgICAgICB0ZXh0ID0gVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQ7XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbiAgICB0aGlzLnN0eWxlID0gc3R5bGU7XG59XG5cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50LnByb3RvdHlwZSk7XG5cbi8qKlxuICogR2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0O1xufTtcblxuLyoqXG4gKiBTZXRzIGEgdGV4dCBvZiB0aGUgY3VycmVudCBVSUxhYmVsRWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKi9cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xufTtcblxuVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQgPSBcItCS0LLQtdC00LjRgtC1INGC0LXQutGB0YIuLi5cIjsiLCIvKipcbiAqIFRPRE86IHJlZmFjdG9yIHRoaXMhMTExMTExb25lXG4gKlxuICogQWN0dWFsbHkgSSB0b29rIHRoaXMgZm9ybSBhbiBvbGQgcHJvamVjdCxcbiAqIHNvIGRvIG5vdCB3YXRjaCB0aGUgY29kZSBoZXJlIHRvbyBtdWNoXG4gKiBcbiAqIEBwYXJhbSBjYW52YXNcbiAqIEBwYXJhbSBtb2RlbFxuICogQHBhcmFtIGluaXRpYWxUZXh0dXJlXG4gKiBAcGFyYW0gdmVydGV4U2hhZGVyXG4gKiBAcGFyYW0gZnJhZ21lbnRTaGFkZXJcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNb2RlbFZpZXcoY2FudmFzLCBtb2RlbCwgaW5pdGlhbFRleHR1cmUsIHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XG4gICAgaWYgKCF0aGlzLmdsKSB7XG4gICAgICAgIGFsZXJ0KCdzb21lIGVycm9yJyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnRleHR1cmUgPSBpbml0aWFsVGV4dHVyZTtcbiAgICB0aGlzLnZlcnRleFNoYWRlclNvdXJjZSA9IHZlcnRleFNoYWRlcjtcbiAgICB0aGlzLmZyYWdtZW50U2hhZGVyU291cmNlID0gZnJhZ21lbnRTaGFkZXI7XG4gICAgdGhpcy5zZXRUZXh0dXJlKGluaXRpYWxUZXh0dXJlKTtcbn1cblxuLyoqXG4gKiBTZXRzIGEgbmV3IHRleHR1cmVcbiAqIFxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgLy8gVE9ETyBpbXBsZW1lbnQgdGV4dHVyZSB1cGRhdGVcbiAgICB0aGlzLnRleHR1cmUgPSBpbWFnZTtcblxuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG5cbiAgICAvLyDQodC+0LfQtNCw0LXQvCDRgtC10LrRgdGC0YPRgNGDXG4gICAgdGhpcy5tb2RlbFRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgLy8g0J3QsNC30L3QsNGH0LDQtdC8INC10LVcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLm1vZGVsVGV4dHVyZSk7XG4gICAgLy8g0JPQvtCy0L7RgNC40LwsINC60LDQuiDQvNGLINC4INGH0YLQviDRhdC+0YLQuNC8INGA0LjRgdC+0LLQsNGC0YxcbiAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcbiAgICAvLyBpIGZvciBpbnRlZ2VyICwgcywgdCAtIHUsIHZcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAvLyDQmtCw0Log0YLQvtGH0LrQuCDQvdCw0LfQvdCw0YfQsNGO0YLRgdGPXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgLy8g0KHQsNC80LAg0YLQtdC60YHRgtGD0YDQsFxuICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgIGdsLlRFWFRVUkVfMkQsIC8vINCi0LjQvyDRgtC10LrRgdGC0YPRgNGLXG4gICAgICAgIDAsIC8vINCj0YDQvtCy0LXQvdGMINC00LXRgtCw0LvQuNC30LDRhtC40LhcbiAgICAgICAgZ2wuUkdCQSwgLy8g0KTQvtGA0LzQsNGCXG4gICAgICAgIGdsLlJHQkEsXG4gICAgICAgIGdsLlVOU0lHTkVEX0JZVEUsIC8vINCi0LjQvyDQtNCw0L3QvdGL0YVcbiAgICAgICAgdGhpcy50ZXh0dXJlIC8vINCh0LDQvNCwINGC0LXQutGB0YLRg9GA0LBcbiAgICApO1xuICAgIC8vINCg0LDQt9C90LDQt9C90LDRh9Cw0LXQvFxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xufTtcblxuTW9kZWxWaWV3LnByb3RvdHlwZS5zdGFydFJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuICAgIFxuICAgIC8vINCS0LrQu9GO0YfQsNC10Lwg0L/RgNC+0LLQtdGA0LrRgyDQs9C70YPQsdC40L3Ri1xuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgICBcbiAgICAvLyDQl9Cw0LTQsNC10Lwg0YbQstC10YIg0L7Rh9C40YHRgtC60LhcbiAgICBnbC5jbGVhckNvbG9yKDAuOCwgMC45LCAwLjkgLDEuMCk7XG4gICAgLy8g0J7Rh9C40YHRgtC60LAgLSDRh9GC0L4g0L7Rh9C40YnQsNC10LwgLSDQsdGD0YTQtdGAINGG0LLQtdGC0LAsINC40LvQuCDQttC1INCx0YPRhNC10YAg0LPQu9GD0LHQuNC90YtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbiAgICAvLyDQodC+0LfQtNCw0LXQvCDRiNC10LnQtNC10YDRi1xuICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgdmFyIGZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG5cbiAgICAvLyDQo9C60LDQt9GL0LLQsNC10Lwg0LjRgdGF0L7QtNC90YvQuSDQutC+0LQg0YjQtdC50LTQtdGA0L7QslxuICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0ZXhTaGFkZXIsIHRoaXMudmVydGV4U2hhZGVyU291cmNlKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnRTaGFkZXIsIHRoaXMuZnJhZ21lbnRTaGFkZXJTb3VyY2UpO1xuXG4gICAgLy8g0JrQvtC80L/QuNC70Y/RhtC40Y8g0YjQtdC50LTQtdGA0L7QslxuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcblxuICAgIC8vINCf0YDQvtCy0LXRgNC60LAg0YHRgtCw0YLRg9GB0LAg0LrQvtC80L/QuNC70Y/RhtC40LhcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjb21waWxpbmcgdmVydGV4IHNoYWRlciEnLCBnbC5nZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcikpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2wuY29tcGlsZVNoYWRlcihmcmFnbWVudFNoYWRlcik7XG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjb21waWxpbmcgdmVydGV4IHNoYWRlciEnLCBnbC5nZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50U2hhZGVyKSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyDQodC+0L7QsdGJ0LDQtdC8IFdlYkdMLCDRh9GC0L4g0LzRiyDRhdC+0YLQuCDQuNGB0L/QvtC70YzQt9C+0LLQsNGC0Ywg0Y3RgtC4INGI0LXQudC00LXRgNGLXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cbiAgICAvLyBXZWJHTCDQt9C90LDQtdGCLCDQutCw0LrQvtC5INGI0LXQudC00LXRgCDQutCw0LrQvtC5INGC0LjQvyDQuNC80LXQtdGCXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcbiAgICAvLyDQm9C40L3QutGD0LXQvFxuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xuXG4gICAgLy8g0J7RiNC40LHQutC4INC70LjQvdC60L7QstC60LhcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0xpbmtpbmcgZXJyb3IhJywgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8g0KLQvtC70YzQutC+INC00LvRjyDRgtC10YHRgtC40YDQvtCy0LDQvdC40Y8gLSDQu9C+0LLQuNGCINC00L7Qvy4g0L7RiNC40LHQutC4XG4gICAgZ2wudmFsaWRhdGVQcm9ncmFtKHByb2dyYW0pO1xuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5WQUxJREFURV9TVEFUVVMpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1ZhbGlkYXRpbmcgZXJyb3IhJywgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG1vZGVsID0gdGhpcy5tb2RlbDtcblxuICAgIC8vINCh0L7Qt9C00LDQtdC8INCx0YPRhNC10YDRi1xuICAgIHZhciBtb2RlbFZlcnRleGVzID0gbW9kZWwubWVzaGVzWzBdLnZlcnRpY2VzO1xuICAgIHZhciBtb2RlbEluZGV4ZXMgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBtb2RlbC5tZXNoZXNbMF0uZmFjZXMpO1xuICAgIHZhciBtb2RlbFRleENvb3JkcyA9IG1vZGVsLm1lc2hlc1swXS50ZXh0dXJlY29vcmRzWzBdO1xuXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LHRg9GE0LXRgCAtINGH0LXRgNC10Lcg0L3QtdCz0L4g0L/QtdGA0LXQtNCw0LXRgtGB0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LIgR1BVXG4gICAgdmFyIG1vZGVsVmVydGV4QnVmZmVyT2JqZWN0ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgLy8g0J3QsNC30L3QsNGH0LDQtdC8INC10LPQviDQsNC60YLQuNCy0L3Ri9C8XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG1vZGVsVmVydGV4QnVmZmVyT2JqZWN0KTtcbiAgICAvLyBTVEFUSUNfRFJBVyAtINC60L7Qv9C40YDRg9C10Lwg0LXQtNC40L3QvtC20LTRiyDQuNC3IENQVSDQsiBHUFVcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheShtb2RlbFZlcnRleGVzKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy8g0J7RgtC00LXQu9GM0L3Ri9C5INCx0YPRhNC10YAg0LTQu9GPINGC0LXQutGB0YLRg9GA0L3Ri9GFINC60L7QvtGA0LTQuNC90LDRglxuICAgIHZhciBtb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBtb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkobW9kZWxUZXhDb29yZHMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICAvLyDQodC+0LfQtNCw0LXQvCDQuNC90LTQtdC60YHQvdGL0Lkg0LHRg9GE0LXRgCDQtNC70Y8g0YPQutCw0LfQsNC90LjRjyDQv9C+0YDRj9C00LrQsCDQstC10YDRiNC40L1cbiAgICB2YXIgbWFza0luZGV4QnVmZmVyT2JqZWN0ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgLy8g0J3QsNC30L3QsNGH0LDQtdC8INC10LPQviDQsNC60YLQuNCy0L3Ri9C8XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbWFza0luZGV4QnVmZmVyT2JqZWN0KTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkobW9kZWxJbmRleGVzKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy8g0KPQstC10LTQvtC80LvRj9C10Lwg0YjQtdC50LTQtdGAINC+INGC0L7QvCwg0LrQsNC6INCx0YDQsNGC0Ywg0LTQsNC90L3Ri9C1INC40Lcg0LHRg9GE0LXRgNCwINCyINC60LDRh9C10YHRgtCy0LUg0LLRhdC+0LTQvdGL0YUg0L/QsNGA0LDQvNC10YLRgNC+0LJcbiAgICB2YXIgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0UG9zaXRpb24nKTtcblxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBtb2RlbFZlcnRleEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgLy8g0L3QsNGIINCw0YLRgNC40LHRg9GCXG4gICAgICAgIDMsIC8vINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINCw0YLRgNC40LHRg9GCXG4gICAgICAgIGdsLkZMT0FULCAvLyDQotC40L8g0LrQsNC20LTQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQsdGD0YTQtdGA0LBcbiAgICAgICAgZ2wuRkFMU0UsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XG4gICAgICAgIDMgKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIC8vINCg0LDQt9C80LXRgCDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdGLICjQsdCw0LnRgilcbiAgICAgICAgMCAvLyDQntGC0YHRgtGD0L8gKNCyINCx0LDQudGC0LDRhSkg0L7RgiDQvdCw0YfQsNC70LAg0LTQsNC90L3Ri9GFLCDQv9GA0LjQvdCw0LTQu9C10LbQsNGJ0LjRhSDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdC1XG4gICAgKTtcbiAgICAvLyDQktC60LvRjtGH0LDQtdC8INCw0YLRgNC40LHRg9GCXG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkocG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbik7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QpO1xuICAgIHZhciB0ZXhDb29yZEF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnRUZXhDb29yZCcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgIHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24sIC8vINC90LDRiCDQsNGC0YDQuNCx0YPRglxuICAgICAgICAyLCAvLyDQmtC+0LvQuNGH0LXRgdGC0LLQviDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDQsNGC0YDQuNCx0YPRglxuICAgICAgICBnbC5GTE9BVCwgLy8g0KLQuNC/INC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LHRg9GE0LXRgNCwXG4gICAgICAgIGdsLkZBTFNFLCAvLyDQndC+0YDQvNCw0LvQuNC30L7QstCw0L3QvdGL0Lkg0LLQuNC0P1xuICAgICAgICAyICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCAvLyDQoNCw0LfQvNC10YAg0L7QtNC90L7QuSDQstC10YDRiNC40L3RiyAo0LHQsNC50YIpXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxuICAgICk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbik7XG5cblxuICAgIC8vINCc0LDRgtGA0LjRhtGLIC0g0LzQtdGB0YLQvtC/0L7Qu9C+0LbQtdC90LjQtSDQsiDRiNC10LnQtNC10YDQsNGFXG4gICAgdmFyIG1hdFdvcmxkVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICdtV29ybGQnKTtcbiAgICB2YXIgbWF0Vmlld1VuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAnbVZpZXcnKTtcbiAgICB2YXIgbWF0UHJvamVjdGlvblVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihwcm9ncmFtLCAnbVByb2plY3Rpb24nKTtcblxuICAgIC8vINCh0LDQvNC4INC80LDRgtGA0LjRhtGLXG4gICAgdmFyIHdvcmxkTWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgdmFyIHZpZXdNYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICB2YXIgcHJvamVjdGlvbk1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIG1hdDQuaWRlbnRpdHkod29ybGRNYXRyaXgpO1xuICAgIC8vINCf0L7Qt9C40YbQuNGPINC90LDQsdC70Y7QtNCw0YLQtdC70Y8sINC60YPQtNCwINC+0L0g0YHQvNC+0YLRgNC40YIsINC/0LvRjtGBINCy0LXQutGC0L7RgCDQstC10YDRhdCwXG4gICAgbWF0NC5sb29rQXQodmlld01hdHJpeCwgWzAsIDAsIC01XSwgWzAsIDAsIDBdLCBbMCwgMSwgMF0pO1xuICAgIC8vINCf0L7Qu9C1INC+0LHQt9C+0YDQsCAo0LIg0YDQsNC00LjQsNC90LDRhSksIHZpZXdwb3J0LCBjbG9zZXN0IHBsYW5lLCBmYXIgcGxhbmVcbiAgICBtYXQ0LnBlcnNwZWN0aXZlKHByb2plY3Rpb25NYXRyaXgsIGdsTWF0cml4LnRvUmFkaWFuKDMwKSwgdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLmNhbnZhcy5oZWlnaHQsIDAuMDAxLCAxMC4wKTtcblxuICAgIC8vINCa0LDQutGD0Y4g0YjQtdC50LTQtdGA0L3Rg9GOINC/0YDQvtCz0YDQsNC80LzRgyDQuNGB0L/QvtC70YzQt9GD0LXQvFxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICAvLyDQn9C10YDQtdC00LDQtdC8INCyINGI0LXQudC00LXRgC4gVFJVRSAtINGH0YLQvtCx0Ysg0YLRgNCw0L3RgdC/0L7QvdC40YDQvtCy0LDRgtGMXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihtYXRXb3JsZFVuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHdvcmxkTWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KG1hdFZpZXdVbmlmb3JtTG9jYXRpb24sIGdsLkZBTFNFLCB2aWV3TWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KG1hdFByb2plY3Rpb25Vbmlmb3JtTG9jYXRpb24sIGdsLkZBTFNFLCBwcm9qZWN0aW9uTWF0cml4KTtcblxuICAgIC8vINCj0LPQvtC7INCy0YDQsNGJ0LXQvdC40Y9cbiAgICB2YXIgYW5nbGVYID0gMDtcbiAgICB2YXIgYW5nbGVZID0gMDtcbiAgICB2YXIgaXNNb3VzZVByZXNzZWQgPSBmYWxzZTtcbiAgICB2YXIgaW5pdGlhbEV2ZW50ID0gbnVsbDtcbiAgICAvLyDQrdGC0L4g0YPQttC1INC+0YLRgdC10LHRj9GC0LjQvdCwINC/0L7RiNC70LBcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlzTW91c2VQcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgaW5pdGlhbEV2ZW50ID0gZTtcbiAgICB9KTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaXNNb3VzZVByZXNzZWQgPSBmYWxzZTtcbiAgICAgICAgaW5pdGlhbEV2ZW50ID0gbnVsbDtcbiAgICB9KTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoaXNNb3VzZVByZXNzZWQpIHtcbiAgICAgICAgICAgIHZhciBkaWZmWCA9IGluaXRpYWxFdmVudC5jbGllbnRYIC0gZS5jbGllbnRYO1xuICAgICAgICAgICAgdmFyIGRpZmZZID0gaW5pdGlhbEV2ZW50LmNsaWVudFkgLSBlLmNsaWVudFk7XG4gICAgICAgICAgICBpbml0aWFsRXZlbnQgPSBlO1xuICAgICAgICAgICAgYW5nbGVZICs9IC0gKGRpZmZYIC8gMjAwKTtcbiAgICAgICAgICAgIGFuZ2xlWCArPSAgKGRpZmZZIC8gMjAwKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8g0KHQsdC10YDQtdCz0LDQtdC8INCy0YvRh9C40YHQu9C40YLQtdC70YzQvdGL0LUg0LzQvtGJ0L3QvtGB0YLQuFxuICAgIC8vINCT0LvQsNCy0L3Ri9C5INGG0LjQutGAINGA0LXQvdC00LXRgNCwXG4gICAgdmFyIGlkZW50aXR5TWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgbWF0NC5pZGVudGl0eShpZGVudGl0eU1hdHJpeCk7XG4gICAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vINCa0LDQutGD0Y4g0LzQsNGC0YDQuNGG0YMg0LLQvtC60YDRg9CzINC60LDQutC+0Lkg0LLRgNCw0YnQsNC10LxcbiAgICAgICAgbWF0NC5yb3RhdGUod29ybGRNYXRyaXgsIGlkZW50aXR5TWF0cml4LCBhbmdsZVgsIFsxLCAwLCAwXSk7XG4gICAgICAgIG1hdDQucm90YXRlKHdvcmxkTWF0cml4LCB3b3JsZE1hdHJpeCwgYW5nbGVZLCBbMCwgMSwgMF0pO1xuICAgICAgICAvLyDQntCx0L3QvtCy0LvRj9C10Lwg0L/QtdGA0LXQvNC10L3QvdGD0Y4g0LIg0YjQtdC50LTQtdGA0LVcbiAgICAgICAgZ2wudW5pZm9ybU1hdHJpeDRmdihtYXRXb3JsZFVuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHdvcmxkTWF0cml4KTtcblxuICAgICAgICAvLyDQndCw0LfQvdCw0YfQtdC90LjQtSDRgtC10LrRgdGC0YPRgNGLXG4gICAgICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHNlbGYubW9kZWxUZXh0dXJlKTtcbiAgICAgICAgLy8g0KHQu9C+0YJcbiAgICAgICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG5cbiAgICAgICAgZ2wuY2xlYXJDb2xvcigwLjgsIDAuOSwgMC45ICwxLjApO1xuICAgICAgICBnbC5jbGVhcihnbC5ERVBUSF9CVUZGRVJfQklUIHwgZ2wuQ09MT1JfQlVGRkVSX0JJVCApO1xuXG4gICAgICAgIGdsLmRyYXdFbGVtZW50cyhcbiAgICAgICAgICAgIGdsLlRSSUFOR0xFUywgLy8g0JrQsNC6INGA0LjRgdGD0LXQvCxcbiAgICAgICAgICAgIG1vZGVsSW5kZXhlcy5sZW5ndGgsXG4gICAgICAgICAgICBnbC5VTlNJR05FRF9TSE9SVCwgLy8g0KLQuNC/XG4gICAgICAgICAgICAwIC8vINCh0LrQvtC70YzQutC+INC/0YDQvtC/0YPRgdC60LDQvCDQstC10YDRiNC40L1cbiAgICAgICAgKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuICAgIH07XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xufTsiLCIvKipcbiAqIEF3YXJlIG9mIHRoZSBkb2N1bWVudCBjb250ZW50XG4gKiBIYW5kbGVzIEhUTUwgbWFuaXB1bGF0aW9uc1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBQcm9wZXJ0aWVzUGFuZWwoc3VyZmFjZSlcbntcbiAgICB0aGlzLl90ZXh0UGFuZWwgPSB7XG4gICAgICAgIHBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dE9wdGlvbnMnKSxcbiAgICAgICAgc2VsZWN0Rm9udDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbnRTZWxlY3QnKSxcbiAgICAgICAgc2VsZWN0Q29sb3I6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvckZvbnRTZWxlY3QnKSxcbiAgICAgICAgdGV4dEFyZWE6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RlZFRleHRDb250ZW50JyksXG4gICAgICAgIHRleHRVcEJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRVcEJ0bicpLFxuICAgICAgICB0ZXh0RG93bkJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHREb3duQnRuJylcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuX2ltYWdlUGFuZWwgPSB7XG4gICAgICAgIHBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2VPcHRpb25zJylcbiAgICB9O1xuICAgIHRoaXMuX2VtcHR5UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm9TZWxlY3RlZE9wdGlvbnMnKTtcbiAgICBcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuX3N1cmZhY2UgPSBzdXJmYWNlO1xufVxuXG4vKipcbiAqIEJpbmRzIGhhbmRsZXJzIHRvIHRoZSBldmVudHNcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5iaW5kSGFuZGxlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX3N1cmZhY2UuYWRkU2VsZWN0RXZlbnRIYW5kbGVyKGZ1bmN0aW9uICh1aUVsZW1lbnQpIHtcbiAgICAgICAgc2VsZi5zZXRTZWxlY3RlZCh1aUVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHRoaXMuX3N1cmZhY2UuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnNldFNlbGVjdGVkKG51bGwpO1xuICAgIH0pO1xuXG4gICAgLy8gQmluZGluZyB0ZXh0IGNoYW5nZSBldmVudCB0aHJvdWdoIHRleHQgYXJlYSBlbGVtZW50XG4gICAgdGhpcy5fdGV4dFBhbmVsLnRleHRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBldmVudCBoYXBwZW5lZFxuICAgICAgICAvLyB0aGVuIHdlIGhhdmUgYSBsYWJlbCBhcyBzZWxlY3RlZCBlbGVtZW50XG4gICAgICAgIHNlbGYuX3NlbGVjdGVkRWxlbWVudC5zZXRUZXh0KHRoaXMudmFsdWUpO1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBTZXRzIHNlbGVjdGVkIGVsZW1lbnQuXG4gKiBTaG93IHByb3BlcnRpZXMgd2luZG93IGRlcGVuZGluZyBvbiB3aGF0IGlzIHRoZSB0eXBlIG9mIGFuIGVsZW1lbnQgXG4gKiBcbiAqIEBwYXJhbSB7VUlFbGVtZW50fG51bGx9IHVpRWxlbWVudFxuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLnNldFNlbGVjdGVkID0gZnVuY3Rpb24gKHVpRWxlbWVudCkge1xuICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudCA9IHVpRWxlbWVudDtcbiAgICBcbiAgICBpZiAodWlFbGVtZW50IGluc3RhbmNlb2YgVUlMYWJlbEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zaG93VGV4dFByb3BlcnRpZXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBpZiAodWlFbGVtZW50IGluc3RhbmNlb2YgVUlJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zaG93SW1hZ2VQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBcbiAgICB0aGlzLnNob3dOb3RoaW5nU2VsZWN0ZWRQYW5lbCgpO1xufTtcblxuLyoqXG4gKiBIaWRlcyBhbGwgb2YgdGhlIHBhbmVsc1xuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLmhpZGVBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIHRoaXMuX2ltYWdlUGFuZWwucGFuZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy5fZW1wdHlQYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn07XG5cbi8qKlxuICogSGlkZXMgYWxsIGV4Y2VwdCB0ZXh0IHByb3BlcnRpZXMgcGFuZWxcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zaG93VGV4dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaWRlQWxsKCk7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnRleHRBcmVhLmlubmVySFRNTCA9IHRoaXMuX3NlbGVjdGVkRWxlbWVudC5nZXRUZXh0KCk7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufTtcblxuLyoqXG4gKiBIaWRlcyBldmVyeXRoaW5nIGV4Y2VwdCBpbWFnZXMgcGFuZWxcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zaG93SW1hZ2VQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGlkZUFsbCgpO1xuICAgIHRoaXMuX2ltYWdlUGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59O1xuXG4vKipcbiAqIEhpZGVzIGFsbCBleGNlcHQgXCJub3RoaW5nIHNlbGVjdGVkXCIgcGFuZWxcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zaG93Tm90aGluZ1NlbGVjdGVkUGFuZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaWRlQWxsKCk7XG4gICAgdGhpcy5fZW1wdHlQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICB2YXIgc3VyZmFjZSA9IG5ldyBDYW52YXNTdXJmYWNlKGNhbnZhcyk7XG5cbiAgICB2YXIgYnV0dG9uQWRkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5BZGRUZXh0Jyk7XG5cbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGNsaWNrXG4gICAgYnV0dG9uQWRkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3VyZmFjZS5wdXNoTGFiZWwoKTtcbiAgICB9KTtcblxuICAgIHN1cmZhY2UucmVuZGVyKCk7XG5cbiAgICAvLyBDcmVhdGUgcHJvcGVydGllcyBwYW5lbFxuICAgIC8vIGFuZCBhdHRhY2hpbmcgaXQgdG8gY2FudmFzIGV2ZW50c1xuICAgIHZhciBwcm9wZXJ0aWVzUGFuZWwgPSBuZXcgUHJvcGVydGllc1BhbmVsKHN1cmZhY2UpO1xuICAgIHByb3BlcnRpZXNQYW5lbC5iaW5kSGFuZGxlcnMoKTtcbiAgICBcblxuICAgIC8vIEluaXRpYWxpemluZyBtb2RlbCB2aWV3ZXJcbiAgICB2YXIgbW9kZWxWaWV3ID0gbnVsbDtcbiAgICB2YXIgY3VwU3VyZmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXBTdXJmYWNlJyk7XG4gICAgdmFyIGxvYWRlciA9IG5ldyBSZXNvdXJjZUxvYWRlcigpO1xuXG4gICAgdmFyIHJlc291cmNlUHJlcGFyZXIgPSBuZXcgUmVzb3VyY2VQcmVwYXJlcihsb2FkZXIsIFtcbiAgICAgICAge2tleTogJ21vZGVsJywgc3JjOiAnL21vZGVscy9jdXBNb2RlbC5qc29uJywgdHlwZTogJ2pzb24nfSxcbiAgICAgICAge2tleTogJ3ZlcnRleFNoYWRlcicsIHNyYzogJy9zaGFkZXJzL2ZyYWdtZW50Lmdsc2wnLCB0eXBlOiAndGV4dCd9LFxuICAgICAgICB7a2V5OiAnZnJhZ21lbnRTaGFkZXInLCBzcmM6ICcvc2hhZGVycy92ZXJ0ZXguZ2xzbCcsIHR5cGU6ICd0ZXh0J30sXG4gICAgICAgIHtrZXk6ICdpbml0aWFsVGV4dHVyZScsIHNyYzogJy9pbWcvbG9nb0dyZXkuanBnJywgdHlwZTogJ2ltYWdlJ31cbiAgICBdLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgbW9kZWxWaWV3ID0gbmV3IE1vZGVsVmlldyhcbiAgICAgICAgICAgIGN1cFN1cmZhY2UsXG4gICAgICAgICAgICBTdG9yYWdlLmdldCgnbW9kZWwnKSxcbiAgICAgICAgICAgIFN0b3JhZ2UuZ2V0KCdpbml0aWFsVGV4dHVyZScpLFxuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ2ZyYWdtZW50U2hhZGVyJyksXG4gICAgICAgICAgICBTdG9yYWdlLmdldCgndmVydGV4U2hhZGVyJylcbiAgICAgICAgKTtcbiAgICAgICAgbW9kZWxWaWV3LnN0YXJ0UmVuZGVyKCk7XG4gICAgfSk7XG4gICAgXG4gICAgXG4gICAgLy8gVE9ETzogbW9yZSBlbGVnYW50IHdheSB0byBkbyB0aGlzXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwZGF0ZVRleHR1cmUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbW9kZWxWaWV3LnNldFRleHR1cmUoc3VyZmFjZS50b0ltYWdlKCkpO1xuICAgIH0pO1xuXG4gICAgcmVzb3VyY2VQcmVwYXJlci5zdGFydExvYWRpbmcoKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
