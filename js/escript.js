angular.module("eagleStore", []);
angular.module("eagleStore").controller("eagleStoreCtrl", ($scope, $http) => {
    $scope.titulo = "Eagle Store";
    $scope.subtitulo = "Seja bem-vindo!";

    $scope.trocarSubtitulo = (subtitulo) => {
        $scope.subtitulo = subtitulo;
    };

    $http.get('js/banco.json').then(function(data) {
        $scope.snap_json = data;
        let cont = 0;
        $scope.pacotes_snaps = [];
        angular.forEach($scope.snap_json, (value,key) => {
            if (key == "data"){     
                $scope.snap = value;
            }            
        });
        angular.forEach($scope.snap, (value, key) => {
            if (key == cont){
                $scope.pacotes_snaps.push(value);                
            }
            cont ++;
        });

    });

    $scope.verificaNome = function(chave)  {
        if(chave == "nome"){return true;}
        else{ return false;}
    };

    $scope.verificaCategoria = function(chave)  {
        if(chave == true){
            return true; 
        }
        else{ 
            return false; 
        }
    };


    $scope.verificaComando = function(chave)  {
        if(chave == "comando"){return true;}
        else{ return false;}
    };
    
    $scope.verificaStable = function(chave)  {
        if(chave == "canal_stable"){return true;}
        else{ return false;}
    };

    $scope.isPacote = function(pacote)  {
        if(pacote == "snap"){return true;}
        else{ return false;}
    };
    
    $scope.verificaImagem = function(chave)  {
        if(chave == "icon"){return true;}
        else{ return false;}
    };

    
    $scope.verificaDescricao = function(chave)  {
        if(chave == "descricao"){return true;}
        else{ return false;}
    };

});