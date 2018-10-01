angular.module("formWarmup",[]);



document.addEventListener("DOMContentLoaded", function(){
    angular.bootstrap(document.getElementById("rootid"), ["formWarmup"]);
})

angular.module("formWarmup").directive("green", function(){
    return {
        require : "ngModel",
        link : function(scope , elem , attr, ctrl){
            ctrl.$validators.green = function(modelValue, viewValue){
                if(modelValue === "green" || ctrl.$isEmpty(modelValue) ){
                    return true
                }
                return false
            }
            
        }
    }
    
});

angular.module("formWarmup").directive("validnames", function(){
    return {
        require : "ngModel",
        link : function(scope,elem,attr,cotrl){
            var userlist = ["dgh"];
            cotrl.$validators.validnames = function(modelValue, viewValue){
                if(userlist.indexOf(modelValue) == -1){
                    return false
                }
                return true
            }
        }
    }
});
angular.module("formWarmup").directive("checkasync", function($q, $timeout){
    return {
        require : "ngModel",
        link : function (scope , elem , attr , cntrl){
            var userlist = ['ud','ka'];
            cntrl.$asyncValidators.checkasync = function(modelValue, viewValue){
                if (cntrl.$isEmpty(modelValue)){
                    return $q.resolve();
                }
                var def = $q.defer();
                $timeout(() => {
                    if(userlist.indexOf(modelValue) === -1){
                        def.resolve();
                    }
                    else{
                        def.reject();
                    }
                }, 2000);
                return def.promise
            }

        }
    }
});