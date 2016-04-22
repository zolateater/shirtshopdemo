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
 * @param {HTMLCanvasElement} canvas
 * @param model
 * @param {Image} initialTexture
 * @param {string} vertexShader
 * @param {string} fragmentShader
 * @constructor
 */
function ModelView(canvas, model, initialTexture, vertexShader, fragmentShader) {
    this.canvas = canvas;

    this.gl = canvas.getContext('webgl');

    if (!this.gl) {
        alert('You do not have WebGL support');
        throw new Error('WebGL support is required!');
    }
    
    this.model = model;
    this.texture = initialTexture;
    this.vertexShaderSource = vertexShader;
    this.fragmentShaderSource = fragmentShader;
    this.initialize();
    this.setTexture(initialTexture);
}

/**
 * Initializes some of... I call it things
 */
ModelView.prototype.initialize = function () {
    var shaderCompiler = new ShaderCompiler(this.gl);
    this.shaderProgram = shaderCompiler.makeProgram(this.vertexShaderSource, this.fragmentShaderSource);
};

/**
 * Sets a new texture
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

ModelView.prototype.startRender = function () {
    var gl = this.gl;
    
    // Включаем проверку глубины
    gl.enable(gl.DEPTH_TEST);
    
    // Задаем цвет очистки
    gl.clearColor(0.8, 0.9, 0.9 ,1.0);
    // Очистка - что очищаем - буфер цвета, или же буфер глубины
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var model = this.model;
    var program = this.shaderProgram;

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
        // Активный слот текстуры
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

    resourcePreparer.startLoading();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsLW1hdHJpeC5qcyIsIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsIkNhbnZhc1VJRmFjdG9yeS5qcyIsIkNhbnZhc1VJSW1hZ2VWaWV3LmpzIiwiQ2FudmFzVUlMYWJlbFZpZXcuanMiLCJDYW52YXNVSVNlbGVjdGVkVmlldy5qcyIsIlBvc2l0aW9uLmpzIiwiUmVzb3VyY2VMb2FkZXIuanMiLCJSZXNvdXJjZVByZXBhcmVyLmpzIiwiU2l6ZS5qcyIsIlN0b3JhZ2UuanMiLCJVSUNvbGxlY3Rpb24uanMiLCJVSUVsZW1lbnQuanMiLCJVSUVsZW1lbnRWaWV3LmpzIiwiVUlJbWFnZUVsZW1lbnQuanMiLCJVSUxhYmVsRWxlbWVudC5qcyIsIk1vZGVsVmlldy5qcyIsIlNoYWRlckNvbXBpbGVyLmpzIiwiQ29tcG9uZW50c1BhbmVsLmpzIiwiUHJvcGVydGllc1BhbmVsLmpzIiwiaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IGdsLW1hdHJpeCAtIEhpZ2ggcGVyZm9ybWFuY2UgbWF0cml4IGFuZCB2ZWN0b3Igb3BlcmF0aW9uc1xuICogQGF1dGhvciBCcmFuZG9uIEpvbmVzXG4gKiBAYXV0aG9yIENvbGluIE1hY0tlbnppZSBJVlxuICogQHZlcnNpb24gMi4zLjJcbiAqL1xuXG4vKiBDb3B5cmlnaHQgKGMpIDIwMTUsIEJyYW5kb24gSm9uZXMsIENvbGluIE1hY0tlbnppZSBJVi5cblxuIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4gVEhFIFNPRlRXQVJFLiAqL1xuXG4hZnVuY3Rpb24odCxhKXtpZihcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSltb2R1bGUuZXhwb3J0cz1hKCk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtdLGEpO2Vsc2V7dmFyIG49YSgpO2Zvcih2YXIgciBpbiBuKShcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9leHBvcnRzOnQpW3JdPW5bcl19fSh0aGlzLGZ1bmN0aW9uKCl7cmV0dXJuIGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGEocil7aWYobltyXSlyZXR1cm4gbltyXS5leHBvcnRzO3ZhciBvPW5bcl09e2V4cG9ydHM6e30saWQ6cixsb2FkZWQ6ITF9O3JldHVybiB0W3JdLmNhbGwoby5leHBvcnRzLG8sby5leHBvcnRzLGEpLG8ubG9hZGVkPSEwLG8uZXhwb3J0c312YXIgbj17fTtyZXR1cm4gYS5tPXQsYS5jPW4sYS5wPVwiXCIsYSgwKX0oW2Z1bmN0aW9uKHQsYSxuKXthLmdsTWF0cml4PW4oMSksYS5tYXQyPW4oMiksYS5tYXQyZD1uKDMpLGEubWF0Mz1uKDQpLGEubWF0ND1uKDUpLGEucXVhdD1uKDYpLGEudmVjMj1uKDkpLGEudmVjMz1uKDcpLGEudmVjND1uKDgpfSxmdW5jdGlvbih0LGEpe3ZhciBuPXt9O24uRVBTSUxPTj0xZS02LG4uQVJSQVlfVFlQRT1cInVuZGVmaW5lZFwiIT10eXBlb2YgRmxvYXQzMkFycmF5P0Zsb2F0MzJBcnJheTpBcnJheSxuLlJBTkRPTT1NYXRoLnJhbmRvbSxuLkVOQUJMRV9TSU1EPSExLG4uU0lNRF9BVkFJTEFCTEU9bi5BUlJBWV9UWVBFPT09RmxvYXQzMkFycmF5JiZcIlNJTURcImluIHRoaXMsbi5VU0VfU0lNRD1uLkVOQUJMRV9TSU1EJiZuLlNJTURfQVZBSUxBQkxFLG4uc2V0TWF0cml4QXJyYXlUeXBlPWZ1bmN0aW9uKHQpe24uQVJSQVlfVFlQRT10fTt2YXIgcj1NYXRoLlBJLzE4MDtuLnRvUmFkaWFuPWZ1bmN0aW9uKHQpe3JldHVybiB0KnJ9LG4uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIE1hdGguYWJzKHQtYSk8PW4uRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHQpLE1hdGguYWJzKGEpKX0sdC5leHBvcnRzPW59LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0fSxvLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8pe3ZhciB1PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHVbMF09dCx1WzFdPWEsdVsyXT1uLHVbM109byx1fSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8pe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdH0sby50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXtpZih0PT09YSl7dmFyIG49YVsxXTt0WzFdPWFbMl0sdFsyXT1ufWVsc2UgdFswXT1hWzBdLHRbMV09YVsyXSx0WzJdPWFbMV0sdFszXT1hWzNdO3JldHVybiB0fSxvLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uKnUtbypyO3JldHVybiBsPyhsPTEvbCx0WzBdPXUqbCx0WzFdPS1yKmwsdFsyXT0tbypsLHRbM109bipsLHQpOm51bGx9LG8uYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF07cmV0dXJuIHRbMF09YVszXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdFszXT1uLHR9LG8uZGV0ZXJtaW5hbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF0qdFszXS10WzJdKnRbMV19LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1uWzBdLE09blsxXSxzPW5bMl0saT1uWzNdO3JldHVybiB0WzBdPXIqZSt1Kk0sdFsxXT1vKmUrbCpNLHRbMl09cipzK3UqaSx0WzNdPW8qcytsKmksdH0sby5tdWw9by5tdWx0aXBseSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNK3UqZSx0WzFdPW8qTStsKmUsdFsyXT1yKi1lK3UqTSx0WzNdPW8qLWUrbCpNLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1uWzBdLE09blsxXTtyZXR1cm4gdFswXT1yKmUsdFsxXT1vKmUsdFsyXT11Kk0sdFszXT1sKk0sdH0sby5mcm9tUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09LW4sdFszXT1yLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT1hWzFdLHR9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0MihcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpKX0sby5MRFU9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMl09clsyXS9yWzBdLG5bMF09clswXSxuWzFdPXJbMV0sblszXT1yWzNdLXRbMl0qblsxXSxbdCxhLG5dfSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM119LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPWFbMF0sTT1hWzFdLHM9YVsyXSxpPWFbM107cmV0dXJuIE1hdGguYWJzKG4tZSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGUpKSYmTWF0aC5hYnMoby1NKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoTSkpJiZNYXRoLmFicyh1LXMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhzKSkmJk1hdGguYWJzKGwtaSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGkpKX0sby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdH0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDYpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdFs0XT0wLHRbNV09MCx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoNik7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhWzRdPXRbNF0sYVs1XT10WzVdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0fSxvLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdFs0XT0wLHRbNV09MCx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyx1LGwpe3ZhciBlPW5ldyByLkFSUkFZX1RZUEUoNik7cmV0dXJuIGVbMF09dCxlWzFdPWEsZVsyXT1uLGVbM109byxlWzRdPXUsZVs1XT1sLGV9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdFs0XT11LHRbNV09bCx0fSxvLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPW4qdS1yKm87cmV0dXJuIE0/KE09MS9NLHRbMF09dSpNLHRbMV09LXIqTSx0WzJdPS1vKk0sdFszXT1uKk0sdFs0XT0obyplLXUqbCkqTSx0WzVdPShyKmwtbiplKSpNLHQpOm51bGx9LG8uZGV0ZXJtaW5hbnQ9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF0qdFszXS10WzFdKnRbMl19LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPW5bMF0saT1uWzFdLGM9blsyXSxoPW5bM10sUz1uWzRdLEk9bls1XTtyZXR1cm4gdFswXT1yKnMrdSppLHRbMV09bypzK2wqaSx0WzJdPXIqYyt1KmgsdFszXT1vKmMrbCpoLHRbNF09cipTK3UqSStlLHRbNV09bypTK2wqSStNLHR9LG8ubXVsPW8ubXVsdGlwbHksby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPU1hdGguc2luKG4pLGk9TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cippK3Uqcyx0WzFdPW8qaStsKnMsdFsyXT1yKi1zK3UqaSx0WzNdPW8qLXMrbCppLHRbNF09ZSx0WzVdPU0sdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9blswXSxpPW5bMV07cmV0dXJuIHRbMF09cipzLHRbMV09bypzLHRbMl09dSppLHRbM109bCppLHRbNF09ZSx0WzVdPU0sdH0sby50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPW5bMF0saT1uWzFdO3JldHVybiB0WzBdPXIsdFsxXT1vLHRbMl09dSx0WzNdPWwsdFs0XT1yKnMrdSppK2UsdFs1XT1vKnMrbCppK00sdH0sby5mcm9tUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09LW4sdFszXT1yLHRbNF09MCx0WzVdPTAsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPWFbMV0sdFs0XT0wLHRbNV09MCx0fSxvLmZyb21UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTEsdFs0XT1hWzBdLHRbNV09YVsxXSx0fSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDJkKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIsIFwiK3RbNF0rXCIsIFwiK3RbNV0rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikrTWF0aC5wb3codFs0XSwyKStNYXRoLnBvdyh0WzVdLDIpKzEpfSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHRbNF09YVs0XStuWzRdLHRbNV09YVs1XStuWzVdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0WzRdPWFbNF0tbls0XSx0WzVdPWFbNV0tbls1XSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0WzRdPWFbNF0qbix0WzVdPWFbNV0qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHRbNF09YVs0XStuWzRdKnIsdFs1XT1hWzVdK25bNV0qcix0fSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdJiZ0WzRdPT09YVs0XSYmdFs1XT09PWFbNV19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPXRbNF0sTT10WzVdLHM9YVswXSxpPWFbMV0sYz1hWzJdLGg9YVszXSxTPWFbNF0sST1hWzVdO3JldHVybiBNYXRoLmFicyhuLXMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhzKSkmJk1hdGguYWJzKG8taSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGkpKSYmTWF0aC5hYnModS1jKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoYykpJiZNYXRoLmFicyhsLWgpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhoKSkmJk1hdGguYWJzKGUtUyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGUpLE1hdGguYWJzKFMpKSYmTWF0aC5hYnMoTS1JKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoTSksTWF0aC5hYnMoSSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoOSk7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTEsdFs1XT0wLHRbNl09MCx0WzddPTAsdFs4XT0xLHR9LG8uZnJvbU1hdDQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzRdLHRbNF09YVs1XSx0WzVdPWFbNl0sdFs2XT1hWzhdLHRbN109YVs5XSx0WzhdPWFbMTBdLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg5KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGFbNF09dFs0XSxhWzVdPXRbNV0sYVs2XT10WzZdLGFbN109dFs3XSxhWzhdPXRbOF0sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvLHUsbCxlLE0scyl7dmFyIGk9bmV3IHIuQVJSQVlfVFlQRSg5KTtyZXR1cm4gaVswXT10LGlbMV09YSxpWzJdPW4saVszXT1vLGlbNF09dSxpWzVdPWwsaVs2XT1lLGlbN109TSxpWzhdPXMsaX0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvLHUsbCxlLE0scyl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0WzRdPXUsdFs1XT1sLHRbNl09ZSx0WzddPU0sdFs4XT1zLHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTEsdFs1XT0wLHRbNl09MCx0WzddPTAsdFs4XT0xLHR9LG8udHJhbnNwb3NlPWZ1bmN0aW9uKHQsYSl7aWYodD09PWEpe3ZhciBuPWFbMV0scj1hWzJdLG89YVs1XTt0WzFdPWFbM10sdFsyXT1hWzZdLHRbM109bix0WzVdPWFbN10sdFs2XT1yLHRbN109b31lbHNlIHRbMF09YVswXSx0WzFdPWFbM10sdFsyXT1hWzZdLHRbM109YVsxXSx0WzRdPWFbNF0sdFs1XT1hWzddLHRbNl09YVsyXSx0WzddPWFbNV0sdFs4XT1hWzhdO3JldHVybiB0fSxvLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XSxjPWkqbC1lKnMsaD0taSp1K2UqTSxTPXMqdS1sKk0sST1uKmMrcipoK28qUztyZXR1cm4gST8oST0xL0ksdFswXT1jKkksdFsxXT0oLWkqcitvKnMpKkksdFsyXT0oZSpyLW8qbCkqSSx0WzNdPWgqSSx0WzRdPShpKm4tbypNKSpJLHRbNV09KC1lKm4rbyp1KSpJLHRbNl09UypJLHRbN109KC1zKm4rcipNKSpJLHRbOF09KGwqbi1yKnUpKkksdCk6bnVsbH0sby5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdO3JldHVybiB0WzBdPWwqaS1lKnMsdFsxXT1vKnMtcippLHRbMl09ciplLW8qbCx0WzNdPWUqTS11KmksdFs0XT1uKmktbypNLHRbNV09byp1LW4qZSx0WzZdPXUqcy1sKk0sdFs3XT1yKk0tbipzLHRbOF09bipsLXIqdSx0fSxvLmRldGVybWluYW50PWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM10sdT10WzRdLGw9dFs1XSxlPXRbNl0sTT10WzddLHM9dFs4XTtyZXR1cm4gYSoocyp1LWwqTSkrbiooLXMqbytsKmUpK3IqKE0qby11KmUpfSxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1uWzBdLFM9blsxXSxJPW5bMl0sZj1uWzNdLHg9bls0XSxEPW5bNV0sRj1uWzZdLG09bls3XSxkPW5bOF07cmV0dXJuIHRbMF09aCpyK1MqbCtJKnMsdFsxXT1oKm8rUyplK0kqaSx0WzJdPWgqdStTKk0rSSpjLHRbM109ZipyK3gqbCtEKnMsdFs0XT1mKm8reCplK0QqaSx0WzVdPWYqdSt4Kk0rRCpjLHRbNl09RipyK20qbCtkKnMsdFs3XT1GKm8rbSplK2QqaSx0WzhdPUYqdSttKk0rZCpjLHR9LG8ubXVsPW8ubXVsdGlwbHksby50cmFuc2xhdGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPW5bMF0sUz1uWzFdO3JldHVybiB0WzBdPXIsdFsxXT1vLHRbMl09dSx0WzNdPWwsdFs0XT1lLHRbNV09TSx0WzZdPWgqcitTKmwrcyx0WzddPWgqbytTKmUraSx0WzhdPWgqdStTKk0rYyx0fSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9TWF0aC5zaW4obiksUz1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1TKnIraCpsLHRbMV09UypvK2gqZSx0WzJdPVMqdStoKk0sdFszXT1TKmwtaCpyLHRbNF09UyplLWgqbyx0WzVdPVMqTS1oKnUsdFs2XT1zLHRbN109aSx0WzhdPWMsdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9blswXSxvPW5bMV07cmV0dXJuIHRbMF09ciphWzBdLHRbMV09ciphWzFdLHRbMl09ciphWzJdLHRbM109byphWzNdLHRbNF09byphWzRdLHRbNV09byphWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFs4XT1hWzhdLHR9LG8uZnJvbVRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTEsdFs1XT0wLHRbNl09YVswXSx0WzddPWFbMV0sdFs4XT0xLHR9LG8uZnJvbVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPTAsdFszXT0tbix0WzRdPXIsdFs1XT0wLHRbNl09MCx0WzddPTAsdFs4XT0xLHR9LG8uZnJvbVNjYWxpbmc9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09YVsxXSx0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby5mcm9tTWF0MmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPTAsdFszXT1hWzJdLHRbNF09YVszXSx0WzVdPTAsdFs2XT1hWzRdLHRbN109YVs1XSx0WzhdPTEsdH0sby5mcm9tUXVhdD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uK24sZT1yK3IsTT1vK28scz1uKmwsaT1yKmwsYz1yKmUsaD1vKmwsUz1vKmUsST1vKk0sZj11KmwseD11KmUsRD11Kk07cmV0dXJuIHRbMF09MS1jLUksdFszXT1pLUQsdFs2XT1oK3gsdFsxXT1pK0QsdFs0XT0xLXMtSSx0WzddPVMtZix0WzJdPWgteCx0WzVdPVMrZix0WzhdPTEtcy1jLHR9LG8ubm9ybWFsRnJvbU1hdDQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF0sYz1hWzldLGg9YVsxMF0sUz1hWzExXSxJPWFbMTJdLGY9YVsxM10seD1hWzE0XSxEPWFbMTVdLEY9biplLXIqbCxtPW4qTS1vKmwsZD1uKnMtdSpsLGI9cipNLW8qZSx2PXIqcy11KmUsej1vKnMtdSpNLHA9aSpmLWMqSSx3PWkqeC1oKkksRT1pKkQtUypJLEE9Yyp4LWgqZixQPWMqRC1TKmYsTD1oKkQtUyp4LHE9RipMLW0qUCtkKkErYipFLXYqdyt6KnA7cmV0dXJuIHE/KHE9MS9xLHRbMF09KGUqTC1NKlArcypBKSpxLHRbMV09KE0qRS1sKkwtcyp3KSpxLHRbMl09KGwqUC1lKkUrcypwKSpxLHRbM109KG8qUC1yKkwtdSpBKSpxLHRbNF09KG4qTC1vKkUrdSp3KSpxLHRbNV09KHIqRS1uKlAtdSpwKSpxLHRbNl09KGYqei14KnYrRCpiKSpxLHRbN109KHgqZC1JKnotRCptKSpxLHRbOF09KEkqdi1mKmQrRCpGKSpxLHQpOm51bGx9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0MyhcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiLCBcIit0WzRdK1wiLCBcIit0WzVdK1wiLCBcIit0WzZdK1wiLCBcIit0WzddK1wiLCBcIit0WzhdK1wiKVwifSxvLmZyb2I9ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0WzBdLDIpK01hdGgucG93KHRbMV0sMikrTWF0aC5wb3codFsyXSwyKStNYXRoLnBvdyh0WzNdLDIpK01hdGgucG93KHRbNF0sMikrTWF0aC5wb3codFs1XSwyKStNYXRoLnBvdyh0WzZdLDIpK01hdGgucG93KHRbN10sMikrTWF0aC5wb3codFs4XSwyKSl9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdFs0XT1hWzRdK25bNF0sdFs1XT1hWzVdK25bNV0sdFs2XT1hWzZdK25bNl0sdFs3XT1hWzddK25bN10sdFs4XT1hWzhdK25bOF0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHRbNF09YVs0XS1uWzRdLHRbNV09YVs1XS1uWzVdLHRbNl09YVs2XS1uWzZdLHRbN109YVs3XS1uWzddLHRbOF09YVs4XS1uWzhdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHRbNF09YVs0XSpuLHRbNV09YVs1XSpuLHRbNl09YVs2XSpuLHRbN109YVs3XSpuLHRbOF09YVs4XSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdFs0XT1hWzRdK25bNF0qcix0WzVdPWFbNV0rbls1XSpyLHRbNl09YVs2XStuWzZdKnIsdFs3XT1hWzddK25bN10qcix0WzhdPWFbOF0rbls4XSpyLHR9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM10mJnRbNF09PT1hWzRdJiZ0WzVdPT09YVs1XSYmdFs2XT09PWFbNl0mJnRbN109PT1hWzddJiZ0WzhdPT09YVs4XX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9dFs0XSxNPXRbNV0scz10WzZdLGk9dFs3XSxjPXRbOF0saD1hWzBdLFM9YVsxXSxJPWFbMl0sZj1hWzNdLHg9YVs0XSxEPWFbNV0sRj10WzZdLG09YVs3XSxkPWFbOF07cmV0dXJuIE1hdGguYWJzKG4taCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGgpKSYmTWF0aC5hYnMoby1TKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoUykpJiZNYXRoLmFicyh1LUkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhJKSkmJk1hdGguYWJzKGwtZik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGYpKSYmTWF0aC5hYnMoZS14KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZSksTWF0aC5hYnMoeCkpJiZNYXRoLmFicyhNLUQpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhNKSxNYXRoLmFicyhEKSkmJk1hdGguYWJzKHMtRik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHMpLE1hdGguYWJzKEYpKSYmTWF0aC5hYnMoaS1tKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoaSksTWF0aC5hYnMobSkpJiZNYXRoLmFicyhjLWQpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhjKSxNYXRoLmFicyhkKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXtzY2FsYXI6e30sU0lNRDp7fX07by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDE2KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTEsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSgxNik7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhWzRdPXRbNF0sYVs1XT10WzVdLGFbNl09dFs2XSxhWzddPXRbN10sYVs4XT10WzhdLGFbOV09dFs5XSxhWzEwXT10WzEwXSxhWzExXT10WzExXSxhWzEyXT10WzEyXSxhWzEzXT10WzEzXSxhWzE0XT10WzE0XSxhWzE1XT10WzE1XSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdFs5XT1hWzldLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTFdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvLHUsbCxlLE0scyxpLGMsaCxTLEksZix4KXt2YXIgRD1uZXcgci5BUlJBWV9UWVBFKDE2KTtyZXR1cm4gRFswXT10LERbMV09YSxEWzJdPW4sRFszXT1vLERbNF09dSxEWzVdPWwsRFs2XT1lLERbN109TSxEWzhdPXMsRFs5XT1pLERbMTBdPWMsRFsxMV09aCxEWzEyXT1TLERbMTNdPUksRFsxNF09ZixEWzE1XT14LER9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyx1LGwsZSxNLHMsaSxjLGgsUyxJLGYseCl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0WzRdPXUsdFs1XT1sLHRbNl09ZSx0WzddPU0sdFs4XT1zLHRbOV09aSx0WzEwXT1jLHRbMTFdPWgsdFsxMl09Uyx0WzEzXT1JLHRbMTRdPWYsdFsxNV09eCx0fSxvLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09MSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5zY2FsYXIudHJhbnNwb3NlPWZ1bmN0aW9uKHQsYSl7aWYodD09PWEpe3ZhciBuPWFbMV0scj1hWzJdLG89YVszXSx1PWFbNl0sbD1hWzddLGU9YVsxMV07dFsxXT1hWzRdLHRbMl09YVs4XSx0WzNdPWFbMTJdLHRbNF09bix0WzZdPWFbOV0sdFs3XT1hWzEzXSx0WzhdPXIsdFs5XT11LHRbMTFdPWFbMTRdLHRbMTJdPW8sdFsxM109bCx0WzE0XT1lfWVsc2UgdFswXT1hWzBdLHRbMV09YVs0XSx0WzJdPWFbOF0sdFszXT1hWzEyXSx0WzRdPWFbMV0sdFs1XT1hWzVdLHRbNl09YVs5XSx0WzddPWFbMTNdLHRbOF09YVsyXSx0WzldPWFbNl0sdFsxMF09YVsxMF0sdFsxMV09YVsxNF0sdFsxMl09YVszXSx0WzEzXT1hWzddLHRbMTRdPWFbMTFdLHRbMTVdPWFbMTVdO3JldHVybiB0fSxvLlNJTUQudHJhbnNwb3NlPWZ1bmN0aW9uKHQsYSl7dmFyIG4scixvLHUsbCxlLE0scyxpLGM7cmV0dXJuIG49U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKSxsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDAsMSw0LDUpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMCwxLDQsNSksTT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwwLDIsNCw2KSxzPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDEsMyw1LDcpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxNKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQscyksbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwyLDMsNiw3KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDIsMyw2LDcpLGk9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMCwyLDQsNiksYz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwxLDMsNSw3KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsaSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixjKSx0fSxvLnRyYW5zcG9zZT1yLlVTRV9TSU1EP28uU0lNRC50cmFuc3Bvc2U6by5zY2FsYXIudHJhbnNwb3NlLG8uc2NhbGFyLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XSxjPWFbOV0saD1hWzEwXSxTPWFbMTFdLEk9YVsxMl0sZj1hWzEzXSx4PWFbMTRdLEQ9YVsxNV0sRj1uKmUtcipsLG09bipNLW8qbCxkPW4qcy11KmwsYj1yKk0tbyplLHY9cipzLXUqZSx6PW8qcy11Kk0scD1pKmYtYypJLHc9aSp4LWgqSSxFPWkqRC1TKkksQT1jKngtaCpmLFA9YypELVMqZixMPWgqRC1TKngscT1GKkwtbSpQK2QqQStiKkUtdip3K3oqcDtyZXR1cm4gcT8ocT0xL3EsdFswXT0oZSpMLU0qUCtzKkEpKnEsdFsxXT0obypQLXIqTC11KkEpKnEsdFsyXT0oZip6LXgqditEKmIpKnEsdFszXT0oaCp2LWMqei1TKmIpKnEsdFs0XT0oTSpFLWwqTC1zKncpKnEsdFs1XT0obipMLW8qRSt1KncpKnEsdFs2XT0oeCpkLUkqei1EKm0pKnEsdFs3XT0oaSp6LWgqZCtTKm0pKnEsdFs4XT0obCpQLWUqRStzKnApKnEsdFs5XT0ocipFLW4qUC11KnApKnEsdFsxMF09KEkqdi1mKmQrRCpGKSpxLHRbMTFdPShjKmQtaSp2LVMqRikqcSx0WzEyXT0oZSp3LWwqQS1NKnApKnEsdFsxM109KG4qQS1yKncrbypwKSpxLHRbMTRdPShmKm0tSSpiLXgqRikqcSx0WzE1XT0oaSpiLWMqbStoKkYpKnEsdCk6bnVsbH0sby5TSU1ELmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuLHIsbyx1LGwsZSxNLHMsaSxjLGg9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLFM9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLEk9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLGY9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKTtyZXR1cm4gbD1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGgsUywwLDEsNCw1KSxyPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoSSxmLDAsMSw0LDUpLG49U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLHIsMCwyLDQsNikscj1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHIsbCwxLDMsNSw3KSxsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaCxTLDIsMyw2LDcpLHU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShJLGYsMiwzLDYsNyksbz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsdSwwLDIsNCw2KSx1PVNJTUQuRmxvYXQzMng0LnNodWZmbGUodSxsLDEsMyw1LDcpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG8sdSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksZT1TSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxNPVNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChyLGwpLGUpLE09U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChuLGwpLE0pLE09U0lNRC5GbG9hdDMyeDQuc3dpenpsZShNLDIsMywwLDEpLGw9U0lNRC5GbG9hdDMyeDQubXVsKHIsbyksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksZT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCksZSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LnN1YihlLFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpKSxpPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxsPVNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHIsMiwzLDAsMSksdSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksbz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKG8sMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKG8sbCksZSkscz1TSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LnN1YihlLFNJTUQuRmxvYXQzMng0Lm11bChvLGwpKSxzPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobixsKSxzKSxzPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywyLDMsMCwxKSxsPVNJTUQuRmxvYXQzMng0Lm11bChuLHIpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLHM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChvLGwpLGkpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLHM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3ViKGksU0lNRC5GbG9hdDMyeDQubXVsKG8sbCkpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG4sdSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMiksTT1TSU1ELkZsb2F0MzJ4NC5zdWIoTSxTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSkscz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHIsbCkscyksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksTT1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKG8sbCksTSkscz1TSU1ELkZsb2F0MzJ4NC5zdWIocyxTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobixvKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxNPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxNKSxpPVNJTUQuRmxvYXQzMng0LnN1YihpLFNJTUQuRmxvYXQzMng0Lm11bChyLGwpKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxNPVNJTUQuRmxvYXQzMng0LnN1YihNLFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpKSxpPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxpKSxjPVNJTUQuRmxvYXQzMng0Lm11bChuLGUpLGM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywyLDMsMCwxKSxjKSxjPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMSwwLDMsMiksYyksbD1TSU1ELkZsb2F0MzJ4NC5yZWNpcHJvY2FsQXBwcm94aW1hdGlvbihjKSxjPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5hZGQobCxsKSxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxTSU1ELkZsb2F0MzJ4NC5tdWwobCxsKSkpLChjPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywwLDAsMCwwKSk/KFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxlKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0Lm11bChjLE0pKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQubXVsKGMscykpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsU0lNRC5GbG9hdDMyeDQubXVsKGMsaSkpLHQpOm51bGx9LG8uaW52ZXJ0PXIuVVNFX1NJTUQ/by5TSU1ELmludmVydDpvLnNjYWxhci5pbnZlcnQsby5zY2FsYXIuYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XSxjPWFbOV0saD1hWzEwXSxTPWFbMTFdLEk9YVsxMl0sZj1hWzEzXSx4PWFbMTRdLEQ9YVsxNV07cmV0dXJuIHRbMF09ZSooaCpELVMqeCktYyooTSpELXMqeCkrZiooTSpTLXMqaCksdFsxXT0tKHIqKGgqRC1TKngpLWMqKG8qRC11KngpK2YqKG8qUy11KmgpKSx0WzJdPXIqKE0qRC1zKngpLWUqKG8qRC11KngpK2YqKG8qcy11Kk0pLHRbM109LShyKihNKlMtcypoKS1lKihvKlMtdSpoKStjKihvKnMtdSpNKSksdFs0XT0tKGwqKGgqRC1TKngpLWkqKE0qRC1zKngpK0kqKE0qUy1zKmgpKSx0WzVdPW4qKGgqRC1TKngpLWkqKG8qRC11KngpK0kqKG8qUy11KmgpLHRbNl09LShuKihNKkQtcyp4KS1sKihvKkQtdSp4KStJKihvKnMtdSpNKSksdFs3XT1uKihNKlMtcypoKS1sKihvKlMtdSpoKStpKihvKnMtdSpNKSx0WzhdPWwqKGMqRC1TKmYpLWkqKGUqRC1zKmYpK0kqKGUqUy1zKmMpLHRbOV09LShuKihjKkQtUypmKS1pKihyKkQtdSpmKStJKihyKlMtdSpjKSksdFsxMF09biooZSpELXMqZiktbCoocipELXUqZikrSSoocipzLXUqZSksdFsxMV09LShuKihlKlMtcypjKS1sKihyKlMtdSpjKStpKihyKnMtdSplKSksdFsxMl09LShsKihjKngtaCpmKS1pKihlKngtTSpmKStJKihlKmgtTSpjKSksdFsxM109biooYyp4LWgqZiktaSoocip4LW8qZikrSSoocipoLW8qYyksdFsxNF09LShuKihlKngtTSpmKS1sKihyKngtbypmKStJKihyKk0tbyplKSksdFsxNV09biooZSpoLU0qYyktbCoocipoLW8qYykraSoocipNLW8qZSksdH0sby5TSU1ELmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbixyLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxuPVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxyPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwxMik7cmV0dXJuIGk9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMCwxLDQsNSksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwwLDEsNCw1KSxsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaSxlLDAsMiw0LDYpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShlLGksMSwzLDUsNyksaT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwyLDMsNiw3KSxzPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDIsMyw2LDcpLE09U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShpLHMsMCwyLDQsNikscz1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKHMsaSwxLDMsNSw3KSxpPVNJTUQuRmxvYXQzMng0Lm11bChNLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLGM9U0lNRC5GbG9hdDMyeDQubXVsKGUsaSksaD1TSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxjKSxoPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxoKSxoPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaCwyLDMsMCwxKSxpPVNJTUQuRmxvYXQzMng0Lm11bChlLE0pLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLGM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLGMpLEk9U0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoYyxTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSksST1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsaSksSSksST1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKEksMiwzLDAsMSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDIsMywwLDEpLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLE09U0lNRC5GbG9hdDMyeDQuc3dpenpsZShNLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChNLGkpLGMpLFM9U0lNRC5GbG9hdDMyeDQubXVsKGwsaSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5zdWIoYyxTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSksUz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsaSksUyksUz1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMiwzLDAsMSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobCxlKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxTPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxTKSxJPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSxJKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxTPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxTKSxJPVNJTUQuRmxvYXQzMng0LnN1YihJLFNJTUQuRmxvYXQzMng0Lm11bChNLGkpKSxpPVNJTUQuRmxvYXQzMng0Lm11bChsLHMpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLGg9U0lNRC5GbG9hdDMyeDQuc3ViKGgsU0lNRC5GbG9hdDMyeDQubXVsKE0saSkpLFM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChlLGkpLFMpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGg9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChNLGkpLGgpLFM9U0lNRC5GbG9hdDMyeDQuc3ViKFMsU0lNRC5GbG9hdDMyeDQubXVsKGUsaSkpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGwsTSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksaD1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksaCksST1TSU1ELkZsb2F0MzJ4NC5zdWIoSSxTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksaD1TSU1ELkZsb2F0MzJ4NC5zdWIoaCxTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSksST1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKGUsaSksSSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLGMpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxoKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsUyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixJKSx0fSxvLmFkam9pbnQ9ci5VU0VfU0lNRD9vLlNJTUQuYWRqb2ludDpvLnNjYWxhci5hZGpvaW50LG8uZGV0ZXJtaW5hbnQ9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXSx1PXRbNF0sbD10WzVdLGU9dFs2XSxNPXRbN10scz10WzhdLGk9dFs5XSxjPXRbMTBdLGg9dFsxMV0sUz10WzEyXSxJPXRbMTNdLGY9dFsxNF0seD10WzE1XSxEPWEqbC1uKnUsRj1hKmUtcip1LG09YSpNLW8qdSxkPW4qZS1yKmwsYj1uKk0tbypsLHY9cipNLW8qZSx6PXMqSS1pKlMscD1zKmYtYypTLHc9cyp4LWgqUyxFPWkqZi1jKkksQT1pKngtaCpJLFA9Yyp4LWgqZjtyZXR1cm4gRCpQLUYqQSttKkUrZCp3LWIqcCt2Knp9LG8uU0lNRC5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKSxlPVNJTUQuRmxvYXQzMng0LmxvYWQobiwwKSxNPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDAsMCwwLDApLHIpLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDEsMSwxLDEpLG8pLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDIsMiwyLDIpLHUpLFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMywzLDMsMyksbCkpKSk7U0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLE0pO3ZhciBzPVNJTUQuRmxvYXQzMng0LmxvYWQobiw0KSxpPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDAsMCwwLDApLHIpLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDEsMSwxLDEpLG8pLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDIsMiwyLDIpLHUpLFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMywzLDMsMyksbCkpKSk7U0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LGkpO3ZhciBjPVNJTUQuRmxvYXQzMng0LmxvYWQobiw4KSxoPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDAsMCwwLDApLHIpLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDEsMSwxLDEpLG8pLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDIsMiwyLDIpLHUpLFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMywzLDMsMyksbCkpKSk7U0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LGgpO3ZhciBTPVNJTUQuRmxvYXQzMng0LmxvYWQobiwxMiksST1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywwLDAsMCwwKSxyKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywxLDEsMSwxKSxvKSxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywyLDIsMiwyKSx1KSxTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDMsMywzLDMpLGwpKSkpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLEkpLHR9LG8uc2NhbGFyLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1hWzldLFM9YVsxMF0sST1hWzExXSxmPWFbMTJdLHg9YVsxM10sRD1hWzE0XSxGPWFbMTVdLG09blswXSxkPW5bMV0sYj1uWzJdLHY9blszXTtyZXR1cm4gdFswXT1tKnIrZCplK2IqYyt2KmYsdFsxXT1tKm8rZCpNK2IqaCt2KngsdFsyXT1tKnUrZCpzK2IqUyt2KkQsdFszXT1tKmwrZCppK2IqSSt2KkYsbT1uWzRdLGQ9bls1XSxiPW5bNl0sdj1uWzddLHRbNF09bSpyK2QqZStiKmMrdipmLHRbNV09bSpvK2QqTStiKmgrdip4LHRbNl09bSp1K2QqcytiKlMrdipELHRbN109bSpsK2QqaStiKkkrdipGLG09bls4XSxkPW5bOV0sYj1uWzEwXSx2PW5bMTFdLHRbOF09bSpyK2QqZStiKmMrdipmLHRbOV09bSpvK2QqTStiKmgrdip4LHRbMTBdPW0qdStkKnMrYipTK3YqRCx0WzExXT1tKmwrZCppK2IqSSt2KkYsbT1uWzEyXSxkPW5bMTNdLGI9blsxNF0sdj1uWzE1XSx0WzEyXT1tKnIrZCplK2IqYyt2KmYsdFsxM109bSpvK2QqTStiKmgrdip4LHRbMTRdPW0qdStkKnMrYipTK3YqRCx0WzE1XT1tKmwrZCppK2IqSSt2KkYsdH0sby5tdWx0aXBseT1yLlVTRV9TSU1EP28uU0lNRC5tdWx0aXBseTpvLnNjYWxhci5tdWx0aXBseSxvLm11bD1vLm11bHRpcGx5LG8uc2NhbGFyLnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHIsbyx1LGwsZSxNLHMsaSxjLGgsUyxJLGY9blswXSx4PW5bMV0sRD1uWzJdO3JldHVybiBhPT09dD8odFsxMl09YVswXSpmK2FbNF0qeCthWzhdKkQrYVsxMl0sdFsxM109YVsxXSpmK2FbNV0qeCthWzldKkQrYVsxM10sdFsxNF09YVsyXSpmK2FbNl0qeCthWzEwXSpEK2FbMTRdLHRbMTVdPWFbM10qZithWzddKngrYVsxMV0qRCthWzE1XSk6KHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9YVs5XSxTPWFbMTBdLEk9YVsxMV0sdFswXT1yLHRbMV09byx0WzJdPXUsdFszXT1sLHRbNF09ZSx0WzVdPU0sdFs2XT1zLHRbN109aSx0WzhdPWMsdFs5XT1oLHRbMTBdPVMsdFsxMV09SSx0WzEyXT1yKmYrZSp4K2MqRCthWzEyXSx0WzEzXT1vKmYrTSp4K2gqRCthWzEzXSx0WzE0XT11KmYrcyp4K1MqRCthWzE0XSx0WzE1XT1sKmYraSp4K0kqRCthWzE1XSksdH0sby5TSU1ELnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKSxlPVNJTUQuRmxvYXQzMng0KG5bMF0sblsxXSxuWzJdLDApO2EhPT10JiYodFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdFs5XT1hWzldLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTFdKSxyPVNJTUQuRmxvYXQzMng0Lm11bChyLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwwLDAsMCwwKSksbz1TSU1ELkZsb2F0MzJ4NC5tdWwobyxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMSwxLDEsMSkpLHU9U0lNRC5GbG9hdDMyeDQubXVsKHUsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDIsMiwyLDIpKTt2YXIgTT1TSU1ELkZsb2F0MzJ4NC5hZGQocixTSU1ELkZsb2F0MzJ4NC5hZGQobyxTSU1ELkZsb2F0MzJ4NC5hZGQodSxsKSkpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLE0pLHR9LG8udHJhbnNsYXRlPXIuVVNFX1NJTUQ/by5TSU1ELnRyYW5zbGF0ZTpvLnNjYWxhci50cmFuc2xhdGUsby5zY2FsYXIuc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3ZhciByPW5bMF0sbz1uWzFdLHU9blsyXTtyZXR1cm4gdFswXT1hWzBdKnIsdFsxXT1hWzFdKnIsdFsyXT1hWzJdKnIsdFszXT1hWzNdKnIsdFs0XT1hWzRdKm8sdFs1XT1hWzVdKm8sdFs2XT1hWzZdKm8sdFs3XT1hWzddKm8sdFs4XT1hWzhdKnUsdFs5XT1hWzldKnUsdFsxMF09YVsxMF0qdSx0WzExXT1hWzExXSp1LHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdLHR9LG8uU0lNRC5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHIsbyx1LGw9U0lNRC5GbG9hdDMyeDQoblswXSxuWzFdLG5bMl0sMCk7cmV0dXJuIHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxTSU1ELkZsb2F0MzJ4NC5tdWwocixTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMCwwLDAsMCkpKSxvPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQubXVsKG8sU0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMSwxLDEpKSksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0Lm11bCh1LFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDIsMiwyKSkpLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdLHR9LG8uc2NhbGU9ci5VU0VfU0lNRD9vLlNJTUQuc2NhbGU6by5zY2FsYXIuc2NhbGUsby5yb3RhdGU9ZnVuY3Rpb24odCxhLG4sbyl7dmFyIHUsbCxlLE0scyxpLGMsaCxTLEksZix4LEQsRixtLGQsYix2LHoscCx3LEUsQSxQLEw9b1swXSxxPW9bMV0sUj1vWzJdLE49TWF0aC5zcXJ0KEwqTCtxKnErUipSKTtyZXR1cm4gTWF0aC5hYnMoTik8ci5FUFNJTE9OP251bGw6KE49MS9OLEwqPU4scSo9TixSKj1OLHU9TWF0aC5zaW4obiksbD1NYXRoLmNvcyhuKSxlPTEtbCxNPWFbMF0scz1hWzFdLGk9YVsyXSxjPWFbM10saD1hWzRdLFM9YVs1XSxJPWFbNl0sZj1hWzddLHg9YVs4XSxEPWFbOV0sRj1hWzEwXSxtPWFbMTFdLGQ9TCpMKmUrbCxiPXEqTCplK1IqdSx2PVIqTCplLXEqdSx6PUwqcSplLVIqdSxwPXEqcSplK2wsdz1SKnEqZStMKnUsRT1MKlIqZStxKnUsQT1xKlIqZS1MKnUsUD1SKlIqZStsLHRbMF09TSpkK2gqYit4KnYsdFsxXT1zKmQrUypiK0Qqdix0WzJdPWkqZCtJKmIrRip2LHRbM109YypkK2YqYittKnYsdFs0XT1NKnoraCpwK3gqdyx0WzVdPXMqeitTKnArRCp3LHRbNl09aSp6K0kqcCtGKncsdFs3XT1jKnorZipwK20qdyx0WzhdPU0qRStoKkEreCpQLHRbOV09cypFK1MqQStEKlAsdFsxMF09aSpFK0kqQStGKlAsdFsxMV09YypFK2YqQSttKlAsYSE9PXQmJih0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSksdCl9LG8uc2NhbGFyLnJvdGF0ZVg9ZnVuY3Rpb24odCxhLG4pe3ZhciByPU1hdGguc2luKG4pLG89TWF0aC5jb3MobiksdT1hWzRdLGw9YVs1XSxlPWFbNl0sTT1hWzddLHM9YVs4XSxpPWFbOV0sYz1hWzEwXSxoPWFbMTFdO3JldHVybiBhIT09dCYmKHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSksdFs0XT11Km8rcypyLHRbNV09bCpvK2kqcix0WzZdPWUqbytjKnIsdFs3XT1NKm8raCpyLHRbOF09cypvLXUqcix0WzldPWkqby1sKnIsdFsxMF09YypvLWUqcix0WzExXT1oKm8tTSpyLHR9LG8uU0lNRC5yb3RhdGVYPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihuKSksbz1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLmNvcyhuKSk7YSE9PXQmJih0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pO3ZhciB1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxyKSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsbyksU0lNRC5GbG9hdDMyeDQubXVsKHUscikpKSx0fSxvLnJvdGF0ZVg9ci5VU0VfU0lNRD9vLlNJTUQucm90YXRlWDpvLnNjYWxhci5yb3RhdGVYLG8uc2NhbGFyLnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPU1hdGguc2luKG4pLG89TWF0aC5jb3MobiksdT1hWzBdLGw9YVsxXSxlPWFbMl0sTT1hWzNdLHM9YVs4XSxpPWFbOV0sYz1hWzEwXSxoPWFbMTFdO3JldHVybiBhIT09dCYmKHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSksdFswXT11Km8tcypyLHRbMV09bCpvLWkqcix0WzJdPWUqby1jKnIsdFszXT1NKm8taCpyLHRbOF09dSpyK3Mqbyx0WzldPWwqcitpKm8sdFsxMF09ZSpyK2Mqbyx0WzExXT1NKnIraCpvLHR9LG8uU0lNRC5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihuKSksbz1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLmNvcyhuKSk7YSE9PXQmJih0WzRdPWFbNF0sdFs1XT1hWzVdLHRbNl09YVs2XSx0WzddPWFbN10sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pO3ZhciB1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwodSxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxyKSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsciksU0lNRC5GbG9hdDMyeDQubXVsKGwsbykpKSx0fSxvLnJvdGF0ZVk9ci5VU0VfU0lNRD9vLlNJTUQucm90YXRlWTpvLnNjYWxhci5yb3RhdGVZLG8uc2NhbGFyLnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4pe3ZhciByPU1hdGguc2luKG4pLG89TWF0aC5jb3MobiksdT1hWzBdLGw9YVsxXSxlPWFbMl0sTT1hWzNdLHM9YVs0XSxpPWFbNV0sYz1hWzZdLGg9YVs3XTtyZXR1cm4gYSE9PXQmJih0WzhdPWFbOF0sdFs5XT1hWzldLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTFdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0WzBdPXUqbytzKnIsdFsxXT1sKm8raSpyLHRbMl09ZSpvK2Mqcix0WzNdPU0qbytoKnIsdFs0XT1zKm8tdSpyLHRbNV09aSpvLWwqcix0WzZdPWMqby1lKnIsdFs3XT1oKm8tTSpyLHR9LG8uU0lNRC5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLnNpbihuKSksbz1TSU1ELkZsb2F0MzJ4NC5zcGxhdChNYXRoLmNvcyhuKSk7YSE9PXQmJih0WzhdPWFbOF0sdFs5XT1hWzldLHRbMTBdPWFbMTBdLHRbMTFdPWFbMTFdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKTt2YXIgdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMCxTSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbyksU0lNRC5GbG9hdDMyeDQubXVsKGwscikpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLG8pLFNJTUQuRmxvYXQzMng0Lm11bCh1LHIpKSksdH0sby5yb3RhdGVaPXIuVVNFX1NJTUQ/by5TSU1ELnJvdGF0ZVo6by5zY2FsYXIucm90YXRlWixvLmZyb21UcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09MSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPWFbMF0sdFsxM109YVsxXSx0WzE0XT1hWzJdLHRbMTVdPTEsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09YVsxXSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09YVsyXSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tUm90YXRpb249ZnVuY3Rpb24odCxhLG4pe3ZhciBvLHUsbCxlPW5bMF0sTT1uWzFdLHM9blsyXSxpPU1hdGguc3FydChlKmUrTSpNK3Mqcyk7cmV0dXJuIE1hdGguYWJzKGkpPHIuRVBTSUxPTj9udWxsOihpPTEvaSxlKj1pLE0qPWkscyo9aSxvPU1hdGguc2luKGEpLHU9TWF0aC5jb3MoYSksbD0xLXUsdFswXT1lKmUqbCt1LHRbMV09TSplKmwrcypvLHRbMl09cyplKmwtTSpvLHRbM109MCx0WzRdPWUqTSpsLXMqbyx0WzVdPU0qTSpsK3UsdFs2XT1zKk0qbCtlKm8sdFs3XT0wLHRbOF09ZSpzKmwrTSpvLHRbOV09TSpzKmwtZSpvLHRbMTBdPXMqcypsK3UsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHQpfSxvLmZyb21YUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09cix0WzZdPW4sdFs3XT0wLHRbOF09MCx0WzldPS1uLHRbMTBdPXIsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVlSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPTAsdFsyXT0tbix0WzNdPTAsdFs0XT0wLHRbNV09MSx0WzZdPTAsdFs3XT0wLHRbOF09bix0WzldPTAsdFsxMF09cix0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tWlJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09bix0WzJdPTAsdFszXT0wLHRbNF09LW4sdFs1XT1yLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9cityLE09bytvLHM9dSt1LGk9ciplLGM9cipNLGg9cipzLFM9bypNLEk9bypzLGY9dSpzLHg9bCplLEQ9bCpNLEY9bCpzO3JldHVybiB0WzBdPTEtKFMrZiksdFsxXT1jK0YsdFsyXT1oLUQsdFszXT0wLHRbNF09Yy1GLHRbNV09MS0oaStmKSx0WzZdPUkreCx0WzddPTAsdFs4XT1oK0QsdFs5XT1JLXgsdFsxMF09MS0oaStTKSx0WzExXT0wLHRbMTJdPW5bMF0sdFsxM109blsxXSx0WzE0XT1uWzJdLHRbMTVdPTEsdH0sby5nZXRUcmFuc2xhdGlvbj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMTJdLHRbMV09YVsxM10sdFsyXT1hWzE0XSx0fSxvLmdldFJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSthWzVdK2FbMTBdLHI9MDtyZXR1cm4gbj4wPyhyPTIqTWF0aC5zcXJ0KG4rMSksdFszXT0uMjUqcix0WzBdPShhWzZdLWFbOV0pL3IsdFsxXT0oYVs4XS1hWzJdKS9yLHRbMl09KGFbMV0tYVs0XSkvcik6YVswXT5hWzVdJmFbMF0+YVsxMF0/KHI9MipNYXRoLnNxcnQoMSthWzBdLWFbNV0tYVsxMF0pLHRbM109KGFbNl0tYVs5XSkvcix0WzBdPS4yNSpyLHRbMV09KGFbMV0rYVs0XSkvcix0WzJdPShhWzhdK2FbMl0pL3IpOmFbNV0+YVsxMF0/KHI9MipNYXRoLnNxcnQoMSthWzVdLWFbMF0tYVsxMF0pLHRbM109KGFbOF0tYVsyXSkvcix0WzBdPShhWzFdK2FbNF0pL3IsdFsxXT0uMjUqcix0WzJdPShhWzZdK2FbOV0pL3IpOihyPTIqTWF0aC5zcXJ0KDErYVsxMF0tYVswXS1hWzVdKSx0WzNdPShhWzFdLWFbNF0pL3IsdFswXT0oYVs4XSthWzJdKS9yLHRbMV09KGFbNl0rYVs5XSkvcix0WzJdPS4yNSpyKSx0fSxvLmZyb21Sb3RhdGlvblRyYW5zbGF0aW9uU2NhbGU9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV0sbD1hWzJdLGU9YVszXSxNPW8rbyxzPXUrdSxpPWwrbCxjPW8qTSxoPW8qcyxTPW8qaSxJPXUqcyxmPXUqaSx4PWwqaSxEPWUqTSxGPWUqcyxtPWUqaSxkPXJbMF0sYj1yWzFdLHY9clsyXTtyZXR1cm4gdFswXT0oMS0oSSt4KSkqZCx0WzFdPShoK20pKmQsdFsyXT0oUy1GKSpkLHRbM109MCx0WzRdPShoLW0pKmIsdFs1XT0oMS0oYyt4KSkqYix0WzZdPShmK0QpKmIsdFs3XT0wLHRbOF09KFMrRikqdix0WzldPShmLUQpKnYsdFsxMF09KDEtKGMrSSkpKnYsdFsxMV09MCx0WzEyXT1uWzBdLHRbMTNdPW5bMV0sdFsxNF09blsyXSx0WzE1XT0xLHR9LG8uZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZU9yaWdpbj1mdW5jdGlvbih0LGEsbixyLG8pe1xuICAgIHZhciB1PWFbMF0sbD1hWzFdLGU9YVsyXSxNPWFbM10scz11K3UsaT1sK2wsYz1lK2UsaD11KnMsUz11KmksST11KmMsZj1sKmkseD1sKmMsRD1lKmMsRj1NKnMsbT1NKmksZD1NKmMsYj1yWzBdLHY9clsxXSx6PXJbMl0scD1vWzBdLHc9b1sxXSxFPW9bMl07cmV0dXJuIHRbMF09KDEtKGYrRCkpKmIsdFsxXT0oUytkKSpiLHRbMl09KEktbSkqYix0WzNdPTAsdFs0XT0oUy1kKSp2LHRbNV09KDEtKGgrRCkpKnYsdFs2XT0oeCtGKSp2LHRbN109MCx0WzhdPShJK20pKnosdFs5XT0oeC1GKSp6LHRbMTBdPSgxLShoK2YpKSp6LHRbMTFdPTAsdFsxMl09blswXStwLSh0WzBdKnArdFs0XSp3K3RbOF0qRSksdFsxM109blsxXSt3LSh0WzFdKnArdFs1XSp3K3RbOV0qRSksdFsxNF09blsyXStFLSh0WzJdKnArdFs2XSp3K3RbMTBdKkUpLHRbMTVdPTEsdH0sby5mcm9tUXVhdD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uK24sZT1yK3IsTT1vK28scz1uKmwsaT1yKmwsYz1yKmUsaD1vKmwsUz1vKmUsST1vKk0sZj11KmwseD11KmUsRD11Kk07cmV0dXJuIHRbMF09MS1jLUksdFsxXT1pK0QsdFsyXT1oLXgsdFszXT0wLHRbNF09aS1ELHRbNV09MS1zLUksdFs2XT1TK2YsdFs3XT0wLHRbOF09aCt4LHRbOV09Uy1mLHRbMTBdPTEtcy1jLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZydXN0dW09ZnVuY3Rpb24odCxhLG4scixvLHUsbCl7dmFyIGU9MS8obi1hKSxNPTEvKG8tcikscz0xLyh1LWwpO3JldHVybiB0WzBdPTIqdSplLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPTIqdSpNLHRbNl09MCx0WzddPTAsdFs4XT0obithKSplLHRbOV09KG8rcikqTSx0WzEwXT0obCt1KSpzLHRbMTFdPS0xLHRbMTJdPTAsdFsxM109MCx0WzE0XT1sKnUqMipzLHRbMTVdPTAsdH0sby5wZXJzcGVjdGl2ZT1mdW5jdGlvbih0LGEsbixyLG8pe3ZhciB1PTEvTWF0aC50YW4oYS8yKSxsPTEvKHItbyk7cmV0dXJuIHRbMF09dS9uLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPXUsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPShvK3IpKmwsdFsxMV09LTEsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTIqbypyKmwsdFsxNV09MCx0fSxvLnBlcnNwZWN0aXZlRnJvbUZpZWxkT2ZWaWV3PWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPU1hdGgudGFuKGEudXBEZWdyZWVzKk1hdGguUEkvMTgwKSx1PU1hdGgudGFuKGEuZG93bkRlZ3JlZXMqTWF0aC5QSS8xODApLGw9TWF0aC50YW4oYS5sZWZ0RGVncmVlcypNYXRoLlBJLzE4MCksZT1NYXRoLnRhbihhLnJpZ2h0RGVncmVlcypNYXRoLlBJLzE4MCksTT0yLyhsK2UpLHM9Mi8obyt1KTtyZXR1cm4gdFswXT1NLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MCx0WzVdPXMsdFs2XT0wLHRbN109MCx0WzhdPS0oKGwtZSkqTSouNSksdFs5XT0oby11KSpzKi41LHRbMTBdPXIvKG4tciksdFsxMV09LTEsdFsxMl09MCx0WzEzXT0wLHRbMTRdPXIqbi8obi1yKSx0WzE1XT0wLHR9LG8ub3J0aG89ZnVuY3Rpb24odCxhLG4scixvLHUsbCl7dmFyIGU9MS8oYS1uKSxNPTEvKHItbykscz0xLyh1LWwpO3JldHVybiB0WzBdPS0yKmUsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09LTIqTSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MipzLHRbMTFdPTAsdFsxMl09KGErbikqZSx0WzEzXT0obytyKSpNLHRbMTRdPShsK3UpKnMsdFsxNV09MSx0fSxvLmxvb2tBdD1mdW5jdGlvbih0LGEsbix1KXt2YXIgbCxlLE0scyxpLGMsaCxTLEksZix4PWFbMF0sRD1hWzFdLEY9YVsyXSxtPXVbMF0sZD11WzFdLGI9dVsyXSx2PW5bMF0sej1uWzFdLHA9blsyXTtyZXR1cm4gTWF0aC5hYnMoeC12KTxyLkVQU0lMT04mJk1hdGguYWJzKEQteik8ci5FUFNJTE9OJiZNYXRoLmFicyhGLXApPHIuRVBTSUxPTj9vLmlkZW50aXR5KHQpOihoPXgtdixTPUQteixJPUYtcCxmPTEvTWF0aC5zcXJ0KGgqaCtTKlMrSSpJKSxoKj1mLFMqPWYsSSo9ZixsPWQqSS1iKlMsZT1iKmgtbSpJLE09bSpTLWQqaCxmPU1hdGguc3FydChsKmwrZSplK00qTSksZj8oZj0xL2YsbCo9ZixlKj1mLE0qPWYpOihsPTAsZT0wLE09MCkscz1TKk0tSSplLGk9SSpsLWgqTSxjPWgqZS1TKmwsZj1NYXRoLnNxcnQocypzK2kqaStjKmMpLGY/KGY9MS9mLHMqPWYsaSo9ZixjKj1mKToocz0wLGk9MCxjPTApLHRbMF09bCx0WzFdPXMsdFsyXT1oLHRbM109MCx0WzRdPWUsdFs1XT1pLHRbNl09Uyx0WzddPTAsdFs4XT1NLHRbOV09Yyx0WzEwXT1JLHRbMTFdPTAsdFsxMl09LShsKngrZSpEK00qRiksdFsxM109LShzKngraSpEK2MqRiksdFsxNF09LShoKngrUypEK0kqRiksdFsxNV09MSx0KX0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQ0KFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIsIFwiK3RbNF0rXCIsIFwiK3RbNV0rXCIsIFwiK3RbNl0rXCIsIFwiK3RbN10rXCIsIFwiK3RbOF0rXCIsIFwiK3RbOV0rXCIsIFwiK3RbMTBdK1wiLCBcIit0WzExXStcIiwgXCIrdFsxMl0rXCIsIFwiK3RbMTNdK1wiLCBcIit0WzE0XStcIiwgXCIrdFsxNV0rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikrTWF0aC5wb3codFs0XSwyKStNYXRoLnBvdyh0WzVdLDIpK01hdGgucG93KHRbNl0sMikrTWF0aC5wb3codFs3XSwyKStNYXRoLnBvdyh0WzhdLDIpK01hdGgucG93KHRbOV0sMikrTWF0aC5wb3codFsxMF0sMikrTWF0aC5wb3codFsxMV0sMikrTWF0aC5wb3codFsxMl0sMikrTWF0aC5wb3codFsxM10sMikrTWF0aC5wb3codFsxNF0sMikrTWF0aC5wb3codFsxNV0sMikpfSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHRbM109YVszXStuWzNdLHRbNF09YVs0XStuWzRdLHRbNV09YVs1XStuWzVdLHRbNl09YVs2XStuWzZdLHRbN109YVs3XStuWzddLHRbOF09YVs4XStuWzhdLHRbOV09YVs5XStuWzldLHRbMTBdPWFbMTBdK25bMTBdLHRbMTFdPWFbMTFdK25bMTFdLHRbMTJdPWFbMTJdK25bMTJdLHRbMTNdPWFbMTNdK25bMTNdLHRbMTRdPWFbMTRdK25bMTRdLHRbMTVdPWFbMTVdK25bMTVdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0WzNdPWFbM10tblszXSx0WzRdPWFbNF0tbls0XSx0WzVdPWFbNV0tbls1XSx0WzZdPWFbNl0tbls2XSx0WzddPWFbN10tbls3XSx0WzhdPWFbOF0tbls4XSx0WzldPWFbOV0tbls5XSx0WzEwXT1hWzEwXS1uWzEwXSx0WzExXT1hWzExXS1uWzExXSx0WzEyXT1hWzEyXS1uWzEyXSx0WzEzXT1hWzEzXS1uWzEzXSx0WzE0XT1hWzE0XS1uWzE0XSx0WzE1XT1hWzE1XS1uWzE1XSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHlTY2FsYXI9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0WzNdPWFbM10qbix0WzRdPWFbNF0qbix0WzVdPWFbNV0qbix0WzZdPWFbNl0qbix0WzddPWFbN10qbix0WzhdPWFbOF0qbix0WzldPWFbOV0qbix0WzEwXT1hWzEwXSpuLHRbMTFdPWFbMTFdKm4sdFsxMl09YVsxMl0qbix0WzEzXT1hWzEzXSpuLHRbMTRdPWFbMTRdKm4sdFsxNV09YVsxNV0qbix0fSxvLm11bHRpcGx5U2NhbGFyQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0WzNdPWFbM10rblszXSpyLHRbNF09YVs0XStuWzRdKnIsdFs1XT1hWzVdK25bNV0qcix0WzZdPWFbNl0rbls2XSpyLHRbN109YVs3XStuWzddKnIsdFs4XT1hWzhdK25bOF0qcix0WzldPWFbOV0rbls5XSpyLHRbMTBdPWFbMTBdK25bMTBdKnIsdFsxMV09YVsxMV0rblsxMV0qcix0WzEyXT1hWzEyXStuWzEyXSpyLHRbMTNdPWFbMTNdK25bMTNdKnIsdFsxNF09YVsxNF0rblsxNF0qcix0WzE1XT1hWzE1XStuWzE1XSpyLHR9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM10mJnRbNF09PT1hWzRdJiZ0WzVdPT09YVs1XSYmdFs2XT09PWFbNl0mJnRbN109PT1hWzddJiZ0WzhdPT09YVs4XSYmdFs5XT09PWFbOV0mJnRbMTBdPT09YVsxMF0mJnRbMTFdPT09YVsxMV0mJnRbMTJdPT09YVsxMl0mJnRbMTNdPT09YVsxM10mJnRbMTRdPT09YVsxNF0mJnRbMTVdPT09YVsxNV19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPXRbNF0sTT10WzVdLHM9dFs2XSxpPXRbN10sYz10WzhdLGg9dFs5XSxTPXRbMTBdLEk9dFsxMV0sZj10WzEyXSx4PXRbMTNdLEQ9dFsxNF0sRj10WzE1XSxtPWFbMF0sZD1hWzFdLGI9YVsyXSx2PWFbM10sej1hWzRdLHA9YVs1XSx3PWFbNl0sRT1hWzddLEE9YVs4XSxQPWFbOV0sTD1hWzEwXSxxPWFbMTFdLFI9YVsxMl0sTj1hWzEzXSxPPWFbMTRdLFk9YVsxNV07cmV0dXJuIE1hdGguYWJzKG4tbSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKG0pKSYmTWF0aC5hYnMoby1kKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoZCkpJiZNYXRoLmFicyh1LWIpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhiKSkmJk1hdGguYWJzKGwtdik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKHYpKSYmTWF0aC5hYnMoZS16KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZSksTWF0aC5hYnMoeikpJiZNYXRoLmFicyhNLXApPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhNKSxNYXRoLmFicyhwKSkmJk1hdGguYWJzKHMtdyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHMpLE1hdGguYWJzKHcpKSYmTWF0aC5hYnMoaS1FKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoaSksTWF0aC5hYnMoRSkpJiZNYXRoLmFicyhjLUEpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhjKSxNYXRoLmFicyhBKSkmJk1hdGguYWJzKGgtUCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGgpLE1hdGguYWJzKFApKSYmTWF0aC5hYnMoUy1MKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoUyksTWF0aC5hYnMoTCkpJiZNYXRoLmFicyhJLXEpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhJKSxNYXRoLmFicyhxKSkmJk1hdGguYWJzKGYtUik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGYpLE1hdGguYWJzKFIpKSYmTWF0aC5hYnMoeC1OKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoeCksTWF0aC5hYnMoTikpJiZNYXRoLmFicyhELU8pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhEKSxNYXRoLmFicyhPKSkmJk1hdGguYWJzKEYtWSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKEYpLE1hdGguYWJzKFkpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89big0KSx1PW4oNyksbD1uKDgpLGU9e307ZS5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0WzNdPTEsdH0sZS5yb3RhdGlvblRvPWZ1bmN0aW9uKCl7dmFyIHQ9dS5jcmVhdGUoKSxhPXUuZnJvbVZhbHVlcygxLDAsMCksbj11LmZyb21WYWx1ZXMoMCwxLDApO3JldHVybiBmdW5jdGlvbihyLG8sbCl7dmFyIE09dS5kb3QobyxsKTtyZXR1cm4tLjk5OTk5OT5NPyh1LmNyb3NzKHQsYSxvKSx1Lmxlbmd0aCh0KTwxZS02JiZ1LmNyb3NzKHQsbixvKSx1Lm5vcm1hbGl6ZSh0LHQpLGUuc2V0QXhpc0FuZ2xlKHIsdCxNYXRoLlBJKSxyKTpNPi45OTk5OTk/KHJbMF09MCxyWzFdPTAsclsyXT0wLHJbM109MSxyKToodS5jcm9zcyh0LG8sbCksclswXT10WzBdLHJbMV09dFsxXSxyWzJdPXRbMl0sclszXT0xK00sZS5ub3JtYWxpemUocixyKSl9fSgpLGUuc2V0QXhlcz1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8pe3JldHVybiB0WzBdPXJbMF0sdFszXT1yWzFdLHRbNl09clsyXSx0WzFdPW9bMF0sdFs0XT1vWzFdLHRbN109b1syXSx0WzJdPS1uWzBdLHRbNV09LW5bMV0sdFs4XT0tblsyXSxlLm5vcm1hbGl6ZShhLGUuZnJvbU1hdDMoYSx0KSl9fSgpLGUuY2xvbmU9bC5jbG9uZSxlLmZyb21WYWx1ZXM9bC5mcm9tVmFsdWVzLGUuY29weT1sLmNvcHksZS5zZXQ9bC5zZXQsZS5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdFszXT0xLHR9LGUuc2V0QXhpc0FuZ2xlPWZ1bmN0aW9uKHQsYSxuKXtuPS41Km47dmFyIHI9TWF0aC5zaW4obik7cmV0dXJuIHRbMF09ciphWzBdLHRbMV09ciphWzFdLHRbMl09ciphWzJdLHRbM109TWF0aC5jb3MobiksdH0sZS5nZXRBeGlzQW5nbGU9ZnVuY3Rpb24odCxhKXt2YXIgbj0yKk1hdGguYWNvcyhhWzNdKSxyPU1hdGguc2luKG4vMik7cmV0dXJuIDAhPXI/KHRbMF09YVswXS9yLHRbMV09YVsxXS9yLHRbMl09YVsyXS9yKToodFswXT0xLHRbMV09MCx0WzJdPTApLG59LGUuYWRkPWwuYWRkLGUubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1uWzBdLE09blsxXSxzPW5bMl0saT1uWzNdO3JldHVybiB0WzBdPXIqaStsKmUrbypzLXUqTSx0WzFdPW8qaStsKk0rdSplLXIqcyx0WzJdPXUqaStsKnMrcipNLW8qZSx0WzNdPWwqaS1yKmUtbypNLXUqcyx0fSxlLm11bD1lLm11bHRpcGx5LGUuc2NhbGU9bC5zY2FsZSxlLnJvdGF0ZVg9ZnVuY3Rpb24odCxhLG4pe24qPS41O3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTStsKmUsdFsxXT1vKk0rdSplLHRbMl09dSpNLW8qZSx0WzNdPWwqTS1yKmUsdH0sZS5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuKXtuKj0uNTt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0tdSplLHRbMV09bypNK2wqZSx0WzJdPXUqTStyKmUsdFszXT1sKk0tbyplLHR9LGUucm90YXRlWj1mdW5jdGlvbih0LGEsbil7bio9LjU7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNK28qZSx0WzFdPW8qTS1yKmUsdFsyXT11Kk0rbCplLHRbM109bCpNLXUqZSx0fSxlLmNhbGN1bGF0ZVc9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl07cmV0dXJuIHRbMF09bix0WzFdPXIsdFsyXT1vLHRbM109TWF0aC5zcXJ0KE1hdGguYWJzKDEtbipuLXIqci1vKm8pKSx0fSxlLmRvdD1sLmRvdCxlLmxlcnA9bC5sZXJwLGUuc2xlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG8sdSxsLGUsTSxzPWFbMF0saT1hWzFdLGM9YVsyXSxoPWFbM10sUz1uWzBdLEk9blsxXSxmPW5bMl0seD1uWzNdO3JldHVybiB1PXMqUytpKkkrYypmK2gqeCwwPnUmJih1PS11LFM9LVMsST0tSSxmPS1mLHg9LXgpLDEtdT4xZS02PyhvPU1hdGguYWNvcyh1KSxsPU1hdGguc2luKG8pLGU9TWF0aC5zaW4oKDEtcikqbykvbCxNPU1hdGguc2luKHIqbykvbCk6KGU9MS1yLE09ciksdFswXT1lKnMrTSpTLHRbMV09ZSppK00qSSx0WzJdPWUqYytNKmYsdFszXT1lKmgrTSp4LHR9LGUuc3FsZXJwPWZ1bmN0aW9uKCl7dmFyIHQ9ZS5jcmVhdGUoKSxhPWUuY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKG4scixvLHUsbCxNKXtyZXR1cm4gZS5zbGVycCh0LHIsbCxNKSxlLnNsZXJwKGEsbyx1LE0pLGUuc2xlcnAobix0LGEsMipNKigxLU0pKSxufX0oKSxlLmludmVydD1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1uKm4rcipyK28qbyt1KnUsZT1sPzEvbDowO3JldHVybiB0WzBdPS1uKmUsdFsxXT0tciplLHRbMl09LW8qZSx0WzNdPXUqZSx0fSxlLmNvbmp1Z2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0WzNdPWFbM10sdH0sZS5sZW5ndGg9bC5sZW5ndGgsZS5sZW49ZS5sZW5ndGgsZS5zcXVhcmVkTGVuZ3RoPWwuc3F1YXJlZExlbmd0aCxlLnNxckxlbj1lLnNxdWFyZWRMZW5ndGgsZS5ub3JtYWxpemU9bC5ub3JtYWxpemUsZS5mcm9tTWF0Mz1mdW5jdGlvbih0LGEpe3ZhciBuLHI9YVswXSthWzRdK2FbOF07aWYocj4wKW49TWF0aC5zcXJ0KHIrMSksdFszXT0uNSpuLG49LjUvbix0WzBdPShhWzVdLWFbN10pKm4sdFsxXT0oYVs2XS1hWzJdKSpuLHRbMl09KGFbMV0tYVszXSkqbjtlbHNle3ZhciBvPTA7YVs0XT5hWzBdJiYobz0xKSxhWzhdPmFbMypvK29dJiYobz0yKTt2YXIgdT0obysxKSUzLGw9KG8rMiklMztuPU1hdGguc3FydChhWzMqbytvXS1hWzMqdSt1XS1hWzMqbCtsXSsxKSx0W29dPS41Km4sbj0uNS9uLHRbM109KGFbMyp1K2xdLWFbMypsK3VdKSpuLHRbdV09KGFbMyp1K29dK2FbMypvK3VdKSpuLHRbbF09KGFbMypsK29dK2FbMypvK2xdKSpufXJldHVybiB0fSxlLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInF1YXQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIilcIn0sZS5leGFjdEVxdWFscz1sLmV4YWN0RXF1YWxzLGUuZXF1YWxzPWwuZXF1YWxzLHQuZXhwb3J0cz1lfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSgzKTtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDMpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhfSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4pe3ZhciBvPW5ldyByLkFSUkFZX1RZUEUoMyk7cmV0dXJuIG9bMF09dCxvWzFdPWEsb1syXT1uLG99LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0fSxvLnNldD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdH0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm5bMF0sdFsxXT1hWzFdKm5bMV0sdFsyXT1hWzJdKm5bMl0sdH0sby5tdWw9by5tdWx0aXBseSxvLmRpdmlkZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS9uWzBdLHRbMV09YVsxXS9uWzFdLHRbMl09YVsyXS9uWzJdLHR9LG8uZGl2PW8uZGl2aWRlLG8uY2VpbD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguY2VpbChhWzBdKSx0WzFdPU1hdGguY2VpbChhWzFdKSx0WzJdPU1hdGguY2VpbChhWzJdKSx0fSxvLmZsb29yPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5mbG9vcihhWzBdKSx0WzFdPU1hdGguZmxvb3IoYVsxXSksdFsyXT1NYXRoLmZsb29yKGFbMl0pLHR9LG8ubWluPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1pbihhWzBdLG5bMF0pLHRbMV09TWF0aC5taW4oYVsxXSxuWzFdKSx0WzJdPU1hdGgubWluKGFbMl0sblsyXSksdH0sby5tYXg9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWF4KGFbMF0sblswXSksdFsxXT1NYXRoLm1heChhWzFdLG5bMV0pLHRbMl09TWF0aC5tYXgoYVsyXSxuWzJdKSx0fSxvLnJvdW5kPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5yb3VuZChhWzBdKSx0WzFdPU1hdGgucm91bmQoYVsxXSksdFsyXT1NYXRoLnJvdW5kKGFbMl0pLHR9LG8uc2NhbGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qbix0WzFdPWFbMV0qbix0WzJdPWFbMl0qbix0fSxvLnNjYWxlQW5kQWRkPWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWFbMF0rblswXSpyLHRbMV09YVsxXStuWzFdKnIsdFsyXT1hWzJdK25bMl0qcix0fSxvLmRpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdO3JldHVybiBNYXRoLnNxcnQobipuK3IqcitvKm8pfSxvLmRpc3Q9by5kaXN0YW5jZSxvLnNxdWFyZWREaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXTtyZXR1cm4gbipuK3IqcitvKm99LG8uc3FyRGlzdD1vLnNxdWFyZWREaXN0YW5jZSxvLmxlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl07cmV0dXJuIE1hdGguc3FydChhKmErbipuK3Iqcil9LG8ubGVuPW8ubGVuZ3RoLG8uc3F1YXJlZExlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl07cmV0dXJuIGEqYStuKm4rcipyfSxvLnNxckxlbj1vLnNxdWFyZWRMZW5ndGgsby5uZWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdH0sby5pbnZlcnNlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MS9hWzBdLHRbMV09MS9hWzFdLHRbMl09MS9hWzJdLHR9LG8ubm9ybWFsaXplPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9bipuK3IqcitvKm87cmV0dXJuIHU+MCYmKHU9MS9NYXRoLnNxcnQodSksdFswXT1hWzBdKnUsdFsxXT1hWzFdKnUsdFsyXT1hWzJdKnUpLHR9LG8uZG90PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF0qYVswXSt0WzFdKmFbMV0rdFsyXSphWzJdfSxvLmNyb3NzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1uWzBdLGU9blsxXSxNPW5bMl07cmV0dXJuIHRbMF09bypNLXUqZSx0WzFdPXUqbC1yKk0sdFsyXT1yKmUtbypsLHR9LG8ubGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXSxsPWFbMl07cmV0dXJuIHRbMF09bytyKihuWzBdLW8pLHRbMV09dStyKihuWzFdLXUpLHRbMl09bCtyKihuWzJdLWwpLHR9LG8uaGVybWl0ZT1mdW5jdGlvbih0LGEsbixyLG8sdSl7dmFyIGw9dSp1LGU9bCooMip1LTMpKzEsTT1sKih1LTIpK3Uscz1sKih1LTEpLGk9bCooMy0yKnUpO3JldHVybiB0WzBdPWFbMF0qZStuWzBdKk0rclswXSpzK29bMF0qaSx0WzFdPWFbMV0qZStuWzFdKk0rclsxXSpzK29bMV0qaSx0WzJdPWFbMl0qZStuWzJdKk0rclsyXSpzK29bMl0qaSx0fSxvLmJlemllcj1mdW5jdGlvbih0LGEsbixyLG8sdSl7dmFyIGw9MS11LGU9bCpsLE09dSp1LHM9ZSpsLGk9Myp1KmUsYz0zKk0qbCxoPU0qdTtyZXR1cm4gdFswXT1hWzBdKnMrblswXSppK3JbMF0qYytvWzBdKmgsdFsxXT1hWzFdKnMrblsxXSppK3JbMV0qYytvWzFdKmgsdFsyXT1hWzJdKnMrblsyXSppK3JbMl0qYytvWzJdKmgsdH0sby5yYW5kb209ZnVuY3Rpb24odCxhKXthPWF8fDE7dmFyIG49MipyLlJBTkRPTSgpKk1hdGguUEksbz0yKnIuUkFORE9NKCktMSx1PU1hdGguc3FydCgxLW8qbykqYTtyZXR1cm4gdFswXT1NYXRoLmNvcyhuKSp1LHRbMV09TWF0aC5zaW4obikqdSx0WzJdPW8qYSx0fSxvLnRyYW5zZm9ybU1hdDQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bM10qcituWzddKm8rblsxMV0qdStuWzE1XTtyZXR1cm4gbD1sfHwxLHRbMF09KG5bMF0qcituWzRdKm8rbls4XSp1K25bMTJdKS9sLHRbMV09KG5bMV0qcituWzVdKm8rbls5XSp1K25bMTNdKS9sLHRbMl09KG5bMl0qcituWzZdKm8rblsxMF0qdStuWzE0XSkvbCx0fSxvLnRyYW5zZm9ybU1hdDM9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXTtyZXR1cm4gdFswXT1yKm5bMF0rbypuWzNdK3Uqbls2XSx0WzFdPXIqblsxXStvKm5bNF0rdSpuWzddLHRbMl09cipuWzJdK28qbls1XSt1Km5bOF0sdH0sby50cmFuc2Zvcm1RdWF0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1uWzBdLGU9blsxXSxNPW5bMl0scz1uWzNdLGk9cypyK2UqdS1NKm8sYz1zKm8rTSpyLWwqdSxoPXMqdStsKm8tZSpyLFM9LWwqci1lKm8tTSp1O3JldHVybiB0WzBdPWkqcytTKi1sK2MqLU0taCotZSx0WzFdPWMqcytTKi1lK2gqLWwtaSotTSx0WzJdPWgqcytTKi1NK2kqLWUtYyotbCx0fSxvLnJvdGF0ZVg9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89W10sdT1bXTtyZXR1cm4gb1swXT1hWzBdLW5bMF0sb1sxXT1hWzFdLW5bMV0sb1syXT1hWzJdLW5bMl0sdVswXT1vWzBdLHVbMV09b1sxXSpNYXRoLmNvcyhyKS1vWzJdKk1hdGguc2luKHIpLHVbMl09b1sxXSpNYXRoLnNpbihyKStvWzJdKk1hdGguY29zKHIpLHRbMF09dVswXStuWzBdLHRbMV09dVsxXStuWzFdLHRbMl09dVsyXStuWzJdLHR9LG8ucm90YXRlWT1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1bXSx1PVtdO3JldHVybiBvWzBdPWFbMF0tblswXSxvWzFdPWFbMV0tblsxXSxvWzJdPWFbMl0tblsyXSx1WzBdPW9bMl0qTWF0aC5zaW4ocikrb1swXSpNYXRoLmNvcyhyKSx1WzFdPW9bMV0sdVsyXT1vWzJdKk1hdGguY29zKHIpLW9bMF0qTWF0aC5zaW4ociksdFswXT11WzBdK25bMF0sdFsxXT11WzFdK25bMV0sdFsyXT11WzJdK25bMl0sdH0sby5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPVtdLHU9W107cmV0dXJuIG9bMF09YVswXS1uWzBdLG9bMV09YVsxXS1uWzFdLG9bMl09YVsyXS1uWzJdLHVbMF09b1swXSpNYXRoLmNvcyhyKS1vWzFdKk1hdGguc2luKHIpLHVbMV09b1swXSpNYXRoLnNpbihyKStvWzFdKk1hdGguY29zKHIpLHVbMl09b1syXSx0WzBdPXVbMF0rblswXSx0WzFdPXVbMV0rblsxXSx0WzJdPXVbMl0rblsyXSx0fSxvLmZvckVhY2g9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvLHUsbCl7dmFyIGUsTTtmb3Iobnx8KG49Mykscnx8KHI9MCksTT1vP01hdGgubWluKG8qbityLGEubGVuZ3RoKTphLmxlbmd0aCxlPXI7TT5lO2UrPW4pdFswXT1hW2VdLHRbMV09YVtlKzFdLHRbMl09YVtlKzJdLHUodCx0LGwpLGFbZV09dFswXSxhW2UrMV09dFsxXSxhW2UrMl09dFsyXTtyZXR1cm4gYX19KCksby5hbmdsZT1mdW5jdGlvbih0LGEpe3ZhciBuPW8uZnJvbVZhbHVlcyh0WzBdLHRbMV0sdFsyXSkscj1vLmZyb21WYWx1ZXMoYVswXSxhWzFdLGFbMl0pO28ubm9ybWFsaXplKG4sbiksby5ub3JtYWxpemUocixyKTt2YXIgdT1vLmRvdChuLHIpO3JldHVybiB1PjE/MDpNYXRoLmFjb3ModSl9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwidmVjMyhcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiKVwifSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9YVswXSxlPWFbMV0sTT1hWzJdO3JldHVybiBNYXRoLmFicyhuLWwpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhsKSkmJk1hdGguYWJzKG8tZSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKGUpKSYmTWF0aC5hYnModS1NKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMoTSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHRbM109MCx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhfSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyl7dmFyIHU9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdVswXT10LHVbMV09YSx1WzJdPW4sdVszXT1vLHV9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHR9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuWzBdLHRbMV09YVsxXSpuWzFdLHRbMl09YVsyXSpuWzJdLHRbM109YVszXSpuWzNdLHR9LG8ubXVsPW8ubXVsdGlwbHksby5kaXZpZGU9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0vblswXSx0WzFdPWFbMV0vblsxXSx0WzJdPWFbMl0vblsyXSx0WzNdPWFbM10vblszXSx0fSxvLmRpdj1vLmRpdmlkZSxvLmNlaWw9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmNlaWwoYVswXSksdFsxXT1NYXRoLmNlaWwoYVsxXSksdFsyXT1NYXRoLmNlaWwoYVsyXSksdFszXT1NYXRoLmNlaWwoYVszXSksdH0sby5mbG9vcj1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguZmxvb3IoYVswXSksdFsxXT1NYXRoLmZsb29yKGFbMV0pLHRbMl09TWF0aC5mbG9vcihhWzJdKSx0WzNdPU1hdGguZmxvb3IoYVszXSksdH0sby5taW49ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWluKGFbMF0sblswXSksdFsxXT1NYXRoLm1pbihhWzFdLG5bMV0pLHRbMl09TWF0aC5taW4oYVsyXSxuWzJdKSx0WzNdPU1hdGgubWluKGFbM10sblszXSksdH0sby5tYXg9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWF4KGFbMF0sblswXSksdFsxXT1NYXRoLm1heChhWzFdLG5bMV0pLHRbMl09TWF0aC5tYXgoYVsyXSxuWzJdKSx0WzNdPU1hdGgubWF4KGFbM10sblszXSksdH0sby5yb3VuZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGgucm91bmQoYVswXSksdFsxXT1NYXRoLnJvdW5kKGFbMV0pLHRbMl09TWF0aC5yb3VuZChhWzJdKSx0WzNdPU1hdGgucm91bmQoYVszXSksdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHR9LG8uc2NhbGVBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdH0sby5kaXN0YW5jZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0tdFswXSxyPWFbMV0tdFsxXSxvPWFbMl0tdFsyXSx1PWFbM10tdFszXTtyZXR1cm4gTWF0aC5zcXJ0KG4qbityKnIrbypvK3UqdSl9LG8uZGlzdD1vLmRpc3RhbmNlLG8uc3F1YXJlZERpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdLHU9YVszXS10WzNdO3JldHVybiBuKm4rcipyK28qbyt1KnV9LG8uc3FyRGlzdD1vLnNxdWFyZWREaXN0YW5jZSxvLmxlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdO3JldHVybiBNYXRoLnNxcnQoYSphK24qbityKnIrbypvKX0sby5sZW49by5sZW5ndGgsby5zcXVhcmVkTGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM107cmV0dXJuIGEqYStuKm4rcipyK28qb30sby5zcXJMZW49by5zcXVhcmVkTGVuZ3RoLG8ubmVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHRbM109LWFbM10sdH0sby5pbnZlcnNlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MS9hWzBdLHRbMV09MS9hWzFdLHRbMl09MS9hWzJdLHRbM109MS9hWzNdLHR9LG8ubm9ybWFsaXplPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4qbityKnIrbypvK3UqdTtyZXR1cm4gbD4wJiYobD0xL01hdGguc3FydChsKSx0WzBdPW4qbCx0WzFdPXIqbCx0WzJdPW8qbCx0WzNdPXUqbCksdH0sby5kb3Q9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXSphWzBdK3RbMV0qYVsxXSt0WzJdKmFbMl0rdFszXSphWzNdfSxvLmxlcnA9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89YVswXSx1PWFbMV0sbD1hWzJdLGU9YVszXTtyZXR1cm4gdFswXT1vK3IqKG5bMF0tbyksdFsxXT11K3IqKG5bMV0tdSksdFsyXT1sK3IqKG5bMl0tbCksdFszXT1lK3IqKG5bM10tZSksdH0sby5yYW5kb209ZnVuY3Rpb24odCxhKXtyZXR1cm4gYT1hfHwxLHRbMF09ci5SQU5ET00oKSx0WzFdPXIuUkFORE9NKCksdFsyXT1yLlJBTkRPTSgpLHRbM109ci5SQU5ET00oKSxvLm5vcm1hbGl6ZSh0LHQpLG8uc2NhbGUodCx0LGEpLHR9LG8udHJhbnNmb3JtTWF0ND1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXTtyZXR1cm4gdFswXT1uWzBdKnIrbls0XSpvK25bOF0qdStuWzEyXSpsLHRbMV09blsxXSpyK25bNV0qbytuWzldKnUrblsxM10qbCx0WzJdPW5bMl0qcituWzZdKm8rblsxMF0qdStuWzE0XSpsLHRbM109blszXSpyK25bN10qbytuWzExXSp1K25bMTVdKmwsdH0sby50cmFuc2Zvcm1RdWF0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1uWzBdLGU9blsxXSxNPW5bMl0scz1uWzNdLGk9cypyK2UqdS1NKm8sYz1zKm8rTSpyLWwqdSxoPXMqdStsKm8tZSpyLFM9LWwqci1lKm8tTSp1O3JldHVybiB0WzBdPWkqcytTKi1sK2MqLU0taCotZSx0WzFdPWMqcytTKi1lK2gqLWwtaSotTSx0WzJdPWgqcytTKi1NK2kqLWUtYyotbCx0WzNdPWFbM10sdH0sby5mb3JFYWNoPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyx1LGwpe3ZhciBlLE07Zm9yKG58fChuPTQpLHJ8fChyPTApLE09bz9NYXRoLm1pbihvKm4rcixhLmxlbmd0aCk6YS5sZW5ndGgsZT1yO00+ZTtlKz1uKXRbMF09YVtlXSx0WzFdPWFbZSsxXSx0WzJdPWFbZSsyXSx0WzNdPWFbZSszXSx1KHQsdCxsKSxhW2VdPXRbMF0sYVtlKzFdPXRbMV0sYVtlKzJdPXRbMl0sYVtlKzNdPXRbM107cmV0dXJuIGF9fSgpLG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwidmVjNChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiKVwifSxvLmV4YWN0RXF1YWxzPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09PT1hWzBdJiZ0WzFdPT09YVsxXSYmdFsyXT09PWFbMl0mJnRbM109PT1hWzNdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT1hWzBdLE09YVsxXSxzPWFbMl0saT1hWzNdO3JldHVybiBNYXRoLmFicyhuLWUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhuKSxNYXRoLmFicyhlKSkmJk1hdGguYWJzKG8tTSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG8pLE1hdGguYWJzKE0pKSYmTWF0aC5hYnModS1zKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModSksTWF0aC5hYnMocykpJiZNYXRoLmFicyhsLWkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhsKSxNYXRoLmFicyhpKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSgyKTtyZXR1cm4gdFswXT0wLHRbMV09MCx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoMik7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYX0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSl7dmFyIG49bmV3IHIuQVJSQVlfVFlQRSgyKTtyZXR1cm4gblswXT10LG5bMV09YSxufSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0fSxvLnNldD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YSx0WzFdPW4sdH0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm5bMF0sdFsxXT1hWzFdKm5bMV0sdH0sby5tdWw9by5tdWx0aXBseSxvLmRpdmlkZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS9uWzBdLHRbMV09YVsxXS9uWzFdLHR9LG8uZGl2PW8uZGl2aWRlLG8uY2VpbD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguY2VpbChhWzBdKSx0WzFdPU1hdGguY2VpbChhWzFdKSx0fSxvLmZsb29yPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5mbG9vcihhWzBdKSx0WzFdPU1hdGguZmxvb3IoYVsxXSksdH0sby5taW49ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWluKGFbMF0sblswXSksdFsxXT1NYXRoLm1pbihhWzFdLG5bMV0pLHR9LG8ubWF4PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1NYXRoLm1heChhWzBdLG5bMF0pLHRbMV09TWF0aC5tYXgoYVsxXSxuWzFdKSx0fSxvLnJvdW5kPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5yb3VuZChhWzBdKSx0WzFdPU1hdGgucm91bmQoYVsxXSksdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHR9LG8uc2NhbGVBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0fSxvLmRpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdO3JldHVybiBNYXRoLnNxcnQobipuK3Iqcil9LG8uZGlzdD1vLmRpc3RhbmNlLG8uc3F1YXJlZERpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdO3JldHVybiBuKm4rcipyfSxvLnNxckRpc3Q9by5zcXVhcmVkRGlzdGFuY2Usby5sZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV07cmV0dXJuIE1hdGguc3FydChhKmErbipuKX0sby5sZW49by5sZW5ndGgsby5zcXVhcmVkTGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdO3JldHVybiBhKmErbipufSxvLnNxckxlbj1vLnNxdWFyZWRMZW5ndGgsby5uZWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHR9LG8uaW52ZXJzZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPTEvYVswXSx0WzFdPTEvYVsxXSx0fSxvLm5vcm1hbGl6ZT1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89bipuK3IqcjtyZXR1cm4gbz4wJiYobz0xL01hdGguc3FydChvKSx0WzBdPWFbMF0qbyx0WzFdPWFbMV0qbyksdH0sby5kb3Q9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXSphWzBdK3RbMV0qYVsxXX0sby5jcm9zcz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSpuWzFdLWFbMV0qblswXTtyZXR1cm4gdFswXT10WzFdPTAsdFsyXT1yLHR9LG8ubGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXTtyZXR1cm4gdFswXT1vK3IqKG5bMF0tbyksdFsxXT11K3IqKG5bMV0tdSksdH0sby5yYW5kb209ZnVuY3Rpb24odCxhKXthPWF8fDE7dmFyIG49MipyLlJBTkRPTSgpKk1hdGguUEk7cmV0dXJuIHRbMF09TWF0aC5jb3MobikqYSx0WzFdPU1hdGguc2luKG4pKmEsdH0sby50cmFuc2Zvcm1NYXQyPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXTtyZXR1cm4gdFswXT1uWzBdKnIrblsyXSpvLHRbMV09blsxXSpyK25bM10qbyx0fSxvLnRyYW5zZm9ybU1hdDJkPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXTtyZXR1cm4gdFswXT1uWzBdKnIrblsyXSpvK25bNF0sdFsxXT1uWzFdKnIrblszXSpvK25bNV0sdH0sby50cmFuc2Zvcm1NYXQzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXTtyZXR1cm4gdFswXT1uWzBdKnIrblszXSpvK25bNl0sdFsxXT1uWzFdKnIrbls0XSpvK25bN10sdH0sby50cmFuc2Zvcm1NYXQ0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXTtyZXR1cm4gdFswXT1uWzBdKnIrbls0XSpvK25bMTJdLHRbMV09blsxXSpyK25bNV0qbytuWzEzXSx0fSxvLmZvckVhY2g9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvLHUsbCl7dmFyIGUsTTtmb3Iobnx8KG49Mikscnx8KHI9MCksTT1vP01hdGgubWluKG8qbityLGEubGVuZ3RoKTphLmxlbmd0aCxlPXI7TT5lO2UrPW4pdFswXT1hW2VdLHRbMV09YVtlKzFdLHUodCx0LGwpLGFbZV09dFswXSxhW2UrMV09dFsxXTtyZXR1cm4gYX19KCksby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJ2ZWMyKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIpXCJ9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9YVswXSxsPWFbMV07cmV0dXJuIE1hdGguYWJzKG4tdSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKHUpKSYmTWF0aC5hYnMoby1sKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMobCkpfSx0LmV4cG9ydHM9b31dKX0pOyIsIi8qKlxuICogQ2FudmFzIFJlbmRlcmluZyBTdXJmYWNlLlxuICogSXQgaXMgYSB0b3AgbGV2ZWwgY29tcG9uZW50IHRoYXQgY29tYmluZXMgaXQgYWxsIHRvZ2V0aGVyIGFuZCBoaWRlcyB1bm5lY2Vzc2FyeSBkZXRhaWxzLlxuICpcbiAqIEBwYXJhbSB7SFRNTENhbnZhc0VsZW1lbnR9IGNhbnZhc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1N1cmZhY2UoY2FudmFzKVxue1xuICAgIGlmICggISAoY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpICkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdQYXNzZWQgY2FudmFzIGlzIG5vdCBIVE1MQ2FudmFzRWxlbWVudCEnKTtcbiAgICB9XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgdGhpcy5mYWN0b3J5ID0gbmV3IENhbnZhc1VJRmFjdG9yeSh0aGlzLmNvbnRleHQpO1xuICAgIHRoaXMuZWxlbWVudHMgPSBuZXcgVUlDb2xsZWN0aW9uKCk7XG4gICAgdGhpcy5lbGVtZW50cy5hZGQodGhpcy5mYWN0b3J5LmNyZWF0ZUxhYmVsKCkpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyID0gbmV3IENhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIodGhpcyk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIuYmluZEh0bWxDYW52YXNFdmVudHMoKTtcblxuICAgIC8qKlxuICAgICAqIFRoaXMgaXMgYSBmbGFnIGZvciBkZXRlY3RpbmcgaWYgd2UgYXJlIGV4cG9ydGluZ1xuICAgICAqIHJlc3VsdCBpbWFnZSBhcyBmaW5hbCB0ZXh0dXJlLlxuICAgICAqXG4gICAgICogSWYgdGhpcyBpcyB0cnVlLCB0aGVuIHdlIHNob3VsZG4ndCBzaG93IGFueVxuICAgICAqIHNlbGVjdGlvbiBib3JkZXJzXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX2lzRXhwb3J0aW5nUmVuZGVyID0gZmFsc2U7XG5cbiAgICB0aGlzLmNsZWFyQ29sb3IgPSAnI0ZGRkZGRic7XG59XG5cbi8qKlxuICogUmV0dXJucyBVSUNvbGxlY3Rpb24gcmVsYXRlZCB0byB0aGUgc3VyZmFjZS5cbiAqIFxuICogQHJldHVybnMge1VJQ29sbGVjdGlvbn1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuZ2V0RWxlbWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHM7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgbmV3IGxhYmVsIGVsZW1lbnQgaW4gdWkgY29sbGVjdGlvbiBvZiB0aGUgc3VyZmFjZSBhbmQgcmV0dXJucyBpdC5cbiAqIFxuICogQHJldHVybnMge1VJTGFiZWxFbGVtZW50fVxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5wdXNoTGFiZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhYmVsID0gdGhpcy5mYWN0b3J5LmNyZWF0ZUxhYmVsKCk7XG4gICAgdGhpcy5lbGVtZW50cy5hZGQobGFiZWwpO1xuICAgIHRoaXMuZWxlbWVudHMuc2VsZWN0TGFzdCgpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlclNlbGVjdChsYWJlbCk7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHJldHVybiBsYWJlbDtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgaW1hZ2UgZWxlbWVudCBpbiB1aSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucHVzaEltYWdlID0gZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgdmFyIGltYWdlRWxlbWVudCA9IHRoaXMuZmFjdG9yeS5jcmVhdGVJbWFnZShpbWFnZSk7XG4gICAgdGhpcy5lbGVtZW50cy5hZGQoaW1hZ2VFbGVtZW50KTtcbiAgICB0aGlzLmVsZW1lbnRzLnNlbGVjdExhc3QoKTtcblxuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJTZWxlY3QoaW1hZ2VFbGVtZW50KTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgcmV0dXJuIGltYWdlRWxlbWVudDtcbn07XG5cbi8qKlxuICogQ2xlYXIgdGhlIHJlbGF0ZWQgY2FudmFzLlxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5jbGVhckNvbG9yO1xuICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgY2xlYXIgY29sb3JcbiAqIFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnNldENsZWFyQ29sb3IgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICB0aGlzLmNsZWFyQ29sb3IgPSBjb2xvcjtcbn07XG5cbi8qKlxuICogUmVuZGVycyBhbGwgb2YgdGhlIGVsZW1lbnRzIG9uIHRoZSBzdXJmYWNlLlxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5yZW5kZXJFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZWN0ZWRJbmRleCA9IHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5lbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLmdldChpKS5yZW5kZXIoKTtcblxuICAgICAgICBpZiAoaSA9PSBzZWxlY3RlZEluZGV4ICYmICEgdGhpcy5faXNFeHBvcnRpbmdSZW5kZXIpIHtcbiAgICAgICAgICAgIG5ldyBDYW52YXNVSVNlbGVjdGVkVmlldyh0aGlzLmNvbnRleHQpLnJlbmRlcih0aGlzLmVsZW1lbnRzLmdldChpKSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIENsZWFycyB0aGUgc3VyZmFjZSBhbmQgcmVuZGVycyBpdCB3aXRoIGFsbCBlbGVtZW50cy5cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgICB0aGlzLnJlbmRlckVsZW1lbnRzKCk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbiBpbWFnZSBmcm9tIGRyYXduIGNvbnRlbnRcbiAqIEByZXR1cm5zIHtJbWFnZX1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUudG9JbWFnZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuX2lzRXhwb3J0aW5nUmVuZGVyID0gdHJ1ZTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uuc3JjID0gdGhpcy5jYW52YXMudG9EYXRhVVJMKCk7XG5cbiAgICB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlciA9IGZhbHNlO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICByZXR1cm4gaW1hZ2U7XG59O1xuXG4vKipcbiAqIE1vdmVzIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50IHRvIHRoZSBiYWNrZ3JvdW5kXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnNlbGVjdGVkVG9CYWNrZ3JvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWxlbWVudHMudG9TdGFydCh0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKSk7XG59O1xuXG4vKipcbiAqIE1vdmVzIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50IHRvIHRoZSBmb3JlZ3JvdW5kXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnNlbGVjdGVkVG9Gb3JlZ3JvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZWxlbWVudHMudG9FbmQodGhpcy5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCkpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50XG4gKlxuICogQHJldHVybiB7VUlFbGVtZW50fVxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5yZW1vdmVTZWxlY3RlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudHMucmVtb3ZlKHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyRGVzZWxlY3QoKTtcblxuICAgIHJldHVybiBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBBZGRzIG5ldyBldmVudCBoYW5kbGVyIG9uIHNlbGVjdGlvbiBvZiBhbiBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtVSVNlbGVjdGVkQ2FsbGJhY2t9IGNhbGxiYWNrXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmFkZFNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLmFkZFNlbGVjdEV2ZW50SGFuZGxlcihjYWxsYmFjayk7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5hZGREZXNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogR2V0IGNhbnZhcyBib3VuZCByZWN0YW5nbGUuXG4gKiBLaW5kYSB1Z2x5IG1ldGhvZC5cbiAqXG4gKiBAcmV0dXJucyB7e3RvcDogbnVtYmVyLCByaWdodDogbnVtYmVyLCBib3R0b206IG51bWJlciwgbGVmdDogbnVtYmVyfX1cbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuZ2V0Qm91bmRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgcmlnaHQ6IHRoaXMuY2FudmFzLndpZHRoLFxuICAgICAgICBib3R0b206IHRoaXMuY2FudmFzLmhlaWdodCxcbiAgICAgICAgbGVmdDogMFxuICAgIH07XG59O1xuXG4vKipcbiAqIENhbGxiYWNrIHR5cGUgZm9yIHNlbGVjdGluZyBhbmQgZWxlbWVudFxuICpcbiAqIEBjYWxsYmFjayBVSVNlbGVjdGVkQ2FsbGJhY2tcbiAqIEBwYXJhbSB7VUlFbGVtZW50fVxuICovIiwiLyoqXG4gKiBUaGlzIGNsYXNzIGlzIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyBET00gZXZlbnRzIGFuZCB0cmlnZ2VyaW5nIGFwcGxpY2F0aW9uIGV2ZW50c1xuICogS2luZGEgdWdseSBjb2RlIGhlcmVcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1N1cmZhY2V9IHN1cmZhY2VcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyIChzdXJmYWNlKVxue1xuICAgIHRoaXMuc3VyZmFjZSA9IHN1cmZhY2U7XG4gICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xuICAgIHRoaXMuaXNNb3ZpbmdDbGljayA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZXNpemluZ0NsaWNrID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0Q2xpY2tPZmZzZXQgPSBudWxsO1xuICAgIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzID0gbnVsbDtcblxuICAgIHRoaXMuaGFuZGxlcnMgPSB7XG4gICAgICAgIG9uU2VsZWN0OiBbXSxcbiAgICAgICAgb25EZXNlbGVjdDogW11cbiAgICB9XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzIHRvIHRoZSBIVE1MIGNhbnZhc1xuICogXG4gKiBAcGFyYW0gZVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5iaW5kSHRtbENhbnZhc0V2ZW50cyA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLmhhbmRsZU1vdXNlRG93bi5iaW5kKHRoaXMpKTtcblxuICAgIC8vIFdlIGJpbmRpbmcgdGhpcyBldmVudCB0byB0aGUgd2hvbGUgZG9jdW1lbnQgdG8gc3RvcCBtb3ZpbmdcbiAgICAvLyBpZiB1c2VyIHRyaWVzIHRvIGRyYWcgYW4gZWxlbWVudCBvdXQgb2YgdGhlIGNhbnZhc1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLmhhbmRsZU1vdXNlVXAuYmluZCh0aGlzKSk7XG5cbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuaGFuZGxlTW91c2VNb3ZlLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSk7XG59O1xuXG4vKipcbiAqIFRyaWdnZXJzIHNlbGVjdCBldmVudC5cbiAqIFRoaXMgbWVhbnMgdGhhdCBhbGwgYXNzaWduZWQgaGFuZGxlcnMgd2lsbCBiZSBleGVjdXRlZC5cbiAqXG4gKiBUT0RPOiBBYmFuZG9uIEphdmFTY3JpcHQgYW5kIGxlYXJuIFR5cGVTY3JpcHRcbiAqXG4gKiBAcGFyYW0ge1VJRWxlbWVudH0gZWxlbWVudFxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50cmlnZ2VyU2VsZWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5oYW5kbGVycy5vblNlbGVjdCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLmhhbmRsZXJzLm9uU2VsZWN0W2tleV07XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBUcmlnZ2VycyBkZXNlbGVjdCBldmVudC5cbiAqIFRoaXMgbWVhbnMgdGhhdCBhbGwgYXNzaWduZWQgaGFuZGxlcnMgd2lsbCBiZSBleGVjdXRlZC5cbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUudHJpZ2dlckRlc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmhhbmRsZXJzLm9uRGVzZWxlY3QpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGhpcy5oYW5kbGVycy5vbkRlc2VsZWN0W2tleV07XG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBBZGRzIG5ldyBoYW5kbGVyIG9uIGVsZW1lbnQgc2VsZWN0aW9uIGV2ZW50XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuYWRkU2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5oYW5kbGVycy5vblNlbGVjdC5wdXNoKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICogQWRkcyBuZXcgaGFuZGxlciBvbiBlbGVtZW50IGRlc2VsZWN0aW9uIGV2ZW50XG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2tcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmhhbmRsZXJzLm9uRGVzZWxlY3QucHVzaChjYWxsYmFjayk7XG59O1xuXG5cbi8qKlxuICogSGFuZGxlciBmb3IgdGhlIG1vdXNlZG93biBldmVudFxuICpcbiAqIEBwYXJhbSBlXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlRG93biA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5pc01vdXNlRG93biA9IHRydWU7XG5cbiAgICAvLyBRdWljayBoYWNrXG4gICAgaWYgKHR5cGVvZiBUb3VjaEV2ZW50ICE9IFwidW5kZWZpbmVkXCIgJiYgZSBpbnN0YW5jZW9mIFRvdWNoRXZlbnQpIHtcbiAgICAgICAgZSA9IGUudG91Y2hlc1swXTtcbiAgICB9XG5cbiAgICB2YXIgbG9jYWxDb29yZGluYXRlcyA9IHRoaXMudG9Mb2NhbENvb3JkaW5hdGVzKGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICB2YXIgb2xkU2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zdXJmYWNlLmdldEVsZW1lbnRzKCkuZ2V0U2VsZWN0ZWRJbmRleCgpO1xuICAgIHZhciBuZXdTZWxlY3RlZEluZGV4ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmZldGNoSW5kZXhCeU9mZnNldChsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XG4gICAgdmFyIG5ld1NlbGVjdGVkRWxlbWVudCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXQobmV3U2VsZWN0ZWRJbmRleCk7XG5cbiAgICB2YXIgZG9XZUhhdmVTb21ldGhpbmdTZWxlY3RlZCA9IG5ld1NlbGVjdGVkSW5kZXggIT09IG51bGw7XG4gICAgdmFyIGlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSA9IGRvV2VIYXZlU29tZXRoaW5nU2VsZWN0ZWQgJiZcbiAgICAgICAgb2xkU2VsZWN0ZWRFbGVtZW50ID09IG5ld1NlbGVjdGVkSW5kZXg7XG5cbiAgICBpZiAoIWRvV2VIYXZlU29tZXRoaW5nU2VsZWN0ZWQpIHtcblxuICAgICAgICAvLyBJZiB3ZSBoYWQgc29tZXRoaW5nIHNlbGVjdGVkIGJlZm9yZSxcbiAgICAgICAgLy8gaXQgbWVhbnMgaXQgaXMgdGltZSB0byBjYWxsIGRlc2VsZWN0IGhhbmRsZXJzXG4gICAgICAgIGlmIChvbGRTZWxlY3RlZEVsZW1lbnQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyRGVzZWxlY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3VyZmFjZS5lbGVtZW50cy5kZXNlbGVjdCgpO1xuICAgICAgICB0aGlzLnN1cmZhY2UucmVuZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghaXNDdXJyZW50bHlTZWxlY3RlZFdhc1NlbGVjdGVkQmVmb3JlKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlclNlbGVjdChuZXdTZWxlY3RlZEVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8vIFdlIHJlbWVtYmVyIGhlcmUgdGhlIGxhc3QgY2xpY2sgb2Zmc2V0IHJlbGF0aXZlbHkgc2VsZWN0ZWQgZWxlbWVudFxuICAgIHRoaXMubGFzdENsaWNrT2Zmc2V0ID0gbmV3U2VsZWN0ZWRFbGVtZW50LmdldENsaWNrT2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcblxuICAgIC8vIElzIGl0IGEgY2xpY2sgc3RhcnRpbmcgcmVzaXplIG9wZXJhdGlvbiA/XG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUgJiZcbiAgICAgICAgdGhpcy5pc1Jlc2l6ZVBvc3NpYmxlKG5ld1NlbGVjdGVkRWxlbWVudCwgbG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xuXG4gICAgaWYgKHRoaXMuaXNSZXNpemluZ0NsaWNrKSB7XG4gICAgICAgIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzID0gbG9jYWxDb29yZGluYXRlcztcbiAgICAgICAgdGhpcy5zZXRSZXNpemFibGVTdGF0ZSh0cnVlKTtcbiAgICB9XG4gICAgLy8gSXQgaXMgYSBjbGljayBmb3IgbW92aW5nXG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmdDbGljayA9IHRydWU7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5lbGVtZW50cy5zZWxlY3QobmV3U2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIHRoaXMuc2V0TW92YWJsZVN0YXRlKHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcbn07XG5cbi8qKlxuICpcbiAqIEhhbmRsZXIgZm9yIG1vdXNlIHVwIGV2ZW50XG4gKlxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBlXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlVXAgPSBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuaXNNb3VzZURvd24gPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGZhbHNlO1xuICAgIHRoaXMuaXNNb3ZpbmdDbGljayA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGNvb3JkaW5hdGVzIHRvIGNvb3JkaW5hdGVzIGluc2lkZSBjYW52YXNcbiAqXG4gKiBAcGFyYW0gY2xpZW50WFxuICogQHBhcmFtIGNsaWVudFlcbiAqIEByZXR1cm5zIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50b0xvY2FsQ29vcmRpbmF0ZXMgPSBmdW5jdGlvbiAoY2xpZW50WCwgY2xpZW50WSkge1xuICAgIHZhciB2aWV3cG9ydE9mZnNldCA9IHRoaXMuc3VyZmFjZS5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgLy8gdGhlc2UgYXJlIHJlbGF0aXZlIHRvIHRoZSB2aWV3cG9ydCwgaS5lLiB0aGUgd2luZG93XG4gICAgdmFyIHRvcCA9IHZpZXdwb3J0T2Zmc2V0LnRvcDtcbiAgICB2YXIgbGVmdCA9IHZpZXdwb3J0T2Zmc2V0LmxlZnQ7XG4gICAgdmFyIHRvcE9mZnNldCA9IGNsaWVudFkgLSB0b3A7XG4gICAgdmFyIGxlZnRPZmZzZXQgPSBjbGllbnRYIC0gbGVmdDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHg6IGxlZnRPZmZzZXQsXG4gICAgICAgIHk6IHRvcE9mZnNldFxuICAgIH07XG59O1xuXG4vKipcbiAqIEhhbmRsZXIgZm9yIG1vdXNlIG1vdmUgZXZlbnRcbiAqXG4gKiBAcGFyYW0gZVxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5oYW5kbGVNb3VzZU1vdmUgPSBmdW5jdGlvbiAoZSkge1xuXG4gICAgLy8gUXVpY2sgaGFja1xuICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGUgPSBlLnRvdWNoZXNbMF07XG4gICAgfVxuXG4gICAgdmFyIHNlbGVjdGVkSW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xuICAgIHZhciBsb2NhbENvb3JkaW5hdGVzID0gdGhpcy50b0xvY2FsQ29vcmRpbmF0ZXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIHZhciBlbGVtZW50SG92ZXJJbmRleCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5mZXRjaEluZGV4QnlPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xuXG4gICAgLy8gSXQgaXMgc2ltcGxlIG1vdXNlIG1vdmUsXG4gICAgLy8gd2UgaGF2ZSBub3RoaW5nIG1vcmUgdG8gZG8gaGVyZVxuICAgIGlmICghdGhpcy5pc01vdXNlRG93bikge1xuICAgICAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZVdpdGhvdXRNb3VzZURvd24oZWxlbWVudEhvdmVySW5kZXgsIHNlbGVjdGVkSW5kZXgsIGxvY2FsQ29vcmRpbmF0ZXMpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXRTZWxlY3RlZEVsZW1lbnQoKTtcblxuICAgIC8vIElmIHdlIGFyZSBoZXJlLCB0aGVuIHdlIGhhdmUgYnV0dG9uIHByZXNzZWQgYW5kIHdlIG11c3QgcmVzaXplIVxuICAgIGlmICh0aGlzLmlzUmVzaXppbmdDbGljaykge1xuICAgICAgICB2YXIgbmV3U2l6ZURlbHRhID0ge1xuICAgICAgICAgICAgd2lkdGg6IGxvY2FsQ29vcmRpbmF0ZXMueCAtIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzLngsXG4gICAgICAgICAgICBoZWlnaHQ6IGxvY2FsQ29vcmRpbmF0ZXMueSAtIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzLnlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IGxvY2FsQ29vcmRpbmF0ZXM7XG5cbiAgICAgICAgdmFyIHNpemUgPSBzZWxlY3RlZEVsZW1lbnQuZ2V0U2l6ZSgpO1xuICAgICAgICBzaXplLnJlc2l6ZUJ5KG5ld1NpemVEZWx0YS53aWR0aCwgbmV3U2l6ZURlbHRhLmhlaWdodCk7XG4gICAgfVxuICAgIC8vIE5haCwgaXQncyBqdXN0IG1vdmluZ1xuICAgIGVsc2UgaWYgKHRoaXMuaXNNb3ZpbmdDbGljaykge1xuICAgICAgICBzZWxlY3RlZEVsZW1lbnQubW92ZVRvKG5ldyBQb3NpdGlvbihcbiAgICAgICAgICAgIGxvY2FsQ29vcmRpbmF0ZXMueCAtIHRoaXMubGFzdENsaWNrT2Zmc2V0LnRvcCxcbiAgICAgICAgICAgIGxvY2FsQ29vcmRpbmF0ZXMueSAtIHRoaXMubGFzdENsaWNrT2Zmc2V0LmxlZnRcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xufTtcblxuLyoqXG4gKiBBZGRzIG1vdmFibGUgaHRtbCBjbGFzcyB0byB0aGUgY2FudmFzIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIGJvb2xcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuc2V0TW92YWJsZVN0YXRlID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgICBpZiAoYm9vbCkge1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5hZGQoJ21vdmFibGUnKTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdyZXNpemFibGUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgnbW92YWJsZScpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQWRkcyByZXNpemFibGUgaHRtbCBjbGFzcyB0byB0aGUgY2FudmFzIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIGJvb2xcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuc2V0UmVzaXphYmxlU3RhdGUgPSBmdW5jdGlvbiAoYm9vbCkge1xuICAgIGlmIChib29sKSB7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgnbW92YWJsZScpO1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5hZGQoJ3Jlc2l6YWJsZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdyZXNpemFibGUnKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgbW91c2UgbW92ZSBldmVudCB3aGVuIG1vdXNlIGJ1dHRvbiBpcyBub3QgcHJlc3NlZFxuICpcbiAqIEBwYXJhbSBlbGVtZW50SG92ZXJJbmRleFxuICogQHBhcmFtIHNlbGVjdGVkSW5kZXhcbiAqIEBwYXJhbSBtb3VzZUNvb3JkaW5hdGVzXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlTW92ZVdpdGhvdXRNb3VzZURvd24gPSBmdW5jdGlvbiAoZWxlbWVudEhvdmVySW5kZXgsIHNlbGVjdGVkSW5kZXgsIG1vdXNlQ29vcmRpbmF0ZXMpIHtcbiAgICBpZiAoZWxlbWVudEhvdmVySW5kZXggPT0gc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAvLyBXaGF0IHN0YXRlIGlzIGN1cnNvciBpbj9cbiAgICAgICAgdmFyIHJlc2l6ZVN0YXRlID0gdGhpcy5pc1Jlc2l6ZVBvc3NpYmxlKHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXRTZWxlY3RlZEVsZW1lbnQoKSwgbW91c2VDb29yZGluYXRlcy54LCBtb3VzZUNvb3JkaW5hdGVzLnkpO1xuICAgICAgICBpZiAocmVzaXplU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRNb3ZhYmxlU3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFJlc2l6YWJsZVN0YXRlKGZhbHNlKTtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHBhc3NlZCBjb29yZGluYXRlcyBhcmUgbG9jYXRlZCBvbiBwb3NpdGlvbiBvZiBkcmFnIGljb24gb2YgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcGFyYW0geFxuICogQHBhcmFtIHlcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaXNSZXNpemVQb3NzaWJsZSA9IGZ1bmN0aW9uKGVsZW1lbnQsIHgsIHkpIHtcbiAgICB2YXIgZHJhZ0ljb25TaXplID0gMTA7XG5cbiAgICB2YXIgdGVtcEVsZW1lbnREYXRhID0ge1xuICAgICAgICBwb3NpdGlvbjogbmV3IFBvc2l0aW9uKFxuICAgICAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgLSBkcmFnSWNvblNpemUsXG4gICAgICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCkgLSBkcmFnSWNvblNpemVcbiAgICAgICAgKSxcbiAgICAgICAgc2l6ZTogbmV3IFNpemUoZHJhZ0ljb25TaXplLCBkcmFnSWNvblNpemUpXG4gICAgfTtcblxuICAgIHZhciB0ZW1wRWxlbWVudCA9IG5ldyBVSUVsZW1lbnQodGVtcEVsZW1lbnREYXRhLnBvc2l0aW9uLCB0ZW1wRWxlbWVudERhdGEuc2l6ZSk7XG4gICAgcmV0dXJuIHRlbXBFbGVtZW50LmlzT2Zmc2V0SW4oeCwgeSk7XG59OyIsIi8qKlxuICpcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlFbGVtZW50Vmlldyhjb250ZXh0KSB7XG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgVUkgRWxlbWVudCBWaWV3IGVycm9yISBDb250ZXh0IGlzIG5vdCBhIGNvbnRleHQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxuICAgICAqL1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG59XG5cbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XG5cbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbn07IiwiLyoqXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSUZhY3RvcnkoY29udGV4dClcbntcbiAgICBpZiAoICEgKGNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyByZW5kZXJpbmcgY29udGV4dCBtdXN0IGJlIGluc3RhbmNlIG9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCEgKGZhY3RvcnkgY3JlYXRpbmcpJyk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGxhYmVsIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcbiAqXG4gKiBAcmV0dXJucyB7VUlMYWJlbEVsZW1lbnR9XG4gKi9cbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlTGFiZWwgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbGFiZWwgPSBuZXcgVUlMYWJlbEVsZW1lbnQobmV3IFBvc2l0aW9uKDAsIDUwKSk7XG4gICAgbGFiZWwuc2V0VmlldyhuZXcgQ2FudmFzVUlMYWJlbFZpZXcodGhpcy5jb250ZXh0KSk7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gaW1hZ2UgZWxlbWVudCwgd2hpY2ggaXMgcmVhZHkgdG8gYmUgcmVuZGVyZWQgb24gdGhlIGNhbnZhc1xuICpcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXG4gKi9cbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlSW1hZ2UgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICB2YXIgaW1hZ2VFbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KG51bGwsIG51bGwsIGltYWdlKTtcbiAgICBpbWFnZUVsZW1lbnQuc2V0VmlldyhuZXcgQ2FudmFzVUlJbWFnZVZpZXcodGhpcy5jb250ZXh0KSk7XG5cbiAgICByZXR1cm4gaW1hZ2VFbGVtZW50O1xufTsiLCIvKipcbiAqIFZpZXcgb2YgYW4gaW1hZ2UgZWxlbWVudCBvbiB0aGUgY2FudmFzXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSUltYWdlVmlldyhjb250ZXh0KSB7XG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xufVxuXG5DYW52YXNVSUltYWdlVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcblxuLyoqXG4gKiBSZW5kZXJzIGFuIGltYWdlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge1VJSW1hZ2VFbGVtZW50fSB1aUltYWdlRWxlbWVudFxuICovXG5DYW52YXNVSUltYWdlVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHVpSW1hZ2VFbGVtZW50KSB7XG4gICAgdmFyIHBvcyA9IHVpSW1hZ2VFbGVtZW50LmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIHNpemUgPSB1aUltYWdlRWxlbWVudC5nZXRTaXplKCk7XG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICB1aUltYWdlRWxlbWVudC5nZXRJbWFnZSgpLFxuICAgICAgICBwb3MuZ2V0WCgpLFxuICAgICAgICBwb3MuZ2V0WSgpLFxuICAgICAgICBzaXplLmdldFdpZHRoKCksXG4gICAgICAgIHNpemUuZ2V0SGVpZ2h0KClcbiAgICApO1xufTsiLCIvKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1VJTGFiZWxWaWV3KGNvbnRleHQpIHtcbiAgICBDYW52YXNVSUVsZW1lbnRWaWV3LmNhbGwodGhpcywgY29udGV4dCk7XG59XG5cbkNhbnZhc1VJTGFiZWxWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFJlbmRlcnMgdGV4dCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtVSUxhYmVsRWxlbWVudH0gZWxlbWVudFxuICovXG5DYW52YXNVSUxhYmVsVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAvLyBPdXIgdGV4dCBzaXplIGZpdHMgYm91bmRzXG4gICAgdmFyIGZvbnRTaXplID0gZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCk7XG5cbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IGZvbnRTaXplICsgXCJweCBcIiArIGVsZW1lbnQuZ2V0Rm9udCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBlbGVtZW50LmdldENvbG9yKCk7XG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdoYW5naW5nJztcblxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcbiAgICAgICAgZWxlbWVudC5nZXRUZXh0KCksXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCksXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCksXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKClcbiAgICApO1xufTsiLCIvKipcbiAqIEJhc2UgdmlldyBmb3Igc2VsZWN0ZWQgZWxlbWVudFxuICpcbiAqIEBwYXJhbSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlTZWxlY3RlZFZpZXcoY29udGV4dCkge1xuICAgIGlmICggISAoY29udGV4dCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2FudmFzIFVJIEVsZW1lbnQgVmlldyBlcnJvciEgQ29udGV4dCBkb2VzIG5vdCBoYXZlIHR5cGUgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9XG4gICAgICovXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbn1cblxuQ2FudmFzVUlTZWxlY3RlZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XG5cbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgdmFyIGljb25SZXNpemVXaWR0aCA9IDE1O1xuICAgIHRoaXMuY29udGV4dC5mb250ID0gaWNvblJlc2l6ZVdpZHRoICsgXCJweCBBcmlhbFwiO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBcIiMyZTZkYTRcIjtcbiAgICB0aGlzLmNvbnRleHQudGV4dEJhc2VsaW5lID0gJ2JvdHRvbSc7XG5cbiAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQoXG4gICAgICAgIENhbnZhc1VJU2VsZWN0ZWRWaWV3LlJlc2l6ZVN5bWJvbCxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgLSBpY29uUmVzaXplV2lkdGgsXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKSxcbiAgICAgICAgaWNvblJlc2l6ZVdpZHRoXG4gICAgKTtcblxuICAgIC8vdGhpcy7ih5hcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBcIiMyZTZkYTRcIjtcbiAgICB0aGlzLmNvbnRleHQuc3Ryb2tlUmVjdChcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSxcbiAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFkoKSxcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0V2lkdGgoKSxcbiAgICAgICAgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KClcbiAgICApO1xufTtcblxuLyoqXG4gKiBAY29uc3RcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKi9cbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LlJlc2l6ZVN5bWJvbCA9ICdcXHUyMWYyJzsiLCIvKipcbiAqIFBvc2l0aW9uIGluIDJEIHNwYWNlXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHhcbiAqIEBwYXJhbSB7bnVtYmVyfSB5XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUG9zaXRpb24oeCwgeSkge1xuICAgIHRoaXMueCA9ICt4IHx8IDA7XG4gICAgdGhpcy55ID0gK3kgfHwgMDtcbn1cblxuLyoqXG4gKlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuUG9zaXRpb24ucHJvdG90eXBlLmdldFggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy54O1xufTtcblxuLyoqXG4gKlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuUG9zaXRpb24ucHJvdG90eXBlLmdldFkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy55O1xufTtcblxuLyoqXG4gKiBDaGFuZ2VzIHBvc2l0aW9ucyBvZiBhbiBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFYXG4gKiBAcGFyYW0ge251bWJlcn0gZGVsdGFZXG4gKiBAcmV0dXJuIFBvc2l0aW9uXG4gKi9cblBvc2l0aW9uLnByb3RvdHlwZS5tb3ZlID0gZnVuY3Rpb24oZGVsdGFYLCBkZWx0YVkpIHtcbiAgICB2YXIgbmV3WFBvcyA9IHRoaXMueCArIGRlbHRhWDtcbiAgICB2YXIgbmV3WVBvcyA9IHRoaXMueSArIGRlbHRhWTtcblxuICAgIHJldHVybiBuZXcgUG9zaXRpb24obmV3WFBvcywgbmV3WVBvcyk7XG59OyIsIi8qKlxuICogVGhpcyBvYmplY3QgaXMgb25seSBwdXJwb3NlZCBmb3IgbG9hZGluZyBleHRlcm5hbCByZXNvdXJjZXNcbiAqIFRoaXMgaXMgc3VwcG9zZWQgdG8gYmUgYW4gb2JqZWN0IGR1cmluZyB0ZXN0aW5nIHB1cnBvc2VzXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlTG9hZGVyKCkge1xuICAgIFxufVxuXG5cbi8qKlxuICogTG9hZHMgaW1hZ2UgdGhlbiBjYWxscyBhIGZ1bmN0aW9uLlxuICogVGhhdCBzaW1wbGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICogQHBhcmFtIGNhbGxiYWNrXG4gKi9cblJlc291cmNlTG9hZGVyLnByb3RvdHlwZS5sb2FkSW1hZ2UgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcblxuICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgIGltZy5vbmxvYWQgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICBpbWcuc3JjID0gc3JjO1xufTtcblxuLyoqXG4gKiBMb2FkcyB0ZXh0IGNvbnRlbnQsIGNhbGxzIGZ1bmN0aW9uXG4gKiBcbiAqIEBwYXJhbSBzcmNcbiAqIEBwYXJhbSBjYWxsYmFja1xuICovXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZFRleHQgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBjYWxsYmFjayh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyLm9wZW4oJ0dFVCcsIHNyYywgdHJ1ZSk7XG4gICAgeGhyLnNlbmQoKTtcbn07XG5cbi8qKlxuICogTG9hZHMgSlNPTiBjb250ZW50LCBjYWxscyBjYWxsYmFja1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAqIEBwYXJhbSBjYWxsYmFja1xuICovXG5SZXNvdXJjZUxvYWRlci5wcm90b3R5cGUubG9hZEpzb25PYmplY3QgPSBmdW5jdGlvbiAoc3JjLCBjYWxsYmFjaykge1xuICAgIHRoaXMubG9hZFRleHQoc3JjLCBmdW5jdGlvbiAobG9hZGVkVGV4dCkge1xuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2soSlNPTi5wYXJzZShsb2FkZWRUZXh0KSk7XG4gICAgICAgIH1cbiAgICB9KVxufTtcblxuIiwiLyoqXG4gKlxuICogQHBhcmFtIHtSZXNvdXJjZUxvYWRlcn0gcmVzb3VyY2VMb2FkZXJcbiAqIEBwYXJhbSB7W3trZXk6IHN0cmluZywgc3JjOiBzdHJpbmcsIHR5cGU6IHN0cmluZyB9XX0gcmVzb3VyY2VzIC0gd2hhdCByZXNvdXJjZXMgYXJlIHlvdSBnb2luZyB0byBsb2FkXG4gKiBLZXkgaXMgdXNlZCB0byBzYXZlIGxvYWRlZCBjb250ZW50IHRvIFN0b3JhZ2UsXG4gKiBUeXBlIG11c3QgYmU6ICd0ZXh0JywgJ2ltYWdlJyBvciAnanNvbicsXG4gKiBTcmMgaXMgdGhlIHBhdGggdG8gdGhlIHJlc291cmNlIGZyb20gZG9jdW1lbnQgcm9vdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gb25Mb2FkIC0gY2FsbGJhY2ssIHdoaWNoIHdpbGwgYmUgZXhlY3V0ZWQgb24gbG9hZCBvZiBlYWNoIGVsZW1lbnRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBSZXNvdXJjZVByZXBhcmVyKHJlc291cmNlTG9hZGVyLCByZXNvdXJjZXMsIG9uTG9hZClcbntcbiAgICB0aGlzLmxvYWRlciA9IHJlc291cmNlTG9hZGVyO1xuICAgIHRoaXMucmVzb3VyY2VzVG9Mb2FkID0gcmVzb3VyY2VzO1xuICAgIHRoaXMub25Mb2FkID0gb25Mb2FkO1xufVxuXG4vKipcbiAqIFN0YXJ0cyBsb2FkaW5nIG9mIHJlcXVlc3RlZCByZXNvdXJjZXNcbiAqL1xuUmVzb3VyY2VQcmVwYXJlci5wcm90b3R5cGUuc3RhcnRMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0b3RhbExvYWRlZENvdW50ID0gMDtcbiAgICB2YXIgc2hvdWxkTG9hZENvdW50ID0gdGhpcy5yZXNvdXJjZXNUb0xvYWQubGVuZ3RoO1xuICAgIHZhciBvbkxvYWRDYWxsYmFjayA9IHRoaXMub25Mb2FkO1xuICAgIHZhciBsb2FkZXIgPSB0aGlzLmxvYWRlcjtcblxuICAgIC8vIEVhY2ggdGltZSB3ZSBoYXZlIGxvYWRlZCBhIHJlc291cmNlXG4gICAgLy8gd2UgY2hlY2sgZXZlcnl0aGluZyBpcyBsb2FkZWRcbiAgICB2YXIgc2F2ZVJlc291cmNlID0gZnVuY3Rpb24gKGtleSwgb2JqZWN0KSB7XG4gICAgICAgIFN0b3JhZ2UucmVtZW1iZXIoa2V5LCBvYmplY3QpO1xuICAgICAgICB0b3RhbExvYWRlZENvdW50Kys7XG4gICAgICAgIGlmICh0b3RhbExvYWRlZENvdW50ID09IHNob3VsZExvYWRDb3VudCkge1xuICAgICAgICAgICAgb25Mb2FkQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIHZhciByZXF1ZXN0TWV0aG9kcyA9IHtcbiAgICAgICAgaW1hZ2U6IGZ1bmN0aW9uIChzcmMsIGtleSkge1xuICAgICAgICAgICAgbG9hZGVyLmxvYWRJbWFnZShzcmMsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCB0aGlzKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGpzb246IGZ1bmN0aW9uIChzcmMsIGtleSkge1xuICAgICAgICAgICAgbG9hZGVyLmxvYWRKc29uT2JqZWN0KHNyYywgZnVuY3Rpb24gKGpzb25SZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNhdmVSZXNvdXJjZShrZXksIGpzb25SZXNvdXJjZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICB0ZXh0OiBmdW5jdGlvbiAoc3JjLCBrZXkpIHtcbiAgICAgICAgICAgIGxvYWRlci5sb2FkVGV4dChzcmMsIGZ1bmN0aW9uICh0ZXh0UmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICBzYXZlUmVzb3VyY2Uoa2V5LCB0ZXh0UmVzb3VyY2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJlc291cmNlc1RvTG9hZC5mb3JFYWNoKGZ1bmN0aW9uIChyZXNvdXJjZSkge1xuICAgICAgICB2YXIgdHlwZSA9IHJlc291cmNlLnR5cGU7XG4gICAgICAgIHZhciBrZXkgPSByZXNvdXJjZS5rZXk7XG4gICAgICAgIHZhciBzcmMgPSByZXNvdXJjZS5zcmM7XG5cbiAgICAgICAgaWYgKCAhIHJlcXVlc3RNZXRob2RzLmhhc093blByb3BlcnR5KHR5cGUpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1RyeWluZyB0byBsb2FkIHVua25vd24gcmVzb3VyY2UgdHlwZSEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGxpbmcgYXBwcm9wcmlhdGUgbG9hZCBtZXRob2RcbiAgICAgICAgcmVxdWVzdE1ldGhvZHNbdHlwZV0oc3JjLCBrZXkpO1xuICAgIH0pO1xufTsiLCIvKipcbiAqIFNpemUgb2YgdGhlIHJlY3RhbmdsZSBzdXJyb3VuZGluZyB0aGUgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXG4gKiBAcGFyYW0ge251bWJlcn0gaGVpZ2h0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gU2l6ZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCA9ICt3aWR0aCB8fCBTaXplLmRlZmF1bHRXaWR0aDtcbiAgICB0aGlzLmhlaWdodCA9ICtoZWlnaHQgfHwgU2l6ZS5kZWZhdWx0SGVpZ2h0O1xufVxuXG5TaXplLnByb3RvdHlwZS5nZXRXaWR0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLndpZHRoO1xufTtcblxuU2l6ZS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xufTtcblxuXG5TaXplLnByb3RvdHlwZS5yZXNpemVCeSA9IGZ1bmN0aW9uIChkZWx0YVdpZHRoLCBkZWx0YUhlaWdodCkge1xuICAgIHRoaXMud2lkdGggKz0gZGVsdGFXaWR0aDtcbiAgICB0aGlzLmhlaWdodCArPSBkZWx0YUhlaWdodDtcblxuICAgIGlmICh0aGlzLndpZHRoIDwgU2l6ZS5taW5XaWR0aCkge1xuICAgICAgICB0aGlzLndpZHRoID0gU2l6ZS5taW5XaWR0aDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5oZWlnaHQgPCBTaXplLm1pbkhlaWdodCkge1xuICAgICAgICB0aGlzLmhlaWdodCA9IFNpemUubWluSGVpZ2h0O1xuICAgIH1cbn07XG5cbi8qKlxuICogSW5jcmVhc2VzIHRoZSBzaXplIGJ5IG11bHRpcGxpZXJcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gbXVsdGlwbGllclxuICogQHJldHVybnMge1NpemV9XG4gKi9cblNpemUucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24obXVsdGlwbGllcikge1xuICAgIHJldHVybiBuZXcgU2l6ZSh0aGlzLndpZHRoICogbXVsdGlwbGllciwgdGhpcy5oZWlnaHQgKiBtdWx0aXBsaWVyKTtcbn07XG5cbi8qKlxuICogTWluaW1hbCB3aWR0aFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5taW5XaWR0aCA9IDQwO1xuXG4vKipcbiAqIE1pbmltYWwgaGVpZ2h0XG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5TaXplLm1pbkhlaWdodCA9IDQwO1xuXG4vKipcbiAqIGNvbnN0IGZvciBkZWZhdWx0IHdpZHRoXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5TaXplLmRlZmF1bHRXaWR0aCA9IDUwO1xuXG4vKipcbiAqIGNvbnN0IGZvciBkZWZhdWx0IGhlaWdodFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5kZWZhdWx0SGVpZ2h0ID0gNTA7IiwiLyoqXG4gKiBJdCBpcyBwdXJwb3NlZCBmb3IgcmVtZW1iZXJpbmcgc29tZSBkYXRhLlxuICogRnVuY3Rpb25hbCBkZWNsYXJhdGlvbiBpcyB1c2VkIGZvciBpdHMgdmlzaWJpbGl0eSBvbmx5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTdG9yYWdlKCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGlzIGlzIG5vdCBmb3IgY3JlYXRpbmcgb2JqZWN0cyFcIik7XG59XG5cblN0b3JhZ2UuX2NvbnRlbnQgPSB7fTtcblxuLyoqXG4gKiBSZW1lbWJlcnMgYW55IHZhbHVlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICovXG5TdG9yYWdlLnJlbWVtYmVyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICBTdG9yYWdlLl9jb250ZW50W2tleV0gPSB2YWx1ZTtcbn07XG5cbi8qKlxuICogQWxsb3dzIHlvdSB0byBnZXQgd2hhdCB5b3Ugd2FudCBidXQgb25seSBpZiB5b3UgcmVtZW1iZXIgdGhpcyBlYXJsaWVyXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50XG4gKi9cblN0b3JhZ2UuZ2V0ID0gZnVuY3Rpb24gKGtleSwgY29udGVudCkge1xuICAgIHZhciBzb21ldGhpbmdZb3VXYW50ID0gU3RvcmFnZS5fY29udGVudFtrZXldO1xuXG4gICAgaWYgKHR5cGVvZiBzb21ldGhpbmdZb3VXYW50ID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIldlIGhhdmUgbm90aGluZyB0byByZXR1cm4gdXNpbmcga2V5OiBcIiArIGtleSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNvbWV0aGluZ1lvdVdhbnQ7XG59O1xuIiwiLyoqXG4gKiBDb2xsZWN0aW9uIGZvciBVSSBlbGVtZW50cy5cbiAqXG4gKiBJdCBpcyBwdXJwb3NlZCBmb3Iga2VlcGluZyB1aSBlbGVtZW50cyB3aXRoIGNvcnJlY3Qgb3JkZXJcbiAqIEFsc28gc3VwcG9ydHMgc2VsZWN0aW9uIHJlbWVtYmVyaW5nXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJQ29sbGVjdGlvbigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICB0aGlzLmVsZW1lbnRzID0gW107XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xlbmd0aCcsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmVsZW1lbnRzLmxlbmd0aFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuLyoqXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgdG9wIGxheWVyIG9mIHRoZSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIHtVSUVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgaWYgKCAhIChlbGVtZW50IGluc3RhbmNlb2YgVUlFbGVtZW50KSApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRWxlbWVudCBpbiBVSUNvbGxlY3Rpb24gbXVzdCBoYXZlIFVJRWxlbWVudCB0eXBlJyk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFycmF5IHdpdGggYWxsIGVsZW1lbnRzIGluIGl0XG4gKlxuICogQHJldHVybnMge0FycmF5fVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGVsZW1lbnQgd2l0aCBwYXNzZWQgaW5kZXggZnJvbSB0aGUgY29sbGVjdGlvbiBhbmQgcmV0dXJucyBpdFxuICpcbiAqIEByZXR1cm4ge1VJRWxlbWVudH1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cbiAgICBpZiAoaW5kZXggPT0gdGhpcy5zZWxlY3RlZEluZGV4KSB7XG4gICAgICAgIHRoaXMuZGVzZWxlY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc3BsaWNlKGluZGV4LCAxKVswXTtcbn07XG5cbi8qKlxuICogU3dhcHMgcGxhY2VzIG9mIHR3byBlbGVtZW50cyBpbiB0aGUgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBpbmRleDFcbiAqIEBwYXJhbSBpbmRleDJcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zd2FwID0gZnVuY3Rpb24gKGluZGV4MSwgaW5kZXgyKSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleDEpIHx8ICF0aGlzLmhhcyhpbmRleDIpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuXG4gICAgdmFyIHRlbXAgPSB0aGlzLmVsZW1lbnRzW2luZGV4MV07XG4gICAgdGhpcy5lbGVtZW50c1tpbmRleDFdICA9IHRoaXMuZWxlbWVudHNbaW5kZXgyXTtcbiAgICB0aGlzLmVsZW1lbnRzW2luZGV4Ml0gPSB0ZW1wO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBpbmRleCBleGlzdHMgaW4gY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBpbmRleFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgcmV0dXJuIGluZGV4ID49IDAgfHwgaW5kZXggPCB0aGlzLmxlbmd0aDtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBpbmRleFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW2luZGV4XTtcbn07XG5cbi8qKlxuICogRm9yZ2V0cyB3aGljaCBlbGVtZW50IHdhcyBzZWxlY3RlZFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmRlc2VsZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIGluZGV4XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcbiAgICB9XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG59O1xuXG4vKipcbiAqIFNlbGVjdHMgdGhlIGxhc3QgZWxlbWVudCBpbiB0aGUgY29sbGVjdGlvblxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnNlbGVjdExhc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5sZW5ndGggPyB0aGlzLmxlbmd0aCAtIDEgOiAtMTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBzZWxlY3RlZCBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmdldFNlbGVjdGVkRWxlbWVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4ICE9IC0xKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRzW3RoaXMuc2VsZWN0ZWRJbmRleF1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAqIFJldHVybnMgaW5kZXggb2Ygc2VsZWN0ZWQgZWxlbWVudFxuICogSWYgbm9uZSwgcmV0dXJucyAtMVxuICpcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEluZGV4O1xufTtcblxuLyoqXG4gKiBGZXRjaGVzIGVsZW1lbnQgYnkgcGFzc2VkIG9mZnNldFxuICpcbiAqIEBwYXJhbSBvZmZzZXRYXG4gKiBAcGFyYW0gb2Zmc2V0WVxuICogQHJldHVybnMge1VJRWxlbWVudHxudWxsfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmZldGNoRWxlbWVudEJ5T2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICB2YXIgbWF0Y2hlZEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgaWYgKGVsLmlzT2Zmc2V0SW4ob2Zmc2V0WCwgb2Zmc2V0WSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWRFbGVtZW50ID0gZWw7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2hlZEVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIFB1c2hlcyBlbGVtZW50IHRvIHRoZSBlbmQgb2YgdGhlIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS50b0VuZCA9IGZ1bmN0aW9uKGluZGV4KVxue1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIHZhciB3YXNTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PSBpbmRleDtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICB0aGlzLmFkZChlbGVtZW50KTtcblxuICAgIGlmICh3YXNTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmxlbmd0aCAtIDE7XG4gICAgfVxufTtcblxuLyoqXG4gKiBQdXNoZXMgZWxlbWVudCB0byB0aGUgYm90dG9tIG9mIHRoZSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIGluZGV4XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUudG9TdGFydCA9IGZ1bmN0aW9uKGluZGV4KVxue1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIHZhciB3YXNTZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWRJbmRleCA9PSBpbmRleDtcbiAgICB2YXIgZWxlbWVudCA9IHRoaXMucmVtb3ZlKGluZGV4KTtcbiAgICB0aGlzLmVsZW1lbnRzID0gW2VsZW1lbnRdLmNvbmNhdCh0aGlzLmVsZW1lbnRzKTtcblxuICAgIGlmICh3YXNTZWxlY3RlZCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAgIH1cbn07XG5cblxuLyoqXG4gKiBGZXRjaGVzIGluZGV4IGJ5IHBhc3NlZCBvZmZzZXRcbiAqXG4gKiBAcGFyYW0gb2Zmc2V0WFxuICogQHBhcmFtIG9mZnNldFlcbiAqIEByZXR1cm5zIHsqfVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmZldGNoSW5kZXhCeU9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgdmFyIG1hdGNoZWRJbmRleCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGVsLmlzT2Zmc2V0SW4ob2Zmc2V0WCwgb2Zmc2V0WSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWRJbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG1hdGNoZWRJbmRleDtcbn07IiwiLyoqXG4gKiBTb21lIGVsZW1lbnQgb2YgdXNlciBpbnRlcmZhY2VcbiAqXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufHVuZGVmaW5lZH0gcG9zaXRpb25cbiAqIEBwYXJhbSB7U2l6ZXx1bmRlZmluZWR9IHNpemVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUVsZW1lbnQocG9zaXRpb24sIHNpemUpXG57XG4gICAgaWYgKCAhIChwb3NpdGlvbiBpbnN0YW5jZW9mIFBvc2l0aW9uKSApIHtcbiAgICAgICAgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24oKTtcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gICAgaWYgKCAhIChzaXplIGluc3RhbmNlb2YgUG9zaXRpb24pKSB7XG4gICAgICAgIHNpemUgPSBuZXcgU2l6ZSgpO1xuICAgIH1cbiAgICB0aGlzLnNpemUgPSBzaXplO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHZpZXcgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge1VJRWxlbWVudFZpZXd9IHZpZXdcbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRWaWV3ID0gZnVuY3Rpb24odmlldykge1xuICAgIGlmICggISAodmlldyBpbnN0YW5jZW9mIFVJRWxlbWVudFZpZXcpICkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdWaWV3IG11c3QgaGF2ZSBVSUVsZW1lbnRWaWV3IHR5cGUhJyk7XG4gICAgfVxuICAgIHRoaXMudmlldyA9IHZpZXc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgY3VycmVudCB2aWV3IG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1VJRWxlbWVudFZpZXd8dW5kZWZpbmVkfVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFZpZXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldztcbn07XG5cbi8qKlxuICogUmVuZGVycyB0aGUgZWxlbWVudCB1c2luZyBpdHMgdmlld1xuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMudmlldykge1xuICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ1ZpZXcgaXMgbm90IHNldCEnKTtcbiAgICB9XG5cbiAgICB0aGlzLnZpZXcucmVuZGVyKHRoaXMpO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHtQb3NpdGlvbn0gcG9zaXRpb25cbiAqIEByZXR1cm5zIHtVSUVsZW1lbnR9XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUubW92ZVRvID0gZnVuY3Rpb24ocG9zaXRpb24pIHtcbiAgICBpZiAoIXBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignbmV3IHBvc2l0aW9uIG11c3QgaGF2ZSBQb3NpdGlvbiB0eXBlIScpXG4gICAgfVxuICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJucyBwb3NpdGlvbiBvZiBhbiBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1Bvc2l0aW9ufVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zaXRpb247XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5zZXRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJuIHRoZSBzaXplIG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHJldHVybnMge1NpemV9XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0U2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zaXplO1xufTtcblxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBwYXNzZWQgb2Zmc2V0IG1hdGNoZXMgZWxlbWVudCBwb3NpdGlvblxuICpcbiAqIEBwYXJhbSBjbGllbnRYXG4gKiBAcGFyYW0gY2xpZW50WVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuaXNPZmZzZXRJbiA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKVxue1xuICAgIHZhciBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIGN1cnJlbnRTaXplID0gdGhpcy5nZXRTaXplKCk7XG5cbiAgICBpZiAoY3VycmVudFBvc2l0aW9uLmdldFgoKSA+IGNsaWVudFggfHwgY3VycmVudFBvc2l0aW9uLmdldFgoKSArIGN1cnJlbnRTaXplLmdldFdpZHRoKCkgPCBjbGllbnRYKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgPiBjbGllbnRZIHx8IGN1cnJlbnRQb3NpdGlvbi5nZXRZKCkgKyBjdXJyZW50U2l6ZS5nZXRIZWlnaHQoKSA8IGNsaWVudFkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGhvdyBmYXIgaXMgcGFzc2VkIG9mZnNldCBmcm9tIHBvaW50ICgwLCAwKVxuICpcbiAqIEBwYXJhbSBjbGllbnRYXG4gKiBAcGFyYW0gY2xpZW50WVxuICogQHJldHVybnMge3t0b3A6IG51bWJlciwgbGVmdDogbnVtYmVyfX1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRDbGlja09mZnNldCA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKSB7XG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5nZXRQb3NpdGlvbigpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogY2xpZW50WCAtIHBvc2l0aW9uLmdldFgoKSxcbiAgICAgICAgbGVmdDogY2xpZW50WSAtIHBvc2l0aW9uLmdldFkoKVxuICAgIH1cbn07IiwiLyoqXG4gKiBPYmplY3QsIHdoaWNoIGRlZmluZXMgaG93IHRvIHJlbmRlciBzcGVjaWZpYyBVSUVsZW1lbnRcbiAqIFRoaXMgb2JqZWN0IGtub3dzIGV2ZXJ5dGhpbmcgYWJvdXQgYW4gb2JqZWN0IGl0IG5lZWRzIHRvIGRyYXcuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJRWxlbWVudFZpZXcoKVxue1xuXG59XG4vKipcbiAqXG4gKiBAcGFyYW0gVUlFbGVtZW50XG4gKi9cblVJRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChVSUVsZW1lbnQpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ1lvdSBzaG91bGQgbm90IGJlIHVzaW5nIGFuIGFic3RyYWN0IG9iamVjdCBmb3IgcmVuZGVyaW5nIScpO1xufTtcbiIsIi8qKlxuICpcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cbiAqIEBwYXJhbSB7U2l6ZXxudWxsfSBzaXplXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJSW1hZ2VFbGVtZW50KHBvc2l0aW9uLCBzaXplLCBpbWFnZSlcbntcbiAgICBVSUVsZW1lbnQuY2FsbCh0aGlzLCBwb3NpdGlvbiwgc2l6ZSk7XG5cbiAgICBpZiAoICEgKGltYWdlIGluc3RhbmNlb2YgSW1hZ2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbWFnZSBtdXN0IGhhdmUgSW1hZ2UgdHlwZSFcIik7XG4gICAgfVxuXG4gICAgdGhpcy5pbWFnZSA9IGltYWdlO1xufVxuXG5VSUltYWdlRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xuXG4vKipcbiAqXG4gKiBAcmV0dXJucyB7SW1hZ2V9XG4gKi9cblVJSW1hZ2VFbGVtZW50LnByb3RvdHlwZS5nZXRJbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbWFnZTtcbn07IiwiLyoqXG4gKiBDbGFzcyBmb3IgY3JlYXRpbmdcbiAqXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufG51bGx9IHBvc2l0aW9uXG4gKiBAcGFyYW0ge1NpemV8bnVsbH0gc2l6ZVxuICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAqIEBwYXJhbSB7Kn0gc3R5bGVcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBVSUxhYmVsRWxlbWVudChwb3NpdGlvbiwgc2l6ZSwgdGV4dCwgc3R5bGUpIHtcbiAgICBVSUVsZW1lbnQuYXBwbHkodGhpcywgW3Bvc2l0aW9uLCBzaXplXSk7XG5cbiAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgdGV4dCA9IFVJTGFiZWxFbGVtZW50LmRlZmF1bHRUZXh0O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IHRleHQ7XG5cbiAgICBpZiAoISAoc3R5bGUgaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgIHN0eWxlID0ge307XG4gICAgfVxuXG4gICAgdGhpcy5mb250ID0gc3R5bGUuZm9udCB8fCBVSUxhYmVsRWxlbWVudC5kZWZhdWx0U3R5bGUuZm9udDtcbiAgICB0aGlzLmNvbG9yID0gc3R5bGUuY29sb3IgfHwgVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFN0eWxlLmNvbG9yO1xufVxuXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKFVJRWxlbWVudC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIEdldHMgYSB0ZXh0IG9mIHRoZSBjdXJyZW50IFVJTGFiZWxFbGVtZW50XG4gKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLmdldFRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGV4dDtcbn07XG5cbi8qKlxuICogU2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0XG4gKlxuICogQHJldHVybiB7c3RyaW5nfHN0cmluZ3wqfVxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0Rm9udCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5mb250O1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBmb250IG9mIHRoZSBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGZvbnRcbiAqL1xuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLnNldEZvbnQgPSBmdW5jdGlvbiAoZm9udCkge1xuICAgIHRoaXMuZm9udCA9IGZvbnQ7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGNvbG9yIG9mIHRoZSB0ZXh0XG4gKlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0Q29sb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3I7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGNvbG9yIG9mIHRoZSB0ZXh0XG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yXG4gKi9cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHRoaXMuY29sb3IgPSBjb2xvcjtcbn07XG5cblVJTGFiZWxFbGVtZW50LmRlZmF1bHRUZXh0ID0gXCLQktCy0LXQtNC40YLQtSDRgtC10LrRgdGCLi4uXCI7XG5cblVJTGFiZWxFbGVtZW50LmRlZmF1bHRTdHlsZSA9IHtcbiAgICBmb250OiAnQXJpYWwnLFxuICAgIGNvbG9yOiAnIzAwMDAwMCdcbn07IiwiLyoqXG4gKiBAcGFyYW0ge0hUTUxDYW52YXNFbGVtZW50fSBjYW52YXNcbiAqIEBwYXJhbSBtb2RlbFxuICogQHBhcmFtIHtJbWFnZX0gaW5pdGlhbFRleHR1cmVcbiAqIEBwYXJhbSB7c3RyaW5nfSB2ZXJ0ZXhTaGFkZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudFNoYWRlclxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1vZGVsVmlldyhjYW52YXMsIG1vZGVsLCBpbml0aWFsVGV4dHVyZSwgdmVydGV4U2hhZGVyLCBmcmFnbWVudFNoYWRlcikge1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuXG4gICAgdGhpcy5nbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpO1xuXG4gICAgaWYgKCF0aGlzLmdsKSB7XG4gICAgICAgIGFsZXJ0KCdZb3UgZG8gbm90IGhhdmUgV2ViR0wgc3VwcG9ydCcpO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkdMIHN1cHBvcnQgaXMgcmVxdWlyZWQhJyk7XG4gICAgfVxuICAgIFxuICAgIHRoaXMubW9kZWwgPSBtb2RlbDtcbiAgICB0aGlzLnRleHR1cmUgPSBpbml0aWFsVGV4dHVyZTtcbiAgICB0aGlzLnZlcnRleFNoYWRlclNvdXJjZSA9IHZlcnRleFNoYWRlcjtcbiAgICB0aGlzLmZyYWdtZW50U2hhZGVyU291cmNlID0gZnJhZ21lbnRTaGFkZXI7XG4gICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgdGhpcy5zZXRUZXh0dXJlKGluaXRpYWxUZXh0dXJlKTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBzb21lIG9mLi4uIEkgY2FsbCBpdCB0aGluZ3NcbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzaGFkZXJDb21waWxlciA9IG5ldyBTaGFkZXJDb21waWxlcih0aGlzLmdsKTtcbiAgICB0aGlzLnNoYWRlclByb2dyYW0gPSBzaGFkZXJDb21waWxlci5tYWtlUHJvZ3JhbSh0aGlzLnZlcnRleFNoYWRlclNvdXJjZSwgdGhpcy5mcmFnbWVudFNoYWRlclNvdXJjZSk7XG59O1xuXG4vKipcbiAqIFNldHMgYSBuZXcgdGV4dHVyZVxuICogXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxuICovXG5Nb2RlbFZpZXcucHJvdG90eXBlLnNldFRleHR1cmUgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcblxuICAgIHRoaXMudGV4dHVyZSA9IGltYWdlO1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG5cbiAgICAvLyBDcmVhdGluZyB0ZXh0dXJlXG4gICAgdGhpcy5tb2RlbFRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgLy8gQmluZGluZyBpdFxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRoaXMubW9kZWxUZXh0dXJlKTtcbiAgICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCB0cnVlKTtcbiAgICAvLyBpIGZvciBpbnRlZ2VyICwgcywgdCAtIHUsIHZcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9TLCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfV1JBUF9ULCBnbC5DTEFNUF9UT19FREdFKTtcbiAgICAvLyBGaWx0ZXJzXG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01JTl9GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgZ2wudGV4UGFyYW1ldGVyaShnbC5URVhUVVJFXzJELCBnbC5URVhUVVJFX01BR19GSUxURVIsIGdsLkxJTkVBUik7XG4gICAgLy8g0KHQsNC80LAg0YLQtdC60YHRgtGD0YDQsFxuICAgIGdsLnRleEltYWdlMkQoXG4gICAgICAgIGdsLlRFWFRVUkVfMkQsIC8vIFRleHR1cmUgdHlwZVxuICAgICAgICAwLCAvLyBEZXRhaWwgbGV2ZWxcbiAgICAgICAgZ2wuUkdCQSwgLy8gV2hhdCBmb3JtYXQgZG8gd2UgdXNlXG4gICAgICAgIGdsLlJHQkEsXG4gICAgICAgIGdsLlVOU0lHTkVEX0JZVEUsIC8vIERhdGEgdHlwZVxuICAgICAgICB0aGlzLnRleHR1cmUgLy8gVGV4dHVyZSBpdHNlbGZcbiAgICApO1xuICAgIC8vIFVuYmluZCBmb3Igbm93XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbCk7XG59O1xuXG5Nb2RlbFZpZXcucHJvdG90eXBlLnN0YXJ0UmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG4gICAgXG4gICAgLy8g0JLQutC70Y7Rh9Cw0LXQvCDQv9GA0L7QstC10YDQutGDINCz0LvRg9Cx0LjQvdGLXG4gICAgZ2wuZW5hYmxlKGdsLkRFUFRIX1RFU1QpO1xuICAgIFxuICAgIC8vINCX0LDQtNCw0LXQvCDRhtCy0LXRgiDQvtGH0LjRgdGC0LrQuFxuICAgIGdsLmNsZWFyQ29sb3IoMC44LCAwLjksIDAuOSAsMS4wKTtcbiAgICAvLyDQntGH0LjRgdGC0LrQsCAtINGH0YLQviDQvtGH0LjRidCw0LXQvCAtINCx0YPRhNC10YAg0YbQstC10YLQsCwg0LjQu9C4INC20LUg0LHRg9GE0LXRgCDQs9C70YPQsdC40L3Ri1xuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUKTtcblxuICAgIHZhciBtb2RlbCA9IHRoaXMubW9kZWw7XG4gICAgdmFyIHByb2dyYW0gPSB0aGlzLnNoYWRlclByb2dyYW07XG5cbiAgICAvLyDQodC+0LfQtNCw0LXQvCDQsdGD0YTQtdGA0YtcbiAgICB2YXIgbW9kZWxWZXJ0ZXhlcyA9IG1vZGVsLm1lc2hlc1swXS52ZXJ0aWNlcztcbiAgICB2YXIgbW9kZWxJbmRleGVzID0gQXJyYXkucHJvdG90eXBlLmNvbmNhdC5hcHBseShbXSwgbW9kZWwubWVzaGVzWzBdLmZhY2VzKTtcbiAgICB2YXIgbW9kZWxUZXhDb29yZHMgPSBtb2RlbC5tZXNoZXNbMF0udGV4dHVyZWNvb3Jkc1swXTtcblxuICAgIC8vINCh0L7Qt9C00LDQtdC8INCx0YPRhNC10YAgLSDRh9C10YDQtdC3INC90LXQs9C+INC/0LXRgNC10LTQsNC10YLRgdGPINC40L3RhNC+0YDQvNCw0YbQuNGPINCyIEdQVVxuICAgIHZhciBtb2RlbFZlcnRleEJ1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIC8vINCd0LDQt9C90LDRh9Cw0LXQvCDQtdCz0L4g0LDQutGC0LjQstC90YvQvFxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBtb2RlbFZlcnRleEJ1ZmZlck9iamVjdCk7XG4gICAgLy8gU1RBVElDX0RSQVcgLSDQutC+0L/QuNGA0YPQtdC8INC10LTQuNC90L7QttC00Ysg0LjQtyBDUFUg0LIgR1BVXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkobW9kZWxWZXJ0ZXhlcyksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIC8vINCe0YLQtNC10LvRjNC90YvQuSDQsdGD0YTQtdGAINC00LvRjyDRgtC10LrRgdGC0YPRgNC90YvRhSDQutC+0L7RgNC00LjQvdCw0YJcbiAgICB2YXIgbW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCBuZXcgRmxvYXQzMkFycmF5KG1vZGVsVGV4Q29vcmRzKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LjQvdC00LXQutGB0L3Ri9C5INCx0YPRhNC10YAg0LTQu9GPINGD0LrQsNC30LDQvdC40Y8g0L/QvtGA0Y/QtNC60LAg0LLQtdGA0YjQuNC9XG4gICAgdmFyIG1hc2tJbmRleEJ1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIC8vINCd0LDQt9C90LDRh9Cw0LXQvCDQtdCz0L4g0LDQutGC0LjQstC90YvQvFxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG1hc2tJbmRleEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbmV3IFVpbnQxNkFycmF5KG1vZGVsSW5kZXhlcyksIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIC8vINCj0LLQtdC00L7QvNC70Y/QtdC8INGI0LXQudC00LXRgCDQviDRgtC+0LwsINC60LDQuiDQsdGA0LDRgtGMINC00LDQvdC90YvQtSDQuNC3INCx0YPRhNC10YDQsCDQsiDQutCw0YfQtdGB0YLQstC1INCy0YXQvtC00L3Ri9GFINC/0LDRgNCw0LzQtdGC0YDQvtCyXG4gICAgdmFyIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydFBvc2l0aW9uJyk7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbW9kZWxWZXJ0ZXhCdWZmZXJPYmplY3QpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIC8vINC90LDRiCDQsNGC0YDQuNCx0YPRglxuICAgICAgICAzLCAvLyDQmtC+0LvQuNGH0LXRgdGC0LLQviDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDQsNGC0YDQuNCx0YPRglxuICAgICAgICBnbC5GTE9BVCwgLy8g0KLQuNC/INC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LHRg9GE0LXRgNCwXG4gICAgICAgIGdsLkZBTFNFLCAvLyDQndC+0YDQvNCw0LvQuNC30L7QstCw0L3QvdGL0Lkg0LLQuNC0P1xuICAgICAgICAzICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCAvLyDQoNCw0LfQvNC10YAg0L7QtNC90L7QuSDQstC10YDRiNC40L3RiyAo0LHQsNC50YIpXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxuICAgICk7XG4gICAgLy8g0JLQutC70Y7Rh9Cw0LXQvCDQsNGC0YDQuNCx0YPRglxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG1vZGVsVGV4Q29vcmRzQnVmZmVyT2JqZWN0KTtcbiAgICB2YXIgdGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0VGV4Q29vcmQnKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICB0ZXhDb29yZEF0dHJpYnV0ZUxvY2F0aW9uLCAvLyDQvdCw0Ygg0LDRgtGA0LjQsdGD0YJcbiAgICAgICAgMiwgLy8g0JrQvtC70LjRh9C10YHRgtCy0L4g0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0LDRgtGA0LjQsdGD0YJcbiAgICAgICAgZ2wuRkxPQVQsIC8vINCi0LjQvyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCx0YPRhNC10YDQsFxuICAgICAgICBnbC5GQUxTRSwgLy8g0J3QvtGA0LzQsNC70LjQt9C+0LLQsNC90L3Ri9C5INCy0LjQtD9cbiAgICAgICAgMiAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxuICAgICAgICAwIC8vINCe0YLRgdGC0YPQvyAo0LIg0LHQsNC50YLQsNGFKSDQvtGCINC90LDRh9Cw0LvQsCDQtNCw0L3QvdGL0YUsINC/0YDQuNC90LDQtNC70LXQttCw0YnQuNGFINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90LVcbiAgICApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24pO1xuXG4gICAgLy8g0JzQsNGC0YDQuNGG0YsgLSDQvNC10YHRgtC+0L/QvtC70L7QttC10L3QuNC1INCyINGI0LXQudC00LXRgNCw0YVcbiAgICB2YXIgbWF0V29ybGRVbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgJ21Xb3JsZCcpO1xuICAgIHZhciBtYXRWaWV3VW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICdtVmlldycpO1xuICAgIHZhciBtYXRQcm9qZWN0aW9uVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHByb2dyYW0sICdtUHJvamVjdGlvbicpO1xuXG4gICAgLy8g0KHQsNC80Lgg0LzQsNGC0YDQuNGG0YtcbiAgICB2YXIgd29ybGRNYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICB2YXIgdmlld01hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIHZhciBwcm9qZWN0aW9uTWF0cml4ID0gbmV3IEZsb2F0MzJBcnJheSgxNik7XG4gICAgbWF0NC5pZGVudGl0eSh3b3JsZE1hdHJpeCk7XG4gICAgLy8g0J/QvtC30LjRhtC40Y8g0L3QsNCx0LvRjtC00LDRgtC10LvRjywg0LrRg9C00LAg0L7QvSDRgdC80L7RgtGA0LjRgiwg0L/Qu9GO0YEg0LLQtdC60YLQvtGAINCy0LXRgNGF0LBcbiAgICBtYXQ0Lmxvb2tBdCh2aWV3TWF0cml4LCBbMCwgMCwgLTVdLCBbMCwgMCwgMF0sIFswLCAxLCAwXSk7XG4gICAgLy8g0J/QvtC70LUg0L7QsdC30L7RgNCwICjQsiDRgNCw0LTQuNCw0L3QsNGFKSwgdmlld3BvcnQsIGNsb3Nlc3QgcGxhbmUsIGZhciBwbGFuZVxuICAgIG1hdDQucGVyc3BlY3RpdmUocHJvamVjdGlvbk1hdHJpeCwgZ2xNYXRyaXgudG9SYWRpYW4oMzApLCB0aGlzLmNhbnZhcy53aWR0aCAvIHRoaXMuY2FudmFzLmhlaWdodCwgMC4wMDEsIDEwLjApO1xuXG4gICAgLy8g0JrQsNC60YPRjiDRiNC10LnQtNC10YDQvdGD0Y4g0L/RgNC+0LPRgNCw0LzQvNGDINC40YHQv9C+0LvRjNC30YPQtdC8XG4gICAgZ2wudXNlUHJvZ3JhbShwcm9ncmFtKTtcblxuICAgIC8vINCf0LXRgNC10LTQsNC10Lwg0LIg0YjQtdC50LTQtdGALiBUUlVFIC0g0YfRgtC+0LHRiyDRgtGA0LDQvdGB0L/QvtC90LjRgNC+0LLQsNGC0YxcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KG1hdFdvcmxkVW5pZm9ybUxvY2F0aW9uLCBnbC5GQUxTRSwgd29ybGRNYXRyaXgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobWF0Vmlld1VuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHZpZXdNYXRyaXgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobWF0UHJvamVjdGlvblVuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHByb2plY3Rpb25NYXRyaXgpO1xuXG4gICAgLy8g0KPQs9C+0Lsg0LLRgNCw0YnQtdC90LjRj1xuICAgIHZhciBhbmdsZVggPSAwO1xuICAgIHZhciBhbmdsZVkgPSAwO1xuICAgIHZhciBpc01vdXNlUHJlc3NlZCA9IGZhbHNlO1xuICAgIHZhciBpbml0aWFsRXZlbnQgPSBudWxsO1xuICAgIC8vINCt0YLQviDRg9C20LUg0L7RgtGB0LXQsdGP0YLQuNC90LAg0L/QvtGI0LvQsFxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaXNNb3VzZVByZXNzZWQgPSB0cnVlO1xuICAgICAgICBpbml0aWFsRXZlbnQgPSBlO1xuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpc01vdXNlUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICBpbml0aWFsRXZlbnQgPSBudWxsO1xuICAgIH0pO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmIChpc01vdXNlUHJlc3NlZCkge1xuICAgICAgICAgICAgdmFyIGRpZmZYID0gaW5pdGlhbEV2ZW50LmNsaWVudFggLSBlLmNsaWVudFg7XG4gICAgICAgICAgICB2YXIgZGlmZlkgPSBpbml0aWFsRXZlbnQuY2xpZW50WSAtIGUuY2xpZW50WTtcbiAgICAgICAgICAgIGluaXRpYWxFdmVudCA9IGU7XG4gICAgICAgICAgICBhbmdsZVkgKz0gLSAoZGlmZlggLyAyMDApO1xuICAgICAgICAgICAgYW5nbGVYICs9ICAoZGlmZlkgLyAyMDApO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvLyDQodCx0LXRgNC10LPQsNC10Lwg0LLRi9GH0LjRgdC70LjRgtC10LvRjNC90YvQtSDQvNC+0YnQvdC+0YHRgtC4XG4gICAgLy8g0JPQu9Cw0LLQvdGL0Lkg0YbQuNC60YAg0YDQtdC90LTQtdGA0LBcbiAgICB2YXIgaWRlbnRpdHlNYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICBtYXQ0LmlkZW50aXR5KGlkZW50aXR5TWF0cml4KTtcblxuICAgIHZhciBsb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyDQmtCw0LrRg9GOINC80LDRgtGA0LjRhtGDINCy0L7QutGA0YPQsyDQutCw0LrQvtC5INCy0YDQsNGJ0LDQtdC8XG4gICAgICAgIG1hdDQucm90YXRlKHdvcmxkTWF0cml4LCBpZGVudGl0eU1hdHJpeCwgYW5nbGVYLCBbMSwgMCwgMF0pO1xuICAgICAgICBtYXQ0LnJvdGF0ZSh3b3JsZE1hdHJpeCwgd29ybGRNYXRyaXgsIGFuZ2xlWSwgWzAsIDEsIDBdKTtcbiAgICAgICAgLy8g0J7QsdC90L7QstC70Y/QtdC8INC/0LXRgNC10LzQtdC90L3Rg9GOINCyINGI0LXQudC00LXRgNC1XG4gICAgICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYobWF0V29ybGRVbmlmb3JtTG9jYXRpb24sIGdsLkZBTFNFLCB3b3JsZE1hdHJpeCk7XG5cbiAgICAgICAgLy8g0J3QsNC30L3QsNGH0LXQvdC40LUg0YLQtdC60YHRgtGD0YDRi1xuICAgICAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBzZWxmLm1vZGVsVGV4dHVyZSk7XG4gICAgICAgIC8vINCQ0LrRgtC40LLQvdGL0Lkg0YHQu9C+0YIg0YLQtdC60YHRgtGD0YDRi1xuICAgICAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcblxuICAgICAgICBnbC5jbGVhckNvbG9yKDAuOCwgMC45LCAwLjkgLDEuMCk7XG4gICAgICAgIGdsLmNsZWFyKGdsLkRFUFRIX0JVRkZFUl9CSVQgfCBnbC5DT0xPUl9CVUZGRVJfQklUICk7XG5cbiAgICAgICAgZ2wuZHJhd0VsZW1lbnRzKFxuICAgICAgICAgICAgZ2wuVFJJQU5HTEVTLCAvLyDQmtCw0Log0YDQuNGB0YPQtdC8LFxuICAgICAgICAgICAgbW9kZWxJbmRleGVzLmxlbmd0aCxcbiAgICAgICAgICAgIGdsLlVOU0lHTkVEX1NIT1JULCAvLyDQotC40L9cbiAgICAgICAgICAgIDAgLy8g0KHQutC+0LvRjNC60L4g0L/RgNC+0L/Rg9GB0LrQsNC8INCy0LXRgNGI0LjQvVxuICAgICAgICApO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG4gICAgfTtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG59O1xuIiwiLyoqXG4gKiBTaGFkZXIgY29tcGlsZXJcbiAqIFNpbXBseSBtYWtlcyBXZWJHTFByb2dyYW0gZnJvbSBzaGFkZXIgc291cmNlc1xuICpcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSB3ZWJHTFJlbmRlcmluZ0NvbnRlbnRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTaGFkZXJDb21waWxlcih3ZWJHTFJlbmRlcmluZ0NvbnRlbnQpIHtcbiAgICB0aGlzLndlYkdMQ29udGV4dCA9IHdlYkdMUmVuZGVyaW5nQ29udGVudDsgICAgIFxufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVydGV4U2hhZGVyU291cmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnRTaGFkZXJTb3VyY2VcbiAqIEByZXR1cm4ge1dlYkdMUHJvZ3JhbX1cbiAqL1xuU2hhZGVyQ29tcGlsZXIucHJvdG90eXBlLm1ha2VQcm9ncmFtID0gZnVuY3Rpb24gKHZlcnRleFNoYWRlclNvdXJjZSwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLndlYkdMQ29udGV4dDtcblxuICAgIC8vIENyZWF0aW5nIHNoYWRlclxuICAgIHZhciB2ZXJ0ZXhTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgdmFyIGZyYWdtZW50U2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKGdsLkZSQUdNRU5UX1NIQURFUik7XG5cbiAgICAvLyBTZXR0aW5nIHNoYWRlciBzb3VyY2VzXG4gICAgZ2wuc2hhZGVyU291cmNlKHZlcnRleFNoYWRlciwgdmVydGV4U2hhZGVyU291cmNlKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ21lbnRTaGFkZXIsIGZyYWdtZW50U2hhZGVyU291cmNlKTtcblxuICAgIC8vIENvbXBpbGluZyBzaGFkZXJcbiAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRleFNoYWRlcik7XG5cbiAgICAvLyBDaGVja2luZyBjb21waWxhdGlvbiBzdGF0dXNcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcih2ZXJ0ZXhTaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yIGNvbXBpbGluZyB2ZXJ0ZXggc2hhZGVyIScsIGdsLmdldFNoYWRlckluZm9Mb2codmVydGV4U2hhZGVyKSk7XG5cbiAgICB9XG5cbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdtZW50U2hhZGVyKTtcbiAgICBpZiAoIWdsLmdldFNoYWRlclBhcmFtZXRlcihmcmFnbWVudFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgY29tcGlsaW5nIGZyYWdtZW50IHNoYWRlciEnLCBnbC5nZXRTaGFkZXJJbmZvTG9nKGZyYWdtZW50U2hhZGVyKSk7XG4gICAgfVxuXG4gICAgLy8gV2Ugd2FudCB0byBtYWtlIGEgcHJvZ3JhbSBzaGFkZXIgc291cmNlc1xuICAgIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuXG4gICAgLy8gV2ViR0wga25vd3MgdHlwZSBvZiBlYWNoIHNoYWRlclxuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2ZXJ0ZXhTaGFkZXIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmcmFnbWVudFNoYWRlcik7XG5cbiAgICAvLyBMaW5raW5nXG4gICAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSk7XG5cbiAgICAvLyBEbyB3ZSBoYXZlIGxpbmtpbmcgZXJyb3JzP1xuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMaW5raW5nIGVycm9yIScsIGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICB9XG5cbiAgICAvLyBPbmx5IGZvciB0ZXN0aW5nIHB1cnBvc2VzXG4gICAgZ2wudmFsaWRhdGVQcm9ncmFtKHByb2dyYW0pO1xuICAgIGlmICghZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5WQUxJREFURV9TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVmFsaWRhdGluZyBlcnJvciEnLCBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2dyYW07XG59O1xuXG4iLCIvKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1N1cmZhY2V9IHN1cmZhY2VcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDb21wb25lbnRzUGFuZWwoc3VyZmFjZSlcbntcbiAgICB0aGlzLl9zdXJmYWNlID0gc3VyZmFjZTtcbiAgICBcbiAgICB0aGlzLl9maWxlSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZVVwbG9hZGVyJyk7XG4gICAgdGhpcy5fYnRuVXBkYXRlVGV4dHVyZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGRhdGVUZXh0dXJlJyk7XG4gICAgdGhpcy5fYnRuQWRkVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5BZGRUZXh0Jyk7XG4gICAgdGhpcy5fc2VsZWN0QmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RCYWNrZ3JvdW5kJyk7XG59XG5cbkNvbXBvbmVudHNQYW5lbC5wcm90b3R5cGUuYmluZEhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBcbiAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXIgZm9yIGNsaWNrIG9uIHRleHQgYnV0dG9uXG4gICAgdGhpcy5fYnRuQWRkVGV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5wdXNoTGFiZWwoKTtcbiAgICB9KTtcbiAgICBcbiAgICAvLyBVcGRhdGUgY3VycmVudCB0ZXh0dXJlIGJ1dHRvblxuICAgIHRoaXMuX2J0blVwZGF0ZVRleHR1cmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG1vZGVsVmlldy5zZXRUZXh0dXJlKHNlbGYuX3N1cmZhY2UudG9JbWFnZSgpKTtcbiAgICB9KTtcblxuICAgIC8vIE9uIGNsaWNrIHdlIHNldCB2YWx1ZSB0byBlbXB0eSBhbmQgdGhlIHJlYXNvblxuICAgIC8vIHdoeSB3ZSBhcmUgZG9pbmcgdGhpcyBpcyBiZWNhdXNlIHdlIHdhbnQgdG9cbiAgICAvLyBhZGQgbmV3IGltYWdlIG9uIHRoZSBzdXJmYWNlIGV2ZW4gaWYgaXQgaXMgdGhlXG4gICAgLy8gc2FtZSBmaWxlIChpbiBjYXNlIHVzZXIgc2VsZWN0ZWQgaXQgZWFybGllcilcbiAgICB0aGlzLl9maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgfSk7XG5cbiAgICAvLyBTZXR0aW5nIGNsZWFyIGNvbG9yIGZvciBjYW52YXMgc3VyZmFjZVxuICAgIHRoaXMuX3NlbGVjdEJhY2tncm91bmQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBUaGVyZSBpcyBhbiBlbXB0eSB2YWx1ZSBpbiB0aGUgbGlzdFxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgc2VsZi5fc3VyZmFjZS5zZXRDbGVhckNvbG9yKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gT24gY2hhbmdlIHdlIGxvYWRpbmcgZmlsZS5cbiAgICB0aGlzLl9maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgdmFyIGZpbGUgPSBlLnRhcmdldC5maWxlc1swXTtcbiAgICAgICAgdmFyIGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgZGF0YUltYWdlID0gZXZlbnQuY3VycmVudFRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IGRhdGFJbWFnZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gYWRkaW5nIHVwbG9hZGVkIGltYWdlIHRvIHRoZSBzdXJmYWNlXG4gICAgICAgICAgICBzZWxmLl9zdXJmYWNlLnB1c2hJbWFnZShpbWFnZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgIH0pO1xufTtcbiIsIi8qKlxuICogUGFydCBvZiB0aGUgZG9jdW1lbnQgZm9yIG1hbmlwdWxhdGlvbiB3aXRoIHByb3BlcnRpZXMgXG4gKiBvZiB0aGUgc2VsZWN0ZWQgVUlFbGVtZW50IG9uIENhbnZhc1N1cmZhY2VcbiAqXG4gKiBBd2FyZSBvZiB0aGUgZG9jdW1lbnQgY29udGVudFxuICogSGFuZGxlcyBIVE1MIG1hbmlwdWxhdGlvbnNcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUHJvcGVydGllc1BhbmVsKHN1cmZhY2UpXG57XG4gICAgdGhpcy5fdGV4dFBhbmVsID0ge1xuICAgICAgICBwYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRPcHRpb25zJyksXG4gICAgICAgIHNlbGVjdEZvbnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb250U2VsZWN0JyksXG4gICAgICAgIHNlbGVjdENvbG9yOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29sb3JGb250U2VsZWN0JyksXG4gICAgICAgIHRleHRBcmVhOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0ZWRUZXh0Q29udGVudCcpLFxuICAgICAgICB0ZXh0VXBCdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0VXBCdG4nKSxcbiAgICAgICAgdGV4dERvd25CdXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0RG93bkJ0bicpXG4gICAgfTtcbiAgICBcbiAgICB0aGlzLl9jb21tb25QYW5lbCA9IHtcbiAgICAgICAgcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tb25PcHRpb25zJyksXG4gICAgICAgIHJlbW92ZUJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlbW92ZUJ0bicpLFxuICAgICAgICB1cEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VwQnRuJyksXG4gICAgICAgIGRvd25CdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkb3duQnRuJylcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuX2ltYWdlUGFuZWwgPSB7XG4gICAgICAgIHBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1hZ2VPcHRpb25zJylcbiAgICB9O1xuICAgIHRoaXMuX2VtcHR5UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbm9TZWxlY3RlZE9wdGlvbnMnKTtcbiAgICBcbiAgICB0aGlzLl9zZWxlY3RlZEVsZW1lbnQgPSBudWxsO1xuICAgIHRoaXMuX3N1cmZhY2UgPSBzdXJmYWNlO1xufVxuXG4vKipcbiAqIEJpbmRzIGhhbmRsZXJzIHRvIHRoZSBldmVudHNcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5iaW5kSGFuZGxlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLy8gU2VsZWN0aW9uIGV2ZW50cyBmcm9tIGNhbnZhcyBzdXJmYWNlXG4gICAgdGhpcy5fc3VyZmFjZS5hZGRTZWxlY3RFdmVudEhhbmRsZXIoZnVuY3Rpb24gKHVpRWxlbWVudCkge1xuICAgICAgICBzZWxmLnNldFNlbGVjdGVkKHVpRWxlbWVudCk7XG4gICAgfSk7XG4gICAgdGhpcy5fc3VyZmFjZS5hZGREZXNlbGVjdEV2ZW50SGFuZGxlcihmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuc2V0U2VsZWN0ZWQobnVsbCk7XG4gICAgfSk7XG5cbiAgICAvLyBCdXR0b24gY2xpY2sgZm9yIGNvbW1vbiBvcHRpb25zIC0gcmVtb3ZlIGN1cnJlbnRseSBzZWxlY3RlZCBlbGVtZW50XG4gICAgdGhpcy5fY29tbW9uUGFuZWwucmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVtb3ZlU2VsZWN0ZWQoKTtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIE1vdmUgZm9yZWdyb3VuZFxuICAgIHRoaXMuX2NvbW1vblBhbmVsLnVwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNlbGYuX3N1cmZhY2Uuc2VsZWN0ZWRUb0ZvcmVncm91bmQoKTtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIE1vdmUgYmFja2dyb3VuZFxuICAgIHRoaXMuX2NvbW1vblBhbmVsLmRvd25CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5zZWxlY3RlZFRvQmFja2dyb3VuZCgpO1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gQmluZGluZyB0ZXh0IGNoYW5nZSBldmVudCB0aHJvdWdoIHRleHQgYXJlYSBlbGVtZW50XG4gICAgdGhpcy5fdGV4dFBhbmVsLnRleHRBcmVhLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBldmVudCBoYXBwZW5lZFxuICAgICAgICAvLyB0aGVuIHdlIGhhdmUgYSBsYWJlbCBhcyBzZWxlY3RlZCBlbGVtZW50XG4gICAgICAgIHNlbGYuX3NlbGVjdGVkRWxlbWVudC5zZXRUZXh0KHRoaXMudmFsdWUpO1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlcyBzZWxlY3RlZCBmb250XG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdEZvbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9zZWxlY3RlZEVsZW1lbnQuc2V0Rm9udCh0aGlzLnZhbHVlKTtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIFVwZGF0ZXMgc2VsZWN0ZWQgY29sb3JcbiAgICB0aGlzLl90ZXh0UGFuZWwuc2VsZWN0Q29sb3IuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9zZWxlY3RlZEVsZW1lbnQuc2V0Q29sb3IodGhpcy52YWx1ZSk7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFNldHMgc2VsZWN0ZWQgZWxlbWVudC5cbiAqIFNob3cgcHJvcGVydGllcyB3aW5kb3cgZGVwZW5kaW5nIG9uIHdoYXQgaXMgdGhlIHR5cGUgb2YgYW4gZWxlbWVudCBcbiAqIFxuICogQHBhcmFtIHtVSUVsZW1lbnR8bnVsbH0gdWlFbGVtZW50XG4gKi9cblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2V0U2VsZWN0ZWQgPSBmdW5jdGlvbiAodWlFbGVtZW50KSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRFbGVtZW50ID0gdWlFbGVtZW50O1xuICAgIFxuICAgIGlmICh1aUVsZW1lbnQgaW5zdGFuY2VvZiBVSUxhYmVsRWxlbWVudCkge1xuICAgICAgICB0aGlzLnNob3dUZXh0UHJvcGVydGllcygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGlmICh1aUVsZW1lbnQgaW5zdGFuY2VvZiBVSUltYWdlRWxlbWVudCkge1xuICAgICAgICB0aGlzLnNob3dJbWFnZVByb3BlcnRpZXMoKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIFxuICAgIHRoaXMuc2hvd05vdGhpbmdTZWxlY3RlZFBhbmVsKCk7XG59O1xuXG4vKipcbiAqIEhpZGVzIGFsbCBvZiB0aGUgcGFuZWxzXG4gKi9cblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuaGlkZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLl90ZXh0UGFuZWwucGFuZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy5faW1hZ2VQYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB0aGlzLl9jb21tb25QYW5lbC5wYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbiAgICB0aGlzLl9lbXB0eVBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xufTtcblxuLyoqXG4gKiBIaWRlcyBhbGwgZXhjZXB0IHRleHQgcHJvcGVydGllcyBwYW5lbFxuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLnNob3dUZXh0UHJvcGVydGllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmhpZGVBbGwoKTtcbiAgICB0aGlzLl90ZXh0UGFuZWwudGV4dEFyZWEuaW5uZXJIVE1MID0gdGhpcy5fc2VsZWN0ZWRFbGVtZW50LmdldFRleHQoKTtcbiAgICB0aGlzLl90ZXh0UGFuZWwuc2VsZWN0Rm9udC52YWx1ZSA9IHRoaXMuX3NlbGVjdGVkRWxlbWVudC5nZXRGb250KCk7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdENvbG9yLnZhbHVlID0gdGhpcy5fc2VsZWN0ZWRFbGVtZW50LmdldENvbG9yKCk7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIHRoaXMuX2NvbW1vblBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufTtcblxuLyoqXG4gKiBIaWRlcyBldmVyeXRoaW5nIGV4Y2VwdCBpbWFnZXMgcGFuZWxcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zaG93SW1hZ2VQcm9wZXJ0aWVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGlkZUFsbCgpO1xuICAgIHRoaXMuX2ltYWdlUGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG4gICAgdGhpcy5fY29tbW9uUGFuZWwucGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59O1xuXG4vKipcbiAqIEhpZGVzIGFsbCBleGNlcHQgXCJub3RoaW5nIHNlbGVjdGVkXCIgcGFuZWxcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zaG93Tm90aGluZ1NlbGVjdGVkUGFuZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaWRlQWxsKCk7XG4gICAgdGhpcy5fZW1wdHlQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKTtcbiAgICB2YXIgc3VyZmFjZSA9IG5ldyBDYW52YXNTdXJmYWNlKGNhbnZhcyk7XG4gICAgc3VyZmFjZS5yZW5kZXIoKTtcblxuICAgIC8vIFBhbmVsIGZvciBjcmVhdGluZyBuZXcgZWxlbWVudHMgb25cbiAgICB2YXIgY29tcG9uZW50UGFuZWwgPSBuZXcgQ29tcG9uZW50c1BhbmVsKHN1cmZhY2UpO1xuICAgIGNvbXBvbmVudFBhbmVsLmJpbmRIYW5kbGVycygpO1xuXG4gICAgLy8gQ3JlYXRlIHByb3BlcnRpZXMgcGFuZWxcbiAgICAvLyBhbmQgYXR0YWNoaW5nIGl0IHRvIGNhbnZhcyBldmVudHNcbiAgICB2YXIgcHJvcGVydGllc1BhbmVsID0gbmV3IFByb3BlcnRpZXNQYW5lbChzdXJmYWNlKTtcbiAgICBwcm9wZXJ0aWVzUGFuZWwuYmluZEhhbmRsZXJzKCk7XG5cbiAgICAvLyBJbml0aWFsaXppbmcgbW9kZWwgdmlld2VyXG4gICAgd2luZG93Lm1vZGVsVmlldyA9IG51bGw7XG4gICAgdmFyIGN1cFN1cmZhY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VwU3VyZmFjZScpO1xuICAgIHZhciBsb2FkZXIgPSBuZXcgUmVzb3VyY2VMb2FkZXIoKTtcblxuICAgIHZhciByZXNvdXJjZVByZXBhcmVyID0gbmV3IFJlc291cmNlUHJlcGFyZXIobG9hZGVyLCBbXG4gICAgICAgIHtrZXk6ICdtb2RlbCcsIHNyYzogJy9tb2RlbHMvY3VwTW9kZWwuanNvbicsIHR5cGU6ICdqc29uJ30sXG4gICAgICAgIHtrZXk6ICd2ZXJ0ZXhTaGFkZXInLCBzcmM6ICcvc2hhZGVycy9mcmFnbWVudC5nbHNsJywgdHlwZTogJ3RleHQnfSxcbiAgICAgICAge2tleTogJ2ZyYWdtZW50U2hhZGVyJywgc3JjOiAnL3NoYWRlcnMvdmVydGV4Lmdsc2wnLCB0eXBlOiAndGV4dCd9LFxuICAgICAgICB7a2V5OiAnaW5pdGlhbFRleHR1cmUnLCBzcmM6ICcvaW1nL2xvZ29HcmV5LmpwZycsIHR5cGU6ICdpbWFnZSd9XG4gICAgXSwgZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIG1vZGVsVmlldyA9IG5ldyBNb2RlbFZpZXcoXG4gICAgICAgICAgICBjdXBTdXJmYWNlLFxuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ21vZGVsJyksXG4gICAgICAgICAgICBTdG9yYWdlLmdldCgnaW5pdGlhbFRleHR1cmUnKSxcbiAgICAgICAgICAgIFN0b3JhZ2UuZ2V0KCdmcmFnbWVudFNoYWRlcicpLFxuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ3ZlcnRleFNoYWRlcicpXG4gICAgICAgICk7XG4gICAgICAgIG1vZGVsVmlldy5zdGFydFJlbmRlcigpO1xuICAgIH0pO1xuXG4gICAgcmVzb3VyY2VQcmVwYXJlci5zdGFydExvYWRpbmcoKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
