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
    this.position = this.getNewPosition();
};

/**
 * Sets camera distance
 *
 * @param {Number} distance
 */
Camera.prototype.setDistance = function (distance) {
    this.distance = distance;
    this.position = this.getNewPosition();
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
function ModelView(canvas, glContext, initialTexture, vertexShader, fragmentShader)
{
    this.canvas = canvas;
    this.gl = glContext;

    this.texture = initialTexture;
    this.clearColor = { r: 0.9, g: 0.9, b: 0.9, a: 1.0 };
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
    gl.clearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b , this.clearColor.a);
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
ModelView.prototype.setTexture = function (image)
{

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
ModelView.prototype.setModel = function (model)
{

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

ModelView.prototype.startRender = function ()
{
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
    this.drawScene();

    // Главный цикр рендера
    // this.animationRequest = requestAnimationFrame(this.loop.bind(this));
};


/**
 * Updates render viewport
 */
ModelView.prototype.updateViewport = function ()
{
    this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
};

/**
 * Render loop
 */
ModelView.prototype.loop = function ()
{
    this.drawScene();
    requestAnimationFrame(this.loop.bind(this));
};

/**
 * Draws scene.
 * Method where all of the 3D magic happens
 */
ModelView.prototype.drawScene = function () {
    var gl = this.gl;
    // Обновляем переменную в шейдере
    gl.uniformMatrix4fv(this.matViewUniformLocation, gl.FALSE, this.camera.matrix);

    // Назначение текстуры
    gl.bindTexture(gl.TEXTURE_2D, this.modelTexture);

    // Активный слот текстуры
    gl.activeTexture(gl.TEXTURE0);

    // Цвет очистки
    gl.clearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b, this.clearColor.a);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT );

    gl.drawElements(
        gl.TRIANGLES, // Как рисуем,
        this.model.modelIndexes.length,
        gl.UNSIGNED_SHORT, // Тип
        0 // Сколько пропускам вершин
    );
};

/**
 * Binds canvas event handlers
 */
ModelView.prototype.bindCanvasHandlers = function () {
    var self = this;
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
            // Don't want to scroll
            e.preventDefault();
            e = e.touches[0];
        }

        if (isMousePressed) {
            var diffX = initialEvent.clientX - e.clientX;
            var diffY = initialEvent.clientY - e.clientY;
            initialEvent = e;

            camera.move(diffX, diffY);
            self.drawScene();
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
 * Rendering the cup into the image
 *
 * @return {Image}
 */
ModelView.prototype.makePreviewImage = function ()
{
    cancelAnimationFrame(this.animationRequest);

    var oldColor = this.clearColor;
    this.clearColor = {r: 0.0, g: 0.0, b: 0.0, a: 0.0 };

    var oldCoordinates = {
        angleFi: this.camera.angleFi,
        angleTheta: this.camera.angleTheta,
        distance: this.camera.distance
    };

    this.camera.setAngle(-98, 77);
    this.camera.setDistance(20);
    this.camera.updateMatrix();

    this.drawScene();
    this.clearColor = oldColor;

    var img = new Image();
    img.src = this.canvas.toDataURL();

    this.camera.setAngle(oldCoordinates.angleFi, oldCoordinates.angleTheta);
    this.camera.setDistance(oldCoordinates.distance);
    this.camera.updateMatrix();

    this.drawScene();
    // this.animationRequest = requestAnimationFrame(this.loop.bind(this));

    return img;
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
        self._modelView.drawScene();
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
        self._modelView.drawScene();
    });
    this._btnZoomOut.addEventListener('click', function () {
        self._modelView.camera.zoomOut();
        self._modelView.drawScene();
    });

    // Changing model type
    this._cupTypeSelect.addEventListener('change', function () {
        var selected = this.value;
        self._modelView.setModel(self._models[selected]);
        self._modelView.drawScene();
    });
};
/**
 *
 * @param {ModelView} modelView
 * @constructor
 */
function PreviewPanel(modelView)
{
    this.modelView = modelView;

    this.panel = document.getElementById('previewPanel');

    /**
     * @type {HTMLCanvasElement}
     */
    this.canvas = document.getElementById('previewCanvas');

    this._btnToggle = document.getElementById('btnTogglePreview');
    this.isShown = false;
}

PreviewPanel.prototype.bindHandlers = function () {
    var self = this;

    this._btnToggle.addEventListener('click', function () {

        if (self.isShown) {
            self.panel.classList.remove('active');
        }
        else {
            self.panel.classList.add('active');
            self.requestImage();
        }
        self.isShown = !self.isShown;
    });
};

/**
 * Requests image from model view and updates it on canvas
 */
