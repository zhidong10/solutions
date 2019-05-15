'use strict';
var fs = require('fs');
var i = 0;
var $ = "$";
//setting area
var directory = './res';
var format = "头图-序列_";
var tar = './tar'
//setting area
function rename(fileName, formation,tar) {
    console.log(fileName)
    fs.readdir(fileName,
        function(err, data) {
            data.forEach(function(item) {
                i++;
                var f;
                var type = item.split('.');
                var rn = item.replace(formation,"");
                console.log(i+type[1])
                fs.rename(directory + '/' + item, tar + '/' + i + '.'+type[1],
                    function(err) {
                        if (err) {
                            throw err;
                        } else {
                            console.log("done!")
                        }
                    })
            });
        })
};
rename(directory, format,tar);

 /*type = "." + type[type.length - 1];
            if (formation.length === 1) {
                f = i;
            } else if (formation.startsWith('$')) {
                f = i + formation.split('$')[1];
            } else if (formation.endsWith('$')) {
                f = formation.split('$')[0] + i;
            } else {
                var arr = formation.split('$');
                f = arr[0] + i + arr[1];
            }*/
            /*fs.rename(directory + '/' + item, directory + '/' + f + type
            ,
            function(err) {
                if (err) {
                    throw err;
                } else {
                    console.log("done!")
                }
            })*/