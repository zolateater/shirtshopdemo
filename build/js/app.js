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
    this.distance = 20;

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
    gl.clearColor(0.8, 0.9, 0.9 ,1.0);
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

            camera.move(diffX, diffY);
        }
    });
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsLW1hdHJpeC5qcyIsIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsIkNhbnZhc1VJRmFjdG9yeS5qcyIsIkNhbnZhc1VJSW1hZ2VWaWV3LmpzIiwiQ2FudmFzVUlMYWJlbFZpZXcuanMiLCJDYW52YXNVSVNlbGVjdGVkVmlldy5qcyIsIlBvc2l0aW9uLmpzIiwiUmVzb3VyY2VMb2FkZXIuanMiLCJSZXNvdXJjZVByZXBhcmVyLmpzIiwiU2l6ZS5qcyIsIlN0b3JhZ2UuanMiLCJVSUNvbGxlY3Rpb24uanMiLCJVSUVsZW1lbnQuanMiLCJVSUVsZW1lbnRWaWV3LmpzIiwiVUlJbWFnZUVsZW1lbnQuanMiLCJVSUxhYmVsRWxlbWVudC5qcyIsIkNhbWVyYS5qcyIsIk1vZGVsLmpzIiwiTW9kZWxWaWV3LmpzIiwiU2hhZGVyQ29tcGlsZXIuanMiLCJDb21wb25lbnRzUGFuZWwuanMiLCJNb2RlbFZpZXdQYW5lbC5qcyIsIlByb3BlcnRpZXNQYW5lbC5qcyIsImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDblRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDck5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVvdmVydmlldyBnbC1tYXRyaXggLSBIaWdoIHBlcmZvcm1hbmNlIG1hdHJpeCBhbmQgdmVjdG9yIG9wZXJhdGlvbnNcbiAqIEBhdXRob3IgQnJhbmRvbiBKb25lc1xuICogQGF1dGhvciBDb2xpbiBNYWNLZW56aWUgSVZcbiAqIEB2ZXJzaW9uIDIuMy4yXG4gKi9cblxuLyogQ29weXJpZ2h0IChjKSAyMDE1LCBCcmFuZG9uIEpvbmVzLCBDb2xpbiBNYWNLZW56aWUgSVYuXG5cbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS4gKi9cblxuIWZ1bmN0aW9uKHQsYSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9YSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxhKTtlbHNle3ZhciBuPWEoKTtmb3IodmFyIHIgaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czp0KVtyXT1uW3JdfX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbih0KXtmdW5jdGlvbiBhKHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtleHBvcnRzOnt9LGlkOnIsbG9hZGVkOiExfTtyZXR1cm4gdFtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxhKSxvLmxvYWRlZD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGEubT10LGEuYz1uLGEucD1cIlwiLGEoMCl9KFtmdW5jdGlvbih0LGEsbil7YS5nbE1hdHJpeD1uKDEpLGEubWF0Mj1uKDIpLGEubWF0MmQ9bigzKSxhLm1hdDM9big0KSxhLm1hdDQ9big1KSxhLnF1YXQ9big2KSxhLnZlYzI9big5KSxhLnZlYzM9big3KSxhLnZlYzQ9big4KX0sZnVuY3Rpb24odCxhKXt2YXIgbj17fTtuLkVQU0lMT049MWUtNixuLkFSUkFZX1RZUEU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZsb2F0MzJBcnJheT9GbG9hdDMyQXJyYXk6QXJyYXksbi5SQU5ET009TWF0aC5yYW5kb20sbi5FTkFCTEVfU0lNRD0hMSxuLlNJTURfQVZBSUxBQkxFPW4uQVJSQVlfVFlQRT09PUZsb2F0MzJBcnJheSYmXCJTSU1EXCJpbiB0aGlzLG4uVVNFX1NJTUQ9bi5FTkFCTEVfU0lNRCYmbi5TSU1EX0FWQUlMQUJMRSxuLnNldE1hdHJpeEFycmF5VHlwZT1mdW5jdGlvbih0KXtuLkFSUkFZX1RZUEU9dH07dmFyIHI9TWF0aC5QSS8xODA7bi50b1JhZGlhbj1mdW5jdGlvbih0KXtyZXR1cm4gdCpyfSxuLmVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiBNYXRoLmFicyh0LWEpPD1uLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh0KSxNYXRoLmFicyhhKSl9LHQuZXhwb3J0cz1ufSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvKXt2YXIgdT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB1WzBdPXQsdVsxXT1hLHVbMl09bix1WzNdPW8sdX0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHR9LG8udHJhbnNwb3NlPWZ1bmN0aW9uKHQsYSl7aWYodD09PWEpe3ZhciBuPWFbMV07dFsxXT1hWzJdLHRbMl09bn1lbHNlIHRbMF09YVswXSx0WzFdPWFbMl0sdFsyXT1hWzFdLHRbM109YVszXTtyZXR1cm4gdH0sby5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bip1LW8qcjtyZXR1cm4gbD8obD0xL2wsdFswXT11KmwsdFsxXT0tcipsLHRbMl09LW8qbCx0WzNdPW4qbCx0KTpudWxsfSxvLmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdO3JldHVybiB0WzBdPWFbM10sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHRbM109bix0fSxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdKnRbM10tdFsyXSp0WzFdfSxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9blswXSxNPW5bMV0scz1uWzJdLGk9blszXTtyZXR1cm4gdFswXT1yKmUrdSpNLHRbMV09byplK2wqTSx0WzJdPXIqcyt1KmksdFszXT1vKnMrbCppLHR9LG8ubXVsPW8ubXVsdGlwbHksby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTSt1KmUsdFsxXT1vKk0rbCplLHRbMl09ciotZSt1Kk0sdFszXT1vKi1lK2wqTSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9blswXSxNPW5bMV07cmV0dXJuIHRbMF09ciplLHRbMV09byplLHRbMl09dSpNLHRbM109bCpNLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPS1uLHRbM109cix0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109YVsxXSx0fSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDIoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKSl9LG8uTERVPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzJdPXJbMl0vclswXSxuWzBdPXJbMF0sblsxXT1yWzFdLG5bM109clszXS10WzJdKm5bMV0sW3QsYSxuXX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdH0sby5zdWI9by5zdWJ0cmFjdCxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT1hWzBdLE09YVsxXSxzPWFbMl0saT1hWzNdO3JldHVybiBNYXRoLmFicyhuLWUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhlKSkmJk1hdGguYWJzKG8tTSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKE0pKSYmTWF0aC5hYnModS1zKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMocykpJiZNYXRoLmFicyhsLWkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhpKSl9LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHR9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg2KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHRbNF09MCx0WzVdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDYpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYVs0XT10WzRdLGFbNV09dFs1XSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHRbNF09MCx0WzVdPTAsdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8sdSxsKXt2YXIgZT1uZXcgci5BUlJBWV9UWVBFKDYpO3JldHVybiBlWzBdPXQsZVsxXT1hLGVbMl09bixlWzNdPW8sZVs0XT11LGVbNV09bCxlfSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8sdSxsKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHRbNF09dSx0WzVdPWwsdH0sby5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1uKnUtcipvO3JldHVybiBNPyhNPTEvTSx0WzBdPXUqTSx0WzFdPS1yKk0sdFsyXT0tbypNLHRbM109bipNLHRbNF09KG8qZS11KmwpKk0sdFs1XT0ocipsLW4qZSkqTSx0KTpudWxsfSxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdKnRbM10tdFsxXSp0WzJdfSxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1uWzBdLGk9blsxXSxjPW5bMl0saD1uWzNdLFM9bls0XSxJPW5bNV07cmV0dXJuIHRbMF09cipzK3UqaSx0WzFdPW8qcytsKmksdFsyXT1yKmMrdSpoLHRbM109bypjK2wqaCx0WzRdPXIqUyt1KkkrZSx0WzVdPW8qUytsKkkrTSx0fSxvLm11bD1vLm11bHRpcGx5LG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1NYXRoLnNpbihuKSxpPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqaSt1KnMsdFsxXT1vKmkrbCpzLHRbMl09ciotcyt1KmksdFszXT1vKi1zK2wqaSx0WzRdPWUsdFs1XT1NLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPW5bMF0saT1uWzFdO3JldHVybiB0WzBdPXIqcyx0WzFdPW8qcyx0WzJdPXUqaSx0WzNdPWwqaSx0WzRdPWUsdFs1XT1NLHR9LG8udHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1uWzBdLGk9blsxXTtyZXR1cm4gdFswXT1yLHRbMV09byx0WzJdPXUsdFszXT1sLHRbNF09cipzK3UqaStlLHRbNV09bypzK2wqaStNLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPS1uLHRbM109cix0WzRdPTAsdFs1XT0wLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT1hWzFdLHRbNF09MCx0WzVdPTAsdH0sby5mcm9tVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHRbNF09YVswXSx0WzVdPWFbMV0sdH0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQyZChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiLCBcIit0WzRdK1wiLCBcIit0WzVdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpK01hdGgucG93KHRbNF0sMikrTWF0aC5wb3codFs1XSwyKSsxKX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0WzRdPWFbNF0rbls0XSx0WzVdPWFbNV0rbls1XSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdFs0XT1hWzRdLW5bNF0sdFs1XT1hWzVdLW5bNV0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdFs0XT1hWzRdKm4sdFs1XT1hWzVdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0WzRdPWFbNF0rbls0XSpyLHRbNV09YVs1XStuWzVdKnIsdH0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXSYmdFs0XT09PWFbNF0mJnRbNV09PT1hWzVdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT10WzRdLE09dFs1XSxzPWFbMF0saT1hWzFdLGM9YVsyXSxoPWFbM10sUz1hWzRdLEk9YVs1XTtyZXR1cm4gTWF0aC5hYnMobi1zKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMocykpJiZNYXRoLmFicyhvLWkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhpKSkmJk1hdGguYWJzKHUtYyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKGMpKSYmTWF0aC5hYnMobC1oKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoaCkpJiZNYXRoLmFicyhlLVMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhlKSxNYXRoLmFicyhTKSkmJk1hdGguYWJzKE0tSSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKE0pLE1hdGguYWJzKEkpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDkpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0xLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLmZyb21NYXQ0PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVs0XSx0WzRdPWFbNV0sdFs1XT1hWzZdLHRbNl09YVs4XSx0WzddPWFbOV0sdFs4XT1hWzEwXSx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoOSk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhWzRdPXRbNF0sYVs1XT10WzVdLGFbNl09dFs2XSxhWzddPXRbN10sYVs4XT10WzhdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyx1LGwsZSxNLHMpe3ZhciBpPW5ldyByLkFSUkFZX1RZUEUoOSk7cmV0dXJuIGlbMF09dCxpWzFdPWEsaVsyXT1uLGlbM109byxpWzRdPXUsaVs1XT1sLGlbNl09ZSxpWzddPU0saVs4XT1zLGl9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwsZSxNLHMpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdFs0XT11LHRbNV09bCx0WzZdPWUsdFs3XT1NLHRbOF09cyx0fSxvLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0xLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe2lmKHQ9PT1hKXt2YXIgbj1hWzFdLHI9YVsyXSxvPWFbNV07dFsxXT1hWzNdLHRbMl09YVs2XSx0WzNdPW4sdFs1XT1hWzddLHRbNl09cix0WzddPW99ZWxzZSB0WzBdPWFbMF0sdFsxXT1hWzNdLHRbMl09YVs2XSx0WzNdPWFbMV0sdFs0XT1hWzRdLHRbNV09YVs3XSx0WzZdPWFbMl0sdFs3XT1hWzVdLHRbOF09YVs4XTtyZXR1cm4gdH0sby5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1pKmwtZSpzLGg9LWkqdStlKk0sUz1zKnUtbCpNLEk9bipjK3IqaCtvKlM7cmV0dXJuIEk/KEk9MS9JLHRbMF09YypJLHRbMV09KC1pKnIrbypzKSpJLHRbMl09KGUqci1vKmwpKkksdFszXT1oKkksdFs0XT0oaSpuLW8qTSkqSSx0WzVdPSgtZSpuK28qdSkqSSx0WzZdPVMqSSx0WzddPSgtcypuK3IqTSkqSSx0WzhdPShsKm4tcip1KSpJLHQpOm51bGx9LG8uYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XTtyZXR1cm4gdFswXT1sKmktZSpzLHRbMV09bypzLXIqaSx0WzJdPXIqZS1vKmwsdFszXT1lKk0tdSppLHRbNF09bippLW8qTSx0WzVdPW8qdS1uKmUsdFs2XT11KnMtbCpNLHRbN109cipNLW4qcyx0WzhdPW4qbC1yKnUsdH0sby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdLHU9dFs0XSxsPXRbNV0sZT10WzZdLE09dFs3XSxzPXRbOF07cmV0dXJuIGEqKHMqdS1sKk0pK24qKC1zKm8rbCplKStyKihNKm8tdSplKX0sby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9blswXSxTPW5bMV0sST1uWzJdLGY9blszXSx4PW5bNF0sRD1uWzVdLEY9bls2XSxtPW5bN10sZD1uWzhdO3JldHVybiB0WzBdPWgqcitTKmwrSSpzLHRbMV09aCpvK1MqZStJKmksdFsyXT1oKnUrUypNK0kqYyx0WzNdPWYqcit4KmwrRCpzLHRbNF09ZipvK3gqZStEKmksdFs1XT1mKnUreCpNK0QqYyx0WzZdPUYqcittKmwrZCpzLHRbN109RipvK20qZStkKmksdFs4XT1GKnUrbSpNK2QqYyx0fSxvLm11bD1vLm11bHRpcGx5LG8udHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1uWzBdLFM9blsxXTtyZXR1cm4gdFswXT1yLHRbMV09byx0WzJdPXUsdFszXT1sLHRbNF09ZSx0WzVdPU0sdFs2XT1oKnIrUypsK3MsdFs3XT1oKm8rUyplK2ksdFs4XT1oKnUrUypNK2MsdH0sby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPU1hdGguc2luKG4pLFM9TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09UypyK2gqbCx0WzFdPVMqbytoKmUsdFsyXT1TKnUraCpNLHRbM109UypsLWgqcix0WzRdPVMqZS1oKm8sdFs1XT1TKk0taCp1LHRbNl09cyx0WzddPWksdFs4XT1jLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPW5bMF0sbz1uWzFdO3JldHVybiB0WzBdPXIqYVswXSx0WzFdPXIqYVsxXSx0WzJdPXIqYVsyXSx0WzNdPW8qYVszXSx0WzRdPW8qYVs0XSx0WzVdPW8qYVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0fSxvLmZyb21UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0xLHRbNV09MCx0WzZdPWFbMF0sdFs3XT1hWzFdLHRbOF09MSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0wLHRbM109LW4sdFs0XT1yLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPWFbMV0sdFs1XT0wLHRbNl09MCx0WzddPTAsdFs4XT0xLHR9LG8uZnJvbU1hdDJkPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT0wLHRbM109YVsyXSx0WzRdPWFbM10sdFs1XT0wLHRbNl09YVs0XSx0WzddPWFbNV0sdFs4XT0xLHR9LG8uZnJvbVF1YXQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bituLGU9cityLE09bytvLHM9bipsLGk9cipsLGM9ciplLGg9bypsLFM9byplLEk9bypNLGY9dSpsLHg9dSplLEQ9dSpNO3JldHVybiB0WzBdPTEtYy1JLHRbM109aS1ELHRbNl09aCt4LHRbMV09aStELHRbNF09MS1zLUksdFs3XT1TLWYsdFsyXT1oLXgsdFs1XT1TK2YsdFs4XT0xLXMtYyx0fSxvLm5vcm1hbEZyb21NYXQ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9YVs5XSxoPWFbMTBdLFM9YVsxMV0sST1hWzEyXSxmPWFbMTNdLHg9YVsxNF0sRD1hWzE1XSxGPW4qZS1yKmwsbT1uKk0tbypsLGQ9bipzLXUqbCxiPXIqTS1vKmUsdj1yKnMtdSplLHo9bypzLXUqTSxwPWkqZi1jKkksdz1pKngtaCpJLEU9aSpELVMqSSxBPWMqeC1oKmYsUD1jKkQtUypmLEw9aCpELVMqeCxxPUYqTC1tKlArZCpBK2IqRS12KncreipwO3JldHVybiBxPyhxPTEvcSx0WzBdPShlKkwtTSpQK3MqQSkqcSx0WzFdPShNKkUtbCpMLXMqdykqcSx0WzJdPShsKlAtZSpFK3MqcCkqcSx0WzNdPShvKlAtcipMLXUqQSkqcSx0WzRdPShuKkwtbypFK3UqdykqcSx0WzVdPShyKkUtbipQLXUqcCkqcSx0WzZdPShmKnoteCp2K0QqYikqcSx0WzddPSh4KmQtSSp6LUQqbSkqcSx0WzhdPShJKnYtZipkK0QqRikqcSx0KTpudWxsfSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDMoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIiwgXCIrdFs0XStcIiwgXCIrdFs1XStcIiwgXCIrdFs2XStcIiwgXCIrdFs3XStcIiwgXCIrdFs4XStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKStNYXRoLnBvdyh0WzRdLDIpK01hdGgucG93KHRbNV0sMikrTWF0aC5wb3codFs2XSwyKStNYXRoLnBvdyh0WzddLDIpK01hdGgucG93KHRbOF0sMikpfSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHRbNF09YVs0XStuWzRdLHRbNV09YVs1XStuWzVdLHRbNl09YVs2XStuWzZdLHRbN109YVs3XStuWzddLHRbOF09YVs4XStuWzhdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0WzRdPWFbNF0tbls0XSx0WzVdPWFbNV0tbls1XSx0WzZdPWFbNl0tbls2XSx0WzddPWFbN10tbls3XSx0WzhdPWFbOF0tbls4XSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0WzRdPWFbNF0qbix0WzVdPWFbNV0qbix0WzZdPWFbNl0qbix0WzddPWFbN10qbix0WzhdPWFbOF0qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHRbNF09YVs0XStuWzRdKnIsdFs1XT1hWzVdK25bNV0qcix0WzZdPWFbNl0rbls2XSpyLHRbN109YVs3XStuWzddKnIsdFs4XT1hWzhdK25bOF0qcix0fSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdJiZ0WzRdPT09YVs0XSYmdFs1XT09PWFbNV0mJnRbNl09PT1hWzZdJiZ0WzddPT09YVs3XSYmdFs4XT09PWFbOF19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPXRbNF0sTT10WzVdLHM9dFs2XSxpPXRbN10sYz10WzhdLGg9YVswXSxTPWFbMV0sST1hWzJdLGY9YVszXSx4PWFbNF0sRD1hWzVdLEY9dFs2XSxtPWFbN10sZD1hWzhdO3JldHVybiBNYXRoLmFicyhuLWgpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhoKSkmJk1hdGguYWJzKG8tUyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKFMpKSYmTWF0aC5hYnModS1JKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoSSkpJiZNYXRoLmFicyhsLWYpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhmKSkmJk1hdGguYWJzKGUteCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGUpLE1hdGguYWJzKHgpKSYmTWF0aC5hYnMoTS1EKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoTSksTWF0aC5hYnMoRCkpJiZNYXRoLmFicyhzLUYpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhzKSxNYXRoLmFicyhGKSkmJk1hdGguYWJzKGktbSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGkpLE1hdGguYWJzKG0pKSYmTWF0aC5hYnMoYy1kKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoYyksTWF0aC5hYnMoZCkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17c2NhbGFyOnt9LFNJTUQ6e319O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSgxNik7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoMTYpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYVs0XT10WzRdLGFbNV09dFs1XSxhWzZdPXRbNl0sYVs3XT10WzddLGFbOF09dFs4XSxhWzldPXRbOV0sYVsxMF09dFsxMF0sYVsxMV09dFsxMV0sYVsxMl09dFsxMl0sYVsxM109dFsxM10sYVsxNF09dFsxNF0sYVsxNV09dFsxNV0sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyx1LGwsZSxNLHMsaSxjLGgsUyxJLGYseCl7dmFyIEQ9bmV3IHIuQVJSQVlfVFlQRSgxNik7cmV0dXJuIERbMF09dCxEWzFdPWEsRFsyXT1uLERbM109byxEWzRdPXUsRFs1XT1sLERbNl09ZSxEWzddPU0sRFs4XT1zLERbOV09aSxEWzEwXT1jLERbMTFdPWgsRFsxMl09UyxEWzEzXT1JLERbMTRdPWYsRFsxNV09eCxEfSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxmLHgpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdFs0XT11LHRbNV09bCx0WzZdPWUsdFs3XT1NLHRbOF09cyx0WzldPWksdFsxMF09Yyx0WzExXT1oLHRbMTJdPVMsdFsxM109SSx0WzE0XT1mLHRbMTVdPXgsdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uc2NhbGFyLnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe2lmKHQ9PT1hKXt2YXIgbj1hWzFdLHI9YVsyXSxvPWFbM10sdT1hWzZdLGw9YVs3XSxlPWFbMTFdO3RbMV09YVs0XSx0WzJdPWFbOF0sdFszXT1hWzEyXSx0WzRdPW4sdFs2XT1hWzldLHRbN109YVsxM10sdFs4XT1yLHRbOV09dSx0WzExXT1hWzE0XSx0WzEyXT1vLHRbMTNdPWwsdFsxNF09ZX1lbHNlIHRbMF09YVswXSx0WzFdPWFbNF0sdFsyXT1hWzhdLHRbM109YVsxMl0sdFs0XT1hWzFdLHRbNV09YVs1XSx0WzZdPWFbOV0sdFs3XT1hWzEzXSx0WzhdPWFbMl0sdFs5XT1hWzZdLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTRdLHRbMTJdPWFbM10sdFsxM109YVs3XSx0WzE0XT1hWzExXSx0WzE1XT1hWzE1XTtyZXR1cm4gdH0sby5TSU1ELnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe3ZhciBuLHIsbyx1LGwsZSxNLHMsaSxjO3JldHVybiBuPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxyPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMiksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwwLDEsNCw1KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDAsMSw0LDUpLE09U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMCwyLDQsNikscz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwxLDMsNSw3KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsTSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LHMpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMiwzLDYsNyksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwyLDMsNiw3KSxpPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDAsMiw0LDYpLGM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMSwzLDUsNyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LGkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsYyksdH0sby50cmFuc3Bvc2U9ci5VU0VfU0lNRD9vLlNJTUQudHJhbnNwb3NlOm8uc2NhbGFyLnRyYW5zcG9zZSxvLnNjYWxhci5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1hWzldLGg9YVsxMF0sUz1hWzExXSxJPWFbMTJdLGY9YVsxM10seD1hWzE0XSxEPWFbMTVdLEY9biplLXIqbCxtPW4qTS1vKmwsZD1uKnMtdSpsLGI9cipNLW8qZSx2PXIqcy11KmUsej1vKnMtdSpNLHA9aSpmLWMqSSx3PWkqeC1oKkksRT1pKkQtUypJLEE9Yyp4LWgqZixQPWMqRC1TKmYsTD1oKkQtUyp4LHE9RipMLW0qUCtkKkErYipFLXYqdyt6KnA7cmV0dXJuIHE/KHE9MS9xLHRbMF09KGUqTC1NKlArcypBKSpxLHRbMV09KG8qUC1yKkwtdSpBKSpxLHRbMl09KGYqei14KnYrRCpiKSpxLHRbM109KGgqdi1jKnotUypiKSpxLHRbNF09KE0qRS1sKkwtcyp3KSpxLHRbNV09KG4qTC1vKkUrdSp3KSpxLHRbNl09KHgqZC1JKnotRCptKSpxLHRbN109KGkqei1oKmQrUyptKSpxLHRbOF09KGwqUC1lKkUrcypwKSpxLHRbOV09KHIqRS1uKlAtdSpwKSpxLHRbMTBdPShJKnYtZipkK0QqRikqcSx0WzExXT0oYypkLWkqdi1TKkYpKnEsdFsxMl09KGUqdy1sKkEtTSpwKSpxLHRbMTNdPShuKkEtcip3K28qcCkqcSx0WzE0XT0oZiptLUkqYi14KkYpKnEsdFsxNV09KGkqYi1jKm0raCpGKSpxLHQpOm51bGx9LG8uU0lNRC5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbixyLG8sdSxsLGUsTSxzLGksYyxoPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxTPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxJPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxmPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMik7cmV0dXJuIGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShoLFMsMCwxLDQsNSkscj1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKEksZiwwLDEsNCw1KSxuPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxyLDAsMiw0LDYpLHI9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShyLGwsMSwzLDUsNyksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGgsUywyLDMsNiw3KSx1PVNJTUQuRmxvYXQzMng0LnNodWZmbGUoSSxmLDIsMyw2LDcpLG89U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLHUsMCwyLDQsNiksdT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHUsbCwxLDMsNSw3KSxsPVNJTUQuRmxvYXQzMng0Lm11bChvLHUpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLGU9U0lNRC5GbG9hdDMyeDQubXVsKHIsbCksTT1TSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxlKSxNPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxNKSxNPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoTSwyLDMsMCwxKSxsPVNJTUQuRmxvYXQzMng0Lm11bChyLG8pLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLGU9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLGUpLGk9U0lNRC5GbG9hdDMyeDQubXVsKG4sbCksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5zdWIoZSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG4sbCksaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShyLDIsMywwLDEpLHUpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLG89U0lNRC5GbG9hdDMyeDQuc3dpenpsZShvLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChvLGwpLGUpLHM9U0lNRC5GbG9hdDMyeDQubXVsKG4sbCksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5zdWIoZSxTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSkscz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG4sbCkscykscz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMiwzLDAsMSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobixyKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxzPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxzKSxpPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSxpKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxzPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxzKSxpPVNJTUQuRmxvYXQzMng0LnN1YihpLFNJTUQuRmxvYXQzMng0Lm11bChvLGwpKSxsPVNJTUQuRmxvYXQzMng0Lm11bChuLHUpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLE09U0lNRC5GbG9hdDMyeDQuc3ViKE0sU0lNRC5GbG9hdDMyeDQubXVsKG8sbCkpLHM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyLGwpLHMpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLE09U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChvLGwpLE0pLHM9U0lNRC5GbG9hdDMyeDQuc3ViKHMsU0lNRC5GbG9hdDMyeDQubXVsKHIsbCkpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG4sbyksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksTT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCksTSksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoaSxTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksTT1TSU1ELkZsb2F0MzJ4NC5zdWIoTSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSksaT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHIsbCksaSksYz1TSU1ELkZsb2F0MzJ4NC5tdWwobixlKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMiwzLDAsMSksYyksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDEsMCwzLDIpLGMpLGw9U0lNRC5GbG9hdDMyeDQucmVjaXByb2NhbEFwcHJveGltYXRpb24oYyksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQuYWRkKGwsbCksU0lNRC5GbG9hdDMyeDQubXVsKGMsU0lNRC5GbG9hdDMyeDQubXVsKGwsbCkpKSwoYz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMCwwLDAsMCkpPyhTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQubXVsKGMsZSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxNKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0Lm11bChjLHMpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLFNJTUQuRmxvYXQzMng0Lm11bChjLGkpKSx0KTpudWxsfSxvLmludmVydD1yLlVTRV9TSU1EP28uU0lNRC5pbnZlcnQ6by5zY2FsYXIuaW52ZXJ0LG8uc2NhbGFyLmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1hWzldLGg9YVsxMF0sUz1hWzExXSxJPWFbMTJdLGY9YVsxM10seD1hWzE0XSxEPWFbMTVdO3JldHVybiB0WzBdPWUqKGgqRC1TKngpLWMqKE0qRC1zKngpK2YqKE0qUy1zKmgpLHRbMV09LShyKihoKkQtUyp4KS1jKihvKkQtdSp4KStmKihvKlMtdSpoKSksdFsyXT1yKihNKkQtcyp4KS1lKihvKkQtdSp4KStmKihvKnMtdSpNKSx0WzNdPS0ociooTSpTLXMqaCktZSoobypTLXUqaCkrYyoobypzLXUqTSkpLHRbNF09LShsKihoKkQtUyp4KS1pKihNKkQtcyp4KStJKihNKlMtcypoKSksdFs1XT1uKihoKkQtUyp4KS1pKihvKkQtdSp4KStJKihvKlMtdSpoKSx0WzZdPS0obiooTSpELXMqeCktbCoobypELXUqeCkrSSoobypzLXUqTSkpLHRbN109biooTSpTLXMqaCktbCoobypTLXUqaCkraSoobypzLXUqTSksdFs4XT1sKihjKkQtUypmKS1pKihlKkQtcypmKStJKihlKlMtcypjKSx0WzldPS0obiooYypELVMqZiktaSoocipELXUqZikrSSoocipTLXUqYykpLHRbMTBdPW4qKGUqRC1zKmYpLWwqKHIqRC11KmYpK0kqKHIqcy11KmUpLHRbMTFdPS0obiooZSpTLXMqYyktbCoocipTLXUqYykraSoocipzLXUqZSkpLHRbMTJdPS0obCooYyp4LWgqZiktaSooZSp4LU0qZikrSSooZSpoLU0qYykpLHRbMTNdPW4qKGMqeC1oKmYpLWkqKHIqeC1vKmYpK0kqKHIqaC1vKmMpLHRbMTRdPS0obiooZSp4LU0qZiktbCoocip4LW8qZikrSSoocipNLW8qZSkpLHRbMTVdPW4qKGUqaC1NKmMpLWwqKHIqaC1vKmMpK2kqKHIqTS1vKmUpLHR9LG8uU0lNRC5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG4scixvLHUsbCxlLE0scyxpLGMsaCxTLEksbj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCkscj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpO3JldHVybiBpPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDAsMSw0LDUpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMCwxLDQsNSksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGksZSwwLDIsNCw2KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoZSxpLDEsMyw1LDcpLGk9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMiwzLDYsNykscz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwyLDMsNiw3KSxNPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaSxzLDAsMiw0LDYpLHM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShzLGksMSwzLDUsNyksaT1TSU1ELkZsb2F0MzJ4NC5tdWwoTSxzKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxjPVNJTUQuRmxvYXQzMng0Lm11bChlLGkpLGg9U0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGUsaSksYyksaD1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaCksaD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGgsMiwzLDAsMSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwoZSxNKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxjKSxJPVNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKGMsU0lNRC5GbG9hdDMyeDQubXVsKHMsaSkpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLGkpLEkpLEk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShJLDIsMywwLDEpLGk9U0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwyLDMsMCwxKSxzKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxNPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoTSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSxjKSxTPVNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKGMsU0lNRC5GbG9hdDMyeDQubXVsKE0saSkpLFM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLGkpLFMpLFM9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDIsMywwLDEpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGwsZSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksUz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksUyksST1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKE0saSksSSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksUz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksUyksST1TSU1ELkZsb2F0MzJ4NC5zdWIoSSxTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobCxzKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxoPVNJTUQuRmxvYXQzMng0LnN1YihoLFNJTUQuRmxvYXQzMng0Lm11bChNLGkpKSxTPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxTKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxoPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSxoKSxTPVNJTUQuRmxvYXQzMng0LnN1YihTLFNJTUQuRmxvYXQzMng0Lm11bChlLGkpKSxpPVNJTUQuRmxvYXQzMng0Lm11bChsLE0pLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLGg9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLGgpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKEksU0lNRC5GbG9hdDMyeDQubXVsKGUsaSkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGg9U0lNRC5GbG9hdDMyeDQuc3ViKGgsU0lNRC5GbG9hdDMyeDQubXVsKHMsaSkpLEk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChlLGkpLEkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxjKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsaCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFMpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsSSksdH0sby5hZGpvaW50PXIuVVNFX1NJTUQ/by5TSU1ELmFkam9pbnQ6by5zY2FsYXIuYWRqb2ludCxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM10sdT10WzRdLGw9dFs1XSxlPXRbNl0sTT10WzddLHM9dFs4XSxpPXRbOV0sYz10WzEwXSxoPXRbMTFdLFM9dFsxMl0sST10WzEzXSxmPXRbMTRdLHg9dFsxNV0sRD1hKmwtbip1LEY9YSplLXIqdSxtPWEqTS1vKnUsZD1uKmUtcipsLGI9bipNLW8qbCx2PXIqTS1vKmUsej1zKkktaSpTLHA9cypmLWMqUyx3PXMqeC1oKlMsRT1pKmYtYypJLEE9aSp4LWgqSSxQPWMqeC1oKmY7cmV0dXJuIEQqUC1GKkErbSpFK2Qqdy1iKnArdip6fSxvLlNJTUQubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMiksZT1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sMCksTT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDMsMywzLDMpLGwpKSkpO1NJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxNKTt2YXIgcz1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sNCksaT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDMsMywzLDMpLGwpKSkpO1NJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxpKTt2YXIgYz1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sOCksaD1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDMsMywzLDMpLGwpKSkpO1NJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxoKTt2YXIgUz1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sMTIpLEk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywzLDMsMywzKSxsKSkpKTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixJKSx0fSxvLnNjYWxhci5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9YVs5XSxTPWFbMTBdLEk9YVsxMV0sZj1hWzEyXSx4PWFbMTNdLEQ9YVsxNF0sRj1hWzE1XSxtPW5bMF0sZD1uWzFdLGI9blsyXSx2PW5bM107cmV0dXJuIHRbMF09bSpyK2QqZStiKmMrdipmLHRbMV09bSpvK2QqTStiKmgrdip4LHRbMl09bSp1K2QqcytiKlMrdipELHRbM109bSpsK2QqaStiKkkrdipGLG09bls0XSxkPW5bNV0sYj1uWzZdLHY9bls3XSx0WzRdPW0qcitkKmUrYipjK3YqZix0WzVdPW0qbytkKk0rYipoK3YqeCx0WzZdPW0qdStkKnMrYipTK3YqRCx0WzddPW0qbCtkKmkrYipJK3YqRixtPW5bOF0sZD1uWzldLGI9blsxMF0sdj1uWzExXSx0WzhdPW0qcitkKmUrYipjK3YqZix0WzldPW0qbytkKk0rYipoK3YqeCx0WzEwXT1tKnUrZCpzK2IqUyt2KkQsdFsxMV09bSpsK2QqaStiKkkrdipGLG09blsxMl0sZD1uWzEzXSxiPW5bMTRdLHY9blsxNV0sdFsxMl09bSpyK2QqZStiKmMrdipmLHRbMTNdPW0qbytkKk0rYipoK3YqeCx0WzE0XT1tKnUrZCpzK2IqUyt2KkQsdFsxNV09bSpsK2QqaStiKkkrdipGLHR9LG8ubXVsdGlwbHk9ci5VU0VfU0lNRD9vLlNJTUQubXVsdGlwbHk6by5zY2FsYXIubXVsdGlwbHksby5tdWw9by5tdWx0aXBseSxvLnNjYWxhci50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxmPW5bMF0seD1uWzFdLEQ9blsyXTtyZXR1cm4gYT09PXQ/KHRbMTJdPWFbMF0qZithWzRdKngrYVs4XSpEK2FbMTJdLHRbMTNdPWFbMV0qZithWzVdKngrYVs5XSpEK2FbMTNdLHRbMTRdPWFbMl0qZithWzZdKngrYVsxMF0qRCthWzE0XSx0WzE1XT1hWzNdKmYrYVs3XSp4K2FbMTFdKkQrYVsxNV0pOihyPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPWFbOV0sUz1hWzEwXSxJPWFbMTFdLHRbMF09cix0WzFdPW8sdFsyXT11LHRbM109bCx0WzRdPWUsdFs1XT1NLHRbNl09cyx0WzddPWksdFs4XT1jLHRbOV09aCx0WzEwXT1TLHRbMTFdPUksdFsxMl09cipmK2UqeCtjKkQrYVsxMl0sdFsxM109bypmK00qeCtoKkQrYVsxM10sdFsxNF09dSpmK3MqeCtTKkQrYVsxNF0sdFsxNV09bCpmK2kqeCtJKkQrYVsxNV0pLHR9LG8uU0lNRC50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMiksZT1TSU1ELkZsb2F0MzJ4NChuWzBdLG5bMV0sblsyXSwwKTthIT09dCYmKHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSkscj1TSU1ELkZsb2F0MzJ4NC5tdWwocixTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMCwwLDAsMCkpLG89U0lNRC5GbG9hdDMyeDQubXVsKG8sU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDEsMSwxLDEpKSx1PVNJTUQuRmxvYXQzMng0Lm11bCh1LFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwyLDIsMiwyKSk7dmFyIE09U0lNRC5GbG9hdDMyeDQuYWRkKHIsU0lNRC5GbG9hdDMyeDQuYWRkKG8sU0lNRC5GbG9hdDMyeDQuYWRkKHUsbCkpKTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixNKSx0fSxvLnRyYW5zbGF0ZT1yLlVTRV9TSU1EP28uU0lNRC50cmFuc2xhdGU6by5zY2FsYXIudHJhbnNsYXRlLG8uc2NhbGFyLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uWzBdLG89blsxXSx1PW5bMl07cmV0dXJuIHRbMF09YVswXSpyLHRbMV09YVsxXSpyLHRbMl09YVsyXSpyLHRbM109YVszXSpyLHRbNF09YVs0XSpvLHRbNV09YVs1XSpvLHRbNl09YVs2XSpvLHRbN109YVs3XSpvLHRbOF09YVs4XSp1LHRbOV09YVs5XSp1LHRbMTBdPWFbMTBdKnUsdFsxMV09YVsxMV0qdSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSx0fSxvLlNJTUQuc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByLG8sdSxsPVNJTUQuRmxvYXQzMng0KG5bMF0sblsxXSxuWzJdLDApO3JldHVybiByPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQubXVsKHIsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDAsMCwwLDApKSksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0Lm11bChvLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDEsMSwxKSkpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5tdWwodSxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwyLDIsMikpKSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSx0fSxvLnNjYWxlPXIuVVNFX1NJTUQ/by5TSU1ELnNjYWxlOm8uc2NhbGFyLnNjYWxlLG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuLG8pe3ZhciB1LGwsZSxNLHMsaSxjLGgsUyxJLGYseCxELEYsbSxkLGIsdix6LHAsdyxFLEEsUCxMPW9bMF0scT1vWzFdLFI9b1syXSxOPU1hdGguc3FydChMKkwrcSpxK1IqUik7cmV0dXJuIE1hdGguYWJzKE4pPHIuRVBTSUxPTj9udWxsOihOPTEvTixMKj1OLHEqPU4sUio9Tix1PU1hdGguc2luKG4pLGw9TWF0aC5jb3MobiksZT0xLWwsTT1hWzBdLHM9YVsxXSxpPWFbMl0sYz1hWzNdLGg9YVs0XSxTPWFbNV0sST1hWzZdLGY9YVs3XSx4PWFbOF0sRD1hWzldLEY9YVsxMF0sbT1hWzExXSxkPUwqTCplK2wsYj1xKkwqZStSKnUsdj1SKkwqZS1xKnUsej1MKnEqZS1SKnUscD1xKnEqZStsLHc9UipxKmUrTCp1LEU9TCpSKmUrcSp1LEE9cSpSKmUtTCp1LFA9UipSKmUrbCx0WzBdPU0qZCtoKmIreCp2LHRbMV09cypkK1MqYitEKnYsdFsyXT1pKmQrSSpiK0Yqdix0WzNdPWMqZCtmKmIrbSp2LHRbNF09TSp6K2gqcCt4KncsdFs1XT1zKnorUypwK0Qqdyx0WzZdPWkqeitJKnArRip3LHRbN109Yyp6K2YqcCttKncsdFs4XT1NKkUraCpBK3gqUCx0WzldPXMqRStTKkErRCpQLHRbMTBdPWkqRStJKkErRipQLHRbMTFdPWMqRStmKkErbSpQLGEhPT10JiYodFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHQpfSxvLnNjYWxhci5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1NYXRoLnNpbihuKSxvPU1hdGguY29zKG4pLHU9YVs0XSxsPWFbNV0sZT1hWzZdLE09YVs3XSxzPWFbOF0saT1hWzldLGM9YVsxMF0saD1hWzExXTtyZXR1cm4gYSE9PXQmJih0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHRbNF09dSpvK3Mqcix0WzVdPWwqbytpKnIsdFs2XT1lKm8rYypyLHRbN109TSpvK2gqcix0WzhdPXMqby11KnIsdFs5XT1pKm8tbCpyLHRbMTBdPWMqby1lKnIsdFsxMV09aCpvLU0qcix0fSxvLlNJTUQucm90YXRlWD1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5zaW4obikpLG89U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MobikpO2EhPT10JiYodFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKTt2YXIgdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbyksU0lNRC5GbG9hdDMyeDQubXVsKGwscikpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLG8pLFNJTUQuRmxvYXQzMng0Lm11bCh1LHIpKSksdH0sby5yb3RhdGVYPXIuVVNFX1NJTUQ/by5TSU1ELnJvdGF0ZVg6by5zY2FsYXIucm90YXRlWCxvLnNjYWxhci5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1NYXRoLnNpbihuKSxvPU1hdGguY29zKG4pLHU9YVswXSxsPWFbMV0sZT1hWzJdLE09YVszXSxzPWFbOF0saT1hWzldLGM9YVsxMF0saD1hWzExXTtyZXR1cm4gYSE9PXQmJih0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHRbMF09dSpvLXMqcix0WzFdPWwqby1pKnIsdFsyXT1lKm8tYypyLHRbM109TSpvLWgqcix0WzhdPXUqcitzKm8sdFs5XT1sKnIraSpvLHRbMTBdPWUqcitjKm8sdFsxMV09TSpyK2gqbyx0fSxvLlNJTUQucm90YXRlWT1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5zaW4obikpLG89U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MobikpO2EhPT10JiYodFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKTt2YXIgdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHUsbyksU0lNRC5GbG9hdDMyeDQubXVsKGwscikpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LHIpLFNJTUQuRmxvYXQzMng0Lm11bChsLG8pKSksdH0sby5yb3RhdGVZPXIuVVNFX1NJTUQ/by5TSU1ELnJvdGF0ZVk6by5zY2FsYXIucm90YXRlWSxvLnNjYWxhci5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1NYXRoLnNpbihuKSxvPU1hdGguY29zKG4pLHU9YVswXSxsPWFbMV0sZT1hWzJdLE09YVszXSxzPWFbNF0saT1hWzVdLGM9YVs2XSxoPWFbN107cmV0dXJuIGEhPT10JiYodFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSksdFswXT11Km8rcypyLHRbMV09bCpvK2kqcix0WzJdPWUqbytjKnIsdFszXT1NKm8raCpyLHRbNF09cypvLXUqcix0WzVdPWkqby1sKnIsdFs2XT1jKm8tZSpyLHRbN109aCpvLU0qcix0fSxvLlNJTUQucm90YXRlWj1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5zaW4obikpLG89U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MobikpO2EhPT10JiYodFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSk7dmFyIHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LG8pLFNJTUQuRmxvYXQzMng0Lm11bChsLHIpKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxyKSkpLHR9LG8ucm90YXRlWj1yLlVTRV9TSU1EP28uU0lNRC5yb3RhdGVaOm8uc2NhbGFyLnJvdGF0ZVosby5mcm9tVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT1hWzBdLHRbMTNdPWFbMV0sdFsxNF09YVsyXSx0WzE1XT0xLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPWFbMV0sdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPWFbMl0sdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSxuKXt2YXIgbyx1LGwsZT1uWzBdLE09blsxXSxzPW5bMl0saT1NYXRoLnNxcnQoZSplK00qTStzKnMpO3JldHVybiBNYXRoLmFicyhpKTxyLkVQU0lMT04/bnVsbDooaT0xL2ksZSo9aSxNKj1pLHMqPWksbz1NYXRoLnNpbihhKSx1PU1hdGguY29zKGEpLGw9MS11LHRbMF09ZSplKmwrdSx0WzFdPU0qZSpsK3Mqbyx0WzJdPXMqZSpsLU0qbyx0WzNdPTAsdFs0XT1lKk0qbC1zKm8sdFs1XT1NKk0qbCt1LHRbNl09cypNKmwrZSpvLHRbN109MCx0WzhdPWUqcypsK00qbyx0WzldPU0qcypsLWUqbyx0WzEwXT1zKnMqbCt1LHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0KX0sby5mcm9tWFJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPXIsdFs2XT1uLHRbN109MCx0WzhdPTAsdFs5XT0tbix0WzEwXT1yLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21ZUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT0wLHRbMl09LW4sdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPW4sdFs5XT0wLHRbMTBdPXIsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVpSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0wLHRbM109MCx0WzRdPS1uLHRbNV09cix0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tUm90YXRpb25UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPXIrcixNPW8rbyxzPXUrdSxpPXIqZSxjPXIqTSxoPXIqcyxTPW8qTSxJPW8qcyxmPXUqcyx4PWwqZSxEPWwqTSxGPWwqcztyZXR1cm4gdFswXT0xLShTK2YpLHRbMV09YytGLHRbMl09aC1ELHRbM109MCx0WzRdPWMtRix0WzVdPTEtKGkrZiksdFs2XT1JK3gsdFs3XT0wLHRbOF09aCtELHRbOV09SS14LHRbMTBdPTEtKGkrUyksdFsxMV09MCx0WzEyXT1uWzBdLHRbMTNdPW5bMV0sdFsxNF09blsyXSx0WzE1XT0xLHR9LG8uZ2V0VHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzEyXSx0WzFdPWFbMTNdLHRbMl09YVsxNF0sdH0sby5nZXRSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0rYVs1XSthWzEwXSxyPTA7cmV0dXJuIG4+MD8ocj0yKk1hdGguc3FydChuKzEpLHRbM109LjI1KnIsdFswXT0oYVs2XS1hWzldKS9yLHRbMV09KGFbOF0tYVsyXSkvcix0WzJdPShhWzFdLWFbNF0pL3IpOmFbMF0+YVs1XSZhWzBdPmFbMTBdPyhyPTIqTWF0aC5zcXJ0KDErYVswXS1hWzVdLWFbMTBdKSx0WzNdPShhWzZdLWFbOV0pL3IsdFswXT0uMjUqcix0WzFdPShhWzFdK2FbNF0pL3IsdFsyXT0oYVs4XSthWzJdKS9yKTphWzVdPmFbMTBdPyhyPTIqTWF0aC5zcXJ0KDErYVs1XS1hWzBdLWFbMTBdKSx0WzNdPShhWzhdLWFbMl0pL3IsdFswXT0oYVsxXSthWzRdKS9yLHRbMV09LjI1KnIsdFsyXT0oYVs2XSthWzldKS9yKToocj0yKk1hdGguc3FydCgxK2FbMTBdLWFbMF0tYVs1XSksdFszXT0oYVsxXS1hWzRdKS9yLHRbMF09KGFbOF0rYVsyXSkvcix0WzFdPShhWzZdK2FbOV0pL3IsdFsyXT0uMjUqciksdH0sby5mcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdLGw9YVsyXSxlPWFbM10sTT1vK28scz11K3UsaT1sK2wsYz1vKk0saD1vKnMsUz1vKmksST11KnMsZj11KmkseD1sKmksRD1lKk0sRj1lKnMsbT1lKmksZD1yWzBdLGI9clsxXSx2PXJbMl07cmV0dXJuIHRbMF09KDEtKEkreCkpKmQsdFsxXT0oaCttKSpkLHRbMl09KFMtRikqZCx0WzNdPTAsdFs0XT0oaC1tKSpiLHRbNV09KDEtKGMreCkpKmIsdFs2XT0oZitEKSpiLHRbN109MCx0WzhdPShTK0YpKnYsdFs5XT0oZi1EKSp2LHRbMTBdPSgxLShjK0kpKSp2LHRbMTFdPTAsdFsxMl09blswXSx0WzEzXT1uWzFdLHRbMTRdPW5bMl0sdFsxNV09MSx0fSxvLmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVPcmlnaW49ZnVuY3Rpb24odCxhLG4scixvKXtcbiAgICB2YXIgdT1hWzBdLGw9YVsxXSxlPWFbMl0sTT1hWzNdLHM9dSt1LGk9bCtsLGM9ZStlLGg9dSpzLFM9dSppLEk9dSpjLGY9bCppLHg9bCpjLEQ9ZSpjLEY9TSpzLG09TSppLGQ9TSpjLGI9clswXSx2PXJbMV0sej1yWzJdLHA9b1swXSx3PW9bMV0sRT1vWzJdO3JldHVybiB0WzBdPSgxLShmK0QpKSpiLHRbMV09KFMrZCkqYix0WzJdPShJLW0pKmIsdFszXT0wLHRbNF09KFMtZCkqdix0WzVdPSgxLShoK0QpKSp2LHRbNl09KHgrRikqdix0WzddPTAsdFs4XT0oSSttKSp6LHRbOV09KHgtRikqeix0WzEwXT0oMS0oaCtmKSkqeix0WzExXT0wLHRbMTJdPW5bMF0rcC0odFswXSpwK3RbNF0qdyt0WzhdKkUpLHRbMTNdPW5bMV0rdy0odFsxXSpwK3RbNV0qdyt0WzldKkUpLHRbMTRdPW5bMl0rRS0odFsyXSpwK3RbNl0qdyt0WzEwXSpFKSx0WzE1XT0xLHR9LG8uZnJvbVF1YXQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bituLGU9cityLE09bytvLHM9bipsLGk9cipsLGM9ciplLGg9bypsLFM9byplLEk9bypNLGY9dSpsLHg9dSplLEQ9dSpNO3JldHVybiB0WzBdPTEtYy1JLHRbMV09aStELHRbMl09aC14LHRbM109MCx0WzRdPWktRCx0WzVdPTEtcy1JLHRbNl09UytmLHRbN109MCx0WzhdPWgreCx0WzldPVMtZix0WzEwXT0xLXMtYyx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcnVzdHVtPWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwpe3ZhciBlPTEvKG4tYSksTT0xLyhvLXIpLHM9MS8odS1sKTtyZXR1cm4gdFswXT0yKnUqZSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0yKnUqTSx0WzZdPTAsdFs3XT0wLHRbOF09KG4rYSkqZSx0WzldPShvK3IpKk0sdFsxMF09KGwrdSkqcyx0WzExXT0tMSx0WzEyXT0wLHRbMTNdPTAsdFsxNF09bCp1KjIqcyx0WzE1XT0wLHR9LG8ucGVyc3BlY3RpdmU9ZnVuY3Rpb24odCxhLG4scixvKXt2YXIgdT0xL01hdGgudGFuKGEvMiksbD0xLyhyLW8pO3JldHVybiB0WzBdPXUvbix0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT11LHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0obytyKSpsLHRbMTFdPS0xLHRbMTJdPTAsdFsxM109MCx0WzE0XT0yKm8qcipsLHRbMTVdPTAsdH0sby5wZXJzcGVjdGl2ZUZyb21GaWVsZE9mVmlldz1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1NYXRoLnRhbihhLnVwRGVncmVlcypNYXRoLlBJLzE4MCksdT1NYXRoLnRhbihhLmRvd25EZWdyZWVzKk1hdGguUEkvMTgwKSxsPU1hdGgudGFuKGEubGVmdERlZ3JlZXMqTWF0aC5QSS8xODApLGU9TWF0aC50YW4oYS5yaWdodERlZ3JlZXMqTWF0aC5QSS8xODApLE09Mi8obCtlKSxzPTIvKG8rdSk7cmV0dXJuIHRbMF09TSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT1zLHRbNl09MCx0WzddPTAsdFs4XT0tKChsLWUpKk0qLjUpLHRbOV09KG8tdSkqcyouNSx0WzEwXT1yLyhuLXIpLHRbMTFdPS0xLHRbMTJdPTAsdFsxM109MCx0WzE0XT1yKm4vKG4tciksdFsxNV09MCx0fSxvLm9ydGhvPWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwpe3ZhciBlPTEvKGEtbiksTT0xLyhyLW8pLHM9MS8odS1sKTtyZXR1cm4gdFswXT0tMiplLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPS0yKk0sdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTIqcyx0WzExXT0wLHRbMTJdPShhK24pKmUsdFsxM109KG8rcikqTSx0WzE0XT0obCt1KSpzLHRbMTVdPTEsdH0sby5sb29rQXQ9ZnVuY3Rpb24odCxhLG4sdSl7dmFyIGwsZSxNLHMsaSxjLGgsUyxJLGYseD1hWzBdLEQ9YVsxXSxGPWFbMl0sbT11WzBdLGQ9dVsxXSxiPXVbMl0sdj1uWzBdLHo9blsxXSxwPW5bMl07cmV0dXJuIE1hdGguYWJzKHgtdik8ci5FUFNJTE9OJiZNYXRoLmFicyhELXopPHIuRVBTSUxPTiYmTWF0aC5hYnMoRi1wKTxyLkVQU0lMT04/by5pZGVudGl0eSh0KTooaD14LXYsUz1ELXosST1GLXAsZj0xL01hdGguc3FydChoKmgrUypTK0kqSSksaCo9ZixTKj1mLEkqPWYsbD1kKkktYipTLGU9YipoLW0qSSxNPW0qUy1kKmgsZj1NYXRoLnNxcnQobCpsK2UqZStNKk0pLGY/KGY9MS9mLGwqPWYsZSo9ZixNKj1mKToobD0wLGU9MCxNPTApLHM9UypNLUkqZSxpPUkqbC1oKk0sYz1oKmUtUypsLGY9TWF0aC5zcXJ0KHMqcytpKmkrYypjKSxmPyhmPTEvZixzKj1mLGkqPWYsYyo9Zik6KHM9MCxpPTAsYz0wKSx0WzBdPWwsdFsxXT1zLHRbMl09aCx0WzNdPTAsdFs0XT1lLHRbNV09aSx0WzZdPVMsdFs3XT0wLHRbOF09TSx0WzldPWMsdFsxMF09SSx0WzExXT0wLHRbMTJdPS0obCp4K2UqRCtNKkYpLHRbMTNdPS0ocyp4K2kqRCtjKkYpLHRbMTRdPS0oaCp4K1MqRCtJKkYpLHRbMTVdPTEsdCl9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0NChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiLCBcIit0WzRdK1wiLCBcIit0WzVdK1wiLCBcIit0WzZdK1wiLCBcIit0WzddK1wiLCBcIit0WzhdK1wiLCBcIit0WzldK1wiLCBcIit0WzEwXStcIiwgXCIrdFsxMV0rXCIsIFwiK3RbMTJdK1wiLCBcIit0WzEzXStcIiwgXCIrdFsxNF0rXCIsIFwiK3RbMTVdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpK01hdGgucG93KHRbNF0sMikrTWF0aC5wb3codFs1XSwyKStNYXRoLnBvdyh0WzZdLDIpK01hdGgucG93KHRbN10sMikrTWF0aC5wb3codFs4XSwyKStNYXRoLnBvdyh0WzldLDIpK01hdGgucG93KHRbMTBdLDIpK01hdGgucG93KHRbMTFdLDIpK01hdGgucG93KHRbMTJdLDIpK01hdGgucG93KHRbMTNdLDIpK01hdGgucG93KHRbMTRdLDIpK01hdGgucG93KHRbMTVdLDIpKX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0WzRdPWFbNF0rbls0XSx0WzVdPWFbNV0rbls1XSx0WzZdPWFbNl0rbls2XSx0WzddPWFbN10rbls3XSx0WzhdPWFbOF0rbls4XSx0WzldPWFbOV0rbls5XSx0WzEwXT1hWzEwXStuWzEwXSx0WzExXT1hWzExXStuWzExXSx0WzEyXT1hWzEyXStuWzEyXSx0WzEzXT1hWzEzXStuWzEzXSx0WzE0XT1hWzE0XStuWzE0XSx0WzE1XT1hWzE1XStuWzE1XSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdFs0XT1hWzRdLW5bNF0sdFs1XT1hWzVdLW5bNV0sdFs2XT1hWzZdLW5bNl0sdFs3XT1hWzddLW5bN10sdFs4XT1hWzhdLW5bOF0sdFs5XT1hWzldLW5bOV0sdFsxMF09YVsxMF0tblsxMF0sdFsxMV09YVsxMV0tblsxMV0sdFsxMl09YVsxMl0tblsxMl0sdFsxM109YVsxM10tblsxM10sdFsxNF09YVsxNF0tblsxNF0sdFsxNV09YVsxNV0tblsxNV0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdFs0XT1hWzRdKm4sdFs1XT1hWzVdKm4sdFs2XT1hWzZdKm4sdFs3XT1hWzddKm4sdFs4XT1hWzhdKm4sdFs5XT1hWzldKm4sdFsxMF09YVsxMF0qbix0WzExXT1hWzExXSpuLHRbMTJdPWFbMTJdKm4sdFsxM109YVsxM10qbix0WzE0XT1hWzE0XSpuLHRbMTVdPWFbMTVdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0WzRdPWFbNF0rbls0XSpyLHRbNV09YVs1XStuWzVdKnIsdFs2XT1hWzZdK25bNl0qcix0WzddPWFbN10rbls3XSpyLHRbOF09YVs4XStuWzhdKnIsdFs5XT1hWzldK25bOV0qcix0WzEwXT1hWzEwXStuWzEwXSpyLHRbMTFdPWFbMTFdK25bMTFdKnIsdFsxMl09YVsxMl0rblsxMl0qcix0WzEzXT1hWzEzXStuWzEzXSpyLHRbMTRdPWFbMTRdK25bMTRdKnIsdFsxNV09YVsxNV0rblsxNV0qcix0fSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdJiZ0WzRdPT09YVs0XSYmdFs1XT09PWFbNV0mJnRbNl09PT1hWzZdJiZ0WzddPT09YVs3XSYmdFs4XT09PWFbOF0mJnRbOV09PT1hWzldJiZ0WzEwXT09PWFbMTBdJiZ0WzExXT09PWFbMTFdJiZ0WzEyXT09PWFbMTJdJiZ0WzEzXT09PWFbMTNdJiZ0WzE0XT09PWFbMTRdJiZ0WzE1XT09PWFbMTVdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT10WzRdLE09dFs1XSxzPXRbNl0saT10WzddLGM9dFs4XSxoPXRbOV0sUz10WzEwXSxJPXRbMTFdLGY9dFsxMl0seD10WzEzXSxEPXRbMTRdLEY9dFsxNV0sbT1hWzBdLGQ9YVsxXSxiPWFbMl0sdj1hWzNdLHo9YVs0XSxwPWFbNV0sdz1hWzZdLEU9YVs3XSxBPWFbOF0sUD1hWzldLEw9YVsxMF0scT1hWzExXSxSPWFbMTJdLE49YVsxM10sTz1hWzE0XSxZPWFbMTVdO3JldHVybiBNYXRoLmFicyhuLW0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhtKSkmJk1hdGguYWJzKG8tZCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGQpKSYmTWF0aC5hYnModS1iKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoYikpJiZNYXRoLmFicyhsLXYpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyh2KSkmJk1hdGguYWJzKGUteik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGUpLE1hdGguYWJzKHopKSYmTWF0aC5hYnMoTS1wKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoTSksTWF0aC5hYnMocCkpJiZNYXRoLmFicyhzLXcpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhzKSxNYXRoLmFicyh3KSkmJk1hdGguYWJzKGktRSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGkpLE1hdGguYWJzKEUpKSYmTWF0aC5hYnMoYy1BKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoYyksTWF0aC5hYnMoQSkpJiZNYXRoLmFicyhoLVApPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhoKSxNYXRoLmFicyhQKSkmJk1hdGguYWJzKFMtTCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKFMpLE1hdGguYWJzKEwpKSYmTWF0aC5hYnMoSS1xKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoSSksTWF0aC5hYnMocSkpJiZNYXRoLmFicyhmLVIpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhmKSxNYXRoLmFicyhSKSkmJk1hdGguYWJzKHgtTik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHgpLE1hdGguYWJzKE4pKSYmTWF0aC5hYnMoRC1PKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoRCksTWF0aC5hYnMoTykpJiZNYXRoLmFicyhGLVkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhGKSxNYXRoLmFicyhZKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPW4oNCksdT1uKDcpLGw9big4KSxlPXt9O2UuY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LGUucm90YXRpb25Ubz1mdW5jdGlvbigpe3ZhciB0PXUuY3JlYXRlKCksYT11LmZyb21WYWx1ZXMoMSwwLDApLG49dS5mcm9tVmFsdWVzKDAsMSwwKTtyZXR1cm4gZnVuY3Rpb24ocixvLGwpe3ZhciBNPXUuZG90KG8sbCk7cmV0dXJuLS45OTk5OTk+TT8odS5jcm9zcyh0LGEsbyksdS5sZW5ndGgodCk8MWUtNiYmdS5jcm9zcyh0LG4sbyksdS5ub3JtYWxpemUodCx0KSxlLnNldEF4aXNBbmdsZShyLHQsTWF0aC5QSSkscik6TT4uOTk5OTk5PyhyWzBdPTAsclsxXT0wLHJbMl09MCxyWzNdPTEscik6KHUuY3Jvc3ModCxvLGwpLHJbMF09dFswXSxyWzFdPXRbMV0sclsyXT10WzJdLHJbM109MStNLGUubm9ybWFsaXplKHIscikpfX0oKSxlLnNldEF4ZXM9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvKXtyZXR1cm4gdFswXT1yWzBdLHRbM109clsxXSx0WzZdPXJbMl0sdFsxXT1vWzBdLHRbNF09b1sxXSx0WzddPW9bMl0sdFsyXT0tblswXSx0WzVdPS1uWzFdLHRbOF09LW5bMl0sZS5ub3JtYWxpemUoYSxlLmZyb21NYXQzKGEsdCkpfX0oKSxlLmNsb25lPWwuY2xvbmUsZS5mcm9tVmFsdWVzPWwuZnJvbVZhbHVlcyxlLmNvcHk9bC5jb3B5LGUuc2V0PWwuc2V0LGUuaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxlLnNldEF4aXNBbmdsZT1mdW5jdGlvbih0LGEsbil7bj0uNSpuO3ZhciByPU1hdGguc2luKG4pO3JldHVybiB0WzBdPXIqYVswXSx0WzFdPXIqYVsxXSx0WzJdPXIqYVsyXSx0WzNdPU1hdGguY29zKG4pLHR9LGUuZ2V0QXhpc0FuZ2xlPWZ1bmN0aW9uKHQsYSl7dmFyIG49MipNYXRoLmFjb3MoYVszXSkscj1NYXRoLnNpbihuLzIpO3JldHVybiAwIT1yPyh0WzBdPWFbMF0vcix0WzFdPWFbMV0vcix0WzJdPWFbMl0vcik6KHRbMF09MSx0WzFdPTAsdFsyXT0wKSxufSxlLmFkZD1sLmFkZCxlLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9blswXSxNPW5bMV0scz1uWzJdLGk9blszXTtyZXR1cm4gdFswXT1yKmkrbCplK28qcy11Kk0sdFsxXT1vKmkrbCpNK3UqZS1yKnMsdFsyXT11KmkrbCpzK3IqTS1vKmUsdFszXT1sKmktciplLW8qTS11KnMsdH0sZS5tdWw9ZS5tdWx0aXBseSxlLnNjYWxlPWwuc2NhbGUsZS5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuKXtuKj0uNTt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0rbCplLHRbMV09bypNK3UqZSx0WzJdPXUqTS1vKmUsdFszXT1sKk0tciplLHR9LGUucm90YXRlWT1mdW5jdGlvbih0LGEsbil7bio9LjU7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNLXUqZSx0WzFdPW8qTStsKmUsdFsyXT11Kk0rciplLHRbM109bCpNLW8qZSx0fSxlLnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4pe24qPS41O3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTStvKmUsdFsxXT1vKk0tciplLHRbMl09dSpNK2wqZSx0WzNdPWwqTS11KmUsdH0sZS5jYWxjdWxhdGVXPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdO3JldHVybiB0WzBdPW4sdFsxXT1yLHRbMl09byx0WzNdPU1hdGguc3FydChNYXRoLmFicygxLW4qbi1yKnItbypvKSksdH0sZS5kb3Q9bC5kb3QsZS5sZXJwPWwubGVycCxlLnNsZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvLHUsbCxlLE0scz1hWzBdLGk9YVsxXSxjPWFbMl0saD1hWzNdLFM9blswXSxJPW5bMV0sZj1uWzJdLHg9blszXTtyZXR1cm4gdT1zKlMraSpJK2MqZitoKngsMD51JiYodT0tdSxTPS1TLEk9LUksZj0tZix4PS14KSwxLXU+MWUtNj8obz1NYXRoLmFjb3ModSksbD1NYXRoLnNpbihvKSxlPU1hdGguc2luKCgxLXIpKm8pL2wsTT1NYXRoLnNpbihyKm8pL2wpOihlPTEtcixNPXIpLHRbMF09ZSpzK00qUyx0WzFdPWUqaStNKkksdFsyXT1lKmMrTSpmLHRbM109ZSpoK00qeCx0fSxlLnNxbGVycD1mdW5jdGlvbigpe3ZhciB0PWUuY3JlYXRlKCksYT1lLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihuLHIsbyx1LGwsTSl7cmV0dXJuIGUuc2xlcnAodCxyLGwsTSksZS5zbGVycChhLG8sdSxNKSxlLnNsZXJwKG4sdCxhLDIqTSooMS1NKSksbn19KCksZS5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bipuK3IqcitvKm8rdSp1LGU9bD8xL2w6MDtyZXR1cm4gdFswXT0tbiplLHRbMV09LXIqZSx0WzJdPS1vKmUsdFszXT11KmUsdH0sZS5jb25qdWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdFszXT1hWzNdLHR9LGUubGVuZ3RoPWwubGVuZ3RoLGUubGVuPWUubGVuZ3RoLGUuc3F1YXJlZExlbmd0aD1sLnNxdWFyZWRMZW5ndGgsZS5zcXJMZW49ZS5zcXVhcmVkTGVuZ3RoLGUubm9ybWFsaXplPWwubm9ybWFsaXplLGUuZnJvbU1hdDM9ZnVuY3Rpb24odCxhKXt2YXIgbixyPWFbMF0rYVs0XSthWzhdO2lmKHI+MCluPU1hdGguc3FydChyKzEpLHRbM109LjUqbixuPS41L24sdFswXT0oYVs1XS1hWzddKSpuLHRbMV09KGFbNl0tYVsyXSkqbix0WzJdPShhWzFdLWFbM10pKm47ZWxzZXt2YXIgbz0wO2FbNF0+YVswXSYmKG89MSksYVs4XT5hWzMqbytvXSYmKG89Mik7dmFyIHU9KG8rMSklMyxsPShvKzIpJTM7bj1NYXRoLnNxcnQoYVszKm8rb10tYVszKnUrdV0tYVszKmwrbF0rMSksdFtvXT0uNSpuLG49LjUvbix0WzNdPShhWzMqdStsXS1hWzMqbCt1XSkqbix0W3VdPShhWzMqdStvXSthWzMqbyt1XSkqbix0W2xdPShhWzMqbCtvXSthWzMqbytsXSkqbn1yZXR1cm4gdH0sZS5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJxdWF0KFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIpXCJ9LGUuZXhhY3RFcXVhbHM9bC5leGFjdEVxdWFscyxlLmVxdWFscz1sLmVxdWFscyx0LmV4cG9ydHM9ZX0sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoMyk7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSgzKTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYX0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgbz1uZXcgci5BUlJBWV9UWVBFKDMpO3JldHVybiBvWzBdPXQsb1sxXT1hLG9bMl09bixvfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHR9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuWzBdLHRbMV09YVsxXSpuWzFdLHRbMl09YVsyXSpuWzJdLHR9LG8ubXVsPW8ubXVsdGlwbHksby5kaXZpZGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0vblswXSx0WzFdPWFbMV0vblsxXSx0WzJdPWFbMl0vblsyXSx0fSxvLmRpdj1vLmRpdmlkZSxvLmNlaWw9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmNlaWwoYVswXSksdFsxXT1NYXRoLmNlaWwoYVsxXSksdFsyXT1NYXRoLmNlaWwoYVsyXSksdH0sby5mbG9vcj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguZmxvb3IoYVswXSksdFsxXT1NYXRoLmZsb29yKGFbMV0pLHRbMl09TWF0aC5mbG9vcihhWzJdKSx0fSxvLm1pbj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5taW4oYVswXSxuWzBdKSx0WzFdPU1hdGgubWluKGFbMV0sblsxXSksdFsyXT1NYXRoLm1pbihhWzJdLG5bMl0pLHR9LG8ubWF4PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1heChhWzBdLG5bMF0pLHRbMV09TWF0aC5tYXgoYVsxXSxuWzFdKSx0WzJdPU1hdGgubWF4KGFbMl0sblsyXSksdH0sby5yb3VuZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGgucm91bmQoYVswXSksdFsxXT1NYXRoLnJvdW5kKGFbMV0pLHRbMl09TWF0aC5yb3VuZChhWzJdKSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdH0sby5zY2FsZUFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdH0sby5kaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXTtyZXR1cm4gTWF0aC5zcXJ0KG4qbityKnIrbypvKX0sby5kaXN0PW8uZGlzdGFuY2Usby5zcXVhcmVkRGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl07cmV0dXJuIG4qbityKnIrbypvfSxvLnNxckRpc3Q9by5zcXVhcmVkRGlzdGFuY2Usby5sZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdO3JldHVybiBNYXRoLnNxcnQoYSphK24qbityKnIpfSxvLmxlbj1vLmxlbmd0aCxvLnNxdWFyZWRMZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdO3JldHVybiBhKmErbipuK3Iqcn0sby5zcXJMZW49by5zcXVhcmVkTGVuZ3RoLG8ubmVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHR9LG8uaW52ZXJzZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEvYVswXSx0WzFdPTEvYVsxXSx0WzJdPTEvYVsyXSx0fSxvLm5vcm1hbGl6ZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PW4qbityKnIrbypvO3JldHVybiB1PjAmJih1PTEvTWF0aC5zcXJ0KHUpLHRbMF09YVswXSp1LHRbMV09YVsxXSp1LHRbMl09YVsyXSp1KSx0fSxvLmRvdD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdKmFbMF0rdFsxXSphWzFdK3RbMl0qYVsyXX0sby5jcm9zcz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blswXSxlPW5bMV0sTT1uWzJdO3JldHVybiB0WzBdPW8qTS11KmUsdFsxXT11KmwtcipNLHRbMl09ciplLW8qbCx0fSxvLmxlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV0sbD1hWzJdO3JldHVybiB0WzBdPW8rciooblswXS1vKSx0WzFdPXUrciooblsxXS11KSx0WzJdPWwrciooblsyXS1sKSx0fSxvLmhlcm1pdGU9ZnVuY3Rpb24odCxhLG4scixvLHUpe3ZhciBsPXUqdSxlPWwqKDIqdS0zKSsxLE09bCoodS0yKSt1LHM9bCoodS0xKSxpPWwqKDMtMip1KTtyZXR1cm4gdFswXT1hWzBdKmUrblswXSpNK3JbMF0qcytvWzBdKmksdFsxXT1hWzFdKmUrblsxXSpNK3JbMV0qcytvWzFdKmksdFsyXT1hWzJdKmUrblsyXSpNK3JbMl0qcytvWzJdKmksdH0sby5iZXppZXI9ZnVuY3Rpb24odCxhLG4scixvLHUpe3ZhciBsPTEtdSxlPWwqbCxNPXUqdSxzPWUqbCxpPTMqdSplLGM9MypNKmwsaD1NKnU7cmV0dXJuIHRbMF09YVswXSpzK25bMF0qaStyWzBdKmMrb1swXSpoLHRbMV09YVsxXSpzK25bMV0qaStyWzFdKmMrb1sxXSpoLHRbMl09YVsyXSpzK25bMl0qaStyWzJdKmMrb1syXSpoLHR9LG8ucmFuZG9tPWZ1bmN0aW9uKHQsYSl7YT1hfHwxO3ZhciBuPTIqci5SQU5ET00oKSpNYXRoLlBJLG89MipyLlJBTkRPTSgpLTEsdT1NYXRoLnNxcnQoMS1vKm8pKmE7cmV0dXJuIHRbMF09TWF0aC5jb3MobikqdSx0WzFdPU1hdGguc2luKG4pKnUsdFsyXT1vKmEsdH0sby50cmFuc2Zvcm1NYXQ0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1uWzNdKnIrbls3XSpvK25bMTFdKnUrblsxNV07cmV0dXJuIGw9bHx8MSx0WzBdPShuWzBdKnIrbls0XSpvK25bOF0qdStuWzEyXSkvbCx0WzFdPShuWzFdKnIrbls1XSpvK25bOV0qdStuWzEzXSkvbCx0WzJdPShuWzJdKnIrbls2XSpvK25bMTBdKnUrblsxNF0pL2wsdH0sby50cmFuc2Zvcm1NYXQzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl07cmV0dXJuIHRbMF09cipuWzBdK28qblszXSt1Km5bNl0sdFsxXT1yKm5bMV0rbypuWzRdK3Uqbls3XSx0WzJdPXIqblsyXStvKm5bNV0rdSpuWzhdLHR9LG8udHJhbnNmb3JtUXVhdD1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blswXSxlPW5bMV0sTT1uWzJdLHM9blszXSxpPXMqcitlKnUtTSpvLGM9cypvK00qci1sKnUsaD1zKnUrbCpvLWUqcixTPS1sKnItZSpvLU0qdTtyZXR1cm4gdFswXT1pKnMrUyotbCtjKi1NLWgqLWUsdFsxXT1jKnMrUyotZStoKi1sLWkqLU0sdFsyXT1oKnMrUyotTStpKi1lLWMqLWwsdH0sby5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPVtdLHU9W107cmV0dXJuIG9bMF09YVswXS1uWzBdLG9bMV09YVsxXS1uWzFdLG9bMl09YVsyXS1uWzJdLHVbMF09b1swXSx1WzFdPW9bMV0qTWF0aC5jb3Mociktb1syXSpNYXRoLnNpbihyKSx1WzJdPW9bMV0qTWF0aC5zaW4ocikrb1syXSpNYXRoLmNvcyhyKSx0WzBdPXVbMF0rblswXSx0WzFdPXVbMV0rblsxXSx0WzJdPXVbMl0rblsyXSx0fSxvLnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89W10sdT1bXTtyZXR1cm4gb1swXT1hWzBdLW5bMF0sb1sxXT1hWzFdLW5bMV0sb1syXT1hWzJdLW5bMl0sdVswXT1vWzJdKk1hdGguc2luKHIpK29bMF0qTWF0aC5jb3MociksdVsxXT1vWzFdLHVbMl09b1syXSpNYXRoLmNvcyhyKS1vWzBdKk1hdGguc2luKHIpLHRbMF09dVswXStuWzBdLHRbMV09dVsxXStuWzFdLHRbMl09dVsyXStuWzJdLHR9LG8ucm90YXRlWj1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1bXSx1PVtdO3JldHVybiBvWzBdPWFbMF0tblswXSxvWzFdPWFbMV0tblsxXSxvWzJdPWFbMl0tblsyXSx1WzBdPW9bMF0qTWF0aC5jb3Mociktb1sxXSpNYXRoLnNpbihyKSx1WzFdPW9bMF0qTWF0aC5zaW4ocikrb1sxXSpNYXRoLmNvcyhyKSx1WzJdPW9bMl0sdFswXT11WzBdK25bMF0sdFsxXT11WzFdK25bMV0sdFsyXT11WzJdK25bMl0sdH0sby5mb3JFYWNoPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyx1LGwpe3ZhciBlLE07Zm9yKG58fChuPTMpLHJ8fChyPTApLE09bz9NYXRoLm1pbihvKm4rcixhLmxlbmd0aCk6YS5sZW5ndGgsZT1yO00+ZTtlKz1uKXRbMF09YVtlXSx0WzFdPWFbZSsxXSx0WzJdPWFbZSsyXSx1KHQsdCxsKSxhW2VdPXRbMF0sYVtlKzFdPXRbMV0sYVtlKzJdPXRbMl07cmV0dXJuIGF9fSgpLG8uYW5nbGU9ZnVuY3Rpb24odCxhKXt2YXIgbj1vLmZyb21WYWx1ZXModFswXSx0WzFdLHRbMl0pLHI9by5mcm9tVmFsdWVzKGFbMF0sYVsxXSxhWzJdKTtvLm5vcm1hbGl6ZShuLG4pLG8ubm9ybWFsaXplKHIscik7dmFyIHU9by5kb3QobixyKTtyZXR1cm4gdT4xPzA6TWF0aC5hY29zKHUpfSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInZlYzMoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIilcIn0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPWFbMF0sZT1hWzFdLE09YVsyXTtyZXR1cm4gTWF0aC5hYnMobi1sKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMobCkpJiZNYXRoLmFicyhvLWUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhlKSkmJk1hdGguYWJzKHUtTSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKE0pKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0WzNdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYX0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8pe3ZhciB1PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHVbMF09dCx1WzFdPWEsdVsyXT1uLHVbM109byx1fSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHR9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0fSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qblswXSx0WzFdPWFbMV0qblsxXSx0WzJdPWFbMl0qblsyXSx0WzNdPWFbM10qblszXSx0fSxvLm11bD1vLm11bHRpcGx5LG8uZGl2aWRlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdL25bMF0sdFsxXT1hWzFdL25bMV0sdFsyXT1hWzJdL25bMl0sdFszXT1hWzNdL25bM10sdH0sby5kaXY9by5kaXZpZGUsby5jZWlsPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5jZWlsKGFbMF0pLHRbMV09TWF0aC5jZWlsKGFbMV0pLHRbMl09TWF0aC5jZWlsKGFbMl0pLHRbM109TWF0aC5jZWlsKGFbM10pLHR9LG8uZmxvb3I9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmZsb29yKGFbMF0pLHRbMV09TWF0aC5mbG9vcihhWzFdKSx0WzJdPU1hdGguZmxvb3IoYVsyXSksdFszXT1NYXRoLmZsb29yKGFbM10pLHR9LG8ubWluPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1pbihhWzBdLG5bMF0pLHRbMV09TWF0aC5taW4oYVsxXSxuWzFdKSx0WzJdPU1hdGgubWluKGFbMl0sblsyXSksdFszXT1NYXRoLm1pbihhWzNdLG5bM10pLHR9LG8ubWF4PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1heChhWzBdLG5bMF0pLHRbMV09TWF0aC5tYXgoYVsxXSxuWzFdKSx0WzJdPU1hdGgubWF4KGFbMl0sblsyXSksdFszXT1NYXRoLm1heChhWzNdLG5bM10pLHR9LG8ucm91bmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLnJvdW5kKGFbMF0pLHRbMV09TWF0aC5yb3VuZChhWzFdKSx0WzJdPU1hdGgucm91bmQoYVsyXSksdFszXT1NYXRoLnJvdW5kKGFbM10pLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0fSxvLnNjYWxlQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHR9LG8uZGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl0sdT1hWzNdLXRbM107cmV0dXJuIE1hdGguc3FydChuKm4rcipyK28qbyt1KnUpfSxvLmRpc3Q9by5kaXN0YW5jZSxvLnNxdWFyZWREaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXSx1PWFbM10tdFszXTtyZXR1cm4gbipuK3IqcitvKm8rdSp1fSxvLnNxckRpc3Q9by5zcXVhcmVkRGlzdGFuY2Usby5sZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXTtyZXR1cm4gTWF0aC5zcXJ0KGEqYStuKm4rcipyK28qbyl9LG8ubGVuPW8ubGVuZ3RoLG8uc3F1YXJlZExlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdO3JldHVybiBhKmErbipuK3IqcitvKm99LG8uc3FyTGVuPW8uc3F1YXJlZExlbmd0aCxvLm5lZ2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0WzNdPS1hWzNdLHR9LG8uaW52ZXJzZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEvYVswXSx0WzFdPTEvYVsxXSx0WzJdPTEvYVsyXSx0WzNdPTEvYVszXSx0fSxvLm5vcm1hbGl6ZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uKm4rcipyK28qbyt1KnU7cmV0dXJuIGw+MCYmKGw9MS9NYXRoLnNxcnQobCksdFswXT1uKmwsdFsxXT1yKmwsdFsyXT1vKmwsdFszXT11KmwpLHR9LG8uZG90PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF0qYVswXSt0WzFdKmFbMV0rdFsyXSphWzJdK3RbM10qYVszXX0sby5sZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdLGw9YVsyXSxlPWFbM107cmV0dXJuIHRbMF09bytyKihuWzBdLW8pLHRbMV09dStyKihuWzFdLXUpLHRbMl09bCtyKihuWzJdLWwpLHRbM109ZStyKihuWzNdLWUpLHR9LG8ucmFuZG9tPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIGE9YXx8MSx0WzBdPXIuUkFORE9NKCksdFsxXT1yLlJBTkRPTSgpLHRbMl09ci5SQU5ET00oKSx0WzNdPXIuUkFORE9NKCksby5ub3JtYWxpemUodCx0KSxvLnNjYWxlKHQsdCxhKSx0fSxvLnRyYW5zZm9ybU1hdDQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM107cmV0dXJuIHRbMF09blswXSpyK25bNF0qbytuWzhdKnUrblsxMl0qbCx0WzFdPW5bMV0qcituWzVdKm8rbls5XSp1K25bMTNdKmwsdFsyXT1uWzJdKnIrbls2XSpvK25bMTBdKnUrblsxNF0qbCx0WzNdPW5bM10qcituWzddKm8rblsxMV0qdStuWzE1XSpsLHR9LG8udHJhbnNmb3JtUXVhdD1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blswXSxlPW5bMV0sTT1uWzJdLHM9blszXSxpPXMqcitlKnUtTSpvLGM9cypvK00qci1sKnUsaD1zKnUrbCpvLWUqcixTPS1sKnItZSpvLU0qdTtyZXR1cm4gdFswXT1pKnMrUyotbCtjKi1NLWgqLWUsdFsxXT1jKnMrUyotZStoKi1sLWkqLU0sdFsyXT1oKnMrUyotTStpKi1lLWMqLWwsdFszXT1hWzNdLHR9LG8uZm9yRWFjaD1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8sdSxsKXt2YXIgZSxNO2ZvcihufHwobj00KSxyfHwocj0wKSxNPW8/TWF0aC5taW4obypuK3IsYS5sZW5ndGgpOmEubGVuZ3RoLGU9cjtNPmU7ZSs9bil0WzBdPWFbZV0sdFsxXT1hW2UrMV0sdFsyXT1hW2UrMl0sdFszXT1hW2UrM10sdSh0LHQsbCksYVtlXT10WzBdLGFbZSsxXT10WzFdLGFbZSsyXT10WzJdLGFbZSszXT10WzNdO3JldHVybiBhfX0oKSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInZlYzQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIilcIn0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9YVswXSxNPWFbMV0scz1hWzJdLGk9YVszXTtyZXR1cm4gTWF0aC5hYnMobi1lKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMoZSkpJiZNYXRoLmFicyhvLU0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhNKSkmJk1hdGguYWJzKHUtcyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKHMpKSYmTWF0aC5hYnMobC1pKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoaSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoMik7cmV0dXJuIHRbMF09MCx0WzFdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDIpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGF9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEpe3ZhciBuPW5ldyByLkFSUkFZX1RZUEUoMik7cmV0dXJuIG5bMF09dCxuWzFdPWEsbn0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWEsdFsxXT1uLHR9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuWzBdLHRbMV09YVsxXSpuWzFdLHR9LG8ubXVsPW8ubXVsdGlwbHksby5kaXZpZGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0vblswXSx0WzFdPWFbMV0vblsxXSx0fSxvLmRpdj1vLmRpdmlkZSxvLmNlaWw9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmNlaWwoYVswXSksdFsxXT1NYXRoLmNlaWwoYVsxXSksdH0sby5mbG9vcj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguZmxvb3IoYVswXSksdFsxXT1NYXRoLmZsb29yKGFbMV0pLHR9LG8ubWluPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1pbihhWzBdLG5bMF0pLHRbMV09TWF0aC5taW4oYVsxXSxuWzFdKSx0fSxvLm1heD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5tYXgoYVswXSxuWzBdKSx0WzFdPU1hdGgubWF4KGFbMV0sblsxXSksdH0sby5yb3VuZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGgucm91bmQoYVswXSksdFsxXT1NYXRoLnJvdW5kKGFbMV0pLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0fSxvLnNjYWxlQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdH0sby5kaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXTtyZXR1cm4gTWF0aC5zcXJ0KG4qbityKnIpfSxvLmRpc3Q9by5kaXN0YW5jZSxvLnNxdWFyZWREaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXTtyZXR1cm4gbipuK3Iqcn0sby5zcXJEaXN0PW8uc3F1YXJlZERpc3RhbmNlLG8ubGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdO3JldHVybiBNYXRoLnNxcnQoYSphK24qbil9LG8ubGVuPW8ubGVuZ3RoLG8uc3F1YXJlZExlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXTtyZXR1cm4gYSphK24qbn0sby5zcXJMZW49by5zcXVhcmVkTGVuZ3RoLG8ubmVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0fSxvLmludmVyc2U9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xL2FbMF0sdFsxXT0xL2FbMV0sdH0sby5ub3JtYWxpemU9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPW4qbityKnI7cmV0dXJuIG8+MCYmKG89MS9NYXRoLnNxcnQobyksdFswXT1hWzBdKm8sdFsxXT1hWzFdKm8pLHR9LG8uZG90PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF0qYVswXSt0WzFdKmFbMV19LG8uY3Jvc3M9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0qblsxXS1hWzFdKm5bMF07cmV0dXJuIHRbMF09dFsxXT0wLHRbMl09cix0fSxvLmxlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV07cmV0dXJuIHRbMF09bytyKihuWzBdLW8pLHRbMV09dStyKihuWzFdLXUpLHR9LG8ucmFuZG9tPWZ1bmN0aW9uKHQsYSl7YT1hfHwxO3ZhciBuPTIqci5SQU5ET00oKSpNYXRoLlBJO3JldHVybiB0WzBdPU1hdGguY29zKG4pKmEsdFsxXT1NYXRoLnNpbihuKSphLHR9LG8udHJhbnNmb3JtTWF0Mj1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bMl0qbyx0WzFdPW5bMV0qcituWzNdKm8sdH0sby50cmFuc2Zvcm1NYXQyZD1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bMl0qbytuWzRdLHRbMV09blsxXSpyK25bM10qbytuWzVdLHR9LG8udHJhbnNmb3JtTWF0Mz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bM10qbytuWzZdLHRbMV09blsxXSpyK25bNF0qbytuWzddLHR9LG8udHJhbnNmb3JtTWF0ND1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV07cmV0dXJuIHRbMF09blswXSpyK25bNF0qbytuWzEyXSx0WzFdPW5bMV0qcituWzVdKm8rblsxM10sdH0sby5mb3JFYWNoPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyx1LGwpe3ZhciBlLE07Zm9yKG58fChuPTIpLHJ8fChyPTApLE09bz9NYXRoLm1pbihvKm4rcixhLmxlbmd0aCk6YS5sZW5ndGgsZT1yO00+ZTtlKz1uKXRbMF09YVtlXSx0WzFdPWFbZSsxXSx1KHQsdCxsKSxhW2VdPXRbMF0sYVtlKzFdPXRbMV07cmV0dXJuIGF9fSgpLG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwidmVjMihcIit0WzBdK1wiLCBcIit0WzFdK1wiKVwifSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PWFbMF0sbD1hWzFdO3JldHVybiBNYXRoLmFicyhuLXUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyh1KSkmJk1hdGguYWJzKG8tbCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGwpKX0sdC5leHBvcnRzPW99XSl9KTsiLCIvKipcbiAqIENhbnZhcyBSZW5kZXJpbmcgU3VyZmFjZS5cbiAqIEl0IGlzIGEgdG9wIGxldmVsIGNvbXBvbmVudCB0aGF0IGNvbWJpbmVzIGl0IGFsbCB0b2dldGhlciBhbmQgaGlkZXMgdW5uZWNlc3NhcnkgZGV0YWlscy5cbiAqXG4gKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNTdXJmYWNlKGNhbnZhcylcbntcbiAgICBpZiAoICEgKGNhbnZhcyBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGFzc2VkIGNhbnZhcyBpcyBub3QgSFRNTENhbnZhc0VsZW1lbnQhJyk7XG4gICAgfVxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMuZmFjdG9yeSA9IG5ldyBDYW52YXNVSUZhY3RvcnkodGhpcy5jb250ZXh0KTtcbiAgICB0aGlzLmVsZW1lbnRzID0gbmV3IFVJQ29sbGVjdGlvbigpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKHRoaXMuZmFjdG9yeS5jcmVhdGVMYWJlbCgpKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlciA9IG5ldyBDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyKHRoaXMpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLmJpbmRIdG1sQ2FudmFzRXZlbnRzKCk7XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGlzIGEgZmxhZyBmb3IgZGV0ZWN0aW5nIGlmIHdlIGFyZSBleHBvcnRpbmdcbiAgICAgKiByZXN1bHQgaW1hZ2UgYXMgZmluYWwgdGV4dHVyZS5cbiAgICAgKlxuICAgICAqIElmIHRoaXMgaXMgdHJ1ZSwgdGhlbiB3ZSBzaG91bGRuJ3Qgc2hvdyBhbnlcbiAgICAgKiBzZWxlY3Rpb24gYm9yZGVyc1xuICAgICAqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlciA9IGZhbHNlO1xuXG4gICAgdGhpcy5jbGVhckNvbG9yID0gJyNGRkZGRkYnO1xufVxuXG4vKipcbiAqIFJldHVybnMgVUlDb2xsZWN0aW9uIHJlbGF0ZWQgdG8gdGhlIHN1cmZhY2UuXG4gKiBcbiAqIEByZXR1cm5zIHtVSUNvbGxlY3Rpb259XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBsYWJlbCBlbGVtZW50IGluIHVpIGNvbGxlY3Rpb24gb2YgdGhlIHN1cmZhY2UgYW5kIHJldHVybnMgaXQuXG4gKiBcbiAqIEByZXR1cm5zIHtVSUxhYmVsRWxlbWVudH1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucHVzaExhYmVsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYWJlbCA9IHRoaXMuZmFjdG9yeS5jcmVhdGVMYWJlbCgpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKGxhYmVsKTtcbiAgICB0aGlzLmVsZW1lbnRzLnNlbGVjdExhc3QoKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJTZWxlY3QobGFiZWwpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGltYWdlIGVsZW1lbnQgaW4gdWkgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnB1c2hJbWFnZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgIHZhciBpbWFnZUVsZW1lbnQgPSB0aGlzLmZhY3RvcnkuY3JlYXRlSW1hZ2UoaW1hZ2UpO1xuICAgIHRoaXMuZWxlbWVudHMuYWRkKGltYWdlRWxlbWVudCk7XG4gICAgdGhpcy5lbGVtZW50cy5zZWxlY3RMYXN0KCk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyU2VsZWN0KGltYWdlRWxlbWVudCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENsZWFyIHRoZSByZWxhdGVkIGNhbnZhcy5cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY2xlYXJDb2xvcjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNsZWFyIGNvbG9yXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgdGhpcy5jbGVhckNvbG9yID0gY29sb3I7XG59O1xuXG4vKipcbiAqIFJlbmRlcnMgYWxsIG9mIHRoZSBlbGVtZW50cyBvbiB0aGUgc3VyZmFjZS5cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyRWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGVjdGVkSW5kZXggPSB0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5nZXQoaSkucmVuZGVyKCk7XG5cbiAgICAgICAgaWYgKGkgPT0gc2VsZWN0ZWRJbmRleCAmJiAhIHRoaXMuX2lzRXhwb3J0aW5nUmVuZGVyKSB7XG5cbiAgICAgICAgICAgIC8vIFdlIGNhbGwgaXQgJ2tvc3R5bCdcbiAgICAgICAgICAgIC8vIFdlaXJkIHdheSB0byBzZXQgY29sb3JcbiAgICAgICAgICAgIHZhciBjb2xvciA9ICcjZmZmZmZmJztcbiAgICAgICAgICAgIGlmICh0aGlzLmNsZWFyQ29sb3IudG9Mb3dlckNhc2UoKSA9PSAnI2ZmZmZmZicpIHtcbiAgICAgICAgICAgICAgICBjb2xvciA9ICcjMmU2ZGE0JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbmV3IENhbnZhc1VJU2VsZWN0ZWRWaWV3KHRoaXMuY29udGV4dCwge1xuICAgICAgICAgICAgICAgIC8vIGtpbmRhIGZlZWxzIGxpa2UgaGFyZCBjb2RlXG4gICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICAgICAgICAgIHNpemU6IDE1XG4gICAgICAgICAgICB9KS5yZW5kZXIodGhpcy5lbGVtZW50cy5nZXQoaSkpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBDbGVhcnMgdGhlIHN1cmZhY2UgYW5kIHJlbmRlcnMgaXQgd2l0aCBhbGwgZWxlbWVudHMuXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gICAgdGhpcy5yZW5kZXJFbGVtZW50cygpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gaW1hZ2UgZnJvbSBkcmF3biBjb250ZW50XG4gKiBAcmV0dXJucyB7SW1hZ2V9XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnRvSW1hZ2UgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlciA9IHRydWU7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLnNyYyA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgpO1xuXG4gICAgdGhpcy5faXNFeHBvcnRpbmdSZW5kZXIgPSBmYWxzZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgcmV0dXJuIGltYWdlO1xufTtcblxuLyoqXG4gKiBNb3ZlcyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudCB0byB0aGUgYmFja2dyb3VuZFxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5zZWxlY3RlZFRvQmFja2dyb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVsZW1lbnRzLnRvU3RhcnQodGhpcy5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCkpO1xufTtcblxuLyoqXG4gKiBNb3ZlcyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudCB0byB0aGUgZm9yZWdyb3VuZFxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5zZWxlY3RlZFRvRm9yZWdyb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVsZW1lbnRzLnRvRW5kKHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudFxuICpcbiAqIEByZXR1cm4ge1VJRWxlbWVudH1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVtb3ZlU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRzLnJlbW92ZSh0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlc2VsZWN0KCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQWRkcyBuZXcgZXZlbnQgaGFuZGxlciBvbiBzZWxlY3Rpb24gb2YgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7VUlTZWxlY3RlZENhbGxiYWNrfSBjYWxsYmFja1xuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5hZGRTZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5hZGRTZWxlY3RFdmVudEhhbmRsZXIoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5hZGREZXNlbGVjdEV2ZW50SGFuZGxlcihjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEdldCBjYW52YXMgYm91bmQgcmVjdGFuZ2xlLlxuICogS2luZGEgdWdseSBtZXRob2QuXG4gKlxuICogQHJldHVybnMge3t0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsIGxlZnQ6IG51bWJlcn19XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b3A6IDAsXG4gICAgICAgIHJpZ2h0OiB0aGlzLmNhbnZhcy53aWR0aCxcbiAgICAgICAgYm90dG9tOiB0aGlzLmNhbnZhcy5oZWlnaHQsXG4gICAgICAgIGxlZnQ6IDBcbiAgICB9O1xufTtcblxuLyoqXG4gKiBDYWxsYmFjayB0eXBlIGZvciBzZWxlY3RpbmcgYW5kIGVsZW1lbnRcbiAqXG4gKiBAY2FsbGJhY2sgVUlTZWxlY3RlZENhbGxiYWNrXG4gKiBAcGFyYW0ge1VJRWxlbWVudH1cbiAqLyIsIi8qKlxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgRE9NIGV2ZW50cyBhbmQgdHJpZ2dlcmluZyBhcHBsaWNhdGlvbiBldmVudHNcbiAqIEtpbmRhIHVnbHkgY29kZSBoZXJlXG4gKlxuICogQHBhcmFtIHtDYW52YXNTdXJmYWNlfSBzdXJmYWNlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlciAoc3VyZmFjZSlcbntcbiAgICB0aGlzLnN1cmZhY2UgPSBzdXJmYWNlO1xuICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGZhbHNlO1xuICAgIHRoaXMubGFzdENsaWNrT2Zmc2V0ID0gbnVsbDtcbiAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IG51bGw7XG5cbiAgICB0aGlzLmhhbmRsZXJzID0ge1xuICAgICAgICBvblNlbGVjdDogW10sXG4gICAgICAgIG9uRGVzZWxlY3Q6IFtdXG4gICAgfVxufVxuXG4vKipcbiAqIEJpbmRzIGFsbCBldmVudCBoYW5kbGVycyB0byB0aGUgSFRNTCBjYW52YXNcbiAqIFxuICogQHBhcmFtIGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuYmluZEh0bWxDYW52YXNFdmVudHMgPSBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XG5cbiAgICAvLyBXZSBiaW5kaW5nIHRoaXMgZXZlbnQgdG8gdGhlIHdob2xlIGRvY3VtZW50IHRvIHN0b3AgbW92aW5nXG4gICAgLy8gaWYgdXNlciB0cmllcyB0byBkcmFnIGFuIGVsZW1lbnQgb3V0IG9mIHRoZSBjYW52YXNcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xuXG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcykpO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VycyBzZWxlY3QgZXZlbnQuXG4gKiBUaGlzIG1lYW5zIHRoYXQgYWxsIGFzc2lnbmVkIGhhbmRsZXJzIHdpbGwgYmUgZXhlY3V0ZWQuXG4gKlxuICogVE9ETzogQWJhbmRvbiBKYXZhU2NyaXB0IGFuZCBsZWFybiBUeXBlU2NyaXB0XG4gKlxuICogQHBhcmFtIHtVSUVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudHJpZ2dlclNlbGVjdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaGFuZGxlcnMub25TZWxlY3QpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5oYW5kbGVycy5vblNlbGVjdFtrZXldO1xuXG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhlbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogVHJpZ2dlcnMgZGVzZWxlY3QgZXZlbnQuXG4gKiBUaGlzIG1lYW5zIHRoYXQgYWxsIGFzc2lnbmVkIGhhbmRsZXJzIHdpbGwgYmUgZXhlY3V0ZWQuXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXJEZXNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0KSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdFtrZXldO1xuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogQWRkcyBuZXcgaGFuZGxlciBvbiBlbGVtZW50IHNlbGVjdGlvbiBldmVudFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZFNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuaGFuZGxlcnMub25TZWxlY3QucHVzaChjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqIEFkZHMgbmV3IGhhbmRsZXIgb24gZWxlbWVudCBkZXNlbGVjdGlvbiBldmVudFxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0LnB1c2goY2FsbGJhY2spO1xufTtcblxuXG4vKipcbiAqIEhhbmRsZXIgZm9yIHRoZSBtb3VzZWRvd24gZXZlbnRcbiAqXG4gKiBAcGFyYW0gZVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuaXNNb3VzZURvd24gPSB0cnVlO1xuXG4gICAgLy8gUXVpY2sgaGFja1xuICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGUgPSBlLnRvdWNoZXNbMF07XG4gICAgfVxuXG4gICAgdmFyIGxvY2FsQ29vcmRpbmF0ZXMgPSB0aGlzLnRvTG9jYWxDb29yZGluYXRlcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgdmFyIG9sZFNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc3VyZmFjZS5nZXRFbGVtZW50cygpLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICB2YXIgbmV3U2VsZWN0ZWRJbmRleCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5mZXRjaEluZGV4QnlPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xuICAgIHZhciBuZXdTZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0KG5ld1NlbGVjdGVkSW5kZXgpO1xuXG4gICAgdmFyIGRvV2VIYXZlU29tZXRoaW5nU2VsZWN0ZWQgPSBuZXdTZWxlY3RlZEluZGV4ICE9PSBudWxsO1xuICAgIHZhciBpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUgPSBkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkICYmXG4gICAgICAgIG9sZFNlbGVjdGVkRWxlbWVudCA9PSBuZXdTZWxlY3RlZEluZGV4O1xuXG4gICAgaWYgKCFkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkKSB7XG5cbiAgICAgICAgLy8gSWYgd2UgaGFkIHNvbWV0aGluZyBzZWxlY3RlZCBiZWZvcmUsXG4gICAgICAgIC8vIGl0IG1lYW5zIGl0IGlzIHRpbWUgdG8gY2FsbCBkZXNlbGVjdCBoYW5kbGVyc1xuICAgICAgICBpZiAob2xkU2VsZWN0ZWRFbGVtZW50ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckRlc2VsZWN0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZGVzZWxlY3QoKTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSkge1xuICAgICAgICB0aGlzLnRyaWdnZXJTZWxlY3QobmV3U2VsZWN0ZWRFbGVtZW50KTtcbiAgICB9XG5cbiAgICAvLyBXZSByZW1lbWJlciBoZXJlIHRoZSBsYXN0IGNsaWNrIG9mZnNldCByZWxhdGl2ZWx5IHNlbGVjdGVkIGVsZW1lbnRcbiAgICB0aGlzLmxhc3RDbGlja09mZnNldCA9IG5ld1NlbGVjdGVkRWxlbWVudC5nZXRDbGlja09mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XG5cbiAgICAvLyBJcyBpdCBhIGNsaWNrIHN0YXJ0aW5nIHJlc2l6ZSBvcGVyYXRpb24gP1xuICAgIHRoaXMuaXNSZXNpemluZ0NsaWNrID0gaXNDdXJyZW50bHlTZWxlY3RlZFdhc1NlbGVjdGVkQmVmb3JlICYmXG4gICAgICAgIHRoaXMuaXNSZXNpemVQb3NzaWJsZShuZXdTZWxlY3RlZEVsZW1lbnQsIGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcblxuICAgIGlmICh0aGlzLmlzUmVzaXppbmdDbGljaykge1xuICAgICAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IGxvY2FsQ29vcmRpbmF0ZXM7XG4gICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUodHJ1ZSk7XG4gICAgfVxuICAgIC8vIEl0IGlzIGEgY2xpY2sgZm9yIG1vdmluZ1xuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSB0cnVlO1xuICAgICAgICB0aGlzLnN1cmZhY2UuZWxlbWVudHMuc2VsZWN0KG5ld1NlbGVjdGVkSW5kZXgpO1xuICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZSh0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnN1cmZhY2UucmVuZGVyKCk7XG59O1xuXG4vKipcbiAqXG4gKiBIYW5kbGVyIGZvciBtb3VzZSB1cCBldmVudFxuICpcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZVVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyBjb29yZGluYXRlcyB0byBjb29yZGluYXRlcyBpbnNpZGUgY2FudmFzXG4gKlxuICogQHBhcmFtIGNsaWVudFhcbiAqIEBwYXJhbSBjbGllbnRZXG4gKiBAcmV0dXJucyB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudG9Mb2NhbENvb3JkaW5hdGVzID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICB2YXIgdmlld3BvcnRPZmZzZXQgPSB0aGlzLnN1cmZhY2UuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIC8vIHRoZXNlIGFyZSByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnQsIGkuZS4gdGhlIHdpbmRvd1xuICAgIHZhciB0b3AgPSB2aWV3cG9ydE9mZnNldC50b3A7XG4gICAgdmFyIGxlZnQgPSB2aWV3cG9ydE9mZnNldC5sZWZ0O1xuICAgIHZhciB0b3BPZmZzZXQgPSBjbGllbnRZIC0gdG9wO1xuICAgIHZhciBsZWZ0T2Zmc2V0ID0gY2xpZW50WCAtIGxlZnQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBsZWZ0T2Zmc2V0LFxuICAgICAgICB5OiB0b3BPZmZzZXRcbiAgICB9O1xufTtcblxuLyoqXG4gKiBIYW5kbGVyIGZvciBtb3VzZSBtb3ZlIGV2ZW50XG4gKlxuICogQHBhcmFtIGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcblxuICAgIC8vIFF1aWNrIGhhY2tcbiAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT0gXCJ1bmRlZmluZWRcIiAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xuICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xuICAgIH1cblxuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKTtcbiAgICB2YXIgbG9jYWxDb29yZGluYXRlcyA9IHRoaXMudG9Mb2NhbENvb3JkaW5hdGVzKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICB2YXIgZWxlbWVudEhvdmVySW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZmV0Y2hJbmRleEJ5T2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcblxuICAgIC8vIEl0IGlzIHNpbXBsZSBtb3VzZSBtb3ZlLFxuICAgIC8vIHdlIGhhdmUgbm90aGluZyBtb3JlIHRvIGRvIGhlcmVcbiAgICBpZiAoIXRoaXMuaXNNb3VzZURvd24pIHtcbiAgICAgICAgdGhpcy5oYW5kbGVNb3VzZU1vdmVXaXRob3V0TW91c2VEb3duKGVsZW1lbnRIb3ZlckluZGV4LCBzZWxlY3RlZEluZGV4LCBsb2NhbENvb3JkaW5hdGVzKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRFbGVtZW50KCk7XG5cbiAgICAvLyBJZiB3ZSBhcmUgaGVyZSwgdGhlbiB3ZSBoYXZlIGJ1dHRvbiBwcmVzc2VkIGFuZCB3ZSBtdXN0IHJlc2l6ZSFcbiAgICBpZiAodGhpcy5pc1Jlc2l6aW5nQ2xpY2spIHtcbiAgICAgICAgdmFyIG5ld1NpemVEZWx0YSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBsb2NhbENvb3JkaW5hdGVzLnggLSB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcy54LFxuICAgICAgICAgICAgaGVpZ2h0OiBsb2NhbENvb3JkaW5hdGVzLnkgLSB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcy55XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBsb2NhbENvb3JkaW5hdGVzO1xuXG4gICAgICAgIHZhciBzaXplID0gc2VsZWN0ZWRFbGVtZW50LmdldFNpemUoKTtcbiAgICAgICAgc2l6ZS5yZXNpemVCeShuZXdTaXplRGVsdGEud2lkdGgsIG5ld1NpemVEZWx0YS5oZWlnaHQpO1xuICAgIH1cbiAgICAvLyBOYWgsIGl0J3MganVzdCBtb3ZpbmdcbiAgICBlbHNlIGlmICh0aGlzLmlzTW92aW5nQ2xpY2spIHtcbiAgICAgICAgc2VsZWN0ZWRFbGVtZW50Lm1vdmVUbyhuZXcgUG9zaXRpb24oXG4gICAgICAgICAgICBsb2NhbENvb3JkaW5hdGVzLnggLSB0aGlzLmxhc3RDbGlja09mZnNldC50b3AsXG4gICAgICAgICAgICBsb2NhbENvb3JkaW5hdGVzLnkgLSB0aGlzLmxhc3RDbGlja09mZnNldC5sZWZ0XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcbn07XG5cbi8qKlxuICogQWRkcyBtb3ZhYmxlIGh0bWwgY2xhc3MgdG8gdGhlIGNhbnZhcyBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSBib29sXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnNldE1vdmFibGVTdGF0ZSA9IGZ1bmN0aW9uIChib29sKSB7XG4gICAgaWYgKGJvb2wpIHtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QuYWRkKCdtb3ZhYmxlJyk7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgncmVzaXphYmxlJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ21vdmFibGUnKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEFkZHMgcmVzaXphYmxlIGh0bWwgY2xhc3MgdG8gdGhlIGNhbnZhcyBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSBib29sXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnNldFJlc2l6YWJsZVN0YXRlID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgICBpZiAoYm9vbCkge1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ21vdmFibGUnKTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QuYWRkKCdyZXNpemFibGUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgncmVzaXphYmxlJyk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGVzIG1vdXNlIG1vdmUgZXZlbnQgd2hlbiBtb3VzZSBidXR0b24gaXMgbm90IHByZXNzZWRcbiAqXG4gKiBAcGFyYW0gZWxlbWVudEhvdmVySW5kZXhcbiAqIEBwYXJhbSBzZWxlY3RlZEluZGV4XG4gKiBAcGFyYW0gbW91c2VDb29yZGluYXRlc1xuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZU1vdmVXaXRob3V0TW91c2VEb3duID0gZnVuY3Rpb24gKGVsZW1lbnRIb3ZlckluZGV4LCBzZWxlY3RlZEluZGV4LCBtb3VzZUNvb3JkaW5hdGVzKSB7XG4gICAgaWYgKGVsZW1lbnRIb3ZlckluZGV4ID09IHNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgLy8gV2hhdCBzdGF0ZSBpcyBjdXJzb3IgaW4/XG4gICAgICAgIHZhciByZXNpemVTdGF0ZSA9IHRoaXMuaXNSZXNpemVQb3NzaWJsZSh0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRFbGVtZW50KCksIG1vdXNlQ29vcmRpbmF0ZXMueCwgbW91c2VDb29yZGluYXRlcy55KTtcbiAgICAgICAgaWYgKHJlc2l6ZVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNldFJlc2l6YWJsZVN0YXRlKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRNb3ZhYmxlU3RhdGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc2V0TW92YWJsZVN0YXRlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5zZXRSZXNpemFibGVTdGF0ZShmYWxzZSk7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBwYXNzZWQgY29vcmRpbmF0ZXMgYXJlIGxvY2F0ZWQgb24gcG9zaXRpb24gb2YgZHJhZyBpY29uIG9mIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gZWxlbWVudFxuICogQHBhcmFtIHhcbiAqIEBwYXJhbSB5XG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmlzUmVzaXplUG9zc2libGUgPSBmdW5jdGlvbihlbGVtZW50LCB4LCB5KSB7XG4gICAgdmFyIGRyYWdJY29uU2l6ZSA9IDEwO1xuXG4gICAgdmFyIHRlbXBFbGVtZW50RGF0YSA9IHtcbiAgICAgICAgcG9zaXRpb246IG5ldyBQb3NpdGlvbihcbiAgICAgICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpIC0gZHJhZ0ljb25TaXplLFxuICAgICAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpIC0gZHJhZ0ljb25TaXplXG4gICAgICAgICksXG4gICAgICAgIHNpemU6IG5ldyBTaXplKGRyYWdJY29uU2l6ZSwgZHJhZ0ljb25TaXplKVxuICAgIH07XG5cbiAgICB2YXIgdGVtcEVsZW1lbnQgPSBuZXcgVUlFbGVtZW50KHRlbXBFbGVtZW50RGF0YS5wb3NpdGlvbiwgdGVtcEVsZW1lbnREYXRhLnNpemUpO1xuICAgIHJldHVybiB0ZW1wRWxlbWVudC5pc09mZnNldEluKHgsIHkpO1xufTsiLCIvKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1VJRWxlbWVudFZpZXcoY29udGV4dCkge1xuICAgIGlmICggISAoY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIFVJIEVsZW1lbnQgVmlldyBlcnJvciEgQ29udGV4dCBpcyBub3QgYSBjb250ZXh0Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cbiAgICAgKi9cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xufVxuXG5DYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xuXG5DYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG59OyIsIi8qKlxuICpcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlGYWN0b3J5KGNvbnRleHQpXG57XG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgcmVuZGVyaW5nIGNvbnRleHQgbXVzdCBiZSBpbnN0YW5jZSBvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhIChmYWN0b3J5IGNyZWF0aW5nKScpO1xuICAgIH1cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBsYWJlbCBlbGVtZW50LCB3aGljaCBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBvbiB0aGUgY2FudmFzXG4gKlxuICogQHJldHVybnMge1VJTGFiZWxFbGVtZW50fVxuICovXG5DYW52YXNVSUZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUxhYmVsID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGxhYmVsID0gbmV3IFVJTGFiZWxFbGVtZW50KG5ldyBQb3NpdGlvbigwLCA1MCkpO1xuICAgIGxhYmVsLnNldFZpZXcobmV3IENhbnZhc1VJTGFiZWxWaWV3KHRoaXMuY29udGV4dCkpO1xuXG4gICAgcmV0dXJuIGxhYmVsO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGltYWdlIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcbiAqXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxuICovXG5DYW52YXNVSUZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUltYWdlID0gZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgdmFyIGltYWdlRWxlbWVudCA9IG5ldyBVSUltYWdlRWxlbWVudChudWxsLCBudWxsLCBpbWFnZSk7XG4gICAgaW1hZ2VFbGVtZW50LnNldFZpZXcobmV3IENhbnZhc1VJSW1hZ2VWaWV3KHRoaXMuY29udGV4dCkpO1xuXG4gICAgcmV0dXJuIGltYWdlRWxlbWVudDtcbn07IiwiLyoqXG4gKiBWaWV3IG9mIGFuIGltYWdlIGVsZW1lbnQgb24gdGhlIGNhbnZhc1xuICpcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlJbWFnZVZpZXcoY29udGV4dCkge1xuICAgIENhbnZhc1VJRWxlbWVudFZpZXcuY2FsbCh0aGlzLCBjb250ZXh0KTtcbn1cblxuQ2FudmFzVUlJbWFnZVZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XG5cbi8qKlxuICogUmVuZGVycyBhbiBpbWFnZSBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtVSUltYWdlRWxlbWVudH0gdWlJbWFnZUVsZW1lbnRcbiAqL1xuQ2FudmFzVUlJbWFnZVZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICh1aUltYWdlRWxlbWVudCkge1xuICAgIHZhciBwb3MgPSB1aUltYWdlRWxlbWVudC5nZXRQb3NpdGlvbigpO1xuICAgIHZhciBzaXplID0gdWlJbWFnZUVsZW1lbnQuZ2V0U2l6ZSgpO1xuXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcbiAgICAgICAgdWlJbWFnZUVsZW1lbnQuZ2V0SW1hZ2UoKSxcbiAgICAgICAgcG9zLmdldFgoKSxcbiAgICAgICAgcG9zLmdldFkoKSxcbiAgICAgICAgc2l6ZS5nZXRXaWR0aCgpLFxuICAgICAgICBzaXplLmdldEhlaWdodCgpXG4gICAgKTtcbn07IiwiLyoqXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSUxhYmVsVmlldyhjb250ZXh0KSB7XG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xufVxuXG5DYW52YXNVSUxhYmVsVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcblxuLyoqXG4gKiBSZW5kZXJzIHRleHQgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7VUlMYWJlbEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuQ2FudmFzVUlMYWJlbFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgLy8gT3VyIHRleHQgc2l6ZSBmaXRzIGJvdW5kc1xuICAgIHZhciBmb250U2l6ZSA9IGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpO1xuXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBmb250U2l6ZSArIFwicHggXCIgKyBlbGVtZW50LmdldEZvbnQoKTtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gZWxlbWVudC5nZXRDb2xvcigpO1xuICAgIHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnaGFuZ2luZyc7XG5cbiAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoXG4gICAgICAgIGVsZW1lbnQuZ2V0VGV4dCgpLFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpXG4gICAgKTtcbn07IiwiLyoqXG4gKiBCYXNlIHZpZXcgZm9yIHNlbGVjdGVkIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxuICogQHBhcmFtIHt7Y29sb3I6IHN0cmluZ30sIHtzaXplOiBpbnR9fSBzdHlsZSAtIGljb24gc2l6ZSBhbmQgaGV4IGNvbG9yIHN0cmluZ1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1VJU2VsZWN0ZWRWaWV3KGNvbnRleHQsIHN0eWxlKSB7XG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgVUkgRWxlbWVudCBWaWV3IGVycm9yISBDb250ZXh0IGRvZXMgbm90IGhhdmUgdHlwZSBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhJyk7XG4gICAgfVxuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICB0aGlzLmZpbGxTdHlsZSA9IHN0eWxlLmNvbG9yIHx8ICcjQUFBQUFBJztcbiAgICB0aGlzLnJlc2l6ZUljb25XaWR0aCA9IHN0eWxlLnNpemUgfHwgMTU7XG59XG5cbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xuXG5DYW52YXNVSVNlbGVjdGVkVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcblxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5yZXNpemVJY29uV2lkdGggKyBcInB4IEFyaWFsXCI7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZmlsbFN0eWxlO1xuICAgIHRoaXMuY29udGV4dC50ZXh0QmFzZWxpbmUgPSAnYm90dG9tJztcblxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcbiAgICAgICAgQ2FudmFzVUlTZWxlY3RlZFZpZXcuUmVzaXplU3ltYm9sLFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSAtIHRoaXMucmVzaXplSWNvbldpZHRoLFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCksXG4gICAgICAgIHRoaXMucmVzaXplSWNvbldpZHRoXG4gICAgKTtcblxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuZmlsbFN0eWxlO1xuICAgIHRoaXMuY29udGV4dC5zdHJva2VSZWN0KFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpLFxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKVxuICAgICk7XG59O1xuXG4vKipcbiAqIEBjb25zdCDih5hcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LlJlc2l6ZVN5bWJvbCA9ICdcXHUyMWYyJzsiLCIvKipcbiAqIFBvc2l0aW9uIGluIDJEIHNwYWNlXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHhcbiAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUG9zaXRpb24oeCwgeSkge1xuICAgIHRoaXMueCA9ICt4IHx8IDA7XG4gICAgdGhpcy55ID0gK3kgfHwgMDtcbn1cblxuLyoqXG4gKlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuUG9zaXRpb24ucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy54O1xufTtcblxuLyoqXG4gKlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuUG9zaXRpb24ucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy55O1xufTtcblxuLyoqXG4gKiBDaGFuZ2VzIHBvc2l0aW9ucyBvZiBhbiBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFYXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFZXG4gKiBAcmV0dXJuIFBvc2l0aW9uXG4gKi9cblBvc2l0aW9uLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24oZGVsdGFYLCBkZWx0YVkpIHtcbiAgICB2YXIgbmV3WFBvcyA9IHRoaXMueCArIGRlbHRhWDtcbiAgICB2YXIgbmV3WVBvcyA9IHRoaXMueSArIGRlbHRhWTtcblxuICAgIHJldHVybiBuZXcgUG9zaXRpb24obmV3WFBvcywgbmV3WVBvcyk7XG59OyIsIi8qKlxuICogVGhpcyBvYmplY3QgaXMgb25seSBwdXJwb3NlZCBmb3IgbG9hZGluZyBleHRlcm5hbCByZXNvdXJjZXNcbiAqIFRoaXMgaXMgc3VwcG9zZWQgdG8gYmUgYW4gb2JqZWN0IGR1cmluZyB0ZXN0aW5nIHB1cnBvc2VzXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlTG9hZGVyKCkge1xuICAgIFxufVxuXG5cbi8qKlxuICogTG9hZHMgaW1hZ2UgdGhlbiBjYWxscyBhIGZ1bmN0aW9uLlxuICogVGhhdCBzaW1wbGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICogQHBhcmFtIGNhbGxiYWNrXG4gKi9cblJlc291cmNlTG9hZGVyLnByb3RvdHlwZS5sb2FkSW1hZ2UgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGltZy5vbmxvYWQgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBpbWcuc3JjID0gc3JjO1xufTtcblxuLyoqXG4gKiBMb2FkcyB0ZXh0IGNvbnRlbnQsIGNhbGxzIGZ1bmN0aW9uXG4gKiBcbiAqIEBwYXJhbSBzcmNcbiAqIEBwYXJhbSBjYWxsYmFja1xuICovXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZFRleHQgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHNyYywgdHJ1ZSk7XG4gICAgeGhyLnNlbmQoKTtcbn07XG5cbi8qKlxuICogTG9hZHMgSlNPTiBjb250ZW50LCBjYWxscyBjYWxsYmFja1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAqIEBwYXJhbSBjYWxsYmFja1xuICovXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZEpzb25PYmplY3QgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgIHRoaXMubG9hZFRleHQoc3JjLCBmdW5jdGlvbiAobG9hZGVkVGV4dCkge1xuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2soSlNPTi5wYXJzZShsb2FkZWRUZXh0KSk7XG4gICAgICAgIH1cbiAgICB9KVxufTtcblxuIiwiLyoqXG4gKlxuICogQHBhcmFtIHtSZXNvdXJjZUxvYWRlcn0gcmVzb3VyY2VMb2FkZXJcbiAqIEBwYXJhbSB7W3trZXk6IHN0cmluZywgc3JjOiBzdHJpbmcsIHR5cGU6IHN0cmluZyB9XX0gcmVzb3VyY2VzIC0gd2hhdCByZXNvdXJjZXMgYXJlIHlvdSBnb2luZyB0byBsb2FkXG4gKiBLZXkgaXMgdXNlZCB0byBzYXZlIGxvYWRlZCBjb250ZW50IHRvIFN0b3JhZ2UsXG4gKiBUeXBlIG11c3QgYmU6ICd0ZXh0JywgJ2ltYWdlJyBvciAnanNvbicsXG4gKiBTcmMgaXMgdGhlIHBhdGggdG8gdGhlIHJlc291cmNlIGZyb20gZG9jdW1lbnQgcm9vdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25Mb2FkIC0gY2FsbGJhY2ssIHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQgb24gbG9hZCBvZiBlYWNoIGVsZW1lbnRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBSZXNvdXJjZVByZXBhcmVyKHJlc291cmNlTG9hZGVyLCByZXNvdXJjZXMsIG9uTG9hZClcbntcbiAgICB0aGlzLmxvYWRlciA9IHJlc291cmNlTG9hZGVyO1xuICAgIHRoaXMucmVzb3VyY2VzVG9Mb2FkID0gcmVzb3VyY2VzO1xuICAgIHRoaXMub25Mb2FkID0gb25Mb2FkO1xufVxuXG4vKipcbiAqIFN0YXJ0cyBsb2FkaW5nIG9mIHJlcXVlc3RlZCByZXNvdXJjZXNcbiAqL1xuUmVzb3VyY2VQcmVwYXJlci5wcm90b3R5cGUuc3RhcnRMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b3RhbExvYWRlZENvdW50ID0gMDtcbiAgICB2YXIgc2hvdWxkTG9hZENvdW50ID0gdGhpcy5yZXNvdXJjZXNUb0xvYWQubGVuZ3RoO1xuICAgIHZhciBvbkxvYWRDYWxsYmFjayA9IHRoaXMub25Mb2FkO1xuICAgIHZhciBsb2FkZXIgPSB0aGlzLmxvYWRlcjtcblxuICAgIC8vIEVhY2ggdGltZSB3ZSBoYXZlIGxvYWRlZCBhIHJlc291cmNlXG4gICAgLy8gd2UgY2hlY2sgZXZlcnl0aGluZyBpcyBsb2FkZWRcbiAgICB2YXIgc2F2ZVJlc291cmNlID0gZnVuY3Rpb24gKGtleSwgb2JqZWN0KSB7XG4gICAgICAgIFN0b3JhZ2UucmVtZW1iZXIoa2V5LCBvYmplY3QpO1xuICAgICAgICB0b3RhbExvYWRlZENvdW50Kys7XG4gICAgICAgIGlmICh0b3RhbExvYWRlZENvdW50ID09IHNob3VsZExvYWRDb3VudCkge1xuICAgICAgICAgICAgb25Mb2FkQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHZhciByZXF1ZXN0TWV0aG9kcyA9IHtcbiAgICAgICAgaW1hZ2U6IGZ1bmN0aW9uIChzcmMsIGtleSkge1xuICAgICAgICAgICAgbG9hZGVyLmxvYWRJbWFnZShzcmMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCB0aGlzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGpzb246IGZ1bmN0aW9uIChzcmMsIGtleSkge1xuICAgICAgICAgICAgbG9hZGVyLmxvYWRKc29uT2JqZWN0KHNyYywgZnVuY3Rpb24gKGpzb25SZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNhdmVSZXNvdXJjZShrZXksIGpzb25SZXNvdXJjZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0ZXh0OiBmdW5jdGlvbiAoc3JjLCBrZXkpIHtcbiAgICAgICAgICAgIGxvYWRlci5sb2FkVGV4dChzcmMsIGZ1bmN0aW9uICh0ZXh0UmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCB0ZXh0UmVzb3VyY2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJlc291cmNlc1RvTG9hZC5mb3JFYWNoKGZ1bmN0aW9uIChyZXNvdXJjZSkge1xuICAgICAgICB2YXIgdHlwZSA9IHJlc291cmNlLnR5cGU7XG4gICAgICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXk7XG4gICAgICAgIHZhciBzcmMgPSByZXNvdXJjZS5zcmM7XG5cbiAgICAgICAgaWYgKCAhIHJlcXVlc3RNZXRob2RzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1RyeWluZyB0byBsb2FkIHVua25vd24gcmVzb3VyY2UgdHlwZSEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGxpbmcgYXBwcm9wcmlhdGUgbG9hZCBtZXRob2RcbiAgICAgICAgcmVxdWVzdE1ldGhvZHNbdHlwZV0oc3JjLCBrZXkpO1xuICAgIH0pO1xufTsiLCIvKipcbiAqIFNpemUgb2YgdGhlIHJlY3RhbmdsZSBzdXJyb3VuZGluZyB0aGUgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCA9ICt3aWR0aCB8fCBTaXplLmRlZmF1bHRXaWR0aDtcbiAgICB0aGlzLmhlaWdodCA9ICtoZWlnaHQgfHwgU2l6ZS5kZWZhdWx0SGVpZ2h0O1xufVxuXG5TaXplLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLndpZHRoO1xufTtcblxuU2l6ZS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xufTtcblxuXG5TaXplLnByb3RvdHlwZS5yZXNpemVCeSA9IGZ1bmN0aW9uIChkZWx0YVdpZHRoLCBkZWx0YUhlaWdodCkge1xuICAgIHRoaXMud2lkdGggKz0gZGVsdGFXaWR0aDtcbiAgICB0aGlzLmhlaWdodCArPSBkZWx0YUhlaWdodDtcblxuICAgIGlmICh0aGlzLndpZHRoIDwgU2l6ZS5taW5XaWR0aCkge1xuICAgICAgICB0aGlzLndpZHRoID0gU2l6ZS5taW5XaWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWlnaHQgPCBTaXplLm1pbkhlaWdodCkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IFNpemUubWluSGVpZ2h0O1xuICAgIH1cbn07XG5cbi8qKlxuICogSW5jcmVhc2VzIHRoZSBzaXplIGJ5IG11bHRpcGxpZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlwbGllclxuICogQHJldHVybnMge1NpemV9XG4gKi9cblNpemUucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24obXVsdGlwbGllcikge1xuICAgIHJldHVybiBuZXcgU2l6ZSh0aGlzLndpZHRoICogbXVsdGlwbGllciwgdGhpcy5oZWlnaHQgKiBtdWx0aXBsaWVyKTtcbn07XG5cbi8qKlxuICogTWluaW1hbCB3aWR0aFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5taW5XaWR0aCA9IDQwO1xuXG4vKipcbiAqIE1pbmltYWwgaGVpZ2h0XG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5TaXplLm1pbkhlaWdodCA9IDQwO1xuXG4vKipcbiAqIGNvbnN0IGZvciBkZWZhdWx0IHdpZHRoXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5TaXplLmRlZmF1bHRXaWR0aCA9IDE1MDtcblxuLyoqXG4gKiBjb25zdCBmb3IgZGVmYXVsdCBoZWlnaHRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cblNpemUuZGVmYXVsdEhlaWdodCA9IDcwOyIsIi8qKlxuICogSXQgaXMgcHVycG9zZWQgZm9yIHJlbWVtYmVyaW5nIHNvbWUgZGF0YS5cbiAqIEZ1bmN0aW9uYWwgZGVjbGFyYXRpb24gaXMgdXNlZCBmb3IgaXRzIHZpc2liaWxpdHkgb25seS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU3RvcmFnZSgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhpcyBpcyBub3QgZm9yIGNyZWF0aW5nIG9iamVjdHMhXCIpO1xufVxuXG5TdG9yYWdlLl9jb250ZW50ID0ge307XG5cbi8qKlxuICogUmVtZW1iZXJzIGFueSB2YWx1ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqL1xuU3RvcmFnZS5yZW1lbWJlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgU3RvcmFnZS5fY29udGVudFtrZXldID0gdmFsdWU7XG59O1xuXG4vKipcbiAqIEFsbG93cyB5b3UgdG8gZ2V0IHdoYXQgeW91IHdhbnQgYnV0IG9ubHkgaWYgeW91IHJlbWVtYmVyIHRoaXMgZWFybGllclxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gKi9cblN0b3JhZ2UuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciBzb21ldGhpbmdZb3VXYW50ID0gU3RvcmFnZS5fY29udGVudFtrZXldO1xuXG4gICAgaWYgKHR5cGVvZiBzb21ldGhpbmdZb3VXYW50ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIldlIGhhdmUgbm90aGluZyB0byByZXR1cm4gdXNpbmcga2V5OiBcIiArIGtleSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvbWV0aGluZ1lvdVdhbnQ7XG59O1xuIiwiLyoqXG4gKiBDb2xsZWN0aW9uIGZvciBVSSBlbGVtZW50cy5cbiAqXG4gKiBJdCBpcyBwdXJwb3NlZCBmb3Iga2VlcGluZyB1aSBlbGVtZW50cyB3aXRoIGNvcnJlY3Qgb3JkZXJcbiAqIEFsc28gc3VwcG9ydHMgc2VsZWN0aW9uIHJlbWVtYmVyaW5nXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJQ29sbGVjdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xlbmd0aCcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVsZW1lbnRzLmxlbmd0aFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuLyoqXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgdG9wIGxheWVyIG9mIHRoZSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIHtVSUVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgaWYgKCAhIChlbGVtZW50IGluc3RhbmNlb2YgVUlFbGVtZW50KSApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRWxlbWVudCBpbiBVSUNvbGxlY3Rpb24gbXVzdCBoYXZlIFVJRWxlbWVudCB0eXBlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFycmF5IHdpdGggYWxsIGVsZW1lbnRzIGluIGl0XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGVsZW1lbnQgd2l0aCBwYXNzZWQgaW5kZXggZnJvbSB0aGUgY29sbGVjdGlvbiBhbmQgcmV0dXJucyBpdFxuICpcbiAqIEByZXR1cm4ge1VJRWxlbWVudH1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgIHRoaXMuZGVzZWxlY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKVswXTtcbn07XG5cbi8qKlxuICogU3dhcHMgcGxhY2VzIG9mIHR3byBlbGVtZW50cyBpbiB0aGUgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBpbmRleDFcbiAqIEBwYXJhbSBpbmRleDJcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24gKGluZGV4MSwgaW5kZXgyKSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleDEpIHx8ICF0aGlzLmhhcyhpbmRleDIpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuXG4gICAgdmFyIHRlbXAgPSB0aGlzLmVsZW1lbnRzW2luZGV4MV07XG4gICAgdGhpcy5lbGVtZW50c1tpbmRleDFdICA9IHRoaXMuZWxlbWVudHNbaW5kZXgyXTtcbiAgICB0aGlzLmVsZW1lbnRzW2luZGV4Ml0gPSB0ZW1wO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBpbmRleCBleGlzdHMgaW4gY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIGluZGV4ID49IDAgfHwgaW5kZXggPCB0aGlzLmxlbmd0aDtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBpbmRleFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2luZGV4XTtcbn07XG5cbi8qKlxuICogRm9yZ2V0cyB3aGljaCBlbGVtZW50IHdhcyBzZWxlY3RlZFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmRlc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIGluZGV4XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG59O1xuXG4vKipcbiAqIFNlbGVjdHMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgY29sbGVjdGlvblxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdExhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5sZW5ndGggPyB0aGlzLmxlbmd0aCAtIDEgOiAtMTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBzZWxlY3RlZCBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldFNlbGVjdGVkRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ICE9IC0xKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW3RoaXMuc2VsZWN0ZWRJbmRleF1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIFJldHVybnMgaW5kZXggb2Ygc2VsZWN0ZWQgZWxlbWVudFxuICogSWYgbm9uZSwgcmV0dXJucyAtMVxuICpcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4O1xufTtcblxuLyoqXG4gKiBGZXRjaGVzIGVsZW1lbnQgYnkgcGFzc2VkIG9mZnNldFxuICpcbiAqIEBwYXJhbSBvZmZzZXRYXG4gKiBAcGFyYW0gb2Zmc2V0WVxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmZldGNoRWxlbWVudEJ5T2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICB2YXIgbWF0Y2hlZEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKGVsLmlzT2Zmc2V0SW4ob2Zmc2V0WCwgb2Zmc2V0WSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWRFbGVtZW50ID0gZWw7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2hlZEVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIFB1c2hlcyBlbGVtZW50IHRvIHRoZSBlbmQgb2YgdGhlIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS50b0VuZCA9IGZ1bmN0aW9uKGluZGV4KVxue1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIHZhciB3YXNTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PSBpbmRleDtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICB0aGlzLmFkZChlbGVtZW50KTtcblxuICAgIGlmICh3YXNTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmxlbmd0aCAtIDE7XG4gICAgfVxufTtcblxuLyoqXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgYm90dG9tIG9mIHRoZSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIGluZGV4XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUudG9TdGFydCA9IGZ1bmN0aW9uKGluZGV4KVxue1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIHZhciB3YXNTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PSBpbmRleDtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICB0aGlzLmVsZW1lbnRzID0gW2VsZW1lbnRdLmNvbmNhdCh0aGlzLmVsZW1lbnRzKTtcblxuICAgIGlmICh3YXNTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBGZXRjaGVzIGluZGV4IGJ5IHBhc3NlZCBvZmZzZXRcbiAqXG4gKiBAcGFyYW0gb2Zmc2V0WFxuICogQHBhcmFtIG9mZnNldFlcbiAqIEByZXR1cm5zIHsqfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmZldGNoSW5kZXhCeU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgdmFyIG1hdGNoZWRJbmRleCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGVsLmlzT2Zmc2V0SW4ob2Zmc2V0WCwgb2Zmc2V0WSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWRJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoZWRJbmRleDtcbn07IiwiLyoqXG4gKiBTb21lIGVsZW1lbnQgb2YgdXNlciBpbnRlcmZhY2VcbiAqXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufHVuZGVmaW5lZH0gcG9zaXRpb25cbiAqIEBwYXJhbSB7U2l6ZXx1bmRlZmluZWR9IHNpemVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUVsZW1lbnQocG9zaXRpb24sIHNpemUpXG57XG4gICAgaWYgKCAhIChwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSApIHtcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gICAgaWYgKCAhIChzaXplIGluc3RhbmNlb2YgUG9zaXRpb24pKSB7XG4gICAgICAgIHNpemUgPSBuZXcgU2l6ZSgpO1xuICAgIH1cbiAgICB0aGlzLnNpemUgPSBzaXplO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHZpZXcgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge1VJRWxlbWVudFZpZXd9IHZpZXdcbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRWaWV3ID0gZnVuY3Rpb24odmlldykge1xuICAgIGlmICggISAodmlldyBpbnN0YW5jZW9mIFVJRWxlbWVudFZpZXcpICkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWaWV3IG11c3QgaGF2ZSBVSUVsZW1lbnRWaWV3IHR5cGUhJyk7XG4gICAgfVxuICAgIHRoaXMudmlldyA9IHZpZXc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgY3VycmVudCB2aWV3IG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1VJRWxlbWVudFZpZXd8dW5kZWZpbmVkfVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFZpZXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldztcbn07XG5cbi8qKlxuICogUmVuZGVycyB0aGUgZWxlbWVudCB1c2luZyBpdHMgdmlld1xuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMudmlldykge1xuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1ZpZXcgaXMgbm90IHNldCEnKTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXcucmVuZGVyKHRoaXMpO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtQb3NpdGlvbn0gcG9zaXRpb25cbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR9XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICBpZiAoIXBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmV3IHBvc2l0aW9uIG11c3QgaGF2ZSBQb3NpdGlvbiB0eXBlIScpXG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJucyBwb3NpdGlvbiBvZiBhbiBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1Bvc2l0aW9ufVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJuIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1NpemV9XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBwYXNzZWQgb2Zmc2V0IG1hdGNoZXMgZWxlbWVudCBwb3NpdGlvblxuICpcbiAqIEBwYXJhbSBjbGllbnRYXG4gKiBAcGFyYW0gY2xpZW50WVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuaXNPZmZzZXRJbiA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKVxue1xuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIGN1cnJlbnRTaXplID0gdGhpcy5nZXRTaXplKCk7XG5cbiAgICBpZiAoY3VycmVudFBvc2l0aW9uLmdldFgoKSA+IGNsaWVudFggfHwgY3VycmVudFBvc2l0aW9uLmdldFgoKSArIGN1cnJlbnRTaXplLmdldFdpZHRoKCkgPCBjbGllbnRYKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgPiBjbGllbnRZIHx8IGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgKyBjdXJyZW50U2l6ZS5nZXRIZWlnaHQoKSA8IGNsaWVudFkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGhvdyBmYXIgaXMgcGFzc2VkIG9mZnNldCBmcm9tIHBvaW50ICgwLCAwKVxuICpcbiAqIEBwYXJhbSBjbGllbnRYXG4gKiBAcGFyYW0gY2xpZW50WVxuICogQHJldHVybnMge3t0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyfX1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRDbGlja09mZnNldCA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogY2xpZW50WCAtIHBvc2l0aW9uLmdldFgoKSxcbiAgICAgICAgbGVmdDogY2xpZW50WSAtIHBvc2l0aW9uLmdldFkoKVxuICAgIH1cbn07IiwiLyoqXG4gKiBPYmplY3QsIHdoaWNoIGRlZmluZXMgaG93IHRvIHJlbmRlciBzcGVjaWZpYyBVSUVsZW1lbnRcbiAqIFRoaXMgb2JqZWN0IGtub3dzIGV2ZXJ5dGhpbmcgYWJvdXQgYW4gb2JqZWN0IGl0IG5lZWRzIHRvIGRyYXcuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJRWxlbWVudFZpZXcoKVxue1xuXG59XG4vKipcbiAqXG4gKiBAcGFyYW0gVUlFbGVtZW50XG4gKi9cblVJRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChVSUVsZW1lbnQpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1lvdSBzaG91bGQgbm90IGJlIHVzaW5nIGFuIGFic3RyYWN0IG9iamVjdCBmb3IgcmVuZGVyaW5nIScpO1xufTtcbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cbiAqIEBwYXJhbSB7U2l6ZXxudWxsfSBzaXplXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJSW1hZ2VFbGVtZW50KHBvc2l0aW9uLCBzaXplLCBpbWFnZSlcbntcbiAgICBVSUVsZW1lbnQuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc2l6ZSk7XG5cbiAgICBpZiAoICEgKGltYWdlIGluc3RhbmNlb2YgSW1hZ2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbWFnZSBtdXN0IGhhdmUgSW1hZ2UgdHlwZSFcIik7XG4gICAgfVxuXG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xufVxuXG5VSUltYWdlRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xuXG4vKipcbiAqXG4gKiBAcmV0dXJucyB7SW1hZ2V9XG4gKi9cblVJSW1hZ2VFbGVtZW50LnByb3RvdHlwZS5nZXRJbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbn07IiwiLyoqXG4gKiBDbGFzcyBmb3IgY3JlYXRpbmdcbiAqXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufG51bGx9IHBvc2l0aW9uXG4gKiBAcGFyYW0ge1NpemV8bnVsbH0gc2l6ZVxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEBwYXJhbSB7Kn0gc3R5bGVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUxhYmVsRWxlbWVudChwb3NpdGlvbiwgc2l6ZSwgdGV4dCwgc3R5bGUpIHtcbiAgICBVSUVsZW1lbnQuYXBwbHkodGhpcywgW3Bvc2l0aW9uLCBzaXplXSk7XG5cbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgdGV4dCA9IFVJTGFiZWxFbGVtZW50LmRlZmF1bHRUZXh0O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IHRleHQ7XG5cbiAgICBpZiAoISAoc3R5bGUgaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgIHN0eWxlID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5mb250ID0gc3R5bGUuZm9udCB8fCBVSUxhYmVsRWxlbWVudC5kZWZhdWx0U3R5bGUuZm9udDtcbiAgICB0aGlzLmNvbG9yID0gc3R5bGUuY29sb3IgfHwgVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFN0eWxlLmNvbG9yO1xufVxuXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEdldHMgYSB0ZXh0IG9mIHRoZSBjdXJyZW50IFVJTGFiZWxFbGVtZW50XG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLmdldFRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dDtcbn07XG5cbi8qKlxuICogU2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0XG4gKlxuICogQHJldHVybiB7c3RyaW5nfHN0cmluZ3wqfVxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0Rm9udCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5mb250O1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBmb250IG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZvbnRcbiAqL1xuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLnNldEZvbnQgPSBmdW5jdGlvbiAoZm9udCkge1xuICAgIHRoaXMuZm9udCA9IGZvbnQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGNvbG9yIG9mIHRoZSB0ZXh0XG4gKlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0Q29sb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3I7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbG9yIG9mIHRoZSB0ZXh0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXG4gKi9cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbn07XG5cblVJTGFiZWxFbGVtZW50LmRlZmF1bHRUZXh0ID0gXCLQktCy0LXQtNC40YLQtSDRgtC10LrRgdGCLi4uXCI7XG5cblVJTGFiZWxFbGVtZW50LmRlZmF1bHRTdHlsZSA9IHtcbiAgICBmb250OiAnQXJpYWwnLFxuICAgIGNvbG9yOiAnIzAwMDAwMCdcbn07IiwiLyoqXG4gKiBDYW1lcmFcbiAqIE1hbmFnZXMgdmlldyBjaGFuZ2luZ1xuICogVXNlcyBzcGhlcmljYWwgY29vcmRpbmF0ZXMgdG8gY2hhbmdlIHRoZSB2aWV3IGFyb3VuZCB0aGUgb2JqZWN0XG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbWVyYSgpXG57XG4gICAgLy8gSW5pdGlhbCBhbmdsZSBhbmQgZGlzdGFuY2VcbiAgICB0aGlzLmFuZ2xlVGhldGEgPSAzMDtcbiAgICB0aGlzLmFuZ2xlRmkgPSAwO1xuICAgIHRoaXMuZGlzdGFuY2UgPSAyMDtcblxuICAgIHRoaXMubWluQW5nbGVUaGV0YSA9IDEwO1xuICAgIHRoaXMubWF4QW5nbGVUaGV0YSA9IDE3MDtcblxuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldE5ld1Bvc2l0aW9uKCk7XG5cbiAgICAvLyBXaGVyZSB0byBsb29rXG4gICAgdGhpcy5sb29rQXQgPSBbMCwgMCwgMS4zXTtcbiAgICB0aGlzLnVwID0gWzAsIDAsIDFdO1xuXG4gICAgdGhpcy5tYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xufVxuXG4vKipcbiAqIFJldHVybnMgbmV3IHBvc2l0aW9ucyBvZiBhIHZpZXdlclxuICpcbiAqIEByZXR1cm5zIHsqW119XG4gKi9cbkNhbWVyYS5wcm90b3R5cGUuZ2V0TmV3UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgTWF0aC5jb3ModGhpcy5hbmdsZUZpICogQ2FtZXJhLlRvUmFkaWFucykgKiBNYXRoLnNpbih0aGlzLmFuZ2xlVGhldGEgKiBDYW1lcmEuVG9SYWRpYW5zKSAqIHRoaXMuZGlzdGFuY2UsXG4gICAgICAgIE1hdGguc2luKHRoaXMuYW5nbGVUaGV0YSAqIENhbWVyYS5Ub1JhZGlhbnMpICogTWF0aC5zaW4odGhpcy5hbmdsZUZpICogQ2FtZXJhLlRvUmFkaWFucykgKiB0aGlzLmRpc3RhbmNlLFxuICAgICAgICB0aGlzLmRpc3RhbmNlICogTWF0aC5jb3ModGhpcy5hbmdsZVRoZXRhICogQ2FtZXJhLlRvUmFkaWFucylcbiAgICBdO1xufTtcblxuLyoqXG4gKiBNb3ZlcyBjYW1lcmEgYXJvdW5kIHRoZSBvYmplY3RcbiAqXG4gKiBAcGFyYW0gYW5nbGVGaVxuICogQHBhcmFtIGFuZ2xlVGhldGFcbiAqL1xuQ2FtZXJhLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKGFuZ2xlRmksIGFuZ2xlVGhldGEpIHtcblxuICAgIHRoaXMuYW5nbGVGaSArPSBhbmdsZUZpO1xuXG4gICAgdmFyIGNoYW5nZWRBbmdsZVRoZXRhID0gdGhpcy5hbmdsZVRoZXRhICsgYW5nbGVUaGV0YTtcblxuICAgIGlmIChjaGFuZ2VkQW5nbGVUaGV0YSA8IHRoaXMubWF4QW5nbGVUaGV0YSAmJiBjaGFuZ2VkQW5nbGVUaGV0YSA+IHRoaXMubWluQW5nbGVUaGV0YSkge1xuICAgICAgICB0aGlzLmFuZ2xlVGhldGEgPSBjaGFuZ2VkQW5nbGVUaGV0YTtcbiAgICB9XG5cbiAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5nZXROZXdQb3NpdGlvbigpO1xuICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG59O1xuXG4vKipcbiAqIE1vdmUgY2FtZXJhIGZvcndhcmRcbiAqL1xuQ2FtZXJhLnByb3RvdHlwZS56b29tSW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuZGlzdGFuY2UgPiA0KSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UtLTtcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0TmV3UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIE1vdmUgY2FtZXJhIGJhY2t3YXJkXG4gKi9cbkNhbWVyYS5wcm90b3R5cGUuem9vbU91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5kaXN0YW5jZSA8IDIwKSB7XG4gICAgICAgIHRoaXMuZGlzdGFuY2UrKztcbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0TmV3UG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFNldHMgY2FtZXJhIGFuZ2xlXG4gKlxuICogQHBhcmFtIGFuZ2xlRmlcbiAqIEBwYXJhbSBhbmdsZVRoZXRhXG4gKi9cbkNhbWVyYS5wcm90b3R5cGUuc2V0QW5nbGUgPSBmdW5jdGlvbiAoYW5nbGVGaSwgYW5nbGVUaGV0YSkge1xuICAgIHRoaXMuYW5nbGVGaSA9IGFuZ2xlRmk7XG4gICAgdGhpcy5hbmdsZVRoZXRhID0gYW5nbGVUaGV0YTtcbn07XG5cbi8qKlxuICogVXBkYXRlcyB2aWV3IG1hdHJpeFxuICovXG5DYW1lcmEucHJvdG90eXBlLnVwZGF0ZU1hdHJpeCA9IGZ1bmN0aW9uICgpIHtcbiAgICBtYXQ0Lmxvb2tBdCh0aGlzLm1hdHJpeCwgdGhpcy5wb3NpdGlvbiwgdGhpcy5sb29rQXQsIHRoaXMudXApO1xufTtcblxuLyoqXG4gKiBDb25zdCBmb3IgdHJhbnNsYXRpbmcgZGVncmVlcyB0byByYWRpYW5zXG4gKlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuQ2FtZXJhLlRvUmFkaWFucyA9IE1hdGguUEkgLyAxODA7IiwiLyoqXG4gKiBPYmplY3QgZm9yIGNyZWF0aW5nIFZCTyBhbmQgc3RvcmluZyBpdFxuICogdG8gaGF2ZSBjYXBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IGNoYW5nZSBjdXJyZW50IG1vZGVsXG4gKlxuICogQHBhcmFtIGdsXG4gKiBAcGFyYW0ganNvbk1vZGVsXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTW9kZWwoZ2wsIGpzb25Nb2RlbCkge1xuICAgIHRoaXMuYnVpbGRCdWZmZXJzKGdsLCBqc29uTW9kZWwpXG59XG5cbi8qKlxuICogQmluZHMgYWxsIGJ1ZmZlcnNcbiAqXG4gKiBAcGFyYW0gZ2xcbiAqIEBwYXJhbSBqc29uTW9kZWxcbiAqL1xuTW9kZWwucHJvdG90eXBlLmJ1aWxkQnVmZmVycyA9IGZ1bmN0aW9uIChnbCwganNvbk1vZGVsKVxue1xuICAgIC8vINCh0L7Qt9C00LDQtdC8INCx0YPRhNC10YDRi1xuICAgIHRoaXMubW9kZWxWZXJ0ZXhlcyA9IGpzb25Nb2RlbC5tZXNoZXNbMF0udmVydGljZXM7XG4gICAgdGhpcy5tb2RlbEluZGV4ZXMgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBqc29uTW9kZWwubWVzaGVzWzBdLmZhY2VzKTtcbiAgICB0aGlzLm1vZGVsVGV4Q29vcmRzID0ganNvbk1vZGVsLm1lc2hlc1swXS50ZXh0dXJlY29vcmRzWzBdO1xuICAgIHRoaXMubW9kZWxOb3JtYWxzID0ganNvbk1vZGVsLm1lc2hlc1swXS5ub3JtYWxzO1xuXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LHRg9GE0LXRgCAtINGH0LXRgNC10Lcg0L3QtdCz0L4g0L/QtdGA0LXQtNCw0LXRgtGB0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LIgR1BVXG4gICAgdGhpcy5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIC8vINCd0LDQt9C90LDRh9Cw0LXQvCDQtdCz0L4g0LDQutGC0LjQstC90YvQvFxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsVmVydGV4QnVmZmVyT2JqZWN0KTtcbiAgICAvLyBTVEFUSUNfRFJBVyAtINC60L7Qv9C40YDRg9C10Lwg0LXQtNC40L3QvtC20LTRiyDQuNC3IENQVSDQsiBHUFVcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0aGlzLm1vZGVsVmVydGV4ZXMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICAvLyDQntGC0LTQtdC70YzQvdGL0Lkg0LHRg9GE0LXRgCDQtNC70Y8g0YLQtdC60YHRgtGD0YDQvdGL0YUg0LrQvtC+0YDQtNC40L3QsNGCXG4gICAgdGhpcy5tb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsVGV4Q29vcmRzQnVmZmVyT2JqZWN0KTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0aGlzLm1vZGVsVGV4Q29vcmRzKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LjQvdC00LXQutGB0L3Ri9C5INCx0YPRhNC10YAg0LTQu9GPINGD0LrQsNC30LDQvdC40Y8g0L/QvtGA0Y/QtNC60LAg0LLQtdGA0YjQuNC9XG4gICAgdGhpcy5tb2RlbEluZGV4QnVmZmVyT2JqZWN0ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgLy8g0J3QsNC30L3QsNGH0LDQtdC8INC10LPQviDQsNC60YLQuNCy0L3Ri9C8XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbEluZGV4QnVmZmVyT2JqZWN0KTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodGhpcy5tb2RlbEluZGV4ZXMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICAvLyDQkdGD0YTQtdGAINGBINC90L7RgNC80LDQu9GP0LzQuFxuICAgIHRoaXMubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbE5vcm1hbEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5tb2RlbE5vcm1hbHMpLCBnbC5TVEFUSUNfRFJBVyk7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuYmluZEJ1ZmZlcnMgPSBmdW5jdGlvbiAoZ2wpIHtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxJbmRleEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QpO1xufTsiLCIvKipcbiAqIEBwYXJhbSBjYW52YXNcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBnbENvbnRleHRcbiAqIEBwYXJhbSB7SW1hZ2V9IGluaXRpYWxUZXh0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVydGV4U2hhZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnRTaGFkZXJcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNb2RlbFZpZXcoY2FudmFzLCBnbENvbnRleHQsIGluaXRpYWxUZXh0dXJlLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKSB7XG5cbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmdsID0gZ2xDb250ZXh0O1xuXG4gICAgdGhpcy50ZXh0dXJlID0gaW5pdGlhbFRleHR1cmU7XG4gICAgdGhpcy5pbml0aWFsaXplKHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpO1xuXG4gICAgdGhpcy5jYW1lcmEgPSBuZXcgQ2FtZXJhKCk7XG5cbiAgICB0aGlzLnNldFRleHR1cmUoaW5pdGlhbFRleHR1cmUpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVydGV4U2hhZGVyIC0gdmVydGV4IHNoYWRlciBzb3VyY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudFNoYWRlciAtIGZyYWdtZW50IHNoYWRlciBzb3VyY2VcbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpXG57XG4gICAgdmFyIGdsID0gdGhpcy5nbDtcblxuICAgIC8vINCS0LrQu9GO0YfQsNC10Lwg0L/RgNC+0LLQtdGA0LrRgyDQs9C70YPQsdC40L3Ri1xuICAgIGdsLmVuYWJsZShnbC5ERVBUSF9URVNUKTtcblxuICAgIC8vINCX0LDQtNCw0LXQvCDRhtCy0LXRgiDQvtGH0LjRgdGC0LrQuFxuICAgIGdsLmNsZWFyQ29sb3IoMC44LCAwLjksIDAuOSAsIDAuMCk7XG4gICAgLy8g0J7Rh9C40YHRgtC60LAgLSDRh9GC0L4g0L7Rh9C40YnQsNC10LwgLSDQsdGD0YTQtdGAINGG0LLQtdGC0LAsINC40LvQuCDQttC1INCx0YPRhNC10YAg0LPQu9GD0LHQuNC90YtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbiAgICB2YXIgc2hhZGVyQ29tcGlsZXIgPSBuZXcgU2hhZGVyQ29tcGlsZXIoZ2wpO1xuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHNoYWRlckNvbXBpbGVyLm1ha2VQcm9ncmFtKHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpO1xufTtcblxuLyoqXG4gKiBTZXRzIGEgbmV3IHRleHR1cmUgYXMgYWN0aXZlIHRleHR1cmVcbiAqIFxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKGltYWdlKSB7XG5cbiAgICB0aGlzLnRleHR1cmUgPSBpbWFnZTtcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuXG4gICAgLy8gQ3JlYXRpbmcgdGV4dHVyZVxuICAgIHRoaXMubW9kZWxUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xuICAgIC8vIEJpbmRpbmcgaXRcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLm1vZGVsVGV4dHVyZSk7XG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XG4gICAgLy8gaSBmb3IgaW50ZWdlciAsIHMsIHQgLSB1LCB2XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfUywgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XG4gICAgLy8gRmlsdGVyc1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgIC8vINCh0LDQvNCwINGC0LXQutGB0YLRg9GA0LBcbiAgICBnbC50ZXhJbWFnZTJEKFxuICAgICAgICBnbC5URVhUVVJFXzJELCAvLyBUZXh0dXJlIHR5cGVcbiAgICAgICAgMCwgLy8gRGV0YWlsIGxldmVsXG4gICAgICAgIGdsLlJHQkEsIC8vIFdoYXQgZm9ybWF0IGRvIHdlIHVzZVxuICAgICAgICBnbC5SR0JBLFxuICAgICAgICBnbC5VTlNJR05FRF9CWVRFLCAvLyBEYXRhIHR5cGVcbiAgICAgICAgdGhpcy50ZXh0dXJlIC8vIFRleHR1cmUgaXRzZWxmXG4gICAgKTtcbiAgICAvLyBVbmJpbmQgZm9yIG5vd1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpO1xufTtcblxuLyoqXG4gKiBTZXRzIGFjdGl2ZSBtb2RlbCBhbmQgYmluZHMgYWxsIG9mIHRoZSBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtNb2RlbH0gbW9kZWxcbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS5zZXRNb2RlbCA9IGZ1bmN0aW9uIChtb2RlbCkge1xuXG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG5cbiAgICBtb2RlbC5iaW5kQnVmZmVycyhnbCk7XG5cbiAgICAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXQvCDRiNC10LnQtNC10YAg0L4g0YLQvtC8LCDQutCw0Log0LHRgNCw0YLRjCDQtNCw0L3QvdGL0LUg0LjQtyDQsdGD0YTQtdGA0LAg0LIg0LrQsNGH0LXRgdGC0LLQtSDQstGF0L7QtNC90YvRhSDQv9Cw0YDQsNC80LXRgtGA0L7QslxuICAgIHZhciBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnRQb3NpdGlvbicpO1xuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG1vZGVsLm1vZGVsVmVydGV4QnVmZmVyT2JqZWN0KTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uLCAvLyDQvdCw0Ygg0LDRgtGA0LjQsdGD0YJcbiAgICAgICAgMywgLy8g0JrQvtC70LjRh9C10YHRgtCy0L4g0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0LDRgtGA0LjQsdGD0YJcbiAgICAgICAgZ2wuRkxPQVQsIC8vINCi0LjQvyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCx0YPRhNC10YDQsFxuICAgICAgICBnbC5GQUxTRSwgLy8g0J3QvtGA0LzQsNC70LjQt9C+0LLQsNC90L3Ri9C5INCy0LjQtD9cbiAgICAgICAgMyAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxuICAgICAgICAwIC8vINCe0YLRgdGC0YPQvyAo0LIg0LHQsNC50YLQsNGFKSDQvtGCINC90LDRh9Cw0LvQsCDQtNCw0L3QvdGL0YUsINC/0YDQuNC90LDQtNC70LXQttCw0YnQuNGFINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90LVcbiAgICApO1xuICAgIC8vINCS0LrQu9GO0YfQsNC10Lwg0LDRgtGA0LjQsdGD0YJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uKTtcblxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBtb2RlbC5tb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCk7XG4gICAgdmFyIHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydFRleENvb3JkJyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgdGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbiwgLy8g0L3QsNGIINCw0YLRgNC40LHRg9GCXG4gICAgICAgIDIsIC8vINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINCw0YLRgNC40LHRg9GCXG4gICAgICAgIGdsLkZMT0FULCAvLyDQotC40L8g0LrQsNC20LTQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQsdGD0YTQtdGA0LBcbiAgICAgICAgZ2wuRkFMU0UsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XG4gICAgICAgIDIgKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIC8vINCg0LDQt9C80LXRgCDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdGLICjQsdCw0LnRgilcbiAgICAgICAgMCAvLyDQntGC0YHRgtGD0L8gKNCyINCx0LDQudGC0LDRhSkg0L7RgiDQvdCw0YfQsNC70LAg0LTQsNC90L3Ri9GFLCDQv9GA0LjQvdCw0LTQu9C10LbQsNGJ0LjRhSDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdC1XG4gICAgKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXhDb29yZEF0dHJpYnV0ZUxvY2F0aW9uKTtcblxuICAgIC8vINCd0L7RgNC80LDQu9C4INCyINGI0LXQudC00LXRgNC1XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG1vZGVsLm1vZGVsTm9ybWFsQnVmZmVyT2JqZWN0KTtcbiAgICB2YXIgbm9ybWFsQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydE5vcm1hbCcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgIG5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uLCAvLyDQvdCw0Ygg0LDRgtGA0LjQsdGD0YJcbiAgICAgICAgMywgLy8g0JrQvtC70LjRh9C10YHRgtCy0L4g0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0LDRgtGA0LjQsdGD0YJcbiAgICAgICAgZ2wuRkxPQVQsIC8vINCi0LjQvyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCx0YPRhNC10YDQsFxuICAgICAgICBnbC5UUlVFLCAvLyDQndC+0YDQvNCw0LvQuNC30L7QstCw0L3QvdGL0Lkg0LLQuNC0P1xuICAgICAgICAzICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCAvLyDQoNCw0LfQvNC10YAg0L7QtNC90L7QuSDQstC10YDRiNC40L3RiyAo0LHQsNC50YIpXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxuICAgICk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobm9ybWFsQXR0cmlidXRlTG9jYXRpb24pO1xuXG59O1xuXG5Nb2RlbFZpZXcucHJvdG90eXBlLnN0YXJ0UmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG5cbiAgICAvLyDQnNCw0YLRgNC40YbRiyAtINC80LXRgdGC0L7Qv9C+0LvQvtC20LXQvdC40LUg0LIg0YjQtdC50LTQtdGA0LDRhVxuICAgIHRoaXMubWF0V29ybGRVbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXJQcm9ncmFtLCAnbVdvcmxkJyk7XG4gICAgdGhpcy5tYXRWaWV3VW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgJ21WaWV3Jyk7XG4gICAgdGhpcy5tYXRQcm9qZWN0aW9uVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgJ21Qcm9qZWN0aW9uJyk7XG5cbiAgICAvLyDQodCw0LzQuCDQvNCw0YLRgNC40YbRi1xuICAgIHZhciB3b3JsZE1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIHZhciBwcm9qZWN0aW9uTWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgbWF0NC5pZGVudGl0eSh3b3JsZE1hdHJpeCk7XG5cbiAgICAvLyDQn9C+0LvQtSDQvtCx0LfQvtGA0LAgKNCyINGA0LDQtNC40LDQvdCw0YUpLCB2aWV3cG9ydCwgY2xvc2VzdCBwbGFuZSwgZmFyIHBsYW5lXG4gICAgbWF0NC5wZXJzcGVjdGl2ZShwcm9qZWN0aW9uTWF0cml4LCBnbE1hdHJpeC50b1JhZGlhbigzMCksIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy5jYW52YXMuaGVpZ2h0LCAwLjEsIDEwMDAuMCk7XG5cbiAgICAvLyDQmtCw0LrRg9GOINGI0LXQudC00LXRgNC90YPRjiDQv9GA0L7Qs9GA0LDQvNC80YMg0LjRgdC/0L7Qu9GM0LfRg9C10LxcbiAgICBnbC51c2VQcm9ncmFtKHRoaXMuc2hhZGVyUHJvZ3JhbSk7XG5cbiAgICAvLyDQn9C10YDQtdC00LDQtdC8INCyINGI0LXQudC00LXRgC4gVFJVRSAtINGH0YLQvtCx0Ysg0YLRgNCw0L3RgdC/0L7QvdC40YDQvtCy0LDRgtGMXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdih0aGlzLm1hdFdvcmxkVW5pZm9ybUxvY2F0aW9uLCBnbC5GQUxTRSwgd29ybGRNYXRyaXgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5tYXRWaWV3VW5pZm9ybUxvY2F0aW9uLCBnbC5GQUxTRSwgdGhpcy5jYW1lcmEubWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubWF0UHJvamVjdGlvblVuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHByb2plY3Rpb25NYXRyaXgpO1xuXG4gICAgdGhpcy5iaW5kQ2FudmFzSGFuZGxlcnMoKTtcblxuICAgIC8vINCh0LHQtdGA0LXQs9Cw0LXQvCDQstGL0YfQuNGB0LvQuNGC0LXQu9GM0L3Ri9C1INC80L7RidC90L7RgdGC0LhcbiAgICAvLyDQk9C70LDQstC90YvQuSDRhtC40LrRgCDRgNC10L3QtNC10YDQsFxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG59O1xuXG4vKipcbiAqIFJlbmRlciBsb29wXG4gKi9cbk1vZGVsVmlldy5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uICgpXG57XG4gICAgdmFyIGdsID0gdGhpcy5nbDtcbiAgICAvLyDQntCx0L3QvtCy0LvRj9C10Lwg0L/QtdGA0LXQvNC10L3QvdGD0Y4g0LIg0YjQtdC50LTQtdGA0LVcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubWF0Vmlld1VuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHRoaXMuY2FtZXJhLm1hdHJpeCk7XG5cbiAgICAvLyDQndCw0LfQvdCw0YfQtdC90LjQtSDRgtC10LrRgdGC0YPRgNGLXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5tb2RlbFRleHR1cmUpO1xuXG4gICAgLy8g0JDQutGC0LjQstC90YvQuSDRgdC70L7RgiDRgtC10LrRgdGC0YPRgNGLXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG5cbiAgICAvLyDQptCy0LXRgiDQvtGH0LjRgdGC0LrQuFxuICAgIGdsLmNsZWFyQ29sb3IoMC44LCAwLjksIDAuOSAsMS4wKTtcbiAgICBnbC5jbGVhcihnbC5ERVBUSF9CVUZGRVJfQklUIHwgZ2wuQ09MT1JfQlVGRkVSX0JJVCApO1xuXG4gICAgZ2wuZHJhd0VsZW1lbnRzKFxuICAgICAgICBnbC5UUklBTkdMRVMsIC8vINCa0LDQuiDRgNC40YHRg9C10LwsXG4gICAgICAgIHRoaXMubW9kZWwubW9kZWxJbmRleGVzLmxlbmd0aCxcbiAgICAgICAgZ2wuVU5TSUdORURfU0hPUlQsIC8vINCi0LjQv1xuICAgICAgICAwIC8vINCh0LrQvtC70YzQutC+INC/0YDQvtC/0YPRgdC60LDQvCDQstC10YDRiNC40L1cbiAgICApO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG59O1xuXG5cbk1vZGVsVmlldy5wcm90b3R5cGUuYmluZENhbnZhc0hhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZW5zaXRpdml0eSA9IDE1O1xuXG4gICAgdmFyIGlzTW91c2VQcmVzc2VkID0gZmFsc2U7XG4gICAgdmFyIGluaXRpYWxFdmVudCA9IG51bGw7XG5cbiAgICB2YXIgY2FtZXJhID0gdGhpcy5jYW1lcmE7XG5cbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlzTW91c2VQcmVzc2VkID0gdHJ1ZTtcbiAgICAgICAgaW5pdGlhbEV2ZW50ID0gZTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpc01vdXNlUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICBpbml0aWFsRXZlbnQgPSBudWxsO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGlzTW91c2VQcmVzc2VkKSB7XG4gICAgICAgICAgICB2YXIgZGlmZlggPSBpbml0aWFsRXZlbnQuY2xpZW50WCAtIGUuY2xpZW50WDtcbiAgICAgICAgICAgIHZhciBkaWZmWSA9IGluaXRpYWxFdmVudC5jbGllbnRZIC0gZS5jbGllbnRZO1xuICAgICAgICAgICAgaW5pdGlhbEV2ZW50ID0gZTtcblxuICAgICAgICAgICAgY2FtZXJhLm1vdmUoZGlmZlgsIGRpZmZZKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTsiLCIvKipcbiAqIFNoYWRlciBjb21waWxlclxuICogU2ltcGx5IG1ha2VzIFdlYkdMUHJvZ3JhbSBmcm9tIHNoYWRlciBzb3VyY2VzXG4gKlxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IHdlYkdMUmVuZGVyaW5nQ29udGVudFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFNoYWRlckNvbXBpbGVyKHdlYkdMUmVuZGVyaW5nQ29udGVudCkge1xuICAgIHRoaXMud2ViR0xDb250ZXh0ID0gd2ViR0xSZW5kZXJpbmdDb250ZW50OyAgICAgXG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2ZXJ0ZXhTaGFkZXJTb3VyY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudFNoYWRlclNvdXJjZVxuICogQHJldHVybiB7V2ViR0xQcm9ncmFtfVxuICovXG5TaGFkZXJDb21waWxlci5wcm90b3R5cGUubWFrZVByb2dyYW0gPSBmdW5jdGlvbiAodmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSkge1xuICAgIHZhciBnbCA9IHRoaXMud2ViR0xDb250ZXh0O1xuXG4gICAgLy8gQ3JlYXRpbmcgc2hhZGVyXG4gICAgdmFyIHZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICB2YXIgZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcblxuICAgIC8vIFNldHRpbmcgc2hhZGVyIHNvdXJjZXNcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVyLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpO1xuICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpO1xuXG4gICAgLy8gQ29tcGlsaW5nIHNoYWRlclxuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcblxuICAgIC8vIENoZWNraW5nIGNvbXBpbGF0aW9uIHN0YXR1c1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHZlcnRleFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgY29tcGlsaW5nIHZlcnRleCBzaGFkZXIhJywgZ2wuZ2V0U2hhZGVySW5mb0xvZyh2ZXJ0ZXhTaGFkZXIpKTtcblxuICAgIH1cblxuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBjb21waWxpbmcgZnJhZ21lbnQgc2hhZGVyIScsIGdsLmdldFNoYWRlckluZm9Mb2coZnJhZ21lbnRTaGFkZXIpKTtcbiAgICB9XG5cbiAgICAvLyBXZSB3YW50IHRvIG1ha2UgYSBwcm9ncmFtIHNoYWRlciBzb3VyY2VzXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cbiAgICAvLyBXZWJHTCBrbm93cyB0eXBlIG9mIGVhY2ggc2hhZGVyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcblxuICAgIC8vIExpbmtpbmdcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcblxuICAgIC8vIERvIHdlIGhhdmUgbGlua2luZyBlcnJvcnM/XG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmtpbmcgZXJyb3IhJywgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuICAgIH1cblxuICAgIC8vIE9ubHkgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICBnbC52YWxpZGF0ZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLlZBTElEQVRFX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWxpZGF0aW5nIGVycm9yIScsIGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvZ3JhbTtcbn07XG5cbiIsIi8qKlxuICogVGhpcyBpcyB0aGUgcGxhY2Ugd2hlcmUgbWFnaWMgaGFwcGVucy5cbiAqIEhhbmRsaW5nIGV2ZW50c1xuICpcbiAqIEBwYXJhbSB7Q2FudmFzU3VyZmFjZX0gc3VyZmFjZVxuICogQHBhcmFtIHtNb2RlbFZpZXd9IG1vZGVsVmlld1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENvbXBvbmVudHNQYW5lbChzdXJmYWNlLCBtb2RlbFZpZXcpXG57XG4gICAgdGhpcy5fc3VyZmFjZSA9IHN1cmZhY2U7XG4gICAgXG4gICAgdGhpcy5fZmlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVVcGxvYWRlcicpO1xuICAgIHRoaXMuX2J0blVwZGF0ZVRleHR1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlVGV4dHVyZScpO1xuICAgIHRoaXMuX2J0bkFkZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuQWRkVGV4dCcpO1xuICAgIHRoaXMuX3NlbGVjdEJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0QmFja2dyb3VuZCcpO1xuICAgIHRoaXMuX21vZGVsVmlldyA9IG1vZGVsVmlldztcbn1cblxuQ29tcG9uZW50c1BhbmVsLnByb3RvdHlwZS5iaW5kSGFuZGxlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIFxuICAgIC8vIEFkZCBsaXN0ZW5lciBmb3IgYSBjbGljayBldmVudCBvbiB0ZXh0IGJ1dHRvblxuICAgIHRoaXMuX2J0bkFkZFRleHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucHVzaExhYmVsKCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gVXBkYXRlIGN1cnJlbnQgdGV4dHVyZSBidXR0b25cbiAgICB0aGlzLl9idG5VcGRhdGVUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9tb2RlbFZpZXcuc2V0VGV4dHVyZShzZWxmLl9zdXJmYWNlLnRvSW1hZ2UoKSk7XG4gICAgfSk7XG5cbiAgICAvLyBPbiBjbGljayB3ZSBzZXQgY3VycmVudCB2YWx1ZSB0byBlbXB0eSBhbmQgdGhlIHJlYXNvblxuICAgIC8vIHdoeSB3ZSBhcmUgZG9pbmcgdGhpcyBpcyBiZWNhdXNlIHdlIHdhbnQgdG9cbiAgICAvLyBhZGQgbmV3IGltYWdlIG9uIHRoZSBzdXJmYWNlLCBldmVuIGlmIGl0IGlzIHRoZVxuICAgIC8vIHNhbWUgZmlsZSAoaW4gY2FzZSBpZiB1c2VyIHNlbGVjdGVkIGl0IGVhcmxpZXIpXG4gICAgdGhpcy5fZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIH0pO1xuXG4gICAgLy8gU2V0dGluZyBjbGVhciBjb2xvciBmb3IgYSBjYW52YXMgc3VyZmFjZVxuICAgIHRoaXMuX3NlbGVjdEJhY2tncm91bmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBUaGVyZSBpcyBhbiBlbXB0eSB2YWx1ZSBpbiB0aGUgbGlzdFxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgc2VsZi5fc3VyZmFjZS5zZXRDbGVhckNvbG9yKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gT24gY2hhbmdlIHdlIGFyZSBsb2FkaW5nIGEgZmlsZS5cbiAgICB0aGlzLl9maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gV2UgbmVlZCBvbmx5IG9uZSBmaWxlLlxuICAgICAgICAvLyBUaGUgZmlyc3Qgb25lLlxuICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgICB2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBkYXRhSW1hZ2UgPSBldmVudC5jdXJyZW50VGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gZGF0YUltYWdlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBhZGRpbmcgdXBsb2FkZWQgaW1hZ2UgdG8gdGhlIHN1cmZhY2VcbiAgICAgICAgICAgIHNlbGYuX3N1cmZhY2UucHVzaEltYWdlKGltYWdlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgfSk7XG59O1xuIiwiLyoqXG4gKiBQYW5lbCBmb3IgaW50ZXJhY3Rpbmcgd2l0aCBtb2RlbCB2aWV3IGVsZW1lbnRcbiAqIFpvb21pbmcsIHR5cGUgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtNb2RlbFZpZXd9IG1vZGVsVmlld1xuICogQHBhcmFtIHt7TW9kZWx9fSBtb2RlbHNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNb2RlbFZpZXdQYW5lbChtb2RlbFZpZXcsIG1vZGVscylcbntcbiAgICB0aGlzLl9idG5ab29tSW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuWm9vbUluJyk7XG4gICAgdGhpcy5fYnRuWm9vbU91dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5ab29tT3V0Jyk7XG4gICAgdGhpcy5fY3VwVHlwZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXBUeXBlU2VsZWN0Jyk7XG5cbiAgICB0aGlzLl9tb2RlbFZpZXcgPSBtb2RlbFZpZXc7XG4gICAgdGhpcy5fbW9kZWxzID0gbW9kZWxzO1xufVxuXG4vKipcbiAqIEJpbmRzIGFsbCBldmVudCBoYW5kbGVyc1xuICovXG5Nb2RlbFZpZXdQYW5lbC5wcm90b3R5cGUuYmluZEhhbmRsZXJzID0gZnVuY3Rpb24gKClcbntcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBab29taW5nIGJ1dHRvbnNcbiAgICB0aGlzLl9idG5ab29tSW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX21vZGVsVmlldy5jYW1lcmEuem9vbUluKCk7XG4gICAgfSk7XG4gICAgdGhpcy5fYnRuWm9vbU91dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fbW9kZWxWaWV3LmNhbWVyYS56b29tT3V0KCk7XG4gICAgfSk7XG5cbiAgICAvLyBDaGFuZ2luZyBtb2RlbCB0eXBlXG4gICAgdGhpcy5fY3VwVHlwZVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZCA9IHRoaXMudmFsdWU7XG4gICAgICAgIHNlbGYuX21vZGVsVmlldy5zZXRNb2RlbChzZWxmLl9tb2RlbHNbc2VsZWN0ZWRdKTtcbiAgICB9KTtcbn07IiwiLyoqXG4gKiBQYXJ0IG9mIHRoZSBkb2N1bWVudCBmb3IgbWFuaXB1bGF0aW9uIHdpdGggcHJvcGVydGllcyBcbiAqIG9mIHRoZSBzZWxlY3RlZCBVSUVsZW1lbnQgb24gQ2FudmFzU3VyZmFjZVxuICpcbiAqIEF3YXJlIG9mIHRoZSBkb2N1bWVudCBjb250ZW50XG4gKiBIYW5kbGVzIEhUTUwgbWFuaXB1bGF0aW9uc1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBQcm9wZXJ0aWVzUGFuZWwoc3VyZmFjZSlcbntcbiAgICB0aGlzLl90ZXh0UGFuZWwgPSB7XG4gICAgICAgIHBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dE9wdGlvbnMnKSxcbiAgICAgICAgc2VsZWN0Rm9udDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZvbnRTZWxlY3QnKSxcbiAgICAgICAgc2VsZWN0Q29sb3I6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb2xvckZvbnRTZWxlY3QnKSxcbiAgICAgICAgdGV4dEFyZWE6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RlZFRleHRDb250ZW50JyksXG4gICAgICAgIHRleHRVcEJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRVcEJ0bicpLFxuICAgICAgICB0ZXh0RG93bkJ1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHREb3duQnRuJylcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuX2NvbW1vblBhbmVsID0ge1xuICAgICAgICBwYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1vbk9wdGlvbnMnKSxcbiAgICAgICAgcmVtb3ZlQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVtb3ZlQnRuJyksXG4gICAgICAgIHVwQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBCdG4nKSxcbiAgICAgICAgZG93bkJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rvd25CdG4nKVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5faW1hZ2VQYW5lbCA9IHtcbiAgICAgICAgcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbWFnZU9wdGlvbnMnKVxuICAgIH07XG4gICAgdGhpcy5fZW1wdHlQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub1NlbGVjdGVkT3B0aW9ucycpO1xuICAgIFxuICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5fc3VyZmFjZSA9IHN1cmZhY2U7XG59XG5cbi8qKlxuICogQmluZHMgaGFuZGxlcnMgdG8gdGhlIGV2ZW50c1xuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLmJpbmRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyBTZWxlY3Rpb24gZXZlbnRzIGZyb20gY2FudmFzIHN1cmZhY2VcbiAgICB0aGlzLl9zdXJmYWNlLmFkZFNlbGVjdEV2ZW50SGFuZGxlcihmdW5jdGlvbiAodWlFbGVtZW50KSB7XG4gICAgICAgIHNlbGYuc2V0U2VsZWN0ZWQodWlFbGVtZW50KTtcbiAgICB9KTtcbiAgICB0aGlzLl9zdXJmYWNlLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5zZXRTZWxlY3RlZChudWxsKTtcbiAgICB9KTtcblxuICAgIC8vIEJ1dHRvbiBjbGljayBmb3IgY29tbW9uIG9wdGlvbnMgLSByZW1vdmUgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnRcbiAgICB0aGlzLl9jb21tb25QYW5lbC5yZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW1vdmVTZWxlY3RlZCgpO1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gTW92ZSBmb3JlZ3JvdW5kXG4gICAgdGhpcy5fY29tbW9uUGFuZWwudXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5zZWxlY3RlZFRvRm9yZWdyb3VuZCgpO1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gTW92ZSBiYWNrZ3JvdW5kXG4gICAgdGhpcy5fY29tbW9uUGFuZWwuZG93bkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnNlbGVjdGVkVG9CYWNrZ3JvdW5kKCk7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBCaW5kaW5nIHRleHQgY2hhbmdlIGV2ZW50IHRocm91Z2ggdGV4dCBhcmVhIGVsZW1lbnRcbiAgICB0aGlzLl90ZXh0UGFuZWwudGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyBJZiB0aGlzIGV2ZW50IGhhcHBlbmVkXG4gICAgICAgIC8vIHRoZW4gd2UgaGF2ZSBhIGxhYmVsIGFzIHNlbGVjdGVkIGVsZW1lbnRcbiAgICAgICAgc2VsZi5fc2VsZWN0ZWRFbGVtZW50LnNldFRleHQodGhpcy52YWx1ZSk7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGVzIHNlbGVjdGVkIGZvbnRcbiAgICB0aGlzLl90ZXh0UGFuZWwuc2VsZWN0Rm9udC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX3NlbGVjdGVkRWxlbWVudC5zZXRGb250KHRoaXMudmFsdWUpO1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlcyBzZWxlY3RlZCBjb2xvclxuICAgIHRoaXMuX3RleHRQYW5lbC5zZWxlY3RDb2xvci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX3NlbGVjdGVkRWxlbWVudC5zZXRDb2xvcih0aGlzLnZhbHVlKTtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogU2V0cyBzZWxlY3RlZCBlbGVtZW50LlxuICogU2hvdyBwcm9wZXJ0aWVzIHdpbmRvdyBkZXBlbmRpbmcgb24gd2hhdCBpcyB0aGUgdHlwZSBvZiBhbiBlbGVtZW50IFxuICogXG4gKiBAcGFyYW0ge1VJRWxlbWVudHxudWxsfSB1aUVsZW1lbnRcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zZXRTZWxlY3RlZCA9IGZ1bmN0aW9uICh1aUVsZW1lbnQpIHtcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnQgPSB1aUVsZW1lbnQ7XG4gICAgXG4gICAgaWYgKHVpRWxlbWVudCBpbnN0YW5jZW9mIFVJTGFiZWxFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuc2hvd1RleHRQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgXG4gICAgaWYgKHVpRWxlbWVudCBpbnN0YW5jZW9mIFVJSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuc2hvd0ltYWdlUHJvcGVydGllcygpO1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgXG4gICAgdGhpcy5zaG93Tm90aGluZ1NlbGVjdGVkUGFuZWwoKTtcbn07XG5cbi8qKlxuICogSGlkZXMgYWxsIG9mIHRoZSBwYW5lbHNcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5oaWRlQWxsID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3RleHRQYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB0aGlzLl9pbWFnZVBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIHRoaXMuX2NvbW1vblBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIHRoaXMuX2VtcHR5UGFuZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG59O1xuXG4vKipcbiAqIEhpZGVzIGFsbCBleGNlcHQgdGV4dCBwcm9wZXJ0aWVzIHBhbmVsXG4gKi9cblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd1RleHRQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGlkZUFsbCgpO1xuICAgIHRoaXMuX3RleHRQYW5lbC50ZXh0QXJlYS5pbm5lckhUTUwgPSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQuZ2V0VGV4dCgpO1xuICAgIHRoaXMuX3RleHRQYW5lbC5zZWxlY3RGb250LnZhbHVlID0gdGhpcy5fc2VsZWN0ZWRFbGVtZW50LmdldEZvbnQoKTtcbiAgICB0aGlzLl90ZXh0UGFuZWwuc2VsZWN0Q29sb3IudmFsdWUgPSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQuZ2V0Q29sb3IoKTtcbiAgICB0aGlzLl90ZXh0UGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgdGhpcy5fY29tbW9uUGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59O1xuXG4vKipcbiAqIEhpZGVzIGV2ZXJ5dGhpbmcgZXhjZXB0IGltYWdlcyBwYW5lbFxuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLnNob3dJbWFnZVByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaWRlQWxsKCk7XG4gICAgdGhpcy5faW1hZ2VQYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB0aGlzLl9jb21tb25QYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07XG5cbi8qKlxuICogSGlkZXMgYWxsIGV4Y2VwdCBcIm5vdGhpbmcgc2VsZWN0ZWRcIiBwYW5lbFxuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLnNob3dOb3RoaW5nU2VsZWN0ZWRQYW5lbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmhpZGVBbGwoKTtcbiAgICB0aGlzLl9lbXB0eVBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xuICAgIHZhciBzdXJmYWNlID0gbmV3IENhbnZhc1N1cmZhY2UoY2FudmFzKTtcbiAgICBzdXJmYWNlLnJlbmRlcigpO1xuXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgcGFuZWxcbiAgICAvLyBhbmQgYXR0YWNoaW5nIGl0IHRvIGNhbnZhcyBldmVudHNcbiAgICB2YXIgcHJvcGVydGllc1BhbmVsID0gbmV3IFByb3BlcnRpZXNQYW5lbChzdXJmYWNlKTtcbiAgICBwcm9wZXJ0aWVzUGFuZWwuYmluZEhhbmRsZXJzKCk7XG5cbiAgICB2YXIgY3VwU3VyZmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXBTdXJmYWNlJyk7XG4gICAgdmFyIGxvYWRlciA9IG5ldyBSZXNvdXJjZUxvYWRlcigpO1xuXG4gICAgdmFyIHJlc291cmNlUHJlcGFyZXIgPSBuZXcgUmVzb3VyY2VQcmVwYXJlcihsb2FkZXIsIFtcbiAgICAgICAge2tleTogJ21vZGVsQ3VwMScsIHNyYzogJy9tb2RlbHMvY3VwMS5qc29uJywgdHlwZTogJ2pzb24nfSxcbiAgICAgICAge2tleTogJ21vZGVsQ3VwMicsIHNyYzogJy9tb2RlbHMvY3VwMi5qc29uJywgdHlwZTogJ2pzb24nfSxcbiAgICAgICAge2tleTogJ3ZlcnRleFNoYWRlcicsIHNyYzogJy9zaGFkZXJzL2ZyYWdtZW50Lmdsc2wnLCB0eXBlOiAndGV4dCd9LFxuICAgICAgICB7a2V5OiAnZnJhZ21lbnRTaGFkZXInLCBzcmM6ICcvc2hhZGVycy92ZXJ0ZXguZ2xzbCcsIHR5cGU6ICd0ZXh0J30sXG4gICAgICAgIHtrZXk6ICdpbml0aWFsVGV4dHVyZScsIHNyYzogJy9pbWcvbG9nb0dyZXkuanBnJywgdHlwZTogJ2ltYWdlJ31cbiAgICBdLCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgLy8gVE9ETzogZXh0cmFjdCBhbGwgY2hlY2tzXG4gICAgICAgIHZhciBnbENvbnRleHQgPSBjdXBTdXJmYWNlLmdldENvbnRleHQoJ3dlYmdsJyk7XG5cbiAgICAgICAgaWYgKCFnbENvbnRleHQpIHtcbiAgICAgICAgICAgIGdsQ29udGV4dCA9IGN1cFN1cmZhY2UuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZ2xDb250ZXh0KSB7XG4gICAgICAgICAgICBhbGVydCgnU2VlbXMgbGlrZSB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWJHTC4gQ29tZSBiYWNrIGxhdGVyIHdoZW4geW91IHVwZGF0ZSB5b3VyIGJyb3dzZXIhJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkdMIHN1cHBvcnQgaXMgcmVxdWlyZWQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBrZXkgbXVzdCBiZSBzYW1lIGFzIHNlbGVjdCBvcHRpb24gdmFsdWVcbiAgICAgICAgdmFyIG1vZGVscyA9IHtcbiAgICAgICAgICAgIGN1cDE6IG5ldyBNb2RlbChnbENvbnRleHQsIFN0b3JhZ2UuZ2V0KCdtb2RlbEN1cDEnKSksXG4gICAgICAgICAgICBjdXAyOiBuZXcgTW9kZWwoZ2xDb250ZXh0LCBTdG9yYWdlLmdldCgnbW9kZWxDdXAyJykpXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIG1vZGVsVmlldyA9IG5ldyBNb2RlbFZpZXcoXG4gICAgICAgICAgICBjdXBTdXJmYWNlLFxuICAgICAgICAgICAgZ2xDb250ZXh0LFxuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ2luaXRpYWxUZXh0dXJlJyksXG4gICAgICAgICAgICBTdG9yYWdlLmdldCgnZnJhZ21lbnRTaGFkZXInKSxcbiAgICAgICAgICAgIFN0b3JhZ2UuZ2V0KCd2ZXJ0ZXhTaGFkZXInKVxuICAgICAgICApO1xuXG4gICAgICAgIG1vZGVsVmlldy5zZXRNb2RlbChtb2RlbHMuY3VwMSk7XG4gICAgICAgIG1vZGVsVmlldy5zdGFydFJlbmRlcigpO1xuXG4gICAgICAgIC8vIFBhbmVsIGZvciBjcmVhdGluZyBuZXcgZWxlbWVudHMgb25cbiAgICAgICAgdmFyIGNvbXBvbmVudFBhbmVsID0gbmV3IENvbXBvbmVudHNQYW5lbChzdXJmYWNlLCBtb2RlbFZpZXcpO1xuICAgICAgICBjb21wb25lbnRQYW5lbC5iaW5kSGFuZGxlcnMoKTtcblxuICAgICAgICAvLyBQYW5lbCBmb3IgM0QgbWFnaWNcbiAgICAgICAgdmFyIG1vZGVsVmlld1BhbmVsID0gbmV3IE1vZGVsVmlld1BhbmVsKG1vZGVsVmlldywgbW9kZWxzKTtcbiAgICAgICAgbW9kZWxWaWV3UGFuZWwuYmluZEhhbmRsZXJzKCk7XG4gICAgfSk7XG5cbiAgICByZXNvdXJjZVByZXBhcmVyLnN0YXJ0TG9hZGluZygpO1xufSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
