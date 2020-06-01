
function Generate_Brief(text,length){  
    if(text.length < length) return text;  
    var Foremost = text.substr(0,length);
    // console.log(Foremost)  
    var re = /<(\/?)(BODY|SCRIPT|P|DIV|H1|H2|H3|H4|H5|H6|ADDRESS|PRE|TABLE|TR|TD|TH|INPUT|SELECT|TEXTAREA|OBJECT|A|UL|OL|LI|BASE|META|LINK|HR|BR|PARAM|IMG|AREA|INPUT|SPAN)[^>]([\s\S]*)(>?)/ig;  
    var Singlable = /BASE|META|LINK|HR|BR|PARAM|IMG|AREA|INPUT/i  
    var Stack = new Array(), posStack = new Array();  
    while(true){  
      var newone = re.exec(Foremost);
      console.log('newone',newone)  
      if(newone == null) break; 
      console.log('newone[1]',newone[1]) 
      if(newone[1] == ""){  
          var Elem = newone[2];  
          console.log('Elem',Elem)
          if(Elem.match(Singlable) && newone[3]!= ""){  
            continue;  
          }  
          Stack.push(newone[2].toUpperCase());  
          posStack.push(newone.index);  
          if(newone[3] == "") break;  
      }else{  
          var StackTop = Stack[Stack.length-1];  
          var End = newone[2].toUpperCase();  
          if(StackTop == End){  
            Stack.pop();  
            posStack.pop();  
            if(newone[3] == ""){  
              Foremost = Foremost+">";  
            }  
          }  
      };  
    }     
    var cutpos = posStack.shift();  
    console.log('cutpos',cutpos)
    Foremost = Foremost.substring(0,cutpos);  
    console.log(Foremost,'Foremost')
    return Foremost;  
  }  
  let text="<div class=\"markdown-text\"><h2>活动信息</h2>\n<p><img src=\"//static.cnodejs.org/Fsqzwb41k7ivzIJn810EEwPQ_2it\" alt=\"1111.png\"></p>\n<p><img src=\"//static.cnodejs.org/Fu_XCoMAB8uUlFYPGWQ3ncssCb8t\" alt=\"2222.png\"></p>\n<p><img src=\"//static.cnodejs.org/Fge-hr_LF_guf0BbwQ9xmi0unnNi\" alt=\"33333.png\"></p>\n<p>本次活动需要提前报名，场地大约有100人</p>\n<p>报名连接</p>\n<p><a href=\"https://www.huodongxing.com/event/5526816284100?utm_source=%E5%8F%91%E7%8E%B0%E6%B4%BB%E5%8A%A8%E9%A1%B5&amp;utm_medium=&amp;utm_campaign=eventspage\">https://www.huodongxing.com/event/5526816284100?utm_source=发现活动页&amp;utm_medium=&amp;utm_campaign=eventspage</a></p>\n<h2>PPT</h2>\n<p><a href=\"https://github.com/i5ting/nodeparty-beijing-2020-1-11\">https://github.com/i5ting/nodeparty-beijing-2020-1-11</a></p>\n<h2>照片</h2>\n<p>龙佳文\n<img src=\"//static.cnodejs.org/Fg4dIjPNKksKiOMmyIgGMEg1087O\" alt=\"111 1.jpg\"></p>\n<p>十忆\n<img src=\"//static.cnodejs.org/Fs9J2dxbgickUDOzM7Vwuxd7HVKF\" alt=\"222 1.jpg\">\n狼叔\n<img src=\"//static.cnodejs.org/Fhc9AmVNEbqAdmxOUTYwIN7XdYU_\" alt=\"3333 1.jpg\">\n王东\n<img src=\"//static.cnodejs.org/FssLOS3hMlVq658eD_yb3CJpeW8C\" alt=\"4444 1.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/Fsuj39b-PoVOS65vAoVgFqbR9m8Q\" alt=\"5555 1.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FiTD21bRAzZZbpCueJRk7Uq-Ik7i\" alt=\"7777 1.jpg\">\n现场提问\n<img src=\"//static.cnodejs.org/Fm6ssdq_P6JNaftwAZ_AyiXtVIxb\" alt=\"8888 1.jpg\">\n流司\n<img src=\"//static.cnodejs.org/FoqgjwSNssTlJ1ufnowc1jxx_imR\" alt=\"9923 1.jpg\">\n现场提问\n<img src=\"//static.cnodejs.org/FplNNONJOacRNbvnvc7EBl1sgN8U\" alt=\"9999 1.jpg\">\n现场\n<img src=\"//static.cnodejs.org/Fl--jBm9nfRCmNPCvL92TrlkvdGT\" alt=\"11212 1.jpg\"></p>\n<p>圆桌会\n<img src=\"//static.cnodejs.org/Fq7xH6d9K1bor6ixUFY1AEO4d8GU\" alt=\"23323e4ds 1.jpg\">\n<img src=\"//static.cnodejs.org/FulUvueqoTJ8nIGlOgJTD1JFGDPA\" alt=\"322332.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/Ftw6oRg8G-eeqQ2SLrwiaj671sMF\" alt=\"稳稳稳.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FozWsIovHilxYBlJ-I8LmYW-gNhi\" alt=\"32323.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/Fvhek3xeqE4afj41AuB5Vuj7MwSr\" alt=\"43434.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FvM4WhrhpkRT9sZ3CxsbGy8OX7bH\" alt=\"55545.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/Fh7MgA9zXpT3Gc-1UfXsd3o8FB6F\" alt=\"111110.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/Fr6oow-uHpFkkoVo2xIaw3Xm-gdI\" alt=\"232323.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/Fl3A1Ijt8IeE9XHT9DNNUM_I0OkB\" alt=\"232332.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FobbWO7B2JwwszK80ZpJT8Pl6f0Y\" alt=\"322323.jpg\">\n<img src=\"//static.cnodejs.org/Fr7qQvzHT6pLInnX9m6JeFZEjKYC\" alt=\"812312.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FinFnUdjTZjt2DAdjC5H-DsYZ4Fa\" alt=\"882323.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/Fq-nKPQt4JeiBZAQKft6vW49pGiB\" alt=\"3434389.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FuAt3QuZ-Y9E21EMrkn05JAcPLsf\" alt=\"9999923.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FkpIr82doXBBk7VH1aGM6zD16qZ-\" alt=\"23323232323.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FiKYZ46Ilm5OVT_Tunhmga8x-vrr\" alt=\"232323232332.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FqOE05r204gsYDWp-m9p04Vf1ME_\" alt=\"aaa.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FmRRAzINYs-j5hF-n7-LZKscD23e\" alt=\"bbbb.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FjIIelIuczqPkJjWSKC5wEtv3uzD\" alt=\"cccc.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FjIIelIuczqPkJjWSKC5wEtv3uzD\" alt=\"cccc.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FtponmJNP2UD0qemwD_1vBBa0ibK\" alt=\"dddd.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/Fv0LVdt1X6RizMg5gp2CerH1pIMH\" alt=\"dfdfd.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/Fgw6rAtxlJg9fWLlQNM4gwozWlVj\" alt=\"eeeee.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FlnX4CFVmxrFQXmNWYQuwt6Ar4Et\" alt=\"EmptyName 2.jpg\"></p>\n<p><img src=\"//static.cnodejs.org/FnnoaFaMof3IxOR9sWJIj6jrjcPx\" alt=\"hjkl;'.jpg\"></p>\n<p>王东\n<img src=\"//static.cnodejs.org/FhNqWIas9yk1XuYvNHtijUzB40BK\" alt=\"jhklsd.jpg\"></p>\n<p>嘉宾合影\n<img src=\"//static.cnodejs.org/FvKMqpc7UZhVeRKXUNvtY8FuBAEh\" alt=\"上3.jpg\"></p>\n<p>狼书签名\n<img src=\"//static.cnodejs.org/FgxEWL85ZMEA8qpVakAvvSUWEmVd\" alt=\"23e4232 1.jpg\"></p>\n<h2>视频</h2>\n<p>面向B端工作台的微前端方案-ConsoleOS-徐博文\n<a href=\"https://edu.talkingdata.com/open-class?id=142\">https://edu.talkingdata.com/open-class?id=142</a></p>\n<p>Serverless在美团的实践-龙佳文\n<a href=\"https://edu.talkingdata.com/open-class?id=143\">https://edu.talkingdata.com/open-class?id=143</a></p>\n<p>前端生态建设在瓜子的落地实践-王东\n<a href=\"https://edu.talkingdata.com/open-class?id=144\">https://edu.talkingdata.com/open-class?id=144</a></p>\n<p>Egg-React-SSR深度解析-张宇昂\n<a href=\"https://edu.talkingdata.com/open-class?id=145\">https://edu.talkingdata.com/open-class?id=145</a></p>\n<p>如何融入并贡献开源-Justjavac\n<a href=\"https://edu.talkingdata.com/open-class?id=146\">https://edu.talkingdata.com/open-class?id=146</a></p>\n<p>圆桌讨论\n<a href=\"https://edu.talkingdata.com/open-class?id=147\">https://edu.talkingdata.com/open-class?id=147</a></p>\n</div>"
//   console.log(text)
  
  let length=200;
  Generate_Brief(text,length);

  console.log(text.replace(/<[^>]*>|/g,""))