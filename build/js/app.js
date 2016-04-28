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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsLW1hdHJpeC5qcyIsIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsIkNhbnZhc1VJRmFjdG9yeS5qcyIsIkNhbnZhc1VJSW1hZ2VWaWV3LmpzIiwiQ2FudmFzVUlMYWJlbFZpZXcuanMiLCJDYW52YXNVSVNlbGVjdGVkVmlldy5qcyIsIlBvc2l0aW9uLmpzIiwiUmVzb3VyY2VMb2FkZXIuanMiLCJSZXNvdXJjZVByZXBhcmVyLmpzIiwiU2l6ZS5qcyIsIlN0b3JhZ2UuanMiLCJVSUNvbGxlY3Rpb24uanMiLCJVSUVsZW1lbnQuanMiLCJVSUVsZW1lbnRWaWV3LmpzIiwiVUlJbWFnZUVsZW1lbnQuanMiLCJVSUxhYmVsRWxlbWVudC5qcyIsIkNhbWVyYS5qcyIsIk1vZGVsLmpzIiwiTW9kZWxWaWV3LmpzIiwiU2hhZGVyQ29tcGlsZXIuanMiLCJDb21wb25lbnRzUGFuZWwuanMiLCJNb2RlbFZpZXdQYW5lbC5qcyIsIlByb3BlcnRpZXNQYW5lbC5qcyIsImluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDblRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDck5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2xFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IGdsLW1hdHJpeCAtIEhpZ2ggcGVyZm9ybWFuY2UgbWF0cml4IGFuZCB2ZWN0b3Igb3BlcmF0aW9uc1xyXG4gKiBAYXV0aG9yIEJyYW5kb24gSm9uZXNcclxuICogQGF1dGhvciBDb2xpbiBNYWNLZW56aWUgSVZcclxuICogQHZlcnNpb24gMi4zLjJcclxuICovXHJcblxyXG4vKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi5cclxuXHJcbiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cclxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxyXG4gVEhFIFNPRlRXQVJFLiAqL1xyXG5cclxuIWZ1bmN0aW9uKHQsYSl7aWYoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUpbW9kdWxlLmV4cG9ydHM9YSgpO2Vsc2UgaWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXSxhKTtlbHNle3ZhciBuPWEoKTtmb3IodmFyIHIgaW4gbikoXCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/ZXhwb3J0czp0KVtyXT1uW3JdfX0odGhpcyxmdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbih0KXtmdW5jdGlvbiBhKHIpe2lmKG5bcl0pcmV0dXJuIG5bcl0uZXhwb3J0czt2YXIgbz1uW3JdPXtleHBvcnRzOnt9LGlkOnIsbG9hZGVkOiExfTtyZXR1cm4gdFtyXS5jYWxsKG8uZXhwb3J0cyxvLG8uZXhwb3J0cyxhKSxvLmxvYWRlZD0hMCxvLmV4cG9ydHN9dmFyIG49e307cmV0dXJuIGEubT10LGEuYz1uLGEucD1cIlwiLGEoMCl9KFtmdW5jdGlvbih0LGEsbil7YS5nbE1hdHJpeD1uKDEpLGEubWF0Mj1uKDIpLGEubWF0MmQ9bigzKSxhLm1hdDM9big0KSxhLm1hdDQ9big1KSxhLnF1YXQ9big2KSxhLnZlYzI9big5KSxhLnZlYzM9big3KSxhLnZlYzQ9big4KX0sZnVuY3Rpb24odCxhKXt2YXIgbj17fTtuLkVQU0lMT049MWUtNixuLkFSUkFZX1RZUEU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIEZsb2F0MzJBcnJheT9GbG9hdDMyQXJyYXk6QXJyYXksbi5SQU5ET009TWF0aC5yYW5kb20sbi5FTkFCTEVfU0lNRD0hMSxuLlNJTURfQVZBSUxBQkxFPW4uQVJSQVlfVFlQRT09PUZsb2F0MzJBcnJheSYmXCJTSU1EXCJpbiB0aGlzLG4uVVNFX1NJTUQ9bi5FTkFCTEVfU0lNRCYmbi5TSU1EX0FWQUlMQUJMRSxuLnNldE1hdHJpeEFycmF5VHlwZT1mdW5jdGlvbih0KXtuLkFSUkFZX1RZUEU9dH07dmFyIHI9TWF0aC5QSS8xODA7bi50b1JhZGlhbj1mdW5jdGlvbih0KXtyZXR1cm4gdCpyfSxuLmVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiBNYXRoLmFicyh0LWEpPD1uLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh0KSxNYXRoLmFicyhhKSl9LHQuZXhwb3J0cz1ufSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvKXt2YXIgdT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB1WzBdPXQsdVsxXT1hLHVbMl09bix1WzNdPW8sdX0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHR9LG8udHJhbnNwb3NlPWZ1bmN0aW9uKHQsYSl7aWYodD09PWEpe3ZhciBuPWFbMV07dFsxXT1hWzJdLHRbMl09bn1lbHNlIHRbMF09YVswXSx0WzFdPWFbMl0sdFsyXT1hWzFdLHRbM109YVszXTtyZXR1cm4gdH0sby5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bip1LW8qcjtyZXR1cm4gbD8obD0xL2wsdFswXT11KmwsdFsxXT0tcipsLHRbMl09LW8qbCx0WzNdPW4qbCx0KTpudWxsfSxvLmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdO3JldHVybiB0WzBdPWFbM10sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHRbM109bix0fSxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdKnRbM10tdFsyXSp0WzFdfSxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9blswXSxNPW5bMV0scz1uWzJdLGk9blszXTtyZXR1cm4gdFswXT1yKmUrdSpNLHRbMV09byplK2wqTSx0WzJdPXIqcyt1KmksdFszXT1vKnMrbCppLHR9LG8ubXVsPW8ubXVsdGlwbHksby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTSt1KmUsdFsxXT1vKk0rbCplLHRbMl09ciotZSt1Kk0sdFszXT1vKi1lK2wqTSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9blswXSxNPW5bMV07cmV0dXJuIHRbMF09ciplLHRbMV09byplLHRbMl09dSpNLHRbM109bCpNLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPS1uLHRbM109cix0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109YVsxXSx0fSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDIoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKSl9LG8uTERVPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzJdPXJbMl0vclswXSxuWzBdPXJbMF0sblsxXT1yWzFdLG5bM109clszXS10WzJdKm5bMV0sW3QsYSxuXX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdH0sby5zdWI9by5zdWJ0cmFjdCxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT1hWzBdLE09YVsxXSxzPWFbMl0saT1hWzNdO3JldHVybiBNYXRoLmFicyhuLWUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhlKSkmJk1hdGguYWJzKG8tTSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKE0pKSYmTWF0aC5hYnModS1zKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMocykpJiZNYXRoLmFicyhsLWkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhpKSl9LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHR9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg2KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHRbNF09MCx0WzVdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDYpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYVs0XT10WzRdLGFbNV09dFs1XSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHRbNF09MCx0WzVdPTAsdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8sdSxsKXt2YXIgZT1uZXcgci5BUlJBWV9UWVBFKDYpO3JldHVybiBlWzBdPXQsZVsxXT1hLGVbMl09bixlWzNdPW8sZVs0XT11LGVbNV09bCxlfSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8sdSxsKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHRbNF09dSx0WzVdPWwsdH0sby5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1uKnUtcipvO3JldHVybiBNPyhNPTEvTSx0WzBdPXUqTSx0WzFdPS1yKk0sdFsyXT0tbypNLHRbM109bipNLHRbNF09KG8qZS11KmwpKk0sdFs1XT0ocipsLW4qZSkqTSx0KTpudWxsfSxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdKnRbM10tdFsxXSp0WzJdfSxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1uWzBdLGk9blsxXSxjPW5bMl0saD1uWzNdLFM9bls0XSxJPW5bNV07cmV0dXJuIHRbMF09cipzK3UqaSx0WzFdPW8qcytsKmksdFsyXT1yKmMrdSpoLHRbM109bypjK2wqaCx0WzRdPXIqUyt1KkkrZSx0WzVdPW8qUytsKkkrTSx0fSxvLm11bD1vLm11bHRpcGx5LG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1NYXRoLnNpbihuKSxpPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqaSt1KnMsdFsxXT1vKmkrbCpzLHRbMl09ciotcyt1KmksdFszXT1vKi1zK2wqaSx0WzRdPWUsdFs1XT1NLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPW5bMF0saT1uWzFdO3JldHVybiB0WzBdPXIqcyx0WzFdPW8qcyx0WzJdPXUqaSx0WzNdPWwqaSx0WzRdPWUsdFs1XT1NLHR9LG8udHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1uWzBdLGk9blsxXTtyZXR1cm4gdFswXT1yLHRbMV09byx0WzJdPXUsdFszXT1sLHRbNF09cipzK3UqaStlLHRbNV09bypzK2wqaStNLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPS1uLHRbM109cix0WzRdPTAsdFs1XT0wLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT1hWzFdLHRbNF09MCx0WzVdPTAsdH0sby5mcm9tVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0xLHRbNF09YVswXSx0WzVdPWFbMV0sdH0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQyZChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiLCBcIit0WzRdK1wiLCBcIit0WzVdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpK01hdGgucG93KHRbNF0sMikrTWF0aC5wb3codFs1XSwyKSsxKX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0WzRdPWFbNF0rbls0XSx0WzVdPWFbNV0rbls1XSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdFs0XT1hWzRdLW5bNF0sdFs1XT1hWzVdLW5bNV0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdFs0XT1hWzRdKm4sdFs1XT1hWzVdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0WzRdPWFbNF0rbls0XSpyLHRbNV09YVs1XStuWzVdKnIsdH0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXSYmdFs0XT09PWFbNF0mJnRbNV09PT1hWzVdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT10WzRdLE09dFs1XSxzPWFbMF0saT1hWzFdLGM9YVsyXSxoPWFbM10sUz1hWzRdLEk9YVs1XTtyZXR1cm4gTWF0aC5hYnMobi1zKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMocykpJiZNYXRoLmFicyhvLWkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhpKSkmJk1hdGguYWJzKHUtYyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKGMpKSYmTWF0aC5hYnMobC1oKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoaCkpJiZNYXRoLmFicyhlLVMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhlKSxNYXRoLmFicyhTKSkmJk1hdGguYWJzKE0tSSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKE0pLE1hdGguYWJzKEkpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDkpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0xLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLmZyb21NYXQ0PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVs0XSx0WzRdPWFbNV0sdFs1XT1hWzZdLHRbNl09YVs4XSx0WzddPWFbOV0sdFs4XT1hWzEwXSx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoOSk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhWzRdPXRbNF0sYVs1XT10WzVdLGFbNl09dFs2XSxhWzddPXRbN10sYVs4XT10WzhdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyx1LGwsZSxNLHMpe3ZhciBpPW5ldyByLkFSUkFZX1RZUEUoOSk7cmV0dXJuIGlbMF09dCxpWzFdPWEsaVsyXT1uLGlbM109byxpWzRdPXUsaVs1XT1sLGlbNl09ZSxpWzddPU0saVs4XT1zLGl9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwsZSxNLHMpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdFs0XT11LHRbNV09bCx0WzZdPWUsdFs3XT1NLHRbOF09cyx0fSxvLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0xLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe2lmKHQ9PT1hKXt2YXIgbj1hWzFdLHI9YVsyXSxvPWFbNV07dFsxXT1hWzNdLHRbMl09YVs2XSx0WzNdPW4sdFs1XT1hWzddLHRbNl09cix0WzddPW99ZWxzZSB0WzBdPWFbMF0sdFsxXT1hWzNdLHRbMl09YVs2XSx0WzNdPWFbMV0sdFs0XT1hWzRdLHRbNV09YVs3XSx0WzZdPWFbMl0sdFs3XT1hWzVdLHRbOF09YVs4XTtyZXR1cm4gdH0sby5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1pKmwtZSpzLGg9LWkqdStlKk0sUz1zKnUtbCpNLEk9bipjK3IqaCtvKlM7cmV0dXJuIEk/KEk9MS9JLHRbMF09YypJLHRbMV09KC1pKnIrbypzKSpJLHRbMl09KGUqci1vKmwpKkksdFszXT1oKkksdFs0XT0oaSpuLW8qTSkqSSx0WzVdPSgtZSpuK28qdSkqSSx0WzZdPVMqSSx0WzddPSgtcypuK3IqTSkqSSx0WzhdPShsKm4tcip1KSpJLHQpOm51bGx9LG8uYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XTtyZXR1cm4gdFswXT1sKmktZSpzLHRbMV09bypzLXIqaSx0WzJdPXIqZS1vKmwsdFszXT1lKk0tdSppLHRbNF09bippLW8qTSx0WzVdPW8qdS1uKmUsdFs2XT11KnMtbCpNLHRbN109cipNLW4qcyx0WzhdPW4qbC1yKnUsdH0sby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdLHU9dFs0XSxsPXRbNV0sZT10WzZdLE09dFs3XSxzPXRbOF07cmV0dXJuIGEqKHMqdS1sKk0pK24qKC1zKm8rbCplKStyKihNKm8tdSplKX0sby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9blswXSxTPW5bMV0sST1uWzJdLGY9blszXSx4PW5bNF0sRD1uWzVdLEY9bls2XSxtPW5bN10sZD1uWzhdO3JldHVybiB0WzBdPWgqcitTKmwrSSpzLHRbMV09aCpvK1MqZStJKmksdFsyXT1oKnUrUypNK0kqYyx0WzNdPWYqcit4KmwrRCpzLHRbNF09ZipvK3gqZStEKmksdFs1XT1mKnUreCpNK0QqYyx0WzZdPUYqcittKmwrZCpzLHRbN109RipvK20qZStkKmksdFs4XT1GKnUrbSpNK2QqYyx0fSxvLm11bD1vLm11bHRpcGx5LG8udHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1uWzBdLFM9blsxXTtyZXR1cm4gdFswXT1yLHRbMV09byx0WzJdPXUsdFszXT1sLHRbNF09ZSx0WzVdPU0sdFs2XT1oKnIrUypsK3MsdFs3XT1oKm8rUyplK2ksdFs4XT1oKnUrUypNK2MsdH0sby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPU1hdGguc2luKG4pLFM9TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09UypyK2gqbCx0WzFdPVMqbytoKmUsdFsyXT1TKnUraCpNLHRbM109UypsLWgqcix0WzRdPVMqZS1oKm8sdFs1XT1TKk0taCp1LHRbNl09cyx0WzddPWksdFs4XT1jLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPW5bMF0sbz1uWzFdO3JldHVybiB0WzBdPXIqYVswXSx0WzFdPXIqYVsxXSx0WzJdPXIqYVsyXSx0WzNdPW8qYVszXSx0WzRdPW8qYVs0XSx0WzVdPW8qYVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0fSxvLmZyb21UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0xLHRbNV09MCx0WzZdPWFbMF0sdFs3XT1hWzFdLHRbOF09MSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0wLHRbM109LW4sdFs0XT1yLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPWFbMV0sdFs1XT0wLHRbNl09MCx0WzddPTAsdFs4XT0xLHR9LG8uZnJvbU1hdDJkPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT0wLHRbM109YVsyXSx0WzRdPWFbM10sdFs1XT0wLHRbNl09YVs0XSx0WzddPWFbNV0sdFs4XT0xLHR9LG8uZnJvbVF1YXQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bituLGU9cityLE09bytvLHM9bipsLGk9cipsLGM9ciplLGg9bypsLFM9byplLEk9bypNLGY9dSpsLHg9dSplLEQ9dSpNO3JldHVybiB0WzBdPTEtYy1JLHRbM109aS1ELHRbNl09aCt4LHRbMV09aStELHRbNF09MS1zLUksdFs3XT1TLWYsdFsyXT1oLXgsdFs1XT1TK2YsdFs4XT0xLXMtYyx0fSxvLm5vcm1hbEZyb21NYXQ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9YVs5XSxoPWFbMTBdLFM9YVsxMV0sST1hWzEyXSxmPWFbMTNdLHg9YVsxNF0sRD1hWzE1XSxGPW4qZS1yKmwsbT1uKk0tbypsLGQ9bipzLXUqbCxiPXIqTS1vKmUsdj1yKnMtdSplLHo9bypzLXUqTSxwPWkqZi1jKkksdz1pKngtaCpJLEU9aSpELVMqSSxBPWMqeC1oKmYsUD1jKkQtUypmLEw9aCpELVMqeCxxPUYqTC1tKlArZCpBK2IqRS12KncreipwO3JldHVybiBxPyhxPTEvcSx0WzBdPShlKkwtTSpQK3MqQSkqcSx0WzFdPShNKkUtbCpMLXMqdykqcSx0WzJdPShsKlAtZSpFK3MqcCkqcSx0WzNdPShvKlAtcipMLXUqQSkqcSx0WzRdPShuKkwtbypFK3UqdykqcSx0WzVdPShyKkUtbipQLXUqcCkqcSx0WzZdPShmKnoteCp2K0QqYikqcSx0WzddPSh4KmQtSSp6LUQqbSkqcSx0WzhdPShJKnYtZipkK0QqRikqcSx0KTpudWxsfSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDMoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIiwgXCIrdFs0XStcIiwgXCIrdFs1XStcIiwgXCIrdFs2XStcIiwgXCIrdFs3XStcIiwgXCIrdFs4XStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKStNYXRoLnBvdyh0WzRdLDIpK01hdGgucG93KHRbNV0sMikrTWF0aC5wb3codFs2XSwyKStNYXRoLnBvdyh0WzddLDIpK01hdGgucG93KHRbOF0sMikpfSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHRbNF09YVs0XStuWzRdLHRbNV09YVs1XStuWzVdLHRbNl09YVs2XStuWzZdLHRbN109YVs3XStuWzddLHRbOF09YVs4XStuWzhdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0WzRdPWFbNF0tbls0XSx0WzVdPWFbNV0tbls1XSx0WzZdPWFbNl0tbls2XSx0WzddPWFbN10tbls3XSx0WzhdPWFbOF0tbls4XSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0WzRdPWFbNF0qbix0WzVdPWFbNV0qbix0WzZdPWFbNl0qbix0WzddPWFbN10qbix0WzhdPWFbOF0qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHRbNF09YVs0XStuWzRdKnIsdFs1XT1hWzVdK25bNV0qcix0WzZdPWFbNl0rbls2XSpyLHRbN109YVs3XStuWzddKnIsdFs4XT1hWzhdK25bOF0qcix0fSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdJiZ0WzRdPT09YVs0XSYmdFs1XT09PWFbNV0mJnRbNl09PT1hWzZdJiZ0WzddPT09YVs3XSYmdFs4XT09PWFbOF19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPXRbNF0sTT10WzVdLHM9dFs2XSxpPXRbN10sYz10WzhdLGg9YVswXSxTPWFbMV0sST1hWzJdLGY9YVszXSx4PWFbNF0sRD1hWzVdLEY9dFs2XSxtPWFbN10sZD1hWzhdO3JldHVybiBNYXRoLmFicyhuLWgpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhoKSkmJk1hdGguYWJzKG8tUyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKFMpKSYmTWF0aC5hYnModS1JKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoSSkpJiZNYXRoLmFicyhsLWYpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhmKSkmJk1hdGguYWJzKGUteCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGUpLE1hdGguYWJzKHgpKSYmTWF0aC5hYnMoTS1EKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoTSksTWF0aC5hYnMoRCkpJiZNYXRoLmFicyhzLUYpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhzKSxNYXRoLmFicyhGKSkmJk1hdGguYWJzKGktbSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGkpLE1hdGguYWJzKG0pKSYmTWF0aC5hYnMoYy1kKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoYyksTWF0aC5hYnMoZCkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17c2NhbGFyOnt9LFNJTUQ6e319O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSgxNik7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoMTYpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYVs0XT10WzRdLGFbNV09dFs1XSxhWzZdPXRbNl0sYVs3XT10WzddLGFbOF09dFs4XSxhWzldPXRbOV0sYVsxMF09dFsxMF0sYVsxMV09dFsxMV0sYVsxMl09dFsxMl0sYVsxM109dFsxM10sYVsxNF09dFsxNF0sYVsxNV09dFsxNV0sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyx1LGwsZSxNLHMsaSxjLGgsUyxJLGYseCl7dmFyIEQ9bmV3IHIuQVJSQVlfVFlQRSgxNik7cmV0dXJuIERbMF09dCxEWzFdPWEsRFsyXT1uLERbM109byxEWzRdPXUsRFs1XT1sLERbNl09ZSxEWzddPU0sRFs4XT1zLERbOV09aSxEWzEwXT1jLERbMTFdPWgsRFsxMl09UyxEWzEzXT1JLERbMTRdPWYsRFsxNV09eCxEfSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxmLHgpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdFs0XT11LHRbNV09bCx0WzZdPWUsdFs3XT1NLHRbOF09cyx0WzldPWksdFsxMF09Yyx0WzExXT1oLHRbMTJdPVMsdFsxM109SSx0WzE0XT1mLHRbMTVdPXgsdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uc2NhbGFyLnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe2lmKHQ9PT1hKXt2YXIgbj1hWzFdLHI9YVsyXSxvPWFbM10sdT1hWzZdLGw9YVs3XSxlPWFbMTFdO3RbMV09YVs0XSx0WzJdPWFbOF0sdFszXT1hWzEyXSx0WzRdPW4sdFs2XT1hWzldLHRbN109YVsxM10sdFs4XT1yLHRbOV09dSx0WzExXT1hWzE0XSx0WzEyXT1vLHRbMTNdPWwsdFsxNF09ZX1lbHNlIHRbMF09YVswXSx0WzFdPWFbNF0sdFsyXT1hWzhdLHRbM109YVsxMl0sdFs0XT1hWzFdLHRbNV09YVs1XSx0WzZdPWFbOV0sdFs3XT1hWzEzXSx0WzhdPWFbMl0sdFs5XT1hWzZdLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTRdLHRbMTJdPWFbM10sdFsxM109YVs3XSx0WzE0XT1hWzExXSx0WzE1XT1hWzE1XTtyZXR1cm4gdH0sby5TSU1ELnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe3ZhciBuLHIsbyx1LGwsZSxNLHMsaSxjO3JldHVybiBuPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxyPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMiksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwwLDEsNCw1KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDAsMSw0LDUpLE09U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMCwyLDQsNikscz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwxLDMsNSw3KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsTSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LHMpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMiwzLDYsNyksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwyLDMsNiw3KSxpPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDAsMiw0LDYpLGM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMSwzLDUsNyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LGkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsYyksdH0sby50cmFuc3Bvc2U9ci5VU0VfU0lNRD9vLlNJTUQudHJhbnNwb3NlOm8uc2NhbGFyLnRyYW5zcG9zZSxvLnNjYWxhci5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1hWzldLGg9YVsxMF0sUz1hWzExXSxJPWFbMTJdLGY9YVsxM10seD1hWzE0XSxEPWFbMTVdLEY9biplLXIqbCxtPW4qTS1vKmwsZD1uKnMtdSpsLGI9cipNLW8qZSx2PXIqcy11KmUsej1vKnMtdSpNLHA9aSpmLWMqSSx3PWkqeC1oKkksRT1pKkQtUypJLEE9Yyp4LWgqZixQPWMqRC1TKmYsTD1oKkQtUyp4LHE9RipMLW0qUCtkKkErYipFLXYqdyt6KnA7cmV0dXJuIHE/KHE9MS9xLHRbMF09KGUqTC1NKlArcypBKSpxLHRbMV09KG8qUC1yKkwtdSpBKSpxLHRbMl09KGYqei14KnYrRCpiKSpxLHRbM109KGgqdi1jKnotUypiKSpxLHRbNF09KE0qRS1sKkwtcyp3KSpxLHRbNV09KG4qTC1vKkUrdSp3KSpxLHRbNl09KHgqZC1JKnotRCptKSpxLHRbN109KGkqei1oKmQrUyptKSpxLHRbOF09KGwqUC1lKkUrcypwKSpxLHRbOV09KHIqRS1uKlAtdSpwKSpxLHRbMTBdPShJKnYtZipkK0QqRikqcSx0WzExXT0oYypkLWkqdi1TKkYpKnEsdFsxMl09KGUqdy1sKkEtTSpwKSpxLHRbMTNdPShuKkEtcip3K28qcCkqcSx0WzE0XT0oZiptLUkqYi14KkYpKnEsdFsxNV09KGkqYi1jKm0raCpGKSpxLHQpOm51bGx9LG8uU0lNRC5pbnZlcnQ9ZnVuY3Rpb24odCxhKXt2YXIgbixyLG8sdSxsLGUsTSxzLGksYyxoPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxTPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxJPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxmPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMik7cmV0dXJuIGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShoLFMsMCwxLDQsNSkscj1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKEksZiwwLDEsNCw1KSxuPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxyLDAsMiw0LDYpLHI9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShyLGwsMSwzLDUsNyksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGgsUywyLDMsNiw3KSx1PVNJTUQuRmxvYXQzMng0LnNodWZmbGUoSSxmLDIsMyw2LDcpLG89U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLHUsMCwyLDQsNiksdT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHUsbCwxLDMsNSw3KSxsPVNJTUQuRmxvYXQzMng0Lm11bChvLHUpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLGU9U0lNRC5GbG9hdDMyeDQubXVsKHIsbCksTT1TSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxlKSxNPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxNKSxNPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoTSwyLDMsMCwxKSxsPVNJTUQuRmxvYXQzMng0Lm11bChyLG8pLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLGU9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLGUpLGk9U0lNRC5GbG9hdDMyeDQubXVsKG4sbCksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5zdWIoZSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG4sbCksaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShyLDIsMywwLDEpLHUpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLG89U0lNRC5GbG9hdDMyeDQuc3dpenpsZShvLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChvLGwpLGUpLHM9U0lNRC5GbG9hdDMyeDQubXVsKG4sbCksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5zdWIoZSxTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSkscz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG4sbCkscykscz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMiwzLDAsMSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobixyKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxzPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxzKSxpPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSxpKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxzPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxzKSxpPVNJTUQuRmxvYXQzMng0LnN1YihpLFNJTUQuRmxvYXQzMng0Lm11bChvLGwpKSxsPVNJTUQuRmxvYXQzMng0Lm11bChuLHUpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLE09U0lNRC5GbG9hdDMyeDQuc3ViKE0sU0lNRC5GbG9hdDMyeDQubXVsKG8sbCkpLHM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyLGwpLHMpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLE09U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChvLGwpLE0pLHM9U0lNRC5GbG9hdDMyeDQuc3ViKHMsU0lNRC5GbG9hdDMyeDQubXVsKHIsbCkpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG4sbyksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksTT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCksTSksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoaSxTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksTT1TSU1ELkZsb2F0MzJ4NC5zdWIoTSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSksaT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHIsbCksaSksYz1TSU1ELkZsb2F0MzJ4NC5tdWwobixlKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMiwzLDAsMSksYyksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDEsMCwzLDIpLGMpLGw9U0lNRC5GbG9hdDMyeDQucmVjaXByb2NhbEFwcHJveGltYXRpb24oYyksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQuYWRkKGwsbCksU0lNRC5GbG9hdDMyeDQubXVsKGMsU0lNRC5GbG9hdDMyeDQubXVsKGwsbCkpKSwoYz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMCwwLDAsMCkpPyhTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQubXVsKGMsZSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxNKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0Lm11bChjLHMpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLFNJTUQuRmxvYXQzMng0Lm11bChjLGkpKSx0KTpudWxsfSxvLmludmVydD1yLlVTRV9TSU1EP28uU0lNRC5pbnZlcnQ6by5zY2FsYXIuaW52ZXJ0LG8uc2NhbGFyLmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1hWzldLGg9YVsxMF0sUz1hWzExXSxJPWFbMTJdLGY9YVsxM10seD1hWzE0XSxEPWFbMTVdO3JldHVybiB0WzBdPWUqKGgqRC1TKngpLWMqKE0qRC1zKngpK2YqKE0qUy1zKmgpLHRbMV09LShyKihoKkQtUyp4KS1jKihvKkQtdSp4KStmKihvKlMtdSpoKSksdFsyXT1yKihNKkQtcyp4KS1lKihvKkQtdSp4KStmKihvKnMtdSpNKSx0WzNdPS0ociooTSpTLXMqaCktZSoobypTLXUqaCkrYyoobypzLXUqTSkpLHRbNF09LShsKihoKkQtUyp4KS1pKihNKkQtcyp4KStJKihNKlMtcypoKSksdFs1XT1uKihoKkQtUyp4KS1pKihvKkQtdSp4KStJKihvKlMtdSpoKSx0WzZdPS0obiooTSpELXMqeCktbCoobypELXUqeCkrSSoobypzLXUqTSkpLHRbN109biooTSpTLXMqaCktbCoobypTLXUqaCkraSoobypzLXUqTSksdFs4XT1sKihjKkQtUypmKS1pKihlKkQtcypmKStJKihlKlMtcypjKSx0WzldPS0obiooYypELVMqZiktaSoocipELXUqZikrSSoocipTLXUqYykpLHRbMTBdPW4qKGUqRC1zKmYpLWwqKHIqRC11KmYpK0kqKHIqcy11KmUpLHRbMTFdPS0obiooZSpTLXMqYyktbCoocipTLXUqYykraSoocipzLXUqZSkpLHRbMTJdPS0obCooYyp4LWgqZiktaSooZSp4LU0qZikrSSooZSpoLU0qYykpLHRbMTNdPW4qKGMqeC1oKmYpLWkqKHIqeC1vKmYpK0kqKHIqaC1vKmMpLHRbMTRdPS0obiooZSp4LU0qZiktbCoocip4LW8qZikrSSoocipNLW8qZSkpLHRbMTVdPW4qKGUqaC1NKmMpLWwqKHIqaC1vKmMpK2kqKHIqTS1vKmUpLHR9LG8uU0lNRC5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG4scixvLHUsbCxlLE0scyxpLGMsaCxTLEksbj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCkscj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpO3JldHVybiBpPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDAsMSw0LDUpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMCwxLDQsNSksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGksZSwwLDIsNCw2KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoZSxpLDEsMyw1LDcpLGk9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMiwzLDYsNykscz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwyLDMsNiw3KSxNPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaSxzLDAsMiw0LDYpLHM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShzLGksMSwzLDUsNyksaT1TSU1ELkZsb2F0MzJ4NC5tdWwoTSxzKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxjPVNJTUQuRmxvYXQzMng0Lm11bChlLGkpLGg9U0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGUsaSksYyksaD1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaCksaD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGgsMiwzLDAsMSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwoZSxNKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxjKSxJPVNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKGMsU0lNRC5GbG9hdDMyeDQubXVsKHMsaSkpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLGkpLEkpLEk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShJLDIsMywwLDEpLGk9U0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwyLDMsMCwxKSxzKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxNPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoTSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSxjKSxTPVNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKGMsU0lNRC5GbG9hdDMyeDQubXVsKE0saSkpLFM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLGkpLFMpLFM9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDIsMywwLDEpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGwsZSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksUz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksUyksST1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKE0saSksSSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksUz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksUyksST1TSU1ELkZsb2F0MzJ4NC5zdWIoSSxTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobCxzKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxoPVNJTUQuRmxvYXQzMng0LnN1YihoLFNJTUQuRmxvYXQzMng0Lm11bChNLGkpKSxTPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxTKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxoPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSxoKSxTPVNJTUQuRmxvYXQzMng0LnN1YihTLFNJTUQuRmxvYXQzMng0Lm11bChlLGkpKSxpPVNJTUQuRmxvYXQzMng0Lm11bChsLE0pLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLGg9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLGgpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKEksU0lNRC5GbG9hdDMyeDQubXVsKGUsaSkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGg9U0lNRC5GbG9hdDMyeDQuc3ViKGgsU0lNRC5GbG9hdDMyeDQubXVsKHMsaSkpLEk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChlLGkpLEkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxjKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsaCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFMpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsSSksdH0sby5hZGpvaW50PXIuVVNFX1NJTUQ/by5TSU1ELmFkam9pbnQ6by5zY2FsYXIuYWRqb2ludCxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM10sdT10WzRdLGw9dFs1XSxlPXRbNl0sTT10WzddLHM9dFs4XSxpPXRbOV0sYz10WzEwXSxoPXRbMTFdLFM9dFsxMl0sST10WzEzXSxmPXRbMTRdLHg9dFsxNV0sRD1hKmwtbip1LEY9YSplLXIqdSxtPWEqTS1vKnUsZD1uKmUtcipsLGI9bipNLW8qbCx2PXIqTS1vKmUsej1zKkktaSpTLHA9cypmLWMqUyx3PXMqeC1oKlMsRT1pKmYtYypJLEE9aSp4LWgqSSxQPWMqeC1oKmY7cmV0dXJuIEQqUC1GKkErbSpFK2Qqdy1iKnArdip6fSxvLlNJTUQubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMiksZT1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sMCksTT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDMsMywzLDMpLGwpKSkpO1NJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxNKTt2YXIgcz1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sNCksaT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDMsMywzLDMpLGwpKSkpO1NJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxpKTt2YXIgYz1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sOCksaD1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDMsMywzLDMpLGwpKSkpO1NJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxoKTt2YXIgUz1TSU1ELkZsb2F0MzJ4NC5sb2FkKG4sMTIpLEk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywzLDMsMywzKSxsKSkpKTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixJKSx0fSxvLnNjYWxhci5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9YVs5XSxTPWFbMTBdLEk9YVsxMV0sZj1hWzEyXSx4PWFbMTNdLEQ9YVsxNF0sRj1hWzE1XSxtPW5bMF0sZD1uWzFdLGI9blsyXSx2PW5bM107cmV0dXJuIHRbMF09bSpyK2QqZStiKmMrdipmLHRbMV09bSpvK2QqTStiKmgrdip4LHRbMl09bSp1K2QqcytiKlMrdipELHRbM109bSpsK2QqaStiKkkrdipGLG09bls0XSxkPW5bNV0sYj1uWzZdLHY9bls3XSx0WzRdPW0qcitkKmUrYipjK3YqZix0WzVdPW0qbytkKk0rYipoK3YqeCx0WzZdPW0qdStkKnMrYipTK3YqRCx0WzddPW0qbCtkKmkrYipJK3YqRixtPW5bOF0sZD1uWzldLGI9blsxMF0sdj1uWzExXSx0WzhdPW0qcitkKmUrYipjK3YqZix0WzldPW0qbytkKk0rYipoK3YqeCx0WzEwXT1tKnUrZCpzK2IqUyt2KkQsdFsxMV09bSpsK2QqaStiKkkrdipGLG09blsxMl0sZD1uWzEzXSxiPW5bMTRdLHY9blsxNV0sdFsxMl09bSpyK2QqZStiKmMrdipmLHRbMTNdPW0qbytkKk0rYipoK3YqeCx0WzE0XT1tKnUrZCpzK2IqUyt2KkQsdFsxNV09bSpsK2QqaStiKkkrdipGLHR9LG8ubXVsdGlwbHk9ci5VU0VfU0lNRD9vLlNJTUQubXVsdGlwbHk6by5zY2FsYXIubXVsdGlwbHksby5tdWw9by5tdWx0aXBseSxvLnNjYWxhci50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxmPW5bMF0seD1uWzFdLEQ9blsyXTtyZXR1cm4gYT09PXQ/KHRbMTJdPWFbMF0qZithWzRdKngrYVs4XSpEK2FbMTJdLHRbMTNdPWFbMV0qZithWzVdKngrYVs5XSpEK2FbMTNdLHRbMTRdPWFbMl0qZithWzZdKngrYVsxMF0qRCthWzE0XSx0WzE1XT1hWzNdKmYrYVs3XSp4K2FbMTFdKkQrYVsxNV0pOihyPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPWFbOV0sUz1hWzEwXSxJPWFbMTFdLHRbMF09cix0WzFdPW8sdFsyXT11LHRbM109bCx0WzRdPWUsdFs1XT1NLHRbNl09cyx0WzddPWksdFs4XT1jLHRbOV09aCx0WzEwXT1TLHRbMTFdPUksdFsxMl09cipmK2UqeCtjKkQrYVsxMl0sdFsxM109bypmK00qeCtoKkQrYVsxM10sdFsxNF09dSpmK3MqeCtTKkQrYVsxNF0sdFsxNV09bCpmK2kqeCtJKkQrYVsxNV0pLHR9LG8uU0lNRC50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMiksZT1TSU1ELkZsb2F0MzJ4NChuWzBdLG5bMV0sblsyXSwwKTthIT09dCYmKHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSkscj1TSU1ELkZsb2F0MzJ4NC5tdWwocixTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMCwwLDAsMCkpLG89U0lNRC5GbG9hdDMyeDQubXVsKG8sU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDEsMSwxLDEpKSx1PVNJTUQuRmxvYXQzMng0Lm11bCh1LFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwyLDIsMiwyKSk7dmFyIE09U0lNRC5GbG9hdDMyeDQuYWRkKHIsU0lNRC5GbG9hdDMyeDQuYWRkKG8sU0lNRC5GbG9hdDMyeDQuYWRkKHUsbCkpKTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixNKSx0fSxvLnRyYW5zbGF0ZT1yLlVTRV9TSU1EP28uU0lNRC50cmFuc2xhdGU6by5zY2FsYXIudHJhbnNsYXRlLG8uc2NhbGFyLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uWzBdLG89blsxXSx1PW5bMl07cmV0dXJuIHRbMF09YVswXSpyLHRbMV09YVsxXSpyLHRbMl09YVsyXSpyLHRbM109YVszXSpyLHRbNF09YVs0XSpvLHRbNV09YVs1XSpvLHRbNl09YVs2XSpvLHRbN109YVs3XSpvLHRbOF09YVs4XSp1LHRbOV09YVs5XSp1LHRbMTBdPWFbMTBdKnUsdFsxMV09YVsxMV0qdSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSx0fSxvLlNJTUQuc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByLG8sdSxsPVNJTUQuRmxvYXQzMng0KG5bMF0sblsxXSxuWzJdLDApO3JldHVybiByPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQubXVsKHIsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDAsMCwwLDApKSksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0Lm11bChvLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDEsMSwxKSkpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5tdWwodSxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwyLDIsMikpKSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSx0fSxvLnNjYWxlPXIuVVNFX1NJTUQ/by5TSU1ELnNjYWxlOm8uc2NhbGFyLnNjYWxlLG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuLG8pe3ZhciB1LGwsZSxNLHMsaSxjLGgsUyxJLGYseCxELEYsbSxkLGIsdix6LHAsdyxFLEEsUCxMPW9bMF0scT1vWzFdLFI9b1syXSxOPU1hdGguc3FydChMKkwrcSpxK1IqUik7cmV0dXJuIE1hdGguYWJzKE4pPHIuRVBTSUxPTj9udWxsOihOPTEvTixMKj1OLHEqPU4sUio9Tix1PU1hdGguc2luKG4pLGw9TWF0aC5jb3MobiksZT0xLWwsTT1hWzBdLHM9YVsxXSxpPWFbMl0sYz1hWzNdLGg9YVs0XSxTPWFbNV0sST1hWzZdLGY9YVs3XSx4PWFbOF0sRD1hWzldLEY9YVsxMF0sbT1hWzExXSxkPUwqTCplK2wsYj1xKkwqZStSKnUsdj1SKkwqZS1xKnUsej1MKnEqZS1SKnUscD1xKnEqZStsLHc9UipxKmUrTCp1LEU9TCpSKmUrcSp1LEE9cSpSKmUtTCp1LFA9UipSKmUrbCx0WzBdPU0qZCtoKmIreCp2LHRbMV09cypkK1MqYitEKnYsdFsyXT1pKmQrSSpiK0Yqdix0WzNdPWMqZCtmKmIrbSp2LHRbNF09TSp6K2gqcCt4KncsdFs1XT1zKnorUypwK0Qqdyx0WzZdPWkqeitJKnArRip3LHRbN109Yyp6K2YqcCttKncsdFs4XT1NKkUraCpBK3gqUCx0WzldPXMqRStTKkErRCpQLHRbMTBdPWkqRStJKkErRipQLHRbMTFdPWMqRStmKkErbSpQLGEhPT10JiYodFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHQpfSxvLnNjYWxhci5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1NYXRoLnNpbihuKSxvPU1hdGguY29zKG4pLHU9YVs0XSxsPWFbNV0sZT1hWzZdLE09YVs3XSxzPWFbOF0saT1hWzldLGM9YVsxMF0saD1hWzExXTtyZXR1cm4gYSE9PXQmJih0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHRbNF09dSpvK3Mqcix0WzVdPWwqbytpKnIsdFs2XT1lKm8rYypyLHRbN109TSpvK2gqcix0WzhdPXMqby11KnIsdFs5XT1pKm8tbCpyLHRbMTBdPWMqby1lKnIsdFsxMV09aCpvLU0qcix0fSxvLlNJTUQucm90YXRlWD1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5zaW4obikpLG89U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MobikpO2EhPT10JiYodFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKTt2YXIgdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbyksU0lNRC5GbG9hdDMyeDQubXVsKGwscikpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLG8pLFNJTUQuRmxvYXQzMng0Lm11bCh1LHIpKSksdH0sby5yb3RhdGVYPXIuVVNFX1NJTUQ/by5TSU1ELnJvdGF0ZVg6by5zY2FsYXIucm90YXRlWCxvLnNjYWxhci5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1NYXRoLnNpbihuKSxvPU1hdGguY29zKG4pLHU9YVswXSxsPWFbMV0sZT1hWzJdLE09YVszXSxzPWFbOF0saT1hWzldLGM9YVsxMF0saD1hWzExXTtyZXR1cm4gYSE9PXQmJih0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHRbMF09dSpvLXMqcix0WzFdPWwqby1pKnIsdFsyXT1lKm8tYypyLHRbM109TSpvLWgqcix0WzhdPXUqcitzKm8sdFs5XT1sKnIraSpvLHRbMTBdPWUqcitjKm8sdFsxMV09TSpyK2gqbyx0fSxvLlNJTUQucm90YXRlWT1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5zaW4obikpLG89U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MobikpO2EhPT10JiYodFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKTt2YXIgdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHUsbyksU0lNRC5GbG9hdDMyeDQubXVsKGwscikpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LHIpLFNJTUQuRmxvYXQzMng0Lm11bChsLG8pKSksdH0sby5yb3RhdGVZPXIuVVNFX1NJTUQ/by5TSU1ELnJvdGF0ZVk6by5zY2FsYXIucm90YXRlWSxvLnNjYWxhci5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1NYXRoLnNpbihuKSxvPU1hdGguY29zKG4pLHU9YVswXSxsPWFbMV0sZT1hWzJdLE09YVszXSxzPWFbNF0saT1hWzVdLGM9YVs2XSxoPWFbN107cmV0dXJuIGEhPT10JiYodFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSksdFswXT11Km8rcypyLHRbMV09bCpvK2kqcix0WzJdPWUqbytjKnIsdFszXT1NKm8raCpyLHRbNF09cypvLXUqcix0WzVdPWkqby1sKnIsdFs2XT1jKm8tZSpyLHRbN109aCpvLU0qcix0fSxvLlNJTUQucm90YXRlWj1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5zaW4obikpLG89U0lNRC5GbG9hdDMyeDQuc3BsYXQoTWF0aC5jb3MobikpO2EhPT10JiYodFs4XT1hWzhdLHRbOV09YVs5XSx0WzEwXT1hWzEwXSx0WzExXT1hWzExXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSk7dmFyIHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LG8pLFNJTUQuRmxvYXQzMng0Lm11bChsLHIpKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxyKSkpLHR9LG8ucm90YXRlWj1yLlVTRV9TSU1EP28uU0lNRC5yb3RhdGVaOm8uc2NhbGFyLnJvdGF0ZVosby5mcm9tVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT1hWzBdLHRbMTNdPWFbMV0sdFsxNF09YVsyXSx0WzE1XT0xLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPWFbMV0sdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPWFbMl0sdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSxuKXt2YXIgbyx1LGwsZT1uWzBdLE09blsxXSxzPW5bMl0saT1NYXRoLnNxcnQoZSplK00qTStzKnMpO3JldHVybiBNYXRoLmFicyhpKTxyLkVQU0lMT04/bnVsbDooaT0xL2ksZSo9aSxNKj1pLHMqPWksbz1NYXRoLnNpbihhKSx1PU1hdGguY29zKGEpLGw9MS11LHRbMF09ZSplKmwrdSx0WzFdPU0qZSpsK3Mqbyx0WzJdPXMqZSpsLU0qbyx0WzNdPTAsdFs0XT1lKk0qbC1zKm8sdFs1XT1NKk0qbCt1LHRbNl09cypNKmwrZSpvLHRbN109MCx0WzhdPWUqcypsK00qbyx0WzldPU0qcypsLWUqbyx0WzEwXT1zKnMqbCt1LHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0KX0sby5mcm9tWFJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPXIsdFs2XT1uLHRbN109MCx0WzhdPTAsdFs5XT0tbix0WzEwXT1yLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21ZUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT0wLHRbMl09LW4sdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPW4sdFs5XT0wLHRbMTBdPXIsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVpSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0wLHRbM109MCx0WzRdPS1uLHRbNV09cix0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tUm90YXRpb25UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPXIrcixNPW8rbyxzPXUrdSxpPXIqZSxjPXIqTSxoPXIqcyxTPW8qTSxJPW8qcyxmPXUqcyx4PWwqZSxEPWwqTSxGPWwqcztyZXR1cm4gdFswXT0xLShTK2YpLHRbMV09YytGLHRbMl09aC1ELHRbM109MCx0WzRdPWMtRix0WzVdPTEtKGkrZiksdFs2XT1JK3gsdFs3XT0wLHRbOF09aCtELHRbOV09SS14LHRbMTBdPTEtKGkrUyksdFsxMV09MCx0WzEyXT1uWzBdLHRbMTNdPW5bMV0sdFsxNF09blsyXSx0WzE1XT0xLHR9LG8uZ2V0VHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzEyXSx0WzFdPWFbMTNdLHRbMl09YVsxNF0sdH0sby5nZXRSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0rYVs1XSthWzEwXSxyPTA7cmV0dXJuIG4+MD8ocj0yKk1hdGguc3FydChuKzEpLHRbM109LjI1KnIsdFswXT0oYVs2XS1hWzldKS9yLHRbMV09KGFbOF0tYVsyXSkvcix0WzJdPShhWzFdLWFbNF0pL3IpOmFbMF0+YVs1XSZhWzBdPmFbMTBdPyhyPTIqTWF0aC5zcXJ0KDErYVswXS1hWzVdLWFbMTBdKSx0WzNdPShhWzZdLWFbOV0pL3IsdFswXT0uMjUqcix0WzFdPShhWzFdK2FbNF0pL3IsdFsyXT0oYVs4XSthWzJdKS9yKTphWzVdPmFbMTBdPyhyPTIqTWF0aC5zcXJ0KDErYVs1XS1hWzBdLWFbMTBdKSx0WzNdPShhWzhdLWFbMl0pL3IsdFswXT0oYVsxXSthWzRdKS9yLHRbMV09LjI1KnIsdFsyXT0oYVs2XSthWzldKS9yKToocj0yKk1hdGguc3FydCgxK2FbMTBdLWFbMF0tYVs1XSksdFszXT0oYVsxXS1hWzRdKS9yLHRbMF09KGFbOF0rYVsyXSkvcix0WzFdPShhWzZdK2FbOV0pL3IsdFsyXT0uMjUqciksdH0sby5mcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdLGw9YVsyXSxlPWFbM10sTT1vK28scz11K3UsaT1sK2wsYz1vKk0saD1vKnMsUz1vKmksST11KnMsZj11KmkseD1sKmksRD1lKk0sRj1lKnMsbT1lKmksZD1yWzBdLGI9clsxXSx2PXJbMl07cmV0dXJuIHRbMF09KDEtKEkreCkpKmQsdFsxXT0oaCttKSpkLHRbMl09KFMtRikqZCx0WzNdPTAsdFs0XT0oaC1tKSpiLHRbNV09KDEtKGMreCkpKmIsdFs2XT0oZitEKSpiLHRbN109MCx0WzhdPShTK0YpKnYsdFs5XT0oZi1EKSp2LHRbMTBdPSgxLShjK0kpKSp2LHRbMTFdPTAsdFsxMl09blswXSx0WzEzXT1uWzFdLHRbMTRdPW5bMl0sdFsxNV09MSx0fSxvLmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGVPcmlnaW49ZnVuY3Rpb24odCxhLG4scixvKXtcclxuICAgIHZhciB1PWFbMF0sbD1hWzFdLGU9YVsyXSxNPWFbM10scz11K3UsaT1sK2wsYz1lK2UsaD11KnMsUz11KmksST11KmMsZj1sKmkseD1sKmMsRD1lKmMsRj1NKnMsbT1NKmksZD1NKmMsYj1yWzBdLHY9clsxXSx6PXJbMl0scD1vWzBdLHc9b1sxXSxFPW9bMl07cmV0dXJuIHRbMF09KDEtKGYrRCkpKmIsdFsxXT0oUytkKSpiLHRbMl09KEktbSkqYix0WzNdPTAsdFs0XT0oUy1kKSp2LHRbNV09KDEtKGgrRCkpKnYsdFs2XT0oeCtGKSp2LHRbN109MCx0WzhdPShJK20pKnosdFs5XT0oeC1GKSp6LHRbMTBdPSgxLShoK2YpKSp6LHRbMTFdPTAsdFsxMl09blswXStwLSh0WzBdKnArdFs0XSp3K3RbOF0qRSksdFsxM109blsxXSt3LSh0WzFdKnArdFs1XSp3K3RbOV0qRSksdFsxNF09blsyXStFLSh0WzJdKnArdFs2XSp3K3RbMTBdKkUpLHRbMTVdPTEsdH0sby5mcm9tUXVhdD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uK24sZT1yK3IsTT1vK28scz1uKmwsaT1yKmwsYz1yKmUsaD1vKmwsUz1vKmUsST1vKk0sZj11KmwseD11KmUsRD11Kk07cmV0dXJuIHRbMF09MS1jLUksdFsxXT1pK0QsdFsyXT1oLXgsdFszXT0wLHRbNF09aS1ELHRbNV09MS1zLUksdFs2XT1TK2YsdFs3XT0wLHRbOF09aCt4LHRbOV09Uy1mLHRbMTBdPTEtcy1jLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZydXN0dW09ZnVuY3Rpb24odCxhLG4scixvLHUsbCl7dmFyIGU9MS8obi1hKSxNPTEvKG8tcikscz0xLyh1LWwpO3JldHVybiB0WzBdPTIqdSplLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTIqdSpNLHRbNl09MCx0WzddPTAsdFs4XT0obithKSplLHRbOV09KG8rcikqTSx0WzEwXT0obCt1KSpzLHRbMTFdPS0xLHRbMTJdPTAsdFsxM109MCx0WzE0XT1sKnUqMipzLHRbMTVdPTAsdH0sby5wZXJzcGVjdGl2ZT1mdW5jdGlvbih0LGEsbixyLG8pe3ZhciB1PTEvTWF0aC50YW4oYS8yKSxsPTEvKHItbyk7cmV0dXJuIHRbMF09dS9uLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPXUsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPShvK3IpKmwsdFsxMV09LTEsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTIqbypyKmwsdFsxNV09MCx0fSxvLnBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3PWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPU1hdGgudGFuKGEudXBEZWdyZWVzKk1hdGguUEkvMTgwKSx1PU1hdGgudGFuKGEuZG93bkRlZ3JlZXMqTWF0aC5QSS8xODApLGw9TWF0aC50YW4oYS5sZWZ0RGVncmVlcypNYXRoLlBJLzE4MCksZT1NYXRoLnRhbihhLnJpZ2h0RGVncmVlcypNYXRoLlBJLzE4MCksTT0yLyhsK2UpLHM9Mi8obyt1KTtyZXR1cm4gdFswXT1NLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPXMsdFs2XT0wLHRbN109MCx0WzhdPS0oKGwtZSkqTSouNSksdFs5XT0oby11KSpzKi41LHRbMTBdPXIvKG4tciksdFsxMV09LTEsdFsxMl09MCx0WzEzXT0wLHRbMTRdPXIqbi8obi1yKSx0WzE1XT0wLHR9LG8ub3J0aG89ZnVuY3Rpb24odCxhLG4scixvLHUsbCl7dmFyIGU9MS8oYS1uKSxNPTEvKHItbykscz0xLyh1LWwpO3JldHVybiB0WzBdPS0yKmUsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09LTIqTSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MipzLHRbMTFdPTAsdFsxMl09KGErbikqZSx0WzEzXT0obytyKSpNLHRbMTRdPShsK3UpKnMsdFsxNV09MSx0fSxvLmxvb2tBdD1mdW5jdGlvbih0LGEsbix1KXt2YXIgbCxlLE0scyxpLGMsaCxTLEksZix4PWFbMF0sRD1hWzFdLEY9YVsyXSxtPXVbMF0sZD11WzFdLGI9dVsyXSx2PW5bMF0sej1uWzFdLHA9blsyXTtyZXR1cm4gTWF0aC5hYnMoeC12KTxyLkVQU0lMT04mJk1hdGguYWJzKEQteik8ci5FUFNJTE9OJiZNYXRoLmFicyhGLXApPHIuRVBTSUxPTj9vLmlkZW50aXR5KHQpOihoPXgtdixTPUQteixJPUYtcCxmPTEvTWF0aC5zcXJ0KGgqaCtTKlMrSSpJKSxoKj1mLFMqPWYsSSo9ZixsPWQqSS1iKlMsZT1iKmgtbSpJLE09bSpTLWQqaCxmPU1hdGguc3FydChsKmwrZSplK00qTSksZj8oZj0xL2YsbCo9ZixlKj1mLE0qPWYpOihsPTAsZT0wLE09MCkscz1TKk0tSSplLGk9SSpsLWgqTSxjPWgqZS1TKmwsZj1NYXRoLnNxcnQocypzK2kqaStjKmMpLGY/KGY9MS9mLHMqPWYsaSo9ZixjKj1mKToocz0wLGk9MCxjPTApLHRbMF09bCx0WzFdPXMsdFsyXT1oLHRbM109MCx0WzRdPWUsdFs1XT1pLHRbNl09Uyx0WzddPTAsdFs4XT1NLHRbOV09Yyx0WzEwXT1JLHRbMTFdPTAsdFsxMl09LShsKngrZSpEK00qRiksdFsxM109LShzKngraSpEK2MqRiksdFsxNF09LShoKngrUypEK0kqRiksdFsxNV09MSx0KX0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQ0KFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIsIFwiK3RbNF0rXCIsIFwiK3RbNV0rXCIsIFwiK3RbNl0rXCIsIFwiK3RbN10rXCIsIFwiK3RbOF0rXCIsIFwiK3RbOV0rXCIsIFwiK3RbMTBdK1wiLCBcIit0WzExXStcIiwgXCIrdFsxMl0rXCIsIFwiK3RbMTNdK1wiLCBcIit0WzE0XStcIiwgXCIrdFsxNV0rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikrTWF0aC5wb3codFs0XSwyKStNYXRoLnBvdyh0WzVdLDIpK01hdGgucG93KHRbNl0sMikrTWF0aC5wb3codFs3XSwyKStNYXRoLnBvdyh0WzhdLDIpK01hdGgucG93KHRbOV0sMikrTWF0aC5wb3codFsxMF0sMikrTWF0aC5wb3codFsxMV0sMikrTWF0aC5wb3codFsxMl0sMikrTWF0aC5wb3codFsxM10sMikrTWF0aC5wb3codFsxNF0sMikrTWF0aC5wb3codFsxNV0sMikpfSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHRbNF09YVs0XStuWzRdLHRbNV09YVs1XStuWzVdLHRbNl09YVs2XStuWzZdLHRbN109YVs3XStuWzddLHRbOF09YVs4XStuWzhdLHRbOV09YVs5XStuWzldLHRbMTBdPWFbMTBdK25bMTBdLHRbMTFdPWFbMTFdK25bMTFdLHRbMTJdPWFbMTJdK25bMTJdLHRbMTNdPWFbMTNdK25bMTNdLHRbMTRdPWFbMTRdK25bMTRdLHRbMTVdPWFbMTVdK25bMTVdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0WzRdPWFbNF0tbls0XSx0WzVdPWFbNV0tbls1XSx0WzZdPWFbNl0tbls2XSx0WzddPWFbN10tbls3XSx0WzhdPWFbOF0tbls4XSx0WzldPWFbOV0tbls5XSx0WzEwXT1hWzEwXS1uWzEwXSx0WzExXT1hWzExXS1uWzExXSx0WzEyXT1hWzEyXS1uWzEyXSx0WzEzXT1hWzEzXS1uWzEzXSx0WzE0XT1hWzE0XS1uWzE0XSx0WzE1XT1hWzE1XS1uWzE1XSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0WzRdPWFbNF0qbix0WzVdPWFbNV0qbix0WzZdPWFbNl0qbix0WzddPWFbN10qbix0WzhdPWFbOF0qbix0WzldPWFbOV0qbix0WzEwXT1hWzEwXSpuLHRbMTFdPWFbMTFdKm4sdFsxMl09YVsxMl0qbix0WzEzXT1hWzEzXSpuLHRbMTRdPWFbMTRdKm4sdFsxNV09YVsxNV0qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHRbNF09YVs0XStuWzRdKnIsdFs1XT1hWzVdK25bNV0qcix0WzZdPWFbNl0rbls2XSpyLHRbN109YVs3XStuWzddKnIsdFs4XT1hWzhdK25bOF0qcix0WzldPWFbOV0rbls5XSpyLHRbMTBdPWFbMTBdK25bMTBdKnIsdFsxMV09YVsxMV0rblsxMV0qcix0WzEyXT1hWzEyXStuWzEyXSpyLHRbMTNdPWFbMTNdK25bMTNdKnIsdFsxNF09YVsxNF0rblsxNF0qcix0WzE1XT1hWzE1XStuWzE1XSpyLHR9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM10mJnRbNF09PT1hWzRdJiZ0WzVdPT09YVs1XSYmdFs2XT09PWFbNl0mJnRbN109PT1hWzddJiZ0WzhdPT09YVs4XSYmdFs5XT09PWFbOV0mJnRbMTBdPT09YVsxMF0mJnRbMTFdPT09YVsxMV0mJnRbMTJdPT09YVsxMl0mJnRbMTNdPT09YVsxM10mJnRbMTRdPT09YVsxNF0mJnRbMTVdPT09YVsxNV19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPXRbNF0sTT10WzVdLHM9dFs2XSxpPXRbN10sYz10WzhdLGg9dFs5XSxTPXRbMTBdLEk9dFsxMV0sZj10WzEyXSx4PXRbMTNdLEQ9dFsxNF0sRj10WzE1XSxtPWFbMF0sZD1hWzFdLGI9YVsyXSx2PWFbM10sej1hWzRdLHA9YVs1XSx3PWFbNl0sRT1hWzddLEE9YVs4XSxQPWFbOV0sTD1hWzEwXSxxPWFbMTFdLFI9YVsxMl0sTj1hWzEzXSxPPWFbMTRdLFk9YVsxNV07cmV0dXJuIE1hdGguYWJzKG4tbSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKG0pKSYmTWF0aC5hYnMoby1kKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoZCkpJiZNYXRoLmFicyh1LWIpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhiKSkmJk1hdGguYWJzKGwtdik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKHYpKSYmTWF0aC5hYnMoZS16KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZSksTWF0aC5hYnMoeikpJiZNYXRoLmFicyhNLXApPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhNKSxNYXRoLmFicyhwKSkmJk1hdGguYWJzKHMtdyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHMpLE1hdGguYWJzKHcpKSYmTWF0aC5hYnMoaS1FKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoaSksTWF0aC5hYnMoRSkpJiZNYXRoLmFicyhjLUEpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhjKSxNYXRoLmFicyhBKSkmJk1hdGguYWJzKGgtUCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGgpLE1hdGguYWJzKFApKSYmTWF0aC5hYnMoUy1MKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoUyksTWF0aC5hYnMoTCkpJiZNYXRoLmFicyhJLXEpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhJKSxNYXRoLmFicyhxKSkmJk1hdGguYWJzKGYtUik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGYpLE1hdGguYWJzKFIpKSYmTWF0aC5hYnMoeC1OKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoeCksTWF0aC5hYnMoTikpJiZNYXRoLmFicyhELU8pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhEKSxNYXRoLmFicyhPKSkmJk1hdGguYWJzKEYtWSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKEYpLE1hdGguYWJzKFkpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89big0KSx1PW4oNyksbD1uKDgpLGU9e307ZS5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0WzNdPTEsdH0sZS5yb3RhdGlvblRvPWZ1bmN0aW9uKCl7dmFyIHQ9dS5jcmVhdGUoKSxhPXUuZnJvbVZhbHVlcygxLDAsMCksbj11LmZyb21WYWx1ZXMoMCwxLDApO3JldHVybiBmdW5jdGlvbihyLG8sbCl7dmFyIE09dS5kb3QobyxsKTtyZXR1cm4tLjk5OTk5OT5NPyh1LmNyb3NzKHQsYSxvKSx1Lmxlbmd0aCh0KTwxZS02JiZ1LmNyb3NzKHQsbixvKSx1Lm5vcm1hbGl6ZSh0LHQpLGUuc2V0QXhpc0FuZ2xlKHIsdCxNYXRoLlBJKSxyKTpNPi45OTk5OTk/KHJbMF09MCxyWzFdPTAsclsyXT0wLHJbM109MSxyKToodS5jcm9zcyh0LG8sbCksclswXT10WzBdLHJbMV09dFsxXSxyWzJdPXRbMl0sclszXT0xK00sZS5ub3JtYWxpemUocixyKSl9fSgpLGUuc2V0QXhlcz1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8pe3JldHVybiB0WzBdPXJbMF0sdFszXT1yWzFdLHRbNl09clsyXSx0WzFdPW9bMF0sdFs0XT1vWzFdLHRbN109b1syXSx0WzJdPS1uWzBdLHRbNV09LW5bMV0sdFs4XT0tblsyXSxlLm5vcm1hbGl6ZShhLGUuZnJvbU1hdDMoYSx0KSl9fSgpLGUuY2xvbmU9bC5jbG9uZSxlLmZyb21WYWx1ZXM9bC5mcm9tVmFsdWVzLGUuY29weT1sLmNvcHksZS5zZXQ9bC5zZXQsZS5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LGUuc2V0QXhpc0FuZ2xlPWZ1bmN0aW9uKHQsYSxuKXtuPS41Km47dmFyIHI9TWF0aC5zaW4obik7cmV0dXJuIHRbMF09ciphWzBdLHRbMV09ciphWzFdLHRbMl09ciphWzJdLHRbM109TWF0aC5jb3MobiksdH0sZS5nZXRBeGlzQW5nbGU9ZnVuY3Rpb24odCxhKXt2YXIgbj0yKk1hdGguYWNvcyhhWzNdKSxyPU1hdGguc2luKG4vMik7cmV0dXJuIDAhPXI/KHRbMF09YVswXS9yLHRbMV09YVsxXS9yLHRbMl09YVsyXS9yKToodFswXT0xLHRbMV09MCx0WzJdPTApLG59LGUuYWRkPWwuYWRkLGUubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1uWzBdLE09blsxXSxzPW5bMl0saT1uWzNdO3JldHVybiB0WzBdPXIqaStsKmUrbypzLXUqTSx0WzFdPW8qaStsKk0rdSplLXIqcyx0WzJdPXUqaStsKnMrcipNLW8qZSx0WzNdPWwqaS1yKmUtbypNLXUqcyx0fSxlLm11bD1lLm11bHRpcGx5LGUuc2NhbGU9bC5zY2FsZSxlLnJvdGF0ZVg9ZnVuY3Rpb24odCxhLG4pe24qPS41O3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTStsKmUsdFsxXT1vKk0rdSplLHRbMl09dSpNLW8qZSx0WzNdPWwqTS1yKmUsdH0sZS5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuKXtuKj0uNTt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0tdSplLHRbMV09bypNK2wqZSx0WzJdPXUqTStyKmUsdFszXT1sKk0tbyplLHR9LGUucm90YXRlWj1mdW5jdGlvbih0LGEsbil7bio9LjU7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNK28qZSx0WzFdPW8qTS1yKmUsdFsyXT11Kk0rbCplLHRbM109bCpNLXUqZSx0fSxlLmNhbGN1bGF0ZVc9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl07cmV0dXJuIHRbMF09bix0WzFdPXIsdFsyXT1vLHRbM109TWF0aC5zcXJ0KE1hdGguYWJzKDEtbipuLXIqci1vKm8pKSx0fSxlLmRvdD1sLmRvdCxlLmxlcnA9bC5sZXJwLGUuc2xlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG8sdSxsLGUsTSxzPWFbMF0saT1hWzFdLGM9YVsyXSxoPWFbM10sUz1uWzBdLEk9blsxXSxmPW5bMl0seD1uWzNdO3JldHVybiB1PXMqUytpKkkrYypmK2gqeCwwPnUmJih1PS11LFM9LVMsST0tSSxmPS1mLHg9LXgpLDEtdT4xZS02PyhvPU1hdGguYWNvcyh1KSxsPU1hdGguc2luKG8pLGU9TWF0aC5zaW4oKDEtcikqbykvbCxNPU1hdGguc2luKHIqbykvbCk6KGU9MS1yLE09ciksdFswXT1lKnMrTSpTLHRbMV09ZSppK00qSSx0WzJdPWUqYytNKmYsdFszXT1lKmgrTSp4LHR9LGUuc3FsZXJwPWZ1bmN0aW9uKCl7dmFyIHQ9ZS5jcmVhdGUoKSxhPWUuY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKG4scixvLHUsbCxNKXtyZXR1cm4gZS5zbGVycCh0LHIsbCxNKSxlLnNsZXJwKGEsbyx1LE0pLGUuc2xlcnAobix0LGEsMipNKigxLU0pKSxufX0oKSxlLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uKm4rcipyK28qbyt1KnUsZT1sPzEvbDowO3JldHVybiB0WzBdPS1uKmUsdFsxXT0tciplLHRbMl09LW8qZSx0WzNdPXUqZSx0fSxlLmNvbmp1Z2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0WzNdPWFbM10sdH0sZS5sZW5ndGg9bC5sZW5ndGgsZS5sZW49ZS5sZW5ndGgsZS5zcXVhcmVkTGVuZ3RoPWwuc3F1YXJlZExlbmd0aCxlLnNxckxlbj1lLnNxdWFyZWRMZW5ndGgsZS5ub3JtYWxpemU9bC5ub3JtYWxpemUsZS5mcm9tTWF0Mz1mdW5jdGlvbih0LGEpe3ZhciBuLHI9YVswXSthWzRdK2FbOF07aWYocj4wKW49TWF0aC5zcXJ0KHIrMSksdFszXT0uNSpuLG49LjUvbix0WzBdPShhWzVdLWFbN10pKm4sdFsxXT0oYVs2XS1hWzJdKSpuLHRbMl09KGFbMV0tYVszXSkqbjtlbHNle3ZhciBvPTA7YVs0XT5hWzBdJiYobz0xKSxhWzhdPmFbMypvK29dJiYobz0yKTt2YXIgdT0obysxKSUzLGw9KG8rMiklMztuPU1hdGguc3FydChhWzMqbytvXS1hWzMqdSt1XS1hWzMqbCtsXSsxKSx0W29dPS41Km4sbj0uNS9uLHRbM109KGFbMyp1K2xdLWFbMypsK3VdKSpuLHRbdV09KGFbMyp1K29dK2FbMypvK3VdKSpuLHRbbF09KGFbMypsK29dK2FbMypvK2xdKSpufXJldHVybiB0fSxlLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInF1YXQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIilcIn0sZS5leGFjdEVxdWFscz1sLmV4YWN0RXF1YWxzLGUuZXF1YWxzPWwuZXF1YWxzLHQuZXhwb3J0cz1lfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSgzKTtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDMpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhfSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4pe3ZhciBvPW5ldyByLkFSUkFZX1RZUEUoMyk7cmV0dXJuIG9bMF09dCxvWzFdPWEsb1syXT1uLG99LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0fSxvLnNldD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdH0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm5bMF0sdFsxXT1hWzFdKm5bMV0sdFsyXT1hWzJdKm5bMl0sdH0sby5tdWw9by5tdWx0aXBseSxvLmRpdmlkZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS9uWzBdLHRbMV09YVsxXS9uWzFdLHRbMl09YVsyXS9uWzJdLHR9LG8uZGl2PW8uZGl2aWRlLG8uY2VpbD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguY2VpbChhWzBdKSx0WzFdPU1hdGguY2VpbChhWzFdKSx0WzJdPU1hdGguY2VpbChhWzJdKSx0fSxvLmZsb29yPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5mbG9vcihhWzBdKSx0WzFdPU1hdGguZmxvb3IoYVsxXSksdFsyXT1NYXRoLmZsb29yKGFbMl0pLHR9LG8ubWluPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1pbihhWzBdLG5bMF0pLHRbMV09TWF0aC5taW4oYVsxXSxuWzFdKSx0WzJdPU1hdGgubWluKGFbMl0sblsyXSksdH0sby5tYXg9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWF4KGFbMF0sblswXSksdFsxXT1NYXRoLm1heChhWzFdLG5bMV0pLHRbMl09TWF0aC5tYXgoYVsyXSxuWzJdKSx0fSxvLnJvdW5kPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5yb3VuZChhWzBdKSx0WzFdPU1hdGgucm91bmQoYVsxXSksdFsyXT1NYXRoLnJvdW5kKGFbMl0pLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0fSxvLnNjYWxlQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0fSxvLmRpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdO3JldHVybiBNYXRoLnNxcnQobipuK3IqcitvKm8pfSxvLmRpc3Q9by5kaXN0YW5jZSxvLnNxdWFyZWREaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXTtyZXR1cm4gbipuK3IqcitvKm99LG8uc3FyRGlzdD1vLnNxdWFyZWREaXN0YW5jZSxvLmxlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl07cmV0dXJuIE1hdGguc3FydChhKmErbipuK3Iqcil9LG8ubGVuPW8ubGVuZ3RoLG8uc3F1YXJlZExlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl07cmV0dXJuIGEqYStuKm4rcipyfSxvLnNxckxlbj1vLnNxdWFyZWRMZW5ndGgsby5uZWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdH0sby5pbnZlcnNlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MS9hWzBdLHRbMV09MS9hWzFdLHRbMl09MS9hWzJdLHR9LG8ubm9ybWFsaXplPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9bipuK3IqcitvKm87cmV0dXJuIHU+MCYmKHU9MS9NYXRoLnNxcnQodSksdFswXT1hWzBdKnUsdFsxXT1hWzFdKnUsdFsyXT1hWzJdKnUpLHR9LG8uZG90PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF0qYVswXSt0WzFdKmFbMV0rdFsyXSphWzJdfSxvLmNyb3NzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1uWzBdLGU9blsxXSxNPW5bMl07cmV0dXJuIHRbMF09bypNLXUqZSx0WzFdPXUqbC1yKk0sdFsyXT1yKmUtbypsLHR9LG8ubGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXSxsPWFbMl07cmV0dXJuIHRbMF09bytyKihuWzBdLW8pLHRbMV09dStyKihuWzFdLXUpLHRbMl09bCtyKihuWzJdLWwpLHR9LG8uaGVybWl0ZT1mdW5jdGlvbih0LGEsbixyLG8sdSl7dmFyIGw9dSp1LGU9bCooMip1LTMpKzEsTT1sKih1LTIpK3Uscz1sKih1LTEpLGk9bCooMy0yKnUpO3JldHVybiB0WzBdPWFbMF0qZStuWzBdKk0rclswXSpzK29bMF0qaSx0WzFdPWFbMV0qZStuWzFdKk0rclsxXSpzK29bMV0qaSx0WzJdPWFbMl0qZStuWzJdKk0rclsyXSpzK29bMl0qaSx0fSxvLmJlemllcj1mdW5jdGlvbih0LGEsbixyLG8sdSl7dmFyIGw9MS11LGU9bCpsLE09dSp1LHM9ZSpsLGk9Myp1KmUsYz0zKk0qbCxoPU0qdTtyZXR1cm4gdFswXT1hWzBdKnMrblswXSppK3JbMF0qYytvWzBdKmgsdFsxXT1hWzFdKnMrblsxXSppK3JbMV0qYytvWzFdKmgsdFsyXT1hWzJdKnMrblsyXSppK3JbMl0qYytvWzJdKmgsdH0sby5yYW5kb209ZnVuY3Rpb24odCxhKXthPWF8fDE7dmFyIG49MipyLlJBTkRPTSgpKk1hdGguUEksbz0yKnIuUkFORE9NKCktMSx1PU1hdGguc3FydCgxLW8qbykqYTtyZXR1cm4gdFswXT1NYXRoLmNvcyhuKSp1LHRbMV09TWF0aC5zaW4obikqdSx0WzJdPW8qYSx0fSxvLnRyYW5zZm9ybU1hdDQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bM10qcituWzddKm8rblsxMV0qdStuWzE1XTtyZXR1cm4gbD1sfHwxLHRbMF09KG5bMF0qcituWzRdKm8rbls4XSp1K25bMTJdKS9sLHRbMV09KG5bMV0qcituWzVdKm8rbls5XSp1K25bMTNdKS9sLHRbMl09KG5bMl0qcituWzZdKm8rblsxMF0qdStuWzE0XSkvbCx0fSxvLnRyYW5zZm9ybU1hdDM9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXTtyZXR1cm4gdFswXT1yKm5bMF0rbypuWzNdK3Uqbls2XSx0WzFdPXIqblsxXStvKm5bNF0rdSpuWzddLHRbMl09cipuWzJdK28qbls1XSt1Km5bOF0sdH0sby50cmFuc2Zvcm1RdWF0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1uWzBdLGU9blsxXSxNPW5bMl0scz1uWzNdLGk9cypyK2UqdS1NKm8sYz1zKm8rTSpyLWwqdSxoPXMqdStsKm8tZSpyLFM9LWwqci1lKm8tTSp1O3JldHVybiB0WzBdPWkqcytTKi1sK2MqLU0taCotZSx0WzFdPWMqcytTKi1lK2gqLWwtaSotTSx0WzJdPWgqcytTKi1NK2kqLWUtYyotbCx0fSxvLnJvdGF0ZVg9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89W10sdT1bXTtyZXR1cm4gb1swXT1hWzBdLW5bMF0sb1sxXT1hWzFdLW5bMV0sb1syXT1hWzJdLW5bMl0sdVswXT1vWzBdLHVbMV09b1sxXSpNYXRoLmNvcyhyKS1vWzJdKk1hdGguc2luKHIpLHVbMl09b1sxXSpNYXRoLnNpbihyKStvWzJdKk1hdGguY29zKHIpLHRbMF09dVswXStuWzBdLHRbMV09dVsxXStuWzFdLHRbMl09dVsyXStuWzJdLHR9LG8ucm90YXRlWT1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1bXSx1PVtdO3JldHVybiBvWzBdPWFbMF0tblswXSxvWzFdPWFbMV0tblsxXSxvWzJdPWFbMl0tblsyXSx1WzBdPW9bMl0qTWF0aC5zaW4ocikrb1swXSpNYXRoLmNvcyhyKSx1WzFdPW9bMV0sdVsyXT1vWzJdKk1hdGguY29zKHIpLW9bMF0qTWF0aC5zaW4ociksdFswXT11WzBdK25bMF0sdFsxXT11WzFdK25bMV0sdFsyXT11WzJdK25bMl0sdH0sby5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPVtdLHU9W107cmV0dXJuIG9bMF09YVswXS1uWzBdLG9bMV09YVsxXS1uWzFdLG9bMl09YVsyXS1uWzJdLHVbMF09b1swXSpNYXRoLmNvcyhyKS1vWzFdKk1hdGguc2luKHIpLHVbMV09b1swXSpNYXRoLnNpbihyKStvWzFdKk1hdGguY29zKHIpLHVbMl09b1syXSx0WzBdPXVbMF0rblswXSx0WzFdPXVbMV0rblsxXSx0WzJdPXVbMl0rblsyXSx0fSxvLmZvckVhY2g9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvLHUsbCl7dmFyIGUsTTtmb3Iobnx8KG49Mykscnx8KHI9MCksTT1vP01hdGgubWluKG8qbityLGEubGVuZ3RoKTphLmxlbmd0aCxlPXI7TT5lO2UrPW4pdFswXT1hW2VdLHRbMV09YVtlKzFdLHRbMl09YVtlKzJdLHUodCx0LGwpLGFbZV09dFswXSxhW2UrMV09dFsxXSxhW2UrMl09dFsyXTtyZXR1cm4gYX19KCksby5hbmdsZT1mdW5jdGlvbih0LGEpe3ZhciBuPW8uZnJvbVZhbHVlcyh0WzBdLHRbMV0sdFsyXSkscj1vLmZyb21WYWx1ZXMoYVswXSxhWzFdLGFbMl0pO28ubm9ybWFsaXplKG4sbiksby5ub3JtYWxpemUocixyKTt2YXIgdT1vLmRvdChuLHIpO3JldHVybiB1PjE/MDpNYXRoLmFjb3ModSl9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwidmVjMyhcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiKVwifSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9YVswXSxlPWFbMV0sTT1hWzJdO3JldHVybiBNYXRoLmFicyhuLWwpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhsKSkmJk1hdGguYWJzKG8tZSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGUpKSYmTWF0aC5hYnModS1NKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoTSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHRbM109MCx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhfSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyl7dmFyIHU9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdVswXT10LHVbMV09YSx1WzJdPW4sdVszXT1vLHV9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHR9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuWzBdLHRbMV09YVsxXSpuWzFdLHRbMl09YVsyXSpuWzJdLHRbM109YVszXSpuWzNdLHR9LG8ubXVsPW8ubXVsdGlwbHksby5kaXZpZGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0vblswXSx0WzFdPWFbMV0vblsxXSx0WzJdPWFbMl0vblsyXSx0WzNdPWFbM10vblszXSx0fSxvLmRpdj1vLmRpdmlkZSxvLmNlaWw9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmNlaWwoYVswXSksdFsxXT1NYXRoLmNlaWwoYVsxXSksdFsyXT1NYXRoLmNlaWwoYVsyXSksdFszXT1NYXRoLmNlaWwoYVszXSksdH0sby5mbG9vcj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguZmxvb3IoYVswXSksdFsxXT1NYXRoLmZsb29yKGFbMV0pLHRbMl09TWF0aC5mbG9vcihhWzJdKSx0WzNdPU1hdGguZmxvb3IoYVszXSksdH0sby5taW49ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWluKGFbMF0sblswXSksdFsxXT1NYXRoLm1pbihhWzFdLG5bMV0pLHRbMl09TWF0aC5taW4oYVsyXSxuWzJdKSx0WzNdPU1hdGgubWluKGFbM10sblszXSksdH0sby5tYXg9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWF4KGFbMF0sblswXSksdFsxXT1NYXRoLm1heChhWzFdLG5bMV0pLHRbMl09TWF0aC5tYXgoYVsyXSxuWzJdKSx0WzNdPU1hdGgubWF4KGFbM10sblszXSksdH0sby5yb3VuZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGgucm91bmQoYVswXSksdFsxXT1NYXRoLnJvdW5kKGFbMV0pLHRbMl09TWF0aC5yb3VuZChhWzJdKSx0WzNdPU1hdGgucm91bmQoYVszXSksdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHR9LG8uc2NhbGVBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdH0sby5kaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXSx1PWFbM10tdFszXTtyZXR1cm4gTWF0aC5zcXJ0KG4qbityKnIrbypvK3UqdSl9LG8uZGlzdD1vLmRpc3RhbmNlLG8uc3F1YXJlZERpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdLHU9YVszXS10WzNdO3JldHVybiBuKm4rcipyK28qbyt1KnV9LG8uc3FyRGlzdD1vLnNxdWFyZWREaXN0YW5jZSxvLmxlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdO3JldHVybiBNYXRoLnNxcnQoYSphK24qbityKnIrbypvKX0sby5sZW49by5sZW5ndGgsby5zcXVhcmVkTGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM107cmV0dXJuIGEqYStuKm4rcipyK28qb30sby5zcXJMZW49by5zcXVhcmVkTGVuZ3RoLG8ubmVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHRbM109LWFbM10sdH0sby5pbnZlcnNlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MS9hWzBdLHRbMV09MS9hWzFdLHRbMl09MS9hWzJdLHRbM109MS9hWzNdLHR9LG8ubm9ybWFsaXplPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4qbityKnIrbypvK3UqdTtyZXR1cm4gbD4wJiYobD0xL01hdGguc3FydChsKSx0WzBdPW4qbCx0WzFdPXIqbCx0WzJdPW8qbCx0WzNdPXUqbCksdH0sby5kb3Q9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXSphWzBdK3RbMV0qYVsxXSt0WzJdKmFbMl0rdFszXSphWzNdfSxvLmxlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV0sbD1hWzJdLGU9YVszXTtyZXR1cm4gdFswXT1vK3IqKG5bMF0tbyksdFsxXT11K3IqKG5bMV0tdSksdFsyXT1sK3IqKG5bMl0tbCksdFszXT1lK3IqKG5bM10tZSksdH0sby5yYW5kb209ZnVuY3Rpb24odCxhKXtyZXR1cm4gYT1hfHwxLHRbMF09ci5SQU5ET00oKSx0WzFdPXIuUkFORE9NKCksdFsyXT1yLlJBTkRPTSgpLHRbM109ci5SQU5ET00oKSxvLm5vcm1hbGl6ZSh0LHQpLG8uc2NhbGUodCx0LGEpLHR9LG8udHJhbnNmb3JtTWF0ND1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXTtyZXR1cm4gdFswXT1uWzBdKnIrbls0XSpvK25bOF0qdStuWzEyXSpsLHRbMV09blsxXSpyK25bNV0qbytuWzldKnUrblsxM10qbCx0WzJdPW5bMl0qcituWzZdKm8rblsxMF0qdStuWzE0XSpsLHRbM109blszXSpyK25bN10qbytuWzExXSp1K25bMTVdKmwsdH0sby50cmFuc2Zvcm1RdWF0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1uWzBdLGU9blsxXSxNPW5bMl0scz1uWzNdLGk9cypyK2UqdS1NKm8sYz1zKm8rTSpyLWwqdSxoPXMqdStsKm8tZSpyLFM9LWwqci1lKm8tTSp1O3JldHVybiB0WzBdPWkqcytTKi1sK2MqLU0taCotZSx0WzFdPWMqcytTKi1lK2gqLWwtaSotTSx0WzJdPWgqcytTKi1NK2kqLWUtYyotbCx0WzNdPWFbM10sdH0sby5mb3JFYWNoPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyx1LGwpe3ZhciBlLE07Zm9yKG58fChuPTQpLHJ8fChyPTApLE09bz9NYXRoLm1pbihvKm4rcixhLmxlbmd0aCk6YS5sZW5ndGgsZT1yO00+ZTtlKz1uKXRbMF09YVtlXSx0WzFdPWFbZSsxXSx0WzJdPWFbZSsyXSx0WzNdPWFbZSszXSx1KHQsdCxsKSxhW2VdPXRbMF0sYVtlKzFdPXRbMV0sYVtlKzJdPXRbMl0sYVtlKzNdPXRbM107cmV0dXJuIGF9fSgpLG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwidmVjNChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiKVwifSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT1hWzBdLE09YVsxXSxzPWFbMl0saT1hWzNdO3JldHVybiBNYXRoLmFicyhuLWUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhlKSkmJk1hdGguYWJzKG8tTSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKE0pKSYmTWF0aC5hYnModS1zKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMocykpJiZNYXRoLmFicyhsLWkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhpKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSgyKTtyZXR1cm4gdFswXT0wLHRbMV09MCx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoMik7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYX0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSl7dmFyIG49bmV3IHIuQVJSQVlfVFlQRSgyKTtyZXR1cm4gblswXT10LG5bMV09YSxufSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0fSxvLnNldD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YSx0WzFdPW4sdH0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm5bMF0sdFsxXT1hWzFdKm5bMV0sdH0sby5tdWw9by5tdWx0aXBseSxvLmRpdmlkZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS9uWzBdLHRbMV09YVsxXS9uWzFdLHR9LG8uZGl2PW8uZGl2aWRlLG8uY2VpbD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguY2VpbChhWzBdKSx0WzFdPU1hdGguY2VpbChhWzFdKSx0fSxvLmZsb29yPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5mbG9vcihhWzBdKSx0WzFdPU1hdGguZmxvb3IoYVsxXSksdH0sby5taW49ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWluKGFbMF0sblswXSksdFsxXT1NYXRoLm1pbihhWzFdLG5bMV0pLHR9LG8ubWF4PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1heChhWzBdLG5bMF0pLHRbMV09TWF0aC5tYXgoYVsxXSxuWzFdKSx0fSxvLnJvdW5kPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5yb3VuZChhWzBdKSx0WzFdPU1hdGgucm91bmQoYVsxXSksdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHR9LG8uc2NhbGVBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0fSxvLmRpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdO3JldHVybiBNYXRoLnNxcnQobipuK3Iqcil9LG8uZGlzdD1vLmRpc3RhbmNlLG8uc3F1YXJlZERpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdO3JldHVybiBuKm4rcipyfSxvLnNxckRpc3Q9by5zcXVhcmVkRGlzdGFuY2Usby5sZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV07cmV0dXJuIE1hdGguc3FydChhKmErbipuKX0sby5sZW49by5sZW5ndGgsby5zcXVhcmVkTGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdO3JldHVybiBhKmErbipufSxvLnNxckxlbj1vLnNxdWFyZWRMZW5ndGgsby5uZWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHR9LG8uaW52ZXJzZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEvYVswXSx0WzFdPTEvYVsxXSx0fSxvLm5vcm1hbGl6ZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89bipuK3IqcjtyZXR1cm4gbz4wJiYobz0xL01hdGguc3FydChvKSx0WzBdPWFbMF0qbyx0WzFdPWFbMV0qbyksdH0sby5kb3Q9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXSphWzBdK3RbMV0qYVsxXX0sby5jcm9zcz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSpuWzFdLWFbMV0qblswXTtyZXR1cm4gdFswXT10WzFdPTAsdFsyXT1yLHR9LG8ubGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXTtyZXR1cm4gdFswXT1vK3IqKG5bMF0tbyksdFsxXT11K3IqKG5bMV0tdSksdH0sby5yYW5kb209ZnVuY3Rpb24odCxhKXthPWF8fDE7dmFyIG49MipyLlJBTkRPTSgpKk1hdGguUEk7cmV0dXJuIHRbMF09TWF0aC5jb3MobikqYSx0WzFdPU1hdGguc2luKG4pKmEsdH0sby50cmFuc2Zvcm1NYXQyPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXTtyZXR1cm4gdFswXT1uWzBdKnIrblsyXSpvLHRbMV09blsxXSpyK25bM10qbyx0fSxvLnRyYW5zZm9ybU1hdDJkPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXTtyZXR1cm4gdFswXT1uWzBdKnIrblsyXSpvK25bNF0sdFsxXT1uWzFdKnIrblszXSpvK25bNV0sdH0sby50cmFuc2Zvcm1NYXQzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXTtyZXR1cm4gdFswXT1uWzBdKnIrblszXSpvK25bNl0sdFsxXT1uWzFdKnIrbls0XSpvK25bN10sdH0sby50cmFuc2Zvcm1NYXQ0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXTtyZXR1cm4gdFswXT1uWzBdKnIrbls0XSpvK25bMTJdLHRbMV09blsxXSpyK25bNV0qbytuWzEzXSx0fSxvLmZvckVhY2g9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvLHUsbCl7dmFyIGUsTTtmb3Iobnx8KG49Mikscnx8KHI9MCksTT1vP01hdGgubWluKG8qbityLGEubGVuZ3RoKTphLmxlbmd0aCxlPXI7TT5lO2UrPW4pdFswXT1hW2VdLHRbMV09YVtlKzFdLHUodCx0LGwpLGFbZV09dFswXSxhW2UrMV09dFsxXTtyZXR1cm4gYX19KCksby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJ2ZWMyKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIpXCJ9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9YVswXSxsPWFbMV07cmV0dXJuIE1hdGguYWJzKG4tdSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKHUpKSYmTWF0aC5hYnMoby1sKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMobCkpfSx0LmV4cG9ydHM9b31dKX0pOyIsIi8qKlxyXG4gKiBDYW52YXMgUmVuZGVyaW5nIFN1cmZhY2UuXHJcbiAqIEl0IGlzIGEgdG9wIGxldmVsIGNvbXBvbmVudCB0aGF0IGNvbWJpbmVzIGl0IGFsbCB0b2dldGhlciBhbmQgaGlkZXMgdW5uZWNlc3NhcnkgZGV0YWlscy5cclxuICpcclxuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzU3VyZmFjZShjYW52YXMpXHJcbntcclxuICAgIGlmICggISAoY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpICkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Bhc3NlZCBjYW52YXMgaXMgbm90IEhUTUxDYW52YXNFbGVtZW50IScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIHRoaXMuZmFjdG9yeSA9IG5ldyBDYW52YXNVSUZhY3RvcnkodGhpcy5jb250ZXh0KTtcclxuICAgIHRoaXMuZWxlbWVudHMgPSBuZXcgVUlDb2xsZWN0aW9uKCk7XHJcbiAgICB0aGlzLmVsZW1lbnRzLmFkZCh0aGlzLmZhY3RvcnkuY3JlYXRlTGFiZWwoKSk7XHJcbiAgICB0aGlzLmV2ZW50SGFuZGxlciA9IG5ldyBDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyKHRoaXMpO1xyXG4gICAgdGhpcy5ldmVudEhhbmRsZXIuYmluZEh0bWxDYW52YXNFdmVudHMoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoaXMgaXMgYSBmbGFnIGZvciBkZXRlY3RpbmcgaWYgd2UgYXJlIGV4cG9ydGluZ1xyXG4gICAgICogcmVzdWx0IGltYWdlIGFzIGZpbmFsIHRleHR1cmUuXHJcbiAgICAgKlxyXG4gICAgICogSWYgdGhpcyBpcyB0cnVlLCB0aGVuIHdlIHNob3VsZG4ndCBzaG93IGFueVxyXG4gICAgICogc2VsZWN0aW9uIGJvcmRlcnNcclxuICAgICAqXHJcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cclxuICAgICAqIEBwcml2YXRlXHJcbiAgICAgKi9cclxuICAgIHRoaXMuX2lzRXhwb3J0aW5nUmVuZGVyID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5jbGVhckNvbG9yID0gJyNGRkZGRkYnO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBVSUNvbGxlY3Rpb24gcmVsYXRlZCB0byB0aGUgc3VyZmFjZS5cclxuICogXHJcbiAqIEByZXR1cm5zIHtVSUNvbGxlY3Rpb259XHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5nZXRFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgbmV3IGxhYmVsIGVsZW1lbnQgaW4gdWkgY29sbGVjdGlvbiBvZiB0aGUgc3VyZmFjZSBhbmQgcmV0dXJucyBpdC5cclxuICogXHJcbiAqIEByZXR1cm5zIHtVSUxhYmVsRWxlbWVudH1cclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnB1c2hMYWJlbCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBsYWJlbCA9IHRoaXMuZmFjdG9yeS5jcmVhdGVMYWJlbCgpO1xyXG4gICAgdGhpcy5lbGVtZW50cy5hZGQobGFiZWwpO1xyXG4gICAgdGhpcy5lbGVtZW50cy5zZWxlY3RMYXN0KCk7XHJcblxyXG4gICAgdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlclNlbGVjdChsYWJlbCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIG5ldyBpbWFnZSBlbGVtZW50IGluIHVpIGNvbGxlY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnB1c2hJbWFnZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xyXG4gICAgdmFyIGltYWdlRWxlbWVudCA9IHRoaXMuZmFjdG9yeS5jcmVhdGVJbWFnZShpbWFnZSk7XHJcbiAgICB0aGlzLmVsZW1lbnRzLmFkZChpbWFnZUVsZW1lbnQpO1xyXG4gICAgdGhpcy5lbGVtZW50cy5zZWxlY3RMYXN0KCk7XHJcblxyXG4gICAgdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlclNlbGVjdChpbWFnZUVsZW1lbnQpO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICByZXR1cm4gaW1hZ2VFbGVtZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsZWFyIHRoZSByZWxhdGVkIGNhbnZhcy5cclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuY2xlYXJDb2xvcjtcclxuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBjbGVhciBjb2xvclxyXG4gKiBcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5zZXRDbGVhckNvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICB0aGlzLmNsZWFyQ29sb3IgPSBjb2xvcjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIGFsbCBvZiB0aGUgZWxlbWVudHMgb24gdGhlIHN1cmZhY2UuXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5yZW5kZXJFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gdGhpcy5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCk7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB0aGlzLmVsZW1lbnRzLmdldChpKS5yZW5kZXIoKTtcclxuXHJcbiAgICAgICAgaWYgKGkgPT0gc2VsZWN0ZWRJbmRleCAmJiAhIHRoaXMuX2lzRXhwb3J0aW5nUmVuZGVyKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBXZSBjYWxsIGl0ICdrb3N0eWwnXHJcbiAgICAgICAgICAgIC8vIFdlaXJkIHdheSB0byBzZXQgY29sb3JcclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gJyNmZmZmZmYnO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbGVhckNvbG9yLnRvTG93ZXJDYXNlKCkgPT0gJyNmZmZmZmYnKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvciA9ICcjMmU2ZGE0JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbmV3IENhbnZhc1VJU2VsZWN0ZWRWaWV3KHRoaXMuY29udGV4dCwge1xyXG4gICAgICAgICAgICAgICAgLy8ga2luZGEgZmVlbHMgbGlrZSBoYXJkIGNvZGVcclxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcclxuICAgICAgICAgICAgICAgIHNpemU6IDE1XHJcbiAgICAgICAgICAgIH0pLnJlbmRlcih0aGlzLmVsZW1lbnRzLmdldChpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsZWFycyB0aGUgc3VyZmFjZSBhbmQgcmVuZGVycyBpdCB3aXRoIGFsbCBlbGVtZW50cy5cclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVuZGVyRWxlbWVudHMoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZW5lcmF0ZXMgYW4gaW1hZ2UgZnJvbSBkcmF3biBjb250ZW50XHJcbiAqIEByZXR1cm5zIHtJbWFnZX1cclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnRvSW1hZ2UgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdGhpcy5faXNFeHBvcnRpbmdSZW5kZXIgPSB0cnVlO1xyXG4gICAgdGhpcy5yZW5kZXIoKTtcclxuXHJcbiAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgIGltYWdlLnNyYyA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgpO1xyXG5cclxuICAgIHRoaXMuX2lzRXhwb3J0aW5nUmVuZGVyID0gZmFsc2U7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgIHJldHVybiBpbWFnZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNb3ZlcyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudCB0byB0aGUgYmFja2dyb3VuZFxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuc2VsZWN0ZWRUb0JhY2tncm91bmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnRzLnRvU3RhcnQodGhpcy5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vdmVzIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50IHRvIHRoZSBmb3JlZ3JvdW5kXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5zZWxlY3RlZFRvRm9yZWdyb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZWxlbWVudHMudG9FbmQodGhpcy5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybiB7VUlFbGVtZW50fVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVtb3ZlU2VsZWN0ZWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudHMucmVtb3ZlKHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpKTtcclxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJEZXNlbGVjdCgpO1xyXG5cclxuICAgIHJldHVybiBlbGVtZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgbmV3IGV2ZW50IGhhbmRsZXIgb24gc2VsZWN0aW9uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtVSVNlbGVjdGVkQ2FsbGJhY2t9IGNhbGxiYWNrXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5hZGRTZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLmFkZFNlbGVjdEV2ZW50SGFuZGxlcihjYWxsYmFjayk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5hZGREZXNlbGVjdEV2ZW50SGFuZGxlcihjYWxsYmFjayk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGNhbnZhcyBib3VuZCByZWN0YW5nbGUuXHJcbiAqIEtpbmRhIHVnbHkgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7e3RvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgbGVmdDogbnVtYmVyfX1cclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEJvdW5kcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9wOiAwLFxyXG4gICAgICAgIHJpZ2h0OiB0aGlzLmNhbnZhcy53aWR0aCxcclxuICAgICAgICBib3R0b206IHRoaXMuY2FudmFzLmhlaWdodCxcclxuICAgICAgICBsZWZ0OiAwXHJcbiAgICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENhbGxiYWNrIHR5cGUgZm9yIHNlbGVjdGluZyBhbmQgZWxlbWVudFxyXG4gKlxyXG4gKiBAY2FsbGJhY2sgVUlTZWxlY3RlZENhbGxiYWNrXHJcbiAqIEBwYXJhbSB7VUlFbGVtZW50fVxyXG4gKi8iLCIvKipcclxuICogVGhpcyBjbGFzcyBpcyByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgRE9NIGV2ZW50cyBhbmQgdHJpZ2dlcmluZyBhcHBsaWNhdGlvbiBldmVudHNcclxuICogS2luZGEgdWdseSBjb2RlIGhlcmVcclxuICpcclxuICogQHBhcmFtIHtDYW52YXNTdXJmYWNlfSBzdXJmYWNlXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlciAoc3VyZmFjZSlcclxue1xyXG4gICAgdGhpcy5zdXJmYWNlID0gc3VyZmFjZTtcclxuICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgIHRoaXMuaXNNb3ZpbmdDbGljayA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBmYWxzZTtcclxuICAgIHRoaXMubGFzdENsaWNrT2Zmc2V0ID0gbnVsbDtcclxuICAgIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmhhbmRsZXJzID0ge1xyXG4gICAgICAgIG9uU2VsZWN0OiBbXSxcclxuICAgICAgICBvbkRlc2VsZWN0OiBbXVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBIVE1MIGNhbnZhc1xyXG4gKiBcclxuICogQHBhcmFtIGVcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmJpbmRIdG1sQ2FudmFzRXZlbnRzID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5oYW5kbGVNb3VzZURvd24uYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyBXZSBiaW5kaW5nIHRoaXMgZXZlbnQgdG8gdGhlIHdob2xlIGRvY3VtZW50IHRvIHN0b3AgbW92aW5nXHJcbiAgICAvLyBpZiB1c2VyIHRyaWVzIHRvIGRyYWcgYW4gZWxlbWVudCBvdXQgb2YgdGhlIGNhbnZhc1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xyXG5cclxuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSk7XHJcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcykpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXJzIHNlbGVjdCBldmVudC5cclxuICogVGhpcyBtZWFucyB0aGF0IGFsbCBhc3NpZ25lZCBoYW5kbGVycyB3aWxsIGJlIGV4ZWN1dGVkLlxyXG4gKlxyXG4gKiBUT0RPOiBBYmFuZG9uIEphdmFTY3JpcHQgYW5kIGxlYXJuIFR5cGVTY3JpcHRcclxuICpcclxuICogQHBhcmFtIHtVSUVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXJTZWxlY3QgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaGFuZGxlcnMub25TZWxlY3QpIHtcclxuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLmhhbmRsZXJzLm9uU2VsZWN0W2tleV07XHJcblxyXG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmlnZ2VycyBkZXNlbGVjdCBldmVudC5cclxuICogVGhpcyBtZWFucyB0aGF0IGFsbCBhc3NpZ25lZCBoYW5kbGVycyB3aWxsIGJlIGV4ZWN1dGVkLlxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudHJpZ2dlckRlc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdFtrZXldO1xyXG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgbmV3IGhhbmRsZXIgb24gZWxlbWVudCBzZWxlY3Rpb24gZXZlbnRcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZFNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgdGhpcy5oYW5kbGVycy5vblNlbGVjdC5wdXNoKGNhbGxiYWNrKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIG5ldyBoYW5kbGVyIG9uIGVsZW1lbnQgZGVzZWxlY3Rpb24gZXZlbnRcclxuICpcclxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmhhbmRsZXJzLm9uRGVzZWxlY3QucHVzaChjYWxsYmFjayk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXIgZm9yIHRoZSBtb3VzZWRvd24gZXZlbnRcclxuICpcclxuICogQHBhcmFtIGVcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlRG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB0aGlzLmlzTW91c2VEb3duID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBRdWljayBoYWNrXHJcbiAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT0gXCJ1bmRlZmluZWRcIiAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xyXG4gICAgICAgIGUgPSBlLnRvdWNoZXNbMF07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGxvY2FsQ29vcmRpbmF0ZXMgPSB0aGlzLnRvTG9jYWxDb29yZGluYXRlcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcbiAgICB2YXIgb2xkU2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zdXJmYWNlLmdldEVsZW1lbnRzKCkuZ2V0U2VsZWN0ZWRJbmRleCgpO1xyXG4gICAgdmFyIG5ld1NlbGVjdGVkSW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZmV0Y2hJbmRleEJ5T2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcclxuICAgIHZhciBuZXdTZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0KG5ld1NlbGVjdGVkSW5kZXgpO1xyXG5cclxuICAgIHZhciBkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkID0gbmV3U2VsZWN0ZWRJbmRleCAhPT0gbnVsbDtcclxuICAgIHZhciBpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUgPSBkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkICYmXHJcbiAgICAgICAgb2xkU2VsZWN0ZWRFbGVtZW50ID09IG5ld1NlbGVjdGVkSW5kZXg7XHJcblxyXG4gICAgaWYgKCFkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkKSB7XHJcblxyXG4gICAgICAgIC8vIElmIHdlIGhhZCBzb21ldGhpbmcgc2VsZWN0ZWQgYmVmb3JlLFxyXG4gICAgICAgIC8vIGl0IG1lYW5zIGl0IGlzIHRpbWUgdG8gY2FsbCBkZXNlbGVjdCBoYW5kbGVyc1xyXG4gICAgICAgIGlmIChvbGRTZWxlY3RlZEVsZW1lbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJEZXNlbGVjdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmRlc2VsZWN0KCk7XHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUpIHtcclxuICAgICAgICB0aGlzLnRyaWdnZXJTZWxlY3QobmV3U2VsZWN0ZWRFbGVtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBXZSByZW1lbWJlciBoZXJlIHRoZSBsYXN0IGNsaWNrIG9mZnNldCByZWxhdGl2ZWx5IHNlbGVjdGVkIGVsZW1lbnRcclxuICAgIHRoaXMubGFzdENsaWNrT2Zmc2V0ID0gbmV3U2VsZWN0ZWRFbGVtZW50LmdldENsaWNrT2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcclxuXHJcbiAgICAvLyBJcyBpdCBhIGNsaWNrIHN0YXJ0aW5nIHJlc2l6ZSBvcGVyYXRpb24gP1xyXG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUgJiZcclxuICAgICAgICB0aGlzLmlzUmVzaXplUG9zc2libGUobmV3U2VsZWN0ZWRFbGVtZW50LCBsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNSZXNpemluZ0NsaWNrKSB7XHJcbiAgICAgICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBsb2NhbENvb3JkaW5hdGVzO1xyXG4gICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyBJdCBpcyBhIGNsaWNrIGZvciBtb3ZpbmdcclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaXNNb3ZpbmdDbGljayA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLmVsZW1lbnRzLnNlbGVjdChuZXdTZWxlY3RlZEluZGV4KTtcclxuICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZSh0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnN1cmZhY2UucmVuZGVyKCk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogSGFuZGxlciBmb3IgbW91c2UgdXAgZXZlbnRcclxuICpcclxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZVVwID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgIHRoaXMuaXNSZXNpemluZ0NsaWNrID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzTW92aW5nQ2xpY2sgPSBmYWxzZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmFuc2Zvcm1zIGNvb3JkaW5hdGVzIHRvIGNvb3JkaW5hdGVzIGluc2lkZSBjYW52YXNcclxuICpcclxuICogQHBhcmFtIGNsaWVudFhcclxuICogQHBhcmFtIGNsaWVudFlcclxuICogQHJldHVybnMge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50b0xvY2FsQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoY2xpZW50WCwgY2xpZW50WSkge1xyXG4gICAgdmFyIHZpZXdwb3J0T2Zmc2V0ID0gdGhpcy5zdXJmYWNlLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIC8vIHRoZXNlIGFyZSByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnQsIGkuZS4gdGhlIHdpbmRvd1xyXG4gICAgdmFyIHRvcCA9IHZpZXdwb3J0T2Zmc2V0LnRvcDtcclxuICAgIHZhciBsZWZ0ID0gdmlld3BvcnRPZmZzZXQubGVmdDtcclxuICAgIHZhciB0b3BPZmZzZXQgPSBjbGllbnRZIC0gdG9wO1xyXG4gICAgdmFyIGxlZnRPZmZzZXQgPSBjbGllbnRYIC0gbGVmdDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHg6IGxlZnRPZmZzZXQsXHJcbiAgICAgICAgeTogdG9wT2Zmc2V0XHJcbiAgICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXIgZm9yIG1vdXNlIG1vdmUgZXZlbnRcclxuICpcclxuICogQHBhcmFtIGVcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlTW92ZSA9IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgLy8gUXVpY2sgaGFja1xyXG4gICAgaWYgKHR5cGVvZiBUb3VjaEV2ZW50ICE9IFwidW5kZWZpbmVkXCIgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcclxuICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKTtcclxuICAgIHZhciBsb2NhbENvb3JkaW5hdGVzID0gdGhpcy50b0xvY2FsQ29vcmRpbmF0ZXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xyXG4gICAgdmFyIGVsZW1lbnRIb3ZlckluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmZldGNoSW5kZXhCeU9mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XHJcblxyXG4gICAgLy8gSXQgaXMgc2ltcGxlIG1vdXNlIG1vdmUsXHJcbiAgICAvLyB3ZSBoYXZlIG5vdGhpbmcgbW9yZSB0byBkbyBoZXJlXHJcbiAgICBpZiAoIXRoaXMuaXNNb3VzZURvd24pIHtcclxuICAgICAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZVdpdGhvdXRNb3VzZURvd24oZWxlbWVudEhvdmVySW5kZXgsIHNlbGVjdGVkSW5kZXgsIGxvY2FsQ29vcmRpbmF0ZXMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkRWxlbWVudCgpO1xyXG5cclxuICAgIC8vIElmIHdlIGFyZSBoZXJlLCB0aGVuIHdlIGhhdmUgYnV0dG9uIHByZXNzZWQgYW5kIHdlIG11c3QgcmVzaXplIVxyXG4gICAgaWYgKHRoaXMuaXNSZXNpemluZ0NsaWNrKSB7XHJcbiAgICAgICAgdmFyIG5ld1NpemVEZWx0YSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IGxvY2FsQ29vcmRpbmF0ZXMueCAtIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzLngsXHJcbiAgICAgICAgICAgIGhlaWdodDogbG9jYWxDb29yZGluYXRlcy55IC0gdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMueVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzID0gbG9jYWxDb29yZGluYXRlcztcclxuXHJcbiAgICAgICAgdmFyIHNpemUgPSBzZWxlY3RlZEVsZW1lbnQuZ2V0U2l6ZSgpO1xyXG4gICAgICAgIHNpemUucmVzaXplQnkobmV3U2l6ZURlbHRhLndpZHRoLCBuZXdTaXplRGVsdGEuaGVpZ2h0KTtcclxuICAgIH1cclxuICAgIC8vIE5haCwgaXQncyBqdXN0IG1vdmluZ1xyXG4gICAgZWxzZSBpZiAodGhpcy5pc01vdmluZ0NsaWNrKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRFbGVtZW50Lm1vdmVUbyhuZXcgUG9zaXRpb24oXHJcbiAgICAgICAgICAgIGxvY2FsQ29vcmRpbmF0ZXMueCAtIHRoaXMubGFzdENsaWNrT2Zmc2V0LnRvcCxcclxuICAgICAgICAgICAgbG9jYWxDb29yZGluYXRlcy55IC0gdGhpcy5sYXN0Q2xpY2tPZmZzZXQubGVmdFxyXG4gICAgICAgICkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIG1vdmFibGUgaHRtbCBjbGFzcyB0byB0aGUgY2FudmFzIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBib29sXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zZXRNb3ZhYmxlU3RhdGUgPSBmdW5jdGlvbiAoYm9vbCkge1xyXG4gICAgaWYgKGJvb2wpIHtcclxuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5hZGQoJ21vdmFibGUnKTtcclxuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc2l6YWJsZScpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZhYmxlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyByZXNpemFibGUgaHRtbCBjbGFzcyB0byB0aGUgY2FudmFzIGVsZW1lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSBib29sXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5zZXRSZXNpemFibGVTdGF0ZSA9IGZ1bmN0aW9uIChib29sKSB7XHJcbiAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgnbW92YWJsZScpO1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LmFkZCgncmVzaXphYmxlJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ3Jlc2l6YWJsZScpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZXMgbW91c2UgbW92ZSBldmVudCB3aGVuIG1vdXNlIGJ1dHRvbiBpcyBub3QgcHJlc3NlZFxyXG4gKlxyXG4gKiBAcGFyYW0gZWxlbWVudEhvdmVySW5kZXhcclxuICogQHBhcmFtIHNlbGVjdGVkSW5kZXhcclxuICogQHBhcmFtIG1vdXNlQ29vcmRpbmF0ZXNcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlTW92ZVdpdGhvdXRNb3VzZURvd24gPSBmdW5jdGlvbiAoZWxlbWVudEhvdmVySW5kZXgsIHNlbGVjdGVkSW5kZXgsIG1vdXNlQ29vcmRpbmF0ZXMpIHtcclxuICAgIGlmIChlbGVtZW50SG92ZXJJbmRleCA9PSBzZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgLy8gV2hhdCBzdGF0ZSBpcyBjdXJzb3IgaW4/XHJcbiAgICAgICAgdmFyIHJlc2l6ZVN0YXRlID0gdGhpcy5pc1Jlc2l6ZVBvc3NpYmxlKHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXRTZWxlY3RlZEVsZW1lbnQoKSwgbW91c2VDb29yZGluYXRlcy54LCBtb3VzZUNvb3JkaW5hdGVzLnkpO1xyXG4gICAgICAgIGlmIChyZXNpemVTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFJlc2l6YWJsZVN0YXRlKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRNb3ZhYmxlU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXRNb3ZhYmxlU3RhdGUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUoZmFsc2UpO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgcGFzc2VkIGNvb3JkaW5hdGVzIGFyZSBsb2NhdGVkIG9uIHBvc2l0aW9uIG9mIGRyYWcgaWNvbiBvZiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSBlbGVtZW50XHJcbiAqIEBwYXJhbSB4XHJcbiAqIEBwYXJhbSB5XHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5pc1Jlc2l6ZVBvc3NpYmxlID0gZnVuY3Rpb24oZWxlbWVudCwgeCwgeSkge1xyXG4gICAgdmFyIGRyYWdJY29uU2l6ZSA9IDEwO1xyXG5cclxuICAgIHZhciB0ZW1wRWxlbWVudERhdGEgPSB7XHJcbiAgICAgICAgcG9zaXRpb246IG5ldyBQb3NpdGlvbihcclxuICAgICAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgLSBkcmFnSWNvblNpemUsXHJcbiAgICAgICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKSAtIGRyYWdJY29uU2l6ZVxyXG4gICAgICAgICksXHJcbiAgICAgICAgc2l6ZTogbmV3IFNpemUoZHJhZ0ljb25TaXplLCBkcmFnSWNvblNpemUpXHJcbiAgICB9O1xyXG5cclxuICAgIHZhciB0ZW1wRWxlbWVudCA9IG5ldyBVSUVsZW1lbnQodGVtcEVsZW1lbnREYXRhLnBvc2l0aW9uLCB0ZW1wRWxlbWVudERhdGEuc2l6ZSk7XHJcbiAgICByZXR1cm4gdGVtcEVsZW1lbnQuaXNPZmZzZXRJbih4LCB5KTtcclxufTsiLCIvKipcclxuICpcclxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNVSUVsZW1lbnRWaWV3KGNvbnRleHQpIHtcclxuICAgIGlmICggISAoY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgVUkgRWxlbWVudCBWaWV3IGVycm9yISBDb250ZXh0IGlzIG5vdCBhIGNvbnRleHQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbn1cclxuXHJcbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XHJcblxyXG5DYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cclxufTsiLCIvKipcclxuICpcclxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNVSUZhY3RvcnkoY29udGV4dClcclxue1xyXG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyByZW5kZXJpbmcgY29udGV4dCBtdXN0IGJlIGluc3RhbmNlIG9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCEgKGZhY3RvcnkgY3JlYXRpbmcpJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhIGxhYmVsIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcclxuICpcclxuICogQHJldHVybnMge1VJTGFiZWxFbGVtZW50fVxyXG4gKi9cclxuQ2FudmFzVUlGYWN0b3J5LnByb3RvdHlwZS5jcmVhdGVMYWJlbCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB2YXIgbGFiZWwgPSBuZXcgVUlMYWJlbEVsZW1lbnQobmV3IFBvc2l0aW9uKDAsIDUwKSk7XHJcbiAgICBsYWJlbC5zZXRWaWV3KG5ldyBDYW52YXNVSUxhYmVsVmlldyh0aGlzLmNvbnRleHQpKTtcclxuXHJcbiAgICByZXR1cm4gbGFiZWw7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBpbWFnZSBlbGVtZW50LCB3aGljaCBpcyByZWFkeSB0byBiZSByZW5kZXJlZCBvbiB0aGUgY2FudmFzXHJcbiAqXHJcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXHJcbiAqL1xyXG5DYW52YXNVSUZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUltYWdlID0gZnVuY3Rpb24gKGltYWdlKSB7XHJcbiAgICB2YXIgaW1hZ2VFbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KG51bGwsIG51bGwsIGltYWdlKTtcclxuICAgIGltYWdlRWxlbWVudC5zZXRWaWV3KG5ldyBDYW52YXNVSUltYWdlVmlldyh0aGlzLmNvbnRleHQpKTtcclxuXHJcbiAgICByZXR1cm4gaW1hZ2VFbGVtZW50O1xyXG59OyIsIi8qKlxyXG4gKiBWaWV3IG9mIGFuIGltYWdlIGVsZW1lbnQgb24gdGhlIGNhbnZhc1xyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJSW1hZ2VWaWV3KGNvbnRleHQpIHtcclxuICAgIENhbnZhc1VJRWxlbWVudFZpZXcuY2FsbCh0aGlzLCBjb250ZXh0KTtcclxufVxyXG5cclxuQ2FudmFzVUlJbWFnZVZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XHJcblxyXG4vKipcclxuICogUmVuZGVycyBhbiBpbWFnZSBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlJbWFnZUVsZW1lbnR9IHVpSW1hZ2VFbGVtZW50XHJcbiAqL1xyXG5DYW52YXNVSUltYWdlVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHVpSW1hZ2VFbGVtZW50KSB7XHJcbiAgICB2YXIgcG9zID0gdWlJbWFnZUVsZW1lbnQuZ2V0UG9zaXRpb24oKTtcclxuICAgIHZhciBzaXplID0gdWlJbWFnZUVsZW1lbnQuZ2V0U2l6ZSgpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5kcmF3SW1hZ2UoXHJcbiAgICAgICAgdWlJbWFnZUVsZW1lbnQuZ2V0SW1hZ2UoKSxcclxuICAgICAgICBwb3MuZ2V0WCgpLFxyXG4gICAgICAgIHBvcy5nZXRZKCksXHJcbiAgICAgICAgc2l6ZS5nZXRXaWR0aCgpLFxyXG4gICAgICAgIHNpemUuZ2V0SGVpZ2h0KClcclxuICAgICk7XHJcbn07IiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlMYWJlbFZpZXcoY29udGV4dCkge1xyXG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG59XHJcblxyXG5DYW52YXNVSUxhYmVsVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIHRleHQgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJTGFiZWxFbGVtZW50fSBlbGVtZW50XHJcbiAqL1xyXG5DYW52YXNVSUxhYmVsVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIC8vIE91ciB0ZXh0IHNpemUgZml0cyBib3VuZHNcclxuICAgIHZhciBmb250U2l6ZSA9IGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gZm9udFNpemUgKyBcInB4IFwiICsgZWxlbWVudC5nZXRGb250KCk7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gZWxlbWVudC5nZXRDb2xvcigpO1xyXG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdoYW5naW5nJztcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoXHJcbiAgICAgICAgZWxlbWVudC5nZXRUZXh0KCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKClcclxuICAgICk7XHJcbn07IiwiLyoqXHJcbiAqIEJhc2UgdmlldyBmb3Igc2VsZWN0ZWQgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAcGFyYW0ge3tjb2xvcjogc3RyaW5nfSwge3NpemU6IGludH19IHN0eWxlIC0gaWNvbiBzaXplIGFuZCBoZXggY29sb3Igc3RyaW5nXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlTZWxlY3RlZFZpZXcoY29udGV4dCwgc3R5bGUpIHtcclxuICAgIGlmICggISAoY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgVUkgRWxlbWVudCBWaWV3IGVycm9yISBDb250ZXh0IGRvZXMgbm90IGhhdmUgdHlwZSBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQhJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxuICAgIHRoaXMuZmlsbFN0eWxlID0gc3R5bGUuY29sb3IgfHwgJyNBQUFBQUEnO1xyXG4gICAgdGhpcy5yZXNpemVJY29uV2lkdGggPSBzdHlsZS5zaXplIHx8IDE1O1xyXG59XHJcblxyXG5DYW52YXNVSVNlbGVjdGVkVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5yZXNpemVJY29uV2lkdGggKyBcInB4IEFyaWFsXCI7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5maWxsU3R5bGU7XHJcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2JvdHRvbSc7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFxyXG4gICAgICAgIENhbnZhc1VJU2VsZWN0ZWRWaWV3LlJlc2l6ZVN5bWJvbCxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSAtIHRoaXMucmVzaXplSWNvbldpZHRoLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKSxcclxuICAgICAgICB0aGlzLnJlc2l6ZUljb25XaWR0aFxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLmZpbGxTdHlsZTtcclxuICAgIHRoaXMuY29udGV4dC5zdHJva2VSZWN0KFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSxcclxuICAgICAgICBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpXHJcbiAgICApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEBjb25zdCDih5hcclxuICogQHR5cGUge3N0cmluZ31cclxuICovXHJcbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LlJlc2l6ZVN5bWJvbCA9ICdcXHUyMWYyJzsiLCIvKipcclxuICogUG9zaXRpb24gaW4gMkQgc3BhY2VcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHhcclxuICogQHBhcmFtIHtudW1iZXJ9IHlcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQb3NpdGlvbih4LCB5KSB7XHJcbiAgICB0aGlzLnggPSAreCB8fCAwO1xyXG4gICAgdGhpcy55ID0gK3kgfHwgMDtcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5Qb3NpdGlvbi5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMueDtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuUG9zaXRpb24ucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hhbmdlcyBwb3NpdGlvbnMgb2YgYW4gb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVhcclxuICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhWVxyXG4gKiBAcmV0dXJuIFBvc2l0aW9uXHJcbiAqL1xyXG5Qb3NpdGlvbi5wcm90b3R5cGUubW92ZSA9IGZ1bmN0aW9uKGRlbHRhWCwgZGVsdGFZKSB7XHJcbiAgICB2YXIgbmV3WFBvcyA9IHRoaXMueCArIGRlbHRhWDtcclxuICAgIHZhciBuZXdZUG9zID0gdGhpcy55ICsgZGVsdGFZO1xyXG5cclxuICAgIHJldHVybiBuZXcgUG9zaXRpb24obmV3WFBvcywgbmV3WVBvcyk7XHJcbn07IiwiLyoqXHJcbiAqIFRoaXMgb2JqZWN0IGlzIG9ubHkgcHVycG9zZWQgZm9yIGxvYWRpbmcgZXh0ZXJuYWwgcmVzb3VyY2VzXHJcbiAqIFRoaXMgaXMgc3VwcG9zZWQgdG8gYmUgYW4gb2JqZWN0IGR1cmluZyB0ZXN0aW5nIHB1cnBvc2VzXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUmVzb3VyY2VMb2FkZXIoKSB7XHJcbiAgICBcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBMb2FkcyBpbWFnZSB0aGVuIGNhbGxzIGEgZnVuY3Rpb24uXHJcbiAqIFRoYXQgc2ltcGxlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxuUmVzb3VyY2VMb2FkZXIucHJvdG90eXBlLmxvYWRJbWFnZSA9IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICBpbWcub25sb2FkID0gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgaW1nLnNyYyA9IHNyYztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2FkcyB0ZXh0IGNvbnRlbnQsIGNhbGxzIGZ1bmN0aW9uXHJcbiAqIFxyXG4gKiBAcGFyYW0gc3JjXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxuUmVzb3VyY2VMb2FkZXIucHJvdG90eXBlLmxvYWRUZXh0ID0gZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcclxuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHJcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIHhoci5vcGVuKCdHRVQnLCBzcmMsIHRydWUpO1xyXG4gICAgeGhyLnNlbmQoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2FkcyBKU09OIGNvbnRlbnQsIGNhbGxzIGNhbGxiYWNrXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcclxuICogQHBhcmFtIGNhbGxiYWNrXHJcbiAqL1xyXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZEpzb25PYmplY3QgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xyXG4gICAgdGhpcy5sb2FkVGV4dChzcmMsIGZ1bmN0aW9uIChsb2FkZWRUZXh0KSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soSlNPTi5wYXJzZShsb2FkZWRUZXh0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufTtcclxuXHJcbiIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1Jlc291cmNlTG9hZGVyfSByZXNvdXJjZUxvYWRlclxyXG4gKiBAcGFyYW0ge1t7a2V5OiBzdHJpbmcsIHNyYzogc3RyaW5nLCB0eXBlOiBzdHJpbmcgfV19IHJlc291cmNlcyAtIHdoYXQgcmVzb3VyY2VzIGFyZSB5b3UgZ29pbmcgdG8gbG9hZFxyXG4gKiBLZXkgaXMgdXNlZCB0byBzYXZlIGxvYWRlZCBjb250ZW50IHRvIFN0b3JhZ2UsXHJcbiAqIFR5cGUgbXVzdCBiZTogJ3RleHQnLCAnaW1hZ2UnIG9yICdqc29uJyxcclxuICogU3JjIGlzIHRoZSBwYXRoIHRvIHRoZSByZXNvdXJjZSBmcm9tIGRvY3VtZW50IHJvb3RcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25Mb2FkIC0gY2FsbGJhY2ssIHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQgb24gbG9hZCBvZiBlYWNoIGVsZW1lbnRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBSZXNvdXJjZVByZXBhcmVyKHJlc291cmNlTG9hZGVyLCByZXNvdXJjZXMsIG9uTG9hZClcclxue1xyXG4gICAgdGhpcy5sb2FkZXIgPSByZXNvdXJjZUxvYWRlcjtcclxuICAgIHRoaXMucmVzb3VyY2VzVG9Mb2FkID0gcmVzb3VyY2VzO1xyXG4gICAgdGhpcy5vbkxvYWQgPSBvbkxvYWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTdGFydHMgbG9hZGluZyBvZiByZXF1ZXN0ZWQgcmVzb3VyY2VzXHJcbiAqL1xyXG5SZXNvdXJjZVByZXBhcmVyLnByb3RvdHlwZS5zdGFydExvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdG90YWxMb2FkZWRDb3VudCA9IDA7XHJcbiAgICB2YXIgc2hvdWxkTG9hZENvdW50ID0gdGhpcy5yZXNvdXJjZXNUb0xvYWQubGVuZ3RoO1xyXG4gICAgdmFyIG9uTG9hZENhbGxiYWNrID0gdGhpcy5vbkxvYWQ7XHJcbiAgICB2YXIgbG9hZGVyID0gdGhpcy5sb2FkZXI7XHJcblxyXG4gICAgLy8gRWFjaCB0aW1lIHdlIGhhdmUgbG9hZGVkIGEgcmVzb3VyY2VcclxuICAgIC8vIHdlIGNoZWNrIGV2ZXJ5dGhpbmcgaXMgbG9hZGVkXHJcbiAgICB2YXIgc2F2ZVJlc291cmNlID0gZnVuY3Rpb24gKGtleSwgb2JqZWN0KSB7XHJcbiAgICAgICAgU3RvcmFnZS5yZW1lbWJlcihrZXksIG9iamVjdCk7XHJcbiAgICAgICAgdG90YWxMb2FkZWRDb3VudCsrO1xyXG4gICAgICAgIGlmICh0b3RhbExvYWRlZENvdW50ID09IHNob3VsZExvYWRDb3VudCkge1xyXG4gICAgICAgICAgICBvbkxvYWRDYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG5cclxuICAgIHZhciByZXF1ZXN0TWV0aG9kcyA9IHtcclxuICAgICAgICBpbWFnZTogZnVuY3Rpb24gKHNyYywga2V5KSB7XHJcbiAgICAgICAgICAgIGxvYWRlci5sb2FkSW1hZ2Uoc3JjLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCB0aGlzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGpzb246IGZ1bmN0aW9uIChzcmMsIGtleSkge1xyXG4gICAgICAgICAgICBsb2FkZXIubG9hZEpzb25PYmplY3Qoc3JjLCBmdW5jdGlvbiAoanNvblJlc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCBqc29uUmVzb3VyY2UpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgdGV4dDogZnVuY3Rpb24gKHNyYywga2V5KSB7XHJcbiAgICAgICAgICAgIGxvYWRlci5sb2FkVGV4dChzcmMsIGZ1bmN0aW9uICh0ZXh0UmVzb3VyY2UpIHtcclxuICAgICAgICAgICAgICAgIHNhdmVSZXNvdXJjZShrZXksIHRleHRSZXNvdXJjZSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLnJlc291cmNlc1RvTG9hZC5mb3JFYWNoKGZ1bmN0aW9uIChyZXNvdXJjZSkge1xyXG4gICAgICAgIHZhciB0eXBlID0gcmVzb3VyY2UudHlwZTtcclxuICAgICAgICB2YXIga2V5ID0gcmVzb3VyY2Uua2V5O1xyXG4gICAgICAgIHZhciBzcmMgPSByZXNvdXJjZS5zcmM7XHJcblxyXG4gICAgICAgIGlmICggISByZXF1ZXN0TWV0aG9kcy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1RyeWluZyB0byBsb2FkIHVua25vd24gcmVzb3VyY2UgdHlwZSEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGNhbGxpbmcgYXBwcm9wcmlhdGUgbG9hZCBtZXRob2RcclxuICAgICAgICByZXF1ZXN0TWV0aG9kc1t0eXBlXShzcmMsIGtleSk7XHJcbiAgICB9KTtcclxufTsiLCIvKipcclxuICogU2l6ZSBvZiB0aGUgcmVjdGFuZ2xlIHN1cnJvdW5kaW5nIHRoZSBvYmplY3RcclxuICpcclxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBTaXplKHdpZHRoLCBoZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggPSArd2lkdGggfHwgU2l6ZS5kZWZhdWx0V2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9ICtoZWlnaHQgfHwgU2l6ZS5kZWZhdWx0SGVpZ2h0O1xyXG59XHJcblxyXG5TaXplLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMud2lkdGg7XHJcbn07XHJcblxyXG5TaXplLnByb3RvdHlwZS5nZXRIZWlnaHQgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmhlaWdodDtcclxufTtcclxuXHJcblxyXG5TaXplLnByb3RvdHlwZS5yZXNpemVCeSA9IGZ1bmN0aW9uIChkZWx0YVdpZHRoLCBkZWx0YUhlaWdodCkge1xyXG4gICAgdGhpcy53aWR0aCArPSBkZWx0YVdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgKz0gZGVsdGFIZWlnaHQ7XHJcblxyXG4gICAgaWYgKHRoaXMud2lkdGggPCBTaXplLm1pbldpZHRoKSB7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IFNpemUubWluV2lkdGg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaGVpZ2h0IDwgU2l6ZS5taW5IZWlnaHQpIHtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IFNpemUubWluSGVpZ2h0O1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluY3JlYXNlcyB0aGUgc2l6ZSBieSBtdWx0aXBsaWVyXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aXBsaWVyXHJcbiAqIEByZXR1cm5zIHtTaXplfVxyXG4gKi9cclxuU2l6ZS5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbihtdWx0aXBsaWVyKSB7XHJcbiAgICByZXR1cm4gbmV3IFNpemUodGhpcy53aWR0aCAqIG11bHRpcGxpZXIsIHRoaXMuaGVpZ2h0ICogbXVsdGlwbGllcik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWluaW1hbCB3aWR0aFxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuU2l6ZS5taW5XaWR0aCA9IDQwO1xyXG5cclxuLyoqXHJcbiAqIE1pbmltYWwgaGVpZ2h0XHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5TaXplLm1pbkhlaWdodCA9IDQwO1xyXG5cclxuLyoqXHJcbiAqIGNvbnN0IGZvciBkZWZhdWx0IHdpZHRoXHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5TaXplLmRlZmF1bHRXaWR0aCA9IDE1MDtcclxuXHJcbi8qKlxyXG4gKiBjb25zdCBmb3IgZGVmYXVsdCBoZWlnaHRcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcblNpemUuZGVmYXVsdEhlaWdodCA9IDcwOyIsIi8qKlxyXG4gKiBJdCBpcyBwdXJwb3NlZCBmb3IgcmVtZW1iZXJpbmcgc29tZSBkYXRhLlxyXG4gKiBGdW5jdGlvbmFsIGRlY2xhcmF0aW9uIGlzIHVzZWQgZm9yIGl0cyB2aXNpYmlsaXR5IG9ubHkuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gU3RvcmFnZSgpIHtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGlzIGlzIG5vdCBmb3IgY3JlYXRpbmcgb2JqZWN0cyFcIik7XHJcbn1cclxuXHJcblN0b3JhZ2UuX2NvbnRlbnQgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBSZW1lbWJlcnMgYW55IHZhbHVlXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICogQHBhcmFtIHsqfSB2YWx1ZVxyXG4gKi9cclxuU3RvcmFnZS5yZW1lbWJlciA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XHJcbiAgICBTdG9yYWdlLl9jb250ZW50W2tleV0gPSB2YWx1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBbGxvd3MgeW91IHRvIGdldCB3aGF0IHlvdSB3YW50IGJ1dCBvbmx5IGlmIHlvdSByZW1lbWJlciB0aGlzIGVhcmxpZXJcclxuICogXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICovXHJcblN0b3JhZ2UuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xyXG4gICAgdmFyIHNvbWV0aGluZ1lvdVdhbnQgPSBTdG9yYWdlLl9jb250ZW50W2tleV07XHJcblxyXG4gICAgaWYgKHR5cGVvZiBzb21ldGhpbmdZb3VXYW50ID09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiV2UgaGF2ZSBub3RoaW5nIHRvIHJldHVybiB1c2luZyBrZXk6IFwiICsga2V5KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc29tZXRoaW5nWW91V2FudDtcclxufTtcclxuIiwiLyoqXHJcbiAqIENvbGxlY3Rpb24gZm9yIFVJIGVsZW1lbnRzLlxyXG4gKlxyXG4gKiBJdCBpcyBwdXJwb3NlZCBmb3Iga2VlcGluZyB1aSBlbGVtZW50cyB3aXRoIGNvcnJlY3Qgb3JkZXJcclxuICogQWxzbyBzdXBwb3J0cyBzZWxlY3Rpb24gcmVtZW1iZXJpbmdcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUNvbGxlY3Rpb24oKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xyXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XHJcblxyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdsZW5ndGgnLCB7XHJcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZWxlbWVudHMubGVuZ3RoXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIFB1c2hlcyBlbGVtZW50IHRvIHRoZSB0b3AgbGF5ZXIgb2YgdGhlIGNvbGxlY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtVSUVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24oZWxlbWVudCkge1xyXG4gICAgaWYgKCAhIChlbGVtZW50IGluc3RhbmNlb2YgVUlFbGVtZW50KSApIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbGVtZW50IGluIFVJQ29sbGVjdGlvbiBtdXN0IGhhdmUgVUlFbGVtZW50IHR5cGUnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhcnJheSB3aXRoIGFsbCBlbGVtZW50cyBpbiBpdFxyXG4gKlxyXG4gKiBAcmV0dXJucyB7QXJyYXl9XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBlbGVtZW50IHdpdGggcGFzc2VkIGluZGV4IGZyb20gdGhlIGNvbGxlY3Rpb24gYW5kIHJldHVybnMgaXRcclxuICpcclxuICogQHJldHVybiB7VUlFbGVtZW50fVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcclxuICAgIH1cclxuICAgIGlmIChpbmRleCA9PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICB0aGlzLmRlc2VsZWN0KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFN3YXBzIHBsYWNlcyBvZiB0d28gZWxlbWVudHMgaW4gdGhlIGNvbGxlY3Rpb25cclxuICpcclxuICogQHBhcmFtIGluZGV4MVxyXG4gKiBAcGFyYW0gaW5kZXgyXHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnN3YXAgPSBmdW5jdGlvbiAoaW5kZXgxLCBpbmRleDIpIHtcclxuICAgIGlmICghdGhpcy5oYXMoaW5kZXgxKSB8fCAhdGhpcy5oYXMoaW5kZXgyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHRlbXAgPSB0aGlzLmVsZW1lbnRzW2luZGV4MV07XHJcbiAgICB0aGlzLmVsZW1lbnRzW2luZGV4MV0gID0gdGhpcy5lbGVtZW50c1tpbmRleDJdO1xyXG4gICAgdGhpcy5lbGVtZW50c1tpbmRleDJdID0gdGVtcDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBpbmRleCBleGlzdHMgaW4gY29sbGVjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXhcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgcmV0dXJuIGluZGV4ID49IDAgfHwgaW5kZXggPCB0aGlzLmxlbmd0aDtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXhcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tpbmRleF07XHJcbn07XHJcblxyXG4vKipcclxuICogRm9yZ2V0cyB3aGljaCBlbGVtZW50IHdhcyBzZWxlY3RlZFxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5kZXNlbGVjdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleFxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlbGVjdHMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgY29sbGVjdGlvblxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3RMYXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5sZW5ndGggPyB0aGlzLmxlbmd0aCAtIDEgOiAtMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHNlbGVjdGVkIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRTZWxlY3RlZEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbdGhpcy5zZWxlY3RlZEluZGV4XVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBpbmRleCBvZiBzZWxlY3RlZCBlbGVtZW50XHJcbiAqIElmIG5vbmUsIHJldHVybnMgLTFcclxuICpcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRJbmRleCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXg7XHJcbn07XHJcblxyXG4vKipcclxuICogRmV0Y2hlcyBlbGVtZW50IGJ5IHBhc3NlZCBvZmZzZXRcclxuICpcclxuICogQHBhcmFtIG9mZnNldFhcclxuICogQHBhcmFtIG9mZnNldFlcclxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5mZXRjaEVsZW1lbnRCeU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXRYLCBvZmZzZXRZKSB7XHJcbiAgICB2YXIgbWF0Y2hlZEVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGlmIChlbC5pc09mZnNldEluKG9mZnNldFgsIG9mZnNldFkpKSB7XHJcbiAgICAgICAgICAgIG1hdGNoZWRFbGVtZW50ID0gZWw7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2hlZEVsZW1lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogUHVzaGVzIGVsZW1lbnQgdG8gdGhlIGVuZCBvZiB0aGUgY29sbGVjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXhcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUudG9FbmQgPSBmdW5jdGlvbihpbmRleClcclxue1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIHdhc1NlbGVjdGVkID0gdGhpcy5zZWxlY3RlZEluZGV4ID09IGluZGV4O1xyXG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnJlbW92ZShpbmRleCk7XHJcbiAgICB0aGlzLmFkZChlbGVtZW50KTtcclxuXHJcbiAgICBpZiAod2FzU2VsZWN0ZWQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmxlbmd0aCAtIDE7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUHVzaGVzIGVsZW1lbnQgdG8gdGhlIGJvdHRvbSBvZiB0aGUgY29sbGVjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXhcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUudG9TdGFydCA9IGZ1bmN0aW9uKGluZGV4KVxyXG57XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcbiAgICB2YXIgd2FzU2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkSW5kZXggPT0gaW5kZXg7XHJcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMucmVtb3ZlKGluZGV4KTtcclxuICAgIHRoaXMuZWxlbWVudHMgPSBbZWxlbWVudF0uY29uY2F0KHRoaXMuZWxlbWVudHMpO1xyXG5cclxuICAgIGlmICh3YXNTZWxlY3RlZCkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEZldGNoZXMgaW5kZXggYnkgcGFzc2VkIG9mZnNldFxyXG4gKlxyXG4gKiBAcGFyYW0gb2Zmc2V0WFxyXG4gKiBAcGFyYW0gb2Zmc2V0WVxyXG4gKiBAcmV0dXJucyB7Kn1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZmV0Y2hJbmRleEJ5T2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldFgsIG9mZnNldFkpIHtcclxuICAgIHZhciBtYXRjaGVkSW5kZXggPSBudWxsO1xyXG4gICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcclxuICAgICAgICBpZiAoZWwuaXNPZmZzZXRJbihvZmZzZXRYLCBvZmZzZXRZKSkge1xyXG4gICAgICAgICAgICBtYXRjaGVkSW5kZXggPSBpbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXRjaGVkSW5kZXg7XHJcbn07IiwiLyoqXHJcbiAqIFNvbWUgZWxlbWVudCBvZiB1c2VyIGludGVyZmFjZVxyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufHVuZGVmaW5lZH0gcG9zaXRpb25cclxuICogQHBhcmFtIHtTaXplfHVuZGVmaW5lZH0gc2l6ZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJRWxlbWVudChwb3NpdGlvbiwgc2l6ZSlcclxue1xyXG4gICAgaWYgKCAhIChwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSApIHtcclxuICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgIGlmICggISAoc2l6ZSBpbnN0YW5jZW9mIFBvc2l0aW9uKSkge1xyXG4gICAgICAgIHNpemUgPSBuZXcgU2l6ZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zaXplID0gc2l6ZTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHZpZXcgb2YgdGhlIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtVSUVsZW1lbnRWaWV3fSB2aWV3XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLnNldFZpZXcgPSBmdW5jdGlvbih2aWV3KSB7XHJcbiAgICBpZiAoICEgKHZpZXcgaW5zdGFuY2VvZiBVSUVsZW1lbnRWaWV3KSApIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWaWV3IG11c3QgaGF2ZSBVSUVsZW1lbnRWaWV3IHR5cGUhJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLnZpZXcgPSB2aWV3O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgY3VycmVudCB2aWV3IG9mIHRoZSBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnRWaWV3fHVuZGVmaW5lZH1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0VmlldyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnZpZXc7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVuZGVycyB0aGUgZWxlbWVudCB1c2luZyBpdHMgdmlld1xyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoIXRoaXMudmlldykge1xyXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVmlldyBpcyBub3Qgc2V0IScpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudmlldy5yZW5kZXIodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtQb3NpdGlvbn0gcG9zaXRpb25cclxuICogQHJldHVybnMge1VJRWxlbWVudH1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcclxuICAgIGlmICghcG9zaXRpb24gaW5zdGFuY2VvZiBQb3NpdGlvbikge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ25ldyBwb3NpdGlvbiBtdXN0IGhhdmUgUG9zaXRpb24gdHlwZSEnKVxyXG4gICAgfVxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBwb3NpdGlvbiBvZiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtQb3NpdGlvbn1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLnBvc2l0aW9uO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuc2V0U2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxyXG4gKlxyXG4gKiBAcmV0dXJucyB7U2l6ZX1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnNpemU7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBwYXNzZWQgb2Zmc2V0IG1hdGNoZXMgZWxlbWVudCBwb3NpdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0gY2xpZW50WFxyXG4gKiBAcGFyYW0gY2xpZW50WVxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUuaXNPZmZzZXRJbiA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKVxyXG57XHJcbiAgICB2YXIgY3VycmVudFBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xyXG4gICAgdmFyIGN1cnJlbnRTaXplID0gdGhpcy5nZXRTaXplKCk7XHJcblxyXG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbi5nZXRYKCkgPiBjbGllbnRYIHx8IGN1cnJlbnRQb3NpdGlvbi5nZXRYKCkgKyBjdXJyZW50U2l6ZS5nZXRXaWR0aCgpIDwgY2xpZW50WCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlmIChjdXJyZW50UG9zaXRpb24uZ2V0WSgpID4gY2xpZW50WSB8fCBjdXJyZW50UG9zaXRpb24uZ2V0WSgpICsgY3VycmVudFNpemUuZ2V0SGVpZ2h0KCkgPCBjbGllbnRZKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgaG93IGZhciBpcyBwYXNzZWQgb2Zmc2V0IGZyb20gcG9pbnQgKDAsIDApXHJcbiAqXHJcbiAqIEBwYXJhbSBjbGllbnRYXHJcbiAqIEBwYXJhbSBjbGllbnRZXHJcbiAqIEByZXR1cm5zIHt7dG9wOiBudW1iZXIsIGxlZnQ6IG51bWJlcn19XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldENsaWNrT2Zmc2V0ID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpIHtcclxuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgdG9wOiBjbGllbnRYIC0gcG9zaXRpb24uZ2V0WCgpLFxyXG4gICAgICAgIGxlZnQ6IGNsaWVudFkgLSBwb3NpdGlvbi5nZXRZKClcclxuICAgIH1cclxufTsiLCIvKipcclxuICogT2JqZWN0LCB3aGljaCBkZWZpbmVzIGhvdyB0byByZW5kZXIgc3BlY2lmaWMgVUlFbGVtZW50XHJcbiAqIFRoaXMgb2JqZWN0IGtub3dzIGV2ZXJ5dGhpbmcgYWJvdXQgYW4gb2JqZWN0IGl0IG5lZWRzIHRvIGRyYXcuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlFbGVtZW50VmlldygpXHJcbntcclxuXHJcbn1cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSBVSUVsZW1lbnRcclxuICovXHJcblVJRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChVSUVsZW1lbnQpIHtcclxuICAgIHRocm93IFR5cGVFcnJvcignWW91IHNob3VsZCBub3QgYmUgdXNpbmcgYW4gYWJzdHJhY3Qgb2JqZWN0IGZvciByZW5kZXJpbmchJyk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufG51bGx9IHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7U2l6ZXxudWxsfSBzaXplXHJcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlJbWFnZUVsZW1lbnQocG9zaXRpb24sIHNpemUsIGltYWdlKVxyXG57XHJcbiAgICBVSUVsZW1lbnQuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc2l6ZSk7XHJcblxyXG4gICAgaWYgKCAhIChpbWFnZSBpbnN0YW5jZW9mIEltYWdlKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbWFnZSBtdXN0IGhhdmUgSW1hZ2UgdHlwZSFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xyXG59XHJcblxyXG5VSUltYWdlRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtJbWFnZX1cclxuICovXHJcblVJSW1hZ2VFbGVtZW50LnByb3RvdHlwZS5nZXRJbWFnZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmltYWdlO1xyXG59OyIsIi8qKlxyXG4gKiBDbGFzcyBmb3IgY3JlYXRpbmdcclxuICpcclxuICogQHBhcmFtIHtQb3NpdGlvbnxudWxsfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge1NpemV8bnVsbH0gc2l6ZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKiBAcGFyYW0geyp9IHN0eWxlXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlMYWJlbEVsZW1lbnQocG9zaXRpb24sIHNpemUsIHRleHQsIHN0eWxlKSB7XHJcbiAgICBVSUVsZW1lbnQuYXBwbHkodGhpcywgW3Bvc2l0aW9uLCBzaXplXSk7XHJcblxyXG4gICAgaWYgKCF0ZXh0KSB7XHJcbiAgICAgICAgdGV4dCA9IFVJTGFiZWxFbGVtZW50LmRlZmF1bHRUZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcblxyXG4gICAgaWYgKCEgKHN0eWxlIGluc3RhbmNlb2YgT2JqZWN0KSkge1xyXG4gICAgICAgIHN0eWxlID0ge307XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5mb250ID0gc3R5bGUuZm9udCB8fCBVSUxhYmVsRWxlbWVudC5kZWZhdWx0U3R5bGUuZm9udDtcclxuICAgIHRoaXMuY29sb3IgPSBzdHlsZS5jb2xvciB8fCBVSUxhYmVsRWxlbWVudC5kZWZhdWx0U3R5bGUuY29sb3I7XHJcbn1cclxuXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50LnByb3RvdHlwZSk7XHJcblxyXG4vKipcclxuICogR2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge3N0cmluZ31cclxuICovXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5nZXRUZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMudGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIGEgdGV4dCBvZiB0aGUgY3VycmVudCBVSUxhYmVsRWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxyXG4gKi9cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLnNldFRleHQgPSBmdW5jdGlvbiAodGV4dCkge1xyXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfHN0cmluZ3wqfVxyXG4gKi9cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLmdldEZvbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5mb250O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGZvbnQgb2YgdGhlIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGZvbnRcclxuICovXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRGb250ID0gZnVuY3Rpb24gKGZvbnQpIHtcclxuICAgIHRoaXMuZm9udCA9IGZvbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgY29sb3Igb2YgdGhlIHRleHRcclxuICpcclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKi9cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLmdldENvbG9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29sb3I7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyB0aGUgY29sb3Igb2YgdGhlIHRleHRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXHJcbiAqL1xyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuc2V0Q29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcclxufTtcclxuXHJcblVJTGFiZWxFbGVtZW50LmRlZmF1bHRUZXh0ID0gXCLQktCy0LXQtNC40YLQtSDRgtC10LrRgdGCLi4uXCI7XHJcblxyXG5VSUxhYmVsRWxlbWVudC5kZWZhdWx0U3R5bGUgPSB7XHJcbiAgICBmb250OiAnQXJpYWwnLFxyXG4gICAgY29sb3I6ICcjMDAwMDAwJ1xyXG59OyIsIi8qKlxyXG4gKiBDYW1lcmFcclxuICogTWFuYWdlcyB2aWV3IGNoYW5naW5nXHJcbiAqIFVzZXMgc3BoZXJpY2FsIGNvb3JkaW5hdGVzIHRvIGNoYW5nZSB0aGUgdmlldyBhcm91bmQgdGhlIG9iamVjdFxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbWVyYSgpXHJcbntcclxuICAgIC8vIEluaXRpYWwgYW5nbGUgYW5kIGRpc3RhbmNlXHJcbiAgICB0aGlzLmFuZ2xlVGhldGEgPSAzMDtcclxuICAgIHRoaXMuYW5nbGVGaSA9IDA7XHJcbiAgICB0aGlzLmRpc3RhbmNlID0gMjA7XHJcblxyXG4gICAgdGhpcy5taW5BbmdsZVRoZXRhID0gMTA7XHJcbiAgICB0aGlzLm1heEFuZ2xlVGhldGEgPSAxNzA7XHJcblxyXG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0TmV3UG9zaXRpb24oKTtcclxuXHJcbiAgICAvLyBXaGVyZSB0byBsb29rXHJcbiAgICB0aGlzLmxvb2tBdCA9IFswLCAwLCAxLjNdO1xyXG4gICAgdGhpcy51cCA9IFswLCAwLCAxXTtcclxuXHJcbiAgICB0aGlzLm1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xyXG4gICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgbmV3IHBvc2l0aW9ucyBvZiBhIHZpZXdlclxyXG4gKlxyXG4gKiBAcmV0dXJucyB7KltdfVxyXG4gKi9cclxuQ2FtZXJhLnByb3RvdHlwZS5nZXROZXdQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgICAgTWF0aC5jb3ModGhpcy5hbmdsZUZpICogQ2FtZXJhLlRvUmFkaWFucykgKiBNYXRoLnNpbih0aGlzLmFuZ2xlVGhldGEgKiBDYW1lcmEuVG9SYWRpYW5zKSAqIHRoaXMuZGlzdGFuY2UsXHJcbiAgICAgICAgTWF0aC5zaW4odGhpcy5hbmdsZVRoZXRhICogQ2FtZXJhLlRvUmFkaWFucykgKiBNYXRoLnNpbih0aGlzLmFuZ2xlRmkgKiBDYW1lcmEuVG9SYWRpYW5zKSAqIHRoaXMuZGlzdGFuY2UsXHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZSAqIE1hdGguY29zKHRoaXMuYW5nbGVUaGV0YSAqIENhbWVyYS5Ub1JhZGlhbnMpXHJcbiAgICBdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vdmVzIGNhbWVyYSBhcm91bmQgdGhlIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0gYW5nbGVGaVxyXG4gKiBAcGFyYW0gYW5nbGVUaGV0YVxyXG4gKi9cclxuQ2FtZXJhLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24gKGFuZ2xlRmksIGFuZ2xlVGhldGEpIHtcclxuXHJcbiAgICB0aGlzLmFuZ2xlRmkgKz0gYW5nbGVGaTtcclxuXHJcbiAgICB2YXIgY2hhbmdlZEFuZ2xlVGhldGEgPSB0aGlzLmFuZ2xlVGhldGEgKyBhbmdsZVRoZXRhO1xyXG5cclxuICAgIGlmIChjaGFuZ2VkQW5nbGVUaGV0YSA8IHRoaXMubWF4QW5nbGVUaGV0YSAmJiBjaGFuZ2VkQW5nbGVUaGV0YSA+IHRoaXMubWluQW5nbGVUaGV0YSkge1xyXG4gICAgICAgIHRoaXMuYW5nbGVUaGV0YSA9IGNoYW5nZWRBbmdsZVRoZXRhO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldE5ld1Bvc2l0aW9uKCk7XHJcbiAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vdmUgY2FtZXJhIGZvcndhcmRcclxuICovXHJcbkNhbWVyYS5wcm90b3R5cGUuem9vbUluID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuZGlzdGFuY2UgPiA0KSB7XHJcbiAgICAgICAgdGhpcy5kaXN0YW5jZS0tO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldE5ld1Bvc2l0aW9uKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBNb3ZlIGNhbWVyYSBiYWNrd2FyZFxyXG4gKi9cclxuQ2FtZXJhLnByb3RvdHlwZS56b29tT3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuZGlzdGFuY2UgPCAyMCkge1xyXG4gICAgICAgIHRoaXMuZGlzdGFuY2UrKztcclxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5nZXROZXdQb3NpdGlvbigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBjYW1lcmEgYW5nbGVcclxuICpcclxuICogQHBhcmFtIGFuZ2xlRmlcclxuICogQHBhcmFtIGFuZ2xlVGhldGFcclxuICovXHJcbkNhbWVyYS5wcm90b3R5cGUuc2V0QW5nbGUgPSBmdW5jdGlvbiAoYW5nbGVGaSwgYW5nbGVUaGV0YSkge1xyXG4gICAgdGhpcy5hbmdsZUZpID0gYW5nbGVGaTtcclxuICAgIHRoaXMuYW5nbGVUaGV0YSA9IGFuZ2xlVGhldGE7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBkYXRlcyB2aWV3IG1hdHJpeFxyXG4gKi9cclxuQ2FtZXJhLnByb3RvdHlwZS51cGRhdGVNYXRyaXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBtYXQ0Lmxvb2tBdCh0aGlzLm1hdHJpeCwgdGhpcy5wb3NpdGlvbiwgdGhpcy5sb29rQXQsIHRoaXMudXApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENvbnN0IGZvciB0cmFuc2xhdGluZyBkZWdyZWVzIHRvIHJhZGlhbnNcclxuICpcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcbkNhbWVyYS5Ub1JhZGlhbnMgPSBNYXRoLlBJIC8gMTgwOyIsIi8qKlxyXG4gKiBPYmplY3QgZm9yIGNyZWF0aW5nIFZCTyBhbmQgc3RvcmluZyBpdFxyXG4gKiB0byBoYXZlIGNhcGFiaWxpdHkgdG8gZHluYW1pY2FsbHkgY2hhbmdlIGN1cnJlbnQgbW9kZWxcclxuICpcclxuICogQHBhcmFtIGdsXHJcbiAqIEBwYXJhbSBqc29uTW9kZWxcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNb2RlbChnbCwganNvbk1vZGVsKSB7XHJcbiAgICB0aGlzLmJ1aWxkQnVmZmVycyhnbCwganNvbk1vZGVsKVxyXG59XHJcblxyXG4vKipcclxuICogQmluZHMgYWxsIGJ1ZmZlcnNcclxuICpcclxuICogQHBhcmFtIGdsXHJcbiAqIEBwYXJhbSBqc29uTW9kZWxcclxuICovXHJcbk1vZGVsLnByb3RvdHlwZS5idWlsZEJ1ZmZlcnMgPSBmdW5jdGlvbiAoZ2wsIGpzb25Nb2RlbClcclxue1xyXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LHRg9GE0LXRgNGLXHJcbiAgICB0aGlzLm1vZGVsVmVydGV4ZXMgPSBqc29uTW9kZWwubWVzaGVzWzBdLnZlcnRpY2VzO1xyXG4gICAgdGhpcy5tb2RlbEluZGV4ZXMgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBqc29uTW9kZWwubWVzaGVzWzBdLmZhY2VzKTtcclxuICAgIHRoaXMubW9kZWxUZXhDb29yZHMgPSBqc29uTW9kZWwubWVzaGVzWzBdLnRleHR1cmVjb29yZHNbMF07XHJcbiAgICB0aGlzLm1vZGVsTm9ybWFscyA9IGpzb25Nb2RlbC5tZXNoZXNbMF0ubm9ybWFscztcclxuXHJcbiAgICAvLyDQodC+0LfQtNCw0LXQvCDQsdGD0YTQtdGAIC0g0YfQtdGA0LXQtyDQvdC10LPQviDQv9C10YDQtdC00LDQtdGC0YHRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQsiBHUFVcclxuICAgIHRoaXMubW9kZWxWZXJ0ZXhCdWZmZXJPYmplY3QgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIC8vINCd0LDQt9C90LDRh9Cw0LXQvCDQtdCz0L4g0LDQutGC0LjQstC90YvQvFxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxWZXJ0ZXhCdWZmZXJPYmplY3QpO1xyXG4gICAgLy8gU1RBVElDX0RSQVcgLSDQutC+0L/QuNGA0YPQtdC8INC10LTQuNC90L7QttC00Ysg0LjQtyBDUFUg0LIgR1BVXHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0aGlzLm1vZGVsVmVydGV4ZXMpLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgLy8g0J7RgtC00LXQu9GM0L3Ri9C5INCx0YPRhNC10YAg0LTQu9GPINGC0LXQutGB0YLRg9GA0L3Ri9GFINC60L7QvtGA0LTQuNC90LDRglxyXG4gICAgdGhpcy5tb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QpO1xyXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5tb2RlbFRleENvb3JkcyksIGdsLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICAvLyDQodC+0LfQtNCw0LXQvCDQuNC90LTQtdC60YHQvdGL0Lkg0LHRg9GE0LXRgCDQtNC70Y8g0YPQutCw0LfQsNC90LjRjyDQv9C+0YDRj9C00LrQsCDQstC10YDRiNC40L1cclxuICAgIHRoaXMubW9kZWxJbmRleEJ1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgLy8g0J3QsNC30L3QsNGH0LDQtdC8INC10LPQviDQsNC60YLQuNCy0L3Ri9C8XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsSW5kZXhCdWZmZXJPYmplY3QpO1xyXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KHRoaXMubW9kZWxJbmRleGVzKSwgZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgIC8vINCR0YPRhNC10YAg0YEg0L3QvtGA0LzQsNC70Y/QvNC4XHJcbiAgICB0aGlzLm1vZGVsTm9ybWFsQnVmZmVyT2JqZWN0ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbE5vcm1hbEJ1ZmZlck9iamVjdCk7XHJcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0aGlzLm1vZGVsTm9ybWFscyksIGdsLlNUQVRJQ19EUkFXKTtcclxufTtcclxuXHJcbk1vZGVsLnByb3RvdHlwZS5iaW5kQnVmZmVycyA9IGZ1bmN0aW9uIChnbCkge1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxWZXJ0ZXhCdWZmZXJPYmplY3QpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbEluZGV4QnVmZmVyT2JqZWN0KTtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsTm9ybWFsQnVmZmVyT2JqZWN0KTtcclxufTsiLCIvKipcclxuICogQHBhcmFtIGNhbnZhc1xyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gZ2xDb250ZXh0XHJcbiAqIEBwYXJhbSB7SW1hZ2V9IGluaXRpYWxUZXh0dXJlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2ZXJ0ZXhTaGFkZXJcclxuICogQHBhcmFtIHtzdHJpbmd9IGZyYWdtZW50U2hhZGVyXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTW9kZWxWaWV3KGNhbnZhcywgZ2xDb250ZXh0LCBpbml0aWFsVGV4dHVyZSwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcikge1xyXG5cclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xyXG4gICAgdGhpcy5nbCA9IGdsQ29udGV4dDtcclxuXHJcbiAgICB0aGlzLnRleHR1cmUgPSBpbml0aWFsVGV4dHVyZTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZSh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcclxuXHJcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEoKTtcclxuXHJcbiAgICB0aGlzLnNldFRleHR1cmUoaW5pdGlhbFRleHR1cmUpO1xyXG59XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHZlcnRleFNoYWRlciAtIHZlcnRleCBzaGFkZXIgc291cmNlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudFNoYWRlciAtIGZyYWdtZW50IHNoYWRlciBzb3VyY2VcclxuICovXHJcbk1vZGVsVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKVxyXG57XHJcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xyXG5cclxuICAgIC8vINCS0LrQu9GO0YfQsNC10Lwg0L/RgNC+0LLQtdGA0LrRgyDQs9C70YPQsdC40L3Ri1xyXG4gICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xyXG5cclxuICAgIC8vINCX0LDQtNCw0LXQvCDRhtCy0LXRgiDQvtGH0LjRgdGC0LrQuFxyXG4gICAgZ2wuY2xlYXJDb2xvcigwLjgsIDAuOSwgMC45ICwgMC4wKTtcclxuICAgIC8vINCe0YfQuNGB0YLQutCwIC0g0YfRgtC+INC+0YfQuNGJ0LDQtdC8IC0g0LHRg9GE0LXRgCDRhtCy0LXRgtCwLCDQuNC70Lgg0LbQtSDQsdGD0YTQtdGAINCz0LvRg9Cx0LjQvdGLXHJcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XHJcblxyXG4gICAgdmFyIHNoYWRlckNvbXBpbGVyID0gbmV3IFNoYWRlckNvbXBpbGVyKGdsKTtcclxuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHNoYWRlckNvbXBpbGVyLm1ha2VQcm9ncmFtKHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgYSBuZXcgdGV4dHVyZSBhcyBhY3RpdmUgdGV4dHVyZVxyXG4gKiBcclxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcclxuICovXHJcbk1vZGVsVmlldy5wcm90b3R5cGUuc2V0VGV4dHVyZSA9IGZ1bmN0aW9uIChpbWFnZSkge1xyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IGltYWdlO1xyXG4gICAgdmFyIGdsID0gdGhpcy5nbDtcclxuXHJcbiAgICAvLyBDcmVhdGluZyB0ZXh0dXJlXHJcbiAgICB0aGlzLm1vZGVsVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcclxuICAgIC8vIEJpbmRpbmcgaXRcclxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMubW9kZWxUZXh0dXJlKTtcclxuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xyXG4gICAgLy8gaSBmb3IgaW50ZWdlciAsIHMsIHQgLSB1LCB2XHJcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgLy8gRmlsdGVyc1xyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUik7XHJcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcclxuICAgIC8vINCh0LDQvNCwINGC0LXQutGB0YLRg9GA0LBcclxuICAgIGdsLnRleEltYWdlMkQoXHJcbiAgICAgICAgZ2wuVEVYVFVSRV8yRCwgLy8gVGV4dHVyZSB0eXBlXHJcbiAgICAgICAgMCwgLy8gRGV0YWlsIGxldmVsXHJcbiAgICAgICAgZ2wuUkdCQSwgLy8gV2hhdCBmb3JtYXQgZG8gd2UgdXNlXHJcbiAgICAgICAgZ2wuUkdCQSxcclxuICAgICAgICBnbC5VTlNJR05FRF9CWVRFLCAvLyBEYXRhIHR5cGVcclxuICAgICAgICB0aGlzLnRleHR1cmUgLy8gVGV4dHVyZSBpdHNlbGZcclxuICAgICk7XHJcbiAgICAvLyBVbmJpbmQgZm9yIG5vd1xyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhY3RpdmUgbW9kZWwgYW5kIGJpbmRzIGFsbCBvZiB0aGUgYnVmZmVyc1xyXG4gKlxyXG4gKiBAcGFyYW0ge01vZGVsfSBtb2RlbFxyXG4gKi9cclxuTW9kZWxWaWV3LnByb3RvdHlwZS5zZXRNb2RlbCA9IGZ1bmN0aW9uIChtb2RlbCkge1xyXG5cclxuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcclxuICAgIHZhciBwcm9ncmFtID0gdGhpcy5zaGFkZXJQcm9ncmFtO1xyXG4gICAgdmFyIGdsID0gdGhpcy5nbDtcclxuXHJcbiAgICBtb2RlbC5iaW5kQnVmZmVycyhnbCk7XHJcblxyXG4gICAgLy8g0KPQstC10LTQvtC80LvRj9C10Lwg0YjQtdC50LTQtdGAINC+INGC0L7QvCwg0LrQsNC6INCx0YDQsNGC0Ywg0LTQsNC90L3Ri9C1INC40Lcg0LHRg9GE0LXRgNCwINCyINC60LDRh9C10YHRgtCy0LUg0LLRhdC+0LTQvdGL0YUg0L/QsNGA0LDQvNC10YLRgNC+0LJcclxuICAgIHZhciBwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnRQb3NpdGlvbicpO1xyXG5cclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBtb2RlbC5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCk7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxyXG4gICAgICAgIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIC8vINC90LDRiCDQsNGC0YDQuNCx0YPRglxyXG4gICAgICAgIDMsIC8vINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINCw0YLRgNC40LHRg9GCXHJcbiAgICAgICAgZ2wuRkxPQVQsIC8vINCi0LjQvyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCx0YPRhNC10YDQsFxyXG4gICAgICAgIGdsLkZBTFNFLCAvLyDQndC+0YDQvNCw0LvQuNC30L7QstCw0L3QvdGL0Lkg0LLQuNC0P1xyXG4gICAgICAgIDMgKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIC8vINCg0LDQt9C80LXRgCDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdGLICjQsdCw0LnRgilcclxuICAgICAgICAwIC8vINCe0YLRgdGC0YPQvyAo0LIg0LHQsNC50YLQsNGFKSDQvtGCINC90LDRh9Cw0LvQsCDQtNCw0L3QvdGL0YUsINC/0YDQuNC90LDQtNC70LXQttCw0YnQuNGFINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90LVcclxuICAgICk7XHJcbiAgICAvLyDQktC60LvRjtGH0LDQtdC8INCw0YLRgNC40LHRg9GCXHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShwb3NpdGlvbkF0dHJpYnV0ZUxvY2F0aW9uKTtcclxuXHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbW9kZWwubW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QpO1xyXG4gICAgdmFyIHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydFRleENvb3JkJyk7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxyXG4gICAgICAgIHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24sIC8vINC90LDRiCDQsNGC0YDQuNCx0YPRglxyXG4gICAgICAgIDIsIC8vINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINCw0YLRgNC40LHRg9GCXHJcbiAgICAgICAgZ2wuRkxPQVQsIC8vINCi0LjQvyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCx0YPRhNC10YDQsFxyXG4gICAgICAgIGdsLkZBTFNFLCAvLyDQndC+0YDQvNCw0LvQuNC30L7QstCw0L3QvdGL0Lkg0LLQuNC0P1xyXG4gICAgICAgIDIgKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIC8vINCg0LDQt9C80LXRgCDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdGLICjQsdCw0LnRgilcclxuICAgICAgICAwIC8vINCe0YLRgdGC0YPQvyAo0LIg0LHQsNC50YLQsNGFKSDQvtGCINC90LDRh9Cw0LvQsCDQtNCw0L3QvdGL0YUsINC/0YDQuNC90LDQtNC70LXQttCw0YnQuNGFINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90LVcclxuICAgICk7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXhDb29yZEF0dHJpYnV0ZUxvY2F0aW9uKTtcclxuXHJcbiAgICAvLyDQndC+0YDQvNCw0LvQuCDQsiDRiNC10LnQtNC10YDQtVxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG1vZGVsLm1vZGVsTm9ybWFsQnVmZmVyT2JqZWN0KTtcclxuICAgIHZhciBub3JtYWxBdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0Tm9ybWFsJyk7XHJcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxyXG4gICAgICAgIG5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uLCAvLyDQvdCw0Ygg0LDRgtGA0LjQsdGD0YJcclxuICAgICAgICAzLCAvLyDQmtC+0LvQuNGH0LXRgdGC0LLQviDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDQsNGC0YDQuNCx0YPRglxyXG4gICAgICAgIGdsLkZMT0FULCAvLyDQotC40L8g0LrQsNC20LTQvtCz0L4g0Y3Qu9C10LzQtdC90YLQsCDQsdGD0YTQtdGA0LBcclxuICAgICAgICBnbC5UUlVFLCAvLyDQndC+0YDQvNCw0LvQuNC30L7QstCw0L3QvdGL0Lkg0LLQuNC0P1xyXG4gICAgICAgIDMgKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIC8vINCg0LDQt9C80LXRgCDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdGLICjQsdCw0LnRgilcclxuICAgICAgICAwIC8vINCe0YLRgdGC0YPQvyAo0LIg0LHQsNC50YLQsNGFKSDQvtGCINC90LDRh9Cw0LvQsCDQtNCw0L3QvdGL0YUsINC/0YDQuNC90LDQtNC70LXQttCw0YnQuNGFINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90LVcclxuICAgICk7XHJcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShub3JtYWxBdHRyaWJ1dGVMb2NhdGlvbik7XHJcblxyXG59O1xyXG5cclxuTW9kZWxWaWV3LnByb3RvdHlwZS5zdGFydFJlbmRlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBnbCA9IHRoaXMuZ2w7XHJcblxyXG4gICAgLy8g0JzQsNGC0YDQuNGG0YsgLSDQvNC10YHRgtC+0L/QvtC70L7QttC10L3QuNC1INCyINGI0LXQudC00LXRgNCw0YVcclxuICAgIHRoaXMubWF0V29ybGRVbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXJQcm9ncmFtLCAnbVdvcmxkJyk7XHJcbiAgICB0aGlzLm1hdFZpZXdVbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXJQcm9ncmFtLCAnbVZpZXcnKTtcclxuICAgIHRoaXMubWF0UHJvamVjdGlvblVuaWZvcm1Mb2NhdGlvbiA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbih0aGlzLnNoYWRlclByb2dyYW0sICdtUHJvamVjdGlvbicpO1xyXG5cclxuICAgIC8vINCh0LDQvNC4INC80LDRgtGA0LjRhtGLXHJcbiAgICB2YXIgd29ybGRNYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcclxuICAgIHZhciBwcm9qZWN0aW9uTWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XHJcbiAgICBtYXQ0LmlkZW50aXR5KHdvcmxkTWF0cml4KTtcclxuXHJcbiAgICAvLyDQn9C+0LvQtSDQvtCx0LfQvtGA0LAgKNCyINGA0LDQtNC40LDQvdCw0YUpLCB2aWV3cG9ydCwgY2xvc2VzdCBwbGFuZSwgZmFyIHBsYW5lXHJcbiAgICBtYXQ0LnBlcnNwZWN0aXZlKHByb2plY3Rpb25NYXRyaXgsIGdsTWF0cml4LnRvUmFkaWFuKDMwKSwgdGhpcy5jYW52YXMud2lkdGggLyB0aGlzLmNhbnZhcy5oZWlnaHQsIDAuMSwgMTAwMC4wKTtcclxuXHJcbiAgICAvLyDQmtCw0LrRg9GOINGI0LXQudC00LXRgNC90YPRjiDQv9GA0L7Qs9GA0LDQvNC80YMg0LjRgdC/0L7Qu9GM0LfRg9C10LxcclxuICAgIGdsLnVzZVByb2dyYW0odGhpcy5zaGFkZXJQcm9ncmFtKTtcclxuXHJcbiAgICAvLyDQn9C10YDQtdC00LDQtdC8INCyINGI0LXQudC00LXRgC4gVFJVRSAtINGH0YLQvtCx0Ysg0YLRgNCw0L3RgdC/0L7QvdC40YDQvtCy0LDRgtGMXHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubWF0V29ybGRVbmlmb3JtTG9jYXRpb24sIGdsLkZBTFNFLCB3b3JsZE1hdHJpeCk7XHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubWF0Vmlld1VuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHRoaXMuY2FtZXJhLm1hdHJpeCk7XHJcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubWF0UHJvamVjdGlvblVuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHByb2plY3Rpb25NYXRyaXgpO1xyXG5cclxuICAgIHRoaXMuYmluZENhbnZhc0hhbmRsZXJzKCk7XHJcblxyXG4gICAgLy8g0KHQsdC10YDQtdCz0LDQtdC8INCy0YvRh9C40YHQu9C40YLQtdC70YzQvdGL0LUg0LzQvtGJ0L3QvtGB0YLQuFxyXG4gICAgLy8g0JPQu9Cw0LLQvdGL0Lkg0YbQuNC60YAg0YDQtdC90LTQtdGA0LBcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVuZGVyIGxvb3BcclxuICovXHJcbk1vZGVsVmlldy5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uICgpXHJcbntcclxuICAgIHZhciBnbCA9IHRoaXMuZ2w7XHJcbiAgICAvLyDQntCx0L3QvtCy0LvRj9C10Lwg0L/QtdGA0LXQvNC10L3QvdGD0Y4g0LIg0YjQtdC50LTQtdGA0LVcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5tYXRWaWV3VW5pZm9ybUxvY2F0aW9uLCBnbC5GQUxTRSwgdGhpcy5jYW1lcmEubWF0cml4KTtcclxuXHJcbiAgICAvLyDQndCw0LfQvdCw0YfQtdC90LjQtSDRgtC10LrRgdGC0YPRgNGLXHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLm1vZGVsVGV4dHVyZSk7XHJcblxyXG4gICAgLy8g0JDQutGC0LjQstC90YvQuSDRgdC70L7RgiDRgtC10LrRgdGC0YPRgNGLXHJcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcclxuXHJcbiAgICAvLyDQptCy0LXRgiDQvtGH0LjRgdGC0LrQuFxyXG4gICAgZ2wuY2xlYXJDb2xvcigwLjgsIDAuOSwgMC45ICwxLjApO1xyXG4gICAgZ2wuY2xlYXIoZ2wuREVQVEhfQlVGRkVSX0JJVCB8IGdsLkNPTE9SX0JVRkZFUl9CSVQgKTtcclxuXHJcbiAgICBnbC5kcmF3RWxlbWVudHMoXHJcbiAgICAgICAgZ2wuVFJJQU5HTEVTLCAvLyDQmtCw0Log0YDQuNGB0YPQtdC8LFxyXG4gICAgICAgIHRoaXMubW9kZWwubW9kZWxJbmRleGVzLmxlbmd0aCxcclxuICAgICAgICBnbC5VTlNJR05FRF9TSE9SVCwgLy8g0KLQuNC/XHJcbiAgICAgICAgMCAvLyDQodC60L7Qu9GM0LrQviDQv9GA0L7Qv9GD0YHQutCw0Lwg0LLQtdGA0YjQuNC9XHJcbiAgICApO1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxufTtcclxuXHJcblxyXG5Nb2RlbFZpZXcucHJvdG90eXBlLmJpbmRDYW52YXNIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZW5zaXRpdml0eSA9IDE1O1xyXG5cclxuICAgIHZhciBpc01vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgdmFyIGluaXRpYWxFdmVudCA9IG51bGw7XHJcblxyXG4gICAgdmFyIGNhbWVyYSA9IHRoaXMuY2FtZXJhO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpc01vdXNlUHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgaW5pdGlhbEV2ZW50ID0gZTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlzTW91c2VQcmVzc2VkID0gZmFsc2U7XHJcbiAgICAgICAgaW5pdGlhbEV2ZW50ID0gbnVsbDtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGlzTW91c2VQcmVzc2VkKSB7XHJcbiAgICAgICAgICAgIHZhciBkaWZmWCA9IGluaXRpYWxFdmVudC5jbGllbnRYIC0gZS5jbGllbnRYO1xyXG4gICAgICAgICAgICB2YXIgZGlmZlkgPSBpbml0aWFsRXZlbnQuY2xpZW50WSAtIGUuY2xpZW50WTtcclxuICAgICAgICAgICAgaW5pdGlhbEV2ZW50ID0gZTtcclxuXHJcbiAgICAgICAgICAgIGNhbWVyYS5tb3ZlKGRpZmZYLCBkaWZmWSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07IiwiLyoqXHJcbiAqIFNoYWRlciBjb21waWxlclxyXG4gKiBTaW1wbHkgbWFrZXMgV2ViR0xQcm9ncmFtIGZyb20gc2hhZGVyIHNvdXJjZXNcclxuICpcclxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IHdlYkdMUmVuZGVyaW5nQ29udGVudFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFNoYWRlckNvbXBpbGVyKHdlYkdMUmVuZGVyaW5nQ29udGVudCkge1xyXG4gICAgdGhpcy53ZWJHTENvbnRleHQgPSB3ZWJHTFJlbmRlcmluZ0NvbnRlbnQ7ICAgICBcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSB2ZXJ0ZXhTaGFkZXJTb3VyY2VcclxuICogQHBhcmFtIHtzdHJpbmd9IGZyYWdtZW50U2hhZGVyU291cmNlXHJcbiAqIEByZXR1cm4ge1dlYkdMUHJvZ3JhbX1cclxuICovXHJcblNoYWRlckNvbXBpbGVyLnByb3RvdHlwZS5tYWtlUHJvZ3JhbSA9IGZ1bmN0aW9uICh2ZXJ0ZXhTaGFkZXJTb3VyY2UsIGZyYWdtZW50U2hhZGVyU291cmNlKSB7XHJcbiAgICB2YXIgZ2wgPSB0aGlzLndlYkdMQ29udGV4dDtcclxuXHJcbiAgICAvLyBDcmVhdGluZyBzaGFkZXJcclxuICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XHJcbiAgICB2YXIgZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcclxuXHJcbiAgICAvLyBTZXR0aW5nIHNoYWRlciBzb3VyY2VzXHJcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVyLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpO1xyXG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdtZW50U2hhZGVyLCBmcmFnbWVudFNoYWRlclNvdXJjZSk7XHJcblxyXG4gICAgLy8gQ29tcGlsaW5nIHNoYWRlclxyXG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0ZXhTaGFkZXIpO1xyXG5cclxuICAgIC8vIENoZWNraW5nIGNvbXBpbGF0aW9uIHN0YXR1c1xyXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIodmVydGV4U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGNvbXBpbGluZyB2ZXJ0ZXggc2hhZGVyIScsIGdsLmdldFNoYWRlckluZm9Mb2codmVydGV4U2hhZGVyKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xyXG4gICAgaWYgKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoZnJhZ21lbnRTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgY29tcGlsaW5nIGZyYWdtZW50IHNoYWRlciEnLCBnbC5nZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50U2hhZGVyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gV2Ugd2FudCB0byBtYWtlIGEgcHJvZ3JhbSBzaGFkZXIgc291cmNlc1xyXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XHJcblxyXG4gICAgLy8gV2ViR0wga25vd3MgdHlwZSBvZiBlYWNoIHNoYWRlclxyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XHJcbiAgICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnJhZ21lbnRTaGFkZXIpO1xyXG5cclxuICAgIC8vIExpbmtpbmdcclxuICAgIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pO1xyXG5cclxuICAgIC8vIERvIHdlIGhhdmUgbGlua2luZyBlcnJvcnM/XHJcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5raW5nIGVycm9yIScsIGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBPbmx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzXHJcbiAgICBnbC52YWxpZGF0ZVByb2dyYW0ocHJvZ3JhbSk7XHJcbiAgICBpZiAoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuVkFMSURBVEVfU1RBVFVTKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsaWRhdGluZyBlcnJvciEnLCBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHByb2dyYW07XHJcbn07XHJcblxyXG4iLCIvKipcclxuICogVGhpcyBpcyB0aGUgcGxhY2Ugd2hlcmUgbWFnaWMgaGFwcGVucy5cclxuICogSGFuZGxpbmcgZXZlbnRzXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzU3VyZmFjZX0gc3VyZmFjZVxyXG4gKiBAcGFyYW0ge01vZGVsVmlld30gbW9kZWxWaWV3XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ29tcG9uZW50c1BhbmVsKHN1cmZhY2UsIG1vZGVsVmlldylcclxue1xyXG4gICAgdGhpcy5fc3VyZmFjZSA9IHN1cmZhY2U7XHJcbiAgICBcclxuICAgIHRoaXMuX2ZpbGVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlVXBsb2FkZXInKTtcclxuICAgIHRoaXMuX2J0blVwZGF0ZVRleHR1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlVGV4dHVyZScpO1xyXG4gICAgdGhpcy5fYnRuQWRkVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5BZGRUZXh0Jyk7XHJcbiAgICB0aGlzLl9zZWxlY3RCYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdEJhY2tncm91bmQnKTtcclxuICAgIHRoaXMuX21vZGVsVmlldyA9IG1vZGVsVmlldztcclxufVxyXG5cclxuQ29tcG9uZW50c1BhbmVsLnByb3RvdHlwZS5iaW5kSGFuZGxlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICBcclxuICAgIC8vIEFkZCBsaXN0ZW5lciBmb3IgYSBjbGljayBldmVudCBvbiB0ZXh0IGJ1dHRvblxyXG4gICAgdGhpcy5fYnRuQWRkVGV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnB1c2hMYWJlbCgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIFVwZGF0ZSBjdXJyZW50IHRleHR1cmUgYnV0dG9uXHJcbiAgICB0aGlzLl9idG5VcGRhdGVUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX21vZGVsVmlldy5zZXRUZXh0dXJlKHNlbGYuX3N1cmZhY2UudG9JbWFnZSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9uIGNsaWNrIHdlIHNldCBjdXJyZW50IHZhbHVlIHRvIGVtcHR5IGFuZCB0aGUgcmVhc29uXHJcbiAgICAvLyB3aHkgd2UgYXJlIGRvaW5nIHRoaXMgaXMgYmVjYXVzZSB3ZSB3YW50IHRvXHJcbiAgICAvLyBhZGQgbmV3IGltYWdlIG9uIHRoZSBzdXJmYWNlLCBldmVuIGlmIGl0IGlzIHRoZVxyXG4gICAgLy8gc2FtZSBmaWxlIChpbiBjYXNlIGlmIHVzZXIgc2VsZWN0ZWQgaXQgZWFybGllcilcclxuICAgIHRoaXMuX2ZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2V0dGluZyBjbGVhciBjb2xvciBmb3IgYSBjYW52YXMgc3VyZmFjZVxyXG4gICAgdGhpcy5fc2VsZWN0QmFja2dyb3VuZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gVGhlcmUgaXMgYW4gZW1wdHkgdmFsdWUgaW4gdGhlIGxpc3RcclxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICBzZWxmLl9zdXJmYWNlLnNldENsZWFyQ29sb3IodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gT24gY2hhbmdlIHdlIGFyZSBsb2FkaW5nIGEgZmlsZS5cclxuICAgIHRoaXMuX2ZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgb25seSBvbmUgZmlsZS5cclxuICAgICAgICAvLyBUaGUgZmlyc3Qgb25lLlxyXG4gICAgICAgIHZhciBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XHJcbiAgICAgICAgdmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xyXG5cclxuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YUltYWdlID0gZXZlbnQuY3VycmVudFRhcmdldC5yZXN1bHQ7XHJcbiAgICAgICAgICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBkYXRhSW1hZ2U7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAvLyBhZGRpbmcgdXBsb2FkZWQgaW1hZ2UgdG8gdGhlIHN1cmZhY2VcclxuICAgICAgICAgICAgc2VsZi5fc3VyZmFjZS5wdXNoSW1hZ2UoaW1hZ2UpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgIH0pO1xyXG59O1xyXG4iLCIvKipcclxuICogUGFuZWwgZm9yIGludGVyYWN0aW5nIHdpdGggbW9kZWwgdmlldyBlbGVtZW50XHJcbiAqIFpvb21pbmcsIHR5cGUgc2VsZWN0b3IuXHJcbiAqXHJcbiAqIEBwYXJhbSB7TW9kZWxWaWV3fSBtb2RlbFZpZXdcclxuICogQHBhcmFtIHt7TW9kZWx9fSBtb2RlbHNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBNb2RlbFZpZXdQYW5lbChtb2RlbFZpZXcsIG1vZGVscylcclxue1xyXG4gICAgdGhpcy5fYnRuWm9vbUluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blpvb21JbicpO1xyXG4gICAgdGhpcy5fYnRuWm9vbU91dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5ab29tT3V0Jyk7XHJcbiAgICB0aGlzLl9jdXBUeXBlU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cFR5cGVTZWxlY3QnKTtcclxuXHJcbiAgICB0aGlzLl9tb2RlbFZpZXcgPSBtb2RlbFZpZXc7XHJcbiAgICB0aGlzLl9tb2RlbHMgPSBtb2RlbHM7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnNcclxuICovXHJcbk1vZGVsVmlld1BhbmVsLnByb3RvdHlwZS5iaW5kSGFuZGxlcnMgPSBmdW5jdGlvbiAoKVxyXG57XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8gWm9vbWluZyBidXR0b25zXHJcbiAgICB0aGlzLl9idG5ab29tSW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2VsZi5fbW9kZWxWaWV3LmNhbWVyYS56b29tSW4oKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fYnRuWm9vbU91dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9tb2RlbFZpZXcuY2FtZXJhLnpvb21PdXQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIENoYW5naW5nIG1vZGVsIHR5cGVcclxuICAgIHRoaXMuX2N1cFR5cGVTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzZWxlY3RlZCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgc2VsZi5fbW9kZWxWaWV3LnNldE1vZGVsKHNlbGYuX21vZGVsc1tzZWxlY3RlZF0pO1xyXG4gICAgfSk7XHJcbn07IiwiLyoqXHJcbiAqIFBhcnQgb2YgdGhlIGRvY3VtZW50IGZvciBtYW5pcHVsYXRpb24gd2l0aCBwcm9wZXJ0aWVzIFxyXG4gKiBvZiB0aGUgc2VsZWN0ZWQgVUlFbGVtZW50IG9uIENhbnZhc1N1cmZhY2VcclxuICpcclxuICogQXdhcmUgb2YgdGhlIGRvY3VtZW50IGNvbnRlbnRcclxuICogSGFuZGxlcyBIVE1MIG1hbmlwdWxhdGlvbnNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQcm9wZXJ0aWVzUGFuZWwoc3VyZmFjZSlcclxue1xyXG4gICAgdGhpcy5fdGV4dFBhbmVsID0ge1xyXG4gICAgICAgIHBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dE9wdGlvbnMnKSxcclxuICAgICAgICBzZWxlY3RGb250OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9udFNlbGVjdCcpLFxyXG4gICAgICAgIHNlbGVjdENvbG9yOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3JGb250U2VsZWN0JyksXHJcbiAgICAgICAgdGV4dEFyZWE6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RlZFRleHRDb250ZW50JyksXHJcbiAgICAgICAgdGV4dFVwQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dFVwQnRuJyksXHJcbiAgICAgICAgdGV4dERvd25CdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0RG93bkJ0bicpXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB0aGlzLl9jb21tb25QYW5lbCA9IHtcclxuICAgICAgICBwYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1vbk9wdGlvbnMnKSxcclxuICAgICAgICByZW1vdmVCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmVCdG4nKSxcclxuICAgICAgICB1cEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwQnRuJyksXHJcbiAgICAgICAgZG93bkJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rvd25CdG4nKVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdGhpcy5faW1hZ2VQYW5lbCA9IHtcclxuICAgICAgICBwYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlT3B0aW9ucycpXHJcbiAgICB9O1xyXG4gICAgdGhpcy5fZW1wdHlQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub1NlbGVjdGVkT3B0aW9ucycpO1xyXG4gICAgXHJcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5fc3VyZmFjZSA9IHN1cmZhY2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBoYW5kbGVycyB0byB0aGUgZXZlbnRzXHJcbiAqL1xyXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLmJpbmRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAvLyBTZWxlY3Rpb24gZXZlbnRzIGZyb20gY2FudmFzIHN1cmZhY2VcclxuICAgIHRoaXMuX3N1cmZhY2UuYWRkU2VsZWN0RXZlbnRIYW5kbGVyKGZ1bmN0aW9uICh1aUVsZW1lbnQpIHtcclxuICAgICAgICBzZWxmLnNldFNlbGVjdGVkKHVpRWxlbWVudCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3N1cmZhY2UuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBCdXR0b24gY2xpY2sgZm9yIGNvbW1vbiBvcHRpb25zIC0gcmVtb3ZlIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50XHJcbiAgICB0aGlzLl9jb21tb25QYW5lbC5yZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbW92ZVNlbGVjdGVkKCk7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1vdmUgZm9yZWdyb3VuZFxyXG4gICAgdGhpcy5fY29tbW9uUGFuZWwudXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnNlbGVjdGVkVG9Gb3JlZ3JvdW5kKCk7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1vdmUgYmFja2dyb3VuZFxyXG4gICAgdGhpcy5fY29tbW9uUGFuZWwuZG93bkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHNlbGYuX3N1cmZhY2Uuc2VsZWN0ZWRUb0JhY2tncm91bmQoKTtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQmluZGluZyB0ZXh0IGNoYW5nZSBldmVudCB0aHJvdWdoIHRleHQgYXJlYSBlbGVtZW50XHJcbiAgICB0aGlzLl90ZXh0UGFuZWwudGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vIElmIHRoaXMgZXZlbnQgaGFwcGVuZWRcclxuICAgICAgICAvLyB0aGVuIHdlIGhhdmUgYSBsYWJlbCBhcyBzZWxlY3RlZCBlbGVtZW50XHJcbiAgICAgICAgc2VsZi5fc2VsZWN0ZWRFbGVtZW50LnNldFRleHQodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFVwZGF0ZXMgc2VsZWN0ZWQgZm9udFxyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdEZvbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX3NlbGVjdGVkRWxlbWVudC5zZXRGb250KHRoaXMudmFsdWUpO1xyXG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGVzIHNlbGVjdGVkIGNvbG9yXHJcbiAgICB0aGlzLl90ZXh0UGFuZWwuc2VsZWN0Q29sb3IuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX3NlbGVjdGVkRWxlbWVudC5zZXRDb2xvcih0aGlzLnZhbHVlKTtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBzZWxlY3RlZCBlbGVtZW50LlxyXG4gKiBTaG93IHByb3BlcnRpZXMgd2luZG93IGRlcGVuZGluZyBvbiB3aGF0IGlzIHRoZSB0eXBlIG9mIGFuIGVsZW1lbnQgXHJcbiAqIFxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudHxudWxsfSB1aUVsZW1lbnRcclxuICovXHJcblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2V0U2VsZWN0ZWQgPSBmdW5jdGlvbiAodWlFbGVtZW50KSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnQgPSB1aUVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGlmICh1aUVsZW1lbnQgaW5zdGFuY2VvZiBVSUxhYmVsRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1RleHRQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodWlFbGVtZW50IGluc3RhbmNlb2YgVUlJbWFnZUVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLnNob3dJbWFnZVByb3BlcnRpZXMoKTtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5zaG93Tm90aGluZ1NlbGVjdGVkUGFuZWwoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIaWRlcyBhbGwgb2YgdGhlIHBhbmVsc1xyXG4gKi9cclxuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5oaWRlQWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgdGhpcy5faW1hZ2VQYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIHRoaXMuX2NvbW1vblBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgdGhpcy5fZW1wdHlQYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIaWRlcyBhbGwgZXhjZXB0IHRleHQgcHJvcGVydGllcyBwYW5lbFxyXG4gKi9cclxuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zaG93VGV4dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmhpZGVBbGwoKTtcclxuICAgIHRoaXMuX3RleHRQYW5lbC50ZXh0QXJlYS5pbm5lckhUTUwgPSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQuZ2V0VGV4dCgpO1xyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdEZvbnQudmFsdWUgPSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQuZ2V0Rm9udCgpO1xyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdENvbG9yLnZhbHVlID0gdGhpcy5fc2VsZWN0ZWRFbGVtZW50LmdldENvbG9yKCk7XHJcbiAgICB0aGlzLl90ZXh0UGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICB0aGlzLl9jb21tb25QYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIaWRlcyBldmVyeXRoaW5nIGV4Y2VwdCBpbWFnZXMgcGFuZWxcclxuICovXHJcblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd0ltYWdlUHJvcGVydGllcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuaGlkZUFsbCgpO1xyXG4gICAgdGhpcy5faW1hZ2VQYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIHRoaXMuX2NvbW1vblBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhpZGVzIGFsbCBleGNlcHQgXCJub3RoaW5nIHNlbGVjdGVkXCIgcGFuZWxcclxuICovXHJcblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd05vdGhpbmdTZWxlY3RlZFBhbmVsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5oaWRlQWxsKCk7XHJcbiAgICB0aGlzLl9lbXB0eVBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG59OyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xyXG4gICAgdmFyIHN1cmZhY2UgPSBuZXcgQ2FudmFzU3VyZmFjZShjYW52YXMpO1xyXG4gICAgc3VyZmFjZS5yZW5kZXIoKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgcHJvcGVydGllcyBwYW5lbFxyXG4gICAgLy8gYW5kIGF0dGFjaGluZyBpdCB0byBjYW52YXMgZXZlbnRzXHJcbiAgICB2YXIgcHJvcGVydGllc1BhbmVsID0gbmV3IFByb3BlcnRpZXNQYW5lbChzdXJmYWNlKTtcclxuICAgIHByb3BlcnRpZXNQYW5lbC5iaW5kSGFuZGxlcnMoKTtcclxuXHJcbiAgICB2YXIgY3VwU3VyZmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXBTdXJmYWNlJyk7XHJcbiAgICB2YXIgbG9hZGVyID0gbmV3IFJlc291cmNlTG9hZGVyKCk7XHJcblxyXG4gICAgdmFyIHJlc291cmNlUHJlcGFyZXIgPSBuZXcgUmVzb3VyY2VQcmVwYXJlcihsb2FkZXIsIFtcclxuICAgICAgICB7a2V5OiAnbW9kZWxDdXAxJywgc3JjOiAnL21vZGVscy9jdXAxLmpzb24nLCB0eXBlOiAnanNvbid9LFxyXG4gICAgICAgIHtrZXk6ICdtb2RlbEN1cDInLCBzcmM6ICcvbW9kZWxzL2N1cDIuanNvbicsIHR5cGU6ICdqc29uJ30sXHJcbiAgICAgICAge2tleTogJ3ZlcnRleFNoYWRlcicsIHNyYzogJy9zaGFkZXJzL2ZyYWdtZW50Lmdsc2wnLCB0eXBlOiAndGV4dCd9LFxyXG4gICAgICAgIHtrZXk6ICdmcmFnbWVudFNoYWRlcicsIHNyYzogJy9zaGFkZXJzL3ZlcnRleC5nbHNsJywgdHlwZTogJ3RleHQnfSxcclxuICAgICAgICB7a2V5OiAnaW5pdGlhbFRleHR1cmUnLCBzcmM6ICcvaW1nL2xvZ29HcmV5LmpwZycsIHR5cGU6ICdpbWFnZSd9XHJcbiAgICBdLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IGV4dHJhY3QgYWxsIGNoZWNrc1xyXG4gICAgICAgIHZhciBnbENvbnRleHQgPSBjdXBTdXJmYWNlLmdldENvbnRleHQoJ3dlYmdsJyk7XHJcblxyXG4gICAgICAgIGlmICghZ2xDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGdsQ29udGV4dCA9IGN1cFN1cmZhY2UuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJylcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghZ2xDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdTZWVtcyBsaWtlIHlvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFdlYkdMLiBDb21lIGJhY2sgbGF0ZXIgd2hlbiB5b3UgdXBkYXRlIHlvdXIgYnJvd3NlciEnKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWJHTCBzdXBwb3J0IGlzIHJlcXVpcmVkIScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8ga2V5IG11c3QgYmUgc2FtZSBhcyBzZWxlY3Qgb3B0aW9uIHZhbHVlXHJcbiAgICAgICAgdmFyIG1vZGVscyA9IHtcclxuICAgICAgICAgICAgY3VwMTogbmV3IE1vZGVsKGdsQ29udGV4dCwgU3RvcmFnZS5nZXQoJ21vZGVsQ3VwMScpKSxcclxuICAgICAgICAgICAgY3VwMjogbmV3IE1vZGVsKGdsQ29udGV4dCwgU3RvcmFnZS5nZXQoJ21vZGVsQ3VwMicpKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHZhciBtb2RlbFZpZXcgPSBuZXcgTW9kZWxWaWV3KFxyXG4gICAgICAgICAgICBjdXBTdXJmYWNlLFxyXG4gICAgICAgICAgICBnbENvbnRleHQsXHJcbiAgICAgICAgICAgIFN0b3JhZ2UuZ2V0KCdpbml0aWFsVGV4dHVyZScpLFxyXG4gICAgICAgICAgICBTdG9yYWdlLmdldCgnZnJhZ21lbnRTaGFkZXInKSxcclxuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ3ZlcnRleFNoYWRlcicpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbW9kZWxWaWV3LnNldE1vZGVsKG1vZGVscy5jdXAxKTtcclxuICAgICAgICBtb2RlbFZpZXcuc3RhcnRSZW5kZXIoKTtcclxuXHJcbiAgICAgICAgLy8gUGFuZWwgZm9yIGNyZWF0aW5nIG5ldyBlbGVtZW50cyBvblxyXG4gICAgICAgIHZhciBjb21wb25lbnRQYW5lbCA9IG5ldyBDb21wb25lbnRzUGFuZWwoc3VyZmFjZSwgbW9kZWxWaWV3KTtcclxuICAgICAgICBjb21wb25lbnRQYW5lbC5iaW5kSGFuZGxlcnMoKTtcclxuXHJcbiAgICAgICAgLy8gUGFuZWwgZm9yIDNEIG1hZ2ljXHJcbiAgICAgICAgdmFyIG1vZGVsVmlld1BhbmVsID0gbmV3IE1vZGVsVmlld1BhbmVsKG1vZGVsVmlldywgbW9kZWxzKTtcclxuICAgICAgICBtb2RlbFZpZXdQYW5lbC5iaW5kSGFuZGxlcnMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJlc291cmNlUHJlcGFyZXIuc3RhcnRMb2FkaW5nKCk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
