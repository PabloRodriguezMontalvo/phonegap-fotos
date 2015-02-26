angular.module("servicios",[]).
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