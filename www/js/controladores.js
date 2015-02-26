angular.module("controladores",[])
    .controller("FicherosController",function($scope,Ficheros){

        $scope.escribir=function(){

            Ficheros.escribir("Hola soy edu, ....","datos.dat");

        }
        $scope.leer=function(){

            Ficheros.leer("datos.dat");

        }

    });

