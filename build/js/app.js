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
 * @param context
 * @constructor
 */
function CanvasUISelectedView(context) {
    if ( ! (context instanceof CanvasRenderingContext2D)) {
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
        CanvasUISelectedView.ResizeSymbol,
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
 * @const
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
    var matWorldUniformLocation = gl.getUniformLocation(this.shaderProgram, 'mWorld');
    var matViewUniformLocation = gl.getUniformLocation(this.shaderProgram, 'mView');
    var matProjectionUniformLocation = gl.getUniformLocation(this.shaderProgram, 'mProjection');

    // Сами матрицы
    var worldMatrix = new Float32Array(16);
    var viewMatrix = new Float32Array(16);
    var projectionMatrix = new Float32Array(16);
    mat4.identity(worldMatrix);
    // Позиция наблюдателя, куда он смотрит, плюс вектор верха
    mat4.lookAt(viewMatrix, [0, 0, -10], [0, 0, 0], [0, 1, 0]);
    // Поле обзора (в радианах), viewport, closest plane, far plane
    mat4.perspective(projectionMatrix, glMatrix.toRadian(30), this.canvas.width / this.canvas.height, 0.01, 100.0);

    // Какую шейдерную программу используем
    gl.useProgram(this.shaderProgram);

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

        // Активный слот текстуры
        gl.activeTexture(gl.TEXTURE0);

        gl.clearColor(0.8, 0.9, 0.9 ,1.0);
        gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT );

        gl.drawElements(
            gl.TRIANGLES, // Как рисуем,
            self.model.modelIndexes.length,
            gl.UNSIGNED_SHORT, // Тип
            0 // Сколько пропускам вершин
        );
        requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
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
 *
 * @param {CanvasSurface} surface
 * @constructor
 */
function ComponentsPanel(surface)
{
    this._surface = surface;
    
    this._fileInput = document.getElementById('fileUploader');
    this._btnUpdateTexture = document.getElementById('updateTexture');
    this._btnAddText = document.getElementById('btnAddText');
    this._selectBackground = document.getElementById('selectBackground');
}

ComponentsPanel.prototype.bindHandlers = function () {
    var self = this;
    
    // Add event listener for click on text button
    this._btnAddText.addEventListener('click', function () {
        self._surface.pushLabel();
    });
    
    // Update current texture button
    this._btnUpdateTexture.addEventListener('click', function () {
        modelView.setTexture(self._surface.toImage());
    });

    // On click we set value to empty and the reason
    // why we are doing this is because we want to
    // add new image on the surface even if it is the
    // same file (in case user selected it earlier)
    this._fileInput.addEventListener('click', function (e) {
        this.value = '';
    });

    // Setting clear color for canvas surface
    this._selectBackground.addEventListener('change', function () {
        // There is an empty value in the list
        if (this.value) {
            self._surface.setClearColor(this.value);
            self._surface.render();
        }
    });

    // On change we loading file.
    this._fileInput.addEventListener('change', function (e) {
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

    // Panel for creating new elements on
    var componentPanel = new ComponentsPanel(surface);
    componentPanel.bindHandlers();

    // Create properties panel
    // and attaching it to canvas events
    var propertiesPanel = new PropertiesPanel(surface);
    propertiesPanel.bindHandlers();

    // Initializing model viewer
    window.modelView = null;
    var cupSurface = document.getElementById('cupSurface');
    var loader = new ResourceLoader();

    var resourcePreparer = new ResourcePreparer(loader, [
        {key: 'modelCup1', src: '/models/cup1.json', type: 'json'},
        {key: 'modelCup2', src: '/models/cup2.json', type: 'json'},
        {key: 'vertexShader', src: '/shaders/fragment.glsl', type: 'text'},
        {key: 'fragmentShader', src: '/shaders/vertex.glsl', type: 'text'},
        {key: 'initialTexture', src: '/img/logoGrey.jpg', type: 'image'}
    ], function () {

        // TODO: extract
        var glContext = cupSurface.getContext('webgl');

        if (!glContext) {
            glContext = cupSurface.getContext('experimental-webgl')
        }

        if (!glContext) {
            alert('Seems like your browser does not support WebGL. Come back when you update your browser!');
            throw new Error('WebGL support is required!');
        }

        window.modelCup1 = new Model(glContext, Storage.get('modelCup1'));
        window.modelCup2 = new Model(glContext, Storage.get('modelCup2'));

        modelView = new ModelView(
            cupSurface,
            glContext,
            Storage.get('initialTexture'),
            Storage.get('fragmentShader'),
            Storage.get('vertexShader')
        );

        modelView.setModel(window.modelCup1);
        modelView.startRender();
    });

    resourcePreparer.startLoading();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsLW1hdHJpeC5qcyIsIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsIkNhbnZhc1VJRmFjdG9yeS5qcyIsIkNhbnZhc1VJSW1hZ2VWaWV3LmpzIiwiQ2FudmFzVUlMYWJlbFZpZXcuanMiLCJDYW52YXNVSVNlbGVjdGVkVmlldy5qcyIsIlBvc2l0aW9uLmpzIiwiUmVzb3VyY2VMb2FkZXIuanMiLCJSZXNvdXJjZVByZXBhcmVyLmpzIiwiU2l6ZS5qcyIsIlN0b3JhZ2UuanMiLCJVSUNvbGxlY3Rpb24uanMiLCJVSUVsZW1lbnQuanMiLCJVSUVsZW1lbnRWaWV3LmpzIiwiVUlJbWFnZUVsZW1lbnQuanMiLCJVSUxhYmVsRWxlbWVudC5qcyIsIk1vZGVsLmpzIiwiTW9kZWxWaWV3LmpzIiwiU2hhZGVyQ29tcGlsZXIuanMiLCJDb21wb25lbnRzUGFuZWwuanMiLCJQcm9wZXJ0aWVzUGFuZWwuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25UQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgZ2wtbWF0cml4IC0gSGlnaCBwZXJmb3JtYW5jZSBtYXRyaXggYW5kIHZlY3RvciBvcGVyYXRpb25zXHJcbiAqIEBhdXRob3IgQnJhbmRvbiBKb25lc1xyXG4gKiBAYXV0aG9yIENvbGluIE1hY0tlbnppZSBJVlxyXG4gKiBAdmVyc2lvbiAyLjMuMlxyXG4gKi9cclxuXHJcbi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxyXG5cclxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG4gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxyXG4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXHJcbiBUSEUgU09GVFdBUkUuICovXHJcblxyXG4hZnVuY3Rpb24odCxhKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1hKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGEpO2Vsc2V7dmFyIG49YSgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOnQpW3JdPW5bcl19fSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGEocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBvPW5bcl09e2V4cG9ydHM6e30saWQ6cixsb2FkZWQ6ITF9O3JldHVybiB0W3JdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLGEpLG8ubG9hZGVkPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gYS5tPXQsYS5jPW4sYS5wPVwiXCIsYSgwKX0oW2Z1bmN0aW9uKHQsYSxuKXthLmdsTWF0cml4PW4oMSksYS5tYXQyPW4oMiksYS5tYXQyZD1uKDMpLGEubWF0Mz1uKDQpLGEubWF0ND1uKDUpLGEucXVhdD1uKDYpLGEudmVjMj1uKDkpLGEudmVjMz1uKDcpLGEudmVjND1uKDgpfSxmdW5jdGlvbih0LGEpe3ZhciBuPXt9O24uRVBTSUxPTj0xZS02LG4uQVJSQVlfVFlQRT1cInVuZGVmaW5lZFwiIT10eXBlb2YgRmxvYXQzMkFycmF5P0Zsb2F0MzJBcnJheTpBcnJheSxuLlJBTkRPTT1NYXRoLnJhbmRvbSxuLkVOQUJMRV9TSU1EPSExLG4uU0lNRF9BVkFJTEFCTEU9bi5BUlJBWV9UWVBFPT09RmxvYXQzMkFycmF5JiZcIlNJTURcImluIHRoaXMsbi5VU0VfU0lNRD1uLkVOQUJMRV9TSU1EJiZuLlNJTURfQVZBSUxBQkxFLG4uc2V0TWF0cml4QXJyYXlUeXBlPWZ1bmN0aW9uKHQpe24uQVJSQVlfVFlQRT10fTt2YXIgcj1NYXRoLlBJLzE4MDtuLnRvUmFkaWFuPWZ1bmN0aW9uKHQpe3JldHVybiB0KnJ9LG4uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIE1hdGguYWJzKHQtYSk8PW4uRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHQpLE1hdGguYWJzKGEpKX0sdC5leHBvcnRzPW59LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0fSxvLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8pe3ZhciB1PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHVbMF09dCx1WzFdPWEsdVsyXT1uLHVbM109byx1fSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8pe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdH0sby50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXtpZih0PT09YSl7dmFyIG49YVsxXTt0WzFdPWFbMl0sdFsyXT1ufWVsc2UgdFswXT1hWzBdLHRbMV09YVsyXSx0WzJdPWFbMV0sdFszXT1hWzNdO3JldHVybiB0fSxvLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uKnUtbypyO3JldHVybiBsPyhsPTEvbCx0WzBdPXUqbCx0WzFdPS1yKmwsdFsyXT0tbypsLHRbM109bipsLHQpOm51bGx9LG8uYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF07cmV0dXJuIHRbMF09YVszXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdFszXT1uLHR9LG8uZGV0ZXJtaW5hbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF0qdFszXS10WzJdKnRbMV19LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1uWzBdLE09blsxXSxzPW5bMl0saT1uWzNdO3JldHVybiB0WzBdPXIqZSt1Kk0sdFsxXT1vKmUrbCpNLHRbMl09cipzK3UqaSx0WzNdPW8qcytsKmksdH0sby5tdWw9by5tdWx0aXBseSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNK3UqZSx0WzFdPW8qTStsKmUsdFsyXT1yKi1lK3UqTSx0WzNdPW8qLWUrbCpNLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1uWzBdLE09blsxXTtyZXR1cm4gdFswXT1yKmUsdFsxXT1vKmUsdFsyXT11Kk0sdFszXT1sKk0sdH0sby5mcm9tUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09LW4sdFszXT1yLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT1hWzFdLHR9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0MihcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpKX0sby5MRFU9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMl09clsyXS9yWzBdLG5bMF09clswXSxuWzFdPXJbMV0sblszXT1yWzNdLXRbMl0qblsxXSxbdCxhLG5dfSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM119LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPWFbMF0sTT1hWzFdLHM9YVsyXSxpPWFbM107cmV0dXJuIE1hdGguYWJzKG4tZSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGUpKSYmTWF0aC5hYnMoby1NKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoTSkpJiZNYXRoLmFicyh1LXMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhzKSkmJk1hdGguYWJzKGwtaSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGkpKX0sby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdH0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDYpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdFs0XT0wLHRbNV09MCx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoNik7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhWzRdPXRbNF0sYVs1XT10WzVdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0fSxvLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdFs0XT0wLHRbNV09MCx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyx1LGwpe3ZhciBlPW5ldyByLkFSUkFZX1RZUEUoNik7cmV0dXJuIGVbMF09dCxlWzFdPWEsZVsyXT1uLGVbM109byxlWzRdPXUsZVs1XT1sLGV9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdFs0XT11LHRbNV09bCx0fSxvLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPW4qdS1yKm87cmV0dXJuIE0/KE09MS9NLHRbMF09dSpNLHRbMV09LXIqTSx0WzJdPS1vKk0sdFszXT1uKk0sdFs0XT0obyplLXUqbCkqTSx0WzVdPShyKmwtbiplKSpNLHQpOm51bGx9LG8uZGV0ZXJtaW5hbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF0qdFszXS10WzFdKnRbMl19LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPW5bMF0saT1uWzFdLGM9blsyXSxoPW5bM10sUz1uWzRdLEk9bls1XTtyZXR1cm4gdFswXT1yKnMrdSppLHRbMV09bypzK2wqaSx0WzJdPXIqYyt1KmgsdFszXT1vKmMrbCpoLHRbNF09cipTK3UqSStlLHRbNV09bypTK2wqSStNLHR9LG8ubXVsPW8ubXVsdGlwbHksby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPU1hdGguc2luKG4pLGk9TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cippK3Uqcyx0WzFdPW8qaStsKnMsdFsyXT1yKi1zK3UqaSx0WzNdPW8qLXMrbCppLHRbNF09ZSx0WzVdPU0sdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9blswXSxpPW5bMV07cmV0dXJuIHRbMF09cipzLHRbMV09bypzLHRbMl09dSppLHRbM109bCppLHRbNF09ZSx0WzVdPU0sdH0sby50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPW5bMF0saT1uWzFdO3JldHVybiB0WzBdPXIsdFsxXT1vLHRbMl09dSx0WzNdPWwsdFs0XT1yKnMrdSppK2UsdFs1XT1vKnMrbCppK00sdH0sby5mcm9tUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09LW4sdFszXT1yLHRbNF09MCx0WzVdPTAsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPWFbMV0sdFs0XT0wLHRbNV09MCx0fSxvLmZyb21UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdFs0XT1hWzBdLHRbNV09YVsxXSx0fSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDJkKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIsIFwiK3RbNF0rXCIsIFwiK3RbNV0rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikrTWF0aC5wb3codFs0XSwyKStNYXRoLnBvdyh0WzVdLDIpKzEpfSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHRbNF09YVs0XStuWzRdLHRbNV09YVs1XStuWzVdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0WzRdPWFbNF0tbls0XSx0WzVdPWFbNV0tbls1XSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0WzRdPWFbNF0qbix0WzVdPWFbNV0qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHRbNF09YVs0XStuWzRdKnIsdFs1XT1hWzVdK25bNV0qcix0fSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdJiZ0WzRdPT09YVs0XSYmdFs1XT09PWFbNV19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPXRbNF0sTT10WzVdLHM9YVswXSxpPWFbMV0sYz1hWzJdLGg9YVszXSxTPWFbNF0sST1hWzVdO3JldHVybiBNYXRoLmFicyhuLXMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhzKSkmJk1hdGguYWJzKG8taSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGkpKSYmTWF0aC5hYnModS1jKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoYykpJiZNYXRoLmFicyhsLWgpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhoKSkmJk1hdGguYWJzKGUtUyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGUpLE1hdGguYWJzKFMpKSYmTWF0aC5hYnMoTS1JKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoTSksTWF0aC5hYnMoSSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoOSk7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTEsdFs1XT0wLHRbNl09MCx0WzddPTAsdFs4XT0xLHR9LG8uZnJvbU1hdDQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzRdLHRbNF09YVs1XSx0WzVdPWFbNl0sdFs2XT1hWzhdLHRbN109YVs5XSx0WzhdPWFbMTBdLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg5KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGFbNF09dFs0XSxhWzVdPXRbNV0sYVs2XT10WzZdLGFbN109dFs3XSxhWzhdPXRbOF0sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvLHUsbCxlLE0scyl7dmFyIGk9bmV3IHIuQVJSQVlfVFlQRSg5KTtyZXR1cm4gaVswXT10LGlbMV09YSxpWzJdPW4saVszXT1vLGlbNF09dSxpWzVdPWwsaVs2XT1lLGlbN109TSxpWzhdPXMsaX0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvLHUsbCxlLE0scyl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0WzRdPXUsdFs1XT1sLHRbNl09ZSx0WzddPU0sdFs4XT1zLHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTEsdFs1XT0wLHRbNl09MCx0WzddPTAsdFs4XT0xLHR9LG8udHJhbnNwb3NlPWZ1bmN0aW9uKHQsYSl7aWYodD09PWEpe3ZhciBuPWFbMV0scj1hWzJdLG89YVs1XTt0WzFdPWFbM10sdFsyXT1hWzZdLHRbM109bix0WzVdPWFbN10sdFs2XT1yLHRbN109b31lbHNlIHRbMF09YVswXSx0WzFdPWFbM10sdFsyXT1hWzZdLHRbM109YVsxXSx0WzRdPWFbNF0sdFs1XT1hWzddLHRbNl09YVsyXSx0WzddPWFbNV0sdFs4XT1hWzhdO3JldHVybiB0fSxvLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XSxjPWkqbC1lKnMsaD0taSp1K2UqTSxTPXMqdS1sKk0sST1uKmMrcipoK28qUztyZXR1cm4gST8oST0xL0ksdFswXT1jKkksdFsxXT0oLWkqcitvKnMpKkksdFsyXT0oZSpyLW8qbCkqSSx0WzNdPWgqSSx0WzRdPShpKm4tbypNKSpJLHRbNV09KC1lKm4rbyp1KSpJLHRbNl09UypJLHRbN109KC1zKm4rcipNKSpJLHRbOF09KGwqbi1yKnUpKkksdCk6bnVsbH0sby5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdO3JldHVybiB0WzBdPWwqaS1lKnMsdFsxXT1vKnMtcippLHRbMl09ciplLW8qbCx0WzNdPWUqTS11KmksdFs0XT1uKmktbypNLHRbNV09byp1LW4qZSx0WzZdPXUqcy1sKk0sdFs3XT1yKk0tbipzLHRbOF09bipsLXIqdSx0fSxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM10sdT10WzRdLGw9dFs1XSxlPXRbNl0sTT10WzddLHM9dFs4XTtyZXR1cm4gYSoocyp1LWwqTSkrbiooLXMqbytsKmUpK3IqKE0qby11KmUpfSxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1uWzBdLFM9blsxXSxJPW5bMl0sZj1uWzNdLHg9bls0XSxEPW5bNV0sRj1uWzZdLG09bls3XSxkPW5bOF07cmV0dXJuIHRbMF09aCpyK1MqbCtJKnMsdFsxXT1oKm8rUyplK0kqaSx0WzJdPWgqdStTKk0rSSpjLHRbM109ZipyK3gqbCtEKnMsdFs0XT1mKm8reCplK0QqaSx0WzVdPWYqdSt4Kk0rRCpjLHRbNl09RipyK20qbCtkKnMsdFs3XT1GKm8rbSplK2QqaSx0WzhdPUYqdSttKk0rZCpjLHR9LG8ubXVsPW8ubXVsdGlwbHksby50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPW5bMF0sUz1uWzFdO3JldHVybiB0WzBdPXIsdFsxXT1vLHRbMl09dSx0WzNdPWwsdFs0XT1lLHRbNV09TSx0WzZdPWgqcitTKmwrcyx0WzddPWgqbytTKmUraSx0WzhdPWgqdStTKk0rYyx0fSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9TWF0aC5zaW4obiksUz1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1TKnIraCpsLHRbMV09UypvK2gqZSx0WzJdPVMqdStoKk0sdFszXT1TKmwtaCpyLHRbNF09UyplLWgqbyx0WzVdPVMqTS1oKnUsdFs2XT1zLHRbN109aSx0WzhdPWMsdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9blswXSxvPW5bMV07cmV0dXJuIHRbMF09ciphWzBdLHRbMV09ciphWzFdLHRbMl09ciphWzJdLHRbM109byphWzNdLHRbNF09byphWzRdLHRbNV09byphWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHR9LG8uZnJvbVRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTEsdFs1XT0wLHRbNl09YVswXSx0WzddPWFbMV0sdFs4XT0xLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPTAsdFszXT0tbix0WzRdPXIsdFs1XT0wLHRbNl09MCx0WzddPTAsdFs4XT0xLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09YVsxXSx0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby5mcm9tTWF0MmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPTAsdFszXT1hWzJdLHRbNF09YVszXSx0WzVdPTAsdFs2XT1hWzRdLHRbN109YVs1XSx0WzhdPTEsdH0sby5mcm9tUXVhdD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uK24sZT1yK3IsTT1vK28scz1uKmwsaT1yKmwsYz1yKmUsaD1vKmwsUz1vKmUsST1vKk0sZj11KmwseD11KmUsRD11Kk07cmV0dXJuIHRbMF09MS1jLUksdFszXT1pLUQsdFs2XT1oK3gsdFsxXT1pK0QsdFs0XT0xLXMtSSx0WzddPVMtZix0WzJdPWgteCx0WzVdPVMrZix0WzhdPTEtcy1jLHR9LG8ubm9ybWFsRnJvbU1hdDQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1hWzldLGg9YVsxMF0sUz1hWzExXSxJPWFbMTJdLGY9YVsxM10seD1hWzE0XSxEPWFbMTVdLEY9biplLXIqbCxtPW4qTS1vKmwsZD1uKnMtdSpsLGI9cipNLW8qZSx2PXIqcy11KmUsej1vKnMtdSpNLHA9aSpmLWMqSSx3PWkqeC1oKkksRT1pKkQtUypJLEE9Yyp4LWgqZixQPWMqRC1TKmYsTD1oKkQtUyp4LHE9RipMLW0qUCtkKkErYipFLXYqdyt6KnA7cmV0dXJuIHE/KHE9MS9xLHRbMF09KGUqTC1NKlArcypBKSpxLHRbMV09KE0qRS1sKkwtcyp3KSpxLHRbMl09KGwqUC1lKkUrcypwKSpxLHRbM109KG8qUC1yKkwtdSpBKSpxLHRbNF09KG4qTC1vKkUrdSp3KSpxLHRbNV09KHIqRS1uKlAtdSpwKSpxLHRbNl09KGYqei14KnYrRCpiKSpxLHRbN109KHgqZC1JKnotRCptKSpxLHRbOF09KEkqdi1mKmQrRCpGKSpxLHQpOm51bGx9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0MyhcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiLCBcIit0WzRdK1wiLCBcIit0WzVdK1wiLCBcIit0WzZdK1wiLCBcIit0WzddK1wiLCBcIit0WzhdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpK01hdGgucG93KHRbNF0sMikrTWF0aC5wb3codFs1XSwyKStNYXRoLnBvdyh0WzZdLDIpK01hdGgucG93KHRbN10sMikrTWF0aC5wb3codFs4XSwyKSl9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdFs0XT1hWzRdK25bNF0sdFs1XT1hWzVdK25bNV0sdFs2XT1hWzZdK25bNl0sdFs3XT1hWzddK25bN10sdFs4XT1hWzhdK25bOF0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHRbNF09YVs0XS1uWzRdLHRbNV09YVs1XS1uWzVdLHRbNl09YVs2XS1uWzZdLHRbN109YVs3XS1uWzddLHRbOF09YVs4XS1uWzhdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHRbNF09YVs0XSpuLHRbNV09YVs1XSpuLHRbNl09YVs2XSpuLHRbN109YVs3XSpuLHRbOF09YVs4XSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdFs0XT1hWzRdK25bNF0qcix0WzVdPWFbNV0rbls1XSpyLHRbNl09YVs2XStuWzZdKnIsdFs3XT1hWzddK25bN10qcix0WzhdPWFbOF0rbls4XSpyLHR9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM10mJnRbNF09PT1hWzRdJiZ0WzVdPT09YVs1XSYmdFs2XT09PWFbNl0mJnRbN109PT1hWzddJiZ0WzhdPT09YVs4XX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9dFs0XSxNPXRbNV0scz10WzZdLGk9dFs3XSxjPXRbOF0saD1hWzBdLFM9YVsxXSxJPWFbMl0sZj1hWzNdLHg9YVs0XSxEPWFbNV0sRj10WzZdLG09YVs3XSxkPWFbOF07cmV0dXJuIE1hdGguYWJzKG4taCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGgpKSYmTWF0aC5hYnMoby1TKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoUykpJiZNYXRoLmFicyh1LUkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhJKSkmJk1hdGguYWJzKGwtZik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGYpKSYmTWF0aC5hYnMoZS14KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZSksTWF0aC5hYnMoeCkpJiZNYXRoLmFicyhNLUQpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhNKSxNYXRoLmFicyhEKSkmJk1hdGguYWJzKHMtRik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHMpLE1hdGguYWJzKEYpKSYmTWF0aC5hYnMoaS1tKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoaSksTWF0aC5hYnMobSkpJiZNYXRoLmFicyhjLWQpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhjKSxNYXRoLmFicyhkKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXtzY2FsYXI6e30sU0lNRDp7fX07by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDE2KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSgxNik7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhWzRdPXRbNF0sYVs1XT10WzVdLGFbNl09dFs2XSxhWzddPXRbN10sYVs4XT10WzhdLGFbOV09dFs5XSxhWzEwXT10WzEwXSxhWzExXT10WzExXSxhWzEyXT10WzEyXSxhWzEzXT10WzEzXSxhWzE0XT10WzE0XSxhWzE1XT10WzE1XSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdFs5XT1hWzldLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTFdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvLHUsbCxlLE0scyxpLGMsaCxTLEksZix4KXt2YXIgRD1uZXcgci5BUlJBWV9UWVBFKDE2KTtyZXR1cm4gRFswXT10LERbMV09YSxEWzJdPW4sRFszXT1vLERbNF09dSxEWzVdPWwsRFs2XT1lLERbN109TSxEWzhdPXMsRFs5XT1pLERbMTBdPWMsRFsxMV09aCxEWzEyXT1TLERbMTNdPUksRFsxNF09ZixEWzE1XT14LER9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwsZSxNLHMsaSxjLGgsUyxJLGYseCl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0WzRdPXUsdFs1XT1sLHRbNl09ZSx0WzddPU0sdFs4XT1zLHRbOV09aSx0WzEwXT1jLHRbMTFdPWgsdFsxMl09Uyx0WzEzXT1JLHRbMTRdPWYsdFsxNV09eCx0fSxvLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09MSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5zY2FsYXIudHJhbnNwb3NlPWZ1bmN0aW9uKHQsYSl7aWYodD09PWEpe3ZhciBuPWFbMV0scj1hWzJdLG89YVszXSx1PWFbNl0sbD1hWzddLGU9YVsxMV07dFsxXT1hWzRdLHRbMl09YVs4XSx0WzNdPWFbMTJdLHRbNF09bix0WzZdPWFbOV0sdFs3XT1hWzEzXSx0WzhdPXIsdFs5XT11LHRbMTFdPWFbMTRdLHRbMTJdPW8sdFsxM109bCx0WzE0XT1lfWVsc2UgdFswXT1hWzBdLHRbMV09YVs0XSx0WzJdPWFbOF0sdFszXT1hWzEyXSx0WzRdPWFbMV0sdFs1XT1hWzVdLHRbNl09YVs5XSx0WzddPWFbMTNdLHRbOF09YVsyXSx0WzldPWFbNl0sdFsxMF09YVsxMF0sdFsxMV09YVsxNF0sdFsxMl09YVszXSx0WzEzXT1hWzddLHRbMTRdPWFbMTFdLHRbMTVdPWFbMTVdO3JldHVybiB0fSxvLlNJTUQudHJhbnNwb3NlPWZ1bmN0aW9uKHQsYSl7dmFyIG4scixvLHUsbCxlLE0scyxpLGM7cmV0dXJuIG49U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKSxsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDAsMSw0LDUpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMCwxLDQsNSksTT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwwLDIsNCw2KSxzPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDEsMyw1LDcpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxNKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQscyksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwyLDMsNiw3KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDIsMyw2LDcpLGk9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMCwyLDQsNiksYz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwxLDMsNSw3KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsaSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixjKSx0fSxvLnRyYW5zcG9zZT1yLlVTRV9TSU1EP28uU0lNRC50cmFuc3Bvc2U6by5zY2FsYXIudHJhbnNwb3NlLG8uc2NhbGFyLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XSxjPWFbOV0saD1hWzEwXSxTPWFbMTFdLEk9YVsxMl0sZj1hWzEzXSx4PWFbMTRdLEQ9YVsxNV0sRj1uKmUtcipsLG09bipNLW8qbCxkPW4qcy11KmwsYj1yKk0tbyplLHY9cipzLXUqZSx6PW8qcy11Kk0scD1pKmYtYypJLHc9aSp4LWgqSSxFPWkqRC1TKkksQT1jKngtaCpmLFA9YypELVMqZixMPWgqRC1TKngscT1GKkwtbSpQK2QqQStiKkUtdip3K3oqcDtyZXR1cm4gcT8ocT0xL3EsdFswXT0oZSpMLU0qUCtzKkEpKnEsdFsxXT0obypQLXIqTC11KkEpKnEsdFsyXT0oZip6LXgqditEKmIpKnEsdFszXT0oaCp2LWMqei1TKmIpKnEsdFs0XT0oTSpFLWwqTC1zKncpKnEsdFs1XT0obipMLW8qRSt1KncpKnEsdFs2XT0oeCpkLUkqei1EKm0pKnEsdFs3XT0oaSp6LWgqZCtTKm0pKnEsdFs4XT0obCpQLWUqRStzKnApKnEsdFs5XT0ocipFLW4qUC11KnApKnEsdFsxMF09KEkqdi1mKmQrRCpGKSpxLHRbMTFdPShjKmQtaSp2LVMqRikqcSx0WzEyXT0oZSp3LWwqQS1NKnApKnEsdFsxM109KG4qQS1yKncrbypwKSpxLHRbMTRdPShmKm0tSSpiLXgqRikqcSx0WzE1XT0oaSpiLWMqbStoKkYpKnEsdCk6bnVsbH0sby5TSU1ELmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuLHIsbyx1LGwsZSxNLHMsaSxjLGg9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLFM9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLEk9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLGY9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKTtyZXR1cm4gbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGgsUywwLDEsNCw1KSxyPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoSSxmLDAsMSw0LDUpLG49U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLHIsMCwyLDQsNikscj1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHIsbCwxLDMsNSw3KSxsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaCxTLDIsMyw2LDcpLHU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShJLGYsMiwzLDYsNyksbz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsdSwwLDIsNCw2KSx1PVNJTUQuRmxvYXQzMng0LnNodWZmbGUodSxsLDEsMyw1LDcpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG8sdSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksZT1TSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxNPVNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyLGwpLGUpLE09U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChuLGwpLE0pLE09U0lNRC5GbG9hdDMyeDQuc3dpenpsZShNLDIsMywwLDEpLGw9U0lNRC5GbG9hdDMyeDQubXVsKHIsbyksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksZT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCksZSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LnN1YihlLFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpKSxpPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxsPVNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHIsMiwzLDAsMSksdSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksbz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKG8sMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKG8sbCksZSkscz1TSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LnN1YihlLFNJTUQuRmxvYXQzMng0Lm11bChvLGwpKSxzPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxzKSxzPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywyLDMsMCwxKSxsPVNJTUQuRmxvYXQzMng0Lm11bChuLHIpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLHM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChvLGwpLGkpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLHM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3ViKGksU0lNRC5GbG9hdDMyeDQubXVsKG8sbCkpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG4sdSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksTT1TSU1ELkZsb2F0MzJ4NC5zdWIoTSxTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSkscz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHIsbCkscyksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksTT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKG8sbCksTSkscz1TSU1ELkZsb2F0MzJ4NC5zdWIocyxTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobixvKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxNPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxNKSxpPVNJTUQuRmxvYXQzMng0LnN1YihpLFNJTUQuRmxvYXQzMng0Lm11bChyLGwpKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxNPVNJTUQuRmxvYXQzMng0LnN1YihNLFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpKSxpPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxpKSxjPVNJTUQuRmxvYXQzMng0Lm11bChuLGUpLGM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywyLDMsMCwxKSxjKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMSwwLDMsMiksYyksbD1TSU1ELkZsb2F0MzJ4NC5yZWNpcHJvY2FsQXBwcm94aW1hdGlvbihjKSxjPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5hZGQobCxsKSxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxTSU1ELkZsb2F0MzJ4NC5tdWwobCxsKSkpLChjPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywwLDAsMCwwKSk/KFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxlKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0Lm11bChjLE0pKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQubXVsKGMscykpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsU0lNRC5GbG9hdDMyeDQubXVsKGMsaSkpLHQpOm51bGx9LG8uaW52ZXJ0PXIuVVNFX1NJTUQ/by5TSU1ELmludmVydDpvLnNjYWxhci5pbnZlcnQsby5zY2FsYXIuYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XSxjPWFbOV0saD1hWzEwXSxTPWFbMTFdLEk9YVsxMl0sZj1hWzEzXSx4PWFbMTRdLEQ9YVsxNV07cmV0dXJuIHRbMF09ZSooaCpELVMqeCktYyooTSpELXMqeCkrZiooTSpTLXMqaCksdFsxXT0tKHIqKGgqRC1TKngpLWMqKG8qRC11KngpK2YqKG8qUy11KmgpKSx0WzJdPXIqKE0qRC1zKngpLWUqKG8qRC11KngpK2YqKG8qcy11Kk0pLHRbM109LShyKihNKlMtcypoKS1lKihvKlMtdSpoKStjKihvKnMtdSpNKSksdFs0XT0tKGwqKGgqRC1TKngpLWkqKE0qRC1zKngpK0kqKE0qUy1zKmgpKSx0WzVdPW4qKGgqRC1TKngpLWkqKG8qRC11KngpK0kqKG8qUy11KmgpLHRbNl09LShuKihNKkQtcyp4KS1sKihvKkQtdSp4KStJKihvKnMtdSpNKSksdFs3XT1uKihNKlMtcypoKS1sKihvKlMtdSpoKStpKihvKnMtdSpNKSx0WzhdPWwqKGMqRC1TKmYpLWkqKGUqRC1zKmYpK0kqKGUqUy1zKmMpLHRbOV09LShuKihjKkQtUypmKS1pKihyKkQtdSpmKStJKihyKlMtdSpjKSksdFsxMF09biooZSpELXMqZiktbCoocipELXUqZikrSSoocipzLXUqZSksdFsxMV09LShuKihlKlMtcypjKS1sKihyKlMtdSpjKStpKihyKnMtdSplKSksdFsxMl09LShsKihjKngtaCpmKS1pKihlKngtTSpmKStJKihlKmgtTSpjKSksdFsxM109biooYyp4LWgqZiktaSoocip4LW8qZikrSSoocipoLW8qYyksdFsxNF09LShuKihlKngtTSpmKS1sKihyKngtbypmKStJKihyKk0tbyplKSksdFsxNV09biooZSpoLU0qYyktbCoocipoLW8qYykraSoocipNLW8qZSksdH0sby5TSU1ELmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbixyLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxuPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxyPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMik7cmV0dXJuIGk9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMCwxLDQsNSksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwwLDEsNCw1KSxsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaSxlLDAsMiw0LDYpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShlLGksMSwzLDUsNyksaT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwyLDMsNiw3KSxzPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDIsMyw2LDcpLE09U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShpLHMsMCwyLDQsNikscz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHMsaSwxLDMsNSw3KSxpPVNJTUQuRmxvYXQzMng0Lm11bChNLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLGM9U0lNRC5GbG9hdDMyeDQubXVsKGUsaSksaD1TSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxjKSxoPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxoKSxoPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaCwyLDMsMCwxKSxpPVNJTUQuRmxvYXQzMng0Lm11bChlLE0pLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLGM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLGMpLEk9U0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoYyxTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSksST1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsaSksSSksST1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKEksMiwzLDAsMSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDIsMywwLDEpLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLE09U0lNRC5GbG9hdDMyeDQuc3dpenpsZShNLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChNLGkpLGMpLFM9U0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoYyxTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSksUz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsaSksUyksUz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMiwzLDAsMSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobCxlKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxTPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxTKSxJPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSxJKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxTPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxTKSxJPVNJTUQuRmxvYXQzMng0LnN1YihJLFNJTUQuRmxvYXQzMng0Lm11bChNLGkpKSxpPVNJTUQuRmxvYXQzMng0Lm11bChsLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLGg9U0lNRC5GbG9hdDMyeDQuc3ViKGgsU0lNRC5GbG9hdDMyeDQubXVsKE0saSkpLFM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChlLGkpLFMpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGg9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChNLGkpLGgpLFM9U0lNRC5GbG9hdDMyeDQuc3ViKFMsU0lNRC5GbG9hdDMyeDQubXVsKGUsaSkpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGwsTSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksaD1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksaCksST1TSU1ELkZsb2F0MzJ4NC5zdWIoSSxTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksaD1TSU1ELkZsb2F0MzJ4NC5zdWIoaCxTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSksST1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKGUsaSksSSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLGMpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxoKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsUyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixJKSx0fSxvLmFkam9pbnQ9ci5VU0VfU0lNRD9vLlNJTUQuYWRqb2ludDpvLnNjYWxhci5hZGpvaW50LG8uZGV0ZXJtaW5hbnQ9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXSx1PXRbNF0sbD10WzVdLGU9dFs2XSxNPXRbN10scz10WzhdLGk9dFs5XSxjPXRbMTBdLGg9dFsxMV0sUz10WzEyXSxJPXRbMTNdLGY9dFsxNF0seD10WzE1XSxEPWEqbC1uKnUsRj1hKmUtcip1LG09YSpNLW8qdSxkPW4qZS1yKmwsYj1uKk0tbypsLHY9cipNLW8qZSx6PXMqSS1pKlMscD1zKmYtYypTLHc9cyp4LWgqUyxFPWkqZi1jKkksQT1pKngtaCpJLFA9Yyp4LWgqZjtyZXR1cm4gRCpQLUYqQSttKkUrZCp3LWIqcCt2Knp9LG8uU0lNRC5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKSxlPVNJTUQuRmxvYXQzMng0LmxvYWQobiwwKSxNPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDAsMCwwLDApLHIpLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDEsMSwxLDEpLG8pLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDIsMiwyLDIpLHUpLFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMywzLDMsMyksbCkpKSk7U0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLE0pO3ZhciBzPVNJTUQuRmxvYXQzMng0LmxvYWQobiw0KSxpPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDAsMCwwLDApLHIpLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDEsMSwxLDEpLG8pLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDIsMiwyLDIpLHUpLFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMywzLDMsMyksbCkpKSk7U0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LGkpO3ZhciBjPVNJTUQuRmxvYXQzMng0LmxvYWQobiw4KSxoPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDAsMCwwLDApLHIpLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDEsMSwxLDEpLG8pLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDIsMiwyLDIpLHUpLFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMywzLDMsMyksbCkpKSk7U0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LGgpO3ZhciBTPVNJTUQuRmxvYXQzMng0LmxvYWQobiwxMiksST1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDMsMywzLDMpLGwpKSkpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLEkpLHR9LG8uc2NhbGFyLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1hWzldLFM9YVsxMF0sST1hWzExXSxmPWFbMTJdLHg9YVsxM10sRD1hWzE0XSxGPWFbMTVdLG09blswXSxkPW5bMV0sYj1uWzJdLHY9blszXTtyZXR1cm4gdFswXT1tKnIrZCplK2IqYyt2KmYsdFsxXT1tKm8rZCpNK2IqaCt2KngsdFsyXT1tKnUrZCpzK2IqUyt2KkQsdFszXT1tKmwrZCppK2IqSSt2KkYsbT1uWzRdLGQ9bls1XSxiPW5bNl0sdj1uWzddLHRbNF09bSpyK2QqZStiKmMrdipmLHRbNV09bSpvK2QqTStiKmgrdip4LHRbNl09bSp1K2QqcytiKlMrdipELHRbN109bSpsK2QqaStiKkkrdipGLG09bls4XSxkPW5bOV0sYj1uWzEwXSx2PW5bMTFdLHRbOF09bSpyK2QqZStiKmMrdipmLHRbOV09bSpvK2QqTStiKmgrdip4LHRbMTBdPW0qdStkKnMrYipTK3YqRCx0WzExXT1tKmwrZCppK2IqSSt2KkYsbT1uWzEyXSxkPW5bMTNdLGI9blsxNF0sdj1uWzE1XSx0WzEyXT1tKnIrZCplK2IqYyt2KmYsdFsxM109bSpvK2QqTStiKmgrdip4LHRbMTRdPW0qdStkKnMrYipTK3YqRCx0WzE1XT1tKmwrZCppK2IqSSt2KkYsdH0sby5tdWx0aXBseT1yLlVTRV9TSU1EP28uU0lNRC5tdWx0aXBseTpvLnNjYWxhci5tdWx0aXBseSxvLm11bD1vLm11bHRpcGx5LG8uc2NhbGFyLnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHIsbyx1LGwsZSxNLHMsaSxjLGgsUyxJLGY9blswXSx4PW5bMV0sRD1uWzJdO3JldHVybiBhPT09dD8odFsxMl09YVswXSpmK2FbNF0qeCthWzhdKkQrYVsxMl0sdFsxM109YVsxXSpmK2FbNV0qeCthWzldKkQrYVsxM10sdFsxNF09YVsyXSpmK2FbNl0qeCthWzEwXSpEK2FbMTRdLHRbMTVdPWFbM10qZithWzddKngrYVsxMV0qRCthWzE1XSk6KHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9YVs5XSxTPWFbMTBdLEk9YVsxMV0sdFswXT1yLHRbMV09byx0WzJdPXUsdFszXT1sLHRbNF09ZSx0WzVdPU0sdFs2XT1zLHRbN109aSx0WzhdPWMsdFs5XT1oLHRbMTBdPVMsdFsxMV09SSx0WzEyXT1yKmYrZSp4K2MqRCthWzEyXSx0WzEzXT1vKmYrTSp4K2gqRCthWzEzXSx0WzE0XT11KmYrcyp4K1MqRCthWzE0XSx0WzE1XT1sKmYraSp4K0kqRCthWzE1XSksdH0sby5TSU1ELnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKSxlPVNJTUQuRmxvYXQzMng0KG5bMF0sblsxXSxuWzJdLDApO2EhPT10JiYodFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdFs5XT1hWzldLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTFdKSxyPVNJTUQuRmxvYXQzMng0Lm11bChyLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwwLDAsMCwwKSksbz1TSU1ELkZsb2F0MzJ4NC5tdWwobyxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMSwxLDEsMSkpLHU9U0lNRC5GbG9hdDMyeDQubXVsKHUsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDIsMiwyLDIpKTt2YXIgTT1TSU1ELkZsb2F0MzJ4NC5hZGQocixTSU1ELkZsb2F0MzJ4NC5hZGQobyxTSU1ELkZsb2F0MzJ4NC5hZGQodSxsKSkpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLE0pLHR9LG8udHJhbnNsYXRlPXIuVVNFX1NJTUQ/by5TSU1ELnRyYW5zbGF0ZTpvLnNjYWxhci50cmFuc2xhdGUsby5zY2FsYXIuc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPW5bMF0sbz1uWzFdLHU9blsyXTtyZXR1cm4gdFswXT1hWzBdKnIsdFsxXT1hWzFdKnIsdFsyXT1hWzJdKnIsdFszXT1hWzNdKnIsdFs0XT1hWzRdKm8sdFs1XT1hWzVdKm8sdFs2XT1hWzZdKm8sdFs3XT1hWzddKm8sdFs4XT1hWzhdKnUsdFs5XT1hWzldKnUsdFsxMF09YVsxMF0qdSx0WzExXT1hWzExXSp1LHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdLHR9LG8uU0lNRC5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHIsbyx1LGw9U0lNRC5GbG9hdDMyeDQoblswXSxuWzFdLG5bMl0sMCk7cmV0dXJuIHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxTSU1ELkZsb2F0MzJ4NC5tdWwocixTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMCwwLDAsMCkpKSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQubXVsKG8sU0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMSwxLDEpKSksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0Lm11bCh1LFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDIsMiwyKSkpLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdLHR9LG8uc2NhbGU9ci5VU0VfU0lNRD9vLlNJTUQuc2NhbGU6by5zY2FsYXIuc2NhbGUsby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4sbyl7dmFyIHUsbCxlLE0scyxpLGMsaCxTLEksZix4LEQsRixtLGQsYix2LHoscCx3LEUsQSxQLEw9b1swXSxxPW9bMV0sUj1vWzJdLE49TWF0aC5zcXJ0KEwqTCtxKnErUipSKTtyZXR1cm4gTWF0aC5hYnMoTik8ci5FUFNJTE9OP251bGw6KE49MS9OLEwqPU4scSo9TixSKj1OLHU9TWF0aC5zaW4obiksbD1NYXRoLmNvcyhuKSxlPTEtbCxNPWFbMF0scz1hWzFdLGk9YVsyXSxjPWFbM10saD1hWzRdLFM9YVs1XSxJPWFbNl0sZj1hWzddLHg9YVs4XSxEPWFbOV0sRj1hWzEwXSxtPWFbMTFdLGQ9TCpMKmUrbCxiPXEqTCplK1IqdSx2PVIqTCplLXEqdSx6PUwqcSplLVIqdSxwPXEqcSplK2wsdz1SKnEqZStMKnUsRT1MKlIqZStxKnUsQT1xKlIqZS1MKnUsUD1SKlIqZStsLHRbMF09TSpkK2gqYit4KnYsdFsxXT1zKmQrUypiK0Qqdix0WzJdPWkqZCtJKmIrRip2LHRbM109YypkK2YqYittKnYsdFs0XT1NKnoraCpwK3gqdyx0WzVdPXMqeitTKnArRCp3LHRbNl09aSp6K0kqcCtGKncsdFs3XT1jKnorZipwK20qdyx0WzhdPU0qRStoKkEreCpQLHRbOV09cypFK1MqQStEKlAsdFsxMF09aSpFK0kqQStGKlAsdFsxMV09YypFK2YqQSttKlAsYSE9PXQmJih0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSksdCl9LG8uc2NhbGFyLnJvdGF0ZVg9ZnVuY3Rpb24odCxhLG4pe3ZhciByPU1hdGguc2luKG4pLG89TWF0aC5jb3MobiksdT1hWzRdLGw9YVs1XSxlPWFbNl0sTT1hWzddLHM9YVs4XSxpPWFbOV0sYz1hWzEwXSxoPWFbMTFdO3JldHVybiBhIT09dCYmKHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSksdFs0XT11Km8rcypyLHRbNV09bCpvK2kqcix0WzZdPWUqbytjKnIsdFs3XT1NKm8raCpyLHRbOF09cypvLXUqcix0WzldPWkqby1sKnIsdFsxMF09YypvLWUqcix0WzExXT1oKm8tTSpyLHR9LG8uU0lNRC5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihuKSksbz1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLmNvcyhuKSk7YSE9PXQmJih0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pO3ZhciB1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxyKSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsbyksU0lNRC5GbG9hdDMyeDQubXVsKHUscikpKSx0fSxvLnJvdGF0ZVg9ci5VU0VfU0lNRD9vLlNJTUQucm90YXRlWDpvLnNjYWxhci5yb3RhdGVYLG8uc2NhbGFyLnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPU1hdGguc2luKG4pLG89TWF0aC5jb3MobiksdT1hWzBdLGw9YVsxXSxlPWFbMl0sTT1hWzNdLHM9YVs4XSxpPWFbOV0sYz1hWzEwXSxoPWFbMTFdO3JldHVybiBhIT09dCYmKHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSksdFswXT11Km8tcypyLHRbMV09bCpvLWkqcix0WzJdPWUqby1jKnIsdFszXT1NKm8taCpyLHRbOF09dSpyK3Mqbyx0WzldPWwqcitpKm8sdFsxMF09ZSpyK2Mqbyx0WzExXT1NKnIraCpvLHR9LG8uU0lNRC5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihuKSksbz1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLmNvcyhuKSk7YSE9PXQmJih0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pO3ZhciB1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwodSxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxyKSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsciksU0lNRC5GbG9hdDMyeDQubXVsKGwsbykpKSx0fSxvLnJvdGF0ZVk9ci5VU0VfU0lNRD9vLlNJTUQucm90YXRlWTpvLnNjYWxhci5yb3RhdGVZLG8uc2NhbGFyLnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4pe3ZhciByPU1hdGguc2luKG4pLG89TWF0aC5jb3MobiksdT1hWzBdLGw9YVsxXSxlPWFbMl0sTT1hWzNdLHM9YVs0XSxpPWFbNV0sYz1hWzZdLGg9YVs3XTtyZXR1cm4gYSE9PXQmJih0WzhdPWFbOF0sdFs5XT1hWzldLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTFdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0WzBdPXUqbytzKnIsdFsxXT1sKm8raSpyLHRbMl09ZSpvK2Mqcix0WzNdPU0qbytoKnIsdFs0XT1zKm8tdSpyLHRbNV09aSpvLWwqcix0WzZdPWMqby1lKnIsdFs3XT1oKm8tTSpyLHR9LG8uU0lNRC5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihuKSksbz1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLmNvcyhuKSk7YSE9PXQmJih0WzhdPWFbOF0sdFs5XT1hWzldLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTFdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKTt2YXIgdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbyksU0lNRC5GbG9hdDMyeDQubXVsKGwscikpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLG8pLFNJTUQuRmxvYXQzMng0Lm11bCh1LHIpKSksdH0sby5yb3RhdGVaPXIuVVNFX1NJTUQ/by5TSU1ELnJvdGF0ZVo6by5zY2FsYXIucm90YXRlWixvLmZyb21UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09MSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPWFbMF0sdFsxM109YVsxXSx0WzE0XT1hWzJdLHRbMTVdPTEsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09YVsxXSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09YVsyXSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tUm90YXRpb249ZnVuY3Rpb24odCxhLG4pe3ZhciBvLHUsbCxlPW5bMF0sTT1uWzFdLHM9blsyXSxpPU1hdGguc3FydChlKmUrTSpNK3Mqcyk7cmV0dXJuIE1hdGguYWJzKGkpPHIuRVBTSUxPTj9udWxsOihpPTEvaSxlKj1pLE0qPWkscyo9aSxvPU1hdGguc2luKGEpLHU9TWF0aC5jb3MoYSksbD0xLXUsdFswXT1lKmUqbCt1LHRbMV09TSplKmwrcypvLHRbMl09cyplKmwtTSpvLHRbM109MCx0WzRdPWUqTSpsLXMqbyx0WzVdPU0qTSpsK3UsdFs2XT1zKk0qbCtlKm8sdFs3XT0wLHRbOF09ZSpzKmwrTSpvLHRbOV09TSpzKmwtZSpvLHRbMTBdPXMqcypsK3UsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHQpfSxvLmZyb21YUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09cix0WzZdPW4sdFs3XT0wLHRbOF09MCx0WzldPS1uLHRbMTBdPXIsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVlSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPTAsdFsyXT0tbix0WzNdPTAsdFs0XT0wLHRbNV09MSx0WzZdPTAsdFs3XT0wLHRbOF09bix0WzldPTAsdFsxMF09cix0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tWlJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPTAsdFszXT0wLHRbNF09LW4sdFs1XT1yLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9cityLE09bytvLHM9dSt1LGk9ciplLGM9cipNLGg9cipzLFM9bypNLEk9bypzLGY9dSpzLHg9bCplLEQ9bCpNLEY9bCpzO3JldHVybiB0WzBdPTEtKFMrZiksdFsxXT1jK0YsdFsyXT1oLUQsdFszXT0wLHRbNF09Yy1GLHRbNV09MS0oaStmKSx0WzZdPUkreCx0WzddPTAsdFs4XT1oK0QsdFs5XT1JLXgsdFsxMF09MS0oaStTKSx0WzExXT0wLHRbMTJdPW5bMF0sdFsxM109blsxXSx0WzE0XT1uWzJdLHRbMTVdPTEsdH0sby5nZXRUcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMTJdLHRbMV09YVsxM10sdFsyXT1hWzE0XSx0fSxvLmdldFJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSthWzVdK2FbMTBdLHI9MDtyZXR1cm4gbj4wPyhyPTIqTWF0aC5zcXJ0KG4rMSksdFszXT0uMjUqcix0WzBdPShhWzZdLWFbOV0pL3IsdFsxXT0oYVs4XS1hWzJdKS9yLHRbMl09KGFbMV0tYVs0XSkvcik6YVswXT5hWzVdJmFbMF0+YVsxMF0/KHI9MipNYXRoLnNxcnQoMSthWzBdLWFbNV0tYVsxMF0pLHRbM109KGFbNl0tYVs5XSkvcix0WzBdPS4yNSpyLHRbMV09KGFbMV0rYVs0XSkvcix0WzJdPShhWzhdK2FbMl0pL3IpOmFbNV0+YVsxMF0/KHI9MipNYXRoLnNxcnQoMSthWzVdLWFbMF0tYVsxMF0pLHRbM109KGFbOF0tYVsyXSkvcix0WzBdPShhWzFdK2FbNF0pL3IsdFsxXT0uMjUqcix0WzJdPShhWzZdK2FbOV0pL3IpOihyPTIqTWF0aC5zcXJ0KDErYVsxMF0tYVswXS1hWzVdKSx0WzNdPShhWzFdLWFbNF0pL3IsdFswXT0oYVs4XSthWzJdKS9yLHRbMV09KGFbNl0rYVs5XSkvcix0WzJdPS4yNSpyKSx0fSxvLmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGU9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV0sbD1hWzJdLGU9YVszXSxNPW8rbyxzPXUrdSxpPWwrbCxjPW8qTSxoPW8qcyxTPW8qaSxJPXUqcyxmPXUqaSx4PWwqaSxEPWUqTSxGPWUqcyxtPWUqaSxkPXJbMF0sYj1yWzFdLHY9clsyXTtyZXR1cm4gdFswXT0oMS0oSSt4KSkqZCx0WzFdPShoK20pKmQsdFsyXT0oUy1GKSpkLHRbM109MCx0WzRdPShoLW0pKmIsdFs1XT0oMS0oYyt4KSkqYix0WzZdPShmK0QpKmIsdFs3XT0wLHRbOF09KFMrRikqdix0WzldPShmLUQpKnYsdFsxMF09KDEtKGMrSSkpKnYsdFsxMV09MCx0WzEyXT1uWzBdLHRbMTNdPW5bMV0sdFsxNF09blsyXSx0WzE1XT0xLHR9LG8uZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZU9yaWdpbj1mdW5jdGlvbih0LGEsbixyLG8pe1xyXG4gICAgdmFyIHU9YVswXSxsPWFbMV0sZT1hWzJdLE09YVszXSxzPXUrdSxpPWwrbCxjPWUrZSxoPXUqcyxTPXUqaSxJPXUqYyxmPWwqaSx4PWwqYyxEPWUqYyxGPU0qcyxtPU0qaSxkPU0qYyxiPXJbMF0sdj1yWzFdLHo9clsyXSxwPW9bMF0sdz1vWzFdLEU9b1syXTtyZXR1cm4gdFswXT0oMS0oZitEKSkqYix0WzFdPShTK2QpKmIsdFsyXT0oSS1tKSpiLHRbM109MCx0WzRdPShTLWQpKnYsdFs1XT0oMS0oaCtEKSkqdix0WzZdPSh4K0YpKnYsdFs3XT0wLHRbOF09KEkrbSkqeix0WzldPSh4LUYpKnosdFsxMF09KDEtKGgrZikpKnosdFsxMV09MCx0WzEyXT1uWzBdK3AtKHRbMF0qcCt0WzRdKncrdFs4XSpFKSx0WzEzXT1uWzFdK3ctKHRbMV0qcCt0WzVdKncrdFs5XSpFKSx0WzE0XT1uWzJdK0UtKHRbMl0qcCt0WzZdKncrdFsxMF0qRSksdFsxNV09MSx0fSxvLmZyb21RdWF0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4rbixlPXIrcixNPW8rbyxzPW4qbCxpPXIqbCxjPXIqZSxoPW8qbCxTPW8qZSxJPW8qTSxmPXUqbCx4PXUqZSxEPXUqTTtyZXR1cm4gdFswXT0xLWMtSSx0WzFdPWkrRCx0WzJdPWgteCx0WzNdPTAsdFs0XT1pLUQsdFs1XT0xLXMtSSx0WzZdPVMrZix0WzddPTAsdFs4XT1oK3gsdFs5XT1TLWYsdFsxMF09MS1zLWMsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJ1c3R1bT1mdW5jdGlvbih0LGEsbixyLG8sdSxsKXt2YXIgZT0xLyhuLWEpLE09MS8oby1yKSxzPTEvKHUtbCk7cmV0dXJuIHRbMF09Mip1KmUsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09Mip1Kk0sdFs2XT0wLHRbN109MCx0WzhdPShuK2EpKmUsdFs5XT0obytyKSpNLHRbMTBdPShsK3UpKnMsdFsxMV09LTEsdFsxMl09MCx0WzEzXT0wLHRbMTRdPWwqdSoyKnMsdFsxNV09MCx0fSxvLnBlcnNwZWN0aXZlPWZ1bmN0aW9uKHQsYSxuLHIsbyl7dmFyIHU9MS9NYXRoLnRhbihhLzIpLGw9MS8oci1vKTtyZXR1cm4gdFswXT11L24sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09dSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09KG8rcikqbCx0WzExXT0tMSx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MipvKnIqbCx0WzE1XT0wLHR9LG8ucGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXc9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89TWF0aC50YW4oYS51cERlZ3JlZXMqTWF0aC5QSS8xODApLHU9TWF0aC50YW4oYS5kb3duRGVncmVlcypNYXRoLlBJLzE4MCksbD1NYXRoLnRhbihhLmxlZnREZWdyZWVzKk1hdGguUEkvMTgwKSxlPU1hdGgudGFuKGEucmlnaHREZWdyZWVzKk1hdGguUEkvMTgwKSxNPTIvKGwrZSkscz0yLyhvK3UpO3JldHVybiB0WzBdPU0sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09cyx0WzZdPTAsdFs3XT0wLHRbOF09LSgobC1lKSpNKi41KSx0WzldPShvLXUpKnMqLjUsdFsxMF09ci8obi1yKSx0WzExXT0tMSx0WzEyXT0wLHRbMTNdPTAsdFsxNF09cipuLyhuLXIpLHRbMTVdPTAsdH0sby5vcnRobz1mdW5jdGlvbih0LGEsbixyLG8sdSxsKXt2YXIgZT0xLyhhLW4pLE09MS8oci1vKSxzPTEvKHUtbCk7cmV0dXJuIHRbMF09LTIqZSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0tMipNLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0yKnMsdFsxMV09MCx0WzEyXT0oYStuKSplLHRbMTNdPShvK3IpKk0sdFsxNF09KGwrdSkqcyx0WzE1XT0xLHR9LG8ubG9va0F0PWZ1bmN0aW9uKHQsYSxuLHUpe3ZhciBsLGUsTSxzLGksYyxoLFMsSSxmLHg9YVswXSxEPWFbMV0sRj1hWzJdLG09dVswXSxkPXVbMV0sYj11WzJdLHY9blswXSx6PW5bMV0scD1uWzJdO3JldHVybiBNYXRoLmFicyh4LXYpPHIuRVBTSUxPTiYmTWF0aC5hYnMoRC16KTxyLkVQU0lMT04mJk1hdGguYWJzKEYtcCk8ci5FUFNJTE9OP28uaWRlbnRpdHkodCk6KGg9eC12LFM9RC16LEk9Ri1wLGY9MS9NYXRoLnNxcnQoaCpoK1MqUytJKkkpLGgqPWYsUyo9ZixJKj1mLGw9ZCpJLWIqUyxlPWIqaC1tKkksTT1tKlMtZCpoLGY9TWF0aC5zcXJ0KGwqbCtlKmUrTSpNKSxmPyhmPTEvZixsKj1mLGUqPWYsTSo9Zik6KGw9MCxlPTAsTT0wKSxzPVMqTS1JKmUsaT1JKmwtaCpNLGM9aCplLVMqbCxmPU1hdGguc3FydChzKnMraSppK2MqYyksZj8oZj0xL2Yscyo9ZixpKj1mLGMqPWYpOihzPTAsaT0wLGM9MCksdFswXT1sLHRbMV09cyx0WzJdPWgsdFszXT0wLHRbNF09ZSx0WzVdPWksdFs2XT1TLHRbN109MCx0WzhdPU0sdFs5XT1jLHRbMTBdPUksdFsxMV09MCx0WzEyXT0tKGwqeCtlKkQrTSpGKSx0WzEzXT0tKHMqeCtpKkQrYypGKSx0WzE0XT0tKGgqeCtTKkQrSSpGKSx0WzE1XT0xLHQpfSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIiwgXCIrdFs0XStcIiwgXCIrdFs1XStcIiwgXCIrdFs2XStcIiwgXCIrdFs3XStcIiwgXCIrdFs4XStcIiwgXCIrdFs5XStcIiwgXCIrdFsxMF0rXCIsIFwiK3RbMTFdK1wiLCBcIit0WzEyXStcIiwgXCIrdFsxM10rXCIsIFwiK3RbMTRdK1wiLCBcIit0WzE1XStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKStNYXRoLnBvdyh0WzRdLDIpK01hdGgucG93KHRbNV0sMikrTWF0aC5wb3codFs2XSwyKStNYXRoLnBvdyh0WzddLDIpK01hdGgucG93KHRbOF0sMikrTWF0aC5wb3codFs5XSwyKStNYXRoLnBvdyh0WzEwXSwyKStNYXRoLnBvdyh0WzExXSwyKStNYXRoLnBvdyh0WzEyXSwyKStNYXRoLnBvdyh0WzEzXSwyKStNYXRoLnBvdyh0WzE0XSwyKStNYXRoLnBvdyh0WzE1XSwyKSl9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdFs0XT1hWzRdK25bNF0sdFs1XT1hWzVdK25bNV0sdFs2XT1hWzZdK25bNl0sdFs3XT1hWzddK25bN10sdFs4XT1hWzhdK25bOF0sdFs5XT1hWzldK25bOV0sdFsxMF09YVsxMF0rblsxMF0sdFsxMV09YVsxMV0rblsxMV0sdFsxMl09YVsxMl0rblsxMl0sdFsxM109YVsxM10rblsxM10sdFsxNF09YVsxNF0rblsxNF0sdFsxNV09YVsxNV0rblsxNV0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHRbNF09YVs0XS1uWzRdLHRbNV09YVs1XS1uWzVdLHRbNl09YVs2XS1uWzZdLHRbN109YVs3XS1uWzddLHRbOF09YVs4XS1uWzhdLHRbOV09YVs5XS1uWzldLHRbMTBdPWFbMTBdLW5bMTBdLHRbMTFdPWFbMTFdLW5bMTFdLHRbMTJdPWFbMTJdLW5bMTJdLHRbMTNdPWFbMTNdLW5bMTNdLHRbMTRdPWFbMTRdLW5bMTRdLHRbMTVdPWFbMTVdLW5bMTVdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHRbNF09YVs0XSpuLHRbNV09YVs1XSpuLHRbNl09YVs2XSpuLHRbN109YVs3XSpuLHRbOF09YVs4XSpuLHRbOV09YVs5XSpuLHRbMTBdPWFbMTBdKm4sdFsxMV09YVsxMV0qbix0WzEyXT1hWzEyXSpuLHRbMTNdPWFbMTNdKm4sdFsxNF09YVsxNF0qbix0WzE1XT1hWzE1XSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdFs0XT1hWzRdK25bNF0qcix0WzVdPWFbNV0rbls1XSpyLHRbNl09YVs2XStuWzZdKnIsdFs3XT1hWzddK25bN10qcix0WzhdPWFbOF0rbls4XSpyLHRbOV09YVs5XStuWzldKnIsdFsxMF09YVsxMF0rblsxMF0qcix0WzExXT1hWzExXStuWzExXSpyLHRbMTJdPWFbMTJdK25bMTJdKnIsdFsxM109YVsxM10rblsxM10qcix0WzE0XT1hWzE0XStuWzE0XSpyLHRbMTVdPWFbMTVdK25bMTVdKnIsdH0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXSYmdFs0XT09PWFbNF0mJnRbNV09PT1hWzVdJiZ0WzZdPT09YVs2XSYmdFs3XT09PWFbN10mJnRbOF09PT1hWzhdJiZ0WzldPT09YVs5XSYmdFsxMF09PT1hWzEwXSYmdFsxMV09PT1hWzExXSYmdFsxMl09PT1hWzEyXSYmdFsxM109PT1hWzEzXSYmdFsxNF09PT1hWzE0XSYmdFsxNV09PT1hWzE1XX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9dFs0XSxNPXRbNV0scz10WzZdLGk9dFs3XSxjPXRbOF0saD10WzldLFM9dFsxMF0sST10WzExXSxmPXRbMTJdLHg9dFsxM10sRD10WzE0XSxGPXRbMTVdLG09YVswXSxkPWFbMV0sYj1hWzJdLHY9YVszXSx6PWFbNF0scD1hWzVdLHc9YVs2XSxFPWFbN10sQT1hWzhdLFA9YVs5XSxMPWFbMTBdLHE9YVsxMV0sUj1hWzEyXSxOPWFbMTNdLE89YVsxNF0sWT1hWzE1XTtyZXR1cm4gTWF0aC5hYnMobi1tKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMobSkpJiZNYXRoLmFicyhvLWQpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhkKSkmJk1hdGguYWJzKHUtYik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKGIpKSYmTWF0aC5hYnMobC12KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnModikpJiZNYXRoLmFicyhlLXopPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhlKSxNYXRoLmFicyh6KSkmJk1hdGguYWJzKE0tcCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKE0pLE1hdGguYWJzKHApKSYmTWF0aC5hYnMocy13KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMocyksTWF0aC5hYnModykpJiZNYXRoLmFicyhpLUUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhpKSxNYXRoLmFicyhFKSkmJk1hdGguYWJzKGMtQSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGMpLE1hdGguYWJzKEEpKSYmTWF0aC5hYnMoaC1QKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoaCksTWF0aC5hYnMoUCkpJiZNYXRoLmFicyhTLUwpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhTKSxNYXRoLmFicyhMKSkmJk1hdGguYWJzKEktcSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKEkpLE1hdGguYWJzKHEpKSYmTWF0aC5hYnMoZi1SKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZiksTWF0aC5hYnMoUikpJiZNYXRoLmFicyh4LU4pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh4KSxNYXRoLmFicyhOKSkmJk1hdGguYWJzKEQtTyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKEQpLE1hdGguYWJzKE8pKSYmTWF0aC5hYnMoRi1ZKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoRiksTWF0aC5hYnMoWSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz1uKDQpLHU9big3KSxsPW4oOCksZT17fTtlLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxlLnJvdGF0aW9uVG89ZnVuY3Rpb24oKXt2YXIgdD11LmNyZWF0ZSgpLGE9dS5mcm9tVmFsdWVzKDEsMCwwKSxuPXUuZnJvbVZhbHVlcygwLDEsMCk7cmV0dXJuIGZ1bmN0aW9uKHIsbyxsKXt2YXIgTT11LmRvdChvLGwpO3JldHVybi0uOTk5OTk5Pk0/KHUuY3Jvc3ModCxhLG8pLHUubGVuZ3RoKHQpPDFlLTYmJnUuY3Jvc3ModCxuLG8pLHUubm9ybWFsaXplKHQsdCksZS5zZXRBeGlzQW5nbGUocix0LE1hdGguUEkpLHIpOk0+Ljk5OTk5OT8oclswXT0wLHJbMV09MCxyWzJdPTAsclszXT0xLHIpOih1LmNyb3NzKHQsbyxsKSxyWzBdPXRbMF0sclsxXT10WzFdLHJbMl09dFsyXSxyWzNdPTErTSxlLm5vcm1hbGl6ZShyLHIpKX19KCksZS5zZXRBeGVzPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyl7cmV0dXJuIHRbMF09clswXSx0WzNdPXJbMV0sdFs2XT1yWzJdLHRbMV09b1swXSx0WzRdPW9bMV0sdFs3XT1vWzJdLHRbMl09LW5bMF0sdFs1XT0tblsxXSx0WzhdPS1uWzJdLGUubm9ybWFsaXplKGEsZS5mcm9tTWF0MyhhLHQpKX19KCksZS5jbG9uZT1sLmNsb25lLGUuZnJvbVZhbHVlcz1sLmZyb21WYWx1ZXMsZS5jb3B5PWwuY29weSxlLnNldD1sLnNldCxlLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0WzNdPTEsdH0sZS5zZXRBeGlzQW5nbGU9ZnVuY3Rpb24odCxhLG4pe249LjUqbjt2YXIgcj1NYXRoLnNpbihuKTtyZXR1cm4gdFswXT1yKmFbMF0sdFsxXT1yKmFbMV0sdFsyXT1yKmFbMl0sdFszXT1NYXRoLmNvcyhuKSx0fSxlLmdldEF4aXNBbmdsZT1mdW5jdGlvbih0LGEpe3ZhciBuPTIqTWF0aC5hY29zKGFbM10pLHI9TWF0aC5zaW4obi8yKTtyZXR1cm4gMCE9cj8odFswXT1hWzBdL3IsdFsxXT1hWzFdL3IsdFsyXT1hWzJdL3IpOih0WzBdPTEsdFsxXT0wLHRbMl09MCksbn0sZS5hZGQ9bC5hZGQsZS5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPW5bMF0sTT1uWzFdLHM9blsyXSxpPW5bM107cmV0dXJuIHRbMF09cippK2wqZStvKnMtdSpNLHRbMV09byppK2wqTSt1KmUtcipzLHRbMl09dSppK2wqcytyKk0tbyplLHRbM109bCppLXIqZS1vKk0tdSpzLHR9LGUubXVsPWUubXVsdGlwbHksZS5zY2FsZT1sLnNjYWxlLGUucm90YXRlWD1mdW5jdGlvbih0LGEsbil7bio9LjU7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNK2wqZSx0WzFdPW8qTSt1KmUsdFsyXT11Kk0tbyplLHRbM109bCpNLXIqZSx0fSxlLnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4pe24qPS41O3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTS11KmUsdFsxXT1vKk0rbCplLHRbMl09dSpNK3IqZSx0WzNdPWwqTS1vKmUsdH0sZS5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuKXtuKj0uNTt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0rbyplLHRbMV09bypNLXIqZSx0WzJdPXUqTStsKmUsdFszXT1sKk0tdSplLHR9LGUuY2FsY3VsYXRlVz1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXTtyZXR1cm4gdFswXT1uLHRbMV09cix0WzJdPW8sdFszXT1NYXRoLnNxcnQoTWF0aC5hYnMoMS1uKm4tcipyLW8qbykpLHR9LGUuZG90PWwuZG90LGUubGVycD1sLmxlcnAsZS5zbGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbyx1LGwsZSxNLHM9YVswXSxpPWFbMV0sYz1hWzJdLGg9YVszXSxTPW5bMF0sST1uWzFdLGY9blsyXSx4PW5bM107cmV0dXJuIHU9cypTK2kqSStjKmYraCp4LDA+dSYmKHU9LXUsUz0tUyxJPS1JLGY9LWYseD0teCksMS11PjFlLTY/KG89TWF0aC5hY29zKHUpLGw9TWF0aC5zaW4obyksZT1NYXRoLnNpbigoMS1yKSpvKS9sLE09TWF0aC5zaW4ocipvKS9sKTooZT0xLXIsTT1yKSx0WzBdPWUqcytNKlMsdFsxXT1lKmkrTSpJLHRbMl09ZSpjK00qZix0WzNdPWUqaCtNKngsdH0sZS5zcWxlcnA9ZnVuY3Rpb24oKXt2YXIgdD1lLmNyZWF0ZSgpLGE9ZS5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24obixyLG8sdSxsLE0pe3JldHVybiBlLnNsZXJwKHQscixsLE0pLGUuc2xlcnAoYSxvLHUsTSksZS5zbGVycChuLHQsYSwyKk0qKDEtTSkpLG59fSgpLGUuaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4qbityKnIrbypvK3UqdSxlPWw/MS9sOjA7cmV0dXJuIHRbMF09LW4qZSx0WzFdPS1yKmUsdFsyXT0tbyplLHRbM109dSplLHR9LGUuY29uanVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHRbM109YVszXSx0fSxlLmxlbmd0aD1sLmxlbmd0aCxlLmxlbj1lLmxlbmd0aCxlLnNxdWFyZWRMZW5ndGg9bC5zcXVhcmVkTGVuZ3RoLGUuc3FyTGVuPWUuc3F1YXJlZExlbmd0aCxlLm5vcm1hbGl6ZT1sLm5vcm1hbGl6ZSxlLmZyb21NYXQzPWZ1bmN0aW9uKHQsYSl7dmFyIG4scj1hWzBdK2FbNF0rYVs4XTtpZihyPjApbj1NYXRoLnNxcnQocisxKSx0WzNdPS41Km4sbj0uNS9uLHRbMF09KGFbNV0tYVs3XSkqbix0WzFdPShhWzZdLWFbMl0pKm4sdFsyXT0oYVsxXS1hWzNdKSpuO2Vsc2V7dmFyIG89MDthWzRdPmFbMF0mJihvPTEpLGFbOF0+YVszKm8rb10mJihvPTIpO3ZhciB1PShvKzEpJTMsbD0obysyKSUzO249TWF0aC5zcXJ0KGFbMypvK29dLWFbMyp1K3VdLWFbMypsK2xdKzEpLHRbb109LjUqbixuPS41L24sdFszXT0oYVszKnUrbF0tYVszKmwrdV0pKm4sdFt1XT0oYVszKnUrb10rYVszKm8rdV0pKm4sdFtsXT0oYVszKmwrb10rYVszKm8rbF0pKm59cmV0dXJuIHR9LGUuc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwicXVhdChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiKVwifSxlLmV4YWN0RXF1YWxzPWwuZXhhY3RFcXVhbHMsZS5lcXVhbHM9bC5lcXVhbHMsdC5leHBvcnRzPWV9LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDMpO3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoMyk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGF9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbil7dmFyIG89bmV3IHIuQVJSQVlfVFlQRSgzKTtyZXR1cm4gb1swXT10LG9bMV09YSxvWzJdPW4sb30sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHR9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0fSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qblswXSx0WzFdPWFbMV0qblsxXSx0WzJdPWFbMl0qblsyXSx0fSxvLm11bD1vLm11bHRpcGx5LG8uZGl2aWRlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdL25bMF0sdFsxXT1hWzFdL25bMV0sdFsyXT1hWzJdL25bMl0sdH0sby5kaXY9by5kaXZpZGUsby5jZWlsPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5jZWlsKGFbMF0pLHRbMV09TWF0aC5jZWlsKGFbMV0pLHRbMl09TWF0aC5jZWlsKGFbMl0pLHR9LG8uZmxvb3I9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmZsb29yKGFbMF0pLHRbMV09TWF0aC5mbG9vcihhWzFdKSx0WzJdPU1hdGguZmxvb3IoYVsyXSksdH0sby5taW49ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWluKGFbMF0sblswXSksdFsxXT1NYXRoLm1pbihhWzFdLG5bMV0pLHRbMl09TWF0aC5taW4oYVsyXSxuWzJdKSx0fSxvLm1heD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5tYXgoYVswXSxuWzBdKSx0WzFdPU1hdGgubWF4KGFbMV0sblsxXSksdFsyXT1NYXRoLm1heChhWzJdLG5bMl0pLHR9LG8ucm91bmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLnJvdW5kKGFbMF0pLHRbMV09TWF0aC5yb3VuZChhWzFdKSx0WzJdPU1hdGgucm91bmQoYVsyXSksdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHR9LG8uc2NhbGVBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHR9LG8uZGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl07cmV0dXJuIE1hdGguc3FydChuKm4rcipyK28qbyl9LG8uZGlzdD1vLmRpc3RhbmNlLG8uc3F1YXJlZERpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdO3JldHVybiBuKm4rcipyK28qb30sby5zcXJEaXN0PW8uc3F1YXJlZERpc3RhbmNlLG8ubGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXTtyZXR1cm4gTWF0aC5zcXJ0KGEqYStuKm4rcipyKX0sby5sZW49by5sZW5ndGgsby5zcXVhcmVkTGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXTtyZXR1cm4gYSphK24qbityKnJ9LG8uc3FyTGVuPW8uc3F1YXJlZExlbmd0aCxvLm5lZ2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0fSxvLmludmVyc2U9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xL2FbMF0sdFsxXT0xL2FbMV0sdFsyXT0xL2FbMl0sdH0sby5ub3JtYWxpemU9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1uKm4rcipyK28qbztyZXR1cm4gdT4wJiYodT0xL01hdGguc3FydCh1KSx0WzBdPWFbMF0qdSx0WzFdPWFbMV0qdSx0WzJdPWFbMl0qdSksdH0sby5kb3Q9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXSphWzBdK3RbMV0qYVsxXSt0WzJdKmFbMl19LG8uY3Jvc3M9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bMF0sZT1uWzFdLE09blsyXTtyZXR1cm4gdFswXT1vKk0tdSplLHRbMV09dSpsLXIqTSx0WzJdPXIqZS1vKmwsdH0sby5sZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdLGw9YVsyXTtyZXR1cm4gdFswXT1vK3IqKG5bMF0tbyksdFsxXT11K3IqKG5bMV0tdSksdFsyXT1sK3IqKG5bMl0tbCksdH0sby5oZXJtaXRlPWZ1bmN0aW9uKHQsYSxuLHIsbyx1KXt2YXIgbD11KnUsZT1sKigyKnUtMykrMSxNPWwqKHUtMikrdSxzPWwqKHUtMSksaT1sKigzLTIqdSk7cmV0dXJuIHRbMF09YVswXSplK25bMF0qTStyWzBdKnMrb1swXSppLHRbMV09YVsxXSplK25bMV0qTStyWzFdKnMrb1sxXSppLHRbMl09YVsyXSplK25bMl0qTStyWzJdKnMrb1syXSppLHR9LG8uYmV6aWVyPWZ1bmN0aW9uKHQsYSxuLHIsbyx1KXt2YXIgbD0xLXUsZT1sKmwsTT11KnUscz1lKmwsaT0zKnUqZSxjPTMqTSpsLGg9TSp1O3JldHVybiB0WzBdPWFbMF0qcytuWzBdKmkrclswXSpjK29bMF0qaCx0WzFdPWFbMV0qcytuWzFdKmkrclsxXSpjK29bMV0qaCx0WzJdPWFbMl0qcytuWzJdKmkrclsyXSpjK29bMl0qaCx0fSxvLnJhbmRvbT1mdW5jdGlvbih0LGEpe2E9YXx8MTt2YXIgbj0yKnIuUkFORE9NKCkqTWF0aC5QSSxvPTIqci5SQU5ET00oKS0xLHU9TWF0aC5zcXJ0KDEtbypvKSphO3JldHVybiB0WzBdPU1hdGguY29zKG4pKnUsdFsxXT1NYXRoLnNpbihuKSp1LHRbMl09byphLHR9LG8udHJhbnNmb3JtTWF0ND1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blszXSpyK25bN10qbytuWzExXSp1K25bMTVdO3JldHVybiBsPWx8fDEsdFswXT0oblswXSpyK25bNF0qbytuWzhdKnUrblsxMl0pL2wsdFsxXT0oblsxXSpyK25bNV0qbytuWzldKnUrblsxM10pL2wsdFsyXT0oblsyXSpyK25bNl0qbytuWzEwXSp1K25bMTRdKS9sLHR9LG8udHJhbnNmb3JtTWF0Mz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdO3JldHVybiB0WzBdPXIqblswXStvKm5bM10rdSpuWzZdLHRbMV09cipuWzFdK28qbls0XSt1Km5bN10sdFsyXT1yKm5bMl0rbypuWzVdK3Uqbls4XSx0fSxvLnRyYW5zZm9ybVF1YXQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bMF0sZT1uWzFdLE09blsyXSxzPW5bM10saT1zKnIrZSp1LU0qbyxjPXMqbytNKnItbCp1LGg9cyp1K2wqby1lKnIsUz0tbCpyLWUqby1NKnU7cmV0dXJuIHRbMF09aSpzK1MqLWwrYyotTS1oKi1lLHRbMV09YypzK1MqLWUraCotbC1pKi1NLHRbMl09aCpzK1MqLU0raSotZS1jKi1sLHR9LG8ucm90YXRlWD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1bXSx1PVtdO3JldHVybiBvWzBdPWFbMF0tblswXSxvWzFdPWFbMV0tblsxXSxvWzJdPWFbMl0tblsyXSx1WzBdPW9bMF0sdVsxXT1vWzFdKk1hdGguY29zKHIpLW9bMl0qTWF0aC5zaW4ociksdVsyXT1vWzFdKk1hdGguc2luKHIpK29bMl0qTWF0aC5jb3MociksdFswXT11WzBdK25bMF0sdFsxXT11WzFdK25bMV0sdFsyXT11WzJdK25bMl0sdH0sby5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPVtdLHU9W107cmV0dXJuIG9bMF09YVswXS1uWzBdLG9bMV09YVsxXS1uWzFdLG9bMl09YVsyXS1uWzJdLHVbMF09b1syXSpNYXRoLnNpbihyKStvWzBdKk1hdGguY29zKHIpLHVbMV09b1sxXSx1WzJdPW9bMl0qTWF0aC5jb3Mociktb1swXSpNYXRoLnNpbihyKSx0WzBdPXVbMF0rblswXSx0WzFdPXVbMV0rblsxXSx0WzJdPXVbMl0rblsyXSx0fSxvLnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89W10sdT1bXTtyZXR1cm4gb1swXT1hWzBdLW5bMF0sb1sxXT1hWzFdLW5bMV0sb1syXT1hWzJdLW5bMl0sdVswXT1vWzBdKk1hdGguY29zKHIpLW9bMV0qTWF0aC5zaW4ociksdVsxXT1vWzBdKk1hdGguc2luKHIpK29bMV0qTWF0aC5jb3MociksdVsyXT1vWzJdLHRbMF09dVswXStuWzBdLHRbMV09dVsxXStuWzFdLHRbMl09dVsyXStuWzJdLHR9LG8uZm9yRWFjaD1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8sdSxsKXt2YXIgZSxNO2ZvcihufHwobj0zKSxyfHwocj0wKSxNPW8/TWF0aC5taW4obypuK3IsYS5sZW5ndGgpOmEubGVuZ3RoLGU9cjtNPmU7ZSs9bil0WzBdPWFbZV0sdFsxXT1hW2UrMV0sdFsyXT1hW2UrMl0sdSh0LHQsbCksYVtlXT10WzBdLGFbZSsxXT10WzFdLGFbZSsyXT10WzJdO3JldHVybiBhfX0oKSxvLmFuZ2xlPWZ1bmN0aW9uKHQsYSl7dmFyIG49by5mcm9tVmFsdWVzKHRbMF0sdFsxXSx0WzJdKSxyPW8uZnJvbVZhbHVlcyhhWzBdLGFbMV0sYVsyXSk7by5ub3JtYWxpemUobixuKSxvLm5vcm1hbGl6ZShyLHIpO3ZhciB1PW8uZG90KG4scik7cmV0dXJuIHU+MT8wOk1hdGguYWNvcyh1KX0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJ2ZWMzKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIpXCJ9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD1hWzBdLGU9YVsxXSxNPWFbMl07cmV0dXJuIE1hdGguYWJzKG4tbCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGwpKSYmTWF0aC5hYnMoby1lKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoZSkpJiZNYXRoLmFicyh1LU0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhNKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdFszXT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGF9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvKXt2YXIgdT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB1WzBdPXQsdVsxXT1hLHVbMl09bix1WzNdPW8sdX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0fSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8pe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdH0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm5bMF0sdFsxXT1hWzFdKm5bMV0sdFsyXT1hWzJdKm5bMl0sdFszXT1hWzNdKm5bM10sdH0sby5tdWw9by5tdWx0aXBseSxvLmRpdmlkZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS9uWzBdLHRbMV09YVsxXS9uWzFdLHRbMl09YVsyXS9uWzJdLHRbM109YVszXS9uWzNdLHR9LG8uZGl2PW8uZGl2aWRlLG8uY2VpbD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguY2VpbChhWzBdKSx0WzFdPU1hdGguY2VpbChhWzFdKSx0WzJdPU1hdGguY2VpbChhWzJdKSx0WzNdPU1hdGguY2VpbChhWzNdKSx0fSxvLmZsb29yPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5mbG9vcihhWzBdKSx0WzFdPU1hdGguZmxvb3IoYVsxXSksdFsyXT1NYXRoLmZsb29yKGFbMl0pLHRbM109TWF0aC5mbG9vcihhWzNdKSx0fSxvLm1pbj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5taW4oYVswXSxuWzBdKSx0WzFdPU1hdGgubWluKGFbMV0sblsxXSksdFsyXT1NYXRoLm1pbihhWzJdLG5bMl0pLHRbM109TWF0aC5taW4oYVszXSxuWzNdKSx0fSxvLm1heD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5tYXgoYVswXSxuWzBdKSx0WzFdPU1hdGgubWF4KGFbMV0sblsxXSksdFsyXT1NYXRoLm1heChhWzJdLG5bMl0pLHRbM109TWF0aC5tYXgoYVszXSxuWzNdKSx0fSxvLnJvdW5kPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5yb3VuZChhWzBdKSx0WzFdPU1hdGgucm91bmQoYVsxXSksdFsyXT1NYXRoLnJvdW5kKGFbMl0pLHRbM109TWF0aC5yb3VuZChhWzNdKSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdH0sby5zY2FsZUFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0fSxvLmRpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdLHU9YVszXS10WzNdO3JldHVybiBNYXRoLnNxcnQobipuK3IqcitvKm8rdSp1KX0sby5kaXN0PW8uZGlzdGFuY2Usby5zcXVhcmVkRGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl0sdT1hWzNdLXRbM107cmV0dXJuIG4qbityKnIrbypvK3UqdX0sby5zcXJEaXN0PW8uc3F1YXJlZERpc3RhbmNlLG8ubGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM107cmV0dXJuIE1hdGguc3FydChhKmErbipuK3IqcitvKm8pfSxvLmxlbj1vLmxlbmd0aCxvLnNxdWFyZWRMZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXTtyZXR1cm4gYSphK24qbityKnIrbypvfSxvLnNxckxlbj1vLnNxdWFyZWRMZW5ndGgsby5uZWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdFszXT0tYVszXSx0fSxvLmludmVyc2U9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xL2FbMF0sdFsxXT0xL2FbMV0sdFsyXT0xL2FbMl0sdFszXT0xL2FbM10sdH0sby5ub3JtYWxpemU9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bipuK3IqcitvKm8rdSp1O3JldHVybiBsPjAmJihsPTEvTWF0aC5zcXJ0KGwpLHRbMF09bipsLHRbMV09cipsLHRbMl09bypsLHRbM109dSpsKSx0fSxvLmRvdD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdKmFbMF0rdFsxXSphWzFdK3RbMl0qYVsyXSt0WzNdKmFbM119LG8ubGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXSxsPWFbMl0sZT1hWzNdO3JldHVybiB0WzBdPW8rciooblswXS1vKSx0WzFdPXUrciooblsxXS11KSx0WzJdPWwrciooblsyXS1sKSx0WzNdPWUrciooblszXS1lKSx0fSxvLnJhbmRvbT1mdW5jdGlvbih0LGEpe3JldHVybiBhPWF8fDEsdFswXT1yLlJBTkRPTSgpLHRbMV09ci5SQU5ET00oKSx0WzJdPXIuUkFORE9NKCksdFszXT1yLlJBTkRPTSgpLG8ubm9ybWFsaXplKHQsdCksby5zY2FsZSh0LHQsYSksdH0sby50cmFuc2Zvcm1NYXQ0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdO3JldHVybiB0WzBdPW5bMF0qcituWzRdKm8rbls4XSp1K25bMTJdKmwsdFsxXT1uWzFdKnIrbls1XSpvK25bOV0qdStuWzEzXSpsLHRbMl09blsyXSpyK25bNl0qbytuWzEwXSp1K25bMTRdKmwsdFszXT1uWzNdKnIrbls3XSpvK25bMTFdKnUrblsxNV0qbCx0fSxvLnRyYW5zZm9ybVF1YXQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bMF0sZT1uWzFdLE09blsyXSxzPW5bM10saT1zKnIrZSp1LU0qbyxjPXMqbytNKnItbCp1LGg9cyp1K2wqby1lKnIsUz0tbCpyLWUqby1NKnU7cmV0dXJuIHRbMF09aSpzK1MqLWwrYyotTS1oKi1lLHRbMV09YypzK1MqLWUraCotbC1pKi1NLHRbMl09aCpzK1MqLU0raSotZS1jKi1sLHRbM109YVszXSx0fSxvLmZvckVhY2g9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvLHUsbCl7dmFyIGUsTTtmb3Iobnx8KG49NCkscnx8KHI9MCksTT1vP01hdGgubWluKG8qbityLGEubGVuZ3RoKTphLmxlbmd0aCxlPXI7TT5lO2UrPW4pdFswXT1hW2VdLHRbMV09YVtlKzFdLHRbMl09YVtlKzJdLHRbM109YVtlKzNdLHUodCx0LGwpLGFbZV09dFswXSxhW2UrMV09dFsxXSxhW2UrMl09dFsyXSxhW2UrM109dFszXTtyZXR1cm4gYX19KCksby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJ2ZWM0KFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIpXCJ9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM119LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPWFbMF0sTT1hWzFdLHM9YVsyXSxpPWFbM107cmV0dXJuIE1hdGguYWJzKG4tZSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGUpKSYmTWF0aC5hYnMoby1NKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoTSkpJiZNYXRoLmFicyh1LXMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhzKSkmJk1hdGguYWJzKGwtaSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGkpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDIpO3JldHVybiB0WzBdPTAsdFsxXT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSgyKTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhfSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhKXt2YXIgbj1uZXcgci5BUlJBWV9UWVBFKDIpO3JldHVybiBuWzBdPXQsblsxXT1hLG59LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHR9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hLHRbMV09bix0fSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qblswXSx0WzFdPWFbMV0qblsxXSx0fSxvLm11bD1vLm11bHRpcGx5LG8uZGl2aWRlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdL25bMF0sdFsxXT1hWzFdL25bMV0sdH0sby5kaXY9by5kaXZpZGUsby5jZWlsPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5jZWlsKGFbMF0pLHRbMV09TWF0aC5jZWlsKGFbMV0pLHR9LG8uZmxvb3I9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmZsb29yKGFbMF0pLHRbMV09TWF0aC5mbG9vcihhWzFdKSx0fSxvLm1pbj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5taW4oYVswXSxuWzBdKSx0WzFdPU1hdGgubWluKGFbMV0sblsxXSksdH0sby5tYXg9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWF4KGFbMF0sblswXSksdFsxXT1NYXRoLm1heChhWzFdLG5bMV0pLHR9LG8ucm91bmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLnJvdW5kKGFbMF0pLHRbMV09TWF0aC5yb3VuZChhWzFdKSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdH0sby5zY2FsZUFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHR9LG8uZGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV07cmV0dXJuIE1hdGguc3FydChuKm4rcipyKX0sby5kaXN0PW8uZGlzdGFuY2Usby5zcXVhcmVkRGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV07cmV0dXJuIG4qbityKnJ9LG8uc3FyRGlzdD1vLnNxdWFyZWREaXN0YW5jZSxvLmxlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXTtyZXR1cm4gTWF0aC5zcXJ0KGEqYStuKm4pfSxvLmxlbj1vLmxlbmd0aCxvLnNxdWFyZWRMZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV07cmV0dXJuIGEqYStuKm59LG8uc3FyTGVuPW8uc3F1YXJlZExlbmd0aCxvLm5lZ2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdH0sby5pbnZlcnNlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MS9hWzBdLHRbMV09MS9hWzFdLHR9LG8ubm9ybWFsaXplPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1uKm4rcipyO3JldHVybiBvPjAmJihvPTEvTWF0aC5zcXJ0KG8pLHRbMF09YVswXSpvLHRbMV09YVsxXSpvKSx0fSxvLmRvdD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdKmFbMF0rdFsxXSphWzFdfSxvLmNyb3NzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdKm5bMV0tYVsxXSpuWzBdO3JldHVybiB0WzBdPXRbMV09MCx0WzJdPXIsdH0sby5sZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdO3JldHVybiB0WzBdPW8rciooblswXS1vKSx0WzFdPXUrciooblsxXS11KSx0fSxvLnJhbmRvbT1mdW5jdGlvbih0LGEpe2E9YXx8MTt2YXIgbj0yKnIuUkFORE9NKCkqTWF0aC5QSTtyZXR1cm4gdFswXT1NYXRoLmNvcyhuKSphLHRbMV09TWF0aC5zaW4obikqYSx0fSxvLnRyYW5zZm9ybU1hdDI9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzJdKm8sdFsxXT1uWzFdKnIrblszXSpvLHR9LG8udHJhbnNmb3JtTWF0MmQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzJdKm8rbls0XSx0WzFdPW5bMV0qcituWzNdKm8rbls1XSx0fSxvLnRyYW5zZm9ybU1hdDM9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzNdKm8rbls2XSx0WzFdPW5bMV0qcituWzRdKm8rbls3XSx0fSxvLnRyYW5zZm9ybU1hdDQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzRdKm8rblsxMl0sdFsxXT1uWzFdKnIrbls1XSpvK25bMTNdLHR9LG8uZm9yRWFjaD1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8sdSxsKXt2YXIgZSxNO2ZvcihufHwobj0yKSxyfHwocj0wKSxNPW8/TWF0aC5taW4obypuK3IsYS5sZW5ndGgpOmEubGVuZ3RoLGU9cjtNPmU7ZSs9bil0WzBdPWFbZV0sdFsxXT1hW2UrMV0sdSh0LHQsbCksYVtlXT10WzBdLGFbZSsxXT10WzFdO3JldHVybiBhfX0oKSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInZlYzIoXCIrdFswXStcIiwgXCIrdFsxXStcIilcIn0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT1hWzBdLGw9YVsxXTtyZXR1cm4gTWF0aC5hYnMobi11KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnModSkpJiZNYXRoLmFicyhvLWwpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhsKSl9LHQuZXhwb3J0cz1vfV0pfSk7IiwiLyoqXHJcbiAqIENhbnZhcyBSZW5kZXJpbmcgU3VyZmFjZS5cclxuICogSXQgaXMgYSB0b3AgbGV2ZWwgY29tcG9uZW50IHRoYXQgY29tYmluZXMgaXQgYWxsIHRvZ2V0aGVyIGFuZCBoaWRlcyB1bm5lY2Vzc2FyeSBkZXRhaWxzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNTdXJmYWNlKGNhbnZhcylcclxue1xyXG4gICAgaWYgKCAhIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkgKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignUGFzc2VkIGNhbnZhcyBpcyBub3QgSFRNTENhbnZhc0VsZW1lbnQhJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMuY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgdGhpcy5mYWN0b3J5ID0gbmV3IENhbnZhc1VJRmFjdG9yeSh0aGlzLmNvbnRleHQpO1xyXG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcclxuICAgIHRoaXMuZWxlbWVudHMuYWRkKHRoaXMuZmFjdG9yeS5jcmVhdGVMYWJlbCgpKTtcclxuICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gbmV3IENhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIodGhpcyk7XHJcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5iaW5kSHRtbENhbnZhc0V2ZW50cygpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhpcyBpcyBhIGZsYWcgZm9yIGRldGVjdGluZyBpZiB3ZSBhcmUgZXhwb3J0aW5nXHJcbiAgICAgKiByZXN1bHQgaW1hZ2UgYXMgZmluYWwgdGV4dHVyZS5cclxuICAgICAqXHJcbiAgICAgKiBJZiB0aGlzIGlzIHRydWUsIHRoZW4gd2Ugc2hvdWxkbid0IHNob3cgYW55XHJcbiAgICAgKiBzZWxlY3Rpb24gYm9yZGVyc1xyXG4gICAgICpcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICogQHByaXZhdGVcclxuICAgICAqL1xyXG4gICAgdGhpcy5faXNFeHBvcnRpbmdSZW5kZXIgPSBmYWxzZTtcclxuXHJcbiAgICB0aGlzLmNsZWFyQ29sb3IgPSAnI0ZGRkZGRic7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIFVJQ29sbGVjdGlvbiByZWxhdGVkIHRvIHRoZSBzdXJmYWNlLlxyXG4gKiBcclxuICogQHJldHVybnMge1VJQ29sbGVjdGlvbn1cclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmdldEVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHM7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBuZXcgbGFiZWwgZWxlbWVudCBpbiB1aSBjb2xsZWN0aW9uIG9mIHRoZSBzdXJmYWNlIGFuZCByZXR1cm5zIGl0LlxyXG4gKiBcclxuICogQHJldHVybnMge1VJTGFiZWxFbGVtZW50fVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucHVzaExhYmVsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGxhYmVsID0gdGhpcy5mYWN0b3J5LmNyZWF0ZUxhYmVsKCk7XHJcbiAgICB0aGlzLmVsZW1lbnRzLmFkZChsYWJlbCk7XHJcbiAgICB0aGlzLmVsZW1lbnRzLnNlbGVjdExhc3QoKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyU2VsZWN0KGxhYmVsKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIGxhYmVsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgbmV3IGltYWdlIGVsZW1lbnQgaW4gdWkgY29sbGVjdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucHVzaEltYWdlID0gZnVuY3Rpb24gKGltYWdlKSB7XHJcbiAgICB2YXIgaW1hZ2VFbGVtZW50ID0gdGhpcy5mYWN0b3J5LmNyZWF0ZUltYWdlKGltYWdlKTtcclxuICAgIHRoaXMuZWxlbWVudHMuYWRkKGltYWdlRWxlbWVudCk7XHJcbiAgICB0aGlzLmVsZW1lbnRzLnNlbGVjdExhc3QoKTtcclxuXHJcbiAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyU2VsZWN0KGltYWdlRWxlbWVudCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2xlYXIgdGhlIHJlbGF0ZWQgY2FudmFzLlxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jbGVhckNvbG9yO1xyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGNsZWFyIGNvbG9yXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnNldENsZWFyQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcclxuICAgIHRoaXMuY2xlYXJDb2xvciA9IGNvbG9yO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlcnMgYWxsIG9mIHRoZSBlbGVtZW50cyBvbiB0aGUgc3VyZmFjZS5cclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbmRlckVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGVjdGVkSW5kZXggPSB0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudHMuZ2V0KGkpLnJlbmRlcigpO1xyXG5cclxuICAgICAgICBpZiAoaSA9PSBzZWxlY3RlZEluZGV4ICYmICEgdGhpcy5faXNFeHBvcnRpbmdSZW5kZXIpIHtcclxuICAgICAgICAgICAgbmV3IENhbnZhc1VJU2VsZWN0ZWRWaWV3KHRoaXMuY29udGV4dCkucmVuZGVyKHRoaXMuZWxlbWVudHMuZ2V0KGkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ2xlYXJzIHRoZSBzdXJmYWNlIGFuZCByZW5kZXJzIGl0IHdpdGggYWxsIGVsZW1lbnRzLlxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gICAgdGhpcy5yZW5kZXJFbGVtZW50cygpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdlbmVyYXRlcyBhbiBpbWFnZSBmcm9tIGRyYXduIGNvbnRlbnRcclxuICogQHJldHVybnMge0ltYWdlfVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUudG9JbWFnZSA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlciA9IHRydWU7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG5cclxuICAgIHZhciBpbWFnZSA9IG5ldyBJbWFnZSgpO1xyXG4gICAgaW1hZ2Uuc3JjID0gdGhpcy5jYW52YXMudG9EYXRhVVJMKCk7XHJcblxyXG4gICAgdGhpcy5faXNFeHBvcnRpbmdSZW5kZXIgPSBmYWxzZTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIGltYWdlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vdmVzIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50IHRvIHRoZSBiYWNrZ3JvdW5kXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5zZWxlY3RlZFRvQmFja2dyb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZWxlbWVudHMudG9TdGFydCh0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTW92ZXMgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnQgdG8gdGhlIGZvcmVncm91bmRcclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnNlbGVjdGVkVG9Gb3JlZ3JvdW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5lbGVtZW50cy50b0VuZCh0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudFxyXG4gKlxyXG4gKiBAcmV0dXJuIHtVSUVsZW1lbnR9XHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5yZW1vdmVTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50cy5yZW1vdmUodGhpcy5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCkpO1xyXG4gICAgdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlckRlc2VsZWN0KCk7XHJcblxyXG4gICAgcmV0dXJuIGVsZW1lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBuZXcgZXZlbnQgaGFuZGxlciBvbiBzZWxlY3Rpb24gb2YgYW4gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJU2VsZWN0ZWRDYWxsYmFja30gY2FsbGJhY2tcclxuICovXHJcbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmFkZFNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xyXG4gICAgdGhpcy5ldmVudEhhbmRsZXIuYWRkU2VsZWN0RXZlbnRIYW5kbGVyKGNhbGxiYWNrKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyKGNhbGxiYWNrKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgY2FudmFzIGJvdW5kIHJlY3RhbmdsZS5cclxuICogS2luZGEgdWdseSBtZXRob2QuXHJcbiAqXHJcbiAqIEByZXR1cm5zIHt7dG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0b3A6IDAsXHJcbiAgICAgICAgcmlnaHQ6IHRoaXMuY2FudmFzLndpZHRoLFxyXG4gICAgICAgIGJvdHRvbTogdGhpcy5jYW52YXMuaGVpZ2h0LFxyXG4gICAgICAgIGxlZnQ6IDBcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogQ2FsbGJhY2sgdHlwZSBmb3Igc2VsZWN0aW5nIGFuZCBlbGVtZW50XHJcbiAqXHJcbiAqIEBjYWxsYmFjayBVSVNlbGVjdGVkQ2FsbGJhY2tcclxuICogQHBhcmFtIHtVSUVsZW1lbnR9XHJcbiAqLyIsIi8qKlxyXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyBET00gZXZlbnRzIGFuZCB0cmlnZ2VyaW5nIGFwcGxpY2F0aW9uIGV2ZW50c1xyXG4gKiBLaW5kYSB1Z2x5IGNvZGUgaGVyZVxyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1N1cmZhY2V9IHN1cmZhY2VcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyIChzdXJmYWNlKVxyXG57XHJcbiAgICB0aGlzLnN1cmZhY2UgPSBzdXJmYWNlO1xyXG4gICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc01vdmluZ0NsaWNrID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGZhbHNlO1xyXG4gICAgdGhpcy5sYXN0Q2xpY2tPZmZzZXQgPSBudWxsO1xyXG4gICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuaGFuZGxlcnMgPSB7XHJcbiAgICAgICAgb25TZWxlY3Q6IFtdLFxyXG4gICAgICAgIG9uRGVzZWxlY3Q6IFtdXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIEhUTUwgY2FudmFzXHJcbiAqIFxyXG4gKiBAcGFyYW0gZVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuYmluZEh0bWxDYW52YXNFdmVudHMgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vIFdlIGJpbmRpbmcgdGhpcyBldmVudCB0byB0aGUgd2hvbGUgZG9jdW1lbnQgdG8gc3RvcCBtb3ZpbmdcclxuICAgIC8vIGlmIHVzZXIgdHJpZXMgdG8gZHJhZyBhbiBlbGVtZW50IG91dCBvZiB0aGUgY2FudmFzXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5oYW5kbGVNb3VzZVVwLmJpbmQodGhpcykpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcclxuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVHJpZ2dlcnMgc2VsZWN0IGV2ZW50LlxyXG4gKiBUaGlzIG1lYW5zIHRoYXQgYWxsIGFzc2lnbmVkIGhhbmRsZXJzIHdpbGwgYmUgZXhlY3V0ZWQuXHJcbiAqXHJcbiAqIFRPRE86IEFiYW5kb24gSmF2YVNjcmlwdCBhbmQgbGVhcm4gVHlwZVNjcmlwdFxyXG4gKlxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudH0gZWxlbWVudFxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudHJpZ2dlclNlbGVjdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5oYW5kbGVycy5vblNlbGVjdCkge1xyXG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuaGFuZGxlcnMub25TZWxlY3Rba2V5XTtcclxuXHJcbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soZWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXJzIGRlc2VsZWN0IGV2ZW50LlxyXG4gKiBUaGlzIG1lYW5zIHRoYXQgYWxsIGFzc2lnbmVkIGhhbmRsZXJzIHdpbGwgYmUgZXhlY3V0ZWQuXHJcbiAqL1xyXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50cmlnZ2VyRGVzZWxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0KSB7XHJcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0W2tleV07XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBuZXcgaGFuZGxlciBvbiBlbGVtZW50IHNlbGVjdGlvbiBldmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuYWRkU2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XHJcbiAgICB0aGlzLmhhbmRsZXJzLm9uU2VsZWN0LnB1c2goY2FsbGJhY2spO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgbmV3IGhhbmRsZXIgb24gZWxlbWVudCBkZXNlbGVjdGlvbiBldmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcclxuICAgIHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdC5wdXNoKGNhbGxiYWNrKTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogSGFuZGxlciBmb3IgdGhlIG1vdXNlZG93biBldmVudFxyXG4gKlxyXG4gKiBAcGFyYW0gZVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VEb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgIHRoaXMuaXNNb3VzZURvd24gPSB0cnVlO1xyXG5cclxuICAgIC8vIFF1aWNrIGhhY2tcclxuICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XHJcbiAgICAgICAgZSA9IGUudG91Y2hlc1swXTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbG9jYWxDb29yZGluYXRlcyA9IHRoaXMudG9Mb2NhbENvb3JkaW5hdGVzKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcclxuICAgIHZhciBvbGRTZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZ2V0RWxlbWVudHMoKS5nZXRTZWxlY3RlZEluZGV4KCk7XHJcbiAgICB2YXIgbmV3U2VsZWN0ZWRJbmRleCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5mZXRjaEluZGV4QnlPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xyXG4gICAgdmFyIG5ld1NlbGVjdGVkRWxlbWVudCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXQobmV3U2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgdmFyIGRvV2VIYXZlU29tZXRoaW5nU2VsZWN0ZWQgPSBuZXdTZWxlY3RlZEluZGV4ICE9PSBudWxsO1xyXG4gICAgdmFyIGlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSA9IGRvV2VIYXZlU29tZXRoaW5nU2VsZWN0ZWQgJiZcclxuICAgICAgICBvbGRTZWxlY3RlZEVsZW1lbnQgPT0gbmV3U2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICBpZiAoIWRvV2VIYXZlU29tZXRoaW5nU2VsZWN0ZWQpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgd2UgaGFkIHNvbWV0aGluZyBzZWxlY3RlZCBiZWZvcmUsXHJcbiAgICAgICAgLy8gaXQgbWVhbnMgaXQgaXMgdGltZSB0byBjYWxsIGRlc2VsZWN0IGhhbmRsZXJzXHJcbiAgICAgICAgaWYgKG9sZFNlbGVjdGVkRWxlbWVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckRlc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZGVzZWxlY3QoKTtcclxuICAgICAgICB0aGlzLnN1cmZhY2UucmVuZGVyKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSkge1xyXG4gICAgICAgIHRoaXMudHJpZ2dlclNlbGVjdChuZXdTZWxlY3RlZEVsZW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIHJlbWVtYmVyIGhlcmUgdGhlIGxhc3QgY2xpY2sgb2Zmc2V0IHJlbGF0aXZlbHkgc2VsZWN0ZWQgZWxlbWVudFxyXG4gICAgdGhpcy5sYXN0Q2xpY2tPZmZzZXQgPSBuZXdTZWxlY3RlZEVsZW1lbnQuZ2V0Q2xpY2tPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xyXG5cclxuICAgIC8vIElzIGl0IGEgY2xpY2sgc3RhcnRpbmcgcmVzaXplIG9wZXJhdGlvbiA/XHJcbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSAmJlxyXG4gICAgICAgIHRoaXMuaXNSZXNpemVQb3NzaWJsZShuZXdTZWxlY3RlZEVsZW1lbnQsIGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1Jlc2l6aW5nQ2xpY2spIHtcclxuICAgICAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IGxvY2FsQ29vcmRpbmF0ZXM7XHJcbiAgICAgICAgdGhpcy5zZXRSZXNpemFibGVTdGF0ZSh0cnVlKTtcclxuICAgIH1cclxuICAgIC8vIEl0IGlzIGEgY2xpY2sgZm9yIG1vdmluZ1xyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pc01vdmluZ0NsaWNrID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnN1cmZhY2UuZWxlbWVudHMuc2VsZWN0KG5ld1NlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgIHRoaXMuc2V0TW92YWJsZVN0YXRlKHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBIYW5kbGVyIGZvciBtb3VzZSB1cCBldmVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlVXAgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBmYWxzZTtcclxuICAgIHRoaXMuaXNNb3ZpbmdDbGljayA9IGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyYW5zZm9ybXMgY29vcmRpbmF0ZXMgdG8gY29vcmRpbmF0ZXMgaW5zaWRlIGNhbnZhc1xyXG4gKlxyXG4gKiBAcGFyYW0gY2xpZW50WFxyXG4gKiBAcGFyYW0gY2xpZW50WVxyXG4gKiBAcmV0dXJucyB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRvTG9jYWxDb29yZGluYXRlcyA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKSB7XHJcbiAgICB2YXIgdmlld3BvcnRPZmZzZXQgPSB0aGlzLnN1cmZhY2UuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgLy8gdGhlc2UgYXJlIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydCwgaS5lLiB0aGUgd2luZG93XHJcbiAgICB2YXIgdG9wID0gdmlld3BvcnRPZmZzZXQudG9wO1xyXG4gICAgdmFyIGxlZnQgPSB2aWV3cG9ydE9mZnNldC5sZWZ0O1xyXG4gICAgdmFyIHRvcE9mZnNldCA9IGNsaWVudFkgLSB0b3A7XHJcbiAgICB2YXIgbGVmdE9mZnNldCA9IGNsaWVudFggLSBsZWZ0O1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgeDogbGVmdE9mZnNldCxcclxuICAgICAgICB5OiB0b3BPZmZzZXRcclxuICAgIH07XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlciBmb3IgbW91c2UgbW92ZSBldmVudFxyXG4gKlxyXG4gKiBAcGFyYW0gZVxyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcclxuXHJcbiAgICAvLyBRdWljayBoYWNrXHJcbiAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT0gXCJ1bmRlZmluZWRcIiAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xyXG4gICAgICAgIGUgPSBlLnRvdWNoZXNbMF07XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHNlbGVjdGVkSW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xyXG4gICAgdmFyIGxvY2FsQ29vcmRpbmF0ZXMgPSB0aGlzLnRvTG9jYWxDb29yZGluYXRlcyhlLmNsaWVudFgsIGUuY2xpZW50WSk7XHJcbiAgICB2YXIgZWxlbWVudEhvdmVySW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZmV0Y2hJbmRleEJ5T2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcclxuXHJcbiAgICAvLyBJdCBpcyBzaW1wbGUgbW91c2UgbW92ZSxcclxuICAgIC8vIHdlIGhhdmUgbm90aGluZyBtb3JlIHRvIGRvIGhlcmVcclxuICAgIGlmICghdGhpcy5pc01vdXNlRG93bikge1xyXG4gICAgICAgIHRoaXMuaGFuZGxlTW91c2VNb3ZlV2l0aG91dE1vdXNlRG93bihlbGVtZW50SG92ZXJJbmRleCwgc2VsZWN0ZWRJbmRleCwgbG9jYWxDb29yZGluYXRlcyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBzZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRFbGVtZW50KCk7XHJcblxyXG4gICAgLy8gSWYgd2UgYXJlIGhlcmUsIHRoZW4gd2UgaGF2ZSBidXR0b24gcHJlc3NlZCBhbmQgd2UgbXVzdCByZXNpemUhXHJcbiAgICBpZiAodGhpcy5pc1Jlc2l6aW5nQ2xpY2spIHtcclxuICAgICAgICB2YXIgbmV3U2l6ZURlbHRhID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogbG9jYWxDb29yZGluYXRlcy54IC0gdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMueCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBsb2NhbENvb3JkaW5hdGVzLnkgLSB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcy55XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBsb2NhbENvb3JkaW5hdGVzO1xyXG5cclxuICAgICAgICB2YXIgc2l6ZSA9IHNlbGVjdGVkRWxlbWVudC5nZXRTaXplKCk7XHJcbiAgICAgICAgc2l6ZS5yZXNpemVCeShuZXdTaXplRGVsdGEud2lkdGgsIG5ld1NpemVEZWx0YS5oZWlnaHQpO1xyXG4gICAgfVxyXG4gICAgLy8gTmFoLCBpdCdzIGp1c3QgbW92aW5nXHJcbiAgICBlbHNlIGlmICh0aGlzLmlzTW92aW5nQ2xpY2spIHtcclxuICAgICAgICBzZWxlY3RlZEVsZW1lbnQubW92ZVRvKG5ldyBQb3NpdGlvbihcclxuICAgICAgICAgICAgbG9jYWxDb29yZGluYXRlcy54IC0gdGhpcy5sYXN0Q2xpY2tPZmZzZXQudG9wLFxyXG4gICAgICAgICAgICBsb2NhbENvb3JkaW5hdGVzLnkgLSB0aGlzLmxhc3RDbGlja09mZnNldC5sZWZ0XHJcbiAgICAgICAgKSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgbW92YWJsZSBodG1sIGNsYXNzIHRvIHRoZSBjYW52YXMgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGJvb2xcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnNldE1vdmFibGVTdGF0ZSA9IGZ1bmN0aW9uIChib29sKSB7XHJcbiAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LmFkZCgnbW92YWJsZScpO1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgncmVzaXphYmxlJyk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5yZW1vdmUoJ21vdmFibGUnKTtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIHJlc2l6YWJsZSBodG1sIGNsYXNzIHRvIHRoZSBjYW52YXMgZWxlbWVudC5cclxuICpcclxuICogQHBhcmFtIGJvb2xcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnNldFJlc2l6YWJsZVN0YXRlID0gZnVuY3Rpb24gKGJvb2wpIHtcclxuICAgIGlmIChib29sKSB7XHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdtb3ZhYmxlJyk7XHJcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QuYWRkKCdyZXNpemFibGUnKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgncmVzaXphYmxlJyk7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBtb3VzZSBtb3ZlIGV2ZW50IHdoZW4gbW91c2UgYnV0dG9uIGlzIG5vdCBwcmVzc2VkXHJcbiAqXHJcbiAqIEBwYXJhbSBlbGVtZW50SG92ZXJJbmRleFxyXG4gKiBAcGFyYW0gc2VsZWN0ZWRJbmRleFxyXG4gKiBAcGFyYW0gbW91c2VDb29yZGluYXRlc1xyXG4gKi9cclxuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VNb3ZlV2l0aG91dE1vdXNlRG93biA9IGZ1bmN0aW9uIChlbGVtZW50SG92ZXJJbmRleCwgc2VsZWN0ZWRJbmRleCwgbW91c2VDb29yZGluYXRlcykge1xyXG4gICAgaWYgKGVsZW1lbnRIb3ZlckluZGV4ID09IHNlbGVjdGVkSW5kZXgpIHtcclxuICAgICAgICAvLyBXaGF0IHN0YXRlIGlzIGN1cnNvciBpbj9cclxuICAgICAgICB2YXIgcmVzaXplU3RhdGUgPSB0aGlzLmlzUmVzaXplUG9zc2libGUodGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldFNlbGVjdGVkRWxlbWVudCgpLCBtb3VzZUNvb3JkaW5hdGVzLngsIG1vdXNlQ29vcmRpbmF0ZXMueSk7XHJcbiAgICAgICAgaWYgKHJlc2l6ZVN0YXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZSh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5zZXRSZXNpemFibGVTdGF0ZShmYWxzZSk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdHJ1ZSBpZiBwYXNzZWQgY29vcmRpbmF0ZXMgYXJlIGxvY2F0ZWQgb24gcG9zaXRpb24gb2YgZHJhZyBpY29uIG9mIGFuIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIGVsZW1lbnRcclxuICogQHBhcmFtIHhcclxuICogQHBhcmFtIHlcclxuICovXHJcbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmlzUmVzaXplUG9zc2libGUgPSBmdW5jdGlvbihlbGVtZW50LCB4LCB5KSB7XHJcbiAgICB2YXIgZHJhZ0ljb25TaXplID0gMTA7XHJcblxyXG4gICAgdmFyIHRlbXBFbGVtZW50RGF0YSA9IHtcclxuICAgICAgICBwb3NpdGlvbjogbmV3IFBvc2l0aW9uKFxyXG4gICAgICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSAtIGRyYWdJY29uU2l6ZSxcclxuICAgICAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpIC0gZHJhZ0ljb25TaXplXHJcbiAgICAgICAgKSxcclxuICAgICAgICBzaXplOiBuZXcgU2l6ZShkcmFnSWNvblNpemUsIGRyYWdJY29uU2l6ZSlcclxuICAgIH07XHJcblxyXG4gICAgdmFyIHRlbXBFbGVtZW50ID0gbmV3IFVJRWxlbWVudCh0ZW1wRWxlbWVudERhdGEucG9zaXRpb24sIHRlbXBFbGVtZW50RGF0YS5zaXplKTtcclxuICAgIHJldHVybiB0ZW1wRWxlbWVudC5pc09mZnNldEluKHgsIHkpO1xyXG59OyIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJRWxlbWVudFZpZXcoY29udGV4dCkge1xyXG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyBVSSBFbGVtZW50IFZpZXcgZXJyb3IhIENvbnRleHQgaXMgbm90IGEgY29udGV4dCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQHR5cGUge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcclxufVxyXG5cclxuQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblxyXG59OyIsIi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENhbnZhc1VJRmFjdG9yeShjb250ZXh0KVxyXG57XHJcbiAgICBpZiAoICEgKGNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIHJlbmRlcmluZyBjb250ZXh0IG11c3QgYmUgaW5zdGFuY2Ugb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEISAoZmFjdG9yeSBjcmVhdGluZyknKTtcclxuICAgIH1cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGEgbGFiZWwgZWxlbWVudCwgd2hpY2ggaXMgcmVhZHkgdG8gYmUgcmVuZGVyZWQgb24gdGhlIGNhbnZhc1xyXG4gKlxyXG4gKiBAcmV0dXJucyB7VUlMYWJlbEVsZW1lbnR9XHJcbiAqL1xyXG5DYW52YXNVSUZhY3RvcnkucHJvdG90eXBlLmNyZWF0ZUxhYmVsID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIHZhciBsYWJlbCA9IG5ldyBVSUxhYmVsRWxlbWVudChuZXcgUG9zaXRpb24oMCwgNTApKTtcclxuICAgIGxhYmVsLnNldFZpZXcobmV3IENhbnZhc1VJTGFiZWxWaWV3KHRoaXMuY29udGV4dCkpO1xyXG5cclxuICAgIHJldHVybiBsYWJlbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGltYWdlIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcclxuICpcclxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcclxuICovXHJcbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlSW1hZ2UgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcclxuICAgIHZhciBpbWFnZUVsZW1lbnQgPSBuZXcgVUlJbWFnZUVsZW1lbnQobnVsbCwgbnVsbCwgaW1hZ2UpO1xyXG4gICAgaW1hZ2VFbGVtZW50LnNldFZpZXcobmV3IENhbnZhc1VJSW1hZ2VWaWV3KHRoaXMuY29udGV4dCkpO1xyXG5cclxuICAgIHJldHVybiBpbWFnZUVsZW1lbnQ7XHJcbn07IiwiLyoqXHJcbiAqIFZpZXcgb2YgYW4gaW1hZ2UgZWxlbWVudCBvbiB0aGUgY2FudmFzXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlJbWFnZVZpZXcoY29udGV4dCkge1xyXG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xyXG59XHJcblxyXG5DYW52YXNVSUltYWdlVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKiBSZW5kZXJzIGFuIGltYWdlIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtVSUltYWdlRWxlbWVudH0gdWlJbWFnZUVsZW1lbnRcclxuICovXHJcbkNhbnZhc1VJSW1hZ2VWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAodWlJbWFnZUVsZW1lbnQpIHtcclxuICAgIHZhciBwb3MgPSB1aUltYWdlRWxlbWVudC5nZXRQb3NpdGlvbigpO1xyXG4gICAgdmFyIHNpemUgPSB1aUltYWdlRWxlbWVudC5nZXRTaXplKCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmRyYXdJbWFnZShcclxuICAgICAgICB1aUltYWdlRWxlbWVudC5nZXRJbWFnZSgpLFxyXG4gICAgICAgIHBvcy5nZXRYKCksXHJcbiAgICAgICAgcG9zLmdldFkoKSxcclxuICAgICAgICBzaXplLmdldFdpZHRoKCksXHJcbiAgICAgICAgc2l6ZS5nZXRIZWlnaHQoKVxyXG4gICAgKTtcclxufTsiLCIvKipcclxuICpcclxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBDYW52YXNVSUxhYmVsVmlldyhjb250ZXh0KSB7XHJcbiAgICBDYW52YXNVSUVsZW1lbnRWaWV3LmNhbGwodGhpcywgY29udGV4dCk7XHJcbn1cclxuXHJcbkNhbnZhc1VJTGFiZWxWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlcnMgdGV4dCBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlMYWJlbEVsZW1lbnR9IGVsZW1lbnRcclxuICovXHJcbkNhbnZhc1VJTGFiZWxWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgLy8gT3VyIHRleHQgc2l6ZSBmaXRzIGJvdW5kc1xyXG4gICAgdmFyIGZvbnRTaXplID0gZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCk7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBmb250U2l6ZSArIFwicHggXCIgKyBlbGVtZW50LmdldEZvbnQoKTtcclxuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBlbGVtZW50LmdldENvbG9yKCk7XHJcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2hhbmdpbmcnO1xyXG5cclxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcclxuICAgICAgICBlbGVtZW50LmdldFRleHQoKSxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKVxyXG4gICAgKTtcclxufTsiLCIvKipcclxuICogQmFzZSB2aWV3IGZvciBzZWxlY3RlZCBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSBjb250ZXh0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gQ2FudmFzVUlTZWxlY3RlZFZpZXcoY29udGV4dCkge1xyXG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyBVSSBFbGVtZW50IFZpZXcgZXJyb3IhIENvbnRleHQgZG9lcyBub3QgaGF2ZSB0eXBlIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCEnKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XHJcbn1cclxuXHJcbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xyXG5cclxuQ2FudmFzVUlTZWxlY3RlZFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XHJcblxyXG4gICAgdmFyIGljb25SZXNpemVXaWR0aCA9IDE1O1xyXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSBpY29uUmVzaXplV2lkdGggKyBcInB4IEFyaWFsXCI7XHJcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gXCIjMmU2ZGE0XCI7XHJcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2JvdHRvbSc7XHJcblxyXG4gICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFxyXG4gICAgICAgIENhbnZhc1VJU2VsZWN0ZWRWaWV3LlJlc2l6ZVN5bWJvbCxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WCgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSAtIGljb25SZXNpemVXaWR0aCxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCksXHJcbiAgICAgICAgaWNvblJlc2l6ZVdpZHRoXHJcbiAgICApO1xyXG5cclxuICAgIC8vdGhpcy7ih5hcclxuICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IFwiIzJlNmRhNFwiO1xyXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoXHJcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSxcclxuICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpLFxyXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCksXHJcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KClcclxuICAgICk7XHJcbn07XHJcblxyXG4vKipcclxuICogQGNvbnN0XHJcbiAqIEB0eXBlIHtzdHJpbmd9XHJcbiAqL1xyXG5DYW52YXNVSVNlbGVjdGVkVmlldy5SZXNpemVTeW1ib2wgPSAnXFx1MjFmMic7IiwiLyoqXHJcbiAqIFBvc2l0aW9uIGluIDJEIHNwYWNlXHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB4XHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUG9zaXRpb24oeCwgeSkge1xyXG4gICAgdGhpcy54ID0gK3ggfHwgMDtcclxuICAgIHRoaXMueSA9ICt5IHx8IDA7XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gKi9cclxuUG9zaXRpb24ucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLng7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHJldHVybnMge251bWJlcn1cclxuICovXHJcblBvc2l0aW9uLnByb3RvdHlwZS5nZXRZID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy55O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZXMgcG9zaXRpb25zIG9mIGFuIG9iamVjdFxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFYXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVlcclxuICogQHJldHVybiBQb3NpdGlvblxyXG4gKi9cclxuUG9zaXRpb24ucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbihkZWx0YVgsIGRlbHRhWSkge1xyXG4gICAgdmFyIG5ld1hQb3MgPSB0aGlzLnggKyBkZWx0YVg7XHJcbiAgICB2YXIgbmV3WVBvcyA9IHRoaXMueSArIGRlbHRhWTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKG5ld1hQb3MsIG5ld1lQb3MpO1xyXG59OyIsIi8qKlxyXG4gKiBUaGlzIG9iamVjdCBpcyBvbmx5IHB1cnBvc2VkIGZvciBsb2FkaW5nIGV4dGVybmFsIHJlc291cmNlc1xyXG4gKiBUaGlzIGlzIHN1cHBvc2VkIHRvIGJlIGFuIG9iamVjdCBkdXJpbmcgdGVzdGluZyBwdXJwb3Nlc1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFJlc291cmNlTG9hZGVyKCkge1xyXG4gICAgXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogTG9hZHMgaW1hZ2UgdGhlbiBjYWxscyBhIGZ1bmN0aW9uLlxyXG4gKiBUaGF0IHNpbXBsZS5cclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcblJlc291cmNlTG9hZGVyLnByb3RvdHlwZS5sb2FkSW1hZ2UgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xyXG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaW1nLm9ubG9hZCA9IGNhbGxiYWNrO1xyXG4gICAgfVxyXG5cclxuICAgIGltZy5zcmMgPSBzcmM7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9hZHMgdGV4dCBjb250ZW50LCBjYWxscyBmdW5jdGlvblxyXG4gKiBcclxuICogQHBhcmFtIHNyY1xyXG4gKiBAcGFyYW0gY2FsbGJhY2tcclxuICovXHJcblJlc291cmNlTG9hZGVyLnByb3RvdHlwZS5sb2FkVGV4dCA9IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcblxyXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB4aHIub3BlbignR0VUJywgc3JjLCB0cnVlKTtcclxuICAgIHhoci5zZW5kKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9hZHMgSlNPTiBjb250ZW50LCBjYWxscyBjYWxsYmFja1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjXHJcbiAqIEBwYXJhbSBjYWxsYmFja1xyXG4gKi9cclxuUmVzb3VyY2VMb2FkZXIucHJvdG90eXBlLmxvYWRKc29uT2JqZWN0ID0gZnVuY3Rpb24gKHNyYywgY2FsbGJhY2spIHtcclxuICAgIHRoaXMubG9hZFRleHQoc3JjLCBmdW5jdGlvbiAobG9hZGVkVGV4dCkge1xyXG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKEpTT04ucGFyc2UobG9hZGVkVGV4dCkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn07XHJcblxyXG4iLCIvKipcclxuICpcclxuICogQHBhcmFtIHtSZXNvdXJjZUxvYWRlcn0gcmVzb3VyY2VMb2FkZXJcclxuICogQHBhcmFtIHtbe2tleTogc3RyaW5nLCBzcmM6IHN0cmluZywgdHlwZTogc3RyaW5nIH1dfSByZXNvdXJjZXMgLSB3aGF0IHJlc291cmNlcyBhcmUgeW91IGdvaW5nIHRvIGxvYWRcclxuICogS2V5IGlzIHVzZWQgdG8gc2F2ZSBsb2FkZWQgY29udGVudCB0byBTdG9yYWdlLFxyXG4gKiBUeXBlIG11c3QgYmU6ICd0ZXh0JywgJ2ltYWdlJyBvciAnanNvbicsXHJcbiAqIFNyYyBpcyB0aGUgcGF0aCB0byB0aGUgcmVzb3VyY2UgZnJvbSBkb2N1bWVudCByb290XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9uTG9hZCAtIGNhbGxiYWNrLCB3aGljaCB3aWxsIGJlIGV4ZWN1dGVkIG9uIGxvYWQgb2YgZWFjaCBlbGVtZW50XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gUmVzb3VyY2VQcmVwYXJlcihyZXNvdXJjZUxvYWRlciwgcmVzb3VyY2VzLCBvbkxvYWQpXHJcbntcclxuICAgIHRoaXMubG9hZGVyID0gcmVzb3VyY2VMb2FkZXI7XHJcbiAgICB0aGlzLnJlc291cmNlc1RvTG9hZCA9IHJlc291cmNlcztcclxuICAgIHRoaXMub25Mb2FkID0gb25Mb2FkO1xyXG59XHJcblxyXG4vKipcclxuICogU3RhcnRzIGxvYWRpbmcgb2YgcmVxdWVzdGVkIHJlc291cmNlc1xyXG4gKi9cclxuUmVzb3VyY2VQcmVwYXJlci5wcm90b3R5cGUuc3RhcnRMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHRvdGFsTG9hZGVkQ291bnQgPSAwO1xyXG4gICAgdmFyIHNob3VsZExvYWRDb3VudCA9IHRoaXMucmVzb3VyY2VzVG9Mb2FkLmxlbmd0aDtcclxuICAgIHZhciBvbkxvYWRDYWxsYmFjayA9IHRoaXMub25Mb2FkO1xyXG4gICAgdmFyIGxvYWRlciA9IHRoaXMubG9hZGVyO1xyXG5cclxuICAgIC8vIEVhY2ggdGltZSB3ZSBoYXZlIGxvYWRlZCBhIHJlc291cmNlXHJcbiAgICAvLyB3ZSBjaGVjayBldmVyeXRoaW5nIGlzIGxvYWRlZFxyXG4gICAgdmFyIHNhdmVSZXNvdXJjZSA9IGZ1bmN0aW9uIChrZXksIG9iamVjdCkge1xyXG4gICAgICAgIFN0b3JhZ2UucmVtZW1iZXIoa2V5LCBvYmplY3QpO1xyXG4gICAgICAgIHRvdGFsTG9hZGVkQ291bnQrKztcclxuICAgICAgICBpZiAodG90YWxMb2FkZWRDb3VudCA9PSBzaG91bGRMb2FkQ291bnQpIHtcclxuICAgICAgICAgICAgb25Mb2FkQ2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICB2YXIgcmVxdWVzdE1ldGhvZHMgPSB7XHJcbiAgICAgICAgaW1hZ2U6IGZ1bmN0aW9uIChzcmMsIGtleSkge1xyXG4gICAgICAgICAgICBsb2FkZXIubG9hZEltYWdlKHNyYywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2F2ZVJlc291cmNlKGtleSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBqc29uOiBmdW5jdGlvbiAoc3JjLCBrZXkpIHtcclxuICAgICAgICAgICAgbG9hZGVyLmxvYWRKc29uT2JqZWN0KHNyYywgZnVuY3Rpb24gKGpzb25SZXNvdXJjZSkge1xyXG4gICAgICAgICAgICAgICAgc2F2ZVJlc291cmNlKGtleSwganNvblJlc291cmNlKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIHRleHQ6IGZ1bmN0aW9uIChzcmMsIGtleSkge1xyXG4gICAgICAgICAgICBsb2FkZXIubG9hZFRleHQoc3JjLCBmdW5jdGlvbiAodGV4dFJlc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCB0ZXh0UmVzb3VyY2UpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5yZXNvdXJjZXNUb0xvYWQuZm9yRWFjaChmdW5jdGlvbiAocmVzb3VyY2UpIHtcclxuICAgICAgICB2YXIgdHlwZSA9IHJlc291cmNlLnR5cGU7XHJcbiAgICAgICAgdmFyIGtleSA9IHJlc291cmNlLmtleTtcclxuICAgICAgICB2YXIgc3JjID0gcmVzb3VyY2Uuc3JjO1xyXG5cclxuICAgICAgICBpZiAoICEgcmVxdWVzdE1ldGhvZHMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCdUcnlpbmcgdG8gbG9hZCB1bmtub3duIHJlc291cmNlIHR5cGUhJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBjYWxsaW5nIGFwcHJvcHJpYXRlIGxvYWQgbWV0aG9kXHJcbiAgICAgICAgcmVxdWVzdE1ldGhvZHNbdHlwZV0oc3JjLCBrZXkpO1xyXG4gICAgfSk7XHJcbn07IiwiLyoqXHJcbiAqIFNpemUgb2YgdGhlIHJlY3RhbmdsZSBzdXJyb3VuZGluZyB0aGUgb2JqZWN0XHJcbiAqXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxyXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB0aGlzLndpZHRoID0gK3dpZHRoIHx8IFNpemUuZGVmYXVsdFdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSAraGVpZ2h0IHx8IFNpemUuZGVmYXVsdEhlaWdodDtcclxufVxyXG5cclxuU2l6ZS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLndpZHRoO1xyXG59O1xyXG5cclxuU2l6ZS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XHJcbn07XHJcblxyXG5cclxuU2l6ZS5wcm90b3R5cGUucmVzaXplQnkgPSBmdW5jdGlvbiAoZGVsdGFXaWR0aCwgZGVsdGFIZWlnaHQpIHtcclxuICAgIHRoaXMud2lkdGggKz0gZGVsdGFXaWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ICs9IGRlbHRhSGVpZ2h0O1xyXG5cclxuICAgIGlmICh0aGlzLndpZHRoIDwgU2l6ZS5taW5XaWR0aCkge1xyXG4gICAgICAgIHRoaXMud2lkdGggPSBTaXplLm1pbldpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmhlaWdodCA8IFNpemUubWluSGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBTaXplLm1pbkhlaWdodDtcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbmNyZWFzZXMgdGhlIHNpemUgYnkgbXVsdGlwbGllclxyXG4gKlxyXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlwbGllclxyXG4gKiBAcmV0dXJucyB7U2l6ZX1cclxuICovXHJcblNpemUucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24obXVsdGlwbGllcikge1xyXG4gICAgcmV0dXJuIG5ldyBTaXplKHRoaXMud2lkdGggKiBtdWx0aXBsaWVyLCB0aGlzLmhlaWdodCAqIG11bHRpcGxpZXIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1pbmltYWwgd2lkdGhcclxuICogQHR5cGUge251bWJlcn1cclxuICovXHJcblNpemUubWluV2lkdGggPSA0MDtcclxuXHJcbi8qKlxyXG4gKiBNaW5pbWFsIGhlaWdodFxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuU2l6ZS5taW5IZWlnaHQgPSA0MDtcclxuXHJcbi8qKlxyXG4gKiBjb25zdCBmb3IgZGVmYXVsdCB3aWR0aFxyXG4gKiBAdHlwZSB7bnVtYmVyfVxyXG4gKi9cclxuU2l6ZS5kZWZhdWx0V2lkdGggPSAxNTA7XHJcblxyXG4vKipcclxuICogY29uc3QgZm9yIGRlZmF1bHQgaGVpZ2h0XHJcbiAqIEB0eXBlIHtudW1iZXJ9XHJcbiAqL1xyXG5TaXplLmRlZmF1bHRIZWlnaHQgPSA3MDsiLCIvKipcclxuICogSXQgaXMgcHVycG9zZWQgZm9yIHJlbWVtYmVyaW5nIHNvbWUgZGF0YS5cclxuICogRnVuY3Rpb25hbCBkZWNsYXJhdGlvbiBpcyB1c2VkIGZvciBpdHMgdmlzaWJpbGl0eSBvbmx5LlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFN0b3JhZ2UoKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiVGhpcyBpcyBub3QgZm9yIGNyZWF0aW5nIG9iamVjdHMhXCIpO1xyXG59XHJcblxyXG5TdG9yYWdlLl9jb250ZW50ID0ge307XHJcblxyXG4vKipcclxuICogUmVtZW1iZXJzIGFueSB2YWx1ZVxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcclxuICovXHJcblN0b3JhZ2UucmVtZW1iZXIgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG4gICAgU3RvcmFnZS5fY29udGVudFtrZXldID0gdmFsdWU7XHJcbn07XHJcblxyXG4vKipcclxuICogQWxsb3dzIHlvdSB0byBnZXQgd2hhdCB5b3Ugd2FudCBidXQgb25seSBpZiB5b3UgcmVtZW1iZXIgdGhpcyBlYXJsaWVyXHJcbiAqIFxyXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5XHJcbiAqL1xyXG5TdG9yYWdlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcclxuICAgIHZhciBzb21ldGhpbmdZb3VXYW50ID0gU3RvcmFnZS5fY29udGVudFtrZXldO1xyXG5cclxuICAgIGlmICh0eXBlb2Ygc29tZXRoaW5nWW91V2FudCA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIldlIGhhdmUgbm90aGluZyB0byByZXR1cm4gdXNpbmcga2V5OiBcIiArIGtleSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNvbWV0aGluZ1lvdVdhbnQ7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBDb2xsZWN0aW9uIGZvciBVSSBlbGVtZW50cy5cclxuICpcclxuICogSXQgaXMgcHVycG9zZWQgZm9yIGtlZXBpbmcgdWkgZWxlbWVudHMgd2l0aCBjb3JyZWN0IG9yZGVyXHJcbiAqIEFsc28gc3VwcG9ydHMgc2VsZWN0aW9uIHJlbWVtYmVyaW5nXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gVUlDb2xsZWN0aW9uKCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcclxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG5cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbGVuZ3RoJywge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVsZW1lbnRzLmxlbmd0aFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgdG9wIGxheWVyIG9mIHRoZSBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcclxuICAgIGlmICggISAoZWxlbWVudCBpbnN0YW5jZW9mIFVJRWxlbWVudCkgKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRWxlbWVudCBpbiBVSUNvbGxlY3Rpb24gbXVzdCBoYXZlIFVJRWxlbWVudCB0eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYXJyYXkgd2l0aCBhbGwgZWxlbWVudHMgaW4gaXRcclxuICpcclxuICogQHJldHVybnMge0FycmF5fVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgZWxlbWVudCB3aXRoIHBhc3NlZCBpbmRleCBmcm9tIHRoZSBjb2xsZWN0aW9uIGFuZCByZXR1cm5zIGl0XHJcbiAqXHJcbiAqIEByZXR1cm4ge1VJRWxlbWVudH1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcbiAgICBpZiAoaW5kZXggPT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XHJcbiAgICAgICAgdGhpcy5kZXNlbGVjdCgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKVswXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTd2FwcyBwbGFjZXMgb2YgdHdvIGVsZW1lbnRzIGluIHRoZSBjb2xsZWN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSBpbmRleDFcclxuICogQHBhcmFtIGluZGV4MlxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24gKGluZGV4MSwgaW5kZXgyKSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4MSkgfHwgIXRoaXMuaGFzKGluZGV4MikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciB0ZW1wID0gdGhpcy5lbGVtZW50c1tpbmRleDFdO1xyXG4gICAgdGhpcy5lbGVtZW50c1tpbmRleDFdICA9IHRoaXMuZWxlbWVudHNbaW5kZXgyXTtcclxuICAgIHRoaXMuZWxlbWVudHNbaW5kZXgyXSA9IHRlbXA7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgaW5kZXggZXhpc3RzIGluIGNvbGxlY3Rpb25cclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gKi9cclxuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaW5kZXgpIHtcclxuICAgIHJldHVybiBpbmRleCA+PSAwIHx8IGluZGV4IDwgdGhpcy5sZW5ndGg7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbaW5kZXhdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZvcmdldHMgd2hpY2ggZWxlbWVudCB3YXMgc2VsZWN0ZWRcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZGVzZWxlY3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gaW5kZXhcclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xyXG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZWxlY3RzIHRoZSBsYXN0IGVsZW1lbnQgaW4gdGhlIGNvbGxlY3Rpb25cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0TGFzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMubGVuZ3RoID8gdGhpcy5sZW5ndGggLSAxIDogLTE7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyBzZWxlY3RlZCBlbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR8bnVsbH1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCAhPSAtMSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW3RoaXMuc2VsZWN0ZWRJbmRleF1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgaW5kZXggb2Ygc2VsZWN0ZWQgZWxlbWVudFxyXG4gKiBJZiBub25lLCByZXR1cm5zIC0xXHJcbiAqXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldFNlbGVjdGVkSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZldGNoZXMgZWxlbWVudCBieSBwYXNzZWQgb2Zmc2V0XHJcbiAqXHJcbiAqIEBwYXJhbSBvZmZzZXRYXHJcbiAqIEBwYXJhbSBvZmZzZXRZXHJcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR8bnVsbH1cclxuICovXHJcblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZmV0Y2hFbGVtZW50QnlPZmZzZXQgPSBmdW5jdGlvbiAob2Zmc2V0WCwgb2Zmc2V0WSkge1xyXG4gICAgdmFyIG1hdGNoZWRFbGVtZW50ID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBpZiAoZWwuaXNPZmZzZXRJbihvZmZzZXRYLCBvZmZzZXRZKSkge1xyXG4gICAgICAgICAgICBtYXRjaGVkRWxlbWVudCA9IGVsO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG1hdGNoZWRFbGVtZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFB1c2hlcyBlbGVtZW50IHRvIHRoZSBlbmQgb2YgdGhlIGNvbGxlY3Rpb25cclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnRvRW5kID0gZnVuY3Rpb24oaW5kZXgpXHJcbntcclxuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcclxuICAgIH1cclxuICAgIHZhciB3YXNTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PSBpbmRleDtcclxuICAgIHZhciBlbGVtZW50ID0gdGhpcy5yZW1vdmUoaW5kZXgpO1xyXG4gICAgdGhpcy5hZGQoZWxlbWVudCk7XHJcblxyXG4gICAgaWYgKHdhc1NlbGVjdGVkKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFB1c2hlcyBlbGVtZW50IHRvIHRoZSBib3R0b20gb2YgdGhlIGNvbGxlY3Rpb25cclxuICpcclxuICogQHBhcmFtIGluZGV4XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnRvU3RhcnQgPSBmdW5jdGlvbihpbmRleClcclxue1xyXG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xyXG4gICAgfVxyXG4gICAgdmFyIHdhc1NlbGVjdGVkID0gdGhpcy5zZWxlY3RlZEluZGV4ID09IGluZGV4O1xyXG4gICAgdmFyIGVsZW1lbnQgPSB0aGlzLnJlbW92ZShpbmRleCk7XHJcbiAgICB0aGlzLmVsZW1lbnRzID0gW2VsZW1lbnRdLmNvbmNhdCh0aGlzLmVsZW1lbnRzKTtcclxuXHJcbiAgICBpZiAod2FzU2VsZWN0ZWQpIHtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBGZXRjaGVzIGluZGV4IGJ5IHBhc3NlZCBvZmZzZXRcclxuICpcclxuICogQHBhcmFtIG9mZnNldFhcclxuICogQHBhcmFtIG9mZnNldFlcclxuICogQHJldHVybnMgeyp9XHJcbiAqL1xyXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmZldGNoSW5kZXhCeU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXRYLCBvZmZzZXRZKSB7XHJcbiAgICB2YXIgbWF0Y2hlZEluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICAgICAgaWYgKGVsLmlzT2Zmc2V0SW4ob2Zmc2V0WCwgb2Zmc2V0WSkpIHtcclxuICAgICAgICAgICAgbWF0Y2hlZEluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gbWF0Y2hlZEluZGV4O1xyXG59OyIsIi8qKlxyXG4gKiBTb21lIGVsZW1lbnQgb2YgdXNlciBpbnRlcmZhY2VcclxuICpcclxuICogQHBhcmFtIHtQb3NpdGlvbnx1bmRlZmluZWR9IHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7U2l6ZXx1bmRlZmluZWR9IHNpemVcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBVSUVsZW1lbnQocG9zaXRpb24sIHNpemUpXHJcbntcclxuICAgIGlmICggISAocG9zaXRpb24gaW5zdGFuY2VvZiBQb3NpdGlvbikgKSB7XHJcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKTtcclxuICAgIH1cclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHJcbiAgICBpZiAoICEgKHNpemUgaW5zdGFuY2VvZiBQb3NpdGlvbikpIHtcclxuICAgICAgICBzaXplID0gbmV3IFNpemUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSB2aWV3IG9mIHRoZSBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7VUlFbGVtZW50Vmlld30gdmlld1xyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRWaWV3ID0gZnVuY3Rpb24odmlldykge1xyXG4gICAgaWYgKCAhICh2aWV3IGluc3RhbmNlb2YgVUlFbGVtZW50VmlldykgKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVmlldyBtdXN0IGhhdmUgVUlFbGVtZW50VmlldyB0eXBlIScpO1xyXG4gICAgfVxyXG4gICAgdGhpcy52aWV3ID0gdmlldztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGN1cnJlbnQgdmlldyBvZiB0aGUgZWxlbWVudFxyXG4gKlxyXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50Vmlld3x1bmRlZmluZWR9XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFZpZXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy52aWV3O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbmRlcnMgdGhlIGVsZW1lbnQgdXNpbmcgaXRzIHZpZXdcclxuICovXHJcblVJRWxlbWVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLnZpZXcpIHtcclxuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1ZpZXcgaXMgbm90IHNldCEnKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnZpZXcucmVuZGVyKHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb259IHBvc2l0aW9uXHJcbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR9XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uKHBvc2l0aW9uKSB7XHJcbiAgICBpZiAoIXBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCduZXcgcG9zaXRpb24gbXVzdCBoYXZlIFBvc2l0aW9uIHR5cGUhJylcclxuICAgIH1cclxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgcG9zaXRpb24gb2YgYW4gZWxlbWVudFxyXG4gKlxyXG4gKiBAcmV0dXJucyB7UG9zaXRpb259XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbihzaXplKSB7XHJcbiAgICB0aGlzLnNpemUgPSBzaXplO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcclxuICpcclxuICogQHJldHVybnMge1NpemV9XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zaXplO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRydWUgaWYgcGFzc2VkIG9mZnNldCBtYXRjaGVzIGVsZW1lbnQgcG9zaXRpb25cclxuICpcclxuICogQHBhcmFtIGNsaWVudFhcclxuICogQHBhcmFtIGNsaWVudFlcclxuICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAqL1xyXG5VSUVsZW1lbnQucHJvdG90eXBlLmlzT2Zmc2V0SW4gPSBmdW5jdGlvbiAoY2xpZW50WCwgY2xpZW50WSlcclxue1xyXG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcclxuICAgIHZhciBjdXJyZW50U2l6ZSA9IHRoaXMuZ2V0U2l6ZSgpO1xyXG5cclxuICAgIGlmIChjdXJyZW50UG9zaXRpb24uZ2V0WCgpID4gY2xpZW50WCB8fCBjdXJyZW50UG9zaXRpb24uZ2V0WCgpICsgY3VycmVudFNpemUuZ2V0V2lkdGgoKSA8IGNsaWVudFgpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoY3VycmVudFBvc2l0aW9uLmdldFkoKSA+IGNsaWVudFkgfHwgY3VycmVudFBvc2l0aW9uLmdldFkoKSArIGN1cnJlbnRTaXplLmdldEhlaWdodCgpIDwgY2xpZW50WSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGhvdyBmYXIgaXMgcGFzc2VkIG9mZnNldCBmcm9tIHBvaW50ICgwLCAwKVxyXG4gKlxyXG4gKiBAcGFyYW0gY2xpZW50WFxyXG4gKiBAcGFyYW0gY2xpZW50WVxyXG4gKiBAcmV0dXJucyB7e3RvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fVxyXG4gKi9cclxuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRDbGlja09mZnNldCA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKSB7XHJcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHRvcDogY2xpZW50WCAtIHBvc2l0aW9uLmdldFgoKSxcclxuICAgICAgICBsZWZ0OiBjbGllbnRZIC0gcG9zaXRpb24uZ2V0WSgpXHJcbiAgICB9XHJcbn07IiwiLyoqXHJcbiAqIE9iamVjdCwgd2hpY2ggZGVmaW5lcyBob3cgdG8gcmVuZGVyIHNwZWNpZmljIFVJRWxlbWVudFxyXG4gKiBUaGlzIG9iamVjdCBrbm93cyBldmVyeXRoaW5nIGFib3V0IGFuIG9iamVjdCBpdCBuZWVkcyB0byBkcmF3LlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJRWxlbWVudFZpZXcoKVxyXG57XHJcblxyXG59XHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0gVUlFbGVtZW50XHJcbiAqL1xyXG5VSUVsZW1lbnRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoVUlFbGVtZW50KSB7XHJcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1lvdSBzaG91bGQgbm90IGJlIHVzaW5nIGFuIGFic3RyYWN0IG9iamVjdCBmb3IgcmVuZGVyaW5nIScpO1xyXG59O1xyXG4iLCIvKipcclxuICpcclxuICogQHBhcmFtIHtQb3NpdGlvbnxudWxsfSBwb3NpdGlvblxyXG4gKiBAcGFyYW0ge1NpemV8bnVsbH0gc2l6ZVxyXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJSW1hZ2VFbGVtZW50KHBvc2l0aW9uLCBzaXplLCBpbWFnZSlcclxue1xyXG4gICAgVUlFbGVtZW50LmNhbGwodGhpcywgcG9zaXRpb24sIHNpemUpO1xyXG5cclxuICAgIGlmICggISAoaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZSkpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW1hZ2UgbXVzdCBoYXZlIEltYWdlIHR5cGUhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcclxufVxyXG5cclxuVUlJbWFnZUVsZW1lbnQucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnQucHJvdG90eXBlKTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcmV0dXJucyB7SW1hZ2V9XHJcbiAqL1xyXG5VSUltYWdlRWxlbWVudC5wcm90b3R5cGUuZ2V0SW1hZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcclxufTsiLCIvKipcclxuICogQ2xhc3MgZm9yIGNyZWF0aW5nXHJcbiAqXHJcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cclxuICogQHBhcmFtIHtTaXplfG51bGx9IHNpemVcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICogQHBhcmFtIHsqfSBzdHlsZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIFVJTGFiZWxFbGVtZW50KHBvc2l0aW9uLCBzaXplLCB0ZXh0LCBzdHlsZSkge1xyXG4gICAgVUlFbGVtZW50LmFwcGx5KHRoaXMsIFtwb3NpdGlvbiwgc2l6ZV0pO1xyXG5cclxuICAgIGlmICghdGV4dCkge1xyXG4gICAgICAgIHRleHQgPSBVSUxhYmVsRWxlbWVudC5kZWZhdWx0VGV4dDtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG5cclxuICAgIGlmICghIChzdHlsZSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcclxuICAgICAgICBzdHlsZSA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZm9udCA9IHN0eWxlLmZvbnQgfHwgVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFN0eWxlLmZvbnQ7XHJcbiAgICB0aGlzLmNvbG9yID0gc3R5bGUuY29sb3IgfHwgVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFN0eWxlLmNvbG9yO1xyXG59XHJcblxyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xyXG5cclxuLyoqXHJcbiAqIEdldHMgYSB0ZXh0IG9mIHRoZSBjdXJyZW50IFVJTGFiZWxFbGVtZW50XHJcbiAqXHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAqL1xyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLnRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICovXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0XHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ3xzdHJpbmd8Kn1cclxuICovXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5nZXRGb250ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuZm9udDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIHRoZSBmb250IG9mIHRoZSBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmb250XHJcbiAqL1xyXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuc2V0Rm9udCA9IGZ1bmN0aW9uIChmb250KSB7XHJcbiAgICB0aGlzLmZvbnQgPSBmb250O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGNvbG9yIG9mIHRoZSB0ZXh0XHJcbiAqXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICovXHJcblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5nZXRDb2xvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHJldHVybiB0aGlzLmNvbG9yO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIGNvbG9yIG9mIHRoZSB0ZXh0XHJcbiAqXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclxyXG4gKi9cclxuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLnNldENvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICB0aGlzLmNvbG9yID0gY29sb3I7XHJcbn07XHJcblxyXG5VSUxhYmVsRWxlbWVudC5kZWZhdWx0VGV4dCA9IFwi0JLQstC10LTQuNGC0LUg0YLQtdC60YHRgi4uLlwiO1xyXG5cclxuVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFN0eWxlID0ge1xyXG4gICAgZm9udDogJ0FyaWFsJyxcclxuICAgIGNvbG9yOiAnIzAwMDAwMCdcclxufTsiLCIvKipcclxuICogT2JqZWN0IGZvciBjcmVhdGluZyBWQk8gYW5kIHN0b3JpbmcgaXRcclxuICogdG8gaGF2ZSBjYXBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IGNoYW5nZSBjdXJyZW50IG1vZGVsXHJcbiAqXHJcbiAqIEBwYXJhbSBnbFxyXG4gKiBAcGFyYW0ganNvbk1vZGVsXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuZnVuY3Rpb24gTW9kZWwoZ2wsIGpzb25Nb2RlbCkge1xyXG4gICAgdGhpcy5idWlsZEJ1ZmZlcnMoZ2wsIGpzb25Nb2RlbClcclxufVxyXG5cclxuLyoqXHJcbiAqIEJpbmRzIGFsbCBidWZmZXJzXHJcbiAqXHJcbiAqIEBwYXJhbSBnbFxyXG4gKiBAcGFyYW0ganNvbk1vZGVsXHJcbiAqL1xyXG5Nb2RlbC5wcm90b3R5cGUuYnVpbGRCdWZmZXJzID0gZnVuY3Rpb24gKGdsLCBqc29uTW9kZWwpXHJcbntcclxuICAgIC8vINCh0L7Qt9C00LDQtdC8INCx0YPRhNC10YDRi1xyXG4gICAgdGhpcy5tb2RlbFZlcnRleGVzID0ganNvbk1vZGVsLm1lc2hlc1swXS52ZXJ0aWNlcztcclxuICAgIHRoaXMubW9kZWxJbmRleGVzID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwganNvbk1vZGVsLm1lc2hlc1swXS5mYWNlcyk7XHJcbiAgICB0aGlzLm1vZGVsVGV4Q29vcmRzID0ganNvbk1vZGVsLm1lc2hlc1swXS50ZXh0dXJlY29vcmRzWzBdO1xyXG4gICAgdGhpcy5tb2RlbE5vcm1hbHMgPSBqc29uTW9kZWwubWVzaGVzWzBdLm5vcm1hbHM7XHJcblxyXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LHRg9GE0LXRgCAtINGH0LXRgNC10Lcg0L3QtdCz0L4g0L/QtdGA0LXQtNCw0LXRgtGB0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LIgR1BVXHJcbiAgICB0aGlzLm1vZGVsVmVydGV4QnVmZmVyT2JqZWN0ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XHJcbiAgICAvLyDQndCw0LfQvdCw0YfQsNC10Lwg0LXQs9C+INCw0LrRgtC40LLQvdGL0LxcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsVmVydGV4QnVmZmVyT2JqZWN0KTtcclxuICAgIC8vIFNUQVRJQ19EUkFXIC0g0LrQvtC/0LjRgNGD0LXQvCDQtdC00LjQvdC+0LbQtNGLINC40LcgQ1BVINCyIEdQVVxyXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5tb2RlbFZlcnRleGVzKSwgZ2wuU1RBVElDX0RSQVcpO1xyXG5cclxuICAgIC8vINCe0YLQtNC10LvRjNC90YvQuSDQsdGD0YTQtdGAINC00LvRjyDRgtC10LrRgdGC0YPRgNC90YvRhSDQutC+0L7RgNC00LjQvdCw0YJcclxuICAgIHRoaXMubW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsVGV4Q29vcmRzQnVmZmVyT2JqZWN0KTtcclxuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KHRoaXMubW9kZWxUZXhDb29yZHMpLCBnbC5TVEFUSUNfRFJBVyk7XHJcblxyXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LjQvdC00LXQutGB0L3Ri9C5INCx0YPRhNC10YAg0LTQu9GPINGD0LrQsNC30LDQvdC40Y8g0L/QvtGA0Y/QtNC60LAg0LLQtdGA0YjQuNC9XHJcbiAgICB0aGlzLm1vZGVsSW5kZXhCdWZmZXJPYmplY3QgPSBnbC5jcmVhdGVCdWZmZXIoKTtcclxuICAgIC8vINCd0LDQt9C90LDRh9Cw0LXQvCDQtdCz0L4g0LDQutGC0LjQstC90YvQvFxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbEluZGV4QnVmZmVyT2JqZWN0KTtcclxuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG5ldyBVaW50MTZBcnJheSh0aGlzLm1vZGVsSW5kZXhlcyksIGdsLlNUQVRJQ19EUkFXKTtcclxuXHJcbiAgICAvLyDQkdGD0YTQtdGAINGBINC90L7RgNC80LDQu9GP0LzQuFxyXG4gICAgdGhpcy5tb2RlbE5vcm1hbEJ1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QpO1xyXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5tb2RlbE5vcm1hbHMpLCBnbC5TVEFUSUNfRFJBVyk7XHJcbn07XHJcblxyXG5Nb2RlbC5wcm90b3R5cGUuYmluZEJ1ZmZlcnMgPSBmdW5jdGlvbiAoZ2wpIHtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsVmVydGV4QnVmZmVyT2JqZWN0KTtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsVGV4Q29vcmRzQnVmZmVyT2JqZWN0KTtcclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxJbmRleEJ1ZmZlck9iamVjdCk7XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbE5vcm1hbEJ1ZmZlck9iamVjdCk7XHJcbn07IiwiLyoqXHJcbiAqIEBwYXJhbSBjYW52YXNcclxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGdsQ29udGV4dFxyXG4gKiBAcGFyYW0ge0ltYWdlfSBpbml0aWFsVGV4dHVyZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVydGV4U2hhZGVyXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudFNoYWRlclxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIE1vZGVsVmlldyhjYW52YXMsIGdsQ29udGV4dCwgaW5pdGlhbFRleHR1cmUsIHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpIHtcclxuXHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcclxuICAgIHRoaXMuZ2wgPSBnbENvbnRleHQ7XHJcblxyXG5cclxuICAgIHRoaXMudGV4dHVyZSA9IGluaXRpYWxUZXh0dXJlO1xyXG4gICAgdGhpcy5pbml0aWFsaXplKHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpO1xyXG5cclxuICAgIHRoaXMuc2V0VGV4dHVyZShpbml0aWFsVGV4dHVyZSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVydGV4U2hhZGVyIC0gdmVydGV4IHNoYWRlciBzb3VyY2VcclxuICogQHBhcmFtIHtzdHJpbmd9IGZyYWdtZW50U2hhZGVyIC0gZnJhZ21lbnQgc2hhZGVyIHNvdXJjZVxyXG4gKi9cclxuTW9kZWxWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpXHJcbntcclxuICAgIHZhciBnbCA9IHRoaXMuZ2w7XHJcblxyXG4gICAgLy8g0JLQutC70Y7Rh9Cw0LXQvCDQv9GA0L7QstC10YDQutGDINCz0LvRg9Cx0LjQvdGLXHJcbiAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XHJcblxyXG4gICAgLy8g0JfQsNC00LDQtdC8INGG0LLQtdGCINC+0YfQuNGB0YLQutC4XHJcbiAgICBnbC5jbGVhckNvbG9yKDAuOCwgMC45LCAwLjkgLCAwLjApO1xyXG4gICAgLy8g0J7Rh9C40YHRgtC60LAgLSDRh9GC0L4g0L7Rh9C40YnQsNC10LwgLSDQsdGD0YTQtdGAINGG0LLQtdGC0LAsINC40LvQuCDQttC1INCx0YPRhNC10YAg0LPQu9GD0LHQuNC90YtcclxuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcclxuXHJcbiAgICB2YXIgc2hhZGVyQ29tcGlsZXIgPSBuZXcgU2hhZGVyQ29tcGlsZXIoZ2wpO1xyXG4gICAgdGhpcy5zaGFkZXJQcm9ncmFtID0gc2hhZGVyQ29tcGlsZXIubWFrZVByb2dyYW0odmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcik7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBhIG5ldyB0ZXh0dXJlIGFzIGFjdGl2ZSB0ZXh0dXJlXHJcbiAqIFxyXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxyXG4gKi9cclxuTW9kZWxWaWV3LnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKGltYWdlKSB7XHJcblxyXG4gICAgdGhpcy50ZXh0dXJlID0gaW1hZ2U7XHJcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xyXG5cclxuICAgIC8vIENyZWF0aW5nIHRleHR1cmVcclxuICAgIHRoaXMubW9kZWxUZXh0dXJlID0gZ2wuY3JlYXRlVGV4dHVyZSgpO1xyXG4gICAgLy8gQmluZGluZyBpdFxyXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5tb2RlbFRleHR1cmUpO1xyXG4gICAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgdHJ1ZSk7XHJcbiAgICAvLyBpIGZvciBpbnRlZ2VyICwgcywgdCAtIHUsIHZcclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xyXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX1dSQVBfVCwgZ2wuQ0xBTVBfVE9fRURHRSk7XHJcbiAgICAvLyBGaWx0ZXJzXHJcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcclxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xyXG4gICAgLy8g0KHQsNC80LAg0YLQtdC60YHRgtGD0YDQsFxyXG4gICAgZ2wudGV4SW1hZ2UyRChcclxuICAgICAgICBnbC5URVhUVVJFXzJELCAvLyBUZXh0dXJlIHR5cGVcclxuICAgICAgICAwLCAvLyBEZXRhaWwgbGV2ZWxcclxuICAgICAgICBnbC5SR0JBLCAvLyBXaGF0IGZvcm1hdCBkbyB3ZSB1c2VcclxuICAgICAgICBnbC5SR0JBLFxyXG4gICAgICAgIGdsLlVOU0lHTkVEX0JZVEUsIC8vIERhdGEgdHlwZVxyXG4gICAgICAgIHRoaXMudGV4dHVyZSAvLyBUZXh0dXJlIGl0c2VsZlxyXG4gICAgKTtcclxuICAgIC8vIFVuYmluZCBmb3Igbm93XHJcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXRzIGFjdGl2ZSBtb2RlbCBhbmQgYmluZHMgYWxsIG9mIHRoZSBidWZmZXJzXHJcbiAqXHJcbiAqIEBwYXJhbSB7TW9kZWx9IG1vZGVsXHJcbiAqL1xyXG5Nb2RlbFZpZXcucHJvdG90eXBlLnNldE1vZGVsID0gZnVuY3Rpb24gKG1vZGVsKSB7XHJcblxyXG4gICAgdGhpcy5tb2RlbCA9IG1vZGVsO1xyXG4gICAgdmFyIHByb2dyYW0gPSB0aGlzLnNoYWRlclByb2dyYW07XHJcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xyXG5cclxuICAgIG1vZGVsLmJpbmRCdWZmZXJzKGdsKTtcclxuXHJcbiAgICAvLyDQo9Cy0LXQtNC+0LzQu9GP0LXQvCDRiNC10LnQtNC10YAg0L4g0YLQvtC8LCDQutCw0Log0LHRgNCw0YLRjCDQtNCw0L3QvdGL0LUg0LjQtyDQsdGD0YTQtdGA0LAg0LIg0LrQsNGH0LXRgdGC0LLQtSDQstGF0L7QtNC90YvRhSDQv9Cw0YDQsNC80LXRgtGA0L7QslxyXG4gICAgdmFyIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydFBvc2l0aW9uJyk7XHJcblxyXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG1vZGVsLm1vZGVsVmVydGV4QnVmZmVyT2JqZWN0KTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgcG9zaXRpb25BdHRyaWJ1dGVMb2NhdGlvbiwgLy8g0L3QsNGIINCw0YLRgNC40LHRg9GCXHJcbiAgICAgICAgMywgLy8g0JrQvtC70LjRh9C10YHRgtCy0L4g0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0LDRgtGA0LjQsdGD0YJcclxuICAgICAgICBnbC5GTE9BVCwgLy8g0KLQuNC/INC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LHRg9GE0LXRgNCwXHJcbiAgICAgICAgZ2wuRkFMU0UsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XHJcbiAgICAgICAgMyAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxyXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxyXG4gICAgKTtcclxuICAgIC8vINCS0LrQu9GO0YfQsNC10Lwg0LDRgtGA0LjQsdGD0YJcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xyXG5cclxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBtb2RlbC5tb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCk7XHJcbiAgICB2YXIgdGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0VGV4Q29vcmQnKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgdGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbiwgLy8g0L3QsNGIINCw0YLRgNC40LHRg9GCXHJcbiAgICAgICAgMiwgLy8g0JrQvtC70LjRh9C10YHRgtCy0L4g0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0LDRgtGA0LjQsdGD0YJcclxuICAgICAgICBnbC5GTE9BVCwgLy8g0KLQuNC/INC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LHRg9GE0LXRgNCwXHJcbiAgICAgICAgZ2wuRkFMU0UsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XHJcbiAgICAgICAgMiAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxyXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxyXG4gICAgKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24pO1xyXG5cclxuICAgIC8vINCd0L7RgNC80LDQu9C4INCyINGI0LXQudC00LXRgNC1XHJcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbW9kZWwubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QpO1xyXG4gICAgdmFyIG5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgJ3ZlcnROb3JtYWwnKTtcclxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXHJcbiAgICAgICAgbm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIC8vINC90LDRiCDQsNGC0YDQuNCx0YPRglxyXG4gICAgICAgIDMsIC8vINCa0L7Qu9C40YfQtdGB0YLQstC+INGN0LvQtdC80LXQvdGC0L7QsiDQvdCwINCw0YLRgNC40LHRg9GCXHJcbiAgICAgICAgZ2wuRkxPQVQsIC8vINCi0LjQvyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCx0YPRhNC10YDQsFxyXG4gICAgICAgIGdsLlRSVUUsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XHJcbiAgICAgICAgMyAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxyXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxyXG4gICAgKTtcclxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KG5vcm1hbEF0dHJpYnV0ZUxvY2F0aW9uKTtcclxuXHJcbn07XHJcblxyXG5Nb2RlbFZpZXcucHJvdG90eXBlLnN0YXJ0UmVuZGVyID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGdsID0gdGhpcy5nbDtcclxuXHJcbiAgICAvLyDQnNCw0YLRgNC40YbRiyAtINC80LXRgdGC0L7Qv9C+0LvQvtC20LXQvdC40LUg0LIg0YjQtdC50LTQtdGA0LDRhVxyXG4gICAgdmFyIG1hdFdvcmxkVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgJ21Xb3JsZCcpO1xyXG4gICAgdmFyIG1hdFZpZXdVbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXJQcm9ncmFtLCAnbVZpZXcnKTtcclxuICAgIHZhciBtYXRQcm9qZWN0aW9uVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgJ21Qcm9qZWN0aW9uJyk7XHJcblxyXG4gICAgLy8g0KHQsNC80Lgg0LzQsNGC0YDQuNGG0YtcclxuICAgIHZhciB3b3JsZE1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xyXG4gICAgdmFyIHZpZXdNYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcclxuICAgIHZhciBwcm9qZWN0aW9uTWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XHJcbiAgICBtYXQ0LmlkZW50aXR5KHdvcmxkTWF0cml4KTtcclxuICAgIC8vINCf0L7Qt9C40YbQuNGPINC90LDQsdC70Y7QtNCw0YLQtdC70Y8sINC60YPQtNCwINC+0L0g0YHQvNC+0YLRgNC40YIsINC/0LvRjtGBINCy0LXQutGC0L7RgCDQstC10YDRhdCwXHJcbiAgICBtYXQ0Lmxvb2tBdCh2aWV3TWF0cml4LCBbMCwgMCwgLTEwXSwgWzAsIDAsIDBdLCBbMCwgMSwgMF0pO1xyXG4gICAgLy8g0J/QvtC70LUg0L7QsdC30L7RgNCwICjQsiDRgNCw0LTQuNCw0L3QsNGFKSwgdmlld3BvcnQsIGNsb3Nlc3QgcGxhbmUsIGZhciBwbGFuZVxyXG4gICAgbWF0NC5wZXJzcGVjdGl2ZShwcm9qZWN0aW9uTWF0cml4LCBnbE1hdHJpeC50b1JhZGlhbigzMCksIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy5jYW52YXMuaGVpZ2h0LCAwLjAxLCAxMDAuMCk7XHJcblxyXG4gICAgLy8g0JrQsNC60YPRjiDRiNC10LnQtNC10YDQvdGD0Y4g0L/RgNC+0LPRgNCw0LzQvNGDINC40YHQv9C+0LvRjNC30YPQtdC8XHJcbiAgICBnbC51c2VQcm9ncmFtKHRoaXMuc2hhZGVyUHJvZ3JhbSk7XHJcblxyXG4gICAgLy8g0J/QtdGA0LXQtNCw0LXQvCDQsiDRiNC10LnQtNC10YAuIFRSVUUgLSDRh9GC0L7QsdGLINGC0YDQsNC90YHQv9C+0L3QuNGA0L7QstCw0YLRjFxyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihtYXRXb3JsZFVuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHdvcmxkTWF0cml4KTtcclxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobWF0Vmlld1VuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHZpZXdNYXRyaXgpO1xyXG4gICAgZ2wudW5pZm9ybU1hdHJpeDRmdihtYXRQcm9qZWN0aW9uVW5pZm9ybUxvY2F0aW9uLCBnbC5GQUxTRSwgcHJvamVjdGlvbk1hdHJpeCk7XHJcblxyXG4gICAgLy8g0KPQs9C+0Lsg0LLRgNCw0YnQtdC90LjRj1xyXG4gICAgdmFyIGFuZ2xlWCA9IDA7XHJcbiAgICB2YXIgYW5nbGVZID0gMDtcclxuICAgIHZhciBpc01vdXNlUHJlc3NlZCA9IGZhbHNlO1xyXG4gICAgdmFyIGluaXRpYWxFdmVudCA9IG51bGw7XHJcbiAgICAvLyDQrdGC0L4g0YPQttC1INC+0YLRgdC10LHRj9GC0LjQvdCwINC/0L7RiNC70LBcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpc01vdXNlUHJlc3NlZCA9IHRydWU7XHJcbiAgICAgICAgaW5pdGlhbEV2ZW50ID0gZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaXNNb3VzZVByZXNzZWQgPSBmYWxzZTtcclxuICAgICAgICBpbml0aWFsRXZlbnQgPSBudWxsO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChpc01vdXNlUHJlc3NlZCkge1xyXG4gICAgICAgICAgICB2YXIgZGlmZlggPSBpbml0aWFsRXZlbnQuY2xpZW50WCAtIGUuY2xpZW50WDtcclxuICAgICAgICAgICAgdmFyIGRpZmZZID0gaW5pdGlhbEV2ZW50LmNsaWVudFkgLSBlLmNsaWVudFk7XHJcbiAgICAgICAgICAgIGluaXRpYWxFdmVudCA9IGU7XHJcbiAgICAgICAgICAgIGFuZ2xlWSArPSAtIChkaWZmWCAvIDIwMCk7XHJcbiAgICAgICAgICAgIGFuZ2xlWCArPSAgKGRpZmZZIC8gMjAwKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8g0KHQsdC10YDQtdCz0LDQtdC8INCy0YvRh9C40YHQu9C40YLQtdC70YzQvdGL0LUg0LzQvtGJ0L3QvtGB0YLQuFxyXG4gICAgLy8g0JPQu9Cw0LLQvdGL0Lkg0YbQuNC60YAg0YDQtdC90LTQtdGA0LBcclxuICAgIHZhciBpZGVudGl0eU1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xyXG4gICAgbWF0NC5pZGVudGl0eShpZGVudGl0eU1hdHJpeCk7XHJcblxyXG4gICAgdmFyIGxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8g0JrQsNC60YPRjiDQvNCw0YLRgNC40YbRgyDQstC+0LrRgNGD0LMg0LrQsNC60L7QuSDQstGA0LDRidCw0LXQvFxyXG4gICAgICAgIG1hdDQucm90YXRlKHdvcmxkTWF0cml4LCBpZGVudGl0eU1hdHJpeCwgYW5nbGVYLCBbMSwgMCwgMF0pO1xyXG4gICAgICAgIG1hdDQucm90YXRlKHdvcmxkTWF0cml4LCB3b3JsZE1hdHJpeCwgYW5nbGVZLCBbMCwgMSwgMF0pO1xyXG4gICAgICAgIC8vINCe0LHQvdC+0LLQu9GP0LXQvCDQv9C10YDQtdC80LXQvdC90YPRjiDQsiDRiNC10LnQtNC10YDQtVxyXG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobWF0V29ybGRVbmlmb3JtTG9jYXRpb24sIGdsLkZBTFNFLCB3b3JsZE1hdHJpeCk7XHJcblxyXG4gICAgICAgIC8vINCd0LDQt9C90LDRh9C10L3QuNC1INGC0LXQutGB0YLRg9GA0YtcclxuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBzZWxmLm1vZGVsVGV4dHVyZSk7XHJcblxyXG4gICAgICAgIC8vINCQ0LrRgtC40LLQvdGL0Lkg0YHQu9C+0YIg0YLQtdC60YHRgtGD0YDRi1xyXG4gICAgICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xyXG5cclxuICAgICAgICBnbC5jbGVhckNvbG9yKDAuOCwgMC45LCAwLjkgLDEuMCk7XHJcbiAgICAgICAgZ2wuY2xlYXIoZ2wuREVQVEhfQlVGRkVSX0JJVCB8IGdsLkNPTE9SX0JVRkZFUl9CSVQgKTtcclxuXHJcbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKFxyXG4gICAgICAgICAgICBnbC5UUklBTkdMRVMsIC8vINCa0LDQuiDRgNC40YHRg9C10LwsXHJcbiAgICAgICAgICAgIHNlbGYubW9kZWwubW9kZWxJbmRleGVzLmxlbmd0aCxcclxuICAgICAgICAgICAgZ2wuVU5TSUdORURfU0hPUlQsIC8vINCi0LjQv1xyXG4gICAgICAgICAgICAwIC8vINCh0LrQvtC70YzQutC+INC/0YDQvtC/0YPRgdC60LDQvCDQstC10YDRiNC40L1cclxuICAgICAgICApO1xyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcclxuICAgIH07XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XHJcbn07XHJcbiIsIi8qKlxyXG4gKiBTaGFkZXIgY29tcGlsZXJcclxuICogU2ltcGx5IG1ha2VzIFdlYkdMUHJvZ3JhbSBmcm9tIHNoYWRlciBzb3VyY2VzXHJcbiAqXHJcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSB3ZWJHTFJlbmRlcmluZ0NvbnRlbnRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBTaGFkZXJDb21waWxlcih3ZWJHTFJlbmRlcmluZ0NvbnRlbnQpIHtcclxuICAgIHRoaXMud2ViR0xDb250ZXh0ID0gd2ViR0xSZW5kZXJpbmdDb250ZW50OyAgICAgXHJcbn1cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVydGV4U2hhZGVyU291cmNlXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudFNoYWRlclNvdXJjZVxyXG4gKiBAcmV0dXJuIHtXZWJHTFByb2dyYW19XHJcbiAqL1xyXG5TaGFkZXJDb21waWxlci5wcm90b3R5cGUubWFrZVByb2dyYW0gPSBmdW5jdGlvbiAodmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSkge1xyXG4gICAgdmFyIGdsID0gdGhpcy53ZWJHTENvbnRleHQ7XHJcblxyXG4gICAgLy8gQ3JlYXRpbmcgc2hhZGVyXHJcbiAgICB2YXIgdmVydGV4U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLlZFUlRFWF9TSEFERVIpO1xyXG4gICAgdmFyIGZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XHJcblxyXG4gICAgLy8gU2V0dGluZyBzaGFkZXIgc291cmNlc1xyXG4gICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleFNoYWRlciwgdmVydGV4U2hhZGVyU291cmNlKTtcclxuICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpO1xyXG5cclxuICAgIC8vIENvbXBpbGluZyBzaGFkZXJcclxuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcclxuXHJcbiAgICAvLyBDaGVja2luZyBjb21waWxhdGlvbiBzdGF0dXNcclxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHZlcnRleFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBjb21waWxpbmcgdmVydGV4IHNoYWRlciEnLCBnbC5nZXRTaGFkZXJJbmZvTG9nKHZlcnRleFNoYWRlcikpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcclxuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGNvbXBpbGluZyBmcmFnbWVudCBzaGFkZXIhJywgZ2wuZ2V0U2hhZGVySW5mb0xvZyhmcmFnbWVudFNoYWRlcikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIHdhbnQgdG8gbWFrZSBhIHByb2dyYW0gc2hhZGVyIHNvdXJjZXNcclxuICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xyXG5cclxuICAgIC8vIFdlYkdMIGtub3dzIHR5cGUgb2YgZWFjaCBzaGFkZXJcclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcclxuXHJcbiAgICAvLyBMaW5raW5nXHJcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcclxuXHJcbiAgICAvLyBEbyB3ZSBoYXZlIGxpbmtpbmcgZXJyb3JzP1xyXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTGlua2luZyBlcnJvciEnLCBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gT25seSBmb3IgdGVzdGluZyBwdXJwb3Nlc1xyXG4gICAgZ2wudmFsaWRhdGVQcm9ncmFtKHByb2dyYW0pO1xyXG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLlZBTElEQVRFX1NUQVRVUykpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbGlkYXRpbmcgZXJyb3IhJywgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBwcm9ncmFtO1xyXG59O1xyXG5cclxuIiwiLyoqXHJcbiAqXHJcbiAqIEBwYXJhbSB7Q2FudmFzU3VyZmFjZX0gc3VyZmFjZVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZ1bmN0aW9uIENvbXBvbmVudHNQYW5lbChzdXJmYWNlKVxyXG57XHJcbiAgICB0aGlzLl9zdXJmYWNlID0gc3VyZmFjZTtcclxuICAgIFxyXG4gICAgdGhpcy5fZmlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVVcGxvYWRlcicpO1xyXG4gICAgdGhpcy5fYnRuVXBkYXRlVGV4dHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGRhdGVUZXh0dXJlJyk7XHJcbiAgICB0aGlzLl9idG5BZGRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0bkFkZFRleHQnKTtcclxuICAgIHRoaXMuX3NlbGVjdEJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0QmFja2dyb3VuZCcpO1xyXG59XHJcblxyXG5Db21wb25lbnRzUGFuZWwucHJvdG90eXBlLmJpbmRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIFxyXG4gICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIGZvciBjbGljayBvbiB0ZXh0IGJ1dHRvblxyXG4gICAgdGhpcy5fYnRuQWRkVGV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnB1c2hMYWJlbCgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIFVwZGF0ZSBjdXJyZW50IHRleHR1cmUgYnV0dG9uXHJcbiAgICB0aGlzLl9idG5VcGRhdGVUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIG1vZGVsVmlldy5zZXRUZXh0dXJlKHNlbGYuX3N1cmZhY2UudG9JbWFnZSgpKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9uIGNsaWNrIHdlIHNldCB2YWx1ZSB0byBlbXB0eSBhbmQgdGhlIHJlYXNvblxyXG4gICAgLy8gd2h5IHdlIGFyZSBkb2luZyB0aGlzIGlzIGJlY2F1c2Ugd2Ugd2FudCB0b1xyXG4gICAgLy8gYWRkIG5ldyBpbWFnZSBvbiB0aGUgc3VyZmFjZSBldmVuIGlmIGl0IGlzIHRoZVxyXG4gICAgLy8gc2FtZSBmaWxlIChpbiBjYXNlIHVzZXIgc2VsZWN0ZWQgaXQgZWFybGllcilcclxuICAgIHRoaXMuX2ZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9ICcnO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU2V0dGluZyBjbGVhciBjb2xvciBmb3IgY2FudmFzIHN1cmZhY2VcclxuICAgIHRoaXMuX3NlbGVjdEJhY2tncm91bmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vIFRoZXJlIGlzIGFuIGVtcHR5IHZhbHVlIGluIHRoZSBsaXN0XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgc2VsZi5fc3VyZmFjZS5zZXRDbGVhckNvbG9yKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9uIGNoYW5nZSB3ZSBsb2FkaW5nIGZpbGUuXHJcbiAgICB0aGlzLl9maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xyXG4gICAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuXHJcbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGFJbWFnZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucmVzdWx0O1xyXG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gZGF0YUltYWdlO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gYWRkaW5nIHVwbG9hZGVkIGltYWdlIHRvIHRoZSBzdXJmYWNlXHJcbiAgICAgICAgICAgIHNlbGYuX3N1cmZhY2UucHVzaEltYWdlKGltYWdlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XHJcbiAgICB9KTtcclxufTtcclxuIiwiLyoqXHJcbiAqIFBhcnQgb2YgdGhlIGRvY3VtZW50IGZvciBtYW5pcHVsYXRpb24gd2l0aCBwcm9wZXJ0aWVzIFxyXG4gKiBvZiB0aGUgc2VsZWN0ZWQgVUlFbGVtZW50IG9uIENhbnZhc1N1cmZhY2VcclxuICpcclxuICogQXdhcmUgb2YgdGhlIGRvY3VtZW50IGNvbnRlbnRcclxuICogSGFuZGxlcyBIVE1MIG1hbmlwdWxhdGlvbnNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG5mdW5jdGlvbiBQcm9wZXJ0aWVzUGFuZWwoc3VyZmFjZSlcclxue1xyXG4gICAgdGhpcy5fdGV4dFBhbmVsID0ge1xyXG4gICAgICAgIHBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dE9wdGlvbnMnKSxcclxuICAgICAgICBzZWxlY3RGb250OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9udFNlbGVjdCcpLFxyXG4gICAgICAgIHNlbGVjdENvbG9yOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3JGb250U2VsZWN0JyksXHJcbiAgICAgICAgdGV4dEFyZWE6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RlZFRleHRDb250ZW50JyksXHJcbiAgICAgICAgdGV4dFVwQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dFVwQnRuJyksXHJcbiAgICAgICAgdGV4dERvd25CdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0RG93bkJ0bicpXHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICB0aGlzLl9jb21tb25QYW5lbCA9IHtcclxuICAgICAgICBwYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1vbk9wdGlvbnMnKSxcclxuICAgICAgICByZW1vdmVCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmVCdG4nKSxcclxuICAgICAgICB1cEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwQnRuJyksXHJcbiAgICAgICAgZG93bkJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rvd25CdG4nKVxyXG4gICAgfTtcclxuICAgIFxyXG4gICAgdGhpcy5faW1hZ2VQYW5lbCA9IHtcclxuICAgICAgICBwYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlT3B0aW9ucycpXHJcbiAgICB9O1xyXG4gICAgdGhpcy5fZW1wdHlQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub1NlbGVjdGVkT3B0aW9ucycpO1xyXG4gICAgXHJcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnQgPSBudWxsO1xyXG4gICAgdGhpcy5fc3VyZmFjZSA9IHN1cmZhY2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBoYW5kbGVycyB0byB0aGUgZXZlbnRzXHJcbiAqL1xyXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLmJpbmRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAvLyBTZWxlY3Rpb24gZXZlbnRzIGZyb20gY2FudmFzIHN1cmZhY2VcclxuICAgIHRoaXMuX3N1cmZhY2UuYWRkU2VsZWN0RXZlbnRIYW5kbGVyKGZ1bmN0aW9uICh1aUVsZW1lbnQpIHtcclxuICAgICAgICBzZWxmLnNldFNlbGVjdGVkKHVpRWxlbWVudCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuX3N1cmZhY2UuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuc2V0U2VsZWN0ZWQobnVsbCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBCdXR0b24gY2xpY2sgZm9yIGNvbW1vbiBvcHRpb25zIC0gcmVtb3ZlIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50XHJcbiAgICB0aGlzLl9jb21tb25QYW5lbC5yZW1vdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbW92ZVNlbGVjdGVkKCk7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1vdmUgZm9yZWdyb3VuZFxyXG4gICAgdGhpcy5fY29tbW9uUGFuZWwudXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnNlbGVjdGVkVG9Gb3JlZ3JvdW5kKCk7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE1vdmUgYmFja2dyb3VuZFxyXG4gICAgdGhpcy5fY29tbW9uUGFuZWwuZG93bkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIHNlbGYuX3N1cmZhY2Uuc2VsZWN0ZWRUb0JhY2tncm91bmQoKTtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQmluZGluZyB0ZXh0IGNoYW5nZSBldmVudCB0aHJvdWdoIHRleHQgYXJlYSBlbGVtZW50XHJcbiAgICB0aGlzLl90ZXh0UGFuZWwudGV4dEFyZWEuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vIElmIHRoaXMgZXZlbnQgaGFwcGVuZWRcclxuICAgICAgICAvLyB0aGVuIHdlIGhhdmUgYSBsYWJlbCBhcyBzZWxlY3RlZCBlbGVtZW50XHJcbiAgICAgICAgc2VsZi5fc2VsZWN0ZWRFbGVtZW50LnNldFRleHQodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIFVwZGF0ZXMgc2VsZWN0ZWQgZm9udFxyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdEZvbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX3NlbGVjdGVkRWxlbWVudC5zZXRGb250KHRoaXMudmFsdWUpO1xyXG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBVcGRhdGVzIHNlbGVjdGVkIGNvbG9yXHJcbiAgICB0aGlzLl90ZXh0UGFuZWwuc2VsZWN0Q29sb3IuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNlbGYuX3NlbGVjdGVkRWxlbWVudC5zZXRDb2xvcih0aGlzLnZhbHVlKTtcclxuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0cyBzZWxlY3RlZCBlbGVtZW50LlxyXG4gKiBTaG93IHByb3BlcnRpZXMgd2luZG93IGRlcGVuZGluZyBvbiB3aGF0IGlzIHRoZSB0eXBlIG9mIGFuIGVsZW1lbnQgXHJcbiAqIFxyXG4gKiBAcGFyYW0ge1VJRWxlbWVudHxudWxsfSB1aUVsZW1lbnRcclxuICovXHJcblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2V0U2VsZWN0ZWQgPSBmdW5jdGlvbiAodWlFbGVtZW50KSB7XHJcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnQgPSB1aUVsZW1lbnQ7XHJcbiAgICBcclxuICAgIGlmICh1aUVsZW1lbnQgaW5zdGFuY2VvZiBVSUxhYmVsRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuc2hvd1RleHRQcm9wZXJ0aWVzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiAodWlFbGVtZW50IGluc3RhbmNlb2YgVUlJbWFnZUVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLnNob3dJbWFnZVByb3BlcnRpZXMoKTtcclxuICAgICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5zaG93Tm90aGluZ1NlbGVjdGVkUGFuZWwoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIaWRlcyBhbGwgb2YgdGhlIHBhbmVsc1xyXG4gKi9cclxuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5oaWRlQWxsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgdGhpcy5faW1hZ2VQYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxuICAgIHRoaXMuX2NvbW1vblBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xyXG4gICAgdGhpcy5fZW1wdHlQYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIaWRlcyBhbGwgZXhjZXB0IHRleHQgcHJvcGVydGllcyBwYW5lbFxyXG4gKi9cclxuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zaG93VGV4dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmhpZGVBbGwoKTtcclxuICAgIHRoaXMuX3RleHRQYW5lbC50ZXh0QXJlYS5pbm5lckhUTUwgPSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQuZ2V0VGV4dCgpO1xyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdEZvbnQudmFsdWUgPSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQuZ2V0Rm9udCgpO1xyXG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdENvbG9yLnZhbHVlID0gdGhpcy5fc2VsZWN0ZWRFbGVtZW50LmdldENvbG9yKCk7XHJcbiAgICB0aGlzLl90ZXh0UGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XHJcbiAgICB0aGlzLl9jb21tb25QYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIaWRlcyBldmVyeXRoaW5nIGV4Y2VwdCBpbWFnZXMgcGFuZWxcclxuICovXHJcblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd0ltYWdlUHJvcGVydGllcyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuaGlkZUFsbCgpO1xyXG4gICAgdGhpcy5faW1hZ2VQYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcclxuICAgIHRoaXMuX2NvbW1vblBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhpZGVzIGFsbCBleGNlcHQgXCJub3RoaW5nIHNlbGVjdGVkXCIgcGFuZWxcclxuICovXHJcblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd05vdGhpbmdTZWxlY3RlZFBhbmVsID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5oaWRlQWxsKCk7XHJcbiAgICB0aGlzLl9lbXB0eVBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xyXG59OyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xyXG4gICAgdmFyIHN1cmZhY2UgPSBuZXcgQ2FudmFzU3VyZmFjZShjYW52YXMpO1xyXG4gICAgc3VyZmFjZS5yZW5kZXIoKTtcclxuXHJcbiAgICAvLyBQYW5lbCBmb3IgY3JlYXRpbmcgbmV3IGVsZW1lbnRzIG9uXHJcbiAgICB2YXIgY29tcG9uZW50UGFuZWwgPSBuZXcgQ29tcG9uZW50c1BhbmVsKHN1cmZhY2UpO1xyXG4gICAgY29tcG9uZW50UGFuZWwuYmluZEhhbmRsZXJzKCk7XHJcblxyXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgcGFuZWxcclxuICAgIC8vIGFuZCBhdHRhY2hpbmcgaXQgdG8gY2FudmFzIGV2ZW50c1xyXG4gICAgdmFyIHByb3BlcnRpZXNQYW5lbCA9IG5ldyBQcm9wZXJ0aWVzUGFuZWwoc3VyZmFjZSk7XHJcbiAgICBwcm9wZXJ0aWVzUGFuZWwuYmluZEhhbmRsZXJzKCk7XHJcblxyXG4gICAgLy8gSW5pdGlhbGl6aW5nIG1vZGVsIHZpZXdlclxyXG4gICAgd2luZG93Lm1vZGVsVmlldyA9IG51bGw7XHJcbiAgICB2YXIgY3VwU3VyZmFjZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXBTdXJmYWNlJyk7XHJcbiAgICB2YXIgbG9hZGVyID0gbmV3IFJlc291cmNlTG9hZGVyKCk7XHJcblxyXG4gICAgdmFyIHJlc291cmNlUHJlcGFyZXIgPSBuZXcgUmVzb3VyY2VQcmVwYXJlcihsb2FkZXIsIFtcclxuICAgICAgICB7a2V5OiAnbW9kZWxDdXAxJywgc3JjOiAnL21vZGVscy9jdXAxLmpzb24nLCB0eXBlOiAnanNvbid9LFxyXG4gICAgICAgIHtrZXk6ICdtb2RlbEN1cDInLCBzcmM6ICcvbW9kZWxzL2N1cDIuanNvbicsIHR5cGU6ICdqc29uJ30sXHJcbiAgICAgICAge2tleTogJ3ZlcnRleFNoYWRlcicsIHNyYzogJy9zaGFkZXJzL2ZyYWdtZW50Lmdsc2wnLCB0eXBlOiAndGV4dCd9LFxyXG4gICAgICAgIHtrZXk6ICdmcmFnbWVudFNoYWRlcicsIHNyYzogJy9zaGFkZXJzL3ZlcnRleC5nbHNsJywgdHlwZTogJ3RleHQnfSxcclxuICAgICAgICB7a2V5OiAnaW5pdGlhbFRleHR1cmUnLCBzcmM6ICcvaW1nL2xvZ29HcmV5LmpwZycsIHR5cGU6ICdpbWFnZSd9XHJcbiAgICBdLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IGV4dHJhY3RcclxuICAgICAgICB2YXIgZ2xDb250ZXh0ID0gY3VwU3VyZmFjZS5nZXRDb250ZXh0KCd3ZWJnbCcpO1xyXG5cclxuICAgICAgICBpZiAoIWdsQ29udGV4dCkge1xyXG4gICAgICAgICAgICBnbENvbnRleHQgPSBjdXBTdXJmYWNlLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWdsQ29udGV4dCkge1xyXG4gICAgICAgICAgICBhbGVydCgnU2VlbXMgbGlrZSB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWJHTC4gQ29tZSBiYWNrIHdoZW4geW91IHVwZGF0ZSB5b3VyIGJyb3dzZXIhJyk7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2ViR0wgc3VwcG9ydCBpcyByZXF1aXJlZCEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5tb2RlbEN1cDEgPSBuZXcgTW9kZWwoZ2xDb250ZXh0LCBTdG9yYWdlLmdldCgnbW9kZWxDdXAxJykpO1xyXG4gICAgICAgIHdpbmRvdy5tb2RlbEN1cDIgPSBuZXcgTW9kZWwoZ2xDb250ZXh0LCBTdG9yYWdlLmdldCgnbW9kZWxDdXAyJykpO1xyXG5cclxuICAgICAgICBtb2RlbFZpZXcgPSBuZXcgTW9kZWxWaWV3KFxyXG4gICAgICAgICAgICBjdXBTdXJmYWNlLFxyXG4gICAgICAgICAgICBnbENvbnRleHQsXHJcbiAgICAgICAgICAgIFN0b3JhZ2UuZ2V0KCdpbml0aWFsVGV4dHVyZScpLFxyXG4gICAgICAgICAgICBTdG9yYWdlLmdldCgnZnJhZ21lbnRTaGFkZXInKSxcclxuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ3ZlcnRleFNoYWRlcicpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgbW9kZWxWaWV3LnNldE1vZGVsKHdpbmRvdy5tb2RlbEN1cDEpO1xyXG4gICAgICAgIG1vZGVsVmlldy5zdGFydFJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmVzb3VyY2VQcmVwYXJlci5zdGFydExvYWRpbmcoKTtcclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
