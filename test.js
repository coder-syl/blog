// ## for in 
// > 1. 一般用于遍历对象的可枚举**属性**。以及对象从构造函数原型中继承的属性。对于每个不同的属性，语句都会被执行。 
// > 2. 不建议使用for in 遍历数组，因为输出的顺序是不固定的。
// > 3. 如果迭代的对象的变量值是null或者undefined, for in不执行循环体，建议在使用for in循环之前，先检查该对象的值是不是null或者undefined

// ## for of
// > 1.for...of 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

// ## 两者的区别
// ### 遍历对象

// ```
var s = { a: 1, b: 2, c: 3 }
var s1 = Object.create(s);
for (var prop in s1) {
    console.log(prop);//a b c
    console.log(s1[prop]);//1 2 3
}
// for (let prop of s1) {
//     console.log(prop);//报错如下 Uncaught TypeError: s1 is not iterable 
// }
// for (let prop of Object.keys(s1)) { // 这里的不可以获取到s1的key的
//     console.log(prop);// 啥都不输出
//     console.log(s1[prop]);//啥都不输出
// }
// for (let prop of Object.keys(s1)) { // 这里的不可以获取到s1的key的
//     console.log(prop);// 啥都不输出
//     console.log(s[prop]);//啥都不输出
// }
// for (let prop of Object.keys(s)) {
//     console.log(prop);// 0 1 2
//     console.log(s1[prop]);//啥都不输出
// }
// for (let prop of Object.keys(s)) {
//     console.log(prop);//  a b c
//     console.log(s[prop]);//1 2 3
// }
// ```


// ### 遍历数组


// ```
// var a=[1,2,3]
// for(let i in a){
//     console.log(i);     //0 1 2
//     console.log(a[i]); //1 2 3
//  }
//  for(let i of a){
//     console.log(i); //1 2 3
// }
// ```

// ### 遍历字符串
// 区别同上
