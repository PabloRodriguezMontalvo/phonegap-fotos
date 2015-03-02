angular.module("controladores",[])
    .controller("FotosController",function($scope,Camara){
        $scope.imagen={data:''};

        $scope.sacarFoto=function(){
            Camara.sacarFoto().then(function(foto){

                $scope.imagen.data="data:image/jpeg;base64,"+foto;
                alert("Foto tomada "+foto);

            },function(err){

                alert(err);


            })

        }


    })
    .controller("FicherosController",function($scope,Ficheros){

        $scope.escribir=function(){

            Ficheros.escribir("Hola soy edu, ....","datos.dat");

        }
        $scope.leer=function(){

            Ficheros.leer("datos.dat");

        }

    });

