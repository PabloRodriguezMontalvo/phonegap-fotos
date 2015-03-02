angular.module("servicios",[]).

    factory('Camara',function($q){

        return{

            sacarFoto:function(){
                var deferred=$q.defer();

                if(navigator.camera){

                    navigator.camera.getPicture(function(imagen){

                        deferred.resolve(imagen);

                    },function(err){

                       deferred.reject(err.message);
                    },{quality:50,
                            destinationType:navigator.camera.DestinationType.DATA_URL/*FILE_URI*/}
                    );

                }
                else{
                    deferred.reject("No tengo acceso a la camara");
                }

               return deferred.promise;

            }



            


        }





    }).

    factory('Ficheros',function(){

        var datos;
        var nombre;

        function escritura(filesystem){

            filesystem.root.getFile(nombre,
                {create:true,exclusive:false}, escribirFichero,error);

        }
        function escribirFichero(ficheroEntrada){

            ficheroEntrada.createWriter(ejecutarEscritura,error);

        }
        function ejecutarEscritura(writer){
            writer.onwrite=function(){

                alert("Ya ta");
            }

            writer.write(datos);

        }

        function lectura(filesystem){

            filesystem.root.getFile(nombre,{create:false,exclusive:false},
                leerFichero,error);

        }
        function leerFichero(fichero){
            fichero.file(ejecutarLectura,error);

        }
        function ejecutarLectura(fichero){
           var reader=new FileReader();

            reader.onloadend=function(evt){

                alert(evt.target.result);

            }
            reader.readAsText(fichero);

        }

        function error(err){

            alert(err.message);

        }


        return{

            leer:function(nom){
                nombre=nom;
                window.requestFileSystem(LocalFileSystem.PERSISTENT,0,
                    lectura,error);


            },
            escribir:function(info,nom){
                datos=info;
                nombre=nom;
                window.requestFileSystem(LocalFileSystem.PERSISTENT,0,
                    escritura,error);


            }

        }
    });