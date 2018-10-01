angular.module("formWarmup",[]);
/*
the name directive is important in input element
the binding wich happens is 
<name attribute of form><name attribute of input><$ which we want to check ie $error,$touched><directive>

the ng-show works when we return false

need to check further about the $ propertites for name attribute

like $valid , $pristin, $dirty, $error, $touched, $untouched
$pending


 ng-model-options="{ updateOn: 'blur' }"
 ng-model-options="{ updateOn: 'mousedown blur' }
 ng-model-options="{ debounce: 500 }"
 ng-model-options="{ updateOn: 'default blur', debounce: { default: 500, blur: 0 } 
---use it along with ng-model-----
 <input type="text" ng-model="user.name" ng-model-options="{ debounce: 250 }" /></label><br />
*/


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