PreviewPanel.prototype.requestImage = function ()
{
    var image = this.modelView.makePreviewImage();
    var ctx = this.canvas.getContext('2d');

    ctx.fillStyle = "#FFF";

    var imageMan = Storage.get('previewMan');

    var rotateAngle = 0.09;
    var drawOffset = { x: this.canvas.height / -16, y: this.canvas.height / 10 };

    // clear
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // man should be on center
    var widthOffset = (this.canvas.width - this.canvas.height) / 2;

    // Draw man image
    ctx.drawImage(imageMan, widthOffset, 0, this.canvas.height, this.canvas.height);

    // Draw cup image
    ctx.rotate(rotateAngle);
    ctx.drawImage(image, drawOffset.x, drawOffset.y, image.width, image.height);
    ctx.rotate(-rotateAngle);

    // Draw man front image
    var imageManFront = Storage.get('previewManFront');
    ctx.drawImage(imageManFront, widthOffset, 0, this.canvas.height, this.canvas.height);

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
    var modelView = null;

    /**
     * @type {PreviewPanel}
     */
    var previewPanel = null;

    var resourcePreparer = new ResourcePreparer(loader, [
        {key: 'modelCup1', src: '/shirtshopdemo/models/cup1.json', type: 'json'},
        {key: 'modelCup2', src: '/shirtshopdemo/models/cup2.json', type: 'json'},
        {key: 'vertexShader', src: '/shirtshopdemo/shaders/fragment.glsl', type: 'text'},
        {key: 'fragmentShader', src: '/shirtshopdemo/shaders/vertex.glsl', type: 'text'},
        {key: 'initialTexture', src: '/shirtshopdemo/img/logoGrey.jpg', type: 'image'},
        {key: 'previewMan', src: '/shirtshopdemo/img/previewMan.jpg', type: 'image'},
        {key: 'previewManFront', src: '/shirtshopdemo/img/previewManFront.png', type: 'image'}
    ], function () {

        // TODO: extract all checks
        var options = {
            preserveDrawingBuffer: true
        };
        var glContext = cupCanvas.getContext('webgl', options);

        if (!glContext) {
            glContext = cupCanvas.getContext('experimental-webgl', options);
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

        // Panel for preview
        previewPanel = new PreviewPanel(modelView);
        previewPanel.bindHandlers();
    });

    var drawingContainer = document.getElementById('drawingContainer');
    var modelViewContainer = document.getElementById('cupCanvasContainer');
    var panelPreviewCanvas = document.getElementById('previewCanvas');

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
        var newHeightModelView = newWidthModelView / modelViewRatio;
        cupCanvas.width = newWidthModelView;
        cupCanvas.height = newHeightModelView;

        panelPreviewCanvas.width = newWidthModelView;
        panelPreviewCanvas.height = newHeightModelView;

        if (modelView) {
            modelView.updateViewport();
        }

        if (previewPanel) {
            previewPanel.requestImage();
        }
    };

    fitCanvasSize();

    window.addEventListener('resize', fitCanvasSize);

    resourcePreparer.startLoading();
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsLW1hdHJpeC5qcyIsIkNhbnZhc1N1cmZhY2UuanMiLCJDYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLmpzIiwiQ2FudmFzVUlFbGVtZW50Vmlldy5qcyIsIkNhbnZhc1VJRmFjdG9yeS5qcyIsIkNhbnZhc1VJSW1hZ2VWaWV3LmpzIiwiQ2FudmFzVUlMYWJlbFZpZXcuanMiLCJDYW52YXNVSVNlbGVjdGVkVmlldy5qcyIsIlBvc2l0aW9uLmpzIiwiUmVzb3VyY2VMb2FkZXIuanMiLCJSZXNvdXJjZVByZXBhcmVyLmpzIiwiU2l6ZS5qcyIsIlN0b3JhZ2UuanMiLCJVSUNvbGxlY3Rpb24uanMiLCJVSUVsZW1lbnQuanMiLCJVSUVsZW1lbnRWaWV3LmpzIiwiVUlJbWFnZUVsZW1lbnQuanMiLCJVSUxhYmVsRWxlbWVudC5qcyIsIkNhbWVyYS5qcyIsIk1vZGVsLmpzIiwiTW9kZWxWaWV3LmpzIiwiU2hhZGVyQ29tcGlsZXIuanMiLCJDYW52YXNSZXNpemVFdmVudExpc3RlbmVyLmpzIiwiQ29tcG9uZW50c1BhbmVsLmpzIiwiTW9kZWxWaWV3UGFuZWwuanMiLCJQcmV2aWV3UGFuZWwuanMiLCJQcm9wZXJ0aWVzUGFuZWwuanMiLCJpbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDck5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN1NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgZ2wtbWF0cml4IC0gSGlnaCBwZXJmb3JtYW5jZSBtYXRyaXggYW5kIHZlY3RvciBvcGVyYXRpb25zXG4gKiBAYXV0aG9yIEJyYW5kb24gSm9uZXNcbiAqIEBhdXRob3IgQ29saW4gTWFjS2VuemllIElWXG4gKiBAdmVyc2lvbiAyLjMuMlxuICovXG5cbi8qIENvcHlyaWdodCAoYykgMjAxNSwgQnJhbmRvbiBKb25lcywgQ29saW4gTWFjS2VuemllIElWLlxuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cbiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiBUSEUgU09GVFdBUkUuICovXG5cbiFmdW5jdGlvbih0LGEpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlKW1vZHVsZS5leHBvcnRzPWEoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW10sYSk7ZWxzZXt2YXIgbj1hKCk7Zm9yKHZhciByIGluIG4pKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP2V4cG9ydHM6dClbcl09bltyXX19KHRoaXMsZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24odCl7ZnVuY3Rpb24gYShyKXtpZihuW3JdKXJldHVybiBuW3JdLmV4cG9ydHM7dmFyIG89bltyXT17ZXhwb3J0czp7fSxpZDpyLGxvYWRlZDohMX07cmV0dXJuIHRbcl0uY2FsbChvLmV4cG9ydHMsbyxvLmV4cG9ydHMsYSksby5sb2FkZWQ9ITAsby5leHBvcnRzfXZhciBuPXt9O3JldHVybiBhLm09dCxhLmM9bixhLnA9XCJcIixhKDApfShbZnVuY3Rpb24odCxhLG4pe2EuZ2xNYXRyaXg9bigxKSxhLm1hdDI9bigyKSxhLm1hdDJkPW4oMyksYS5tYXQzPW4oNCksYS5tYXQ0PW4oNSksYS5xdWF0PW4oNiksYS52ZWMyPW4oOSksYS52ZWMzPW4oNyksYS52ZWM0PW4oOCl9LGZ1bmN0aW9uKHQsYSl7dmFyIG49e307bi5FUFNJTE9OPTFlLTYsbi5BUlJBWV9UWVBFPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBGbG9hdDMyQXJyYXk/RmxvYXQzMkFycmF5OkFycmF5LG4uUkFORE9NPU1hdGgucmFuZG9tLG4uRU5BQkxFX1NJTUQ9ITEsbi5TSU1EX0FWQUlMQUJMRT1uLkFSUkFZX1RZUEU9PT1GbG9hdDMyQXJyYXkmJlwiU0lNRFwiaW4gdGhpcyxuLlVTRV9TSU1EPW4uRU5BQkxFX1NJTUQmJm4uU0lNRF9BVkFJTEFCTEUsbi5zZXRNYXRyaXhBcnJheVR5cGU9ZnVuY3Rpb24odCl7bi5BUlJBWV9UWVBFPXR9O3ZhciByPU1hdGguUEkvMTgwO24udG9SYWRpYW49ZnVuY3Rpb24odCl7cmV0dXJuIHQqcn0sbi5lcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gTWF0aC5hYnModC1hKTw9bi5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnModCksTWF0aC5hYnMoYSkpfSx0LmV4cG9ydHM9bn0sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGFbM109dFszXSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhLG4sbyl7dmFyIHU9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdVswXT10LHVbMV09YSx1WzJdPW4sdVszXT1vLHV9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIsbyl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0fSxvLnRyYW5zcG9zZT1mdW5jdGlvbih0LGEpe2lmKHQ9PT1hKXt2YXIgbj1hWzFdO3RbMV09YVsyXSx0WzJdPW59ZWxzZSB0WzBdPWFbMF0sdFsxXT1hWzJdLHRbMl09YVsxXSx0WzNdPWFbM107cmV0dXJuIHR9LG8uaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4qdS1vKnI7cmV0dXJuIGw/KGw9MS9sLHRbMF09dSpsLHRbMV09LXIqbCx0WzJdPS1vKmwsdFszXT1uKmwsdCk6bnVsbH0sby5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXTtyZXR1cm4gdFswXT1hWzNdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0WzNdPW4sdH0sby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXtyZXR1cm4gdFswXSp0WzNdLXRbMl0qdFsxXX0sby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPW5bMF0sTT1uWzFdLHM9blsyXSxpPW5bM107cmV0dXJuIHRbMF09ciplK3UqTSx0WzFdPW8qZStsKk0sdFsyXT1yKnMrdSppLHRbM109bypzK2wqaSx0fSxvLm11bD1vLm11bHRpcGx5LG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0rdSplLHRbMV09bypNK2wqZSx0WzJdPXIqLWUrdSpNLHRbM109byotZStsKk0sdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPW5bMF0sTT1uWzFdO3JldHVybiB0WzBdPXIqZSx0WzFdPW8qZSx0WzJdPXUqTSx0WzNdPWwqTSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0tbix0WzNdPXIsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPWFbMV0sdH0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQyKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikpfSxvLkxEVT1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFsyXT1yWzJdL3JbMF0sblswXT1yWzBdLG5bMV09clsxXSxuWzNdPXJbM10tdFsyXSpuWzFdLFt0LGEsbl19LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9YVswXSxNPWFbMV0scz1hWzJdLGk9YVszXTtyZXR1cm4gTWF0aC5hYnMobi1lKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMoZSkpJiZNYXRoLmFicyhvLU0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhNKSkmJk1hdGguYWJzKHUtcyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKHMpKSYmTWF0aC5hYnMobC1pKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoaSkpfSxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0fSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz17fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNik7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0WzRdPTAsdFs1XT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg2KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGFbNF09dFs0XSxhWzVdPXRbNV0sYX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzRdPWFbNF0sdFs1XT1hWzVdLHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0WzRdPTAsdFs1XT0wLHR9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvLHUsbCl7dmFyIGU9bmV3IHIuQVJSQVlfVFlQRSg2KTtyZXR1cm4gZVswXT10LGVbMV09YSxlWzJdPW4sZVszXT1vLGVbNF09dSxlWzVdPWwsZX0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvLHUsbCl7cmV0dXJuIHRbMF09YSx0WzFdPW4sdFsyXT1yLHRbM109byx0WzRdPXUsdFs1XT1sLHR9LG8uaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09bip1LXIqbztyZXR1cm4gTT8oTT0xL00sdFswXT11Kk0sdFsxXT0tcipNLHRbMl09LW8qTSx0WzNdPW4qTSx0WzRdPShvKmUtdSpsKSpNLHRbNV09KHIqbC1uKmUpKk0sdCk6bnVsbH0sby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXtyZXR1cm4gdFswXSp0WzNdLXRbMV0qdFsyXX0sby5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9blswXSxpPW5bMV0sYz1uWzJdLGg9blszXSxTPW5bNF0sST1uWzVdO3JldHVybiB0WzBdPXIqcyt1KmksdFsxXT1vKnMrbCppLHRbMl09cipjK3UqaCx0WzNdPW8qYytsKmgsdFs0XT1yKlMrdSpJK2UsdFs1XT1vKlMrbCpJK00sdH0sby5tdWw9by5tdWx0aXBseSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9TWF0aC5zaW4obiksaT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKmkrdSpzLHRbMV09byppK2wqcyx0WzJdPXIqLXMrdSppLHRbM109byotcytsKmksdFs0XT1lLHRbNV09TSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1uWzBdLGk9blsxXTtyZXR1cm4gdFswXT1yKnMsdFsxXT1vKnMsdFsyXT11KmksdFszXT1sKmksdFs0XT1lLHRbNV09TSx0fSxvLnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9blswXSxpPW5bMV07cmV0dXJuIHRbMF09cix0WzFdPW8sdFsyXT11LHRbM109bCx0WzRdPXIqcyt1KmkrZSx0WzVdPW8qcytsKmkrTSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09cix0WzFdPW4sdFsyXT0tbix0WzNdPXIsdFs0XT0wLHRbNV09MCx0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109YVsxXSx0WzRdPTAsdFs1XT0wLHR9LG8uZnJvbVRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MSx0WzRdPWFbMF0sdFs1XT1hWzFdLHR9LG8uc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwibWF0MmQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIiwgXCIrdFs0XStcIiwgXCIrdFs1XStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKStNYXRoLnBvdyh0WzRdLDIpK01hdGgucG93KHRbNV0sMikrMSl9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdFs0XT1hWzRdK25bNF0sdFs1XT1hWzVdK25bNV0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHRbNF09YVs0XS1uWzRdLHRbNV09YVs1XS1uWzVdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHRbNF09YVs0XSpuLHRbNV09YVs1XSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdFs0XT1hWzRdK25bNF0qcix0WzVdPWFbNV0rbls1XSpyLHR9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM10mJnRbNF09PT1hWzRdJiZ0WzVdPT09YVs1XX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9dFs0XSxNPXRbNV0scz1hWzBdLGk9YVsxXSxjPWFbMl0saD1hWzNdLFM9YVs0XSxJPWFbNV07cmV0dXJuIE1hdGguYWJzKG4tcyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKHMpKSYmTWF0aC5hYnMoby1pKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoaSkpJiZNYXRoLmFicyh1LWMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhjKSkmJk1hdGguYWJzKGwtaCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGgpKSYmTWF0aC5hYnMoZS1TKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZSksTWF0aC5hYnMoUykpJiZNYXRoLmFicyhNLUkpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhNKSxNYXRoLmFicyhJKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg5KTtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MSx0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby5mcm9tTWF0ND1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbNF0sdFs0XT1hWzVdLHRbNV09YVs2XSx0WzZdPWFbOF0sdFs3XT1hWzldLHRbOF09YVsxMF0sdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDkpO3JldHVybiBhWzBdPXRbMF0sYVsxXT10WzFdLGFbMl09dFsyXSxhWzNdPXRbM10sYVs0XT10WzRdLGFbNV09dFs1XSxhWzZdPXRbNl0sYVs3XT10WzddLGFbOF09dFs4XSxhfSxvLmNvcHk9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8sdSxsLGUsTSxzKXt2YXIgaT1uZXcgci5BUlJBWV9UWVBFKDkpO3JldHVybiBpWzBdPXQsaVsxXT1hLGlbMl09bixpWzNdPW8saVs0XT11LGlbNV09bCxpWzZdPWUsaVs3XT1NLGlbOF09cyxpfSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8sdSxsLGUsTSxzKXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHRbNF09dSx0WzVdPWwsdFs2XT1lLHRbN109TSx0WzhdPXMsdH0sby5pZGVudGl0eT1mdW5jdGlvbih0KXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MSx0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXtpZih0PT09YSl7dmFyIG49YVsxXSxyPWFbMl0sbz1hWzVdO3RbMV09YVszXSx0WzJdPWFbNl0sdFszXT1uLHRbNV09YVs3XSx0WzZdPXIsdFs3XT1vfWVsc2UgdFswXT1hWzBdLHRbMV09YVszXSx0WzJdPWFbNl0sdFszXT1hWzFdLHRbNF09YVs0XSx0WzVdPWFbN10sdFs2XT1hWzJdLHRbN109YVs1XSx0WzhdPWFbOF07cmV0dXJuIHR9LG8uaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9aSpsLWUqcyxoPS1pKnUrZSpNLFM9cyp1LWwqTSxJPW4qYytyKmgrbypTO3JldHVybiBJPyhJPTEvSSx0WzBdPWMqSSx0WzFdPSgtaSpyK28qcykqSSx0WzJdPShlKnItbypsKSpJLHRbM109aCpJLHRbNF09KGkqbi1vKk0pKkksdFs1XT0oLWUqbitvKnUpKkksdFs2XT1TKkksdFs3XT0oLXMqbityKk0pKkksdFs4XT0obCpuLXIqdSkqSSx0KTpudWxsfSxvLmFkam9pbnQ9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9YVs0XSxlPWFbNV0sTT1hWzZdLHM9YVs3XSxpPWFbOF07cmV0dXJuIHRbMF09bCppLWUqcyx0WzFdPW8qcy1yKmksdFsyXT1yKmUtbypsLHRbM109ZSpNLXUqaSx0WzRdPW4qaS1vKk0sdFs1XT1vKnUtbiplLHRbNl09dSpzLWwqTSx0WzddPXIqTS1uKnMsdFs4XT1uKmwtcip1LHR9LG8uZGV0ZXJtaW5hbnQ9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXSx1PXRbNF0sbD10WzVdLGU9dFs2XSxNPXRbN10scz10WzhdO3JldHVybiBhKihzKnUtbCpNKStuKigtcypvK2wqZSkrciooTSpvLXUqZSl9LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPW5bMF0sUz1uWzFdLEk9blsyXSxmPW5bM10seD1uWzRdLEQ9bls1XSxGPW5bNl0sbT1uWzddLGQ9bls4XTtyZXR1cm4gdFswXT1oKnIrUypsK0kqcyx0WzFdPWgqbytTKmUrSSppLHRbMl09aCp1K1MqTStJKmMsdFszXT1mKnIreCpsK0Qqcyx0WzRdPWYqbyt4KmUrRCppLHRbNV09Zip1K3gqTStEKmMsdFs2XT1GKnIrbSpsK2Qqcyx0WzddPUYqbyttKmUrZCppLHRbOF09Rip1K20qTStkKmMsdH0sby5tdWw9by5tdWx0aXBseSxvLnRyYW5zbGF0ZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPWFbNF0sTT1hWzVdLHM9YVs2XSxpPWFbN10sYz1hWzhdLGg9blswXSxTPW5bMV07cmV0dXJuIHRbMF09cix0WzFdPW8sdFsyXT11LHRbM109bCx0WzRdPWUsdFs1XT1NLHRbNl09aCpyK1MqbCtzLHRbN109aCpvK1MqZStpLHRbOF09aCp1K1MqTStjLHR9LG8ucm90YXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1NYXRoLnNpbihuKSxTPU1hdGguY29zKG4pO3JldHVybiB0WzBdPVMqcitoKmwsdFsxXT1TKm8raCplLHRbMl09Uyp1K2gqTSx0WzNdPVMqbC1oKnIsdFs0XT1TKmUtaCpvLHRbNV09UypNLWgqdSx0WzZdPXMsdFs3XT1pLHRbOF09Yyx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uWzBdLG89blsxXTtyZXR1cm4gdFswXT1yKmFbMF0sdFsxXT1yKmFbMV0sdFsyXT1yKmFbMl0sdFszXT1vKmFbM10sdFs0XT1vKmFbNF0sdFs1XT1vKmFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzhdPWFbOF0sdH0sby5mcm9tVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xLHRbMV09MCx0WzJdPTAsdFszXT0wLHRbNF09MSx0WzVdPTAsdFs2XT1hWzBdLHRbN109YVsxXSx0WzhdPTEsdH0sby5mcm9tUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09MCx0WzNdPS1uLHRbNF09cix0WzVdPTAsdFs2XT0wLHRbN109MCx0WzhdPTEsdH0sby5mcm9tU2NhbGluZz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT1hWzFdLHRbNV09MCx0WzZdPTAsdFs3XT0wLHRbOF09MSx0fSxvLmZyb21NYXQyZD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09MCx0WzNdPWFbMl0sdFs0XT1hWzNdLHRbNV09MCx0WzZdPWFbNF0sdFs3XT1hWzVdLHRbOF09MSx0fSxvLmZyb21RdWF0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4rbixlPXIrcixNPW8rbyxzPW4qbCxpPXIqbCxjPXIqZSxoPW8qbCxTPW8qZSxJPW8qTSxmPXUqbCx4PXUqZSxEPXUqTTtyZXR1cm4gdFswXT0xLWMtSSx0WzNdPWktRCx0WzZdPWgreCx0WzFdPWkrRCx0WzRdPTEtcy1JLHRbN109Uy1mLHRbMl09aC14LHRbNV09UytmLHRbOF09MS1zLWMsdH0sby5ub3JtYWxGcm9tTWF0ND1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXSx1PWFbM10sbD1hWzRdLGU9YVs1XSxNPWFbNl0scz1hWzddLGk9YVs4XSxjPWFbOV0saD1hWzEwXSxTPWFbMTFdLEk9YVsxMl0sZj1hWzEzXSx4PWFbMTRdLEQ9YVsxNV0sRj1uKmUtcipsLG09bipNLW8qbCxkPW4qcy11KmwsYj1yKk0tbyplLHY9cipzLXUqZSx6PW8qcy11Kk0scD1pKmYtYypJLHc9aSp4LWgqSSxFPWkqRC1TKkksQT1jKngtaCpmLFA9YypELVMqZixMPWgqRC1TKngscT1GKkwtbSpQK2QqQStiKkUtdip3K3oqcDtyZXR1cm4gcT8ocT0xL3EsdFswXT0oZSpMLU0qUCtzKkEpKnEsdFsxXT0oTSpFLWwqTC1zKncpKnEsdFsyXT0obCpQLWUqRStzKnApKnEsdFszXT0obypQLXIqTC11KkEpKnEsdFs0XT0obipMLW8qRSt1KncpKnEsdFs1XT0ocipFLW4qUC11KnApKnEsdFs2XT0oZip6LXgqditEKmIpKnEsdFs3XT0oeCpkLUkqei1EKm0pKnEsdFs4XT0oSSp2LWYqZCtEKkYpKnEsdCk6bnVsbH0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJtYXQzKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIsIFwiK3RbNF0rXCIsIFwiK3RbNV0rXCIsIFwiK3RbNl0rXCIsIFwiK3RbN10rXCIsIFwiK3RbOF0rXCIpXCJ9LG8uZnJvYj1mdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRbMF0sMikrTWF0aC5wb3codFsxXSwyKStNYXRoLnBvdyh0WzJdLDIpK01hdGgucG93KHRbM10sMikrTWF0aC5wb3codFs0XSwyKStNYXRoLnBvdyh0WzVdLDIpK01hdGgucG93KHRbNl0sMikrTWF0aC5wb3codFs3XSwyKStNYXRoLnBvdyh0WzhdLDIpKX0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0WzRdPWFbNF0rbls0XSx0WzVdPWFbNV0rbls1XSx0WzZdPWFbNl0rbls2XSx0WzddPWFbN10rbls3XSx0WzhdPWFbOF0rbls4XSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdFs0XT1hWzRdLW5bNF0sdFs1XT1hWzVdLW5bNV0sdFs2XT1hWzZdLW5bNl0sdFs3XT1hWzddLW5bN10sdFs4XT1hWzhdLW5bOF0sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5U2NhbGFyPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdFs0XT1hWzRdKm4sdFs1XT1hWzVdKm4sdFs2XT1hWzZdKm4sdFs3XT1hWzddKm4sdFs4XT1hWzhdKm4sdH0sby5tdWx0aXBseVNjYWxhckFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0WzRdPWFbNF0rbls0XSpyLHRbNV09YVs1XStuWzVdKnIsdFs2XT1hWzZdK25bNl0qcix0WzddPWFbN10rbls3XSpyLHRbOF09YVs4XStuWzhdKnIsdH0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXSYmdFs0XT09PWFbNF0mJnRbNV09PT1hWzVdJiZ0WzZdPT09YVs2XSYmdFs3XT09PWFbN10mJnRbOF09PT1hWzhdfSxvLmVxdWFscz1mdW5jdGlvbih0LGEpe3ZhciBuPXRbMF0sbz10WzFdLHU9dFsyXSxsPXRbM10sZT10WzRdLE09dFs1XSxzPXRbNl0saT10WzddLGM9dFs4XSxoPWFbMF0sUz1hWzFdLEk9YVsyXSxmPWFbM10seD1hWzRdLEQ9YVs1XSxGPXRbNl0sbT1hWzddLGQ9YVs4XTtyZXR1cm4gTWF0aC5hYnMobi1oKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMoaCkpJiZNYXRoLmFicyhvLVMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhTKSkmJk1hdGguYWJzKHUtSSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKEkpKSYmTWF0aC5hYnMobC1mKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnMoZikpJiZNYXRoLmFicyhlLXgpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhlKSxNYXRoLmFicyh4KSkmJk1hdGguYWJzKE0tRCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKE0pLE1hdGguYWJzKEQpKSYmTWF0aC5hYnMocy1GKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMocyksTWF0aC5hYnMoRikpJiZNYXRoLmFicyhpLW0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhpKSxNYXRoLmFicyhtKSkmJk1hdGguYWJzKGMtZCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGMpLE1hdGguYWJzKGQpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e3NjYWxhcjp7fSxTSU1EOnt9fTtvLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoMTYpO3JldHVybiB0WzBdPTEsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09MSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09MSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5jbG9uZT1mdW5jdGlvbih0KXt2YXIgYT1uZXcgci5BUlJBWV9UWVBFKDE2KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGFbNF09dFs0XSxhWzVdPXRbNV0sYVs2XT10WzZdLGFbN109dFs3XSxhWzhdPXRbOF0sYVs5XT10WzldLGFbMTBdPXRbMTBdLGFbMTFdPXRbMTFdLGFbMTJdPXRbMTJdLGFbMTNdPXRbMTNdLGFbMTRdPXRbMTRdLGFbMTVdPXRbMTVdLGF9LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0sdH0sby5mcm9tVmFsdWVzPWZ1bmN0aW9uKHQsYSxuLG8sdSxsLGUsTSxzLGksYyxoLFMsSSxmLHgpe3ZhciBEPW5ldyByLkFSUkFZX1RZUEUoMTYpO3JldHVybiBEWzBdPXQsRFsxXT1hLERbMl09bixEWzNdPW8sRFs0XT11LERbNV09bCxEWzZdPWUsRFs3XT1NLERbOF09cyxEWzldPWksRFsxMF09YyxEWzExXT1oLERbMTJdPVMsRFsxM109SSxEWzE0XT1mLERbMTVdPXgsRH0sby5zZXQ9ZnVuY3Rpb24odCxhLG4scixvLHUsbCxlLE0scyxpLGMsaCxTLEksZix4KXtyZXR1cm4gdFswXT1hLHRbMV09bix0WzJdPXIsdFszXT1vLHRbNF09dSx0WzVdPWwsdFs2XT1lLHRbN109TSx0WzhdPXMsdFs5XT1pLHRbMTBdPWMsdFsxMV09aCx0WzEyXT1TLHRbMTNdPUksdFsxNF09Zix0WzE1XT14LHR9LG8uaWRlbnRpdHk9ZnVuY3Rpb24odCl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLnNjYWxhci50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXtpZih0PT09YSl7dmFyIG49YVsxXSxyPWFbMl0sbz1hWzNdLHU9YVs2XSxsPWFbN10sZT1hWzExXTt0WzFdPWFbNF0sdFsyXT1hWzhdLHRbM109YVsxMl0sdFs0XT1uLHRbNl09YVs5XSx0WzddPWFbMTNdLHRbOF09cix0WzldPXUsdFsxMV09YVsxNF0sdFsxMl09byx0WzEzXT1sLHRbMTRdPWV9ZWxzZSB0WzBdPWFbMF0sdFsxXT1hWzRdLHRbMl09YVs4XSx0WzNdPWFbMTJdLHRbNF09YVsxXSx0WzVdPWFbNV0sdFs2XT1hWzldLHRbN109YVsxM10sdFs4XT1hWzJdLHRbOV09YVs2XSx0WzEwXT1hWzEwXSx0WzExXT1hWzE0XSx0WzEyXT1hWzNdLHRbMTNdPWFbN10sdFsxNF09YVsxMV0sdFsxNV09YVsxNV07cmV0dXJuIHR9LG8uU0lNRC50cmFuc3Bvc2U9ZnVuY3Rpb24odCxhKXt2YXIgbixyLG8sdSxsLGUsTSxzLGksYztyZXR1cm4gbj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCkscj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShuLHIsMCwxLDQsNSksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG8sdSwwLDEsNCw1KSxNPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDAsMiw0LDYpLHM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShsLGUsMSwzLDUsNyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLE0pLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxzKSxsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDIsMyw2LDcpLGU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMiwzLDYsNyksaT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsZSwwLDIsNCw2KSxjPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCxlLDEsMyw1LDcpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLGMpLHR9LG8udHJhbnNwb3NlPXIuVVNFX1NJTUQ/by5TSU1ELnRyYW5zcG9zZTpvLnNjYWxhci50cmFuc3Bvc2Usby5zY2FsYXIuaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9YVs5XSxoPWFbMTBdLFM9YVsxMV0sST1hWzEyXSxmPWFbMTNdLHg9YVsxNF0sRD1hWzE1XSxGPW4qZS1yKmwsbT1uKk0tbypsLGQ9bipzLXUqbCxiPXIqTS1vKmUsdj1yKnMtdSplLHo9bypzLXUqTSxwPWkqZi1jKkksdz1pKngtaCpJLEU9aSpELVMqSSxBPWMqeC1oKmYsUD1jKkQtUypmLEw9aCpELVMqeCxxPUYqTC1tKlArZCpBK2IqRS12KncreipwO3JldHVybiBxPyhxPTEvcSx0WzBdPShlKkwtTSpQK3MqQSkqcSx0WzFdPShvKlAtcipMLXUqQSkqcSx0WzJdPShmKnoteCp2K0QqYikqcSx0WzNdPShoKnYtYyp6LVMqYikqcSx0WzRdPShNKkUtbCpMLXMqdykqcSx0WzVdPShuKkwtbypFK3UqdykqcSx0WzZdPSh4KmQtSSp6LUQqbSkqcSx0WzddPShpKnotaCpkK1MqbSkqcSx0WzhdPShsKlAtZSpFK3MqcCkqcSx0WzldPShyKkUtbipQLXUqcCkqcSx0WzEwXT0oSSp2LWYqZCtEKkYpKnEsdFsxMV09KGMqZC1pKnYtUypGKSpxLHRbMTJdPShlKnctbCpBLU0qcCkqcSx0WzEzXT0obipBLXIqdytvKnApKnEsdFsxNF09KGYqbS1JKmIteCpGKSpxLHRbMTVdPShpKmItYyptK2gqRikqcSx0KTpudWxsfSxvLlNJTUQuaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG4scixvLHUsbCxlLE0scyxpLGMsaD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksUz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksST1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksZj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpO3JldHVybiBsPVNJTUQuRmxvYXQzMng0LnNodWZmbGUoaCxTLDAsMSw0LDUpLHI9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShJLGYsMCwxLDQsNSksbj1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGwsciwwLDIsNCw2KSxyPVNJTUQuRmxvYXQzMng0LnNodWZmbGUocixsLDEsMyw1LDcpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShoLFMsMiwzLDYsNyksdT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKEksZiwyLDMsNiw3KSxvPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobCx1LDAsMiw0LDYpLHU9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZSh1LGwsMSwzLDUsNyksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobyx1KSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxlPVNJTUQuRmxvYXQzMng0Lm11bChyLGwpLE09U0lNRC5GbG9hdDMyeDQubXVsKG4sbCksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSksZT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHIsbCksZSksTT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG4sbCksTSksTT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKE0sMiwzLDAsMSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwocixvKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxlPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxsKSxlKSxpPVNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuc3ViKGUsU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkpLGk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGw9U0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUociwyLDMsMCwxKSx1KSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxvPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobywyLDMsMCwxKSxlPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSxlKSxzPVNJTUQuRmxvYXQzMng0Lm11bChuLGwpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLGU9U0lNRC5GbG9hdDMyeDQuc3ViKGUsU0lNRC5GbG9hdDMyeDQubXVsKG8sbCkpLHM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChuLGwpLHMpLHM9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShzLDIsMywwLDEpLGw9U0lNRC5GbG9hdDMyeDQubXVsKG4sciksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwwLDMsMikscz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkscyksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKG8sbCksaSksbD1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMiwzLDAsMSkscz1TSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkscyksaT1TSU1ELkZsb2F0MzJ4NC5zdWIoaSxTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSksbD1TSU1ELkZsb2F0MzJ4NC5tdWwobix1KSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwxLDAsMywyKSxNPVNJTUQuRmxvYXQzMng0LnN1YihNLFNJTUQuRmxvYXQzMng0Lm11bChvLGwpKSxzPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocixsKSxzKSxsPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwyLDMsMCwxKSxNPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwobyxsKSxNKSxzPVNJTUQuRmxvYXQzMng0LnN1YihzLFNJTUQuRmxvYXQzMng0Lm11bChyLGwpKSxsPVNJTUQuRmxvYXQzMng0Lm11bChuLG8pLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDEsMCwzLDIpLE09U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LGwpLE0pLGk9U0lNRC5GbG9hdDMyeDQuc3ViKGksU0lNRC5GbG9hdDMyeDQubXVsKHIsbCkpLGw9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMywwLDEpLE09U0lNRC5GbG9hdDMyeDQuc3ViKE0sU0lNRC5GbG9hdDMyeDQubXVsKHUsbCkpLGk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChyLGwpLGkpLGM9U0lNRC5GbG9hdDMyeDQubXVsKG4sZSksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDIsMywwLDEpLGMpLGM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywxLDAsMywyKSxjKSxsPVNJTUQuRmxvYXQzMng0LnJlY2lwcm9jYWxBcHByb3hpbWF0aW9uKGMpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0LmFkZChsLGwpLFNJTUQuRmxvYXQzMng0Lm11bChjLFNJTUQuRmxvYXQzMng0Lm11bChsLGwpKSksKGM9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShjLDAsMCwwLDApKT8oU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0Lm11bChjLGUpKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQubXVsKGMsTSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTSU1ELkZsb2F0MzJ4NC5tdWwoYyxzKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwxMixTSU1ELkZsb2F0MzJ4NC5tdWwoYyxpKSksdCk6bnVsbH0sby5pbnZlcnQ9ci5VU0VfU0lNRD9vLlNJTUQuaW52ZXJ0Om8uc2NhbGFyLmludmVydCxvLnNjYWxhci5hZGpvaW50PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPWFbNF0sZT1hWzVdLE09YVs2XSxzPWFbN10saT1hWzhdLGM9YVs5XSxoPWFbMTBdLFM9YVsxMV0sST1hWzEyXSxmPWFbMTNdLHg9YVsxNF0sRD1hWzE1XTtyZXR1cm4gdFswXT1lKihoKkQtUyp4KS1jKihNKkQtcyp4KStmKihNKlMtcypoKSx0WzFdPS0ociooaCpELVMqeCktYyoobypELXUqeCkrZioobypTLXUqaCkpLHRbMl09ciooTSpELXMqeCktZSoobypELXUqeCkrZioobypzLXUqTSksdFszXT0tKHIqKE0qUy1zKmgpLWUqKG8qUy11KmgpK2MqKG8qcy11Kk0pKSx0WzRdPS0obCooaCpELVMqeCktaSooTSpELXMqeCkrSSooTSpTLXMqaCkpLHRbNV09biooaCpELVMqeCktaSoobypELXUqeCkrSSoobypTLXUqaCksdFs2XT0tKG4qKE0qRC1zKngpLWwqKG8qRC11KngpK0kqKG8qcy11Kk0pKSx0WzddPW4qKE0qUy1zKmgpLWwqKG8qUy11KmgpK2kqKG8qcy11Kk0pLHRbOF09bCooYypELVMqZiktaSooZSpELXMqZikrSSooZSpTLXMqYyksdFs5XT0tKG4qKGMqRC1TKmYpLWkqKHIqRC11KmYpK0kqKHIqUy11KmMpKSx0WzEwXT1uKihlKkQtcypmKS1sKihyKkQtdSpmKStJKihyKnMtdSplKSx0WzExXT0tKG4qKGUqUy1zKmMpLWwqKHIqUy11KmMpK2kqKHIqcy11KmUpKSx0WzEyXT0tKGwqKGMqeC1oKmYpLWkqKGUqeC1NKmYpK0kqKGUqaC1NKmMpKSx0WzEzXT1uKihjKngtaCpmKS1pKihyKngtbypmKStJKihyKmgtbypjKSx0WzE0XT0tKG4qKGUqeC1NKmYpLWwqKHIqeC1vKmYpK0kqKHIqTS1vKmUpKSx0WzE1XT1uKihlKmgtTSpjKS1sKihyKmgtbypjKStpKihyKk0tbyplKSx0fSxvLlNJTUQuYWRqb2ludD1mdW5jdGlvbih0LGEpe3ZhciBuLHIsbyx1LGwsZSxNLHMsaSxjLGgsUyxJLG49U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLHI9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpLHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDEyKTtyZXR1cm4gaT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKG4sciwwLDEsNCw1KSxlPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobyx1LDAsMSw0LDUpLGw9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShpLGUsMCwyLDQsNiksZT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGUsaSwxLDMsNSw3KSxpPVNJTUQuRmxvYXQzMng0LnNodWZmbGUobixyLDIsMyw2LDcpLHM9U0lNRC5GbG9hdDMyeDQuc2h1ZmZsZShvLHUsMiwzLDYsNyksTT1TSU1ELkZsb2F0MzJ4NC5zaHVmZmxlKGkscywwLDIsNCw2KSxzPVNJTUQuRmxvYXQzMng0LnNodWZmbGUocyxpLDEsMyw1LDcpLGk9U0lNRC5GbG9hdDMyeDQubXVsKE0scyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksYz1TSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxoPVNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLGM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChlLGkpLGMpLGg9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChsLGkpLGgpLGg9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShoLDIsMywwLDEpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGUsTSksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKHMsaSksYyksST1TSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LnN1YihjLFNJTUQuRmxvYXQzMng0Lm11bChzLGkpKSxJPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxJKSxJPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoSSwyLDMsMCwxKSxpPVNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMiwzLDAsMSkscyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksTT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKE0sMiwzLDAsMSksYz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKE0saSksYyksUz1TSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxjPVNJTUQuRmxvYXQzMng0LnN1YihjLFNJTUQuRmxvYXQzMng0Lm11bChNLGkpKSxTPVNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxpKSxTKSxTPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoUywyLDMsMCwxKSxpPVNJTUQuRmxvYXQzMng0Lm11bChsLGUpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDEsMCwzLDIpLFM9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLFMpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChNLGkpLEkpLGk9U0lNRC5GbG9hdDMyeDQuc3dpenpsZShpLDIsMywwLDEpLFM9U0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bChzLGkpLFMpLEk9U0lNRC5GbG9hdDMyeDQuc3ViKEksU0lNRC5GbG9hdDMyeDQubXVsKE0saSkpLGk9U0lNRC5GbG9hdDMyeDQubXVsKGwscyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMSwwLDMsMiksaD1TSU1ELkZsb2F0MzJ4NC5zdWIoaCxTSU1ELkZsb2F0MzJ4NC5tdWwoTSxpKSksUz1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKGUsaSksUyksaT1TSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGksMiwzLDAsMSksaD1TSU1ELkZsb2F0MzJ4NC5hZGQoU0lNRC5GbG9hdDMyeDQubXVsKE0saSksaCksUz1TSU1ELkZsb2F0MzJ4NC5zdWIoUyxTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSksaT1TSU1ELkZsb2F0MzJ4NC5tdWwobCxNKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwxLDAsMywyKSxoPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwocyxpKSxoKSxJPVNJTUQuRmxvYXQzMng0LnN1YihJLFNJTUQuRmxvYXQzMng0Lm11bChlLGkpKSxpPVNJTUQuRmxvYXQzMng0LnN3aXp6bGUoaSwyLDMsMCwxKSxoPVNJTUQuRmxvYXQzMng0LnN1YihoLFNJTUQuRmxvYXQzMng0Lm11bChzLGkpKSxJPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoZSxpKSxJKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsYyksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw0LGgpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsOCxTKSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDEyLEkpLHR9LG8uYWRqb2ludD1yLlVTRV9TSU1EP28uU0lNRC5hZGpvaW50Om8uc2NhbGFyLmFkam9pbnQsby5kZXRlcm1pbmFudD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXSxyPXRbMl0sbz10WzNdLHU9dFs0XSxsPXRbNV0sZT10WzZdLE09dFs3XSxzPXRbOF0saT10WzldLGM9dFsxMF0saD10WzExXSxTPXRbMTJdLEk9dFsxM10sZj10WzE0XSx4PXRbMTVdLEQ9YSpsLW4qdSxGPWEqZS1yKnUsbT1hKk0tbyp1LGQ9biplLXIqbCxiPW4qTS1vKmwsdj1yKk0tbyplLHo9cypJLWkqUyxwPXMqZi1jKlMsdz1zKngtaCpTLEU9aSpmLWMqSSxBPWkqeC1oKkksUD1jKngtaCpmO3JldHVybiBEKlAtRipBK20qRStkKnctYipwK3Yqen0sby5TSU1ELm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpLGU9U0lNRC5GbG9hdDMyeDQubG9hZChuLDApLE09U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwzLDMsMywzKSxsKSkpKTtTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsTSk7dmFyIHM9U0lNRC5GbG9hdDMyeDQubG9hZChuLDQpLGk9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKHMsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUocywzLDMsMywzKSxsKSkpKTtTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsaSk7dmFyIGM9U0lNRC5GbG9hdDMyeDQubG9hZChuLDgpLGg9U0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMCwwLDAsMCksciksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMSwxLDEsMSksbyksU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGMsMiwyLDIsMiksdSksU0lNRC5GbG9hdDMyeDQubXVsKFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoYywzLDMsMywzKSxsKSkpKTtTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsaCk7dmFyIFM9U0lNRC5GbG9hdDMyeDQubG9hZChuLDEyKSxJPVNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDAsMCwwLDApLHIpLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDEsMSwxLDEpLG8pLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwoU0lNRC5GbG9hdDMyeDQuc3dpenpsZShTLDIsMiwyLDIpLHUpLFNJTUQuRmxvYXQzMng0Lm11bChTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKFMsMywzLDMsMyksbCkpKSk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsSSksdH0sby5zY2FsYXIubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1hWzRdLE09YVs1XSxzPWFbNl0saT1hWzddLGM9YVs4XSxoPWFbOV0sUz1hWzEwXSxJPWFbMTFdLGY9YVsxMl0seD1hWzEzXSxEPWFbMTRdLEY9YVsxNV0sbT1uWzBdLGQ9blsxXSxiPW5bMl0sdj1uWzNdO3JldHVybiB0WzBdPW0qcitkKmUrYipjK3YqZix0WzFdPW0qbytkKk0rYipoK3YqeCx0WzJdPW0qdStkKnMrYipTK3YqRCx0WzNdPW0qbCtkKmkrYipJK3YqRixtPW5bNF0sZD1uWzVdLGI9bls2XSx2PW5bN10sdFs0XT1tKnIrZCplK2IqYyt2KmYsdFs1XT1tKm8rZCpNK2IqaCt2KngsdFs2XT1tKnUrZCpzK2IqUyt2KkQsdFs3XT1tKmwrZCppK2IqSSt2KkYsbT1uWzhdLGQ9bls5XSxiPW5bMTBdLHY9blsxMV0sdFs4XT1tKnIrZCplK2IqYyt2KmYsdFs5XT1tKm8rZCpNK2IqaCt2KngsdFsxMF09bSp1K2QqcytiKlMrdipELHRbMTFdPW0qbCtkKmkrYipJK3YqRixtPW5bMTJdLGQ9blsxM10sYj1uWzE0XSx2PW5bMTVdLHRbMTJdPW0qcitkKmUrYipjK3YqZix0WzEzXT1tKm8rZCpNK2IqaCt2KngsdFsxNF09bSp1K2QqcytiKlMrdipELHRbMTVdPW0qbCtkKmkrYipJK3YqRix0fSxvLm11bHRpcGx5PXIuVVNFX1NJTUQ/by5TSU1ELm11bHRpcGx5Om8uc2NhbGFyLm11bHRpcGx5LG8ubXVsPW8ubXVsdGlwbHksby5zY2FsYXIudHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcixvLHUsbCxlLE0scyxpLGMsaCxTLEksZj1uWzBdLHg9blsxXSxEPW5bMl07cmV0dXJuIGE9PT10Pyh0WzEyXT1hWzBdKmYrYVs0XSp4K2FbOF0qRCthWzEyXSx0WzEzXT1hWzFdKmYrYVs1XSp4K2FbOV0qRCthWzEzXSx0WzE0XT1hWzJdKmYrYVs2XSp4K2FbMTBdKkQrYVsxNF0sdFsxNV09YVszXSpmK2FbN10qeCthWzExXSpEK2FbMTVdKToocj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9YVs0XSxNPWFbNV0scz1hWzZdLGk9YVs3XSxjPWFbOF0saD1hWzldLFM9YVsxMF0sST1hWzExXSx0WzBdPXIsdFsxXT1vLHRbMl09dSx0WzNdPWwsdFs0XT1lLHRbNV09TSx0WzZdPXMsdFs3XT1pLHRbOF09Yyx0WzldPWgsdFsxMF09Uyx0WzExXT1JLHRbMTJdPXIqZitlKngrYypEK2FbMTJdLHRbMTNdPW8qZitNKngraCpEK2FbMTNdLHRbMTRdPXUqZitzKngrUypEK2FbMTRdLHRbMTVdPWwqZitpKngrSSpEK2FbMTVdKSx0fSxvLlNJTUQudHJhbnNsYXRlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksbz1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsNCksdT1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsOCksbD1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMTIpLGU9U0lNRC5GbG9hdDMyeDQoblswXSxuWzFdLG5bMl0sMCk7YSE9PXQmJih0WzBdPWFbMF0sdFsxXT1hWzFdLHRbMl09YVsyXSx0WzNdPWFbM10sdFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0pLHI9U0lNRC5GbG9hdDMyeDQubXVsKHIsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShlLDAsMCwwLDApKSxvPVNJTUQuRmxvYXQzMng0Lm11bChvLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUoZSwxLDEsMSwxKSksdT1TSU1ELkZsb2F0MzJ4NC5tdWwodSxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGUsMiwyLDIsMikpO3ZhciBNPVNJTUQuRmxvYXQzMng0LmFkZChyLFNJTUQuRmxvYXQzMng0LmFkZChvLFNJTUQuRmxvYXQzMng0LmFkZCh1LGwpKSk7cmV0dXJuIFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsMTIsTSksdH0sby50cmFuc2xhdGU9ci5VU0VfU0lNRD9vLlNJTUQudHJhbnNsYXRlOm8uc2NhbGFyLnRyYW5zbGF0ZSxvLnNjYWxhci5zY2FsZT1mdW5jdGlvbih0LGEsbil7dmFyIHI9blswXSxvPW5bMV0sdT1uWzJdO3JldHVybiB0WzBdPWFbMF0qcix0WzFdPWFbMV0qcix0WzJdPWFbMl0qcix0WzNdPWFbM10qcix0WzRdPWFbNF0qbyx0WzVdPWFbNV0qbyx0WzZdPWFbNl0qbyx0WzddPWFbN10qbyx0WzhdPWFbOF0qdSx0WzldPWFbOV0qdSx0WzEwXT1hWzEwXSp1LHRbMTFdPWFbMTFdKnUsdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0sdH0sby5TSU1ELnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcixvLHUsbD1TSU1ELkZsb2F0MzJ4NChuWzBdLG5bMV0sblsyXSwwKTtyZXR1cm4gcj1TSU1ELkZsb2F0MzJ4NC5sb2FkKGEsMCksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0Lm11bChyLFNJTUQuRmxvYXQzMng0LnN3aXp6bGUobCwwLDAsMCwwKSkpLG89U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5tdWwobyxTSU1ELkZsb2F0MzJ4NC5zd2l6emxlKGwsMSwxLDEsMSkpKSx1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSw4KSxTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDgsU0lNRC5GbG9hdDMyeDQubXVsKHUsU0lNRC5GbG9hdDMyeDQuc3dpenpsZShsLDIsMiwyLDIpKSksdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0sdH0sby5zY2FsZT1yLlVTRV9TSU1EP28uU0lNRC5zY2FsZTpvLnNjYWxhci5zY2FsZSxvLnJvdGF0ZT1mdW5jdGlvbih0LGEsbixvKXt2YXIgdSxsLGUsTSxzLGksYyxoLFMsSSxmLHgsRCxGLG0sZCxiLHYseixwLHcsRSxBLFAsTD1vWzBdLHE9b1sxXSxSPW9bMl0sTj1NYXRoLnNxcnQoTCpMK3EqcStSKlIpO3JldHVybiBNYXRoLmFicyhOKTxyLkVQU0lMT04/bnVsbDooTj0xL04sTCo9TixxKj1OLFIqPU4sdT1NYXRoLnNpbihuKSxsPU1hdGguY29zKG4pLGU9MS1sLE09YVswXSxzPWFbMV0saT1hWzJdLGM9YVszXSxoPWFbNF0sUz1hWzVdLEk9YVs2XSxmPWFbN10seD1hWzhdLEQ9YVs5XSxGPWFbMTBdLG09YVsxMV0sZD1MKkwqZStsLGI9cSpMKmUrUip1LHY9UipMKmUtcSp1LHo9TCpxKmUtUip1LHA9cSpxKmUrbCx3PVIqcSplK0wqdSxFPUwqUiplK3EqdSxBPXEqUiplLUwqdSxQPVIqUiplK2wsdFswXT1NKmQraCpiK3gqdix0WzFdPXMqZCtTKmIrRCp2LHRbMl09aSpkK0kqYitGKnYsdFszXT1jKmQrZipiK20qdix0WzRdPU0qeitoKnAreCp3LHRbNV09cyp6K1MqcCtEKncsdFs2XT1pKnorSSpwK0Yqdyx0WzddPWMqeitmKnArbSp3LHRbOF09TSpFK2gqQSt4KlAsdFs5XT1zKkUrUypBK0QqUCx0WzEwXT1pKkUrSSpBK0YqUCx0WzExXT1jKkUrZipBK20qUCxhIT09dCYmKHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0KX0sby5zY2FsYXIucm90YXRlWD1mdW5jdGlvbih0LGEsbil7dmFyIHI9TWF0aC5zaW4obiksbz1NYXRoLmNvcyhuKSx1PWFbNF0sbD1hWzVdLGU9YVs2XSxNPWFbN10scz1hWzhdLGk9YVs5XSxjPWFbMTBdLGg9YVsxMV07cmV0dXJuIGEhPT10JiYodFswXT1hWzBdLHRbMV09YVsxXSx0WzJdPWFbMl0sdFszXT1hWzNdLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0WzRdPXUqbytzKnIsdFs1XT1sKm8raSpyLHRbNl09ZSpvK2Mqcix0WzddPU0qbytoKnIsdFs4XT1zKm8tdSpyLHRbOV09aSpvLWwqcix0WzEwXT1jKm8tZSpyLHRbMTFdPWgqby1NKnIsdH0sby5TSU1ELnJvdGF0ZVg9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKG4pKSxvPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKG4pKTthIT09dCYmKHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSk7dmFyIHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDQpLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDQsU0lNRC5GbG9hdDMyeDQuYWRkKFNJTUQuRmxvYXQzMng0Lm11bCh1LG8pLFNJTUQuRmxvYXQzMng0Lm11bChsLHIpKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0LnN1YihTSU1ELkZsb2F0MzJ4NC5tdWwobCxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwodSxyKSkpLHR9LG8ucm90YXRlWD1yLlVTRV9TSU1EP28uU0lNRC5yb3RhdGVYOm8uc2NhbGFyLnJvdGF0ZVgsby5zY2FsYXIucm90YXRlWT1mdW5jdGlvbih0LGEsbil7dmFyIHI9TWF0aC5zaW4obiksbz1NYXRoLmNvcyhuKSx1PWFbMF0sbD1hWzFdLGU9YVsyXSxNPWFbM10scz1hWzhdLGk9YVs5XSxjPWFbMTBdLGg9YVsxMV07cmV0dXJuIGEhPT10JiYodFs0XT1hWzRdLHRbNV09YVs1XSx0WzZdPWFbNl0sdFs3XT1hWzddLHRbMTJdPWFbMTJdLHRbMTNdPWFbMTNdLHRbMTRdPWFbMTRdLHRbMTVdPWFbMTVdKSx0WzBdPXUqby1zKnIsdFsxXT1sKm8taSpyLHRbMl09ZSpvLWMqcix0WzNdPU0qby1oKnIsdFs4XT11KnIrcypvLHRbOV09bCpyK2kqbyx0WzEwXT1lKnIrYypvLHRbMTFdPU0qcitoKm8sdH0sby5TSU1ELnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKG4pKSxvPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKG4pKTthIT09dCYmKHRbNF09YVs0XSx0WzVdPWFbNV0sdFs2XT1hWzZdLHRbN109YVs3XSx0WzEyXT1hWzEyXSx0WzEzXT1hWzEzXSx0WzE0XT1hWzE0XSx0WzE1XT1hWzE1XSk7dmFyIHU9U0lNRC5GbG9hdDMyeDQubG9hZChhLDApLGw9U0lNRC5GbG9hdDMyeDQubG9hZChhLDgpO3JldHVybiBTSU1ELkZsb2F0MzJ4NC5zdG9yZSh0LDAsU0lNRC5GbG9hdDMyeDQuc3ViKFNJTUQuRmxvYXQzMng0Lm11bCh1LG8pLFNJTUQuRmxvYXQzMng0Lm11bChsLHIpKSksU0lNRC5GbG9hdDMyeDQuc3RvcmUodCw4LFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxyKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxvKSkpLHR9LG8ucm90YXRlWT1yLlVTRV9TSU1EP28uU0lNRC5yb3RhdGVZOm8uc2NhbGFyLnJvdGF0ZVksby5zY2FsYXIucm90YXRlWj1mdW5jdGlvbih0LGEsbil7dmFyIHI9TWF0aC5zaW4obiksbz1NYXRoLmNvcyhuKSx1PWFbMF0sbD1hWzFdLGU9YVsyXSxNPWFbM10scz1hWzRdLGk9YVs1XSxjPWFbNl0saD1hWzddO3JldHVybiBhIT09dCYmKHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pLHRbMF09dSpvK3Mqcix0WzFdPWwqbytpKnIsdFsyXT1lKm8rYypyLHRbM109TSpvK2gqcix0WzRdPXMqby11KnIsdFs1XT1pKm8tbCpyLHRbNl09YypvLWUqcix0WzddPWgqby1NKnIsdH0sby5TSU1ELnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4pe3ZhciByPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguc2luKG4pKSxvPVNJTUQuRmxvYXQzMng0LnNwbGF0KE1hdGguY29zKG4pKTthIT09dCYmKHRbOF09YVs4XSx0WzldPWFbOV0sdFsxMF09YVsxMF0sdFsxMV09YVsxMV0sdFsxMl09YVsxMl0sdFsxM109YVsxM10sdFsxNF09YVsxNF0sdFsxNV09YVsxNV0pO3ZhciB1PVNJTUQuRmxvYXQzMng0LmxvYWQoYSwwKSxsPVNJTUQuRmxvYXQzMng0LmxvYWQoYSw0KTtyZXR1cm4gU0lNRC5GbG9hdDMyeDQuc3RvcmUodCwwLFNJTUQuRmxvYXQzMng0LmFkZChTSU1ELkZsb2F0MzJ4NC5tdWwodSxvKSxTSU1ELkZsb2F0MzJ4NC5tdWwobCxyKSkpLFNJTUQuRmxvYXQzMng0LnN0b3JlKHQsNCxTSU1ELkZsb2F0MzJ4NC5zdWIoU0lNRC5GbG9hdDMyeDQubXVsKGwsbyksU0lNRC5GbG9hdDMyeDQubXVsKHUscikpKSx0fSxvLnJvdGF0ZVo9ci5VU0VfU0lNRD9vLlNJTUQucm90YXRlWjpvLnNjYWxhci5yb3RhdGVaLG8uZnJvbVRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0xLHRbMTFdPTAsdFsxMl09YVswXSx0WzEzXT1hWzFdLHRbMTRdPWFbMl0sdFsxNV09MSx0fSxvLmZyb21TY2FsaW5nPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT1hWzFdLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT1hWzJdLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21Sb3RhdGlvbj1mdW5jdGlvbih0LGEsbil7dmFyIG8sdSxsLGU9blswXSxNPW5bMV0scz1uWzJdLGk9TWF0aC5zcXJ0KGUqZStNKk0rcypzKTtyZXR1cm4gTWF0aC5hYnMoaSk8ci5FUFNJTE9OP251bGw6KGk9MS9pLGUqPWksTSo9aSxzKj1pLG89TWF0aC5zaW4oYSksdT1NYXRoLmNvcyhhKSxsPTEtdSx0WzBdPWUqZSpsK3UsdFsxXT1NKmUqbCtzKm8sdFsyXT1zKmUqbC1NKm8sdFszXT0wLHRbNF09ZSpNKmwtcypvLHRbNV09TSpNKmwrdSx0WzZdPXMqTSpsK2Uqbyx0WzddPTAsdFs4XT1lKnMqbCtNKm8sdFs5XT1NKnMqbC1lKm8sdFsxMF09cypzKmwrdSx0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdCl9LG8uZnJvbVhSb3RhdGlvbj1mdW5jdGlvbih0LGEpe3ZhciBuPU1hdGguc2luKGEpLHI9TWF0aC5jb3MoYSk7cmV0dXJuIHRbMF09MSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT1yLHRbNl09bix0WzddPTAsdFs4XT0wLHRbOV09LW4sdFsxMF09cix0WzExXT0wLHRbMTJdPTAsdFsxM109MCx0WzE0XT0wLHRbMTVdPTEsdH0sby5mcm9tWVJvdGF0aW9uPWZ1bmN0aW9uKHQsYSl7dmFyIG49TWF0aC5zaW4oYSkscj1NYXRoLmNvcyhhKTtyZXR1cm4gdFswXT1yLHRbMV09MCx0WzJdPS1uLHRbM109MCx0WzRdPTAsdFs1XT0xLHRbNl09MCx0WzddPTAsdFs4XT1uLHRbOV09MCx0WzEwXT1yLHRbMTFdPTAsdFsxMl09MCx0WzEzXT0wLHRbMTRdPTAsdFsxNV09MSx0fSxvLmZyb21aUm90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1NYXRoLnNpbihhKSxyPU1hdGguY29zKGEpO3JldHVybiB0WzBdPXIsdFsxXT1uLHRbMl09MCx0WzNdPTAsdFs0XT0tbix0WzVdPXIsdFs2XT0wLHRbN109MCx0WzhdPTAsdFs5XT0wLHRbMTBdPTEsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJvbVJvdGF0aW9uVHJhbnNsYXRpb249ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1yK3IsTT1vK28scz11K3UsaT1yKmUsYz1yKk0saD1yKnMsUz1vKk0sST1vKnMsZj11KnMseD1sKmUsRD1sKk0sRj1sKnM7cmV0dXJuIHRbMF09MS0oUytmKSx0WzFdPWMrRix0WzJdPWgtRCx0WzNdPTAsdFs0XT1jLUYsdFs1XT0xLShpK2YpLHRbNl09SSt4LHRbN109MCx0WzhdPWgrRCx0WzldPUkteCx0WzEwXT0xLShpK1MpLHRbMTFdPTAsdFsxMl09blswXSx0WzEzXT1uWzFdLHRbMTRdPW5bMl0sdFsxNV09MSx0fSxvLmdldFRyYW5zbGF0aW9uPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVsxMl0sdFsxXT1hWzEzXSx0WzJdPWFbMTRdLHR9LG8uZ2V0Um90YXRpb249ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdK2FbNV0rYVsxMF0scj0wO3JldHVybiBuPjA/KHI9MipNYXRoLnNxcnQobisxKSx0WzNdPS4yNSpyLHRbMF09KGFbNl0tYVs5XSkvcix0WzFdPShhWzhdLWFbMl0pL3IsdFsyXT0oYVsxXS1hWzRdKS9yKTphWzBdPmFbNV0mYVswXT5hWzEwXT8ocj0yKk1hdGguc3FydCgxK2FbMF0tYVs1XS1hWzEwXSksdFszXT0oYVs2XS1hWzldKS9yLHRbMF09LjI1KnIsdFsxXT0oYVsxXSthWzRdKS9yLHRbMl09KGFbOF0rYVsyXSkvcik6YVs1XT5hWzEwXT8ocj0yKk1hdGguc3FydCgxK2FbNV0tYVswXS1hWzEwXSksdFszXT0oYVs4XS1hWzJdKS9yLHRbMF09KGFbMV0rYVs0XSkvcix0WzFdPS4yNSpyLHRbMl09KGFbNl0rYVs5XSkvcik6KHI9MipNYXRoLnNxcnQoMSthWzEwXS1hWzBdLWFbNV0pLHRbM109KGFbMV0tYVs0XSkvcix0WzBdPShhWzhdK2FbMl0pL3IsdFsxXT0oYVs2XSthWzldKS9yLHRbMl09LjI1KnIpLHR9LG8uZnJvbVJvdGF0aW9uVHJhbnNsYXRpb25TY2FsZT1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXSxsPWFbMl0sZT1hWzNdLE09bytvLHM9dSt1LGk9bCtsLGM9bypNLGg9bypzLFM9byppLEk9dSpzLGY9dSppLHg9bCppLEQ9ZSpNLEY9ZSpzLG09ZSppLGQ9clswXSxiPXJbMV0sdj1yWzJdO3JldHVybiB0WzBdPSgxLShJK3gpKSpkLHRbMV09KGgrbSkqZCx0WzJdPShTLUYpKmQsdFszXT0wLHRbNF09KGgtbSkqYix0WzVdPSgxLShjK3gpKSpiLHRbNl09KGYrRCkqYix0WzddPTAsdFs4XT0oUytGKSp2LHRbOV09KGYtRCkqdix0WzEwXT0oMS0oYytJKSkqdix0WzExXT0wLHRbMTJdPW5bMF0sdFsxM109blsxXSx0WzE0XT1uWzJdLHRbMTVdPTEsdH0sby5mcm9tUm90YXRpb25UcmFuc2xhdGlvblNjYWxlT3JpZ2luPWZ1bmN0aW9uKHQsYSxuLHIsbyl7XG4gICAgdmFyIHU9YVswXSxsPWFbMV0sZT1hWzJdLE09YVszXSxzPXUrdSxpPWwrbCxjPWUrZSxoPXUqcyxTPXUqaSxJPXUqYyxmPWwqaSx4PWwqYyxEPWUqYyxGPU0qcyxtPU0qaSxkPU0qYyxiPXJbMF0sdj1yWzFdLHo9clsyXSxwPW9bMF0sdz1vWzFdLEU9b1syXTtyZXR1cm4gdFswXT0oMS0oZitEKSkqYix0WzFdPShTK2QpKmIsdFsyXT0oSS1tKSpiLHRbM109MCx0WzRdPShTLWQpKnYsdFs1XT0oMS0oaCtEKSkqdix0WzZdPSh4K0YpKnYsdFs3XT0wLHRbOF09KEkrbSkqeix0WzldPSh4LUYpKnosdFsxMF09KDEtKGgrZikpKnosdFsxMV09MCx0WzEyXT1uWzBdK3AtKHRbMF0qcCt0WzRdKncrdFs4XSpFKSx0WzEzXT1uWzFdK3ctKHRbMV0qcCt0WzVdKncrdFs5XSpFKSx0WzE0XT1uWzJdK0UtKHRbMl0qcCt0WzZdKncrdFsxMF0qRSksdFsxNV09MSx0fSxvLmZyb21RdWF0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4rbixlPXIrcixNPW8rbyxzPW4qbCxpPXIqbCxjPXIqZSxoPW8qbCxTPW8qZSxJPW8qTSxmPXUqbCx4PXUqZSxEPXUqTTtyZXR1cm4gdFswXT0xLWMtSSx0WzFdPWkrRCx0WzJdPWgteCx0WzNdPTAsdFs0XT1pLUQsdFs1XT0xLXMtSSx0WzZdPVMrZix0WzddPTAsdFs4XT1oK3gsdFs5XT1TLWYsdFsxMF09MS1zLWMsdFsxMV09MCx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MCx0WzE1XT0xLHR9LG8uZnJ1c3R1bT1mdW5jdGlvbih0LGEsbixyLG8sdSxsKXt2YXIgZT0xLyhuLWEpLE09MS8oby1yKSxzPTEvKHUtbCk7cmV0dXJuIHRbMF09Mip1KmUsdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09Mip1Kk0sdFs2XT0wLHRbN109MCx0WzhdPShuK2EpKmUsdFs5XT0obytyKSpNLHRbMTBdPShsK3UpKnMsdFsxMV09LTEsdFsxMl09MCx0WzEzXT0wLHRbMTRdPWwqdSoyKnMsdFsxNV09MCx0fSxvLnBlcnNwZWN0aXZlPWZ1bmN0aW9uKHQsYSxuLHIsbyl7dmFyIHU9MS9NYXRoLnRhbihhLzIpLGw9MS8oci1vKTtyZXR1cm4gdFswXT11L24sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09dSx0WzZdPTAsdFs3XT0wLHRbOF09MCx0WzldPTAsdFsxMF09KG8rcikqbCx0WzExXT0tMSx0WzEyXT0wLHRbMTNdPTAsdFsxNF09MipvKnIqbCx0WzE1XT0wLHR9LG8ucGVyc3BlY3RpdmVGcm9tRmllbGRPZlZpZXc9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89TWF0aC50YW4oYS51cERlZ3JlZXMqTWF0aC5QSS8xODApLHU9TWF0aC50YW4oYS5kb3duRGVncmVlcypNYXRoLlBJLzE4MCksbD1NYXRoLnRhbihhLmxlZnREZWdyZWVzKk1hdGguUEkvMTgwKSxlPU1hdGgudGFuKGEucmlnaHREZWdyZWVzKk1hdGguUEkvMTgwKSxNPTIvKGwrZSkscz0yLyhvK3UpO3JldHVybiB0WzBdPU0sdFsxXT0wLHRbMl09MCx0WzNdPTAsdFs0XT0wLHRbNV09cyx0WzZdPTAsdFs3XT0wLHRbOF09LSgobC1lKSpNKi41KSx0WzldPShvLXUpKnMqLjUsdFsxMF09ci8obi1yKSx0WzExXT0tMSx0WzEyXT0wLHRbMTNdPTAsdFsxNF09cipuLyhuLXIpLHRbMTVdPTAsdH0sby5vcnRobz1mdW5jdGlvbih0LGEsbixyLG8sdSxsKXt2YXIgZT0xLyhhLW4pLE09MS8oci1vKSxzPTEvKHUtbCk7cmV0dXJuIHRbMF09LTIqZSx0WzFdPTAsdFsyXT0wLHRbM109MCx0WzRdPTAsdFs1XT0tMipNLHRbNl09MCx0WzddPTAsdFs4XT0wLHRbOV09MCx0WzEwXT0yKnMsdFsxMV09MCx0WzEyXT0oYStuKSplLHRbMTNdPShvK3IpKk0sdFsxNF09KGwrdSkqcyx0WzE1XT0xLHR9LG8ubG9va0F0PWZ1bmN0aW9uKHQsYSxuLHUpe3ZhciBsLGUsTSxzLGksYyxoLFMsSSxmLHg9YVswXSxEPWFbMV0sRj1hWzJdLG09dVswXSxkPXVbMV0sYj11WzJdLHY9blswXSx6PW5bMV0scD1uWzJdO3JldHVybiBNYXRoLmFicyh4LXYpPHIuRVBTSUxPTiYmTWF0aC5hYnMoRC16KTxyLkVQU0lMT04mJk1hdGguYWJzKEYtcCk8ci5FUFNJTE9OP28uaWRlbnRpdHkodCk6KGg9eC12LFM9RC16LEk9Ri1wLGY9MS9NYXRoLnNxcnQoaCpoK1MqUytJKkkpLGgqPWYsUyo9ZixJKj1mLGw9ZCpJLWIqUyxlPWIqaC1tKkksTT1tKlMtZCpoLGY9TWF0aC5zcXJ0KGwqbCtlKmUrTSpNKSxmPyhmPTEvZixsKj1mLGUqPWYsTSo9Zik6KGw9MCxlPTAsTT0wKSxzPVMqTS1JKmUsaT1JKmwtaCpNLGM9aCplLVMqbCxmPU1hdGguc3FydChzKnMraSppK2MqYyksZj8oZj0xL2Yscyo9ZixpKj1mLGMqPWYpOihzPTAsaT0wLGM9MCksdFswXT1sLHRbMV09cyx0WzJdPWgsdFszXT0wLHRbNF09ZSx0WzVdPWksdFs2XT1TLHRbN109MCx0WzhdPU0sdFs5XT1jLHRbMTBdPUksdFsxMV09MCx0WzEyXT0tKGwqeCtlKkQrTSpGKSx0WzEzXT0tKHMqeCtpKkQrYypGKSx0WzE0XT0tKGgqeCtTKkQrSSpGKSx0WzE1XT0xLHQpfSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cIm1hdDQoXCIrdFswXStcIiwgXCIrdFsxXStcIiwgXCIrdFsyXStcIiwgXCIrdFszXStcIiwgXCIrdFs0XStcIiwgXCIrdFs1XStcIiwgXCIrdFs2XStcIiwgXCIrdFs3XStcIiwgXCIrdFs4XStcIiwgXCIrdFs5XStcIiwgXCIrdFsxMF0rXCIsIFwiK3RbMTFdK1wiLCBcIit0WzEyXStcIiwgXCIrdFsxM10rXCIsIFwiK3RbMTRdK1wiLCBcIit0WzE1XStcIilcIn0sby5mcm9iPWZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codFswXSwyKStNYXRoLnBvdyh0WzFdLDIpK01hdGgucG93KHRbMl0sMikrTWF0aC5wb3codFszXSwyKStNYXRoLnBvdyh0WzRdLDIpK01hdGgucG93KHRbNV0sMikrTWF0aC5wb3codFs2XSwyKStNYXRoLnBvdyh0WzddLDIpK01hdGgucG93KHRbOF0sMikrTWF0aC5wb3codFs5XSwyKStNYXRoLnBvdyh0WzEwXSwyKStNYXRoLnBvdyh0WzExXSwyKStNYXRoLnBvdyh0WzEyXSwyKStNYXRoLnBvdyh0WzEzXSwyKStNYXRoLnBvdyh0WzE0XSwyKStNYXRoLnBvdyh0WzE1XSwyKSl9LG8uYWRkPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdK25bMF0sdFsxXT1hWzFdK25bMV0sdFsyXT1hWzJdK25bMl0sdFszXT1hWzNdK25bM10sdFs0XT1hWzRdK25bNF0sdFs1XT1hWzVdK25bNV0sdFs2XT1hWzZdK25bNl0sdFs3XT1hWzddK25bN10sdFs4XT1hWzhdK25bOF0sdFs5XT1hWzldK25bOV0sdFsxMF09YVsxMF0rblsxMF0sdFsxMV09YVsxMV0rblsxMV0sdFsxMl09YVsxMl0rblsxMl0sdFsxM109YVsxM10rblsxM10sdFsxNF09YVsxNF0rblsxNF0sdFsxNV09YVsxNV0rblsxNV0sdH0sby5zdWJ0cmFjdD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS1uWzBdLHRbMV09YVsxXS1uWzFdLHRbMl09YVsyXS1uWzJdLHRbM109YVszXS1uWzNdLHRbNF09YVs0XS1uWzRdLHRbNV09YVs1XS1uWzVdLHRbNl09YVs2XS1uWzZdLHRbN109YVs3XS1uWzddLHRbOF09YVs4XS1uWzhdLHRbOV09YVs5XS1uWzldLHRbMTBdPWFbMTBdLW5bMTBdLHRbMTFdPWFbMTFdLW5bMTFdLHRbMTJdPWFbMTJdLW5bMTJdLHRbMTNdPWFbMTNdLW5bMTNdLHRbMTRdPWFbMTRdLW5bMTRdLHRbMTVdPWFbMTVdLW5bMTVdLHR9LG8uc3ViPW8uc3VidHJhY3Qsby5tdWx0aXBseVNjYWxhcj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHRbM109YVszXSpuLHRbNF09YVs0XSpuLHRbNV09YVs1XSpuLHRbNl09YVs2XSpuLHRbN109YVs3XSpuLHRbOF09YVs4XSpuLHRbOV09YVs5XSpuLHRbMTBdPWFbMTBdKm4sdFsxMV09YVsxMV0qbix0WzEyXT1hWzEyXSpuLHRbMTNdPWFbMTNdKm4sdFsxNF09YVsxNF0qbix0WzE1XT1hWzE1XSpuLHR9LG8ubXVsdGlwbHlTY2FsYXJBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHRbM109YVszXStuWzNdKnIsdFs0XT1hWzRdK25bNF0qcix0WzVdPWFbNV0rbls1XSpyLHRbNl09YVs2XStuWzZdKnIsdFs3XT1hWzddK25bN10qcix0WzhdPWFbOF0rbls4XSpyLHRbOV09YVs5XStuWzldKnIsdFsxMF09YVsxMF0rblsxMF0qcix0WzExXT1hWzExXStuWzExXSpyLHRbMTJdPWFbMTJdK25bMTJdKnIsdFsxM109YVsxM10rblsxM10qcix0WzE0XT1hWzE0XStuWzE0XSpyLHRbMTVdPWFbMTVdK25bMTVdKnIsdH0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV0mJnRbMl09PT1hWzJdJiZ0WzNdPT09YVszXSYmdFs0XT09PWFbNF0mJnRbNV09PT1hWzVdJiZ0WzZdPT09YVs2XSYmdFs3XT09PWFbN10mJnRbOF09PT1hWzhdJiZ0WzldPT09YVs5XSYmdFsxMF09PT1hWzEwXSYmdFsxMV09PT1hWzExXSYmdFsxMl09PT1hWzEyXSYmdFsxM109PT1hWzEzXSYmdFsxNF09PT1hWzE0XSYmdFsxNV09PT1hWzE1XX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD10WzNdLGU9dFs0XSxNPXRbNV0scz10WzZdLGk9dFs3XSxjPXRbOF0saD10WzldLFM9dFsxMF0sST10WzExXSxmPXRbMTJdLHg9dFsxM10sRD10WzE0XSxGPXRbMTVdLG09YVswXSxkPWFbMV0sYj1hWzJdLHY9YVszXSx6PWFbNF0scD1hWzVdLHc9YVs2XSxFPWFbN10sQT1hWzhdLFA9YVs5XSxMPWFbMTBdLHE9YVsxMV0sUj1hWzEyXSxOPWFbMTNdLE89YVsxNF0sWT1hWzE1XTtyZXR1cm4gTWF0aC5hYnMobi1tKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnMobSkpJiZNYXRoLmFicyhvLWQpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhkKSkmJk1hdGguYWJzKHUtYik8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKHUpLE1hdGguYWJzKGIpKSYmTWF0aC5hYnMobC12KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobCksTWF0aC5hYnModikpJiZNYXRoLmFicyhlLXopPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhlKSxNYXRoLmFicyh6KSkmJk1hdGguYWJzKE0tcCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKE0pLE1hdGguYWJzKHApKSYmTWF0aC5hYnMocy13KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMocyksTWF0aC5hYnModykpJiZNYXRoLmFicyhpLUUpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhpKSxNYXRoLmFicyhFKSkmJk1hdGguYWJzKGMtQSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGMpLE1hdGguYWJzKEEpKSYmTWF0aC5hYnMoaC1QKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoaCksTWF0aC5hYnMoUCkpJiZNYXRoLmFicyhTLUwpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhTKSxNYXRoLmFicyhMKSkmJk1hdGguYWJzKEktcSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKEkpLE1hdGguYWJzKHEpKSYmTWF0aC5hYnMoZi1SKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoZiksTWF0aC5hYnMoUikpJiZNYXRoLmFicyh4LU4pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh4KSxNYXRoLmFicyhOKSkmJk1hdGguYWJzKEQtTyk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKEQpLE1hdGguYWJzKE8pKSYmTWF0aC5hYnMoRi1ZKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMoRiksTWF0aC5hYnMoWSkpfSx0LmV4cG9ydHM9b30sZnVuY3Rpb24odCxhLG4pe3ZhciByPW4oMSksbz1uKDQpLHU9big3KSxsPW4oOCksZT17fTtlLmNyZWF0ZT1mdW5jdGlvbigpe3ZhciB0PW5ldyByLkFSUkFZX1RZUEUoNCk7cmV0dXJuIHRbMF09MCx0WzFdPTAsdFsyXT0wLHRbM109MSx0fSxlLnJvdGF0aW9uVG89ZnVuY3Rpb24oKXt2YXIgdD11LmNyZWF0ZSgpLGE9dS5mcm9tVmFsdWVzKDEsMCwwKSxuPXUuZnJvbVZhbHVlcygwLDEsMCk7cmV0dXJuIGZ1bmN0aW9uKHIsbyxsKXt2YXIgTT11LmRvdChvLGwpO3JldHVybi0uOTk5OTk5Pk0/KHUuY3Jvc3ModCxhLG8pLHUubGVuZ3RoKHQpPDFlLTYmJnUuY3Jvc3ModCxuLG8pLHUubm9ybWFsaXplKHQsdCksZS5zZXRBeGlzQW5nbGUocix0LE1hdGguUEkpLHIpOk0+Ljk5OTk5OT8oclswXT0wLHJbMV09MCxyWzJdPTAsclszXT0xLHIpOih1LmNyb3NzKHQsbyxsKSxyWzBdPXRbMF0sclsxXT10WzFdLHJbMl09dFsyXSxyWzNdPTErTSxlLm5vcm1hbGl6ZShyLHIpKX19KCksZS5zZXRBeGVzPWZ1bmN0aW9uKCl7dmFyIHQ9by5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24oYSxuLHIsbyl7cmV0dXJuIHRbMF09clswXSx0WzNdPXJbMV0sdFs2XT1yWzJdLHRbMV09b1swXSx0WzRdPW9bMV0sdFs3XT1vWzJdLHRbMl09LW5bMF0sdFs1XT0tblsxXSx0WzhdPS1uWzJdLGUubm9ybWFsaXplKGEsZS5mcm9tTWF0MyhhLHQpKX19KCksZS5jbG9uZT1sLmNsb25lLGUuZnJvbVZhbHVlcz1sLmZyb21WYWx1ZXMsZS5jb3B5PWwuY29weSxlLnNldD1sLnNldCxlLmlkZW50aXR5PWZ1bmN0aW9uKHQpe3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0WzNdPTEsdH0sZS5zZXRBeGlzQW5nbGU9ZnVuY3Rpb24odCxhLG4pe249LjUqbjt2YXIgcj1NYXRoLnNpbihuKTtyZXR1cm4gdFswXT1yKmFbMF0sdFsxXT1yKmFbMV0sdFsyXT1yKmFbMl0sdFszXT1NYXRoLmNvcyhuKSx0fSxlLmdldEF4aXNBbmdsZT1mdW5jdGlvbih0LGEpe3ZhciBuPTIqTWF0aC5hY29zKGFbM10pLHI9TWF0aC5zaW4obi8yKTtyZXR1cm4gMCE9cj8odFswXT1hWzBdL3IsdFsxXT1hWzFdL3IsdFsyXT1hWzJdL3IpOih0WzBdPTEsdFsxXT0wLHRbMl09MCksbn0sZS5hZGQ9bC5hZGQsZS5tdWx0aXBseT1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPW5bMF0sTT1uWzFdLHM9blsyXSxpPW5bM107cmV0dXJuIHRbMF09cippK2wqZStvKnMtdSpNLHRbMV09byppK2wqTSt1KmUtcipzLHRbMl09dSppK2wqcytyKk0tbyplLHRbM109bCppLXIqZS1vKk0tdSpzLHR9LGUubXVsPWUubXVsdGlwbHksZS5zY2FsZT1sLnNjYWxlLGUucm90YXRlWD1mdW5jdGlvbih0LGEsbil7bio9LjU7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9YVszXSxlPU1hdGguc2luKG4pLE09TWF0aC5jb3Mobik7cmV0dXJuIHRbMF09cipNK2wqZSx0WzFdPW8qTSt1KmUsdFsyXT11Kk0tbyplLHRbM109bCpNLXIqZSx0fSxlLnJvdGF0ZVk9ZnVuY3Rpb24odCxhLG4pe24qPS41O3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPWFbM10sZT1NYXRoLnNpbihuKSxNPU1hdGguY29zKG4pO3JldHVybiB0WzBdPXIqTS11KmUsdFsxXT1vKk0rbCplLHRbMl09dSpNK3IqZSx0WzNdPWwqTS1vKmUsdH0sZS5yb3RhdGVaPWZ1bmN0aW9uKHQsYSxuKXtuKj0uNTt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdLGU9TWF0aC5zaW4obiksTT1NYXRoLmNvcyhuKTtyZXR1cm4gdFswXT1yKk0rbyplLHRbMV09bypNLXIqZSx0WzJdPXUqTStsKmUsdFszXT1sKk0tdSplLHR9LGUuY2FsY3VsYXRlVz1mdW5jdGlvbih0LGEpe3ZhciBuPWFbMF0scj1hWzFdLG89YVsyXTtyZXR1cm4gdFswXT1uLHRbMV09cix0WzJdPW8sdFszXT1NYXRoLnNxcnQoTWF0aC5hYnMoMS1uKm4tcipyLW8qbykpLHR9LGUuZG90PWwuZG90LGUubGVycD1sLmxlcnAsZS5zbGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbyx1LGwsZSxNLHM9YVswXSxpPWFbMV0sYz1hWzJdLGg9YVszXSxTPW5bMF0sST1uWzFdLGY9blsyXSx4PW5bM107cmV0dXJuIHU9cypTK2kqSStjKmYraCp4LDA+dSYmKHU9LXUsUz0tUyxJPS1JLGY9LWYseD0teCksMS11PjFlLTY/KG89TWF0aC5hY29zKHUpLGw9TWF0aC5zaW4obyksZT1NYXRoLnNpbigoMS1yKSpvKS9sLE09TWF0aC5zaW4ocipvKS9sKTooZT0xLXIsTT1yKSx0WzBdPWUqcytNKlMsdFsxXT1lKmkrTSpJLHRbMl09ZSpjK00qZix0WzNdPWUqaCtNKngsdH0sZS5zcWxlcnA9ZnVuY3Rpb24oKXt2YXIgdD1lLmNyZWF0ZSgpLGE9ZS5jcmVhdGUoKTtyZXR1cm4gZnVuY3Rpb24obixyLG8sdSxsLE0pe3JldHVybiBlLnNsZXJwKHQscixsLE0pLGUuc2xlcnAoYSxvLHUsTSksZS5zbGVycChuLHQsYSwyKk0qKDEtTSkpLG59fSgpLGUuaW52ZXJ0PWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1hWzJdLHU9YVszXSxsPW4qbityKnIrbypvK3UqdSxlPWw/MS9sOjA7cmV0dXJuIHRbMF09LW4qZSx0WzFdPS1yKmUsdFsyXT0tbyplLHRbM109dSplLHR9LGUuY29uanVnYXRlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09LWFbMF0sdFsxXT0tYVsxXSx0WzJdPS1hWzJdLHRbM109YVszXSx0fSxlLmxlbmd0aD1sLmxlbmd0aCxlLmxlbj1lLmxlbmd0aCxlLnNxdWFyZWRMZW5ndGg9bC5zcXVhcmVkTGVuZ3RoLGUuc3FyTGVuPWUuc3F1YXJlZExlbmd0aCxlLm5vcm1hbGl6ZT1sLm5vcm1hbGl6ZSxlLmZyb21NYXQzPWZ1bmN0aW9uKHQsYSl7dmFyIG4scj1hWzBdK2FbNF0rYVs4XTtpZihyPjApbj1NYXRoLnNxcnQocisxKSx0WzNdPS41Km4sbj0uNS9uLHRbMF09KGFbNV0tYVs3XSkqbix0WzFdPShhWzZdLWFbMl0pKm4sdFsyXT0oYVsxXS1hWzNdKSpuO2Vsc2V7dmFyIG89MDthWzRdPmFbMF0mJihvPTEpLGFbOF0+YVszKm8rb10mJihvPTIpO3ZhciB1PShvKzEpJTMsbD0obysyKSUzO249TWF0aC5zcXJ0KGFbMypvK29dLWFbMyp1K3VdLWFbMypsK2xdKzEpLHRbb109LjUqbixuPS41L24sdFszXT0oYVszKnUrbF0tYVszKmwrdV0pKm4sdFt1XT0oYVszKnUrb10rYVszKm8rdV0pKm4sdFtsXT0oYVszKmwrb10rYVszKm8rbF0pKm59cmV0dXJuIHR9LGUuc3RyPWZ1bmN0aW9uKHQpe3JldHVyblwicXVhdChcIit0WzBdK1wiLCBcIit0WzFdK1wiLCBcIit0WzJdK1wiLCBcIit0WzNdK1wiKVwifSxlLmV4YWN0RXF1YWxzPWwuZXhhY3RFcXVhbHMsZS5lcXVhbHM9bC5lcXVhbHMsdC5leHBvcnRzPWV9LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDMpO3JldHVybiB0WzBdPTAsdFsxXT0wLHRbMl09MCx0fSxvLmNsb25lPWZ1bmN0aW9uKHQpe3ZhciBhPW5ldyByLkFSUkFZX1RZUEUoMyk7cmV0dXJuIGFbMF09dFswXSxhWzFdPXRbMV0sYVsyXT10WzJdLGF9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbil7dmFyIG89bmV3IHIuQVJSQVlfVFlQRSgzKTtyZXR1cm4gb1swXT10LG9bMV09YSxvWzJdPW4sb30sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHR9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuLHIpe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0fSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHRbMl09YVsyXStuWzJdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0WzJdPWFbMl0tblsyXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qblswXSx0WzFdPWFbMV0qblsxXSx0WzJdPWFbMl0qblsyXSx0fSxvLm11bD1vLm11bHRpcGx5LG8uZGl2aWRlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdL25bMF0sdFsxXT1hWzFdL25bMV0sdFsyXT1hWzJdL25bMl0sdH0sby5kaXY9by5kaXZpZGUsby5jZWlsPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5jZWlsKGFbMF0pLHRbMV09TWF0aC5jZWlsKGFbMV0pLHRbMl09TWF0aC5jZWlsKGFbMl0pLHR9LG8uZmxvb3I9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmZsb29yKGFbMF0pLHRbMV09TWF0aC5mbG9vcihhWzFdKSx0WzJdPU1hdGguZmxvb3IoYVsyXSksdH0sby5taW49ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWluKGFbMF0sblswXSksdFsxXT1NYXRoLm1pbihhWzFdLG5bMV0pLHRbMl09TWF0aC5taW4oYVsyXSxuWzJdKSx0fSxvLm1heD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5tYXgoYVswXSxuWzBdKSx0WzFdPU1hdGgubWF4KGFbMV0sblsxXSksdFsyXT1NYXRoLm1heChhWzJdLG5bMl0pLHR9LG8ucm91bmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLnJvdW5kKGFbMF0pLHRbMV09TWF0aC5yb3VuZChhWzFdKSx0WzJdPU1hdGgucm91bmQoYVsyXSksdH0sby5zY2FsZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXSpuLHRbMV09YVsxXSpuLHRbMl09YVsyXSpuLHR9LG8uc2NhbGVBbmRBZGQ9ZnVuY3Rpb24odCxhLG4scil7cmV0dXJuIHRbMF09YVswXStuWzBdKnIsdFsxXT1hWzFdK25bMV0qcix0WzJdPWFbMl0rblsyXSpyLHR9LG8uZGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl07cmV0dXJuIE1hdGguc3FydChuKm4rcipyK28qbyl9LG8uZGlzdD1vLmRpc3RhbmNlLG8uc3F1YXJlZERpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdO3JldHVybiBuKm4rcipyK28qb30sby5zcXJEaXN0PW8uc3F1YXJlZERpc3RhbmNlLG8ubGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXTtyZXR1cm4gTWF0aC5zcXJ0KGEqYStuKm4rcipyKX0sby5sZW49by5sZW5ndGgsby5zcXVhcmVkTGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXTtyZXR1cm4gYSphK24qbityKnJ9LG8uc3FyTGVuPW8uc3F1YXJlZExlbmd0aCxvLm5lZ2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdFsyXT0tYVsyXSx0fSxvLmludmVyc2U9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xL2FbMF0sdFsxXT0xL2FbMV0sdFsyXT0xL2FbMl0sdH0sby5ub3JtYWxpemU9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1uKm4rcipyK28qbztyZXR1cm4gdT4wJiYodT0xL01hdGguc3FydCh1KSx0WzBdPWFbMF0qdSx0WzFdPWFbMV0qdSx0WzJdPWFbMl0qdSksdH0sby5kb3Q9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXSphWzBdK3RbMV0qYVsxXSt0WzJdKmFbMl19LG8uY3Jvc3M9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bMF0sZT1uWzFdLE09blsyXTtyZXR1cm4gdFswXT1vKk0tdSplLHRbMV09dSpsLXIqTSx0WzJdPXIqZS1vKmwsdH0sby5sZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdLGw9YVsyXTtyZXR1cm4gdFswXT1vK3IqKG5bMF0tbyksdFsxXT11K3IqKG5bMV0tdSksdFsyXT1sK3IqKG5bMl0tbCksdH0sby5oZXJtaXRlPWZ1bmN0aW9uKHQsYSxuLHIsbyx1KXt2YXIgbD11KnUsZT1sKigyKnUtMykrMSxNPWwqKHUtMikrdSxzPWwqKHUtMSksaT1sKigzLTIqdSk7cmV0dXJuIHRbMF09YVswXSplK25bMF0qTStyWzBdKnMrb1swXSppLHRbMV09YVsxXSplK25bMV0qTStyWzFdKnMrb1sxXSppLHRbMl09YVsyXSplK25bMl0qTStyWzJdKnMrb1syXSppLHR9LG8uYmV6aWVyPWZ1bmN0aW9uKHQsYSxuLHIsbyx1KXt2YXIgbD0xLXUsZT1sKmwsTT11KnUscz1lKmwsaT0zKnUqZSxjPTMqTSpsLGg9TSp1O3JldHVybiB0WzBdPWFbMF0qcytuWzBdKmkrclswXSpjK29bMF0qaCx0WzFdPWFbMV0qcytuWzFdKmkrclsxXSpjK29bMV0qaCx0WzJdPWFbMl0qcytuWzJdKmkrclsyXSpjK29bMl0qaCx0fSxvLnJhbmRvbT1mdW5jdGlvbih0LGEpe2E9YXx8MTt2YXIgbj0yKnIuUkFORE9NKCkqTWF0aC5QSSxvPTIqci5SQU5ET00oKS0xLHU9TWF0aC5zcXJ0KDEtbypvKSphO3JldHVybiB0WzBdPU1hdGguY29zKG4pKnUsdFsxXT1NYXRoLnNpbihuKSp1LHRbMl09byphLHR9LG8udHJhbnNmb3JtTWF0ND1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdLGw9blszXSpyK25bN10qbytuWzExXSp1K25bMTVdO3JldHVybiBsPWx8fDEsdFswXT0oblswXSpyK25bNF0qbytuWzhdKnUrblsxMl0pL2wsdFsxXT0oblsxXSpyK25bNV0qbytuWzldKnUrblsxM10pL2wsdFsyXT0oblsyXSpyK25bNl0qbytuWzEwXSp1K25bMTRdKS9sLHR9LG8udHJhbnNmb3JtTWF0Mz1mdW5jdGlvbih0LGEsbil7dmFyIHI9YVswXSxvPWFbMV0sdT1hWzJdO3JldHVybiB0WzBdPXIqblswXStvKm5bM10rdSpuWzZdLHRbMV09cipuWzFdK28qbls0XSt1Km5bN10sdFsyXT1yKm5bMl0rbypuWzVdK3Uqbls4XSx0fSxvLnRyYW5zZm9ybVF1YXQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bMF0sZT1uWzFdLE09blsyXSxzPW5bM10saT1zKnIrZSp1LU0qbyxjPXMqbytNKnItbCp1LGg9cyp1K2wqby1lKnIsUz0tbCpyLWUqby1NKnU7cmV0dXJuIHRbMF09aSpzK1MqLWwrYyotTS1oKi1lLHRbMV09YypzK1MqLWUraCotbC1pKi1NLHRbMl09aCpzK1MqLU0raSotZS1jKi1sLHR9LG8ucm90YXRlWD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1bXSx1PVtdO3JldHVybiBvWzBdPWFbMF0tblswXSxvWzFdPWFbMV0tblsxXSxvWzJdPWFbMl0tblsyXSx1WzBdPW9bMF0sdVsxXT1vWzFdKk1hdGguY29zKHIpLW9bMl0qTWF0aC5zaW4ociksdVsyXT1vWzFdKk1hdGguc2luKHIpK29bMl0qTWF0aC5jb3MociksdFswXT11WzBdK25bMF0sdFsxXT11WzFdK25bMV0sdFsyXT11WzJdK25bMl0sdH0sby5yb3RhdGVZPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPVtdLHU9W107cmV0dXJuIG9bMF09YVswXS1uWzBdLG9bMV09YVsxXS1uWzFdLG9bMl09YVsyXS1uWzJdLHVbMF09b1syXSpNYXRoLnNpbihyKStvWzBdKk1hdGguY29zKHIpLHVbMV09b1sxXSx1WzJdPW9bMl0qTWF0aC5jb3Mociktb1swXSpNYXRoLnNpbihyKSx0WzBdPXVbMF0rblswXSx0WzFdPXVbMV0rblsxXSx0WzJdPXVbMl0rblsyXSx0fSxvLnJvdGF0ZVo9ZnVuY3Rpb24odCxhLG4scil7dmFyIG89W10sdT1bXTtyZXR1cm4gb1swXT1hWzBdLW5bMF0sb1sxXT1hWzFdLW5bMV0sb1syXT1hWzJdLW5bMl0sdVswXT1vWzBdKk1hdGguY29zKHIpLW9bMV0qTWF0aC5zaW4ociksdVsxXT1vWzBdKk1hdGguc2luKHIpK29bMV0qTWF0aC5jb3MociksdVsyXT1vWzJdLHRbMF09dVswXStuWzBdLHRbMV09dVsxXStuWzFdLHRbMl09dVsyXStuWzJdLHR9LG8uZm9yRWFjaD1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8sdSxsKXt2YXIgZSxNO2ZvcihufHwobj0zKSxyfHwocj0wKSxNPW8/TWF0aC5taW4obypuK3IsYS5sZW5ndGgpOmEubGVuZ3RoLGU9cjtNPmU7ZSs9bil0WzBdPWFbZV0sdFsxXT1hW2UrMV0sdFsyXT1hW2UrMl0sdSh0LHQsbCksYVtlXT10WzBdLGFbZSsxXT10WzFdLGFbZSsyXT10WzJdO3JldHVybiBhfX0oKSxvLmFuZ2xlPWZ1bmN0aW9uKHQsYSl7dmFyIG49by5mcm9tVmFsdWVzKHRbMF0sdFsxXSx0WzJdKSxyPW8uZnJvbVZhbHVlcyhhWzBdLGFbMV0sYVsyXSk7by5ub3JtYWxpemUobixuKSxvLm5vcm1hbGl6ZShyLHIpO3ZhciB1PW8uZG90KG4scik7cmV0dXJuIHU+MT8wOk1hdGguYWNvcyh1KX0sby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJ2ZWMzKFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIpXCJ9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXX0sby5lcXVhbHM9ZnVuY3Rpb24odCxhKXt2YXIgbj10WzBdLG89dFsxXSx1PXRbMl0sbD1hWzBdLGU9YVsxXSxNPWFbMl07cmV0dXJuIE1hdGguYWJzKG4tbCk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGwpKSYmTWF0aC5hYnMoby1lKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoZSkpJiZNYXRoLmFicyh1LU0pPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhNKSl9LHQuZXhwb3J0cz1vfSxmdW5jdGlvbih0LGEsbil7dmFyIHI9bigxKSxvPXt9O28uY3JlYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gdFswXT0wLHRbMV09MCx0WzJdPTAsdFszXT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSg0KTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhWzJdPXRbMl0sYVszXT10WzNdLGF9LG8uZnJvbVZhbHVlcz1mdW5jdGlvbih0LGEsbixvKXt2YXIgdT1uZXcgci5BUlJBWV9UWVBFKDQpO3JldHVybiB1WzBdPXQsdVsxXT1hLHVbMl09bix1WzNdPW8sdX0sby5jb3B5PWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09YVswXSx0WzFdPWFbMV0sdFsyXT1hWzJdLHRbM109YVszXSx0fSxvLnNldD1mdW5jdGlvbih0LGEsbixyLG8pe3JldHVybiB0WzBdPWEsdFsxXT1uLHRbMl09cix0WzNdPW8sdH0sby5hZGQ9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0rblswXSx0WzFdPWFbMV0rblsxXSx0WzJdPWFbMl0rblsyXSx0WzNdPWFbM10rblszXSx0fSxvLnN1YnRyYWN0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdLW5bMF0sdFsxXT1hWzFdLW5bMV0sdFsyXT1hWzJdLW5bMl0sdFszXT1hWzNdLW5bM10sdH0sby5zdWI9by5zdWJ0cmFjdCxvLm11bHRpcGx5PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm5bMF0sdFsxXT1hWzFdKm5bMV0sdFsyXT1hWzJdKm5bMl0sdFszXT1hWzNdKm5bM10sdH0sby5tdWw9by5tdWx0aXBseSxvLmRpdmlkZT1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXS9uWzBdLHRbMV09YVsxXS9uWzFdLHRbMl09YVsyXS9uWzJdLHRbM109YVszXS9uWzNdLHR9LG8uZGl2PW8uZGl2aWRlLG8uY2VpbD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPU1hdGguY2VpbChhWzBdKSx0WzFdPU1hdGguY2VpbChhWzFdKSx0WzJdPU1hdGguY2VpbChhWzJdKSx0WzNdPU1hdGguY2VpbChhWzNdKSx0fSxvLmZsb29yPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5mbG9vcihhWzBdKSx0WzFdPU1hdGguZmxvb3IoYVsxXSksdFsyXT1NYXRoLmZsb29yKGFbMl0pLHRbM109TWF0aC5mbG9vcihhWzNdKSx0fSxvLm1pbj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5taW4oYVswXSxuWzBdKSx0WzFdPU1hdGgubWluKGFbMV0sblsxXSksdFsyXT1NYXRoLm1pbihhWzJdLG5bMl0pLHRbM109TWF0aC5taW4oYVszXSxuWzNdKSx0fSxvLm1heD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5tYXgoYVswXSxuWzBdKSx0WzFdPU1hdGgubWF4KGFbMV0sblsxXSksdFsyXT1NYXRoLm1heChhWzJdLG5bMl0pLHRbM109TWF0aC5tYXgoYVszXSxuWzNdKSx0fSxvLnJvdW5kPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5yb3VuZChhWzBdKSx0WzFdPU1hdGgucm91bmQoYVsxXSksdFsyXT1NYXRoLnJvdW5kKGFbMl0pLHRbM109TWF0aC5yb3VuZChhWzNdKSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdFsyXT1hWzJdKm4sdFszXT1hWzNdKm4sdH0sby5zY2FsZUFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHRbMl09YVsyXStuWzJdKnIsdFszXT1hWzNdK25bM10qcix0fSxvLmRpc3RhbmNlPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXS10WzBdLHI9YVsxXS10WzFdLG89YVsyXS10WzJdLHU9YVszXS10WzNdO3JldHVybiBNYXRoLnNxcnQobipuK3IqcitvKm8rdSp1KX0sby5kaXN0PW8uZGlzdGFuY2Usby5zcXVhcmVkRGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV0sbz1hWzJdLXRbMl0sdT1hWzNdLXRbM107cmV0dXJuIG4qbityKnIrbypvK3UqdX0sby5zcXJEaXN0PW8uc3F1YXJlZERpc3RhbmNlLG8ubGVuZ3RoPWZ1bmN0aW9uKHQpe3ZhciBhPXRbMF0sbj10WzFdLHI9dFsyXSxvPXRbM107cmV0dXJuIE1hdGguc3FydChhKmErbipuK3IqcitvKm8pfSxvLmxlbj1vLmxlbmd0aCxvLnNxdWFyZWRMZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV0scj10WzJdLG89dFszXTtyZXR1cm4gYSphK24qbityKnIrbypvfSxvLnNxckxlbj1vLnNxdWFyZWRMZW5ndGgsby5uZWdhdGU9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0tYVswXSx0WzFdPS1hWzFdLHRbMl09LWFbMl0sdFszXT0tYVszXSx0fSxvLmludmVyc2U9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT0xL2FbMF0sdFsxXT0xL2FbMV0sdFsyXT0xL2FbMl0sdFszXT0xL2FbM10sdH0sby5ub3JtYWxpemU9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLHI9YVsxXSxvPWFbMl0sdT1hWzNdLGw9bipuK3IqcitvKm8rdSp1O3JldHVybiBsPjAmJihsPTEvTWF0aC5zcXJ0KGwpLHRbMF09bipsLHRbMV09cipsLHRbMl09bypsLHRbM109dSpsKSx0fSxvLmRvdD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdKmFbMF0rdFsxXSphWzFdK3RbMl0qYVsyXSt0WzNdKmFbM119LG8ubGVycD1mdW5jdGlvbih0LGEsbixyKXt2YXIgbz1hWzBdLHU9YVsxXSxsPWFbMl0sZT1hWzNdO3JldHVybiB0WzBdPW8rciooblswXS1vKSx0WzFdPXUrciooblsxXS11KSx0WzJdPWwrciooblsyXS1sKSx0WzNdPWUrciooblszXS1lKSx0fSxvLnJhbmRvbT1mdW5jdGlvbih0LGEpe3JldHVybiBhPWF8fDEsdFswXT1yLlJBTkRPTSgpLHRbMV09ci5SQU5ET00oKSx0WzJdPXIuUkFORE9NKCksdFszXT1yLlJBTkRPTSgpLG8ubm9ybWFsaXplKHQsdCksby5zY2FsZSh0LHQsYSksdH0sby50cmFuc2Zvcm1NYXQ0PWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdLG89YVsxXSx1PWFbMl0sbD1hWzNdO3JldHVybiB0WzBdPW5bMF0qcituWzRdKm8rbls4XSp1K25bMTJdKmwsdFsxXT1uWzFdKnIrbls1XSpvK25bOV0qdStuWzEzXSpsLHRbMl09blsyXSpyK25bNl0qbytuWzEwXSp1K25bMTRdKmwsdFszXT1uWzNdKnIrbls3XSpvK25bMTFdKnUrblsxNV0qbCx0fSxvLnRyYW5zZm9ybVF1YXQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdLHU9YVsyXSxsPW5bMF0sZT1uWzFdLE09blsyXSxzPW5bM10saT1zKnIrZSp1LU0qbyxjPXMqbytNKnItbCp1LGg9cyp1K2wqby1lKnIsUz0tbCpyLWUqby1NKnU7cmV0dXJuIHRbMF09aSpzK1MqLWwrYyotTS1oKi1lLHRbMV09YypzK1MqLWUraCotbC1pKi1NLHRbMl09aCpzK1MqLU0raSotZS1jKi1sLHRbM109YVszXSx0fSxvLmZvckVhY2g9ZnVuY3Rpb24oKXt2YXIgdD1vLmNyZWF0ZSgpO3JldHVybiBmdW5jdGlvbihhLG4scixvLHUsbCl7dmFyIGUsTTtmb3Iobnx8KG49NCkscnx8KHI9MCksTT1vP01hdGgubWluKG8qbityLGEubGVuZ3RoKTphLmxlbmd0aCxlPXI7TT5lO2UrPW4pdFswXT1hW2VdLHRbMV09YVtlKzFdLHRbMl09YVtlKzJdLHRbM109YVtlKzNdLHUodCx0LGwpLGFbZV09dFswXSxhW2UrMV09dFsxXSxhW2UrMl09dFsyXSxhW2UrM109dFszXTtyZXR1cm4gYX19KCksby5zdHI9ZnVuY3Rpb24odCl7cmV0dXJuXCJ2ZWM0KFwiK3RbMF0rXCIsIFwiK3RbMV0rXCIsIFwiK3RbMl0rXCIsIFwiK3RbM10rXCIpXCJ9LG8uZXhhY3RFcXVhbHM9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT09PWFbMF0mJnRbMV09PT1hWzFdJiZ0WzJdPT09YVsyXSYmdFszXT09PWFbM119LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT10WzJdLGw9dFszXSxlPWFbMF0sTT1hWzFdLHM9YVsyXSxpPWFbM107cmV0dXJuIE1hdGguYWJzKG4tZSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKG4pLE1hdGguYWJzKGUpKSYmTWF0aC5hYnMoby1NKTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobyksTWF0aC5hYnMoTSkpJiZNYXRoLmFicyh1LXMpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyh1KSxNYXRoLmFicyhzKSkmJk1hdGguYWJzKGwtaSk8PXIuRVBTSUxPTipNYXRoLm1heCgxLE1hdGguYWJzKGwpLE1hdGguYWJzKGkpKX0sdC5leHBvcnRzPW99LGZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1uKDEpLG89e307by5jcmVhdGU9ZnVuY3Rpb24oKXt2YXIgdD1uZXcgci5BUlJBWV9UWVBFKDIpO3JldHVybiB0WzBdPTAsdFsxXT0wLHR9LG8uY2xvbmU9ZnVuY3Rpb24odCl7dmFyIGE9bmV3IHIuQVJSQVlfVFlQRSgyKTtyZXR1cm4gYVswXT10WzBdLGFbMV09dFsxXSxhfSxvLmZyb21WYWx1ZXM9ZnVuY3Rpb24odCxhKXt2YXIgbj1uZXcgci5BUlJBWV9UWVBFKDIpO3JldHVybiBuWzBdPXQsblsxXT1hLG59LG8uY29weT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPWFbMF0sdFsxXT1hWzFdLHR9LG8uc2V0PWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hLHRbMV09bix0fSxvLmFkZD1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09YVswXStuWzBdLHRbMV09YVsxXStuWzFdLHR9LG8uc3VidHJhY3Q9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0tblswXSx0WzFdPWFbMV0tblsxXSx0fSxvLnN1Yj1vLnN1YnRyYWN0LG8ubXVsdGlwbHk9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPWFbMF0qblswXSx0WzFdPWFbMV0qblsxXSx0fSxvLm11bD1vLm11bHRpcGx5LG8uZGl2aWRlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdL25bMF0sdFsxXT1hWzFdL25bMV0sdH0sby5kaXY9by5kaXZpZGUsby5jZWlsPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09TWF0aC5jZWlsKGFbMF0pLHRbMV09TWF0aC5jZWlsKGFbMV0pLHR9LG8uZmxvb3I9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLmZsb29yKGFbMF0pLHRbMV09TWF0aC5mbG9vcihhWzFdKSx0fSxvLm1pbj1mdW5jdGlvbih0LGEsbil7cmV0dXJuIHRbMF09TWF0aC5taW4oYVswXSxuWzBdKSx0WzFdPU1hdGgubWluKGFbMV0sblsxXSksdH0sby5tYXg9ZnVuY3Rpb24odCxhLG4pe3JldHVybiB0WzBdPU1hdGgubWF4KGFbMF0sblswXSksdFsxXT1NYXRoLm1heChhWzFdLG5bMV0pLHR9LG8ucm91bmQ9ZnVuY3Rpb24odCxhKXtyZXR1cm4gdFswXT1NYXRoLnJvdW5kKGFbMF0pLHRbMV09TWF0aC5yb3VuZChhWzFdKSx0fSxvLnNjYWxlPWZ1bmN0aW9uKHQsYSxuKXtyZXR1cm4gdFswXT1hWzBdKm4sdFsxXT1hWzFdKm4sdH0sby5zY2FsZUFuZEFkZD1mdW5jdGlvbih0LGEsbixyKXtyZXR1cm4gdFswXT1hWzBdK25bMF0qcix0WzFdPWFbMV0rblsxXSpyLHR9LG8uZGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV07cmV0dXJuIE1hdGguc3FydChuKm4rcipyKX0sby5kaXN0PW8uZGlzdGFuY2Usby5zcXVhcmVkRGlzdGFuY2U9ZnVuY3Rpb24odCxhKXt2YXIgbj1hWzBdLXRbMF0scj1hWzFdLXRbMV07cmV0dXJuIG4qbityKnJ9LG8uc3FyRGlzdD1vLnNxdWFyZWREaXN0YW5jZSxvLmxlbmd0aD1mdW5jdGlvbih0KXt2YXIgYT10WzBdLG49dFsxXTtyZXR1cm4gTWF0aC5zcXJ0KGEqYStuKm4pfSxvLmxlbj1vLmxlbmd0aCxvLnNxdWFyZWRMZW5ndGg9ZnVuY3Rpb24odCl7dmFyIGE9dFswXSxuPXRbMV07cmV0dXJuIGEqYStuKm59LG8uc3FyTGVuPW8uc3F1YXJlZExlbmd0aCxvLm5lZ2F0ZT1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPS1hWzBdLHRbMV09LWFbMV0sdH0sby5pbnZlcnNlPWZ1bmN0aW9uKHQsYSl7cmV0dXJuIHRbMF09MS9hWzBdLHRbMV09MS9hWzFdLHR9LG8ubm9ybWFsaXplPWZ1bmN0aW9uKHQsYSl7dmFyIG49YVswXSxyPWFbMV0sbz1uKm4rcipyO3JldHVybiBvPjAmJihvPTEvTWF0aC5zcXJ0KG8pLHRbMF09YVswXSpvLHRbMV09YVsxXSpvKSx0fSxvLmRvdD1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdKmFbMF0rdFsxXSphWzFdfSxvLmNyb3NzPWZ1bmN0aW9uKHQsYSxuKXt2YXIgcj1hWzBdKm5bMV0tYVsxXSpuWzBdO3JldHVybiB0WzBdPXRbMV09MCx0WzJdPXIsdH0sby5sZXJwPWZ1bmN0aW9uKHQsYSxuLHIpe3ZhciBvPWFbMF0sdT1hWzFdO3JldHVybiB0WzBdPW8rciooblswXS1vKSx0WzFdPXUrciooblsxXS11KSx0fSxvLnJhbmRvbT1mdW5jdGlvbih0LGEpe2E9YXx8MTt2YXIgbj0yKnIuUkFORE9NKCkqTWF0aC5QSTtyZXR1cm4gdFswXT1NYXRoLmNvcyhuKSphLHRbMV09TWF0aC5zaW4obikqYSx0fSxvLnRyYW5zZm9ybU1hdDI9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzJdKm8sdFsxXT1uWzFdKnIrblszXSpvLHR9LG8udHJhbnNmb3JtTWF0MmQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzJdKm8rbls0XSx0WzFdPW5bMV0qcituWzNdKm8rbls1XSx0fSxvLnRyYW5zZm9ybU1hdDM9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzNdKm8rbls2XSx0WzFdPW5bMV0qcituWzRdKm8rbls3XSx0fSxvLnRyYW5zZm9ybU1hdDQ9ZnVuY3Rpb24odCxhLG4pe3ZhciByPWFbMF0sbz1hWzFdO3JldHVybiB0WzBdPW5bMF0qcituWzRdKm8rblsxMl0sdFsxXT1uWzFdKnIrbls1XSpvK25bMTNdLHR9LG8uZm9yRWFjaD1mdW5jdGlvbigpe3ZhciB0PW8uY3JlYXRlKCk7cmV0dXJuIGZ1bmN0aW9uKGEsbixyLG8sdSxsKXt2YXIgZSxNO2ZvcihufHwobj0yKSxyfHwocj0wKSxNPW8/TWF0aC5taW4obypuK3IsYS5sZW5ndGgpOmEubGVuZ3RoLGU9cjtNPmU7ZSs9bil0WzBdPWFbZV0sdFsxXT1hW2UrMV0sdSh0LHQsbCksYVtlXT10WzBdLGFbZSsxXT10WzFdO3JldHVybiBhfX0oKSxvLnN0cj1mdW5jdGlvbih0KXtyZXR1cm5cInZlYzIoXCIrdFswXStcIiwgXCIrdFsxXStcIilcIn0sby5leGFjdEVxdWFscz1mdW5jdGlvbih0LGEpe3JldHVybiB0WzBdPT09YVswXSYmdFsxXT09PWFbMV19LG8uZXF1YWxzPWZ1bmN0aW9uKHQsYSl7dmFyIG49dFswXSxvPXRbMV0sdT1hWzBdLGw9YVsxXTtyZXR1cm4gTWF0aC5hYnMobi11KTw9ci5FUFNJTE9OKk1hdGgubWF4KDEsTWF0aC5hYnMobiksTWF0aC5hYnModSkpJiZNYXRoLmFicyhvLWwpPD1yLkVQU0lMT04qTWF0aC5tYXgoMSxNYXRoLmFicyhvKSxNYXRoLmFicyhsKSl9LHQuZXhwb3J0cz1vfV0pfSk7IiwiLyoqXG4gKiBDYW52YXMgUmVuZGVyaW5nIFN1cmZhY2UuXG4gKiBJdCBpcyBhIHRvcCBsZXZlbCBjb21wb25lbnQgdGhhdCBjb21iaW5lcyBpdCBhbGwgdG9nZXRoZXIgYW5kIGhpZGVzIHVubmVjZXNzYXJ5IGRldGFpbHMuXG4gKlxuICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzU3VyZmFjZShjYW52YXMpXG57XG4gICAgaWYgKCAhIChjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Bhc3NlZCBjYW52YXMgaXMgbm90IEhUTUxDYW52YXNFbGVtZW50IScpO1xuICAgIH1cbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLmNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmZhY3RvcnkgPSBuZXcgQ2FudmFzVUlGYWN0b3J5KHRoaXMuY29udGV4dCk7XG4gICAgdGhpcy5lbGVtZW50cyA9IG5ldyBVSUNvbGxlY3Rpb24oKTtcbiAgICB0aGlzLmVsZW1lbnRzLmFkZCh0aGlzLmZhY3RvcnkuY3JlYXRlTGFiZWwoKSk7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBuZXcgQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlcih0aGlzKTtcbiAgICB0aGlzLmV2ZW50SGFuZGxlci5iaW5kSHRtbENhbnZhc0V2ZW50cygpO1xuXG4gICAgLyoqXG4gICAgICogVGhpcyBpcyBhIGZsYWcgZm9yIGRldGVjdGluZyBpZiB3ZSBhcmUgZXhwb3J0aW5nXG4gICAgICogcmVzdWx0IGltYWdlIGFzIGZpbmFsIHRleHR1cmUuXG4gICAgICpcbiAgICAgKiBJZiB0aGlzIGlzIHRydWUsIHRoZW4gd2Ugc2hvdWxkbid0IHNob3cgYW55XG4gICAgICogc2VsZWN0aW9uIGJvcmRlcnNcbiAgICAgKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5faXNFeHBvcnRpbmdSZW5kZXIgPSBmYWxzZTtcblxuICAgIHRoaXMuY2xlYXJDb2xvciA9ICcjRkZGRkZGJztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIFVJQ29sbGVjdGlvbiByZWxhdGVkIHRvIHRoZSBzdXJmYWNlLlxuICogXG4gKiBAcmV0dXJucyB7VUlDb2xsZWN0aW9ufVxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5nZXRFbGVtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cztcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBuZXcgbGFiZWwgZWxlbWVudCBpbiB1aSBjb2xsZWN0aW9uIG9mIHRoZSBzdXJmYWNlIGFuZCByZXR1cm5zIGl0LlxuICogXG4gKiBAcmV0dXJucyB7VUlMYWJlbEVsZW1lbnR9XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnB1c2hMYWJlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGFiZWwgPSB0aGlzLmZhY3RvcnkuY3JlYXRlTGFiZWwoKTtcbiAgICB0aGlzLmVsZW1lbnRzLmFkZChsYWJlbCk7XG4gICAgdGhpcy5lbGVtZW50cy5zZWxlY3RMYXN0KCk7XG5cbiAgICB0aGlzLmV2ZW50SGFuZGxlci50cmlnZ2VyU2VsZWN0KGxhYmVsKTtcbiAgICB0aGlzLnJlbmRlcigpO1xuXG4gICAgcmV0dXJuIGxhYmVsO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIG5ldyBpbWFnZSBlbGVtZW50IGluIHVpIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0ge0ltYWdlfSBpbWFnZVxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5wdXNoSW1hZ2UgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICB2YXIgaW1hZ2VFbGVtZW50ID0gdGhpcy5mYWN0b3J5LmNyZWF0ZUltYWdlKGltYWdlKTtcbiAgICB0aGlzLmVsZW1lbnRzLmFkZChpbWFnZUVsZW1lbnQpO1xuICAgIHRoaXMuZWxlbWVudHMuc2VsZWN0TGFzdCgpO1xuXG4gICAgdGhpcy5ldmVudEhhbmRsZXIudHJpZ2dlclNlbGVjdChpbWFnZUVsZW1lbnQpO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICByZXR1cm4gaW1hZ2VFbGVtZW50O1xufTtcblxuLyoqXG4gKiBDbGVhciB0aGUgcmVsYXRlZCBjYW52YXMuXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmNsZWFyQ29sb3I7XG4gICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBjbGVhciBjb2xvclxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuc2V0Q2xlYXJDb2xvciA9IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHRoaXMuY2xlYXJDb2xvciA9IGNvbG9yO1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIGFsbCBvZiB0aGUgZWxlbWVudHMgb24gdGhlIHN1cmZhY2UuXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbmRlckVsZW1lbnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxlY3RlZEluZGV4ID0gdGhpcy5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMuZ2V0KGkpLnJlbmRlcigpO1xuXG4gICAgICAgIGlmIChpID09IHNlbGVjdGVkSW5kZXggJiYgISB0aGlzLl9pc0V4cG9ydGluZ1JlbmRlcikge1xuXG4gICAgICAgICAgICAvLyBXZSBjYWxsIGl0ICdrb3N0eWwnXG4gICAgICAgICAgICAvLyBXZWlyZCB3YXkgdG8gc2V0IGNvbG9yXG4gICAgICAgICAgICB2YXIgY29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICAgICAgICBpZiAodGhpcy5jbGVhckNvbG9yLnRvTG93ZXJDYXNlKCkgPT0gJyNmZmZmZmYnKSB7XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnIzJlNmRhNCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ldyBDYW52YXNVSVNlbGVjdGVkVmlldyh0aGlzLmNvbnRleHQsIHtcbiAgICAgICAgICAgICAgICAvLyBraW5kYSBmZWVscyBsaWtlIGhhcmQgY29kZVxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgICAgICBzaXplOiAxNVxuICAgICAgICAgICAgfSkucmVuZGVyKHRoaXMuZWxlbWVudHMuZ2V0KGkpKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogQ2xlYXJzIHRoZSBzdXJmYWNlIGFuZCByZW5kZXJzIGl0IHdpdGggYWxsIGVsZW1lbnRzLlxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5jbGVhcigpO1xuICAgIHRoaXMucmVuZGVyRWxlbWVudHMoKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGVzIGFuIGltYWdlIGZyb20gZHJhd24gY29udGVudFxuICogQHJldHVybnMge0ltYWdlfVxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS50b0ltYWdlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5faXNFeHBvcnRpbmdSZW5kZXIgPSB0cnVlO1xuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICB2YXIgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5zcmMgPSB0aGlzLmNhbnZhcy50b0RhdGFVUkwoKTtcblxuICAgIHRoaXMuX2lzRXhwb3J0aW5nUmVuZGVyID0gZmFsc2U7XG4gICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIHJldHVybiBpbWFnZTtcbn07XG5cbi8qKlxuICogTW92ZXMgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnQgdG8gdGhlIGJhY2tncm91bmRcbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuc2VsZWN0ZWRUb0JhY2tncm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbGVtZW50cy50b1N0YXJ0KHRoaXMuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpKTtcbn07XG5cbi8qKlxuICogTW92ZXMgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnQgdG8gdGhlIGZvcmVncm91bmRcbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuc2VsZWN0ZWRUb0ZvcmVncm91bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbGVtZW50cy50b0VuZCh0aGlzLmVsZW1lbnRzLmdldFNlbGVjdGVkSW5kZXgoKSk7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgY3VycmVudGx5IHNlbGVjdGVkIGVsZW1lbnRcbiAqXG4gKiBAcmV0dXJuIHtVSUVsZW1lbnR9XG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLnJlbW92ZVNlbGVjdGVkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50cy5yZW1vdmUodGhpcy5lbGVtZW50cy5nZXRTZWxlY3RlZEluZGV4KCkpO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVyLnRyaWdnZXJEZXNlbGVjdCgpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIEFkZHMgbmV3IGV2ZW50IGhhbmRsZXIgb24gc2VsZWN0aW9uIG9mIGFuIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge1VJU2VsZWN0ZWRDYWxsYmFja30gY2FsbGJhY2tcbiAqL1xuQ2FudmFzU3VyZmFjZS5wcm90b3R5cGUuYWRkU2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIuYWRkU2VsZWN0RXZlbnRIYW5kbGVyKGNhbGxiYWNrKTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKi9cbkNhbnZhc1N1cmZhY2UucHJvdG90eXBlLmFkZERlc2VsZWN0RXZlbnRIYW5kbGVyID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5ldmVudEhhbmRsZXIuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIoY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBHZXQgY2FudmFzIGJvdW5kIHJlY3RhbmdsZS5cbiAqIEtpbmRhIHVnbHkgbWV0aG9kLlxuICpcbiAqIEByZXR1cm5zIHt7dG9wOiBudW1iZXIsIHJpZ2h0OiBudW1iZXIsIGJvdHRvbTogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fVxuICovXG5DYW52YXNTdXJmYWNlLnByb3RvdHlwZS5nZXRCb3VuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICByaWdodDogdGhpcy5jYW52YXMud2lkdGgsXG4gICAgICAgIGJvdHRvbTogdGhpcy5jYW52YXMuaGVpZ2h0LFxuICAgICAgICBsZWZ0OiAwXG4gICAgfTtcbn07XG5cbi8qKlxuICogQ2FsbGJhY2sgdHlwZSBmb3Igc2VsZWN0aW5nIGFuZCBlbGVtZW50XG4gKlxuICogQGNhbGxiYWNrIFVJU2VsZWN0ZWRDYWxsYmFja1xuICogQHBhcmFtIHtVSUVsZW1lbnR9XG4gKi8iLCIvKipcbiAqIFRoaXMgY2xhc3MgaXMgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIERPTSBldmVudHMgYW5kIHRyaWdnZXJpbmcgYXBwbGljYXRpb24gZXZlbnRzXG4gKiBLaW5kYSB1Z2x5IGNvZGUgaGVyZVxuICpcbiAqIEBwYXJhbSB7Q2FudmFzU3VyZmFjZX0gc3VyZmFjZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIgKHN1cmZhY2UpXG57XG4gICAgdGhpcy5zdXJmYWNlID0gc3VyZmFjZTtcbiAgICB0aGlzLmlzTW91c2VEb3duID0gZmFsc2U7XG4gICAgdGhpcy5pc01vdmluZ0NsaWNrID0gZmFsc2U7XG4gICAgdGhpcy5pc1Jlc2l6aW5nQ2xpY2sgPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RDbGlja09mZnNldCA9IG51bGw7XG4gICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBudWxsO1xuXG4gICAgdGhpcy5oYW5kbGVycyA9IHtcbiAgICAgICAgb25TZWxlY3Q6IFtdLFxuICAgICAgICBvbkRlc2VsZWN0OiBbXVxuICAgIH1cbn1cblxuLyoqXG4gKiBCaW5kcyBhbGwgZXZlbnQgaGFuZGxlcnMgdG8gdGhlIEhUTUwgY2FudmFzXG4gKiBcbiAqIEBwYXJhbSBlXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmJpbmRIdG1sQ2FudmFzRXZlbnRzID0gZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcykpO1xuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuaGFuZGxlTW91c2VEb3duLmJpbmQodGhpcykpO1xuXG4gICAgLy8gV2UgYmluZGluZyB0aGlzIGV2ZW50IHRvIHRoZSB3aG9sZSBkb2N1bWVudCB0byBzdG9wIG1vdmluZ1xuICAgIC8vIGlmIHVzZXIgdHJpZXMgdG8gZHJhZyBhbiBlbGVtZW50IG91dCBvZiB0aGUgY2FudmFzXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMuaGFuZGxlTW91c2VVcC5iaW5kKHRoaXMpKTtcblxuICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5oYW5kbGVNb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmhhbmRsZU1vdXNlTW92ZS5iaW5kKHRoaXMpKTtcbn07XG5cbi8qKlxuICogVHJpZ2dlcnMgc2VsZWN0IGV2ZW50LlxuICogVGhpcyBtZWFucyB0aGF0IGFsbCBhc3NpZ25lZCBoYW5kbGVycyB3aWxsIGJlIGV4ZWN1dGVkLlxuICpcbiAqIFRPRE86IEFiYW5kb24gSmF2YVNjcmlwdCBhbmQgbGVhcm4gVHlwZVNjcmlwdFxuICpcbiAqIEBwYXJhbSB7VUlFbGVtZW50fSBlbGVtZW50XG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRyaWdnZXJTZWxlY3QgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmhhbmRsZXJzLm9uU2VsZWN0KSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRoaXMuaGFuZGxlcnMub25TZWxlY3Rba2V5XTtcblxuICAgICAgICBpZiAoY2FsbGJhY2sgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgY2FsbGJhY2soZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIFRyaWdnZXJzIGRlc2VsZWN0IGV2ZW50LlxuICogVGhpcyBtZWFucyB0aGF0IGFsbCBhc3NpZ25lZCBoYW5kbGVycyB3aWxsIGJlIGV4ZWN1dGVkLlxuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS50cmlnZ2VyRGVzZWxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdCkge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0aGlzLmhhbmRsZXJzLm9uRGVzZWxlY3Rba2V5XTtcbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIEFkZHMgbmV3IGhhbmRsZXIgb24gZWxlbWVudCBzZWxlY3Rpb24gZXZlbnRcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5hZGRTZWxlY3RFdmVudEhhbmRsZXIgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLmhhbmRsZXJzLm9uU2VsZWN0LnB1c2goY2FsbGJhY2spO1xufTtcblxuLyoqXG4gKiBBZGRzIG5ldyBoYW5kbGVyIG9uIGVsZW1lbnQgZGVzZWxlY3Rpb24gZXZlbnRcbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5DYW52YXNTdXJmYWNlRXZlbnRIYW5kbGVyLnByb3RvdHlwZS5hZGREZXNlbGVjdEV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHRoaXMuaGFuZGxlcnMub25EZXNlbGVjdC5wdXNoKGNhbGxiYWNrKTtcbn07XG5cblxuLyoqXG4gKiBIYW5kbGVyIGZvciB0aGUgbW91c2Vkb3duIGV2ZW50XG4gKlxuICogQHBhcmFtIGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VEb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLmlzTW91c2VEb3duID0gdHJ1ZTtcblxuICAgIC8vIFF1aWNrIGhhY2tcbiAgICBpZiAodHlwZW9mIFRvdWNoRXZlbnQgIT0gXCJ1bmRlZmluZWRcIiAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudCkge1xuICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xuICAgIH1cblxuICAgIHZhciBsb2NhbENvb3JkaW5hdGVzID0gdGhpcy50b0xvY2FsQ29vcmRpbmF0ZXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIHZhciBvbGRTZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnN1cmZhY2UuZ2V0RWxlbWVudHMoKS5nZXRTZWxlY3RlZEluZGV4KCk7XG4gICAgdmFyIG5ld1NlbGVjdGVkSW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZmV0Y2hJbmRleEJ5T2Zmc2V0KGxvY2FsQ29vcmRpbmF0ZXMueCwgbG9jYWxDb29yZGluYXRlcy55KTtcbiAgICB2YXIgbmV3U2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmdldChuZXdTZWxlY3RlZEluZGV4KTtcblxuICAgIHZhciBkb1dlSGF2ZVNvbWV0aGluZ1NlbGVjdGVkID0gbmV3U2VsZWN0ZWRJbmRleCAhPT0gbnVsbDtcbiAgICB2YXIgaXNDdXJyZW50bHlTZWxlY3RlZFdhc1NlbGVjdGVkQmVmb3JlID0gZG9XZUhhdmVTb21ldGhpbmdTZWxlY3RlZCAmJlxuICAgICAgICBvbGRTZWxlY3RlZEVsZW1lbnQgPT0gbmV3U2VsZWN0ZWRJbmRleDtcblxuICAgIGlmICghZG9XZUhhdmVTb21ldGhpbmdTZWxlY3RlZCkge1xuXG4gICAgICAgIC8vIElmIHdlIGhhZCBzb21ldGhpbmcgc2VsZWN0ZWQgYmVmb3JlLFxuICAgICAgICAvLyBpdCBtZWFucyBpdCBpcyB0aW1lIHRvIGNhbGwgZGVzZWxlY3QgaGFuZGxlcnNcbiAgICAgICAgaWYgKG9sZFNlbGVjdGVkRWxlbWVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJEZXNlbGVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdXJmYWNlLmVsZW1lbnRzLmRlc2VsZWN0KCk7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5yZW5kZXIoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFpc0N1cnJlbnRseVNlbGVjdGVkV2FzU2VsZWN0ZWRCZWZvcmUpIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyU2VsZWN0KG5ld1NlbGVjdGVkRWxlbWVudCk7XG4gICAgfVxuXG4gICAgLy8gV2UgcmVtZW1iZXIgaGVyZSB0aGUgbGFzdCBjbGljayBvZmZzZXQgcmVsYXRpdmVseSBzZWxlY3RlZCBlbGVtZW50XG4gICAgdGhpcy5sYXN0Q2xpY2tPZmZzZXQgPSBuZXdTZWxlY3RlZEVsZW1lbnQuZ2V0Q2xpY2tPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xuXG4gICAgLy8gSXMgaXQgYSBjbGljayBzdGFydGluZyByZXNpemUgb3BlcmF0aW9uID9cbiAgICB0aGlzLmlzUmVzaXppbmdDbGljayA9IGlzQ3VycmVudGx5U2VsZWN0ZWRXYXNTZWxlY3RlZEJlZm9yZSAmJlxuICAgICAgICB0aGlzLmlzUmVzaXplUG9zc2libGUobmV3U2VsZWN0ZWRFbGVtZW50LCBsb2NhbENvb3JkaW5hdGVzLngsIGxvY2FsQ29vcmRpbmF0ZXMueSk7XG5cbiAgICBpZiAodGhpcy5pc1Jlc2l6aW5nQ2xpY2spIHtcbiAgICAgICAgdGhpcy5sYXN0UmVzaXplQ29vcmRpbmF0ZXMgPSBsb2NhbENvb3JkaW5hdGVzO1xuICAgICAgICB0aGlzLnNldFJlc2l6YWJsZVN0YXRlKHRydWUpO1xuICAgIH1cbiAgICAvLyBJdCBpcyBhIGNsaWNrIGZvciBtb3ZpbmdcbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5pc01vdmluZ0NsaWNrID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmVsZW1lbnRzLnNlbGVjdChuZXdTZWxlY3RlZEluZGV4KTtcbiAgICAgICAgdGhpcy5zZXRNb3ZhYmxlU3RhdGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xufTtcblxuLyoqXG4gKlxuICogSGFuZGxlciBmb3IgbW91c2UgdXAgZXZlbnRcbiAqXG4gKiBAcGFyYW0ge01vdXNlRXZlbnR9IGVcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaGFuZGxlTW91c2VVcCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdGhpcy5pc01vdXNlRG93biA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZXNpemluZ0NsaWNrID0gZmFsc2U7XG4gICAgdGhpcy5pc01vdmluZ0NsaWNrID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgY29vcmRpbmF0ZXMgdG8gY29vcmRpbmF0ZXMgaW5zaWRlIGNhbnZhc1xuICpcbiAqIEBwYXJhbSBjbGllbnRYXG4gKiBAcGFyYW0gY2xpZW50WVxuICogQHJldHVybnMge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLnRvTG9jYWxDb29yZGluYXRlcyA9IGZ1bmN0aW9uIChjbGllbnRYLCBjbGllbnRZKSB7XG4gICAgdmFyIHZpZXdwb3J0T2Zmc2V0ID0gdGhpcy5zdXJmYWNlLmNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAvLyB0aGVzZSBhcmUgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0LCBpLmUuIHRoZSB3aW5kb3dcbiAgICB2YXIgdG9wID0gdmlld3BvcnRPZmZzZXQudG9wO1xuICAgIHZhciBsZWZ0ID0gdmlld3BvcnRPZmZzZXQubGVmdDtcbiAgICB2YXIgdG9wT2Zmc2V0ID0gY2xpZW50WSAtIHRvcDtcbiAgICB2YXIgbGVmdE9mZnNldCA9IGNsaWVudFggLSBsZWZ0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogbGVmdE9mZnNldCxcbiAgICAgICAgeTogdG9wT2Zmc2V0XG4gICAgfTtcbn07XG5cbi8qKlxuICogSGFuZGxlciBmb3IgbW91c2UgbW92ZSBldmVudFxuICpcbiAqIEBwYXJhbSBlXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlTW92ZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIG9yaWdpbmFsRXZlbnQgPSBlO1xuXG4gICAgLy8gUXVpY2sgaGFja1xuICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgIGUgPSBlLnRvdWNoZXNbMF07XG4gICAgfVxuXG4gICAgdmFyIHNlbGVjdGVkSW5kZXggPSB0aGlzLnN1cmZhY2UuZWxlbWVudHMuZ2V0U2VsZWN0ZWRJbmRleCgpO1xuICAgIHZhciBsb2NhbENvb3JkaW5hdGVzID0gdGhpcy50b0xvY2FsQ29vcmRpbmF0ZXMoZS5jbGllbnRYLCBlLmNsaWVudFkpO1xuICAgIHZhciBlbGVtZW50SG92ZXJJbmRleCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5mZXRjaEluZGV4QnlPZmZzZXQobG9jYWxDb29yZGluYXRlcy54LCBsb2NhbENvb3JkaW5hdGVzLnkpO1xuXG4gICAgLy8gSXQgaXMgc2ltcGxlIG1vdXNlIG1vdmUsXG4gICAgLy8gd2UgaGF2ZSBub3RoaW5nIG1vcmUgdG8gZG8gaGVyZVxuICAgIGlmICghdGhpcy5pc01vdXNlRG93bikge1xuICAgICAgICB0aGlzLmhhbmRsZU1vdXNlTW92ZVdpdGhvdXRNb3VzZURvd24oZWxlbWVudEhvdmVySW5kZXgsIHNlbGVjdGVkSW5kZXgsIGxvY2FsQ29vcmRpbmF0ZXMpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhpcyBpcyBtb3ZpbmcgZW4gZWxlbWVudC5cbiAgICAvLyBNb2JpbGUgZGV2aWNlcyB3aWxsIHRyeSB0byBzY3JvbGwgZG93bixcbiAgICAvLyBhbmQgd2UgZG9uJ3Qgd29udCB0aGF0IGlmIHdlIGFyZSByZXNpemluZ1xuICAgIC8vIG9yIG1vdmluZ1xuICAgIGlmICh0aGlzLmlzTW92aW5nQ2xpY2sgfHwgdGhpcy5pc1Jlc2l6aW5nQ2xpY2spIHtcbiAgICAgICAgb3JpZ2luYWxFdmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuXG4gICAgdmFyIHNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXRTZWxlY3RlZEVsZW1lbnQoKTtcblxuICAgIC8vIElmIHdlIGFyZSBoZXJlLCB0aGVuIHdlIGhhdmUgYnV0dG9uIHByZXNzZWQgYW5kIHdlIG11c3QgcmVzaXplIVxuICAgIGlmICh0aGlzLmlzUmVzaXppbmdDbGljaykge1xuICAgICAgICB2YXIgbmV3U2l6ZURlbHRhID0ge1xuICAgICAgICAgICAgd2lkdGg6IGxvY2FsQ29vcmRpbmF0ZXMueCAtIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzLngsXG4gICAgICAgICAgICBoZWlnaHQ6IGxvY2FsQ29vcmRpbmF0ZXMueSAtIHRoaXMubGFzdFJlc2l6ZUNvb3JkaW5hdGVzLnlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxhc3RSZXNpemVDb29yZGluYXRlcyA9IGxvY2FsQ29vcmRpbmF0ZXM7XG5cbiAgICAgICAgdmFyIHNpemUgPSBzZWxlY3RlZEVsZW1lbnQuZ2V0U2l6ZSgpO1xuICAgICAgICBzaXplLnJlc2l6ZUJ5KG5ld1NpemVEZWx0YS53aWR0aCwgbmV3U2l6ZURlbHRhLmhlaWdodCk7XG4gICAgfVxuICAgIC8vIE5haCwgaXQncyBqdXN0IG1vdmluZ1xuICAgIGVsc2UgaWYgKHRoaXMuaXNNb3ZpbmdDbGljaykge1xuICAgICAgICBzZWxlY3RlZEVsZW1lbnQubW92ZVRvKG5ldyBQb3NpdGlvbihcbiAgICAgICAgICAgIGxvY2FsQ29vcmRpbmF0ZXMueCAtIHRoaXMubGFzdENsaWNrT2Zmc2V0LnRvcCxcbiAgICAgICAgICAgIGxvY2FsQ29vcmRpbmF0ZXMueSAtIHRoaXMubGFzdENsaWNrT2Zmc2V0LmxlZnRcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdXJmYWNlLnJlbmRlcigpO1xufTtcblxuLyoqXG4gKiBBZGRzIG1vdmFibGUgaHRtbCBjbGFzcyB0byB0aGUgY2FudmFzIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIGJvb2xcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuc2V0TW92YWJsZVN0YXRlID0gZnVuY3Rpb24gKGJvb2wpIHtcbiAgICBpZiAoYm9vbCkge1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5hZGQoJ21vdmFibGUnKTtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdyZXNpemFibGUnKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgnbW92YWJsZScpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQWRkcyByZXNpemFibGUgaHRtbCBjbGFzcyB0byB0aGUgY2FudmFzIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtIGJvb2xcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuc2V0UmVzaXphYmxlU3RhdGUgPSBmdW5jdGlvbiAoYm9vbCkge1xuICAgIGlmIChib29sKSB7XG4gICAgICAgIHRoaXMuc3VyZmFjZS5jYW52YXMuY2xhc3NMaXN0LnJlbW92ZSgnbW92YWJsZScpO1xuICAgICAgICB0aGlzLnN1cmZhY2UuY2FudmFzLmNsYXNzTGlzdC5hZGQoJ3Jlc2l6YWJsZScpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zdXJmYWNlLmNhbnZhcy5jbGFzc0xpc3QucmVtb3ZlKCdyZXNpemFibGUnKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZXMgbW91c2UgbW92ZSBldmVudCB3aGVuIG1vdXNlIGJ1dHRvbiBpcyBub3QgcHJlc3NlZFxuICpcbiAqIEBwYXJhbSBlbGVtZW50SG92ZXJJbmRleFxuICogQHBhcmFtIHNlbGVjdGVkSW5kZXhcbiAqIEBwYXJhbSBtb3VzZUNvb3JkaW5hdGVzXG4gKi9cbkNhbnZhc1N1cmZhY2VFdmVudEhhbmRsZXIucHJvdG90eXBlLmhhbmRsZU1vdXNlTW92ZVdpdGhvdXRNb3VzZURvd24gPSBmdW5jdGlvbiAoZWxlbWVudEhvdmVySW5kZXgsIHNlbGVjdGVkSW5kZXgsIG1vdXNlQ29vcmRpbmF0ZXMpIHtcbiAgICBpZiAoZWxlbWVudEhvdmVySW5kZXggPT0gc2VsZWN0ZWRJbmRleCkge1xuICAgICAgICAvLyBXaGF0IHN0YXRlIGlzIGN1cnNvciBpbj9cbiAgICAgICAgdmFyIHJlc2l6ZVN0YXRlID0gdGhpcy5pc1Jlc2l6ZVBvc3NpYmxlKHRoaXMuc3VyZmFjZS5lbGVtZW50cy5nZXRTZWxlY3RlZEVsZW1lbnQoKSwgbW91c2VDb29yZGluYXRlcy54LCBtb3VzZUNvb3JkaW5hdGVzLnkpO1xuICAgICAgICBpZiAocmVzaXplU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UmVzaXphYmxlU3RhdGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldE1vdmFibGVTdGF0ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRNb3ZhYmxlU3RhdGUoZmFsc2UpO1xuICAgICAgICB0aGlzLnNldFJlc2l6YWJsZVN0YXRlKGZhbHNlKTtcbiAgICB9XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHBhc3NlZCBjb29yZGluYXRlcyBhcmUgbG9jYXRlZCBvbiBwb3NpdGlvbiBvZiBkcmFnIGljb24gb2YgYW4gZWxlbWVudFxuICpcbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcGFyYW0geFxuICogQHBhcmFtIHlcbiAqL1xuQ2FudmFzU3VyZmFjZUV2ZW50SGFuZGxlci5wcm90b3R5cGUuaXNSZXNpemVQb3NzaWJsZSA9IGZ1bmN0aW9uKGVsZW1lbnQsIHgsIHkpIHtcbiAgICB2YXIgZHJhZ0ljb25TaXplID0gMjA7XG5cbiAgICB2YXIgdGVtcEVsZW1lbnREYXRhID0ge1xuICAgICAgICBwb3NpdGlvbjogbmV3IFBvc2l0aW9uKFxuICAgICAgICAgICAgZWxlbWVudC5nZXRQb3NpdGlvbigpLmdldFgoKSArIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCkgLSBkcmFnSWNvblNpemUsXG4gICAgICAgICAgICBlbGVtZW50LmdldFBvc2l0aW9uKCkuZ2V0WSgpICsgZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCkgLSBkcmFnSWNvblNpemVcbiAgICAgICAgKSxcbiAgICAgICAgc2l6ZTogbmV3IFNpemUoZHJhZ0ljb25TaXplLCBkcmFnSWNvblNpemUpXG4gICAgfTtcblxuICAgIHZhciB0ZW1wRWxlbWVudCA9IG5ldyBVSUVsZW1lbnQodGVtcEVsZW1lbnREYXRhLnBvc2l0aW9uLCB0ZW1wRWxlbWVudERhdGEuc2l6ZSk7XG4gICAgcmV0dXJuIHRlbXBFbGVtZW50LmlzT2Zmc2V0SW4oeCwgeSk7XG59OyIsIi8qKlxuICpcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlFbGVtZW50Vmlldyhjb250ZXh0KSB7XG4gICAgaWYgKCAhIChjb250ZXh0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW52YXMgVUkgRWxlbWVudCBWaWV3IGVycm9yISBDb250ZXh0IGlzIG5vdCBhIGNvbnRleHQnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfVxuICAgICAqL1xuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG59XG5cbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XG5cbkNhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG5cbn07IiwiLyoqXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSUZhY3RvcnkoY29udGV4dClcbntcbiAgICBpZiAoICEgKGNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyByZW5kZXJpbmcgY29udGV4dCBtdXN0IGJlIGluc3RhbmNlIG9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCEgKGZhY3RvcnkgY3JlYXRpbmcpJyk7XG4gICAgfVxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGxhYmVsIGVsZW1lbnQsIHdoaWNoIGlzIHJlYWR5IHRvIGJlIHJlbmRlcmVkIG9uIHRoZSBjYW52YXNcbiAqXG4gKiBAcmV0dXJucyB7VUlMYWJlbEVsZW1lbnR9XG4gKi9cbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlTGFiZWwgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgbGFiZWwgPSBuZXcgVUlMYWJlbEVsZW1lbnQobmV3IFBvc2l0aW9uKDAsIDUwKSk7XG4gICAgbGFiZWwuc2V0VmlldyhuZXcgQ2FudmFzVUlMYWJlbFZpZXcodGhpcy5jb250ZXh0KSk7XG5cbiAgICByZXR1cm4gbGFiZWw7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gaW1hZ2UgZWxlbWVudCwgd2hpY2ggaXMgcmVhZHkgdG8gYmUgcmVuZGVyZWQgb24gdGhlIGNhbnZhc1xuICpcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXG4gKi9cbkNhbnZhc1VJRmFjdG9yeS5wcm90b3R5cGUuY3JlYXRlSW1hZ2UgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICB2YXIgaW1hZ2VFbGVtZW50ID0gbmV3IFVJSW1hZ2VFbGVtZW50KG51bGwsIG51bGwsIGltYWdlKTtcbiAgICBpbWFnZUVsZW1lbnQuc2V0VmlldyhuZXcgQ2FudmFzVUlJbWFnZVZpZXcodGhpcy5jb250ZXh0KSk7XG5cbiAgICByZXR1cm4gaW1hZ2VFbGVtZW50O1xufTsiLCIvKipcbiAqIFZpZXcgb2YgYW4gaW1hZ2UgZWxlbWVudCBvbiB0aGUgY2FudmFzXG4gKlxuICogQHBhcmFtIHtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR9IGNvbnRleHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBDYW52YXNVSUltYWdlVmlldyhjb250ZXh0KSB7XG4gICAgQ2FudmFzVUlFbGVtZW50Vmlldy5jYWxsKHRoaXMsIGNvbnRleHQpO1xufVxuXG5DYW52YXNVSUltYWdlVmlldy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKENhbnZhc1VJRWxlbWVudFZpZXcucHJvdG90eXBlKTtcblxuLyoqXG4gKiBSZW5kZXJzIGFuIGltYWdlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge1VJSW1hZ2VFbGVtZW50fSB1aUltYWdlRWxlbWVudFxuICovXG5DYW52YXNVSUltYWdlVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHVpSW1hZ2VFbGVtZW50KSB7XG4gICAgdmFyIHBvcyA9IHVpSW1hZ2VFbGVtZW50LmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIHNpemUgPSB1aUltYWdlRWxlbWVudC5nZXRTaXplKCk7XG5cbiAgICB0aGlzLmNvbnRleHQuZHJhd0ltYWdlKFxuICAgICAgICB1aUltYWdlRWxlbWVudC5nZXRJbWFnZSgpLFxuICAgICAgICBwb3MuZ2V0WCgpLFxuICAgICAgICBwb3MuZ2V0WSgpLFxuICAgICAgICBzaXplLmdldFdpZHRoKCksXG4gICAgICAgIHNpemUuZ2V0SGVpZ2h0KClcbiAgICApO1xufTsiLCIvKipcbiAqXG4gKiBAcGFyYW0ge0NhbnZhc1JlbmRlcmluZ0NvbnRleHQyRH0gY29udGV4dFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENhbnZhc1VJTGFiZWxWaWV3KGNvbnRleHQpIHtcbiAgICBDYW52YXNVSUVsZW1lbnRWaWV3LmNhbGwodGhpcywgY29udGV4dCk7XG59XG5cbkNhbnZhc1VJTGFiZWxWaWV3LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoQ2FudmFzVUlFbGVtZW50Vmlldy5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFJlbmRlcnMgdGV4dCBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtVSUxhYmVsRWxlbWVudH0gZWxlbWVudFxuICovXG5DYW52YXNVSUxhYmVsVmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAvLyBPdXIgdGV4dCBzaXplIGZpdHMgYm91bmRzXG4gICAgdmFyIGZvbnRTaXplID0gZWxlbWVudC5nZXRTaXplKCkuZ2V0SGVpZ2h0KCk7XG5cbiAgICB0aGlzLmNvbnRleHQuZm9udCA9IGZvbnRTaXplICsgXCJweCBcIiArIGVsZW1lbnQuZ2V0Rm9udCgpO1xuICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBlbGVtZW50LmdldENvbG9yKCk7XG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdoYW5naW5nJztcblxuICAgIHRoaXMuY29udGV4dC5maWxsVGV4dChcbiAgICAgICAgZWxlbWVudC5nZXRUZXh0KCksXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCksXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCksXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKClcbiAgICApO1xufTsiLCIvKipcbiAqIEJhc2UgdmlldyBmb3Igc2VsZWN0ZWQgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfSBjb250ZXh0XG4gKiBAcGFyYW0ge3tjb2xvcjogc3RyaW5nfSwge3NpemU6IGludH19IHN0eWxlIC0gaWNvbiBzaXplIGFuZCBoZXggY29sb3Igc3RyaW5nXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FudmFzVUlTZWxlY3RlZFZpZXcoY29udGV4dCwgc3R5bGUpIHtcbiAgICBpZiAoICEgKGNvbnRleHQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0NhbnZhcyBVSSBFbGVtZW50IFZpZXcgZXJyb3IhIENvbnRleHQgZG9lcyBub3QgaGF2ZSB0eXBlIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCEnKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgIHRoaXMuZmlsbFN0eWxlID0gc3R5bGUuY29sb3IgfHwgJyNBQUFBQUEnO1xuICAgIHRoaXMucmVzaXplSWNvbldpZHRoID0gc3R5bGUuc2l6ZSB8fCAxNTtcbn1cblxuQ2FudmFzVUlTZWxlY3RlZFZpZXcucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShDYW52YXNVSUVsZW1lbnRWaWV3LnByb3RvdHlwZSk7XG5cbkNhbnZhc1VJU2VsZWN0ZWRWaWV3LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuXG4gICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLnJlc2l6ZUljb25XaWR0aCArIFwicHggQXJpYWxcIjtcbiAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5maWxsU3R5bGU7XG4gICAgdGhpcy5jb250ZXh0LnRleHRCYXNlbGluZSA9ICdib3R0b20nO1xuXG4gICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFxuICAgICAgICBDYW52YXNVSVNlbGVjdGVkVmlldy5SZXNpemVTeW1ib2wsXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRXaWR0aCgpIC0gdGhpcy5yZXNpemVJY29uV2lkdGgsXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCkgKyBlbGVtZW50LmdldFNpemUoKS5nZXRIZWlnaHQoKSxcbiAgICAgICAgdGhpcy5yZXNpemVJY29uV2lkdGhcbiAgICApO1xuXG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gdGhpcy5maWxsU3R5bGU7XG4gICAgdGhpcy5jb250ZXh0LnN0cm9rZVJlY3QoXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRYKCksXG4gICAgICAgIGVsZW1lbnQuZ2V0UG9zaXRpb24oKS5nZXRZKCksXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldFdpZHRoKCksXG4gICAgICAgIGVsZW1lbnQuZ2V0U2l6ZSgpLmdldEhlaWdodCgpXG4gICAgKTtcbn07XG5cbi8qKlxuICogQGNvbnN0IOKHmFxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuQ2FudmFzVUlTZWxlY3RlZFZpZXcuUmVzaXplU3ltYm9sID0gJ1xcdTIxZjInOyIsIi8qKlxuICogUG9zaXRpb24gaW4gMkQgc3BhY2VcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0geFxuICogQHBhcmFtIHtudW1iZXJ9IHlcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBQb3NpdGlvbih4LCB5KSB7XG4gICAgdGhpcy54ID0gK3ggfHwgMDtcbiAgICB0aGlzLnkgPSAreSB8fCAwO1xufVxuXG4vKipcbiAqXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5Qb3NpdGlvbi5wcm90b3R5cGUuZ2V0WCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLng7XG59O1xuXG4vKipcbiAqXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5Qb3NpdGlvbi5wcm90b3R5cGUuZ2V0WSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnk7XG59O1xuXG4vKipcbiAqIENoYW5nZXMgcG9zaXRpb25zIG9mIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVhcbiAqIEBwYXJhbSB7bnVtYmVyfSBkZWx0YVlcbiAqIEByZXR1cm4gUG9zaXRpb25cbiAqL1xuUG9zaXRpb24ucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbihkZWx0YVgsIGRlbHRhWSkge1xuICAgIHZhciBuZXdYUG9zID0gdGhpcy54ICsgZGVsdGFYO1xuICAgIHZhciBuZXdZUG9zID0gdGhpcy55ICsgZGVsdGFZO1xuXG4gICAgcmV0dXJuIG5ldyBQb3NpdGlvbihuZXdYUG9zLCBuZXdZUG9zKTtcbn07IiwiLyoqXG4gKiBUaGlzIG9iamVjdCBpcyBvbmx5IHB1cnBvc2VkIGZvciBsb2FkaW5nIGV4dGVybmFsIHJlc291cmNlc1xuICogVGhpcyBpcyBzdXBwb3NlZCB0byBiZSBhbiBvYmplY3QgZHVyaW5nIHRlc3RpbmcgcHVycG9zZXNcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUmVzb3VyY2VMb2FkZXIoKSB7XG4gICAgXG59XG5cblxuLyoqXG4gKiBMb2FkcyBpbWFnZSB0aGVuIGNhbGxzIGEgZnVuY3Rpb24uXG4gKiBUaGF0IHNpbXBsZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3JjXG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqL1xuUmVzb3VyY2VMb2FkZXIucHJvdG90eXBlLmxvYWRJbWFnZSA9IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuXG4gICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgaW1nLm9ubG9hZCA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIGltZy5zcmMgPSBzcmM7XG59O1xuXG4vKipcbiAqIExvYWRzIHRleHQgY29udGVudCwgY2FsbHMgZnVuY3Rpb25cbiAqIFxuICogQHBhcmFtIHNyY1xuICogQHBhcmFtIGNhbGxiYWNrXG4gKi9cblJlc291cmNlTG9hZGVyLnByb3RvdHlwZS5sb2FkVGV4dCA9IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGNhbGxiYWNrIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB4aHIub3BlbignR0VUJywgc3JjLCB0cnVlKTtcbiAgICB4aHIuc2VuZCgpO1xufTtcblxuLyoqXG4gKiBMb2FkcyBKU09OIGNvbnRlbnQsIGNhbGxzIGNhbGxiYWNrXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICogQHBhcmFtIGNhbGxiYWNrXG4gKi9cblJlc291cmNlTG9hZGVyLnByb3RvdHlwZS5sb2FkSnNvbk9iamVjdCA9IGZ1bmN0aW9uIChzcmMsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5sb2FkVGV4dChzcmMsIGZ1bmN0aW9uIChsb2FkZWRUZXh0KSB7XG4gICAgICAgIGlmIChjYWxsYmFjayBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhKU09OLnBhcnNlKGxvYWRlZFRleHQpKTtcbiAgICAgICAgfVxuICAgIH0pXG59O1xuXG4iLCIvKipcbiAqXG4gKiBAcGFyYW0ge1Jlc291cmNlTG9hZGVyfSByZXNvdXJjZUxvYWRlclxuICogQHBhcmFtIHtbe2tleTogc3RyaW5nLCBzcmM6IHN0cmluZywgdHlwZTogc3RyaW5nIH1dfSByZXNvdXJjZXMgLSB3aGF0IHJlc291cmNlcyBhcmUgeW91IGdvaW5nIHRvIGxvYWRcbiAqIEtleSBpcyB1c2VkIHRvIHNhdmUgbG9hZGVkIGNvbnRlbnQgdG8gU3RvcmFnZSxcbiAqIFR5cGUgbXVzdCBiZTogJ3RleHQnLCAnaW1hZ2UnIG9yICdqc29uJyxcbiAqIFNyYyBpcyB0aGUgcGF0aCB0byB0aGUgcmVzb3VyY2UgZnJvbSBkb2N1bWVudCByb290XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvbkxvYWQgLSBjYWxsYmFjaywgd2hpY2ggd2lsbCBiZSBleGVjdXRlZCBvbiBsb2FkIG9mIGVhY2ggZWxlbWVudFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFJlc291cmNlUHJlcGFyZXIocmVzb3VyY2VMb2FkZXIsIHJlc291cmNlcywgb25Mb2FkKVxue1xuICAgIHRoaXMubG9hZGVyID0gcmVzb3VyY2VMb2FkZXI7XG4gICAgdGhpcy5yZXNvdXJjZXNUb0xvYWQgPSByZXNvdXJjZXM7XG4gICAgdGhpcy5vbkxvYWQgPSBvbkxvYWQ7XG59XG5cbi8qKlxuICogU3RhcnRzIGxvYWRpbmcgb2YgcmVxdWVzdGVkIHJlc291cmNlc1xuICovXG5SZXNvdXJjZVByZXBhcmVyLnByb3RvdHlwZS5zdGFydExvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRvdGFsTG9hZGVkQ291bnQgPSAwO1xuICAgIHZhciBzaG91bGRMb2FkQ291bnQgPSB0aGlzLnJlc291cmNlc1RvTG9hZC5sZW5ndGg7XG4gICAgdmFyIG9uTG9hZENhbGxiYWNrID0gdGhpcy5vbkxvYWQ7XG4gICAgdmFyIGxvYWRlciA9IHRoaXMubG9hZGVyO1xuXG4gICAgLy8gRWFjaCB0aW1lIHdlIGhhdmUgbG9hZGVkIGEgcmVzb3VyY2VcbiAgICAvLyB3ZSBjaGVjayBldmVyeXRoaW5nIGlzIGxvYWRlZFxuICAgIHZhciBzYXZlUmVzb3VyY2UgPSBmdW5jdGlvbiAoa2V5LCBvYmplY3QpIHtcbiAgICAgICAgU3RvcmFnZS5yZW1lbWJlcihrZXksIG9iamVjdCk7XG4gICAgICAgIHRvdGFsTG9hZGVkQ291bnQrKztcbiAgICAgICAgaWYgKHRvdGFsTG9hZGVkQ291bnQgPT0gc2hvdWxkTG9hZENvdW50KSB7XG4gICAgICAgICAgICBvbkxvYWRDYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdmFyIHJlcXVlc3RNZXRob2RzID0ge1xuICAgICAgICBpbWFnZTogZnVuY3Rpb24gKHNyYywga2V5KSB7XG4gICAgICAgICAgICBsb2FkZXIubG9hZEltYWdlKHNyYywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNhdmVSZXNvdXJjZShrZXksIHRoaXMpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAganNvbjogZnVuY3Rpb24gKHNyYywga2V5KSB7XG4gICAgICAgICAgICBsb2FkZXIubG9hZEpzb25PYmplY3Qoc3JjLCBmdW5jdGlvbiAoanNvblJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgc2F2ZVJlc291cmNlKGtleSwganNvblJlc291cmNlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIHRleHQ6IGZ1bmN0aW9uIChzcmMsIGtleSkge1xuICAgICAgICAgICAgbG9hZGVyLmxvYWRUZXh0KHNyYywgZnVuY3Rpb24gKHRleHRSZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgIHNhdmVSZXNvdXJjZShrZXksIHRleHRSZXNvdXJjZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucmVzb3VyY2VzVG9Mb2FkLmZvckVhY2goZnVuY3Rpb24gKHJlc291cmNlKSB7XG4gICAgICAgIHZhciB0eXBlID0gcmVzb3VyY2UudHlwZTtcbiAgICAgICAgdmFyIGtleSA9IHJlc291cmNlLmtleTtcbiAgICAgICAgdmFyIHNyYyA9IHJlc291cmNlLnNyYztcblxuICAgICAgICBpZiAoICEgcmVxdWVzdE1ldGhvZHMuaGFzT3duUHJvcGVydHkodHlwZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVHJ5aW5nIHRvIGxvYWQgdW5rbm93biByZXNvdXJjZSB0eXBlIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FsbGluZyBhcHByb3ByaWF0ZSBsb2FkIG1ldGhvZFxuICAgICAgICByZXF1ZXN0TWV0aG9kc1t0eXBlXShzcmMsIGtleSk7XG4gICAgfSk7XG59OyIsIi8qKlxuICogU2l6ZSBvZiB0aGUgcmVjdGFuZ2xlIHN1cnJvdW5kaW5nIHRoZSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcbiAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTaXplKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoID0gK3dpZHRoIHx8IFNpemUuZGVmYXVsdFdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gK2hlaWdodCB8fCBTaXplLmRlZmF1bHRIZWlnaHQ7XG59XG5cblNpemUucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMud2lkdGg7XG59O1xuXG5TaXplLnByb3RvdHlwZS5nZXRIZWlnaHQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG59O1xuXG5cblNpemUucHJvdG90eXBlLnJlc2l6ZUJ5ID0gZnVuY3Rpb24gKGRlbHRhV2lkdGgsIGRlbHRhSGVpZ2h0KSB7XG4gICAgdGhpcy53aWR0aCArPSBkZWx0YVdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ICs9IGRlbHRhSGVpZ2h0O1xuXG4gICAgaWYgKHRoaXMud2lkdGggPCBTaXplLm1pbldpZHRoKSB7XG4gICAgICAgIHRoaXMud2lkdGggPSBTaXplLm1pbldpZHRoO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmhlaWdodCA8IFNpemUubWluSGVpZ2h0KSB7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gU2l6ZS5taW5IZWlnaHQ7XG4gICAgfVxufTtcblxuLyoqXG4gKiBJbmNyZWFzZXMgdGhlIHNpemUgYnkgbXVsdGlwbGllclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSBtdWx0aXBsaWVyXG4gKiBAcmV0dXJucyB7U2l6ZX1cbiAqL1xuU2l6ZS5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbihtdWx0aXBsaWVyKSB7XG4gICAgcmV0dXJuIG5ldyBTaXplKHRoaXMud2lkdGggKiBtdWx0aXBsaWVyLCB0aGlzLmhlaWdodCAqIG11bHRpcGxpZXIpO1xufTtcblxuLyoqXG4gKiBNaW5pbWFsIHdpZHRoXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG5TaXplLm1pbldpZHRoID0gNDA7XG5cbi8qKlxuICogTWluaW1hbCBoZWlnaHRcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cblNpemUubWluSGVpZ2h0ID0gNDA7XG5cbi8qKlxuICogY29uc3QgZm9yIGRlZmF1bHQgd2lkdGhcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cblNpemUuZGVmYXVsdFdpZHRoID0gMTUwO1xuXG4vKipcbiAqIGNvbnN0IGZvciBkZWZhdWx0IGhlaWdodFxuICogQHR5cGUge251bWJlcn1cbiAqL1xuU2l6ZS5kZWZhdWx0SGVpZ2h0ID0gNzA7IiwiLyoqXG4gKiBJdCBpcyBwdXJwb3NlZCBmb3IgcmVtZW1iZXJpbmcgc29tZSBkYXRhLlxuICogRnVuY3Rpb25hbCBkZWNsYXJhdGlvbiBpcyB1c2VkIGZvciBpdHMgdmlzaWJpbGl0eSBvbmx5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBTdG9yYWdlKCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJUaGlzIGlzIG5vdCBmb3IgY3JlYXRpbmcgb2JqZWN0cyFcIik7XG59XG5cblN0b3JhZ2UuX2NvbnRlbnQgPSB7fTtcblxuLyoqXG4gKiBSZW1lbWJlcnMgYW55IHZhbHVlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICovXG5TdG9yYWdlLnJlbWVtYmVyID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICBTdG9yYWdlLl9jb250ZW50W2tleV0gPSB2YWx1ZTtcbn07XG5cbi8qKlxuICogQWxsb3dzIHlvdSB0byBnZXQgd2hhdCB5b3Ugd2FudCBidXQgb25seSBpZiB5b3UgcmVtZW1iZXIgdGhpcyBlYXJsaWVyXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAqL1xuU3RvcmFnZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIHNvbWV0aGluZ1lvdVdhbnQgPSBTdG9yYWdlLl9jb250ZW50W2tleV07XG5cbiAgICBpZiAodHlwZW9mIHNvbWV0aGluZ1lvdVdhbnQgPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiV2UgaGF2ZSBub3RoaW5nIHRvIHJldHVybiB1c2luZyBrZXk6IFwiICsga2V5KTtcbiAgICB9XG5cbiAgICByZXR1cm4gc29tZXRoaW5nWW91V2FudDtcbn07XG4iLCIvKipcbiAqIENvbGxlY3Rpb24gZm9yIFVJIGVsZW1lbnRzLlxuICpcbiAqIEl0IGlzIHB1cnBvc2VkIGZvciBrZWVwaW5nIHVpIGVsZW1lbnRzIHdpdGggY29ycmVjdCBvcmRlclxuICogQWxzbyBzdXBwb3J0cyBzZWxlY3Rpb24gcmVtZW1iZXJpbmdcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUlDb2xsZWN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuZWxlbWVudHMgPSBbXTtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbGVuZ3RoJywge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHNlbGYuZWxlbWVudHMubGVuZ3RoXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vKipcbiAqIFB1c2hlcyBlbGVtZW50IHRvIHRoZSB0b3AgbGF5ZXIgb2YgdGhlIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0ge1VJRWxlbWVudH0gZWxlbWVudFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICBpZiAoICEgKGVsZW1lbnQgaW5zdGFuY2VvZiBVSUVsZW1lbnQpICkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbGVtZW50IGluIFVJQ29sbGVjdGlvbiBtdXN0IGhhdmUgVUlFbGVtZW50IHR5cGUnKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYXJyYXkgd2l0aCBhbGwgZWxlbWVudHMgaW4gaXRcbiAqXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHM7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgZWxlbWVudCB3aXRoIHBhc3NlZCBpbmRleCBmcm9tIHRoZSBjb2xsZWN0aW9uIGFuZCByZXR1cm5zIGl0XG4gKlxuICogQHJldHVybiB7VUlFbGVtZW50fVxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgIGlmICghdGhpcy5oYXMoaW5kZXgpKSB7XG4gICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwiQ29sbGVjdGlvbjogaW5kZXggb3V0IG9mIGJvdW5kcyFcIik7XG4gICAgfVxuICAgIGlmIChpbmRleCA9PSB0aGlzLnNlbGVjdGVkSW5kZXgpIHtcbiAgICAgICAgdGhpcy5kZXNlbGVjdCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbGVtZW50cy5zcGxpY2UoaW5kZXgsIDEpWzBdO1xufTtcblxuLyoqXG4gKiBTd2FwcyBwbGFjZXMgb2YgdHdvIGVsZW1lbnRzIGluIHRoZSBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIGluZGV4MVxuICogQHBhcmFtIGluZGV4MlxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnN3YXAgPSBmdW5jdGlvbiAoaW5kZXgxLCBpbmRleDIpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4MSkgfHwgIXRoaXMuaGFzKGluZGV4MikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcCA9IHRoaXMuZWxlbWVudHNbaW5kZXgxXTtcbiAgICB0aGlzLmVsZW1lbnRzW2luZGV4MV0gID0gdGhpcy5lbGVtZW50c1tpbmRleDJdO1xuICAgIHRoaXMuZWxlbWVudHNbaW5kZXgyXSA9IHRlbXA7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGluZGV4IGV4aXN0cyBpbiBjb2xsZWN0aW9uXG4gKlxuICogQHBhcmFtIGluZGV4XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICByZXR1cm4gaW5kZXggPj0gMCB8fCBpbmRleCA8IHRoaXMubGVuZ3RoO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIGluZGV4XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbaW5kZXhdO1xufTtcblxuLyoqXG4gKiBGb3JnZXRzIHdoaWNoIGVsZW1lbnQgd2FzIHNlbGVjdGVkXG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZGVzZWxlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICBpZiAoIXRoaXMuaGFzKGluZGV4KSkge1xuICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcIkNvbGxlY3Rpb246IGluZGV4IG91dCBvZiBib3VuZHMhXCIpO1xuICAgIH1cbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbn07XG5cbi8qKlxuICogU2VsZWN0cyB0aGUgbGFzdCBlbGVtZW50IGluIHRoZSBjb2xsZWN0aW9uXG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuc2VsZWN0TGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmxlbmd0aCA/IHRoaXMubGVuZ3RoIC0gMSA6IC0xO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHNlbGVjdGVkIGVsZW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50fG51bGx9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0U2VsZWN0ZWRFbGVtZW50ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggIT0gLTEpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbdGhpcy5zZWxlY3RlZEluZGV4XVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBpbmRleCBvZiBzZWxlY3RlZCBlbGVtZW50XG4gKiBJZiBub25lLCByZXR1cm5zIC0xXG4gKlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRTZWxlY3RlZEluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkSW5kZXg7XG59O1xuXG4vKipcbiAqIEZldGNoZXMgZWxlbWVudCBieSBwYXNzZWQgb2Zmc2V0XG4gKlxuICogQHBhcmFtIG9mZnNldFhcbiAqIEBwYXJhbSBvZmZzZXRZXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50fG51bGx9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZmV0Y2hFbGVtZW50QnlPZmZzZXQgPSBmdW5jdGlvbiAob2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgIHZhciBtYXRjaGVkRWxlbWVudCA9IG51bGw7XG4gICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBpZiAoZWwuaXNPZmZzZXRJbihvZmZzZXRYLCBvZmZzZXRZKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEVsZW1lbnQgPSBlbDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBtYXRjaGVkRWxlbWVudDtcbn07XG5cbi8qKlxuICogUHVzaGVzIGVsZW1lbnQgdG8gdGhlIGVuZCBvZiB0aGUgY29sbGVjdGlvblxuICpcbiAqIEBwYXJhbSBpbmRleFxuICovXG5VSUNvbGxlY3Rpb24ucHJvdG90eXBlLnRvRW5kID0gZnVuY3Rpb24oaW5kZXgpXG57XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcbiAgICB9XG4gICAgdmFyIHdhc1NlbGVjdGVkID0gdGhpcy5zZWxlY3RlZEluZGV4ID09IGluZGV4O1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgIHRoaXMuYWRkKGVsZW1lbnQpO1xuXG4gICAgaWYgKHdhc1NlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMubGVuZ3RoIC0gMTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFB1c2hlcyBlbGVtZW50IHRvIHRoZSBib3R0b20gb2YgdGhlIGNvbGxlY3Rpb25cbiAqXG4gKiBAcGFyYW0gaW5kZXhcbiAqL1xuVUlDb2xsZWN0aW9uLnByb3RvdHlwZS50b1N0YXJ0ID0gZnVuY3Rpb24oaW5kZXgpXG57XG4gICAgaWYgKCF0aGlzLmhhcyhpbmRleCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJDb2xsZWN0aW9uOiBpbmRleCBvdXQgb2YgYm91bmRzIVwiKTtcbiAgICB9XG4gICAgdmFyIHdhc1NlbGVjdGVkID0gdGhpcy5zZWxlY3RlZEluZGV4ID09IGluZGV4O1xuICAgIHZhciBlbGVtZW50ID0gdGhpcy5yZW1vdmUoaW5kZXgpO1xuICAgIHRoaXMuZWxlbWVudHMgPSBbZWxlbWVudF0uY29uY2F0KHRoaXMuZWxlbWVudHMpO1xuXG4gICAgaWYgKHdhc1NlbGVjdGVkKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgfVxufTtcblxuXG4vKipcbiAqIEZldGNoZXMgaW5kZXggYnkgcGFzc2VkIG9mZnNldFxuICpcbiAqIEBwYXJhbSBvZmZzZXRYXG4gKiBAcGFyYW0gb2Zmc2V0WVxuICogQHJldHVybnMgeyp9XG4gKi9cblVJQ29sbGVjdGlvbi5wcm90b3R5cGUuZmV0Y2hJbmRleEJ5T2Zmc2V0ID0gZnVuY3Rpb24gKG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICB2YXIgbWF0Y2hlZEluZGV4ID0gbnVsbDtcbiAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xuICAgICAgICBpZiAoZWwuaXNPZmZzZXRJbihvZmZzZXRYLCBvZmZzZXRZKSkge1xuICAgICAgICAgICAgbWF0Y2hlZEluZGV4ID0gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbWF0Y2hlZEluZGV4O1xufTsiLCIvKipcbiAqIFNvbWUgZWxlbWVudCBvZiB1c2VyIGludGVyZmFjZVxuICpcbiAqIEBwYXJhbSB7UG9zaXRpb258dW5kZWZpbmVkfSBwb3NpdGlvblxuICogQHBhcmFtIHtTaXplfHVuZGVmaW5lZH0gc2l6ZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJRWxlbWVudChwb3NpdGlvbiwgc2l6ZSlcbntcbiAgICBpZiAoICEgKHBvc2l0aW9uIGluc3RhbmNlb2YgUG9zaXRpb24pICkge1xuICAgICAgICBwb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigpO1xuICAgIH1cbiAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG5cbiAgICBpZiAoICEgKHNpemUgaW5zdGFuY2VvZiBQb3NpdGlvbikpIHtcbiAgICAgICAgc2l6ZSA9IG5ldyBTaXplKCk7XG4gICAgfVxuICAgIHRoaXMuc2l6ZSA9IHNpemU7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgdmlldyBvZiB0aGUgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7VUlFbGVtZW50Vmlld30gdmlld1xuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLnNldFZpZXcgPSBmdW5jdGlvbih2aWV3KSB7XG4gICAgaWYgKCAhICh2aWV3IGluc3RhbmNlb2YgVUlFbGVtZW50VmlldykgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1ZpZXcgbXVzdCBoYXZlIFVJRWxlbWVudFZpZXcgdHlwZSEnKTtcbiAgICB9XG4gICAgdGhpcy52aWV3ID0gdmlldztcbn07XG5cbi8qKlxuICogUmV0dXJucyBjdXJyZW50IHZpZXcgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7VUlFbGVtZW50Vmlld3x1bmRlZmluZWR9XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0VmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy52aWV3O1xufTtcblxuLyoqXG4gKiBSZW5kZXJzIHRoZSBlbGVtZW50IHVzaW5nIGl0cyB2aWV3XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy52aWV3KSB7XG4gICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcignVmlldyBpcyBub3Qgc2V0IScpO1xuICAgIH1cblxuICAgIHRoaXMudmlldy5yZW5kZXIodGhpcyk7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge1Bvc2l0aW9ufSBwb3NpdGlvblxuICogQHJldHVybnMge1VJRWxlbWVudH1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5tb3ZlVG8gPSBmdW5jdGlvbihwb3NpdGlvbikge1xuICAgIGlmICghcG9zaXRpb24gaW5zdGFuY2VvZiBQb3NpdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCduZXcgcG9zaXRpb24gbXVzdCBoYXZlIFBvc2l0aW9uIHR5cGUhJylcbiAgICB9XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHBvc2l0aW9uIG9mIGFuIGVsZW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7UG9zaXRpb259XG4gKi9cblVJRWxlbWVudC5wcm90b3R5cGUuZ2V0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgc2l6ZSBvZiB0aGUgZWxlbWVudFxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLnNldFNpemUgPSBmdW5jdGlvbihzaXplKSB7XG4gICAgdGhpcy5zaXplID0gc2l6ZTtcbn07XG5cblxuLyoqXG4gKiBSZXR1cm4gdGhlIHNpemUgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7U2l6ZX1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5nZXRTaXplID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNpemU7XG59O1xuXG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHBhc3NlZCBvZmZzZXQgbWF0Y2hlcyBlbGVtZW50IHBvc2l0aW9uXG4gKlxuICogQHBhcmFtIGNsaWVudFhcbiAqIEBwYXJhbSBjbGllbnRZXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuVUlFbGVtZW50LnByb3RvdHlwZS5pc09mZnNldEluID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpXG57XG4gICAgdmFyIGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICB2YXIgY3VycmVudFNpemUgPSB0aGlzLmdldFNpemUoKTtcblxuICAgIGlmIChjdXJyZW50UG9zaXRpb24uZ2V0WCgpID4gY2xpZW50WCB8fCBjdXJyZW50UG9zaXRpb24uZ2V0WCgpICsgY3VycmVudFNpemUuZ2V0V2lkdGgoKSA8IGNsaWVudFgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoY3VycmVudFBvc2l0aW9uLmdldFkoKSA+IGNsaWVudFkgfHwgY3VycmVudFBvc2l0aW9uLmdldFkoKSArIGN1cnJlbnRTaXplLmdldEhlaWdodCgpIDwgY2xpZW50WSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgaG93IGZhciBpcyBwYXNzZWQgb2Zmc2V0IGZyb20gcG9pbnQgKDAsIDApXG4gKlxuICogQHBhcmFtIGNsaWVudFhcbiAqIEBwYXJhbSBjbGllbnRZXG4gKiBAcmV0dXJucyB7e3RvcDogbnVtYmVyLCBsZWZ0OiBudW1iZXJ9fVxuICovXG5VSUVsZW1lbnQucHJvdG90eXBlLmdldENsaWNrT2Zmc2V0ID0gZnVuY3Rpb24gKGNsaWVudFgsIGNsaWVudFkpIHtcbiAgICB2YXIgcG9zaXRpb24gPSB0aGlzLmdldFBvc2l0aW9uKCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiBjbGllbnRYIC0gcG9zaXRpb24uZ2V0WCgpLFxuICAgICAgICBsZWZ0OiBjbGllbnRZIC0gcG9zaXRpb24uZ2V0WSgpXG4gICAgfVxufTsiLCIvKipcbiAqIE9iamVjdCwgd2hpY2ggZGVmaW5lcyBob3cgdG8gcmVuZGVyIHNwZWNpZmljIFVJRWxlbWVudFxuICogVGhpcyBvYmplY3Qga25vd3MgZXZlcnl0aGluZyBhYm91dCBhbiBvYmplY3QgaXQgbmVlZHMgdG8gZHJhdy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUlFbGVtZW50VmlldygpXG57XG5cbn1cbi8qKlxuICpcbiAqIEBwYXJhbSBVSUVsZW1lbnRcbiAqL1xuVUlFbGVtZW50Vmlldy5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKFVJRWxlbWVudCkge1xuICAgIHRocm93IFR5cGVFcnJvcignWW91IHNob3VsZCBub3QgYmUgdXNpbmcgYW4gYWJzdHJhY3Qgb2JqZWN0IGZvciByZW5kZXJpbmchJyk7XG59O1xuIiwiLyoqXG4gKlxuICogQHBhcmFtIHtQb3NpdGlvbnxudWxsfSBwb3NpdGlvblxuICogQHBhcmFtIHtTaXplfG51bGx9IHNpemVcbiAqIEBwYXJhbSB7SW1hZ2V9IGltYWdlXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gVUlJbWFnZUVsZW1lbnQocG9zaXRpb24sIHNpemUsIGltYWdlKVxue1xuICAgIFVJRWxlbWVudC5jYWxsKHRoaXMsIHBvc2l0aW9uLCBzaXplKTtcblxuICAgIGlmICggISAoaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkltYWdlIG11c3QgaGF2ZSBJbWFnZSB0eXBlIVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG59XG5cblVJSW1hZ2VFbGVtZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50LnByb3RvdHlwZSk7XG5cbi8qKlxuICpcbiAqIEByZXR1cm5zIHtJbWFnZX1cbiAqL1xuVUlJbWFnZUVsZW1lbnQucHJvdG90eXBlLmdldEltYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmltYWdlO1xufTsiLCIvKipcbiAqIENsYXNzIGZvciBjcmVhdGluZ1xuICpcbiAqIEBwYXJhbSB7UG9zaXRpb258bnVsbH0gcG9zaXRpb25cbiAqIEBwYXJhbSB7U2l6ZXxudWxsfSBzaXplXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHBhcmFtIHsqfSBzdHlsZVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFVJTGFiZWxFbGVtZW50KHBvc2l0aW9uLCBzaXplLCB0ZXh0LCBzdHlsZSkge1xuICAgIFVJRWxlbWVudC5hcHBseSh0aGlzLCBbcG9zaXRpb24sIHNpemVdKTtcblxuICAgIGlmICghdGV4dCkge1xuICAgICAgICB0ZXh0ID0gVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQ7XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gdGV4dDtcblxuICAgIGlmICghIChzdHlsZSBpbnN0YW5jZW9mIE9iamVjdCkpIHtcbiAgICAgICAgc3R5bGUgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLmZvbnQgPSBzdHlsZS5mb250IHx8IFVJTGFiZWxFbGVtZW50LmRlZmF1bHRTdHlsZS5mb250O1xuICAgIHRoaXMuY29sb3IgPSBzdHlsZS5jb2xvciB8fCBVSUxhYmVsRWxlbWVudC5kZWZhdWx0U3R5bGUuY29sb3I7XG59XG5cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoVUlFbGVtZW50LnByb3RvdHlwZSk7XG5cbi8qKlxuICogR2V0cyBhIHRleHQgb2YgdGhlIGN1cnJlbnQgVUlMYWJlbEVsZW1lbnRcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuZ2V0VGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy50ZXh0O1xufTtcblxuLyoqXG4gKiBTZXRzIGEgdGV4dCBvZiB0aGUgY3VycmVudCBVSUxhYmVsRWxlbWVudFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKi9cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5zZXRUZXh0ID0gZnVuY3Rpb24gKHRleHQpIHtcbiAgICB0aGlzLnRleHQgPSB0ZXh0O1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRcbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd8c3RyaW5nfCp9XG4gKi9cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5nZXRGb250ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLmZvbnQ7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGZvbnQgb2YgdGhlIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZm9udFxuICovXG5VSUxhYmVsRWxlbWVudC5wcm90b3R5cGUuc2V0Rm9udCA9IGZ1bmN0aW9uIChmb250KSB7XG4gICAgdGhpcy5mb250ID0gZm9udDtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgY29sb3Igb2YgdGhlIHRleHRcbiAqXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cblVJTGFiZWxFbGVtZW50LnByb3RvdHlwZS5nZXRDb2xvciA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2xvcjtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgY29sb3Igb2YgdGhlIHRleHRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcbiAqL1xuVUlMYWJlbEVsZW1lbnQucHJvdG90eXBlLnNldENvbG9yID0gZnVuY3Rpb24gKGNvbG9yKSB7XG4gICAgdGhpcy5jb2xvciA9IGNvbG9yO1xufTtcblxuVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFRleHQgPSBcItCS0LLQtdC00LjRgtC1INGC0LXQutGB0YIuLi5cIjtcblxuVUlMYWJlbEVsZW1lbnQuZGVmYXVsdFN0eWxlID0ge1xuICAgIGZvbnQ6ICdBcmlhbCcsXG4gICAgY29sb3I6ICcjMDAwMDAwJ1xufTsiLCIvKipcbiAqIENhbWVyYVxuICogTWFuYWdlcyB2aWV3IGNoYW5naW5nXG4gKiBVc2VzIHNwaGVyaWNhbCBjb29yZGluYXRlcyB0byBjaGFuZ2UgdGhlIHZpZXcgYXJvdW5kIHRoZSBvYmplY3RcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gQ2FtZXJhKClcbntcbiAgICAvLyBJbml0aWFsIGFuZ2xlIGFuZCBkaXN0YW5jZVxuICAgIHRoaXMuYW5nbGVUaGV0YSA9IDMwO1xuICAgIHRoaXMuYW5nbGVGaSA9IDA7XG4gICAgdGhpcy5kaXN0YW5jZSA9IDE1O1xuXG4gICAgdGhpcy5taW5BbmdsZVRoZXRhID0gMTA7XG4gICAgdGhpcy5tYXhBbmdsZVRoZXRhID0gMTcwO1xuXG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0TmV3UG9zaXRpb24oKTtcblxuICAgIC8vIFdoZXJlIHRvIGxvb2tcbiAgICB0aGlzLmxvb2tBdCA9IFswLCAwLCAxLjNdO1xuICAgIHRoaXMudXAgPSBbMCwgMCwgMV07XG5cbiAgICB0aGlzLm1hdHJpeCA9IG5ldyBGbG9hdDMyQXJyYXkoMTYpO1xuICAgIHRoaXMudXBkYXRlTWF0cml4KCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBuZXcgcG9zaXRpb25zIG9mIGEgdmlld2VyXG4gKlxuICogQHJldHVybnMgeypbXX1cbiAqL1xuQ2FtZXJhLnByb3RvdHlwZS5nZXROZXdQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICBNYXRoLmNvcyh0aGlzLmFuZ2xlRmkgKiBDYW1lcmEuVG9SYWRpYW5zKSAqIE1hdGguc2luKHRoaXMuYW5nbGVUaGV0YSAqIENhbWVyYS5Ub1JhZGlhbnMpICogdGhpcy5kaXN0YW5jZSxcbiAgICAgICAgTWF0aC5zaW4odGhpcy5hbmdsZVRoZXRhICogQ2FtZXJhLlRvUmFkaWFucykgKiBNYXRoLnNpbih0aGlzLmFuZ2xlRmkgKiBDYW1lcmEuVG9SYWRpYW5zKSAqIHRoaXMuZGlzdGFuY2UsXG4gICAgICAgIHRoaXMuZGlzdGFuY2UgKiBNYXRoLmNvcyh0aGlzLmFuZ2xlVGhldGEgKiBDYW1lcmEuVG9SYWRpYW5zKVxuICAgIF07XG59O1xuXG4vKipcbiAqIE1vdmVzIGNhbWVyYSBhcm91bmQgdGhlIG9iamVjdFxuICpcbiAqIEBwYXJhbSBhbmdsZUZpXG4gKiBAcGFyYW0gYW5nbGVUaGV0YVxuICovXG5DYW1lcmEucHJvdG90eXBlLm1vdmUgPSBmdW5jdGlvbiAoYW5nbGVGaSwgYW5nbGVUaGV0YSkge1xuXG4gICAgdGhpcy5hbmdsZUZpICs9IGFuZ2xlRmk7XG5cbiAgICB2YXIgY2hhbmdlZEFuZ2xlVGhldGEgPSB0aGlzLmFuZ2xlVGhldGEgKyBhbmdsZVRoZXRhO1xuXG4gICAgaWYgKGNoYW5nZWRBbmdsZVRoZXRhIDwgdGhpcy5tYXhBbmdsZVRoZXRhICYmIGNoYW5nZWRBbmdsZVRoZXRhID4gdGhpcy5taW5BbmdsZVRoZXRhKSB7XG4gICAgICAgIHRoaXMuYW5nbGVUaGV0YSA9IGNoYW5nZWRBbmdsZVRoZXRhO1xuICAgIH1cblxuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldE5ld1Bvc2l0aW9uKCk7XG4gICAgdGhpcy51cGRhdGVNYXRyaXgoKTtcbn07XG5cbi8qKlxuICogTW92ZSBjYW1lcmEgZm9yd2FyZFxuICovXG5DYW1lcmEucHJvdG90eXBlLnpvb21JbiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5kaXN0YW5jZSA+IDQpIHtcbiAgICAgICAgdGhpcy5kaXN0YW5jZS0tO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5nZXROZXdQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogTW92ZSBjYW1lcmEgYmFja3dhcmRcbiAqL1xuQ2FtZXJhLnByb3RvdHlwZS56b29tT3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmRpc3RhbmNlIDwgMjApIHtcbiAgICAgICAgdGhpcy5kaXN0YW5jZSsrO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gdGhpcy5nZXROZXdQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1hdHJpeCgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogU2V0cyBjYW1lcmEgYW5nbGVcbiAqXG4gKiBAcGFyYW0gYW5nbGVGaVxuICogQHBhcmFtIGFuZ2xlVGhldGFcbiAqL1xuQ2FtZXJhLnByb3RvdHlwZS5zZXRBbmdsZSA9IGZ1bmN0aW9uIChhbmdsZUZpLCBhbmdsZVRoZXRhKSB7XG4gICAgdGhpcy5hbmdsZUZpID0gYW5nbGVGaTtcbiAgICB0aGlzLmFuZ2xlVGhldGEgPSBhbmdsZVRoZXRhO1xuICAgIHRoaXMucG9zaXRpb24gPSB0aGlzLmdldE5ld1Bvc2l0aW9uKCk7XG59O1xuXG4vKipcbiAqIFNldHMgY2FtZXJhIGRpc3RhbmNlXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGRpc3RhbmNlXG4gKi9cbkNhbWVyYS5wcm90b3R5cGUuc2V0RGlzdGFuY2UgPSBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcbiAgICB0aGlzLmRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHRoaXMuZ2V0TmV3UG9zaXRpb24oKTtcbn07XG5cbi8qKlxuICogVXBkYXRlcyB2aWV3IG1hdHJpeFxuICovXG5DYW1lcmEucHJvdG90eXBlLnVwZGF0ZU1hdHJpeCA9IGZ1bmN0aW9uICgpIHtcbiAgICBtYXQ0Lmxvb2tBdCh0aGlzLm1hdHJpeCwgdGhpcy5wb3NpdGlvbiwgdGhpcy5sb29rQXQsIHRoaXMudXApO1xufTtcblxuLyoqXG4gKiBDb25zdCBmb3IgdHJhbnNsYXRpbmcgZGVncmVlcyB0byByYWRpYW5zXG4gKlxuICogQHR5cGUge251bWJlcn1cbiAqL1xuQ2FtZXJhLlRvUmFkaWFucyA9IE1hdGguUEkgLyAxODA7IiwiLyoqXG4gKiBPYmplY3QgZm9yIGNyZWF0aW5nIFZCTyBhbmQgc3RvcmluZyBpdFxuICogdG8gaGF2ZSBjYXBhYmlsaXR5IHRvIGR5bmFtaWNhbGx5IGNoYW5nZSBjdXJyZW50IG1vZGVsXG4gKlxuICogQHBhcmFtIGdsXG4gKiBAcGFyYW0ganNvbk1vZGVsXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gTW9kZWwoZ2wsIGpzb25Nb2RlbCkge1xuICAgIHRoaXMuYnVpbGRCdWZmZXJzKGdsLCBqc29uTW9kZWwpXG59XG5cbi8qKlxuICogQmluZHMgYWxsIGJ1ZmZlcnNcbiAqXG4gKiBAcGFyYW0gZ2xcbiAqIEBwYXJhbSBqc29uTW9kZWxcbiAqL1xuTW9kZWwucHJvdG90eXBlLmJ1aWxkQnVmZmVycyA9IGZ1bmN0aW9uIChnbCwganNvbk1vZGVsKVxue1xuICAgIC8vINCh0L7Qt9C00LDQtdC8INCx0YPRhNC10YDRi1xuICAgIHRoaXMubW9kZWxWZXJ0ZXhlcyA9IGpzb25Nb2RlbC5tZXNoZXNbMF0udmVydGljZXM7XG4gICAgdGhpcy5tb2RlbEluZGV4ZXMgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBqc29uTW9kZWwubWVzaGVzWzBdLmZhY2VzKTtcbiAgICB0aGlzLm1vZGVsVGV4Q29vcmRzID0ganNvbk1vZGVsLm1lc2hlc1swXS50ZXh0dXJlY29vcmRzWzBdO1xuICAgIHRoaXMubW9kZWxOb3JtYWxzID0ganNvbk1vZGVsLm1lc2hlc1swXS5ub3JtYWxzO1xuXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LHRg9GE0LXRgCAtINGH0LXRgNC10Lcg0L3QtdCz0L4g0L/QtdGA0LXQtNCw0LXRgtGB0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LIgR1BVXG4gICAgdGhpcy5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIC8vINCd0LDQt9C90LDRh9Cw0LXQvCDQtdCz0L4g0LDQutGC0LjQstC90YvQvFxuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsVmVydGV4QnVmZmVyT2JqZWN0KTtcbiAgICAvLyBTVEFUSUNfRFJBVyAtINC60L7Qv9C40YDRg9C10Lwg0LXQtNC40L3QvtC20LTRiyDQuNC3IENQVSDQsiBHUFVcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0aGlzLm1vZGVsVmVydGV4ZXMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICAvLyDQntGC0LTQtdC70YzQvdGL0Lkg0LHRg9GE0LXRgCDQtNC70Y8g0YLQtdC60YHRgtGD0YDQvdGL0YUg0LrQvtC+0YDQtNC40L3QsNGCXG4gICAgdGhpcy5tb2RlbFRleENvb3Jkc0J1ZmZlck9iamVjdCA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0aGlzLm1vZGVsVGV4Q29vcmRzQnVmZmVyT2JqZWN0KTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgbmV3IEZsb2F0MzJBcnJheSh0aGlzLm1vZGVsVGV4Q29vcmRzKSwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgLy8g0KHQvtC30LTQsNC10Lwg0LjQvdC00LXQutGB0L3Ri9C5INCx0YPRhNC10YAg0LTQu9GPINGD0LrQsNC30LDQvdC40Y8g0L/QvtGA0Y/QtNC60LAg0LLQtdGA0YjQuNC9XG4gICAgdGhpcy5tb2RlbEluZGV4QnVmZmVyT2JqZWN0ID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgLy8g0J3QsNC30L3QsNGH0LDQtdC8INC10LPQviDQsNC60YLQuNCy0L3Ri9C8XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbEluZGV4QnVmZmVyT2JqZWN0KTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBuZXcgVWludDE2QXJyYXkodGhpcy5tb2RlbEluZGV4ZXMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICAvLyDQkdGD0YTQtdGAINGBINC90L7RgNC80LDQu9GP0LzQuFxuICAgIHRoaXMubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbE5vcm1hbEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodGhpcy5tb2RlbE5vcm1hbHMpLCBnbC5TVEFUSUNfRFJBVyk7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuYmluZEJ1ZmZlcnMgPSBmdW5jdGlvbiAoZ2wpIHtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGhpcy5tb2RlbFZlcnRleEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxUZXhDb29yZHNCdWZmZXJPYmplY3QpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxJbmRleEJ1ZmZlck9iamVjdCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRoaXMubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QpO1xufTsiLCIvKipcbiAqIEBwYXJhbSBjYW52YXNcbiAqIEBwYXJhbSB7V2ViR0xSZW5kZXJpbmdDb250ZXh0fSBnbENvbnRleHRcbiAqIEBwYXJhbSB7SW1hZ2V9IGluaXRpYWxUZXh0dXJlXG4gKiBAcGFyYW0ge3N0cmluZ30gdmVydGV4U2hhZGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnRTaGFkZXJcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBNb2RlbFZpZXcoY2FudmFzLCBnbENvbnRleHQsIGluaXRpYWxUZXh0dXJlLCB2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKVxue1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICAgIHRoaXMuZ2wgPSBnbENvbnRleHQ7XG5cbiAgICB0aGlzLnRleHR1cmUgPSBpbml0aWFsVGV4dHVyZTtcbiAgICB0aGlzLmNsZWFyQ29sb3IgPSB7IHI6IDAuOSwgZzogMC45LCBiOiAwLjksIGE6IDEuMCB9O1xuICAgIHRoaXMuaW5pdGlhbGl6ZSh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKTtcblxuICAgIHRoaXMuY2FtZXJhID0gbmV3IENhbWVyYSgpO1xuXG4gICAgdGhpcy5zZXRUZXh0dXJlKGluaXRpYWxUZXh0dXJlKTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHZlcnRleFNoYWRlciAtIHZlcnRleCBzaGFkZXIgc291cmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gZnJhZ21lbnRTaGFkZXIgLSBmcmFnbWVudCBzaGFkZXIgc291cmNlXG4gKi9cbk1vZGVsVmlldy5wcm90b3R5cGUuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICh2ZXJ0ZXhTaGFkZXIsIGZyYWdtZW50U2hhZGVyKVxue1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG5cbiAgICAvLyDQktC60LvRjtGH0LDQtdC8INC/0YDQvtCy0LXRgNC60YMg0LPQu9GD0LHQuNC90YtcbiAgICBnbC5lbmFibGUoZ2wuREVQVEhfVEVTVCk7XG5cbiAgICAvLyDQl9Cw0LTQsNC10Lwg0YbQstC10YIg0L7Rh9C40YHRgtC60LhcbiAgICBnbC5jbGVhckNvbG9yKHRoaXMuY2xlYXJDb2xvci5yLCB0aGlzLmNsZWFyQ29sb3IuZywgdGhpcy5jbGVhckNvbG9yLmIgLCB0aGlzLmNsZWFyQ29sb3IuYSk7XG4gICAgLy8g0J7Rh9C40YHRgtC60LAgLSDRh9GC0L4g0L7Rh9C40YnQsNC10LwgLSDQsdGD0YTQtdGAINGG0LLQtdGC0LAsINC40LvQuCDQttC1INCx0YPRhNC10YAg0LPQu9GD0LHQuNC90YtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG5cbiAgICB2YXIgc2hhZGVyQ29tcGlsZXIgPSBuZXcgU2hhZGVyQ29tcGlsZXIoZ2wpO1xuICAgIHRoaXMuc2hhZGVyUHJvZ3JhbSA9IHNoYWRlckNvbXBpbGVyLm1ha2VQcm9ncmFtKHZlcnRleFNoYWRlciwgZnJhZ21lbnRTaGFkZXIpO1xufTtcblxuLyoqXG4gKiBTZXRzIGEgbmV3IHRleHR1cmUgYXMgYWN0aXZlIHRleHR1cmVcbiAqIFxuICogQHBhcmFtIHtJbWFnZX0gaW1hZ2VcbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS5zZXRUZXh0dXJlID0gZnVuY3Rpb24gKGltYWdlKVxue1xuXG4gICAgdGhpcy50ZXh0dXJlID0gaW1hZ2U7XG4gICAgdmFyIGdsID0gdGhpcy5nbDtcblxuICAgIC8vIENyZWF0aW5nIHRleHR1cmVcbiAgICB0aGlzLm1vZGVsVGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICAvLyBCaW5kaW5nIGl0XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGhpcy5tb2RlbFRleHR1cmUpO1xuICAgIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIHRydWUpO1xuICAgIC8vIGkgZm9yIGludGVnZXIgLCBzLCB0IC0gdSwgdlxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1MsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9XUkFQX1QsIGdsLkNMQU1QX1RPX0VER0UpO1xuICAgIC8vIEZpbHRlcnNcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICAvLyDQodCw0LzQsCDRgtC10LrRgdGC0YPRgNCwXG4gICAgZ2wudGV4SW1hZ2UyRChcbiAgICAgICAgZ2wuVEVYVFVSRV8yRCwgLy8gVGV4dHVyZSB0eXBlXG4gICAgICAgIDAsIC8vIERldGFpbCBsZXZlbFxuICAgICAgICBnbC5SR0JBLCAvLyBXaGF0IGZvcm1hdCBkbyB3ZSB1c2VcbiAgICAgICAgZ2wuUkdCQSxcbiAgICAgICAgZ2wuVU5TSUdORURfQllURSwgLy8gRGF0YSB0eXBlXG4gICAgICAgIHRoaXMudGV4dHVyZSAvLyBUZXh0dXJlIGl0c2VsZlxuICAgICk7XG4gICAgLy8gVW5iaW5kIGZvciBub3dcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKTtcbn07XG5cbi8qKlxuICogU2V0cyBhY3RpdmUgbW9kZWwgYW5kIGJpbmRzIGFsbCBvZiB0aGUgYnVmZmVyc1xuICpcbiAqIEBwYXJhbSB7TW9kZWx9IG1vZGVsXG4gKi9cbk1vZGVsVmlldy5wcm90b3R5cGUuc2V0TW9kZWwgPSBmdW5jdGlvbiAobW9kZWwpXG57XG5cbiAgICB0aGlzLm1vZGVsID0gbW9kZWw7XG4gICAgdmFyIHByb2dyYW0gPSB0aGlzLnNoYWRlclByb2dyYW07XG4gICAgdmFyIGdsID0gdGhpcy5nbDtcblxuICAgIG1vZGVsLmJpbmRCdWZmZXJzKGdsKTtcblxuICAgIC8vINCj0LLQtdC00L7QvNC70Y/QtdC8INGI0LXQudC00LXRgCDQviDRgtC+0LwsINC60LDQuiDQsdGA0LDRgtGMINC00LDQvdC90YvQtSDQuNC3INCx0YPRhNC10YDQsCDQsiDQutCw0YfQtdGB0YLQstC1INCy0YXQvtC00L3Ri9GFINC/0LDRgNCw0LzQtdGC0YDQvtCyXG4gICAgdmFyIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24gPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCAndmVydFBvc2l0aW9uJyk7XG5cbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbW9kZWwubW9kZWxWZXJ0ZXhCdWZmZXJPYmplY3QpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgIHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24sIC8vINC90LDRiCDQsNGC0YDQuNCx0YPRglxuICAgICAgICAzLCAvLyDQmtC+0LvQuNGH0LXRgdGC0LLQviDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDQsNGC0YDQuNCx0YPRglxuICAgICAgICBnbC5GTE9BVCwgLy8g0KLQuNC/INC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LHRg9GE0LXRgNCwXG4gICAgICAgIGdsLkZBTFNFLCAvLyDQndC+0YDQvNCw0LvQuNC30L7QstCw0L3QvdGL0Lkg0LLQuNC0P1xuICAgICAgICAzICogRmxvYXQzMkFycmF5LkJZVEVTX1BFUl9FTEVNRU5ULCAvLyDQoNCw0LfQvNC10YAg0L7QtNC90L7QuSDQstC10YDRiNC40L3RiyAo0LHQsNC50YIpXG4gICAgICAgIDAgLy8g0J7RgtGB0YLRg9C/ICjQsiDQsdCw0LnRgtCw0YUpINC+0YIg0L3QsNGH0LDQu9CwINC00LDQvdC90YvRhSwg0L/RgNC40L3QsNC00LvQtdC20LDRidC40YUg0L7QtNC90L7QuSDQstC10YDRiNC40L3QtVxuICAgICk7XG4gICAgLy8g0JLQutC70Y7Rh9Cw0LXQvCDQsNGC0YDQuNCx0YPRglxuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uQXR0cmlidXRlTG9jYXRpb24pO1xuXG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG1vZGVsLm1vZGVsVGV4Q29vcmRzQnVmZmVyT2JqZWN0KTtcbiAgICB2YXIgdGV4Q29vcmRBdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0VGV4Q29vcmQnKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICB0ZXhDb29yZEF0dHJpYnV0ZUxvY2F0aW9uLCAvLyDQvdCw0Ygg0LDRgtGA0LjQsdGD0YJcbiAgICAgICAgMiwgLy8g0JrQvtC70LjRh9C10YHRgtCy0L4g0Y3Qu9C10LzQtdC90YLQvtCyINC90LAg0LDRgtGA0LjQsdGD0YJcbiAgICAgICAgZ2wuRkxPQVQsIC8vINCi0LjQvyDQutCw0LbQtNC+0LPQviDRjdC70LXQvNC10L3RgtCwINCx0YPRhNC10YDQsFxuICAgICAgICBnbC5GQUxTRSwgLy8g0J3QvtGA0LzQsNC70LjQt9C+0LLQsNC90L3Ri9C5INCy0LjQtD9cbiAgICAgICAgMiAqIEZsb2F0MzJBcnJheS5CWVRFU19QRVJfRUxFTUVOVCwgLy8g0KDQsNC30LzQtdGAINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90YsgKNCx0LDQudGCKVxuICAgICAgICAwIC8vINCe0YLRgdGC0YPQvyAo0LIg0LHQsNC50YLQsNGFKSDQvtGCINC90LDRh9Cw0LvQsCDQtNCw0L3QvdGL0YUsINC/0YDQuNC90LDQtNC70LXQttCw0YnQuNGFINC+0LTQvdC+0Lkg0LLQtdGA0YjQuNC90LVcbiAgICApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleENvb3JkQXR0cmlidXRlTG9jYXRpb24pO1xuXG4gICAgLy8g0J3QvtGA0LzQsNC70Lgg0LIg0YjQtdC50LTQtdGA0LVcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbW9kZWwubW9kZWxOb3JtYWxCdWZmZXJPYmplY3QpO1xuICAgIHZhciBub3JtYWxBdHRyaWJ1dGVMb2NhdGlvbiA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sICd2ZXJ0Tm9ybWFsJyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgbm9ybWFsQXR0cmlidXRlTG9jYXRpb24sIC8vINC90LDRiCDQsNGC0YDQuNCx0YPRglxuICAgICAgICAzLCAvLyDQmtC+0LvQuNGH0LXRgdGC0LLQviDRjdC70LXQvNC10L3RgtC+0LIg0L3QsCDQsNGC0YDQuNCx0YPRglxuICAgICAgICBnbC5GTE9BVCwgLy8g0KLQuNC/INC60LDQttC00L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LHRg9GE0LXRgNCwXG4gICAgICAgIGdsLlRSVUUsIC8vINCd0L7RgNC80LDQu9C40LfQvtCy0LDQvdC90YvQuSDQstC40LQ/XG4gICAgICAgIDMgKiBGbG9hdDMyQXJyYXkuQllURVNfUEVSX0VMRU1FTlQsIC8vINCg0LDQt9C80LXRgCDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdGLICjQsdCw0LnRgilcbiAgICAgICAgMCAvLyDQntGC0YHRgtGD0L8gKNCyINCx0LDQudGC0LDRhSkg0L7RgiDQvdCw0YfQsNC70LAg0LTQsNC90L3Ri9GFLCDQv9GA0LjQvdCw0LTQu9C10LbQsNGJ0LjRhSDQvtC00L3QvtC5INCy0LXRgNGI0LjQvdC1XG4gICAgKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShub3JtYWxBdHRyaWJ1dGVMb2NhdGlvbik7XG5cbn07XG5cbk1vZGVsVmlldy5wcm90b3R5cGUuc3RhcnRSZW5kZXIgPSBmdW5jdGlvbiAoKVxue1xuICAgIHZhciBnbCA9IHRoaXMuZ2w7XG5cbiAgICAvLyDQnNCw0YLRgNC40YbRiyAtINC80LXRgdGC0L7Qv9C+0LvQvtC20LXQvdC40LUg0LIg0YjQtdC50LTQtdGA0LDRhVxuICAgIHRoaXMubWF0V29ybGRVbmlmb3JtTG9jYXRpb24gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24odGhpcy5zaGFkZXJQcm9ncmFtLCAnbVdvcmxkJyk7XG4gICAgdGhpcy5tYXRWaWV3VW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgJ21WaWV3Jyk7XG4gICAgdGhpcy5tYXRQcm9qZWN0aW9uVW5pZm9ybUxvY2F0aW9uID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKHRoaXMuc2hhZGVyUHJvZ3JhbSwgJ21Qcm9qZWN0aW9uJyk7XG5cbiAgICAvLyDQodCw0LzQuCDQvNCw0YLRgNC40YbRi1xuICAgIHRoaXMud29ybGRNYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSBuZXcgRmxvYXQzMkFycmF5KDE2KTtcbiAgICBtYXQ0LmlkZW50aXR5KHRoaXMud29ybGRNYXRyaXgpO1xuICAgIG1hdDQucGVyc3BlY3RpdmUodGhpcy5wcm9qZWN0aW9uTWF0cml4LCBnbE1hdHJpeC50b1JhZGlhbigzMCksIHRoaXMuY2FudmFzLndpZHRoIC8gdGhpcy5jYW52YXMuaGVpZ2h0LCAwLjEsIDEwMDAuMCk7XG4gICAgXG4gICAgLy8g0JrQsNC60YPRjiDRiNC10LnQtNC10YDQvdGD0Y4g0L/RgNC+0LPRgNCw0LzQvNGDINC40YHQv9C+0LvRjNC30YPQtdC8XG4gICAgZ2wudXNlUHJvZ3JhbSh0aGlzLnNoYWRlclByb2dyYW0pO1xuXG4gICAgLy8g0J/QvtC70LUg0L7QsdC30L7RgNCwICjQsiDRgNCw0LTQuNCw0L3QsNGFKSwgY2xvc2VzdCBwbGFuZSwgZmFyIHBsYW5lXG4gICAgdGhpcy5nbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubWF0V29ybGRVbmlmb3JtTG9jYXRpb24sIHRoaXMuZ2wuRkFMU0UsIHRoaXMud29ybGRNYXRyaXgpO1xuXG4gICAgLy8g0J/QtdGA0LXQtNCw0LXQvCDQsiDRiNC10LnQtNC10YAuIFRSVUUgLSDRh9GC0L7QsdGLINGC0YDQsNC90YHQv9C+0L3QuNGA0L7QstCw0YLRjFxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5tYXRXb3JsZFVuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHRoaXMud29ybGRNYXRyaXgpO1xuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5tYXRWaWV3VW5pZm9ybUxvY2F0aW9uLCBnbC5GQUxTRSwgdGhpcy5jYW1lcmEubWF0cml4KTtcbiAgICBnbC51bmlmb3JtTWF0cml4NGZ2KHRoaXMubWF0UHJvamVjdGlvblVuaWZvcm1Mb2NhdGlvbiwgZ2wuRkFMU0UsIHRoaXMucHJvamVjdGlvbk1hdHJpeCk7XG5cbiAgICB0aGlzLmJpbmRDYW52YXNIYW5kbGVycygpO1xuICAgIHRoaXMuZHJhd1NjZW5lKCk7XG5cbiAgICAvLyDQk9C70LDQstC90YvQuSDRhtC40LrRgCDRgNC10L3QtNC10YDQsFxuICAgIC8vIHRoaXMuYW5pbWF0aW9uUmVxdWVzdCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG59O1xuXG5cbi8qKlxuICogVXBkYXRlcyByZW5kZXIgdmlld3BvcnRcbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS51cGRhdGVWaWV3cG9ydCA9IGZ1bmN0aW9uICgpXG57XG4gICAgdGhpcy5nbC52aWV3cG9ydCgwLCAwLCB0aGlzLmdsLmRyYXdpbmdCdWZmZXJXaWR0aCwgdGhpcy5nbC5kcmF3aW5nQnVmZmVySGVpZ2h0KTtcbn07XG5cbi8qKlxuICogUmVuZGVyIGxvb3BcbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24gKClcbntcbiAgICB0aGlzLmRyYXdTY2VuZSgpO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG59O1xuXG4vKipcbiAqIERyYXdzIHNjZW5lLlxuICogTWV0aG9kIHdoZXJlIGFsbCBvZiB0aGUgM0QgbWFnaWMgaGFwcGVuc1xuICovXG5Nb2RlbFZpZXcucHJvdG90eXBlLmRyYXdTY2VuZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2wgPSB0aGlzLmdsO1xuICAgIC8vINCe0LHQvdC+0LLQu9GP0LXQvCDQv9C10YDQtdC80LXQvdC90YPRjiDQsiDRiNC10LnQtNC10YDQtVxuICAgIGdsLnVuaWZvcm1NYXRyaXg0ZnYodGhpcy5tYXRWaWV3VW5pZm9ybUxvY2F0aW9uLCBnbC5GQUxTRSwgdGhpcy5jYW1lcmEubWF0cml4KTtcblxuICAgIC8vINCd0LDQt9C90LDRh9C10L3QuNC1INGC0LXQutGB0YLRg9GA0YtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0aGlzLm1vZGVsVGV4dHVyZSk7XG5cbiAgICAvLyDQkNC60YLQuNCy0L3Ri9C5INGB0LvQvtGCINGC0LXQutGB0YLRg9GA0YtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcblxuICAgIC8vINCm0LLQtdGCINC+0YfQuNGB0YLQutC4XG4gICAgZ2wuY2xlYXJDb2xvcih0aGlzLmNsZWFyQ29sb3IuciwgdGhpcy5jbGVhckNvbG9yLmcsIHRoaXMuY2xlYXJDb2xvci5iLCB0aGlzLmNsZWFyQ29sb3IuYSk7XG4gICAgZ2wuY2xlYXIoZ2wuREVQVEhfQlVGRkVSX0JJVCB8IGdsLkNPTE9SX0JVRkZFUl9CSVQgKTtcblxuICAgIGdsLmRyYXdFbGVtZW50cyhcbiAgICAgICAgZ2wuVFJJQU5HTEVTLCAvLyDQmtCw0Log0YDQuNGB0YPQtdC8LFxuICAgICAgICB0aGlzLm1vZGVsLm1vZGVsSW5kZXhlcy5sZW5ndGgsXG4gICAgICAgIGdsLlVOU0lHTkVEX1NIT1JULCAvLyDQotC40L9cbiAgICAgICAgMCAvLyDQodC60L7Qu9GM0LrQviDQv9GA0L7Qv9GD0YHQutCw0Lwg0LLQtdGA0YjQuNC9XG4gICAgKTtcbn07XG5cbi8qKlxuICogQmluZHMgY2FudmFzIGV2ZW50IGhhbmRsZXJzXG4gKi9cbk1vZGVsVmlldy5wcm90b3R5cGUuYmluZENhbnZhc0hhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgaXNNb3VzZVByZXNzZWQgPSBmYWxzZTtcbiAgICB2YXIgaW5pdGlhbEV2ZW50ID0gbnVsbDtcblxuICAgIHZhciBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcblxuICAgIHZhciBoYW5kbGVNb3VzZURvd24gPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgICAgICBlID0gZS50b3VjaGVzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaXNNb3VzZVByZXNzZWQgPSB0cnVlO1xuICAgICAgICBpbml0aWFsRXZlbnQgPSBlO1xuICAgIH07XG5cbiAgICB2YXIgaGFuZGxlTW91c2VVcCA9ICBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpc01vdXNlUHJlc3NlZCA9IGZhbHNlO1xuICAgICAgICBpbml0aWFsRXZlbnQgPSBudWxsO1xuICAgIH07XG5cbiAgICB2YXIgaGFuZGxlTW91c2VNb3ZlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgLy8gYW5vdGhlciBxdWljayBoYWNrXG4gICAgICAgIGlmICh0eXBlb2YgVG91Y2hFdmVudCAhPSBcInVuZGVmaW5lZFwiICYmIGUgaW5zdGFuY2VvZiBUb3VjaEV2ZW50KSB7XG4gICAgICAgICAgICAvLyBEb24ndCB3YW50IHRvIHNjcm9sbFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZSA9IGUudG91Y2hlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc01vdXNlUHJlc3NlZCkge1xuICAgICAgICAgICAgdmFyIGRpZmZYID0gaW5pdGlhbEV2ZW50LmNsaWVudFggLSBlLmNsaWVudFg7XG4gICAgICAgICAgICB2YXIgZGlmZlkgPSBpbml0aWFsRXZlbnQuY2xpZW50WSAtIGUuY2xpZW50WTtcbiAgICAgICAgICAgIGluaXRpYWxFdmVudCA9IGU7XG5cbiAgICAgICAgICAgIGNhbWVyYS5tb3ZlKGRpZmZYLCBkaWZmWSk7XG4gICAgICAgICAgICBzZWxmLmRyYXdTY2VuZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGhhbmRsZU1vdXNlRG93bik7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZU1vdXNlRG93bik7XG5cbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlTW91c2VVcCk7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBoYW5kbGVNb3VzZVVwKTtcblxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSk7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgaGFuZGxlTW91c2VNb3ZlKTtcbn07XG5cbi8qKlxuICogUmVuZGVyaW5nIHRoZSBjdXAgaW50byB0aGUgaW1hZ2VcbiAqXG4gKiBAcmV0dXJuIHtJbWFnZX1cbiAqL1xuTW9kZWxWaWV3LnByb3RvdHlwZS5tYWtlUHJldmlld0ltYWdlID0gZnVuY3Rpb24gKClcbntcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGlvblJlcXVlc3QpO1xuXG4gICAgdmFyIG9sZENvbG9yID0gdGhpcy5jbGVhckNvbG9yO1xuICAgIHRoaXMuY2xlYXJDb2xvciA9IHtyOiAwLjAsIGc6IDAuMCwgYjogMC4wLCBhOiAwLjAgfTtcblxuICAgIHZhciBvbGRDb29yZGluYXRlcyA9IHtcbiAgICAgICAgYW5nbGVGaTogdGhpcy5jYW1lcmEuYW5nbGVGaSxcbiAgICAgICAgYW5nbGVUaGV0YTogdGhpcy5jYW1lcmEuYW5nbGVUaGV0YSxcbiAgICAgICAgZGlzdGFuY2U6IHRoaXMuY2FtZXJhLmRpc3RhbmNlXG4gICAgfTtcblxuICAgIHRoaXMuY2FtZXJhLnNldEFuZ2xlKC05OCwgNzcpO1xuICAgIHRoaXMuY2FtZXJhLnNldERpc3RhbmNlKDIwKTtcbiAgICB0aGlzLmNhbWVyYS51cGRhdGVNYXRyaXgoKTtcblxuICAgIHRoaXMuZHJhd1NjZW5lKCk7XG4gICAgdGhpcy5jbGVhckNvbG9yID0gb2xkQ29sb3I7XG5cbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgaW1nLnNyYyA9IHRoaXMuY2FudmFzLnRvRGF0YVVSTCgpO1xuXG4gICAgdGhpcy5jYW1lcmEuc2V0QW5nbGUob2xkQ29vcmRpbmF0ZXMuYW5nbGVGaSwgb2xkQ29vcmRpbmF0ZXMuYW5nbGVUaGV0YSk7XG4gICAgdGhpcy5jYW1lcmEuc2V0RGlzdGFuY2Uob2xkQ29vcmRpbmF0ZXMuZGlzdGFuY2UpO1xuICAgIHRoaXMuY2FtZXJhLnVwZGF0ZU1hdHJpeCgpO1xuXG4gICAgdGhpcy5kcmF3U2NlbmUoKTtcbiAgICAvLyB0aGlzLmFuaW1hdGlvblJlcXVlc3QgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuXG4gICAgcmV0dXJuIGltZztcbn07XG4iLCIvKipcbiAqIFNoYWRlciBjb21waWxlclxuICogU2ltcGx5IG1ha2VzIFdlYkdMUHJvZ3JhbSBmcm9tIHNoYWRlciBzb3VyY2VzXG4gKlxuICogQHBhcmFtIHtXZWJHTFJlbmRlcmluZ0NvbnRleHR9IHdlYkdMUmVuZGVyaW5nQ29udGVudFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFNoYWRlckNvbXBpbGVyKHdlYkdMUmVuZGVyaW5nQ29udGVudCkge1xuICAgIHRoaXMud2ViR0xDb250ZXh0ID0gd2ViR0xSZW5kZXJpbmdDb250ZW50OyAgICAgXG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2ZXJ0ZXhTaGFkZXJTb3VyY2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBmcmFnbWVudFNoYWRlclNvdXJjZVxuICogQHJldHVybiB7V2ViR0xQcm9ncmFtfVxuICovXG5TaGFkZXJDb21waWxlci5wcm90b3R5cGUubWFrZVByb2dyYW0gPSBmdW5jdGlvbiAodmVydGV4U2hhZGVyU291cmNlLCBmcmFnbWVudFNoYWRlclNvdXJjZSkge1xuICAgIHZhciBnbCA9IHRoaXMud2ViR0xDb250ZXh0O1xuXG4gICAgLy8gQ3JlYXRpbmcgc2hhZGVyXG4gICAgdmFyIHZlcnRleFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICB2YXIgZnJhZ21lbnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcblxuICAgIC8vIFNldHRpbmcgc2hhZGVyIHNvdXJjZXNcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydGV4U2hhZGVyLCB2ZXJ0ZXhTaGFkZXJTb3VyY2UpO1xuICAgIGdsLnNoYWRlclNvdXJjZShmcmFnbWVudFNoYWRlciwgZnJhZ21lbnRTaGFkZXJTb3VyY2UpO1xuXG4gICAgLy8gQ29tcGlsaW5nIHNoYWRlclxuICAgIGdsLmNvbXBpbGVTaGFkZXIodmVydGV4U2hhZGVyKTtcblxuICAgIC8vIENoZWNraW5nIGNvbXBpbGF0aW9uIHN0YXR1c1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHZlcnRleFNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgY29tcGlsaW5nIHZlcnRleCBzaGFkZXIhJywgZ2wuZ2V0U2hhZGVySW5mb0xvZyh2ZXJ0ZXhTaGFkZXIpKTtcblxuICAgIH1cblxuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ21lbnRTaGFkZXIpO1xuICAgIGlmICghZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKGZyYWdtZW50U2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBjb21waWxpbmcgZnJhZ21lbnQgc2hhZGVyIScsIGdsLmdldFNoYWRlckluZm9Mb2coZnJhZ21lbnRTaGFkZXIpKTtcbiAgICB9XG5cbiAgICAvLyBXZSB3YW50IHRvIG1ha2UgYSBwcm9ncmFtIHNoYWRlciBzb3VyY2VzXG4gICAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG5cbiAgICAvLyBXZWJHTCBrbm93cyB0eXBlIG9mIGVhY2ggc2hhZGVyXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZlcnRleFNoYWRlcik7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZyYWdtZW50U2hhZGVyKTtcblxuICAgIC8vIExpbmtpbmdcbiAgICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKTtcblxuICAgIC8vIERvIHdlIGhhdmUgbGlua2luZyBlcnJvcnM/XG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0xpbmtpbmcgZXJyb3IhJywgZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSkpO1xuICAgIH1cblxuICAgIC8vIE9ubHkgZm9yIHRlc3RpbmcgcHVycG9zZXNcbiAgICBnbC52YWxpZGF0ZVByb2dyYW0ocHJvZ3JhbSk7XG4gICAgaWYgKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLlZBTElEQVRFX1NUQVRVUykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWxpZGF0aW5nIGVycm9yIScsIGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvZ3JhbTtcbn07XG5cbiIsIiIsIi8qKlxuICogVGhpcyBpcyB0aGUgcGxhY2Ugd2hlcmUgbWFnaWMgaGFwcGVucy5cbiAqIEhhbmRsaW5nIGV2ZW50c1xuICpcbiAqIEBwYXJhbSB7Q2FudmFzU3VyZmFjZX0gc3VyZmFjZVxuICogQHBhcmFtIHtNb2RlbFZpZXd9IG1vZGVsVmlld1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIENvbXBvbmVudHNQYW5lbChzdXJmYWNlLCBtb2RlbFZpZXcpXG57XG4gICAgdGhpcy5fc3VyZmFjZSA9IHN1cmZhY2U7XG4gICAgXG4gICAgdGhpcy5fZmlsZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVVcGxvYWRlcicpO1xuICAgIHRoaXMuX2J0blVwZGF0ZVRleHR1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXBkYXRlVGV4dHVyZScpO1xuICAgIHRoaXMuX2J0bkFkZFRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnRuQWRkVGV4dCcpO1xuICAgIHRoaXMuX3NlbGVjdEJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0QmFja2dyb3VuZCcpO1xuICAgIHRoaXMuX21vZGVsVmlldyA9IG1vZGVsVmlldztcbn1cblxuQ29tcG9uZW50c1BhbmVsLnByb3RvdHlwZS5iaW5kSGFuZGxlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIFxuICAgIC8vIEFkZCBsaXN0ZW5lciBmb3IgYSBjbGljayBldmVudCBvbiB0ZXh0IGJ1dHRvblxuICAgIHRoaXMuX2J0bkFkZFRleHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucHVzaExhYmVsKCk7XG4gICAgfSk7XG4gICAgXG4gICAgLy8gVXBkYXRlIGN1cnJlbnQgdGV4dHVyZSBidXR0b25cbiAgICB0aGlzLl9idG5VcGRhdGVUZXh0dXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLl9tb2RlbFZpZXcuc2V0VGV4dHVyZShzZWxmLl9zdXJmYWNlLnRvSW1hZ2UoKSk7XG4gICAgICAgIHNlbGYuX21vZGVsVmlldy5kcmF3U2NlbmUoKTtcbiAgICB9KTtcblxuICAgIC8vIE9uIGNsaWNrIHdlIHNldCBjdXJyZW50IHZhbHVlIHRvIGVtcHR5IGFuZCB0aGUgcmVhc29uXG4gICAgLy8gd2h5IHdlIGFyZSBkb2luZyB0aGlzIGlzIGJlY2F1c2Ugd2Ugd2FudCB0b1xuICAgIC8vIGFkZCBuZXcgaW1hZ2Ugb24gdGhlIHN1cmZhY2UsIGV2ZW4gaWYgaXQgaXMgdGhlXG4gICAgLy8gc2FtZSBmaWxlIChpbiBjYXNlIGlmIHVzZXIgc2VsZWN0ZWQgaXQgZWFybGllcilcbiAgICB0aGlzLl9maWxlSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgfSk7XG5cbiAgICAvLyBTZXR0aW5nIGNsZWFyIGNvbG9yIGZvciBhIGNhbnZhcyBzdXJmYWNlXG4gICAgdGhpcy5fc2VsZWN0QmFja2dyb3VuZC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFRoZXJlIGlzIGFuIGVtcHR5IHZhbHVlIGluIHRoZSBsaXN0XG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICBzZWxmLl9zdXJmYWNlLnNldENsZWFyQ29sb3IodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBPbiBjaGFuZ2Ugd2UgYXJlIGxvYWRpbmcgYSBmaWxlLlxuICAgIHRoaXMuX2ZpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAvLyBXZSBuZWVkIG9ubHkgb25lIGZpbGUuXG4gICAgICAgIC8vIFRoZSBmaXJzdCBvbmUuXG4gICAgICAgIHZhciBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIGRhdGFJbWFnZSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQucmVzdWx0O1xuICAgICAgICAgICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZS5zcmMgPSBkYXRhSW1hZ2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGFkZGluZyB1cGxvYWRlZCBpbWFnZSB0byB0aGUgc3VyZmFjZVxuICAgICAgICAgICAgc2VsZi5fc3VyZmFjZS5wdXNoSW1hZ2UoaW1hZ2UpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICB9KTtcbn07XG4iLCIvKipcbiAqIFBhbmVsIGZvciBpbnRlcmFjdGluZyB3aXRoIG1vZGVsIHZpZXcgZWxlbWVudFxuICogWm9vbWluZywgdHlwZSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge01vZGVsVmlld30gbW9kZWxWaWV3XG4gKiBAcGFyYW0ge3tNb2RlbH19IG1vZGVsc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIE1vZGVsVmlld1BhbmVsKG1vZGVsVmlldywgbW9kZWxzKVxue1xuICAgIHRoaXMuX2J0blpvb21JbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5ab29tSW4nKTtcbiAgICB0aGlzLl9idG5ab29tT3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blpvb21PdXQnKTtcbiAgICB0aGlzLl9jdXBUeXBlU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cFR5cGVTZWxlY3QnKTtcblxuICAgIHRoaXMuX21vZGVsVmlldyA9IG1vZGVsVmlldztcbiAgICB0aGlzLl9tb2RlbHMgPSBtb2RlbHM7XG59XG5cbi8qKlxuICogQmluZHMgYWxsIGV2ZW50IGhhbmRsZXJzXG4gKi9cbk1vZGVsVmlld1BhbmVsLnByb3RvdHlwZS5iaW5kSGFuZGxlcnMgPSBmdW5jdGlvbiAoKVxue1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFpvb21pbmcgYnV0dG9uc1xuICAgIHRoaXMuX2J0blpvb21Jbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fbW9kZWxWaWV3LmNhbWVyYS56b29tSW4oKTtcbiAgICAgICAgc2VsZi5fbW9kZWxWaWV3LmRyYXdTY2VuZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuX2J0blpvb21PdXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuX21vZGVsVmlldy5jYW1lcmEuem9vbU91dCgpO1xuICAgICAgICBzZWxmLl9tb2RlbFZpZXcuZHJhd1NjZW5lKCk7XG4gICAgfSk7XG5cbiAgICAvLyBDaGFuZ2luZyBtb2RlbCB0eXBlXG4gICAgdGhpcy5fY3VwVHlwZVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZCA9IHRoaXMudmFsdWU7XG4gICAgICAgIHNlbGYuX21vZGVsVmlldy5zZXRNb2RlbChzZWxmLl9tb2RlbHNbc2VsZWN0ZWRdKTtcbiAgICAgICAgc2VsZi5fbW9kZWxWaWV3LmRyYXdTY2VuZSgpO1xuICAgIH0pO1xufTsiLCIvKipcbiAqIFxuICogQHBhcmFtIHtNb2RlbFZpZXd9IG1vZGVsVmlld1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFByZXZpZXdQYW5lbChtb2RlbFZpZXcpXG57XG4gICAgdGhpcy5tb2RlbFZpZXcgPSBtb2RlbFZpZXc7XG5cbiAgICB0aGlzLnBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpZXdQYW5lbCcpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge0hUTUxDYW52YXNFbGVtZW50fVxuICAgICAqL1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpZXdDYW52YXMnKTtcblxuICAgIHRoaXMuX2J0blRvZ2dsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5Ub2dnbGVQcmV2aWV3Jyk7XG4gICAgdGhpcy5pc1Nob3duID0gZmFsc2U7XG59XG5cblByZXZpZXdQYW5lbC5wcm90b3R5cGUuYmluZEhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIHRoaXMuX2J0blRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICBpZiAoc2VsZi5pc1Nob3duKSB7XG4gICAgICAgICAgICBzZWxmLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5wYW5lbC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcbiAgICAgICAgICAgIHNlbGYucmVxdWVzdEltYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pc1Nob3duID0gIXNlbGYuaXNTaG93bjtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogUmVxdWVzdHMgaW1hZ2UgZnJvbSBtb2RlbCB2aWV3IGFuZCB1cGRhdGVzIGl0IG9uIGNhbnZhc1xuICovXG5QcmV2aWV3UGFuZWwucHJvdG90eXBlLnJlcXVlc3RJbWFnZSA9IGZ1bmN0aW9uICgpIFxue1xuICAgIHZhciBpbWFnZSA9IHRoaXMubW9kZWxWaWV3Lm1ha2VQcmV2aWV3SW1hZ2UoKTtcbiAgICB2YXIgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcblxuICAgIHZhciBpbWFnZU1hbiA9IFN0b3JhZ2UuZ2V0KCdwcmV2aWV3TWFuJyk7XG5cbiAgICB2YXIgcm90YXRlQW5nbGUgPSAwLjA5O1xuICAgIHZhciBkcmF3T2Zmc2V0ID0geyB4OiB0aGlzLmNhbnZhcy5oZWlnaHQgLyAtMTYsIHk6IHRoaXMuY2FudmFzLmhlaWdodCAvIDEwIH07XG5cbiAgICAvLyBjbGVhclxuICAgIGN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxuICAgIC8vIG1hbiBzaG91bGQgYmUgb24gY2VudGVyXG4gICAgdmFyIHdpZHRoT2Zmc2V0ID0gKHRoaXMuY2FudmFzLndpZHRoIC0gdGhpcy5jYW52YXMuaGVpZ2h0KSAvIDI7XG5cbiAgICAvLyBEcmF3IG1hbiBpbWFnZVxuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VNYW4sIHdpZHRoT2Zmc2V0LCAwLCB0aGlzLmNhbnZhcy5oZWlnaHQsIHRoaXMuY2FudmFzLmhlaWdodCk7XG5cbiAgICAvLyBEcmF3IGN1cCBpbWFnZVxuICAgIGN0eC5yb3RhdGUocm90YXRlQW5nbGUpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIGRyYXdPZmZzZXQueCwgZHJhd09mZnNldC55LCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcbiAgICBjdHgucm90YXRlKC1yb3RhdGVBbmdsZSk7XG5cbiAgICAvLyBEcmF3IG1hbiBmcm9udCBpbWFnZVxuICAgIHZhciBpbWFnZU1hbkZyb250ID0gU3RvcmFnZS5nZXQoJ3ByZXZpZXdNYW5Gcm9udCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2VNYW5Gcm9udCwgd2lkdGhPZmZzZXQsIDAsIHRoaXMuY2FudmFzLmhlaWdodCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcblxufTsiLCIvKipcbiAqIFBhcnQgb2YgdGhlIGRvY3VtZW50IGZvciBtYW5pcHVsYXRpb24gd2l0aCBwcm9wZXJ0aWVzIFxuICogb2YgdGhlIHNlbGVjdGVkIFVJRWxlbWVudCBvbiBDYW52YXNTdXJmYWNlXG4gKlxuICogQXdhcmUgb2YgdGhlIGRvY3VtZW50IGNvbnRlbnRcbiAqIEhhbmRsZXMgSFRNTCBtYW5pcHVsYXRpb25zXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFByb3BlcnRpZXNQYW5lbChzdXJmYWNlKVxue1xuICAgIHRoaXMuX3RleHRQYW5lbCA9IHtcbiAgICAgICAgcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0T3B0aW9ucycpLFxuICAgICAgICBzZWxlY3RGb250OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9udFNlbGVjdCcpLFxuICAgICAgICBzZWxlY3RDb2xvcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbG9yRm9udFNlbGVjdCcpLFxuICAgICAgICB0ZXh0QXJlYTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdGVkVGV4dENvbnRlbnQnKSxcbiAgICAgICAgdGV4dFVwQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dFVwQnRuJyksXG4gICAgICAgIHRleHREb3duQnV0dG9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dERvd25CdG4nKVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5fY29tbW9uUGFuZWwgPSB7XG4gICAgICAgIHBhbmVsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29tbW9uT3B0aW9ucycpLFxuICAgICAgICByZW1vdmVCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZW1vdmVCdG4nKSxcbiAgICAgICAgdXBCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cEJ0bicpLFxuICAgICAgICBkb3duQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZG93bkJ0bicpXG4gICAgfTtcbiAgICBcbiAgICB0aGlzLl9pbWFnZVBhbmVsID0ge1xuICAgICAgICBwYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlT3B0aW9ucycpXG4gICAgfTtcbiAgICB0aGlzLl9lbXB0eVBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25vU2VsZWN0ZWRPcHRpb25zJyk7XG4gICAgXG4gICAgdGhpcy5fc2VsZWN0ZWRFbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLl9zdXJmYWNlID0gc3VyZmFjZTtcbn1cblxuLyoqXG4gKiBCaW5kcyBoYW5kbGVycyB0byB0aGUgZXZlbnRzXG4gKi9cblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuYmluZEhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIFNlbGVjdGlvbiBldmVudHMgZnJvbSBjYW52YXMgc3VyZmFjZVxuICAgIHRoaXMuX3N1cmZhY2UuYWRkU2VsZWN0RXZlbnRIYW5kbGVyKGZ1bmN0aW9uICh1aUVsZW1lbnQpIHtcbiAgICAgICAgc2VsZi5zZXRTZWxlY3RlZCh1aUVsZW1lbnQpO1xuICAgIH0pO1xuICAgIHRoaXMuX3N1cmZhY2UuYWRkRGVzZWxlY3RFdmVudEhhbmRsZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLnNldFNlbGVjdGVkKG51bGwpO1xuICAgIH0pO1xuXG4gICAgLy8gQnV0dG9uIGNsaWNrIGZvciBjb21tb24gb3B0aW9ucyAtIHJlbW92ZSBjdXJyZW50bHkgc2VsZWN0ZWQgZWxlbWVudFxuICAgIHRoaXMuX2NvbW1vblBhbmVsLnJlbW92ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbW92ZVNlbGVjdGVkKCk7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBNb3ZlIGZvcmVncm91bmRcbiAgICB0aGlzLl9jb21tb25QYW5lbC51cEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnNlbGVjdGVkVG9Gb3JlZ3JvdW5kKCk7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBNb3ZlIGJhY2tncm91bmRcbiAgICB0aGlzLl9jb21tb25QYW5lbC5kb3duQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHNlbGYuX3N1cmZhY2Uuc2VsZWN0ZWRUb0JhY2tncm91bmQoKTtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIEJpbmRpbmcgdGV4dCBjaGFuZ2UgZXZlbnQgdGhyb3VnaCB0ZXh0IGFyZWEgZWxlbWVudFxuICAgIHRoaXMuX3RleHRQYW5lbC50ZXh0QXJlYS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIC8vIElmIHRoaXMgZXZlbnQgaGFwcGVuZWRcbiAgICAgICAgLy8gdGhlbiB3ZSBoYXZlIGEgbGFiZWwgYXMgc2VsZWN0ZWQgZWxlbWVudFxuICAgICAgICBzZWxmLl9zZWxlY3RlZEVsZW1lbnQuc2V0VGV4dCh0aGlzLnZhbHVlKTtcbiAgICAgICAgc2VsZi5fc3VyZmFjZS5yZW5kZXIoKTtcbiAgICB9KTtcblxuICAgIC8vIFVwZGF0ZXMgc2VsZWN0ZWQgZm9udFxuICAgIHRoaXMuX3RleHRQYW5lbC5zZWxlY3RGb250LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fc2VsZWN0ZWRFbGVtZW50LnNldEZvbnQodGhpcy52YWx1ZSk7XG4gICAgICAgIHNlbGYuX3N1cmZhY2UucmVuZGVyKCk7XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGVzIHNlbGVjdGVkIGNvbG9yXG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdENvbG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5fc2VsZWN0ZWRFbGVtZW50LnNldENvbG9yKHRoaXMudmFsdWUpO1xuICAgICAgICBzZWxmLl9zdXJmYWNlLnJlbmRlcigpO1xuICAgIH0pO1xufTtcblxuLyoqXG4gKiBTZXRzIHNlbGVjdGVkIGVsZW1lbnQuXG4gKiBTaG93IHByb3BlcnRpZXMgd2luZG93IGRlcGVuZGluZyBvbiB3aGF0IGlzIHRoZSB0eXBlIG9mIGFuIGVsZW1lbnQgXG4gKiBcbiAqIEBwYXJhbSB7VUlFbGVtZW50fG51bGx9IHVpRWxlbWVudFxuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLnNldFNlbGVjdGVkID0gZnVuY3Rpb24gKHVpRWxlbWVudCkge1xuICAgIHRoaXMuX3NlbGVjdGVkRWxlbWVudCA9IHVpRWxlbWVudDtcbiAgICBcbiAgICBpZiAodWlFbGVtZW50IGluc3RhbmNlb2YgVUlMYWJlbEVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zaG93VGV4dFByb3BlcnRpZXMoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBpZiAodWlFbGVtZW50IGluc3RhbmNlb2YgVUlJbWFnZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5zaG93SW1hZ2VQcm9wZXJ0aWVzKCk7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBcbiAgICB0aGlzLnNob3dOb3RoaW5nU2VsZWN0ZWRQYW5lbCgpO1xufTtcblxuLyoqXG4gKiBIaWRlcyBhbGwgb2YgdGhlIHBhbmVsc1xuICovXG5Qcm9wZXJ0aWVzUGFuZWwucHJvdG90eXBlLmhpZGVBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnBhbmVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIHRoaXMuX2ltYWdlUGFuZWwucGFuZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy5fY29tbW9uUGFuZWwucGFuZWwuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgdGhpcy5fZW1wdHlQYW5lbC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTtcbn07XG5cbi8qKlxuICogSGlkZXMgYWxsIGV4Y2VwdCB0ZXh0IHByb3BlcnRpZXMgcGFuZWxcbiAqL1xuUHJvcGVydGllc1BhbmVsLnByb3RvdHlwZS5zaG93VGV4dFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oaWRlQWxsKCk7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnRleHRBcmVhLmlubmVySFRNTCA9IHRoaXMuX3NlbGVjdGVkRWxlbWVudC5nZXRUZXh0KCk7XG4gICAgdGhpcy5fdGV4dFBhbmVsLnNlbGVjdEZvbnQudmFsdWUgPSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQuZ2V0Rm9udCgpO1xuICAgIHRoaXMuX3RleHRQYW5lbC5zZWxlY3RDb2xvci52YWx1ZSA9IHRoaXMuX3NlbGVjdGVkRWxlbWVudC5nZXRDb2xvcigpO1xuICAgIHRoaXMuX3RleHRQYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgICB0aGlzLl9jb21tb25QYW5lbC5wYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbn07XG5cbi8qKlxuICogSGlkZXMgZXZlcnl0aGluZyBleGNlcHQgaW1hZ2VzIHBhbmVsXG4gKi9cblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd0ltYWdlUHJvcGVydGllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmhpZGVBbGwoKTtcbiAgICB0aGlzLl9pbWFnZVBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIHRoaXMuX2NvbW1vblBhbmVsLnBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xufTtcblxuLyoqXG4gKiBIaWRlcyBhbGwgZXhjZXB0IFwibm90aGluZyBzZWxlY3RlZFwiIHBhbmVsXG4gKi9cblByb3BlcnRpZXNQYW5lbC5wcm90b3R5cGUuc2hvd05vdGhpbmdTZWxlY3RlZFBhbmVsID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGlkZUFsbCgpO1xuICAgIHRoaXMuX2VtcHR5UGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7XG59OyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJyk7XG4gICAgdmFyIHN1cmZhY2UgPSBuZXcgQ2FudmFzU3VyZmFjZShjYW52YXMpO1xuICAgIHN1cmZhY2UucmVuZGVyKCk7XG5cbiAgICAvLyBDcmVhdGUgcHJvcGVydGllcyBwYW5lbFxuICAgIC8vIGFuZCBhdHRhY2hpbmcgaXQgdG8gY2FudmFzIGV2ZW50c1xuICAgIHZhciBwcm9wZXJ0aWVzUGFuZWwgPSBuZXcgUHJvcGVydGllc1BhbmVsKHN1cmZhY2UpO1xuICAgIHByb3BlcnRpZXNQYW5lbC5iaW5kSGFuZGxlcnMoKTtcblxuICAgIHZhciBjdXBDYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VwQ2FudmFzJyk7XG4gICAgdmFyIGxvYWRlciA9IG5ldyBSZXNvdXJjZUxvYWRlcigpO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge01vZGVsVmlld31cbiAgICAgKi9cbiAgICB2YXIgbW9kZWxWaWV3ID0gbnVsbDtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtQcmV2aWV3UGFuZWx9XG4gICAgICovXG4gICAgdmFyIHByZXZpZXdQYW5lbCA9IG51bGw7XG5cbiAgICB2YXIgcmVzb3VyY2VQcmVwYXJlciA9IG5ldyBSZXNvdXJjZVByZXBhcmVyKGxvYWRlciwgW1xuICAgICAgICB7a2V5OiAnbW9kZWxDdXAxJywgc3JjOiAnL21vZGVscy9jdXAxLmpzb24nLCB0eXBlOiAnanNvbid9LFxuICAgICAgICB7a2V5OiAnbW9kZWxDdXAyJywgc3JjOiAnL21vZGVscy9jdXAyLmpzb24nLCB0eXBlOiAnanNvbid9LFxuICAgICAgICB7a2V5OiAndmVydGV4U2hhZGVyJywgc3JjOiAnL3NoYWRlcnMvZnJhZ21lbnQuZ2xzbCcsIHR5cGU6ICd0ZXh0J30sXG4gICAgICAgIHtrZXk6ICdmcmFnbWVudFNoYWRlcicsIHNyYzogJy9zaGFkZXJzL3ZlcnRleC5nbHNsJywgdHlwZTogJ3RleHQnfSxcbiAgICAgICAge2tleTogJ2luaXRpYWxUZXh0dXJlJywgc3JjOiAnL2ltZy9sb2dvR3JleS5qcGcnLCB0eXBlOiAnaW1hZ2UnfSxcbiAgICAgICAge2tleTogJ3ByZXZpZXdNYW4nLCBzcmM6ICcvaW1nL3ByZXZpZXdNYW4uanBnJywgdHlwZTogJ2ltYWdlJ30sXG4gICAgICAgIHtrZXk6ICdwcmV2aWV3TWFuRnJvbnQnLCBzcmM6ICcvaW1nL3ByZXZpZXdNYW5Gcm9udC5wbmcnLCB0eXBlOiAnaW1hZ2UnfVxuICAgIF0sIGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAvLyBUT0RPOiBleHRyYWN0IGFsbCBjaGVja3NcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGdsQ29udGV4dCA9IGN1cENhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcsIG9wdGlvbnMpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFnbENvbnRleHQpIHtcbiAgICAgICAgICAgIGdsQ29udGV4dCA9IGN1cENhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnLCBvcHRpb25zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZ2xDb250ZXh0KSB7XG4gICAgICAgICAgICBhbGVydCgnU2VlbXMgbGlrZSB5b3VyIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBXZWJHTC4gQ29tZSBiYWNrIGxhdGVyIHdoZW4geW91IHVwZGF0ZSB5b3VyIGJyb3dzZXIhJyk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkdMIHN1cHBvcnQgaXMgcmVxdWlyZWQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBrZXkgbXVzdCBiZSBzYW1lIGFzIHNlbGVjdCBvcHRpb24gdmFsdWVcbiAgICAgICAgdmFyIG1vZGVscyA9IHtcbiAgICAgICAgICAgIGN1cDE6IG5ldyBNb2RlbChnbENvbnRleHQsIFN0b3JhZ2UuZ2V0KCdtb2RlbEN1cDEnKSksXG4gICAgICAgICAgICBjdXAyOiBuZXcgTW9kZWwoZ2xDb250ZXh0LCBTdG9yYWdlLmdldCgnbW9kZWxDdXAyJykpXG4gICAgICAgIH07XG5cbiAgICAgICAgbW9kZWxWaWV3ID0gbmV3IE1vZGVsVmlldyhcbiAgICAgICAgICAgIGN1cENhbnZhcyxcbiAgICAgICAgICAgIGdsQ29udGV4dCxcbiAgICAgICAgICAgIFN0b3JhZ2UuZ2V0KCdpbml0aWFsVGV4dHVyZScpLFxuICAgICAgICAgICAgU3RvcmFnZS5nZXQoJ2ZyYWdtZW50U2hhZGVyJyksXG4gICAgICAgICAgICBTdG9yYWdlLmdldCgndmVydGV4U2hhZGVyJylcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBTZXR0aW5nIGluaXRpYWwgbW9kZWwgY3VwXG4gICAgICAgIG1vZGVsVmlldy5zZXRNb2RlbChtb2RlbHMuY3VwMSk7XG4gICAgICAgIG1vZGVsVmlldy5zdGFydFJlbmRlcigpO1xuXG4gICAgICAgIC8vIFBhbmVsIGZvciBjcmVhdGluZyBuZXcgZWxlbWVudHMgb25cbiAgICAgICAgdmFyIGNvbXBvbmVudFBhbmVsID0gbmV3IENvbXBvbmVudHNQYW5lbChzdXJmYWNlLCBtb2RlbFZpZXcpO1xuICAgICAgICBjb21wb25lbnRQYW5lbC5iaW5kSGFuZGxlcnMoKTtcblxuICAgICAgICAvLyBQYW5lbCBmb3IgM0QgbWFnaWNcbiAgICAgICAgdmFyIG1vZGVsVmlld1BhbmVsID0gbmV3IE1vZGVsVmlld1BhbmVsKG1vZGVsVmlldywgbW9kZWxzKTtcbiAgICAgICAgbW9kZWxWaWV3UGFuZWwuYmluZEhhbmRsZXJzKCk7XG5cbiAgICAgICAgLy8gUGFuZWwgZm9yIHByZXZpZXdcbiAgICAgICAgcHJldmlld1BhbmVsID0gbmV3IFByZXZpZXdQYW5lbChtb2RlbFZpZXcpO1xuICAgICAgICBwcmV2aWV3UGFuZWwuYmluZEhhbmRsZXJzKCk7XG4gICAgfSk7XG5cbiAgICB2YXIgZHJhd2luZ0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkcmF3aW5nQ29udGFpbmVyJyk7XG4gICAgdmFyIG1vZGVsVmlld0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXBDYW52YXNDb250YWluZXInKTtcbiAgICB2YXIgcGFuZWxQcmV2aWV3Q2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpZXdDYW52YXMnKTtcbiAgICBcbiAgICB2YXIgZml0Q2FudmFzU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQ2hhbmdpbmcgc2l6ZSBvZiB0aGUgZHJhd2luZ1xuICAgICAgICB2YXIgZHJhd2luZ0NhbnZhc1JhdGlvID0gc3VyZmFjZS5jYW52YXMud2lkdGggLyBzdXJmYWNlLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgIHZhciBuZXdXaWR0aCA9IGRyYXdpbmdDb250YWluZXIub2Zmc2V0V2lkdGg7XG4gICAgICAgIHZhciBuZXdIZWlnaHQgPSBuZXdXaWR0aCAvIGRyYXdpbmdDYW52YXNSYXRpbztcblxuICAgICAgICBzdXJmYWNlLmNhbnZhcy53aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICBzdXJmYWNlLmNhbnZhcy5oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgIHN1cmZhY2UucmVuZGVyKCk7XG5cbiAgICAgICAgdmFyIG1vZGVsVmlld1JhdGlvID0gY3VwQ2FudmFzLndpZHRoIC8gY3VwQ2FudmFzLmhlaWdodDtcbiAgICAgICAgdmFyIG5ld1dpZHRoTW9kZWxWaWV3ID0gbW9kZWxWaWV3Q29udGFpbmVyLm9mZnNldFdpZHRoO1xuICAgICAgICB2YXIgbmV3SGVpZ2h0TW9kZWxWaWV3ID0gbmV3V2lkdGhNb2RlbFZpZXcgLyBtb2RlbFZpZXdSYXRpbztcbiAgICAgICAgY3VwQ2FudmFzLndpZHRoID0gbmV3V2lkdGhNb2RlbFZpZXc7XG4gICAgICAgIGN1cENhbnZhcy5oZWlnaHQgPSBuZXdIZWlnaHRNb2RlbFZpZXc7XG5cbiAgICAgICAgcGFuZWxQcmV2aWV3Q2FudmFzLndpZHRoID0gbmV3V2lkdGhNb2RlbFZpZXc7XG4gICAgICAgIHBhbmVsUHJldmlld0NhbnZhcy5oZWlnaHQgPSBuZXdIZWlnaHRNb2RlbFZpZXc7XG5cbiAgICAgICAgaWYgKG1vZGVsVmlldykge1xuICAgICAgICAgICAgbW9kZWxWaWV3LnVwZGF0ZVZpZXdwb3J0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldmlld1BhbmVsKSB7XG4gICAgICAgICAgICBwcmV2aWV3UGFuZWwucmVxdWVzdEltYWdlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZml0Q2FudmFzU2l6ZSgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZpdENhbnZhc1NpemUpO1xuXG4gICAgcmVzb3VyY2VQcmVwYXJlci5zdGFydExvYWRpbmcoKTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
